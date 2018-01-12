'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Transform(easeElement, entry, to, options) {
        _classCallCheck(this, Transform);

        this.easeElement = easeElement;
        this.entry = entry;
        this.to = to;
        this.options = options;
        this.start = this.calculateStart();
        this.delta = to - this.start;
        this.time = 0;
    }

    _createClass(Transform, [{
        key: 'calculateStart',
        value: function calculateStart() {
            var transforms = this.easeElement.readTransform();
            for (var i = 0, _i = transforms.length; i < _i; i++) {
                var transform = transforms[i];
                if (transform.name === this.entry) {
                    switch (this.entry) {
                        case 'scale':case 'scaleX':case 'scaleY':
                            return parseFloat(transform.value);
                    }
                }
            }
            switch (this.entry) {
                case 'scale':case 'scaleX':case 'scaleY':
                    return 1;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.easeElement.changeTransform(this.entry, this.options.ease(this.time, this.start, this.delta, this.options.duration));
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

    return Transform;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVhc2VFbGVtZW50IiwiZW50cnkiLCJ0byIsIm9wdGlvbnMiLCJzdGFydCIsImNhbGN1bGF0ZVN0YXJ0IiwiZGVsdGEiLCJ0aW1lIiwidHJhbnNmb3JtcyIsInJlYWRUcmFuc2Zvcm0iLCJpIiwiX2kiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJuYW1lIiwicGFyc2VGbG9hdCIsInZhbHVlIiwiY2hhbmdlVHJhbnNmb3JtIiwiZWFzZSIsImR1cmF0aW9uIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSx1QkFBWUMsV0FBWixFQUF5QkMsS0FBekIsRUFBZ0NDLEVBQWhDLEVBQW9DQyxPQUFwQyxFQUNBO0FBQUE7O0FBQ0ksYUFBS0gsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxhQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLQyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxLQUFMLEdBQWEsS0FBS0MsY0FBTCxFQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhSixLQUFLLEtBQUtFLEtBQXZCO0FBQ0EsYUFBS0csSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFYTDtBQUFBO0FBQUEseUNBY0k7QUFDSSxnQkFBTUMsYUFBYSxLQUFLUixXQUFMLENBQWlCUyxhQUFqQixFQUFuQjtBQUNBLGlCQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxLQUFLSCxXQUFXSSxNQUFoQyxFQUF3Q0YsSUFBSUMsRUFBNUMsRUFBZ0RELEdBQWhELEVBQ0E7QUFDSSxvQkFBTUcsWUFBWUwsV0FBV0UsQ0FBWCxDQUFsQjtBQUNBLG9CQUFJRyxVQUFVQyxJQUFWLEtBQW1CLEtBQUtiLEtBQTVCLEVBQ0E7QUFDSSw0QkFBUSxLQUFLQSxLQUFiO0FBRUksNkJBQUssT0FBTCxDQUFjLEtBQUssUUFBTCxDQUFlLEtBQUssUUFBTDtBQUN6QixtQ0FBT2MsV0FBV0YsVUFBVUcsS0FBckIsQ0FBUDtBQUhSO0FBS0g7QUFDSjtBQUNELG9CQUFRLEtBQUtmLEtBQWI7QUFFSSxxQkFBSyxPQUFMLENBQWMsS0FBSyxRQUFMLENBQWUsS0FBSyxRQUFMO0FBQ3pCLDJCQUFPLENBQVA7QUFIUjtBQU1IO0FBbENMO0FBQUE7QUFBQSxpQ0FxQ0k7QUFDSSxpQkFBS0QsV0FBTCxDQUFpQmlCLGVBQWpCLENBQWlDLEtBQUtoQixLQUF0QyxFQUE2QyxLQUFLRSxPQUFMLENBQWFlLElBQWIsQ0FBa0IsS0FBS1gsSUFBdkIsRUFBNkIsS0FBS0gsS0FBbEMsRUFBeUMsS0FBS0UsS0FBOUMsRUFBcUQsS0FBS0gsT0FBTCxDQUFhZ0IsUUFBbEUsQ0FBN0M7QUFDSDtBQXZDTDtBQUFBO0FBQUEsa0NBMENJO0FBQ0ksZ0JBQU1DLE9BQU8sS0FBS2xCLEVBQWxCO0FBQ0EsaUJBQUtBLEVBQUwsR0FBVSxLQUFLRSxLQUFmO0FBQ0EsaUJBQUtBLEtBQUwsR0FBYWdCLElBQWI7QUFDQSxpQkFBS2QsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQS9DTDs7QUFBQTtBQUFBIiwiZmlsZSI6InRyYW5zZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVHJhbnNmb3JtXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVhc2VFbGVtZW50LCBlbnRyeSwgdG8sIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lYXNlRWxlbWVudCA9IGVhc2VFbGVtZW50XHJcbiAgICAgICAgdGhpcy5lbnRyeSA9IGVudHJ5XHJcbiAgICAgICAgdGhpcy50byA9IHRvXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmNhbGN1bGF0ZVN0YXJ0KClcclxuICAgICAgICB0aGlzLmRlbHRhID0gdG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZVN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gdGhpcy5lYXNlRWxlbWVudC5yZWFkVHJhbnNmb3JtKClcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0cmFuc2Zvcm1zLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1zW2ldXHJcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0ubmFtZSA9PT0gdGhpcy5lbnRyeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmVudHJ5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzogY2FzZSAnc2NhbGVYJzogY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodHJhbnNmb3JtLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5lbnRyeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzogY2FzZSAnc2NhbGVYJzogY2FzZSAnc2NhbGVZJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWFzZUVsZW1lbnQuY2hhbmdlVHJhbnNmb3JtKHRoaXMuZW50cnksIHRoaXMub3B0aW9ucy5lYXNlKHRoaXMudGltZSwgdGhpcy5zdGFydCwgdGhpcy5kZWx0YSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKSlcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==