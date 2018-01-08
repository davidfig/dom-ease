'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function ScaleX(element, x, options) {
        _classCallCheck(this, ScaleX);

        this.name = 'scaleX';
        this.element = element;
        this.options = options;
        this.to = x;
        var transform = element.style.transform;
        var scaleX = transform.indexOf('scaleX');
        if (scaleX == -1) {
            this.start = 1;
        } else {
            var extract = transform.substring(scaleX + 'scaleX'.length + 1, transform.indexOf(')', scaleX));
            this.start = parseFloat(extract);
        }
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(ScaleX, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            var scale = options.ease(this.time, this.start, this.delta, options.duration);
            var transform = this.element.style.transform;
            var scaleX = transform.indexOf('scaleX');

            if (!transform) {
                this.element.style.transform = 'scaleX(' + scale + ')';
            } else if (scaleX == -1) {
                this.element.style.transform += ' scaleX(' + scale + ')';
            } else {
                this.element.style.transform = transform.substr(0, scaleX + 'scaleX('.length) + scale + transform.indexOf(')', scaleX);
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

    return ScaleX;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2FsZVguanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJ4Iiwib3B0aW9ucyIsIm5hbWUiLCJ0byIsInRyYW5zZm9ybSIsInN0eWxlIiwic2NhbGVYIiwiaW5kZXhPZiIsInN0YXJ0IiwiZXh0cmFjdCIsInN1YnN0cmluZyIsImxlbmd0aCIsInBhcnNlRmxvYXQiLCJkZWx0YSIsInRpbWUiLCJlbGFwc2VkIiwic2NhbGUiLCJlYXNlIiwiZHVyYXRpb24iLCJzdWJzdHIiLCJzd2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUVJLG9CQUFZQyxPQUFaLEVBQXFCQyxDQUFyQixFQUF3QkMsT0FBeEIsRUFDQTtBQUFBOztBQUNJLGFBQUtDLElBQUwsR0FBWSxRQUFaO0FBQ0EsYUFBS0gsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0UsRUFBTCxHQUFVSCxDQUFWO0FBQ0EsWUFBTUksWUFBWUwsUUFBUU0sS0FBUixDQUFjRCxTQUFoQztBQUNBLFlBQU1FLFNBQVNGLFVBQVVHLE9BQVYsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBLFlBQUlELFVBQVUsQ0FBQyxDQUFmLEVBQ0E7QUFDSSxpQkFBS0UsS0FBTCxHQUFhLENBQWI7QUFDSCxTQUhELE1BS0E7QUFDSSxnQkFBTUMsVUFBVUwsVUFBVU0sU0FBVixDQUFvQkosU0FBVSxRQUFELENBQVdLLE1BQXBCLEdBQTZCLENBQWpELEVBQW9EUCxVQUFVRyxPQUFWLENBQWtCLEdBQWxCLEVBQXVCRCxNQUF2QixDQUFwRCxDQUFoQjtBQUNBLGlCQUFLRSxLQUFMLEdBQWFJLFdBQVdILE9BQVgsQ0FBYjtBQUNIO0FBQ0QsYUFBS0ksS0FBTCxHQUFhLEtBQUtWLEVBQUwsR0FBVSxLQUFLSyxLQUE1QjtBQUNBLGFBQUtNLElBQUwsR0FBWSxDQUFaO0FBQ0g7O0FBckJMO0FBQUE7QUFBQSwrQkF1QldDLE9BdkJYLEVBd0JJO0FBQ0ksZ0JBQU1kLFVBQVUsS0FBS0EsT0FBckI7QUFDQSxpQkFBS2EsSUFBTCxJQUFhQyxPQUFiO0FBQ0EsZ0JBQU1DLFFBQVFmLFFBQVFnQixJQUFSLENBQWEsS0FBS0gsSUFBbEIsRUFBd0IsS0FBS04sS0FBN0IsRUFBb0MsS0FBS0ssS0FBekMsRUFBZ0RaLFFBQVFpQixRQUF4RCxDQUFkO0FBQ0EsZ0JBQU1kLFlBQVksS0FBS0wsT0FBTCxDQUFhTSxLQUFiLENBQW1CRCxTQUFyQztBQUNBLGdCQUFNRSxTQUFTRixVQUFVRyxPQUFWLENBQWtCLFFBQWxCLENBQWY7O0FBRUEsZ0JBQUksQ0FBQ0gsU0FBTCxFQUNBO0FBQ0kscUJBQUtMLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkQsU0FBbkIsR0FBK0IsWUFBWVksS0FBWixHQUFvQixHQUFuRDtBQUNILGFBSEQsTUFJSyxJQUFJVixVQUFVLENBQUMsQ0FBZixFQUNMO0FBQ0kscUJBQUtQLE9BQUwsQ0FBYU0sS0FBYixDQUFtQkQsU0FBbkIsSUFBZ0MsYUFBYVksS0FBYixHQUFxQixHQUFyRDtBQUNILGFBSEksTUFLTDtBQUNJLHFCQUFLakIsT0FBTCxDQUFhTSxLQUFiLENBQW1CRCxTQUFuQixHQUErQkEsVUFBVWUsTUFBVixDQUFpQixDQUFqQixFQUFvQmIsU0FBVSxTQUFELENBQVlLLE1BQXpDLElBQW1ESyxLQUFuRCxHQUEyRFosVUFBVUcsT0FBVixDQUFrQixHQUFsQixFQUF1QkQsTUFBdkIsQ0FBMUY7QUFDSDtBQUNELGdCQUFJLEtBQUtRLElBQUwsSUFBYWIsUUFBUWlCLFFBQXpCLEVBQ0E7QUFDSSx1QkFBTyxJQUFQO0FBQ0g7QUFDSjtBQS9DTDtBQUFBO0FBQUEsaUNBa0RJO0FBQ0ksaUJBQUtKLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUFwREw7QUFBQTtBQUFBLGtDQXVESTtBQUNJLGdCQUFNTSxPQUFPLEtBQUtqQixFQUFsQjtBQUNBLGlCQUFLQSxFQUFMLEdBQVUsS0FBS0ssS0FBZjtBQUNBLGlCQUFLQSxLQUFMLEdBQWFZLElBQWI7QUFDQSxpQkFBS1AsS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSDtBQTVETDs7QUFBQTtBQUFBIiwiZmlsZSI6InNjYWxlWC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU2NhbGVYXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHgsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ3NjYWxlWCdcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMudG8gPSB4XHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1cclxuICAgICAgICBjb25zdCBzY2FsZVggPSB0cmFuc2Zvcm0uaW5kZXhPZignc2NhbGVYJylcclxuICAgICAgICBpZiAoc2NhbGVYID09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0cmFjdCA9IHRyYW5zZm9ybS5zdWJzdHJpbmcoc2NhbGVYICsgKCdzY2FsZVgnKS5sZW5ndGggKyAxLCB0cmFuc2Zvcm0uaW5kZXhPZignKScsIHNjYWxlWCkpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBwYXJzZUZsb2F0KGV4dHJhY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLnRvIC0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICBjb25zdCBzY2FsZSA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGNvbnN0IHNjYWxlWCA9IHRyYW5zZm9ybS5pbmRleE9mKCdzY2FsZVgnKVxyXG5cclxuICAgICAgICBpZiAoIXRyYW5zZm9ybSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGVYKCcgKyBzY2FsZSArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzY2FsZVggPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtICs9ICcgc2NhbGVYKCcgKyBzY2FsZSArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtLnN1YnN0cigwLCBzY2FsZVggKyAoJ3NjYWxlWCgnKS5sZW5ndGgpICsgc2NhbGUgKyB0cmFuc2Zvcm0uaW5kZXhPZignKScsIHNjYWxlWClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSA+PSBvcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVwZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3dhcCA9IHRoaXMudG9cclxuICAgICAgICB0aGlzLnRvID0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzd2FwXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IC10aGlzLmRlbHRhXHJcbiAgICB9XHJcbn0iXX0=