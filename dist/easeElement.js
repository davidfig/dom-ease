'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');

var Left = require('./left');
var Top = require('./top');
var Color = require('./color');
var BackgroundColor = require('./backgroundColor');
var ScaleX = require('./scaleX');
var ScaleY = require('./scaleY');
var Scale = require('./scale');
var Opacity = require('./opacity');
var Width = require('./width');
var Height = require('./height');

var DomEaseElement = function (_EventEmitter) {
    _inherits(DomEaseElement, _EventEmitter);

    /**
     * each DOM element has its own DomEaseElement object returned by add() or accessed through HTMLElement.__domEase
     * @extends EventEmitter
     * @fires DomEaseElement#each-*
     * @fires DomEaseElement#complete-*
     * @fires DomEaseElement#loop-* - called when animation repeats or reverses
     */
    function DomEaseElement(element) {
        _classCallCheck(this, DomEaseElement);

        /**
         * element being animated
         * @member {HTMLElement}
         */
        var _this = _possibleConstructorReturn(this, (DomEaseElement.__proto__ || Object.getPrototypeOf(DomEaseElement)).call(this));

        _this.element = element;
        _this.eases = {};
        return _this;
    }

    _createClass(DomEaseElement, [{
        key: 'add',
        value: function add(params, options) {
            for (var entry in params) {
                switch (entry) {
                    case 'left':
                        this.eases['left'] = new Left(this.element, params[entry], options);
                        break;

                    case 'top':
                        this.eases['top'] = new Top(this.element, params[entry], options);
                        break;

                    case 'color':
                        this.eases[entry] = new Color(this.element, params[entry], options);
                        break;

                    case 'backgroundColor':
                        this.eases[entry] = new BackgroundColor(this.element, params[entry], options);
                        break;

                    case 'scale':
                        this.eases[entry] = new Scale(this.element, params[entry], options);
                        break;

                    case 'scaleX':
                        this.eases[entry] = new ScaleX(this.element, params[entry], options);
                        break;

                    case 'scaleY':
                        this.eases[entry] = new ScaleY(this.element, params[entry], options);
                        break;

                    case 'opacity':
                        this.eases[entry] = new Opacity(this.element, params[entry], options);
                        break;

                    case 'width':
                        this.eases[entry] = new Width(this.element, params[entry], options);
                        break;

                    case 'height':
                        this.eases[entry] = new Height(this.element, params[entry], options);
                        break;

                    default:
                        console.warn(entry + ' not setup for animation in DomEase.');
                }
            }
        }
    }, {
        key: 'update',
        value: function update(elapsed) {
            var eases = this.eases;
            for (var key in eases) {
                var ease = eases[key];
                ease.time += elapsed;
                var leftover = null;
                if (ease.time >= ease.options.duration) {
                    leftover = ease.time - ease.options.duration;
                    ease.time -= leftover;
                }
                ease.update();
                if (leftover !== null) {
                    var options = ease.options;
                    if (options.reverse) {
                        this.emit('loop-' + key, ease.element);
                        ease.reverse();
                        ease.time = leftover;
                        if (!options.repeat) {
                            options.reverse = false;
                        } else if (options.repeat !== true) {
                            options.repeat--;
                        }
                    } else if (options.repeat) {
                        this.emit('loop-' + key, ease.element);
                        ease.time = leftover;
                        if (options.repeat !== true) {
                            options.repeat--;
                        }
                    } else {
                        this.emit('complete-' + key, ease.element);
                        delete eases[key];
                    }
                }
                this.emit('each-' + key, ease.element);
            }
            this.emit('each', this);
            if (Object.keys(eases) === 0) {
                this.emit('empty', this);
                return true;
            }
        }
    }]);

    return DomEaseElement;
}(EventEmitter);

/**
 * fires when there are no more animations
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#complete-*
 * @type {DomEaseElement}
 */

/**
 * fires on each loop where there are animations
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#each-*
 * @type {DomEaseElement}
 */

/**
 * fires when an animation repeats or reverses
 * where name is the name of the element being DomEaseElementd (e.g., complete-left fires when left finishes animating)
 * @event DomEaseElement#loop-*
 * @type {DomEaseElement}
 */

module.exports = DomEaseElement;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlRWxlbWVudC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiTGVmdCIsIlRvcCIsIkNvbG9yIiwiQmFja2dyb3VuZENvbG9yIiwiU2NhbGVYIiwiU2NhbGVZIiwiU2NhbGUiLCJPcGFjaXR5IiwiV2lkdGgiLCJIZWlnaHQiLCJEb21FYXNlRWxlbWVudCIsImVsZW1lbnQiLCJlYXNlcyIsInBhcmFtcyIsIm9wdGlvbnMiLCJlbnRyeSIsImNvbnNvbGUiLCJ3YXJuIiwiZWxhcHNlZCIsImtleSIsImVhc2UiLCJ0aW1lIiwibGVmdG92ZXIiLCJkdXJhdGlvbiIsInVwZGF0ZSIsInJldmVyc2UiLCJlbWl0IiwicmVwZWF0IiwiT2JqZWN0Iiwia2V5cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNRSxNQUFNRixRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQU1HLFFBQVFILFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUksa0JBQWtCSixRQUFRLG1CQUFSLENBQXhCO0FBQ0EsSUFBTUssU0FBU0wsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1PLFFBQVFQLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTVEsVUFBVVIsUUFBUSxXQUFSLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNVSxTQUFTVixRQUFRLFVBQVIsQ0FBZjs7SUFFTVcsYzs7O0FBRUY7Ozs7Ozs7QUFPQSw0QkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBR0k7Ozs7QUFISjs7QUFPSSxjQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLQyxLQUFMLEdBQWEsRUFBYjtBQVJKO0FBU0M7Ozs7NEJBRUdDLE0sRUFB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QVosRUFDQTtBQUNJLDZCQUFLQyxJQUFMLENBQVUsVUFBVVAsR0FBcEIsRUFBeUJDLEtBQUtULE9BQTlCO0FBQ0FTLDZCQUFLSyxPQUFMO0FBQ0FMLDZCQUFLQyxJQUFMLEdBQVlDLFFBQVo7QUFDQSw0QkFBSSxDQUFDUixRQUFRYSxNQUFiLEVBQ0E7QUFDSWIsb0NBQVFXLE9BQVIsR0FBa0IsS0FBbEI7QUFDSCx5QkFIRCxNQUlLLElBQUlYLFFBQVFhLE1BQVIsS0FBbUIsSUFBdkIsRUFDTDtBQUNJYixvQ0FBUWEsTUFBUjtBQUNIO0FBQ0oscUJBYkQsTUFjSyxJQUFJYixRQUFRYSxNQUFaLEVBQ0w7QUFDSSw2QkFBS0QsSUFBTCxDQUFVLFVBQVVQLEdBQXBCLEVBQXlCQyxLQUFLVCxPQUE5QjtBQUNBUyw2QkFBS0MsSUFBTCxHQUFZQyxRQUFaO0FBQ0EsNEJBQUlSLFFBQVFhLE1BQVIsS0FBbUIsSUFBdkIsRUFDQTtBQUNJYixvQ0FBUWEsTUFBUjtBQUNIO0FBQ0oscUJBUkksTUFVTDtBQUNJLDZCQUFLRCxJQUFMLENBQVUsY0FBY1AsR0FBeEIsRUFBNkJDLEtBQUtULE9BQWxDO0FBQ0EsK0JBQU9DLE1BQU1PLEdBQU4sQ0FBUDtBQUNIO0FBQ0o7QUFDRCxxQkFBS08sSUFBTCxDQUFVLFVBQVVQLEdBQXBCLEVBQXlCQyxLQUFLVCxPQUE5QjtBQUNIO0FBQ0QsaUJBQUtlLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0EsZ0JBQUlFLE9BQU9DLElBQVAsQ0FBWWpCLEtBQVosTUFBdUIsQ0FBM0IsRUFDQTtBQUNJLHFCQUFLYyxJQUFMLENBQVUsT0FBVixFQUFtQixJQUFuQjtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQUNKOzs7O0VBL0h3QjVCLFk7O0FBa0k3Qjs7Ozs7OztBQU9BOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQWdDLE9BQU9DLE9BQVAsR0FBaUJyQixjQUFqQiIsImZpbGUiOiJlYXNlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgTGVmdCA9IHJlcXVpcmUoJy4vbGVmdCcpXHJcbmNvbnN0IFRvcCA9IHJlcXVpcmUoJy4vdG9wJylcclxuY29uc3QgQ29sb3IgPSByZXF1aXJlKCcuL2NvbG9yJylcclxuY29uc3QgQmFja2dyb3VuZENvbG9yID0gcmVxdWlyZSgnLi9iYWNrZ3JvdW5kQ29sb3InKVxyXG5jb25zdCBTY2FsZVggPSByZXF1aXJlKCcuL3NjYWxlWCcpXHJcbmNvbnN0IFNjYWxlWSA9IHJlcXVpcmUoJy4vc2NhbGVZJylcclxuY29uc3QgU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJylcclxuY29uc3QgT3BhY2l0eSA9IHJlcXVpcmUoJy4vb3BhY2l0eScpXHJcbmNvbnN0IFdpZHRoID0gcmVxdWlyZSgnLi93aWR0aCcpXHJcbmNvbnN0IEhlaWdodCA9IHJlcXVpcmUoJy4vaGVpZ2h0JylcclxuXHJcbmNsYXNzIERvbUVhc2VFbGVtZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogZWFjaCBET00gZWxlbWVudCBoYXMgaXRzIG93biBEb21FYXNlRWxlbWVudCBvYmplY3QgcmV0dXJuZWQgYnkgYWRkKCkgb3IgYWNjZXNzZWQgdGhyb3VnaCBIVE1MRWxlbWVudC5fX2RvbUVhc2VcclxuICAgICAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2VhY2gtKlxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2NvbXBsZXRlLSpcclxuICAgICAqIEBmaXJlcyBEb21FYXNlRWxlbWVudCNsb29wLSogLSBjYWxsZWQgd2hlbiBhbmltYXRpb24gcmVwZWF0cyBvciByZXZlcnNlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZWxlbWVudCBiZWluZyBhbmltYXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLmVhc2VzID0ge31cclxuICAgIH1cclxuXHJcbiAgICBhZGQocGFyYW1zLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IGluIHBhcmFtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbJ2xlZnQnXSA9IG5ldyBMZWZ0KHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1sndG9wJ10gPSBuZXcgVG9wKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBDb2xvcih0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IEJhY2tncm91bmRDb2xvcih0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgU2NhbGUodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVYJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBTY2FsZVgodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBTY2FsZVkodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgT3BhY2l0eSh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd3aWR0aCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgV2lkdGgodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBIZWlnaHQodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZW50cnkgKyAnIG5vdCBzZXR1cCBmb3IgYW5pbWF0aW9uIGluIERvbUVhc2UuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBlYXNlcyA9IHRoaXMuZWFzZXNcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZWFzZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlYXNlID0gZWFzZXNba2V5XVxyXG4gICAgICAgICAgICBlYXNlLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgICAgICBsZXQgbGVmdG92ZXIgPSBudWxsXHJcbiAgICAgICAgICAgIGlmIChlYXNlLnRpbWUgPj0gZWFzZS5vcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0b3ZlciA9IGVhc2UudGltZSAtIGVhc2Uub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgZWFzZS50aW1lIC09IGxlZnRvdmVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWFzZS51cGRhdGUoKVxyXG4gICAgICAgICAgICBpZiAobGVmdG92ZXIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBlYXNlLm9wdGlvbnNcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBlYXNlLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2UudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlcGVhdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVwZWF0ICE9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbG9vcC0nICsga2V5LCBlYXNlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZS50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnY29tcGxldGUtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlYXNlc1trZXldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlYWNoLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZWFzZXMpID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbXB0eScsIHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNjb21wbGV0ZS0qXHJcbiAqIEB0eXBlIHtEb21FYXNlRWxlbWVudH1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoZXJlIHRoZXJlIGFyZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNlYWNoLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGFuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNsb29wLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZUVsZW1lbnQiXX0=