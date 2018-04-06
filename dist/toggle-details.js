'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * toggle-details.js v0.1.0 (https://github.com/ssagga/toggle-details)
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
    }

    _createClass(toggleDetails, [{
        key: 'initialize',
        value: function initialize(contentClass, detailsClass, breakpoint) {
            var _this = this;

            //Check that class names are supplimented
            if (!contentClass || !detailsClass || !breakpoint) {
                throw new Error("Required missing parameters: Content class names");
            }
            this._contentClassName = contentClass;
            this._detailsClassName = detailsClass;
            this._responsiveBreakpoint = breakpoint;
            //console.log(this._contentClassName, this._detailsClassName)    //DEBUG

            //Find DOM nodes with supplied class names
            this._parentNodes = document.querySelectorAll('.' + this._contentClassName);
            this._parentNodes.forEach(function (node) {
                var _details = node.querySelector('.' + _this._detailsClassName);
                var _toggleButton = document.createElement('a');
                _toggleButton.href = '';
                _toggleButton.innerHTML = 'Toggle';
                _toggleButton.classList.add(_this._toggleButtonClass);
                _details.parentNode.insertBefore(_toggleButton, _details.nextSibling);

                _toggleButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    var _details = e.target.parentNode.querySelector('.' + _this._detailsClassName);
                    if (_details.classList.contains(_this._toggleClass)) {
                        _details.classList.remove(_this._toggleClass);
                    } else {
                        _details.classList.add(_this._toggleClass);
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
                var _button = node.querySelector('.' + _this3._toggleButtonClass);
                _details.classList.remove(_this3._toggleClass);
                _button.style.display = 'none';
            });
        }
    }]);

    return toggleDetails;
}();