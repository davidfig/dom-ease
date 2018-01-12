'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exists = require('exists');

module.exports = function () {
    function Opacity(element, opacity, options) {
        _classCallCheck(this, Opacity);

        this.element = element;
        this.to = opacity;
        this.options = options;
        this.start = exists(element.opacity) ? parseFloat(element.opacity) : 1;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Opacity, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            this.element.style.opacity = options.ease(this.time, this.start, this.delta, options.duration);
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var swap = this.to;
            this.to = this.start;
            this.start = swap;
            this.delta = -this.delta;
        }
    }]);

    return Opacity;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vcGFjaXR5LmpzIl0sIm5hbWVzIjpbImV4aXN0cyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsIm9wYWNpdHkiLCJvcHRpb25zIiwidG8iLCJzdGFydCIsInBhcnNlRmxvYXQiLCJkZWx0YSIsInRpbWUiLCJzdHlsZSIsImVhc2UiLCJkdXJhdGlvbiIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmOztBQUVBQyxPQUFPQyxPQUFQO0FBRUkscUJBQVlDLE9BQVosRUFBcUJDLE9BQXJCLEVBQThCQyxPQUE5QixFQUNBO0FBQUE7O0FBQ0ksYUFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csRUFBTCxHQUFVRixPQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsS0FBTCxHQUFhUixPQUFPSSxRQUFRQyxPQUFmLElBQTBCSSxXQUFXTCxRQUFRQyxPQUFuQixDQUExQixHQUF3RCxDQUFyRTtBQUNBLGFBQUtLLEtBQUwsR0FBYSxLQUFLSCxFQUFMLEdBQVUsS0FBS0MsS0FBNUI7QUFDQSxhQUFLRyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQVZMO0FBQUE7QUFBQSxpQ0FhSTtBQUNJLGdCQUFNTCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtGLE9BQUwsQ0FBYVEsS0FBYixDQUFtQlAsT0FBbkIsR0FBNkJDLFFBQVFPLElBQVIsQ0FBYSxLQUFLRixJQUFsQixFQUF3QixLQUFLSCxLQUE3QixFQUFvQyxLQUFLRSxLQUF6QyxFQUFnREosUUFBUVEsUUFBeEQsQ0FBN0I7QUFDSDtBQWhCTDtBQUFBO0FBQUEsa0NBbUJJO0FBQ0ksZ0JBQU1DLE9BQU8sS0FBS1IsRUFBbEI7QUFDQSxpQkFBS0EsRUFBTCxHQUFVLEtBQUtDLEtBQWY7QUFDQSxpQkFBS0EsS0FBTCxHQUFhTyxJQUFiO0FBQ0EsaUJBQUtMLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUF4Qkw7O0FBQUE7QUFBQSIsImZpbGUiOiJvcGFjaXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhpc3RzID0gcmVxdWlyZSgnZXhpc3RzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgT3BhY2l0eVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcGFjaXR5LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLnRvID0gb3BhY2l0eVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZXhpc3RzKGVsZW1lbnQub3BhY2l0eSkgPyBwYXJzZUZsb2F0KGVsZW1lbnQub3BhY2l0eSkgOiAxXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3B0aW9ucy5lYXNlKHRoaXMudGltZSwgdGhpcy5zdGFydCwgdGhpcy5kZWx0YSwgb3B0aW9ucy5kdXJhdGlvbilcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==