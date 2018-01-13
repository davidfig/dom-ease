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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb21FYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJFYXNlIiwiRG9tRWFzZSIsIm9wdGlvbnMiLCJkdXJhdGlvbiIsImVhc2UiLCJsaW5lYXIiLCJsaXN0IiwiZW1wdHkiLCJhdXRvc3RhcnQiLCJzdGFydCIsInBhdXNlT25CbHVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsdXIiLCJmb2N1cyIsIl9yZXF1ZXN0ZWQiLCJsb29wIiwicnVubmluZyIsInN0b3AiLCJ0aW1lIiwiZWxhcHNlZCIsIl9sYXN0IiwidXBkYXRlIiwiX3JlcXVlc3RJZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZWxlbWVudCIsInBhcmFtcyIsInB1c2giLCJpIiwiX2kiLCJsZW5ndGgiLCJzcGxpY2UiLCJlbWl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLGVBQWVDLFFBQVEsZUFBUixDQUFyQjtBQUNBLElBQU1DLFNBQVNELFFBQVEsUUFBUixDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUcsT0FBT0gsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7O0lBVU1JLE87OztBQUVGOzs7Ozs7Ozs7QUFTQSxxQkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBQUE7O0FBRUksY0FBS0EsT0FBTCxHQUFlQSxXQUFXLEVBQTFCO0FBQ0EsY0FBS0EsT0FBTCxDQUFhQyxRQUFiLEdBQXdCLE1BQUtELE9BQUwsQ0FBYUMsUUFBYixJQUF5QixJQUFqRDtBQUNBLGNBQUtELE9BQUwsQ0FBYUUsSUFBYixHQUFvQixNQUFLRixPQUFMLENBQWFFLElBQWIsSUFBcUJOLE9BQU9PLE1BQWhEO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxjQUFLQyxLQUFMLEdBQWEs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QUFLLElBQUl1QixJQUFJLENBQVIsRUFBV0MsS0FBS3hCLEtBQUt5QixNQUExQixFQUFrQ0YsSUFBSUMsRUFBdEMsRUFBMENELEdBQTFDLEVBQ0E7QUFDSSxvQkFBSXZCLEtBQUt1QixDQUFMLE1BQVl6QixJQUFoQixFQUNBO0FBQ0lFLHlCQUFLMEIsTUFBTCxDQUFZSCxDQUFaLEVBQWUsQ0FBZjtBQUNBO0FBQ0g7QUFDSjtBQUNKOztBQUVEOzs7Ozs7b0NBSUE7QUFDSSxpQkFBS3ZCLElBQUwsR0FBWSxFQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs7K0JBSU9jLE8sRUFDUDtBQUNJLGlCQUFLLElBQUlTLElBQUksQ0FBUixFQUFXQyxLQUFLLEtBQUt4QixJQUFMLENBQVV5QixNQUEvQixFQUF1Q0YsSUFBSUMsRUFBM0MsRUFBK0NELEdBQS9DLEVBQ0E7QUFDSSxvQkFBSSxLQUFLdkIsSUFBTCxDQUFVdUIsQ0FBVixFQUFhUCxNQUFiLENBQW9CRixPQUFwQixDQUFKLEVBQ0E7QUFDSSx5QkFBS2QsSUFBTCxDQUFVMEIsTUFBVixDQUFpQkgsQ0FBakIsRUFBb0IsQ0FBcEI7QUFDQUE7QUFDQUM7QUFDSDtBQUNKO0FBQ0QsaUJBQUtHLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLMUIsS0FBTixJQUFlLEtBQUtELElBQUwsQ0FBVXlCLE1BQVYsS0FBcUIsQ0FBeEMsRUFDQTtBQUNJLHFCQUFLRSxJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQjtBQUNBLHFCQUFLMUIsS0FBTCxHQUFhLElBQWI7QUFDSDtBQUNKOztBQUVEOzs7Ozs7O21DQUtBO0FBQ0ksbUJBQU8sS0FBS0QsSUFBTCxDQUFVeUIsTUFBakI7QUFDSDs7OztFQWxNaUJuQyxZOztBQXFNdEI7Ozs7OztBQU1BOzs7Ozs7QUFNQXNDLE9BQU9DLE9BQVAsR0FBaUJsQyxPQUFqQiIsImZpbGUiOiJkb21FYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcbmNvbnN0IFBlbm5lciA9IHJlcXVpcmUoJ3Blbm5lcicpXHJcbmNvbnN0IGV4aXN0cyA9IHJlcXVpcmUoJ2V4aXN0cycpXHJcblxyXG5jb25zdCBFYXNlID0gcmVxdWlyZSgnLi9lYXNlJylcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGFsbCBlYXNlc1xyXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICogQGV4YW1wbGVcclxuICogdmFyIEVhc2UgPSByZXF1aXJlKCdkb20tZWFzZScpO1xyXG4gKiB2YXIgZWFzZSA9IG5ldyBFYXNlKHsgZHVyYXRpb246IDMwMDAsIGVhc2U6ICdlYXNlSW5PdXRTaW5lJyB9KTtcclxuICpcclxuICogdmFyIHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpXHJcbiAqIGVhc2UuYWRkKHRlc3QsIHsgbGVmdDogMjAsIHRvcDogMTUsIG9wYWNpdHk6IDAuMjUgfSwgeyByZXBlYXQ6IHRydWUsIHJldmVyc2U6IHRydWUgfSlcclxuICovXHJcbmNsYXNzIERvbUVhc2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MTAwMF0gZGVmYXVsdCBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZT1wZW5uZXIubGluZWFyXSBkZWZhdWx0IGVhc2VcclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmF1dG9zdGFydD10cnVlXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wYXVzZU9uQmx1cl0gcGF1c2UgdGltZXIgb24gYmx1ciwgcmVzdW1lIG9uIGZvY3VzXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZSNlYWNoXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZSNjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmR1cmF0aW9uIHx8IDEwMDBcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IHRoaXMub3B0aW9ucy5lYXNlIHx8IFBlbm5lci5saW5lYXJcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmF1dG9zdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5wYXVzZU9uQmx1cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4gdGhpcy5ibHVyKCkpXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsICgpID0+IHRoaXMuZm9jdXMoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdGFydCBhbmltYXRpb24gbG9vcCAoYXV0b21hdGljYWxseSBjYWxsZWQgdW5sZXNzIG9wdGlvbnMuYXV0b3N0YXJ0PWZhbHNlKVxyXG4gICAgICovXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubG9vcCgpXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmx1cigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9vcCh0aW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRoaXMuX2xhc3QgPyB0aW1lIC0gdGhpcy5fbGFzdCA6IDBcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoZWxhcHNlZClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IHRpbWVcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0SWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB0aGlzLmxvb3AodGltZSkpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzdG9wIGFuaW1hdGlvbiBsb29wXHJcbiAgICAgKi9cclxuICAgIHN0b3AoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmVxdWVzdElkKVxyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBlYXNlc1xyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBhcmFtc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMubGVmdF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnRvcF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLndpZHRoXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuaGVpZ2h0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVhdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVldXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5vcGFjaXR5XVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuY29sb3JdXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5iYWNrZ3JvdW5kQ29sb3JdXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb25dXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5lYXNlXVxyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXBlYXRdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJldmVyc2VdXHJcbiAgICAgKiBAcmV0dXJucyB7RWFzZX1cclxuICAgICAqL1xyXG4gICAgYWRkKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICAvLyBzZXQgdXAgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBvcHRpb25zLmR1cmF0aW9uID0gZXhpc3RzKG9wdGlvbnMuZHVyYXRpb24pID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgIG9wdGlvbnMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lYXNlID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZWFzZSA9IFBlbm5lcltvcHRpb25zLmVhc2VdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVhc2UgPSBuZXcgRWFzZShlbGVtZW50LCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goZWFzZSlcclxuICAgICAgICByZXR1cm4gZWFzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBlYXNlcyBvbiBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZU9iamVjdEVhc2VzKGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChlYXNlLmVsZW1lbnQgPT09IGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS1cclxuICAgICAgICAgICAgICAgIF9pLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBlYXNlcyB1c2luZyBFYXNlIG9iamVjdCByZXR1cm5lZCBieSBhZGQoKVxyXG4gICAgICogQHBhcmFtIHtFYXNlfSBlYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShlYXNlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSBsaXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gZWFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBlYXNlc1xyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZnJhbWU7IHRoaXMgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgaWYgc3RhcnQoKSBpcyB1c2VkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWxhcHNlZCB0aW1lIGluIG1zXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS51cGRhdGUoZWxhcHNlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMubGlzdC5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBlYXNlc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291bnQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGFuaW1hdGlvbnMgZm9yIGEgRE9NIGVsZW1lbnRcclxuICogQGV2ZW50IERvbUVhc2UjY29tcGxldGVcclxuICogQHR5cGUge0RvbUVhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIG9uIGVhY2ggbG9vcCBmb3IgYSBET00gZWxlbWVudCB3aGVyZSB0aGVyZSBhcmUgYW5pbWF0aW9uc1xyXG4gKiBAZXZlbnQgRG9tRWFzZSNlYWNoXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZSJdfQ==