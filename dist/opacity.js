'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exists = require('exists');

module.exports = function () {
    function Opacity(element, opacity, options) {
        _classCallCheck(this, Opacity);

        this.name = 'opacity';
        this.element = element;
        this.to = opacity;
        this.options = options;
        this.start = exists(element.opacity) ? parseFloat(element.opacity) : 1;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Opacity, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            this.element.style.opacity = options.ease(this.time, this.start, this.delta, options.duration);
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

    return Opacity;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vcGFjaXR5LmpzIl0sIm5hbWVzIjpbImV4aXN0cyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsIm9wYWNpdHkiLCJvcHRpb25zIiwibmFtZSIsInRvIiwic3RhcnQiLCJwYXJzZUZsb2F0IiwiZGVsdGEiLCJ0aW1lIiwiZWxhcHNlZCIsInN0eWxlIiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7O0FBRUFDLE9BQU9DLE9BQVA7QUFFSSxxQkFBWUMsT0FBWixFQUFxQkMsT0FBckIsRUFBOEJDLE9BQTlCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLQyxJQUFMLEdBQVksU0FBWjtBQUNBLGFBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtJLEVBQUwsR0FBVUgsT0FBVjtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtHLEtBQUwsR0FBYVQsT0FBT0ksUUFBUUMsT0FBZixJQUEwQkssV0FBV04sUUFBUUMsT0FBbkIsQ0FBMUIsR0FBd0QsQ0FBckU7QUFDQSxhQUFLTSxLQUFMLEdBQWEsS0FBS0gsRUFBTCxHQUFVLEtBQUtDLEtBQTVCO0FBQ0EsYUFBS0csSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFYTDtBQUFBO0FBQUEsK0JBYVdDLE9BYlgsRUFjSTtBQUNJLGdCQUFNUCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtNLElBQUwsSUFBYUMsT0FBYjtBQUNBLGlCQUFLVCxPQUFMLENBQWFVLEtBQWIsQ0FBbUJULE9BQW5CLEdBQTZCQyxRQUFRUyxJQUFSLENBQWEsS0FBS0gsSUFBbEIsRUFBd0IsS0FBS0gsS0FBN0IsRUFBb0MsS0FBS0UsS0FBekMsRUFBZ0RMLFFBQVFVLFFBQXhELENBQTdCO0FBQ0EsZ0JBQUksS0FBS0osSUFBTCxJQUFhTixRQUFRVSxRQUF6QixFQUNBO0FBQ0ksdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUF0Qkw7QUFBQTtBQUFBLGlDQXlCSTtBQUNJLGlCQUFLSixJQUFMLEdBQVksQ0FBWjtBQUNIO0FBM0JMO0FBQUE7QUFBQSxrQ0E4Qkk7QUFDSSxnQkFBTUssT0FBTyxLQUFLVCxFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0MsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFRLElBQWI7QUFDQSxpQkFBS04sS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQW5DTDs7QUFBQTtBQUFBIiwiZmlsZSI6Im9wYWNpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBleGlzdHMgPSByZXF1aXJlKCdleGlzdHMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBPcGFjaXR5XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wYWNpdHksIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ29wYWNpdHknXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMudG8gPSBvcGFjaXR5XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBleGlzdHMoZWxlbWVudC5vcGFjaXR5KSA/IHBhcnNlRmxvYXQoZWxlbWVudC5vcGFjaXR5KSA6IDFcclxuICAgICAgICB0aGlzLmRlbHRhID0gdGhpcy50byAtIHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIHRoaXMudGltZSArPSBlbGFwc2VkXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCBvcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcGVhdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19