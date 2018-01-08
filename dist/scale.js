'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Scale(element, value, options) {
        _classCallCheck(this, Scale);

        this.name = 'scale';
        this.element = element;
        this.options = options;
        this.to = value;
        var transform = element.style.transform;
        var scale = transform.indexOf('scale(');
        if (scale == -1) {
            this.start = 1;
        } else {
            var extract = transform.substring(scale + 'scale('.length, transform.indexOf(')', scale));
            this.start = parseFloat(extract);
        }
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(Scale, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            var value = void 0;
            if (this.time >= options.duration) {
                value = this.to;
            } else {
                value = options.ease(this.time, this.start, this.delta, options.duration);
            }
            var transform = this.element.style.transform;
            var scale = transform.indexOf('scale(');
            if (!transform) {
                this.element.style.transform = 'scale(' + value + ')';
            } else if (scale == -1) {
                this.element.style.transform += ' scale(' + value + ')';
            } else {
                this.element.style.transform = transform.substr(0, scale + 'scale('.length) + value + transform.substr(transform.indexOf(')'));
            }
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

    return Scale;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2FsZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsInZhbHVlIiwib3B0aW9ucyIsIm5hbWUiLCJ0byIsInRyYW5zZm9ybSIsInN0eWxlIiwic2NhbGUiLCJpbmRleE9mIiwic3RhcnQiLCJleHRyYWN0Iiwic3Vic3RyaW5nIiwibGVuZ3RoIiwicGFyc2VGbG9hdCIsImRlbHRhIiwidGltZSIsImVsYXBzZWQiLCJkdXJhdGlvbiIsImVhc2UiLCJzdWJzdHIiLCJzd2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG1CQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE0QkMsT0FBNUIsRUFDQTtBQUFBOztBQUNJLGFBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsYUFBS0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsRUFBTCxHQUFVSCxLQUFWO0FBQ0EsWUFBTUksWUFBWUwsUUFBUU0sS0FBUixDQUFjRCxTQUFoQztBQUNBLFlBQU1FLFFBQVFGLFVBQVVHLE9BQVYsQ0FBa0IsUUFBbEIsQ0FBZDtBQUNBLFlBQUlELFNBQVMsQ0FBQyxDQUFkLEVBQ0E7QUFDSSxpQkFBS0UsS0FBTCxHQUFhLENBQWI7QUFDSCxTQUhELE1BS0E7QUFDSSxnQkFBTUMsVUFBVUwsVUFBVU0sU0FBVixDQUFvQkosUUFBUyxRQUFELENBQVdLLE1BQXZDLEVBQStDUCxVQUFVRyxPQUFWLENBQWtCLEdBQWxCLEVBQXVCRCxLQUF2QixDQUEvQyxDQUFoQjtBQUNBLGlCQUFLRSxLQUFMLEdBQWFJLFdBQVdILE9BQVgsQ0FBYjtBQUNIO0FBQ0QsYUFBS0ksS0FBTCxHQUFhLEtBQUtWLEVBQUwsR0FBVSxLQUFLSyxLQUE1QjtBQUNBLGFBQUtNLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBckJMO0FBQUE7QUFBQSwrQkF1QldDLE9BdkJYLEVBd0JJO0FBQ0ksZ0JBQU1kLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS2EsSUFBTCxJQUFhQyxPQUFiO0FBQ0EsZ0JBQUlmLGNBQUo7QUFDQSxnQkFBSSxLQUFLYyxJQUFMLElBQWFiLFFBQVFlLFFBQXpCLEVBQ0E7QUFDSWhCLHdCQUFRLEtBQUtHLEVBQWI7QUFDSCxhQUhELE1BS0E7QUFDSUgsd0JBQVFDLFFBQVFnQixJQUFSLENBQWEsS0FBS0gsSUFBbEIsRUFBd0IsS0FBS04sS0FBN0IsRUFBb0MsS0FBS0ssS0FBekMsRUFBZ0RaLFFBQVFlLFFBQXhELENBQVI7QUFDSDtBQUNELGdCQUFNWixZQUFZLEtBQUtMLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkQsU0FBckM7QUFDQSxnQkFBTUUsUUFBUUYsVUFBVUcsT0FBVixDQUFrQixRQUFsQixDQUFkO0FBQ0EsZ0JBQUksQ0FBQ0gsU0FBTCxFQUNBO0FBQ0kscUJBQUtMLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkQsU0FBbkIsR0FBK0IsV0FBV0osS0FBWCxHQUFtQixHQUFsRDtBQUNILGFBSEQsTUFJSyxJQUFJTSxTQUFTLENBQUMsQ0FBZCxFQUNMO0FBQ0kscUJBQUtQLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkQsU0FBbkIsSUFBZ0MsWUFBWUosS0FBWixHQUFvQixHQUFwRDtBQUNILGFBSEksTUFLTDtBQUNJLHFCQUFLRCxPQUFMLENBQWFNLEtBQWIsQ0FBbUJELFNBQW5CLEdBQStCQSxVQUFVYyxNQUFWLENBQWlCLENBQWpCLEVBQW9CWixRQUFTLFFBQUQsQ0FBV0ssTUFBdkMsSUFBaURYLEtBQWpELEdBQXlESSxVQUFVYyxNQUFWLENBQWlCZCxVQUFVRyxPQUFWLENBQWtCLEdBQWxCLENBQWpCLENBQXhGO0FBQ0g7QUFDRCxnQkFBSSxLQUFLTyxJQUFMLElBQWFiLFFBQVFlLFFBQXpCLEVBQ0E7QUFDSSx1QkFBTyxJQUFQO0FBQ0g7QUFDSjtBQXRETDtBQUFBO0FBQUEsaUNBeURJO0FBQ0ksaUJBQUtGLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUEzREw7QUFBQTtBQUFBLGtDQThESTtBQUNJLGdCQUFNSyxPQUFPLEtBQUtoQixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0ssS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFXLElBQWI7QUFDQSxpQkFBS04sS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQW5FTDs7QUFBQTtBQUFBIiwiZmlsZSI6InNjYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTY2FsZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSAnc2NhbGUnXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnRvID0gdmFsdWVcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtLmluZGV4T2YoJ3NjYWxlKCcpXHJcbiAgICAgICAgaWYgKHNjYWxlID09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0cmFjdCA9IHRyYW5zZm9ybS5zdWJzdHJpbmcoc2NhbGUgKyAoJ3NjYWxlKCcpLmxlbmd0aCwgdHJhbnNmb3JtLmluZGV4T2YoJyknLCBzY2FsZSkpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBwYXJzZUZsb2F0KGV4dHJhY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLnRvIC0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICBsZXQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudG9cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBvcHRpb25zLmVhc2UodGhpcy50aW1lLCB0aGlzLnN0YXJ0LCB0aGlzLmRlbHRhLCBvcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtXHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0uaW5kZXhPZignc2NhbGUoJylcclxuICAgICAgICBpZiAoIXRyYW5zZm9ybSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoJyArIHZhbHVlICsgJyknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNjYWxlID09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSArPSAnIHNjYWxlKCcgKyB2YWx1ZSArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtLnN1YnN0cigwLCBzY2FsZSArICgnc2NhbGUoJykubGVuZ3RoKSArIHZhbHVlICsgdHJhbnNmb3JtLnN1YnN0cih0cmFuc2Zvcm0uaW5kZXhPZignKScpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50aW1lID49IG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBlYXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==