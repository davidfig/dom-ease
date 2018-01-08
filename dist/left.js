'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Left(element, x, options) {
        _classCallCheck(this, Left);

        this.name = 'left';
        this.element = element;
        this.to = x;
        this.options = options;
        this.start = element.offsetLeft;
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Left, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            this.element.style.left = options.ease(this.time, this.start, this.delta, options.duration) + 'px';
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

    return Left;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sZWZ0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJlbGVtZW50IiwieCIsIm9wdGlvbnMiLCJuYW1lIiwidG8iLCJzdGFydCIsIm9mZnNldExlZnQiLCJkZWx0YSIsInRpbWUiLCJlbGFwc2VkIiwic3R5bGUiLCJsZWZ0IiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxrQkFBWUMsT0FBWixFQUFxQkMsQ0FBckIsRUFBd0JDLE9BQXhCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLGFBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtJLEVBQUwsR0FBVUgsQ0FBVjtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtHLEtBQUwsR0FBYUwsUUFBUU0sVUFBckI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsS0FBS0gsRUFBTCxHQUFVLEtBQUtDLEtBQTVCO0FBQ0EsYUFBS0csSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFYTDtBQUFBO0FBQUEsK0JBYVdDLE9BYlgsRUFjSTtBQUNJLGdCQUFNUCxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsaUJBQUtNLElBQUwsSUFBYUMsT0FBYjtBQUNBLGlCQUFLVCxPQUFMLENBQWFVLEtBQWIsQ0FBbUJDLElBQW5CLEdBQTBCVCxRQUFRVSxJQUFSLENBQWEsS0FBS0osSUFBbEIsRUFBd0IsS0FBS0gsS0FBN0IsRUFBb0MsS0FBS0UsS0FBekMsRUFBZ0RMLFFBQVFXLFFBQXhELElBQW9FLElBQTlGO0FBQ0EsZ0JBQUksS0FBS0wsSUFBTCxJQUFhTixRQUFRVyxRQUF6QixFQUNBO0FBQ0ksdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUF0Qkw7QUFBQTtBQUFBLGlDQXlCSTtBQUNJLGlCQUFLTCxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBM0JMO0FBQUE7QUFBQSxrQ0E4Qkk7QUFDSSxnQkFBTU0sT0FBTyxLQUFLVixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0MsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFTLElBQWI7QUFDQSxpQkFBS1AsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQW5DTDs7QUFBQTtBQUFBIiwiZmlsZSI6ImxlZnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIExlZnRcclxue1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgeCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnbGVmdCdcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50byA9IHhcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGVsZW1lbnQub2Zmc2V0TGVmdFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLnRvIC0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pICsgJ3B4J1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gb3B0aW9ucy5kdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcGVhdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19