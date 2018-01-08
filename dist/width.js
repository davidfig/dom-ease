'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Width(element, width, options) {
        _classCallCheck(this, Width);

        this.name = 'width';
        this.element = element;
        this.to = width;
        this.options = options;
        this.start = element.offsetWidth;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Width, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            this.element.style.width = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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
            var swap = this.to;
            this.to = this.start;
            this.start = swap;
            this.delta = -this.delta;
        }
    }]);

    return Width;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aWR0aC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsIndpZHRoIiwib3B0aW9ucyIsIm5hbWUiLCJ0byIsInN0YXJ0Iiwib2Zmc2V0V2lkdGgiLCJkZWx0YSIsInRpbWUiLCJlbGFwc2VkIiwic3R5bGUiLCJlYXNlIiwiZHVyYXRpb24iLCJzd2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG1CQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE0QkMsT0FBNUIsRUFDQTtBQUFBOztBQUNJLGFBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsYUFBS0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0ksRUFBTCxHQUFVSCxLQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csS0FBTCxHQUFhTCxRQUFRTSxXQUFyQjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLSCxFQUFMLEdBQVUsS0FBS0MsS0FBNUI7QUFDQSxhQUFLRyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQVhMO0FBQUE7QUFBQSwrQkFhV0MsT0FiWCxFQWNJO0FBQ0ksZ0JBQU1QLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS00sSUFBTCxJQUFhQyxPQUFiO0FBQ0EsaUJBQUtULE9BQUwsQ0FBYVUsS0FBYixDQUFtQlQsS0FBbkIsR0FBMkJDLFFBQVFTLElBQVIsQ0FBYSxLQUFLSCxJQUFsQixFQUF3QixLQUFLSCxLQUE3QixFQUFvQyxLQUFLRSxLQUF6QyxFQUFnREwsUUFBUVUsUUFBeEQsSUFBb0UsSUFBL0Y7QUFDQSxnQkFBSSxLQUFLSixJQUFMLElBQWFOLFFBQVFVLFFBQXpCLEVBQ0E7QUFDSSx1QkFBTyxJQUFQO0FBQ0g7QUFDSjtBQXRCTDtBQUFBO0FBQUEsaUNBeUJJO0FBQ0ksaUJBQUtKLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUEzQkw7QUFBQTtBQUFBLGtDQThCSTtBQUNJLGdCQUFNSyxPQUFPLEtBQUtULEVBQWxCO0FBQ0EsaUJBQUtBLEVBQUwsR0FBVSxLQUFLQyxLQUFmO0FBQ0EsaUJBQUtBLEtBQUwsR0FBYVEsSUFBYjtBQUNBLGlCQUFLTixLQUFMLEdBQWEsQ0FBQyxLQUFLQSxLQUFuQjtBQUNIO0FBbkNMOztBQUFBO0FBQUEiLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFdpZHRoXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHdpZHRoLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICd3aWR0aCdcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50byA9IHdpZHRoXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBlbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICB0aGlzLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pICsgJ3B4J1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcGVhdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19