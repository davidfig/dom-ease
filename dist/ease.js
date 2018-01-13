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
                    _this.numberStart(entry, exists(element.opacity) ? parseFloat(element.opacity) : 1, params[entry]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJleGlzdHMiLCJFYXNlIiwiZWxlbWVudCIsInBhcmFtcyIsIm9wdGlvbnMiLCJsaXN0IiwidGltZSIsImR1cmF0aW9uIiwiZWFzZSIsInJlcGVhdCIsInJldmVyc2UiLCJlbnRyeSIsIm51bWJlclN0YXJ0Iiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsImNvbG9yU3RhcnQiLCJzdHlsZSIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidHJhbnNmb3JtU3RhcnQiLCJvcGFjaXR5IiwicGFyc2VGbG9hdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiY29uc29sZSIsIndhcm4iLCJzdGFydCIsInRvIiwidW5pdHMiLCJ0eXBlIiwiZGVsdGEiLCJwdXNoIiwicGVyY2VudCIsInN3YXAiLCJ0cmFuc2Zvcm1zIiwicmVhZFRyYW5zZm9ybSIsImZvdW5kIiwiaSIsIl9pIiwibGVuZ3RoIiwidHJhbnNmb3JtIiwibmFtZSIsInZhbHVlcyIsImNoYW5nZWRUcmFuc2Zvcm0iLCJlbGVtZW50U3R5bGUiLCJjb2xvcnMiLCJNYXRoIiwiZmxvb3IiLCJpbnRlcnZhbCIsInVuc2hpZnQiLCJzaGlmdCIsIm9yaWdpbmFsIiwiQXJyYXkiLCJpc0FycmF5IiwiZWxhcHNlZCIsImxlZnRvdmVyIiwibnVtYmVyVXBkYXRlIiwiY29sb3JVcGRhdGUiLCJ0cmFuc2Zvcm1VcGRhdGUiLCJ3cml0ZVRyYW5zZm9ybSIsImVtaXQiLCJyZXZlcnNlRWFzZXMiLCJjb2xvclJldmVyc2UiLCJlYXNlUmV2ZXJzZSIsImluc2lkZSIsImxldHRlciIsInMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7O0lBRU1FLEk7OztBQUVGOzs7Ozs7Ozs7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Q0l2QixpQ0FBUyxFQUFUO0FBQ0FzQixpQ0FBUyxJQUFUO0FBQ0gscUJBSkQsTUFLSyxJQUFJQyxXQUFXLEdBQWYsRUFDTDtBQUNJeEIsZ0NBQVF3QixNQUFSO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7Ozt5Q0FHRDtBQUNJLGdCQUFNL0IsYUFBYSxLQUFLQSxVQUF4QjtBQUNBLGdCQUFJZ0MsSUFBSSxFQUFSO0FBQ0EsaUJBQUssSUFBSTdCLElBQUksQ0FBUixFQUFXQyxLQUFLSixXQUFXSyxNQUFoQyxFQUF3Q0YsSUFBSUMsRUFBNUMsRUFBZ0RELEdBQWhELEVBQ0E7QUFDSSxvQkFBTUcsWUFBWU4sV0FBV0csQ0FBWCxDQUFsQjtBQUNBNkIscUJBQUsxQixVQUFVQyxJQUFWLEdBQWlCLEdBQWpCLEdBQXVCRCxVQUFVRSxNQUFqQyxHQUEwQyxHQUEvQztBQUNIO0FBQ0QsaUJBQUt4QyxPQUFMLENBQWFjLEtBQWIsQ0FBbUJ3QixTQUFuQixHQUErQjBCLENBQS9CO0FBQ0g7Ozs7RUEvVmNwRSxZOztBQWtXbkI7Ozs7OztBQU1BOzs7Ozs7QUFNQTs7Ozs7O0FBTUFxRSxPQUFPQyxPQUFQLEdBQWlCbkUsSUFBakIiLCJmaWxlIjoiZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5jb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxuY2xhc3MgRWFzZSBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEVhc2UgY2xhc3MgcmV0dXJuZWQgYnkgRG9tRWFzZS5hZGQoKVxyXG4gICAgICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5sZWZ0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMud2lkdGhdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5oZWlnaHRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNjYWxlWV1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm9wYWNpdHldXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5jb2xvcl1cclxuICAgICAqIEBwYXJhbSB7KGNvbG9yfGNvbG9yW10pfSBbcGFyYW1zLmJhY2tncm91bmRDb2xvcl1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbl1cclxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IFtvcHRpb25zLmVhc2VdXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmV2ZXJzZV1cclxuICAgICAqIEByZXR1cm5zIHtFYXNlfVxyXG4gICAgICogQGZpcmVzIEVhc2UjZWFjaFxyXG4gICAgICogQGZpcmVzIEVhc2UjY29tcGxldGVcclxuICAgICAqIEBmaXJlcyBFYXNlI2xvb3BcclxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb25cclxuICAgICAgICB0aGlzLmVhc2UgPSBvcHRpb25zLmVhc2VcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IG9wdGlvbnMucmVwZWF0XHJcbiAgICAgICAgdGhpcy5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlXHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgaW4gcGFyYW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJTdGFydChlbnRyeSwgZWxlbWVudC5vZmZzZXRMZWZ0LCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclN0YXJ0KGVudHJ5LCBlbGVtZW50Lm9mZnNldFRvcCwgcGFyYW1zW2VudHJ5XSwgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yU3RhcnQoJ2NvbG9yJywgZWxlbWVudC5zdHlsZS5jb2xvciwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tncm91bmRDb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvclN0YXJ0KCdiYWNrZ3JvdW5kQ29sb3InLCBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVYJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJTdGFydChlbnRyeSwgZXhpc3RzKGVsZW1lbnQub3BhY2l0eSkgPyBwYXJzZUZsb2F0KGVsZW1lbnQub3BhY2l0eSkgOiAxLCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0V2lkdGgsIHBhcmFtc1tlbnRyeV0sICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZW50cnkgKyAnIG5vdCBzZXR1cCBmb3IgYW5pbWF0aW9uIGluIGRvbS1lYXNlLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgbnVtYmVyIGVudHJ5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bml0c11cclxuICAgICAqL1xyXG4gICAgbnVtYmVyU3RhcnQoZW50cnksIHN0YXJ0LCB0bywgdW5pdHMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ251bWJlcicsIGVudHJ5LCB0bywgc3RhcnQsIGRlbHRhOiB0byAtIHN0YXJ0LCB1bml0czogdW5pdHMgfHwgJycgfVxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgbnVtYmVyVXBkYXRlKGVhc2UsIHBlcmNlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW2Vhc2UuZW50cnldID0gKGVhc2Uuc3RhcnQgKyBlYXNlLmRlbHRhICogcGVyY2VudCkgKyBlYXNlLnVuaXRzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXZlcnNlIG51bWJlciBhbmQgdHJhbnNmb3JtXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVhc2VcclxuICAgICAqL1xyXG4gICAgZWFzZVJldmVyc2UoZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gZWFzZS50b1xyXG4gICAgICAgIGVhc2UudG8gPSBlYXNlLnN0YXJ0XHJcbiAgICAgICAgZWFzZS5zdGFydCA9IHN3YXBcclxuICAgICAgICBlYXNlLmRlbHRhID0gLWVhc2UuZGVsdGFcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm1TdGFydChlbnRyeSwgdG8pXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ3RyYW5zZm9ybScsIGVudHJ5LCB0byB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zZm9ybXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRUcmFuc2Zvcm0oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gdGhpcy50cmFuc2Zvcm1zXHJcbiAgICAgICAgbGV0IGZvdW5kXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3Jtcy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXVxyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLm5hbWUgPT09IGVudHJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVudHJ5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzogY2FzZSAnc2NhbGVYJzogY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZS5zdGFydCA9IHBhcnNlRmxvYXQodHJhbnNmb3JtLnZhbHVlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOiBjYXNlICdzY2FsZVgnOiBjYXNlICdzY2FsZVknOlxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2Uuc3RhcnQgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWFzZS5kZWx0YSA9IHRvIC0gZWFzZS5zdGFydFxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtVXBkYXRlKGVhc2UsIHBlcmNlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRUcmFuc2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRUcmFuc2Zvcm0oKVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRUcmFuc2Zvcm0gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlYXNlLmVudHJ5XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3Jtc1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGVhc2Uuc3RhcnQgKyBlYXNlLmRlbHRhICogcGVyY2VudFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybXMubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1zW2ldLm5hbWUgPT09IG5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybXNbaV0udmFsdWVzID0gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMucHVzaCh7IG5hbWUsIHZhbHVlcyB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yVXBkYXRlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudFN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlXHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBlYXNlLnN0eWxlXHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gZWFzZS5jb2xvcnNcclxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcih0aGlzLnRpbWUgLyBlYXNlLmludGVydmFsKVxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldXHJcbiAgICAgICAgaWYgKGVsZW1lbnRTdHlsZVtzdHlsZV0gIT09IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudFN0eWxlW3N0eWxlXSA9IGNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb2xvclJldmVyc2UoZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBjb25zdCBjb2xvcnMgPSBlYXNlLmNvbG9yc1xyXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdChjb2xvcnNbY29sb3JdKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXZlcnNlLnB1c2gocmV2ZXJzZS5zaGlmdCgpKVxyXG4gICAgICAgIGVhc2UuY29sb3JzID0gcmV2ZXJzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yU3RhcnQoc3R5bGUsIG9yaWdpbmFsLCBjb2xvcnMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ2NvbG9yJywgc3R5bGUgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlYXNlLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlYXNlLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbG9ycy5wdXNoKG9yaWdpbmFsKVxyXG4gICAgICAgIGVhc2UuaW50ZXJ2YWwgPSB0aGlzLmR1cmF0aW9uIC8gY29sb3JzLmxlbmd0aFxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkVHJhbnNmb3JtID0gZmFsc2VcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgbGV0IGxlZnRvdmVyID0gbnVsbFxyXG4gICAgICAgIHRoaXMudGltZSArPSBlbGFwc2VkXHJcbiAgICAgICAgaWYgKHRoaXMudGltZSA+PSB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGVmdG92ZXIgPSB0aGlzLnRpbWUgLSB0aGlzLmR1cmF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSBsZWZ0b3ZlclxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gdGhpcy5lYXNlKHRoaXMudGltZSwgMCwgMSwgdGhpcy5kdXJhdGlvbilcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSBsaXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlYXNlID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGVhc2UudHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclVwZGF0ZShlYXNlLCBwZXJjZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JVcGRhdGUoZWFzZSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1VcGRhdGUoZWFzZSwgcGVyY2VudClcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZWRUcmFuc2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlVHJhbnNmb3JtKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIGVuZCBvZiBkdXJhdGlvblxyXG4gICAgICAgIGlmIChsZWZ0b3ZlciAhPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJldmVyc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZUVhc2VzKClcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlcGVhdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmVwZWF0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlJywgdGhpcylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZUVhc2VzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgaWYgKGVhc2UudHlwZSA9PT0gJ2NvbG9yJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvclJldmVyc2UoZWFzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWFzZVJldmVyc2UoZWFzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWFkVHJhbnNmb3JtKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMgPSBbXVxyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1cclxuICAgICAgICBsZXQgaW5zaWRlLCBuYW1lID0gJycsIHZhbHVlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybS5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgbGV0dGVyID0gdHJhbnNmb3JtW2ldXHJcbiAgICAgICAgICAgIGlmIChpbnNpZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcpJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3Jtcy5wdXNoKHsgbmFtZSwgdmFsdWVzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzICs9IGxldHRlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlciA9PT0gJygnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGV0dGVyICE9PSAnICcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBsZXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVRyYW5zZm9ybSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3Jtc1xyXG4gICAgICAgIGxldCBzID0gJydcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm1zLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldXHJcbiAgICAgICAgICAgIHMgKz0gdHJhbnNmb3JtLm5hbWUgKyAnKCcgKyB0cmFuc2Zvcm0udmFsdWVzICsgJyknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGVhc2VzIGFyZSBjb21wbGV0ZVxyXG4gKiBAZXZlbnQgRWFzZSNjb21wbGV0ZVxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoaWxlIGVhc2VzIGFyZSBydW5uaW5nXHJcbiAqIEBldmVudCBFYXNlI2VhY2hcclxuICogQHR5cGUge0Vhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIHdoZW4gZWFzZXMgcmVwZWF0IG9yIHJldmVyc2VcclxuICogQGV2ZW50IEVhc2UjbG9vcFxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2UiXX0=