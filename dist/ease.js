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

                    count += Object.keys(entry).length - 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJleGlzdHMiLCJEb21FYXNlRWxlbWVudCIsIkRvbUVhc2UiLCJvcHRpb25zIiwiZHVyYXRpb24iLCJlYXNlIiwibGluZWFyIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJwYXVzZU9uQmx1ciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJibHVyIiwiZm9jdXMiLCJfcmVxdWVzdGVkIiwibG9vcCIsInJ1bm5pbmciLCJzdG9wIiwidGltZSIsImVsYXBzZWQiLCJfbGFzdCIsInVwZGF0ZSIsIl9yZXF1ZXN0SWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImVsZW1lbnQiLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwibGVuZ3RoIiwiYWRkIiwiX19kb21FYXNlIiwiZG9tRWFzZSIsInB1c2giLCJvYmplY3QiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJwb3AiLCJfaSIsImVtaXQiLCJrZXlzIiwiY291bnQiLCJlbnRyeSIsIk9iamVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLFFBQVIsQ0FBZjtBQUNBLElBQU1FLFNBQVNGLFFBQVEsUUFBUixDQUFmOztBQUVBLElBQU1HLGlCQUFpQkgsUUFBUSxlQUFSLENBQXZCOztBQUVBOzs7Ozs7Ozs7OztJQVVNSSxPOzs7QUFFRjs7Ozs7Ozs7O0FBU0EscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7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QUFhUixNQUFiLENBQW9CRixPQUFwQixDQUFKLEVBQ0E7QUFDSSx5QkFBS2QsSUFBTCxDQUFVaUMsTUFBVixDQUFpQlQsQ0FBakIsRUFBb0IsQ0FBcEI7QUFDQUE7QUFDQVc7QUFDSDtBQUNKO0FBQ0QsaUJBQUtDLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLbkMsS0FBTixJQUFlcUIsTUFBTWUsSUFBTixDQUFXLEtBQUtyQyxJQUFoQixFQUFzQnlCLE1BQXRCLEtBQWlDLENBQWhELElBQXFELENBQUMsS0FBS3hCLEtBQS9ELEVBQ0E7QUFDSSxxQkFBS21DLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EscUJBQUtuQyxLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7d0NBS0E7QUFDSSxtQkFBTyxLQUFLRCxJQUFMLENBQVV5QixNQUFqQjtBQUNIOztBQUVEOzs7Ozs7O3VDQUtBO0FBQ0ksZ0JBQUlhLFFBQVEsQ0FBWjtBQURKO0FBQUE7QUFBQTs7QUFBQTtBQUVJLHFDQUFrQixLQUFLdEMsSUFBdkIsOEhBQ0E7QUFBQSx3QkFEU3VDLEtBQ1Q7O0FBQ0lELDZCQUFTRSxPQUFPSCxJQUFQLENBQVlFLEtBQVosRUFBbUJkLE1BQW5CLEdBQTRCLENBQXJDO0FBQ0g7QUFMTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU1JLG1CQUFPYSxLQUFQO0FBQ0g7Ozs7RUE1TmlCaEQsWTs7QUErTnRCOzs7Ozs7QUFNQTs7Ozs7O0FBTUFtRCxPQUFPQyxPQUFQLEdBQWlCL0MsT0FBakIiLCJmaWxlIjoiZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBQZW5uZXIgPSByZXF1aXJlKCdwZW5uZXInKVxyXG5jb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxuY29uc3QgRG9tRWFzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Vhc2VFbGVtZW50JylcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGFsbCBhbmltYXRpb25zIHJ1bm5pbmcgb24gRE9NIG9iamVjdHNcclxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBFYXNlID0gcmVxdWlyZSgnZG9tLWVhc2UnKTtcclxuICogdmFyIGVhc2UgPSBuZXcgRWFzZSh7IGR1cmF0aW9uOiAzMDAwLCBlYXNlOiAnZWFzZUluT3V0U2luZScgfSk7XHJcbiAqXHJcbiAqIHZhciB0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxyXG4gKiBlYXNlLmFkZCh0ZXN0LCB7IGxlZnQ6IDIwLCB0b3A6IDE1LCBvcGFjaXR5OiAwLjI1IH0sIHsgcmVwZWF0OiB0cnVlLCByZXZlcnNlOiB0cnVlIH0pXHJcbiAqL1xyXG5jbGFzcyBEb21FYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMDBdIGRlZmF1bHQgZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2U9cGVubmVyLmxpbmVhcl0gZGVmYXVsdCBlYXNlXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5hdXRvc3RhcnQ9dHJ1ZV1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VPbkJsdXJdIHBhdXNlIHRpbWVyIG9uIGJsdXIsIHJlc3VtZSBvbiBmb2N1c1xyXG4gICAgICogQGZpcmVzIERvbUVhc2UjY29tcGxldGVcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2VhY2hcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSB0aGlzLm9wdGlvbnMuZWFzZSB8fCBQZW5uZXIubGluZWFyXHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIGlmICghb3B0aW9ucy5hdXRvc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucGF1c2VPbkJsdXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHRoaXMuYmx1cigpKVxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB0aGlzLmZvY3VzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RhcnQgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqIGFsdGVybmF0aXZlbHksIHlvdSBjYW4gbWFudWFsbHkgY2FsbCB1cGRhdGUoKSBvbiBlYWNoIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmxvb3AoKVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJsdXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKVxyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AodGltZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSB0aGlzLl9sYXN0ID8gdGltZSAtIHRoaXMuX2xhc3QgOiAwXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGVsYXBzZWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xhc3QgPSB0aW1lXHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4gdGhpcy5sb29wKHRpbWUpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RvcCBhbmltYXRpb24gbG9vcFxyXG4gICAgICovXHJcbiAgICBzdG9wKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JlcXVlc3RJZClcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYW5pbWF0aW9uKHMpIHRvIGEgRE9NIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fEhUTUxFbGVtZW50W10pfSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy50b3BdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLndpZHRoXSB1c2VzIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIHVzZXMgcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVYXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVZXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMub3BhY2l0eV1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmNvbG9yXVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuYmFja2dyb3VuZENvbG9yXVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uXVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZV1cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmVwZWF0XVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlXVxyXG4gICAgICogQHJldHVybnMge0RvbUVhc2VFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBhZGQoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNhbGwgYWRkIG9uIGFsbCBlbGVtZW50cyBpZiBhcnJheVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gZWxlbWVudC5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChlbGVtZW50W2ldLCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudFtpXSwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXQgdXAgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBvcHRpb25zLmR1cmF0aW9uID0gZXhpc3RzKG9wdGlvbnMuZHVyYXRpb24pID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgIG9wdGlvbnMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lYXNlID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZWFzZSA9IFBlbm5lcltvcHRpb25zLmVhc2VdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5fX2RvbUVhc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9fZG9tRWFzZS5hZGQocGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBkb21FYXNlID0gZWxlbWVudC5fX2RvbUVhc2UgPSBuZXcgRG9tRWFzZUVsZW1lbnQoZWxlbWVudClcclxuICAgICAgICAgICAgZG9tRWFzZS5hZGQocGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkb21FYXNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudC5fX2RvbUVhc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbmltYXRpb24ocylcclxuICAgICAqIEBwYXJhbSB7KEFuaW1hdGlvbnxIVE1MRWxlbWVudCl9IG9iamVjdFxyXG4gICAgICovXHJcbiAgICByZW1vdmUob2JqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBvYmplY3QuX19kb21FYXNlID8gb2JqZWN0Ll9fZG9tRWFzZS5lbGVtZW50IDogb2JqZWN0XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihlbGVtZW50KVxyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgZWxlbWVudC5fX2RvbUVhc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgYW5pbWF0aW9ucyBmcm9tIGxpc3RcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKClcclxuICAgIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5saXN0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IERvbUVhc2VFbGVtZW50ID0gdGhpcy5saXN0LnBvcCgpXHJcbiAgICAgICAgICAgIGlmIChEb21FYXNlRWxlbWVudC5lbGVtZW50Ll9fZG9tRWFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIERvbUVhc2VFbGVtZW50LmVsZW1lbnQuX19kb21FYXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZnJhbWU7IHRoaXMgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgaWYgc3RhcnQoKSBpcyB1c2VkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWxhcHNlZCB0aW1lIGluIG1zXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS51cGRhdGUoZWxhcHNlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKCF0aGlzLmVtcHR5ICYmIEFycmF5LmtleXModGhpcy5saXN0KS5sZW5ndGggPT09IDAgJiYgIXRoaXMuZW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBlbGVtZW50cyBiZWluZyBEb21FYXNlRWxlbWVudGRcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvdW50RWxlbWVudHMoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgYWN0aXZlIGFuaW1hdGlvbnMgYWNyb3NzIGFsbCBlbGVtZW50c1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgY291bnRSdW5uaW5nKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5saXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY291bnQgKz0gT2JqZWN0LmtleXMoZW50cnkpLmxlbmd0aCAtIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGFuaW1hdGlvbnMgZm9yIGEgRE9NIGVsZW1lbnRcclxuICogQGV2ZW50IERvbUVhc2UjY29tcGxldGVcclxuICogQHR5cGUge0RvbUVhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIG9uIGVhY2ggbG9vcCBmb3IgYSBET00gZWxlbWVudCB3aGVyZSB0aGVyZSBhcmUgYW5pbWF0aW9uc1xyXG4gKiBAZXZlbnQgRG9tRWFzZSNlYWNoXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZSJdfQ==