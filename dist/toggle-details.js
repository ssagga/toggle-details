'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * toggle-details.js v0.3.1 (https://github.com/ssagga/toggle-details)
 * @copyright 2018 Samer Al-Saqqa
 * @license MIT (https://github.com/ssagga/toggle-details/blob/master/LICENSE)
 */

var toggleDetails = function () {
    function toggleDetails() {
        _classCallCheck(this, toggleDetails);

        //console.log("Object created")   //DEBUG
        this._contentClassName;
        this._detailsClassName;
        this._parentNodes;
        this._toggleClass = 'toggle-details-hidden';
        this._toggleButtonClass = 'toggle-details-button';
        this._responsiveBreakpoint = 768;
        this._toggleButton = {
            show: 'expand',
            hide: 'hide details'
        };
    }

    _createClass(toggleDetails, [{
        key: 'initialize',
        value: function initialize(contentClass, detailsClass, breakpoint, toggleButton) {
            var _this = this;

            //Check that class names are supplimented
            if (!contentClass || !detailsClass || !breakpoint) {
                throw new Error("Required missing parameters: Content class names");
            }
            this._contentClassName = contentClass;
            this._detailsClassName = detailsClass;
            this._responsiveBreakpoint = breakpoint;
            this._toggleButton = toggleButton;
            //console.log(this._contentClassName, this._detailsClassName)    //DEBUG

            //Find DOM nodes with supplied class names
            this._parentNodes = Array.from(document.querySelectorAll('.' + this._contentClassName));
            this._parentNodes.forEach(function (node) {
                var _details = node.querySelector('.' + _this._detailsClassName);
                //Skip current iteration if no child details element is present in the parent container
                if (!_details) {
                    return;
                }
                var _toggleButton = document.createElement('a');
                _toggleButton.href = '';
                _toggleButton.innerHTML = _this._toggleButton.show;
                _toggleButton.classList.add(_this._toggleButtonClass);
                _details.parentNode.insertBefore(_toggleButton, _details.nextSibling);

                _toggleButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    var _details = e.target.parentNode.querySelector('.' + _this._detailsClassName);
                    if (_details.classList.contains(_this._toggleClass)) {
                        _details.classList.remove(_this._toggleClass);
                        _toggleButton.innerHTML = _this._toggleButton.hide;
                    } else {
                        _details.classList.add(_this._toggleClass);
                        _toggleButton.innerHTML = _this._toggleButton.show;
                    }
                    //console.log(_details)   //DEBUG
                });
            });

            //Add media query listeners to detect screen size
            var _media = window.matchMedia('(max-width: ' + this._responsiveBreakpoint + 'px)');
            _media.addListener(function () {
                _this.responsiveCheck(_media);
            });
            this.responsiveCheck(_media);

            //Add toggle style rules to the DOM
            var css = '.' + this._toggleClass + ' {display: none;}',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        }
    }, {
        key: 'responsiveCheck',
        value: function responsiveCheck(media) {
            if (media.matches) {
                this.toggleMobileMode();
            } else {
                this.toggleDesktopMode();
            }
        }
    }, {
        key: 'toggleMobileMode',
        value: function toggleMobileMode() {
            var _this2 = this;

            this._parentNodes.forEach(function (node) {
                var _details = node.querySelector('.' + _this2._detailsClassName);
                //Skip current iteration if no child details element is present in the parent container
                if (!_details) {
                    return;
                }
                var _button = node.querySelector('.' + _this2._toggleButtonClass);
                _details.classList.add(_this2._toggleClass);
                _button.style.display = 'block';
            });
        }
    }, {
        key: 'toggleDesktopMode',
        value: function toggleDesktopMode() {
            var _this3 = this;

            this._parentNodes.forEach(function (node) {
                var _details = node.querySelector('.' + _this3._detailsClassName);
                //Skip current iteration if no child details element is present in the parent container
                if (!_details) {
                    return;
                }
                var _button = node.querySelector('.' + _this3._toggleButtonClass);
                _details.classList.remove(_this3._toggleClass);
                _button.style.display = 'none';
            });
        }
    }]);

    return toggleDetails;
}();

/* Array.from Polyfill */

// Production steps of ECMA-262, Edition 6, 22.1.2.1


if (!Array.from) {
    Array.from = function () {
        var toStr = Object.prototype.toString;
        var isCallable = function isCallable(fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function toInteger(value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function toLength(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method 
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }();
}