'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Top(element, y, options) {
        _classCallCheck(this, Top);

        this.name = 'top';
        this.element = element;
        this.to = y;
        this.options = options;
        this.start = element.offsetTop;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Top, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            this.element.style.top = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Top;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90b3AuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJ5Iiwib3B0aW9ucyIsIm5hbWUiLCJ0byIsInN0YXJ0Iiwib2Zmc2V0VG9wIiwiZGVsdGEiLCJ0aW1lIiwiZWxhcHNlZCIsInN0eWxlIiwidG9wIiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxpQkFBWUMsT0FBWixFQUFxQkMsQ0FBckIsRUFBd0JDLE9BQXhCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLQyxJQUFMLEdBQVksS0FBWjtBQUNBLGFBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtJLEVBQUwsR0FBVUgsQ0FBVjtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtHLEtBQUwsR0FBYUwsUUFBUU0sU0FBckI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsS0FBS0gsRUFBTCxHQUFVLEtBQUtDLEtBQTVCO0FBQ0EsYUFBS0csSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFYTDtBQUFBO0FBQUEsK0JBYVdDLE9BYlgsRUFjSTtBQUNJLGdCQUFNUCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtNLElBQUwsSUFBYUMsT0FBYjtBQUNBLGlCQUFLVCxPQUFMLENBQWFVLEtBQWIsQ0FBbUJDLEdBQW5CLEdBQXlCVCxRQUFRVSxJQUFSLENBQWEsS0FBS0osSUFBbEIsRUFBd0IsS0FBS0gsS0FBN0IsRUFBb0MsS0FBS0UsS0FBekMsRUFBZ0RMLFFBQVFXLFFBQXhELElBQW9FLElBQTdGO0FBQ0EsZ0JBQUksS0FBS0wsSUFBTCxJQUFhTixRQUFRVyxRQUF6QixFQUNBO0FBQ0ksdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUF0Qkw7QUFBQTtBQUFBLGlDQXlCSTtBQUNJLGlCQUFLTCxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBM0JMO0FBQUE7QUFBQSxrQ0E4Qkk7QUFDSSxnQkFBTU0sT0FBTyxLQUFLVixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0MsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFTLElBQWI7QUFDQSxpQkFBS1AsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQW5DTDs7QUFBQTtBQUFBIiwiZmlsZSI6InRvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVG9wXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHksIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ3RvcCdcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50byA9IHlcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGVsZW1lbnQub2Zmc2V0VG9wXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICB0aGlzLnRpbWUgKz0gZWxhcHNlZFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBvcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCBvcHRpb25zLmR1cmF0aW9uKSArICdweCdcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBlYXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==