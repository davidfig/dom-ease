'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Width(element, width, options) {
        _classCallCheck(this, Width);

        this.element = element;
        this.to = width;
        this.options = options;
        this.start = element.offsetWidth;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Width, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            this.element.style.width = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Width;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aWR0aC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsIndpZHRoIiwib3B0aW9ucyIsInRvIiwic3RhcnQiLCJvZmZzZXRXaWR0aCIsImRlbHRhIiwidGltZSIsInN0eWxlIiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxtQkFBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJDLE9BQTVCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRyxFQUFMLEdBQVVGLEtBQVY7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRSxLQUFMLEdBQWFKLFFBQVFLLFdBQXJCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEtBQUtILEVBQUwsR0FBVSxLQUFLQyxLQUE1QjtBQUNBLGFBQUtHLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBVkw7QUFBQTtBQUFBLGlDQWFJO0FBQ0ksZ0JBQU1MLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS0YsT0FBTCxDQUFhUSxLQUFiLENBQW1CUCxLQUFuQixHQUEyQkMsUUFBUU8sSUFBUixDQUFhLEtBQUtGLElBQWxCLEVBQXdCLEtBQUtILEtBQTdCLEVBQW9DLEtBQUtFLEtBQXpDLEVBQWdESixRQUFRUSxRQUF4RCxJQUFvRSxJQUEvRjtBQUNIO0FBaEJMO0FBQUE7QUFBQSxrQ0FtQkk7QUFDSSxnQkFBTUMsT0FBTyxLQUFLUixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0MsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFPLElBQWI7QUFDQSxpQkFBS0wsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQXhCTDs7QUFBQTtBQUFBIiwiZmlsZSI6IndpZHRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBXaWR0aFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCB3aWR0aCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50byA9IHdpZHRoXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBlbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pICsgJ3B4J1xyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19