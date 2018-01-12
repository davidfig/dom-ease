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
                            return parseFloat(transform.values);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVhc2VFbGVtZW50IiwiZW50cnkiLCJ0byIsIm9wdGlvbnMiLCJzdGFydCIsImNhbGN1bGF0ZVN0YXJ0IiwiZGVsdGEiLCJ0aW1lIiwidHJhbnNmb3JtcyIsInJlYWRUcmFuc2Zvcm0iLCJpIiwiX2kiLCJsZW5ndGgiLCJ0cmFuc2Zvcm0iLCJuYW1lIiwicGFyc2VGbG9hdCIsInZhbHVlcyIsImNoYW5nZVRyYW5zZm9ybSIsImVhc2UiLCJkdXJhdGlvbiIsInN3YXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBQSxPQUFPQyxPQUFQO0FBRUksdUJBQVlDLFdBQVosRUFBeUJDLEtBQXpCLEVBQWdDQyxFQUFoQyxFQUFvQ0MsT0FBcEMsRUFDQTtBQUFBOztBQUNJLGFBQUtILFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEtBQUtDLGNBQUwsRUFBYjtBQUNBLGFBQUtDLEtBQUwsR0FBYUosS0FBSyxLQUFLRSxLQUF2QjtBQUNBLGFBQUtHLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBWEw7QUFBQTtBQUFBLHlDQWNJO0FBQ0ksZ0JBQU1DLGFBQWEsS0FBS1IsV0FBTCxDQUFpQlMsYUFBakIsRUFBbkI7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsS0FBS0gsV0FBV0ksTUFBaEMsRUFBd0NGLElBQUlDLEVBQTVDLEVBQWdERCxHQUFoRCxFQUNBO0FBQ0ksb0JBQU1HLFlBQVlMLFdBQVdFLENBQVgsQ0FBbEI7QUFDQSxvQkFBSUcsVUFBVUMsSUFBVixLQUFtQixLQUFLYixLQUE1QixFQUNBO0FBQ0ksNEJBQVEsS0FBS0EsS0FBYjtBQUVJLDZCQUFLLE9BQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBZSxLQUFLLFFBQUw7QUFDekIsbUNBQU9jLFdBQVdGLFVBQVVHLE1BQXJCLENBQVA7QUFIUjtBQUtIO0FBQ0o7QUFDRCxvQkFBUSxLQUFLZixLQUFiO0FBRUkscUJBQUssT0FBTCxDQUFjLEtBQUssUUFBTCxDQUFlLEtBQUssUUFBTDtBQUN6QiwyQkFBTyxDQUFQO0FBSFI7QUFNSDtBQWxDTDtBQUFBO0FBQUEsaUNBcUNJO0FBQ0ksaUJBQUtELFdBQUwsQ0FBaUJpQixlQUFqQixDQUFpQyxLQUFLaEIsS0FBdEMsRUFBNkMsS0FBS0UsT0FBTCxDQUFhZSxJQUFiLENBQWtCLEtBQUtYLElBQXZCLEVBQTZCLEtBQUtILEtBQWxDLEVBQXlDLEtBQUtFLEtBQTlDLEVBQXFELEtBQUtILE9BQUwsQ0FBYWdCLFFBQWxFLENBQTdDO0FBQ0g7QUF2Q0w7QUFBQTtBQUFBLGtDQTBDSTtBQUNJLGdCQUFNQyxPQUFPLEtBQUtsQixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0UsS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFnQixJQUFiO0FBQ0EsaUJBQUtkLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUEvQ0w7O0FBQUE7QUFBQSIsImZpbGUiOiJ0cmFuc2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRyYW5zZm9ybVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlYXNlRWxlbWVudCwgZW50cnksIHRvLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWFzZUVsZW1lbnQgPSBlYXNlRWxlbWVudFxyXG4gICAgICAgIHRoaXMuZW50cnkgPSBlbnRyeVxyXG4gICAgICAgIHRoaXMudG8gPSB0b1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5jYWxjdWxhdGVTdGFydCgpXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRvIC0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMuZWFzZUVsZW1lbnQucmVhZFRyYW5zZm9ybSgpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3Jtcy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXVxyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLm5hbWUgPT09IHRoaXMuZW50cnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lbnRyeSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6IGNhc2UgJ3NjYWxlWCc6IGNhc2UgJ3NjYWxlWSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRyYW5zZm9ybS52YWx1ZXMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmVudHJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAnc2NhbGUnOiBjYXNlICdzY2FsZVgnOiBjYXNlICdzY2FsZVknOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lYXNlRWxlbWVudC5jaGFuZ2VUcmFuc2Zvcm0odGhpcy5lbnRyeSwgdGhpcy5vcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pKVxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXHJcbiAgICAgICAgdGhpcy50byA9IHRoaXMuc3RhcnRcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAtdGhpcy5kZWx0YVxyXG4gICAgfVxyXG59Il19