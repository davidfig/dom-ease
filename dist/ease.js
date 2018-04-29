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
     * @param {number} [params.right] in px
     * @param {number} [params.top] in px
     * @param {number} [params.bottom] in px
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

                case 'bottom':
                    _this.numberStart(entry, element.parentNode.offsetHeight - (element.offsetTop + element.offsetHeight), params[entry], 'px');
                    break;

                case 'right':
                    _this.numberStart(entry, element.parentNode.offsetWidth - (element.offsetLeft + element.offsetWidth), params[entry], 'px');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJleGlzdHMiLCJFYXNlIiwiZWxlbWVudCIsInBhcmFtcyIsIm9wdGlvbnMiLCJsaXN0IiwidGltZSIsImR1cmF0aW9uIiwiZWFzZSIsInJlcGVhdCIsInJldmVyc2UiLCJ3YWl0IiwiZW50cnkiLCJudW1iZXJTdGFydCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJwYXJlbnROb2RlIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJjb2xvclN0YXJ0Iiwic3R5bGUiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsInRyYW5zZm9ybVN0YXJ0Iiwib3BhY2l0eSIsInBhcnNlRmxvYXQiLCJjb25zb2xlIiwid2FybiIsInN0YXJ0IiwidG8iLCJ1bml0cyIsInR5cGUiLCJkZWx0YSIsInB1c2giLCJwZXJjZW50Iiwic3dhcCIsInRyYW5zZm9ybXMiLCJyZWFkVHJhbnNmb3JtIiwiZm91bmQiLCJpIiwiX2kiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJuYW1lIiwidmFsdWVzIiwiY2hhbmdlZFRyYW5zZm9ybSIsImVsZW1lbnRTdHlsZSIsImNvbG9ycyIsIk1hdGgiLCJmbG9vciIsImludGVydmFsIiwidW5zaGlmdCIsInNoaWZ0Iiwib3JpZ2luYWwiLCJBcnJheSIsImlzQXJyYXkiLCJlbGFwc2VkIiwibGVmdG92ZXIiLCJudW1iZXJVcGRhdGUiLCJjb2xvclVwZGF0ZSIsInRyYW5zZm9ybVVwZGF0ZSIsIndyaXRlVHJhbnNmb3JtIiwiZW1pdCIsInJldmVyc2VFYXNlcyIsImNvbG9yUmV2ZXJzZSIsImVhc2VSZXZlcnNlIiwiaW5zaWRlIiwibGV0dGVyIiwicyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLFFBQVIsQ0FBZjs7SUFF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Q0FBbEI7QUFDQTZCLHFCQUFLMUIsVUFBVUMsSUFBVixHQUFpQixHQUFqQixHQUF1QkQsVUFBVUUsTUFBakMsR0FBMEMsR0FBL0M7QUFDSDtBQUNELGlCQUFLMUMsT0FBTCxDQUFha0IsS0FBYixDQUFtQnNCLFNBQW5CLEdBQStCMEIsQ0FBL0I7QUFDSDs7OztFQXhYY3RFLFk7O0FBMlhuQjs7Ozs7O0FBTUE7Ozs7OztBQU1BOzs7Ozs7QUFNQXVFLE9BQU9DLE9BQVAsR0FBaUJyRSxJQUFqQiIsImZpbGUiOiJlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcbmNvbnN0IGV4aXN0cyA9IHJlcXVpcmUoJ2V4aXN0cycpXHJcblxyXG5jbGFzcyBFYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogRWFzZSBjbGFzcyByZXR1cm5lZCBieSBEb21FYXNlLmFkZCgpXHJcbiAgICAgKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmxlZnRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5yaWdodF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnRvcF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmJvdHRvbV0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLndpZHRoXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuaGVpZ2h0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVhdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVldXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5vcGFjaXR5XVxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuY29sb3JdXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5iYWNrZ3JvdW5kQ29sb3JdXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb25dXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBbb3B0aW9ucy5lYXNlXVxyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXBlYXRdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJldmVyc2VdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2FpdF1cclxuICAgICAqIEByZXR1cm5zIHtFYXNlfVxyXG4gICAgICogQGZpcmVzIEVhc2UjZWFjaFxyXG4gICAgICogQGZpcmVzIEVhc2UjY29tcGxldGVcclxuICAgICAqIEBmaXJlcyBFYXNlI2xvb3BcclxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgcGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb25cclxuICAgICAgICB0aGlzLmVhc2UgPSBvcHRpb25zLmVhc2VcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IG9wdGlvbnMucmVwZWF0XHJcbiAgICAgICAgdGhpcy5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlXHJcbiAgICAgICAgdGhpcy53YWl0ID0gb3B0aW9ucy53YWl0IHx8IDBcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBpbiBwYXJhbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVudHJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclN0YXJ0KGVudHJ5LCBlbGVtZW50Lm9mZnNldExlZnQsIHBhcmFtc1tlbnRyeV0sICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0VG9wLCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclN0YXJ0KGVudHJ5LCBlbGVtZW50LnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0IC0gKGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpLCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQucGFyZW50Tm9kZS5vZmZzZXRXaWR0aCAtIChlbGVtZW50Lm9mZnNldExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoKSwgcGFyYW1zW2VudHJ5XSwgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yU3RhcnQoJ2NvbG9yJywgZWxlbWVudC5zdHlsZS5jb2xvciwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tncm91bmRDb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvclN0YXJ0KCdiYWNrZ3JvdW5kQ29sb3InLCBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVYJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVN0YXJ0KGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5udW1iZXJTdGFydChlbnRyeSwgZXhpc3RzKGVsZW1lbnQuc3R5bGUub3BhY2l0eSkgPyBwYXJzZUZsb2F0KGVsZW1lbnQuc3R5bGUub3BhY2l0eSkgOiAxLCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0V2lkdGgsIHBhcmFtc1tlbnRyeV0sICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyU3RhcnQoZW50cnksIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LCBwYXJhbXNbZW50cnldLCAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZW50cnkgKyAnIG5vdCBzZXR1cCBmb3IgYW5pbWF0aW9uIGluIGRvbS1lYXNlLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgbnVtYmVyIGVudHJ5XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt1bml0c11cclxuICAgICAqL1xyXG4gICAgbnVtYmVyU3RhcnQoZW50cnksIHN0YXJ0LCB0bywgdW5pdHMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ251bWJlcicsIGVudHJ5LCB0bywgc3RhcnQsIGRlbHRhOiB0byAtIHN0YXJ0LCB1bml0czogdW5pdHMgfHwgJycgfVxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgbnVtYmVyVXBkYXRlKGVhc2UsIHBlcmNlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW2Vhc2UuZW50cnldID0gKGVhc2Uuc3RhcnQgKyBlYXNlLmRlbHRhICogcGVyY2VudCkgKyBlYXNlLnVuaXRzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXZlcnNlIG51bWJlciBhbmQgdHJhbnNmb3JtXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVhc2VcclxuICAgICAqL1xyXG4gICAgZWFzZVJldmVyc2UoZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gZWFzZS50b1xyXG4gICAgICAgIGVhc2UudG8gPSBlYXNlLnN0YXJ0XHJcbiAgICAgICAgZWFzZS5zdGFydCA9IHN3YXBcclxuICAgICAgICBlYXNlLmRlbHRhID0gLWVhc2UuZGVsdGFcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm1TdGFydChlbnRyeSwgdG8pXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ3RyYW5zZm9ybScsIGVudHJ5LCB0byB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zZm9ybXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRUcmFuc2Zvcm0oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gdGhpcy50cmFuc2Zvcm1zXHJcbiAgICAgICAgbGV0IGZvdW5kXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3Jtcy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXVxyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLm5hbWUgPT09IGVudHJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVudHJ5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzogY2FzZSAnc2NhbGVYJzogY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzZS5zdGFydCA9IHBhcnNlRmxvYXQodHJhbnNmb3JtLnZhbHVlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOiBjYXNlICdzY2FsZVgnOiBjYXNlICdzY2FsZVknOlxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2Uuc3RhcnQgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWFzZS5kZWx0YSA9IHRvIC0gZWFzZS5zdGFydFxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtVXBkYXRlKGVhc2UsIHBlcmNlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRUcmFuc2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRUcmFuc2Zvcm0oKVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRUcmFuc2Zvcm0gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlYXNlLmVudHJ5XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3Jtc1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGVhc2Uuc3RhcnQgKyBlYXNlLmRlbHRhICogcGVyY2VudFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybXMubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1zW2ldLm5hbWUgPT09IG5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybXNbaV0udmFsdWVzID0gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMucHVzaCh7IG5hbWUsIHZhbHVlcyB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yVXBkYXRlKGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudFN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlXHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBlYXNlLnN0eWxlXHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gZWFzZS5jb2xvcnNcclxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcih0aGlzLnRpbWUgLyBlYXNlLmludGVydmFsKVxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldXHJcbiAgICAgICAgaWYgKGVsZW1lbnRTdHlsZVtzdHlsZV0gIT09IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudFN0eWxlW3N0eWxlXSA9IGNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb2xvclJldmVyc2UoZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBjb25zdCBjb2xvcnMgPSBlYXNlLmNvbG9yc1xyXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdChjb2xvcnNbY29sb3JdKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXZlcnNlLnB1c2gocmV2ZXJzZS5zaGlmdCgpKVxyXG4gICAgICAgIGVhc2UuY29sb3JzID0gcmV2ZXJzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yU3RhcnQoc3R5bGUsIG9yaWdpbmFsLCBjb2xvcnMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZSA9IHsgdHlwZTogJ2NvbG9yJywgc3R5bGUgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlYXNlLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlYXNlLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbG9ycy5wdXNoKG9yaWdpbmFsKVxyXG4gICAgICAgIGVhc2UuaW50ZXJ2YWwgPSB0aGlzLmR1cmF0aW9uIC8gY29sb3JzLmxlbmd0aFxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGVhc2UpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMud2FpdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdCAtPSBlbGFwc2VkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLndhaXQgPCAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGFwc2VkID0gLXRoaXMud2FpdFxyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0ID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkVHJhbnNmb3JtID0gZmFsc2VcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgbGV0IGxlZnRvdmVyID0gbnVsbFxyXG4gICAgICAgIHRoaXMudGltZSArPSBlbGFwc2VkXHJcbiAgICAgICAgaWYgKHRoaXMudGltZSA+PSB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGVmdG92ZXIgPSB0aGlzLnRpbWUgLSB0aGlzLmR1cmF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSBsZWZ0b3ZlclxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gdGhpcy5lYXNlKHRoaXMudGltZSwgMCwgMSwgdGhpcy5kdXJhdGlvbilcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSBsaXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlYXNlID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGVhc2UudHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm51bWJlclVwZGF0ZShlYXNlLCBwZXJjZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JVcGRhdGUoZWFzZSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1VcGRhdGUoZWFzZSwgcGVyY2VudClcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZWRUcmFuc2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlVHJhbnNmb3JtKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIGVuZCBvZiBkdXJhdGlvblxyXG4gICAgICAgIGlmIChsZWZ0b3ZlciAhPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJldmVyc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZUVhc2VzKClcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlcGVhdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmVwZWF0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlJywgdGhpcylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZUVhc2VzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgaWYgKGVhc2UudHlwZSA9PT0gJ2NvbG9yJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvclJldmVyc2UoZWFzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWFzZVJldmVyc2UoZWFzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWFkVHJhbnNmb3JtKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMgPSBbXVxyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1cclxuICAgICAgICBsZXQgaW5zaWRlLCBuYW1lID0gJycsIHZhbHVlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybS5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgbGV0dGVyID0gdHJhbnNmb3JtW2ldXHJcbiAgICAgICAgICAgIGlmIChpbnNpZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcpJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3Jtcy5wdXNoKHsgbmFtZSwgdmFsdWVzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzICs9IGxldHRlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlciA9PT0gJygnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGV0dGVyICE9PSAnICcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBsZXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVRyYW5zZm9ybSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMudHJhbnNmb3Jtc1xyXG4gICAgICAgIGxldCBzID0gJydcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm1zLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldXHJcbiAgICAgICAgICAgIHMgKz0gdHJhbnNmb3JtLm5hbWUgKyAnKCcgKyB0cmFuc2Zvcm0udmFsdWVzICsgJyknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGVhc2VzIGFyZSBjb21wbGV0ZVxyXG4gKiBAZXZlbnQgRWFzZSNjb21wbGV0ZVxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoaWxlIGVhc2VzIGFyZSBydW5uaW5nXHJcbiAqIEBldmVudCBFYXNlI2VhY2hcclxuICogQHR5cGUge0Vhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIHdoZW4gZWFzZXMgcmVwZWF0IG9yIHJldmVyc2VcclxuICogQGV2ZW50IEVhc2UjbG9vcFxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2UiXX0=