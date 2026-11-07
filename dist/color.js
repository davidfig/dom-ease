"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Color(element, style, colors, duration) {
        _classCallCheck(this, Color);

        this.element = element;
        this.style = style;
        this.colors = [].concat(colors, element.style[style]);
        this.interval = duration / this.colors.length;
    }

    _createClass(Color, [{
        key: "update",
        value: function update(percent, time) {
            var elementStyle = this.element.style;
            var style = this.style;
            var colors = this.colors;
            var i = Math.min(Math.floor(time / this.interval), colors.length - 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsInN0eWxlIiwiY29sb3JzIiwiZHVyYXRpb24iLCJjb25jYXQiLCJpbnRlcnZhbCIsImxlbmd0aCIsInBlcmNlbnQiLCJ0aW1lIiwiZWxlbWVudFN0eWxlIiwiaSIsIk1hdGgiLCJtaW4iLCJmbG9vciIsImNvbG9yIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJwdXNoIiwic2hpZnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksbUJBQVlDLE9BQVosRUFBcUJDLEtBQXJCLEVBQTRCQyxNQUE1QixFQUFvQ0MsUUFBcEMsRUFDQTtBQUFBOztBQUNJLGFBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxHQUFHRSxNQUFILENBQVVGLE1BQVYsRUFBa0JGLFFBQVFDLEtBQVIsQ0FBY0EsS0FBZCxDQUFsQixDQUFkO0FBQ0EsYUFBS0ksUUFBTCxHQUFnQkYsV0FBVyxLQUFLRCxNQUFMLENBQVlJLE1BQXZDO0FBQ0g7O0FBUkw7QUFBQTtBQUFBLCtCQVVXQyxPQVZYLEVBVW9CQyxJQVZwQixFQVdJO0FBQ0ksZ0JBQU1DLGVBQWUsS0FBS1QsT0FBTCxDQUFhQyxLQUFsQztBQUNBLGdCQUFNQSxRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsZ0JBQU1DLFNBQVMsS0FBS0EsTUFBcEI7QUFDQSxnQkFBTVEsSUFBSUMsS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxLQUFMLENBQVdMLE9BQU8sS0FBS0gsUUFBdkIsQ0FBVCxFQUEyQ0gsT0FBT0ksTUFBUCxHQUFnQixDQUEzRCxDQUFWO0FBQ0EsZ0JBQU1RLFFBQVFaLE9BQU9RLENBQVAsQ0FBZDtBQUNBLGdCQUFJRCxhQUFhUixLQUFiLE1BQXdCYSxLQUE1QixFQUNBO0FBQ0lMLDZCQUFhUixLQUFiLElBQXNCQyxPQUFPUSxDQUFQLENBQXRCO0FBQ0g7QUFDSjtBQXJCTDtBQUFBO0FBQUEsa0NBd0JJO0FBQ0ksZ0JBQU1LLFVBQVUsRUFBaEI7QUFDQSxnQkFBTWIsU0FBUyxLQUFLQSxNQUFwQjtBQUNBLGlCQUFLLElBQUlZLEtBQVQsSUFBa0JaLE1BQWxCLEVBQ0E7QUFDSWEsd0JBQVFDLE9BQVIsQ0FBZ0JkLE9BQU9ZLEtBQVAsQ0FBaEI7QUFDSDtBQUNEQyxvQkFBUUUsSUFBUixDQUFhRixRQUFRRyxLQUFSLEVBQWI7QUFDQSxpQkFBS2hCLE1BQUwsR0FBY2EsT0FBZDtBQUNIO0FBakNMOztBQUFBO0FBQUEiLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENvbG9yXG57XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgc3R5bGUsIGNvbG9ycywgZHVyYXRpb24pXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgICAgICB0aGlzLmNvbG9ycyA9IFtdLmNvbmNhdChjb2xvcnMsIGVsZW1lbnQuc3R5bGVbc3R5bGVdKVxuICAgICAgICB0aGlzLmludGVydmFsID0gZHVyYXRpb24gLyB0aGlzLmNvbG9ycy5sZW5ndGhcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCwgdGltZSlcbiAgICB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRTdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZVxuICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuc3R5bGVcbiAgICAgICAgY29uc3QgY29sb3JzID0gdGhpcy5jb2xvcnNcbiAgICAgICAgY29uc3QgaSA9IE1hdGgubWluKE1hdGguZmxvb3IodGltZSAvIHRoaXMuaW50ZXJ2YWwpLCBjb2xvcnMubGVuZ3RoIC0gMSlcbiAgICAgICAgY29uc3QgY29sb3IgPSBjb2xvcnNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRTdHlsZVtzdHlsZV0gIT09IGNvbG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50U3R5bGVbc3R5bGVdID0gY29sb3JzW2ldXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXZlcnNlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSBbXVxuICAgICAgICBjb25zdCBjb2xvcnMgPSB0aGlzLmNvbG9yc1xuICAgICAgICBmb3IgKGxldCBjb2xvciBpbiBjb2xvcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldmVyc2UudW5zaGlmdChjb2xvcnNbY29sb3JdKVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UucHVzaChyZXZlcnNlLnNoaWZ0KCkpXG4gICAgICAgIHRoaXMuY29sb3JzID0gcmV2ZXJzZVxuICAgIH1cbn0iXX0=