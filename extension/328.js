"use strict";
(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[328],{

/***/ 50298:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ipcForIframe = exports.createIframe = void 0;
var _cs_postmessage = __webpack_require__(50366);
var _registry = __webpack_require__(50149);
var _consecutive = __webpack_require__(62042);
var _ts_utils = __webpack_require__(1601);
var postMsg = _cs_postmessage.postMessage;
var ipcForIframe = exports.ipcForIframe = function ipcForIframe() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$targetWindow = _ref.targetWindow,
    targetWindow = _ref$targetWindow === void 0 ? window.top : _ref$targetWindow,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 60000 : _ref$timeout;
  var registry = (0, _registry.createListenerRegistry)();
  var listener = function listener(_ref2) {
    var cmd = _ref2.cmd,
      args = _ref2.args;
    return registry.fire('call', {
      cmd: cmd,
      args: args
    });
  };
  var removeOnMsg = (0, _cs_postmessage.onMessage)(window, listener);
  return {
    ask: function ask(cmd, args) {
      return postMsg(targetWindow, window, {
        cmd: cmd,
        args: args
      }, '*', timeout);
    },
    onAsk: function onAsk(fn) {
      registry.add('call', function (_ref3) {
        var cmd = _ref3.cmd,
          args = _ref3.args;
        return fn(cmd, args);
      });
    },
    destroy: function destroy() {
      removeOnMsg();
    }
  };
};
var createIframe = exports.createIframe = function createIframe(options) {
  var url = options.url,
    width = options.width,
    height = options.height,
    onLoad = options.onLoad,
    domReady = options.domReady,
    _options$ipcTimeout = options.ipcTimeout,
    ipcTimeout = _options$ipcTimeout === void 0 ? 60000 : _options$ipcTimeout;
  var $iframe = document.createElement('iframe');
  var pLoad = new Promise(function (resolve, reject) {
    if (width) $iframe.width = '' + width;
    if (height) $iframe.height = '' + height;
    $iframe.addEventListener('load', function () {
      if (typeof onLoad === 'function') {
        try {
          onLoad();
        } catch (e) {}
      }
      resolve();
    });
    $iframe.src = url;
    document.body.appendChild($iframe);
  });
  var waitDomReady = function waitDomReady(domReady) {
    return (0, _ts_utils.retry)(function () {
      return (0, _consecutive.withConsecutive)(domReady, function () {
        return postMsg($iframe.contentWindow, window, {
          cmd: 'DOM_READY',
          args: {}
        }, '*', 1000).then(function () {
          return true;
        }, function () {
          return false;
        });
      }).then(function () {
        return undefined;
      });
    }, {
      timeout: ipcTimeout,
      shouldRetry: function shouldRetry(e) {
        return true;
      },
      retryInterval: 1000
    })();
  };
  var pReady = domReady ? pLoad.then(function () {
    return waitDomReady(domReady);
  }) : pLoad;
  var removeOnMsg = (0, _cs_postmessage.onMessage)(window, function (_ref4) {
    var cmd = _ref4.cmd,
      args = _ref4.args;
    return wrappedOnAsk(cmd, args);
  });
  var wrappedOnAsk = function wrappedOnAsk(cmd, args) {
    return registry.fire('call', {
      cmd: cmd,
      args: args
    });
  };
  var registry = (0, _registry.createListenerRegistry)();
  return {
    $iframe: $iframe,
    destroy: function destroy() {
      if ($iframe) $iframe.remove();
      removeOnMsg();
    },
    ask: function ask(cmd, args) {
      return pReady.then(function () {
        return postMsg($iframe.contentWindow, window, {
          cmd: cmd,
          args: args
        }, '*', ipcTimeout);
      });
    },
    onAsk: function onAsk(fn) {
      registry.add('call', function (_ref5) {
        var cmd = _ref5.cmd,
          args = _ref5.args;
        return fn(cmd, args);
      });
    }
  };
};

/***/ }),

/***/ 49603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.openPageInTab = exports.openPageInIframe = exports.askPageWithTab = exports.askPageWithIframe = exports.askPageWithFixedTab = void 0;
var _ipc_iframe = __webpack_require__(50298);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _ipc_cache = __webpack_require__(75866);
var _tab_utils = __webpack_require__(20041);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var openPageInIframe = exports.openPageInIframe = _ipc_iframe.createIframe;
var askPageWithIframe = exports.askPageWithIframe = function askPageWithIframe(options) {
  var iframeIpc = openPageInIframe({
    url: options.url,
    width: options.width,
    height: options.height,
    ipcTimeout: options.ipcTimeout,
    domReady: options.domReady,
    onLoad: options.onLoad
  });
  return iframeIpc.ask(options.cmd, options.args).then(function (data) {
    setTimeout(function () {
      return iframeIpc.destroy();
    });
    return data;
  });
};
var openPageInTab = exports.openPageInTab = function openPageInTab(options) {
  var isValidTab = function isValidTab(tabId) {
    return _web_extension["default"].tabs.get(tabId).then(function (tab) {
      return !!tab;
    })["catch"](function (e) {
      return false;
    });
  };
  var updateExistingTabToUrl = function updateExistingTabToUrl(tabId, url) {
    return isValidTab(tabId).then(function (isValid) {
      return isValid ? _web_extension["default"].tabs.update(tabId, {
        url: url
      }) : createNewTabWithUrl(url);
    });
  };
  var createNewTabWithUrl = function createNewTabWithUrl(url) {
    if (options.popup) {
      return _web_extension["default"].windows.create({
        type: 'popup',
        url: url,
        width: Math.round(options.width || screen.availWidth),
        height: Math.round(options.height || screen.availHeight),
        left: Math.round(options.left || 0),
        top: Math.round(options.top || 0)
      }).then(function (win) {
        return win.tabs[0];
      });
    }
    return _web_extension["default"].tabs.create({
      url: url
    });
  };
  var url = options.url,
    tabId = options.tabId,
    domReady = options.domReady;
  var pTab = options.tabId ? updateExistingTabToUrl(tabId, url) : createNewTabWithUrl(url);
  var pIpc = pTab.then(function (tab) {
    var ipcStore = (0, _ipc_cache.getIpcCache)();
    var pGetTab = domReady ? ipcStore.domReadyGet(tab.id, 20 * 1000, domReady) : ipcStore.get(tab.id, 20 * 1000);
    return (options.focus ? (0, _tab_utils.activateTab)(tab.id, true) : Promise.resolve()).then(function () {
      return pGetTab;
    }).then(function (ipc) {
      return _objectSpread(_objectSpread({}, ipc), {}, {
        getTabId: function getTabId() {
          return tab.id;
        },
        getTab: function getTab() {
          return _web_extension["default"].tabs.get(tab.id);
        },
        destroy: function destroy() {
          ipc.destroy();
          if (!options.tabId && !options.keep) {
            _web_extension["default"].tabs.remove(tab.id);
          }
        }
      });
    });
  });
  return {
    destroy: function destroy() {
      pIpc.then(function (ipc) {
        return ipc.destroy();
      });
    },
    ask: function ask() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return pIpc.then(function (ipc) {
        return ipc.ask.apply(ipc, args);
      });
    },
    onAsk: function onAsk() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      pIpc.then(function (ipc) {
        return ipc.onAsk.apply(ipc, args);
      });
    },
    getTab: function getTab() {
      return pIpc.then(function (ipc) {
        return ipc.getTab();
      });
    },
    getTabId: function getTabId() {
      return pIpc.then(function (ipc) {
        return ipc.getTabId();
      });
    }
  };
};
var askPageWithTab = exports.askPageWithTab = function askPageWithTab(options) {
  var tabAPI = openPageInTab({
    url: options.url,
    tabId: options.tabId,
    ipcTimeout: options.ipcTimeout,
    domReady: options.domReady
  });
  return tabAPI.ask(options.cmd, options.args).then(function (data) {
    setTimeout(function () {
      return tabAPI.destroy();
    }, 0);
    return data;
  });
};
var askPageWithFixedTab = exports.askPageWithFixedTab = function () {
  var curTabId = undefined;
  return function (options) {
    var tabAPI = openPageInTab({
      url: options.url,
      tabId: options.tabId || curTabId,
      keep: true,
      ipcTimeout: options.ipcTimeout,
      domReady: options.domReady
    });
    return tabAPI.getTabId().then(function (tabId) {
      curTabId = tabId;
      return tabAPI.ask(options.cmd, options.args).then(function (data) {
        setTimeout(function () {
          return tabAPI.destroy();
        }, 0);
        return data;
      });
    });
  };
}();

/***/ }),

/***/ 7785:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _antd = __webpack_require__(33061);
var _icons = __webpack_require__(29937);
var _propTypes = _interopRequireDefault(__webpack_require__(5556));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EditInPlace = exports["default"] = /*#__PURE__*/function (_React$Component) {
  _inherits(EditInPlace, _React$Component);
  function EditInPlace() {
    var _this;
    _classCallCheck(this, EditInPlace);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, EditInPlace, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      isEditing: false,
      value: ''
    });
    _defineProperty(_assertThisInitialized(_this), "edit", function () {
      _this.setState({
        isEditing: true
      });
      setTimeout(function () {
        var $input = _this.$input && _this.$input.refs && _this.$input.refs.input;
        if ($input) {
          $input.focus();
          var selection = _this.props.getSelection(_this.state.value, $input);
          $input.selectionStart = selection ? selection.start : 0;
          $input.selectionEnd = selection ? selection.end : $input.value.length;
        }
      }, 100);
    });
    _defineProperty(_assertThisInitialized(_this), "submit", function () {
      _this.props.checkValue(_this.state.value).then(function (pass) {
        if (pass) {
          _this.setState({
            isEditing: false
          });
          _this.props.onChange(_this.state.value)["catch"](function (e) {
            return _this.setState({
              value: _this.props.value
            });
          });
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      _this.setState({
        isEditing: false,
        value: _this.props.value
      });
    });
    return _this;
  }
  _createClass(EditInPlace, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (!this.state.isEditing) {
        return /*#__PURE__*/_react["default"].createElement("span", null, this.props.value, /*#__PURE__*/_react["default"].createElement(_icons.EditOutlined, {
          style: {
            marginLeft: '10px',
            cursor: 'pointer'
          },
          onClick: this.edit
        }));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_antd.Input, {
          defaultValue: "",
          autosize: true,
          ref: function ref(_ref) {
            _this2.$input = _ref;
          },
          value: this.state.value,
          onChange: function onChange(e) {
            return _this2.setState({
              value: e.target.value
            });
          },
          onBlur: this.reset,
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === 13) return _this2.submit();
            if (e.keyCode === 27) return _this2.reset();
          }
        });
      }
    }
  }]);
  return EditInPlace;
}(_react["default"].Component);
_defineProperty(EditInPlace, "propTypes", {
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  checkValue: _propTypes["default"].func.isRequired,
  getSelection: _propTypes["default"].func
});
_defineProperty(EditInPlace, "defaultProps", {
  getSelection: function getSelection() {
    return null;
  }
});

/***/ }),

/***/ 36627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getIntersectionObserverManager = exports.LazyImage = exports.IntersectionObserverManager = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _ts_utils = __webpack_require__(1601);
var _log = _interopRequireDefault(__webpack_require__(89130));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IntersectionObserverManager = exports.IntersectionObserverManager = /*#__PURE__*/function () {
  function IntersectionObserverManager(params) {
    _classCallCheck(this, IntersectionObserverManager);
    _defineProperty(this, "targets", []);
    (0, _log["default"])('Create observer', params);
    this.observer = new IntersectionObserver(this.handleObserve.bind(this), params);
  }
  _createClass(IntersectionObserverManager, [{
    key: "observe",
    value: function observe(el, run) {
      this.targets.push({
        el: el,
        run: run,
        done: false
      });
      this.observer.observe(el);
    }
  }, {
    key: "remove",
    value: function remove(el) {
      var index = this.targets.findIndex(function (target) {
        return target.el === el;
      });
      if (index !== -1) {
        this.targets.splice(index, 1);
      }
    }
  }, {
    key: "handleObserve",
    value: function handleObserve(entries) {
      var _this = this;
      entries.forEach(function (entry) {
        if (entry.intersectionRatio <= 0) {
          return;
        }
        var el = entry.target;
        var index = _this.targets.findIndex(function (target) {
          return target.el === el;
        });
        if (index === -1 || _this.targets[index].done) {
          return;
        }
        _this.targets[index].run();
        _this.targets[index].done = true;
      });
    }
  }]);
  return IntersectionObserverManager;
}();
var getIntersectionObserverManager = exports.getIntersectionObserverManager = (0, _ts_utils.singletonGetterByKey)(function (key) {
  return key;
}, function (key, params) {
  return new IntersectionObserverManager(params);
});
var LazyImage = exports.LazyImage = /*#__PURE__*/function (_React$Component) {
  _inherits(LazyImage, _React$Component);
  function LazyImage() {
    var _this2;
    _classCallCheck(this, LazyImage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, LazyImage, [].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "el", null);
    _defineProperty(_assertThisInitialized(_this2), "manager", null);
    _defineProperty(_assertThisInitialized(_this2), "state", {
      url: '',
      isLoading: false
    });
    return _this2;
  }
  _createClass(LazyImage, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.manager = getIntersectionObserverManager(this.props.type, {
        root: this.props.root,
        rootMargin: '20px',
        threshold: 0.01
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.el && this.manager) {
        this.manager.remove(this.el);
      }
    }
  }, {
    key: "startObserve",
    value: function startObserve(el) {
      var _this3 = this;
      if (!this.manager) {
        return;
      }
      this.manager.observe(el, function () {
        _this3.getUrl();
      });
    }
  }, {
    key: "getSizeString",
    value: function getSizeString(size) {
      if (typeof size === 'number') {
        return size + 'px';
      }
      return size;
    }
  }, {
    key: "getImageStyle",
    value: function getImageStyle() {
      return _objectSpread(_objectSpread(_objectSpread({}, !this.props.width ? {} : {
        width: this.getSizeString(this.props.width)
      }), !this.props.height ? {} : {
        height: this.getSizeString(this.props.height)
      }), {}, {
        backgroundImage: "url(".concat(this.state.url, ")"),
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      });
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      var _this4 = this;
      this.setState({
        isLoading: true
      });
      return this.props.getUrl().then(function (realUrl) {
        _this4.setState({
          url: realUrl,
          isLoading: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "lazy-image",
        style: this.getImageStyle(),
        ref: function ref(el) {
          _this5.el = el;
          if (el) {
            _this5.startObserve(el);
          }
        }
      });
    }
  }]);
  return LazyImage;
}(_react["default"].Component);

/***/ }),

/***/ 15210:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SelectInput = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactDom = _interopRequireDefault(__webpack_require__(40961));
var _antd = __webpack_require__(33061);
var _uuid = __webpack_require__(22831);
var _ts_utils = __webpack_require__(1601);
__webpack_require__(40988);
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SelectInput = exports.SelectInput = /*#__PURE__*/function (_React$Component) {
  _inherits(SelectInput, _React$Component);
  function SelectInput(props) {
    var _this;
    _classCallCheck(this, SelectInput);
    _this = _callSuper(this, SelectInput, [props]);
    _defineProperty(_assertThisInitialized(_this), "state", {
      text: '',
      shouldShowOptions: false
    });
    _defineProperty(_assertThisInitialized(_this), "getDropDownElementId", (0, _ts_utils.singletonGetter)(function () {
      return 'dropdown_' + (0, _uuid.v1)();
    }));
    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this.props.disabled) {
        return;
      }
      _this.setState({
        shouldShowOptions: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      setTimeout(function () {
        _this.setState({
          shouldShowOptions: false
        });
      }, 100);
    });
    _defineProperty(_assertThisInitialized(_this), "onToggle", function () {
      if (_this.props.disabled) {
        return;
      }
      if (_this.state.shouldShowOptions) {
        _this.onBlur();
      } else {
        _this.onFocus();
        _this.focusOnTextInput();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      switch (e.keyCode) {
        case 13:
        case 27:
          _this.setState({
            shouldShowOptions: false
          });
          break;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onTextChange", function (e) {
      var text = e.target.value;
      _this.setState({
        text: text,
        shouldShowOptions: true
      });
      _this.props.onChange(text);
    });
    _defineProperty(_assertThisInitialized(_this), "onItemClick", function (e, item, index) {
      var _this$props$stringify;
      var text = (_this$props$stringify = _this.props.stringifyOption(item)) !== null && _this$props$stringify !== void 0 ? _this$props$stringify : _this.props.getId(item, index);
      _this.setState({
        text: text,
        shouldShowOptions: false
      });
      _this.focusOnTextInput();
      _this.props.onChange(text);
    });
    _defineProperty(_assertThisInitialized(_this), "renderArrowIcon", function (_ref) {
      var onClick = _ref.onClick;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "arrow-icon ant-select-arrow",
        onClick: onClick
      }, /*#__PURE__*/_react["default"].createElement("span", {
        role: "img",
        "aria-label": "down",
        className: "anticon anticon-down ant-select-suffix"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        viewBox: "64 64 896 896",
        focusable: "false",
        "data-icon": "down",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        "aria-hidden": "true"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
      }))));
    });
    _this.container = /*#__PURE__*/_react["default"].createRef();
    _this.input = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(SelectInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.value) {
        this.setState({
          text: this.props.value
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        var _this$props$value;
        this.setState({
          text: (_this$props$value = this.props.value) !== null && _this$props$value !== void 0 ? _this$props$value : ''
        });
      }
    }
  }, {
    key: "focusOnTextInput",
    value: function focusOnTextInput() {
      if (!this.input.current) {
        return;
      }
      var $input = this.input.current.input;
      $input.focus();
    }
  }, {
    key: "getDropDownContainer",
    value: function getDropDownContainer() {
      var id = 'drop_down_container';
      var existing = document.getElementById(id);
      if (existing) {
        return existing;
      }
      var el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
      return el;
    }
  }, {
    key: "getDropDownMountPoint",
    value: function getDropDownMountPoint() {
      var id = this.getDropDownElementId();
      var existing = document.getElementById(id);
      if (existing) {
        return existing;
      }
      var el = document.createElement('div');
      el.id = id;
      el.className = "drop-down";
      this.getDropDownContainer().appendChild(el);
      return el;
    }
  }, {
    key: "renderOneOption",
    value: function renderOneOption(item, index, selected) {
      var _stringifyOption;
      var _this$props = this.props,
        getId = _this$props.getId,
        stringifyOption = _this$props.stringifyOption;
      var OptionItem = this.props.OptionItem;
      var id = getId(item, index);
      if (OptionItem) {
        return /*#__PURE__*/_react["default"].createElement(OptionItem, {
          value: item,
          key: id
        });
      }
      var text = (_stringifyOption = stringifyOption === null || stringifyOption === void 0 ? void 0 : stringifyOption(item)) !== null && _stringifyOption !== void 0 ? _stringifyOption : id;
      return /*#__PURE__*/_react["default"].createElement(PlainTextOption, {
        key: id,
        item: item,
        index: index,
        text: text,
        selected: selected,
        onItemClick: this.onItemClick
      });
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this2 = this;
      if (!this.state.shouldShowOptions) {
        return null;
      }
      var el = this.container.current;
      if (!el) {
        return null;
      }
      var rect = el.getBoundingClientRect();
      var margin = 3;
      var style = {
        position: 'absolute',
        left: rect.left,
        top: rect.top + rect.height + margin
      };
      if (!this.props.dropdownAutoWidth) {
        style.width = rect.width;
      }
      var node = /*#__PURE__*/_react["default"].createElement("div", {
        className: "option-list",
        style: style
      }, this.props.options.map(function (item, i) {
        return _this2.renderOneOption(item, i, _this2.state.text === _this2.props.stringifyOption(item));
      }));
      return /*#__PURE__*/_reactDom["default"].createPortal(node, this.getDropDownMountPoint());
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('select-input', {
          opened: this.state.shouldShowOptions
        }),
        ref: this.container
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        ref: this.input,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        value: this.state.text,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onClick: this.onFocus,
        onChange: this.onTextChange,
        onKeyDown: this.onKeyDown
      }), this.renderArrowIcon({
        onClick: this.onToggle
      }), this.renderOptions());
    }
  }]);
  return SelectInput;
}(_react["default"].Component);
_defineProperty(SelectInput, "defaultProps", {
  disabled: false,
  dropdownAutoWidth: false
});
var PlainTextOption = /*#__PURE__*/function (_React$Component2) {
  _inherits(PlainTextOption, _React$Component2);
  function PlainTextOption() {
    var _this3;
    _classCallCheck(this, PlainTextOption);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this3 = _callSuper(this, PlainTextOption, [].concat(args));
    _defineProperty(_assertThisInitialized(_this3), "onClick", function (e) {
      _this3.props.onItemClick(e, _this3.props.item, _this3.props.index);
    });
    return _this3;
  }
  _createClass(PlainTextOption, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('plain-text-option', {
          selected: this.props.selected
        }),
        onMouseDown: this.onClick
      }, this.props.text);
    }
  }]);
  return PlainTextOption;
}(_react["default"].Component);

/***/ }),

/***/ 67482:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _antd = __webpack_require__(33061);
var _anthropic = _interopRequireWildcard(__webpack_require__(47038));
var _simple_actions = __webpack_require__(8588);
var actions = _interopRequireWildcard(__webpack_require__(35127));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AITab = /*#__PURE__*/function (_React$Component) {
  _inherits(AITab, _React$Component);
  function AITab(props) {
    var _this;
    _classCallCheck(this, AITab);
    _this = _callSuper(this, AITab, [props]);
    _defineProperty(_assertThisInitialized(_this), "state", {
      anthropicAPIKey: '',
      prompt: 'Explain a random Ui.Vision command',
      promptResponse: '',
      error: ''
    });
    _this.onClickTestPrompt = _this.onClickTestPrompt.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(AITab, [{
    key: "onClickTestPrompt",
    value: function () {
      var _onClickTestPrompt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this2 = this;
        var anthropicAPIKey, anthropicService;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log('anthropicAPIKey:>> ', this.props.config.anthropicAPIKey);
              anthropicAPIKey = this.props.config.anthropicAPIKey || '';
              if (anthropicAPIKey) {
                _context.next = 5;
                break;
              }
              _antd.message.error(_anthropic.NO_ANTHROPIC_API_KEY_ERROR);
              return _context.abrupt("return");
            case 5:
              anthropicService = new _anthropic["default"](this.props.config.anthropicAPIKey);
              anthropicService === null || anthropicService === void 0 || anthropicService.getPromptResponse(this.state.prompt).then(function (response) {
                _this2.setState({
                  promptResponse: response
                });
                _this2.setState({
                  error: ''
                });
              })["catch"](function (error) {
                console.error('Error getting response:', error);
                // this.setState({ error: error.message })
                _antd.message.error(error.message);
              });
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function onClickTestPrompt() {
        return _onClickTestPrompt.apply(this, arguments);
      }
      return onClickTestPrompt;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var onConfigChange = function onConfigChange(key, val) {
        _this3.props.updateConfig(_defineProperty({}, key, val));
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-tab"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          marginBottom: '20px'
        }
      }, "The AI commands feature is currently experimental/beta. It uses the Anthropic API. To enable the AI commands, please enter your (free) Anthropic API key below", ' ', /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=ai",
        target: "_blank"
      }, ' ', "(more information)"), ":"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-settings-item"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "label-text"
      }, "API Key:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "text",
        value: this.state.anthropicAPIKey,
        onChange: function onChange(e) {
          _this3.setState({
            anthropicAPIKey: e.target.value
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: function onClick() {
          if (_this3.props.config.anthropicAPIKey) {
            _antd.Modal.confirm({
              title: 'Confirm',
              content: 'Do you want to overwrite the existing API key?',
              okText: 'Yes',
              cancelText: 'No',
              onOk: function onOk() {
                onConfigChange('anthropicAPIKey', _this3.state.anthropicAPIKey);
                _this3.setState({
                  anthropicAPIKey: ''
                });
              }
            });
          } else {
            onConfigChange('anthropicAPIKey', _this3.state.anthropicAPIKey);
            _this3.setState({
              anthropicAPIKey: ''
            });
          }
        }
        // disabled={this.state.anthropicAPIKey == this.props.config.anthropicAPIKey}
      }, "Save")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-settings-item"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "label-text"
      }, "Prompt:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "text",
        value: this.state.prompt || 'Hello Claude' //is this text used anywhere?
        ,
        onChange: function onChange(e) {
          _this3.setState({
            prompt: e.target.value
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: this.onClickTestPrompt
      }, "Test")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          marginBottom: '10px'
        }
      }, "Anthropic API (Claude) Answer:"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-response"
      }, /*#__PURE__*/_react["default"].createElement("pre", null, this.state.promptResponse)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-settings-item"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "label-text"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, "aiComputerUse:"), " Max loops before stopping:", ' '), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "number",
        min: "0",
        style: {
          marginLeft: '10px',
          width: '70px'
        },
        value: this.props.config.aiComputerUseMaxLoops,
        onChange: function onChange(e) {
          return onConfigChange('aiComputerUseMaxLoops', e.target.value);
        },
        placeholder: ""
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-chat-in-sidebar"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
        onClick: function onClick(e) {
          onConfigChange('useInitialPromptInAiChat', e.target.checked);
        },
        checked: this.props.config.useInitialPromptInAiChat
      }, "AI Chat in sidebar. Use initial prompt."), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "text",
        value: this.props.config.aiChatSidebarPrompt || 'Describe what you see, in 10 words or less.',
        onChange: function onChange(e) {
          onConfigChange('aiChatSidebarPrompt', e.target.value);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          marginBottom: '10px',
          color: 'red'
        }
      }, this.state.error));
    }
  }]);
  return AITab;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    config: state.config
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(AITab);

/***/ }),

/***/ 2797:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CsvList = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _antd = __webpack_require__(33061);
var _icons = __webpack_require__(29937);
var _storage = __webpack_require__(82798);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CsvList = exports.CsvList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CsvList, _React$PureComponent);
  function CsvList() {
    _classCallCheck(this, CsvList);
    return _callSuper(this, CsvList, arguments);
  }
  _createClass(CsvList, [{
    key: "render",
    value: function render() {
      var _this = this;
      var columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: function render(d) {
          return (0, _storage.readableSize)(d);
        }
      }, {
        title: 'Last Modified',
        dataIndex: 'createTime',
        key: 'createTime',
        render: function render(d) {
          var pad = function pad(n) {
            return n >= 10 ? '' + n : '0' + n;
          };
          return "".concat(d.getFullYear(), "/").concat(pad(d.getMonth() + 1), "/").concat(pad(d.getDate()), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()), ":").concat(pad(d.getSeconds()));
        }
      }, {
        title: 'Action',
        key: 'ops',
        width: 110,
        render: function render(text, csv, index) {
          return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            size: "small",
            shape: "circle",
            onClick: function onClick(ev) {
              _this.props.viewCSV(csv);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, null)), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            size: "small",
            type: "primary",
            shape: "circle",
            onClick: function onClick() {
              _this.props.downloadCSV(csv);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.DownloadOutlined, null)), /*#__PURE__*/_react["default"].createElement(_antd.Popconfirm, {
            title: "Sure to delete?",
            okText: "Delete",
            onConfirm: function onConfirm() {
              _this.props.removeCSV(csv);
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            size: "small",
            danger: true,
            shape: "circle"
          }, /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, null))));
        }
      }];
      var tableConfig = {
        columns: columns,
        dataSource: this.props.list,
        pagination: false,
        bordered: true,
        size: 'middle',
        rowKey: 'fullPath',
        onRowClick: function onRowClick() {
          // Do nothing
        },
        rowClassName: function rowClassName() {
          return '';
        }
      };
      return /*#__PURE__*/_react["default"].createElement(_antd.Table, tableConfig);
    }
  }]);
  return CsvList;
}(_react["default"].PureComponent);

/***/ }),

/***/ 78607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ScreenshotList = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _lazy_image = __webpack_require__(36627);
var _storage = __webpack_require__(97467);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ScreenshotList = exports.ScreenshotList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ScreenshotList, _React$PureComponent);
  function ScreenshotList() {
    _classCallCheck(this, ScreenshotList);
    return _callSuper(this, ScreenshotList, arguments);
  }
  _createClass(ScreenshotList, [{
    key: "render",
    value: function render() {
      var _this = this;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: "screenshot-content"
      }, this.props.screenshots.map(function (ss, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: ss.createTime + '_' + ss.createTime
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "timestamp"
        }, ss.createTime && ss.createTime.toLocaleString(), " - ", /*#__PURE__*/_react["default"].createElement("span", {
          className: "filename"
        }, decodeURIComponent(ss.name))), /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: function onClick(e) {
            e.preventDefault();
            _this.props.downloadScreenshot(ss.name, ss.fullPath);
          }
        }, /*#__PURE__*/_react["default"].createElement(_lazy_image.LazyImage, {
          type: 'screenshot',
          root: _this.props.intersectRoot,
          width: 200,
          height: 200,
          defaultUrl: "",
          getUrl: function getUrl() {
            return (0, _storage.getStorageManager)().getScreenshotStorage().getLink(ss.fullPath);
          }
        })));
      }));
    }
  }]);
  return ScreenshotList;
}(_react["default"].PureComponent);

/***/ }),

/***/ 14871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.VisionList = void 0;
var _antd = __webpack_require__(33061);
var _react = _interopRequireDefault(__webpack_require__(96540));
var _edit_in_place = _interopRequireDefault(__webpack_require__(7785));
var _lazy_image = __webpack_require__(36627);
var _storage = __webpack_require__(97467);
var _icons = __webpack_require__(29937);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var VisionList = exports.VisionList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(VisionList, _React$PureComponent);
  function VisionList() {
    var _this;
    _classCallCheck(this, VisionList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, VisionList, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onClickActionMenu", function (key, vision) {
      switch (key) {
        case 'duplicate':
          return _this.props.duplicateVision(vision.name);
        case 'name_to_target':
          return _this.props.copyNameToTarget(vision.name);
        case 'delete':
          return _this.props.deleteVision(vision.name);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "actionMenuItems", [{
      label: 'Duplicate',
      key: 'duplicate'
    }, {
      label: 'Add name to target box',
      key: 'name_to_target'
    }, {
      type: 'divider'
    }, {
      label: 'Delete',
      key: 'delete'
    }]);
    return _this;
  }
  _createClass(VisionList, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      if (!this.props.intersectRoot) {
        return null;
      }
      var columns = [{
        title: 'Image',
        dataIndex: 'fullPath',
        key: 'fullPath',
        width: 116,
        render: function render(fullPath) {
          return /*#__PURE__*/_react["default"].createElement(_lazy_image.LazyImage, {
            type: 'vision',
            root: _this2.props.intersectRoot,
            width: 100,
            height: 100,
            defaultUrl: "",
            getUrl: function getUrl() {
              return (0, _storage.getStorageManager)().getVisionStorage().getLink(fullPath);
            }
          });
        }
      }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: function render(name, vision) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "vision-name-1",
            id: name
          }, /*#__PURE__*/_react["default"].createElement(_edit_in_place["default"], {
            value: vision.name,
            onChange: function onChange(name) {
              return Promise.resolve(_this2.props.renameVision(vision.name, name));
            },
            checkValue: function checkValue(name) {
              return _this2.props.isNameValid(name);
            },
            getSelection: function getSelection(name, $input) {
              var reg = /(?:_dpi_\d+)?\.png$/i;
              var result = reg.exec(name);
              if (!result) {
                return null;
              }
              var endIndex = result.index;
              return {
                start: 0,
                end: endIndex
              };
            }
          }));
        }
      }, {
        title: 'Action',
        key: 'ops',
        width: 100,
        render: function render(text, vision, index) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "vision-actions"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            size: "small",
            shape: "circle",
            onClick: function onClick(ev) {
              _this2.props.viewVision(vision.name);
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, null)), /*#__PURE__*/_react["default"].createElement(_antd.Dropdown
          // overlay={
          //   <Menu onClick={({ key }) => { this.onClickActionMenu(key, vision) }}>
          //     <Menu.Item key="duplicate">
          //       Duplicate
          //     </Menu.Item>
          //     <Menu.Item key="name_to_target">
          //       Add name to target box
          //     </Menu.Item>
          //     <Menu.Divider />
          //     <Menu.Item key="delete">
          //       Delete
          //     </Menu.Item>
          //   </Menu>
          // }
          , {
            menu: {
              items: _this2.actionMenuItems,
              onClick: function onClick(_ref) {
                var key = _ref.key;
                _this2.onClickActionMenu(key, vision);
              }
            },
            trigger: ['click']
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            size: "small",
            shape: "circle"
          }, /*#__PURE__*/_react["default"].createElement(_icons.MenuFoldOutlined, null))));
        }
      }];
      var search = (this.props.query || '').toLowerCase().trim();
      var matchedVisions = this.props.visions.filter(function (vision) {
        if (search.length === 0) return true;
        return vision.name.toLowerCase().indexOf(search) !== -1;
      });
      var tableConfig = {
        columns: columns,
        dataSource: matchedVisions,
        pagination: false,
        bordered: true,
        size: 'middle',
        rowKey: function rowKey(record) {
          return record.fullPath + '__' + record.createTime.getTime();
        },
        onRowClick: function onRowClick() {
          // Do nothing
        },
        rowClassName: function rowClassName() {
          return '';
        }
      };
      return /*#__PURE__*/_react["default"].createElement(_antd.Table, tableConfig);
    }
  }]);
  return VisionList;
}(_react["default"].PureComponent);

/***/ }),

/***/ 14603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CommandItem = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _propTypes = _interopRequireDefault(__webpack_require__(5556));
var _reactDom = __webpack_require__(40961);
var _antd = __webpack_require__(33061);
var _icons = __webpack_require__(29937);
var _ts_utils = __webpack_require__(1601);
var _reactDnd = __webpack_require__(81592);
var _command = __webpack_require__(85393);
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ItemTypes = /*#__PURE__*/function (ItemTypes) {
  ItemTypes["Command"] = "command";
  return ItemTypes;
}(ItemTypes || {});
var InternalCommandItem = /*#__PURE__*/function (_React$Component) {
  _inherits(InternalCommandItem, _React$Component);
  function InternalCommandItem() {
    var _this;
    _classCallCheck(this, InternalCommandItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, InternalCommandItem, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      _this.props.onClick(e, _this.props.command);
    });
    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e) {
      _this.props.onContextMenu(e, _this.props.command);
    });
    return _this;
  }
  _createClass(InternalCommandItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _ref = this.props,
        index = _ref.index,
        command = _ref.command,
        editable = _ref.editable,
        isDragging = _ref.isDragging,
        connectDropTarget = _ref.connectDropTarget,
        connectDragSource = _ref.connectDragSource;
      var decorate = (0, _ts_utils.compose)(connectDragSource, connectDropTarget);
      var hasDescription = command.description && command.description.length > 0;
      /*
        {
          "serialFixed": 30,
          "cmd": 0.3,
          "target": 0.4,
          "value": 0.3,
          "opsFixed": 70
        }
      */
      // console.log('this.props.columnWidths:>>', this.props.columnWidths)
      var columnWidths = this.props.columnWidths;
      var tableWidth = this.props.tableWidth;
      return decorate( /*#__PURE__*/_react["default"].createElement("div", _extends({}, this.props.attributes, {
        style: this.props.style,
        className: (0, _utils.cn)(this.props.className || '', {
          dragging: isDragging
        }),
        onClick: this.onClick,
        onContextMenu: this.onContextMenu
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row-col index-col",
        style: {
          width: columnWidths.serialFixed
        }
      }, index), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row-col command-col",
        style: {
          width: columnWidths.cmd * tableWidth
        },
        title: (0, _command.commandText)(command.cmd)
      }, (0, _ts_utils.repeatStr)(command.indent * 2, "\xA0"), (0, _command.commandText)(command.cmd)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row-col target-col",
        title: command.target,
        style: {
          width: columnWidths.target * tableWidth
        },
        onMouseEnter: function onMouseEnter(e) {
          return _this2.props.onMouseEnterTarget(e, command);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _this2.props.onMouseLeaveTarget(e, command);
        }
      }, command.target), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row-col value-col",
        title: command.value,
        style: {
          width: columnWidths.value * tableWidth
        }
      }, command.value), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row-col op-col",
        style: {
          minWidth: columnWidths.opsFixed
        }
      }, hasDescription ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: command.description
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: !editable,
        type: "primary",
        shape: "circle",
        size: "small",
        className: "commentout-button",
        onClick: function onClick(e) {
          _this2.props.onToggleComment(e, command);
          e.stopPropagation();
        }
      })) : /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: !editable,
        shape: "circle",
        size: "small",
        className: "commentout-button",
        onClick: function onClick(e) {
          _this2.props.onToggleComment(e, command);
          e.stopPropagation();
        }
      }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: !editable,
        shape: "circle",
        size: "small",
        onClick: function onClick(e) {
          _this2.props.onDuplicate(e, command);
          e.stopPropagation();
        }
      }, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)))));
    }
  }]);
  return InternalCommandItem;
}(_react["default"].Component);
_defineProperty(InternalCommandItem, "propTypes", {
  style: _propTypes["default"].object,
  columnWidths: _propTypes["default"].object.isRequired,
  tableWidth: _propTypes["default"].number.isRequired,
  className: _propTypes["default"].string,
  attributes: _propTypes["default"].object,
  command: _propTypes["default"].object.isRequired,
  editable: _propTypes["default"].bool.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  onContextMenu: _propTypes["default"].func.isRequired,
  onMouseEnterTarget: _propTypes["default"].func.isRequired,
  onMouseLeaveTarget: _propTypes["default"].func.isRequired,
  onToggleComment: _propTypes["default"].func.isRequired,
  onDuplicate: _propTypes["default"].func.isRequired,
  onMoveCommand: _propTypes["default"].func.isRequired,
  onDragStart: _propTypes["default"].func.isRequired,
  onDragEnd: _propTypes["default"].func.isRequired
});
_defineProperty(InternalCommandItem, "defaultProps", {
  style: {},
  attributes: {},
  className: ''
});
var CommandItem = exports.CommandItem = (0, _ts_utils.compose)((0, _reactDnd.DragSource)(ItemTypes.Command, {
  beginDrag: function beginDrag(props) {
    return {
      index: props.command.realIndex
    };
  },
  isDragging: function isDragging(props, monitor) {
    return monitor.getItem().index === props.command.realIndex;
  }
}, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}), (0, _reactDnd.DropTarget)(ItemTypes.Command, {
  hover: function hover(props, monitor, component) {
    if (!component) {
      return;
    }
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.command.realIndex;
    if (dragIndex === hoverIndex) {
      return;
    }
    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
    var halfHeight = hoverBoundingRect.height / 2;
    var clientOffset = monitor.getClientOffset();
    if (!clientOffset) {
      return;
    }
    var yInElement = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && yInElement < halfHeight) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && yInElement > halfHeight) {
      return;
    }
    props.onMoveCommand(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but we don't have id for command, so have to update index here
    monitor.getItem().index = hoverIndex;
  }
}, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}))(InternalCommandItem);

/***/ }),

/***/ 40987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.openDesktopScreenshotWindow = void 0;
exports.runInDesktopScreenshotEditor = runInDesktopScreenshotEditor;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _tab_utils = __webpack_require__(20041);
var _open_page = __webpack_require__(49603);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DESKTOP_SCREENSHOT_PAGE_URL = _web_extension["default"].runtime.getURL('desktop_screenshot_editor.html');
var openDesktopScreenshotWindow = exports.openDesktopScreenshotWindow = function () {
  var lastTabId = 0;
  return function (screenAvailableSize) {
    return _web_extension["default"].tabs.get(lastTabId)["catch"](function (e) {
      return null;
    }).then(function (tab) {
      var api = (0, _open_page.openPageInTab)({
        url: DESKTOP_SCREENSHOT_PAGE_URL,
        tabId: tab && tab.id,
        keep: true,
        popup: true,
        domReady: true,
        focus: true,
        width: screenAvailableSize.width / 2 + 50,
        height: screenAvailableSize.height / 2 + 100,
        left: screenAvailableSize.width / 4 - 25,
        top: screenAvailableSize.height / 4 - 50
      });
      api.getTabId().then(function (tabId) {
        lastTabId = tabId;
        return (0, _tab_utils.activateTab)(tabId);
      });
      return api;
    });
  };
}();
function runInDesktopScreenshotEditor(screenAvailableSize, req) {
  return openDesktopScreenshotWindow(screenAvailableSize).then(function (api) {
    return api.ask(req.type, req.data);
  });
}

/***/ }),

/***/ 76811:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.selectAreaOnDesktop = selectAreaOnDesktop;
var _service = __webpack_require__(40987);
var _types = __webpack_require__(76701);
var _desktop = __webpack_require__(14406);
var _screen_capture = __webpack_require__(96647);
var _x_screen_capture = __webpack_require__(2967);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _tab = __webpack_require__(13755);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function selectAreaOnDesktop(screenAvailableSize) {
  var captureDesktopViaNativeCVAPI = function captureDesktopViaNativeCVAPI() {
    return (0, _desktop.getNativeCVAPI)().captureDesktop({
      path: undefined
    }).then(function (hardDrivePath) {
      return (0, _service.runInDesktopScreenshotEditor)(screenAvailableSize, {
        type: _types.DesktopScreenshot.RequestType.Capture,
        data: {
          image: {
            source: _types.DesktopScreenshot.ImageSource.CV,
            path: hardDrivePath,
            // width/height is not used for this event, so set it to 0
            width: 0,
            height: 0
          }
        }
      });
    });
  };
  var captureDesktopViaNativeScreenCapture = function captureDesktopViaNativeScreenCapture() {
    return (0, _screen_capture.getNativeScreenCapture)().captureDesktop().then(function (hardDrivePath) {
      return (0, _desktop.getNativeCVAPI)().readFileAsDataURL(hardDrivePath, true);
    });
  };
  var shouldUseNativeScreenCapture = function shouldUseNativeScreenCapture() {
    return Promise.all([_storage["default"].get('config').then(function (config) {
      return config.useDesktopScreenCapture;
    }), (0, _x_screen_capture.getXScreenCapture)().sanityCheck()["catch"](function () {
      return false;
    })]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        optedInNativeScreenCapture = _ref2[0],
        hasInstalledNativeScreenCapture = _ref2[1];
      return optedInNativeScreenCapture && hasInstalledNativeScreenCapture;
    });
  };
  return shouldUseNativeScreenCapture().then(function (should) {
    var captureDesktop = should ? captureDesktopViaNativeScreenCapture : captureDesktopViaNativeCVAPI;
    return captureDesktop().then(function (dataUrl) {
      // If it's called on popup page, just use the function on window
      var handleCommand = window.handleCommand;
      if (typeof handleCommand === 'function') {
        return handleCommand('ADD_VISION_IMAGE', {
          dataUrl: dataUrl
        });
      }
      return (0, _tab.withPanelIpc)().then(function (panelIpc) {
        return panelIpc.ask('ADD_VISION_IMAGE', {
          dataUrl: dataUrl
        });
      });
    });
  });
}

/***/ }),

/***/ 73606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getStorageAndPath = getStorageAndPath;
exports.restoreBackup = restoreBackup;
exports.sortZipObjects = sortZipObjects;
exports.sortZipObjectsInline = sortZipObjectsInline;
var _jszip = _interopRequireDefault(__webpack_require__(71710));
var _storage = __webpack_require__(97467);
var _ts_utils = __webpack_require__(1601);
var _convert_utils = __webpack_require__(75852);
var _common = __webpack_require__(68279);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function restoreBackup(options) {
  var storageManager = (0, _storage.getStorageManager)(options.storage);
  return _jszip["default"].loadAsync(options.file).then(function (zip) {
    // 0. sort entries by folder/file, name
    // 1. Find all folders that is in valid root, create them one by one if not exists
    // 2. Find all files, write into storage

    var fileZipObjects = [];
    var folderZipObjects = [];
    zip.forEach(function (_, obj) {
      if (obj.dir) {
        folderZipObjects.push(obj);
      } else {
        fileZipObjects.push(obj);
      }
    });
    sortZipObjectsInline(fileZipObjects);
    sortZipObjectsInline(folderZipObjects);
    var createAllFolders = function createAllFolders() {
      return _ts_utils.flow.apply(void 0, _toConsumableArray(folderZipObjects.map(function (obj) {
        var res = getStorageAndPath({
          manager: storageManager,
          path: obj.name
        });
        if (!res || res.relativePath === '.' || res.relativePath === '') {
          return function () {
            return Promise.resolve();
          };
        }
        return function () {
          return res.storage.directoryExists(res.relativePath).then(function (exists) {
            if (exists) {
              return;
            }
            return res.storage.createDirectory(res.relativePath).then(function () {});
          });
        };
      })));
    };
    var createAllFiles = function createAllFiles() {
      return _ts_utils.flow.apply(void 0, _toConsumableArray(fileZipObjects.map(function (obj) {
        var res = getStorageAndPath({
          manager: storageManager,
          path: obj.name
        });
        if (!res) {
          return function () {
            return Promise.resolve();
          };
        }
        switch (res.target) {
          case _storage.StorageTarget.Macro:
            {
              return function () {
                return obj.async('text').then(function (text) {
                  return res.storage.write(res.relativePath, (0, _convert_utils.fromJSONString)(text));
                }).then(function () {
                  return res.target;
                });
              };
            }
          case _storage.StorageTarget.Screenshot:
          case _storage.StorageTarget.Vision:
          case _storage.StorageTarget.CSV:
            {
              return function () {
                return obj.async('blob').then(function (blob) {
                  return res.storage.write(res.relativePath, blob);
                }).then(function () {
                  return res.target;
                });
              };
            }
          default:
            {
              return function () {
                return Promise.resolve();
              };
            }
        }
      }))).then(function (results) {
        return {
          count: {
            macro: results.filter(function (x) {
              return x === _storage.StorageTarget.Macro;
            }).length,
            testSuite: results.filter(function (x) {
              return x === _storage.StorageTarget.TestSuite;
            }).length,
            screenshot: results.filter(function (x) {
              return x === _storage.StorageTarget.Screenshot;
            }).length,
            vision: results.filter(function (x) {
              return x === _storage.StorageTarget.Vision;
            }).length,
            csv: results.filter(function (x) {
              return x === _storage.StorageTarget.CSV;
            }).length
          }
        };
      });
    };
    return createAllFolders().then(createAllFiles);
  });
}
function sortZipObjectsInline(list) {
  list.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
function sortZipObjects(list) {
  var result = _toConsumableArray(list);
  sortZipObjectsInline(result);
  return result;
}
function getStorageAndPath(options) {
  var DELIM = '/';
  var parts = options.path.split(DELIM).filter(function (part) {
    return part !== '.';
  });
  var subPath = parts.slice(1).join(DELIM);
  var isDir = parts[parts.length - 1] === '';
  var _ref = function () {
      switch (parts[0]) {
        case _common.ZipFolders.Macros:
          return [options.manager.getMacroStorage(), _storage.StorageTarget.Macro];
        case _common.ZipFolders.TestSuites:
          return [options.manager.getTestSuiteStorage(), _storage.StorageTarget.TestSuite];
        case _common.ZipFolders.Csvs:
          return [options.manager.getCSVStorage(), _storage.StorageTarget.CSV];
        case _common.ZipFolders.Screenshots:
          return [options.manager.getScreenshotStorage(), _storage.StorageTarget.Screenshot];
        case _common.ZipFolders.Visions:
          return [options.manager.getVisionStorage(), _storage.StorageTarget.Vision];
        default:
          return [null, null];
      }
    }(),
    _ref2 = _slicedToArray(_ref, 2),
    storage = _ref2[0],
    target = _ref2[1];
  if (!storage) {
    return null;
  }
  return {
    storage: storage,
    target: target,
    dir: isDir,
    relativePath: subPath
  };
}

/***/ }),

/***/ 96647:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getNativeScreenCapture = exports.NativeScreenCapture = void 0;
var _ts_utils = __webpack_require__(1601);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /// <reference types="chrome"/>
var CommandName = /*#__PURE__*/function (CommandName) {
  CommandName["GetVersion"] = "getVersion";
  CommandName["GetDPI"] = "getDPI";
  CommandName["SetDirectory"] = "setDirectory";
  CommandName["SaveScreenshot"] = "saveScreenshot";
  return CommandName;
}(CommandName || {});
var NativeScreenCapture = exports.NativeScreenCapture = /*#__PURE__*/function () {
  function NativeScreenCapture() {
    _classCallCheck(this, NativeScreenCapture);
  }
  _createClass(NativeScreenCapture, [{
    key: "reconnect",
    value: function reconnect() {
      return Promise.resolve(this);
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.sendMessage(CommandName.GetVersion);
    }
  }, {
    key: "getDpi",
    value: function getDpi() {
      return this.sendMessage(CommandName.GetDPI);
    }
  }, {
    key: "captureDesktop",
    value: function captureDesktop() {
      return this.sendMessage(CommandName.SaveScreenshot);
    }
  }, {
    key: "changeDirectory",
    value: function changeDirectory(dir) {
      return this.sendMessage(CommandName.SaveScreenshot, {
        current: dir
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(command) {
      var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendNativeMessage(NativeScreenCapture.HostName, _objectSpread(_objectSpread({}, extra), {}, {
          command: command
        }), function (response) {
          if (response && response.result) {
            resolve(response[NativeScreenCapture.FieldNameMapping[command]]);
          } else {
            var error = response && response.error;
            error = error || 'Unknown error';
            reject(new Error(error));
          }
        });
      });
    }
  }]);
  return NativeScreenCapture;
}();
_defineProperty(NativeScreenCapture, "HostName", 'com.github.teamdocs.kcmd');
_defineProperty(NativeScreenCapture, "FieldNameMapping", _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CommandName.GetVersion, 'version'), CommandName.GetDPI, 'dpi'), CommandName.SetDirectory, 'directory'), CommandName.SaveScreenshot, 'file'));
var getNativeScreenCapture = exports.getNativeScreenCapture = (0, _ts_utils.singletonGetter)(function () {
  return new NativeScreenCapture();
});

/***/ }),

/***/ 62302:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertSideCommand = convertSideCommand;
exports.convertSideMacro = convertSideMacro;
exports.importSideProject = importSideProject;
var _ts_utils = __webpack_require__(1601);
var _storage = __webpack_require__(97467);
var _log = _interopRequireDefault(__webpack_require__(89130));
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function importSideProject(project) {
  var folderName = (0, _utils.sanitizeFileName)(project.name);
  var macroStorage = (0, _storage.getStorageManager)().getMacroStorage();
  var path = macroStorage.getPathLib();
  return (0, _ts_utils.uniqueName)(folderName, {
    check: function check(name) {
      return macroStorage.directoryExists(name).then(function (result) {
        return !result;
      });
    }
  }).then(function (finalFolderName) {
    return macroStorage.createDirectory(finalFolderName).then(function () {
      return Promise.all(project.tests.map(function (sideMacro) {
        sideMacro.name = (0, _utils.sanitizeFileName)(sideMacro.name);
        var filePath = path.join(finalFolderName, sideMacro.name + '.json');
        var macro = convertSideMacro(sideMacro, project.url);
        return macroStorage.write(filePath, {
          name: macro.name,
          data: {
            commands: macro.commands
          }
        }).then(function () {
          return true;
        }, function (e) {
          (0, _log["default"])(e);
          return e.message;
        });
      })).then(function (list) {
        return {
          successCount: list.filter(function (x) {
            return x && typeof x === 'boolean';
          }).length,
          errorCount: list.filter(function (x) {
            return typeof x === 'string';
          }).length,
          errors: list.filter(function (x) {
            return typeof x === 'string';
          }),
          ignoreCount: 0
        };
      });
    }).then(function (macrosResult) {
      return {
        projectName: project.name,
        folderName: finalFolderName,
        macros: macrosResult,
        suites: {
          successCount: 0,
          ignoreCount: project.suites.length,
          errorCount: 0,
          errors: []
        }
      };
    });
  });
}
function convertSideMacro(macro, baseUrl) {
  return {
    name: macro.name,
    commands: (0, _ts_utils.flatten)(macro.commands.map(function (command) {
      return convertSideCommand(command, baseUrl);
    }))
  };
}
function convertSideCommand(command, baseUrl) {
  if (command.command === 'open') {
    return [{
      cmd: 'open',
      target: resolveUrl(baseUrl, command.target),
      value: ''
    }];
  }
  if (isSameNameSupported(command.command)) {
    return [_objectSpread({
      cmd: command.command,
      target: command.target,
      value: command.value
    }, command.targets ? {
      targetOptions: command.targets.map(function (item) {
        return item[0];
      })
    } : {})];
  }
  var res = convertSideCommandMapping(command);
  if (res.length > 0) {
    return res;
  }
  return [{
    cmd: 'comment',
    target: "".concat(command.command, " // ").concat(command.target),
    value: command.value
  }];
}
function isSameNameSupported(name) {
  switch (name) {
    case 'open':
    case 'select':
    case 'type':
    case 'pause':
    case 'addSelection':
    case 'answerOnNextPrompt':
    case 'assertAlert':
    case 'assertChecked':
    case 'assertConfirmation':
    case 'assertEditable':
    case 'assertElementPresent':
    case 'assertElementNotPresent':
    case 'assertNotEditable':
    case 'assertNotChecked':
    case 'assertPrompt':
    case 'assertTitle':
    case 'assertText':
    case 'assertValue':
    case 'check':
    case 'click':
    case 'saveItem':
    case 'clickAt':
    case 'do':
    case 'dragAndDropToObject':
    case 'echo':
    case 'editContent':
    case 'else':
    case 'elseIf':
    case 'end':
    case 'executeAsyncScript':
    case 'executeScript':
    case 'forEach':
    case 'mouseOver':
    case 'repeatIf':
    case 'removeSelection':
    case 'run':
    case 'select':
    case 'selectFrame':
    case 'sendKeys':
    case 'setWindowSize':
    case 'store':
    case 'storeAttribute':
    case 'storeText':
    case 'storeTitle':
    case 'storeValue':
    case 'storeXpathCount':
    case 'times':
    case 'uncheck':
    case 'verifyChecked':
    case 'verifyText':
    case 'verifyTitle':
    case 'verifyValue':
    case 'verifyEditable':
    case 'verifyElementPresent':
    case 'verifyElementNotPresent':
    case 'verifyNotChecked':
    case 'verifyNotEditable':
    case 'waitForElementVisible':
    case 'waitForElementNotVisible':
    case 'waitForElementPresent':
    case 'waitForElementNotPresent':
      return true;
    default:
      return false;
  }
}
function convertSideCommandMapping(command) {
  var withTimeoutWaitChanged = function withTimeoutWaitChanged(value, command) {
    return [{
      cmd: 'store',
      target: '${!TIMEOUT_WAIT}',
      value: '__LAST_TIMEOUT_WAIT__'
    }, {
      cmd: 'store',
      target: (parseFloat(value) / 1000).toFixed(3),
      value: '!TIMEOUT_WAIT'
    }, command, {
      cmd: 'store',
      target: '${__LAST_TIMEOUT_WAIT__}',
      value: '!TIMEOUT_WAIT'
    }];
  };
  switch (command.command) {
    case 'runScript':
      {
        return [{
          cmd: 'executeScript',
          target: command.target,
          value: ''
        }];
      }
    case 'if':
      {
        return [{
          cmd: 'if',
          //war if_v2 xxx
          target: command.target,
          value: command.value
        }];
      }
    case 'while':
      {
        return [{
          cmd: 'while',
          //war _v2 xxx
          target: command.target,
          value: command.value
        }];
      }
    default:
      return [];
  }
}
function resolveUrl(baseUrl, url) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  if (url.charAt(0) === '/') {
    var u = new URL(baseUrl);
    return u.origin + url;
  }
  return baseUrl + url;
}

/***/ }),

/***/ 2967:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getXScreenCapture = exports.XScreenCapture = void 0;
var _common = __webpack_require__(97846);
var _ts_utils = __webpack_require__(1601);
var _screen_capture = __webpack_require__(96647);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var XScreenCapture = exports.XScreenCapture = /*#__PURE__*/function (_XModule) {
  _inherits(XScreenCapture, _XModule);
  function XScreenCapture() {
    _classCallCheck(this, XScreenCapture);
    return _callSuper(this, XScreenCapture, arguments);
  }
  _createClass(XScreenCapture, [{
    key: "getName",
    value: function getName() {
      return _common.XModuleTypes.XScreenCapture;
    }
  }, {
    key: "getAPI",
    value: function getAPI() {
      return (0, _screen_capture.getNativeScreenCapture)();
    }
  }, {
    key: "initConfig",
    value: function initConfig() {
      return this.getConfig();
    }
  }, {
    key: "sanityCheck",
    value: function sanityCheck() {
      return Promise.all([this.getConfig(), this.getAPI().getVersion()["catch"](function (e) {
        throw new Error('Error #301: Screen Capture XModule is not installed yet');
      })]).then(function () {
        return true;
      });
    }
  }, {
    key: "checkUpdate",
    value: function checkUpdate() {
      return Promise.reject(new Error('checkUpdate is not implemented yet'));
    }
  }, {
    key: "checkUpdateLink",
    value: function checkUpdateLink(modVersion, extVersion) {
      return "https://goto.ui.vision/x/idehelp?help=xscreencapture_updatecheck&xversion=".concat(modVersion, "&kantuversion=").concat(extVersion);
    }
  }, {
    key: "downloadLink",
    value: function downloadLink() {
      return 'https://goto.ui.vision/x/idehelp?help=xscreencapture_download';
    }
  }, {
    key: "infoLink",
    value: function infoLink() {
      return 'https://goto.ui.vision/x/idehelp?help=xscreencapture';
    }
  }]);
  return XScreenCapture;
}(_common.XModule);
var getXScreenCapture = exports.getXScreenCapture = (0, _ts_utils.singletonGetter)(function () {
  return new XScreenCapture();
});

/***/ }),

/***/ 42328:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _antd = __webpack_require__(33061);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var C = _interopRequireWildcard(__webpack_require__(95902));
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var _header = _interopRequireDefault(__webpack_require__(70139));
var _sidebar = _interopRequireDefault(__webpack_require__(74428));
var _dashboard = _interopRequireDefault(__webpack_require__(32875));
var _simple_actions = __webpack_require__(8588);
var _redux2 = __webpack_require__(68806);
__webpack_require__(32121);
__webpack_require__(59620);
__webpack_require__(65733);
var _state = __webpack_require__(78493);
var _recomputed = __webpack_require__(87307);
var _player = __webpack_require__(18392);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _utils = __webpack_require__(46580);
var _config = _interopRequireDefault(__webpack_require__(8747));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);
  function App() {
    var _this;
    _classCallCheck(this, App);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, App, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "hideBackupAlert", function () {
      _this.props.updateConfig({
        lastBackupActionTime: new Date() * 1
      });
      _this.$app.classList.remove('with-alert');
    });
    _defineProperty(_assertThisInitialized(_this), "onClickBackup", function () {
      _this.props.runBackup();
      _this.hideBackupAlert();
    });
    _defineProperty(_assertThisInitialized(_this), "onClickNoBackup", function () {
      _this.hideBackupAlert();
    });
    _defineProperty(_assertThisInitialized(_this), "onClickMainArea", function () {
      _this.props.updateUI({
        focusArea: _state.FocusArea.Unknown
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getPlayer", function (name) {
      if (name) return (0, _player.getPlayer)({
        name: name
      });
      switch (_this.props.player.mode) {
        case C.PLAYER_MODE.TEST_CASE:
          return (0, _player.getPlayer)({
            name: 'testCase'
          });
        case C.PLAYER_MODE.TEST_SUITE:
          return (0, _player.getPlayer)({
            name: 'testSuite'
          });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleStorageChange", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        changes = _ref2[0];
      if (changes.key === 'config') {
        if (changes.newValue.showSettingsOnStart) {
          _this.props.updateUI({
            showSettings: true
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "showGUI", function () {
      _redux2.store.dispatch(_simple_actions.Actions.setNoDisplayInPlay(false));
      // set fast mode
      _redux2.store.dispatch(_simple_actions.Actions.setReplaySpeedOverrideToFastMode(true));
    });
    _defineProperty(_assertThisInitialized(_this), "showGUIForOCR", function () {
      _redux2.store.dispatch(_simple_actions.Actions.setOcrInDesktopMode(false));
    });
    return _this;
  }
  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.props.updateConfig(_defineProperty({}, "oneTimeShowSidePanel", null));
      if (this.props.showSettingsOnStart) {
        this.props.updateUI({
          showSettings: true
        });
        this.props.updateConfig({
          showSettingsOnStart: false
        });
      }
      _storage["default"].addListener(this.handleStorageChange);
      if (this.props.selectCommandIndex !== undefined && this.props.selectCommandIndex !== null) {
        (0, _utils.delayMs)(500).then(function () {
          (0, _utils.waitForRenderComplete)(null, 500).then(function () {
            // scrollIntoView won't work because it's a virtual list
            (0, _utils.delayMs)(500).then(function () {
              var itemHeight = _config["default"].ui.commandItemHeight;
              var tableElement = document.querySelector('.ant-tabs-content .form-group.table-wrapper');
              tableElement.scrollTop = _this2.props.selectCommandIndex * itemHeight;
              // this.props.updateUI({ focusArea: FocusArea.CommandTable })
              _this2.props.selectCommand(_this2.props.selectCommandIndex, true);
            });
          });
        });
      }
      var run = function run() {
        _ipc_cs["default"].ask('PANEL_TIME_FOR_BACKUP', {}).then(function (isTime) {
          if (!isTime) return;
          _this2.$app.classList.add('with-alert');
        });
      };

      // Note: check whether it's time for backup every 5 minutes
      this.timer = setInterval(run, 5 * 60000);
      run();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: "renderPreinstallModal",
    value: function renderPreinstallModal() {
      var _this3 = this;
      if (!this.props.ui.newPreinstallVersion) return null;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        className: "preinstall-modal",
        open: true,
        title: "New demo macros available",
        okText: "Yes, overwrite",
        cancelText: "Skip",
        onOk: function onOk() {
          _this3.props.updateUI({
            newPreinstallVersion: false
          });
          return _this3.props.preinstall(true).then(function () {
            _antd.message.success('demo macros updated');
          })["catch"](function (e) {
            _antd.message.error(e.message);
          });
        },
        onCancel: function onCancel() {
          _this3.props.updateUI({
            newPreinstallVersion: false
          });
          _this3.props.preinstall(false);
        }
      }, /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          fontSize: '14px'
        }
      }, "Do you want to overwrite the demo macros with their latest versions?"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      if (this.props.noDisplay) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "app no-display"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "content"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "status"
        }, "UI.Vision is in \"No Display\" mode now"), /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, {
          className: "simple-actions"
        }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "large",
          onClick: function onClick() {
            return _this4.getPlayer().stop();
          }
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Stop")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "large",
          onClick: this.showGUI
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Show GUI")))));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app with-sidebar",
        ref: function ref(el) {
          _this4.$app = el;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "backup-alert"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Do you want to run the automated backup?"), /*#__PURE__*/_react["default"].createElement("span", {
        className: "backup-actions"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: this.onClickBackup
      }, "Yes"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        onClick: this.onClickNoBackup
      }, "No"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "app-inner"
      }, /*#__PURE__*/_react["default"].createElement(_sidebar["default"], null), /*#__PURE__*/_react["default"].createElement("section", {
        className: "content",
        onClickCapture: this.onClickMainArea
      }, /*#__PURE__*/_react["default"].createElement(_header["default"], null), /*#__PURE__*/_react["default"].createElement(_dashboard["default"], null))), this.renderPreinstallModal(), this.props.ocrInDesktopMode ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "app no-display ocr-overlay"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "status"
      }, "Desktop OCR in progress"), /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, {
        className: "simple-actions"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "large",
        onClick: function onClick() {
          return _this4.getPlayer().stop();
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Stop")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "large",
        onClick: function onClick() {
          return _this4.showGUIForOCR();
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Show GUI"))))) : null);
    }
  }]);
  return App;
}(_react.Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    ui: state.ui,
    player: state.player,
    noDisplay: (0, _recomputed.isNoDisplay)(state),
    ocrInDesktopMode: (0, _recomputed.isOcrInDesktopMode)(state),
    replaySpeedOverrideToFastMode: (0, _recomputed.isReplaySpeedOverrideToFastMode)(state),
    showSettingsOnStart: state.config.showSettingsOnStart,
    selectCommandIndex: state.config.selectCommandIndex
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(App);

/***/ }),

/***/ 66325:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createBookmarkOnBar = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Note: Get ids of bookmarks bar and other bookmarks
var pBookmarksBarId = function getIdsOfOtherBookmarksAndBookmarksBar() {
  var bookmarksBarIndex = _web_extension["default"].isFirefox() ? 1 : 0;
  return _web_extension["default"].bookmarks.getTree().then(function (nodes) {
    var bookmarksBar = nodes[0].children[bookmarksBarIndex];
    return bookmarksBar.id;
  });
}();
var createBookmarkOnBar = exports.createBookmarkOnBar = function createBookmarkOnBar(bookmark) {
  return pBookmarksBarId.then(function (barId) {
    return _web_extension["default"].bookmarks.create(_objectSpread(_objectSpread({}, bookmark), {}, {
      parentId: barId
    }));
  });
};

/***/ }),

/***/ 50366:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.postMessage = exports.onMessage = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TYPE = 'SELENIUM_IDE_CS_MSG';
var postMessage = exports.postMessage = function postMessage(targetWin, myWin, payload) {
  var target = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
  var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 60000;
  return new Promise(function (resolve, reject) {
    if (!targetWin || !targetWin.postMessage) {
      throw new Error('E350: csPostMessage: targetWin is not a window');
    }
    if (!myWin || !myWin.addEventListener || !myWin.removeEventListener) {
      throw new Error('E351: csPostMessage: myWin is not a window', myWin);
    }
    var secret = Math.random();
    var type = TYPE;

    // Note: create a listener with a corresponding secret every time
    var onMsg = function onMsg(e) {
      if (e.data && e.data.type === TYPE && !e.data.isRequest && e.data.secret === secret) {
        myWin.removeEventListener('message', onMsg);
        var _e$data = e.data,
          _payload = _e$data.payload,
          error = _e$data.error;
        if (error) return reject(new Error(error));
        if (_payload !== undefined) return resolve(_payload);
        reject(new Error('E352: csPostMessage: No payload nor error found'));
      }
    };
    myWin.addEventListener('message', onMsg);

    // Note:
    // * `type` to make sure we check our own msg only
    // * `secret` is for 1 to 1 relationship between a msg and a listener
    // * `payload` is the real data you want to send
    // * `isRequest` is to mark that it's not an answer to some previous request

    targetWin.postMessage({
      type: type,
      secret: secret,
      payload: payload,
      isRequest: true
    }, target);
    setTimeout(function () {
      reject(new Error("E353: csPostMessage: timeout ".concat(timeout, " ms"))); //Why 5000?
    }, timeout);
  });
};
var onMessage = exports.onMessage = function onMessage(win, fn) {
  if (!win || !win.addEventListener || !win.removeEventListener) {
    throw new Error('csOnMessage: not a window', win);
  }
  var onMsg = function onMsg(e) {
    // Note: only respond to msg with `isRequest` as true
    if (e && e.data && e.data.type === TYPE && e.data.isRequest && e.data.secret) {
      var tpl = {
        type: TYPE,
        secret: e.data.secret
      };

      // Note: wrapped with a new Promise to catch any exception during the execution of fn
      new Promise(function (resolve, reject) {
        var ret;
        try {
          ret = fn(e.data.payload, {
            source: e.source
          });
        } catch (err) {
          reject(err);
        }

        // Note: only resolve if returned value is not undefined. With this, we can have multiple
        // listeners added to onMessage, and each one takes care of what it really cares
        if (ret !== undefined) {
          resolve(ret);
        }
      }).then(function (res) {
        e.source.postMessage(_objectSpread(_objectSpread({}, tpl), {}, {
          payload: res
        }), '*');
      }, function (err) {
        e.source.postMessage(_objectSpread(_objectSpread({}, tpl), {}, {
          error: err.message
        }), '*');
      });
    }
  };
  win.addEventListener('message', onMsg);
  return function () {
    return win.removeEventListener('message', onMsg);
  };
};

/***/ }),

/***/ 70139:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _antd = __webpack_require__(33061);
var _copyToClipboard = _interopRequireDefault(__webpack_require__(17965));
var _reactRouterDom = __webpack_require__(92648);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _ocr = __webpack_require__(1422);
var _icons = __webpack_require__(29937);
__webpack_require__(73133);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _convert_utils = __webpack_require__(75852);
var _cv_utils = __webpack_require__(7345);
var _encrypt = __webpack_require__(21208);
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var _file_saver = _interopRequireDefault(__webpack_require__(50261));
var _player = __webpack_require__(18392);
var _ts_utils = __webpack_require__(1601);
var _utils = __webpack_require__(46580);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _global_state = __webpack_require__(8327);
var _tab = __webpack_require__(13755);
var _recomputed = __webpack_require__(87307);
var _redux2 = __webpack_require__(68806);
var _http_api = __webpack_require__(5239);
var _restore = __webpack_require__(73606);
var _license = __webpack_require__(12277);
var _types = __webpack_require__(58704);
var _ocr2 = __webpack_require__(99998);
var _languages = __webpack_require__(64013);
var _proxy = __webpack_require__(44790);
var _convert = __webpack_require__(62302);
var _storage = __webpack_require__(97467);
var _x_screen_capture = __webpack_require__(2967);
var _x_user_io = __webpack_require__(4124);
var _xdesktop = __webpack_require__(14683);
var _xfile = __webpack_require__(63109);
var _xlocal = __webpack_require__(95536);
__webpack_require__(78366);
var _save_test_case = _interopRequireDefault(__webpack_require__(64305));
var _ai = _interopRequireDefault(__webpack_require__(67482));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // import {  Link } from "react-router-dom";
var OSType = function () {
  var ua = window.navigator.userAgent;
  if (/windows/i.test(ua)) return "windows";
  if (/mac/i.test(ua)) return "mac";
  return "linux";
}();
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    var location = (0, _reactRouterDom.useLocation)();
    var navigate = (0, _reactRouterDom.useNavigate)();
    var params = (0, _reactRouterDom.useParams)();
    return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, {
      router: {
        location: location,
        navigate: navigate,
        params: params
      }
    }));
  }
  return ComponentWithRouterProp;
}
var applyPresetLicense = function applyPresetLicense(registerKey) {
  if ((0, _license.getLicenseService)().isProLicense() || (0, _license.getLicenseService)().isPersonalLicense()) {
    console.log("license already active.");
    return;
  }
  (0, _license.getLicenseService)().checkLicense(registerKey).then(function (license) {
    if (license.status === "key_not_found") {
      console.error("License key not found");
    }
    console.log("license status: ".concat(license.status));
  })["catch"](function (e) {
    var text = (0, _http_api.isNetworkError)(e) ? "Internet connection required for activation. If you want use the software on a machine without Internet connection, please contact tech support" : e.message;
    console.error(text);
  });
};
var Header = /*#__PURE__*/function (_React$Component) {
  _inherits(Header, _React$Component);
  function Header() {
    var _this;
    _classCallCheck(this, Header);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Header, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      showPlayLoops: false,
      loopsStart: 1,
      loopsEnd: 3,
      xModules: [(0, _xfile.getXFile)(), (0, _x_user_io.getXUserIO)(), (0, _xdesktop.getXDesktop)(), (0, _x_screen_capture.getXScreenCapture)()],
      xModuleData: {},
      xModuleDataLocal: {},
      xFileRootDirChanged: false,
      registerKey: "",
      websiteWhiteListText: "",
      // Security Tab - Encrypt Text
      textToEncrypt: "",
      encryptedText: "",
      showText: false,
      isCheckingLicense: false,
      ocrLanguageOptions: _this.props.config.ocrLanguageOption,
      tesseractLanguageOptions: _languages.tesseractLanguageOptions,
      userEnteredOCRAPIKey: "",
      connectedAPIEndpointType: null // null | "free" | "pro"
    });
    _defineProperty(_assertThisInitialized(_this), "getConnectedAPIEndpointType", function (ocrSpaceApiKey) {
      var apiEndpointType = ocrSpaceApiKey ? (0, _ocr2.isOcrSpaceFreeKey)(ocrSpaceApiKey) ? "free" : "pro" : null;
      return Promise.resolve(apiEndpointType);
    });
    _defineProperty(_assertThisInitialized(_this), "getPlayer", function (name) {
      if (name) return (0, _player.getPlayer)({
        name: name
      });
      switch (_this.props.player.mode) {
        case C.PLAYER_MODE.TEST_CASE:
          return (0, _player.getPlayer)({
            name: "testCase"
          });
        case C.PLAYER_MODE.TEST_SUITE:
          return (0, _player.getPlayer)({
            name: "testSuite"
          });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getTestCaseName", function () {
      var src = _this.props.editing.meta.src;
      return src && src.name && src.name.length ? src.name : "Untitled";
    });
    _defineProperty(_assertThisInitialized(_this), "togglePlayLoopsModal", function (toShow) {
      _this.setState({
        showPlayLoops: toShow
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onToggleRecord", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var msg, tabInfo, permissionResult;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _cv_utils.isCVTypeForDesktop)(_this.props.config.cvScope)) {
              _context.next = 4;
              break;
            }
            msg = "Recording is only available for browser automation. Desktop automation macros are created by adding XClick and other visual commands step by step.";
            _this.props.addLog("warning", msg);
            return _context.abrupt("return", _antd.message.warn(msg, 2.5));
          case 4:
            _context.next = 6;
            return _this.getCurrentRecordedtab();
          case 6:
            tabInfo = _context.sent;
            if (/^(https?:|file:)/.test(tabInfo.url)) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", _antd.message.error("Web recording works only on normal browser pages. For other pages, please use desktop automation."));
          case 9:
            if (!(_this.props.status === C.APP_STATUS.RECORDER)) {
              _context.next = 14;
              break;
            }
            _this.props.stopRecording();
            // Note: remove targetOptions from all commands
            _this.props.normalizeCommands();
            _context.next = 22;
            break;
          case 14:
            console.log('startRecording:>> askPermission');
            _context.next = 17;
            return _this.askPermission();
          case 17:
            permissionResult = _context.sent;
            console.log('startRecording:>> askPermission complete: permissionResult:>>', permissionResult);
            if (permissionResult) {
              _context.next = 21;
              break;
            }
            return _context.abrupt("return");
          case 21:
            _this.props.startRecording();
          case 22:
            _this.setState({
              lastOperation: "record"
            });
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    // Play loops relative
    _defineProperty(_assertThisInitialized(_this), "onClickPlayLoops", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(isStep) {
        var state, bwindowId, wTab;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _global_state.getState)();
            case 2:
              state = _context2.sent;
              bwindowId = state.tabIds.bwindowId;
              if (!(bwindowId != "")) {
                _context2.next = 10;
                break;
              }
              _context2.next = 7;
              return _this.checkWindowisOpen(bwindowId);
            case 7:
              _context2.t0 = _context2.sent;
              _context2.next = 11;
              break;
            case 10:
              _context2.t0 = "";
            case 11:
              wTab = _context2.t0;
              _web_extension["default"].tabs.query({
                active: true
              }).then(function (tabs) {
                if (tabs.length === 0) {
                  (0, _tab.getPlayTab)().then(function (tab) {
                    (0, _global_state.updateState)((0, _utils.setIn)(["tabIds", "toPlay"], tab.id));
                    var _this$state = _this.state,
                      loopsStart = _this$state.loopsStart,
                      loopsEnd = _this$state.loopsEnd;
                    if (loopsStart < 0) {
                      return _antd.message.error("Start value must be no less than zero", 1.5);
                    }
                    if (loopsEnd < loopsStart) {
                      return _antd.message.error("Max value must be greater than start value", 1.5);
                    }
                    var player = _this.getPlayer();
                    var commands = _this.props.editing.commands;
                    var src = _this.props.editing.meta.src;
                    var openTc = commands.find(function (tc) {
                      return tc.cmd.toLowerCase() === "open" || "openbrowser";
                    });
                    _this.props.playerPlay({
                      macroId: src && src.id,
                      loopsEnd: loopsEnd,
                      loopsStart: loopsStart,
                      title: _this.getTestCaseName(),
                      extra: {
                        id: src && src.id
                      },
                      mode: player.C.MODE.LOOP,
                      playUrl: tab.url,
                      playtabIndex: tab.index,
                      playtabId: tab.id,
                      startIndex: 0,
                      startUrl: openTc ? openTc.target : null,
                      resources: _this.props.editing.commands,
                      postDelay: _this.props.config.playCommandInterval * 1000
                    });
                    _this.setState({
                      lastOperation: "play"
                    });
                    _this.togglePlayLoopsModal(false);
                  });
                } else {
                  var tab = wTab != "" ? wTab : tabs[0];
                  (0, _global_state.updateState)((0, _utils.setIn)(["tabIds", "toPlay"], tab.id));
                  var _this$state2 = _this.state,
                    loopsStart = _this$state2.loopsStart,
                    loopsEnd = _this$state2.loopsEnd;
                  if (loopsStart < 0) {
                    return _antd.message.error("Start value must be no less than zero", 1.5);
                  }
                  if (loopsEnd < loopsStart) {
                    return _antd.message.error("Max value must be greater than start value", 1.5);
                  }
                  var player = _this.getPlayer();
                  var commands = _this.props.editing.commands;
                  var src = _this.props.editing.meta.src;
                  var openTc = commands.find(function (tc) {
                    return tc.cmd.toLowerCase() === "open" || "openbrowser";
                  });
                  _this.props.playerPlay({
                    macroId: src && src.id,
                    loopsEnd: loopsEnd,
                    loopsStart: loopsStart,
                    title: _this.getTestCaseName(),
                    extra: {
                      id: src && src.id
                    },
                    mode: player.C.MODE.LOOP,
                    playUrl: tab.url,
                    playtabIndex: tab.index,
                    playtabId: tab.id,
                    startIndex: 0,
                    startUrl: openTc ? openTc.target : null,
                    resources: _this.props.editing.commands,
                    postDelay: _this.props.config.playCommandInterval * 1000
                  });
                  _this.setState({
                    lastOperation: "play"
                  });
                  _this.togglePlayLoopsModal(false);
                }
              });
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "onCancelPlayLoops", function () {
      _this.togglePlayLoopsModal(false);
      _this.setState({
        loopsToPlay: 2
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onChangePlayLoops", function (field, value) {
      _this.setState(_defineProperty({}, field, parseInt(value, 10)));
    });
    _defineProperty(_assertThisInitialized(_this), "onClickSave", function () {
      return (0, _save_test_case["default"])().save();
    });
    _defineProperty(_assertThisInitialized(_this), "getCurrentRecordedtab", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              _web_extension["default"].tabs.query({
                active: true
              }).then(function (tabs) {
                if (tabs.length != 0) {
                  (0, _tab.getPlayTab)().then(function (tab) {
                    resolve(tab);
                  });
                } else {
                  resolve(false);
                }
              });
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    _defineProperty(_assertThisInitialized(_this), "checkWindowisOpen", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(bwindowId) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                chrome.tabs.query({}, function (tabs) {
                  var doFlag = [];
                  for (var i = tabs.length - 1; i >= 0; i--) {
                    if (tabs[i].windowId === bwindowId) {
                      doFlag = tabs[i];
                      break;
                    }
                  }
                  resolve(doFlag);
                });
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());
    // firefox requires explicit permission to access all urls
    // ask user to grant permission, return promise
    _defineProperty(_assertThisInitialized(_this), "askPermission", function () {
      // test code:
      // const permissions = chrome.runtime.getManifest().permissions || [];
      // console.log('permission:>> ', permissions)   
      // let allUrlPermissions = {
      //   origins: ["<all_urls>"],
      //   permissions: ['activeTab', 'tabs']
      // };    
      // return new Promise((resolve, reject) => {  
      //   Ext.permissions.request(allUrlPermissions).then((result) => {
      //     console.log('permission result:>>', result)
      //     resolve(true)
      //   }).catch(e => {
      //     console.log('e:>>', e)
      //   })
      // })

      return new Promise(function (resolve, reject) {
        if (_web_extension["default"].isFirefox()) {
          _web_extension["default"].permissions.contains({
            origins: ["<all_urls>"]
          }).then(function (permissionGranted) {
            if (!permissionGranted) {
              _antd.Modal.confirm({
                title: "Grant Permission To Replay Macros",
                content: "Ui.Vision is an open-source tool for automating tasks. To replay macros, it requires permission from Firefox to 'access data in all tabs'. If you click 'OK', Ui.Vision will open the Firefox permission dialog, allowing you to provide this permission. Continue?",
                okText: "Continue",
                cancelText: "Cancel",
                onOk: function onOk() {
                  _web_extension["default"].permissions.request({
                    origins: ['<all_urls>']
                  }).then(function (result) {
                    console.log('permission result:>>', result);
                    if (result) {
                      resolve(true);
                    } else {
                      // visit https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission in new tab 
                      _web_extension["default"].tabs.create({
                        url: 'https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission',
                        active: true
                      });
                      resolve(false);
                    }
                  });
                },
                onCancel: function onCancel() {
                  // visit https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission in new tab 
                  _web_extension["default"].tabs.create({
                    url: 'https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission',
                    active: true
                  });
                  resolve(false);
                }
              });
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "playCurrentMacro", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(isStep) {
        var permissionResult, state, bwindowId, wTab;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.askPermission();
            case 2:
              permissionResult = _context5.sent;
              if (permissionResult) {
                _context5.next = 5;
                break;
              }
              return _context5.abrupt("return");
            case 5:
              _context5.next = 7;
              return (0, _global_state.getState)();
            case 7:
              state = _context5.sent;
              bwindowId = state.tabIds.bwindowId;
              if (!(bwindowId != "")) {
                _context5.next = 15;
                break;
              }
              _context5.next = 12;
              return _this.checkWindowisOpen(bwindowId);
            case 12:
              _context5.t0 = _context5.sent;
              _context5.next = 16;
              break;
            case 15:
              _context5.t0 = "";
            case 16:
              wTab = _context5.t0;
              _web_extension["default"].tabs.query({
                active: true
              }).then(function (tabs) {
                if (tabs.length === 0) {
                  (0, _tab.getPlayTab)().then(function (tab) {
                    (0, _global_state.updateState)((0, _utils.setIn)(["tabIds", "toPlay"], tab.id));
                    var commands = _this.props.editing.commands;
                    var src = _this.props.editing.meta.src;
                    var openTc = commands.find(function (tc) {
                      return tc.cmd.toLowerCase() === "open" || "openbrowser";
                    });
                    _this.setState({
                      lastOperation: "play"
                    });
                    _this.props.playerPlay({
                      macroId: src && src.id,
                      title: _this.getTestCaseName(),
                      extra: {
                        id: src && src.id
                      },
                      mode: (0, _player.getPlayer)().C.MODE.STRAIGHT,
                      playUrl: tab.url,
                      playtabIndex: tab.index,
                      playtabId: tab.id,
                      startIndex: 0,
                      startUrl: openTc ? openTc.target : null,
                      resources: commands,
                      postDelay: _this.props.config.playCommandInterval * 1000,
                      isStep: isStep,
                      superFast: false,
                      hasOnDownloadCmd: false
                    });
                  });
                } else {
                  var tab = wTab != "" ? wTab : tabs[0];
                  (0, _global_state.updateState)((0, _utils.setIn)(["tabIds", "toPlay"], tab.id));
                  var commands = _this.props.editing.commands;
                  var src = _this.props.editing.meta.src;
                  var openTc = commands.find(function (tc) {
                    return tc.cmd.toLowerCase() === "open" || "openbrowser";
                  });
                  _this.setState({
                    lastOperation: "play"
                  });
                  _this.props.playerPlay({
                    macroId: src && src.id,
                    title: _this.getTestCaseName(),
                    extra: {
                      id: src && src.id
                    },
                    mode: (0, _player.getPlayer)().C.MODE.STRAIGHT,
                    playUrl: tab.url,
                    playtabIndex: tab.index,
                    playtabId: tab.id,
                    startIndex: 0,
                    startUrl: openTc ? openTc.target : null,
                    resources: commands,
                    postDelay: _this.props.config.playCommandInterval * 1000,
                    isStep: isStep,
                    superFast: false,
                    hasOnDownloadCmd: false
                  });
                }
              });
            case 18:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "playCurrentLine", function () {
      var commands = _this.props.editing.commands;
      var _this$props$editing$m = _this.props.editing.meta,
        src = _this$props$editing$m.src,
        selectedIndex = _this$props$editing$m.selectedIndex;
      var commandIndex = selectedIndex === -1 ? 0 : selectedIndex || 0;
      return _this.props.playerPlay({
        macroId: src && src.id,
        title: _this.getTestCaseName(),
        extra: {
          id: src && src.id
        },
        mode: _player.Player.C.MODE.SINGLE,
        startIndex: commandIndex,
        startUrl: null,
        resources: commands,
        postDelay: _this.props.config.playCommandInterval * 1000,
        callback: function callback(err, res) {
          if (err) return;

          // Note: auto select next command
          if (commandIndex + 1 < commands.length) {
            _this.props.selectCommand(commandIndex + 1, true);
          }
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "checkRegisterKey", function () {
      var registerKey = _this.state.registerKey;
      var checkBasicPattern = function checkBasicPattern(str) {
        return str.length === 15 && str.charAt(0) === "K";
      };
      var checkUnregistered = function checkUnregistered(str) {
        return str === "freeman";
      };
      if (checkUnregistered(registerKey)) {
        _this.props.updateConfig({
          xmodulesStatus: "unregistered"
        });
        _antd.message.success("Unregistered");
        (0, _storage.getStorageManager)().emit(_storage.StorageManagerEvent.RootDirChanged);
        _this.resetRegisterKey();
        _this.forceUpdate();
        return;
      }
      var notifyLicenseError = function notifyLicenseError() {
        return _antd.message.error("Invalid license key");
      };
      if (!checkBasicPattern(registerKey)) {
        return notifyLicenseError();
      }
      _this.setState({
        isCheckingLicense: true
      });
      return (0, _license.getLicenseService)().checkLicense(registerKey).then(function (license) {
        if (license.status === "key_not_found") {
          return notifyLicenseError();
        }
        _this.resetRegisterKey();
        _this.forceUpdate();
        (0, _storage.getStorageManager)().emit(_storage.StorageManagerEvent.RootDirChanged);
        _antd.message.success("License key verified");
      })["catch"](function (e) {
        var text = (0, _http_api.isNetworkError)(e) ? "Internet connection required for activation. If you want use the software on a machine without Internet connection, please contact tech support" : e.message;
        _antd.message.error(text, 4);
      })["finally"](function () {
        _this.setState({
          isCheckingLicense: false
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "beforeUnloadHandler", function (event) {
      var hasUnsaved = _this.props.hasUnsaved;
      if (hasUnsaved) {
        // Note: Chrome is showing the default message anyway
        var promptMessage = "You have unsaved Changes. Do you want to save before leaving application?";
        event.returnValue = promptMessage;
        return promptMessage;
      }
    });
    return _this;
  }
  _createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props$router = this.props.router,
        location = _this$props$router.location,
        navigate = _this$props$router.navigate,
        params = _this$props$router.params;
      this.props.setRoute(location.pathname);
      // TODO: may require to fix this
      // this.props.history.listen((location, action) => {
      //   this.props.setRoute(location.pathname)
      // })

      (0, _license.getLicenseService)().getLatestInfo(function (info) {
        _this2.setState({
          licenseInfo: info
        });
      });
      this.getConnectedAPIEndpointType(this.props.config.ocrSpaceApiKey).then(function (apiEndpointType) {
        _this2.setState({
          connectedAPIEndpointType: apiEndpointType
        });
      });

      // preset #210
      // uncomment the following line to activate it
      // applyPresetLicense('LICENSE KEY HERE')

      window.addEventListener("beforeunload", this.beforeUnloadHandler);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.ui.showSettings && !this.props.ui.showSettings) {
        this.onShowSettings();
      }
      if (nextProps.ui.showWebsiteWhiteList && !this.props.ui.showWebsiteWhiteList) {
        this.setState({
          websiteWhiteListText: (this.props.config.websiteWhiteList || []).join("\n")
        });
      }
    }
  }, {
    key: "initLocalXmodule",
    value: function initLocalXmodule() {
      var _this3 = this;
      (0, _xlocal.getXLocal)().getVersionLocal().then(function (data) {
        var installed = data.installed,
          version = data.version;
        var p = !installed ? Promise.resolve() : (0, _xlocal.getXLocal)().initConfig();
        p["catch"](function (e) {}).then(function () {
          _this3.setState((0, _utils.updateIn)(["xModuleDataLocal", (0, _xlocal.getXLocal)().getName()], function (orig) {
            return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
              config: (0, _xlocal.getXLocal)().getCachedConfig()
            });
          }, _this3.state));
        });
      });
    }
  }, {
    key: "initXModules",
    value: function initXModules() {
      var _this4 = this;
      var xModules = this.state.xModules;

      // versionInfo: {
      //  installed: boolean
      //  version: string
      // },
      // checkResult: {
      //  error: string | null
      // }
      Promise.all(xModules.map(function (mod) {
        // Note: call init config for each xmodule and discard any error
        return mod.initConfig()["catch"](function (e) {}).then(function () {
          return mod.getVersion();
        }).then(function (versionInfo) {
          if (versionInfo.installed) {
            return mod.sanityCheck().then(function () {
              return {
                error: null
              };
            }, function (e) {
              return {
                error: e.message
              };
            }).then(function (checkResult) {
              return {
                versionInfo: versionInfo,
                checkResult: checkResult
              };
            });
          } else {
            return {
              versionInfo: versionInfo,
              checkResult: null
            };
          }
        });
      })).then(function (results) {
        var xModuleData = results.reduce(function (prev, r, i) {
          prev[xModules[i].getName()] = _objectSpread(_objectSpread({}, r.versionInfo), {}, {
            checkResult: r.checkResult,
            config: xModules[i].getCachedConfig()
          });
          return prev;
        }, {});
        (0, _xfile.getXFile)().getVersion().then(function (data) {
          var installed = data.installed,
            version = data.version;
          if (xModuleData.xFile != undefined) {
            xModuleData.xFile.installed = installed;
            xModuleData.xFile.version = version;
          }
          _this4.setState({
            xModuleData: xModuleData,
            xFileRootDirChanged: false
          });
        });
      });
    }
  }, {
    key: "isEitherXModuleInstalled",
    value: function isEitherXModuleInstalled() {
      var xFileData = this.state.xModuleData[(0, _xfile.getXFile)().getName()];
      var xUserIOData = this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()];
      return xFileData && xFileData.installed || xUserIOData && xUserIOData.installed;
    }
  }, {
    key: "resetRegisterKey",
    value: function resetRegisterKey() {
      this.setState({
        registerKey: ""
      });
    }
  }, {
    key: "onShowSettings",
    value: function onShowSettings() {
      this.initXModules();
      this.initLocalXmodule();
      this.resetRegisterKey();
    }
  }, {
    key: "showSettingsModal",
    value: function showSettingsModal() {
      this.props.updateUI({
        showSettings: true
      });
    }
  }, {
    key: "showSettingsOfflineModal",
    value: function showSettingsOfflineModal() {
      this.props.updateUI({
        showSettingsOffline: true
      });
    }
  }, {
    key: "renderPublicWebsiteWhiteList",
    value: function renderPublicWebsiteWhiteList() {
      var _this5 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "Embedded Macros Website Whitelist",
        className: "whitelist-modal",
        width: 450,
        okText: "Save",
        open: this.props.ui.showWebsiteWhiteList,
        onCancel: function onCancel() {
          return _this5.props.updateUI({
            showWebsiteWhiteList: false
          });
        },
        onOk: function onOk(close) {
          var text = _this5.state.websiteWhiteListText;
          var lines = text.split(/\n/g).map(function (str) {
            return str.trim();
          }).filter(function (str) {
            return str.length > 0;
          });
          _this5.props.updateConfig({
            websiteWhiteList: lines
          });
          _this5.props.updateUI({
            showWebsiteWhiteList: false
          });
          _antd.message.success("Saved");
          return Promise.resolve(true);
        }
      }, /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          marginBottom: "10px"
        }
      }, "Allow embedded macros to run ", /*#__PURE__*/_react["default"].createElement("em", null, "without warning dialog"), ", if started from the following sites:"), /*#__PURE__*/_react["default"].createElement(_antd.Input.TextArea, {
        placeholder: "One url per line, e. g. https://ui.vision/rpa",
        autosize: {
          minRows: 6,
          maxRows: 12
        },
        value: this.state.websiteWhiteListText,
        style: {
          resize: "vertical"
        },
        onChange: function onChange(e) {
          return _this5.setState({
            websiteWhiteListText: e.target.value
          });
        }
      }), /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          color: "green",
          marginTop: "20px"
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        style: {
          "float": "right",
          marginLeft: "20px"
        },
        href: "https://goto.ui.vision/x/idehelp?help=website_whitelist",
        target: "_blank"
      }, "More info"), "Only run embedded macros from websites you trust"));
    }
  }, {
    key: "renderPlayLoopModal",
    value: function renderPlayLoopModal() {
      var _this6 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "How many loops to play?",
        okText: "Play",
        cancelText: "Cancel",
        className: "play-loop-modal",
        open: this.state.showPlayLoops,
        onOk: this.onClickPlayLoops,
        onCancel: this.onCancelPlayLoops
      }, /*#__PURE__*/_react["default"].createElement(_antd.Row, null, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        span: 10
      }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        label: "Start value"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "number",
        min: "0",
        value: this.state.loopsStart,
        onKeyDown: function onKeyDown(e) {
          if (e.keyCode === 13) _this6.onClickPlayLoops();
        },
        onChange: function onChange(e) {
          return _this6.onChangePlayLoops("loopsStart", e.target.value);
        }
      }))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        span: 10,
        offset: 2
      }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        label: "Max"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "number",
        min: "0",
        value: this.state.loopsEnd,
        onKeyDown: function onKeyDown(e) {
          if (e.keyCode === 13) _this6.onClickPlayLoops();
        },
        onChange: function onChange(e) {
          return _this6.onChangePlayLoops("loopsEnd", e.target.value);
        }
      })))), /*#__PURE__*/_react["default"].createElement("p", null, "The value of the loop counter is available in $", "{", "!LOOP", "}", " ", "variable"));
    }
  }, {
    key: "renderSettingOfflineModal",
    value: function renderSettingOfflineModal() {
      var _this7 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "Eneterprise OCR Server",
        className: "settings-modal",
        width: 650,
        footer: null,
        open: this.props.ui.showSettingsOffline,
        onCancel: function onCancel() {
          _this7.props.updateUI({
            showSettingsOffline: false
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
        className: "radio-block",
        value: this.props.config.ocrMode
      }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
        value: "offline_enabled",
        onClick: function onClick() {
          onConfigChange("ocrMode", "offline_enabled");
        },
        disabled: !(0, _license.getLicenseService)().isProLicense(),
        className: (0, _utils.cn)({
          "need-pro": !(0, _license.getLicenseService)().isProLicense()
        })
      }, "Use", " ", /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=ocrenterprise",
        target: "_blank"
      }, "Local Enterprise OCR Server"), " ", "(Requires XModules Enterprise Edition)", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row offline-modal-row"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "offline-modal-label"
      }, "Local OCR"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "text",
        style: {
          width: "200px"
        },
        disabled: this.props.config.ocrMode !== "offline_enabled",
        value: this.props.config.ocrOfflineURL,
        onChange: function onChange(e) {
          return onConfigChange("ocrOfflineURL", e.target.value);
        }
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("span", {
        className: "offline-modal-label"
      }, "Local API key"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        type: "password",
        style: {
          width: "200px"
        },
        disabled: this.props.config.ocrMode !== "offline_enabled",
        value: this.props.config.ocrOfflineAPIKey,
        onChange: function onChange(e) {
          return onConfigChange("ocrOfflineAPIKey", e.target.value);
        }
      }))))));
    }
  }, {
    key: "renderSettingModal",
    value: function renderSettingModal() {
      var _this8 = this;
      var onConfigChange = function onConfigChange(key, val) {
        _this8.props.updateConfig(_defineProperty({}, key, val));
      };
      var onChangeProxyStatus = function onChangeProxyStatus(value) {
        switch (value) {
          case "off":
            return _ipc_cs["default"].ask("PANEL_SET_PROXY", {
              proxy: null
            });
          case "on":
            {
              var proxy;
              try {
                proxy = (0, _proxy.parseProxyUrl)(_this8.props.config.defaultProxy, _this8.props.config.defaultProxyAuth);
              } catch (e) {
                return _antd.message.error(e.message);
              }
              return _ipc_cs["default"].ask("PANEL_SET_PROXY", {
                proxy: proxy
              });
            }
        }
      };
      var onChangeDefaultOCREngine = function onChangeDefaultOCREngine(value) {
        var lastSelectedEngine = _this8.props.config.ocrEngine;
        onConfigChange("ocrEngine", parseInt(value, 10));
        if (value === "99") {
          if (OSType == "linux") {
            var msg = "Local OCR not supported on Linux yet";
            _antd.message.warn("".concat(msg), 2.5);
            onConfigChange("ocrEngine", 98); // set default. // old: parseInt(1, 10));
          } else {
            (0, _xfile.getXFile)().getLangs(OSType).then(function (data) {
              if (data) {
                var options = JSON.parse(atob(data));
                console.log("getXFile options:>>", options);
                // output: getXFile options:>> ['eng']
                var newOcrlangAr = [];
                _this8.state.ocrLanguageOptions.map(function (item) {
                  return options.indexOf(item.value) > -1 ? newOcrlangAr.push({
                    text: item.text,
                    value: item.value
                  }) : [];
                });
                _this8.setState({
                  ocrLanguageOptions: newOcrlangAr
                });
                onConfigChange("ocrLanguageOption", newOcrlangAr);
                var haveEng = newOcrlangAr.filter(function (lang) {
                  return lang.value == "eng";
                });
                if (haveEng.length != 0) {
                  onConfigChange("ocrLanguage", "eng");
                } else {
                  onConfigChange("ocrLanguage", newOcrlangAr[0]["value"]);
                }
              } else {
                var _msg = "Not Installed";
                _antd.message.info("status updated: ".concat(_msg));
              }
            }, function () {
              _this8.setState({
                ocrLanguageOptions: _this8.state.ocrLanguageOptions
              });
              onConfigChange("ocrLanguage", "eng");
              onConfigChange("ocrLanguageOption", _this8.state.ocrLanguageOptions);
              var msg = "Not Installed";
              onConfigChange("ocrEngine", lastSelectedEngine);
              _antd.message.info("status updated: ".concat(msg));
            });
          }
        } else if (value === "98") {
          var tesseractLangAr = _this8.state.tesseractLanguageOptions.map(function (item) {
            return {
              text: item.text,
              value: item.value
            };
          });
          _this8.setState({
            tesseractLanguageOptions: tesseractLangAr
          });

          // onConfigChange("tesseractLanguageOption", tesseractLangAr);
          var haveEng = tesseractLangAr.filter(function (lang) {
            return lang.value == "eng";
          });
          if (haveEng.length != 0) {
            onConfigChange("ocrLanguage", "eng");
          } else {
            onConfigChange("ocrLanguage", tesseractLangAr[0]["value"]);
          }
        } else {
          _this8.setState({
            ocrLanguageOptions: _languages.ocrLanguageOptions
          });
          onConfigChange("ocrLanguageOption", _languages.ocrLanguageOptions);
          onConfigChange("ocrLanguage", "eng");
        }
      };
      var displayConfig = {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      };
      var ocrClassName = (0, _utils.cn)("ocr-pane", {
        "ocr-disabled": this.props.config.ocrMode === "disabled",
        "ocr-enabled": this.props.config.ocrMode === "enabled",
        "ocr-offline": this.props.config.ocrMode === "offline_enabled"
      }) || '';
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "Settings",
        className: "settings-modal",
        width: 700,
        footer: null,
        open: this.props.ui.showSettings,
        onCancel: function onCancel() {
          _this8.props.updateUI({
            showSettings: false
          });
          _this8.setState({
            textToEncrypt: "",
            encryptedText: ""
          });
          _this8.props.updateConfig({
            showSettingsOnStart: false
          });
          _this8.setState({
            userEnteredOCRAPIKey: ''
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
        type: "card",
        activeKey: this.props.ui.settingsTab || "replay",
        onChange: function onChange(activeKey) {
          return _this8.props.updateUI({
            settingsTab: activeKey
          });
        },
        items: [{
          key: "replay",
          label: "Replay",
          children: /*#__PURE__*/_react["default"].createElement(_antd.Form, null, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Replay Helper"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("playScrollElementsIntoView", !e.target.checked);
            },
            checked: this.props.config.playScrollElementsIntoView
          }, "Scroll elements into view during replay"), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("playHighlightElements", !e.target.checked);
            },
            checked: this.props.config.playHighlightElements
          }, "Highlight elements during replay")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=command_interval"
            }, "Command Interval")
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Select, {
            style: {
              width: "200px"
            },
            placeholder: "interval",
            value: "" + this.props.config.playCommandInterval,
            onChange: function onChange(val) {
              return onConfigChange("playCommandInterval", val);
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
            value: "0"
          }, "Fast (no delay)"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
            value: "0.3"
          }, "Medium (0.3s delay)"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
            value: "2"
          }, "Slow (2s delay)"))), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=timeout_pageload"
            }, "!TIMEOUT_PAGELOAD")
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: "0",
            style: {
              width: "70px"
            },
            value: this.props.config.timeoutPageLoad,
            onChange: function onChange(e) {
              return onConfigChange("timeoutPageLoad", e.target.value);
            },
            placeholder: "in seconds"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "tip"
          }, "Max. time for new page load")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=timeout_wait"
            }, "!TIMEOUT_WAIT")
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: "0",
            style: {
              width: "70px"
            },
            value: this.props.config.timeoutElement,
            onChange: function onChange(e) {
              return onConfigChange("timeoutElement", e.target.value);
            },
            placeholder: "in seconds"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "tip"
          }, "Max. time per step")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=timeout_macro"
            }, "!TIMEOUT_MACRO")
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: "0",
            style: {
              width: "70px"
            },
            value: this.props.config.timeoutMacro,
            onChange: function onChange(e) {
              return onConfigChange("timeoutMacro", e.target.value);
            },
            placeholder: "in seconds"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "tip"
          }, "Max. overall macro runtime")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=timeout_download"
            }, "!TIMEOUT_DOWNLOAD")
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: "0",
            style: {
              width: "70px"
            },
            value: this.props.config.timeoutDownload,
            onChange: function onChange(e) {
              return onConfigChange("timeoutDownload", e.target.value);
            },
            placeholder: "in seconds"
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "tip"
          }, "Max. allowed time for file")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "If error happens in loop"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            value: this.props.config.onErrorInLoop
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            onClick: function onClick(e) {
              return onConfigChange("onErrorInLoop", 'continue_next_loop');
            },
            value: "continue_next_loop"
          }, "Continue next loop"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            onClick: function onClick(e) {
              return onConfigChange("onErrorInLoop", 'stop');
            },
            value: "stop"
          }, "Stop"))), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Ui.Vision Side Panel"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              onConfigChange("showSidePanel", !e.target.checked);
            },
            checked: this.props.config.showSidePanel
          }, "Open Side Panel by default"), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              onConfigChange("sidePanelOnLeft", !e.target.checked);
            },
            checked: this.props.config.sidePanelOnLeft
          }, "Check if Side Panel is on the left (", /*#__PURE__*/_react["default"].createElement("a", {
            onClick: function onClick(e) {
              e.preventDefault();
              e.stopPropagation();
              window.open("https://goto.ui.vision/x/idehelp?help=sidepanel_left");
            }
          }, "More details"), ")")), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Ui.Vision Color Theme"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              var useDarkTheme = !e.target.checked;
              onConfigChange("useDarkTheme", !e.target.checked);
              if (useDarkTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            },
            checked: this.props.config.useDarkTheme,
            style: {
              marginBottom: 0
            }
          }, "Use Dark Mode (", /*#__PURE__*/_react["default"].createElement("a", {
            onClick: function onClick(e) {
              e.preventDefault();
              e.stopPropagation();
              window.open("https://goto.ui.vision/x/idehelp?help=darkmode");
            }
          }, "Beta - report issues here"), ")")))
        }, {
          key: "api",
          label: "API",
          className: "api-pane",
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, "The RPA command line API allows you to run macros and test suites from the command line and to control Ui.Vision from any scripting or programming language (", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=cmdline",
            target: "_blank"
          }, "more info"), ")."), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              var str = (0, _convert_utils.generateEmptyHtml)();
              var blob = new Blob([str], {
                type: "text/plain;charset=utf-8"
              });
              _file_saver["default"].saveAs(blob, "ui.vision.html", true);
            }
          }, "Generate Autostart HTML Page")), /*#__PURE__*/_react["default"].createElement(_antd.Form, null, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: /*#__PURE__*/_react["default"].createElement("a", {
              target: "_blank",
              href: "https://goto.ui.vision/x/idehelp?help=cmdline"
            }, "Allow Command Line")
          }, displayConfig, {
            labelCol: {
              span: 6
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("allowRunFromBookmark", !e.target.checked);
            },
            checked: this.props.config.allowRunFromBookmark
          }, "Run macro and test suite shortcuts from Javascript Bookmarklets"), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("allowRunFromFileSchema", !e.target.checked);
            },
            checked: this.props.config.allowRunFromFileSchema
          }, "Run embedded macros from local files"), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("allowRunFromHttpSchema", !e.target.checked);
            },
            checked: this.props.config.allowRunFromHttpSchema
          }, "Run embedded macros from public websites", /*#__PURE__*/_react["default"].createElement("a", {
            href: "#",
            style: {
              position: "relative",
              marginLeft: "10px",
              padding: "15px 0"
            },
            onClick: function onClick(e) {
              e.stopPropagation();
              e.preventDefault();
              _this8.props.updateUI({
                showWebsiteWhiteList: true
              });
            }
          }, "Edit Whitelist")))))
        }, {
          key: 'ocr',
          label: 'OCR',
          className: ocrClassName,
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "Select Default OCR Engine"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "Local OCR Options:", '  [', /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocr-local",
            target: "_blank"
          }, "more info"), ']'), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            className: "radio-block",
            style: {
              marginLeft: "5%"
            },
            value: "" + this.props.config.ocrEngine
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "98",
            onClick: function onClick() {
              return onChangeDefaultOCREngine("98");
            }
          }, "Javascript OCR (Works well for many use cases, additional OCR languages available on", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocr-request",
            target: "_blank"
          }, " request"), ")"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "99",
            onClick: function onClick() {
              return onChangeDefaultOCREngine("99");
            }
          }, "XModule Local OCR (Faster/better, especially for text on images)"))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "Use Ocr.Space Online OCR:", '   [', /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=free-ocr-api",
            target: "_blank"
          }, "Free OCR API account required"), ']'), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            className: "radio-block",
            style: {
              marginLeft: "5%"
            },
            value: "" + this.props.config.ocrEngine
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "1",
            onClick: function onClick() {
              return onChangeDefaultOCREngine("1");
            }
          }, "Cloud OCR: OCR.Space, Engine1"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "2",
            onClick: function onClick() {
              return onChangeDefaultOCREngine("2");
            }
          }, "Cloud OCR: OCR.Space, Engine2")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "OCR.Space OCR API Key:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "text",
            style: {
              width: "120px"
            },
            value: this.state.userEnteredOCRAPIKey,
            disabled: [1, 2].includes(this.props.config.ocrEngine) ? false : true,
            onChange: function onChange(e) {
              _this8.setState({
                userEnteredOCRAPIKey: e.target.value
              });
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            style: {
              marginLeft: "8px"
            },
            disabled: [1, 2].includes(this.props.config.ocrEngine) ? false : true,
            onClick: function onClick() {
              var _this8$state$userEnte;
              // connect to endpoint
              var key = (_this8$state$userEnte = _this8.state.userEnteredOCRAPIKey) === null || _this8$state$userEnte === void 0 ? void 0 : _this8$state$userEnte.trim();
              if (!key) {
                _antd.message.error("Please enter a valid API key");
                return;
              }
              var isFreeApiKey = (0, _ocr2.isOcrSpaceFreeKey)(key);
              var url;
              if (!isFreeApiKey) {
                // it's a pro key  
                url = _this8.props.config.ocrEngine == 1 ? _config["default"].ocr.proApi1Endpoint : _config["default"].ocr.proApi2Endpoint;
              } else {
                url = _config["default"].ocr.freeApiEndpoint;
              }
              (0, _ocr2.testOcrSpaceAPIKey)({
                key: key,
                url: url
              }).then(function (res) {
                if (res) {
                  var endpointType = isFreeApiKey ? 'free' : 'pro';
                  _this8.setState({
                    connectedAPIEndpointType: endpointType
                  });
                  onConfigChange("ocrSpaceApiKey", key);
                } else {
                  _antd.message.error("Invalid API key");
                  _this8.setState({
                    connectedAPIEndpointType: null
                  });
                  onConfigChange("ocrSpaceApiKey", '');
                }
              })["catch"](function (e) {
                _antd.message.error(e.message);
              });
            }
          }, "Test"), this.state.connectedAPIEndpointType ? /*#__PURE__*/_react["default"].createElement("span", {
            className: "api-key-notification"
          }, "API key stored. Connected to ", this.state.connectedAPIEndpointType.toUpperCase(), " endpoint.") : null)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "Default OCR language"), /*#__PURE__*/_react["default"].createElement(_antd.Select, {
            id: "ss",
            style: {
              width: "150px"
            },
            placeholder: "OCR Language",
            value: this.props.config.ocrLanguage,
            disabled: (this.props.config.ocrMode === "disabled" || this.props.config.ocrEngine === 2) && this.props.config.ocrEngine != 99,
            onChange: function onChange(val) {
              return onConfigChange("ocrLanguage", val);
            }
          }, this.props.config.ocrEngine == 98 ? this.state.tesseractLanguageOptions.map(function (item) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
              value: item.value,
              key: item.value
            }, item.text);
          }) : this.state.ocrLanguageOptions.map(function (item) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
              value: item.value,
              key: item.value
            }, item.text);
          }))), /*#__PURE__*/_react["default"].createElement("div", null, "You can overwrite the default OCR settings in the macro with", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocrlanguage",
            target: "_blank"
          }, "!OCRLanguage"), " ", "and", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocrengine",
            target: "_blank"
          }, "!OCREngine"), ".")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            loading: this.state.testingOcrAPI,
            disabled: this.props.config.ocrMode === "disabled" && this.props.config.ocrEngine != 99 && this.props.config.ocrEngine != 98,
            onClick: function onClick() {
              _this8.setState({
                testingOcrAPI: true
              });
              var isDesktopMode = (0, _cv_utils.isCVTypeForDesktop)(_this8.props.config.cvScope);
              isDesktopMode && _redux2.store.dispatch(_simple_actions.Actions.setOcrInDesktopMode(true));
              (0, _ocr.ocrViewport)({
                store: window["store"],
                isDesktop: isDesktopMode
              })["catch"](function (e) {
                _antd.message.error(e.message);
              }).then(function () {
                _this8.setState({
                  testingOcrAPI: false
                });
                _redux2.store.dispatch(_simple_actions.Actions.setOcrInDesktopMode(false));
              });
            }
          }, "Show OCR Overlay")), /*#__PURE__*/_react["default"].createElement("p", null, "The test runs OCR on the currently active browser tab and displays the result as overlay.")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("b", null, "Calibrate - ", /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "OCRTEXTX")), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: 1,
            value: this.props.config.ocrCalibration != undefined && this.props.config.ocrCalibration != "" ? this.props.config.ocrCalibration : 6,
            onChange: function onChange(e) {
              onConfigChange("ocrCalibration", e.target.value);
              onConfigChange("ocrCalibration_internal", e.target.value);
              //localStorage.setItem('ocrCalibration', e.target.value);
            },
            style: {
              width: "65px",
              marginRight: "15px"
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            loading: this.state.testingCalibrate,
            disabled: this.props.config.ocrMode === "disabled" && this.props.config.ocrEngine != 99,
            onClick: function onClick() {
              _this8.setState({
                testingCalibrate: true
              });
              (0, _ocr.ocrViewportCalibration)({
                store: window["store"],
                isDesktop: true
              })["catch"](function (e) {
                _antd.message.error(e.message);
              }).then( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(result) {
                  var calibrateNumber;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        try {
                          calibrateNumber = parseInt(_redux2.store.getState().config.ocrCalibration_internal);
                          localStorage.setItem("ocrCalibration", calibrateNumber);
                          onConfigChange("ocrCalibration", calibrateNumber);
                          onConfigChange("ocrCalibration_internal", calibrateNumber);
                        } catch (e) {}
                        _this8.setState({
                          testingCalibrate: false
                        });
                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }());
            }
          }, "Calibrate XClickTextRelative"), " ", "(", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocr-calibrate-textrelative",
            target: "_blank"
          }, "What is this?"), ")")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, "Screen Scaling %:")), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: 100,
            value: this.props.config.ocrScaling != undefined && this.props.config.ocrScaling != "" ? this.props.config.ocrScaling : 100,
            onChange: function onChange(e) {
              var calibrateNumber = 6;
              if (_this8.props.config.ocrCalibration == 6 || _this8.props.config.ocrCalibration == 7) {
                calibrateNumber = 7 * (e.target.value / 100);
                //calibrateNumber = (this.props.config.ocrCalibration * (e.target.value/100));
                //e.target.value > 100 ? onConfigChange('ocrCalibration', calibrateNumber) : onConfigChange('ocrCalibration', this.props.config.ocrCalibration);
              } else {
                calibrateNumber = 7 * (e.target.value / 100);
                //e.target.value > 100 ? onConfigChange('ocrCalibration', calibrateNumber) : onConfigChange('ocrCalibration', 6);
              }
              //localStorage.setItem('ocrCalibration', calibrateNumber);
              onConfigChange("ocrCalibration_internal", calibrateNumber);
              onConfigChange("ocrScaling", e.target.value);
            },
            style: {
              width: "65px",
              marginRight: "15px"
            }
          }), /*#__PURE__*/_react["default"].createElement("span", {
            className: "label-text"
          }, " ", "(Used for", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=ocrdesktopscaling",
            target: "_blank"
          }, "XClickTextRelative"), " ", "calibration)"))), /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              margin: "30px 0 0"
            },
            className: "xmodule-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-title"
          }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("b", null, "XModule OCR"), " - Fast Local OCR on Windows/Mac"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xlocal.getXLocal)().infoLink(),
            target: "_blank"
          }, "More Info"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _xlocal.getXLocal)().getVersionLocal().then(function (data) {
                var installed = data.installed,
                  version = data.version;
                var msg = installed ? "Installed (v".concat(version, ")") : "Not Installed";
                _antd.message.info("status updated: ".concat(msg));
                var p = !installed ? Promise.resolve() : (0, _xlocal.getXLocal)().initConfig();
                p["catch"](function (e) {}).then(function () {
                  _this8.setState((0, _utils.updateIn)(["xModuleDataLocal", (0, _xlocal.getXLocal)().getName()], function (orig) {
                    return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
                      config: (0, _xlocal.getXLocal)().getCachedConfig()
                    });
                  }, _this8.state));
                });
              });
            }
          }, "Test it")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-status"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Status:"), this.state.xModuleDataLocal[(0, _xlocal.getXLocal)().getName()] && this.state.xModuleDataLocal[(0, _xlocal.getXLocal)().getName()].installed ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Installed (v", this.state.xModuleDataLocal[(0, _xlocal.getXLocal)().getName()].version, ")"), /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _xlocal.getXLocal)().checkUpdateLink(this.state.xModuleDataLocal[(0, _xlocal.getXLocal)().getName()] && this.state.xModuleDataLocal[(0, _xlocal.getXLocal)().getName()].version, _web_extension["default"].runtime.getManifest().version)
          }, "Check for update")) : /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Not Installed"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xlocal.getXLocal)().downloadLink(),
            target: "_blank"
          }, "Download it")))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("p", {
            style: {
              textAlign: "right",
              marginTop: "10px"
            }
          }, /*#__PURE__*/_react["default"].createElement("a", {
            onClick: function onClick() {
              return _this8.showSettingsOfflineModal();
            }
          }, "Advanced:Connect Enterprise OCR Server"))))
        }, {
          key: 'vision',
          label: 'Vision',
          className: 'vision-pane',
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, "Ui.Vision's eyes can look inside the web browser or search the complete desktop."), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            value: this.props.config.cvScope
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "browser",
            onClick: function onClick() {
              return onConfigChange("cvScope", "browser");
            }
          }, "Browser Automation (Look inside browser)"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "desktop",
            onClick: function onClick() {
              return onConfigChange("cvScope", "desktop");
            },
            disabled: !(this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()] && this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()].installed)
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Desktop Automation (Search complete desktop)"), this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()] && this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()].installed ? null : /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _xdesktop.getXDesktop)().downloadLink(),
            style: {
              marginLeft: "15px"
            }
          }, "Install the DesktopAutomation XModule first."), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("useDesktopScreenCapture", !e.target.checked);
            },
            checked: this.props.config.useDesktopScreenCapture,
            disabled: this.props.config.cvScope !== "desktop" || !(this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()] && this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()].installed)
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Use native", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _x_screen_capture.getXScreenCapture)().infoLink(),
            target: "_blank"
          }, "desktop screen capture"), " ", "if installed (see XModule below)"), this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()] && this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()].installed ? null : /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _x_screen_capture.getXScreenCapture)().downloadLink(),
            style: {
              marginLeft: "15px"
            }
          }, "Install the ScreenCapture XModule first.")))))), /*#__PURE__*/_react["default"].createElement("p", null, "Inside a macro the computer vision scope can be changed with the", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xdesktop.getXDesktop)().infoLink(),
            target: "_blank"
          }, "XDesktopAutomation"), " ", "command. In addition, you can restrict the image search area with the", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=limitsearcharea",
            target: "_blank"
          }, "visionLimitSearchArea"), " ", "command."), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row",
            style: {
              marginTop: "30px"
            }
          }, /*#__PURE__*/_react["default"].createElement("p", null, "Default Vision Search Confidence"), /*#__PURE__*/_react["default"].createElement(_antd.Select, {
            style: {
              width: "200px"
            },
            placeholder: "interval",
            value: "" + this.props.config.defaultVisionSearchConfidence,
            onChange: function onChange(val) {
              return onConfigChange("defaultVisionSearchConfidence", parseFloat(val));
            }
          }, (0, _utils.range)(1, 11, 1).map(function (n) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
              key: n,
              value: "" + (0.1 * n).toFixed(1)
            }, (0.1 * n).toFixed(1));
          }))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row",
            style: {
              marginTop: "30px"
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("waitBeforeDesktopScreenCapture", !e.target.checked);
            },
            checked: this.props.config.waitBeforeDesktopScreenCapture
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Wait"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: "0",
            max: "60",
            value: this.props.config.secondsBeforeDesktopScreenCapture,
            style: {
              width: "60px",
              margin: "0 10px"
            },
            onChange: function onChange(e) {
              return onConfigChange("secondsBeforeDesktopScreenCapture", Math.min(60, Number(e.target.value)));
            }
          }), /*#__PURE__*/_react["default"].createElement("span", null, "seconds before taking screenshots. This allows you to switch windows"))), /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              margin: "30px 0 0"
            },
            className: "xmodule-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-title"
          }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("b", null, "Screen Capture XModule"), " - Select images more quickly"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _x_screen_capture.getXScreenCapture)().infoLink(),
            target: "_blank"
          }, "More Info"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _x_screen_capture.getXScreenCapture)().getVersion().then(function (data) {
                var installed = data.installed,
                  version = data.version;
                var msg = installed ? "Installed (v".concat(version, ")") : "Not Installed";
                _antd.message.info("status updated: ".concat(msg));
                _this8.setState((0, _utils.updateIn)(["xModuleData", (0, _x_screen_capture.getXScreenCapture)().getName()], function (orig) {
                  return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
                    config: (0, _x_screen_capture.getXScreenCapture)().getCachedConfig()
                  });
                }, _this8.state));
              });
            }
          }, "Test it")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-status"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Status:"), this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()] && this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()].installed ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Installed (v", this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()].version, ")"), /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _x_screen_capture.getXScreenCapture)().checkUpdateLink(this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()] && this.state.xModuleData[(0, _x_screen_capture.getXScreenCapture)().getName()].version, _web_extension["default"].runtime.getManifest().version)
          }, "Check for update")) : /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Not Installed"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _x_screen_capture.getXScreenCapture)().downloadLink(),
            target: "_blank"
          }, "Download it")))))
        }, {
          key: 'ai',
          label: 'AI(New)',
          className: 'ai-pane',
          children: /*#__PURE__*/_react["default"].createElement(_ai["default"], null)
        }, {
          key: 'xmodules',
          label: 'XModules',
          className: 'xmodules-pane',
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-title"
          }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("b", null, "FileAccess XModule"), " - Read and write to your hard drive"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xfile.getXFile)().infoLink(),
            target: "_blank"
          }, "More Info"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _xfile.getXFile)().getVersion().then(function (data) {
                var installed = data.installed,
                  version = data.version;
                var msg = installed ? "Installed (v".concat(version, ")") : "Not Installed";
                _antd.message.info("status updated: ".concat(msg));
                var p = !installed ? Promise.resolve() : (0, _xfile.getXFile)().initConfig();
                p["catch"](function (e) {}).then(function () {
                  _this8.setState((0, _utils.updateIn)(["xModuleData", (0, _xfile.getXFile)().getName()], function (orig) {
                    return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
                      config: (0, _xfile.getXFile)().getCachedConfig()
                    });
                  }, _this8.state));
                });
              });
            }
          }, "Test it")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-status"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Status:"), this.state.xModuleData[(0, _xfile.getXFile)().getName()] && this.state.xModuleData[(0, _xfile.getXFile)().getName()].installed ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Installed (v", this.state.xModuleData[(0, _xfile.getXFile)().getName()].version, ")"), /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _xfile.getXFile)().checkUpdateLink(this.state.xModuleData[(0, _xfile.getXFile)().getName()] && this.state.xModuleData[(0, _xfile.getXFile)().getName()].version, _web_extension["default"].runtime.getManifest().version)
          }, "Check for update")) : /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Not Installed"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xfile.getXFile)().downloadLink(),
            target: "_blank"
          }, "Download it"))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-settings"
          }, /*#__PURE__*/_react["default"].createElement("h3", null, "Settings"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-settings-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "settings-detail"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Home Folder"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "settings-detail-content"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "text",
            value: (0, _xfile.getXFile)().getCachedConfig().rootDir,
            disabled: !(this.state.xModuleData[(0, _xfile.getXFile)().getName()] && this.state.xModuleData[(0, _xfile.getXFile)().getName()].installed),
            onChange: function onChange(e) {
              var rootDir = e.target.value;
              _this8.setState((0, _utils.compose)((0, _utils.setIn)(["xModuleData", (0, _xfile.getXFile)().getName(), "config", "rootDir"], rootDir), (0, _utils.setIn)(["xFileRootDirChanged"], true))(_this8.state));
              (0, _xfile.getXFile)().setConfig({
                rootDir: rootDir
              });
            },
            onBlur: function onBlur() {
              if (_this8.state.xFileRootDirChanged) {
                _this8.setState({
                  xFileRootDirChanged: false
                });
                (0, _xfile.getXFile)().sanityCheck().then(function () {
                  _this8.setState((0, _utils.setIn)(["xModuleData", (0, _xfile.getXFile)().getName(), "checkResult"], {
                    error: null
                  }, _this8.state));
                  (0, _storage.getStorageManager)().emit(_storage.StorageManagerEvent.RootDirChanged);
                }, function (e) {
                  _this8.setState((0, _utils.setIn)(["xModuleData", (0, _xfile.getXFile)().getName(), "checkResult"], {
                    error: e.message
                  }, _this8.state));
                  _this8.props.updateUI({
                    showSettings: true,
                    settingsTab: "xmodules"
                  });
                });
              }
            }
          }), this.state.xModuleData[(0, _xfile.getXFile)().getName()] && this.state.xModuleData[(0, _xfile.getXFile)().getName()].checkResult && this.state.xModuleData[(0, _xfile.getXFile)().getName()].checkResult.error ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "check-result"
          }, this.state.xModuleData[(0, _xfile.getXFile)().getName()].checkResult.error) : null)), /*#__PURE__*/_react["default"].createElement("div", {
            className: "settings-desc"
          }, "In this folder, Ui.Vision creates /macros, /images, /testsuites, /datasources")))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-title"
          }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("b", null, "RealUser XModule"), " - Click / Type / Drag with OS native events"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _x_user_io.getXUserIO)().infoLink(),
            target: "_blank"
          }, "More Info"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _x_user_io.getXUserIO)().getVersion().then(function (data) {
                var installed = data.installed,
                  version = data.version;
                var msg = installed ? "Installed (v".concat(version, ")") : "Not Installed";
                _antd.message.info("status updated: ".concat(msg));
                _this8.setState((0, _utils.updateIn)(["xModuleData", (0, _x_user_io.getXUserIO)().getName()], function (orig) {
                  return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
                    config: (0, _x_user_io.getXUserIO)().getCachedConfig()
                  });
                }, _this8.state));
              });
            }
          }, "Test it")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-status"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Status:"), this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()] && this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()].installed ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Installed (v", this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()].version, ")"), /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _x_user_io.getXUserIO)().checkUpdateLink(this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()] && this.state.xModuleData[(0, _x_user_io.getXUserIO)().getName()].version, _web_extension["default"].runtime.getManifest().version)
          }, "Check for update")) : /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Not Installed"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _x_user_io.getXUserIO)().downloadLink(),
            target: "_blank"
          }, "Download it")))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-item"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-title"
          }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("b", null, "DesktopAutomation XModule"), " - Visual Desktop Automation"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xdesktop.getXDesktop)().infoLink(),
            target: "_blank"
          }, "More Info"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _xdesktop.getXDesktop)().getVersion().then(function (data) {
                var installed = data.installed,
                  version = data.version;
                var msg = installed ? "Installed (v".concat(version, ")") : "Not Installed";
                _antd.message.info("status updated: ".concat(msg));
                _this8.setState((0, _utils.updateIn)(["xModuleData", (0, _xdesktop.getXDesktop)().getName()], function (orig) {
                  return _objectSpread(_objectSpread(_objectSpread({}, orig), data), {}, {
                    config: (0, _xdesktop.getXDesktop)().getCachedConfig()
                  });
                }, _this8.state));
              });
            }
          }, "Test it")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "xmodule-status"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Status:"), this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()] && this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()].installed ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Installed (v", this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()].version, ")"), /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: (0, _xdesktop.getXDesktop)().checkUpdateLink(this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()] && this.state.xModuleData[(0, _xdesktop.getXDesktop)().getName()].version, _web_extension["default"].runtime.getManifest().version)
          }, "Check for update")) : /*#__PURE__*/_react["default"].createElement("div", {
            className: "status-box"
          }, /*#__PURE__*/_react["default"].createElement("span", null, "Not Installed"), /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _xdesktop.getXDesktop)().downloadLink(),
            target: "_blank"
          }, "Download it")))))
        }, {
          key: "backup",
          label: "Backup",
          className: "backup-pane",
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h4", null, "Automatic Backup"), /*#__PURE__*/_react["default"].createElement("p", null, "The automatic backup reminder helps to you to regularly export macros and other data as ZIP archive. As browser extension Ui.Vision must store its data", " ", /*#__PURE__*/_react["default"].createElement("em", null, "inside the browser extension"), ". This means that when you uninstall the extension, the data is removed, too. Therefore it is good to have backups! Note that if the hard drive storage mode of the File Access XModule is active, then the backup archive contains these files."), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("enableAutoBackup", !e.target.checked);
            },
            checked: this.props.config.enableAutoBackup
          }), /*#__PURE__*/_react["default"].createElement("span", null, "Show backup reminder every"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "number",
            min: 1,
            disabled: !this.props.config.enableAutoBackup,
            value: this.props.config.autoBackupInterval,
            onChange: function onChange(e) {
              return onConfigChange("autoBackupInterval", e.target.value);
            },
            style: {
              width: "60px"
            }
          }), /*#__PURE__*/_react["default"].createElement("span", null, " days")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement("p", null, "Backup includes ", /*#__PURE__*/_react["default"].createElement("span", {
            style: {
              fontWeight: "bold"
            }
          }, "macros, images, and CSV files"), ".")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              return _this8.props.runBackup();
            }
          }, "Run Backup Now"), /*#__PURE__*/_react["default"].createElement("span", null, " Create a backup ZIP file now.")), /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              paddingTop: "30px"
            },
            className: "row"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              var $input = document.getElementById("select_zip_file");
              if ($input) {
                $input.click();
              }
            }
          }, "Restore Data from Backup"), /*#__PURE__*/_react["default"].createElement("span", null, " ", "Select a backup ZIP file to import it (", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=bkup_import",
            target: "_blank"
          }, "more info"), ").", " "), /*#__PURE__*/_react["default"].createElement("input", {
            type: "file",
            accept: ".zip",
            id: "select_zip_file",
            ref: function ref(_ref7) {
              _this8.zipFileInput = _ref7;
            },
            style: {
              display: "none"
            },
            onChange: function onChange(e) {
              setTimeout(function () {
                _this8.zipFileInput.value = null;
              }, 500);
              var file = e.target.files[0];
              (0, _restore.restoreBackup)({
                file: file,
                storage: (0, _storage.getStorageManager)().getCurrentStrategyType()
              }).then(function (result) {
                (0, _storage.getStorageManager)().emit(_storage.StorageManagerEvent.ForceReload);
                _antd.message.success("Backup restored");
                _this8.props.addLog("info", ["Backup restored:", "".concat(result.count.macro, " macros"), "".concat(result.count.testSuite, " test suites"), "".concat(result.count.csv, " csvs"), "".concat(result.count.screenshot, " screenshots"), "".concat(result.count.vision, " vision images")].join("\n"));
              }, function (e) {
                _antd.message.error("Failed to restore: " + e.message);
                console.error(e);
              });
            }
          })))
        }, {
          key: 'security',
          label: 'Security',
          className: 'security-pane',
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h4", null, "Master password for Password Encryption"), /*#__PURE__*/_react["default"].createElement("p", null, "A master password is used to encrypt and decrypt all stored website passwords. The websites passwords are encrypted using strong encryption.\xA0\xA0", /*#__PURE__*/_react["default"].createElement("a", {
            target: "_blank",
            href: "https://goto.ui.vision/x/idehelp?help=encryption"
          }, "More info >>")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            value: this.props.config.shouldEncryptPassword
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "no",
            onClick: function onClick() {
              return onConfigChange("shouldEncryptPassword", "no");
            }
          }, "Do not encrypt passwords"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "master_password",
            onClick: function onClick() {
              return onConfigChange("shouldEncryptPassword", "master_password");
            }
          }, "Enter master password here to store it")), this.props.config.shouldEncryptPassword === "master_password" ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Master password:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "password",
            style: {
              width: "200px"
            },
            value: this.props.config.masterPassword,
            onChange: function onChange(e) {
              return onConfigChange("masterPassword", e.target.value);
            }
          })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("hr", {
            style: {
              margin: "20px 0"
            }
          }), /*#__PURE__*/_react["default"].createElement("h4", null, "Create encrypted text string"), /*#__PURE__*/_react["default"].createElement("p", null, "The feature uses the master password to encrypt text. The encrypted string can be used with TYPE, SENDKEY and XTYPE."), /*#__PURE__*/_react["default"].createElement("div", {
            className: "input-line"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "input-label"
          }, "Text to encrypt:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: this.state.showText ? "text" : "password",
            style: {
              width: "200px"
            },
            value: this.state.textToEncrypt,
            onChange: function onChange(e) {
              _this8.setState({
                textToEncrypt: e.target.value,
                encryptedText: ""
              });
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              _this8.setState({
                showText: !e.target.checked
              });
            },
            checked: this.state.showText
          }, "Show text")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "input-line"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "input-label"
          }, "Encrypted string:"), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            readOnly: true,
            type: "text",
            style: {
              width: "200px"
            },
            value: this.state.encryptedText
          })), /*#__PURE__*/_react["default"].createElement("div", {
            className: "input-line"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "input-label"
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              (0, _encrypt.encrypt)(_this8.state.textToEncrypt).then(function (text) {
                _this8.setState({
                  encryptedText: text
                });
                (0, _copyToClipboard["default"])(text, {
                  format: "text/plain"
                });
                _antd.message.success("Copied to clipboard");
              });
            }
          }, "Encrypt & Copy"), /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=encrypt",
            target: "_blank"
          }, "(More info)")))) : null))
        }, {
          key: "selenium",
          label: "Selenium",
          className: "selenium-pane",
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h4", null, "Import Selenium IDE Projects"), /*#__PURE__*/_react["default"].createElement("p", null, "Import web tests created in the classic Selenium IDE. Unknown commands (if any) are imported as comments. If you want us to add a certain not yet supported command, or find any other import issues, please let us know in the", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=forum",
            target: "_blank"
          }, "user forum"), "."), /*#__PURE__*/_react["default"].createElement("div", {
            className: "import-row"
          }, /*#__PURE__*/_react["default"].createElement("input", {
            type: "file",
            accept: ".side",
            id: "select_side_file",
            ref: function ref(_ref8) {
              _this8.sideFileInput = _ref8;
            },
            style: {
              display: "none"
            },
            onChange: function onChange(e) {
              setTimeout(function () {
                _this8.sideFileInput.value = null;
              }, 500);
              var file = e.target.files[0];
              (0, _ts_utils.readFileAsText)(file).then(function (sideText) {
                var sideProject = JSON.parse(sideText);
                (0, _convert.importSideProject)(sideProject).then(function (result) {
                  var lines = ["Project \"".concat(result.projectName, "\" import into folder: \"").concat(result.folderName, "\""), "- ".concat(result.macros.successCount, " ").concat(result.macros.successCount === 1 ? "macro" : "macros", " (imported)"), "- ".concat(result.suites.ignoreCount, " ").concat(result.suites.ignoreCount === 1 ? "test suite" : "test suites", " (test suites are not imported yet)")];
                  _this8.props.addLog("info", lines.join("\n"));
                  _antd.message.success("Project \"".concat(result.projectName, "\" import into folder: \"").concat(result.folderName, "\""));
                })["catch"](function (e) {
                  _antd.message.error(e.message);
                });
              });
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              var $el = document.querySelector("#select_side_file");
              if ($el) {
                $el.click();
              }
            }
          }, "Import .SIDE projects"), /*#__PURE__*/_react["default"].createElement("span", null, "Imports projects from Selenium IDE V3.x (", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=import_side",
            target: "_blank"
          }, "more info"), ")")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "import-row"
          }, /*#__PURE__*/_react["default"].createElement("input", {
            multiple: true,
            type: "file",
            accept: ".html",
            id: "select_html_files_for_macros",
            ref: function ref(_ref9) {
              _this8.jsonFileInput = _ref9;
            },
            style: {
              display: "none"
            },
            onChange: function onChange(e) {
              setTimeout(function () {
                _this8.jsonFileInput.value = null;
              }, 500);
              return _this8.props.readFilesAndImportTestCases({
                files: e.target.files,
                type: "text",
                process: function process(content, fileName) {
                  return {
                    macros: [(0, _convert_utils.fromHtml)(content, fileName)],
                    csvs: [],
                    images: []
                  };
                }
              });
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            onClick: function onClick() {
              var $el = document.querySelector("#select_html_files_for_macros");
              if ($el) {
                $el.click();
              }
            }
          }, "Import .HTML projects"), /*#__PURE__*/_react["default"].createElement("span", null, "Import projects from Selenium IDE V2.x (", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=import_html",
            target: "_blank"
          }, "more info"), ")")), /*#__PURE__*/_react["default"].createElement("h4", null, "Web Recording Options"), /*#__PURE__*/_react["default"].createElement(_antd.Form, null, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Notification"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("recordNotification", !e.target.checked);
            },
            checked: this.props.config.recordNotification
          }, "Show notifications when recording"))), /*#__PURE__*/_react["default"].createElement("h4", null, "Proxy Options"), /*#__PURE__*/_react["default"].createElement(_antd.Form, null, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Default Proxy (IP:Port)"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "text",
            style: {
              width: "300px"
            },
            value: this.props.config.defaultProxy,
            onChange: function onChange(e) {
              return onConfigChange("defaultProxy", e.target.value);
            },
            placeholder: "eg. http://0.0.0.0:1234"
          })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "User name, Password"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            type: "text",
            style: {
              width: "300px"
            },
            value: this.props.config.defaultProxyAuth,
            onChange: function onChange(e) {
              return onConfigChange("defaultProxyAuth", e.target.value);
            },
            placeholder: "eg. admin, mypassword"
          })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, _extends({
            label: "Status"
          }, displayConfig), /*#__PURE__*/_react["default"].createElement(_antd.Radio.Group, {
            value: this.props.proxy ? "on" : "off"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "on",
            onClick: function onClick() {
              return onChangeProxyStatus('on');
            }
          }, "Proxy ON"), /*#__PURE__*/_react["default"].createElement(_antd.Radio, {
            value: "off",
            onClick: function onClick() {
              return onChangeProxyStatus('off');
            }
          }, "Proxy OFF")), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return onConfigChange("turnOffProxyAfterReplay", !e.target.checked);
            },
            checked: this.props.config.turnOffProxyAfterReplay,
            style: {
              marginTop: "10px"
            }
          }, "Turn off at end of replay (Proxy controlled by", " ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?cmd=setproxy",
            target: "_blank"
          }, "setProxy command"), ")"))))
        }, {
          key: 'register',
          label: 'Pro|Enterprise',
          className: 'register-pane',
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _utils.cn)("register-note", {
              inactive: !(0, _license.getLicenseService)().hasNoLicense()
            })
          }, /*#__PURE__*/_react["default"].createElement("p", null, "Open-Source Ui.Vision PRO and Enterprise Editions are available for users requiring Enterprise capabilities, including direct file storage, update management, and priority support services. Should you have already acquired a license key for either the PRO or Enterprise Edition, please proceed to enter it below:"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "actions"
          }, /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _license.getLicenseService)().getUpgradeUrl(),
            target: "_blank"
          }, "Click here to upgrade."))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "register-form"
          }, /*#__PURE__*/_react["default"].createElement("label", null, "Enter license key:"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "register-row"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            value: this.state.registerKey,
            type: "text",
            onChange: function onChange(e) {
              _this8.setState({
                registerKey: e.target.value
              });
            }
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            type: "primary",
            loading: this.state.isCheckingLicense,
            onClick: this.checkRegisterKey
          }, "Check Key"))), /*#__PURE__*/_react["default"].createElement("div", {
            className: "register-status"
          }, (0, _license.getLicenseService)().hasNoLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "License status: "), /*#__PURE__*/_react["default"].createElement("b", null, this.isEitherXModuleInstalled() ? (0, _license.getLicenseService)().getEditionName() + " active" : "Not installed"), ".", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _license.getLicenseService)().getUpgradeUrl(),
            target: "_blank"
          }, "Upgrade to Ui.Vision PRO or Enterprise")) : null, (0, _license.getLicenseService)().isPersonalLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, "XModules status:", " ", /*#__PURE__*/_react["default"].createElement("b", null, (0, _license.getLicenseService)().getEditionName(), " active"), ".", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _license.getLicenseService)().getUpgradeUrl(),
            target: "_blank"
          }, "Upgrade to PRO or Enterprise")) : null, (0, _license.getLicenseService)().isProLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, "XModules status:", " ", /*#__PURE__*/_react["default"].createElement("b", null, (0, _license.getLicenseService)().getEditionName(), " active"), ".", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _license.getLicenseService)().getUpgradeUrl(),
            target: "_blank"
          }, "Contact Support")) : null, (0, _license.getLicenseService)().isPlayerLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, "XModules status:", " ", /*#__PURE__*/_react["default"].createElement("b", null, (0, _license.getLicenseService)().getEditionName(), " active"), ".", /*#__PURE__*/_react["default"].createElement("a", {
            href: (0, _license.getLicenseService)().getUpgradeUrl(),
            target: "_blank"
          }, "Contact Support")) : null))
        }]
      }));
    }
  }, {
    key: "renderStatus",
    value: function renderStatus() {
      var _this$props = this.props,
        status = _this$props.status,
        player = _this$props.player;
      var renderInner = function renderInner() {
        switch (status) {
          case C.APP_STATUS.RECORDER:
            return "Recording";
          case C.APP_STATUS.PLAYER:
            {
              switch (player.status) {
                case C.PLAYER_STATUS.PLAYING:
                  {
                    var nextCommandIndex = player.nextCommandIndex,
                      loops = player.loops,
                      currentLoop = player.currentLoop,
                      timeoutStatus = player.timeoutStatus;
                    if (nextCommandIndex === null || loops === null || currentLoop === 0) {
                      return "";
                    }
                    var parts = ["Line ".concat(nextCommandIndex + 1), "Round ".concat(currentLoop, "/").concat(loops)];
                    if (timeoutStatus && timeoutStatus.type && timeoutStatus.total) {
                      var type = timeoutStatus.type,
                        total = timeoutStatus.total,
                        past = timeoutStatus.past;
                      parts.unshift("".concat(type, " ").concat(past / 1000, "s (").concat(total / 1000, ")"));
                    }
                    return parts.join(" | ");
                  }
                case C.PLAYER_STATUS.PAUSED:
                  return "Player paused";
                default:
                  return "";
              }
            }
          default:
            return "";
        }
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "status"
      }, renderInner());
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this9 = this;
      var _this$props2 = this.props,
        player = _this$props2.player,
        status = _this$props2.status;
      var onClickMenuItem = function onClickMenuItem(_ref10) {
        var key = _ref10.key;
        switch (key) {
          case "play_loop":
            {
              _this9.togglePlayLoopsModal(true);
              break;
            }
        }
      };

      // const playMenu = (
      //   <Menu onClick={onClickMenuItem} selectable={false}>
      //     <Menu.Item key="play_loop" disabled={false}>
      //       Play loop..
      //     </Menu.Item>
      //   </Menu>
      // );

      if (status === C.APP_STATUS.RECORDER) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "actions"
        }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          onClick: this.onToggleRecord,
          style: {
            color: "#ff0000"
          }
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Stop Record")));
      }
      switch (player.status) {
        case C.PLAYER_STATUS.PLAYING:
          {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: "actions"
            }, /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.getPlayer().stop();
              }
            }, /*#__PURE__*/_react["default"].createElement("span", null, "Stop")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.getPlayer("testCase").pause();
              }
            }, /*#__PURE__*/_react["default"].createElement("span", null, "Pause"))));
          }
        case C.PLAYER_STATUS.PAUSED:
          {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: "actions"
            }, /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, null, this.props.player.mode === C.PLAYER_MODE.TEST_CASE ? /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.getPlayer("testCase").resume(true);
              }
            }, "Step") : null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.getPlayer().stop();
              }
            }, "Stop"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.getPlayer("testCase").resume();
              }
            }, "Resume")));
          }
        case C.PLAYER_STATUS.STOPPED:
          {
            return /*#__PURE__*/_react["default"].createElement("div", {
              className: "actions"
            }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Record),
              onClick: this.onToggleRecord
            }, /*#__PURE__*/_react["default"].createElement("span", null, "Record")), /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, {
              className: "play-actions"
            }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              onClick: function onClick() {
                return _this9.playCurrentMacro(true);
              }
            }, "Step"), /*#__PURE__*/_react["default"].createElement(_antd.Dropdown.Button, {
              onClick: function onClick() {
                return _this9.playCurrentMacro(false);
              },
              menu: {
                items: [{
                  key: "play_loop",
                  label: "Play loop..",
                  disabled: false
                }],
                onClick: onClickMenuItem,
                selectable: false,
                trigger: ["click"]
              }
            }, /*#__PURE__*/_react["default"].createElement("span", null, "Play Macro"))), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
              shape: "circle",
              onClick: function onClick() {
                return _this9.showSettingsModal();
              }
            }, /*#__PURE__*/_react["default"].createElement(_icons.SettingOutlined, null)));
          }
      }
    }
  }, {
    key: "renderMacro",
    value: function renderMacro() {
      var _this$props3 = this.props,
        editing = _this$props3.editing,
        player = _this$props3.player,
        hasUnsaved = _this$props3.hasUnsaved;
      var src = editing.meta.src;
      var isPlayerStopped = player.status === C.PLAYER_STATUS.STOPPED;
      var klass = hasUnsaved ? "unsaved" : "";
      var saveBtnState = {
        text: src ? "Save" : "Save..",
        disabled: !hasUnsaved
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "select-case"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: src ? src.name : "Untitled",
        className: "test-case-name " + klass
      }, src ? src.name : "Untitled"), !isPlayerStopped ? null : /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: saveBtnState.disabled,
        onClick: this.onClickSave
      }, /*#__PURE__*/_react["default"].createElement("span", null, saveBtnState.text)));
    }
  }, {
    key: "render",
    value: function render() {
      var player = this.props.player;
      var isPlayerStopped = player.status === C.PLAYER_STATUS.STOPPED;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "header " + this.props.status.toLowerCase()
      }, this.renderMacro(), this.renderStatus(), this.renderActions(), this.renderPlayLoopModal(), this.renderSettingModal(), this.renderPublicWebsiteWhiteList(), this.renderSettingOfflineModal());
    }
  }]);
  return Header;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    hasUnsaved: (0, _recomputed.hasUnsavedMacro)(state),
    route: state.route,
    editing: state.editor.editing,
    player: state.player,
    status: state.status,
    config: state.config,
    ui: state.ui,
    proxy: state.proxy
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(withRouter(Header));

/***/ }),

/***/ 96063:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _antd = __webpack_require__(33061);
var _icons = __webpack_require__(29937);
var _jszip = _interopRequireDefault(__webpack_require__(71710));
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _file_saver = _interopRequireDefault(__webpack_require__(50261));
var _variables = __webpack_require__(54836);
var _utils = __webpack_require__(46580);
var _storage = __webpack_require__(97467);
var _macro_log = __webpack_require__(91433);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _edit_in_place = _interopRequireDefault(__webpack_require__(7785));
var _recomputed = __webpack_require__(87307);
var _csv_list = __webpack_require__(2797);
var _vision_list = __webpack_require__(14871);
var _screenshot_list = __webpack_require__(78607);
var _recomputed2 = __webpack_require__(87307);
var _messages = _interopRequireDefault(__webpack_require__(6866));
var _config = _interopRequireDefault(__webpack_require__(8747));
var _resource_not_loaded = __webpack_require__(11199);
var _cv_utils = __webpack_require__(7345);
var _state = __webpack_require__(78493);
var _simple_actions = __webpack_require__(8588);
var _license = __webpack_require__(12277);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import SearchBox from '@/components/search_box'
var DashboardBottom = /*#__PURE__*/function (_React$Component) {
  _inherits(DashboardBottom, _React$Component);
  function DashboardBottom() {
    var _this;
    _classCallCheck(this, DashboardBottom);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DashboardBottom, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      activeTabForLogScreenshot: 'Logs',
      showCSVModal: false,
      csvText: '',
      csvFile: '',
      drag: {
        isDragging: false,
        // Check out the note on `screenX` in `onResizeDragEnd` event
        startY: 0,
        lastHeight: 220,
        currentMinHeight: 220
      },
      searchImageText: ''
    });
    _defineProperty(_assertThisInitialized(_this), "getBottomMinHeight", function () {
      var _this$state$drag = _this.state.drag,
        isDragging = _this$state$drag.isDragging,
        lastHeight = _this$state$drag.lastHeight,
        currentMinHeight = _this$state$drag.currentMinHeight;
      return (isDragging ? currentMinHeight : lastHeight) + 'px';
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeDragStart", function (e) {
      // Note: Firefox requires us to set something to DataTransfer, otherwise drag and dragEnd won't be triggered
      // refer to https://stackoverflow.com/questions/33434275/firefox-on-drag-end-is-not-called-in-a-react-component
      e.dataTransfer.setData('text', '');
      var style = window.getComputedStyle(_this.$dom);
      var height = parseInt(style.height);
      _this.setState((0, _utils.setIn)(['drag'], {
        isDragging: true,
        startY: e.screenY,
        lastHeight: height,
        currentHeight: height
      }, _this.state));
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeDragEnd", function (e) {
      // Note: use `screenY` instead of `clientY`, because `clientY` of dragEnd events in Firefox
      // is always set to 0, while `screenY` is luckily still available. And since we only make use of
      // difference of X coordinate. `screenY` and `clientY` both work for us.
      //
      // reference:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=505521
      // https://developer.mozilla.org/en-US/docs/Web/Events/dragend
      var diff = e.screenY - _this.state.drag.startY;
      var height = _this.state.drag.lastHeight - diff;
      _this.setState((0, _utils.setIn)(['drag'], {
        isDragging: false,
        startY: 0,
        lastHeight: height,
        currentMinHeight: height
      }));
      _this.props.onBottomPanelHeightChange(height);
    });
    _defineProperty(_assertThisInitialized(_this), "onFileChange", function (e) {
      var csvStorage = (0, _storage.getStorageManager)().getCSVStorage();
      var files = [].slice.call(e.target.files);
      if (!files || !files.length) return;
      var read = function read(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (readerEvent) {
            var text = readerEvent.target.result;
            resolve({
              text: text,
              fileName: file.name
            });
          };
          reader.readAsText(file);
        });
      };
      Promise.all(files.map(read)).then(function (list) {
        var names = list.map(function (item) {
          return item.fileName;
        });
        var ps = list.map(function (fileItem) {
          return csvStorage.write((0, _utils.sanitizeFileName)(fileItem.fileName), new Blob([fileItem.text]));
        });
        return Promise.all(ps).then(function () {
          return _this.props.listCSV();
        }).then(function () {
          _antd.message.info("".concat(list.length, " csv files imported"));
          _this.props.addLog('info', "".concat(list.length, " csv files imported: ").concat(names.join(', ')));
        });
      })["catch"](function (e) {
        _this.props.addLog('error', e.message);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "removeCSV", function (csv) {
      var csvStorage = (0, _storage.getStorageManager)().getCSVStorage();
      csvStorage.remove(csv.name).then(function () {
        return _this.props.listCSV();
      }).then(function () {
        _antd.message.success("successfully deleted");
        _this.props.addLog('info', "".concat(csv.name, " deleted"));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "viewCSV", function (csv) {
      window.open("./csv_editor.html?csv=".concat(csv.name), '', 'width=600,height=500,scrollbars=true');
    });
    _defineProperty(_assertThisInitialized(_this), "downloadCSV", function (csv) {
      (0, _storage.getStorageManager)().getCSVStorage().read(csv.fullPath, 'Text').then(function (text) {
        var blob = new Blob([text]);
        _file_saver["default"].saveAs(blob, csv.name);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onImageFileChange", function (e) {
      var files = [].slice.call(e.target.files);
      if (!files || !files.length) return;
      var read = function read(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (readerEvent) {
            try {
              var dataUrl = readerEvent.target.result;
              var obj = storeImage({
                dataUrl: dataUrl,
                name: file.name
              });
              resolve(obj);
            } catch (e) {
              resolve({
                err: e,
                fileName: file.name
              });
            }
          };
          reader.readAsDataURL(file);
        });
      };
      var storeImage = function storeImage(_ref) {
        var dataUrl = _ref.dataUrl,
          name = _ref.name;
        return (0, _utils.uniqueName)(name, {
          check: function check(name) {
            return (0, _storage.getStorageManager)().getVisionStorage().exists(name).then(function (result) {
              return !result;
            });
          }
        }).then(function (fileName) {
          return (0, _storage.getStorageManager)().getVisionStorage().write((0, _utils.sanitizeFileName)(fileName), (0, _utils.dataURItoBlob)(dataUrl)).then(function () {
            return fileName;
          });
        })["catch"](function (e) {
          _log["default"].error(e.stack);
        });
      };
      Promise.all(files.map(read)).then(function (fileNames) {
        _antd.message.success("".concat(fileNames.length, " image files imported into Vision tab"));
        _this.props.addLog('info', "".concat(fileNames.length, " image files imported: ").concat(fileNames.join(', ')));
        _this.props.listVisions();
      })["catch"](function (e) {
        _log["default"].error(e.stack);
        _this.props.addLog('error', e.message);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "viewVision", function (filePath) {
      window.open("./vision_editor.html?vision=".concat(filePath), '', 'width=600,height=500,scrollbars=true');
    });
    _defineProperty(_assertThisInitialized(_this), "renameVision", function (oldName, newName) {
      return (0, _storage.getStorageManager)().getVisionStorage().rename(oldName, (0, _utils.ensureExtName)('.png', newName)).then(function () {
        _antd.message.success('Successfully renamed');
        _this.props.listVisions();
      })["catch"](function (e) {
        _antd.message.error(e.message);
        throw e;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "isVisionNameValid", function (name) {
      return Promise.resolve((0, _utils.withFileExtension)(name, function (baseName) {
        try {
          (0, _utils.validateStandardName)(baseName, true);
        } catch (e) {
          _antd.message.error(e.message);
          throw e;
        }
        return baseName;
      })).then(function () {
        return (0, _storage.getStorageManager)().getVisionStorage().exists(name).then(function (result) {
          if (result) {
            _antd.message.error("'".concat(name, "' already exists"));
          }
          return !result;
        });
      }, function () {
        return false;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "duplicateVision", function (name) {
      _this.props.duplicateVisionImage(name);
    });
    _defineProperty(_assertThisInitialized(_this), "deleteVision", function (name) {
      return _antd.Modal.confirm({
        title: 'Sure to delete?',
        okText: 'Delete',
        onOk: function onOk() {
          return (0, _storage.getStorageManager)().getVisionStorage().remove(name).then(function () {
            _antd.message.success('Successfully deleted');
            _this.props.listVisions();
          })["catch"](function (e) {
            _log["default"].error(e);
          });
        },
        onCancel: function onCancel() {
          return Promise.resolve(true);
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "addVisionNameToTargetBox", function (filePath) {
      var _this$props = _this.props,
        config = _this$props.config,
        selectedCmd = _this$props.selectedCommand;
      var selectedCmdIsVisualSearch = function () {
        if (!selectedCmd) return false;
        if ((0, _cv_utils.isCVTypeForDesktop)(config.cvScope) && selectedCmd.cmd === 'visionLimitSearchArea') return true;
        return ['visionFind', 'visualSearch', 'visualAssert', 'visualVerify', 'XClick', 'XClickText', 'XClickTextRelative', 'XMoveText', 'XMove', 'XMoveText', 'XClickRelative', 'XMoveRelative', 'OCRExtract', 'OCRExtractRelative', 'OCRExtractbyTextRelative', 'visionLimitSearchAreaRelative', 'visionLimitSearchAreabyTextRelative'].indexOf(selectedCmd.cmd) !== -1;
      }();
      if (!selectedCmdIsVisualSearch) {
        return _antd.message.error("Image names can only be added to the target box if a vision related command is selected");
      }
      _this.props.updateSelectedCommand({
        target: filePath
      });
    });
    _defineProperty(_assertThisInitialized(_this), "exportAllVisions", function () {
      var zip = new _jszip["default"]();
      var visionStorage = (0, _storage.getStorageManager)().getVisionStorage();
      visionStorage.list().then(function (visions) {
        if (visions.length === 0) {
          return _antd.message.error('No vision to export');
        }
        var ps = visions.map(function (ss) {
          return visionStorage.read(ss.fullPath, 'ArrayBuffer').then(function (buffer) {
            zip.file(ss.name, buffer, {
              binary: true
            });
          });
        });
        return Promise.all(ps).then(function () {
          zip.generateAsync({
            type: 'blob'
          }).then(function (blob) {
            _file_saver["default"].saveAs(blob, 'vision-images-export.zip');
          });
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "downloadScreenshot", function (name, fullPath) {
      return (0, _storage.getStorageManager)().getScreenshotStorage().read(fullPath, 'ArrayBuffer').then(function (buffer) {
        _file_saver["default"].saveAs(new Blob([new Uint8Array(buffer)]), name);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "toggleBottom", function () {
      _this.props.updateConfig({
        showBottomArea: !_this.props.config.showBottomArea
      });
    });
    _defineProperty(_assertThisInitialized(_this), "logLinkPatterns", [[/Error #101/i, 'https://goto.ui.vision/x/idehelp?help=error101'], [/Error #120/i, 'https://goto.ui.vision/x/idehelp?help=error120'], [/Error #121/i, 'https://goto.ui.vision/x/idehelp?help=error121'], [/Error #170/i, 'https://goto.ui.vision/x/idehelp?help=error179'], [/Error #220/i, 'https://goto.ui.vision/x/idehelp?help=error220']]);
    return _this;
  }
  _createClass(DashboardBottom, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      (0, _storage.getStorageManager)().on(_storage.StorageManagerEvent.StrategyTypeChanged, function (type) {
        _this2.forceUpdate();
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;
      if (nextProps.logs.length !== this.props.logs.length) {
        var $logContent = document.querySelector('.log-content');
        if (!$logContent) {
          return;
        }

        // Note: set scroll top to a number large enough so that it will scroll to bottom
        // setTimeout 100ms to ensure content has been rendered before scroll
        setTimeout(function () {
          var $last = $logContent.children[$logContent.children.length - 1];
          if ($last) {
            $last.scrollIntoView();
          }
        }, 100);
      }
      if (nextProps.visions.length > this.props.visions.length) {
        var diff = nextProps.visions.filter(function (item) {
          return !_this3.props.visions.find(function (v) {
            return v.name === item.name;
          });
        });
        if (diff.length > 1) {
          diff.sort(function (a, b) {
            return a.createTime > b.createTime;
          });
        }
        var toFocus = diff[0];
        setTimeout(function () {
          var $dom = document.getElementById(toFocus.name);
          if (!$dom) return;
          $dom.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, {
    key: "logStyle",
    value: function logStyle(log) {
      // console.log('logStyle:>> ', log)
      // this comes from 'aiComputerUse'
      if (log.type === 'a') {
        return {
          color: 'green'
        };
      }
      if (log.options && log.options.color) {
        return {
          color: log.options.color
        };
      }
      if (log.options && log.options.ignored) {
        return {
          color: 'orange'
        };
      }
    }
  }, {
    key: "prefixHardDisk",
    value: function prefixHardDisk(str) {
      var isXFileMode = (0, _storage.getStorageManager)().isXFileMode();
      if (!isXFileMode) return str;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'inline-block'
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "./img/hard-drive.svg",
        style: {
          position: 'relative',
          top: '3px',
          marginRight: '5px',
          height: '15px'
        }
      }), /*#__PURE__*/_react["default"].createElement("span", null, str));
    }
  }, {
    key: "shouldUseFileSaverForDownloadingScreenshot",
    value: function shouldUseFileSaverForDownloadingScreenshot() {
      if (_web_extension["default"].isFirefox()) {
        return true;
      }
      return (0, _storage.getStorageManager)().isXFileMode();
    }
  }, {
    key: "shouldRenderLogStack",
    value: function shouldRenderLogStack(log) {
      if (log.stack.length <= 1) {
        return false;
      }
      switch (log.type) {
        case 'error':
        case 'warning':
          return true;
        case 'status':
          return /^Running/.test(log.text);
        default:
          return false;
      }
    }
  }, {
    key: "renderCSVModal",
    value: function renderCSVModal() {
      var _this4 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "Preview - ".concat(this.state.csvFile),
        open: this.state.showCSVModal,
        onCancel: function onCancel() {
          return _this4.setState({
            showCSVModal: false,
            csvText: '',
            csvFile: ''
          });
        },
        className: "csv-preview-modal",
        footer: null
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input.TextArea, {
        style: {
          width: '100%'
        },
        value: this.state.csvText,
        readOnly: true,
        rows: 10
      }));
    }
  }, {
    key: "renderCSVTable",
    value: function renderCSVTable() {
      var _this5 = this;
      if (!this.props.shouldLoadResources) {
        return /*#__PURE__*/_react["default"].createElement(_resource_not_loaded.ResourceNotLoaded, {
          name: "CSV list",
          from: this.props.from,
          showList: function showList() {
            _this5.props.setFrom(_state.RunBy.Manual);
          }
        });
      }
      if (this.state.activeTabForLogScreenshot !== 'CSV') {
        return null;
      }
      if (this.props.isPlaying && this.props.csvs.length > _config["default"].performanceLimit.fileCount) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "hidden-during-replay"
        }, _messages["default"].contentHidden);
      }
      return /*#__PURE__*/_react["default"].createElement(_csv_list.CsvList, {
        list: this.props.csvs,
        viewCSV: this.viewCSV,
        removeCSV: this.removeCSV,
        downloadCSV: this.downloadCSV
      });
    }
  }, {
    key: "renderVisionSection",
    value: function renderVisionSection() {
      var _this6 = this;
      if (!this.props.shouldLoadResources) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "vision-content"
        }, /*#__PURE__*/_react["default"].createElement(_resource_not_loaded.ResourceNotLoaded, {
          name: "Image list",
          from: this.props.from,
          showList: function showList() {
            _this6.props.setFrom(_state.RunBy.Manual);
          }
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-top-actions"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "main-actions"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "main-actions-left"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "load-image-button ant-btn ant-btn-primary"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "select_image_files"
      }, "Load Image"), /*#__PURE__*/_react["default"].createElement("input", {
        multiple: true,
        type: "file",
        accept: "image/*",
        id: "select_image_files",
        onChange: this.onImageFileChange,
        ref: function ref(_ref2) {
          _this6.imageFileInput = _ref2;
        },
        style: {
          display: 'none'
        }
      })), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        onClick: this.exportAllVisions
      }, "Export All")), /*#__PURE__*/_react["default"].createElement(_antd.Input.Search, {
        style: {
          flex: 0.8
        },
        placeholder: "Search image",
        onChange: function onChange(e) {
          return _this6.setState({
            searchImageText: e.target.value
          });
        }
      })), /*#__PURE__*/_react["default"].createElement("a", {
        className: "more-info",
        target: "_blank",
        href: "https://goto.ui.vision/x/idehelp?help=visual"
      }, "More Info")), this.renderVisionTable());
    }
  }, {
    key: "renderVisionTable",
    value: function renderVisionTable() {
      if (this.state.activeTabForLogScreenshot !== 'Vision') {
        return null;
      }
      if (this.props.isPlaying && this.props.visions.length > _config["default"].performanceLimit.fileCount) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "hidden-during-replay"
        }, _messages["default"].contentHidden);
      }
      if (!this.$dom) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(_vision_list.VisionList, {
        visions: this.props.visions,
        intersectRoot: this.$dom,
        query: this.state.searchImageText,
        isNameValid: this.isVisionNameValid,
        renameVision: this.renameVision,
        viewVision: this.viewVision,
        duplicateVision: this.duplicateVision,
        deleteVision: this.deleteVision,
        copyNameToTarget: this.addVisionNameToTargetBox
      });
    }
  }, {
    key: "renderScreenshots",
    value: function renderScreenshots() {
      if (this.state.activeTabForLogScreenshot !== 'Screenshots') {
        return null;
      }
      if (!this.$dom) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(_screenshot_list.ScreenshotList, {
        screenshots: this.props.screenshots,
        intersectRoot: this.$dom,
        downloadScreenshot: this.downloadScreenshot
      });
    }
  }, {
    key: "renderVariableTable",
    value: function renderVariableTable() {
      if (this.state.activeTabForLogScreenshot !== 'Variables') {
        return null;
      }
      var columns = [{
        title: 'Name',
        dataIndex: 'key',
        key: 'key',
        width: '40%'
      }, {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        render: function render(val) {
          return JSON.stringify(val) || 'undefined';
        }
      }];
      var _this$props$config = this.props.config,
        showCommonInternalVariables = _this$props$config.showCommonInternalVariables,
        showAdvancedInternalVariables = _this$props$config.showAdvancedInternalVariables;
      var filter = (0, _variables.createVarsFilter)({
        withCommonInternal: showCommonInternalVariables,
        withAdvancedInternal: showAdvancedInternalVariables
      });
      var variables = this.props.variables.filter(function (variable) {
        return filter(variable.key);
      });
      var tableConfig = {
        columns: columns,
        dataSource: variables,
        pagination: false,
        bordered: true,
        size: 'middle',
        rowKey: 'key',
        onRowClick: function onRowClick(record, index, e) {
          // Do nothing
        },
        rowClassName: function rowClassName(record, index) {
          var vars = (0, _variables.getVarsInstance)();
          if (!vars) return '';
          return vars.isReadOnly(record.key) ? 'read-only' : '';
        }
      };
      return /*#__PURE__*/_react["default"].createElement(_antd.Table, tableConfig);
    }
  }, {
    key: "renderLogStack",
    value: function renderLogStack(log) {
      var _this7 = this;
      // Don't care about the top element in stack
      var stack = log.stack.slice(0, -1).reverse();
      if (stack.length === 0) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginLeft: '80px'
        }
      }, stack.map(function (item, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i
        }, "At ", /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: function onClick(e) {
            e.preventDefault();
            if (typeof item.commandIndex === 'number' && item.macroId) {
              _this7.props.gotoLineInMacro(item.macroId, item.commandIndex);
            }
          }
        }, "Line ", item.commandIndex + 1, " in ", item.macroName));
      }));
    }
  }, {
    key: "appendLinkIfPatternMatched",
    value: function appendLinkIfPatternMatched(text) {
      var linksToAdd = [];
      this.logLinkPatterns.forEach(function (item) {
        var _item = _slicedToArray(item, 3),
          patternReg = _item[0],
          link = _item[1],
          _item$ = _item[2],
          anchorText = _item$ === void 0 ? '(more info)' : _item$;
        if (patternReg.test(text)) {
          linksToAdd.push( /*#__PURE__*/_react["default"].createElement("a", {
            href: link,
            "class": "info",
            target: "_blank",
            style: {
              marginLeft: '8px'
            }
          }, anchorText));
        }
      });
      if (linksToAdd.length === 0) {
        return text;
      }
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", null, text), linksToAdd);
    }
  }, {
    key: "renderLogText",
    value: function renderLogText(log) {
      var _this8 = this;
      if (typeof log.text === 'function') {
        return log.text({
          renderText: this.renderLogText.bind(this)
        });
      }
      if (['error', 'warning'].indexOf(log.type) === -1) {
        return log.text;
      }
      var content = function () {
        if (/XClick\/XClickText\/XClickTextRelative\/XMoveText\/XMove\/XType \d+ commands limit reached/.test(log.text) || /OCR conversion limit reached/.test(log.text) || /PROXY \d+ commands? limit reached/.test(log.text)) {
          var licenceType = function () {
            if ((0, _license.getLicenseService)().hasNoLicense()) {
              return 'PRO';
            }
            if ((0, _license.getLicenseService)().isPersonalLicense()) {
              return 'PRO2 or Enterprise';
            }
            return null;
          }();
          if (!licenceType) return log.text;
          return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", null, log.text), /*#__PURE__*/_react["default"].createElement("a", {
            href: "#",
            style: {
              marginLeft: '10px'
            },
            onClick: function onClick(e) {
              e.preventDefault();
              _this8.props.updateUI({
                showSettings: true,
                settingsTab: 'register'
              });
            }
          }, "Get a ", licenceType, " license key to remove this limit"));
        }
        if (/(XModule|xFile) is not installed yet/.test(log.text)) {
          return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", null, log.text), /*#__PURE__*/_react["default"].createElement("a", {
            href: "#",
            style: {
              marginLeft: '10px'
            },
            onClick: function onClick(e) {
              e.preventDefault();
              _this8.props.updateUI({
                showSettings: true,
                settingsTab: 'xmodules'
              });
            }
          }, "Install now"));
        }
        if (/OCR feature disabled/.test(log.text)) {
          return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", null, "OCR feature disabled. Please enable it in the "), /*#__PURE__*/_react["default"].createElement("a", {
            href: "#",
            onClick: function onClick(e) {
              e.preventDefault();
              _this8.props.updateUI({
                showSettings: true,
                settingsTab: 'ocr'
              });
            }
          }, "OCR Settings"));
        }
        return _this8.appendLinkIfPatternMatched(log.text);
      }();
      var stack = log.stack || [];
      var source = stack[stack.length - 1];
      if (!source) {
        return content;
      }
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();
          if (typeof source.commandIndex === 'number' && source.macroId) {
            _this8.props.gotoLineInMacro(source.macroId, source.commandIndex);
          }
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Line ", source.commandIndex + 1), !source.isSubroutine ? null : /*#__PURE__*/_react["default"].createElement("span", null, " (Sub: ", source.macroName, ")")), /*#__PURE__*/_react["default"].createElement("span", null, ": "), content);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;
      var activeTabForLogScreenshot = this.state.activeTabForLogScreenshot;
      var filters = {
        'All': function All() {
          return true;
        },
        'Echo': function Echo(item) {
          return item.type === 'echo' || item.type === 'error' && (!item.options || !item.options.ignored);
        },
        'Echo_And_Status': function Echo_And_Status(item) {
          return item.type === 'echo' || item.type === 'error' && (!item.options || !item.options.ignored) || item.type === 'status';
        },
        // 'Info':   (item) => item.type === 'info' || item.type === 'echo' || item.type === 'reflect' || item.type === 'status',
        'Error': function Error(item) {
          return item.type === 'error' || item.type === 'report';
        },
        'None': function None() {
          return false;
        }
      };
      var logFilter = this.props.config.logFilter || 'All';
      var logs = this.props.logs.filter(filters[logFilter] || function () {
        return true;
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('logs-screenshots', {
          fold: !this.props.config.showBottomArea
        }),
        ref: function ref(el) {
          _this9.$dom = el;
        },
        style: {
          height: this.getBottomMinHeight()
        }
      }, this.renderCSVModal(), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('resize-handler', {
          focused: this.state.drag.isDragging
        }),
        draggable: "true",
        onDragStart: this.onResizeDragStart,
        onDragEnd: this.onResizeDragEnd,
        onMouseDown: function onMouseDown() {
          return _this9.setState((0, _utils.setIn)(['drag', 'isDragging'], true, _this9.state));
        }
      }), /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
        type: "card",
        style: {
          height: '30%'
        },
        onChange: function onChange(key) {
          _this9.setState({
            activeTabForLogScreenshot: key
          });
          if (key === 'Screenshots') {
            _this9.props.listScreenshots();
          }
        },
        items: [{
          label: 'Logs',
          key: 'Logs',
          children: /*#__PURE__*/_react["default"].createElement("ul", {
            className: "log-content"
          }, logs.map(function (log, i) {
            return /*#__PURE__*/_react["default"].createElement("li", {
              className: log.type,
              key: log.id,
              style: _this9.logStyle(log)
            }, /*#__PURE__*/_react["default"].createElement("span", {
              className: "log-type"
            }, (0, _macro_log.renderLogType)(log)), /*#__PURE__*/_react["default"].createElement("pre", {
              className: "log-detail"
            }, _this9.renderLogText(log)), _this9.shouldRenderLogStack(log) ? _this9.renderLogStack(log) : null);
          }))
        }, {
          label: 'Variables',
          key: 'Variables',
          children: /*#__PURE__*/_react["default"].createElement("div", {
            className: "variable-content"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "variable-options"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return _this9.props.updateConfig({
                showCommonInternalVariables: e.target.checked
              });
            },
            checked: this.props.config.showCommonInternalVariables
          }, "Show most common ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=internalvars",
            target: "_blank"
          }, "internal variables")), /*#__PURE__*/_react["default"].createElement(_antd.Checkbox, {
            onClick: function onClick(e) {
              return _this9.props.updateConfig({
                showAdvancedInternalVariables: e.target.checked
              });
            },
            checked: this.props.config.showAdvancedInternalVariables
          }, "Show advanced ", /*#__PURE__*/_react["default"].createElement("a", {
            href: "https://goto.ui.vision/x/idehelp?help=internalvars",
            target: "_blank"
          }, "internal variables"))), this.renderVariableTable())
        }, {
          label: this.prefixHardDisk('Screenshots'),
          key: 'Screenshots',
          children: this.renderScreenshots()
        }, {
          label: this.prefixHardDisk('CSV'),
          key: 'CSV',
          children: /*#__PURE__*/_react["default"].createElement("div", {
            className: "csv-content"
          }, this.renderCSVTable())
        }, {
          label: this.prefixHardDisk('👁Visual'),
          key: 'Vision',
          children: this.renderVisionSection()
        }]
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ls-toolbox"
      }, activeTabForLogScreenshot === 'Logs' ? [/*#__PURE__*/_react["default"].createElement(_antd.Select, {
        key: "log-filter",
        value: this.props.config.logFilter,
        onChange: function onChange(value) {
          _this9.props.updateConfig({
            logFilter: value
          });
        },
        style: {
          width: '60px'
        },
        popupMatchSelectWidth: false,
        size: "small"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: "All"
      }, "All"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: "Echo"
      }, "Echo"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: "Echo_And_Status"
      }, "Echo & Status"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: "Error"
      }, "Error & Reports"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: "None"
      }, "No log")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        key: "clear-logs",
        size: "small",
        onClick: this.props.clearLogs
      }, "Clear")] : null, activeTabForLogScreenshot === 'Screenshots' ? /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        onClick: this.props.clearScreenshots
      }, "Clear") : null, activeTabForLogScreenshot === 'CSV' && this.props.shouldLoadResources ? /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        onClick: function onClick() {
          if ((0, _storage.getStorageManager)().isXFileMode()) {
            _antd.Modal.info({
              title: 'In hard-drive mode, there is no need to import CSV files.',
              content: 'To view the latest /datasource folder content, press the "Refresh" icon next to the word "Storage mode" on the left.'
            });
          } else {
            _this9.fileInput.click();
          }
        }
      }, "Import CSV", /*#__PURE__*/_react["default"].createElement("input", {
        multiple: true,
        type: "file",
        accept: ".csv",
        onChange: this.onFileChange,
        style: {
          display: 'none'
        },
        ref: function ref(_ref3) {
          _this9.fileInput = _ref3;
        }
      })) : null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        onClick: this.toggleBottom
      }, this.props.config.showBottomArea ? /*#__PURE__*/_react["default"].createElement(_icons.DownOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.UpOutlined, null))));
    }
  }]);
  return DashboardBottom;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    hasSelectedCommand: state.editor.editing && state.editor.editing.meta && state.editor.editing.meta.selectedIndex !== -1,
    selectedCommand: (0, _recomputed.editorSelectedCommand)(state),
    shouldLoadResources: (0, _recomputed2.getShouldLoadResources)(state),
    isPlaying: (0, _recomputed2.isPlaying)(state),
    status: state.status,
    from: state.from,
    logs: state.logs,
    screenshots: state.screenshots,
    variables: state.variables,
    csvs: state.csvs,
    visions: state.visions,
    config: state.config
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(DashboardBottom);

/***/ }),

/***/ 54810:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _antd = __webpack_require__(33061);
var _icons = __webpack_require__(29937);
var _keycode = _interopRequireDefault(__webpack_require__(36545));
var _reactCodemirror = __webpack_require__(82349);
__webpack_require__(15237);
__webpack_require__(16792);
__webpack_require__(97923);
__webpack_require__(55218);
__webpack_require__(9914);
var _reactVirtualized = __webpack_require__(56692);
var _reactDraggable = _interopRequireDefault(__webpack_require__(55794));
__webpack_require__(62227);
var _select_input = __webpack_require__(15210);
var _command_item = __webpack_require__(14603);
var _storage = __webpack_require__(97467);
var _inspector = _interopRequireDefault(__webpack_require__(51152));
var _player = __webpack_require__(18392);
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _recomputed = __webpack_require__(87307);
var _ts_utils = __webpack_require__(1601);
var _command = __webpack_require__(85393);
var _state = __webpack_require__(78493);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _utils = __webpack_require__(46580);
var _license = __webpack_require__(12277);
var _types = __webpack_require__(58704);
var _cv_utils = __webpack_require__(7345);
var _desktop_vision = __webpack_require__(76811);
var _computer = _interopRequireDefault(__webpack_require__(61533));
var _browser = _interopRequireDefault(__webpack_require__(77458));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Replace with appropriate icon
// import VirtualList from 'kd-react-virtual-list'
var newCommand = {
  cmd: '',
  target: '',
  value: ''
};
var defaultDataSource = [newCommand];
var ITEM_HEIGHT = _config["default"].ui.commandItemHeight;
var DashboardEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(DashboardEditor, _React$Component);
  function DashboardEditor(props) {
    var _this;
    _classCallCheck(this, DashboardEditor);
    _this = _callSuper(this, DashboardEditor, [props]);
    _defineProperty(_assertThisInitialized(_this), "state", {
      cursor: null,
      newMacroSelected: true,
      contextMenu: {
        x: null,
        y: null,
        isShown: false
      },
      visionFindPreview: {
        visible: false,
        url: null,
        timer: null,
        left: -9999,
        top: -9999
      },
      targetEditor: {
        visible: false,
        text: ''
      },
      tableWidth: 0,
      // primary width
      tableHeight: 0,
      // primary height
      headerWidthPatchFactor: 1.6,
      // patch factor for header width

      columnWidths: {
        serialFixed: 30,
        cmd: .3,
        target: .4,
        value: .3,
        opsFixed: 80
      },
      userInputCmdValue: ''
    });
    _defineProperty(_assertThisInitialized(_this), "resetSourceCodeCursor", function (resetCursor) {
      return _objectSpread({}, resetCursor ? {
        cursor: {
          line: 0,
          ch: 0
        }
      } : {});
    });
    _defineProperty(_assertThisInitialized(_this), "onDetailChange", function (key, value) {
      _this.props.updateSelectedCommand(_defineProperty({}, key, value));
    });
    _defineProperty(_assertThisInitialized(_this), "onChangeCommandsView", function (type) {
      switch (type) {
        case 'table_view':
        case 'source_view':
          {
            var forceType = _this.props.sourceErrMsg ? 'source_view' : type;
            _this.props.setEditorActiveTab(forceType);
            if (type === 'source_view') {
              setTimeout(function () {
                if (_this.state.newMacroSelected) {
                  _this.setState({
                    newMacroSelected: false
                  });
                  _this.codeMirrorRef.current.editor.focus();
                  _this.codeMirrorRef.current.editor.setCursor({
                    line: 0,
                    ch: 0
                  }, true, true);
                }
              }, 200);
            }
            break;
          }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onSourceBlur", function () {
      var _this$props = _this.props,
        sourceTextModified = _this$props.sourceTextModified,
        sourceText = _this$props.sourceText;
      _this.props.saveSourceCodeToEditing(sourceTextModified);
    });
    _defineProperty(_assertThisInitialized(_this), "onChangeEditSource", function (editor, data, text) {
      _this.props.setSourceCurrent(text);
    });
    _defineProperty(_assertThisInitialized(_this), "onClickFind", function () {
      var lastOperation = _this.state.lastOperation;
      var selectedCommand = _this.props.selectedCommand;
      var p = new Promise(function (resolve, reject) {
        switch (selectedCommand.cmd) {
          case 'visualGetPixelColor':
          case 'visionFind':
          case 'visualSearch':
          case 'visualAssert':
          case 'visualVerify':
          case 'visionLimitSearchArea':
          case 'visionLimitSearchAreaRelative':
          case 'visionLimitSearchAreabyTextRelative':
          case 'XClick':
          case 'XClickText':
          case 'XClickTextRelative':
          case 'XClickRelative':
          case 'XMoveText':
          case 'XMoveTextRelative':
          case 'XMove':
          case 'XMoveRelative':
          case 'OCRExtract':
          case 'OCRExtractRelative':
          case 'OCRExtractbyTextRelative':
          case 'OCRSearch':
          case 'aiPrompt':
          case 'aiScreenXY':
          case 'aiComputerUse':
            {
              var selectedIndex = _this.props.editing.meta.selectedIndex;
              var run = function run() {
                // Note: run visionFind/visualSearch as single line command, but without timeout waiting
                _this.playLine(selectedIndex, {
                  overrideScope: {
                    '!TIMEOUT_WAIT': 0
                  },
                  commandExtra: {
                    throwError: true,
                    // visualXXX uses this flag in desktop mode to open Desktop Screenshot Editor to preview result
                    debugVisual: true
                  }
                });
                return resolve(true);
              };
              return _this.waitBeforeScreenCapture().then(run);
            }
          default:
            {
              return _ipc_cs["default"].ask('PANEL_HIGHLIGHT_DOM', {
                lastOperation: lastOperation,
                locator: selectedCommand.target,
                cmd: selectedCommand.cmd
              }).then(resolve, reject);
            }
        }
      });
      p["catch"](function (e) {
        _antd.message.error(e.message, 1.5);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onToggleSelect", function () {
      var _this$props2 = _this.props,
        selectedCommand = _this$props2.selectedCommand,
        config = _this$props2.config;
      var p = new Promise(function (resolve, reject) {
        var defaultAction = function defaultAction() {
          if (_this.props.status === C.APP_STATUS.INSPECTOR) {
            _this.props.stopInspecting();
          } else {
            _this.props.startInspecting();
          }
          resolve(true);
        };
        var takeImage = function takeImage() {
          var isDesktop = (0, _cv_utils.isCVTypeForDesktop)(config.cvScope);
          return _this.waitBeforeScreenCapture().then(function () {
            if (isDesktop) {
              return (0, _desktop_vision.selectAreaOnDesktop)({
                width: screen.availWidth,
                height: screen.availHeight
              });
            } else {
              return _ipc_cs["default"].ask('PANEL_SELECT_AREA_ON_CURRENT_PAGE');
            }
          }).then(function (res) {
            return _this.props.renameVisionImage(res.fileName);
          }).then(resolve, reject);
        };
        switch (selectedCommand.cmd) {
          case 'visionFind':
          case 'visualSearch':
          case 'visualAssert':
          case 'visualVerify':
          case 'OCRExtract':
          case 'OCRExtractRelative':
          case 'visionLimitSearchAreaRelative':
          case 'visionLimitSearchAreabyTextRelative':
          case 'XClickRelative':
          case 'XMoveRelative':
          case 'XMoveText':
          case 'XMoveTextRelative':
          case 'OCRExtractbyTextRelative':
          case 'XMove':
            {
              var disableTakeImageCommands = ['OCRExtractbyTextRelative', 'visionLimitSearchAreabyTextRelative', 'XMoveText', 'XMoveTextRelative'];
              if (disableTakeImageCommands.indexOf(selectedCommand.cmd) !== -1) {
                throw new Error('No select possible for Command ' + selectedCommand.cmd + ', just enter the text');
              } else {
                return takeImage();
              }
            }
          case 'OCRSearch':
            throw new Error('No select possible in OCR mode, just enter the text');
          case 'aiPrompt':
            throw new Error('No select possible in aiPrompt mode');
          case 'aiScreenXY':
            throw new Error('No select possible in aiScreenXY mode');
          case 'aiComputerUse':
            throw new Error('No select possible in aiComputerUse mode');
          case 'XClickText':
          case 'XClickTextRelative':
          case 'XClick':
            {
              var _disableTakeImageCommands = ['XClickText', 'XClickTextRelative'];
              if (_disableTakeImageCommands.indexOf(selectedCommand.cmd) !== -1) {
                throw new Error('No select possible for Command ' + selectedCommand.cmd + ', just enter the text');
              } else {
                return takeImage();
              }

              // if (/^ocr=/i.test(selectedCommand.target)) {
              //   throw new Error('No select possible in OCR mode, just enter the text')
              // } else if (/#R/i.test(selectedCommand.target)) {
              //   throw new Error('No select possible for Command ' + selectedCommand.cmd + ', just enter the text')
              // } else {
              //   return takeImage()
              // }
            }
          case 'visionLimitSearchArea':
            {
              if ((0, _cv_utils.isCVTypeForDesktop)(config.cvScope)) {
                return takeImage();
              } else {
                return defaultAction();
              }
            }
          case 'setWindowSize':
            {
              return _antd.Modal.confirm({
                title: 'Confirm',
                content: 'Do you want to use the current browser dimensions?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: function onOk() {
                  return _ipc_cs["default"].ask('PANEL_GET_WINDOW_SIZE_OF_PLAY_TAB').then(function (size) {
                    console.log('window size:>>', size);
                    _this.props.updateSelectedCommand({
                      target: "".concat(size.viewport.width, "x").concat(size.viewport.height)
                    });
                  });
                },
                onCancel: function onCancel() {
                  return Promise.resolve(true);
                }
              });
            }
          default:
            {
              return defaultAction();
            }
        }
      });
      p["catch"](function (e) {
        console.error(e);
        _antd.message.error(e.message);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (!_this.props.canUseKeyboardShortcuts) {
        return;
      }
      if (['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) !== -1) {
        return;
      }
      var code = (0, _keycode["default"])(e.keyCode);
      var isValidCtrlKeyPressed = (0, _ts_utils.isMac)() ? e.metaKey : e.ctrlKey;
      var noModifierKeyPressed = !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
      if (isValidCtrlKeyPressed) {
        switch (code) {
          case 'c':
            return _this.props.copyCurrentCommand();
          case 'x':
            return _this.props.cutCurrentCommand();
          case 'v':
            return _this.props.pasteAtCurrentCommand();
        }
      }
      if (noModifierKeyPressed) {
        switch (code) {
          case 'delete':
          case 'backspace':
            {
              var selectedIndex = _this.props.editing.meta.selectedIndex;
              if (selectedIndex === -1) {
                return;
              }
              return _this.props.removeCommand(selectedIndex);
            }
          case 'up':
            if (_this.props.selectedCommandIndex !== null) {
              e.preventDefault();
              var commandIndexToSelect = Math.max(0, _this.props.selectedCommandIndex - 1);
              _this.selectCommandAndScroll(commandIndexToSelect);
            }
            break;
          case 'down':
            {
              if (_this.props.selectedCommandIndex !== null) {
                e.preventDefault();
                var _commandIndexToSelect = Math.min(_this.props.commandCount - 1, _this.props.selectedCommandIndex + 1);
                _this.selectCommandAndScroll(_commandIndexToSelect);
              }
              break;
            }
        }
      }
    });
    // Note: virtual-list eats up double click events. so have to manually track click event instead
    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function () {
      var lastScreenX;
      var lastScreenY;
      var lastTime;
      return function (e) {
        var go = function go() {
          var $row = _inspector["default"].parentWithClass('real-command', e.target);
          if (!$row) return;
          var index = parseInt($row.getAttribute('data-index'));
          if (isNaN(index)) return;
          _this.playLine(index);
        };
        var now = new Date() * 1;
        if (lastScreenX === e.screenX && lastScreenY === e.screenY && now - lastTime < 300) {
          if (e.target.tagName !== 'BUTTON') {
            go();
          }
        }
        lastScreenX = e.screenX;
        lastScreenY = e.screenY;
        lastTime = now;
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "onMoveCommand", function (startIndex, endIndex) {
      _this.props.moveCommands(startIndex, endIndex);
    });
    _defineProperty(_assertThisInitialized(_this), "onStartDraggingCommand", function () {
      _this.props.setIsDraggingCommand(true);
    });
    _defineProperty(_assertThisInitialized(_this), "onEndDraggingCommand", function () {
      _this.props.setIsDraggingCommand(false);
    });
    _defineProperty(_assertThisInitialized(_this), "scheduleHideVisionFindPreview", function () {
      (0, _log["default"])('scheduleHideVisionFindPreview');
      var timer = _this.state.visionFindPreview.timer;
      clearTimeout(timer);
      return setTimeout(function () {
        var visible = _this.state.visionFindPreview.visible;
        if (visible) {
          (0, _log["default"])('to hide preview');
          _this.setState({
            visionFindPreview: {
              visible: false
            }
          });
        }
      }, 3000);
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseEnterTarget", function (e, command) {
      // log('onMouseOverTarget')
      if (!_this.commandHasVisionImage(command)) return;
      if (_this.state.visionFindPreview.visible) return;
      clearTimeout(_this.state.visionFindPreview.timer);
      var visionStorage = (0, _storage.getStorageManager)().getVisionStorage();
      var rect = e.target.getBoundingClientRect();
      var file = command.target.trim().split('@')[0];
      var common = {
        visible: true,
        left: rect.left,
        top: rect.top + rect.height
      };
      visionStorage.exists(file).then(function (existed) {
        if (!existed) {
          return _this.setState({
            visionFindPreview: _objectSpread(_objectSpread({}, common), {}, {
              url: './img/not_found.png',
              timer: _this.scheduleHideVisionFindPreview()
            })
          });
        }
        return visionStorage.getLink(file).then(function (link) {
          return _this.setState({
            visionFindPreview: _objectSpread(_objectSpread({}, common), {}, {
              url: link,
              timer: _this.scheduleHideVisionFindPreview()
            })
          });
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onMouseLeaveTarget", function (e, command) {
      // log('onMouseOutTarget')
      if (!_this.commandHasVisionImage(command)) return;
      if (!_this.state.visionFindPreview.visible) return;
      clearTimeout(_this.state.visionFindPreview.timer);
      _this.setState({
        visionFindPreview: {
          visible: false
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "jumpToImage", function (commandIndex) {
      var tabs_elements = document.querySelectorAll('.ant-tabs-tab');
      var visual_tab = Array.from(tabs_elements).find(function (el) {
        return el.innerText.includes('👁Visual');
      });
      if (visual_tab) {
        visual_tab.click();
        var editing = _this.props.editing;
        var commands = editing.commands;
        var action_button = document.querySelector('.ls-toolbox > button > i.anticon.anticon-up');
        if (action_button != null) {
          document.querySelector('.ls-toolbox > button > i.anticon.anticon-up').click();
        }
        setTimeout(function () {
          var imageName = commands[commandIndex]['target'].split('.png')[0] + '.png';
          var tragte_img = document.getElementById(imageName);
          var tragte_img_tr = tragte_img.parentElement.parentElement;
          tragte_img_tr.scrollIntoView({
            behavior: 'smooth'
          });
        }, 500);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "jumpToSourceCode", function (commandIndex) {
      _this.props.setEditorActiveTab('source_view');
      setTimeout(function () {
        var editing = _this.props.editing;
        var commands = editing.commands;
        var instance = _this.state.cmEdtiorInstance;
        var headingLineCount = 4;
        var ch = 0;
        var $tab = document.querySelector('.source-view');
        var tabHeight = parseInt(window.getComputedStyle($tab).height, 10);
        var margin = (tabHeight - 60) / 2;
        var lineCountForCommand = function lineCountForCommand(command) {
          return 6 + (command.targetOptions ? command.targetOptions.length + 2 : 0);
        };
        var startLine = headingLineCount;
        for (var i = 0; i < commandIndex; i++) {
          startLine += lineCountForCommand(commands[i]);
        }
        var endLine = startLine + lineCountForCommand(commands[commandIndex]);
        (0, _log["default"])('margin', margin, tabHeight);
        if (!instance) {
          instance = document.querySelector('.CodeMirror').CodeMirror;
        }
        instance.scrollIntoView({
          ch: ch,
          line: startLine
        }, margin);
        instance.setSelection({
          ch: ch,
          line: startLine
        }, {
          ch: ch,
          line: endLine
        }, {
          scroll: false
        });
      }, 100);
    });
    _defineProperty(_assertThisInitialized(_this), "commandClassName", function (record, index) {
      var _this$props3 = _this.props,
        editing = _this$props3.editing,
        player = _this$props3.player,
        breakpointIndices = _this$props3.breakpointIndices,
        doneCommandIndices = _this$props3.doneCommandIndices,
        errorCommandIndices = _this$props3.errorCommandIndices,
        warningCommandIndices = _this$props3.warningCommandIndices;
      var nextCommandIndex = player.nextCommandIndex;
      var commands = editing.commands;
      var classNames = [];
      if (breakpointIndices.indexOf(index) !== -1) {
        classNames.push('breakpoint-command');
      }
      if (record.cmd === 'comment' || record.cmd === '') {
        classNames.push('comment-command');
      }
      if (!_this.props.canUseKeyboardShortcuts) {
        classNames.push('blur');
      }
      if (index === nextCommandIndex) {
        classNames.push('running-command');
      } else if (warningCommandIndices.indexOf(index) !== -1) {
        classNames.push('warning-command');
      } else if (errorCommandIndices.indexOf(index) !== -1) {
        classNames.push('error-command');
      } else if (doneCommandIndices.indexOf(index) !== -1) {
        classNames.push('done-command');
      }
      if (index === editing.meta.selectedIndex) {
        classNames.push('selected-command');
      }
      return classNames.join(' ');
    });
    _defineProperty(_assertThisInitialized(_this), "needVirtualList", function () {
      return true;
      // const { commands = [] } = this.props.editing
      // const threshold = 0
      // return commands.length >= threshold
    });
    _defineProperty(_assertThisInitialized(_this), "getTableWrapper", function () {
      // return promise
      return new Promise(function (resolve, reject) {
        var $table = document.querySelector('.table-wrapper');
        if ($table) {
          resolve($table);
        } else {
          // reject(new Error('table-wrapper not found'))
          resolve(null);
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onWindowResize", function () {
      _this.getTableWrapper().then(function ($table) {
        if ($table) {
          _this.setState({
            tableWidth: $table.clientWidth
          });
          _this.setState({
            tableHeight: $table.clientHeight
          });
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e, index) {
      (0, _log["default"])('onContextMenu');
      _this.setState({
        contextMenu: {
          x: e.clientX,
          y: e.clientY,
          isShown: true,
          commandIndex: index
        }
      });
      _this.props.selectCommand(index, true);
      e.preventDefault();
      e.stopPropagation();
    });
    _defineProperty(_assertThisInitialized(_this), "onHideMenu", function (e) {
      if (e.button !== 0) return;
      _this.setState({
        contextMenu: _objectSpread(_objectSpread({}, _this.state.contextMenu), {}, {
          isShown: false
        })
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onClickCommand", function (e, command) {
      _this.props.updateUI({
        focusArea: _state.FocusArea.CommandTable
      });
      _this.props.selectCommand(command.realIndex, true);
    });
    _defineProperty(_assertThisInitialized(_this), "getTestCaseName", function () {
      var src = _this.props.editing.meta.src;
      return src && src.name && src.name.length ? src.name : 'Untitled';
    });
    _defineProperty(_assertThisInitialized(_this), "playLine", function (commandIndex) {
      var extraOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var commands = _this.props.editing.commands;
      var src = _this.props.editing.meta.src;
      _this.setState({
        lastOperation: 'play'
      });
      return _this.props.playerPlay(_objectSpread({
        macroId: src && src.id,
        title: _this.getTestCaseName(),
        extra: {
          id: src && src.id
        },
        mode: _player.Player.C.MODE.SINGLE,
        startIndex: commandIndex,
        startUrl: null,
        resources: commands,
        postDelay: _this.props.config.playCommandInterval * 1000
      }, extraOptions));
    });
    _defineProperty(_assertThisInitialized(_this), "headerRenderer", function (_ref) {
      var dataKey = _ref.dataKey,
        label = _ref.label;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
        key: dataKey
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReactVirtualized__Table__headerTruncatedText"
      }, label), /*#__PURE__*/_react["default"].createElement(_reactDraggable["default"], {
        axis: "x",
        defaultClassName: "DragHandle",
        defaultClassNameDragging: "DragHandleActive",
        onDrag: function onDrag(event, _ref2) {
          var deltaX = _ref2.deltaX;
          return _this.resizeColumnWidth({
            dataKey: dataKey,
            deltaX: deltaX
          });
        },
        position: {
          x: 0
        },
        zIndex: 999
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "DragHandleIcon"
      }, "\u22EE")));
    });
    _defineProperty(_assertThisInitialized(_this), "resizeColumnWidth", function (_ref3) {
      var dataKey = _ref3.dataKey,
        deltaX = _ref3.deltaX;
      _this.setState(function (prevState) {
        var prevWidths = prevState.columnWidths;
        var percentDelta = deltaX / (_this.state.tableWidth - _this.state.columnWidths.serialFixed - _this.state.columnWidths.opsFixed);

        // cmd, target, value, ops
        var nextDataKey;
        switch (dataKey) {
          case 'cmd':
            nextDataKey = 'target';
            break;
          case 'target':
            nextDataKey = 'value';
            break;
          case 'value':
            nextDataKey = 'ops';
            break;
          default:
            nextDataKey = 'target';
        }
        var columnWidths = _objectSpread(_objectSpread({}, prevWidths), {}, _defineProperty(_defineProperty({}, dataKey, prevWidths[dataKey] + percentDelta), nextDataKey, prevWidths[nextDataKey] - percentDelta));
        return {
          columnWidths: columnWidths
        };
      });
    });
    _this.macroTableRef = /*#__PURE__*/_react["default"].createRef();
    _this.codeMirrorRef = /*#__PURE__*/_react["default"].createRef();
    _this.cmdInputRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(DashboardEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      document.addEventListener('click', this.onHideMenu);
      document.addEventListener('click', this.onDoubleClick);
      document.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('resize', this.onWindowResize);
      (0, _utils.waitForRenderComplete)('.table-wrapper').then(function () {
        _this2.getTableWrapper().then(function ($table) {
          if ($table) {
            _this2.setState({
              tableWidth: $table.clientWidth
            });
            _this2.setState({
              tableHeight: $table.clientHeight
            });
          }
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onHideMenu);
      document.removeEventListener('click', this.onDoubleClick);
      document.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;
      // console.log('nextProps:>> ', nextProps)
      // Note: update sourceText whenever editing changed
      if (nextProps.editing.meta.src !== this.props.editing.meta.src || nextProps.editing.commands !== this.props.editing.commands) {
        var resetCursor = nextProps.editing.meta.src !== this.props.editing.meta.src;
        this.setState(this.resetSourceCodeCursor(resetCursor));
        if (nextProps.editing.meta.src !== this.props.editing.meta.src) {
          this.setState({
            newMacroSelected: true
          });
        }
      }
      if (nextProps.bottomPanelHeight !== this.props.bottomPanelHeight) {
        // update table width and height
        this.onWindowResize();
      }
      if (nextProps.config.showBottomArea !== this.props.config.showBottomArea) {
        // update table height
        this.onWindowResize();
      }
      if (this.macroTableRef.current) {
        if (nextProps.status === C.APP_STATUS.PLAYER && nextProps.player.nextCommandIndex !== this.props.player.nextCommandIndex) {
          var numberOfVisibleRows = Math.floor((this.macroTableRef.current.props.height - this.macroTableRef.current.props.headerHeight) / this.macroTableRef.current.props.rowHeight);
          if ([undefined, null, 0].includes(nextProps.player.nextCommandIndex)) {
            this.macroTableRef.current.scrollToRow(nextProps.player.nextCommandIndex || 0);
          } else {
            var lastRowVisible = nextProps.player.nextCommandIndex + numberOfVisibleRows - 1;
            this.macroTableRef.current.scrollToRow(lastRowVisible);
          }
        }
        if (nextProps.status === C.APP_STATUS.RECORDER && nextProps.editing.commands.length > this.props.editing.commands.length) {
          var _numberOfVisibleRows = Math.floor((this.macroTableRef.current.props.height - this.macroTableRef.current.props.headerHeight) / this.macroTableRef.current.props.rowHeight);
          setTimeout(function () {
            if ([undefined, null, 0].includes(nextProps.player.nextCommandIndex)) {
              _this3.macroTableRef.current.scrollToRow(nextProps.player.nextCommandIndex || 0);
            } else {
              var _lastRowVisible = nextProps.player.nextCommandIndex + _numberOfVisibleRows - 1;
              _this3.macroTableRef.current.scrollToRow(_lastRowVisible);
            }
          }, 100);
        }
      }
    }
  }, {
    key: "isPlayerStopped",
    value: function isPlayerStopped() {
      return this.props.player.status === C.PLAYER_STATUS.STOPPED;
    }
  }, {
    key: "waitBeforeScreenCapture",
    value: function waitBeforeScreenCapture() {
      if (!(0, _cv_utils.isCVTypeForDesktop)(this.props.config.cvScope)) {
        return Promise.resolve();
      }
      if (this.props.config.waitBeforeDesktopScreenCapture && this.props.config.secondsBeforeDesktopScreenCapture > 0) {
        _antd.message.info("About to take desktop screenshot in ".concat(this.props.config.secondsBeforeDesktopScreenCapture, " seconds"));
        return (0, _ts_utils.delay)(function () {}, this.props.config.secondsBeforeDesktopScreenCapture * 1000);
      }
      return Promise.resolve();
    }
  }, {
    key: "isSelectedCommandVisualSearch",
    value: function isSelectedCommandVisualSearch(command) {
      var _this$props4 = this.props,
        editing = _this$props4.editing,
        config = _this$props4.config;
      var commands = editing.commands,
        meta = editing.meta;
      var selectedIndex = meta.selectedIndex;
      var dataSource = commands && commands.length ? commands : defaultDataSource;
      var selectedCmd = command || dataSource[selectedIndex];
      var selectedCmdIsVisualSearch = function () {
        if (!selectedCmd) return false;
        if ((0, _cv_utils.isCVTypeForDesktop)(config.cvScope) && selectedCmd.cmd === 'visionLimitSearchArea') return true;
        return ['visionFind', 'visualSearch', 'visualAssert', 'visualVerify', 'XClick', 'XClickText', 'XClickTextRelative', 'XMoveText', 'XMoveTextRelative', 'XMove', 'XClickRelative', 'XMoveRelative', 'OCRExtract', 'OCRExtractRelative', 'visionLimitSearchAreaRelative', 'visionLimitSearchAreabyTextRelative'].indexOf(selectedCmd.cmd) !== -1;
      }();
      return selectedCmdIsVisualSearch;
    }
  }, {
    key: "commandHasVisionImage",
    value: function commandHasVisionImage(command) {
      if (!this.isSelectedCommandVisualSearch(command)) return false;
      var commandsCouldHaveVisionImage = ['XClick', 'XClickText', 'XClickTextRelative', 'XClickRelative', 'XMoveText', 'XMoveTextRelative', 'XMove', 'XMoveRelative', 'OCRExtract', 'OCRExtractRelative', 'visionLimitSearchArea', 'visionLimitSearchAreaRelative', 'visionLimitSearchAreabyTextRelative'];
      if (commandsCouldHaveVisionImage.indexOf(command.cmd) !== -1 && !/\.png/i.test(command.target)) return false;
      return true;
    }
  }, {
    key: "selectCommandAndScroll",
    value: function selectCommandAndScroll(commandIndex) {
      this.props.selectCommand(commandIndex, true);
      this.props.scrollToCommandAtIndex(commandIndex);
    }
  }, {
    key: "renderVisionFindPreview",
    value: function renderVisionFindPreview() {
      var _this$state$visionFin = this.state.visionFindPreview,
        visible = _this$state$visionFin.visible,
        url = _this$state$visionFin.url,
        left = _this$state$visionFin.left,
        top = _this$state$visionFin.top;
      if (!visible) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'absolute',
          width: '100px',
          height: '100px',
          border: '1px solid #ccc',
          left: left + 'px',
          top: top + 'px',
          backgroundColor: '#eee',
          backgroundImage: "url(".concat(url, ")"),
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }
      });
    }
  }, {
    key: "renderContextMenu",
    value: function renderContextMenu() {
      var _this4 = this;
      var _this$props5 = this.props,
        clipboard = _this$props5.clipboard,
        status = _this$props5.status;
      var contextMenu = this.state.contextMenu;
      var isNormal = status === C.APP_STATUS.NORMAL;
      var dw = document.documentElement.clientWidth;
      var dh = document.documentElement.clientHeight;
      var mw = 240;
      var x = contextMenu.x + window.scrollX;
      var y = contextMenu.y + window.scrollY;
      if (!isNormal) {
        return null;
      }
      if (x + mw > dw) x -= mw;
      var style = {
        position: 'absolute',
        top: y,
        left: x,
        display: contextMenu.isShown ? 'block' : 'none'
      };
      var menuStyle = {
        width: mw + 'px'
      };
      var commandIndex = contextMenu.commandIndex;
      var isBreakpoint = this.props.breakpointIndices.indexOf(commandIndex) !== -1;
      var target_item;
      try {
        target_item = this.props.editing.commands.length !== 0 && commandIndex !== undefined ? this.props.editing.commands[commandIndex]['target'] : '';
      } catch (error) {
        target_item = '';
      }
      var handleClick = function handleClick(e) {
        switch (e.key) {
          case 'cut':
            return _this4.props.cutCommand(commandIndex);
          case 'copy':
            return _this4.props.copyCommand(commandIndex);
          case 'paste':
            return _this4.props.pasteCommand(commandIndex);
          case 'insert':
            return _this4.props.insertCommand(newCommand, commandIndex + 1);
          case 'delete':
            return _this4.props.removeCommand(commandIndex);
          case 'run_line':
            {
              return _this4.playLine(commandIndex);
            }
          case 'play_from_here':
            {
              var commands = _this4.props.editing.commands;
              _this4.setState({
                lastOperation: 'play'
              });
              return _this4.props.playerPlay({
                macroId: _this4.props.macroId,
                title: _this4.getTestCaseName(),
                extra: {
                  id: _this4.props.macroId
                },
                mode: _player.Player.C.MODE.STRAIGHT,
                startIndex: commandIndex,
                keepVariables: 'reset',
                startUrl: null,
                resources: commands,
                postDelay: _this4.props.config.playCommandInterval * 1000
              });
            }
          case 'play_from_here_keep_variables':
            {
              var _commands = _this4.props.editing.commands;
              _this4.setState({
                lastOperation: 'play'
              });
              return _this4.props.playerPlay({
                macroId: _this4.props.macroId,
                title: _this4.getTestCaseName(),
                extra: {
                  id: _this4.props.macroId
                },
                mode: _player.Player.C.MODE.STRAIGHT,
                startIndex: commandIndex,
                keepVariables: 'yes',
                startUrl: null,
                resources: _commands,
                postDelay: _this4.props.config.playCommandInterval * 1000
              });
            }
          case 'play_to_here':
            {
              var _commands2 = _this4.props.editing.commands;
              _this4.setState({
                lastOperation: 'play'
              });
              return _this4.props.playerPlay({
                macroId: _this4.props.macroId,
                title: _this4.getTestCaseName(),
                extra: {
                  id: _this4.props.macroId
                },
                mode: _player.Player.C.MODE.STRAIGHT,
                keepVariables: 'reset',
                startIndex: 0,
                startUrl: null,
                resources: _commands2,
                postDelay: _this4.props.config.playCommandInterval * 1000,
                breakpoints: [commandIndex]
              });
            }
          case 'add_breakpoint':
            {
              return _this4.props.addBreakpoint(_this4.props.macroId, commandIndex);
            }
          case 'remove_breakpoint':
            {
              return _this4.props.removeBreakpoint(_this4.props.macroId, commandIndex);
            }
          case 'jump_to_source_code':
            {
              return _this4.jumpToSourceCode(commandIndex);
            }
          case 'jump_to_image':
            {
              return _this4.jumpToImage(commandIndex);
            }
          case 'record_from_here':
            {
              _this4.props.setIndexToInsertRecorded(commandIndex + 1);
              _this4.props.toggleRecorderSkipOpen(true);
              return _this4.props.startRecording();
            }
        }
      };
      var ctrlKey = (0, _ts_utils.isMac)() ? '⌘' : 'CTRL-';
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: style,
        id: "context_menu"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
        onClick: handleClick,
        style: menuStyle,
        mode: "vertical",
        selectable: false,
        items: [{
          key: "cut",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Cut"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "shortcut"
          }, ctrlKey, "X")),
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)
        }, {
          key: "copy",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Copy"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "shortcut"
          }, ctrlKey, "C")),
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)
        }, {
          key: "paste",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Paste"), /*#__PURE__*/_react["default"].createElement("span", {
            className: "shortcut"
          }, ctrlKey, "P")),
          disabled: clipboard.commands.length === 0
        }, {
          key: "delete",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Delete")),
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)
        }, {
          type: 'divider'
        }, {
          key: "insert",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Insert new line")),
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)
        }, {
          type: 'divider'
        }, {
          key: "jump_to_source_code",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Jump to source code"))
        }, {
          key: isBreakpoint ? 'remove_breakpoint' : 'add_breakpoint',
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, isBreakpoint ? 'Remove breakpoint' : 'Add breakpoint'))
        }, {
          type: 'divider'
        }, {
          key: "run_line",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Execute this command"))
        }, {
          key: "play_from_here",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Play from here"))
        }, {
          key: "play_from_here_keep_variables",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Play from here and keep variables"))
        }, {
          key: "play_to_here",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Play to this point"))
        }, {
          key: "record_from_here",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Record from here")),
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Record)
        }, {
          key: "jump_to_image",
          label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, "Jump to image")),
          disabled: target_item.indexOf('.png') === -1
        }]
      }));
    }
  }, {
    key: "renderTargetEditor",
    value: function renderTargetEditor() {
      var _this5 = this;
      var _this$props6 = this.props,
        status = _this$props6.status,
        editing = _this$props6.editing,
        config = _this$props6.config,
        ui = _this$props6.ui;
      var commands = editing.commands,
        meta = editing.meta;
      var selectedIndex = meta.selectedIndex;
      var isPlayerStopped = this.isPlayerStopped();
      var dataSource = commands && commands.length ? commands : defaultDataSource;
      var selectedCmd = dataSource[selectedIndex];
      var isCmdEditable = isPlayerStopped && !!selectedCmd;
      if (!isCmdEditable || !this.state.targetEditor.visible) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "target-full-editor"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "mask"
      }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        shape: "circle",
        icon: "close",
        className: "close-button",
        onClick: function onClick() {
          _this5.setState({
            targetEditor: {
              visible: false,
              text: ''
            }
          });
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactCodemirror.UnControlled, {
        value: this.state.targetEditor.text,
        onChange: function onChange(editor, _, text) {
          _this5.onDetailChange('target', text);
        },
        onCursor: function onCursor(editor, data) {
          // this.setState({ cmEdtiorInstance: editor })
          // // Note: when value updated, code mirror will automatically emit onCursor with cursor at bottom
          // // It can be tell with `sticky` as null
          // if (data.sticky) {
          //   this.setState({ cursor: { line: data.line, ch: data.ch } })
          // }
        },
        onFocus: function onFocus() {
          _this5.props.updateUI({
            focusArea: _state.FocusArea.CodeSource
          });
        },
        options: {
          mode: {
            name: 'javascript',
            json: true
          },
          lineNumbers: true,
          matchBrackets: true,
          autoCloseBrackets: true
        }
      }));
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this$props7 = this.props,
        editing = _this$props7.editing,
        player = _this$props7.player;
      var commands = editing.commands;
      var _reduce = (commands && commands.length ? commands : defaultDataSource).reduce(function (_ref4, command, i) {
          var dataSource = _ref4.dataSource,
            indent = _ref4.indent;
          var _indentCreatedByComma = (0, _command.indentCreatedByCommand)(command.cmd),
            selfIndent = _indentCreatedByComma.selfIndent,
            nextIndent = _indentCreatedByComma.nextIndent;
          dataSource.push(_objectSpread(_objectSpread({}, command), {}, {
            key: Math.random(),
            indent: indent + selfIndent,
            realIndex: i,
            serial: i + 1
          }));
          return {
            dataSource: dataSource,
            indent: Math.max(0, indent + selfIndent + nextIndent)
          };
        }, {
          dataSource: [],
          indent: 0
        }),
        dataSource = _reduce.dataSource;
      return this.needVirtualList() ? this.renderVirtualTable(dataSource) : this.renderNormalTable(dataSource);
    }
  }, {
    key: "renderVirtualTable",
    value: function renderVirtualTable(dataSource) {
      var _this6 = this;
      var commands = this.props.editing.commands;
      commands = (commands || []).filter(function (res) {
        return res.cmd && res.cmd.length > 0;
      });
      var editable = this.isPlayerStopped() && (0, _license.getLicenseService)().canPerform(_types.Feature.Edit);
      var _this$state = this.state,
        columnWidths = _this$state.columnWidths,
        tableWidth = _this$state.tableWidth,
        headerWidthPatchFactor = _this$state.headerWidthPatchFactor,
        tableHeight = _this$state.tableHeight;
      var itemHeight = ITEM_HEIGHT;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "t-body"
      }, !this.listContainer ? null : /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Table, {
        ref: this.macroTableRef,
        width: tableWidth,
        height: tableHeight,
        className: "command-table",
        headerHeight: ITEM_HEIGHT,
        rowHeight: ITEM_HEIGHT,
        rowCount: dataSource.length + 1,
        rowGetter: function rowGetter(_ref5) {
          var index = _ref5.index;
          return dataSource[index] || {
            key: index
          };
        },
        rowClassName: function rowClassName(_ref6) {
          var index = _ref6.index;
          return index === -1 || index >= dataSource.length ? '' : "command-row real-command " + _this6.commandClassName(dataSource[index], index);
        },
        rowRenderer: function rowRenderer(_ref7) {
          var key = _ref7.key,
            index = _ref7.index,
            style = _ref7.style;
          var item = dataSource[index];
          var Footer = /*#__PURE__*/_react["default"].createElement("div", {
            key: "footer",
            className: "command-row footer-row",
            style: {
              top: index * itemHeight
            },
            onClick: function onClick() {
              if (!(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)) {
                return;
              }
              _this6.props.updateUI({
                focusArea: _state.FocusArea.CommandTable
              });
              _this6.props.insertCommand(newCommand, commands.length);
            }
          }, "Add");
          if (index === dataSource.length) {
            return Footer;
          }
          return /*#__PURE__*/_react["default"].createElement(_command_item.CommandItem, {
            key: key,
            index: item.realIndex + 1,
            command: item,
            style: _objectSpread(_objectSpread({}, style), {}, {
              height: itemHeight + 'px'
            }),
            columnWidths: columnWidths,
            tableWidth: tableWidth,
            className: "command-row real-command " + _this6.commandClassName(item, item.realIndex),
            attributes: {
              'data-index': '' + item.realIndex
            },
            editable: editable,
            onClick: function onClick(e, command) {
              return _this6.onClickCommand(e, command);
            },
            onContextMenu: function onContextMenu(e, command) {
              return _this6.onContextMenu(e, command.realIndex);
            },
            onToggleComment: function onToggleComment(e, command) {
              _this6.props.toggleComment(command.realIndex);
              e.stopPropagation();
            },
            onDuplicate: function onDuplicate(e, command) {
              _this6.props.duplicateCommand(command.realIndex);
              e.stopPropagation();
            },
            onMouseEnterTarget: _this6.onMouseEnterTarget,
            onMouseLeaveTarget: _this6.onMouseLeaveTarget,
            onMoveCommand: _this6.onMoveCommand,
            onDragStart: _this6.onStartDraggingCommand,
            onDragEnd: _this6.onEndDraggingCommand
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "serial",
        label: "",
        width: columnWidths.serialFixed
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        headerRenderer: this.headerRenderer,
        dataKey: "cmd",
        label: "Command",
        width: columnWidths.cmd * tableWidth * headerWidthPatchFactor
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        headerRenderer: this.headerRenderer,
        dataKey: "target",
        label: "Target",
        width: columnWidths.target * tableWidth * headerWidthPatchFactor
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "value",
        label: "Value",
        width: columnWidths.value * tableWidth * headerWidthPatchFactor
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "ops",
        label: "Ops",
        width: columnWidths.opsFixed + 20
      })));
    }
  }, {
    key: "renderNormalTable",
    value: function renderNormalTable(dataSource) {
      var _this7 = this;
      var _this$props8 = this.props,
        editing = _this$props8.editing,
        player = _this$props8.player,
        doneCommandIndices = _this$props8.doneCommandIndices,
        errorCommandIndices = _this$props8.errorCommandIndices;
      var nextCommandIndex = player.nextCommandIndex;
      var commands = editing.commands;
      var editable = this.isPlayerStopped();
      var columns = [{
        title: '',
        dataIndex: 'serial',
        key: 'serial',
        width: 40
      }, {
        title: 'Command',
        dataIndex: 'cmd',
        key: 'cmd',
        width: 130
      }, {
        title: 'Target',
        dataIndex: 'target',
        key: 'target',
        width: 250,
        ellipsis: true
      }, {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        ellipsis: true
      }, {
        title: 'Ops',
        key: 'ops',
        width: 80,
        render: function render(text, record, index) {
          return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            disabled: !editable,
            size: "small",
            shape: "circle",
            onClick: function onClick(e) {
              _this7.props.removeCommand(index);
              e.stopPropagation();
            },
            icon: /*#__PURE__*/_react["default"].createElement("div", null, "//")
          }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            disabled: !editable,
            size: "small",
            shape: "circle",
            onClick: function onClick(e) {
              _this7.props.duplicateCommand(index);
              e.stopPropagation();
            }
          }, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)));
        }
      }];
      var tableConfig = {
        dataSource: dataSource,
        columns: columns,
        pagination: false,
        footer: function footer() {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "table-footer",
            onClick: function onClick(e) {
              if (!(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)) {
                return;
              }
              _this7.props.insertCommand(newCommand, commands.length);
            }
          }, "Add");
        },
        onRowClick: function onRowClick(record, index, e) {
          _this7.props.selectCommand(index);
        },
        rowClassName: this.commandClassName
      };
      return /*#__PURE__*/_react["default"].createElement(_antd.Table, tableConfig);
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;
      var _this$props9 = this.props,
        status = _this$props9.status,
        editing = _this$props9.editing,
        config = _this$props9.config,
        ui = _this$props9.ui;
      var commands = editing.commands,
        meta = editing.meta;
      var selectedIndex = meta.selectedIndex;
      var isPlayerStopped = this.isPlayerStopped();
      var dataSource = commands && commands.length ? commands : defaultDataSource;
      var selectedCmd = dataSource[selectedIndex];
      var editable = isPlayerStopped && !!selectedCmd;
      var isCmdEditable = editable && (0, _license.getLicenseService)().canPerform(_types.Feature.Edit);
      var isInspecting = status === C.APP_STATUS.INSPECTOR;
      var selectedCmdIsVisualSearch = this.isSelectedCommandVisualSearch();
      var isSelectEnabled = selectedCmd && selectedCmd.cmd && (0, _command.canCommandSelect)(selectedCmd.cmd);
      var isFindEnabled = selectedCmd && selectedCmd.cmd && (0, _command.canCommandFind)(selectedCmd.cmd);
      var shouldUseSelectInputForTarget = selectedCmd && selectedCmd.targetOptions && selectedCmd.targetOptions.length && (0, _command.doesCommandSupportTargetOptions)(selectedCmd.cmd);
      var shouldUseTextareaForTarget = selectedCmd && ['executeScript', 'executeScript_Sandbox', 'aiPrompt', 'aiScreenXY', 'aiComputerUse'].indexOf(selectedCmd.cmd) !== -1;
      var shouldUseNormalInputForTarget = !shouldUseSelectInputForTarget && !shouldUseTextareaForTarget;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "editor-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tabs-wrapper"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
        type: "card",
        className: (0, _utils.cn)('commands-view', {
          'target-as-textarea': shouldUseTextareaForTarget
        }),
        activeKey: this.props.editor.activeTab,
        onChange: this.onChangeCommandsView
        // defaultActiveKey="1"
        ,
        items: [{
          label: 'Table View',
          key: 'table_view',
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
            className: "form-group table-wrapper ".concat(this.needVirtualList() ? 'rcv-table-wrapper' : ''),
            style: {
              marginBottom: 0
            },
            ref: function ref(_ref8) {
              _this8.listContainer = _ref8;
            }
          }, this.renderTable()), /*#__PURE__*/_react["default"].createElement("div", {
            className: "form-group fields-wrapper",
            style: {
              marginBottom: 0
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Form, null, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "Command",
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 20
            }
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row",
            ref: this.cmdInputRef
          }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
            showSearch: true,
            optionFilterProp: "children",
            placeholder: "command",
            disabled: !isCmdEditable,
            value: selectedCmd && selectedCmd.cmd,
            onChange: function onChange(value) {
              return _this8.onDetailChange('cmd', value);
            },
            onKeyDown: function onKeyDown(e) {
              var input = _this8.cmdInputRef.current.querySelector('input');
              if (/^[a-zA-Z0-9]$/.test(e.key)) {
                _this8.setState({
                  userInputCmdValue: input.value + e.key
                });
              }
            },
            onBlur: function onBlur() {
              var value = _this8.state.userInputCmdValue;
              if (value && value.length > 0) {
                var command = _command.availableCommands.find(function (cmd) {
                  return cmd.toLowerCase() === value.trim().toLowerCase();
                });
                if (command) {
                  _this8.onDetailChange('cmd', command);
                }
              }
              _this8.setState({
                userInputCmdValue: ''
              });
            },
            filterOption: function filterOption(input, _ref9) {
              var key = _ref9.key;
              return key.toLowerCase().indexOf(input.toLowerCase()) !== -1;
            },
            style: {
              flex: 1,
              maxWidth: '60%',
              marginRight: '10px'
            },
            size: "default"
          }, ((0, _cv_utils.isCVTypeForDesktop)(config.cvScope) ? _command.availableCommandsForDesktop : _command.availableCommands).map(function (cmd) {
            return /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
              value: cmd,
              key: cmd
            }, (0, _command.commandText)(cmd));
          })), /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              flex: 0.6,
              display: 'flex',
              justifyContent: 'space-between'
            }
          }, selectedCmd && selectedCmd.cmd ? /*#__PURE__*/_react["default"].createElement("a", {
            style: {
              marginRight: '10px',
              whiteSpace: 'nowrap'
            },
            href: "https://goto.ui.vision/x/idehelp?cmd=".concat(selectedCmd.cmd.toLowerCase()),
            target: "_blank"
          }, "Info for this command") : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            style: {
              padding: '0 10px'
            },
            title: "Toggle comment",
            disabled: !isCmdEditable,
            onClick: function onClick() {
              _this8.props.toggleCommentOnSelectedCommand();
            }
          }, "//")))), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "Target",
            className: "target-row",
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 20
            }
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "flex-row"
          }, shouldUseNormalInputForTarget ? /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            style: {
              flex: 1,
              maxWidth: '60%',
              marginRight: '10px'
            },
            placeholder: "target",
            disabled: !isCmdEditable,
            value: selectedCmd && selectedCmd.target,
            onChange: function onChange(e) {
              return _this8.onDetailChange('target', e.target.value);
            },
            size: "default"
          }) : null, shouldUseSelectInputForTarget ? /*#__PURE__*/_react["default"].createElement(_select_input.SelectInput, {
            disabled: !isCmdEditable,
            getId: function getId(str) {
              return str;
            },
            stringifyOption: function stringifyOption(str) {
              return str;
            },
            value: selectedCmd.target,
            options: selectedCmd.targetOptions,
            onChange: function onChange(val) {
              return _this8.onDetailChange('target', val);
            }
          }) : null, shouldUseTextareaForTarget ? /*#__PURE__*/_react["default"].createElement("div", {
            className: "textarea-wrapper"
          }, /*#__PURE__*/_react["default"].createElement(_antd.Input.TextArea, {
            rows: 2,
            placeholder: "target",
            disabled: !isCmdEditable,
            value: selectedCmd && selectedCmd.target,
            onChange: function onChange(e) {
              return _this8.onDetailChange('target', e.target.value);
            },
            size: "default"
          }), /*#__PURE__*/_react["default"].createElement(_icons.DoubleRightOutlined, {
            type: "arrows-alt",
            className: "open-full-editor",
            title: "Open full editor",
            onClick: function onClick() {
              _this8.setState({
                targetEditor: {
                  visible: true,
                  text: selectedCmd.target
                }
              });
            }
          })) : null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            disabled: !isCmdEditable || !isSelectEnabled,
            onClick: this.onToggleSelect
          }, isInspecting ? /*#__PURE__*/_react["default"].createElement("span", null, (selectedCmdIsVisualSearch ? '👁' : '') + 'Cancel') : /*#__PURE__*/_react["default"].createElement("span", null, (selectedCmdIsVisualSearch ? '👁' : '') + 'Select')), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
            disabled: !editable || !isFindEnabled,
            onClick: this.onClickFind
          }, (selectedCmdIsVisualSearch ? '👁' : '') + 'Find'))), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "Value",
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 20
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            disabled: !isCmdEditable,
            value: selectedCmd && selectedCmd.value,
            onChange: function onChange(e) {
              return _this8.onDetailChange('value', e.target.value);
            },
            style: {
              width: '100%'
            },
            placeholder: "value",
            size: "default"
          })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
            label: "Description",
            labelCol: {
              span: 4
            },
            wrapperCol: {
              span: 20
            },
            style: {
              marginBottom: 0
            }
          }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
            disabled: !isCmdEditable,
            value: selectedCmd && selectedCmd.description,
            onChange: function onChange(e) {
              return _this8.onDetailChange('description', e.target.value);
            },
            style: {
              width: '100%'
            },
            placeholder: "description",
            size: "default"
          })))))
        }, {
          label: 'Source View (JSON)',
          key: 'source_view',
          className: "source-view",
          children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("pre", {
            className: "source-error"
          }, this.props.sourceErrMsg), /*#__PURE__*/_react["default"].createElement(_reactCodemirror.UnControlled, {
            ref: this.codeMirrorRef,
            className: this.props.sourceErrMsg ? 'has-error' : 'no-error',
            value: this.props.sourceText,
            onChange: this.onChangeEditSource,
            onBlur: this.onSourceBlur,
            onCursor: function onCursor(editor, data) {
              _this8.setState({
                cmEdtiorInstance: editor
              });
              // Note: when value updated, code mirror will automatically emit onCursor with cursor at bottom
              // It can be tell with `sticky` as null
              if (data.sticky) {
                _this8.setState({
                  cursor: {
                    line: data.line,
                    ch: data.ch
                  }
                });
              }
            },
            onFocus: function onFocus() {
              _this8.props.updateUI({
                focusArea: _state.FocusArea.CodeSource
              });
            },
            options: {
              mode: {
                name: 'javascript',
                json: true
              },
              lineNumbers: true,
              matchBrackets: true,
              autoCloseBrackets: true,
              readOnly: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit)
            }
          }))
        }]
      }), (0, _cv_utils.isCVTypeForDesktop)(config.cvScope) && ui.shouldEnableDesktopAutomation !== false || ui.shouldEnableDesktopAutomation === true ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-type",
        onClick: function onClick() {
          _this8.props.updateUI({
            showSettings: true,
            settingsTab: 'vision'
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_computer["default"], null), /*#__PURE__*/_react["default"].createElement("span", null, "Desktop mode")) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-type",
        onClick: function onClick() {
          _this8.props.updateUI({
            showSettings: true,
            settingsTab: 'vision'
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_browser["default"], null), /*#__PURE__*/_react["default"].createElement("span", null, "Browser mode"))), this.renderContextMenu(), this.renderVisionFindPreview(), this.renderTargetEditor());
    }
  }]);
  return DashboardEditor;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    editor: state.editor,
    editing: state.editor.editing,
    clipboard: state.editor.clipboard,
    player: state.player,
    config: state.config,
    ui: state.ui,
    sourceErrMsg: state.editor.editingSource.error,
    sourceText: state.editor.editingSource.pure,
    sourceTextModified: state.editor.editingSource.current,
    selectedCommand: (0, _recomputed.editorSelectedCommand)(state),
    selectedCommandIndex: (0, _recomputed.editorSelectedCommandIndex)(state),
    commandCount: (0, _recomputed.editorCommandCount)(state),
    breakpointIndices: (0, _recomputed.getBreakpoints)(state),
    doneCommandIndices: (0, _recomputed.getDoneCommandIndices)(state),
    errorCommandIndices: (0, _recomputed.getErrorCommandIndices)(state),
    warningCommandIndices: (0, _recomputed.getWarningCommandIndices)(state),
    macroId: (0, _recomputed.getCurrentMacroId)(state),
    canUseKeyboardShortcuts: (0, _recomputed.isFocusOnCommandTable)(state)
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(DashboardEditor);

/***/ }),

/***/ 32875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _freeSolidSvgIcons = __webpack_require__(8102);
var _reactFontawesome = __webpack_require__(20982);
var _antd = __webpack_require__(33061);
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _global_state = __webpack_require__(8327);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _utils = __webpack_require__(46580);
var _save_test_case = _interopRequireDefault(__webpack_require__(64305));
var _bottom = _interopRequireDefault(__webpack_require__(96063));
__webpack_require__(95038);
var _editor = _interopRequireDefault(__webpack_require__(54810));
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Dashboard = /*#__PURE__*/function (_React$Component) {
  _inherits(Dashboard, _React$Component);
  function Dashboard() {
    var _this;
    _classCallCheck(this, Dashboard);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Dashboard, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      tabIdToPlay: undefined,
      isOpenInSidePanelBtnActive: true,
      bottomPanelHeight: -1,
      permissionRequired: false
    });
    _defineProperty(_assertThisInitialized(_this), "handleStorageChange", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        changedObj = _ref2[0];
      // TODO: remove this block of code. Maybe it's not needed as this state property is updated in componentDidMount
      // if (changedObj.key === 'background_state') {
      //   this.setState({ tabIdToPlay: changedObj.newValue.tabIds.toPlay });
      // }

      if (changedObj.key === 'config') {
        var getAllChangedProperties = Object.keys(changedObj.newValue).filter(function (key) {
          return changedObj.newValue[key] !== changedObj.oldValue[key];
        });
        if (getAllChangedProperties.includes('disableOpenSidepanelBtnTemporarily')) {
          if (changedObj.newValue.disableOpenSidepanelBtnTemporarily) {
            _this.setState({
              isOpenInSidePanelBtnActive: false
            });
          } else {
            (0, _global_state.getState)().then(function (state) {
              _this.setState({
                tabIdToPlay: state.tabIds.toPlay
              });
              if (_web_extension["default"].isFirefox()) {
                return chrome.sidebarAction.open();
              } else {
                chrome.sidePanel.setOptions({
                  enabled: true
                }).then(function () {
                  _this.setState({
                    isOpenInSidePanelBtnActive: true
                  });
                });
              }
            });
          }
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onBottomPanelHeightChange", function (height) {
      _this.setState({
        bottomPanelHeight: height
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onGrantPermission", function () {
      _web_extension["default"].permissions.request({
        origins: ['<all_urls>']
      }).then(function (result) {
        console.log('permission result:>>', result);
        if (result) {
          _this.setState({
            permissionRequired: false
          });
        } else {
          // visit https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission in new tab 
          _web_extension["default"].tabs.create({
            url: 'https://goto.ui.vision/x/idehelp?help=firefox_access_data_permission',
            active: true
          });
        }
      });
    });
    return _this;
  }
  _createClass(Dashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      // firefox requires explicit permission to access all urls
      // otherwise user will need to allow access for each url manually  
      if (_web_extension["default"].isFirefox()) {
        _web_extension["default"].permissions.contains({
          origins: ['<all_urls>']
        }).then(function (permissionGranted) {
          if (!permissionGranted) {
            _this2.setState({
              permissionRequired: true
            });
          }
        });
      }

      // set open sidepanel button active after 4 seconds anyway
      (0, _utils.delayMs)(4000).then(function () {
        _this2.props.updateConfig({
          disableOpenSidepanelBtnTemporarily: false
        });
        _this2.setState({
          isOpenInSidePanelBtnActive: true
        });
      });
      (0, _global_state.getState)().then(function (state) {
        _this2.setState({
          tabIdToPlay: state.tabIds.toPlay
        });
      }).then(function () {
        if (!_web_extension["default"].isFirefox()) {
          chrome.sidePanel.setOptions({
            enabled: true
          });
        }
      });
      _storage["default"].get('config').then(function (config) {
        if (Object.keys(config).includes('disableOpenSidepanelBtnTemporarily')) {
          _this2.setState({
            isOpenInSidePanelBtnActive: !config.disableOpenSidepanelBtnTemporarily
          });
        } else {
          _this2.setState({
            isOpenInSidePanelBtnActive: true
          });
        }
      });
      _storage["default"].addListener(this.handleStorageChange);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var isWindows = /windows/i.test(window.navigator.userAgent);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dashboard"
      }, /*#__PURE__*/_react["default"].createElement(_editor["default"], {
        bottomPanelHeight: this.state.bottomPanelHeight
      }), /*#__PURE__*/_react["default"].createElement(_bottom["default"], {
        onBottomPanelHeightChange: this.onBottomPanelHeightChange
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "online-help"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        className: "btn-open-in-sidepanel",
        disabled: this.state.isOpenInSidePanelBtnActive && this.props.player.status === C.PLAYER_STATUS.STOPPED ? false : true,
        onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var userResponse;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                console.log('this.state.tabIdToPlay:>>', _this3.state.tabIdToPlay);
                if (!_web_extension["default"].isFirefox()) {
                  _context.next = 11;
                  break;
                }
                // below code doesn't work if it runs in IDE, but works if it runs in sidePanel or background
                // Ext.sidebarAction.open()
                // firefox issue as expected: sidebarAction.open may only be called from a user input handler
                // csIpc.ask('PANEL_SHOW_SIDEBAR') 
                userResponse = confirm('To open the sidebar, click OK and then click the extension icon in the toolbar.');
                if (userResponse) {
                  _context.next = 5;
                  break;
                }
                return _context.abrupt("return");
              case 5:
                _context.next = 7;
                return _this3.props.updateConfig(_defineProperty({}, "oneTimeShowSidePanel", true));
              case 7:
                (0, _save_test_case["default"])().save().then(function () {
                  window.close();
                })["catch"](function (err) {
                  console.log('getSaveTestCase err:>>', err);
                });
                return _context.abrupt("return");
              case 11:
                _context.next = 13;
                return chrome.sidePanel.open({
                  tabId: _this3.state.tabIdToPlay
                }).then(function (x) {
                  (0, _save_test_case["default"])().save().then(function () {
                    window.close();
                  })["catch"](function (err) {
                    console.log('getSaveTestCase err:>>', err);
                  });
                })["catch"](function (err) {
                  console.log('#25: open', err);
                });
              case 13:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faTableColumns
      }), /*#__PURE__*/_react["default"].createElement("span", null, "Open in Side Panel")), this.state.permissionRequired && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        className: "btn-request-permission",
        onClick: function onClick() {
          _this3.onGrantPermission();
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Tabs Permission Required")), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          visibility: isWindows ? 'visible' : 'hidden'
        }
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=visual",
        target: "_blank"
      })), /*#__PURE__*/_react["default"].createElement("div", null, "Ui.Vision Community:\xA0", /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=forum",
        target: "_blank"
      }, "Forums"), "\xA0|\xA0", /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=docs",
        target: "_blank"
      }, "Docs"), "\xA0|\xA0", /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=github",
        target: "_blank"
      }, "Open-Source"))));
    }
  }]);
  return Dashboard;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    player: state.player
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread({}, actions), dispatch);
})(Dashboard);

/***/ }),

/***/ 74428:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _utils = __webpack_require__(46580);
var _state = __webpack_require__(78493);
var _license = __webpack_require__(12277);
var _storage = __webpack_require__(97467);
__webpack_require__(65474);
var _test_cases = _interopRequireDefault(__webpack_require__(37649));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Sidebar = /*#__PURE__*/function (_React$Component) {
  _inherits(Sidebar, _React$Component);
  function Sidebar() {
    var _this;
    _classCallCheck(this, Sidebar);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Sidebar, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      drag: {
        isDragging: false,
        startX: 0,
        movingX: 0,
        lastWidth: 260,
        currentMinWidth: 260
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getSideBarMinWidth", function () {
      var _this$state$drag = _this.state.drag,
        isDragging = _this$state$drag.isDragging,
        lastWidth = _this$state$drag.lastWidth,
        currentMinWidth = _this$state$drag.currentMinWidth;
      return (isDragging ? currentMinWidth : lastWidth) + 'px';
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeDragStart", function (e) {
      // Note: Firefox requires us to set something to DataTransfer, otherwise drag and dragEnd won't be triggered
      // refer to https://stackoverflow.com/questions/33434275/firefox-on-drag-end-is-not-called-in-a-react-component
      e.dataTransfer.setData('text', '');
      var style = window.getComputedStyle(_this.$dom);
      var width = parseInt(style.width);
      _this.setState((0, _utils.setIn)(['drag'], {
        isDragging: true,
        // Check out the note on `screenX` in `onResizeDragEnd` event
        startX: e.screenX,
        lastWidth: width,
        currentWidth: width
      }, _this.state));
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeDragEnd", function (e) {
      // Note: use `screenX` instead of `clientX`, because `clientX` of dragEnd events in Firefox
      // is always set to 0, while `screenX` is luckily still available. And since we only make use of
      // difference of X coordinate. `screenX` and `clientX` both work for us.
      //
      // reference:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=505521
      // https://developer.mozilla.org/en-US/docs/Web/Events/dragend
      var diff = e.screenX - _this.state.drag.startX;
      var width = diff + _this.state.drag.lastWidth;
      _this.setState((0, _utils.setIn)(['drag'], {
        isDragging: false,
        startX: 0,
        lastWidth: width,
        currentMinWidth: width
      }));
    });
    _defineProperty(_assertThisInitialized(_this), "onTryToChangeStorageMode", function (storageMode) {
      // Steps:
      // 1. [pseudo code] StorageManager.changeMode()
      // 2. Try to refresh / reload all resources (macros, test suites, csvs, vision images)
      // 3. Be aware of any pending changes in current storage
      //
      // There should be no exception when switching back to browser mode
      // But `[pseudo code] StorageManager.changeMode(xFileMode)` should throw error when xFile is not ready.
      //
      // Once catched that error, should do following:
      // 1. Reset mode back to browser mode
      // 2. Show info dialog to encourage users to download xFile host

      var man = (0, _storage.getStorageManager)();
      man.isStrategyTypeAvailable(storageMode).then(function (isOk) {
        if (isOk) {
          // Note: it will emit events, so that `index.js` could handle the rest (refresh / reload resources)
          _this.props.updateConfig({
            storageMode: storageMode
          });
          return man.setCurrentStrategyType(storageMode);
        }
        throw new Error('It should be impossible to get isOk as false');
      })["catch"](function (e) {
        _antd.message.warn(e.message);
        if (e.message && /xFile is not installed yet/.test(e.message)) {
          _this.props.updateUI({
            showXFileNotInstalledDialog: true
          });
        } else {
          _this.props.updateUI({
            showSettings: true,
            settingsTab: 'xmodules'
          });
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "openRegisterSettings", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      _this.props.updateUI({
        showSettings: true,
        settingsTab: 'register'
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onClickSidebar", function () {
      _this.props.updateUI({
        focusArea: _state.FocusArea.Sidebar
      });
    });
    _defineProperty(_assertThisInitialized(_this), "applyTreeViewScrollTop", function () {
      (0, _utils.delayMs)(200).then(function () {
        (0, _utils.waitForRenderComplete)().then(function () {
          // const { src } = this.props.editing.meta
          // const selectedMacroId = src.id
          var selectedFileNodeElement = document.querySelector('.sidebar-macros .file-node.selected');
          if (selectedFileNodeElement) {
            selectedFileNodeElement.scrollIntoView({
              block: 'center'
            });
          }

          // TODO: remove macroTreeViewScrollTop from config if the change is accepted
          // alternative way to scroll to the last scroll position
          // const lastScrollTop = this.props.config.macroTreeViewScrollTop
          // console.log('render complete macroTreeViewScrollTop:>> ', this.props.config.macroTreeViewScrollTop)
          // const container =  document.querySelector('.sidebar-inner')
          // container.scrollTo({ top: lastScrollTop, behavior: 'instant' })
        });
      });
    });
    return _this;
  }
  _createClass(Sidebar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var type = (0, _storage.getStorageManager)().getCurrentStrategyType();
      this.setState({
        storageMode: type
      });
      // this.bindScroll()
      this.applyTreeViewScrollTop();
    }
  }, {
    key: "prefixHardDisk",
    value: function prefixHardDisk(str) {
      var isXFileMode = (0, _storage.getStorageManager)().isXFileMode();
      if (!isXFileMode) return str;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'inline-block'
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "./img/hard-drive.svg",
        style: {
          position: 'relative',
          top: '3px',
          marginRight: '5px',
          height: '15px'
        }
      }), /*#__PURE__*/_react["default"].createElement("span", null, str));
    }
  }, {
    key: "renderXFileNotInstalledModal",
    value: function renderXFileNotInstalledModal() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "",
        className: (0, _utils.cn)('xfile-not-installed-modal', {
          'left-bottom': this.props.ui.showXFileNotInstalledDialog === true
        }),
        width: 350,
        footer: null,
        open: this.props.ui.showXFileNotInstalledDialog,
        onCancel: function onCancel() {
          _this2.props.updateUI({
            showXFileNotInstalledDialog: false
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("p", null, "XFileAccess Module not installed."), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        onClick: function onClick() {
          _this2.props.updateUI({
            showXFileNotInstalledDialog: false,
            showSettings: true,
            settingsTab: 'xmodules'
          });
        }
      }, "Open Settings")));
    }
  }, {
    key: "shouldRenderMacroNote",
    value: function shouldRenderMacroNote() {
      var _this$props$config = this.props.config,
        xmodulesStatus = _this$props$config.xmodulesStatus,
        storageMode = _this$props$config.storageMode;
      if (storageMode !== _storage.StorageStrategyType.XFile) return false;
      if (xmodulesStatus === 'pro') return false;
      var macroStorage = (0, _storage.getStorageManager)().getMacroStorage();
      return macroStorage.getDisplayCount() < macroStorage.getTotalCount();
    }
  }, {
    key: "renderMacroNote",
    value: function renderMacroNote() {
      if (!this.shouldRenderMacroNote()) return null;
      var max = (0, _license.getLicenseService)().getMaxXFileMacros();
      var link = (0, _license.getLicenseService)().getUpgradeUrl();
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "note-for-macros"
      }, (0, _license.getLicenseService)().hasNoLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, "Hard-Drive Access (PRO Feature):", /*#__PURE__*/_react["default"].createElement("br", null), "In FREE version, only the first ", max, " files/folders are displayed.", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
        href: link,
        onClick: this.openRegisterSettings
      }, "Upgrade to PRO"), " to remove limit.") : null, (0, _license.getLicenseService)().isPersonalLicense() ? /*#__PURE__*/_react["default"].createElement("div", null, "XModules in Free Edition:", /*#__PURE__*/_react["default"].createElement("br", null), "Only the first ", max, " files/folders displayed.", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("a", {
        href: link,
        onClick: this.openRegisterSettings
      }, "Upgrade to PRO or Enterprise"), " for unlimited files") : null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('sidebar', {
          'with-xmodules-note': this.shouldRenderMacroNote()
        }),
        ref: function ref(el) {
          _this3.$dom = el;
        },
        style: {
          minWidth: this.getSideBarMinWidth()
        },
        onClickCapture: this.onClickSidebar
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('sidebar-inner', {
          'no-tab': !this.props.config.showTestCaseTab
        })
      }, !this.props.config.showTestCaseTab ? /*#__PURE__*/_react["default"].createElement(_test_cases["default"], null) : /*#__PURE__*/_react["default"].createElement("section", {
        style: {
          paddingTop: 20,
          overflowX: 'hidden'
        }
      }, /*#__PURE__*/_react["default"].createElement(_test_cases["default"], null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-storage-mode"
      }, this.renderMacroNote(), /*#__PURE__*/_react["default"].createElement("div", {
        className: "storage-mode-header"
      }, /*#__PURE__*/_react["default"].createElement("h3", null, "Storage Mode"), (0, _storage.getStorageManager)().isXFileMode() ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "./img/reload.svg",
        title: "Reload all resources on hard drive",
        style: {
          height: '15px',
          cursor: 'pointer'
        },
        onClick: function onClick() {
          (0, _storage.getStorageManager)().emit(_storage.StorageManagerEvent.ForceReload);
          _antd.message.info('reloaded from hard drive');
        }
      }) : null, /*#__PURE__*/_react["default"].createElement("a", {
        href: "https://goto.ui.vision/x/idehelp?help=storage_mode",
        target: "_blank"
      }, "More Info")), /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        style: {
          width: '100%'
        },
        placeholder: "Storage Mode",
        value: this.props.config.storageMode,
        onChange: this.onTryToChangeStorageMode
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: _storage.StorageStrategyType.Browser
      }, "Local Storage (in browser)"), /*#__PURE__*/_react["default"].createElement(_antd.Select.Option, {
        value: _storage.StorageStrategyType.XFile
      }, "File system (on hard drive)"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('resize-handler', {
          focused: this.state.drag.isDragging
        }),
        draggable: "true",
        onDragStart: this.onResizeDragStart,
        onDragEnd: this.onResizeDragEnd,
        onMouseDown: function onMouseDown() {
          return _this3.setState((0, _utils.setIn)(['drag', 'isDragging'], true, _this3.state));
        }
      }), this.renderXFileNotInstalledModal());
    }
  }]);
  return Sidebar;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    testSuites: state.editor.testSuites,
    editing: state.editor.editing,
    player: state.player,
    config: state.config,
    ui: state.ui
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread({}, actions), dispatch);
})(Sidebar);

/***/ }),

/***/ 37649:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _icons = __webpack_require__(29937);
var _antd = __webpack_require__(33061);
var _keycode = _interopRequireDefault(__webpack_require__(36545));
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _index = __webpack_require__(35127);
var _simple_actions = __webpack_require__(8588);
var _bookmark = __webpack_require__(66325);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _convert_utils = __webpack_require__(75852);
var _log = _interopRequireDefault(__webpack_require__(89130));
var _messages = _interopRequireDefault(__webpack_require__(6866));
var _player = __webpack_require__(18392);
var _ts_utils = __webpack_require__(1601);
var _context_menu = __webpack_require__(35802);
var _prompt = __webpack_require__(10409);
var _save_test_case = _interopRequireDefault(__webpack_require__(64305));
var _tree_file = __webpack_require__(78290);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _recomputed = __webpack_require__(87307);
var _state = __webpack_require__(78493);
var _license = __webpack_require__(12277);
var _types = __webpack_require__(58704);
var _storage = __webpack_require__(97467);
var _resource_not_loaded = __webpack_require__(11199);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Search = _antd.Input.Search;
var SidebarTestCases = /*#__PURE__*/function (_React$Component) {
  _inherits(SidebarTestCases, _React$Component);
  function SidebarTestCases() {
    var _this;
    _classCallCheck(this, SidebarTestCases);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, SidebarTestCases, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      showRename: false,
      rename: '',
      folderToImport: '/'
    });
    _defineProperty(_assertThisInitialized(_this), "unbindKeydown", function () {});
    // Rename relative
    _defineProperty(_assertThisInitialized(_this), "onClickRename", function () {
      _this.props.renameTestCase(_this.state.rename, _this.state.renameTcId).then(function () {
        _antd.message.success('successfully renamed!', 1.5);
        _this.toggleRenameModal(false);
      })["catch"](function (e) {
        _antd.message.error(e.message, 1.5);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onCancelRename", function () {
      _this.toggleRenameModal(false);
      _this.setState({
        rename: null
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onChangeRename", function (e) {
      _this.setState({
        rename: e.target.value
      });
    });
    _defineProperty(_assertThisInitialized(_this), "toggleRenameModal", function (toShow, macroNode) {
      _this.setState({
        showRename: toShow,
        renameTcId: macroNode && macroNode.fullPath
      });
      if (toShow) {
        setTimeout(function () {
          var input = _this.inputRenameTestCase.refs.input;
          input.focus();
          input.selectionStart = input.selectionEnd = input.value.length;
        }, 100);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "changeTestCase", function (id) {
      return new Promise(function (resolve) {
        if (_this.props.status !== C.APP_STATUS.NORMAL) return resolve(false);
        if (_this.props.editing.meta.src && _this.props.editing.meta.src.id === id) return resolve(true);
        var go = function go() {
          _this.props.editTestCase(id);
          resolve(true);
        };

        // Do not ask for save if it's currently on Untitled and no commands in it
        if (_this.props.editing.commands.length === 0 && !_this.props.editing.meta.src) {
          return go();
        }
        return (0, _save_test_case["default"])().saveOrNot().then(go);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "playTestCase", function (id) {
      if (_this.props.status !== C.APP_STATUS.NORMAL) return;
      _this.changeTestCase(id).then(function (shouldPlay) {
        if (!shouldPlay) return;
        setTimeout(function () {
          var commands = _this.props.editing.commands;
          var openTc = commands.find(function (item) {
            return item.cmd.toLowerCase() === 'open';
          });
          var src = _this.props.editing.meta.src;
          var getMacroName = function getMacroName() {
            return src && src.name && src.name.length ? src.name : 'Untitled';
          };
          var getMacroId = function getMacroId() {
            return src ? src.id : C.UNTITLED_ID;
          };
          _this.props.playerPlay({
            macroId: getMacroId(),
            title: getMacroName(),
            extra: {
              id: getMacroId()
            },
            mode: (0, _player.getPlayer)().C.MODE.STRAIGHT,
            startIndex: 0,
            startUrl: openTc ? openTc.target : null,
            resources: commands,
            postDelay: _this.props.player.playInterval * 1000
          });
        }, 500);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onJsonOrZipFileChange", function (e) {
      setTimeout(function () {
        _this.jsonFileInput.value = null;
      }, 500);
      return _this.props.importMacroJsonOrZipFiles(e.target.files, _this.state.folderToImport);
    });
    _defineProperty(_assertThisInitialized(_this), "addTestCase", function () {
      return (0, _save_test_case["default"])().saveOrNot().then(function () {
        _this.props.macroCreateFile({
          dir: '/'
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onClickMacroNode", function (data, paths, e) {
      if (data.type === _tree_file.FileNodeType.File) {
        _this.changeTestCase(data.id);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onContextMenuNode", function (data, paths, e) {
      return _this.showContextMenuForEntry(data, e);
    });
    _defineProperty(_assertThisInitialized(_this), "onToggleNode", function (data, paths) {
      return _this.props.updateMacroExtra(data.id, {
        folded: !data.folded
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onMoveNode", function (sourceId, targetId, isDirectory) {
      var isUnsaved = document.querySelector('.select-case button').disabled;
      if (!isUnsaved) {
        return store.dispatch((0, _index.saveEditingAsExisted)()).then(function () {
          _this.props.macroMoveEntry({
            entryId: sourceId,
            dirId: targetId,
            isSourceDirectory: isDirectory
          });
        });
      } else {
        _this.props.macroMoveEntry({
          entryId: sourceId,
          dirId: targetId,
          isSourceDirectory: isDirectory
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onDoubleClickNode", function (data, paths, e) {
      if (data.type === _tree_file.FileNodeType.File) {
        _this.playTestCase(data.id);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "testCaseMenu", function () {
      return [{
        key: 'new_macro_folder',
        label: 'New Folder',
        onClick: function onClick() {
          _this.props.macroCreateFolder({
            name: 'untitled',
            dir: '/'
          });
        }
      }, {
        key: 'import_json',
        label: 'Import JSON or ZIP',
        onClick: function onClick() {
          var $selectFile = document.getElementById('select_json_files_for_macros');
          if ($selectFile) {
            _this.setState({
              folderToImport: '/'
            });
            $selectFile.click();
          }
        }
      }];
    });
    return _this;
  }
  _createClass(SidebarTestCases, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.bindKeydown();
    }
  }, {
    key: "bindKeydown",
    value: function bindKeydown() {
      var _this2 = this;
      var fn = function fn(e) {
        if (!_this2.props.canUseKeyboardShortcuts) {
          return;
        }
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
          return;
        }
        switch ((0, _keycode["default"])(e)) {
          case 'up':
            e.preventDefault();
            return _this2.props.editMacroByOffset(-1);
          case 'down':
            e.preventDefault();
            return _this2.props.editMacroByOffset(1);
        }
      };
      document.addEventListener('keydown', fn, true);
      this.unbindKeydown = function () {
        return document.removeEventListener('keydown', fn, true);
      };
    }
  }, {
    key: "selectFirstMacro",
    value: function selectFirstMacro() {
      // if no macro is selected, select the first one
      if (this.props.editing.commands.length === 0 && !this.props.editing.meta.src) {
        var filteredMacroFileNodeData = this.props.filteredMacroFileNodeData;
        if (filteredMacroFileNodeData && filteredMacroFileNodeData.length) {
          var getFileMacroRecursiveLyByIncrementalLevel = function getFileMacroRecursiveLyByIncrementalLevel(node, level) {
            if (node.type === _tree_file.FileNodeType.File) {
              return node;
            }
            if (node.children && node.children.length) {
              return getFileMacroRecursiveLyByIncrementalLevel(node.children[level], level + 1);
            }
            return null;
          };
          var firstFileMacro = getFileMacroRecursiveLyByIncrementalLevel(filteredMacroFileNodeData[0], 0);
          firstFileMacro && this.changeTestCase(firstFileMacro.id);
        }
      }
    }
  }, {
    key: "renderMacros",
    value: function renderMacros() {
      var filteredMacroFileNodeData = this.props.filteredMacroFileNodeData;
      if (this.props.isLoadingMacros && this.props.isMacroFolderNodeListEmpty) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "no-data"
        }, "Loading macros...");
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "sidebar-macros"
      }, filteredMacroFileNodeData.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "no-data"
      }, "No macro found") : null, /*#__PURE__*/_react["default"].createElement(_tree_file.FileTree, {
        nodes: filteredMacroFileNodeData,
        rootPath: (0, _storage.getStorageManager)().getMacroStorage().dirPath(''),
        onClick: this.onClickMacroNode,
        onContextMenu: this.onContextMenuNode,
        onToggle: this.onToggleNode,
        onMove: this.onMoveNode,
        onDoubleClick: this.onDoubleClickNode
      }));
    }
  }, {
    key: "showContextMenuForEntry",
    value: function showContextMenuForEntry(entry, e) {
      switch (entry.type) {
        case _tree_file.FileNodeType.File:
          return this.showContextMenuForMacro(entry, e);
        case _tree_file.FileNodeType.Folder:
          return this.showContextMenuForFolder(entry, e);
      }
    }
  }, {
    key: "showContextMenuForFolder",
    value: function showContextMenuForFolder(folderEntry, e) {
      var _this3 = this;
      e.stopPropagation();
      e.preventDefault();
      (0, _context_menu.hideContextMenu)();
      return (0, _context_menu.showContextMenu)({
        x: e.clientX,
        y: e.clientY,
        onHide: function onHide() {},
        menuItems: [{
          type: _context_menu.MenuItemType.Button,
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit),
          data: {
            content: 'New macro',
            onClick: function onClick() {
              return (0, _save_test_case["default"])().saveOrNot().then(function () {
                _this3.props.macroCreateFile({
                  dir: folderEntry.entryPath
                });
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'New folder',
            onClick: function onClick() {
              _this3.props.macroCreateFolder({
                name: 'untitled',
                dir: folderEntry.entryPath
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Rename',
            onClick: function onClick() {
              _this3.props.macroRenameFolder({
                dir: folderEntry.entryPath
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Delete',
            onClick: function onClick() {
              _this3.props.macroDeleteFolder({
                dir: folderEntry.entryPath
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Divider,
          data: {}
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Testsuite: Play all in folder',
            onClick: function onClick() {
              var folderName = folderEntry.name;
              var macros = folderEntry.children.filter(function (item) {
                return item.type === _tree_file.FileNodeType.File;
              });
              (0, _player.getPlayer)({
                name: 'testSuite'
              }).play({
                title: folderName,
                mode: (0, _player.getPlayer)().C.MODE.STRAIGHT,
                startIndex: 0,
                resources: macros.map(function (item) {
                  return {
                    id: item.id,
                    loops: 1
                  };
                }),
                extra: {
                  id: folderEntry.id,
                  name: folderName
                }
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Testsuite: Play in loop',
            onClick: function onClick() {
              var playInLoops = function playInLoops(loopsStr) {
                var loops = parseInt(loopsStr);
                if (isNaN(loops) || loops < 1) {
                  throw new Error("Invalid loops: ".concat(loopsStr));
                }
                var folderName = folderEntry.name;
                var macros = folderEntry.children.filter(function (item) {
                  return item.type === _tree_file.FileNodeType.File;
                });
                (0, _player.getPlayer)({
                  name: 'testSuite'
                }).play({
                  title: folderName,
                  mode: loops === 1 ? (0, _player.getPlayer)().C.MODE.STRAIGHT : (0, _player.getPlayer)().C.MODE.LOOP,
                  loopsStart: 1,
                  loopsEnd: loops,
                  startIndex: 0,
                  resources: macros.map(function (item) {
                    return {
                      id: item.id,
                      loops: 1
                    };
                  }),
                  extra: {
                    id: folderEntry.id,
                    name: folderName
                  }
                });
              };
              var run = function run() {
                return (0, _prompt.prompt)({
                  width: 400,
                  title: 'How many loops?',
                  message: '',
                  value: '2',
                  placeholder: 'Loops',
                  inputType: 'number',
                  selectionStart: 0,
                  selectionEnd: 1,
                  okText: 'Play',
                  cancelText: 'Cancel',
                  onCancel: function onCancel() {
                    return Promise.resolve(true);
                  },
                  onOk: playInLoops
                })["catch"](function (e) {
                  _antd.message.error(e.message);
                  setTimeout(run, 0);
                });
              };
              return run();
            }
          }
        }, {
          type: _context_menu.MenuItemType.Divider,
          data: {}
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Import JSON or ZIP',
            onClick: function onClick() {
              var $selectFile = document.getElementById('select_json_files_for_macros');
              if ($selectFile) {
                _this3.setState({
                  folderToImport: folderEntry.entryPath
                });
                $selectFile.click();
              }
            }
          }
        }]
      });
    }
  }, {
    key: "showContextMenuForMacro",
    value: function showContextMenuForMacro(macroEntry, event) {
      var _this4 = this;
      var macros = this.props.macros;
      var macroNode = macros.find(function (item) {
        return item.fullPath === macroEntry.id;
      });
      if (!macroNode) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      (0, _context_menu.hideContextMenu)();
      var e = {
        clientX: event.clientX,
        clientY: event.clientY,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {}
      };
      return (0, _context_menu.showContextMenu)({
        x: e.clientX,
        y: e.clientY,
        onHide: function onHide() {},
        menuItems: [{
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Play',
            onClick: function onClick() {
              _this4.playTestCase(macroNode.fullPath);
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Testsuite: Play from here',
            onClick: function onClick() {
              var macroStorage = (0, _storage.getStorageManager)().getMacroStorage();
              var path = macroStorage.getPathLib();
              var dirPath = path.dirname(macroEntry.entryPath);
              return macroStorage.list(dirPath).then(function (entries) {
                var macros = entries.filter(function (entry) {
                  return entry.isFile;
                });
                var index = macros.findIndex(function (macro) {
                  return macro.fullPath === macroEntry.entryPath;
                });
                if (index === -1) {
                  return;
                }
                var folderName = path.basename(dirPath);
                (0, _player.getPlayer)({
                  name: 'testSuite'
                }).play({
                  title: folderName,
                  mode: (0, _player.getPlayer)().C.MODE.STRAIGHT,
                  startIndex: index,
                  resources: macros.map(function (item) {
                    return {
                      id: item.fullPath,
                      loops: 1
                    };
                  }),
                  extra: {
                    id: dirPath,
                    name: folderName
                  }
                });
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Rename..',
            onClick: function onClick() {
              return (0, _save_test_case["default"])().saveOrNot().then(function () {
                _this4.setState({
                  rename: macroNode.name
                });
                _this4.toggleRenameModal(true, macroNode);
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit),
          data: {
            content: 'Duplicate..',
            onClick: function onClick() {
              return (0, _save_test_case["default"])().saveOrNot().then(function () {
                _this4.props.duplicateTestCase(macroNode);
              });
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Export as JSON',
            onClick: function onClick() {
              _this4.props.downloadMacroAsJson(macroNode.fullPath);
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Export as ZIP (json, img & csv)',
            onClick: function onClick() {
              _this4.props.downloadMacroAsZip(macroNode.fullPath);
            }
          }
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Add shortcut to bookmarks bar',
            onClick: function onClick() {
              var bookmarkTitle = window.prompt('Title for this bookmark', "#".concat(macroNode.name, ".rpa"));
              if (bookmarkTitle === null) return;
              (0, _bookmark.createBookmarkOnBar)((0, _convert_utils.toBookmarkData)({
                bookmarkTitle: bookmarkTitle,
                path: macroNode.relativePath
              })).then(function () {
                _antd.message.success('successfully created bookmark!', 1.5);
              });
            }
          }
        }, (0, _storage.getStorageManager)().isXFileMode() ? {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Copy to Local Storage',
            onClick: function onClick() {
              (0, _storage.getStorageManager)().isStrategyTypeAvailable(_storage.StorageStrategyType.Browser).then(function () {
                var macroStorage = (0, _storage.getStorageManager)().getStorageForTarget(_storage.StorageTarget.Macro, _storage.StorageStrategyType.Browser);
                return (0, _storage.getStorageManager)().getStorageForTarget(_storage.StorageTarget.Macro, _storage.StorageStrategyType.XFile).read(macroNode.fullPath, 'Text').then(function (macro) {
                  var tcCopy = _objectSpread(_objectSpread({}, macro), {}, {
                    id: (0, _ts_utils.uid)()
                  });
                  delete tcCopy.status;
                  return macroStorage.write(tcCopy.name, tcCopy).then(function () {
                    return _antd.message.success('copied');
                  });
                });
              })["catch"](function (e) {
                _antd.message.warn(e.message);
              });
            }
          }
        } : null, (0, _storage.getStorageManager)().isBrowserMode() ? {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Copy to Macro Folder',
            onClick: function onClick() {
              (0, _storage.getStorageManager)().isStrategyTypeAvailable(_storage.StorageStrategyType.XFile).then(function () {
                var macroStorage = (0, _storage.getStorageManager)().getStorageForTarget(_storage.StorageTarget.Macro, _storage.StorageStrategyType.XFile);
                return (0, _storage.getStorageManager)().getStorageForTarget(_storage.StorageTarget.Macro, _storage.StorageStrategyType.Browser).read(macroNode.fullPath, 'Text').then(function (macro) {
                  var tcCopy = _objectSpread(_objectSpread({}, macro), {}, {
                    id: (0, _ts_utils.uid)()
                  });
                  delete tcCopy.status;
                  return macroStorage.write(tcCopy.name, tcCopy).then(function () {
                    return _antd.message.success('copied');
                  });
                });
              })["catch"](function (e) {
                _log["default"].error(e);
                _this4.props.updateUI({
                  showXFileNotInstalledDialog: 1
                });
              });
            }
          }
        } : null, {
          type: _context_menu.MenuItemType.Divider,
          data: {}
        }, {
          type: _context_menu.MenuItemType.Button,
          disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit),
          data: {
            content: 'Delete',
            onClick: function onClick() {
              var go = function go() {
                return _this4.props.removeTestCase(macroNode.fullPath).then(function () {
                  _antd.message.success('successfully deleted!', 1.5);
                })["catch"](function (e) {
                  _antd.Modal.warning({
                    title: 'Failed to delete',
                    content: e.message
                  });
                });
              };
              _antd.Modal.confirm({
                title: 'Sure to delete?',
                content: "Do you really want to delete \"".concat(macroNode.name, "\"?"),
                okText: 'Delete',
                cancelText: 'Cancel',
                onOk: go,
                onCancel: function onCancel() {}
              });
            }
          }
        }].filter(function (x) {
          return x;
        })
      });
    }
  }, {
    key: "renderRenameModal",
    value: function renderRenameModal() {
      var _this5 = this;
      return /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "Rename the macro as..",
        okText: "Save",
        cancelText: "Cancel",
        open: this.state.showRename,
        onOk: this.onClickRename,
        onCancel: this.onCancelRename,
        className: "rename-modal"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        style: {
          width: '100%'
        },
        value: this.state.rename,
        onKeyDown: function onKeyDown(e) {
          e.keyCode === 13 && _this5.onClickRename();
        },
        onChange: this.onChangeRename,
        placeholder: "macro name",
        ref: function ref(el) {
          _this5.inputRenameTestCase = el;
        }
      }));
    }
  }, {
    key: "renderShowListAction",
    value: function renderShowListAction() {
      var _this6 = this;
      return /*#__PURE__*/_react["default"].createElement(_resource_not_loaded.ResourceNotLoaded, {
        name: "Macro list",
        from: this.props.from,
        showList: function showList() {
          _this6.props.setFrom(_state.RunBy.Manual);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;
      if (!this.props.shouldLoadResources) {
        return this.renderShowListAction();
      }
      if (this.props.isPlaying && this.props.macros.length > _config["default"].performanceLimit.fileCount) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "hidden-during-replay"
        }, _messages["default"].contentHidden);
      }
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        multiple: true,
        type: "file",
        accept: ".json, .zip",
        id: "select_json_files_for_macros",
        onChange: this.onJsonOrZipFileChange,
        ref: function ref(_ref) {
          _this7.jsonFileInput = _ref;
        },
        style: {
          display: 'none'
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "test-case-actions"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        disabled: !(0, _license.getLicenseService)().canPerform(_types.Feature.Edit),
        onClick: this.addTestCase
      }, "+ Macro"), /*#__PURE__*/_react["default"].createElement(_antd.Dropdown, {
        menu: {
          items: this.testCaseMenu()
        },
        trigger: ['click']
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        shape: "circle",
        icon: /*#__PURE__*/_react["default"].createElement(_icons.FolderAddOutlined, null)
      })), /*#__PURE__*/_react["default"].createElement(Search, {
        placeholder: "search macro",
        value: this.props.searchText,
        onChange: function onChange(e) {
          return _this7.props.setMacroQuery(e.target.value);
        },
        allowClear: true
      })), this.renderMacros(), this.renderRenameModal(), this.selectFirstMacro());
    }
  }]);
  return SidebarTestCases;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    from: state.from,
    shouldLoadResources: (0, _recomputed.getShouldLoadResources)(state),
    isLoadingMacros: state.isLoadingMacros,
    isMacroFolderNodeListEmpty: (0, _recomputed.isMacroFolderNodeListEmpty)(state),
    macroFileNodeData: (0, _recomputed.getMacroFileNodeData)(state),
    macros: (0, _recomputed.getMacroFileNodeList)(state),
    isPlaying: (0, _recomputed.isPlaying)(state),
    testSuites: state.editor.testSuites,
    editing: state.editor.editing,
    player: state.player,
    config: state.config,
    ignoreTargetOptions: (0, _recomputed.getShouldIgnoreTargetOptions)(state),
    searchText: state.macroQuery,
    filteredMacroFileNodeData: (0, _recomputed.getFilteredMacroFileNodeData)(state),
    canUseKeyboardShortcuts: (0, _recomputed.isFocusOnSidebar)(state) && state.ui.sidebarTab !== 'test_suites'
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(SidebarTestCases);

/***/ }),

/***/ 1697:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.header{display:flex;flex-direction:row;justify-content:space-between;overflow:hidden;padding:0 20px;width:100%;height:44px;border-bottom:2px solid #ccc;background-color:#f9f9f9}.header .status{float:right;line-height:42px;font-size:14px}.header .status h1{margin:0;font-size:20px;line-height:44px}.header .select-case{display:flex;align-items:center;line-height:44px;font-size:13px}.header .select-case .test-case-name{margin-right:15px;line-height:35px;max-width:100px;overflow:hidden;display:inline-block;white-space:nowrap;text-overflow:ellipsis}.header .select-case .test-case-name.unsaved{color:orange}.header .select-case .test-case-name.unsaved::after{content:"*";margin-left:3px}.header .actions{margin-top:6px}.header .actions .ant-btn-group>.ant-btn-group{float:none}.header .actions .play-actions{margin:0 10px}.ant-dropdown-menu{max-height:300px;overflow-y:auto}.ant-dropdown-menu .editing{color:blue !important}.settings-modal .ant-tabs-nav .ant-tabs-tab{padding:8px 6px}.settings-modal .ant-checkbox-wrapper+.ant-checkbox-wrapper{margin-left:0}.settings-modal .ant-checkbox-wrapper{margin-bottom:5px}.settings-modal .tip{margin-left:15px;color:#aaa}.settings-modal label[title="Replay Helper"]{align-items:start}.settings-modal label[title="Ui.Vision Side Panel"]{align-items:start}.settings-modal .xmodule-item{margin-bottom:25px;padding:15px;border:2px solid #333;font-size:14px;box-shadow:rgba(0,0,0,.5) 0px 2px 5px 0px}.settings-modal .xmodule-item label{margin-right:15px;width:100px;font-size:14px}.settings-modal .xmodule-item .xmodule-title{margin-bottom:10px;font-size:14px}.settings-modal .xmodule-item .xmodule-title>*{margin-right:20px}.settings-modal .xmodule-item .xmodule-title>*:last-child{margin-right:0}.settings-modal .xmodule-item .xmodule-status{display:flex;margin-bottom:20px}.settings-modal .xmodule-item .xmodule-status .status-box>*{margin-right:15px}.settings-modal .xmodule-item .xmodule-status .status-box>*:last-child{margin-right:0}.settings-modal .xmodule-item .xmodule-settings h3{margin-bottom:10px;font-size:14px;font-weight:bold}.settings-modal .xmodule-item .xmodule-settings .xmodule-settings-item .settings-detail{display:flex;flex-direction:row;margin-bottom:10px}.settings-modal .xmodule-item .xmodule-settings .xmodule-settings-item .settings-detail .settings-detail-content{flex:1}.settings-modal .xmodule-item .xmodule-settings .check-result{margin-top:5px;color:red;font-size:13px}.settings-modal .backup-pane{padding:0 20px}.settings-modal .backup-pane h4{font-size:16px;margin-bottom:10px}.settings-modal .backup-pane .row{margin-bottom:10px}.settings-modal .backup-pane p{margin-bottom:5px}.settings-modal .backup-pane ul{list-style:none;padding-left:0px}.settings-modal .backup-pane ul li{margin-bottom:5px}.settings-modal .api-pane{padding:0 20px 20px}.settings-modal .api-pane p{margin:20px 0}.settings-modal .selenium-pane{padding:0 10px 20px}.settings-modal .selenium-pane h4{font-size:16px;margin-bottom:10px}.settings-modal .selenium-pane .import-row{margin-top:20px;margin-bottom:20px}.settings-modal .selenium-pane .import-row button{margin-right:20px}.settings-modal .security-pane{padding:0 20px 20px}.settings-modal .security-pane h4{font-size:16px;margin-bottom:10px}.settings-modal .security-pane p{margin-bottom:10px}.settings-modal .security-pane label{margin-right:10px}.settings-modal .security-pane .ant-radio-group{display:flex;flex-direction:column}.settings-modal .security-pane .ant-radio-wrapper{height:30px;line-height:30px}.settings-modal .security-pane .input-line{display:flex;align-items:center;margin-bottom:10px}.settings-modal .security-pane .input-line .input-label{width:120px}.settings-modal .security-pane .input-line .ant-checkbox-wrapper{margin-left:15px}.settings-modal .security-pane .input-line a{margin-left:20px}.settings-modal .ocr-pane{padding:0 10px 20px}.settings-modal .ocr-pane p{margin-bottom:10px}.settings-modal .ocr-pane .row{margin-bottom:20px}.settings-modal .ocr-pane .radio-block .ant-radio-wrapper{display:flex;flex-direction:row;line-height:30px}.settings-modal .ocr-pane .radio-block .ant-radio-wrapper.need-pro{color:gray}.settings-modal .ocr-pane .radio-block .ant-radio-wrapper .ant-radio{margin-top:4px}.settings-modal .ocr-pane .radio-block .ant-radio-wrapper .offline-label{display:inline-block;width:80px}.settings-modal .ocr-pane .label-text{margin-right:15px}.settings-modal .ocr-pane .ant-checkbox{align-self:start;margin-top:2px}.settings-modal .vision-pane{padding:0 10px 20px}.settings-modal .vision-pane p{margin-bottom:10px}.settings-modal .vision-pane .row{margin-bottom:10px}.settings-modal .vision-pane .ant-radio-wrapper{display:flex;flex-direction:row;line-height:30px}.settings-modal .vision-pane .ant-radio-wrapper .ant-radio{margin-top:8px;align-self:start}.settings-modal .vision-pane .ant-form-item label{width:280px;color:rgba(0,0,0,.65)}.settings-modal .xmodules-pane{padding:0 0 20px}.settings-modal .register-pane .register-note{width:80%}.settings-modal .register-pane .register-note .actions{margin-top:15px}.settings-modal .register-pane .register-note.inactive,.settings-modal .register-pane .register-note.inactive a{color:#aaa}.settings-modal .register-pane .register-form{margin-top:25px}.settings-modal .register-pane .register-form label{display:block;margin-bottom:10px;font-weight:bold}.settings-modal .register-pane .register-form .register-row{display:flex;flex-direction:row}.settings-modal .register-pane .register-form .register-row input{margin-right:15px;width:40%}.settings-modal .register-pane .register-status{margin-top:25px}.settings-modal .register-pane .register-status a{margin-left:15px}.settings-modal .offline-modal-label{display:inline-block;width:80px;margin-top:3%}.settings-modal .offline-modal-row{margin-left:15%;margin-top:3%}.api-key-notification{font-size:12px;margin-left:8px}.ai-tab .ai-settings-item{display:flex;flex-direction:row;align-items:center;margin-bottom:20px}.ai-tab .ai-settings-item .label-text{min-width:60px}.ai-tab .ai-settings-item input{width:300px}.ai-tab .ai-settings-item button{margin-left:10px}.ai-tab .ai-response{margin-bottom:10px;width:100%}.ai-tab .ai-response pre{text-wrap:auto;border:1px solid #d3d3d3;padding:5px;border-radius:5px;height:60px;line-height:17px}.ai-tab .ai-chat-in-sidebar{margin-bottom:20px}.ai-tab .ai-chat-in-sidebar label{margin-bottom:15px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 43791:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.select-input{position:relative}.select-input input{padding-right:24px}.select-input .arrow-icon{position:absolute;top:20%;right:8px;transform:scale(0.75) rotate(0deg);color:rgba(0,0,0,.43);transition:transform .2s ease;pointer-events:none;cursor:pointer;font-size:larger}.select-input.opened .arrow-icon{transform:scale(0.75) rotate(180deg)}.drop-down .option-list{position:absolute;z-index:1000;border-radius:4px;font-size:12px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.2)}.drop-down .option-list .plain-text-option{padding:7px 8px;cursor:pointer}.drop-down .option-list .plain-text-option.selected{background-color:#f7f7f7;font-weight:600}.drop-down .option-list .plain-text-option:hover{background-color:#ecf6fd}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 70691:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.dashboard{display:flex;flex-direction:column;flex:1;margin:15px 15px 0}.dashboard .flex-row{display:flex;flex-direction:row}.dashboard .form-group{margin-bottom:15px}.dashboard .toolbox{display:flex}.dashboard .toolbox .record-ops{flex:1;text-align:right}.dashboard .toolbox .play-ops{margin-left:15px}.dashboard .ant-table-wrapper .ant-table.ant-table-middle{font-size:12px}.dashboard .ant-table-pagination{display:none}.dashboard .ant-table-header{overflow:hidden !important;margin-bottom:0 !important;padding-bottom:0 !important}.dashboard .ant-table-header .ant-table-thead>tr>th{padding:13px 8px}.dashboard .ant-table-body .ant-table-thead>tr>th{padding:10px 8px}.dashboard .ant-table-tbody>tr>td{padding:8px 8px}.dashboard tr.selected-command>td{background-color:#fdffd1 !important}.dashboard tr.error-command>td{background-color:#f7c1c1 !important}.dashboard tr.running-command>td{background-color:#d5d6f9 !important}.dashboard tr.done-command>td{background-color:#d1ffd8 !important}.dashboard div.error-command{background-color:#f7c1c1 !important}.dashboard div.running-command{background-color:#d5d6f9 !important}.dashboard div.done-command{background-color:#d1ffd8 !important}.dashboard div.selected-command{background-color:#fdffd1 !important}.dashboard .ant-btn-group>.ant-btn-group{float:none}.dashboard .ant-form-item{margin-bottom:8px}.dashboard .editor-wrapper{display:flex;flex-direction:column;flex:2}.dashboard .editor-wrapper .tabs-wrapper{position:relative;display:flex;flex-direction:column;flex:1}.dashboard .editor-wrapper .tabs-wrapper .ant-tabs-nav{margin-bottom:0px}.dashboard .editor-wrapper .tabs-wrapper .ant-tabs-content{height:100%}.dashboard .editor-wrapper .tabs-wrapper .vision-type{position:absolute;right:0;top:0px;display:flex;flex-direction:row;align-items:center;cursor:pointer}.dashboard .editor-wrapper .tabs-wrapper .vision-type svg{display:block;margin-right:5px;width:20px;height:20px}.dashboard .editor-wrapper .tabs-wrapper .vision-type span{text-decoration:underline;color:#108ee9;font-size:16px}.dashboard .commands-view{display:flex;flex-direction:column;flex:2}.dashboard .commands-view .ant-tabs-bar{margin-bottom:0}.dashboard .commands-view .ant-tabs-content{display:flex;flex-direction:column;flex:1;padding:10px;border:1px solid #d9d9d9;border-width:0 1px 1px}.dashboard .commands-view .ant-tabs-content .ant-tabs-tabpane{flex:1;flex-shrink:unset !important;position:relative}.dashboard .commands-view .ant-tabs-content .table-wrapper{position:absolute;top:0;bottom:165px;left:0;right:0;overflow-y:auto}.dashboard .commands-view .ant-tabs-content .table-wrapper.rcv-table-wrapper{overflow-y:unset}.dashboard .commands-view .ant-tabs-content .table-wrapper.rcv-table-wrapper div[role=columnheader]{font-size:13px;text-transform:none;margin-left:5px}.dashboard .commands-view .ant-tabs-content .fields-wrapper{position:absolute;left:0;right:0;bottom:0;height:155px}.dashboard .commands-view .ant-tabs-content .fields-wrapper .ant-form-item-label{text-align:left}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .flex-row{align-items:center}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .select-input{flex:1}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .select-input input{width:100%}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .textarea-wrapper{position:relative;flex:1;max-width:60%;margin-right:10px}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .textarea-wrapper .open-full-editor{position:absolute;bottom:5px;right:15px;cursor:pointer}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row .textarea-wrapper .open-full-editor:hover{color:#108ee9}.dashboard .commands-view .ant-tabs-content .fields-wrapper .target-row button{margin-left:10px}.dashboard .commands-view .ant-tabs-content .react-codemirror2{position:relative}.dashboard .commands-view .ant-tabs-content .react-codemirror2.has-error{height:calc(100% - 70px)}.dashboard .commands-view .ant-tabs-content .react-codemirror2.no-error{height:calc(100% - 0px)}.dashboard .commands-view .ant-tabs-content .react-codemirror2 .CodeMirror{position:absolute;top:0;bottom:0;left:0;right:0;height:auto;font-size:13px}.dashboard .commands-view .ant-tabs-content .ant-table-wrapper,.dashboard .commands-view .ant-tabs-content .ant-spin-nested-loading,.dashboard .commands-view .ant-tabs-content .ant-spin-container,.dashboard .commands-view .ant-tabs-content .ant-table,.dashboard .commands-view .ant-tabs-content .ant-table-content,.dashboard .commands-view .ant-tabs-content .ant-table-scroll{display:flex;flex-direction:column;flex:1}.dashboard .commands-view .ant-tabs-content .ant-table-scroll{overflow-y:auto}.dashboard .commands-view.target-as-textarea .ant-tabs-content .table-wrapper{bottom:179px}.dashboard .commands-view.target-as-textarea .ant-tabs-content .fields-wrapper{height:169px}.dashboard .commands-view.target-as-textarea .ant-tabs-content .fields-wrapper textarea{resize:none}.dashboard .commands-view .command-row{position:relative;display:flex;flex-direction:row;padding-left:5px;border-bottom:1px solid #e9e9e9;line-height:35px;font-size:13px;cursor:default}.dashboard .commands-view .command-row:hover{background:#ecf6fd}.dashboard .commands-view .command-row.dragging{opacity:0}.dashboard .commands-view .command-row.header-row,.dashboard .commands-view .command-row.footer-row{background-color:#f7f7f7;font-weight:bold}.dashboard .commands-view .command-row.footer-row{display:block;text-align:center;cursor:pointer}.dashboard .commands-view .command-row.breakpoint-command::before{content:"";position:absolute;top:50%;left:0;transform:translateY(-50%);width:0;height:0;border:8px solid rgba(0,0,0,0);border-left-color:green}.dashboard .commands-view .command-row.error-command{background-color:#f7c1c1;color:red}.dashboard .commands-view .command-row.error-command.blur{background-color:rgba(247,193,193,.6)}.dashboard .commands-view .command-row.warning-command{background-color:rgba(248,207,157,.7);color:orange}.dashboard .commands-view .command-row.warning-command.blur{background-color:rgba(248,207,157,.3)}.dashboard .commands-view .command-row.running-command{background-color:#d5d6f9}.dashboard .commands-view .command-row.running-command.blur{background-color:rgba(213,214,249,.6)}.dashboard .commands-view .command-row.done-command{background-color:#d1ffd8}.dashboard .commands-view .command-row.done-command.blur{background-color:rgba(209,255,216,.6)}.dashboard .commands-view .command-row.selected-command{background-color:#fdffd1}.dashboard .commands-view .command-row.selected-command.blur{background-color:rgba(253,255,209,.6)}.dashboard .commands-view .command-row.comment-command{background-color:rgba(0,0,0,0);color:#ccc;font-style:italic}.dashboard .commands-view .command-row.comment-command.selected-command{background-color:#fdffd1}.dashboard .commands-view .command-row.comment-command.selected-command.blur{background-color:rgba(253,255,209,.6)}.dashboard .commands-view .command-row .commentout-button::before{content:"//";position:relative;top:-2px}.dashboard .commands-view .command-row .row-col{padding:0 8px}.dashboard .commands-view .command-row .row-col.index-col{padding:0;width:25px;text-align:center}.dashboard .commands-view .command-row .row-col.command-col{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dashboard .commands-view .command-row .row-col.target-col{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dashboard .commands-view .command-row .row-col.value-col{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dashboard .commands-view .command-row .row-col.op-col{width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.dashboard .table-footer{line-height:32px;text-align:center;font-weight:bold;background:#f7f7f7;cursor:pointer}.dashboard .table-footer:hover{background:#e0e0e0}.dashboard .logs-screenshots{display:flex;flex-direction:column;position:relative;margin-top:15px}.dashboard .logs-screenshots .ant-tabs-content{height:100%}.dashboard .logs-screenshots .ant-tabs-content-holder{overflow-y:auto}.dashboard .logs-screenshots.fold{height:32px !important;overflow:hidden}.dashboard .logs-screenshots.fold .ant-tabs-content{display:none}.dashboard .logs-screenshots .resize-handler{position:absolute;top:-10px;left:0;width:100%;height:6px;background:rgba(0,0,0,0);cursor:row-resize}.dashboard .logs-screenshots .resize-handler:hover,.dashboard .logs-screenshots .resize-handler.focused{height:6px;background:#ccc}.dashboard .logs-screenshots .ant-tabs.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab{padding:5px 12px 4px}.dashboard .logs-screenshots .ant-tabs{display:flex;flex-direction:column;flex:1}.dashboard .logs-screenshots .ant-tabs-bar{margin-bottom:0}.dashboard .logs-screenshots .ant-tabs-nav{margin-bottom:0px}.dashboard .logs-screenshots .ant-tabs-content{flex:1;overflow-y:auto;min-height:70px;border:1px solid #d9d9d9;border-width:0 1px 1px}.dashboard .logs-screenshots .ls-toolbox{position:absolute;right:0px;top:0px;display:flex;flex-direction:row}.dashboard .logs-screenshots .ls-toolbox>*{margin-right:5px}.dashboard .logs-screenshots .ls-toolbox>:last-child{margin-right:0}.dashboard .logs-screenshots .screenshot-content,.dashboard .logs-screenshots .log-content{padding:10px 0}.dashboard .logs-screenshots .screenshot-content li{padding:0 20px 20px}.dashboard .logs-screenshots .screenshot-content li .timestamp{display:block;margin-bottom:10px;font-size:14px}.dashboard .logs-screenshots .screenshot-content li .filename{font-weight:bold}.dashboard .logs-screenshots .log-content{list-style:none;margin:0;padding:0 10px;height:calc(100% - 38px);overflow-y:auto}.dashboard .logs-screenshots .log-content li{padding:5px 0;font-size:12px;border-bottom:1px solid #f3f3f3}.dashboard .logs-screenshots .log-content li:after{content:"";display:table;clear:both}.dashboard .logs-screenshots .log-content li a.info{color:#108ee9 !important}.dashboard .logs-screenshots .log-content li.error{color:red;font-weight:bold}.dashboard .logs-screenshots .log-content li.error a{color:red;text-decoration:underline}.dashboard .logs-screenshots .log-content li.warning{color:orange}.dashboard .logs-screenshots .log-content li .log-type{float:left;margin-right:10px}.dashboard .logs-screenshots .log-content li .log-detail{white-space:pre-wrap;margin-bottom:0em}.dashboard .logs-screenshots .csv-content{padding:10px}.dashboard .logs-screenshots .csv-content button{margin-right:5px}.dashboard .logs-screenshots .variable-content{padding:10px}.dashboard .logs-screenshots .variable-content .variable-options{margin-bottom:10px}.dashboard .logs-screenshots .variable-content .ant-checkbox-wrapper{margin-left:0 !important;margin-right:10px}.dashboard .logs-screenshots .variable-content .read-only{color:#ccc}.dashboard .logs-screenshots .vision-content{padding:10px}.dashboard .logs-screenshots .vision-content .vision-top-actions{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions{flex:1;display:flex;justify-content:space-between;margin-right:15px}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions .main-actions-left{display:flex;flex-direction:row}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions .main-actions-left>*{margin-right:15px}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions .main-actions-left>*:last-child{margin-right:0}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions .load-image-button{padding:0;display:flex;flex-direction:column;justify-content:center}.dashboard .logs-screenshots .vision-content .vision-top-actions .main-actions .load-image-button label{padding:0 15px;cursor:pointer}.dashboard .logs-screenshots .vision-content .vision-top-actions .more-info{font-size:14px}.dashboard .logs-screenshots .vision-content .vision-image{display:flex;flex-direction:row;justify-content:center;align-content:center;overflow:hidden;width:100px;height:100px;border:1px solid #ccc}.dashboard .logs-screenshots .vision-content .vision-image img{max-height:100px}.dashboard .logs-screenshots .vision-content .vision-name{font-size:14px;word-break:break-all}.dashboard .logs-screenshots .vision-content .vision-actions{display:flex;flex-direction:row;justify-content:center}.dashboard .logs-screenshots .vision-content .vision-actions button{margin-right:5px}.dashboard .logs-screenshots .vision-content .vision-actions button:last-child{margin-right:0}.dashboard .online-help{display:flex;flex-direction:row;justify-content:space-between;margin-top:15px;padding:0 10px;height:25px;line-height:25px;font-size:14px;text-align:right}.dashboard .online-help .btn-open-in-sidepanel{margin:-10px 0px 0px -10px}.dashboard .online-help .btn-request-permission{position:fixed;margin:-10px 0px 0px 145px;padding:0px 10px;font-size:16px;font-weight:bold}.dashboard #context_menu{z-index:10}.dashboard #context_menu .ant-menu{border:"1px solid #ccc";border-radius:4px;box-shadow:0 1px 6px rgba(0,0,0,.2)}.dashboard #context_menu .ant-menu .ant-menu-item{height:36px;line-height:36px}.dashboard #context_menu .ant-menu .ant-menu-item:hover{background:#ecf6fd}.dashboard #context_menu .ant-menu .ant-menu-item .shortcut{float:right;color:#999}.dashboard .target-full-editor .mask{position:fixed;z-index:100;top:0;bottom:0;left:0;right:0;background:#000;opacity:.4}.dashboard .target-full-editor .react-codemirror2{position:fixed;z-index:100;top:40px;bottom:40px;left:40px;right:40px}.dashboard .target-full-editor .react-codemirror2 .CodeMirror{height:100%}.dashboard .target-full-editor .close-button{position:fixed;z-index:101;top:25px;right:25px}.dashboard .online-help button>svg{width:12px;height:12px;margin-right:5px}.source-error{color:red;white-space:pre-wrap;font-size:12px;margin:0px}.ant-dropdown .ant-dropdown-menu{max-height:none}@media(max-width: 768px){.rename-modal,.duplicate-modal,.save-modal,.play-loop-modal{width:400px !important;margin:0 auto}}.ReactVirtualized__Table{display:inline-block}.ReactVirtualized__Table__headerColumn{display:flex;flex-direction:row;justify-content:center;padding:0}.ReactVirtualized__Table__headerTruncatedText{flex:auto}.ReactVirtualized__Grid.ReactVirtualized__Table__Grid:focus-visible{outline:none}.DragHandle{flex:0 0 16px;z-index:2;cursor:col-resize;color:#0085ff}.DragHandle:hover{background-color:rgba(0,0,0,.1)}.DragHandleActive,.DragHandleActive:hover{color:#0b6fcc;z-index:3}.DragHandleIcon{flex:0 0 12px;display:flex;flex-direction:column;justify-content:center;align-items:center}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 15751:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.sidebar{position:relative;flex:1;min-width:260px;height:100%;border-right:2px solid #ccc}.sidebar .sidebar-inner{position:absolute;top:0;bottom:80px;right:0;left:0;overflow-y:auto}.sidebar .sidebar-inner.no-tab{padding-top:8px;overflow-x:hidden}.sidebar .no-data{margin-top:20px;text-align:center;font-size:14px;color:#aaa}.sidebar .sidebar-macros .untitled{display:flex;flex-direction:row;align-items:center;padding:5px 10px;font-size:14px}.sidebar .sidebar-macros .untitled.selected{background:#fdffd1}.sidebar .sidebar-macros .untitled .icon-wrapper{display:flex;flex-direction:row;justify-content:center;align-items:center;margin-right:5px;width:20px}.sidebar .sidebar-macros .untitled .icon-wrapper .file-icon{display:block;height:16px}.sidebar .test-case-actions,.sidebar .test-suite-actions{padding:0 10px 10px}.sidebar .test-case-actions button,.sidebar .test-suite-actions button{margin-right:10px}.sidebar .test-case-actions{display:flex;padding-bottom:0}.sidebar .sidebar-test-suites .test-suite-item{padding:0 0 10px 0;margin-bottom:5px}.sidebar .sidebar-test-suites .test-suite-item.playing{background:#fdffd1}.sidebar .sidebar-test-suites .test-suite-item.fold{margin-bottom:0;padding-bottom:0}.sidebar .sidebar-test-suites .test-suite-item.fold .test-suite-more-actions,.sidebar .sidebar-test-suites .test-suite-item.fold .test-suite-cases{display:none}.sidebar .sidebar-test-suites .test-suite-item .test-suite-row{padding:5px 10px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}.sidebar .sidebar-test-suites .test-suite-item .test-suite-row .test-suite-title{flex:1;margin-left:10px}.sidebar .sidebar-test-suites .test-suite-item .test-suite-row .more-button{display:none}.sidebar .sidebar-test-suites .test-suite-item .test-suite-row:hover .more-button{display:block}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases{padding:3px 5px}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li{display:flex;justify-content:space-between;align-items:center;padding:3px 5px 3px 20px;margin-bottom:5px}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.done-tc{background-color:#d1ffd8}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.done-tc.blur{background-color:rgba(209,255,216,.6)}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.error-tc{background-color:#f7c1c1}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.error-tc.blur{background-color:rgba(247,193,193,.6)}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.current-tc{background-color:#d5d6f9}.sidebar .sidebar-test-suites .test-suite-item .test-suite-cases li.current-tc.blur{background-color:rgba(213,214,249,.6)}.sidebar .sidebar-test-suites .test-suite-item .test-suite-more-actions{padding-left:27px}.sidebar .sidebar-storage-mode{position:absolute;bottom:0;left:0;right:0;height:80px;padding:0 10px 15px;display:flex;flex-direction:column;justify-content:flex-end}.sidebar .sidebar-storage-mode .storage-mode-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom:5px;font-size:12px;margin:0 0 0 7px}.sidebar .sidebar-storage-mode .storage-mode-header h3{font-size:14px}.sidebar .ant-tabs{min-height:100%}.sidebar .ant-tabs-bar{border-bottom:2px solid #ccc}.sidebar .ant-tabs-nav-container-scrolling{padding-left:0;padding-right:0}.sidebar .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,.sidebar .ant-tabs-tab-next.ant-tabs-tab-arrow-show{display:none}.sidebar .ant-tabs-nav{height:44px}.sidebar .ant-tabs-nav .ant-tabs-tab{margin-right:0;line-height:27px}.sidebar .ant-tabs-nav-scroll{text-align:center}.sidebar .resize-handler{position:absolute;right:-2px;top:0;bottom:0;width:2px;background:#ccc;cursor:col-resize}.sidebar .resize-handler:hover,.sidebar .resize-handler.focused{right:-4px;width:6px;background:#aaa}.sidebar.with-xmodules-note .sidebar-inner{bottom:160px}.sidebar.with-xmodules-note .sidebar-storage-mode{height:160px}.sidebar.with-xmodules-note .note-for-macros{margin-bottom:20px;padding:10px 10px 0;border-top:1px solid #333;font-size:12px}.with-sidebar .sidebar{display:block}.context-menu{z-index:10}.context-menu .ant-menu{border:"1px solid #ccc";border-radius:4px;box-shadow:0 1px 6px rgba(0,0,0,.2)}.context-menu .ant-menu .ant-menu-item{height:36px;line-height:36px}.context-menu .ant-menu .ant-menu-item:hover{background:#ecf6fd}.xfile-not-installed-modal.left-bottom{position:absolute;top:auto !important;bottom:100px;left:100px}.xfile-not-installed-modal p{margin-bottom:20px;font-size:16px;font-weight:bold}.macros-dropdown{width:auto !important}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 78366:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85072);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55056);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_header_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1697);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_header_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_header_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_header_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_header_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 40988:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85072);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55056);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_select_input_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(43791);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_select_input_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_select_input_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_select_input_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_select_input_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 95038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85072);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55056);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dashboard_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70691);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dashboard_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dashboard_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dashboard_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dashboard_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 65474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85072);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55056);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidebar_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15751);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidebar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidebar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidebar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidebar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ })

}]);