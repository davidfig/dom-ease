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
     * @param {boolean} [options.pauseOnBlur] pause timer on blur, resume on focus
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
        if (options.pauseOnBlur) {
            window.addEventListener('blur', function () {
                return _this.blur();
            });
            window.addEventListener('focus', function () {
                return _this.focus();
            });
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
                this.running = true;
            }
        }
    }, {
        key: 'blur',
        value: function blur() {
            if (this.running) {
                this.stop();
                this.running = true;
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            if (this.running) {
                this.start();
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
                this.running = false;
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

module.exports = DomEase;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJEb21FYXNlRWxlbWVudCIsIkRvbUVhc2UiLCJvcHRpb25zIiwiZHVyYXRpb24iLCJlYXNlIiwibGluZWFyIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJwYXVzZU9uQmx1ciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJibHVyIiwiZm9jdXMiLCJfcmVxdWVzdGVkIiwibG9vcCIsInJ1bm5pbmciLCJzdG9wIiwidGltZSIsImVsYXBzZWQiLCJfbGFzdCIsInVwZGF0ZSIsIl9yZXF1ZXN0SWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImVsZW1lbnQiLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwibGVuZ3RoIiwiYWRkIiwiX19kb21FYXNlIiwiZG9tRWFzZSIsInB1c2giLCJvYmplY3QiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJwb3AiLCJfaSIsImVtaXQiLCJrZXlzIiwiY291bnQiLCJlbnRyeSIsIk9iamVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLFFBQVIsQ0FBZjtBQUNBLElBQU1FLFNBQVNGLFFBQVEsUUFBUixDQUFmOztBQUVBLElBQU1HLGlCQUFpQkgsUUFBUSxlQUFSLENBQXZCOztBQUVBOzs7Ozs7Ozs7OztJQVVNSSxPOzs7QUFFRjs7Ozs7Ozs7O0FBU0EscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7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QUFhUixNQUFiLENBQW9CRixPQUFwQixDQUFKLEVBQ0E7QUFDSSx5QkFBS2QsSUFBTCxDQUFVaUMsTUFBVixDQUFpQlQsQ0FBakIsRUFBb0IsQ0FBcEI7QUFDQUE7QUFDQVc7QUFDSDtBQUNKO0FBQ0QsaUJBQUtDLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkMsS0FBTixJQUFlcUIsTUFBTWUsSUFBTixDQUFXLEtBQUtyQyxJQUFoQixFQUFzQnlCLE1BQXRCLEtBQWlDLENBQWhELElBQXFELENBQUMsS0FBS3hCLEtBQS9ELEVBQ0E7QUFDSSxxQkFBS21DLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EscUJBQUtuQyxLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7d0NBS0E7QUFDSSxtQkFBTyxLQUFLRCxJQUFMLENBQVV5QixNQUFqQjtBQUNIOztBQUVEOzs7Ozs7O3VDQUtBO0FBQ0ksZ0JBQUlhLFFBQVEsQ0FBWjtBQURKO0FBQUE7QUFBQTs7QUFBQTtBQUVJLHFDQUFrQixLQUFLdEMsSUFBdkIsOEhBQ0E7QUFBQSx3QkFEU3VDLEtBQ1Q7O0FBQ0lELDZCQUFTRSxPQUFPSCxJQUFQLENBQVlFLEtBQVosSUFBcUIsQ0FBOUI7QUFDSDtBQUxMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTUksbUJBQU9ELEtBQVA7QUFDSDs7OztFQTVOaUJoRCxZOztBQStOdEI7Ozs7OztBQU1BOzs7Ozs7QUFNQW1ELE9BQU9DLE9BQVAsR0FBaUIvQyxPQUFqQiIsImZpbGUiOiJlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcbmNvbnN0IFBlbm5lciA9IHJlcXVpcmUoJ3Blbm5lcicpXHJcbmNvbnN0IGV4aXN0cyA9IHJlcXVpcmUoJ2V4aXN0cycpXHJcblxyXG5jb25zdCBEb21FYXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vZWFzZUVsZW1lbnQnKVxyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWxsIGFuaW1hdGlvbnMgcnVubmluZyBvbiBET00gb2JqZWN0c1xyXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICogQGV4YW1wbGVcclxuICogdmFyIEVhc2UgPSByZXF1aXJlKCdkb20tZWFzZScpO1xyXG4gKiB2YXIgZWFzZSA9IG5ldyBFYXNlKHsgZHVyYXRpb246IDMwMDAsIGVhc2U6ICdlYXNlSW5PdXRTaW5lJyB9KTtcclxuICpcclxuICogdmFyIHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpXHJcbiAqIGVhc2UuYWRkKHRlc3QsIHsgbGVmdDogMjAsIHRvcDogMTUsIG9wYWNpdHk6IDAuMjUgfSwgeyByZXBlYXQ6IHRydWUsIHJldmVyc2U6IHRydWUgfSlcclxuICovXHJcbmNsYXNzIERvbUVhc2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MTAwMF0gZGVmYXVsdCBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZT1wZW5uZXIubGluZWFyXSBkZWZhdWx0IGVhc2VcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmF1dG9zdGFydD10cnVlXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wYXVzZU9uQmx1cl0gcGF1c2UgdGltZXIgb24gYmx1ciwgcmVzdW1lIG9uIGZvY3VzXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZSNjb21wbGV0ZVxyXG4gICAgICogQGZpcmVzIERvbUVhc2UjZWFjaFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uIHx8IDEwMDBcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IHRoaXMub3B0aW9ucy5lYXNlIHx8IFBlbm5lci5saW5lYXJcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmF1dG9zdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5wYXVzZU9uQmx1cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4gdGhpcy5ibHVyKCkpXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsICgpID0+IHRoaXMuZm9jdXMoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdGFydCBhbmltYXRpb24gbG9vcFxyXG4gICAgICogYWx0ZXJuYXRpdmVseSwgeW91IGNhbiBtYW51YWxseSBjYWxsIHVwZGF0ZSgpIG9uIGVhY2ggbG9vcFxyXG4gICAgICovXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubG9vcCgpXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmx1cigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9vcCh0aW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRoaXMuX2xhc3QgPyB0aW1lIC0gdGhpcy5fbGFzdCA6IDBcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoZWxhcHNlZClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IHRpbWVcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0SWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB0aGlzLmxvb3AodGltZSkpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdG9wIGFuaW1hdGlvbiBsb29wXHJcbiAgICAgKi9cclxuICAgIHN0b3AoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmVxdWVzdElkKVxyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhbmltYXRpb24ocykgdG8gYSBET00gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8SFRNTEVsZW1lbnRbXSl9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmxlZnRdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnRvcF0gdXNlcyBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmhlaWdodF0gdXNlcyBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVhdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVldXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5vcGFjaXR5XVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuY29sb3JdXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5iYWNrZ3JvdW5kQ29sb3JdXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb25dXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5lYXNlXVxyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXBlYXRdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJldmVyc2VdXHJcbiAgICAgKiBAcmV0dXJucyB7RG9tRWFzZUVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIGFkZChlbGVtZW50LCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY2FsbCBhZGQgb24gYWxsIGVsZW1lbnRzIGlmIGFycmF5XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnQubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSBlbGVtZW50Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGVsZW1lbnRbaV0sIHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChlbGVtZW50W2ldLCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCB1cCBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBleGlzdHMob3B0aW9ucy5kdXJhdGlvbikgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5vcHRpb25zLmR1cmF0aW9uXHJcbiAgICAgICAgb3B0aW9ucy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IHRoaXMub3B0aW9ucy5lYXNlXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVhc2UgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lYXNlID0gUGVubmVyW29wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50Ll9fZG9tRWFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX19kb21FYXNlLmFkZChwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvbUVhc2UgPSBlbGVtZW50Ll9fZG9tRWFzZSA9IG5ldyBEb21FYXNlRWxlbWVudChlbGVtZW50KVxyXG4gICAgICAgICAgICBkb21FYXNlLmFkZChwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGRvbUVhc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbGVtZW50Ll9fZG9tRWFzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFuaW1hdGlvbihzKVxyXG4gICAgICogQHBhcmFtIHsoQW5pbWF0aW9ufEhUTUxFbGVtZW50KX0gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShvYmplY3QpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG9iamVjdC5fX2RvbUVhc2UgPyBvYmplY3QuX19kb21FYXNlLmVsZW1lbnQgOiBvYmplY3RcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKGVsZW1lbnQpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50Ll9fZG9tRWFzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBhbmltYXRpb25zIGZyb20gbGlzdFxyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmxpc3QubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgRG9tRWFzZUVsZW1lbnQgPSB0aGlzLmxpc3QucG9wKClcclxuICAgICAgICAgICAgaWYgKERvbUVhc2VFbGVtZW50LmVsZW1lbnQuX19kb21FYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgRG9tRWFzZUVsZW1lbnQuZWxlbWVudC5fX2RvbUVhc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBmcmFtZTsgdGhpcyBpcyBjYWxsZWQgYXV0b21hdGljYWxseSBpZiBzdGFydCgpIGlzIHVzZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFwc2VkIHRpbWUgaW4gbXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAoIXRoaXMuZW1wdHkgJiYgQXJyYXkua2V5cyh0aGlzLmxpc3QpLmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5lbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGVsZW1lbnRzIGJlaW5nIERvbUVhc2VFbGVtZW50ZFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgY291bnRFbGVtZW50cygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBhY3RpdmUgYW5pbWF0aW9ucyBhY3Jvc3MgYWxsIGVsZW1lbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBjb3VudFJ1bm5pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLmxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb3VudCArPSBPYmplY3Qua2V5cyhlbnRyeSkgLSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zIGZvciBhIERPTSBlbGVtZW50XHJcbiAqIEBldmVudCBEb21FYXNlI2NvbXBsZXRlXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyBvbiBlYWNoIGxvb3AgZm9yIGEgRE9NIGVsZW1lbnQgd2hlcmUgdGhlcmUgYXJlIGFuaW1hdGlvbnNcclxuICogQGV2ZW50IERvbUVhc2UjZWFjaFxyXG4gKiBAdHlwZSB7RG9tRWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvbUVhc2UiXX0=