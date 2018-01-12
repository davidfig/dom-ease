"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Color(element, colors, options) {
        _classCallCheck(this, Color);

        this.element = element;
        if (Array.isArray(colors)) {
            this.colors = colors;
        } else {
            this.colors = [colors];
        }
        this.original = element.style.color;
        colors.push(this.original);
        this.interval = options.duration / colors.length;
        this.options = options;
        this.time = 0;
    }

    _createClass(Color, [{
        key: "update",
        value: function update() {
            var i = Math.floor(this.time / this.interval);
            var color = this.colors[i];
            if (this.element.style.color !== color) {
                this.element.style.color = this.colors[i];
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

    return Color;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsImNvbG9ycyIsIm9wdGlvbnMiLCJBcnJheSIsImlzQXJyYXkiLCJvcmlnaW5hbCIsInN0eWxlIiwiY29sb3IiLCJwdXNoIiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImxlbmd0aCIsInRpbWUiLCJpIiwiTWF0aCIsImZsb29yIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJzaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxtQkFBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNkJDLE9BQTdCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxZQUFJRyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUNBO0FBQ0ksaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNILFNBSEQsTUFLQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWMsQ0FBQ0EsTUFBRCxDQUFkO0FBQ0g7QUFDRCxhQUFLSSxRQUFMLEdBQWdCTCxRQUFRTSxLQUFSLENBQWNDLEtBQTlCO0FBQ0FOLGVBQU9PLElBQVAsQ0FBWSxLQUFLSCxRQUFqQjtBQUNBLGFBQUtJLFFBQUwsR0FBZ0JQLFFBQVFRLFFBQVIsR0FBbUJULE9BQU9VLE1BQTFDO0FBQ0EsYUFBS1QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS1UsSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFsQkw7QUFBQTtBQUFBLGlDQXFCSTtBQUNJLGdCQUFNQyxJQUFJQyxLQUFLQyxLQUFMLENBQVcsS0FBS0gsSUFBTCxHQUFZLEtBQUtILFFBQTVCLENBQVY7QUFDQSxnQkFBTUYsUUFBUSxLQUFLTixNQUFMLENBQVlZLENBQVosQ0FBZDtBQUNBLGdCQUFJLEtBQUtiLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkMsS0FBbkIsS0FBNkJBLEtBQWpDLEVBQ0E7QUFDSSxxQkFBS1AsT0FBTCxDQUFhTSxLQUFiLENBQW1CQyxLQUFuQixHQUEyQixLQUFLTixNQUFMLENBQVlZLENBQVosQ0FBM0I7QUFDSDtBQUNKO0FBNUJMO0FBQUE7QUFBQSxrQ0ErQkk7QUFDSSxnQkFBTUcsVUFBVSxFQUFoQjtBQUNBLGlCQUFLLElBQUlULEtBQVQsSUFBa0IsS0FBS04sTUFBdkIsRUFDQTtBQUNJZSx3QkFBUUMsT0FBUixDQUFnQixLQUFLaEIsTUFBTCxDQUFZTSxLQUFaLENBQWhCO0FBQ0g7QUFDRFMsb0JBQVFSLElBQVIsQ0FBYVEsUUFBUUUsS0FBUixFQUFiO0FBQ0EsaUJBQUtqQixNQUFMLEdBQWNlLE9BQWQ7QUFDSDtBQXZDTDs7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb2xvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb2xvcnMsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSBlbGVtZW50LnN0eWxlLmNvbG9yXHJcbiAgICAgICAgY29sb3JzLnB1c2godGhpcy5vcmlnaW5hbClcclxuICAgICAgICB0aGlzLmludGVydmFsID0gb3B0aW9ucy5kdXJhdGlvbiAvIGNvbG9ycy5sZW5ndGhcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IodGhpcy50aW1lIC8gdGhpcy5pbnRlcnZhbClcclxuICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzW2ldXHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciAhPT0gY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBmb3IgKGxldCBjb2xvciBpbiB0aGlzLmNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdCh0aGlzLmNvbG9yc1tjb2xvcl0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldmVyc2UucHVzaChyZXZlcnNlLnNoaWZ0KCkpXHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSByZXZlcnNlXHJcbiAgICB9XHJcbn0iXX0=