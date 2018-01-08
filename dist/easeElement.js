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
        _this.animations = {};
        return _this;
    }

    _createClass(DomEaseElement, [{
        key: 'add',
        value: function add(DomEaseElement, options) {
            for (var entry in DomEaseElement) {
                switch (entry) {
                    case 'left':
                        this.animations['left'] = new Left(this.element, DomEaseElement[entry], options);
                        break;

                    case 'top':
                        this.animations['top'] = new Top(this.element, DomEaseElement[entry], options);
                        break;

                    case 'color':
                        this.animations[entry] = new Color(this.element, DomEaseElement[entry], options);
                        break;

                    case 'backgroundColor':
                        this.animations[entry] = new BackgroundColor(this.element, DomEaseElement[entry], options);
                        break;

                    case 'scale':
                        this.animations[entry] = new Scale(this.element, DomEaseElement[entry], options);
                        break;

                    case 'scaleX':
                        this.animations[entry] = new ScaleX(this.element, DomEaseElement[entry], options);
                        break;

                    case 'scaleY':
                        this.animations[entry] = new ScaleY(this.element, DomEaseElement[entry], options);
                        break;

                    case 'opacity':
                        this.animations[entry] = new Opacity(this.element, DomEaseElement[entry], options);
                        break;

                    case 'width':
                        this.animations[entry] = new Width(this.element, DomEaseElement[entry], options);
                        break;

                    case 'height':
                        this.animations[entry] = new Height(this.element, DomEaseElement[entry], options);
                        break;

                    default:
                        console.warn(entry + ' not setup for animation in DomEase.');
                }
            }
        }
    }, {
        key: 'update',
        value: function update(elapsed) {
            var animations = this.animations;
            for (var animation in animations) {
                var _DomEaseElement = animations[animation];
                if (_DomEaseElement.update(elapsed)) {
                    var options = _DomEaseElement.options;
                    if (options.reverse) {
                        this.emit('loop-' + _DomEaseElement.name, _DomEaseElement.element);
                        _DomEaseElement.reverse();
                        if (!options.repeat) {
                            options.reverse = false;
                        }
                        if (options.repeat !== true) {
                            options.repeat--;
                        }
                    }
                    if (options.repeat) {
                        _DomEaseElement.repeat();
                        if (options.repeat !== true) {
                            options.repeat--;
                        }
                    } else {
                        this.emit('complete-' + _DomEaseElement.name, _DomEaseElement.element);
                        delete animations[animation];
                    }
                }
                this.emit('each-' + _DomEaseElement.name, _DomEaseElement.element);
            }
            this.emit('each', this);
            if (Object.keys(animations) === 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlRWxlbWVudC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiTGVmdCIsIlRvcCIsIkNvbG9yIiwiQmFja2dyb3VuZENvbG9yIiwiU2NhbGVYIiwiU2NhbGVZIiwiU2NhbGUiLCJPcGFjaXR5IiwiV2lkdGgiLCJIZWlnaHQiLCJEb21FYXNlRWxlbWVudCIsImVsZW1lbnQiLCJhbmltYXRpb25zIiwib3B0aW9ucyIsImVudHJ5IiwiY29uc29sZSIsIndhcm4iLCJlbGFwc2VkIiwiYW5pbWF0aW9uIiwidXBkYXRlIiwicmV2ZXJzZSIsImVtaXQiLCJuYW1lIiwicmVwZWF0IiwiT2JqZWN0Iiwia2V5cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNRSxNQUFNRixRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQU1HLFFBQVFILFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUksa0JBQWtCSixRQUFRLG1CQUFSLENBQXhCO0FBQ0EsSUFBTUssU0FBU0wsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1PLFFBQVFQLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTVEsVUFBVVIsUUFBUSxXQUFSLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNVSxTQUFTVixRQUFRLFVBQVIsQ0FBZjs7SUFFTVcsYzs7O0FBRUY7Ozs7Ozs7QUFPQSw0QkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBR0k7Ozs7QUFISjs7QUFPSSxjQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBUko7QUFTQzs7Ozs0QkFFR0YsYyxFQUFnQkcsTyxFQUNwQjtBQUNJLGlCQUFLLElB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QTtBQUNJVixvQ0FBUVUsTUFBUjtBQUNIO0FBQ0o7QUFDRCx3QkFBSVYsUUFBUVUsTUFBWixFQUNBO0FBQ0liLHdDQUFlYSxNQUFmO0FBQ0EsNEJBQUlWLFFBQVFVLE1BQVIsS0FBbUIsSUFBdkIsRUFDQTtBQUNJVixvQ0FBUVUsTUFBUjtBQUNIO0FBQ0oscUJBUEQsTUFTQTtBQUNJLDZCQUFLRixJQUFMLENBQVUsY0FBY1gsZ0JBQWVZLElBQXZDLEVBQTZDWixnQkFBZUMsT0FBNUQ7QUFDQSwrQkFBT0MsV0FBV00sU0FBWCxDQUFQO0FBQ0g7QUFDSjtBQUNELHFCQUFLRyxJQUFMLENBQVUsVUFBVVgsZ0JBQWVZLElBQW5DLEVBQXlDWixnQkFBZUMsT0FBeEQ7QUFDSDtBQUNELGlCQUFLVSxJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQjtBQUNBLGdCQUFJRyxPQUFPQyxJQUFQLENBQVliLFVBQVosTUFBNEIsQ0FBaEMsRUFDQTtBQUNJLHFCQUFLUyxJQUFMLENBQVUsT0FBVixFQUFtQixJQUFuQjtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQUNKOzs7O0VBckh3QnZCLFk7O0FBd0g3Qjs7Ozs7OztBQU9BOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTRCLE9BQU9DLE9BQVAsR0FBaUJqQixjQUFqQiIsImZpbGUiOiJlYXNlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgTGVmdCA9IHJlcXVpcmUoJy4vbGVmdCcpXHJcbmNvbnN0IFRvcCA9IHJlcXVpcmUoJy4vdG9wJylcclxuY29uc3QgQ29sb3IgPSByZXF1aXJlKCcuL2NvbG9yJylcclxuY29uc3QgQmFja2dyb3VuZENvbG9yID0gcmVxdWlyZSgnLi9iYWNrZ3JvdW5kQ29sb3InKVxyXG5jb25zdCBTY2FsZVggPSByZXF1aXJlKCcuL3NjYWxlWCcpXHJcbmNvbnN0IFNjYWxlWSA9IHJlcXVpcmUoJy4vc2NhbGVZJylcclxuY29uc3QgU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJylcclxuY29uc3QgT3BhY2l0eSA9IHJlcXVpcmUoJy4vb3BhY2l0eScpXHJcbmNvbnN0IFdpZHRoID0gcmVxdWlyZSgnLi93aWR0aCcpXHJcbmNvbnN0IEhlaWdodCA9IHJlcXVpcmUoJy4vaGVpZ2h0JylcclxuXHJcbmNsYXNzIERvbUVhc2VFbGVtZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogZWFjaCBET00gZWxlbWVudCBoYXMgaXRzIG93biBEb21FYXNlRWxlbWVudCBvYmplY3QgcmV0dXJuZWQgYnkgYWRkKCkgb3IgYWNjZXNzZWQgdGhyb3VnaCBIVE1MRWxlbWVudC5fX2RvbUVhc2VcclxuICAgICAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2VhY2gtKlxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2NvbXBsZXRlLSpcclxuICAgICAqIEBmaXJlcyBEb21FYXNlRWxlbWVudCNsb29wLSogLSBjYWxsZWQgd2hlbiBhbmltYXRpb24gcmVwZWF0cyBvciByZXZlcnNlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKClcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZWxlbWVudCBiZWluZyBhbmltYXRlZFxyXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGFkZChEb21FYXNlRWxlbWVudCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBpbiBEb21FYXNlRWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1snbGVmdCddID0gbmV3IExlZnQodGhpcy5lbGVtZW50LCBEb21FYXNlRWxlbWVudFtlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1sndG9wJ10gPSBuZXcgVG9wKHRoaXMuZWxlbWVudCwgRG9tRWFzZUVsZW1lbnRbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tlbnRyeV0gPSBuZXcgQ29sb3IodGhpcy5lbGVtZW50LCBEb21FYXNlRWxlbWVudFtlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tlbnRyeV0gPSBuZXcgQmFja2dyb3VuZENvbG9yKHRoaXMuZWxlbWVudCwgRG9tRWFzZUVsZW1lbnRbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tlbnRyeV0gPSBuZXcgU2NhbGUodGhpcy5lbGVtZW50LCBEb21FYXNlRWxlbWVudFtlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZVgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tlbnRyeV0gPSBuZXcgU2NhbGVYKHRoaXMuZWxlbWVudCwgRG9tRWFzZUVsZW1lbnRbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnNbZW50cnldID0gbmV3IFNjYWxlWSh0aGlzLmVsZW1lbnQsIERvbUVhc2VFbGVtZW50W2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tlbnRyeV0gPSBuZXcgT3BhY2l0eSh0aGlzLmVsZW1lbnQsIERvbUVhc2VFbGVtZW50W2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dpZHRoJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnNbZW50cnldID0gbmV3IFdpZHRoKHRoaXMuZWxlbWVudCwgRG9tRWFzZUVsZW1lbnRbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnNbZW50cnldID0gbmV3IEhlaWdodCh0aGlzLmVsZW1lbnQsIERvbUVhc2VFbGVtZW50W2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5ICsgJyBub3Qgc2V0dXAgZm9yIGFuaW1hdGlvbiBpbiBEb21FYXNlLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9uc1xyXG4gICAgICAgIGZvciAobGV0IGFuaW1hdGlvbiBpbiBhbmltYXRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgRG9tRWFzZUVsZW1lbnQgPSBhbmltYXRpb25zW2FuaW1hdGlvbl1cclxuICAgICAgICAgICAgaWYgKERvbUVhc2VFbGVtZW50LnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IERvbUVhc2VFbGVtZW50Lm9wdGlvbnNcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wLScgKyBEb21FYXNlRWxlbWVudC5uYW1lLCBEb21FYXNlRWxlbWVudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIERvbUVhc2VFbGVtZW50LnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJldmVyc2UgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUVhc2VFbGVtZW50LnJlcGVhdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwZWF0ICE9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NvbXBsZXRlLScgKyBEb21FYXNlRWxlbWVudC5uYW1lLCBEb21FYXNlRWxlbWVudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhbmltYXRpb25zW2FuaW1hdGlvbl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VhY2gtJyArIERvbUVhc2VFbGVtZW50Lm5hbWUsIERvbUVhc2VFbGVtZW50LmVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGFuaW1hdGlvbnMpID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbXB0eScsIHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNjb21wbGV0ZS0qXHJcbiAqIEB0eXBlIHtEb21FYXNlRWxlbWVudH1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoZXJlIHRoZXJlIGFyZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNlYWNoLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGFuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNsb29wLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZUVsZW1lbnQiXX0=