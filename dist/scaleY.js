'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function ScaleY(element, y, options) {
        _classCallCheck(this, ScaleY);

        this.element = element;
        this.options = options;
        this.to = y;
        var transform = element.style.transform;
        var scaleY = transform.indexOf('scaleY');
        if (scaleY == -1) {
            this.start = 1;
        } else {
            var extract = transform.substring(scaleY + 'scaleY'.length + 1, transform.indexOf(')', scaleY));
            this.start = parseFloat(extract);
        }
        this.delta = this.to - this.start;
        this.time = 0;
    }

    _createClass(ScaleY, [{
        key: 'update',
        value: function update() {
            var options = this.options;
            var scale = options.ease(this.time, this.start, this.delta, options.duration);
            var transform = this.element.style.transform;
            var scaleY = transform.indexOf('scaleY');

            if (!transform) {
                this.element.style.transform = 'scaleY(' + scale + ')';
            } else if (scaleY == -1) {
                this.element.style.transform += ' scaleY(' + scale + ')';
            } else {
                this.element.style.transform = transform.substr(0, scaleY + 'scaleY('.length) + scale + transform.indexOf(')', scaleY);
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

    return ScaleY;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2FsZVkuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJ5Iiwib3B0aW9ucyIsInRvIiwidHJhbnNmb3JtIiwic3R5bGUiLCJzY2FsZVkiLCJpbmRleE9mIiwic3RhcnQiLCJleHRyYWN0Iiwic3Vic3RyaW5nIiwibGVuZ3RoIiwicGFyc2VGbG9hdCIsImRlbHRhIiwidGltZSIsInNjYWxlIiwiZWFzZSIsImR1cmF0aW9uIiwic3Vic3RyIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSxvQkFBWUMsT0FBWixFQUFxQkMsQ0FBckIsRUFBd0JDLE9BQXhCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxFQUFMLEdBQVVGLENBQVY7QUFDQSxZQUFNRyxZQUFZSixRQUFRSyxLQUFSLENBQWNELFNBQWhDO0FBQ0EsWUFBTUUsU0FBU0YsVUFBVUcsT0FBVixDQUFrQixRQUFsQixDQUFmO0FBQ0EsWUFBSUQsVUFBVSxDQUFDLENBQWYsRUFDQTtBQUNJLGlCQUFLRSxLQUFMLEdBQWEsQ0FBYjtBQUNILFNBSEQsTUFLQTtBQUNJLGdCQUFNQyxVQUFVTCxVQUFVTSxTQUFWLENBQW9CSixTQUFVLFFBQUQsQ0FBV0ssTUFBcEIsR0FBNkIsQ0FBakQsRUFBb0RQLFVBQVVHLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUJELE1BQXZCLENBQXBELENBQWhCO0FBQ0EsaUJBQUtFLEtBQUwsR0FBYUksV0FBV0gsT0FBWCxDQUFiO0FBQ0g7QUFDRCxhQUFLSSxLQUFMLEdBQWEsS0FBS1YsRUFBTCxHQUFVLEtBQUtLLEtBQTVCO0FBQ0EsYUFBS00sSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFwQkw7QUFBQTtBQUFBLGlDQXVCSTtBQUNJLGdCQUFNWixVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsZ0JBQU1hLFFBQVFiLFFBQVFjLElBQVIsQ0FBYSxLQUFLRixJQUFsQixFQUF3QixLQUFLTixLQUE3QixFQUFvQyxLQUFLSyxLQUF6QyxFQUFnRFgsUUFBUWUsUUFBeEQsQ0FBZDtBQUNBLGdCQUFNYixZQUFZLEtBQUtKLE9BQUwsQ0FBYUssS0FBYixDQUFtQkQsU0FBckM7QUFDQSxnQkFBTUUsU0FBU0YsVUFBVUcsT0FBVixDQUFrQixRQUFsQixDQUFmOztBQUVBLGdCQUFJLENBQUNILFNBQUwsRUFDQTtBQUNJLHFCQUFLSixPQUFMLENBQWFLLEtBQWIsQ0FBbUJELFNBQW5CLEdBQStCLFlBQVlXLEtBQVosR0FBb0IsR0FBbkQ7QUFDSCxhQUhELE1BSUssSUFBSVQsVUFBVSxDQUFDLENBQWYsRUFDTDtBQUNJLHFCQUFLTixPQUFMLENBQWFLLEtBQWIsQ0FBbUJELFNBQW5CLElBQWdDLGFBQWFXLEtBQWIsR0FBcUIsR0FBckQ7QUFDSCxhQUhJLE1BS0w7QUFDSSxxQkFBS2YsT0FBTCxDQUFhSyxLQUFiLENBQW1CRCxTQUFuQixHQUErQkEsVUFBVWMsTUFBVixDQUFpQixDQUFqQixFQUFvQlosU0FBVSxTQUFELENBQVlLLE1BQXpDLElBQW1ESSxLQUFuRCxHQUEyRFgsVUFBVUcsT0FBVixDQUFrQixHQUFsQixFQUF1QkQsTUFBdkIsQ0FBMUY7QUFDSDtBQUNKO0FBekNMO0FBQUE7QUFBQSxrQ0E0Q0k7QUFDSSxnQkFBTWEsT0FBTyxLQUFLaEIsRUFBbEI7QUFDQSxpQkFBS0EsRUFBTCxHQUFVLEtBQUtLLEtBQWY7QUFDQSxpQkFBS0EsS0FBTCxHQUFhVyxJQUFiO0FBQ0EsaUJBQUtOLEtBQUwsR0FBYSxDQUFDLEtBQUtBLEtBQW5CO0FBQ0g7QUFqREw7O0FBQUE7QUFBQSIsImZpbGUiOiJzY2FsZVkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFNjYWxlWVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCB5LCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXHJcbiAgICAgICAgdGhpcy50byA9IHlcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGNvbnN0IHNjYWxlWSA9IHRyYW5zZm9ybS5pbmRleE9mKCdzY2FsZVknKVxyXG4gICAgICAgIGlmIChzY2FsZVkgPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBleHRyYWN0ID0gdHJhbnNmb3JtLnN1YnN0cmluZyhzY2FsZVkgKyAoJ3NjYWxlWScpLmxlbmd0aCArIDEsIHRyYW5zZm9ybS5pbmRleE9mKCcpJywgc2NhbGVZKSlcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHBhcnNlRmxvYXQoZXh0cmFjdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMudG8gLSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gb3B0aW9ucy5lYXNlKHRoaXMudGltZSwgdGhpcy5zdGFydCwgdGhpcy5kZWx0YSwgb3B0aW9ucy5kdXJhdGlvbilcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtXHJcbiAgICAgICAgY29uc3Qgc2NhbGVZID0gdHJhbnNmb3JtLmluZGV4T2YoJ3NjYWxlWScpXHJcblxyXG4gICAgICAgIGlmICghdHJhbnNmb3JtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZVkoJyArIHNjYWxlICsgJyknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNjYWxlWSA9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gKz0gJyBzY2FsZVkoJyArIHNjYWxlICsgJyknXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0uc3Vic3RyKDAsIHNjYWxlWSArICgnc2NhbGVZKCcpLmxlbmd0aCkgKyBzY2FsZSArIHRyYW5zZm9ybS5pbmRleE9mKCcpJywgc2NhbGVZKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzd2FwID0gdGhpcy50b1xyXG4gICAgICAgIHRoaXMudG8gPSB0aGlzLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcclxuICAgICAgICB0aGlzLmRlbHRhID0gLXRoaXMuZGVsdGFcclxuICAgIH1cclxufSJdfQ==