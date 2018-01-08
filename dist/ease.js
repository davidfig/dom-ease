'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');
var Penner = require('penner');
var exists = require('exists');

var DomEaseElement = require('./easeElement');

/**
 * Manages all animations running on DOM objects
 * @extends EventEmitter
 * @example
 * var Ease = require('dom-ease');
 * var ease = new Ease({ duration: 3000, ease: 'easeInOutSine' });
 *
 * var test = document.getElementById('test')
 * ease.add(test, { left: 20, top: 15, opacity: 0.25 }, { repeat: true, reverse: true })
 */

var DomEase = function (_EventEmitter) {
    _inherits(DomEase, _EventEmitter);

    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration
     * @param {(string|function)} [options.ease=penner.linear] default ease
     * @param {(string|function)} [options.autostart=true]
     * @fires DomEase#complete
     * @fires DomEase#each
     */
    function DomEase(options) {
        _classCallCheck(this, DomEase);

        var _this = _possibleConstructorReturn(this, (DomEase.__proto__ || Object.getPrototypeOf(DomEase)).call(this));

        _this.options = options || {};
        _this.options.duration = _this.options.duration || 1000;
        _this.options.ease = _this.options.ease || Penner.linear;
        _this.list = [];
        _this.empty = true;
        if (!options.autostart) {
            _this.start();
        }
        return _this;
    }

    /**
     * start animation loop
     * alternatively, you can manually call update() on each loop
     */


    _createClass(DomEase, [{
        key: 'start',
        value: function start() {
            if (!this._requested) {
                this._requested = true;
                this.loop();
            }
        }
    }, {
        key: 'loop',
        value: function loop(time) {
            var _this2 = this;

            if (time) {
                var elapsed = this._last ? time - this._last : 0;
                this.update(elapsed);
            }
            this._last = time;
            this._requestId = window.requestAnimationFrame(function (time) {
                return _this2.loop(time);
            });
        }

        /**
         * stop animation loop
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this._requested) {
                window.cancelAnimationFrame(this._requestId);
                this._requested = false;
            }
        }

        /**
         * add animation(s) to a DOM element
         * @param {(HTMLElement|HTMLElement[])} element
         * @param {object} params
         * @param {number} [params.left] uses px
         * @param {number} [params.top] uses px
         * @param {number} [params.width] uses px
         * @param {number} [params.height] uses px
         * @param {number} [params.scale]
         * @param {number} [params.scaleX]
         * @param {number} [params.scaleY]
         * @param {number} [params.opacity]
         * @param {(color|color[])} [params.color]
         * @param {(color|color[])} [params.backgroundColor]
         * @param {object} [options]
         * @param {number} [options.duration]
         * @param {(string|function)} [options.ease]
         * @param {(boolean|number)} [options.repeat]
         * @param {boolean} [options.reverse]
         * @returns {DomEaseElement}
         */

    }, {
        key: 'add',
        value: function add(element, params, options) {
            // call add on all elements if array
            if (Array.isArray(element)) {
                for (var i = 0; i < element.length; i++) {
                    if (i === element.length - 1) {
                        return this.add(element[i], params, options);
                    } else {
                        this.add(element[i], params, options);
                    }
                }
            }

            // set up default options
            options = options || {};
            options.duration = exists(options.duration) ? options.duration : this.options.duration;
            options.ease = options.ease || this.options.ease;
            if (typeof options.ease === 'string') {
                options.ease = Penner[options.ease];
            }

            if (element.__domEase) {
                element.__domEase.add(params, options);
            } else {
                var domEase = element.__domEase = new DomEaseElement(element);
                domEase.add(params, options);
                this.list.push(domEase);
            }
            return element.__domEase;
        }

        /**
         * remove animation(s)
         * @param {(Animation|HTMLElement)} object
         */

    }, {
        key: 'remove',
        value: function remove(object) {
            var element = object.__domEase ? object.__domEase.element : object;
            var index = this.list.indexOf(element);
            if (index !== -1) {
                this.list.splice(index, 1);
            }
            delete element.__domEase;
        }

        /**
         * remove all animations from list
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            while (this.list.length) {
                var _DomEaseElement = this.list.pop();
                if (_DomEaseElement.element.__domEase) {
                    delete _DomEaseElement.element.__domEase;
                }
            }
        }

        /**
         * update frame; this is called automatically if start() is used
         * @param {number} elapsed time in ms
         */

    }, {
        key: 'update',
        value: function update(elapsed) {
            for (var i = 0, _i = this.list.length; i < _i; i++) {
                if (this.list[i].update(elapsed)) {
                    this.list.splice(i, 1);
                    i--;
                    _i--;
                }
            }
            this.emit('each', this);
            if (!this.empty && Array.keys(this.list).length === 0 && !this.empty) {
                this.emit('done', this);
                this.empty = true;
            }
        }

        /**
         * number of elements being DomEaseElementd
         * @returns {number}
         */

    }, {
        key: 'countElements',
        value: function countElements() {
            return this.list.length;
        }

        /**
         * number of active animations across all elements
         * @returns {number}
         */

    }, {
        key: 'countRunning',
        value: function countRunning() {
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var entry = _step.value;

                    count += Object.keys(entry) - 1;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return count;
        }

        /**
         * @var
         */

    }]);

    return DomEase;
}(EventEmitter);

/**
 * fires when there are no more animations for a DOM element
 * @event DomEase#complete
 * @type {DomEase}
 */

/**
 * fires on each loop for a DOM element where there are animations
 * @event DomEase#each
 * @type {DomEase}
 */

/**
 * @external EventEmitter
 */

module.exports = DomEase;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJEb21FYXNlRWxlbWVudCIsIkRvbUVhc2UiLCJvcHRpb25zIiwiZHVyYXRpb24iLCJlYXNlIiwibGluZWFyIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJfcmVxdWVzdGVkIiwibG9vcCIsInRpbWUiLCJlbGFwc2VkIiwiX2xhc3QiLCJ1cGRhdGUiLCJfcmVxdWVzdElkIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJlbGVtZW50IiwicGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsImFkZCIsIl9fZG9tRWFzZSIsImRvbUVhc2UiLCJwdXNoIiwib2JqZWN0IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwicG9wIiwiX2kiLCJlbWl0Iiwia2V5cyIsImNvdW50IiwiZW50cnkiLCJPYmplY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7QUFDQSxJQUFNRSxTQUFTRixRQUFRLFFBQVIsQ0FBZjs7QUFFQSxJQUFNRyxpQkFBaUJILFFBQVEsZUFBUixDQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7SUFVTUksTzs7O0FBRUY7Ozs7Ozs7O0FBUUEscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7QUFDQSxjQUFLRCxPQUFMLENBQWFFLElBQWIsR0FBb0IsTUFBS0YsT0FBTCxDQUFhRSxJQUFiLElBQXFCTixPQUFP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QUE7O0FBQUE7QUFFSSxxQ0FBa0IsS0FBS2hDLElBQXZCLDhIQUNBO0FBQUEsd0JBRFNpQyxLQUNUOztBQUNJRCw2QkFBU0UsT0FBT0gsSUFBUCxDQUFZRSxLQUFaLElBQXFCLENBQTlCO0FBQ0g7QUFMTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1JLG1CQUFPRCxLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7RUFyTWtCMUMsWTs7QUEwTXRCOzs7Ozs7QUFNQTs7Ozs7O0FBTUE7Ozs7QUFJQTZDLE9BQU9DLE9BQVAsR0FBaUJ6QyxPQUFqQiIsImZpbGUiOiJlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcbmNvbnN0IFBlbm5lciA9IHJlcXVpcmUoJ3Blbm5lcicpXHJcbmNvbnN0IGV4aXN0cyA9IHJlcXVpcmUoJ2V4aXN0cycpXHJcblxyXG5jb25zdCBEb21FYXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vZWFzZUVsZW1lbnQnKVxyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWxsIGFuaW1hdGlvbnMgcnVubmluZyBvbiBET00gb2JqZWN0c1xyXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICogQGV4YW1wbGVcclxuICogdmFyIEVhc2UgPSByZXF1aXJlKCdkb20tZWFzZScpO1xyXG4gKiB2YXIgZWFzZSA9IG5ldyBFYXNlKHsgZHVyYXRpb246IDMwMDAsIGVhc2U6ICdlYXNlSW5PdXRTaW5lJyB9KTtcclxuICpcclxuICogdmFyIHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpXHJcbiAqIGVhc2UuYWRkKHRlc3QsIHsgbGVmdDogMjAsIHRvcDogMTUsIG9wYWNpdHk6IDAuMjUgfSwgeyByZXBlYXQ6IHRydWUsIHJldmVyc2U6IHRydWUgfSlcclxuICovXHJcbmNsYXNzIERvbUVhc2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MTAwMF0gZGVmYXVsdCBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZT1wZW5uZXIubGluZWFyXSBkZWZhdWx0IGVhc2VcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmF1dG9zdGFydD10cnVlXVxyXG4gICAgICogQGZpcmVzIERvbUVhc2UjY29tcGxldGVcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2VhY2hcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSB0aGlzLm9wdGlvbnMuZWFzZSB8fCBQZW5uZXIubGluZWFyXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIGlmICghb3B0aW9ucy5hdXRvc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdGFydCBhbmltYXRpb24gbG9vcFxyXG4gICAgICogYWx0ZXJuYXRpdmVseSwgeW91IGNhbiBtYW51YWxseSBjYWxsIHVwZGF0ZSgpIG9uIGVhY2ggbG9vcFxyXG4gICAgICovXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubG9vcCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AodGltZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSB0aGlzLl9sYXN0ID8gdGltZSAtIHRoaXMuX2xhc3QgOiAwXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGVsYXBzZWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xhc3QgPSB0aW1lXHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy5sb29wKHRpbWUpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RvcCBhbmltYXRpb24gbG9vcFxyXG4gICAgICovXHJcbiAgICBzdG9wKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JlcXVlc3RJZClcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYW5pbWF0aW9uKHMpIHRvIGEgRE9NIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fEhUTUxFbGVtZW50W10pfSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy50b3BdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLndpZHRoXSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVYXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVZXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMub3BhY2l0eV1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmNvbG9yXVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuYmFja2dyb3VuZENvbG9yXVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uXVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZV1cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmVwZWF0XVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlXVxyXG4gICAgICogQHJldHVybnMge0RvbUVhc2VFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBhZGQoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNhbGwgYWRkIG9uIGFsbCBlbGVtZW50cyBpZiBhcnJheVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gZWxlbWVudC5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChlbGVtZW50W2ldLCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudFtpXSwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXQgdXAgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBvcHRpb25zLmR1cmF0aW9uID0gZXhpc3RzKG9wdGlvbnMuZHVyYXRpb24pID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgIG9wdGlvbnMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lYXNlID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZWFzZSA9IFBlbm5lcltvcHRpb25zLmVhc2VdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5fX2RvbUVhc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9fZG9tRWFzZS5hZGQocGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBkb21FYXNlID0gZWxlbWVudC5fX2RvbUVhc2UgPSBuZXcgRG9tRWFzZUVsZW1lbnQoZWxlbWVudClcclxuICAgICAgICAgICAgZG9tRWFzZS5hZGQocGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkb21FYXNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudC5fX2RvbUVhc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbmltYXRpb24ocylcclxuICAgICAqIEBwYXJhbSB7KEFuaW1hdGlvbnxIVE1MRWxlbWVudCl9IG9iamVjdFxyXG4gICAgICovXHJcbiAgICByZW1vdmUob2JqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBvYmplY3QuX19kb21FYXNlID8gb2JqZWN0Ll9fZG9tRWFzZS5lbGVtZW50IDogb2JqZWN0XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihlbGVtZW50KVxyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgZWxlbWVudC5fX2RvbUVhc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgYW5pbWF0aW9ucyBmcm9tIGxpc3RcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKClcclxuICAgIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5saXN0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IERvbUVhc2VFbGVtZW50ID0gdGhpcy5saXN0LnBvcCgpXHJcbiAgICAgICAgICAgIGlmIChEb21FYXNlRWxlbWVudC5lbGVtZW50Ll9fZG9tRWFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIERvbUVhc2VFbGVtZW50LmVsZW1lbnQuX19kb21FYXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZnJhbWU7IHRoaXMgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgaWYgc3RhcnQoKSBpcyB1c2VkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWxhcHNlZCB0aW1lIGluIG1zXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS51cGRhdGUoZWxhcHNlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKCF0aGlzLmVtcHR5ICYmIEFycmF5LmtleXModGhpcy5saXN0KS5sZW5ndGggPT09IDAgJiYgIXRoaXMuZW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBlbGVtZW50cyBiZWluZyBEb21FYXNlRWxlbWVudGRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvdW50RWxlbWVudHMoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgYWN0aXZlIGFuaW1hdGlvbnMgYWNyb3NzIGFsbCBlbGVtZW50c1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgY291bnRSdW5uaW5nKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5saXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY291bnQgKz0gT2JqZWN0LmtleXMoZW50cnkpIC0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB2YXJcclxuICAgICAqL1xyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zIGZvciBhIERPTSBlbGVtZW50XHJcbiAqIEBldmVudCBEb21FYXNlI2NvbXBsZXRlXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyBvbiBlYWNoIGxvb3AgZm9yIGEgRE9NIGVsZW1lbnQgd2hlcmUgdGhlcmUgYXJlIGFuaW1hdGlvbnNcclxuICogQGV2ZW50IERvbUVhc2UjZWFjaFxyXG4gKiBAdHlwZSB7RG9tRWFzZX1cclxuICovXHJcblxyXG4vKipcclxuICogQGV4dGVybmFsIEV2ZW50RW1pdHRlclxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZSJdfQ==