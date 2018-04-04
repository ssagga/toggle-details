"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * toggle-details.js v0.1.0 (https://github.com/ssagga/toggle-details)
 * @copyright 2018 Samer Al-Saqqa
 * @license MIT (https://github.com/ssagga/toggle-details/blob/master/LICENSE)
 */

//console.time(toggleDetails)


var toggleDetails = function () {
    function toggleDetails() {
        _classCallCheck(this, toggleDetails);

        console.log("Object created"); //DEBUG
        this._contentClassName;
        this._detailsClassName;
        this._parentNodes;
        this._toggleClass = 'toggle-details-hidden';
    }

    _createClass(toggleDetails, [{
        key: "initialize",
        value: function initialize(contentClass, detailsClass) {
            var _this = this;

            //Check that class names are supplimented
            if (!contentClass || !detailsClass) {
                throw "Required missing parameters: Content class names";
            }
            this._contentClassName = contentClass;
            this._detailsClassName = detailsClass;
            console.log(this._contentClassName, this._detailsClassName); //DEBUG

            //Find DOM nodes with supplied class names
            this._parentNodes = document.querySelectorAll('.' + 'post-body');
            this._parentNodes.forEach(function (node) {
                var _details = node.querySelector('.' + _this._detailsClassName);
                var _toggleButton = document.createElement('a');
                _toggleButton.href = '';
                _toggleButton.innerHTML = 'Toggle';
                _details.parentNode.insertBefore(_toggleButton, _details.nextSibling);

                _toggleButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    var _details = e.target.parentNode.querySelector('.' + _this._detailsClassName);
                    if (_details.classList.contains(_this._toggleClass)) {
                        _details.classList.remove(_this._toggleClass);
                    } else {
                        _details.classList.add(_this._toggleClass);
                    }
                    console.log(_details); //DEBUG
                });
            });

            //Add toggle style rules to the DOM
            var css = "." + this._toggleClass + " { display: none; }",
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
    }]);

    return toggleDetails;
}();