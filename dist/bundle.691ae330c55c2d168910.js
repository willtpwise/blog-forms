/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/popup/popup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_scss__ = __webpack_require__("./src/components/popup/popup.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__popup_scss__);


class Popup {
  constructor(target) {
    this.el = false;
    this.target = target;
    this.open();
  }

  open() {
    this.marker = document.createElement('div');
    this.target.parentNode.insertBefore(this.marker, this.target);
    this.build();
    this.el.setAttribute('aria-live', 'assertive');
  }

  close() {
    this.marker.parentNode.insertBefore(this.target, this.marker);
    this.el.setAttribute('aria-live', 'off');
    setTimeout(() => {
      this.el.parentNode.removeChild(this.el);
    }, 1000);
  }

  build() {
    let popup = document.createElement('div');
    let underlay = document.createElement('div');
    let body = document.createElement('div');
    let close = document.createElement('a');

    popup.className = 'popup-form';
    underlay.className = 'popup-form-underlay';
    body.className = 'popup-form-body';
    close.className = 'popup-form-close';

    body.appendChild(this.target);
    body.appendChild(close);
    popup.appendChild(underlay);
    popup.appendChild(body);

    popup.setAttribute('aria-live', 'assertive');
    close.setAttribute('aria-label', 'Close');

    underlay.addEventListener('click', () => {
      this.close();
    });
    close.addEventListener('click', e => {
      e.preventDefault();
      this.close();
    });

    this.el = popup;

    document.body.appendChild(popup);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.blog-form');
  new Popup(form);
});

/***/ }),

/***/ "./src/components/popup/popup.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_popup_popup_js__ = __webpack_require__("./src/components/popup/popup.js");
/**
 * Webpack Entry Point
 *
 * Load JavaScript / SCSS / CSS files here
 */



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.map