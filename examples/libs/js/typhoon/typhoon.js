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

	var _TimeSlider = __webpack_require__(22);

	var _TimeSlider2 = _interopRequireDefault(_TimeSlider);

	var _NavTab = __webpack_require__(24);

	var _NavTab2 = _interopRequireDefault(_NavTab);

	var _AdvancedDataTable = __webpack_require__(25);

	var _AdvancedDataTable2 = _interopRequireDefault(_AdvancedDataTable);

	var _ReactActions = __webpack_require__(26);

	var _ReactStores = __webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//

	//


	/**
	 * 
	 */
	var leaf = {
	    // config:null,
	    // suspended: false,
	    // map: null,
	    // commonLayer: null,
	    // typhoonLayer: null,
	    // cityies: null,
	    // selItems:null,
	    tfbh: ""
	};

	var Typhoon = function (_Component) {
	    _inherits(Typhoon, _Component);

	    function Typhoon(props) {
	        _classCallCheck(this, Typhoon);

	        return _possibleConstructorReturn(this, _Component.call(this, props));
	    }

	    Typhoon.prototype.componentDidMount = function componentDidMount() {
	        this.handleSubmit();
	    };

	    Typhoon.prototype.handleSubmit = function handleSubmit(event, params) {
	        var _this2 = this;

	        var _refs = this.refs;
	        var tflist = _refs.tflist;
	        var cscj = _refs.cscj;
	        var dataHandler = leaf.config.dataHandler;

	        $.getJSON(dataHandler.typhoon, null, function (result) {
	            result = result.data;
	            result[0].checked = result[0].change = true;
	            _this2.onTyphoonItemCheck(result[0], null, [result[0]]);
	            tflist.setState({ dataProvider: result });
	        });
	        $.getJSON(dataHandler.city, null, function (result) {
	            result = leaf.cityies = result.data;
	            var addPoints = function addPoints(Layer) {
	                var layer = leaf.commonLayer = new Layer();
	                if (leaf.suspended) {
	                    layer.suspend();
	                }
	                result.forEach(function (item) {
	                    item.geometry = [item.mapx, item.mapy];
	                    item.label = { name: item.featurename, minZoom: 15 };
	                }, _this2);
	                layer.addTo(leaf.map);
	                layer.addPoints(result);
	            };
	            if (_this2.updateCityies() === false) {
	                cscj.setState({ dataProvider: result }); //result.typhoon_config.typhoon_city
	            }
	            window.require(['arcgis/layer/CommonLayer'], addPoints);
	        });
	    };

	    Typhoon.prototype.updateCityies = function updateCityies() {
	        var cscj = this.refs.cscj;
	        var cityies = leaf.cityies;
	        var tfbh = leaf.tfbh;
	        var typhoonLayer = leaf.typhoonLayer;

	        if (cityies && typhoonLayer) {
	            if (tfbh !== "") {
	                var typhoon = typhoonLayer.getTyphoon(tfbh);
	                if (typhoon) {
	                    var data = typhoon.data,
	                        points = data.points || [],
	                        geometry,
	                        cgeo;
	                    if (points.length > 0) {
	                        var item = points[points.length - 1];
	                        geometry = [item.lng, item.lat];
	                    }
	                    cityies.forEach(function (item) {
	                        cgeo = [item.mapx, item.mapy];
	                        var distance = leaf.map.measure(geometry, cgeo) * 0.001,
	                            label = item.label || (item.label = {});
	                        item.distance = distance.toFixed(0);
	                        label.name = data.name + '距' + item.featurename + item.distance + '公里';
	                    }, this);
	                    cscj.setState({ dataProvider: cityies });
	                    return true;
	                }
	            } else {
	                cityies.forEach(function (item) {
	                    item.distance = '';
	                    item.label.name = item.featurename;
	                }, this);
	                cscj.setState({ dataProvider: cityies });
	            }
	        }
	        return false;
	    };

	    Typhoon.prototype.onTyphoonItemCheck = function onTyphoonItemCheck(data, column, selItems) {
	        var _this3 = this;

	        var _refs2 = this.refs;
	        var ljtab = _refs2.ljtab;
	        var ljxx = _refs2.ljxx;
	        var tf = selItems[selItems.length - 1] || null;var typhoonLayer = leaf.typhoonLayer;
	        //当前要显示的台风
	        var config = leaf.config;
	        var dataHandler = config.dataHandler;

	        leaf.selItems = selItems;
	        if (tf) {
	            var tfbh = leaf.tfbh = tf.tfbh;
	            if (tf.lslj) {
	                //已缓存
	                ljxx.setState({ dataProvider: tf.lslj.data[0].points, selIndex: -1 });
	                ljtab.setState({ label: tf.tfbh + tf.name + '路径信息' });
	                this.updateCityies();
	            } else {
	                $.getJSON(dataHandler.lslj + '&tfbh=' + tfbh, null, function (result) {
	                    tf.lslj = result; //缓存
	                    if (leaf.selItems && leaf.selItems.indexOf(tf) === -1) {
	                        return;
	                    }
	                    result = result.data;
	                    var points = result[0].points;
	                    if (points) {
	                        points.forEach(function (item) {
	                            item.time = item.time.replace('T', ' ');
	                        }, _this3);
	                    }
	                    ljxx.setState({ dataProvider: points, selIndex: -1 });
	                    ljtab.setState({ label: tf.tfbh + tf.name + '路径信息' });
	                    if (!typhoonLayer) {
	                        var addTyphoons = function addTyphoons(TyphoonLayer) {

	                            typhoonLayer = leaf.typhoonLayer = new TyphoonLayer(leaf.config);
	                            if (leaf.suspended) {
	                                typhoonLayer.suspend();
	                            }
	                            typhoonLayer.addTo(leaf.map);
	                            typhoonLayer.addTyphoons(result);
	                            _this3.updateCityies();
	                        };
	                        window.require(['arcgis/layer/TyphoonLayer'], addTyphoons);
	                    } else {
	                        typhoonLayer.addTyphoons(result);
	                        _this3.updateCityies();
	                    }
	                });
	            }
	        } else {
	            leaf.tfbh = "";
	            ljxx.setState({ dataProvider: [] });
	            ljtab.setState({ label: null });
	            this.updateCityies();
	        }
	        if (!data.checked) {
	            typhoonLayer.removeTyphoons([data.tfbh]);
	        }
	    };

	    Typhoon.prototype.onTyphoonClick = function onTyphoonClick(info) {
	        if (!info.columnid || info.columnid === 0) {
	            return;
	        }
	        var data = info.data;
	        var _refs3 = this.refs;
	        var ljtab = _refs3.ljtab;
	        var ljxx = _refs3.ljxx;

	        if (data.checked && data.lslj) {
	            leaf.tfbh = data.tfbh;
	            ljxx.setState({ dataProvider: data.lslj.data[0].points, selIndex: -1 });
	            ljtab.setState({ label: data.tfbh + data.name + '路径信息' });
	            this.updateCityies();
	        }
	    };

	    Typhoon.prototype.onLsljClick = function onLsljClick(info) {
	        var typhoonLayer = leaf.typhoonLayer;

	        if (typhoonLayer) {
	            var typhoon = typhoonLayer.getTyphoon(leaf.tfbh);
	            typhoon.setIndex(info.index);
	        }
	    };

	    Typhoon.prototype.onLsljOver = function onLsljOver(info) {
	        var typhoonLayer = leaf.typhoonLayer;

	        if (typhoonLayer) {
	            var typhoon = typhoonLayer.getTyphoon(leaf.tfbh);
	            typhoon.showTip(info.index);
	        }
	    };

	    Typhoon.prototype.onCityClick = function onCityClick(info) {
	        var data = info.data;
	        var map = leaf.map;

	        map.setView([data.mapx, data.mapy], 9);
	    };

	    Typhoon.prototype.render = function render() {
	        var props = this.props;
	        var onTyphoonItemCheck = this.onTyphoonItemCheck;
	        var onLsljClick = this.onLsljClick;
	        var onTyphoonClick = this.onTyphoonClick;
	        var onLsljOver = this.onLsljOver;
	        var onCityClick = this.onCityClick;
	        var height = props.height;
	        var h = height / 3;
	        return _react2["default"].createElement(
	            'div',
	            { className: 'ModuleBox' },
	            _react2["default"].createElement(
	                _NavTab2["default"],
	                { height: h, key: '1' },
	                _react2["default"].createElement(_AdvancedDataTable2["default"], { height: h, ref: 'tflist', label: '台风列表', onItemClick: onTyphoonClick.bind(this), store: _ReactStores.stores.advanceddatatable, actions: _ReactActions.actions.advanceddatatable, columns: [{ f: "check", style: { width: 36, textAlign: "center" }, onChange: onTyphoonItemCheck.bind(this) }, { dataField: "tfbh", headerText: "编号" }, { dataField: "name", headerText: "中文名" }, { dataField: "ename", headerText: "英文名" }] })
	            ),
	            _react2["default"].createElement(
	                _NavTab2["default"],
	                { ref: 'ljtab', height: h, key: '2' },
	                _react2["default"].createElement(_AdvancedDataTable2["default"], { height: h, ref: 'ljxx', reverse: true, label: '路径信息', onItemClick: onLsljClick.bind(this), onItemOver: onLsljOver.bind(this), store: _ReactStores.stores.advanceddatatable, actions: _ReactActions.actions.advanceddatatable, columns: [{ dataField: "time", headerText: "时间", style: { width: 128 } }, { dataField: "power", headerText: "风力", style: { textAlign: "center" } }, { dataField: "speed", headerText: "风速(m/s)", style: { textAlign: "right" } }] })
	            ),
	            _react2["default"].createElement(
	                _NavTab2["default"],
	                { height: h, key: '3' },
	                _react2["default"].createElement(_AdvancedDataTable2["default"], { height: h, ref: 'cscj', label: '城市测距', onItemClick: onCityClick.bind(this), store: _ReactStores.stores.advanceddatatable, actions: _ReactActions.actions.advanceddatatable, columns: [{ dataField: "featurename", headerText: "沿海城市" }, { dataField: "distance", headerText: "距离(km)", style: { textAlign: "right" } }] })
	            )
	        );
	    };

	    return Typhoon;
	}(_react.Component);

	leaf.addTo = function (app, mapbox) {
	    var app, offsetHeight;
	    if (mapbox) {
	        leaf.map = mapbox;
	        offsetHeight = app.clientHeight > 300 ? app.clientHeight : mapbox.clientHeight > 0 ? mapbox.clientHeight : document.body.offsetHeight;
	    } else {
	        offsetHeight = document.body.offsetHeight;
	    }

	    _reactDom2["default"].render(_react2["default"].createElement(Typhoon, { height: offsetHeight }), app);
	    var bottomContrl = document.getElementById('trunk');
	    app = document.createElement('div');
	    bottomContrl.appendChild(app);
	    _reactDom2["default"].render(_react2["default"].createElement(_TimeSlider2["default"], { expanded: true }), app);
	};

	leaf.suspend = function () {
	    var commonLayer = leaf.commonLayer;
	    var typhoonLayer = leaf.typhoonLayer;

	    leaf.suspended = true;
	    commonLayer && commonLayer.suspend();
	    typhoonLayer && typhoonLayer.suspend();
	};

	leaf.resume = function () {
	    var commonLayer = leaf.commonLayer;
	    var typhoonLayer = leaf.typhoonLayer;

	    leaf.suspended = false;
	    commonLayer && commonLayer.resume();
	    typhoonLayer && typhoonLayer.resume();
	};

	if (window.T && T.define) {
	    T.define(leaf);
	} else if (window.define) {
	    window.define(leaf);
	} else {
	    leaf.addTo(document.getElementById('app'));
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Imgs = __webpack_require__(23);

	var _Imgs2 = _interopRequireDefault(_Imgs);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//时间滑块=>通常用于台风播放

	var TimeSlider = function (_Component) {
	    _inherits(TimeSlider, _Component);

	    function TimeSlider(props) {
	        _classCallCheck(this, TimeSlider);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        props.dataProvider = [{ "time": "2016-09-10T14:00:00", "lng": 139.1, "lat": 14.9, "strong": "热带风暴(TS)", "power": 8.0, "speed": 18, "move_dir": "西西北", "move_speed": 20, "pressure": 998, "radius7": 120, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-10T17:00:00", "lng": 138.5, "lat": 15.1, "strong": "热带风暴(TS)", "power": 8.0, "speed": 18, "pressure": 998, "radius7": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-10T20:00:00", "lng": 138.0, "lat": 15.3, "strong": "热带风暴(TS)", "power": 8.0, "speed": 18, "move_dir": "西西北", "move_speed": 21, "pressure": 998, "radius7": 120, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T02:00:00", "lng": 137.0, "lat": 15.9, "strong": "热带风暴(TS)", "power": 9.0, "speed": 23, "move_dir": "西西北", "move_speed": 21, "pressure": 990, "radius7": 120, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T05:00:00", "lng": 136.3, "lat": 16.4, "strong": "热带风暴(TS)", "power": 9.0, "speed": 23, "move_dir": "西西北", "move_speed": 24, "pressure": 990, "radius7": 200, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T08:00:00", "lng": 135.7, "lat": 16.4, "strong": "热带风暴(TS)", "power": 9.0, "speed": 23, "move_dir": "西西北", "move_speed": 24, "pressure": 990, "radius7": 200, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T14:00:00", "lng": 134.4, "lat": 16.6, "strong": "强热带风暴(STS)", "power": 10.0, "speed": 25, "move_dir": "西西北", "move_speed": 25, "pressure": 985, "radius7": 200, "radius10": 0, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T17:00:00", "lng": 133.8, "lat": 17.1, "strong": "强热带风暴(STS)", "power": 10.0, "speed": 25, "pressure": 985, "radius7": 200, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-11T20:00:00", "lng": 133.4, "lat": 17.4, "strong": "强热带风暴(STS)", "power": 10.0, "speed": 28, "move_dir": "西西北", "move_speed": 25, "pressure": 982, "radius7": 200, "radius10": 80, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T02:00:00", "lng": 131.7, "lat": 17.6, "strong": "台风(TY)", "power": 12.0, "speed": 35, "move_dir": "西西北", "move_speed": 20, "pressure": 970, "radius7": 220, "radius10": 80, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T05:00:00", "lng": 131.1, "lat": 17.8, "strong": "台风(TY)", "power": 13.0, "speed": 40, "move_dir": "西西北", "move_speed": 20, "pressure": 960, "radius7": 220, "radius10": 80, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T08:00:00", "lng": 130.4, "lat": 18.0, "strong": "强台风(STY)", "power": 14.0, "speed": 42, "move_dir": "西西北", "move_speed": 22, "pressure": 955, "radius7": 220, "radius10": 80, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T11:00:00", "lng": 129.9, "lat": 18.1, "strong": "超强台风(Super TY)", "power": 16.0, "speed": 52, "pressure": 935, "radius7": 240, "radius10": 100, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T14:00:00", "lng": 129.4, "lat": 18.3, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 58, "move_dir": "西西北", "move_speed": 22, "pressure": 925, "radius7": 240, "radius10": 100, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T17:00:00", "lng": 128.9, "lat": 18.6, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 62, "move_dir": "西西北", "move_speed": 22, "pressure": 915, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T20:00:00", "lng": 128.2, "lat": 18.9, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 62, "move_dir": "西西北", "move_speed": 22, "pressure": 915, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-12T23:00:00", "lng": 127.5, "lat": 19.1, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 65, "pressure": 910, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-13T02:00:00", "lng": 126.8, "lat": 19.3, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 65, "move_dir": "西西北", "move_speed": 22, "pressure": 910, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-13T05:00:00", "lng": 126.1, "lat": 19.4, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 65, "move_dir": "西西北", "move_speed": 22, "pressure": 910, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }, { "time": "2016-09-13T08:00:00", "lng": 125.6, "lat": 19.6, "strong": "超强台风(Super TY)", "power": 17.0, "speed": 65, "move_dir": "西西北", "move_speed": 21, "pressure": 910, "radius7": 300, "radius10": 120, "radius7_quad": {}, "radius10_quad": {}, "radius12_quad": {}, "forecast": [] }];
	        _this.state = {
	            expanded: props.expanded,
	            dataProvider: props.dataProvider,
	            selItem: props.selItem || props.dataProvider && props.dataProvider[props.dataProvider.length - 1],
	            scales: {}
	        };

	        return _this;
	    }

	    TimeSlider.prototype.expand = function expand() {
	        this.setState({ expanded: true });
	    };

	    TimeSlider.prototype.collpase = function collpase() {
	        this.setState({ expanded: false });
	    };

	    TimeSlider.prototype.componentDidMount = function componentDidMount() {
	        this.drawScale();
	    };

	    TimeSlider.prototype.componentDidUpdate = function componentDidUpdate() {
	        this.drawScale();
	    };

	    TimeSlider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	        var state = this.state;
	        var update = nextState.dataProvider !== state.dataProvider || nextState.expanded !== state.expanded;
	        if (!update && state.expanded && state.selItem !== nextState.selItem) {
	            this.drawTimeTrack(nextState.selItem);
	        }
	        return update;
	    };

	    TimeSlider.prototype.drawScale = function drawScale() {
	        var state = this.state;
	        var refs = this.refs;
	        var dataProvider = state.dataProvider;
	        var scales = state.scales;
	        var canvas = refs.scale;
	        if (canvas) {
	            var width = canvas.width;
	            var height = canvas.height;
	            var ctx = canvas.getContext('2d');
	            ctx.clearRect(0, 0, width, height);
	            //
	            if (dataProvider) {
	                var getTime = this.getTime;
	                var start = dataProvider[0] && getTime(dataProvider[0].time);
	                var end = dataProvider[1] && getTime(dataProvider[dataProvider.length - 1].time);
	                var duration = end.getTime() - start.getTime();
	                var maxNum = width / 100;
	                var num = maxNum;
	                var w = width - 60; //左边 30 padding，右边 30 padding
	                var x = 10;
	                var step = 3600000; //60*60*1000=3600000
	                if (duration < maxNum * step) {
	                    num = parseInt(duration / step);
	                } else {
	                    step = (parseInt(duration / maxNum / step) + 1) * step;
	                }

	                //drawing scale
	                var mx = w / num,
	                    cs = 30,
	                    cx = cs,
	                    ct = new Date(start.getTime());
	                //
	                ctx.lineWidth = 0.5;
	                ctx.textAlign = 'center';
	                ctx.beginPath();
	                for (var i = 0; i < num; i++) {
	                    //
	                    ctx.strokeStyle = '#FFFFFF';
	                    ctx.strokeText(ct.getHours() + "时", cx, 10);
	                    ctx.strokeText(ct.getMonth() + 1 + "月" + ct.getDate() + "日", cx, 55);
	                    ctx.strokeStyle = '#000000';
	                    ctx.moveTo(cx, 15);
	                    ctx.lineTo(cx, 24);
	                    ctx.moveTo(cx, 35);
	                    ctx.lineTo(cx, 42);
	                    ctx.stroke();
	                    //
	                    ct.setTime(ct.getTime() + step);
	                    cx += mx;
	                }
	                //save time scale
	                for (var _i = 0, l = dataProvider.length, item; _i < l; _i++) {
	                    item = dataProvider[_i];
	                    ct = getTime(item.time);
	                    cx = cs + w * (ct.getTime() - start.getTime()) / duration;
	                    scales[cx] = item; // 28-33
	                }
	                ctx.stroke();
	            }
	        }
	        this.drawTimeTrack();
	    };

	    TimeSlider.prototype.drawTimeTrack = function drawTimeTrack(nextItem) {
	        var state = this.state;
	        var refs = this.refs;
	        var dataProvider = state.dataProvider;
	        var scales = state.scales;
	        var selItem = nextItem || state.selItem;
	        var canvas = refs.track;
	        if (canvas) {
	            (function () {
	                var width = canvas.width;
	                var height = canvas.height;
	                var ctx = canvas.getContext('2d');
	                var img = new Image();
	                var w = 30;
	                img.src = "libs/assets/timeslider/pointer.png";
	                img.onload = function () {
	                    ctx.clearRect(0, 0, width, height);
	                    if (selItem) {
	                        for (var key in scales) {
	                            if (scales[key] === selItem) {
	                                w = key;
	                                break;
	                            }
	                        }
	                    }

	                    //光晕
	                    ctx.shadowColor = "#FAE200";
	                    ctx.shadowOffsetX = 0;
	                    ctx.shadowOffsetY = 0;
	                    ctx.shadowBlur = 2;
	                    //右侧空白进度
	                    ctx.beginPath();
	                    ctx.moveTo(w, 5);
	                    ctx.lineTo(width - 10, 5);
	                    ctx.bezierCurveTo(width - 10, 5, width, 7, width - 8, 13); //右半圆
	                    ctx.lineTo(w, 13);
	                    ctx.fillStyle = "#002343";
	                    ctx.fill();
	                    ctx.closePath();
	                    // 数据时间刻度
	                    ctx.lineWidth = 2;
	                    ctx.strokeStyle = '#FFFFFF';
	                    ctx.beginPath();
	                    for (var _key in scales) {
	                        if (scales.hasOwnProperty(_key)) {
	                            _key = parseFloat(_key);
	                            if (_key > w) {
	                                ctx.moveTo(_key, 8);
	                                ctx.lineTo(_key, 13);
	                            }
	                        }
	                    }
	                    ctx.stroke();
	                    //当前进度
	                    ctx.beginPath();
	                    ctx.bezierCurveTo(5, 13, 0, 7, 5, 5); //左半圆
	                    ctx.lineTo(w - 5, 5);
	                    ctx.lineTo(w - 5, 13);
	                    ctx.lineTo(5, 13);
	                    ctx.fillStyle = "#FFD633";
	                    ctx.fill();
	                    ctx.drawImage(img, w - 8, 2);
	                    ctx.closePath();
	                };
	            })();
	        }
	    };
	    //


	    TimeSlider.prototype.onTrackClick = function onTrackClick(e) {
	        var state = this.state;
	        var dataProvider = state.dataProvider;
	        var scales = state.scales;
	        var selItem = state.selItem;

	        if (dataProvider && scales) {
	            var canvas = e.target,
	                width = canvas.width - 60,
	                clientX = e.clientX,
	                cx = clientX - 60,
	                min = width,
	                //最接近cx的值
	            cmin = void 0,
	                nextItem = void 0;
	            for (var key in scales) {
	                if (scales.hasOwnProperty(key)) {
	                    key = parseFloat(key);
	                    cmin = Math.abs(key - cx);
	                    if (min > cmin) {
	                        min = cmin;
	                        nextItem = scales[key];
	                    }
	                }
	            }
	            if (selItem !== nextItem) {
	                this.setState({
	                    selItem: nextItem
	                });
	            }
	        }
	    };

	    TimeSlider.prototype.onPlayClick = function onPlayClick(flag) {
	        var _this2 = this;

	        if (flag === 1 || flag === -1) {
	            var state = this.state;
	            var dataProvider = state.dataProvider;
	            var selItem = state.selItem;
	            var selIndex = dataProvider.indexOf(selItem) + 1;
	            if (selIndex > 0) {
	                if (flag === 1 && selIndex > dataProvider.length - 1) {
	                    selIndex = 0;
	                }
	                if (selIndex < dataProvider.length) {
	                    this.setState({
	                        selItem: dataProvider[selIndex]
	                    });
	                    setTimeout(function () {
	                        var refs = _this2.refs;
	                        var playButton = refs.playButton;
	                        var playState = playButton.state;
	                        if (playState.selIndex === 1) {
	                            _this2.onPlayClick(-1);
	                        }
	                    }, 800);
	                }
	            }
	        }
	    };

	    /**
	     * 弃用
	     */


	    TimeSlider.prototype.getTime = function getTime(t) {
	        var ps = t.split("T"),
	            pd = ps[0].split("-"),
	            pt = ps.length > 1 ? ps[1].split(":") : [0, 0, 0];
	        return new Date(pd[0], pd[1] - 1, pd[2], pt[0], pt[1], pt[2]);
	    };

	    TimeSlider.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var width = props.width;
	        var tag = state.tag;
	        var expanded = state.expanded;

	        if (!expanded) {
	            return _react2["default"].createElement('img', { src: 'libs/assets/timeslider/collpase.png', style: { cursor: 'pointer' }, onClick: this.expand.bind(this) });
	        }
	        width = width || 1000;
	        return _react2["default"].createElement(
	            'div',
	            { className: 'TimeSlider' },
	            _react2["default"].createElement(
	                'div',
	                null,
	                _react2["default"].createElement('img', { src: 'libs/assets/timeslider/title-bg.png', onClick: this.collpase.bind(this) }),
	                _react2["default"].createElement('img', { style: { width: width - 117 - 5, height: 34 }, src: 'libs/assets/timeslider/bar-top.png' }),
	                _react2["default"].createElement(
	                    'span',
	                    { style: { position: "absolute", left: 35, top: 12, color: '#FFFFFF' } },
	                    '台风播放'
	                )
	            ),
	            _react2["default"].createElement(
	                'div',
	                null,
	                _react2["default"].createElement('img', { style: { width: width - 5, height: 75 }, src: 'libs/assets/timeslider/bar-middle.png' }),
	                _react2["default"].createElement('img', { style: { position: "absolute", width: 5, height: 104, top: 5 }, src: 'libs/assets/timeslider/bar-right.png' })
	            ),
	            _react2["default"].createElement(
	                'div',
	                { style: { position: "absolute", left: 5, top: 42 } },
	                _react2["default"].createElement(_Imgs2["default"], { ref: 'playButton', dataProvider: ['libs/assets/timeslider/play.png', 'libs/assets/timeslider/pause.png'], onClick: this.onPlayClick.bind(this) }),
	                _react2["default"].createElement('canvas', { ref: 'scale', style: { position: "absolute", left: 60, top: 0 }, width: width - 70, height: 60 }),
	                _react2["default"].createElement('canvas', { ref: 'track', onClick: this.onTrackClick.bind(this), style: { position: "absolute", left: 60, top: 20 }, width: width - 70, height: 16 })
	            )
	        );
	    };

	    return TimeSlider;
	}(_react.Component);

	exports["default"] = TimeSlider;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Imgs = function (_Component) {
	    _inherits(Imgs, _Component);

	    function Imgs(props) {
	        _classCallCheck(this, Imgs);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            dataProvider: props.dataProvider,
	            selIndex: props.dataProvider ? 0 : 1,
	            dataField: props.dataField || 'value'
	        };
	        return _this;
	    }

	    Imgs.prototype.onClick = function onClick() {
	        var props = this.props;
	        var state = this.state;
	        var dataProvider = state.dataProvider;
	        var selIndex = state.selIndex;
	        var onClick = props.onClick;

	        selIndex++;
	        if (selIndex < 0 || selIndex >= dataProvider.length) {
	            selIndex = 0;
	        }
	        this.setState({
	            selIndex: selIndex
	        });
	        onClick && onClick(selIndex, state);
	    };

	    Imgs.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var onClick = this.onClick;
	        var dataProvider = state.dataProvider;
	        var selIndex = state.selIndex;
	        var url = void 0;
	        if (dataProvider) {
	            url = dataProvider[selIndex];
	            if (typeof url !== "string") {
	                url = url[props.dataField];
	            }
	        }
	        return _react2["default"].createElement('img', { style: { cursor: 'pointer' }, src: url, onClick: onClick.bind(this) });
	    };

	    return Imgs;
	}(_react.Component);

	exports["default"] = Imgs;

/***/ },
/* 24 */
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
	 * props{title,content,footer}
	 */

	var NavTab = function (_Component) {
	    _inherits(NavTab, _Component);

	    function NavTab(props) {
	        _classCallCheck(this, NavTab);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            selIndex: 0
	        };
	        return _this;
	    }

	    NavTab.prototype.onClick = function onClick(index) {
	        this.setState({ selIndex: index });
	    };

	    NavTab.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var onClick = this.onClick;
	        var height = props.height;
	        var children = props.children;
	        var selIndex = state.selIndex;
	        var list = [];
	        var selItem = void 0;

	        children.length || (children = [children]);
	        for (var i = 0, l = children.length, item, li, label; i < l; i++) {
	            item = children[i];
	            label = _react2["default"].createElement(
	                "a",
	                { href: "#" },
	                l === 1 && state.label || item.props.label
	            );
	            if (i === selIndex) {
	                selItem = item;
	                li = _react2["default"].createElement(
	                    "li",
	                    { key: i, className: "active" },
	                    label
	                );
	            } else {
	                li = _react2["default"].createElement(
	                    "li",
	                    { key: i, onClick: onClick.bind(this, i) },
	                    label
	                );
	            }
	            list.push(li);
	        }
	        //nav-pills 胶囊式标签页  nav-stacked 垂直排列  nav-justified 同等宽度
	        //nav-tabs
	        return _react2["default"].createElement(
	            "div",
	            { className: "NavTab", style: { height: height || 50 } },
	            _react2["default"].createElement(
	                "ul",
	                { className: "nav nav-tabs Tabs" },
	                list
	            ),
	            selItem
	        );
	    };

	    return NavTab;
	}(_react.Component);

	exports["default"] = NavTab;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import moment from 'moment'
	/**
	 * column {dataField,headerText,type,width,group}
	 * actions:{loadingAction,clickAction}
	 * store
	 */

	var AdvancedDataTable = function (_Component) {
	    _inherits(AdvancedDataTable, _Component);

	    function AdvancedDataTable(props) {
	        _classCallCheck(this, AdvancedDataTable);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.state = {
	            dataProvider: props.dataProvider,
	            columns: props.columns
	        };
	        return _this;
	    }

	    AdvancedDataTable.prototype.componentDidMount = function componentDidMount() {
	        var _this2 = this;

	        this.setHeaderWidth();
	        var _props = this.props;
	        var store = _props.store;
	        var source = _props.source;
	        var actions = _props.actions;

	        if (store) {
	            store.subscribe(function () {
	                return _this2.setState(store.getState());
	            });
	            if (source && actions) {
	                actions.loadingAction(source, store);
	            }
	        }
	    };

	    AdvancedDataTable.prototype.componentDidUpdate = function componentDidUpdate() {
	        this.setHeaderWidth();
	    };
	    /**
	     * colSpan 合并列
	     * 统一列表列宽
	     */


	    AdvancedDataTable.prototype.setHeaderWidth = function setHeaderWidth() {
	        var body = this.refs.body;
	        if (!body) {
	            return;
	        }
	        var tr = body.querySelector('tr');
	        if (!tr) {
	            return;
	        }
	        var tds = tr.querySelectorAll('td');
	        if (tds.length <= 1) {
	            return;
	        }
	        var ths = this.refs.header.querySelectorAll('th'),
	            columnCount = tds.length;
	        if (ths.length !== columnCount) {
	            var nths = [];
	            for (var i = 0, l = columnCount, count = ths.length; i < count; i++) {
	                if (ths[i].colSpan > 1) {
	                    nths.push();
	                } else {
	                    nths.push(ths[i]);
	                }
	            }
	            ths = nths;
	        }
	        for (var _i = 0; _i < columnCount; _i++) {
	            ths[_i].width = tds[_i].offsetWidth;
	        }
	    };
	    /**
	     * 创建列头
	     */


	    AdvancedDataTable.prototype.createHeader = function createHeader(columns, props) {
	        var headerRows = [];
	        var columnCount = columns.length;
	        var headerRowCount = props.headerRowCount;
	        var headerColumns = columns.map(function (column, columnid) {
	            var thProps = {
	                key: columnid
	            };
	            var headerText = column.headerText;
	            var group = column.group;
	            var style = column.style;

	            if (headerRowCount > 1 && !group) {
	                thProps.rowSpan = headerRowCount;
	            } else if (group) {
	                if (columnid === 0 || columns[columnid - 1].group !== group) {
	                    var colSpan = 1;
	                    for (var cid = columnid + 1; cid < columnCount; cid++) {
	                        if (columns[cid].group === group) {
	                            colSpan++;
	                        } else {
	                            break;
	                        }
	                    }
	                    if (!headerRows[1]) {
	                        headerRows[1] = [];
	                    }
	                    headerRows[1].push(_react2["default"].createElement(
	                        'th',
	                        thProps,
	                        headerText
	                    ));
	                    return _react2["default"].createElement(
	                        'th',
	                        _extends({}, thProps, { colSpan: colSpan }),
	                        group
	                    );
	                }
	                headerRows[1].push(_react2["default"].createElement(
	                    'th',
	                    thProps,
	                    headerText
	                ));
	                return null;
	            }
	            return _react2["default"].createElement(
	                'th',
	                thProps,
	                headerText
	            );
	        });
	        headerRows[0] = _react2["default"].createElement(
	            'tr',
	            { key: 0 },
	            headerColumns
	        );
	        headerRows[1] = _react2["default"].createElement(
	            'tr',
	            { key: 1 },
	            headerRows[1]
	        );
	        return headerRows;
	    };

	    /**
	     * 创建数据行
	     */


	    AdvancedDataTable.prototype.createRows = function createRows(columns, dataProvider, selIndex) {
	        var dataRows = void 0,
	            labelFunc = this.labelFunc.bind(this);
	        if (dataProvider) {
	            dataRows = dataProvider.map(function (data, rowid) {
	                var dataColumns = columns.map(function (column, columnid) {
	                    var type = column.type;
	                    var dataField = column.dataField;
	                    var style = column.style;
	                    var label = labelFunc(data, rowid, column, dataField);
	                    var tdProps = { key: columnid };
	                    if (style) {
	                        tdProps.style = style;
	                    }
	                    switch (type) {
	                        case "group":
	                            //将同一组的数据合并成一行（前提是已经按序排列）
	                            if (rowid === 0 || dataProvider[rowid - 1][dataField] !== label) {
	                                var rowSpan = 1;
	                                var rowCount = dataProvider.length;
	                                for (var row = rowid + 1; row < rowCount; row++) {
	                                    if (dataProvider[row][dataField] === label) {
	                                        rowSpan++;
	                                    } else {
	                                        break;
	                                    }
	                                }
	                                tdProps.rowSpan = rowSpan;
	                                return _react2["default"].createElement(
	                                    'td',
	                                    tdProps,
	                                    label
	                                );
	                            }
	                            return null;
	                        default:
	                            return _react2["default"].createElement(
	                                'td',
	                                tdProps,
	                                label
	                            );
	                    }
	                }),
	                    trProps = { key: rowid };
	                selIndex === rowid && (trProps.className = 'info');
	                return _react2["default"].createElement(
	                    'tr',
	                    trProps,
	                    dataColumns
	                );
	            });
	        }
	        return dataRows;
	    };

	    AdvancedDataTable.prototype.onCheck = function onCheck(column, data) {
	        var checked = data.checked = !data.checked;
	        var state = this.state;
	        var dataProvider = state.dataProvider;
	        var selItems = [];
	        for (var i = 0, l = dataProvider.length, item; i < l; i++) {
	            item = dataProvider[i];
	            item !== data && item.checked && selItems.push(item);
	        }
	        checked && selItems.push(data);
	        column.onChange(data, column, selItems);
	        this.setState({});
	    };

	    AdvancedDataTable.prototype.getEventInfo = function getEventInfo(event) {
	        var info = {};
	        var props = this.props;
	        var state = this.state;
	        var dataProvider = state.dataProvider;
	        var reverse = props.reverse;
	        var td = event.target;
	        var columnid = td.cellIndex; //
	        var rowid = td.parentElement.rowIndex; //td.parentElement = tr
	        if (!dataProvider) {
	            return {};
	        }
	        info.target = td;
	        info.columnid = columnid;
	        info.rowid = rowid;
	        info.dataProvider = dataProvider;
	        info.index = reverse ? dataProvider.length - 1 - rowid : rowid;
	        info.data = dataProvider[info.index];
	        return info;
	    };

	    AdvancedDataTable.prototype.onTableClick = function onTableClick(event) {
	        var info = this.getEventInfo(event);
	        var onItemClick = this.props.onItemClick;

	        onItemClick && onItemClick(info);
	        this.setState({ selIndex: info.index });
	    };

	    AdvancedDataTable.prototype.onTableOver = function onTableOver(event) {
	        var info = this.getEventInfo(event);
	        var onItemOver = this.props.onItemOver;

	        onItemOver && onItemOver(info);
	    };

	    /**
	    * 格式化
	    */


	    AdvancedDataTable.prototype.labelFunc = function labelFunc(data, rowid, column, dataField) {
	        var label;
	        switch (column.f) {
	            case "check":
	                label = _react2["default"].createElement('input', { type: 'checkbox', checked: data.checked, onChange: this.onCheck.bind(this, column, data) });
	                break;
	            case "toFixed":
	                label = data[dataField] && label.toFixed(column.format);
	                break;
	            case "date":
	                label = data[dataField];
	                //format string[] ["YYYY-MM-D HH:mm:ss","HH:mm"]
	                var m = moment(label, column.format[0]);
	                if (m.isValid()) {
	                    label = m.format(column.format[1]);
	                }
	                break;
	            case "rowid":
	                label = rowid;
	                break;
	            case "link":
	                var linkUrl = data["link-" + dataField];
	                label = linkUrl && _react2["default"].createElement(
	                    'a',
	                    { href: linkUrl, target: 'view_window' },
	                    data[dataField]
	                ) || data[dataField];
	                break;
	            default:
	                label = data[dataField];
	                break;
	        }
	        return label;
	    };

	    AdvancedDataTable.prototype.render = function render() {
	        var props = this.props;
	        var state = this.state;
	        var onTableClick = this.onTableClick;
	        var onTableOver = this.onTableOver;
	        var columns = state.columns;
	        var dataProvider = state.dataProvider;
	        var selIndex = state.selIndex;
	        var height = props.height;
	        var reverse = props.reverse;

	        if (!columns) {
	            return null;
	        }
	        var headerRows = this.createHeader(columns, props),
	            dataRows = this.createRows(columns, dataProvider, selIndex),
	            tableClass = (0, _classnames2["default"])("table", { "table-hover": true }, { "table-condensed": true }, { "table-striped": true }, { "table-bordered": true }, { "table-condensed": true }),
	            bodyStyle = {};
	        if (height) {
	            bodyStyle.height = height - 33 * headerRows.length; //减去头部高度
	        }
	        reverse && dataRows && dataRows.reverse();
	        return _react2["default"].createElement(
	            'div',
	            { className: 'table-responsive DataTable' },
	            _react2["default"].createElement(
	                'div',
	                { className: 'tableheader' },
	                _react2["default"].createElement(
	                    'table',
	                    { className: tableClass },
	                    _react2["default"].createElement(
	                        'thead',
	                        { ref: 'header' },
	                        headerRows
	                    )
	                )
	            ),
	            _react2["default"].createElement(
	                'div',
	                { className: 'tablebody', onClick: onTableClick.bind(this), onMouseOver: onTableOver.bind(this), style: bodyStyle },
	                _react2["default"].createElement(
	                    'table',
	                    { className: tableClass },
	                    _react2["default"].createElement(
	                        'tbody',
	                        { ref: 'body' },
	                        dataRows
	                    )
	                )
	            )
	        );
	    };

	    return AdvancedDataTable;
	}(_react.Component);

	exports["default"] = AdvancedDataTable;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.actions = undefined;

	var _DataTableActions = __webpack_require__(27);

	var DataTableActions = _interopRequireWildcard(_DataTableActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

	var actions = exports.actions = {
	    advanceddatatable: DataTableActions
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.loadingAction = loadingAction;
	exports.loadedAction = loadedAction;
	var LOADED = exports.LOADED = 'loaded';
	var LOADING = exports.LOADING = 'loading';

	function loadingAction(url, store) {
	    $.getJSON(url, function (result) {
	        var newState;
	        if (result.constructor == Array) {
	            newState = { dataProvider: result };
	        } else {
	            newState = {};
	            var columns = result.columns;
	            var dataProvider = result.dataProvider;

	            if (columns !== undefined) {
	                newState.columns = columns;
	            }
	            if (dataProvider !== undefined) {
	                newState.dataProvider = dataProvider;
	            }
	        }
	        store.dispatch(loadedAction(newState));
	    });
	    return { type: LOADING };
	}

	function loadedAction(state) {
	    return { type: LOADED, state: state };
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.stores = undefined;

	var _redux = __webpack_require__(29);

	var _DataTableReducer = __webpack_require__(43);

	//
	var DataTableStore = (0, _redux.createStore)(_DataTableReducer.DataTableReducer);

	var stores = exports.stores = {
	    advanceddatatable: DataTableStore
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(31);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(38);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(40);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(41);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(42);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(39);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(36);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(33),
	    isHostObject = __webpack_require__(34),
	    isObjectLike = __webpack_require__(35);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(37)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(31);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(39);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(42);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.DataTableReducer = DataTableReducer;
	function DataTableReducer(state, action) {
	   switch (action.type) {
	      case 'loading':
	         return state;
	      case 'loaded':
	         return action.state;
	      default:
	         return state;
	   }
	}

/***/ }
/******/ ]);