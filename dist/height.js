'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Height(element, height, options) {
        _classCallCheck(this, Height);

        this.name = 'height';
        this.element = element;
        this.to = height;
        this.options = options;
        this.start = element.offsetHeight;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Height, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            this.element.style.height = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Height;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWlnaHQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJoZWlnaHQiLCJvcHRpb25zIiwibmFtZSIsInRvIiwic3RhcnQiLCJvZmZzZXRIZWlnaHQiLCJkZWx0YSIsInRpbWUiLCJlbGFwc2VkIiwic3R5bGUiLCJlYXNlIiwiZHVyYXRpb24iLCJzd2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG9CQUFZQyxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QkMsT0FBN0IsRUFDQTtBQUFBOztBQUNJLGFBQUtDLElBQUwsR0FBWSxRQUFaO0FBQ0EsYUFBS0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0ksRUFBTCxHQUFVSCxNQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0csS0FBTCxHQUFhTCxRQUFRTSxZQUFyQjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxLQUFLSCxFQUFMLEdBQVUsS0FBS0MsS0FBNUI7QUFDQSxhQUFLRyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQVhMO0FBQUE7QUFBQSwrQkFhV0MsT0FiWCxFQWNJO0FBQ0ksZ0JBQU1QLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS00sSUFBTCxJQUFhQyxPQUFiO0FBQ0EsaUJBQUtULE9BQUwsQ0FBYVUsS0FBYixDQUFtQlQsTUFBbkIsR0FBNEJDLFFBQVFTLElBQVIsQ0FBYSxLQUFLSCxJQUFsQixFQUF3QixLQUFLSCxLQUE3QixFQUFvQyxLQUFLRSxLQUF6QyxFQUFnREwsUUFBUVUsUUFBeEQsSUFBb0UsSUFBaEc7QUFDQSxnQkFBSSxLQUFLSixJQUFMLElBQWFOLFFBQVFVLFFBQXpCLEVBQ0E7QUFDSSx1QkFBTyxJQUFQO0FBQ0g7QUFDSjtBQXRCTDtBQUFBO0FBQUEsaUNBeUJJO0FBQ0ksaUJBQUtKLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUEzQkw7QUFBQTtBQUFBLGtDQThCSTtBQUNJLGdCQUFNSyxPQUFPLEtBQUtULEVBQWxCO0FBQ0EsaUJBQUtBLEVBQUwsR0FBVSxLQUFLQyxLQUFmO0FBQ0EsaUJBQUtBLEtBQUwsR0FBYVEsSUFBYjtBQUNBLGlCQUFLTixLQUFMLEdBQWEsQ0FBQyxLQUFLQSxLQUFuQjtBQUNIO0FBbkNMOztBQUFBO0FBQUEiLCJmaWxlIjoiaGVpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBIZWlnaHRcclxue1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgaGVpZ2h0LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdoZWlnaHQnXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMudG8gPSBoZWlnaHRcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICB0aGlzLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCBvcHRpb25zLmR1cmF0aW9uKSArICdweCdcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBlYXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==