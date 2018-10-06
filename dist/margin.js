'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('./utils');

var ORDER = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];

module.exports = function () {
    function Margin(element, entry, to) {
        _classCallCheck(this, Margin);

        this.element = element;
        this.margins = {
            marginTop: { start: parseInt(utils.getComputed(element, 'margin-top')) },
            marginRight: { start: parseInt(utils.getComputed(element, 'margin-right')) },
            marginBottom: { start: parseInt(utils.getComputed(element, 'margin-bottom')) },
            marginLeft: { start: parseInt(utils.getComputed(element, 'margin-left')) }
        };
        this.add(entry, to);
    }

    _createClass(Margin, [{
        key: 'add',
        value: function add(entry, to) {
            var margin = this.margins[entry];
            margin.animate = true;
            margin.to = to;
            margin.delta = to - margin.start;
        }
    }, {
        key: 'update',
        value: function update(percent) {
            var value = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ORDER[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var margin = this.margins[key];
                    if (margin.animate) {
                        value += Math.round(margin.start + margin.delta * percent) + 'px ';
                    } else {
                        value += margin.start + 'px ';
                    }
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

            this.element.style.margin = value;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = ORDER[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var order = _step2.value;

                    var margin = this.margins[order];
                    if (margin.animate) {
                        var swap = margin.to;
                        margin.to = margin.start;
                        margin.start = swap;
                        margin.delta = -margin.delta;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Margin;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXJnaW4uanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZXF1aXJlIiwiT1JERVIiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsImVudHJ5IiwidG8iLCJtYXJnaW5zIiwibWFyZ2luVG9wIiwic3RhcnQiLCJwYXJzZUludCIsImdldENvbXB1dGVkIiwibWFyZ2luUmlnaHQiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwiYWRkIiwibWFyZ2luIiwiYW5pbWF0ZSIsImRlbHRhIiwicGVyY2VudCIsInZhbHVlIiwia2V5IiwiTWF0aCIsInJvdW5kIiwic3R5bGUiLCJvcmRlciIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLFFBQVFDLFFBQVEsU0FBUixDQUFkOztBQUVBLElBQU1DLFFBQVEsQ0FBQyxXQUFELEVBQWMsYUFBZCxFQUE2QixjQUE3QixFQUE2QyxZQUE3QyxDQUFkOztBQUVBQyxPQUFPQyxPQUFQO0FBRUksb0JBQVlDLE9BQVosRUFBcUJDLEtBQXJCLEVBQTRCQyxFQUE1QixFQUNBO0FBQUE7O0FBQ0ksYUFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csT0FBTCxHQUFlO0FBQ1hDLHVCQUFXLEVBQUVDLE9BQU9DLFNBQVNYLE1BQU1ZLFdBQU4sQ0FBa0JQLE9BQWxCLEVBQTJCLFlBQTNCLENBQVQsQ0FBVCxFQURBO0FBRVhRLHlCQUFhLEVBQUVILE9BQU9DLFNBQVNYLE1BQU1ZLFdBQU4sQ0FBa0JQLE9BQWxCLEVBQTJCLGNBQTNCLENBQVQsQ0FBVCxFQUZGO0FBR1hTLDBCQUFjLEVBQUVKLE9BQU9DLFNBQVNYLE1BQU1ZLFdBQU4sQ0FBa0JQLE9BQWxCLEVBQTJCLGVBQTNCLENBQVQsQ0FBVCxFQUhIO0FBSVhVLHdCQUFZLEVBQUVMLE9BQU9DLFNBQVNYLE1BQU1ZLFdBQU4sQ0FBa0JQLE9BQWxCLEVBQTJCLGFBQTNCLENBQVQsQ0FBVDtBQUpELFNBQWY7QUFNQSxhQUFLVyxHQUFMLENBQVNWLEtBQVQsRUFBZ0JDLEVBQWhCO0FBQ0g7O0FBWkw7QUFBQTtBQUFBLDRCQWNRRCxLQWRSLEVBY2VDLEVBZGYsRUFlSTtBQUNJLGdCQUFNVSxTQUFTLEtBQUtULE9BQUwsQ0FBYUYsS0FBYixDQUFmO0FBQ0FXLG1CQUFPQyxPQUFQLEdBQWlCLElBQWpCO0FBQ0FELG1CQUFPVixFQUFQLEdBQVlBLEVBQVo7QUFDQVUsbUJBQU9FLEtBQVAsR0FBZVosS0FBS1UsT0FBT1AsS0FBM0I7QUFDSDtBQXBCTDtBQUFBO0FBQUEsK0JBc0JXVSxPQXRCWCxFQXVCSTtBQUNJLGdCQUFJQyxRQUFRLEVBQVo7QUFESjtBQUFBO0FBQUE7O0FBQUE7QUFFSSxxQ0FBZ0JuQixLQUFoQiw4SEFDQTtBQUFBLHdCQURTb0IsR0FDVDs7QUFDSSx3QkFBTUwsU0FBUyxLQUFLVCxPQUFMLENBQWFjLEdBQWIsQ0FBZjtBQUNBLHdCQUFJTCxPQUFPQyxPQUFYLEVBQ0E7QUFDSUcsaUNBQVNFLEtBQUtDLEtBQUwsQ0FBV1AsT0FBT1AsS0FBUCxHQUFlTyxPQUFPRSxLQUFQLEdBQWVDLE9BQXpDLElBQW9ELEtBQTdEO0FBQ0gscUJBSEQsTUFLQTtBQUNJQyxpQ0FBU0osT0FBT1AsS0FBUCxHQUFlLEtBQXhCO0FBQ0g7QUFDSjtBQWJMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY0ksaUJBQUtMLE9BQUwsQ0FBYW9CLEtBQWIsQ0FBbUJSLE1BQW5CLEdBQTRCSSxLQUE1QjtBQUNIO0FBdENMO0FBQUE7QUFBQSxrQ0F5Q0k7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDSSxzQ0FBa0JuQixLQUFsQixtSUFDQTtBQUFBLHdCQURTd0IsS0FDVDs7QUFDSSx3QkFBTVQsU0FBUyxLQUFLVCxPQUFMLENBQWFrQixLQUFiLENBQWY7QUFDQSx3QkFBSVQsT0FBT0MsT0FBWCxFQUNBO0FBQ0ksNEJBQU1TLE9BQU9WLE9BQU9WLEVBQXBCO0FBQ0FVLCtCQUFPVixFQUFQLEdBQVlVLE9BQU9QLEtBQW5CO0FBQ0FPLCtCQUFPUCxLQUFQLEdBQWVpQixJQUFmO0FBQ0FWLCtCQUFPRSxLQUFQLEdBQWUsQ0FBQ0YsT0FBT0UsS0FBdkI7QUFDSDtBQUNKO0FBWEw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlDO0FBckRMOztBQUFBO0FBQUEiLCJmaWxlIjoibWFyZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcclxuXHJcbmNvbnN0IE9SREVSID0gWydtYXJnaW5Ub3AnLCAnbWFyZ2luUmlnaHQnLCAnbWFyZ2luQm90dG9tJywgJ21hcmdpbkxlZnQnXVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBNYXJnaW5cclxue1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgZW50cnksIHRvKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLm1hcmdpbnMgPSB7XHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogeyBzdGFydDogcGFyc2VJbnQodXRpbHMuZ2V0Q29tcHV0ZWQoZWxlbWVudCwgJ21hcmdpbi10b3AnKSkgfSxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IHsgc3RhcnQ6IHBhcnNlSW50KHV0aWxzLmdldENvbXB1dGVkKGVsZW1lbnQsICdtYXJnaW4tcmlnaHQnKSkgfSxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiB7IHN0YXJ0OiBwYXJzZUludCh1dGlscy5nZXRDb21wdXRlZChlbGVtZW50LCAnbWFyZ2luLWJvdHRvbScpKSB9LFxyXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiB7IHN0YXJ0OiBwYXJzZUludCh1dGlscy5nZXRDb21wdXRlZChlbGVtZW50LCAnbWFyZ2luLWxlZnQnKSkgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZChlbnRyeSwgdG8pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGVudHJ5LCB0bylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBtYXJnaW4gPSB0aGlzLm1hcmdpbnNbZW50cnldXHJcbiAgICAgICAgbWFyZ2luLmFuaW1hdGUgPSB0cnVlXHJcbiAgICAgICAgbWFyZ2luLnRvID0gdG9cclxuICAgICAgICBtYXJnaW4uZGVsdGEgPSB0byAtIG1hcmdpbi5zdGFydFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShwZXJjZW50KVxyXG4gICAge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9SREVSKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5tYXJnaW5zW2tleV1cclxuICAgICAgICAgICAgaWYgKG1hcmdpbi5hbmltYXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBNYXRoLnJvdW5kKG1hcmdpbi5zdGFydCArIG1hcmdpbi5kZWx0YSAqIHBlcmNlbnQpICsgJ3B4ICdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlICs9IG1hcmdpbi5zdGFydCArICdweCAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLm1hcmdpbiA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgb3JkZXIgb2YgT1JERVIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBtYXJnaW4gPSB0aGlzLm1hcmdpbnNbb3JkZXJdXHJcbiAgICAgICAgICAgIGlmIChtYXJnaW4uYW5pbWF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3dhcCA9IG1hcmdpbi50b1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLnRvID0gbWFyZ2luLnN0YXJ0XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4uc3RhcnQgPSBzd2FwXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4uZGVsdGEgPSAtbWFyZ2luLmRlbHRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=