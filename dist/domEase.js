'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');
var Penner = require('penner');

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
     * @param {number} [options.maximumFrameRate=16.667]
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
        _this.options.maximumFrameRate = _this.options.maximumFrameRate || 16.667;
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
                elapsed = elapsed > this.options.maximumFrameRate ? this.options.maximumFrameRate : elapsed;
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
         * add ease(s) to one or more elements
         * @param {(HTMLElement|HTMLElement[])} element(s)
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
         * @returns {(Ease|Ease[])} ease(s) for each element
         */

    }, {
        key: 'add',
        value: function add(element, params, options) {
            // set up default options
            options = options || {};
            options.duration = typeof options.duration !== 'undefined' ? options.duration : this.options.duration;
            options.ease = options.ease || this.options.ease;
            if (typeof options.ease === 'string') {
                options.ease = Penner[options.ease];
            }
            if (Array.isArray(element)) {
                var eases = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = element[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var el = _step.value;

                        var ease = new Ease(el, params, options);
                        this.list.push(ease);
                        eases.push(ease);
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

                return eases;
            } else {
                var _ease = new Ease(element, params, options);
                this.list.push(_ease);
                return _ease;
            }
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
                this.emit('complete', this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb21FYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJFYXNlIiwiRG9tRWFzZSIsIm9wdGlvbnMiLCJkdXJhdGlvbiIsImVhc2UiLCJsaW5lYXIiLCJtYXhpbXVtRnJhbWVSYXRlIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJwYXVzZU9uQmx1ciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJibHVyIiwiZm9jdXMiLCJfcmVxdWVzdGVkIiwibG9vcCIsInJ1bm5pbmciLCJzdG9wIiwidGltZSIsImVsYXBzZWQiLCJfbGFzdCIsInVwZGF0ZSIsIl9yZXF1ZXN0SWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImVsZW1lbnQiLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJlYXNlcyIsImVsIiwicHVzaCIsImkiLCJfaSIsImxlbmd0aCIsInNwbGljZSIsImVtaXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUUsT0FBT0YsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7O0lBVU1HLE87OztBQUVGOzs7Ozs7Ozs7O0FBVUEscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7QUFDQSxjQUFLRCxPQUFMLENBQWFFLElBQWIsR0FBb0IsTUFBS0YsT0FBTCxDQUFhRSxJQUFiLElBQXFCTCxPQUFPTSxNQUFoRDtBQUNBLGNBQUtILE9BQUwsQ0FBYUksZ0JBQWIsR0FBZ0MsTUFB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QUFVNkIsTUFBL0IsRUFBdUNGLElBQUlDLEVBQTNDLEVBQStDRCxHQUEvQyxFQUNBO0FBQ0ksb0JBQUksS0FBSzNCLElBQUwsQ0FBVTJCLENBQVYsRUFBYVgsTUFBYixDQUFvQkYsT0FBcEIsQ0FBSixFQUNBO0FBQ0kseUJBQUtkLElBQUwsQ0FBVThCLE1BQVYsQ0FBaUJILENBQWpCLEVBQW9CLENBQXBCO0FBQ0FBO0FBQ0FDO0FBQ0g7QUFDSjtBQUNELGlCQUFLRyxJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQjtBQUNBLGdCQUFJLENBQUMsS0FBSzlCLEtBQU4sSUFBZSxLQUFLRCxJQUFMLENBQVU2QixNQUFWLEtBQXFCLENBQXhDLEVBQ0E7QUFDSSxxQkFBS0UsSUFBTCxDQUFVLFVBQVYsRUFBc0IsSUFBdEI7QUFDQSxxQkFBSzlCLEtBQUwsR0FBYSxJQUFiO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7OzttQ0FLQTtBQUNJLG1CQUFPLEtBQUtELElBQUwsQ0FBVTZCLE1BQWpCO0FBQ0g7Ozs7RUFuTmlCdkMsWTs7QUFzTnRCOzs7Ozs7QUFNQTs7Ozs7O0FBTUEwQyxPQUFPQyxPQUFQLEdBQWlCdkMsT0FBakIiLCJmaWxlIjoiZG9tRWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBQZW5uZXIgPSByZXF1aXJlKCdwZW5uZXInKVxyXG5cclxuY29uc3QgRWFzZSA9IHJlcXVpcmUoJy4vZWFzZScpXHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhbGwgZWFzZXNcclxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBFYXNlID0gcmVxdWlyZSgnZG9tLWVhc2UnKTtcclxuICogdmFyIGVhc2UgPSBuZXcgRWFzZSh7IGR1cmF0aW9uOiAzMDAwLCBlYXNlOiAnZWFzZUluT3V0U2luZScgfSk7XHJcbiAqXHJcbiAqIHZhciB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxyXG4gKiBlYXNlLmFkZCh0ZXN0LCB7IGxlZnQ6IDIwLCB0b3A6IDE1LCBvcGFjaXR5OiAwLjI1IH0sIHsgcmVwZWF0OiB0cnVlLCByZXZlcnNlOiB0cnVlIH0pXHJcbiAqL1xyXG5jbGFzcyBEb21FYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIGRlZmF1bHQgZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2U9cGVubmVyLmxpbmVhcl0gZGVmYXVsdCBlYXNlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5hdXRvc3RhcnQ9dHJ1ZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhpbXVtRnJhbWVSYXRlPTE2LjY2N11cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VPbkJsdXJdIHBhdXNlIHRpbWVyIG9uIGJsdXIsIHJlc3VtZSBvbiBmb2N1c1xyXG4gICAgICogQGZpcmVzIERvbUVhc2UjZWFjaFxyXG4gICAgICogQGZpcmVzIERvbUVhc2UjY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSB0aGlzLm9wdGlvbnMuZWFzZSB8fCBQZW5uZXIubGluZWFyXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heGltdW1GcmFtZVJhdGUgPSB0aGlzLm9wdGlvbnMubWF4aW11bUZyYW1lUmF0ZSB8fCAxNi42NjdcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYXV0b3N0YXJ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGF1c2VPbkJsdXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHRoaXMuYmx1cigpKVxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB0aGlzLmZvY3VzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RhcnQgYW5pbWF0aW9uIGxvb3AgKGF1dG9tYXRpY2FsbHkgY2FsbGVkIHVubGVzcyBvcHRpb25zLmF1dG9zdGFydD1mYWxzZSlcclxuICAgICAqL1xyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmxvb3AoKVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJsdXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AodGltZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBlbGFwc2VkID0gdGhpcy5fbGFzdCA/IHRpbWUgLSB0aGlzLl9sYXN0IDogMFxyXG4gICAgICAgICAgICBlbGFwc2VkID0gZWxhcHNlZCA+IHRoaXMub3B0aW9ucy5tYXhpbXVtRnJhbWVSYXRlID8gdGhpcy5vcHRpb25zLm1heGltdW1GcmFtZVJhdGUgOiBlbGFwc2VkXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGVsYXBzZWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xhc3QgPSB0aW1lXHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy5sb29wKHRpbWUpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RvcCBhbmltYXRpb24gbG9vcFxyXG4gICAgICovXHJcbiAgICBzdG9wKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JlcXVlc3RJZClcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZWFzZShzKSB0byBvbmUgb3IgbW9yZSBlbGVtZW50c1xyXG4gICAgICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8SFRNTEVsZW1lbnRbXSl9IGVsZW1lbnQocylcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmxlZnRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy50b3BdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy53aWR0aF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmhlaWdodF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVYXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVZXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMub3BhY2l0eV1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmNvbG9yXVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuYmFja2dyb3VuZENvbG9yXVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uXVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZV1cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmVwZWF0XVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlXVxyXG4gICAgICogQHJldHVybnMgeyhFYXNlfEVhc2VbXSl9IGVhc2UocykgZm9yIGVhY2ggZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBhZGQoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHNldCB1cCBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSB0eXBlb2Ygb3B0aW9ucy5kdXJhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLmR1cmF0aW9uIDogdGhpcy5vcHRpb25zLmR1cmF0aW9uXHJcbiAgICAgICAgb3B0aW9ucy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IHRoaXMub3B0aW9ucy5lYXNlXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVhc2UgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lYXNlID0gUGVubmVyW29wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlYXNlcyA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsIG9mIGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBuZXcgRWFzZShlbCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZWFzZSlcclxuICAgICAgICAgICAgICAgIGVhc2VzLnB1c2goZWFzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWFzZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IG5ldyBFYXNlKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZWFzZSlcclxuICAgICAgICAgICAgcmV0dXJuIGVhc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGVhc2VzIG9uIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlT2JqZWN0RWFzZXMoZWxlbWVudClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgaWYgKGVhc2UuZWxlbWVudCA9PT0gZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGVhc2VzIHVzaW5nIEVhc2Ugb2JqZWN0IHJldHVybmVkIGJ5IGFkZCgpXHJcbiAgICAgKiBAcGFyYW0ge0Vhc2V9IGVhc2VcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldID09PSBlYXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGVhc2VzXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBmcmFtZTsgdGhpcyBpcyBjYWxsZWQgYXV0b21hdGljYWxseSBpZiBzdGFydCgpIGlzIHVzZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFwc2VkIHRpbWUgaW4gbXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAoIXRoaXMuZW1wdHkgJiYgdGhpcy5saXN0Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBlYXNlc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291bnQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGFuaW1hdGlvbnMgZm9yIGEgRE9NIGVsZW1lbnRcclxuICogQGV2ZW50IERvbUVhc2UjY29tcGxldGVcclxuICogQHR5cGUge0RvbUVhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIG9uIGVhY2ggbG9vcCBmb3IgYSBET00gZWxlbWVudCB3aGVyZSB0aGVyZSBhcmUgYW5pbWF0aW9uc1xyXG4gKiBAZXZlbnQgRG9tRWFzZSNlYWNoXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZSJdfQ==