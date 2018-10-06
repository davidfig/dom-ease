'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * create number entry
 * @private
 * @param {string} entry
 * @param {number} start
 * @param {number} to
 * @param {string} [units]
 */
module.exports = function () {
    function Number(element, entry, start, to, units) {
        _classCallCheck(this, Number);

        this.element = element;
        this.entry = entry;
        this.to = to;
        this.start = start;
        this.delta = to - start;
        this.units = units || '';
    }

    _createClass(Number, [{
        key: 'update',
        value: function update(percent) {
            this.element.style[this.entry] = this.start + this.delta * percent + this.units;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9udW1iZXIuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJlbnRyeSIsInN0YXJ0IiwidG8iLCJ1bml0cyIsImRlbHRhIiwicGVyY2VudCIsInN0eWxlIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7O0FBUUFBLE9BQU9DLE9BQVA7QUFFSSxvQkFBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJDLEtBQTVCLEVBQW1DQyxFQUFuQyxFQUF1Q0MsS0FBdkMsRUFDQTtBQUFBOztBQUNJLGFBQUtKLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtFLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGFBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtHLEtBQUwsR0FBYUYsS0FBS0QsS0FBbEI7QUFDQSxhQUFLRSxLQUFMLEdBQWFBLFNBQVMsRUFBdEI7QUFDSDs7QUFWTDtBQUFBO0FBQUEsK0JBWVdFLE9BWlgsRUFhSTtBQUNJLGlCQUFLTixPQUFMLENBQWFPLEtBQWIsQ0FBbUIsS0FBS04sS0FBeEIsSUFBa0MsS0FBS0MsS0FBTCxHQUFhLEtBQUtHLEtBQUwsR0FBYUMsT0FBM0IsR0FBc0MsS0FBS0YsS0FBNUU7QUFDSDtBQWZMO0FBQUE7QUFBQSxrQ0FrQkk7QUFDSSxnQkFBTUksT0FBTyxLQUFLTCxFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0QsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFNLElBQWI7QUFDQSxpQkFBS0gsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQXZCTDs7QUFBQTtBQUFBIiwiZmlsZSI6Im51bWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBjcmVhdGUgbnVtYmVyIGVudHJ5XHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IHRvXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdHNdXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE51bWJlclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBlbnRyeSwgc3RhcnQsIHRvLCB1bml0cylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5XHJcbiAgICAgICAgdGhpcy50byA9IHRvXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRvIC0gc3RhcnRcclxuICAgICAgICB0aGlzLnVuaXRzID0gdW5pdHMgfHwgJydcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUocGVyY2VudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdGhpcy5lbnRyeV0gPSAodGhpcy5zdGFydCArIHRoaXMuZGVsdGEgKiBwZXJjZW50KSArIHRoaXMudW5pdHNcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==