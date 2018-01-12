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
                var leftover = ease.time >= ease.options.duration ? ease.time - ease.options.duration : null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlRWxlbWVudC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiTGVmdCIsIlRvcCIsIkNvbG9yIiwiQmFja2dyb3VuZENvbG9yIiwiU2NhbGVYIiwiU2NhbGVZIiwiU2NhbGUiLCJPcGFjaXR5IiwiV2lkdGgiLCJIZWlnaHQiLCJEb21FYXNlRWxlbWVudCIsImVsZW1lbnQiLCJlYXNlcyIsInBhcmFtcyIsIm9wdGlvbnMiLCJlbnRyeSIsImNvbnNvbGUiLCJ3YXJuIiwiZWxhcHNlZCIsImtleSIsImVhc2UiLCJ0aW1lIiwibGVmdG92ZXIiLCJkdXJhdGlvbiIsInVwZGF0ZSIsInJldmVyc2UiLCJlbWl0IiwicmVwZWF0IiwiT2JqZWN0Iiwia2V5cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNRSxNQUFNRixRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQU1HLFFBQVFILFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUksa0JBQWtCSixRQUFRLG1CQUFSLENBQXhCO0FBQ0EsSUFBTUssU0FBU0wsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1PLFFBQVFQLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTVEsVUFBVVIsUUFBUSxXQUFSLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNVSxTQUFTVixRQUFRLFVBQVIsQ0FBZjs7SUFFTVcsYzs7O0FBRUY7Ozs7Ozs7QUFPQSw0QkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBR0k7Ozs7QUFISjs7QUFPSSxjQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLQyxLQUFMLEdBQWEsRUFBYjtBQVJKO0FBU0M7Ozs7NEJBRUdDLE0sRUFBUUMsTyxFQUNaO0FBQ0ksaUJBQUssSUFBSUMsS0FBVCxJQUFrQkYsTUFBbEIsRUFDQTtBQUNJLHdCQUFRRSxLQUFSO0FBRUkseUJBQUssTUFBTDtBQUNJLDZCQUFLSCxLQUFMLENBQVcsTUFBWCxJQUFxQixJQUFJWixJQUFKLENBQVMsS0FBS1csT0FBZCxFQUF1QkUsT0FBT0UsS0FBUCxDQUF2QixFQUFzQ0QsT0FBdEMsQ0FBckI7QUFDQTs7QUFFSix5QkFBSyxLQUFMO0FBQ0ksNkJBQUtGLEtBQUwsQ0FBVyxLQUFYLElBQW9CLElBQUlYLEdBQUosQ0FBUSxLQUFLVSxPQUFiLEVBQXNCRSxPQUFPRSxLQUFQLENBQXRCLEVBQXFDRCxPQUFyQyxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLE9BQUw7QUFDSSw2QkFBS0YsS0FBTCxDQUFXRyxLQUFYLElBQW9CLElBQUliLEtBQUosQ0FBVSxLQUFLUyxPQUFmLEVBQXdCRSxPQUFPRSxLQUFQLENBQXhCLEVBQXVDRCxPQUF2QyxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLGlCQUFMO0FBQ0ksNkJBQUtGLEtBQUwsQ0FBV0csS0FBWCxJQUFvQixJQUFJWixlQUFKLENBQW9CLEtBQUtRLE9BQXpCLEVBQWtDRSxPQUFPRSxLQUFQLENBQWxDLEVBQWlERCxPQUFqRCxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLE9BQUw7QUFDSSw2QkFBS0YsS0FBTCxDQUFXRyxLQUFYLElBQW9CLElBQUlULEtBQUosQ0FBVSxLQUFLSyxPQUFmLEVBQXdCRSxPQUFPRSxLQUFQLENBQXhCLEVBQXVDRCxPQUF2QyxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLFFBQUw7QUFDSSw2QkFBS0YsS0FBTCxDQUFXRyxLQUFYLElBQW9CLElBQUlYLE1BQUosQ0FBVyxLQUFLTyxPQUFoQixFQUF5QkUsT0FBT0UsS0FBUCxDQUF6QixFQUF3Q0QsT0FBeEMsQ0FBcEI7QUFDQTs7QUFFSix5QkFBSyxRQUFMO0FBQ0ksNkJBQUtGLEtBQUwsQ0FBV0csS0FBWCxJQUFvQixJQUFJVixNQUFKLENBQVcsS0FBS00sT0FBaEIsRUFBeUJFLE9BQU9FLEtBQVAsQ0FBekIsRUFBd0NELE9BQXhDLENBQXBCO0FBQ0E7O0FBRUoseUJBQUssU0FBTDtBQUNJLDZCQUFLRixLQUFMLENBQVdHLEtBQVgsSUFBb0IsSUFBSVIsT0FBSixDQUFZLEtBQUtJLE9BQWpCLEVBQTBCRSxPQUFPRSxLQUFQLENBQTFCLEVBQXlDRCxPQUF6QyxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLE9BQUw7QUFDSSw2QkFBS0YsS0FBTCxDQUFXRyxLQUFYLElBQW9CLElBQUlQLEtBQUosQ0FBVSxLQUFLRyxPQUFmLEVBQXdCRSxPQUFPRSxLQUFQLENBQXhCLEVBQXVDRCxPQUF2QyxDQUFwQjtBQUNBOztBQUVKLHlCQUFLLFFBQUw7QUFDSSw2QkFBS0YsS0FBTCxDQUFXRyxLQUFYLElBQW9CLElBQUlOLE1BQUosQ0FBVyxLQUFLRSxPQUFoQixFQUF5QkUsT0FBT0UsS0FBUCxDQUF6QixFQUF3Q0QsT0FBeEMsQ0FBcEI7QUFDQTs7QUFFSjtBQUNJRSxnQ0FBUUMsSUFBUixDQUFhRixRQUFRLHNDQUFyQjtBQTNDUjtBQTZDSDtBQUNKOzs7K0JBRU1HLE8sRUFDUDtBQUNJLGdCQUFNTixRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsaUJBQUssSUFBSU8sR0FBVCxJQUFnQlAsS0FBaEIsRUFDQTtBQUNJLG9CQUFNUSxPQUFPUixNQUFNTyxHQUFOLENBQWI7QUFDQUMscUJBQUtDLElBQUwsSUFBYUgsT0FBYjtBQUNBLG9CQUFNSSxXQUFZRixLQUFLQyxJQUFMLElBQWFELEtBQUtOLE9BQUwsQ0FBYVMsUUFBM0IsR0FBdUNILEtBQUtDLElBQUwsR0FBWUQsS0FBS04sT0FBTCxDQUFhUyxRQUFoRSxHQUEyRSxJQUE1RjtBQUNBSCxxQkFBS0ksTUFBTDtBQUNBLG9CQUFJRixhQUFhLElBQWpCLEVBQ0E7QUFDSSx3QkFBTVIsVUFBVU0sS0FBS04sT0FBckI7QUFDQSx3QkFBSUEsUUFBUVcsT0FBWixFQUNBO0FBQ0ksNkJBQUtDLElBQUwsQ0FBVSxVQUFVUCxHQUFwQixFQUF5QkMsS0FBS1QsT0FBOUI7QUFDQVMsNkJBQUtLLE9BQUw7QUFDQUwsNkJBQUtDLElBQUwsR0FBWUMsUUFBWjtBQUNBLDRCQUFJLENBQUNSLFFBQVFhLE1BQWIsRUFDQTtBQUNJYixvQ0FBUVcsT0FBUixHQUFrQixLQUFsQjtBQUNILHlCQUhELE1BSUssSUFBSVgsUUFBUWEsTUFBUixLQUFtQixJQUF2QixFQUNMO0FBQ0liLG9DQUFRYSxNQUFSO0FBQ0g7QUFDSixxQkFiRCxNQWNLLElBQUliLFFBQVFhLE1BQVosRUFDTDtBQUNJLDZCQUFLRCxJQUFMLENBQVUsVUFBVVAsR0FBcEIsRUFBeUJDLEtBQUtULE9BQTlCO0FBQ0FTLDZCQUFLQyxJQUFMLEdBQVlDLFFBQVo7QUFDQSw0QkFBSVIsUUFBUWEsTUFBUixLQUFtQixJQUF2QixFQUNBO0FBQ0liLG9DQUFRYSxNQUFSO0FBQ0g7QUFDSixxQkFSSSxNQVVMO0FBQ0ksNkJBQUtELElBQUwsQ0FBVSxjQUFjUCxHQUF4QixFQUE2QkMsS0FBS1QsT0FBbEM7QUFDQSwrQkFBT0MsTUFBTU8sR0FBTixDQUFQO0FBQ0g7QUFDSjtBQUNELHFCQUFLTyxJQUFMLENBQVUsVUFBVVAsR0FBcEIsRUFBeUJDLEtBQUtULE9BQTlCO0FBQ0g7QUFDRCxpQkFBS2UsSUFBTCxDQUFVLE1BQVYsRUFBa0IsSUFBbEI7QUFDQSxnQkFBSUUsT0FBT0MsSUFBUCxDQUFZakIsS0FBWixNQUF1QixDQUEzQixFQUNBO0FBQ0kscUJBQUtjLElBQUwsQ0FBVSxPQUFWLEVBQW1CLElBQW5CO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7Ozs7RUExSHdCNUIsWTs7QUE2SDdCOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BZ0MsT0FBT0MsT0FBUCxHQUFpQnJCLGNBQWpCIiwiZmlsZSI6ImVhc2VFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcblxyXG5jb25zdCBMZWZ0ID0gcmVxdWlyZSgnLi9sZWZ0JylcclxuY29uc3QgVG9wID0gcmVxdWlyZSgnLi90b3AnKVxyXG5jb25zdCBDb2xvciA9IHJlcXVpcmUoJy4vY29sb3InKVxyXG5jb25zdCBCYWNrZ3JvdW5kQ29sb3IgPSByZXF1aXJlKCcuL2JhY2tncm91bmRDb2xvcicpXHJcbmNvbnN0IFNjYWxlWCA9IHJlcXVpcmUoJy4vc2NhbGVYJylcclxuY29uc3QgU2NhbGVZID0gcmVxdWlyZSgnLi9zY2FsZVknKVxyXG5jb25zdCBTY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKVxyXG5jb25zdCBPcGFjaXR5ID0gcmVxdWlyZSgnLi9vcGFjaXR5JylcclxuY29uc3QgV2lkdGggPSByZXF1aXJlKCcuL3dpZHRoJylcclxuY29uc3QgSGVpZ2h0ID0gcmVxdWlyZSgnLi9oZWlnaHQnKVxyXG5cclxuY2xhc3MgRG9tRWFzZUVsZW1lbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBlYWNoIERPTSBlbGVtZW50IGhhcyBpdHMgb3duIERvbUVhc2VFbGVtZW50IG9iamVjdCByZXR1cm5lZCBieSBhZGQoKSBvciBhY2Nlc3NlZCB0aHJvdWdoIEhUTUxFbGVtZW50Ll9fZG9tRWFzZVxyXG4gICAgICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZUVsZW1lbnQjZWFjaC0qXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZUVsZW1lbnQjY29tcGxldGUtKlxyXG4gICAgICogQGZpcmVzIERvbUVhc2VFbGVtZW50I2xvb3AtKiAtIGNhbGxlZCB3aGVuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBlbGVtZW50IGJlaW5nIGFuaW1hdGVkXHJcbiAgICAgICAgICogQG1lbWJlciB7SFRNTEVsZW1lbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMuZWFzZXMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGFkZChwYXJhbXMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgaW4gcGFyYW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1snbGVmdCddID0gbmV3IExlZnQodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzWyd0b3AnXSA9IG5ldyBUb3AodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IENvbG9yKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tncm91bmRDb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgQmFja2dyb3VuZENvbG9yKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBTY2FsZSh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZVgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IFNjYWxlWCh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzY2FsZVknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IFNjYWxlWSh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdvcGFjaXR5JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBPcGFjaXR5KHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dpZHRoJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBXaWR0aCh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IEhlaWdodCh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlbnRyeSArICcgbm90IHNldHVwIGZvciBhbmltYXRpb24gaW4gRG9tRWFzZS4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGVhc2VzID0gdGhpcy5lYXNlc1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBlYXNlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVhc2UgPSBlYXNlc1trZXldXHJcbiAgICAgICAgICAgIGVhc2UudGltZSArPSBlbGFwc2VkXHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRvdmVyID0gKGVhc2UudGltZSA+PSBlYXNlLm9wdGlvbnMuZHVyYXRpb24pID8gZWFzZS50aW1lIC0gZWFzZS5vcHRpb25zLmR1cmF0aW9uIDogbnVsbFxyXG4gICAgICAgICAgICBlYXNlLnVwZGF0ZSgpXHJcbiAgICAgICAgICAgIGlmIChsZWZ0b3ZlciAhPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGVhc2Uub3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2UucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZS50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yZXZlcnNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5yZXBlYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBlYXNlLnRpbWUgPSBsZWZ0b3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucmVwZWF0LS1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZS0nICsga2V5LCBlYXNlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVhc2VzW2tleV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VhY2gtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCB0aGlzKVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhlYXNlcykgPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VtcHR5JywgdGhpcylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGFuaW1hdGlvbnNcclxuICogd2hlcmUgbmFtZSBpcyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudCBiZWluZyBEb21FYXNlRWxlbWVudGQgKGUuZy4sIGNvbXBsZXRlLWxlZnQgZmlyZXMgd2hlbiBsZWZ0IGZpbmlzaGVzIGFuaW1hdGluZylcclxuICogQGV2ZW50IERvbUVhc2VFbGVtZW50I2NvbXBsZXRlLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyBvbiBlYWNoIGxvb3Agd2hlcmUgdGhlcmUgYXJlIGFuaW1hdGlvbnNcclxuICogd2hlcmUgbmFtZSBpcyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudCBiZWluZyBEb21FYXNlRWxlbWVudGQgKGUuZy4sIGNvbXBsZXRlLWxlZnQgZmlyZXMgd2hlbiBsZWZ0IGZpbmlzaGVzIGFuaW1hdGluZylcclxuICogQGV2ZW50IERvbUVhc2VFbGVtZW50I2VhY2gtKlxyXG4gKiBAdHlwZSB7RG9tRWFzZUVsZW1lbnR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGZpcmVzIHdoZW4gYW4gYW5pbWF0aW9uIHJlcGVhdHMgb3IgcmV2ZXJzZXNcclxuICogd2hlcmUgbmFtZSBpcyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudCBiZWluZyBEb21FYXNlRWxlbWVudGQgKGUuZy4sIGNvbXBsZXRlLWxlZnQgZmlyZXMgd2hlbiBsZWZ0IGZpbmlzaGVzIGFuaW1hdGluZylcclxuICogQGV2ZW50IERvbUVhc2VFbGVtZW50I2xvb3AtKlxyXG4gKiBAdHlwZSB7RG9tRWFzZUVsZW1lbnR9XHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb21FYXNlRWxlbWVudCJdfQ==