'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');

var Number = require('./number');
var Color = require('./color');
var Transform = require('./transform');
var Margin = require('./margin');
var utils = require('./utils');

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
     * @param {number} [params.marginLeft] in px
     * @param {number} [params.marginRight] in px
     * @param {number} [params.marginTop] in px
     * @param {number} [params.marginBottom] in px
     * @param {(color|color[])} [params.color]
     * @param {(color|color[])} [params.backgroundColor]
     * @param {object} [options]
     * @param {number} [options.start] use this as the starting value
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
                    _this.list.push(new Number(element, entry, element.offsetLeft, params[entry], 'px'));
                    break;

                case 'top':
                    _this.list.push(new Number(element, entry, element.offsetTop, params[entry], 'px'));
                    break;

                case 'bottom':
                    _this.list.push(new Number(element, entry, element.parentNode.offsetHeight - (element.offsetTop + element.offsetHeight), params[entry], 'px'));
                    break;

                case 'right':
                    _this.list.push(new Number(element, entry, element.parentNode.offsetWidth - (element.offsetLeft + element.offsetWidth), params[entry], 'px'));
                    break;

                case 'color':
                    _this.list.push(new Color(element, 'color', params[entry], _this.duration / (1 + params[entry].length)));
                    break;

                case 'backgroundColor':
                    _this.list.push(new Color(element, 'backgroundColor', _this.duration / (1 + params[entry].length)));
                    break;

                case 'scale':
                    if (_this.transform) {
                        _this.transform.add('scaleX', params[entry]);
                    } else {
                        _this.transform = new Transform(element, 'scaleX', params[entry]);
                        _this.list.push(_this.transform);
                    }
                    _this.transform.add('scaleY', params[entry]);
                    break;

                case 'scaleX':
                case 'scaleY':
                    if (_this.transform) {
                        _this.transform.add(entry, params[entry]);
                    } else {
                        _this.transform = new Transform(element, entry, params[entry]);
                        _this.list.push(_this.transform);
                    }
                    break;

                case 'opacity':
                    _this.list.push(new Number(element, entry, utils.getComputed(element, 'opacity'), params[entry]));
                    break;

                case 'width':
                    _this.list.push(new Number(element, entry, element.offsetWidth, params[entry], 'px'));
                    break;

                case 'height':
                    _this.list.push(new Number(element, entry, element.offsetHeight, params[entry], 'px'));
                    break;

                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                    if (_this.margin) {
                        _this.margin.add(entry, params[entry]);
                    } else {
                        _this.margin = new Margin(element, entry, params[entry]);
                        _this.list.push(_this.margin);
                    }
                    break;

                default:
                    console.warn(entry + ' not setup for animation in dom-ease.');
            }
        }
        return _this;
    }

    _createClass(Ease, [{
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
            var list = this.list;
            var leftover = null;
            this.time += elapsed;
            if (this.time >= this.duration) {
                leftover = this.time - this.duration;
                this.time -= leftover;
            }
            var percent = this.ease(this.time, 0, 1, this.duration);
            for (var i = 0, _i = list.length; i < _i; i++) {
                list[i].update(percent, this.time);
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
                ease.reverse();
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsInJlcXVpcmUiLCJOdW1iZXIiLCJDb2xvciIsIlRyYW5zZm9ybSIsIk1hcmdpbiIsInV0aWxzIiwiRWFzZSIsImVsZW1lbnQiLCJwYXJhbXMiLCJvcHRpb25zIiwibGlzdCIsInRpbWUiLCJkdXJhdGlvbiIsImVhc2UiLCJyZXBlYXQiLCJyZXZlcnNlIiwid2FpdCIsImVudHJ5IiwicHVzaCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJwYXJlbnROb2RlIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJhZGQiLCJnZXRDb21wdXRlZCIsIm1hcmdpbiIsImNvbnNvbGUiLCJ3YXJuIiwiZWxhcHNlZCIsImxlZnRvdmVyIiwicGVyY2VudCIsImkiLCJfaSIsInVwZGF0ZSIsImVtaXQiLCJyZXZlcnNlRWFzZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCOztBQUVBLElBQU1DLFNBQVNELFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNRyxZQUFZSCxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNSSxTQUFTSixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1LLFFBQVFMLFFBQVEsU0FBUixDQUFkOztJQUVNTSxJOzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDQSxrQkFBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNkJDLE9BQTdCLEVBQ0E7QUFBQTs7QUFBQTs7QUFFSSxjQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLRyxJQUFMLEdBQVksRUFBWjtBQUNBLGNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsY0FBS0MsUUFBTCxHQUFnQkgsUUFBUUcsUUFBeEI7QUFD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S0MsT0FBTCxHQUFlLEtBQWY7QUFDSCxxQkFIRCxNQUlLLElBQUksS0FBS0QsTUFBTCxLQUFnQixJQUFwQixFQUNMO0FBQ0ksNkJBQUtBLE1BQUw7QUFDSDtBQUNKLGlCQWJELE1BY0ssSUFBSSxLQUFLQSxNQUFULEVBQ0w7QUFDSSx5QkFBS3VCLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EseUJBQUsxQixJQUFMLEdBQVlxQixRQUFaO0FBQ0Esd0JBQUksS0FBS2xCLE1BQUwsS0FBZ0IsSUFBcEIsRUFDQTtBQUNJLDZCQUFLQSxNQUFMO0FBQ0g7QUFDSixpQkFSSSxNQVVMO0FBQ0kseUJBQUt1QixJQUFMLENBQVUsVUFBVixFQUFzQixJQUF0QjtBQUNBLDJCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0o7Ozt1Q0FHRDtBQUNJLGdCQUFNM0IsT0FBTyxLQUFLQSxJQUFsQjtBQUNBLGlCQUFLLElBQUl3QixJQUFJLENBQVIsRUFBV0MsS0FBS3pCLEtBQUtjLE1BQTFCLEVBQWtDVSxJQUFJQyxFQUF0QyxFQUEwQ0QsR0FBMUMsRUFDQTtBQUNJLG9CQUFNckIsT0FBT0gsS0FBS3dCLENBQUwsQ0FBYjtBQUNBckIscUJBQUtFLE9BQUw7QUFDSDtBQUNKOzs7O0VBOU1jaEIsWTs7QUFpTm5COzs7Ozs7QUFNQTs7Ozs7O0FBTUE7Ozs7OztBQU1Bd0MsT0FBT0MsT0FBUCxHQUFpQmxDLElBQWpCIiwiZmlsZSI6ImVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJylcclxuXHJcbmNvbnN0IE51bWJlciA9IHJlcXVpcmUoJy4vbnVtYmVyJylcclxuY29uc3QgQ29sb3IgPSByZXF1aXJlKCcuL2NvbG9yJylcclxuY29uc3QgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKVxyXG5jb25zdCBNYXJnaW4gPSByZXF1aXJlKCcuL21hcmdpbicpXHJcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXHJcblxyXG5jbGFzcyBFYXNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogRWFzZSBjbGFzcyByZXR1cm5lZCBieSBEb21FYXNlLmFkZCgpXHJcbiAgICAgKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmxlZnRdIGluIHB4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5yaWdodF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnRvcF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmJvdHRvbV0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLndpZHRoXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuaGVpZ2h0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuc2NhbGVdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVhdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5zY2FsZVldXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5vcGFjaXR5XVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMubWFyZ2luTGVmdF0gaW4gcHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLm1hcmdpblJpZ2h0XSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMubWFyZ2luVG9wXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMubWFyZ2luQm90dG9tXSBpbiBweFxyXG4gICAgICogQHBhcmFtIHsoY29sb3J8Y29sb3JbXSl9IFtwYXJhbXMuY29sb3JdXHJcbiAgICAgKiBAcGFyYW0geyhjb2xvcnxjb2xvcltdKX0gW3BhcmFtcy5iYWNrZ3JvdW5kQ29sb3JdXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuc3RhcnRdIHVzZSB0aGlzIGFzIHRoZSBzdGFydGluZyB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uXVxyXG4gICAgICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gW29wdGlvbnMuZWFzZV1cclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmVwZWF0XVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXZlcnNlXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLndhaXRdXHJcbiAgICAgKiBAcmV0dXJucyB7RWFzZX1cclxuICAgICAqIEBmaXJlcyBFYXNlI2VhY2hcclxuICAgICAqIEBmaXJlcyBFYXNlI2NvbXBsZXRlXHJcbiAgICAgKiBAZmlyZXMgRWFzZSNsb29wXHJcbiAgICAgKiBAaGlkZWNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHBhcmFtcywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uXHJcbiAgICAgICAgdGhpcy5lYXNlID0gb3B0aW9ucy5lYXNlXHJcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBvcHRpb25zLnJlcGVhdFxyXG4gICAgICAgIHRoaXMucmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZVxyXG4gICAgICAgIHRoaXMud2FpdCA9IG9wdGlvbnMud2FpdCB8fCAwXHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgaW4gcGFyYW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IE51bWJlcihlbGVtZW50LCBlbnRyeSwgZWxlbWVudC5vZmZzZXRMZWZ0LCBwYXJhbXNbZW50cnldLCAncHgnKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IE51bWJlcihlbGVtZW50LCBlbnRyeSwgZWxlbWVudC5vZmZzZXRUb3AsIHBhcmFtc1tlbnRyeV0sICdweCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChuZXcgTnVtYmVyKGVsZW1lbnQsIGVudHJ5LCBlbGVtZW50LnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0IC0gKGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpLCBwYXJhbXNbZW50cnldLCAncHgnKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChuZXcgTnVtYmVyKGVsZW1lbnQsIGVudHJ5LCBlbGVtZW50LnBhcmVudE5vZGUub2Zmc2V0V2lkdGggLSAoZWxlbWVudC5vZmZzZXRMZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCksIHBhcmFtc1tlbnRyeV0sICdweCcpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKG5ldyBDb2xvcihlbGVtZW50LCAnY29sb3InLCBwYXJhbXNbZW50cnldLCB0aGlzLmR1cmF0aW9uIC8gKDEgKyBwYXJhbXNbZW50cnldLmxlbmd0aCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChuZXcgQ29sb3IoZWxlbWVudCwgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuZHVyYXRpb24gLyAoMSArIHBhcmFtc1tlbnRyeV0ubGVuZ3RoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uYWRkKCdzY2FsZVgnLCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oZWxlbWVudCwgJ3NjYWxlWCcsIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKHRoaXMudHJhbnNmb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5hZGQoJ3NjYWxlWScsIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZVgnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5hZGQoZW50cnksIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybShlbGVtZW50LCBlbnRyeSwgcGFyYW1zW2VudHJ5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2godGhpcy50cmFuc2Zvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IE51bWJlcihlbGVtZW50LCBlbnRyeSwgdXRpbHMuZ2V0Q29tcHV0ZWQoZWxlbWVudCwgJ29wYWNpdHknKSwgcGFyYW1zW2VudHJ5XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd3aWR0aCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IE51bWJlcihlbGVtZW50LCBlbnRyeSwgZWxlbWVudC5vZmZzZXRXaWR0aCwgcGFyYW1zW2VudHJ5XSwgJ3B4JykpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKG5ldyBOdW1iZXIoZWxlbWVudCwgZW50cnksIGVsZW1lbnQub2Zmc2V0SGVpZ2h0LCBwYXJhbXNbZW50cnldLCAncHgnKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ21hcmdpbkxlZnQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWFyZ2luUmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWFyZ2luVG9wJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21hcmdpbkJvdHRvbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFyZ2luKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJnaW4uYWRkKGVudHJ5LCBwYXJhbXNbZW50cnldKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmdpbiA9IG5ldyBNYXJnaW4oZWxlbWVudCwgZW50cnksIHBhcmFtc1tlbnRyeV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKHRoaXMubWFyZ2luKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5ICsgJyBub3Qgc2V0dXAgZm9yIGFuaW1hdGlvbiBpbiBkb20tZWFzZS4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLndhaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXQgLT0gZWxhcHNlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0IDwgMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxhcHNlZCA9IC10aGlzLndhaXRcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdCA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBsZXQgbGVmdG92ZXIgPSBudWxsXHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IHRoaXMuZHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZWZ0b3ZlciA9IHRoaXMudGltZSAtIHRoaXMuZHVyYXRpb25cclxuICAgICAgICAgICAgdGhpcy50aW1lIC09IGxlZnRvdmVyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSB0aGlzLmVhc2UodGhpcy50aW1lLCAwLCAxLCB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IGxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpc3RbaV0udXBkYXRlKHBlcmNlbnQsIHRoaXMudGltZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIGVuZCBvZiBkdXJhdGlvblxyXG4gICAgICAgIGlmIChsZWZ0b3ZlciAhPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJldmVyc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZUVhc2VzKClcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlcGVhdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucmVwZWF0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlJywgdGhpcylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZUVhc2VzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gbGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgZWFzZS5yZXZlcnNlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGVhc2VzIGFyZSBjb21wbGV0ZVxyXG4gKiBAZXZlbnQgRWFzZSNjb21wbGV0ZVxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoaWxlIGVhc2VzIGFyZSBydW5uaW5nXHJcbiAqIEBldmVudCBFYXNlI2VhY2hcclxuICogQHR5cGUge0Vhc2V9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIHdoZW4gZWFzZXMgcmVwZWF0IG9yIHJldmVyc2VcclxuICogQGV2ZW50IEVhc2UjbG9vcFxyXG4gKiBAdHlwZSB7RWFzZX1cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2UiXX0=