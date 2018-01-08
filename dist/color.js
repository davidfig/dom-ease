'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Color(element, colors, options) {
        _classCallCheck(this, Color);

        this.name = 'color';
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
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            var i = Math.floor(this.time / this.interval);
            var color = this.colors[i];
            if (this.element.style.color !== color) {
                this.element.style.color = this.colors[i];
            }
            if (this.time >= options.duration) {
                return true;
            }
        }
    }, {
        key: 'repeat',
        value: function repeat() {
            this.time = 0;
        }
    }, {
        key: 'reverse',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsImNvbG9ycyIsIm9wdGlvbnMiLCJuYW1lIiwiQXJyYXkiLCJpc0FycmF5Iiwib3JpZ2luYWwiLCJzdHlsZSIsImNvbG9yIiwicHVzaCIsImludGVydmFsIiwiZHVyYXRpb24iLCJsZW5ndGgiLCJ0aW1lIiwiZWxhcHNlZCIsImkiLCJNYXRoIiwiZmxvb3IiLCJyZXZlcnNlIiwidW5zaGlmdCIsInNoaWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG1CQUFZQyxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QkMsT0FBN0IsRUFDQTtBQUFBOztBQUNJLGFBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsYUFBS0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsWUFBSUksTUFBTUMsT0FBTixDQUFjSixNQUFkLENBQUosRUFDQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BS0E7QUFDSSxpQkFBS0EsTUFBTCxHQUFjLENBQUNBLE1BQUQsQ0FBZDtBQUNIO0FBQ0QsYUFBS0ssUUFBTCxHQUFnQk4sUUFBUU8sS0FBUixDQUFjQyxLQUE5QjtBQUNBUCxlQUFPUSxJQUFQLENBQVksS0FBS0gsUUFBakI7QUFDQSxhQUFLSSxRQUFMLEdBQWdCUixRQUFRUyxRQUFSLEdBQW1CVixPQUFPVyxNQUExQztBQUNBLGFBQUtWLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtXLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBbkJMO0FBQUE7QUFBQSwrQkFxQldDLE9BckJYLEVBc0JJO0FBQ0ksZ0JBQU1aLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS1csSUFBTCxJQUFhQyxPQUFiO0FBQ0EsZ0JBQU1DLElBQUlDLEtBQUtDLEtBQUwsQ0FBVyxLQUFLSixJQUFMLEdBQVksS0FBS0gsUUFBNUIsQ0FBVjtBQUNBLGdCQUFNRixRQUFRLEtBQUtQLE1BQUwsQ0FBWWMsQ0FBWixDQUFkO0FBQ0EsZ0JBQUksS0FBS2YsT0FBTCxDQUFhTyxLQUFiLENBQW1CQyxLQUFuQixLQUE2QkEsS0FBakMsRUFDQTtBQUNJLHFCQUFLUixPQUFMLENBQWFPLEtBQWIsQ0FBbUJDLEtBQW5CLEdBQTJCLEtBQUtQLE1BQUwsQ0FBWWMsQ0FBWixDQUEzQjtBQUNIO0FBQ0QsZ0JBQUksS0FBS0YsSUFBTCxJQUFhWCxRQUFRUyxRQUF6QixFQUNBO0FBQ0ksdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFuQ0w7QUFBQTtBQUFBLGlDQXNDSTtBQUNJLGlCQUFLRSxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBeENMO0FBQUE7QUFBQSxrQ0EyQ0k7QUFDSSxnQkFBTUssVUFBVSxFQUFoQjtBQUNBLGlCQUFLLElBQUlWLEtBQVQsSUFBa0IsS0FBS1AsTUFBdkIsRUFDQTtBQUNJaUIsd0JBQVFDLE9BQVIsQ0FBZ0IsS0FBS2xCLE1BQUwsQ0FBWU8sS0FBWixDQUFoQjtBQUNIO0FBQ0RVLG9CQUFRVCxJQUFSLENBQWFTLFFBQVFFLEtBQVIsRUFBYjtBQUNBLGlCQUFLbkIsTUFBTCxHQUFjaUIsT0FBZDtBQUNIO0FBbkRMOztBQUFBO0FBQUEiLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENvbG9yXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbG9ycywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnY29sb3InXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSBlbGVtZW50LnN0eWxlLmNvbG9yXHJcbiAgICAgICAgY29sb3JzLnB1c2godGhpcy5vcmlnaW5hbClcclxuICAgICAgICB0aGlzLmludGVydmFsID0gb3B0aW9ucy5kdXJhdGlvbiAvIGNvbG9ycy5sZW5ndGhcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICB0aGlzLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHRoaXMudGltZSAvIHRoaXMuaW50ZXJ2YWwpXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgIT09IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNvbG9yID0gdGhpcy5jb2xvcnNbaV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSA+PSBvcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVwZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgY29sb3IgaW4gdGhpcy5jb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXZlcnNlLnVuc2hpZnQodGhpcy5jb2xvcnNbY29sb3JdKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXZlcnNlLnB1c2gocmV2ZXJzZS5zaGlmdCgpKVxyXG4gICAgICAgIHRoaXMuY29sb3JzID0gcmV2ZXJzZVxyXG4gICAgfVxyXG59Il19