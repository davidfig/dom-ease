"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Color(style, original, colors, options) {
        _classCallCheck(this, Color);

        this.style = style;
        if (Array.isArray(colors)) {
            this.colors = colors;
        } else {
            this.colors = [colors];
        }
        colors.push(original);
        this.interval = options.duration / colors.length;
        this.options = options;
        this.time = 0;
    }

    _createClass(Color, [{
        key: "update",
        value: function update(element) {
            var i = Math.floor(this.time / this.interval);
            var color = this.colors[i];
            if (element.style[this.style] !== color) {
                element.style[this.style] = this.colors[i];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3R5bGUiLCJvcmlnaW5hbCIsImNvbG9ycyIsIm9wdGlvbnMiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImxlbmd0aCIsInRpbWUiLCJlbGVtZW50IiwiaSIsIk1hdGgiLCJmbG9vciIsImNvbG9yIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJzaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkJDLE1BQTdCLEVBQXFDQyxPQUFyQyxFQUNBO0FBQUE7O0FBQ0ksYUFBS0gsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsWUFBSUksTUFBTUMsT0FBTixDQUFjSCxNQUFkLENBQUosRUFDQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BS0E7QUFDSSxpQkFBS0EsTUFBTCxHQUFjLENBQUNBLE1BQUQsQ0FBZDtBQUNIO0FBQ0RBLGVBQU9JLElBQVAsQ0FBWUwsUUFBWjtBQUNBLGFBQUtNLFFBQUwsR0FBZ0JKLFFBQVFLLFFBQVIsR0FBbUJOLE9BQU9PLE1BQTFDO0FBQ0EsYUFBS04sT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS08sSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFqQkw7QUFBQTtBQUFBLCtCQW1CV0MsT0FuQlgsRUFvQkk7QUFDSSxnQkFBTUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXLEtBQUtKLElBQUwsR0FBWSxLQUFLSCxRQUE1QixDQUFWO0FBQ0EsZ0JBQU1RLFFBQVEsS0FBS2IsTUFBTCxDQUFZVSxDQUFaLENBQWQ7QUFDQSxnQkFBSUQsUUFBUVgsS0FBUixDQUFjLEtBQUtBLEtBQW5CLE1BQThCZSxLQUFsQyxFQUNBO0FBQ0lKLHdCQUFRWCxLQUFSLENBQWMsS0FBS0EsS0FBbkIsSUFBNEIsS0FBS0UsTUFBTCxDQUFZVSxDQUFaLENBQTVCO0FBQ0g7QUFDSjtBQTNCTDtBQUFBO0FBQUEsa0NBOEJJO0FBQ0ksZ0JBQU1JLFVBQVUsRUFBaEI7QUFDQSxpQkFBSyxJQUFJRCxLQUFULElBQWtCLEtBQUtiLE1BQXZCLEVBQ0E7QUFDSWMsd0JBQVFDLE9BQVIsQ0FBZ0IsS0FBS2YsTUFBTCxDQUFZYSxLQUFaLENBQWhCO0FBQ0g7QUFDREMsb0JBQVFWLElBQVIsQ0FBYVUsUUFBUUUsS0FBUixFQUFiO0FBQ0EsaUJBQUtoQixNQUFMLEdBQWNjLE9BQWQ7QUFDSDtBQXRDTDs7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb2xvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihzdHlsZSwgb3JpZ2luYWwsIGNvbG9ycywgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGVcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xvcnMpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSBjb2xvcnNcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSBbY29sb3JzXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xvcnMucHVzaChvcmlnaW5hbClcclxuICAgICAgICB0aGlzLmludGVydmFsID0gb3B0aW9ucy5kdXJhdGlvbiAvIGNvbG9ycy5sZW5ndGhcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHRoaXMudGltZSAvIHRoaXMuaW50ZXJ2YWwpXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlW3RoaXMuc3R5bGVdICE9PSBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbdGhpcy5zdHlsZV0gPSB0aGlzLmNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBmb3IgKGxldCBjb2xvciBpbiB0aGlzLmNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdCh0aGlzLmNvbG9yc1tjb2xvcl0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldmVyc2UucHVzaChyZXZlcnNlLnNoaWZ0KCkpXHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSByZXZlcnNlXHJcbiAgICB9XHJcbn0iXX0=