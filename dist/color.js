"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Color(element, style, colors, interval) {
        _classCallCheck(this, Color);

        this.element = element;
        this.style = style;
        if (Array.isArray(colors)) {
            this.colors = colors;
        } else {
            this.colors = [colors];
        }
        this.colors.push(element.style[style]);
        this.interval = interval;
    }

    _createClass(Color, [{
        key: "update",
        value: function update(percent, time) {
            var elementStyle = this.element.style;
            var style = this.style;
            var colors = this.colors;
            var i = Math.floor(time / this.interval);
            var color = colors[i];
            if (elementStyle[style] !== color) {
                elementStyle[style] = colors[i];
            }
        }
    }, {
        key: "reverse",
        value: function reverse() {
            var reverse = [];
            var colors = this.colors;
            for (var color in colors) {
                reverse.unshift(colors[color]);
            }
            reverse.push(reverse.shift());
            this.colors = reverse;
        }
    }]);

    return Color;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsInN0eWxlIiwiY29sb3JzIiwiaW50ZXJ2YWwiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwicGVyY2VudCIsInRpbWUiLCJlbGVtZW50U3R5bGUiLCJpIiwiTWF0aCIsImZsb29yIiwiY29sb3IiLCJyZXZlcnNlIiwidW5zaGlmdCIsInNoaWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG1CQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE0QkMsTUFBNUIsRUFBb0NDLFFBQXBDLEVBQ0E7QUFBQTs7QUFDSSxhQUFLSCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxZQUFJRyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUNBO0FBQ0ksaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNILFNBSEQsTUFLQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWMsQ0FBQ0EsTUFBRCxDQUFkO0FBQ0g7QUFDRCxhQUFLQSxNQUFMLENBQVlJLElBQVosQ0FBaUJOLFFBQVFDLEtBQVIsQ0FBY0EsS0FBZCxDQUFqQjtBQUNBLGFBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7O0FBaEJMO0FBQUE7QUFBQSwrQkFrQldJLE9BbEJYLEVBa0JvQkMsSUFsQnBCLEVBbUJJO0FBQ0ksZ0JBQU1DLGVBQWUsS0FBS1QsT0FBTCxDQUFhQyxLQUFsQztBQUNBLGdCQUFNQSxRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsZ0JBQU1DLFNBQVMsS0FBS0EsTUFBcEI7QUFDQSxnQkFBTVEsSUFBSUMsS0FBS0MsS0FBTCxDQUFXSixPQUFPLEtBQUtMLFFBQXZCLENBQVY7QUFDQSxnQkFBTVUsUUFBUVgsT0FBT1EsQ0FBUCxDQUFkO0FBQ0EsZ0JBQUlELGFBQWFSLEtBQWIsTUFBd0JZLEtBQTVCLEVBQ0E7QUFDSUosNkJBQWFSLEtBQWIsSUFBc0JDLE9BQU9RLENBQVAsQ0FBdEI7QUFDSDtBQUNKO0FBN0JMO0FBQUE7QUFBQSxrQ0FnQ0k7QUFDSSxnQkFBTUksVUFBVSxFQUFoQjtBQUNBLGdCQUFNWixTQUFTLEtBQUtBLE1BQXBCO0FBQ0EsaUJBQUssSUFBSVcsS0FBVCxJQUFrQlgsTUFBbEIsRUFDQTtBQUNJWSx3QkFBUUMsT0FBUixDQUFnQmIsT0FBT1csS0FBUCxDQUFoQjtBQUNIO0FBQ0RDLG9CQUFRUixJQUFSLENBQWFRLFFBQVFFLEtBQVIsRUFBYjtBQUNBLGlCQUFLZCxNQUFMLEdBQWNZLE9BQWQ7QUFDSDtBQXpDTDs7QUFBQTtBQUFBIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb2xvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzdHlsZSwgY29sb3JzLCBpbnRlcnZhbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sb3JzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gY29sb3JzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gW2NvbG9yc11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb2xvcnMucHVzaChlbGVtZW50LnN0eWxlW3N0eWxlXSlcclxuICAgICAgICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWxcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUocGVyY2VudCwgdGltZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50U3R5bGUgPSB0aGlzLmVsZW1lbnQuc3R5bGVcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuc3R5bGVcclxuICAgICAgICBjb25zdCBjb2xvcnMgPSB0aGlzLmNvbG9yc1xyXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHRpbWUgLyB0aGlzLmludGVydmFsKVxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldXHJcbiAgICAgICAgaWYgKGVsZW1lbnRTdHlsZVtzdHlsZV0gIT09IGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZWxlbWVudFN0eWxlW3N0eWxlXSA9IGNvbG9yc1tpXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gW11cclxuICAgICAgICBjb25zdCBjb2xvcnMgPSB0aGlzLmNvbG9yc1xyXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIGNvbG9ycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdChjb2xvcnNbY29sb3JdKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXZlcnNlLnB1c2gocmV2ZXJzZS5zaGlmdCgpKVxyXG4gICAgICAgIHRoaXMuY29sb3JzID0gcmV2ZXJzZVxyXG4gICAgfVxyXG59Il19