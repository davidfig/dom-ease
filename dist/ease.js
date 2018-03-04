'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');
var exists = require('exists');

var Ease = function (_EventEmitter) {
    _inherits(Ease, _EventEmitter);

    /**
     * Ease class returned by DomEase.add()
     * @extends EventEmitter
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
     * @param {number} [options.wait]
     * @returns {Ease}
     * @fires Ease#each
     * @fires Ease#complete
     * @fires Ease#loop
     * @hideconstructor
     */
    function Ease(element, params, options) {
        _classCallCheck(this, Ease);

        var _this = _possibleConstructorReturn(this, (Ease.__proto__ || Object.getPrototypeOf(Ease)).call(this));

        _this.element = element;
        _this.list = [];
        _this.time = 0;
        _this.duration = options.duration;
        _this.ease = options.ease;
        _this.repeat = options.repeat;
        _this.reverse = options.reverse;
        _this.wait = options.wait || 0;
        for (var entry in params) {
            switch (entry) {
                case 'left':
                    _this.numberStart(entry, element.offsetLeft, params[entry], 'px');
                    break;

                case 'top':
                    _this.numberStart(entry, element.offsetTop, params[entry], 'px');
                    break;

                case 'color':
                    _this.colorStart('color', element.style.color, params[entry]);
                    break;

                case 'backgroundColor':
                    _this.colorStart('backgroundColor', element.style.backgroundColor, params[entry]);
                    break;

                case 'scale':
                    _this.transformStart(entry, params[entry]);
                    break;

                case 'scaleX':
                    _this.transformStart(entry, params[entry]);
                    break;

                case 'scaleY':
                    _this.transformStart(entry, params[entry]);
                    break;

                case 'opacity':
                    _this.numberStart(entry, exists(element.style.opacity) ? parseFloat(element.style.opacity) : 1, params[entry]);
                    break;

                case 'width':
                    _this.numberStart(entry, element.offsetWidth, params[entry], 'px');
                    break;

                case 'height':
                    _this.numberStart(entry, element.offsetHeight, params[entry], 'px');
                    break;

                default:
                    console.warn(entry + ' not setup for animation in dom-ease.');
            }
        }
        return _this;
    }

    /**
     * create number entry
     * @private
     * @param {string} entry
     * @param {number} start
     * @param {number} to
     * @param {string} [units]
     */


    _createClass(Ease, [{
        key: 'numberStart',
        value: function numberStart(entry, start, to, units) {
            var ease = { type: 'number', entry: entry, to: to, start: start, delta: to - start, units: units || '' };
            this.list.push(ease);
        }
    }, {
        key: 'numberUpdate',
        value: function numberUpdate(ease, percent) {
            this.element.style[ease.entry] = ease.start + ease.delta * percent + ease.units;
        }

        /**
         * reverse number and transform
         * @private
         * @param {object} ease
         */

    }, {
        key: 'easeReverse',
        value: function easeReverse(ease) {
            var swap = ease.to;
            ease.to = ease.start;
            ease.start = swap;
            ease.delta = -ease.delta;
        }
    }, {
        key: 'transformStart',
        value: function transformStart(entry, to) {
            var ease = { type: 'transform', entry: entry, to: to };
            if (!this.transforms) {
                this.readTransform();
            }
            var transforms = this.transforms;
            var found = void 0;
            for (var i = 0, _i = transforms.length; i < _i; i++) {
                var transform = transforms[i];
                if (transform.name === entry) {
                    switch (entry) {
                        case 'scale':case 'scaleX':case 'scaleY':
                            ease.start = parseFloat(transform.values);
                            break;
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                switch (entry) {
                    case 'scale':case 'scaleX':case 'scaleY':
                        ease.start = 1;
                }
            }
            ease.delta = to - ease.start;
            this.list.push(ease);
        }
    }, {
        key: 'transformUpdate',
        value: function transformUpdate(ease, percent) {
            if (!this.changedTransform) {
                this.readTransform();
                this.changedTransform = true;
            }
            var name = ease.entry;
            var transforms = this.transforms;
            var values = ease.start + ease.delta * percent;
            for (var i = 0, _i = transforms.length; i < _i; i++) {
                if (transforms[i].name === name) {
                    transforms[i].values = values;
                    return;
                }
            }
            this.transforms.push({ name: name, values: values });
        }
    }, {
        key: 'colorUpdate',
        value: function colorUpdate(ease) {
            var elementStyle = this.element.style;
            var style = ease.style;
            var colors = ease.colors;
            var i = Math.floor(this.time / ease.interval);
            var color = colors[i];
            if (elementStyle[style] !== color) {
                elementStyle[style] = colors[i];
            }
        }
    }, {
        key: 'colorReverse',
        value: function colorReverse(ease) {
            var reverse = [];
            var colors = ease.colors;
            for (var color in colors) {
                reverse.unshift(colors[color]);
            }
            reverse.push(reverse.shift());
            ease.colors = reverse;
        }
    }, {
        key: 'colorStart',
        value: function colorStart(style, original, colors) {
            var ease = { type: 'color', style: style };
            if (Array.isArray(colors)) {
                ease.colors = colors;
            } else {
                ease.colors = [colors];
            }
            colors.push(original);
            ease.interval = this.duration / colors.length;
            this.list.push(ease);
        }
    }, {
        key: 'update',
        value: function update(elapsed) {
            if (this.wait) {
                this.wait -= elapsed;
                if (this.wait < 0) {
                    elapsed = -this.wait;
                    this.wait = 0;
                } else {
                    return;
                }
            }
            this.changedTransform = false;
            var list = this.list;
            var leftover = null;
            this.time += elapsed;
            if (this.time >= this.duration) {
                leftover = this.time - this.duration;
                this.time -= leftover;
            }
            var percent = this.ease(this.time, 0, 1, this.duration);
            for (var i = 0, _i = list.length; i < _i; i++) {
                var ease = list[i];
                switch (ease.type) {
                    case 'number':
                        this.numberUpdate(ease, percent);
                        break;

                    case 'color':
                        this.colorUpdate(ease);
                        break;

                    case 'transform':
                        this.transformUpdate(ease, percent);
                        break;
                }
            }
            if (this.changedTransform) {
                this.writeTransform();
            }
            this.emit('each', this);

            // handle end of duration
            if (leftover !== null) {
                if (this.reverse) {
                    this.reverseEases();
                    this.time = leftover;
                    this.emit('loop', this);
                    if (!this.repeat) {
                        this.reverse = false;
                    } else if (this.repeat !== true) {
                        this.repeat--;
                    }
                } else if (this.repeat) {
                    this.emit('loop', this);
                    this.time = leftover;
                    if (this.repeat !== true) {
                        this.repeat--;
                    }
                } else {
                    this.emit('complete', this);
                    return true;
                }
            }
        }
    }, {
        key: 'reverseEases',
        value: function reverseEases() {
            var list = this.list;
            for (var i = 0, _i = list.length; i < _i; i++) {
                var ease = list[i];
                if (ease.type === 'color') {
                    this.colorReverse(ease);
                } else {
                    this.easeReverse(ease);
                }
            }
        }
    }, {
        key: 'readTransform',
        value: function readTransform() {
            this.transforms = [];
            var transform = this.element.style.transform;
            var inside = void 0,
                name = '',
                values = void 0;
            for (var i = 0, _i = transform.length; i < _i; i++) {
                var letter = transform[i];
                if (inside) {
                    if (letter === ')') {
                        inside = false;
                        this.transforms.push({ name: name, values: values });
                        name = '';
                    } else {
                        values += letter;
                    }
                } else {
                    if (letter === '(') {
                        values = '';
                        inside = true;
                    } else if (letter !== ' ') {
                        name += letter;
                    }
                }
            }
        }
    }, {
        key: 'writeTransform',
        value: function writeTransform() {
            var transforms = this.transforms;
            var s = '';
            for (var i = 0, _i = transforms.length; i < _i; i++) {
                var transform = transforms[i];
                s += transform.name + '(' + transform.values + ')';
            }
            this.element.style.transform = s;
        }
    }]);

    return Ease;
}(EventEmitter);

/**
 * fires when eases are complete
 * @event Ease#complete
 * @type {Ease}
 */

/**
 * fires on each loop while eases are running
 * @event Ease#each
 * @type {Ease}
 */

/**
 * fires when eases repeat or reverse
 * @event Ease#loop
 * @type {Ease}
 */

module.exports = Ease;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJleGlzdHMiLCJFYXNlIiwiZWxlbWVudCIsInBhcmFtcyIsIm9wdGlvbnMiLCJsaXN0IiwidGltZSIsImR1cmF0aW9uIiwiZWFzZSIsInJlcGVhdCIsInJldmVyc2UiLCJ3YWl0IiwiZW50cnkiLCJudW1iZXJTdGFydCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJjb2xvclN0YXJ0Iiwic3R5bGUiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInRyYW5zZm9ybVN0YXJ0Iiwib3BhY2l0eSIsInBhcnNlRmxvYXQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImNvbnNvbGUiLCJ3YXJuIiwic3RhcnQiLCJ0byIsInVuaXRzIiwidHlwZSIsImRlbHRhIiwicHVzaCIsInBlcmNlbnQiLCJzd2FwIiwidHJhbnNmb3JtcyIsInJlYWRUcmFuc2Zvcm0iLCJmb3VuZCIsImkiLCJfaSIsImxlbmd0aCIsInRyYW5zZm9ybSIsIm5hbWUiLCJ2YWx1ZXMiLCJjaGFuZ2VkVHJhbnNmb3JtIiwiZWxlbWVudFN0eWxlIiwiY29sb3JzIiwiTWF0aCIsImZsb29yIiwiaW50ZXJ2YWwiLCJ1bnNoaWZ0Iiwic2hpZnQiLCJvcmlnaW5hbCIsIkFycmF5IiwiaXNBcnJheSIsImVsYXBzZWQiLCJsZWZ0b3ZlciIsIm51bWJlclVwZGF0ZSIsImNvbG9yVXBkYXRlIiwidHJhbnNmb3JtVXBkYXRlIiwid3JpdGVUcmFuc2Zvcm0iLCJlbWl0IiwicmV2ZXJzZUVhc2VzIiwiY29sb3JSZXZlcnNlIiwiZWFzZVJldmVyc2UiLCJpbnNpZGUiLCJsZXR0ZXIiLCJzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLGVBQWVDLFFBQVEsZUFBUixDQUFyQjtBQUNBLElBQU1DLFNBQVNELFFBQVEsUUFBUixDQUFmOztJQUVNRSxJOzs7QUFFRjs7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TTRCLFNBQVN6QixVQUFVSCxDQUFWLENBQWY7QUFDQSxvQkFBSTJCLE1BQUosRUFDQTtBQUNJLHdCQUFJQyxXQUFXLEdBQWYsRUFDQTtBQUNJRCxpQ0FBUyxLQUFUO0FBQ0EsNkJBQUs5QixVQUFMLENBQWdCSCxJQUFoQixDQUFxQixFQUFFVSxVQUFGLEVBQVFDLGNBQVIsRUFBckI7QUFDQUQsK0JBQU8sRUFBUDtBQUNILHFCQUxELE1BT0E7QUFDSUMsa0NBQVV1QixNQUFWO0FBQ0g7QUFDSixpQkFaRCxNQWNBO0FBQ0ksd0JBQUlBLFdBQVcsR0FBZixFQUNBO0FBQ0l2QixpQ0FBUyxFQUFUO0FBQ0FzQixpQ0FBUyxJQUFUO0FBQ0gscUJBSkQsTUFLSyxJQUFJQyxXQUFXLEdBQWYsRUFDTDtBQUNJeEIsZ0NBQVF3QixNQUFSO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7Ozt5Q0FHRDtBQUNJLGdCQUFNL0IsYUFBYSxLQUFLQSxVQUF4QjtBQUNBLGdCQUFJZ0MsSUFBSSxFQUFSO0FBQ0EsaUJBQUssSUFBSTdCLElBQUksQ0FBUixFQUFXQyxLQUFLSixXQUFXSyxNQUFoQyxFQUF3Q0YsSUFBSUMsRUFBNUMsRUFBZ0RELEdBQWhELEVBQ0E7QUFDSSxvQkFBTUcsWUFBWU4sV0FBV0csQ0FBWCxDQUFsQjtBQUNBNkIscUJBQUsxQixVQUFVQyxJQUFWLEdBQWlCLEdBQWpCLEdBQXVCRCxVQUFVRSxNQUFqQyxHQUEwQyxHQUEvQztBQUNIO0FBQ0QsaUJBQUt6QyxPQUFMLENBQWFlLEtBQWIsQ0FBbUJ3QixTQUFuQixHQUErQjBCLENBQS9CO0FBQ0g7Ozs7RUE5V2NyRSxZOztBQWlYbkI7Ozs7OztBQU1BOzs7Ozs7QUFNQTs7Ozs7O0FBTUFzRSxPQUFPQyxPQUFQLEdBQWlCcEUsSUFBakIiLCJmaWxlIjoiZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxuY2xhc3MgRWFzZSBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEVhc2UgY2xhc3MgcmV0dXJuZWQgYnkgRG9tRWFzZS5hZGQoKVxyXG4gICAgICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy53YWl0XVxyXG4gICAgICogQHJldHVybnMge0Vhc2V9XHJcbiAgICAgKiBAZmlyZXMgRWFzZSNlYWNoXHJcbiAgICAgKiBAZmlyZXMgRWFzZSNjb21wbGV0ZVxyXG4gICAgICogQGZpcmVzIEVhc2UjbG9vcFxyXG4gICAgICogQGhpZGVjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgIHRoaXMuZWFzZSA9IG9wdGlvbnMuZWFzZVxyXG4gICAgICAgIHRoaXMucmVwZWF0ID0gb3B0aW9ucy5yZXBlYXRcclxuICAgICAgICB0aGlzLnJldmVyc2UgPSBvcHRpb25zLnJldmVyc2VcclxuICAgICAgICB0aGlzLndhaXQgPSBvcHRpb25zLndhaXQgfHwgMFxyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IGluIHBhcmFtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0TGVmdCwgcGFyYW1zW2VudHJ5XSwgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJTdGFydChlbnRyeSwgZWxlbWVudC5vZmZzZXRUb3AsIHBhcmFtc1tlbnRyeV0sICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvclN0YXJ0KCdjb2xvcicsIGVsZW1lbnQuc3R5bGUuY29sb3IsIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JTdGFydCgnYmFja2dyb3VuZENvbG9yJywgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IsIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1TdGFydChlbnRyeSwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlWCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1TdGFydChlbnRyeSwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlWSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1TdGFydChlbnRyeSwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGV4aXN0cyhlbGVtZW50LnN0eWxlLm9wYWNpdHkpID8gcGFyc2VGbG9hdChlbGVtZW50LnN0eWxlLm9wYWNpdHkpIDogMSwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dpZHRoJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclN0YXJ0KGVudHJ5LCBlbGVtZW50Lm9mZnNldFdpZHRoLCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclN0YXJ0KGVudHJ5LCBlbGVtZW50Lm9mZnNldEhlaWdodCwgcGFyYW1zW2VudHJ5XSwgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5ICsgJyBub3Qgc2V0dXAgZm9yIGFuaW1hdGlvbiBpbiBkb20tZWFzZS4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIG51bWJlciBlbnRyeVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHNdXHJcbiAgICAgKi9cclxuICAgIG51bWJlclN0YXJ0KGVudHJ5LCBzdGFydCwgdG8sIHVuaXRzKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVhc2UgPSB7IHR5cGU6ICdudW1iZXInLCBlbnRyeSwgdG8sIHN0YXJ0LCBkZWx0YTogdG8gLSBzdGFydCwgdW5pdHM6IHVuaXRzIHx8ICcnIH1cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlYXNlKVxyXG4gICAgfVxyXG5cclxuICAgIG51bWJlclVwZGF0ZShlYXNlLCBwZXJjZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZVtlYXNlLmVudHJ5XSA9IChlYXNlLnN0YXJ0ICsgZWFzZS5kZWx0YSAqIHBlcmNlbnQpICsgZWFzZS51bml0c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV2ZXJzZSBudW1iZXIgYW5kIHRyYW5zZm9ybVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlYXNlXHJcbiAgICAgKi9cclxuICAgIGVhc2VSZXZlcnNlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3dhcCA9IGVhc2UudG9cclxuICAgICAgICBlYXNlLnRvID0gZWFzZS5zdGFydFxyXG4gICAgICAgIGVhc2Uuc3RhcnQgPSBzd2FwXHJcbiAgICAgICAgZWFzZS5kZWx0YSA9IC1lYXNlLmRlbHRhXHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtU3RhcnQoZW50cnksIHRvKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVhc2UgPSB7IHR5cGU6ICd0cmFuc2Zvcm0nLCBlbnRyeSwgdG8gfVxyXG4gICAgICAgIGlmICghdGhpcy50cmFuc2Zvcm1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWFkVHJhbnNmb3JtKClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3Jtc1xyXG4gICAgICAgIGxldCBmb3VuZFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybXMubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRyYW5zZm9ybXNbaV1cclxuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybS5uYW1lID09PSBlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6IGNhc2UgJ3NjYWxlWCc6IGNhc2UgJ3NjYWxlWSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2Uuc3RhcnQgPSBwYXJzZUZsb2F0KHRyYW5zZm9ybS52YWx1ZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzogY2FzZSAnc2NhbGVYJzogY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICBlYXNlLnN0YXJ0ID0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVhc2UuZGVsdGEgPSB0byAtIGVhc2Uuc3RhcnRcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlYXNlKVxyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybVVwZGF0ZShlYXNlLCBwZXJjZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkVHJhbnNmb3JtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWFkVHJhbnNmb3JtKClcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkVHJhbnNmb3JtID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuYW1lID0gZWFzZS5lbnRyeVxyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXNcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBlYXNlLnN0YXJ0ICsgZWFzZS5kZWx0YSAqIHBlcmNlbnRcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm1zLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3Jtc1tpXS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1zW2ldLnZhbHVlcyA9IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zLnB1c2goeyBuYW1lLCB2YWx1ZXMgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb2xvclVwZGF0ZShlYXNlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZVxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZWFzZS5zdHlsZVxyXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IGVhc2UuY29sb3JzXHJcbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IodGhpcy50aW1lIC8gZWFzZS5pbnRlcnZhbClcclxuICAgICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tpXVxyXG4gICAgICAgIGlmIChlbGVtZW50U3R5bGVbc3R5bGVdICE9PSBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRTdHlsZVtzdHlsZV0gPSBjb2xvcnNbaV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29sb3JSZXZlcnNlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IFtdXHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gZWFzZS5jb2xvcnNcclxuICAgICAgICBmb3IgKGxldCBjb2xvciBpbiBjb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXZlcnNlLnVuc2hpZnQoY29sb3JzW2NvbG9yXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV2ZXJzZS5wdXNoKHJldmVyc2Uuc2hpZnQoKSlcclxuICAgICAgICBlYXNlLmNvbG9ycyA9IHJldmVyc2VcclxuICAgIH1cclxuXHJcbiAgICBjb2xvclN0YXJ0KHN0eWxlLCBvcmlnaW5hbCwgY29sb3JzKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVhc2UgPSB7IHR5cGU6ICdjb2xvcicsIHN0eWxlIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xvcnMpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWFzZS5jb2xvcnMgPSBjb2xvcnNcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWFzZS5jb2xvcnMgPSBbY29sb3JzXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xvcnMucHVzaChvcmlnaW5hbClcclxuICAgICAgICBlYXNlLmludGVydmFsID0gdGhpcy5kdXJhdGlvbiAvIGNvbG9ycy5sZW5ndGhcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlYXNlKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLndhaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXQgLT0gZWxhcHNlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0IDwgMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxhcHNlZCA9IC10aGlzLndhaXRcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhbmdlZFRyYW5zZm9ybSA9IGZhbHNlXHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGxldCBsZWZ0b3ZlciA9IG51bGxcclxuICAgICAgICB0aGlzLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gdGhpcy5kdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxlZnRvdmVyID0gdGhpcy50aW1lIC0gdGhpcy5kdXJhdGlvblxyXG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gbGVmdG92ZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IHRoaXMuZWFzZSh0aGlzLnRpbWUsIDAsIDEsIHRoaXMuZHVyYXRpb24pXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgc3dpdGNoIChlYXNlLnR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJVcGRhdGUoZWFzZSwgcGVyY2VudClcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yVXBkYXRlKGVhc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm0nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtVXBkYXRlKGVhc2UsIHBlcmNlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jaGFuZ2VkVHJhbnNmb3JtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZVRyYW5zZm9ybSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcblxyXG4gICAgICAgIC8vIGhhbmRsZSBlbmQgb2YgZHVyYXRpb25cclxuICAgICAgICBpZiAobGVmdG92ZXIgIT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXZlcnNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2VFYXNlcygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSBsZWZ0b3ZlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wJywgdGhpcylcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmVwZWF0ICE9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwZWF0LS1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnJlcGVhdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wJywgdGhpcylcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2VFYXNlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBsaXN0W2ldXHJcbiAgICAgICAgICAgIGlmIChlYXNlLnR5cGUgPT09ICdjb2xvcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JSZXZlcnNlKGVhc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVhc2VSZXZlcnNlKGVhc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVhZFRyYW5zZm9ybSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zID0gW11cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtXHJcbiAgICAgICAgbGV0IGluc2lkZSwgbmFtZSA9ICcnLCB2YWx1ZXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm0ubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldHRlciA9IHRyYW5zZm9ybVtpXVxyXG4gICAgICAgICAgICBpZiAoaW5zaWRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV0dGVyID09PSAnKScpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybXMucHVzaCh7IG5hbWUsIHZhbHVlcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyArPSBsZXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcoJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlciAhPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gbGV0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVUcmFuc2Zvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXNcclxuICAgICAgICBsZXQgcyA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3Jtcy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXVxyXG4gICAgICAgICAgICBzICs9IHRyYW5zZm9ybS5uYW1lICsgJygnICsgdHJhbnNmb3JtLnZhbHVlcyArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiBlYXNlcyBhcmUgY29tcGxldGVcclxuICogQGV2ZW50IEVhc2UjY29tcGxldGVcclxuICogQHR5cGUge0Vhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIG9uIGVhY2ggbG9vcCB3aGlsZSBlYXNlcyBhcmUgcnVubmluZ1xyXG4gKiBAZXZlbnQgRWFzZSNlYWNoXHJcbiAqIEB0eXBlIHtFYXNlfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGVhc2VzIHJlcGVhdCBvciByZXZlcnNlXHJcbiAqIEBldmVudCBFYXNlI2xvb3BcclxuICogQHR5cGUge0Vhc2V9XHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFYXNlIl19