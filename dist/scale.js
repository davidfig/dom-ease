'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Scale(element, value, options) {
        _classCallCheck(this, Scale);

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
        value: function update() {
            var options = this.options;
            var value = options.ease(this.time, this.start, this.delta, options.duration);
            var transform = this.element.style.transform;
            var scale = transform.indexOf('scale(');
            if (!transform) {
                this.element.style.transform = 'scale(' + value + ')';
            } else if (scale == -1) {
                this.element.style.transform += ' scale(' + value + ')';
            } else {
                this.element.style.transform = transform.substr(0, scale + 'scale('.length) + value + transform.substr(transform.indexOf(')'));
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2FsZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZWxlbWVudCIsInZhbHVlIiwib3B0aW9ucyIsInRvIiwidHJhbnNmb3JtIiwic3R5bGUiLCJzY2FsZSIsImluZGV4T2YiLCJzdGFydCIsImV4dHJhY3QiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJwYXJzZUZsb2F0IiwiZGVsdGEiLCJ0aW1lIiwiZWFzZSIsImR1cmF0aW9uIiwic3Vic3RyIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxtQkFBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJDLE9BQTVCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxFQUFMLEdBQVVGLEtBQVY7QUFDQSxZQUFNRyxZQUFZSixRQUFRSyxLQUFSLENBQWNELFNBQWhDO0FBQ0EsWUFBTUUsUUFBUUYsVUFBVUcsT0FBVixDQUFrQixRQUFsQixDQUFkO0FBQ0EsWUFBSUQsU0FBUyxDQUFDLENBQWQsRUFDQTtBQUNJLGlCQUFLRSxLQUFMLEdBQWEsQ0FBYjtBQUNILFNBSEQsTUFLQTtBQUNJLGdCQUFNQyxVQUFVTCxVQUFVTSxTQUFWLENBQW9CSixRQUFTLFFBQUQsQ0FBV0ssTUFBdkMsRUFBK0NQLFVBQVVHLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUJELEtBQXZCLENBQS9DLENBQWhCO0FBQ0EsaUJBQUtFLEtBQUwsR0FBYUksV0FBV0gsT0FBWCxDQUFiO0FBQ0g7QUFDRCxhQUFLSSxLQUFMLEdBQWEsS0FBS1YsRUFBTCxHQUFVLEtBQUtLLEtBQTVCO0FBQ0EsYUFBS00sSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFwQkw7QUFBQTtBQUFBLGlDQXVCSTtBQUNJLGdCQUFNWixVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsZ0JBQU1ELFFBQVFDLFFBQVFhLElBQVIsQ0FBYSxLQUFLRCxJQUFsQixFQUF3QixLQUFLTixLQUE3QixFQUFvQyxLQUFLSyxLQUF6QyxFQUFnRFgsUUFBUWMsUUFBeEQsQ0FBZDtBQUNBLGdCQUFNWixZQUFZLEtBQUtKLE9BQUwsQ0FBYUssS0FBYixDQUFtQkQsU0FBckM7QUFDQSxnQkFBTUUsUUFBUUYsVUFBVUcsT0FBVixDQUFrQixRQUFsQixDQUFkO0FBQ0EsZ0JBQUksQ0FBQ0gsU0FBTCxFQUNBO0FBQ0kscUJBQUtKLE9BQUwsQ0FBYUssS0FBYixDQUFtQkQsU0FBbkIsR0FBK0IsV0FBV0gsS0FBWCxHQUFtQixHQUFsRDtBQUNILGFBSEQsTUFJSyxJQUFJSyxTQUFTLENBQUMsQ0FBZCxFQUNMO0FBQ0kscUJBQUtOLE9BQUwsQ0FBYUssS0FBYixDQUFtQkQsU0FBbkIsSUFBZ0MsWUFBWUgsS0FBWixHQUFvQixHQUFwRDtBQUNILGFBSEksTUFLTDtBQUNJLHFCQUFLRCxPQUFMLENBQWFLLEtBQWIsQ0FBbUJELFNBQW5CLEdBQStCQSxVQUFVYSxNQUFWLENBQWlCLENBQWpCLEVBQW9CWCxRQUFTLFFBQUQsQ0FBV0ssTUFBdkMsSUFBaURWLEtBQWpELEdBQXlERyxVQUFVYSxNQUFWLENBQWlCYixVQUFVRyxPQUFWLENBQWtCLEdBQWxCLENBQWpCLENBQXhGO0FBQ0g7QUFDSjtBQXhDTDtBQUFBO0FBQUEsa0NBMkNJO0FBQ0ksZ0JBQU1XLE9BQU8sS0FBS2YsRUFBbEI7QUFDQSxpQkFBS0EsRUFBTCxHQUFVLEtBQUtLLEtBQWY7QUFDQSxpQkFBS0EsS0FBTCxHQUFhVSxJQUFiO0FBQ0EsaUJBQUtMLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUFoREw7O0FBQUE7QUFBQSIsImZpbGUiOiJzY2FsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU2NhbGVcclxue1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgICB0aGlzLnRvID0gdmFsdWVcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtLmluZGV4T2YoJ3NjYWxlKCcpXHJcbiAgICAgICAgaWYgKHNjYWxlID09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0cmFjdCA9IHRyYW5zZm9ybS5zdWJzdHJpbmcoc2NhbGUgKyAoJ3NjYWxlKCcpLmxlbmd0aCwgdHJhbnNmb3JtLmluZGV4T2YoJyknLCBzY2FsZSkpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBwYXJzZUZsb2F0KGV4dHJhY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLnRvIC0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIHRoaXMuc3RhcnQsIHRoaXMuZGVsdGEsIG9wdGlvbnMuZHVyYXRpb24pXHJcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdHJhbnNmb3JtLmluZGV4T2YoJ3NjYWxlKCcpXHJcbiAgICAgICAgaWYgKCF0cmFuc2Zvcm0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB2YWx1ZSArICcpJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzY2FsZSA9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gKz0gJyBzY2FsZSgnICsgdmFsdWUgKyAnKSdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybS5zdWJzdHIoMCwgc2NhbGUgKyAoJ3NjYWxlKCcpLmxlbmd0aCkgKyB2YWx1ZSArIHRyYW5zZm9ybS5zdWJzdHIodHJhbnNmb3JtLmluZGV4T2YoJyknKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3dhcCA9IHRoaXMudG9cclxuICAgICAgICB0aGlzLnRvID0gdGhpcy5zdGFydFxyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzd2FwXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IC10aGlzLmRlbHRhXHJcbiAgICB9XHJcbn0iXX0=