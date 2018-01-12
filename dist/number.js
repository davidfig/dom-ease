'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Number(entry, start, to, options, units) {
        _classCallCheck(this, Number);

        this.entry = entry;
        this.to = to;
        this.options = options;
        this.start = start;
        this.delta = to - start;
        this.units = units || '';
        this.time = 0;
    }

    _createClass(Number, [{
        key: 'update',
        value: function update(element) {
            element.style[this.entry] = this.options.ease(this.time, this.start, this.delta, this.options.duration) + this.units;
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

    return Number;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9udW1iZXIuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVudHJ5Iiwic3RhcnQiLCJ0byIsIm9wdGlvbnMiLCJ1bml0cyIsImRlbHRhIiwidGltZSIsImVsZW1lbnQiLCJzdHlsZSIsImVhc2UiLCJkdXJhdGlvbiIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksb0JBQVlDLEtBQVosRUFBbUJDLEtBQW5CLEVBQTBCQyxFQUExQixFQUE4QkMsT0FBOUIsRUFBdUNDLEtBQXZDLEVBQ0E7QUFBQTs7QUFDSSxhQUFLSixLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLRSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLSSxLQUFMLEdBQWFILEtBQUtELEtBQWxCO0FBQ0EsYUFBS0csS0FBTCxHQUFhQSxTQUFTLEVBQXRCO0FBQ0EsYUFBS0UsSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFYTDtBQUFBO0FBQUEsK0JBYVdDLE9BYlgsRUFjSTtBQUNJQSxvQkFBUUMsS0FBUixDQUFjLEtBQUtSLEtBQW5CLElBQTRCLEtBQUtHLE9BQUwsQ0FBYU0sSUFBYixDQUFrQixLQUFLSCxJQUF2QixFQUE2QixLQUFLTCxLQUFsQyxFQUF5QyxLQUFLSSxLQUE5QyxFQUFxRCxLQUFLRixPQUFMLENBQWFPLFFBQWxFLElBQThFLEtBQUtOLEtBQS9HO0FBQ0g7QUFoQkw7QUFBQTtBQUFBLGtDQW1CSTtBQUNJLGdCQUFNTyxPQUFPLEtBQUtULEVBQWxCO0FBQ0EsaUJBQUtBLEVBQUwsR0FBVSxLQUFLRCxLQUFmO0FBQ0EsaUJBQUtBLEtBQUwsR0FBYVUsSUFBYjtBQUNBLGlCQUFLTixLQUFMLEdBQWEsQ0FBQyxLQUFLQSxLQUFuQjtBQUNIO0FBeEJMOztBQUFBO0FBQUEiLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBOdW1iZXJcclxue1xyXG4gICAgY29uc3RydWN0b3IoZW50cnksIHN0YXJ0LCB0bywgb3B0aW9ucywgdW5pdHMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5XHJcbiAgICAgICAgdGhpcy50byA9IHRvXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSB0byAtIHN0YXJ0XHJcbiAgICAgICAgdGhpcy51bml0cyA9IHVuaXRzIHx8ICcnXHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGVbdGhpcy5lbnRyeV0gPSB0aGlzLm9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIHRoaXMub3B0aW9ucy5kdXJhdGlvbikgKyB0aGlzLnVuaXRzXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3dhcCA9IHRoaXMudG9cclxuICAgICAgICB0aGlzLnRvID0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzd2FwXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IC10aGlzLmRlbHRhXHJcbiAgICB9XHJcbn0iXX0=