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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJEb21FYXNlRWxlbWVudCIsIkRvbUVhc2UiLCJvcHRpb25zIiwiZHVyYXRpb24iLCJlYXNlIiwibGluZWFyIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJfcmVxdWVzdGVkIiwibG9vcCIsInRpbWUiLCJlbGFwc2VkIiwiX2xhc3QiLCJ1cGRhdGUiLCJfcmVxdWVzdElkIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJlbGVtZW50IiwicGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsImFkZCIsIl9fZG9tRWFzZSIsImRvbUVhc2UiLCJwdXNoIiwib2JqZWN0IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwicG9wIiwiX2kiLCJlbWl0Iiwia2V5cyIsImNvdW50IiwiZW50cnkiLCJPYmplY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7QUFDQSxJQUFNRSxTQUFTRixRQUFRLFFBQVIsQ0FBZjs7QUFFQSxJQUFNRyxpQkFBaUJILFFBQVEsZUFBUixDQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7SUFVTUksTzs7O0FBRUY7Ozs7Ozs7O0FBUUEscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7QUFDQSxjQUFLRCxPQUFMLENBQWFFLElBQWIsR0FBb0IsTUFBS0YsT0FBTCxDQUFhRSxJQUFiLElBQXFCTixPQUFP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QUE7O0FBQUE7QUFFSSxxQ0FBa0IsS0FBS2hDLElBQXZCLDhIQUNBO0FBQUEsd0JBRFNpQyxLQUNUOztBQUNJRCw2QkFBU0UsT0FBT0gsSUFBUCxDQUFZRSxLQUFaLElBQXFCLENBQTlCO0FBQ0g7QUFMTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1JLG1CQUFPRCxLQUFQO0FBQ0g7Ozs7RUFuTWlCMUMsWTs7QUFzTXRCOzs7Ozs7QUFNQTs7Ozs7O0FBTUE2QyxPQUFPQyxPQUFQLEdBQWlCekMsT0FBakIiLCJmaWxlIjoiZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBQZW5uZXIgPSByZXF1aXJlKCdwZW5uZXInKVxyXG5jb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxuY29uc3QgRG9tRWFzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Vhc2VFbGVtZW50JylcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGFsbCBhbmltYXRpb25zIHJ1bm5pbmcgb24gRE9NIG9iamVjdHNcclxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBFYXNlID0gcmVxdWlyZSgnZG9tLWVhc2UnKTtcclxuICogdmFyIGVhc2UgPSBuZXcgRWFzZSh7IGR1cmF0aW9uOiAzMDAwLCBlYXNlOiAnZWFzZUluT3V0U2luZScgfSk7XHJcbiAqXHJcbiAqIHZhciB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxyXG4gKiBlYXNlLmFkZCh0ZXN0LCB7IGxlZnQ6IDIwLCB0b3A6IDE1LCBvcGFjaXR5OiAwLjI1IH0sIHsgcmVwZWF0OiB0cnVlLCByZXZlcnNlOiB0cnVlIH0pXHJcbiAqL1xyXG5jbGFzcyBEb21FYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIGRlZmF1bHQgZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2U9cGVubmVyLmxpbmVhcl0gZGVmYXVsdCBlYXNlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5hdXRvc3RhcnQ9dHJ1ZV1cclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2NvbXBsZXRlXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZSNlYWNoXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gdGhpcy5vcHRpb25zLmVhc2UgfHwgUGVubmVyLmxpbmVhclxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICBpZiAoIW9wdGlvbnMuYXV0b3N0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RhcnQgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqIGFsdGVybmF0aXZlbHksIHlvdSBjYW4gbWFudWFsbHkgY2FsbCB1cGRhdGUoKSBvbiBlYWNoIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmxvb3AoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb29wKHRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gdGhpcy5fbGFzdCA/IHRpbWUgLSB0aGlzLl9sYXN0IDogMFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShlbGFwc2VkKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0ID0gdGltZVxyXG4gICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMubG9vcCh0aW1lKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0b3AgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yZXF1ZXN0SWQpXHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGFuaW1hdGlvbihzKSB0byBhIERPTSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxIVE1MRWxlbWVudFtdKX0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcmFtc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMubGVmdF0gdXNlcyBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy53aWR0aF0gdXNlcyBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuaGVpZ2h0XSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEByZXR1cm5zIHtEb21FYXNlRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgYWRkKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICAvLyBjYWxsIGFkZCBvbiBhbGwgZWxlbWVudHMgaWYgYXJyYXlcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGVsZW1lbnQubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoZWxlbWVudFtpXSwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKGVsZW1lbnRbaV0sIHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0IHVwIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICAgICAgb3B0aW9ucy5kdXJhdGlvbiA9IGV4aXN0cyhvcHRpb25zLmR1cmF0aW9uKSA/IG9wdGlvbnMuZHVyYXRpb24gOiB0aGlzLm9wdGlvbnMuZHVyYXRpb25cclxuICAgICAgICBvcHRpb25zLmVhc2UgPSBvcHRpb25zLmVhc2UgfHwgdGhpcy5vcHRpb25zLmVhc2VcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWFzZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcHRpb25zLmVhc2UgPSBQZW5uZXJbb3B0aW9ucy5lYXNlXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuX19kb21FYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudC5fX2RvbUVhc2UuYWRkKHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZG9tRWFzZSA9IGVsZW1lbnQuX19kb21FYXNlID0gbmV3IERvbUVhc2VFbGVtZW50KGVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvbUVhc2UuYWRkKHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZG9tRWFzZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuX19kb21FYXNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYW5pbWF0aW9uKHMpXHJcbiAgICAgKiBAcGFyYW0geyhBbmltYXRpb258SFRNTEVsZW1lbnQpfSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKG9iamVjdClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gb2JqZWN0Ll9fZG9tRWFzZSA/IG9iamVjdC5fX2RvbUVhc2UuZWxlbWVudCA6IG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2YoZWxlbWVudClcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuX19kb21FYXNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGFuaW1hdGlvbnMgZnJvbSBsaXN0XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubGlzdC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBEb21FYXNlRWxlbWVudCA9IHRoaXMubGlzdC5wb3AoKVxyXG4gICAgICAgICAgICBpZiAoRG9tRWFzZUVsZW1lbnQuZWxlbWVudC5fX2RvbUVhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBEb21FYXNlRWxlbWVudC5lbGVtZW50Ll9fZG9tRWFzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGZyYW1lOyB0aGlzIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGlmIHN0YXJ0KCkgaXMgdXNlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVsYXBzZWQgdGltZSBpbiBtc1xyXG4gICAgICovXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaV0udXBkYXRlKGVsYXBzZWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS1cclxuICAgICAgICAgICAgICAgIF9pLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCB0aGlzKVxyXG4gICAgICAgIGlmICghdGhpcy5lbXB0eSAmJiBBcnJheS5rZXlzKHRoaXMubGlzdCkubGVuZ3RoID09PSAwICYmICF0aGlzLmVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgZWxlbWVudHMgYmVpbmcgRG9tRWFzZUVsZW1lbnRkXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBjb3VudEVsZW1lbnRzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGFjdGl2ZSBhbmltYXRpb25zIGFjcm9zcyBhbGwgZWxlbWVudHNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvdW50UnVubmluZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMubGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvdW50ICs9IE9iamVjdC5rZXlzKGVudHJ5KSAtIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGFuaW1hdGlvbnMgZm9yIGEgRE9NIGVsZW1lbnRcclxuICogQGV2ZW50IERvbUVhc2UjY29tcGxldGVcclxuICogQHR5cGUge0RvbUVhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIG9uIGVhY2ggbG9vcCBmb3IgYSBET00gZWxlbWVudCB3aGVyZSB0aGVyZSBhcmUgYW5pbWF0aW9uc1xyXG4gKiBAZXZlbnQgRG9tRWFzZSNlYWNoXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZSJdfQ==