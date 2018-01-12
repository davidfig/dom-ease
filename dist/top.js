'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Top(element, y, options) {
        _classCallCheck(this, Top);

        this.element = element;
        this.to = y;
        this.options = options;
        this.start = element.offsetTop;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Top, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            this.element.style.top = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Top;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90b3AuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJ5Iiwib3B0aW9ucyIsInRvIiwic3RhcnQiLCJvZmZzZXRUb3AiLCJkZWx0YSIsInRpbWUiLCJzdHlsZSIsInRvcCIsImVhc2UiLCJkdXJhdGlvbiIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksaUJBQVlDLE9BQVosRUFBcUJDLENBQXJCLEVBQXdCQyxPQUF4QixFQUNBO0FBQUE7O0FBQ0ksYUFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csRUFBTCxHQUFVRixDQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsS0FBTCxHQUFhSixRQUFRSyxTQUFyQjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLSCxFQUFMLEdBQVUsS0FBS0MsS0FBNUI7QUFDQSxhQUFLRyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQVZMO0FBQUE7QUFBQSxpQ0FhSTtBQUNJLGdCQUFNTCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtGLE9BQUwsQ0FBYVEsS0FBYixDQUFtQkMsR0FBbkIsR0FBeUJQLFFBQVFRLElBQVIsQ0FBYSxLQUFLSCxJQUFsQixFQUF3QixLQUFLSCxLQUE3QixFQUFvQyxLQUFLRSxLQUF6QyxFQUFnREosUUFBUVMsUUFBeEQsSUFBb0UsSUFBN0Y7QUFDSDtBQWhCTDtBQUFBO0FBQUEsa0NBbUJJO0FBQ0ksZ0JBQU1DLE9BQU8sS0FBS1QsRUFBbEI7QUFDQSxpQkFBS0EsRUFBTCxHQUFVLEtBQUtDLEtBQWY7QUFDQSxpQkFBS0EsS0FBTCxHQUFhUSxJQUFiO0FBQ0EsaUJBQUtOLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUF4Qkw7O0FBQUE7QUFBQSIsImZpbGUiOiJ0b3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRvcFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCB5LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLnRvID0geVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZWxlbWVudC5vZmZzZXRUb3BcclxuICAgICAgICB0aGlzLmRlbHRhID0gdGhpcy50byAtIHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pICsgJ3B4J1xyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19