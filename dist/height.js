'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Height(element, height, options) {
        _classCallCheck(this, Height);

        this.element = element;
        this.to = height;
        this.options = options;
        this.start = element.offsetHeight;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Height, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            this.element.style.height = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Height;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWlnaHQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJoZWlnaHQiLCJvcHRpb25zIiwidG8iLCJzdGFydCIsIm9mZnNldEhlaWdodCIsImRlbHRhIiwidGltZSIsInN0eWxlIiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxvQkFBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNkJDLE9BQTdCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRyxFQUFMLEdBQVVGLE1BQVY7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRSxLQUFMLEdBQWFKLFFBQVFLLFlBQXJCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEtBQUtILEVBQUwsR0FBVSxLQUFLQyxLQUE1QjtBQUNBLGFBQUtHLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBVkw7QUFBQTtBQUFBLGlDQWFJO0FBQ0ksZ0JBQU1MLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS0YsT0FBTCxDQUFhUSxLQUFiLENBQW1CUCxNQUFuQixHQUE0QkMsUUFBUU8sSUFBUixDQUFhLEtBQUtGLElBQWxCLEVBQXdCLEtBQUtILEtBQTdCLEVBQW9DLEtBQUtFLEtBQXpDLEVBQWdESixRQUFRUSxRQUF4RCxJQUFvRSxJQUFoRztBQUNIO0FBaEJMO0FBQUE7QUFBQSxrQ0FtQkk7QUFDSSxnQkFBTUMsT0FBTyxLQUFLUixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0MsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFPLElBQWI7QUFDQSxpQkFBS0wsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQXhCTDs7QUFBQTtBQUFBIiwiZmlsZSI6ImhlaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgSGVpZ2h0XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGhlaWdodCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50byA9IGhlaWdodFxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHRcclxuICAgICAgICB0aGlzLmRlbHRhID0gdGhpcy50byAtIHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pICsgJ3B4J1xyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19