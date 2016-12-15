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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _LegendBox = __webpack_require__(20);

	var _LegendBox2 = _interopRequireDefault(_LegendBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var leaf = {
	    init: function init(node) {
	        leaf.node = node;
	    },
	    addTo: function addTo(mapbox) {
	        _reactDom2["default"].render(_react2["default"].createElement(_LegendBox2["default"], { mapbox: mapbox }), leaf.node);
	    }
	};
	//

	if (window.T && T.define) {
	    T.define(leaf);
	} else if (window.define) {
	    window.define(leaf);
	}

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = React;

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },

/***/ 14:
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Panel = __webpack_require__(21);

	var _Panel2 = _interopRequireDefault(_Panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 图例
	 */

	var LegendBox = function (_Component) {
	    _inherits(LegendBox, _Component);

	    function LegendBox(props) {
	        _classCallCheck(this, LegendBox);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        if (window.T) {
	            T.on('addLegend', _this.add);
	            T.on('removeLegend', _this.remove);
	        }
	        _this.state = {
	            dataProvider: props.dataProvider || [{
	                title: '台风图例', children: [{ label: '热带低压', color: '#00FF03' }, { label: '热带风暴', color: '#0062FE' }, { label: '强热带风暴', color: '#FAE100' }, { label: '台风', color: '#FDAC03' }, { label: '强台风', color: '#FD72F6' }, { label: '超强台风', color: '#FD0002' }]
	            }, {
	                title: '预报机构', children: [{ label: '中国', color: '#FF4050', type: 'dash' }, { label: '韩国', color: '#000', type: 'dash' }, { label: '美国', color: '#4099EE', type: 'dash' }, { label: '中国台湾', color: '#FFA040', type: 'dash' }, { label: '日本', color: '#43FF4B', type: 'dash' }, { label: '中国香港', color: '#FF40F5', type: 'dash' }]
	            }]
	        };
	        return _this;
	    }
	    /**
	     * @param data {title,body}
	     */


	    LegendBox.prototype.add = function add(data) {
	        var state = this.state;
	        var dataProvider = state.dataProvider;

	        if (!dataProvider) {
	            dataProvider = [];
	        }
	        dataProvider.push(data);
	        this.setState({
	            dataProvider: dataProvider
	        });
	    };
	    /**
	     * @param data id || {}
	     */


	    LegendBox.prototype.remove = function remove(data) {
	        var state = this.state;
	        var dataProvider = state.dataProvider;

	        if (dataProvider) {
	            var index = dataProvider.indexOf(data);
	            if (index != -1) {
	                dataProvider.splice(index, 1);
	            }
	        }
	    };
	    /**
	     * 
	     */


	    LegendBox.prototype.removeAll = function removeAll() {
	        this.setState({
	            dataProvider: null
	        });
	    };
	    /**
	     * @param data {title,body}
	     */


	    LegendBox.prototype.createLegend = function createLegend(data) {
	        var title = data.title;
	        var body = data.body;
	        var children = data.children;
	        var footer = data.footer;
	        var column = data.column || 2;
	        var w = data.width || 180;
	        var iw = w / column;
	        var newChildren = void 0;
	        if (children) {
	            newChildren = [];
	            var lineItem = void 0;
	            for (var i = 0, l = children.length, item; i < l; i++) {
	                item = children[i];
	                switch (item.type) {
	                    case 'dash':
	                        item = this.createDash(item, iw);
	                        break;
	                    default:
	                        //circle
	                        item = this.createCircle(item, iw);
	                        break;
	                }
	                if (i % 2 === 0) {
	                    lineItem = [];
	                    newChildren.push(_react2["default"].createElement(
	                        'div',
	                        { style: { margin: 3, width: w } },
	                        lineItem
	                    ));
	                }
	                lineItem.push(item);
	            }
	        }
	        return _react2["default"].createElement(
	            _Panel2["default"],
	            { title: title, body: body, footer: footer },
	            newChildren
	        );
	    };
	    /**
	     * 
	     */


	    LegendBox.prototype.createCircle = function createCircle(data, w) {
	        var style = {
	            display: 'inline-block',
	            marginLeft: 5,
	            marginRight: 5,
	            width: 10,
	            height: 10,
	            background: data.color,
	            "-moz-border-radius": 5,
	            "-webkit-border-radius": 5,
	            "border-radius": 5
	        };
	        return _react2["default"].createElement(
	            'div',
	            { style: { display: 'inline-block', width: w } },
	            _react2["default"].createElement('div', { style: style }),
	            _react2["default"].createElement(
	                'span',
	                null,
	                data.label
	            )
	        );
	    };
	    /**
	     * 
	     */


	    LegendBox.prototype.createDash = function createDash(data, w) {
	        var style = {
	            display: 'inline-block',
	            marginLeft: 5,
	            marginRight: 5,
	            width: 18,
	            height: 6,
	            borderTop: '2px dashed ' + data.color
	        };
	        return _react2["default"].createElement(
	            'div',
	            { style: { display: 'inline-block', width: w } },
	            _react2["default"].createElement('div', { style: style }),
	            _react2["default"].createElement(
	                'span',
	                null,
	                data.label
	            )
	        );
	    };
	    /**
	     * 
	     */


	    LegendBox.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var createLegend = this.createLegend;
	        var dataProvider = state.dataProvider;

	        if (!dataProvider) {
	            return null;
	        }
	        createLegend = createLegend.bind(this);
	        var content = [];
	        for (var i = 0, l = dataProvider.length, item; i < l; i++) {
	            item = dataProvider[i];
	            content.push(createLegend(item));
	        }
	        return _react2["default"].createElement(
	            'div',
	            { className: 'LegendBox' },
	            content
	        );
	    };

	    return LegendBox;
	}(_react.Component);

	exports["default"] = LegendBox;

/***/ },

/***/ 21:
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
	 * props{title,content,footer}
	 */

	var Panel = function (_Component) {
	    _inherits(Panel, _Component);

	    function Panel(props) {
	        _classCallCheck(this, Panel);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            collopse: false
	        };
	        return _this;
	    }

	    Panel.prototype.onTitleClick = function onTitleClick() {
	        var state = this.state;
	        var collopse = state.collopse;

	        this.setState({
	            collopse: !collopse
	        });
	    };

	    Panel.prototype.createTitle = function createTitle(title) {
	        var onTitleClick = this.onTitleClick;

	        return _react2["default"].createElement(
	            'div',
	            { className: 'panel-heading', onClick: onTitleClick.bind(this) },
	            title
	        );
	    };

	    Panel.prototype.createBody = function createBody(body) {
	        return _react2["default"].createElement(
	            'div',
	            { className: 'panel-body' },
	            body
	        );
	    };

	    Panel.prototype.createFooter = function createFooter(body) {
	        return _react2["default"].createElement(
	            'div',
	            { className: 'panel-footer' },
	            footer
	        );
	    };

	    Panel.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var title = props.title;
	        var body = props.body;
	        var footer = props.footer;
	        var children = props.children;
	        var className = props.className;
	        var collopse = state.collopse;
	        var content = [];
	        var panelClass = (0, _classnames2["default"])('panel Panel', className || 'panel-primary'); //panel-default
	        title && content.push(this.createTitle(title));
	        if (!collopse) {
	            body && content.push(this.createBody(body));
	            children && content.push(children);
	            footer && content.push(this.createFooter(footer));
	        }
	        return _react2["default"].createElement(
	            'div',
	            { className: panelClass },
	            content
	        );
	    };

	    return Panel;
	}(_react.Component);

	exports["default"] = Panel;

/***/ }

/******/ });