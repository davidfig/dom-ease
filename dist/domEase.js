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
         * @param {number} [params.marginTop] in px
         * @param {number} [params.marginRight] in px
         * @param {number} [params.marginBottom] in px
         * @param {number} [params.marginLeft] in px
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb21FYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJQZW5uZXIiLCJFYXNlIiwiRG9tRWFzZSIsIm9wdGlvbnMiLCJkdXJhdGlvbiIsImVhc2UiLCJsaW5lYXIiLCJtYXhpbXVtRnJhbWVSYXRlIiwibGlzdCIsImVtcHR5IiwiYXV0b3N0YXJ0Iiwic3RhcnQiLCJwYXVzZU9uQmx1ciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJibHVyIiwiZm9jdXMiLCJfcmVxdWVzdGVkIiwibG9vcCIsInJ1bm5pbmciLCJzdG9wIiwidGltZSIsImVsYXBzZWQiLCJfbGFzdCIsInVwZGF0ZSIsIl9yZXF1ZXN0SWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImVsZW1lbnQiLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJlYXNlcyIsImVsIiwicHVzaCIsImkiLCJfaSIsImxlbmd0aCIsInNwbGljZSIsImVtaXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUUsT0FBT0YsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7O0lBVU1HLE87OztBQUVGOzs7Ozs7Ozs7O0FBVUEscUJBQVlDLE9BQVosRUFDQTtBQUFBOztBQUFBOztBQUVJLGNBQUtBLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGNBQUtBLE9BQUwsQ0FBYUMsUUFBYixHQUF3QixNQUFLRCxPQUFMLENBQWFDLFFBQWIsSUFBeUIsSUFBakQ7QUFDQSxjQUFLRCxPQUFMLENBQWFFLElBQWIsR0FBb0IsTUFBS0YsT0FBTCxDQUFhRSxJQUFiLElBQXFCTCxPQUFPTSxNQUFoRDtBQUNBLGNBQUtILE9BQUwsQ0FBYUksZ0JBQWIsR0FBZ0MsTUFBS0osT0FBTCxDQUFhSSxnQkFBYixJQUFpQyxNQUFqRTtBQUNBLGNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxZQUFJLENBQUMsTUFBS04sT0FBTCxDQUFhTyxTQUFsQixFQUNBO0FBQ0ksa0JBQUtDLEtBQUw7QUFDSDtBQUNELFlBQUksTUFBS1IsT0FBTCxDQUFhUyxXQUFqQixFQUNBO0FBQ0lDLG1CQUFPQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQztBQUFBLHVCQUFNLE1BQUtDLElBQUwsRUFBTjtBQUFBLGFBQWhDO0FBQ0FGLG1CQUFPQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQztBQUFBLHVCQUFNLE1BQUtFLEtBQUwsRUFBTjtBQUFBLGFBQWpDO0FBQ0g7QUFoQkw7QUFpQkM7O0FBRUQ7Ozs7Ozs7Z0NBSUE7QUFDSSxnQkFBSSxDQUFDLEtBQUtDLFVBQVYsRUFDQTtBQUNJLHFCQUFLQSxVQUFMLEdBQWtCLElBQWxCO0FBQ0EscUJBQUtDLElBQUw7QUFDQSxxQkFBS0MsT0FBTCxHQUFlLElBQWY7QUFDSDtBQUNKOzs7K0JBR0Q7QUFDSSxnQkFBSSxLQUFLQSxPQUFULEVBQ0E7QUFDSSxxQkFBS0MsSUFBTDtBQUNBLHFCQUFLRCxPQUFMLEdBQWUsSUFBZjtBQUNIO0FBQ0o7OztnQ0FHRDtBQUNJLGdCQUFJLEtBQUtBLE9BQVQsRUFDQTtBQUNJLHFCQUFLUixLQUFMO0FBQ0g7QUFDSjs7OzZCQUVJVSxJLEVBQ0w7QUFBQTs7QUFDSSxnQkFBSUEsSUFBSixFQUNBO0FBQ0ksb0JBQUlDLFVBQVUsS0FBS0MsS0FBTCxHQUFhRixPQUFPLEtBQUtFLEtBQXpCLEdBQWlDLENBQS9DO0FBQ0FELDBCQUFVQSxVQUFVLEtBQUtuQixPQUFMLENBQWFJLGdCQUF2QixHQUEwQyxLQUFLSixPQUFMLENBQWFJLGdCQUF2RCxHQUEwRWUsT0FBcEY7QUFDQSxxQkFBS0UsTUFBTCxDQUFZRixPQUFaO0FBQ0g7QUFDRCxpQkFBS0MsS0FBTCxHQUFhRixJQUFiO0FBQ0EsaUJBQUtJLFVBQUwsR0FBa0JaLE9BQU9hLHFCQUFQLENBQTZCLFVBQUNMLElBQUQ7QUFBQSx1QkFBVSxPQUFLSCxJQUFMLENBQVVHLElBQVYsQ0FBVjtBQUFBLGFBQTdCLENBQWxCO0FBQ0g7O0FBRUQ7Ozs7OzsrQkFJQTtBQUNJLGdCQUFJLEtBQUtKLFVBQVQsRUFDQTtBQUNJSix1QkFBT2Msb0JBQVAsQ0FBNEIsS0FBS0YsVUFBakM7QUFDQSxxQkFBS1IsVUFBTCxHQUFrQixLQUFsQjtBQUNBLHFCQUFLRSxPQUFMLEdBQWUsS0FBZjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBeUJJUyxPLEVBQVNDLE0sRUFBUTFCLE8sRUFDckI7QUFDSTtBQUNBQSxzQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxvQkFBUUMsUUFBUixHQUFtQixPQUFPRCxRQUFRQyxRQUFmLEtBQTRCLFdBQTVCLEdBQTBDRCxRQUFRQyxRQUFsRCxHQUE2RCxLQUFLRCxPQUFMLENBQWFDLFFBQTdGO0FBQ0FELG9CQUFRRSxJQUFSLEdBQWVGLFFBQVFFLElBQVIsSUFBZ0IsS0FBS0YsT0FBTCxDQUFhRSxJQUE1QztBQUNBLGdCQUFJLE9BQU9GLFFBQVFFLElBQWYsS0FBd0IsUUFBNUIsRUFDQTtBQUNJRix3QkFBUUUsSUFBUixHQUFlTCxPQUFPRyxRQUFRRSxJQUFmLENBQWY7QUFDSDtBQUNELGdCQUFJeUIsTUFBTUMsT0FBTixDQUFjSCxPQUFkLENBQUosRUFDQTtBQUNJLG9CQUFNSSxRQUFRLEVBQWQ7QUFESjtBQUFBO0FBQUE7O0FBQUE7QUFFSSx5Q0FBZUosT0FBZiw4SEFDQTtBQUFBLDRCQURTSyxFQUNUOztBQUNJLDRCQUFNNUIsT0FBTyxJQUFJSixJQUFKLENBQVNnQyxFQUFULEVBQWFKLE1BQWIsRUFBcUIxQixPQUFyQixDQUFiO0FBQ0EsNkJBQUtLLElBQUwsQ0FBVTBCLElBQVYsQ0FBZTdCLElBQWY7QUFDQTJCLDhCQUFNRSxJQUFOLENBQVc3QixJQUFYO0FBQ0g7QUFQTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVFJLHVCQUFPMkIsS0FBUDtBQUNILGFBVkQsTUFZQTtBQUNJLG9CQUFNM0IsUUFBTyxJQUFJSixJQUFKLENBQVMyQixPQUFULEVBQWtCQyxNQUFsQixFQUEwQjFCLE9BQTFCLENBQWI7QUFDQSxxQkFBS0ssSUFBTCxDQUFVMEIsSUFBVixDQUFlN0IsS0FBZjtBQUNBLHVCQUFPQSxLQUFQO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7OzswQ0FJa0J1QixPLEVBQ2xCO0FBQ0ksZ0JBQU1wQixPQUFPLEtBQUtBLElBQWxCO0FBQ0EsaUJBQUssSUFBSTJCLElBQUksQ0FBUixFQUFXQyxLQUFLNUIsS0FBSzZCLE1BQTFCLEVBQWtDRixJQUFJQyxFQUF0QyxFQUEwQ0QsR0FBMUMsRUFDQTtBQUNJLG9CQUFNOUIsT0FBT0csS0FBSzJCLENBQUwsQ0FBYjtBQUNBLG9CQUFJOUIsS0FBS3VCLE9BQUwsS0FBaUJBLE9BQXJCLEVBQ0E7QUFDSXBCLHlCQUFLOEIsTUFBTCxDQUFZSCxDQUFaLEVBQWUsQ0FBZjtBQUNBQTtBQUNBQztBQUNIO0FBQ0o7QUFDSjs7QUFFRDs7Ozs7OzsrQkFJTy9CLEksRUFDUDtBQUNJLGdCQUFNRyxPQUFPLEtBQUtBLElBQWxCO0FBQ0EsaUJBQUssSUFBSTJCLElBQUksQ0FBUixFQUFXQyxLQUFLNUIsS0FBSzZCLE1BQTFCLEVBQWtDRixJQUFJQyxFQUF0QyxFQUEwQ0QsR0FBMUMsRUFDQTtBQUNJLG9CQUFJM0IsS0FBSzJCLENBQUwsTUFBWTlCLElBQWhCLEVBQ0E7QUFDSUcseUJBQUs4QixNQUFMLENBQVlILENBQVosRUFBZSxDQUFmO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7Ozs7OztvQ0FJQTtBQUNJLGlCQUFLM0IsSUFBTCxHQUFZLEVBQVo7QUFDSDs7QUFFRDs7Ozs7OzsrQkFJT2MsTyxFQUNQO0FBQ0ksaUJBQUssSUFBSWEsSUFBSSxDQUFSLEVBQVdDLEtBQUssS0FBSzVCLElBQUwsQ0FBVTZCLE1BQS9CLEVBQXVDRixJQUFJQyxFQUEzQyxFQUErQ0QsR0FBL0MsRUFDQTtBQUNJLG9CQUFJLEtBQUszQixJQUFMLENBQVUyQixDQUFWLEVBQWFYLE1BQWIsQ0FBb0JGLE9BQXBCLENBQUosRUFDQTtBQUNJLHlCQUFLZCxJQUFMLENBQVU4QixNQUFWLENBQWlCSCxDQUFqQixFQUFvQixDQUFwQjtBQUNBQTtBQUNBQztBQUNIO0FBQ0o7QUFDRCxpQkFBS0csSUFBTCxDQUFVLE1BQVYsRUFBa0IsSUFBbEI7QUFDQSxnQkFBSSxDQUFDLEtBQUs5QixLQUFOLElBQWUsS0FBS0QsSUFBTCxDQUFVNkIsTUFBVixLQUFxQixDQUF4QyxFQUNBO0FBQ0kscUJBQUtFLElBQUwsQ0FBVSxVQUFWLEVBQXNCLElBQXRCO0FBQ0EscUJBQUs5QixLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7bUNBS0E7QUFDSSxtQkFBTyxLQUFLRCxJQUFMLENBQVU2QixNQUFqQjtBQUNIOzs7O0VBdk5pQnZDLFk7O0FBME50Qjs7Ozs7O0FBTUE7Ozs7OztBQU1BMEMsT0FBT0MsT0FBUCxHQUFpQnZDLE9BQWpCIiwiZmlsZSI6ImRvbUVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJylcclxuY29uc3QgUGVubmVyID0gcmVxdWlyZSgncGVubmVyJylcclxuXHJcbmNvbnN0IEVhc2UgPSByZXF1aXJlKCcuL2Vhc2UnKVxyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWxsIGVhc2VzXHJcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgRWFzZSA9IHJlcXVpcmUoJ2RvbS1lYXNlJyk7XHJcbiAqIHZhciBlYXNlID0gbmV3IEVhc2UoeyBkdXJhdGlvbjogMzAwMCwgZWFzZTogJ2Vhc2VJbk91dFNpbmUnIH0pO1xyXG4gKlxyXG4gKiB2YXIgdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0JylcclxuICogZWFzZS5hZGQodGVzdCwgeyBsZWZ0OiAyMCwgdG9wOiAxNSwgb3BhY2l0eTogMC4yNSB9LCB7IHJlcGVhdDogdHJ1ZSwgcmV2ZXJzZTogdHJ1ZSB9KVxyXG4gKi9cclxuY2xhc3MgRG9tRWFzZSBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMDAwXSBkZWZhdWx0IGR1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5lYXNlPXBlbm5lci5saW5lYXJdIGRlZmF1bHQgZWFzZVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuYXV0b3N0YXJ0PXRydWVdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4aW11bUZyYW1lUmF0ZT0xNi42NjddXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBhdXNlT25CbHVyXSBwYXVzZSB0aW1lciBvbiBibHVyLCByZXN1bWUgb24gZm9jdXNcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2VhY2hcclxuICAgICAqIEBmaXJlcyBEb21FYXNlI2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gdGhpcy5vcHRpb25zLmVhc2UgfHwgUGVubmVyLmxpbmVhclxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXhpbXVtRnJhbWVSYXRlID0gdGhpcy5vcHRpb25zLm1heGltdW1GcmFtZVJhdGUgfHwgMTYuNjY3XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmF1dG9zdGFydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnBhdXNlT25CbHVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB0aGlzLmJsdXIoKSlcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5mb2N1cygpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IGFuaW1hdGlvbiBsb29wIChhdXRvbWF0aWNhbGx5IGNhbGxlZCB1bmxlc3Mgb3B0aW9ucy5hdXRvc3RhcnQ9ZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb29wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBibHVyKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKClcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucnVubmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb29wKHRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZWxhcHNlZCA9IHRoaXMuX2xhc3QgPyB0aW1lIC0gdGhpcy5fbGFzdCA6IDBcclxuICAgICAgICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgPiB0aGlzLm9wdGlvbnMubWF4aW11bUZyYW1lUmF0ZSA/IHRoaXMub3B0aW9ucy5tYXhpbXVtRnJhbWVSYXRlIDogZWxhcHNlZFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShlbGFwc2VkKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0ID0gdGltZVxyXG4gICAgICAgIHRoaXMuX3JlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHRoaXMubG9vcCh0aW1lKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHN0b3AgYW5pbWF0aW9uIGxvb3BcclxuICAgICAqL1xyXG4gICAgc3RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yZXF1ZXN0SWQpXHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGVhc2UocykgdG8gb25lIG9yIG1vcmUgZWxlbWVudHNcclxuICAgICAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fEhUTUxFbGVtZW50W10pfSBlbGVtZW50KHMpXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5tYXJnaW5Ub3BdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5tYXJnaW5SaWdodF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm1hcmdpbkJvdHRvbV0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm1hcmdpbkxlZnRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEByZXR1cm5zIHsoRWFzZXxFYXNlW10pfSBlYXNlKHMpIGZvciBlYWNoIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgYWRkKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICAvLyBzZXQgdXAgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBvcHRpb25zLmR1cmF0aW9uID0gdHlwZW9mIG9wdGlvbnMuZHVyYXRpb24gIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucy5kdXJhdGlvbiA6IHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgIG9wdGlvbnMuZWFzZSA9IG9wdGlvbnMuZWFzZSB8fCB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lYXNlID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZWFzZSA9IFBlbm5lcltvcHRpb25zLmVhc2VdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZXMgPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBlbCBvZiBlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlYXNlID0gbmV3IEVhc2UoZWwsIHBhcmFtcywgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICAgICAgICAgICAgICBlYXNlcy5wdXNoKGVhc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVhc2VzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBuZXcgRWFzZShlbGVtZW50LCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICAgICAgICAgIHJldHVybiBlYXNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBlYXNlcyBvbiBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZU9iamVjdEVhc2VzKGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChlYXNlLmVsZW1lbnQgPT09IGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS1cclxuICAgICAgICAgICAgICAgIF9pLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBlYXNlcyB1c2luZyBFYXNlIG9iamVjdCByZXR1cm5lZCBieSBhZGQoKVxyXG4gICAgICogQHBhcmFtIHtFYXNlfSBlYXNlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShlYXNlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSBsaXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gZWFzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBlYXNlc1xyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZnJhbWU7IHRoaXMgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgaWYgc3RhcnQoKSBpcyB1c2VkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWxhcHNlZCB0aW1lIGluIG1zXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS51cGRhdGUoZWxhcHNlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKCF0aGlzLmVtcHR5ICYmIHRoaXMubGlzdC5sZW5ndGggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlJywgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgZWFzZXNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldENvdW50KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aFxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zIGZvciBhIERPTSBlbGVtZW50XHJcbiAqIEBldmVudCBEb21FYXNlI2NvbXBsZXRlXHJcbiAqIEB0eXBlIHtEb21FYXNlfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyBvbiBlYWNoIGxvb3AgZm9yIGEgRE9NIGVsZW1lbnQgd2hlcmUgdGhlcmUgYXJlIGFuaW1hdGlvbnNcclxuICogQGV2ZW50IERvbUVhc2UjZWFjaFxyXG4gKiBAdHlwZSB7RG9tRWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvbUVhc2UiXX0=