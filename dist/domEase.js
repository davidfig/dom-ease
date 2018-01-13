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
            this.list.push(new Ease(element, params, options));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb21FYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJFYXNlIiwiRG9tRWFzZSIsIm9wdGlvbnMiLCJkdXJhdGlvbiIsImVhc2UiLCJsaW5lYXIiLCJsaXN0IiwiZW1wdHkiLCJhdXRvc3RhcnQiLCJzdGFydCIsInBhdXNlT25CbHVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsdXIiLCJmb2N1cyIsIl9yZXF1ZXN0ZWQiLCJsb29wIiwicnVubmluZyIsInN0b3AiLCJ0aW1lIiwiZWxhcHNlZCIsIl9sYXN0IiwidXBkYXRlIiwiX3JlcXVlc3RJZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsInBhcmFtcyIsInB1c2giLCJpIiwiX2kiLCJsZW5ndGgiLCJzcGxpY2UiLCJlbWl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLGVBQWVDLFFBQVEsZUFBUixDQUFyQjtBQUNBLElBQU1DLFNBQVNELFFBQVEsUUFBUixDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUcsT0FBT0gsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7O0lBVU1JLE87OztBQUVGOzs7Ozs7Ozs7QUFTQSxxQkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBQUE7O0FBRUksY0FBS0EsT0FBTCxHQUFlQSxXQUFXLEVBQTFCO0FBQ0EsY0FBS0EsT0FBTCxDQUFhQyxRQUFiLEdBQXdCLE1BQUtELE9BQUwsQ0FBYUMsUUFBYixJQUF5QixJQUFqRDtBQUNBLGNBQUtELE9BQUwsQ0FBYUUsSUFBYixHQUFvQixNQUFLRixPQUFMLENBQWFFLElBQWIsSUFBcUJOLE9BQU9PLE1BQWhEO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxjQUFLQyxLQUFMLEdBQWEs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LE1BQTFCLEVBQWtDRixJQUFJQyxFQUF0QyxFQUEwQ0QsR0FBMUMsRUFDQTtBQUNJLG9CQUFJdkIsS0FBS3VCLENBQUwsTUFBWXpCLElBQWhCLEVBQ0E7QUFDSUUseUJBQUswQixNQUFMLENBQVlILENBQVosRUFBZSxDQUFmO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7Ozs7OztvQ0FJQTtBQUNJLGlCQUFLdkIsSUFBTCxHQUFZLEVBQVo7QUFDSDs7QUFFRDs7Ozs7OzsrQkFJT2MsTyxFQUNQO0FBQ0ksaUJBQUssSUFBSVMsSUFBSSxDQUFSLEVBQVdDLEtBQUssS0FBS3hCLElBQUwsQ0FBVXlCLE1BQS9CLEVBQXVDRixJQUFJQyxFQUEzQyxFQUErQ0QsR0FBL0MsRUFDQTtBQUNJLG9CQUFJLEtBQUt2QixJQUFMLENBQVV1QixDQUFWLEVBQWFQLE1BQWIsQ0FBb0JGLE9BQXBCLENBQUosRUFDQTtBQUNJLHlCQUFLZCxJQUFMLENBQVUwQixNQUFWLENBQWlCSCxDQUFqQixFQUFvQixDQUFwQjtBQUNBQTtBQUNBQztBQUNIO0FBQ0o7QUFDRCxpQkFBS0csSUFBTCxDQUFVLE1BQVYsRUFBa0IsSUFBbEI7QUFDQSxnQkFBSSxDQUFDLEtBQUsxQixLQUFOLElBQWUsS0FBS0QsSUFBTCxDQUFVeUIsTUFBVixLQUFxQixDQUF4QyxFQUNBO0FBQ0kscUJBQUtFLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EscUJBQUsxQixLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7bUNBS0E7QUFDSSxtQkFBTyxLQUFLRCxJQUFMLENBQVV5QixNQUFqQjtBQUNIOzs7O0VBaE1pQm5DLFk7O0FBbU10Qjs7Ozs7O0FBTUE7Ozs7OztBQU1Bc0MsT0FBT0MsT0FBUCxHQUFpQmxDLE9BQWpCIiwiZmlsZSI6ImRvbUVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJylcclxuY29uc3QgUGVubmVyID0gcmVxdWlyZSgncGVubmVyJylcclxuY29uc3QgZXhpc3RzID0gcmVxdWlyZSgnZXhpc3RzJylcclxuXHJcbmNvbnN0IEVhc2UgPSByZXF1aXJlKCcuL2Vhc2UnKVxyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWxsIGVhc2VzXHJcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgRWFzZSA9IHJlcXVpcmUoJ2RvbS1lYXNlJyk7XHJcbiAqIHZhciBlYXNlID0gbmV3IEVhc2UoeyBkdXJhdGlvbjogMzAwMCwgZWFzZTogJ2Vhc2VJbk91dFNpbmUnIH0pO1xyXG4gKlxyXG4gKiB2YXIgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0JylcclxuICogZWFzZS5hZGQodGVzdCwgeyBsZWZ0OiAyMCwgdG9wOiAxNSwgb3BhY2l0eTogMC4yNSB9LCB7IHJlcGVhdDogdHJ1ZSwgcmV2ZXJzZTogdHJ1ZSB9KVxyXG4gKi9cclxuY2xhc3MgRG9tRWFzZSBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDAwXSBkZWZhdWx0IGR1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5lYXNlPXBlbm5lci5saW5lYXJdIGRlZmF1bHQgZWFzZVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuYXV0b3N0YXJ0PXRydWVdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBhdXNlT25CbHVyXSBwYXVzZSB0aW1lciBvbiBibHVyLCByZXN1bWUgb24gZm9jdXNcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2VhY2hcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gdGhpcy5vcHRpb25zLmVhc2UgfHwgUGVubmVyLmxpbmVhclxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICBpZiAoIW9wdGlvbnMuYXV0b3N0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdXNlT25CbHVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB0aGlzLmJsdXIoKSlcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5mb2N1cygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IGFuaW1hdGlvbiBsb29wIChhdXRvbWF0aWNhbGx5IGNhbGxlZCB1bmxlc3Mgb3B0aW9ucy5hdXRvc3RhcnQ9ZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb29wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBibHVyKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb29wKHRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gdGhpcy5fbGFzdCA/IHRpbWUgLSB0aGlzLl9sYXN0IDogMFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShlbGFwc2VkKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0ID0gdGltZVxyXG4gICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMubG9vcCh0aW1lKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0b3AgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yZXF1ZXN0SWQpXHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGVhc2VzXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEByZXR1cm5zIHtFYXNlfVxyXG4gICAgICovXHJcbiAgICBhZGQoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHNldCB1cCBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSBleGlzdHMob3B0aW9ucy5kdXJhdGlvbikgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5vcHRpb25zLmR1cmF0aW9uXHJcbiAgICAgICAgb3B0aW9ucy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IHRoaXMub3B0aW9ucy5lYXNlXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVhc2UgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lYXNlID0gUGVubmVyW29wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IEVhc2UoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgZWFzZXMgb24gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICByZW1vdmVPYmplY3RFYXNlcyhlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSBsaXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlYXNlID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBpZiAoZWFzZS5lbGVtZW50ID09PSBlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgZWFzZXMgdXNpbmcgRWFzZSBvYmplY3QgcmV0dXJuZWQgYnkgYWRkKClcclxuICAgICAqIEBwYXJhbSB7RWFzZX0gZWFzZVxyXG4gICAgICovXHJcbiAgICByZW1vdmUoZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGVhc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgZWFzZXNcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGZyYW1lOyB0aGlzIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGlmIHN0YXJ0KCkgaXMgdXNlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVsYXBzZWQgdGltZSBpbiBtc1xyXG4gICAgICovXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaV0udXBkYXRlKGVsYXBzZWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS1cclxuICAgICAgICAgICAgICAgIF9pLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCB0aGlzKVxyXG4gICAgICAgIGlmICghdGhpcy5lbXB0eSAmJiB0aGlzLmxpc3QubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgZWFzZXNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldENvdW50KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zIGZvciBhIERPTSBlbGVtZW50XHJcbiAqIEBldmVudCBEb21FYXNlI2NvbXBsZXRlXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyBvbiBlYWNoIGxvb3AgZm9yIGEgRE9NIGVsZW1lbnQgd2hlcmUgdGhlcmUgYXJlIGFuaW1hdGlvbnNcclxuICogQGV2ZW50IERvbUVhc2UjZWFjaFxyXG4gKiBAdHlwZSB7RG9tRWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvbUVhc2UiXX0=