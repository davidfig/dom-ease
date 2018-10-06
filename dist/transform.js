'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Transform(element, entry, to) {
        _classCallCheck(this, Transform);

        this.element = element;
        this.transforms = [];
        var transform = element.style.transform;
        var inside = void 0,
            name = '',
            values = void 0;
        for (var i = 0, _i = transform.length; i < _i; i++) {
            var letter = transform[i];
            if (inside) {
                if (letter === ')') {
                    inside = false;
                    this.transforms.push({ name: name, values: values });
                    name = '';
                } else {
                    values += letter;
                }
            } else {
                if (letter === '(') {
                    values = '';
                    inside = true;
                } else if (letter !== ' ') {
                    name += letter;
                }
            }
        }
        this.add(entry, to);
    }

    _createClass(Transform, [{
        key: 'add',
        value: function add(entry, to) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.transforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _transform = _step.value;

                    if (_transform.name === entry) {
                        _transform.start = parseFloat(_transform.values);
                        _transform.to = to;
                        _transform.delta = _transform.to - _transform.start;
                        return;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.transforms.push({ name: entry, start: 1, to: to, delta: to - 1 });
        }
    }, {
        key: 'update',
        value: function update(percent) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.transforms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _transform2 = _step2.value;

                    _transform2.values = _transform2.start + _transform2.delta * percent;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var s = '';
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.transforms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _transform3 = _step3.value;

                    s += _transform3.name + '(' + _transform3.values + ') ';
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.element.style.transform = s;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.transforms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _transform4 = _step4.value;

                    var swap = _transform4.to;
                    _transform4.to = _transform4.start;
                    _transform4.start = swap;
                    _transform4.delta = -_transform4.delta;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }]);

    return Transform;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImVsZW1lbnQiLCJlbnRyeSIsInRvIiwidHJhbnNmb3JtcyIsInRyYW5zZm9ybSIsInN0eWxlIiwiaW5zaWRlIiwibmFtZSIsInZhbHVlcyIsImkiLCJfaSIsImxlbmd0aCIsImxldHRlciIsInB1c2giLCJhZGQiLCJzdGFydCIsInBhcnNlRmxvYXQiLCJkZWx0YSIsInBlcmNlbnQiLCJzIiwic3dhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUFBLE9BQU9DLE9BQVA7QUFFSSx1QkFBWUMsT0FBWixFQUFxQkMsS0FBckIsRUFBNEJDLEVBQTVCLEVBQ0E7QUFBQTs7QUFDSSxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsWUFBTUMsWUFBWUosUUFBUUssS0FBUixDQUFjRCxTQUFoQztBQUNBLFlBQUlFLGVBQUo7QUFBQSxZQUFZQyxPQUFPLEVBQW5CO0FBQUEsWUFBdUJDLGVBQXZCO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsS0FBS04sVUFBVU8sTUFBL0IsRUFBdUNGLElBQUlDLEVBQTNDLEVBQStDRCxHQUEvQyxFQUNBO0FBQ0ksZ0JBQU1HLFNBQVNSLFVBQVVLLENBQVYsQ0FBZjtBQUNBLGdCQUFJSCxNQUFKLEVBQ0E7QUFDSSxvQkFBSU0sV0FBVyxHQUFmLEVBQ0E7QUFDSU4sNkJBQVMsS0FBVDtBQUNBLHlCQUFLSCxVQUFMLENBQWdCVSxJQUFoQixDQUFxQixFQUFFTixVQUFGLEVBQVFDLGNBQVIsRUFBckI7QUFDQUQsMkJBQU8sRUFBUDtBQUNILGlCQUxELE1BT0E7QUFDSUMsOEJBQVVJLE1BQVY7QUFDSDtBQUNKLGFBWkQsTUFjQTtBQUNJLG9CQUFJQSxXQUFXLEdBQWYsRUFDQTtBQUNJSiw2QkFBUyxFQUFUO0FBQ0FGLDZCQUFTLElBQVQ7QUFDSCxpQkFKRCxNQUtLLElBQUlNLFdBQVcsR0FBZixFQUNMO0FBQ0lMLDRCQUFRSyxNQUFSO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsYUFBS0UsR0FBTCxDQUFTYixLQUFULEVBQWdCQyxFQUFoQjtBQUNIOztBQXRDTDtBQUFBO0FBQUEsNEJBd0NRRCxLQXhDUixFQXdDZUMsRUF4Q2YsRUF5Q0k7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDSSxxQ0FBc0IsS0FBS0MsVUFBM0IsOEhBQ0E7QUFBQSx3QkFEU0MsVUFDVDs7QUFDSSx3QkFBSUEsV0FBVUcsSUFBVixLQUFtQk4sS0FBdkIsRUFDQTtBQUNJRyxtQ0FBVVcsS0FBVixHQUFrQkMsV0FBV1osV0FBVUksTUFBckIsQ0FBbEI7QUFDQUosbUNBQVVGLEVBQVYsR0FBZUEsRUFBZjtBQUNBRSxtQ0FBVWEsS0FBVixHQUFrQmIsV0FBVUYsRUFBVixHQUFlRSxXQUFVVyxLQUEzQztBQUNBO0FBQ0g7QUFDSjtBQVZMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV0ksaUJBQUtaLFVBQUwsQ0FBZ0JVLElBQWhCLENBQXFCLEVBQUVOLE1BQU1OLEtBQVIsRUFBZWMsT0FBTyxDQUF0QixFQUF5QmIsTUFBekIsRUFBNkJlLE9BQU9mLEtBQUssQ0FBekMsRUFBckI7QUFDSDtBQXJETDtBQUFBO0FBQUEsK0JBdURXZ0IsT0F2RFgsRUF3REk7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDSSxzQ0FBc0IsS0FBS2YsVUFBM0IsbUlBQ0E7QUFBQSx3QkFEU0MsV0FDVDs7QUFDSUEsZ0NBQVVJLE1BQVYsR0FBbUJKLFlBQVVXLEtBQVYsR0FBa0JYLFlBQVVhLEtBQVYsR0FBa0JDLE9BQXZEO0FBQ0g7QUFKTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtJLGdCQUFJQyxJQUFJLEVBQVI7QUFMSjtBQUFBO0FBQUE7O0FBQUE7QUFNSSxzQ0FBc0IsS0FBS2hCLFVBQTNCLG1JQUNBO0FBQUEsd0JBRFNDLFdBQ1Q7O0FBQ0llLHlCQUFLZixZQUFVRyxJQUFWLEdBQWlCLEdBQWpCLEdBQXVCSCxZQUFVSSxNQUFqQyxHQUEwQyxJQUEvQztBQUNIO0FBVEw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVSSxpQkFBS1IsT0FBTCxDQUFhSyxLQUFiLENBQW1CRCxTQUFuQixHQUErQmUsQ0FBL0I7QUFDSDtBQW5FTDtBQUFBO0FBQUEsa0NBc0VJO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ0ksc0NBQXNCLEtBQUtoQixVQUEzQixtSUFDQTtBQUFBLHdCQURTQyxXQUNUOztBQUNJLHdCQUFNZ0IsT0FBT2hCLFlBQVVGLEVBQXZCO0FBQ0FFLGdDQUFVRixFQUFWLEdBQWVFLFlBQVVXLEtBQXpCO0FBQ0FYLGdDQUFVVyxLQUFWLEdBQWtCSyxJQUFsQjtBQUNBaEIsZ0NBQVVhLEtBQVYsR0FBa0IsQ0FBQ2IsWUFBVWEsS0FBN0I7QUFDSDtBQVBMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQztBQTlFTDs7QUFBQTtBQUFBIiwiZmlsZSI6InRyYW5zZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVHJhbnNmb3JtXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGVudHJ5LCB0bylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1zID0gW11cclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybVxyXG4gICAgICAgIGxldCBpbnNpZGUsIG5hbWUgPSAnJywgdmFsdWVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdHJhbnNmb3JtLmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSB0cmFuc2Zvcm1baV1cclxuICAgICAgICAgICAgaWYgKGluc2lkZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlciA9PT0gJyknKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1zLnB1c2goeyBuYW1lLCB2YWx1ZXMgfSlcclxuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgKz0gbGV0dGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV0dGVyID09PSAnKCcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gJydcclxuICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXIgIT09ICcgJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lICs9IGxldHRlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkKGVudHJ5LCB0bylcclxuICAgIH1cclxuXHJcbiAgICBhZGQoZW50cnksIHRvKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IHRyYW5zZm9ybSBvZiB0aGlzLnRyYW5zZm9ybXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLm5hbWUgPT09IGVudHJ5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc3RhcnQgPSBwYXJzZUZsb2F0KHRyYW5zZm9ybS52YWx1ZXMpXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0udG8gPSB0b1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLmRlbHRhID0gdHJhbnNmb3JtLnRvIC0gdHJhbnNmb3JtLnN0YXJ0XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybXMucHVzaCh7IG5hbWU6IGVudHJ5LCBzdGFydDogMSwgdG8sIGRlbHRhOiB0byAtIDEgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUocGVyY2VudClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFuc2Zvcm0gb2YgdGhpcy50cmFuc2Zvcm1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnZhbHVlcyA9IHRyYW5zZm9ybS5zdGFydCArIHRyYW5zZm9ybS5kZWx0YSAqIHBlcmNlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHMgPSAnJ1xyXG4gICAgICAgIGZvciAobGV0IHRyYW5zZm9ybSBvZiB0aGlzLnRyYW5zZm9ybXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzICs9IHRyYW5zZm9ybS5uYW1lICsgJygnICsgdHJhbnNmb3JtLnZhbHVlcyArICcpICdcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHNcclxuICAgIH1cclxuXHJcbiAgICByZXZlcnNlKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCB0cmFuc2Zvcm0gb2YgdGhpcy50cmFuc2Zvcm1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3Qgc3dhcCA9IHRyYW5zZm9ybS50b1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm0udG8gPSB0cmFuc2Zvcm0uc3RhcnRcclxuICAgICAgICAgICAgdHJhbnNmb3JtLnN0YXJ0ID0gc3dhcFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0uZGVsdGEgPSAtdHJhbnNmb3JtLmRlbHRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19