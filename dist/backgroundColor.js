"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function BackgroundColor(element, colors, options) {
        _classCallCheck(this, BackgroundColor);

        this.element = element;
        if (Array.isArray(colors)) {
            this.colors = colors;
        } else {
            this.colors = [colors];
        }
        this.original = element.style.backgroundColor;
        colors.push(this.original);
        this.interval = options.duration / colors.length;
        this.options = options;
        this.time = 0;
    }

    _createClass(BackgroundColor, [{
        key: "update",
        value: function update() {
            var i = Math.floor(this.time / this.interval);
            var color = this.colors[i];
            if (this.element.style.backgroundColor !== color) {
                this.element.style.backgroundColor = this.colors[i];
            }
        }
    }, {
        key: "reverse",
        value: function reverse() {
            var reverse = [];
            for (var color in this.colors) {
                reverse.unshift(this.colors[color]);
            }
            reverse.push(reverse.shift());
            this.colors = reverse;
        }
    }]);

    return BackgroundColor;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNrZ3JvdW5kQ29sb3IuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJjb2xvcnMiLCJvcHRpb25zIiwiQXJyYXkiLCJpc0FycmF5Iiwib3JpZ2luYWwiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInB1c2giLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwibGVuZ3RoIiwidGltZSIsImkiLCJNYXRoIiwiZmxvb3IiLCJjb2xvciIsInJldmVyc2UiLCJ1bnNoaWZ0Iiwic2hpZnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksNkJBQVlDLE9BQVosRUFBcUJDLE1BQXJCLEVBQTZCQyxPQUE3QixFQUNBO0FBQUE7O0FBQ0ksYUFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsWUFBSUcsTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFDQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BS0E7QUFDSSxpQkFBS0EsTUFBTCxHQUFjLENBQUNBLE1BQUQsQ0FBZDtBQUNIO0FBQ0QsYUFBS0ksUUFBTCxHQUFnQkwsUUFBUU0sS0FBUixDQUFjQyxlQUE5QjtBQUNBTixlQUFPTyxJQUFQLENBQVksS0FBS0gsUUFBakI7QUFDQSxhQUFLSSxRQUFMLEdBQWdCUCxRQUFRUSxRQUFSLEdBQW1CVCxPQUFPVSxNQUExQztBQUNBLGFBQUtULE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtVLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBbEJMO0FBQUE7QUFBQSxpQ0FxQkk7QUFDSSxnQkFBTUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXLEtBQUtILElBQUwsR0FBWSxLQUFLSCxRQUE1QixDQUFWO0FBQ0EsZ0JBQU1PLFFBQVEsS0FBS2YsTUFBTCxDQUFZWSxDQUFaLENBQWQ7QUFDQSxnQkFBSSxLQUFLYixPQUFMLENBQWFNLEtBQWIsQ0FBbUJDLGVBQW5CLEtBQXVDUyxLQUEzQyxFQUNBO0FBQ0kscUJBQUtoQixPQUFMLENBQWFNLEtBQWIsQ0FBbUJDLGVBQW5CLEdBQXFDLEtBQUtOLE1BQUwsQ0FBWVksQ0FBWixDQUFyQztBQUNIO0FBQ0o7QUE1Qkw7QUFBQTtBQUFBLGtDQStCSTtBQUNJLGdCQUFNSSxVQUFVLEVBQWhCO0FBQ0EsaUJBQUssSUFBSUQsS0FBVCxJQUFrQixLQUFLZixNQUF2QixFQUNBO0FBQ0lnQix3QkFBUUMsT0FBUixDQUFnQixLQUFLakIsTUFBTCxDQUFZZSxLQUFaLENBQWhCO0FBQ0g7QUFDREMsb0JBQVFULElBQVIsQ0FBYVMsUUFBUUUsS0FBUixFQUFiO0FBQ0EsaUJBQUtsQixNQUFMLEdBQWNnQixPQUFkO0FBQ0g7QUF2Q0w7O0FBQUE7QUFBQSIsImZpbGUiOiJiYWNrZ3JvdW5kQ29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJhY2tncm91bmRDb2xvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb2xvcnMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvclxyXG4gICAgICAgIGNvbG9ycy5wdXNoKHRoaXMub3JpZ2luYWwpXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG9wdGlvbnMuZHVyYXRpb24gLyBjb2xvcnMubGVuZ3RoXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHRoaXMudGltZSAvIHRoaXMuaW50ZXJ2YWwpXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yICE9PSBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBmb3IgKGxldCBjb2xvciBpbiB0aGlzLmNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdCh0aGlzLmNvbG9yc1tjb2xvcl0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldmVyc2UucHVzaChyZXZlcnNlLnNoaWZ0KCkpXHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSByZXZlcnNlXHJcbiAgICB9XHJcbn0iXX0=