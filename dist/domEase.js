'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');
var Penner = require('penner');
var exists = require('exists');

var Ease = require('./ease');

/**
 * Manages all eases
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
     * @fires DomEase#each
     * @fires DomEase#complete
     */
    function DomEase(options) {
        _classCallCheck(this, DomEase);

        var _this = _possibleConstructorReturn(this, (DomEase.__proto__ || Object.getPrototypeOf(DomEase)).call(this));

        _this.options = options || {};
        _this.options.duration = _this.options.duration || 1000;
        _this.options.ease = _this.options.ease || Penner.linear;
        _this.list = [];
        _this.empty = true;
        if (!_this.options.autostart) {
            _this.start();
        }
        if (_this.options.pauseOnBlur) {
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
     * start animation loop (automatically called unless options.autostart=false)
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
         * add eases
         * @param {HTMLElement} element
         * @param {object} params
         * @param {number} [params.left] in px
         * @param {number} [params.top] in px
         * @param {number} [params.width] in px
         * @param {number} [params.height] in px
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
         * @returns {Ease}
         */

    }, {
        key: 'add',
        value: function add(element, params, options) {
            // set up default options
            options = options || {};
            options.duration = exists(options.duration) ? options.duration : this.options.duration;
            options.ease = options.ease || this.options.ease;
            if (typeof options.ease === 'string') {
                options.ease = Penner[options.ease];
            }
            var ease = new Ease(element, params, options);
            this.list.push(ease);
            return ease;
        }

        /**
         * remove all eases on element
         * @param {HTMLElement} element
         */

    }, {
        key: 'removeObjectEases',
        value: function removeObjectEases(element) {
            var list = this.list;
            for (var i = 0, _i = list.length; i < _i; i++) {
                var ease = list[i];
                if (ease.element === element) {
                    list.splice(i, 1);
                    i--;
                    _i--;
                }
            }
        }

        /**
         * remove eases using Ease object returned by add()
         * @param {Ease} ease
         */

    }, {
        key: 'remove',
        value: function remove(ease) {
            var list = this.list;
            for (var i = 0, _i = list.length; i < _i; i++) {
                if (list[i] === ease) {
                    list.splice(i, 1);
                    return;
                }
            }
        }

        /**
         * remove all eases
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            this.list = [];
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
            if (!this.empty && this.list.length === 0) {
                this.emit('done', this);
                this.empty = true;
            }
        }

        /**
         * number of eases
         * @returns {number}
         */

    }, {
        key: 'getCount',
        value: function getCount() {
            return this.list.length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb21FYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJFYXNlIiwiRG9tRWFzZSIsIm9wdGlvbnMiLCJkdXJhdGlvbiIsImVhc2UiLCJsaW5lYXIiLCJsaXN0IiwiZW1wdHkiLCJhdXRvc3RhcnQiLCJzdGFydCIsInBhdXNlT25CbHVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsdXIiLCJmb2N1cyIsIl9yZXF1ZXN0ZWQiLCJsb29wIiwicnVubmluZyIsInN0b3AiLCJ0aW1lIiwiZWxhcHNlZCIsIl9sYXN0IiwidXBkYXRlIiwiX3JlcXVlc3RJZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsInBhcmFtcyIsInB1c2giLCJpIiwiX2kiLCJsZW5ndGgiLCJzcGxpY2UiLCJlbWl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLGVBQWVDLFFBQVEsZUFBUixDQUFyQjtBQUNBLElBQU1DLFNBQVNELFFBQVEsUUFBUixDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUcsT0FBT0gsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7O0lBVU1JLE87OztBQUVGOzs7Ozs7Ozs7QUFTQSxxQkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBQUE7O0FBRUksY0FBS0EsT0FBTCxHQUFlQSxXQUFXLEVBQTFCO0FBQ0EsY0FBS0EsT0FBTCxDQUFhQyxRQUFiLEdBQXdCLE1BQUtELE9BQUwsQ0FBYUMsUUFBYixJQUF5QixJQUFqRDtBQUNBLGNBQUtELE9BQUwsQ0FBYUUsSUFBYixHQUFvQixNQUFLRixPQUFMLENBQWFFLElBQWIsSUFBcUJOLE9BQU9PLE1BQWhEO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxjQUFLQyxLQUFMLEdBQWEs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dHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBQZW5uZXIgPSByZXF1aXJlKCdwZW5uZXInKVxyXG5jb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxuY29uc3QgRWFzZSA9IHJlcXVpcmUoJy4vZWFzZScpXHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhbGwgZWFzZXNcclxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBFYXNlID0gcmVxdWlyZSgnZG9tLWVhc2UnKTtcclxuICogdmFyIGVhc2UgPSBuZXcgRWFzZSh7IGR1cmF0aW9uOiAzMDAwLCBlYXNlOiAnZWFzZUluT3V0U2luZScgfSk7XHJcbiAqXHJcbiAqIHZhciB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxyXG4gKiBlYXNlLmFkZCh0ZXN0LCB7IGxlZnQ6IDIwLCB0b3A6IDE1LCBvcGFjaXR5OiAwLjI1IH0sIHsgcmVwZWF0OiB0cnVlLCByZXZlcnNlOiB0cnVlIH0pXHJcbiAqL1xyXG5jbGFzcyBEb21FYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIGRlZmF1bHQgZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2U9cGVubmVyLmxpbmVhcl0gZGVmYXVsdCBlYXNlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5hdXRvc3RhcnQ9dHJ1ZV1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VPbkJsdXJdIHBhdXNlIHRpbWVyIG9uIGJsdXIsIHJlc3VtZSBvbiBmb2N1c1xyXG4gICAgICogQGZpcmVzIERvbUVhc2UjZWFjaFxyXG4gICAgICogQGZpcmVzIERvbUVhc2UjY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSB0aGlzLm9wdGlvbnMuZWFzZSB8fCBQZW5uZXIubGluZWFyXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF1dG9zdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhdXNlT25CbHVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB0aGlzLmJsdXIoKSlcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5mb2N1cygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IGFuaW1hdGlvbiBsb29wIChhdXRvbWF0aWNhbGx5IGNhbGxlZCB1bmxlc3Mgb3B0aW9ucy5hdXRvc3RhcnQ9ZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb29wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBibHVyKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb29wKHRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gdGhpcy5fbGFzdCA/IHRpbWUgLSB0aGlzLl9sYXN0IDogMFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShlbGFwc2VkKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0ID0gdGltZVxyXG4gICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMubG9vcCh0aW1lKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0b3AgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yZXF1ZXN0SWQpXHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGVhc2VzXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEByZXR1cm5zIHtFYXNlfVxyXG4gICAgICovXHJcbiAgICBhZGQoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHNldCB1cCBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBleGlzdHMob3B0aW9ucy5kdXJhdGlvbikgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5vcHRpb25zLmR1cmF0aW9uXHJcbiAgICAgICAgb3B0aW9ucy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IHRoaXMub3B0aW9ucy5lYXNlXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVhc2UgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lYXNlID0gUGVubmVyW29wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IG5ldyBFYXNlKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlYXNlKVxyXG4gICAgICAgIHJldHVybiBlYXNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGVhc2VzIG9uIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlT2JqZWN0RWFzZXMoZWxlbWVudClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgaWYgKGVhc2UuZWxlbWVudCA9PT0gZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGVhc2VzIHVzaW5nIEVhc2Ugb2JqZWN0IHJldHVybmVkIGJ5IGFkZCgpXHJcbiAgICAgKiBAcGFyYW0ge0Vhc2V9IGVhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldID09PSBlYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGVhc2VzXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBmcmFtZTsgdGhpcyBpcyBjYWxsZWQgYXV0b21hdGljYWxseSBpZiBzdGFydCgpIGlzIHVzZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFwc2VkIHRpbWUgaW4gbXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAoIXRoaXMuZW1wdHkgJiYgdGhpcy5saXN0Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGVhc2VzXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRDb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGhcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGZpcmVzIHdoZW4gdGhlcmUgYXJlIG5vIG1vcmUgYW5pbWF0aW9ucyBmb3IgYSBET00gZWxlbWVudFxyXG4gKiBAZXZlbnQgRG9tRWFzZSNjb21wbGV0ZVxyXG4gKiBAdHlwZSB7RG9tRWFzZX1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIGZvciBhIERPTSBlbGVtZW50IHdoZXJlIHRoZXJlIGFyZSBhbmltYXRpb25zXHJcbiAqIEBldmVudCBEb21FYXNlI2VhY2hcclxuICogQHR5cGUge0RvbUVhc2V9XHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb21FYXNlIl19