'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function BackgroundColor(element, colors, options) {
        _classCallCheck(this, BackgroundColor);

        this.name = 'backgroundColor';
        this.element = element;
        if (Array.isArray(colors)) {
            this.colors = colors;
        } else {
            this.colors = [colors];
        }
        this.original = element.style.backgroundColor;
        colors.push(this.original);
        this.interval = options.duration / colors.length;
        this.options = options;
        this.time = 0;
    }

    _createClass(BackgroundColor, [{
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            this.time += elapsed;
            var i = Math.floor(this.time / this.interval);
            var color = this.colors[i];
            if (this.element.style.backgroundColor !== color) {
                this.element.style.backgroundColor = this.colors[i];
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
            var reverse = [];
            for (var color in this.colors) {
                reverse.unshift(this.colors[color]);
            }
            reverse.push(reverse.shift());
            this.colors = reverse;
        }
    }]);

    return BackgroundColor;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNrZ3JvdW5kQ29sb3IuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJjb2xvcnMiLCJvcHRpb25zIiwibmFtZSIsIkFycmF5IiwiaXNBcnJheSIsIm9yaWdpbmFsIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwdXNoIiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImxlbmd0aCIsInRpbWUiLCJlbGFwc2VkIiwiaSIsIk1hdGgiLCJmbG9vciIsImNvbG9yIiwicmV2ZXJzZSIsInVuc2hpZnQiLCJzaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSw2QkFBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNkJDLE9BQTdCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLQyxJQUFMLEdBQVksaUJBQVo7QUFDQSxhQUFLSCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxZQUFJSSxNQUFNQyxPQUFOLENBQWNKLE1BQWQsQ0FBSixFQUNBO0FBQ0ksaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNILFNBSEQsTUFLQTtBQUNJLGlCQUFLQSxNQUFMLEdBQWMsQ0FBQ0EsTUFBRCxDQUFkO0FBQ0g7QUFDRCxhQUFLSyxRQUFMLEdBQWdCTixRQUFRTyxLQUFSLENBQWNDLGVBQTlCO0FBQ0FQLGVBQU9RLElBQVAsQ0FBWSxLQUFLSCxRQUFqQjtBQUNBLGFBQUtJLFFBQUwsR0FBZ0JSLFFBQVFTLFFBQVIsR0FBbUJWLE9BQU9XLE1BQTFDO0FBQ0EsYUFBS1YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS1csSUFBTCxHQUFZLENBQVo7QUFDSDs7QUFuQkw7QUFBQTtBQUFBLCtCQXFCV0MsT0FyQlgsRUFzQkk7QUFDSSxnQkFBTVosVUFBVSxLQUFLQSxPQUFyQjtBQUNBLGlCQUFLVyxJQUFMLElBQWFDLE9BQWI7QUFDQSxnQkFBTUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXLEtBQUtKLElBQUwsR0FBWSxLQUFLSCxRQUE1QixDQUFWO0FBQ0EsZ0JBQU1RLFFBQVEsS0FBS2pCLE1BQUwsQ0FBWWMsQ0FBWixDQUFkO0FBQ0EsZ0JBQUksS0FBS2YsT0FBTCxDQUFhTyxLQUFiLENBQW1CQyxlQUFuQixLQUF1Q1UsS0FBM0MsRUFDQTtBQUNJLHFCQUFLbEIsT0FBTCxDQUFhTyxLQUFiLENBQW1CQyxlQUFuQixHQUFxQyxLQUFLUCxNQUFMLENBQVljLENBQVosQ0FBckM7QUFDSDtBQUNELGdCQUFJLEtBQUtGLElBQUwsSUFBYVgsUUFBUVMsUUFBekIsRUFDQTtBQUNJLHVCQUFPLElBQVA7QUFDSDtBQUNKO0FBbkNMO0FBQUE7QUFBQSxpQ0FzQ0k7QUFDSSxpQkFBS0UsSUFBTCxHQUFZLENBQVo7QUFDSDtBQXhDTDtBQUFBO0FBQUEsa0NBMkNJO0FBQ0ksZ0JBQU1NLFVBQVUsRUFBaEI7QUFDQSxpQkFBSyxJQUFJRCxLQUFULElBQWtCLEtBQUtqQixNQUF2QixFQUNBO0FBQ0lrQix3QkFBUUMsT0FBUixDQUFnQixLQUFLbkIsTUFBTCxDQUFZaUIsS0FBWixDQUFoQjtBQUNIO0FBQ0RDLG9CQUFRVixJQUFSLENBQWFVLFFBQVFFLEtBQVIsRUFBYjtBQUNBLGlCQUFLcEIsTUFBTCxHQUFja0IsT0FBZDtBQUNIO0FBbkRMOztBQUFBO0FBQUEiLCJmaWxlIjoiYmFja2dyb3VuZENvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCYWNrZ3JvdW5kQ29sb3Jcclxue1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29sb3JzLCBvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdiYWNrZ3JvdW5kQ29sb3InXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbG9ycykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9yc1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IFtjb2xvcnNdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvclxyXG4gICAgICAgIGNvbG9ycy5wdXNoKHRoaXMub3JpZ2luYWwpXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG9wdGlvbnMuZHVyYXRpb24gLyBjb2xvcnMubGVuZ3RoXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcih0aGlzLnRpbWUgLyB0aGlzLmludGVydmFsKVxyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbaV1cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciAhPT0gY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5jb2xvcnNbaV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSA+PSBvcHRpb25zLmR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVwZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgY29sb3IgaW4gdGhpcy5jb2xvcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXZlcnNlLnVuc2hpZnQodGhpcy5jb2xvcnNbY29sb3JdKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXZlcnNlLnB1c2gocmV2ZXJzZS5zaGlmdCgpKVxyXG4gICAgICAgIHRoaXMuY29sb3JzID0gcmV2ZXJzZVxyXG4gICAgfVxyXG59Il19