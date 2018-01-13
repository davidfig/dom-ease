'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('eventemitter3');
var exists = require('exists');

var Color = require('./color');
var Transform = require('./transform');
var Number = require('./number');

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
            var element = this.element;
            for (var entry in params) {
                switch (entry) {
                    case 'left':
                        this.eases['left'] = new Number(entry, element.offsetLeft, params[entry], options, 'px');
                        break;

                    case 'top':
                        this.eases['top'] = new Number(entry, element.offsetTop, params[entry], options, 'px');
                        break;

                    case 'color':
                        this.eases[entry] = new Color('color', element.style.color, params[entry], options);
                        break;

                    case 'backgroundColor':
                        this.eases[entry] = new Color('backgroundColor', element.style.backgroundColor, params[entry], options);
                        break;

                    case 'scale':
                        this.eases[entry] = new Transform(this, entry, params[entry], options);
                        break;

                    case 'scaleX':
                        this.eases[entry] = new Transform(this, entry, params[entry], options);
                        break;

                    case 'scaleY':
                        this.eases[entry] = new Transform(this, entry, params[entry], options);
                        break;

                    case 'opacity':
                        this.eases[entry] = new Number(entry, exists(element.opacity) ? parseFloat(element.opacity) : 1, params[entry], options);
                        break;

                    case 'width':
                        this.eases[entry] = new Number(entry, element.offsetWidth, params[entry], options, 'px');
                        break;

                    case 'height':
                        this.eases[entry] = new Number(entry, element.offsetHeight, params[entry], options, 'px');
                        break;

                    default:
                        console.warn(entry + ' not setup for animation in DomEase.');
                }
            }
        }
    }, {
        key: 'update',
        value: function update(elapsed) {
            this.transforms = this.readTransform();
            var element = this.element;
            var eases = this.eases;
            for (var key in eases) {
                var ease = eases[key];
                ease.time += elapsed;
                var leftover = null;
                if (ease.time >= ease.options.duration) {
                    leftover = ease.time - ease.options.duration;
                    ease.time -= leftover;
                }
                ease.update(element);
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
            this.writeTransform();
            this.emit('each', this);
            if (Object.keys(eases).length === 0) {
                this.emit('empty', this);
                return true;
            }
        }
    }, {
        key: 'readTransform',
        value: function readTransform() {
            var transforms = [];
            var transform = this.element.style.transform;
            var inside = void 0,
                name = '',
                values = void 0;
            for (var i = 0, _i = transform.length; i < _i; i++) {
                var letter = transform[i];
                if (inside) {
                    if (letter === ')') {
                        inside = false;
                        transforms.push({ name: name, values: values });
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
            return transforms;
        }
    }, {
        key: 'changeTransform',
        value: function changeTransform(name, values) {
            var transforms = this.transforms;
            for (var i = 0, _i = transforms.length; i < _i; i++) {
                if (transforms[i].name === name) {
                    transforms[i].values = values;
                    return;
                }
            }
            this.transforms.push({ name: name, values: values });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlRWxlbWVudC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiZXhpc3RzIiwiQ29sb3IiLCJUcmFuc2Zvcm0iLCJOdW1iZXIiLCJEb21FYXNlRWxlbWVudCIsImVsZW1lbnQiLCJlYXNlcyIsInBhcmFtcyIsIm9wdGlvbnMiLCJlbnRyeSIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJzdHlsZSIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwib3BhY2l0eSIsInBhcnNlRmxvYXQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsImNvbnNvbGUiLCJ3YXJuIiwiZWxhcHNlZCIsInRyYW5zZm9ybXMiLCJyZWFkVHJhbnNmb3JtIiwia2V5IiwiZWFzZSIsInRpbWUiLCJsZWZ0b3ZlciIsImR1cmF0aW9uIiwidXBkYXRlIiwicmV2ZXJzZSIsImVtaXQiLCJyZXBlYXQiLCJ3cml0ZVRyYW5zZm9ybSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJpbnNpZGUiLCJuYW1lIiwidmFsdWVzIiwiaSIsIl9pIiwibGV0dGVyIiwicHVzaCIsInMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsZUFBZUMsUUFBUSxlQUFSLENBQXJCO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7O0FBRUEsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNRyxZQUFZSCxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNSSxTQUFTSixRQUFRLFVBQVIsQ0FBZjs7SUFFTUssYzs7O0FBRUY7Ozs7Ozs7QUFPQSw0QkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBR0k7Ozs7QUFISjs7QUFPSSxjQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLQyxLQUFMLEdBQWEsRUFBYjtBQVJKO0FBU0M7Ozs7NEJBRUdDLE0sRUFBUUMsTyxFQUNaO0FBQ0ksZ0JB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VUFBeEI7QUFDQSxpQkFBSyxJQUFJbUIsSUFBSSxDQUFSLEVBQVdDLEtBQUtwQixXQUFXYyxNQUFoQyxFQUF3Q0ssSUFBSUMsRUFBNUMsRUFBZ0RELEdBQWhELEVBQ0E7QUFDSSxvQkFBSW5CLFdBQVdtQixDQUFYLEVBQWNGLElBQWQsS0FBdUJBLElBQTNCLEVBQ0E7QUFDSWpCLCtCQUFXbUIsQ0FBWCxFQUFjRCxNQUFkLEdBQXVCQSxNQUF2QjtBQUNBO0FBQ0g7QUFDSjtBQUNELGlCQUFLbEIsVUFBTCxDQUFnQnNCLElBQWhCLENBQXFCLEVBQUNMLFVBQUQsRUFBT0MsY0FBUCxFQUFyQjtBQUNIOzs7eUNBR0Q7QUFDSSxnQkFBTWxCLGFBQWEsS0FBS0EsVUFBeEI7QUFDQSxnQkFBSXVCLElBQUksRUFBUjtBQUNBLGlCQUFLLElBQUlKLElBQUksQ0FBUixFQUFXQyxLQUFLcEIsV0FBV2MsTUFBaEMsRUFBd0NLLElBQUlDLEVBQTVDLEVBQWdERCxHQUFoRCxFQUNBO0FBQ0ksb0JBQU1KLFlBQVlmLFdBQVdtQixDQUFYLENBQWxCO0FBQ0FJLHFCQUFLUixVQUFVRSxJQUFWLEdBQWlCLEdBQWpCLEdBQXVCRixVQUFVRyxNQUFqQyxHQUEwQyxHQUEvQztBQUNIO0FBQ0QsaUJBQUtuQyxPQUFMLENBQWFPLEtBQWIsQ0FBbUJ5QixTQUFuQixHQUErQlEsQ0FBL0I7QUFDSDs7OztFQWxNd0IvQyxZOztBQXFNN0I7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7O0FBT0FnRCxPQUFPQyxPQUFQLEdBQWlCM0MsY0FBakIiLCJmaWxlIjoiZWFzZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJylcclxuY29uc3QgZXhpc3RzID0gcmVxdWlyZSgnZXhpc3RzJylcclxuXHJcbmNvbnN0IENvbG9yID0gcmVxdWlyZSgnLi9jb2xvcicpXHJcbmNvbnN0IFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtJylcclxuY29uc3QgTnVtYmVyID0gcmVxdWlyZSgnLi9udW1iZXInKVxyXG5cclxuY2xhc3MgRG9tRWFzZUVsZW1lbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBlYWNoIERPTSBlbGVtZW50IGhhcyBpdHMgb3duIERvbUVhc2VFbGVtZW50IG9iamVjdCByZXR1cm5lZCBieSBhZGQoKSBvciBhY2Nlc3NlZCB0aHJvdWdoIEhUTUxFbGVtZW50Ll9fZG9tRWFzZVxyXG4gICAgICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZUVsZW1lbnQjZWFjaC0qXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZUVsZW1lbnQjY29tcGxldGUtKlxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2xvb3AtKiAtIGNhbGxlZCB3aGVuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBlbGVtZW50IGJlaW5nIGFuaW1hdGVkXHJcbiAgICAgICAgICogQG1lbWJlciB7SFRNTEVsZW1lbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMuZWFzZXMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGFkZChwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFxyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IGluIHBhcmFtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbJ2xlZnQnXSA9IG5ldyBOdW1iZXIoZW50cnksIGVsZW1lbnQub2Zmc2V0TGVmdCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucywgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1sndG9wJ10gPSBuZXcgTnVtYmVyKGVudHJ5LCBlbGVtZW50Lm9mZnNldFRvcCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucywgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBDb2xvcignY29sb3InLCBlbGVtZW50LnN0eWxlLmNvbG9yLCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBDb2xvcignYmFja2dyb3VuZENvbG9yJywgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgVHJhbnNmb3JtKHRoaXMsIGVudHJ5LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGVYJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBUcmFuc2Zvcm0odGhpcywgZW50cnksIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZVknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IFRyYW5zZm9ybSh0aGlzLCBlbnRyeSwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IE51bWJlcihlbnRyeSwgZXhpc3RzKGVsZW1lbnQub3BhY2l0eSkgPyBwYXJzZUZsb2F0KGVsZW1lbnQub3BhY2l0eSkgOiAxLCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IE51bWJlcihlbnRyeSwgZWxlbWVudC5vZmZzZXRXaWR0aCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucywgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlaWdodCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgTnVtYmVyKGVudHJ5LCBlbGVtZW50Lm9mZnNldEhlaWdodCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucywgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5ICsgJyBub3Qgc2V0dXAgZm9yIGFuaW1hdGlvbiBpbiBEb21FYXNlLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5yZWFkVHJhbnNmb3JtKClcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50XHJcbiAgICAgICAgY29uc3QgZWFzZXMgPSB0aGlzLmVhc2VzXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGVhc2VzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGVhc2VzW2tleV1cclxuICAgICAgICAgICAgZWFzZS50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICAgICAgbGV0IGxlZnRvdmVyID0gbnVsbFxyXG4gICAgICAgICAgICBpZiAoZWFzZS50aW1lID49IGVhc2Uub3B0aW9ucy5kdXJhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdG92ZXIgPSBlYXNlLnRpbWUgLSBlYXNlLm9wdGlvbnMuZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIGVhc2UudGltZSAtPSBsZWZ0b3ZlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVhc2UudXBkYXRlKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIGlmIChsZWZ0b3ZlciAhPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGVhc2Uub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2UucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZS50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yZXZlcnNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBlYXNlLnRpbWUgPSBsZWZ0b3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucmVwZWF0LS1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZS0nICsga2V5LCBlYXNlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVhc2VzW2tleV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VhY2gtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndyaXRlVHJhbnNmb3JtKClcclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCB0aGlzKVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhlYXNlcykubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbXB0eScsIHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlYWRUcmFuc2Zvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBbXVxyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1cclxuICAgICAgICBsZXQgaW5zaWRlLCBuYW1lID0gJycsIHZhbHVlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRyYW5zZm9ybS5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgbGV0dGVyID0gdHJhbnNmb3JtW2ldXHJcbiAgICAgICAgICAgIGlmIChpbnNpZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcpJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybXMucHVzaCh7IG5hbWUsIHZhbHVlcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyArPSBsZXR0ZXJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcoJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlciAhPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gbGV0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybXNcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VUcmFuc2Zvcm0obmFtZSwgdmFsdWVzKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm1zLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3Jtc1tpXS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1zW2ldLnZhbHVlcyA9IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zLnB1c2goe25hbWUsIHZhbHVlc30pXHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVUcmFuc2Zvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSB0aGlzLnRyYW5zZm9ybXNcclxuICAgICAgICBsZXQgcyA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3Jtcy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXVxyXG4gICAgICAgICAgICBzICs9IHRyYW5zZm9ybS5uYW1lICsgJygnICsgdHJhbnNmb3JtLnZhbHVlcyArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNjb21wbGV0ZS0qXHJcbiAqIEB0eXBlIHtEb21FYXNlRWxlbWVudH1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoZXJlIHRoZXJlIGFyZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNlYWNoLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGFuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNsb29wLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZUVsZW1lbnQiXX0=