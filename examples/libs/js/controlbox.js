/*!
 * name:react-view
 * description:a collection of components for React
 * version:0.0.1 mocheer
 * license:MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ControlBox = __webpack_require__(15);

	var _ControlBox2 = _interopRequireDefault(_ControlBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var leaf = {
	    init: function init(node) {
	        leaf.node = node;
	    },
	    addTo: function addTo(mapbox) {
	        _reactDom2["default"].render(_react2["default"].createElement(_ControlBox2["default"], { mapbox: mapbox }), leaf.node);
	    }
	};
	//

	if (window.T && T.define) {
	    T.define(leaf);
	} else if (window.define) {
	    window.define(leaf);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ZoomIn = __webpack_require__(16);

	var _ZoomIn2 = _interopRequireDefault(_ZoomIn);

	var _ZoomOut = __webpack_require__(17);

	var _ZoomOut2 = _interopRequireDefault(_ZoomOut);

	var _FullScreen = __webpack_require__(18);

	var _FullScreen2 = _interopRequireDefault(_FullScreen);

	var _ModuleExpand = __webpack_require__(19);

	var _ModuleExpand2 = _interopRequireDefault(_ModuleExpand);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 */

	var ControlBox = function (_Component) {
	    _inherits(ControlBox, _Component);

	    function ControlBox(props) {
	        _classCallCheck(this, ControlBox);

	        return _possibleConstructorReturn(this, _Component.call(this, props));
	    }

	    ControlBox.prototype.render = function render() {
	        var props = this.props;
	        var mapbox = props.mapbox;
	        var showZoom = props.showZoom;
	        var showFullScreen = props.showFullScreen;
	        var showModuleExpand = props.showModuleExpand;
	        var controls = [];
	        showZoom && controls.push(_react2["default"].createElement(_ZoomIn2["default"], { mapbox: mapbox }), _react2["default"].createElement(_ZoomOut2["default"], { mapbox: mapbox }));
	        showFullScreen && controls.push(_react2["default"].createElement(_FullScreen2["default"], null));
	        showModuleExpand && controls.push(_react2["default"].createElement(_ModuleExpand2["default"], null));
	        return _react2["default"].createElement(
	            'div',
	            { className: 'ControlBox' },
	            controls
	        );
	    };

	    return ControlBox;
	}(_react.Component);

	//设置默认属性


	exports["default"] = ControlBox;
	ControlBox.defaultProps = {
	    showZoom: true,
	    showFullScreen: true,
	    showModuleExpand: true
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 */

	var ZoomIn = function (_Component) {
	    _inherits(ZoomIn, _Component);

	    function ZoomIn(props) {
	        _classCallCheck(this, ZoomIn);

	        return _possibleConstructorReturn(this, _Component.call(this, props));
	    }

	    ZoomIn.prototype.onClick = function onClick() {
	        var mapbox = this.props.mapbox;

	        mapbox.zoomBy(1);
	    };

	    ZoomIn.prototype.render = function render() {
	        var onClick = this.onClick;

	        return _react2["default"].createElement("i", { className: "fa fa-plus", onClick: onClick.bind(this) });
	    };

	    return ZoomIn;
	}(_react.Component);

	exports["default"] = ZoomIn;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 */

	var ZoomOut = function (_Component) {
	    _inherits(ZoomOut, _Component);

	    function ZoomOut(props) {
	        _classCallCheck(this, ZoomOut);

	        return _possibleConstructorReturn(this, _Component.call(this, props));
	    }

	    ZoomOut.prototype.onClick = function onClick() {
	        var mapbox = this.props.mapbox;

	        mapbox.zoomBy(-1);
	    };

	    ZoomOut.prototype.render = function render() {
	        var onClick = this.onClick;

	        return _react2["default"].createElement("i", { className: "fa fa-minus", onClick: onClick.bind(this) });
	    };

	    return ZoomOut;
	}(_react.Component);

	exports["default"] = ZoomOut;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 */

	var Panel = function (_Component) {
	    _inherits(Panel, _Component);

	    function Panel(props) {
	        _classCallCheck(this, Panel);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            isFullscreen: false
	        };
	        // var container = document.getElementById('trunk');
	        // container.addEventListener('mozfullscreenchange', () => {
	        //     console.log('mozfullscreenchange')
	        //     this.setState({
	        //         isFullscreen: isFullscreen
	        //     })
	        // });
	        // container.addEventListener('webkitfullscreenchange',  () => {
	        //     console.log('webkitfullscreenchange')
	        //     this.setState({
	        //         isFullscreen: isFullscreen
	        //     })
	        // });
	        // container.addEventListener('fullscreenchange',  () => {
	        //       console.log('fullscreenchange')
	        //     this.setState({
	        //         isFullscreen: isFullscreen
	        //     })
	        // });

	        return _this;
	    }

	    Panel.prototype.onClick = function onClick() {
	        var isFullscreen = this.state.isFullscreen;
	        // let isFullscreen =  window.document.body.clientHeight == window.screen.height

	        if (isFullscreen) {
	            if (document.exitFullscreen) {
	                document.exitFullscreen();
	            } else if (document.mozCancelFullScreen) {
	                document.mozCancelFullScreen();
	            } else if (document.webkitCancelFullScreen) {
	                document.webkitCancelFullScreen();
	            } else if (document.msExitFullscreen) {
	                document.msExitFullscreen();
	            }
	        } else {
	            var container = document.getElementById('trunk');
	            if (container.requestFullscreen) {
	                container.requestFullscreen();
	            } else if (container.mozRequestFullScreen) {
	                container.mozRequestFullScreen();
	            } else if (container.webkitRequestFullscreen) {
	                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	            } else if (container.msRequestFullscreen) {
	                container.msRequestFullscreen();
	            }
	        }
	        this.setState({
	            isFullscreen: !isFullscreen
	        });
	    };

	    Panel.prototype.render = function render() {
	        var state = this.state;
	        var onClick = this.onClick;
	        var isFullscreen = state.isFullscreen;
	        var className = (0, _classnames2["default"])('fa', isFullscreen ? 'fa-compress' : 'fa-expand');
	        return _react2["default"].createElement('i', { className: className, onClick: onClick.bind(this) });
	    };

	    return Panel;
	}(_react.Component);

	exports["default"] = Panel;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 */

	var ZoomIn = function (_Component) {
	    _inherits(ZoomIn, _Component);

	    function ZoomIn(props) {
	        _classCallCheck(this, ZoomIn);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            expaned: props.expaned
	        };
	        return _this;
	    }

	    ZoomIn.prototype.onClick = function onClick() {
	        var state = this.state;
	        var epxanded = state.epxanded;
	        var to = !epxanded;
	        this.setState({
	            epxanded: to
	        });
	        window.T && T.emit('moduleexpand', to);
	    };

	    ZoomIn.prototype.render = function render() {
	        var state = this.state;
	        var onClick = this.onClick;
	        var epxanded = state.epxanded;
	        var cls = 'fa  fa-border ' + (epxanded ? 'fa-chevron-left' : 'fa-chevron-right');
	        return _react2["default"].createElement('i', { className: cls, onClick: onClick.bind(this) });
	    };

	    return ZoomIn;
	}(_react.Component);

	exports["default"] = ZoomIn;

/***/ }
/******/ ]);