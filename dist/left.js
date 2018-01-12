'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Left(element, x, options) {
        _classCallCheck(this, Left);

        this.element = element;
        this.to = x;
        this.options = options;
        this.start = element.offsetLeft;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Left, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            this.element.style.left = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Left;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sZWZ0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJlbGVtZW50IiwieCIsIm9wdGlvbnMiLCJ0byIsInN0YXJ0Iiwib2Zmc2V0TGVmdCIsImRlbHRhIiwidGltZSIsInN0eWxlIiwibGVmdCIsImVhc2UiLCJkdXJhdGlvbiIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksa0JBQVlDLE9BQVosRUFBcUJDLENBQXJCLEVBQXdCQyxPQUF4QixFQUNBO0FBQUE7O0FBQ0ksYUFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csRUFBTCxHQUFVRixDQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsS0FBTCxHQUFhSixRQUFRSyxVQUFyQjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLSCxFQUFMLEdBQVUsS0FBS0MsS0FBNUI7QUFDQSxhQUFLRyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQVZMO0FBQUE7QUFBQSxpQ0FhSTtBQUNJLGdCQUFNTCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtGLE9BQUwsQ0FBYVEsS0FBYixDQUFtQkMsSUFBbkIsR0FBMEJQLFFBQVFRLElBQVIsQ0FBYSxLQUFLSCxJQUFsQixFQUF3QixLQUFLSCxLQUE3QixFQUFvQyxLQUFLRSxLQUF6QyxFQUFnREosUUFBUVMsUUFBeEQsSUFBb0UsSUFBOUY7QUFDSDtBQWhCTDtBQUFBO0FBQUEsa0NBbUJJO0FBQ0ksZ0JBQU1DLE9BQU8sS0FBS1QsRUFBbEI7QUFDQSxpQkFBS0EsRUFBTCxHQUFVLEtBQUtDLEtBQWY7QUFDQSxpQkFBS0EsS0FBTCxHQUFhUSxJQUFiO0FBQ0EsaUJBQUtOLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUF4Qkw7O0FBQUE7QUFBQSIsImZpbGUiOiJsZWZ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBMZWZ0XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHgsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMudG8gPSB4XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBlbGVtZW50Lm9mZnNldExlZnRcclxuICAgICAgICB0aGlzLmRlbHRhID0gdGhpcy50byAtIHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBvcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCBvcHRpb25zLmR1cmF0aW9uKSArICdweCdcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==