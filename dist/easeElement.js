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
                var leftover = ease.time >= ease.duration ? ease.time - ease.duration : null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lYXNlRWxlbWVudC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiTGVmdCIsIlRvcCIsIkNvbG9yIiwiQmFja2dyb3VuZENvbG9yIiwiU2NhbGVYIiwiU2NhbGVZIiwiU2NhbGUiLCJPcGFjaXR5IiwiV2lkdGgiLCJIZWlnaHQiLCJEb21FYXNlRWxlbWVudCIsImVsZW1lbnQiLCJlYXNlcyIsInBhcmFtcyIsIm9wdGlvbnMiLCJlbnRyeSIsImNvbnNvbGUiLCJ3YXJuIiwiZWxhcHNlZCIsImtleSIsImVhc2UiLCJ0aW1lIiwibGVmdG92ZXIiLCJkdXJhdGlvbiIsInVwZGF0ZSIsInJldmVyc2UiLCJlbWl0IiwicmVwZWF0IiwiT2JqZWN0Iiwia2V5cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxlQUFlQyxRQUFRLGVBQVIsQ0FBckI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNRSxNQUFNRixRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQU1HLFFBQVFILFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUksa0JBQWtCSixRQUFRLG1CQUFSLENBQXhCO0FBQ0EsSUFBTUssU0FBU0wsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1PLFFBQVFQLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTVEsVUFBVVIsUUFBUSxXQUFSLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNVSxTQUFTVixRQUFRLFVBQVIsQ0FBZjs7SUFFTVcsYzs7O0FBRUY7Ozs7Ozs7QUFPQSw0QkFBWUMsT0FBWixFQUNBO0FBQUE7O0FBR0k7Ozs7QUFISjs7QUFPSSxjQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxjQUFLQyxLQUFMLEdBQWEsRUFBYjtBQVJKO0FBU0M7Ozs7NEJBRUdDLE0sRUFB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S0ssT0FBTDtBQUNBTCw2QkFBS0MsSUFBTCxHQUFZQyxRQUFaO0FBQ0EsNEJBQUksQ0FBQ1IsUUFBUWEsTUFBYixFQUNBO0FBQ0liLG9DQUFRVyxPQUFSLEdBQWtCLEtBQWxCO0FBQ0gseUJBSEQsTUFJSyxJQUFJWCxRQUFRYSxNQUFSLEtBQW1CLElBQXZCLEVBQ0w7QUFDSWIsb0NBQVFhLE1BQVI7QUFDSDtBQUNKLHFCQWJELE1BY0ssSUFBSWIsUUFBUWEsTUFBWixFQUNMO0FBQ0ksNkJBQUtELElBQUwsQ0FBVSxVQUFVUCxHQUFwQixFQUF5QkMsS0FBS1QsT0FBOUI7QUFDQVMsNkJBQUtDLElBQUwsR0FBWUMsUUFBWjtBQUNBLDRCQUFJUixRQUFRYSxNQUFSLEtBQW1CLElBQXZCLEVBQ0E7QUFDSWIsb0NBQVFhLE1BQVI7QUFDSDtBQUNKLHFCQVJJLE1BVUw7QUFDSSw2QkFBS0QsSUFBTCxDQUFVLGNBQWNQLEdBQXhCLEVBQTZCQyxLQUFLVCxPQUFsQztBQUNBLCtCQUFPQyxNQUFNTyxHQUFOLENBQVA7QUFDSDtBQUNKO0FBQ0QscUJBQUtPLElBQUwsQ0FBVSxVQUFVUCxHQUFwQixFQUF5QkMsS0FBS1QsT0FBOUI7QUFDSDtBQUNELGlCQUFLZSxJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQjtBQUNBLGdCQUFJRSxPQUFPQyxJQUFQLENBQVlqQixLQUFaLE1BQXVCLENBQTNCLEVBQ0E7QUFDSSxxQkFBS2MsSUFBTCxDQUFVLE9BQVYsRUFBbUIsSUFBbkI7QUFDQSx1QkFBTyxJQUFQO0FBQ0g7QUFDSjs7OztFQTFId0I1QixZOztBQTZIN0I7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7O0FBT0FnQyxPQUFPQyxPQUFQLEdBQWlCckIsY0FBakIiLCJmaWxlIjoiZWFzZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJylcclxuXHJcbmNvbnN0IExlZnQgPSByZXF1aXJlKCcuL2xlZnQnKVxyXG5jb25zdCBUb3AgPSByZXF1aXJlKCcuL3RvcCcpXHJcbmNvbnN0IENvbG9yID0gcmVxdWlyZSgnLi9jb2xvcicpXHJcbmNvbnN0IEJhY2tncm91bmRDb2xvciA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZENvbG9yJylcclxuY29uc3QgU2NhbGVYID0gcmVxdWlyZSgnLi9zY2FsZVgnKVxyXG5jb25zdCBTY2FsZVkgPSByZXF1aXJlKCcuL3NjYWxlWScpXHJcbmNvbnN0IFNjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpXHJcbmNvbnN0IE9wYWNpdHkgPSByZXF1aXJlKCcuL29wYWNpdHknKVxyXG5jb25zdCBXaWR0aCA9IHJlcXVpcmUoJy4vd2lkdGgnKVxyXG5jb25zdCBIZWlnaHQgPSByZXF1aXJlKCcuL2hlaWdodCcpXHJcblxyXG5jbGFzcyBEb21FYXNlRWxlbWVudCBleHRlbmRzIEV2ZW50RW1pdHRlclxyXG57XHJcbiAgICAvKipcclxuICAgICAqIGVhY2ggRE9NIGVsZW1lbnQgaGFzIGl0cyBvd24gRG9tRWFzZUVsZW1lbnQgb2JqZWN0IHJldHVybmVkIGJ5IGFkZCgpIG9yIGFjY2Vzc2VkIHRocm91Z2ggSFRNTEVsZW1lbnQuX19kb21FYXNlXHJcbiAgICAgKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxuICAgICAqIEBmaXJlcyBEb21FYXNlRWxlbWVudCNlYWNoLSpcclxuICAgICAqIEBmaXJlcyBEb21FYXNlRWxlbWVudCNjb21wbGV0ZS0qXHJcbiAgICAgKiBAZmlyZXMgRG9tRWFzZUVsZW1lbnQjbG9vcC0qIC0gY2FsbGVkIHdoZW4gYW5pbWF0aW9uIHJlcGVhdHMgb3IgcmV2ZXJzZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGVsZW1lbnQgYmVpbmcgYW5pbWF0ZWRcclxuICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5lYXNlcyA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHBhcmFtcywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBpbiBwYXJhbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVudHJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzWydsZWZ0J10gPSBuZXcgTGVmdCh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbJ3RvcCddID0gbmV3IFRvcCh0aGlzLmVsZW1lbnQsIHBhcmFtc1tlbnRyeV0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgQ29sb3IodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVhc2VzW2VudHJ5XSA9IG5ldyBCYWNrZ3JvdW5kQ29sb3IodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IFNjYWxlKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlWCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgU2NhbGVYKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlWSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgU2NhbGVZKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IE9wYWNpdHkodGhpcy5lbGVtZW50LCBwYXJhbXNbZW50cnldLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWFzZXNbZW50cnldID0gbmV3IFdpZHRoKHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlaWdodCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYXNlc1tlbnRyeV0gPSBuZXcgSGVpZ2h0KHRoaXMuZWxlbWVudCwgcGFyYW1zW2VudHJ5XSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5ICsgJyBub3Qgc2V0dXAgZm9yIGFuaW1hdGlvbiBpbiBEb21FYXNlLicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZWFzZXMgPSB0aGlzLmVhc2VzXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGVhc2VzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWFzZSA9IGVhc2VzW2tleV1cclxuICAgICAgICAgICAgZWFzZS50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICAgICAgY29uc3QgbGVmdG92ZXIgPSAoZWFzZS50aW1lID49IGVhc2UuZHVyYXRpb24pID8gZWFzZS50aW1lIC0gZWFzZS5kdXJhdGlvbiA6IG51bGxcclxuICAgICAgICAgICAgZWFzZS51cGRhdGUoKVxyXG4gICAgICAgICAgICBpZiAobGVmdG92ZXIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBlYXNlLm9wdGlvbnNcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBlYXNlLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2UudGltZSA9IGxlZnRvdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJlcGVhdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVwZWF0ICE9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5yZXBlYXQtLVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbG9vcC0nICsga2V5LCBlYXNlLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZS50aW1lID0gbGVmdG92ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnY29tcGxldGUtJyArIGtleSwgZWFzZS5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlYXNlc1trZXldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlYWNoLScgKyBrZXksIGVhc2UuZWxlbWVudClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZWFzZXMpID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlbXB0eScsIHRoaXMpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZmlyZXMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNjb21wbGV0ZS0qXHJcbiAqIEB0eXBlIHtEb21FYXNlRWxlbWVudH1cclxuICovXHJcblxyXG4vKipcclxuICogZmlyZXMgb24gZWFjaCBsb29wIHdoZXJlIHRoZXJlIGFyZSBhbmltYXRpb25zXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNlYWNoLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBmaXJlcyB3aGVuIGFuIGFuaW1hdGlvbiByZXBlYXRzIG9yIHJldmVyc2VzXHJcbiAqIHdoZXJlIG5hbWUgaXMgdGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgYmVpbmcgRG9tRWFzZUVsZW1lbnRkIChlLmcuLCBjb21wbGV0ZS1sZWZ0IGZpcmVzIHdoZW4gbGVmdCBmaW5pc2hlcyBhbmltYXRpbmcpXHJcbiAqIEBldmVudCBEb21FYXNlRWxlbWVudCNsb29wLSpcclxuICogQHR5cGUge0RvbUVhc2VFbGVtZW50fVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9tRWFzZUVsZW1lbnQiXX0=