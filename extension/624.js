"use strict";
(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[624],{

/***/ 62042:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.consecutive = consecutive;
exports.withConsecutive = withConsecutive;
function consecutive(c) {
  if (typeof c === 'boolean') {
    return {
      interval: 0,
      count: c ? 1 : 0
    };
  }
  return c;
}
var timeout = function timeout(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
};
function withConsecutive(c, fn) {
  var _consecutive = consecutive(c),
    interval = _consecutive.interval,
    count = _consecutive.count;
  var counter = count;
  var next = function next(pass) {
    if (!pass) throw new Error('failed to run consecutive');
    if (counter-- <= 0) return Promise.resolve(true);
    return timeout(interval).then(fn).then(next);
  };
  return fn().then(next);
}

/***/ }),

/***/ 75866:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getIpcCache = exports.IpcCache = void 0;
var _ts_utils = __webpack_require__(1601);
var _consecutive = __webpack_require__(62042);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _ipc_bg_cs = __webpack_require__(59711);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IpcStatus = /*#__PURE__*/function (IpcStatus) {
  IpcStatus[IpcStatus["Off"] = 0] = "Off";
  IpcStatus[IpcStatus["On"] = 1] = "On";
  return IpcStatus;
}(IpcStatus || {});
var ipcCacheStorageKey = 'ipc_cache';
var IpcCache = exports.IpcCache = /*#__PURE__*/function () {
  function IpcCache() {
    _classCallCheck(this, IpcCache);
    _defineProperty(this, "cuidIpcMap", {});
  }
  _createClass(IpcCache, [{
    key: "fetch",
    value: function fetch() {
      return _storage["default"].get(ipcCacheStorageKey).then(function (cache) {
        return cache || {};
      });
    }
  }, {
    key: "has",
    value: function has(tabId, cuid) {
      return this.fetch().then(function (cache) {
        var item = cache[tabId];
        return !!item && (!cuid || item.cuid == cuid);
      });
    }
  }, {
    key: "get",
    value: function get(tabId) {
      var _this = this;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      var before = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
      return (0, _ts_utils.until)('ipc by tab id', function () {
        return _this.fetch().then(function (cache) {
          var ipcObj = cache[tabId];
          var enabled = ipcObj && ipcObj.status === IpcStatus.On;
          var valid = enabled && (before === Infinity || before > ipcObj.timestamp);
          if (!valid) {
            return {
              pass: false,
              result: null
            };
          }
          return {
            pass: true,
            result: _this.getCachedIpc("".concat(ipcObj.cuid), tabId)
          };
        });
      }, 100, timeout);
    }
  }, {
    key: "domReadyGet",
    value: function domReadyGet(tabId) {
      var _this2 = this;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60 * 1000;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return (0, _ts_utils.retry)(function () {
        return _this2.get(tabId).then(function (ipc) {
          // Note: must respond to DOM READY for multiple times in line,
          // before we can be sure that it's ready
          return (0, _consecutive.withConsecutive)(c, function () {
            return ipc.ask('DOM_READY', {}, 1000).then(function () {
              return true;
            }, function () {
              return false;
            });
          }).then(function () {
            return ipc;
          });
        });
      }, {
        timeout: timeout,
        retryInterval: 1000,
        shouldRetry: function shouldRetry(e) {
          return true;
        }
      })();
    }
  }, {
    key: "set",
    value: function set(tabId, ipc, cuid) {
      return this.fetch().then(function (cache) {
        cache[tabId] = {
          ipc: ipc,
          cuid: cuid,
          status: 1,
          timestamp: new Date().getTime()
        };
        // remove functions from cache object to avoid errors in saving object in storage in firefox
        var cacheObj = JSON.parse(JSON.stringify(cache));
        return _storage["default"].set(ipcCacheStorageKey, cacheObj).then(function () {});
      });
    }
  }, {
    key: "setStatus",
    value: function setStatus(tabId, status) {
      var updateTimestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.fetch().then(function (cache) {
        var found = cache[tabId];
        if (!found) return false;
        found.status = status;
        if (updateTimestamp) {
          found.timestamp = new Date().getTime();
        }
        return _storage["default"].set(ipcCacheStorageKey, cache);
      });
    }
  }, {
    key: "enable",
    value: function enable(tabId) {
      return this.setStatus(tabId, IpcStatus.On, true);
    }
  }, {
    key: "disable",
    value: function disable(tabId) {
      return this.setStatus(tabId, IpcStatus.Off);
    }
  }, {
    key: "getCuid",
    value: function getCuid(tabId) {
      return this.fetch().then(function (cache) {
        var found = cache[tabId];
        if (!found) return null;
        return found.cuid;
      });
    }
  }, {
    key: "del",
    value: function del(tabId) {
      return this.fetch().then(function (cache) {
        delete cache[tabId];
        return _storage["default"].set(ipcCacheStorageKey, cache).then(function () {});
      });
    }
  }, {
    key: "cleanup",
    value: function cleanup(tabIdDict) {
      return this.fetch().then(function (cache) {
        Object.keys(cache).forEach(function (tabId) {
          if (!tabIdDict[tabId]) {
            delete cache[tabId];
          }
        });
        return _storage["default"].set(ipcCacheStorageKey, cache).then(function () {
          return cache;
        });
      });
    }
  }, {
    key: "getCachedIpc",
    value: function getCachedIpc(cuid, tabId) {
      if (!this.cuidIpcMap[cuid]) {
        this.cuidIpcMap[cuid] = (0, _ipc_bg_cs.openBgWithCs)(cuid).ipcBg(tabId);
      }
      return this.cuidIpcMap[cuid];
    }
  }]);
  return IpcCache;
}();
var getIpcCache = exports.getIpcCache = (0, _ts_utils.singletonGetter)(function () {
  return new IpcCache();
});

/***/ }),

/***/ 89130:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.logFactory = logFactory;
// Log factory is quite simple, just a wrapper on console.log
// so that you can use the same API, at the same, achieve following features
// 1. Hide all logs in production
// 2. Extend it to save logs in local storage / or send it back to you backend (for debug or analysis)

function logFactory(enabled) {
  var isEnabled = !!enabled;
  var obj = ['log', 'info', 'warn', 'error'].reduce(function (prev, method) {
    prev[method] = function () {
      var _console;
      if (!isEnabled) return;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_console = console)[method].apply(_console, [new Date().toISOString(), ' - '].concat(args));
    };
    return prev;
  }, {});
  return Object.assign(obj.log, obj, {
    enable: function enable() {
      isEnabled = true;
    },
    disable: function disable() {
      isEnabled = false;
    }
  });
}
var logger = logFactory("production" !== 'production');
var _default = exports["default"] = logger;

/***/ }),

/***/ 1601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TraverseTreeResult = void 0;
exports.addInBetween = addInBetween;
exports.ancestorsInNode = ancestorsInNode;
exports.ancestorsInNodesList = ancestorsInNodesList;
exports.and = void 0;
exports.assertExhausted = assertExhausted;
exports.capitalInitial = capitalInitial;
exports.clone = clone;
exports.compose = void 0;
exports.concatUint8Array = concatUint8Array;
exports.concurrent = void 0;
exports.consecutive = consecutive;
exports.countDown = countDown;
exports.delay = void 0;
exports.errorClassFactory = errorClassFactory;
exports.findNodeInForest = findNodeInForest;
exports.findNodeInTree = findNodeInTree;
exports.flatten = void 0;
exports.flattenTreeWithPaths = flattenTreeWithPaths;
exports.flatternTree = flatternTree;
exports.flow = flow;
exports.forestSlice = forestSlice;
exports.getExtName = getExtName;
exports.getIn = void 0;
exports.guardVoidPromise = guardVoidPromise;
exports.id = id;
exports.isForestEqual = isForestEqual;
exports.isMac = isMac;
exports.isTreeEqual = isTreeEqual;
exports.isWindows = isWindows;
exports.map = void 0;
exports.milliSecondsToStringInSecond = milliSecondsToStringInSecond;
exports.nodeByOffset = nodeByOffset;
exports.nodeCount = nodeCount;
exports.normalizeHtmlId = normalizeHtmlId;
exports.or = exports.on = exports.objMap = exports.objFilter = void 0;
exports.pad2digits = pad2digits;
exports.parseBoolLike = parseBoolLike;
exports.partial = void 0;
exports.pathsInNode = pathsInNode;
exports.pathsInNodeList = pathsInNodeList;
exports.pickIfExist = exports.pick = void 0;
exports.pointToFitRect = pointToFitRect;
exports.range = void 0;
exports.readFileAsText = readFileAsText;
exports.reduceRight = void 0;
exports.repeatStr = repeatStr;
exports.resolvePath = resolvePath;
exports.retry = void 0;
exports.retryWithCount = retryWithCount;
exports.setIn = exports.safeUpdateIn = exports.safeSetIn = exports.safeOn = exports.safeMap = void 0;
exports.singletonGetter = singletonGetter;
exports.singletonGetterByKey = singletonGetterByKey;
exports.snakeToCamel = snakeToCamel;
exports.strictParseBoolLike = strictParseBoolLike;
exports.sum = sum;
exports.throttle = throttle;
exports.throttlePromiseFunc = throttlePromiseFunc;
exports.toArray = toArray;
exports.traverseTree = traverseTree;
exports.treeFilter = treeFilter;
exports.treeMap = treeMap;
exports.treeSlice = treeSlice;
exports.updateIn = exports.until = exports.uniqueStrings = exports.uniqueName = exports.unique = exports.uid = void 0;
exports.urlWithQueries = urlWithQueries;
exports.withConsecutive = withConsecutive;
exports.withPostfix = exports.withFileExtension = exports.withCountDown = void 0;
exports.withPromise = withPromise;
exports.zipWith = exports.without = void 0;
var _log = _interopRequireDefault(__webpack_require__(89130));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function singletonGetter(factoryFn) {
  var instance = null;
  return function () {
    if (instance) return instance;
    instance = factoryFn.apply(void 0, arguments);
    return instance;
  };
}
function singletonGetterByKey(getKey, factoryFn) {
  var cache = {};
  return function () {
    var key = getKey.apply(void 0, arguments);
    if (cache[key]) return cache[key];
    cache[key] = factoryFn.apply(void 0, arguments);
    return cache[key];
  };
}
function id(x) {
  return x;
}
function capitalInitial(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
function snakeToCamel(kebabStr) {
  var list = kebabStr.split('_');
  return list[0] + list.slice(1).map(capitalInitial).join('');
}
var delay = exports.delay = function delay(fn, timeout) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        resolve(fn());
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
};
var until = exports.until = function until(name, check) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var expire = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
  var start = new Date().getTime();
  var go = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _yield$Promise$resolv, pass, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(expire && new Date().getTime() - start >= expire)) {
              _context.next = 2;
              break;
            }
            throw new Error("until: ".concat(name, " expired!"));
          case 2:
            _context.next = 4;
            return Promise.resolve(check());
          case 4:
            _yield$Promise$resolv = _context.sent;
            pass = _yield$Promise$resolv.pass;
            result = _yield$Promise$resolv.result;
            if (!pass) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", Promise.resolve(result));
          case 9:
            return _context.abrupt("return", delay(go, interval));
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function go() {
      return _ref.apply(this, arguments);
    };
  }();
  return new Promise(function (resolve, reject) {
    try {
      resolve(go());
    } catch (e) {
      reject(e);
    }
  });
};
var range = exports.range = function range(start, end) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  for (var _i = start; _i < end; _i += step) {
    ret.push(_i);
  }
  return ret;
};
var partial = exports.partial = function partial(fn) {
  var len = fn.length;
  var _arbitary;
  _arbitary = function arbitary(curArgs, leftArgCnt) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length >= leftArgCnt) {
        return fn.apply(null, curArgs.concat(args));
      }
      return _arbitary(curArgs.concat(args), leftArgCnt - args.length);
    };
  };
  return _arbitary([], len);
};
var reduceRight = exports.reduceRight = function reduceRight(fn, initial, list) {
  var ret = initial;
  for (var _i2 = list.length - 1; _i2 >= 0; _i2--) {
    ret = fn(list[_i2], ret);
  }
  return ret;
};
var compose = exports.compose = function compose() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return reduceRight(function (cur, prev) {
    return function (x) {
      return cur(prev(x));
    };
  }, function (x) {
    return x;
  }, args);
};
var map = exports.map = partial(function (fn, list) {
  var result = [];
  for (var _i3 = 0, len = list.length; _i3 < len; _i3++) {
    result.push(fn(list[_i3]));
  }
  return result;
});
var on = exports.on = partial(function (key, fn, dict) {
  if (Array.isArray(dict)) {
    return [].concat(_toConsumableArray(dict.slice(0, key)), [fn(dict[key])], _toConsumableArray(dict.slice(key + 1)));
  }
  return Object.assign({}, dict, _defineProperty({}, key, fn(dict[key])));
});
var updateIn = exports.updateIn = partial(function (keys, fn, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? map : on(key);
  }));
  return updater(fn)(obj);
});
var setIn = exports.setIn = partial(function (keys, value, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? map : on(key);
  }));
  return updater(function () {
    return value;
  })(obj);
});
var getIn = exports.getIn = partial(function (keys, obj) {
  return keys.reduce(function (prev, key) {
    if (!prev) return prev;
    return prev[key];
  }, obj);
});
var safeMap = exports.safeMap = partial(function (fn, list) {
  var result = [];
  var safeList = list || [];
  for (var _i4 = 0, len = safeList.length; _i4 < len; _i4++) {
    result.push(fn(safeList[_i4]));
  }
  return result;
});
var safeOn = exports.safeOn = partial(function (key, fn, dict) {
  if (Array.isArray(dict)) {
    return [].concat(_toConsumableArray(dict.slice(0, key)), [fn(dict[key])], _toConsumableArray(dict.slice(key + 1)));
  }
  return Object.assign({}, dict, _defineProperty({}, key, fn((dict || {})[key])));
});
var safeUpdateIn = exports.safeUpdateIn = partial(function (keys, fn, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? safeMap : safeOn(key);
  }));
  return updater(fn)(obj);
});
var safeSetIn = exports.safeSetIn = partial(function (keys, value, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? safeMap : safeOn(key);
  }));
  return updater(function () {
    return value;
  })(obj);
});
var pick = exports.pick = function pick(keys, obj) {
  return keys.reduce(function (prev, key) {
    prev[key] = obj[key];
    return prev;
  }, {});
};
var pickIfExist = exports.pickIfExist = function pickIfExist(keys, obj) {
  return keys.reduce(function (prev, key) {
    if (obj[key] !== undefined) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
};
var without = exports.without = function without(keys, obj) {
  return Object.keys(obj).reduce(function (prev, key) {
    if (keys.indexOf(key) === -1) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
};
var uid = exports.uid = function uid() {
  return '' + new Date().getTime() + '.' + Math.floor(Math.random() * 10000000).toString(16);
};
var flatten = exports.flatten = function flatten(list) {
  return [].concat.apply([], list);
};
var zipWith = exports.zipWith = function zipWith(fn) {
  for (var _len3 = arguments.length, listOfList = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    listOfList[_key3 - 1] = arguments[_key3];
  }
  var len = Math.min.apply(Math, _toConsumableArray(listOfList.map(function (list) {
    return list.length;
  })));
  var res = [];
  var _loop = function _loop(_i5) {
    res.push(fn.apply(void 0, _toConsumableArray(listOfList.map(function (list) {
      return list[_i5];
    }))));
  };
  for (var _i5 = 0; _i5 < len; _i5++) {
    _loop(_i5);
  }
  return res;
};
var and = exports.and = function and() {
  for (var _len4 = arguments.length, list = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    list[_key4] = arguments[_key4];
  }
  return list.reduce(function (prev, cur) {
    return prev && cur;
  }, true);
};
var or = exports.or = function or() {
  for (var _len5 = arguments.length, list = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    list[_key5] = arguments[_key5];
  }
  return list.reduce(function (prev, cur) {
    return prev || cur;
  }, false);
};
var withPostfix = exports.withPostfix = function withPostfix(options) {
  var reg = options.reg,
    str = options.str,
    fn = options.fn;
  var m = str.match(reg);
  var extName = m ? m[0] : '';
  var baseName = m ? str.replace(reg, '') : str;
  var result = fn(baseName, function (name) {
    return name + extName;
  });
  if (result === null || result === undefined) {
    throw new Error('withPostfix: should not return null/undefined');
  }
  if (typeof result.then === 'function') {
    return result.then(function (name) {
      return name + extName;
    });
  }
  return result + extName;
};
var withFileExtension = exports.withFileExtension = function withFileExtension(origName, fn) {
  return withPostfix({
    fn: fn,
    str: origName,
    reg: /\.\w+$/
  });
};
function getExtName(fileName) {
  return withFileExtension(fileName, function () {
    return '';
  });
}
var uniqueName = exports.uniqueName = function uniqueName(name, options) {
  var opts = _objectSpread({
    generate: function generate(old) {
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var reg = /_(\d+)$/;
      var m = old.match(reg);
      if (!m) return "".concat(old, "_").concat(step);
      return old.replace(reg, function (_, n) {
        return "_".concat(parseInt(n, 10) + step);
      });
    },
    check: function check() {
      return Promise.resolve(true);
    },
    postfixReg: /\.\w+$/
  }, options || {});
  var generate = opts.generate,
    check = opts.check,
    postfixReg = opts.postfixReg;
  return withPostfix({
    str: name,
    reg: postfixReg,
    fn: function fn(baseName, getFullName) {
      var go = function go(fileName, step) {
        return Promise.resolve(check(getFullName(fileName))).then(function (pass) {
          if (pass) return fileName;
          return go(generate(fileName, step), step);
        });
      };
      return go(baseName, 1);
    }
  });
};
var objFilter = exports.objFilter = function objFilter(filter, obj) {
  return Object.keys(obj).reduce(function (prev, key, i) {
    if (filter(obj[key], key, i)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
};
function throttle(fn, timeout) {
  var lastTime = 0;
  return function () {
    var now = new Date().getTime();
    if (now - lastTime < timeout) return;
    lastTime = now;
    return fn.apply(void 0, arguments);
  };
}
var retry = exports.retry = function retry(fn, options) {
  return function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    var _timeout$retryInterva = _objectSpread({
        timeout: 5000,
        retryInterval: 1000,
        onFirstFail: function onFirstFail() {},
        onFinal: function onFinal() {},
        shouldRetry: function shouldRetry(e) {
          return false;
        }
      }, options),
      timeout = _timeout$retryInterva.timeout,
      onFirstFail = _timeout$retryInterva.onFirstFail,
      onFinal = _timeout$retryInterva.onFinal,
      shouldRetry = _timeout$retryInterva.shouldRetry,
      retryInterval = _timeout$retryInterva.retryInterval;
    var retryCount = 0;
    var lastError;
    var timerToClear;
    var done = false;
    var wrappedOnFinal = function wrappedOnFinal() {
      done = true;
      if (timerToClear) {
        clearTimeout(timerToClear);
      }
      return onFinal.apply(void 0, arguments);
    };
    var intervalMan = function () {
      var lastInterval;
      var intervalFactory = function () {
        switch (_typeof(retryInterval)) {
          case 'function':
            return retryInterval;
          case 'number':
            return function (retryCount, lastInterval) {
              return retryInterval;
            };
          default:
            throw new Error('retryInterval must be either a number or a function');
        }
      }();
      return {
        getLastInterval: function getLastInterval() {
          return lastInterval;
        },
        getInterval: function getInterval() {
          var interval = intervalFactory(retryCount, lastInterval);
          lastInterval = interval;
          return interval;
        }
      };
    }();
    var onError = function onError(e, _throwErr) {
      var throwErr = _throwErr || function (e) {
        return Promise.reject(e);
      };
      if (retryCount === 0) {
        onFirstFail(e);
      }
      return new Promise(function (resolve) {
        resolve(shouldRetry(e));
      }).then(function (should) {
        if (!should) {
          wrappedOnFinal(e);
          return throwErr(e);
        }
        lastError = e;
        var p = new Promise(function (resolve, reject) {
          if (retryCount++ === 0) {
            timerToClear = setTimeout(function () {
              wrappedOnFinal(lastError);
              reject(lastError);
            }, timeout);
          }
          if (done) return;
          delay(run, intervalMan.getInterval()).then(resolve, function (e) {
            return resolve(onError(e, function (err) {
              return reject(e);
            }));
          });
        });
        return p;
      });
    };
    var run = function run() {
      return new Promise(function (resolve, reject) {
        try {
          var res = fn.apply(void 0, args.concat([{
            retryCount: retryCount,
            retryInterval: intervalMan.getLastInterval()
          }]));
          resolve(res);
        } catch (e) {
          reject(e);
        }
      })["catch"](onError);
    };
    return run().then(function (result) {
      wrappedOnFinal(null, result);
      return result;
    });
  };
};
function retryWithCount(options, fn) {
  var n = 0;
  return retry(fn, {
    timeout: 99999,
    retryInterval: options.interval,
    shouldRetry: function shouldRetry() {
      return ++n <= options.count;
    }
  });
}
function flow() {
  for (var _len7 = arguments.length, fns = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    fns[_key7] = arguments[_key7];
  }
  var result = new Array(fns.length);
  var finalPromise = fns.reduce(function (prev, fn, i) {
    return prev.then(function (res) {
      if (i > 0) {
        result[i - 1] = res;
      }
      return fn(res);
    });
  }, Promise.resolve());
  return finalPromise.then(function (res) {
    result[fns.length - 1] = res;
    return result;
  });
}
function guardVoidPromise(fn) {
  return function () {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    return new Promise(function (resolve, reject) {
      try {
        resolve(fn.apply(void 0, args));
      } catch (e) {
        reject(e);
      }
    }).then(function () {}, function (e) {
      _log["default"].error(e);
    });
  };
}
function parseBoolLike(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return !!value;
  }
  if (value === undefined) {
    return fallback;
  }
  try {
    var val = JSON.parse(value.toLowerCase());
    return !!val;
  } catch (e) {
    return fallback;
  }
}
function strictParseBoolLike(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  var result = JSON.parse(value.toLowerCase());
  if (typeof result !== 'boolean') {
    throw new Error('Not a boolean');
  }
  return result;
}
function sum() {
  for (var _len9 = arguments.length, list = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    list[_key9] = arguments[_key9];
  }
  return list.reduce(function (x, y) {
    return x + y;
  }, 0);
}
function concatUint8Array() {
  for (var _len10 = arguments.length, arrays = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    arrays[_key10] = arguments[_key10];
  }
  var totalLength = sum.apply(void 0, _toConsumableArray(arrays.map(function (arr) {
    return arr.length;
  })));
  var result = new Uint8Array(totalLength);
  for (var _i6 = 0, offset = 0, len = arrays.length; _i6 < len; _i6 += 1) {
    result.set(arrays[_i6], offset);
    offset += arrays[_i6].length;
  }
  return result;
}
function withPromise(factory) {
  return new Promise(function (resolve) {
    resolve(factory());
  });
}
function clone(data) {
  if (data === undefined) return undefined;
  return JSON.parse(JSON.stringify(data));
}
var objMap = exports.objMap = function objMap(fn, obj) {
  var keys = _typeof(obj) === 'object' ? Object.keys(obj) : [];
  return keys.reduce(function (prev, key, i) {
    prev[key] = fn(obj[key], key, i, obj);
    return prev;
  }, {});
};
function milliSecondsToStringInSecond(ms) {
  return (ms / 1000).toFixed(2) + 's';
}
var concurrent = exports.concurrent = function concurrent(max) {
  var queue = [];
  var running = 0;
  var free = function free() {
    running--;
    check();
  };
  var check = function check() {
    if (running >= max || queue.length <= 0) return;
    var tuple = queue.shift();
    var resolve = tuple.resolve;
    running++;
    resolve(free);
  };
  var wait = function wait() {
    return new Promise(function (resolve, reject) {
      queue.push({
        resolve: resolve,
        reject: reject
      });
      check();
    });
  };
  var wrap = function wrap(fn, context) {
    return function () {
      var args = [].slice.apply(arguments);
      return wait().then(function (done) {
        return fn.apply(context, args).then(function (ret) {
          done();
          return ret;
        }, function (error) {
          done();
          throw error;
        });
      });
    };
  };
  return wrap;
};
function errorClassFactory(name) {
  return /*#__PURE__*/function (_Error) {
    _inherits(_class, _Error);
    function _class() {
      var _this;
      _classCallCheck(this, _class);
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      _this = _callSuper(this, _class, [].concat(args));
      _this.code = name;
      if (_this.message) {
        _this.message = name + ': ' + _this.message;
      } else {
        _this.message = name;
      }
      return _this;
    }
    return _createClass(_class);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
}
function treeMap(mapper, tree) {
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return _objectSpread(_objectSpread({}, mapper(tree, paths)), {}, {
    children: tree.children.map(function (subnode, i) {
      return treeMap(mapper, subnode, [].concat(_toConsumableArray(paths), [i]));
    })
  });
}
function treeFilter(predicate, tree) {
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (predicate(tree, paths)) {
    return tree;
  }
  var children = tree.children.map(function (subnode, i) {
    return treeFilter(predicate, subnode, [].concat(_toConsumableArray(paths), [i]));
  });
  var validChildren = children.filter(function (item) {
    return item;
  });
  return validChildren.length === 0 ? null : _objectSpread(_objectSpread({}, tree), {}, {
    children: validChildren
  });
}
function treeSlice(max, tree) {
  var root = null;
  var count = 0;
  traverseTree(function (data, paths) {
    if (++count > max) {
      return TraverseTreeResult.Stop;
    }
    if (paths.length === 0) {
      root = _objectSpread(_objectSpread({}, data), {}, {
        children: []
      });
    } else {
      var finalIndex = paths[paths.length - 1];
      var parent = paths.slice(0, -1).reduce(function (node, index) {
        return node.children[index];
      }, root);
      parent.children[finalIndex] = _objectSpread(_objectSpread({}, data), {}, {
        children: []
      });
    }
    return TraverseTreeResult.Normal;
  }, tree);
  return root;
}
function forestSlice(max, forest) {
  var newTree = {
    children: forest
  };
  var result = treeSlice(max + 1, newTree);
  return result ? result.children : [];
}
function isTreeEqual(isNodeEqual, a, b) {
  var aChildren = a.children || [];
  var bChildren = b.children || [];
  var alen = aChildren.length;
  var blen = bChildren.length;
  if (alen !== blen) {
    return false;
  }
  if (!isNodeEqual(a, b)) {
    return false;
  }
  for (var _i7 = 0; _i7 < alen; _i7++) {
    if (!isTreeEqual(isNodeEqual, a.children[_i7], b.children[_i7])) {
      return false;
    }
  }
  return true;
}
function isForestEqual(isNodeEqual, a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (var _i8 = 0, len = a.length; _i8 < len; _i8++) {
    if (!isTreeEqual(isNodeEqual, a[_i8], b[_i8])) {
      return false;
    }
  }
  return true;
}
function nodeCount(tree) {
  var count = 0;
  traverseTree(function () {
    count++;
    return TraverseTreeResult.Normal;
  }, tree);
  return count;
}
var TraverseTreeResult = exports.TraverseTreeResult = /*#__PURE__*/function (TraverseTreeResult) {
  TraverseTreeResult[TraverseTreeResult["Normal"] = 0] = "Normal";
  TraverseTreeResult[TraverseTreeResult["Skip"] = 1] = "Skip";
  TraverseTreeResult[TraverseTreeResult["Stop"] = 2] = "Stop";
  return TraverseTreeResult;
}({});
function traverseTree(fn, node) {
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var intent = fn(node, paths);
  if (intent !== TraverseTreeResult.Normal) {
    return intent;
  }
  var childCount = node.children ? node.children.length : 0;
  var children = node.children || [];
  for (var _i9 = 0; _i9 < childCount; _i9++) {
    if (traverseTree(fn, children[_i9], [].concat(_toConsumableArray(paths), [_i9])) === TraverseTreeResult.Stop) {
      return TraverseTreeResult.Stop;
    }
  }
  return TraverseTreeResult.Normal;
}
function pathsInNode(predicate, root) {
  var result = null;
  traverseTree(function (node, paths) {
    if (predicate(node, paths)) {
      result = paths;
      return TraverseTreeResult.Stop;
    }
    return TraverseTreeResult.Normal;
  }, root);
  return result ? result : null;
}
function ancestorsInNode(predicate, root) {
  var paths = pathsInNode(predicate, root);
  if (paths === null) {
    return null;
  }
  var ancestorPaths = paths.slice(0, -1);
  var keys = addInBetween('children', ancestorPaths);
  return ancestorPaths.map(function (_, index) {
    var subKeys = keys.slice(0, index * 2 + 1);
    return getIn(subKeys, root.children);
  });
}
function pathsInNodeList(predicate, nodes) {
  for (var _i10 = 0, len = nodes.length; _i10 < len; _i10++) {
    var _paths = pathsInNode(predicate, nodes[_i10]);
    if (_paths !== null) {
      return [_i10].concat(_toConsumableArray(_paths));
    }
  }
  return null;
}
function ancestorsInNodesList(predicate, nodes) {
  for (var _i11 = 0, len = nodes.length; _i11 < len; _i11++) {
    var ancestors = ancestorsInNode(predicate, nodes[_i11]);
    if (ancestors !== null) {
      return [nodes[_i11]].concat(_toConsumableArray(ancestors));
    }
  }
  return null;
}
function flattenTreeWithPaths(tree) {
  var result = [];
  traverseTree(function (node, paths) {
    result.push({
      paths: paths,
      node: without(['children'], node)
    });
    return TraverseTreeResult.Normal;
  }, tree);
  return result;
}
function flatternTree(tree) {
  return flattenTreeWithPaths(tree).map(function (item) {
    return item.node;
  });
}
function findNodeInTree(predicate, tree) {
  var result = null;
  traverseTree(function (node, paths) {
    if (predicate(node, paths)) {
      result = node;
      return TraverseTreeResult.Stop;
    }
    return TraverseTreeResult.Normal;
  }, tree);
  return result;
}
function findNodeInForest(predicate, forest) {
  for (var _i12 = 0, len = forest.length; _i12 < len; _i12++) {
    var result = findNodeInTree(predicate, forest[_i12]);
    if (result) {
      return result;
    }
  }
  return null;
}
function toArray(list) {
  return Array.isArray(list) ? list : [list];
}
function nodeByOffset(params) {
  var tree = params.tree,
    isTargetQualified = params.isTargetQualified,
    isCandidateQualified = params.isCandidateQualified,
    offset = params.offset;
  if (Math.floor(offset) !== offset) {
    throw new Error("offset must be integer. It's now ".concat(offset));
  }
  var ret = null;
  var trees = toArray(tree);
  var cache = [];
  var maxCache = 1 + Math.ceil(Math.abs(offset));

  // Note: if offset is negative, which means you're looking for some item ahead,
  // we can get it from cache. Otherwise, use offsetLeft as counter until we reach the item.
  // So `found` could only be tree if `offset` is a positive integer
  var offsetLeft = Math.max(0, offset);
  var found = false;
  for (var _i13 = 0, len = trees.length; _i13 < len; _i13++) {
    var traverseResult = traverseTree(function (node, paths) {
      var qualified = isCandidateQualified(node, paths);
      if (!qualified) {
        return TraverseTreeResult.Normal;
      }
      if (offset < 0) {
        cache.push(node);
        if (cache.length > maxCache) {
          cache.shift();
        }
      }
      if (offset > 0 && found) {
        offsetLeft -= 1;
        if (offsetLeft === 0) {
          ret = node;
          return TraverseTreeResult.Stop;
        }
      }
      if (isTargetQualified(node, paths)) {
        if (offset <= 0) {
          var index = cache.length - 1 + offset;
          ret = index >= 0 ? cache[index] : null;
          return TraverseTreeResult.Stop;
        } else {
          found = true;
        }
      }
      return TraverseTreeResult.Normal;
    }, trees[_i13]);
    if (traverseResult === TraverseTreeResult.Stop) {
      break;
    }
  }
  return ret;
}
function pointToFitRect(data) {
  var bound = data.bound,
    size = data.size,
    point = data.point;
  var lBorder = bound.x;
  var rBorder = bound.x + bound.width;
  var tBorder = bound.y;
  var bBorder = bound.y + bound.height;
  var x = function () {
    if (point.x + size.width <= rBorder) {
      return point.x;
    }
    if (point.x - size.width >= lBorder) {
      return point.x - size.width;
    }
    return rBorder - size.width;
  }();
  var y = function () {
    if (point.y + size.height <= bBorder) {
      return point.y;
    }
    if (point.y - size.height >= tBorder) {
      return point.y - size.height;
    }
    return bBorder - size.height;
  }();
  return {
    x: x,
    y: y
  };
}
function addInBetween(item, list) {
  var result = [];
  for (var _i14 = 0, len = list.length; _i14 < len; _i14++) {
    if (_i14 !== 0) {
      result.push(item);
    }
    result.push(list[_i14]);
  }
  return result;
}
function normalizeHtmlId(str) {
  return str.replace(/[^A-Za-z0-9_-]/g, '_');
}
var unique = exports.unique = function unique(list, getKey) {
  var cache = {};
  var result = list.reduce(function (prev, cur) {
    var key = getKey(cur);
    if (!cache[key]) {
      cache[key] = true;
      prev.push(cur);
    }
    return prev;
  }, []);
  return result;
};
var uniqueStrings = exports.uniqueStrings = function uniqueStrings() {
  for (var _len12 = arguments.length, list = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    list[_key12] = arguments[_key12];
  }
  return unique(list, function (x) {
    return x;
  });
};
function consecutive(c) {
  if (typeof c === 'boolean') {
    return {
      interval: 0,
      count: c ? 1 : 0
    };
  }
  return c;
}
var timeout = function timeout(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
};
function withConsecutive(c, fn) {
  var _consecutive = consecutive(c),
    interval = _consecutive.interval,
    count = _consecutive.count;
  var counter = count;
  var next = function next(pass) {
    if (!pass) throw new Error('failed to run consecutive');
    if (counter-- <= 0) return Promise.resolve(true);
    return timeout(interval || 0).then(fn).then(next);
  };
  return fn().then(next);
}
function readFileAsText(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (readerEvent) {
      try {
        var text = readerEvent.target.result;
        resolve(text);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}
function assertExhausted(_, msg) {
  throw new Error('switch case not exhausted' + (msg ? ': ' + msg : ''));
}
function pad2digits(n) {
  if (n >= 0 && n < 10) {
    return '0' + n;
  }
  return '' + n;
}
function repeatStr(n, str) {
  var s = '';
  for (var _i15 = 0; _i15 < n; _i15++) {
    s += str;
  }
  return s;
}
function isMac() {
  var userAgent = window.navigator.userAgent;
  return !!/macintosh/i.test(userAgent) || /mac os x/i.test(userAgent) && !/like mac os x/i.test(userAgent);
}
function isWindows() {
  var userAgent = window.navigator.userAgent;
  return !!/windows/i.test(userAgent);
}
function resolvePath(path, basePath, relativePath) {
  var dirPath = path.dirname(basePath);
  relativePath = relativePath.replace(/\\/g, '/');
  if (relativePath.indexOf('/') === 0) {
    return path.normalize(relativePath).replace(/^(\/|\\)/, '');
  } else {
    return path.join(dirPath, relativePath);
  }
}
function countDown(options) {
  var interval = options.interval,
    timeout = options.timeout,
    onTick = options.onTick,
    onTimeout = options.onTimeout;
  var past = 0;
  var timer = setInterval(function () {
    past += interval;
    try {
      onTick({
        past: past,
        total: timeout
      });
    } catch (e) {
      console.warn(e);
    }
    if (past >= timeout) {
      clearInterval(timer);
      if (typeof onTimeout === 'function') {
        try {
          onTimeout({
            past: past,
            total: timeout
          });
        } catch (e) {
          console.warn(e);
        }
      }
    }
  }, options.interval);
  return function () {
    return clearInterval(timer);
  };
}
var withCountDown = exports.withCountDown = function withCountDown(options) {
  var interval = options.interval,
    timeout = options.timeout,
    onTick = options.onTick;
  var past = 0;
  return new Promise(function (resolve, reject) {
    var timer = setInterval(function () {
      past += interval;
      try {
        onTick({
          cancel: cancel,
          past: past,
          total: timeout
        });
      } catch (e) {
        console.error(e);
      }
      if (past >= timeout) clearInterval(timer);
    }, interval);
    var cancel = function cancel() {
      return clearInterval(timer);
    };
    var p = delay(function () {}, timeout).then(function () {
      return clearInterval(timer);
    });
    resolve(p);
  });
};
function urlWithQueries(url) {
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var hasQuery = Object.keys(queries).length > 0;
  if (!hasQuery) {
    return url;
  }
  var queryStr = Object.keys(queries).map(function (key) {
    var _queries$key;
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent((_queries$key = queries[key]) === null || _queries$key === void 0 ? void 0 : _queries$key.toString()));
  }).join('&');
  return "".concat(url, "?").concat(queryStr);
}
function throttlePromiseFunc(fn, interval) {
  if (interval <= 0) {
    throw new Error("Interval must be positive number");
  }
  var p = Promise.resolve();
  var generatedFunc = function generatedFunc() {
    for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      args[_key13] = arguments[_key13];
    }
    var ret = p.then(function () {
      console.log("in generatedFunc...", args);
      return fn.apply(void 0, args);
    });
    p = ret.then(function () {
      return delay(function () {}, interval);
    }, function () {
      return delay(function () {}, interval);
    });
    return ret;
  };
  return generatedFunc;
}

/***/ }),

/***/ 8747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var platform = _web_extension["default"].isFirefox() ? 'firefox' : 'chrome';
var _default = exports["default"] = {
  preinstall: {
    version: '5.8.8',
    macroFolder: '/Demo'
  },
  nativeMessaging: {
    idleTimeBeforeDisconnect: 1e4 // 10 seconds
  },
  urlAfterUpgrade: 'https://goto.ui.vision/x/idehelp?help=k_update',
  urlAfterInstall: 'https://goto.ui.vision/x/idehelp?help=k_welcome',
  urlAfterUninstall: 'https://goto.ui.vision/x/idehelp?help=k_why',
  performanceLimit: {
    fileCount: Infinity
  },
  xmodulesLimit: {
    unregistered: {
      ocrCommandCount: 100,
      xCommandCount: Infinity,
      xFileMacroCount: 10,
      proxyExecCount: Infinity,
      upgradeUrl: 'https://goto.ui.vision/x/idehelp?help=k_xupgradepro'
    },
    free: {
      ocrCommandCount: 250,
      xCommandCount: Infinity,
      xFileMacroCount: 20,
      proxyExecCount: Infinity,
      upgradeUrl: 'https://goto.ui.vision/x/idehelp?help=k_xupgradepro'
    },
    pro: {
      ocrCommandCount: 500,
      xCommandCount: Infinity,
      xFileMacroCount: Infinity,
      proxyExecCount: Infinity,
      upgradeUrl: 'https://goto.ui.vision/x/idehelp?help=k_xupgrade_contactsupport'
    }
  },
  xfile: {
    minVersionToReadBigFile: '1.0.10'
  },
  ocr: {
    freeApiEndpoint: 'https://api.ocr.space/parse/image',
    proApi1Endpoint: 'https://apipro1.ocr.space/parse/image',
    proApi2Endpoint: 'https://apipro2.ocr.space/parse/image',
    apiTimeout: 60 * 1000,
    singleApiTimeout: 30 * 1000,
    apiHealthyResponseTime: 20 * 1000,
    resetTime: 24 * 3600 * 1000
  },
  license: {
    api: {
      url: 'https://license1.ocr.space/api/status'
    }
  },
  icons: {
    normal: 'logo38.png',
    inverted: 'inverted_logo_38.png'
  },
  forceMigrationRemedy: false,
  iframePostMessageTimeout: 500,
  ui: {
    commandItemHeight: 35
  },
  commandRunner: {
    sendKeysMaxCharCount: 1000
  },
  executeScript: {
    minimumTimeout: 5000
  }
};

/***/ }),

/***/ 59711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.spInit = exports.openBgWithCs = exports.csInit = exports.bgInit = exports.SIDEPANEL_TAB_ID = exports.SIDEPANEL_PORT_NAME = void 0;
var _ipc_promise = _interopRequireDefault(__webpack_require__(18020));
var _ipc_cache = __webpack_require__(75866);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var TIMEOUT = -1;
// this is a constant number to identify sidePanel
var SIDEPANEL_TAB_ID = exports.SIDEPANEL_TAB_ID = 999999999;
// sidepanel port name
var SIDEPANEL_PORT_NAME = exports.SIDEPANEL_PORT_NAME = 'uiv_sidepanel';
// this is a constant string to identify sidePanel
var SIDEPANEL_CUID = 'uiv-sidepanel';

// Note: `cuid` is a kind of unique id so that you can create multiple
// ipc promise instances between the same two end points
var openBgWithCs = exports.openBgWithCs = function openBgWithCs(cuid) {
  var wrap = function wrap(str) {
    return str + '_' + cuid;
  };

  // factory function to generate ipc promise instance for background
  // `tabId` is needed to identify which tab to send messages to
  var ipcBg = function ipcBg(tabId) {
    var bgListeners = [];

    // `sender` contains tab info. Background may need this to store the corresponding
    // relationship between tabId and ipc instance
    var addSender = function addSender(obj, sender) {
      var _sender$tab;
      if (!obj || _typeof(obj) !== 'object') return obj;
      // limiting the size of 'sender' reduces memory leak
      obj.sender = {
        tab: {
          id: (_sender$tab = sender.tab) === null || _sender$tab === void 0 ? void 0 : _sender$tab.id
        },
        url: sender.url
      };
      return obj;
    };

    // `sender` contains tab info. Background may need this to store the corresponding
    // relationship between tabId and ipc instance
    var addSenderToArgsOnAskBg = function addSenderToArgsOnAskBg(obj, sender) {
      var _sender$tab2;
      if (!obj || _typeof(obj) !== 'object') return obj;

      // two things required for sender object
      // sender.tab.id
      // sender.url
      // OR
      // isSidePanel, isFileSchema, isHttpSchema

      // limiting the size of 'sender' reduces memory leak
      obj.sender = {
        tab: {
          id: (_sender$tab2 = sender.tab) === null || _sender$tab2 === void 0 ? void 0 : _sender$tab2.id // sender can be sidepanel
        },
        url: sender.url
      };
      return obj;
    };
    _web_extension["default"].runtime.onMessage.addListener(function (req, sender, sendResponse) {
      if (req.type === wrap('CS_ANSWER_BG') || req.type === wrap('CS_ASK_BG')) {
        sendResponse(true);
      }
      bgListeners.forEach(function (listener) {
        return listener(req, sender);
      });
      return true;
    });
    return (0, _ipc_promise["default"])({
      timeout: TIMEOUT,
      ask: function ask(uid, cmd, args) {
        // Note: We need to send request to the same tab where the response is from
        // check if the response is from sidePanel
        if (tabId === SIDEPANEL_TAB_ID) {
          // send request to sidePanel
          return _web_extension["default"].runtime.sendMessage({
            type: wrap('BG_ASK_CS'),
            uid: uid,
            cmd: cmd,
            args: args
          });
        } else {
          return _web_extension["default"].tabs.sendMessage(tabId, {
            type: wrap('BG_ASK_CS'),
            uid: uid,
            cmd: cmd,
            args: args
          });
        }
      },
      onAnswer: function onAnswer(fn) {
        bgListeners.push(function (req, sender) {
          if (req.type !== wrap('CS_ANSWER_BG')) return;
          fn(req.uid, req.err, addSender(req.data, sender));
        });
      },
      onAsk: function onAsk(fn) {
        bgListeners.push(function (req, sender) {
          if (req.type !== wrap('CS_ASK_BG')) return;
          if (req.cmd == 'PANEL_LOG') {
            // this is handled upstream, so that it cannot create memory leak
            return;
          } else {
            var reqArgs = addSenderToArgsOnAskBg(req.args, sender);
            fn(req.uid, req.cmd, reqArgs);
          }
        });
      },
      answer: function answer(uid, err, data) {
        // check if the request is from sidePanel
        if (tabId === SIDEPANEL_TAB_ID) {
          // send response to sidePanel
          return _web_extension["default"].runtime.sendMessage({
            type: wrap('BG_ANSWER_CS'),
            uid: uid,
            err: err,
            data: data
          });
        } else {
          return _web_extension["default"].tabs.sendMessage(tabId, {
            type: wrap('BG_ANSWER_CS'),
            uid: uid,
            err: err,
            data: data
          });
        }
      },
      destroy: function destroy() {
        bgListeners = [];
      }
    });
  };

  // factory function to generate ipc promise for content scripts
  // this will run in content script or app running in a separate window (having a tabId)
  var ipcCs = function ipcCs(checkReady) {
    var csListeners = [];
    _web_extension["default"].runtime.onMessage.addListener(function (req, sender, sendResponse) {
      if (req.type === wrap('BG_ANSWER_CS') || req.type === wrap('BG_ASK_CS')) {
        sendResponse(true);
      }
      csListeners.forEach(function (listener) {
        return listener(req, sender);
      });
      return true;
    });
    return (0, _ipc_promise["default"])({
      timeout: TIMEOUT,
      checkReady: checkReady,
      ask: function ask(uid, cmd, args) {
        // log('cs ask', uid, cmd, args)
        return _web_extension["default"].runtime.sendMessage({
          type: wrap('CS_ASK_BG'),
          uid: uid,
          cmd: cmd,
          args: args
        });
      },
      onAnswer: function onAnswer(fn) {
        csListeners.push(function (req, sender) {
          if (req.type !== wrap('BG_ANSWER_CS')) return;
          fn(req.uid, req.err, req.data);
        });
      },
      onAsk: function onAsk(fn) {
        csListeners.push(function (req, sender) {
          if (req.type !== wrap('BG_ASK_CS')) return;
          fn(req.uid, req.cmd, req.args);
        });
      },
      answer: function answer(uid, err, data) {
        return _web_extension["default"].runtime.sendMessage({
          type: wrap('CS_ANSWER_BG'),
          uid: uid,
          err: err,
          data: data
        });
      },
      destroy: function destroy() {
        csListeners = [];
      }
    });
  };

  // factory function to generate ipc promise for sidePanel
  var ipcSp = function ipcSp(checkReady) {
    var csListeners = [];
    // this will run in sidePanel. A sidePanel doesn't have a tabId, so we use a random number instead
    _web_extension["default"].runtime.onMessage.addListener(function (req, sender, sendResponse) {
      if (req.type === wrap('BG_ANSWER_CS') || req.type === wrap('BG_ASK_CS')) {
        sendResponse(true);
      }
      csListeners.forEach(function (listener) {
        return listener(req, sender);
      });
      return true;
    });
    return (0, _ipc_promise["default"])({
      timeout: TIMEOUT,
      checkReady: checkReady,
      ask: function ask(uid, cmd, args) {
        // log('CS_ASK_BG', uid, cmd, args)
        return _web_extension["default"].runtime.sendMessage({
          type: wrap('CS_ASK_BG'),
          uid: uid,
          cmd: cmd,
          args: args
        });
      },
      onAnswer: function onAnswer(fn) {
        csListeners.push(function (req, sender) {
          if (req.type !== wrap('BG_ANSWER_CS')) return;
          fn(req.uid, req.err, req.data);
        });
      },
      onAsk: function onAsk(fn) {
        csListeners.push(function (req, sender) {
          if (req.type !== wrap('BG_ASK_CS')) return;
          fn(req.uid, req.cmd, req.args);
        });
      },
      answer: function answer(uid, err, data) {
        return _web_extension["default"].runtime.sendMessage({
          type: wrap('CS_ANSWER_BG'),
          uid: uid,
          err: err,
          data: data
        });
      },
      destroy: function destroy() {
        csListeners = [];
      }
    });
  };
  return {
    ipcCs: ipcCs,
    ipcSp: ipcSp,
    ipcBg: ipcBg
  };
};

// Helper function to init ipc promise instance for content scripts
// The idea here is to send CONNECT message to background when initializing
var csInit = exports.csInit = function csInit() {
  var noRecover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cuid = '' + Math.floor(Math.random() * 10000);
  if (noRecover) {
    _web_extension["default"].runtime.sendMessage({
      type: 'CONNECT',
      cuid: cuid
    });
    return openBgWithCs(cuid).ipcCs();
  }

  // log('sending Connect...')

  // Note: Ext.runtime.getURL is available in content script, but not injected js
  // We use it here to detect whether it is loaded by content script or injected
  // Calling runtime.sendMessage in injected js will cause an uncatchable exception
  if (!_web_extension["default"].runtime.getURL) return;

  // try this process in case we're in none-src frame
  try {
    // let connected     = false
    // const checkReady  = () => {
    //   if (connected)  return Promise.resolve(true)
    //   return Promise.reject(new Error('cs not connected with bg yet'))
    // }
    var reconnect = function reconnect() {
      return (0, _utils.withTimeout)(500, function () {
        return _web_extension["default"].runtime.sendMessage({
          type: 'RECONNECT'
        }).then(function (cuid) {
          // log('got existing cuid', cuid)
          if (cuid) return openBgWithCs(cuid).ipcCs();
          throw new Error('failed to reconnect');
        });
      });
    };
    var connectBg = function connectBg() {
      return (0, _utils.withTimeout)(1000, function () {
        return _web_extension["default"].runtime.sendMessage({
          type: 'CONNECT',
          cuid: cuid
        }).then(function (done) {
          if (done) return openBgWithCs(cuid).ipcCs();
          throw new Error('not done');
        });
      });
    };
    var tryConnect = (0, _utils.retry)(connectBg, {
      shouldRetry: function shouldRetry() {
        return true;
      },
      retryInterval: 1000,
      // 1000 from testing purpose. default value: 0,
      timeout: 5000
    });

    // Note: Strategy here
    // 1. Try to recover connection with background (get the existing cuid)
    // 2. If cuid not found, try to create new connection (cuid) with background
    // 3. Both of these two steps above are async, but this api itself is synchronous,
    //    so we have to create a mock API and return it first
    var enhancedConnect = function enhancedConnect() {
      return reconnect()["catch"](function () {
        return tryConnect();
      })["catch"](function (e) {
        _log["default"].error('Failed to create cs ipc');
        throw e;
      });
    };
    return (0, _utils.mockAPIWith)(enhancedConnect, {
      ask: function ask() {
        return Promise.reject(new Error('mock ask'));
      },
      onAsk: function onAsk() {/* log('mock onAsk', ...args ) */},
      destroy: function destroy() {},
      secret: cuid
    }, ['ask']);
  } catch (e) {
    _log["default"].error(e.stack);
  }
};

// Helper function to init ipc promise instance for sidePanel
// The idea here is to send CONNECT message to background when initializing
var spInit = exports.spInit = function spInit() {
  var cuid = SIDEPANEL_CUID;
  try {
    // log('sending Connect...')
    var connectBg = function connectBg() {
      return (0, _utils.withTimeout)(1000, function () {
        return _web_extension["default"].runtime.sendMessage({
          type: 'CONNECT',
          cuid: cuid
        }).then(function (done) {
          if (done) return openBgWithCs(cuid).ipcSp();
          throw new Error('sp connect not done');
        });
      });
    };
    var tryConnect = (0, _utils.retry)(connectBg, {
      shouldRetry: function shouldRetry() {
        return true;
      },
      retryInterval: 1000,
      // 1000 from testing purpose. default value: 0,
      timeout: 5000
    });

    // Note: Strategy here
    // 1. Try to recover connection with background (get the existing cuid)
    // 2. If cuid not found, try to create new connection (cuid) with background
    // 3. Both of these two steps above are async, but this api itself is synchronous,
    //    so we have to create a mock API and return it first
    var enhancedConnect = function enhancedConnect() {
      return tryConnect()["catch"](function (e) {
        _log["default"].error('Failed to create cs ipc - spInit');
        throw e;
      });
    };
    return (0, _utils.mockAPIWith)(enhancedConnect, {
      ask: function ask() {
        return Promise.reject(new Error('mock ask'));
      },
      onAsk: function onAsk() {/* log('mock onAsk', ...args) */},
      destroy: function destroy() {},
      secret: cuid
    }, ['ask']);
  } catch (e) {
    _log["default"].error(e.stack);
  }
};

// Helper function to init ipc promise instance for background
// it accepts a `fn` function to handle CONNECT message from content scripts
var bgInit = exports.bgInit = function bgInit(fn, getLogServiceForBg) {
  _web_extension["default"].runtime.onMessage.addListener(function (req, sender, sendResponse) {
    // this is handled here to prevent memory leak from 'PANEL_LOG'  
    if (req.cmd == 'PANEL_LOG') {
      return getLogServiceForBg().log(req.args.log);
    }
    switch (req.type) {
      case 'CONNECT':
        {
          if (req.cuid) {
            if (req.cuid === SIDEPANEL_CUID) {
              fn(SIDEPANEL_TAB_ID, SIDEPANEL_CUID, openBgWithCs(SIDEPANEL_CUID).ipcBg(SIDEPANEL_TAB_ID));
              sendResponse(true);
            } else {
              fn(sender.tab.id, req.cuid, openBgWithCs(req.cuid).ipcBg(sender.tab.id));
              sendResponse(true);
            }
          }
          break;
        }
      case 'RECONNECT':
        {
          (0, _ipc_cache.getIpcCache)().getCuid(sender.tab.id).then( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(cuid) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!cuid) {
                      _context.next = 3;
                      break;
                    }
                    _context.next = 3;
                    return (0, _ipc_cache.getIpcCache)().enable(sender.tab.id);
                  case 3:
                    sendResponse(cuid || null);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
          break;
        }
      case 'BringIDEToFront':
        {
          var delay = req.delay || 0;
          setTimeout(function () {
            _web_extension["default"].windows.update(req.windowId, {
              focused: true
            });
          }, delay);
          break;
        }
    }
    return true;
  });
};

/***/ }),

/***/ 18020:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _config = _interopRequireDefault(__webpack_require__(8747));
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TO_BE_REMOVED = false;
var log = function log(msg) {
  if (console && console.log) console.log(msg);
};
var transformError = function transformError(err) {
  console.error(err);
  if (err instanceof Error) {
    return {
      isError: true,
      name: err.name,
      message: err.message,
      stack: err.stack
    };
  }
  return err;
};

// Note: The whole idea of ipc promise is about transforming the callback style
// ipc communication API to a Promise style
//
// eg. Orignial:    `chrome.runtime.sendMessage({}, () => {})`
//     ipcPromise:  `ipc.ask({}).then(() => {})`
//
// The benifit is
// 1. You can chain this promise with others
// 2. Create kind of connected channels between two ipc ends
//
// This is a generic interface to define a ipc promise utility
// All you need to declare is 4 functions
//
// e.g.
// ```
// ipcPromise({
//   ask: function (uid, cmd, args) { ... },
//   answer: function (uid, err, data) { ... },
//   onAsk: function (fn) { ... },
//   onAnswer: function (fn) { ... },
// })
// ```
function ipcPromise(options) {
  var ask = options.ask;
  var answer = options.answer;
  var timeout = options.timeout;
  var onAnswer = options.onAnswer;
  var onAsk = options.onAsk;
  var userDestroy = options.destroy;
  var checkReady = options.checkReady || function () {
    return Promise.resolve(true);
  };
  var nid = 0;
  var askCache = {};
  var unhandledAsk = [];
  var markUnhandled = function markUnhandled(uid, cmd, args) {
    unhandledAsk.push({
      uid: uid,
      cmd: cmd,
      args: args
    });
  };
  var handler = markUnhandled;
  var getNextNid = function getNextNid() {
    nid = (nid + 1) % 100000;
    return nid;
  };
  var runHandlers = function runHandlers(handlers, cmd, args, resolve, reject) {
    for (var i = 0, len = handlers.length; i < len; i++) {
      var res = void 0;
      try {
        res = handlers[i](cmd, args);
      } catch (e) {
        return reject(e);
      }
      if (res !== undefined) {
        return resolve(res);
      }
    }
    // Note: DO NOT resolve anything if all handlers return undefined
  };

  // both for ask and unhandledAsk
  timeout = timeout || -1;
  onAnswer(function (uid, err, data) {
    if (uid && askCache[uid] === TO_BE_REMOVED) {
      delete askCache[uid];
      return;
    }
    if (!uid || !askCache[uid]) {
      // log('ipcPromise: response uid invalid: ' + uid);
      return;
    }
    var resolve = askCache[uid][0];
    var reject = askCache[uid][1];
    delete askCache[uid];
    if (err) {
      reject(transformError(err));
    } else {
      resolve(data);
    }
  });
  onAsk(function (uid, cmd, args) {
    if (timeout > 0) {
      setTimeout(function () {
        var found = unhandledAsk && unhandledAsk.find(function (item) {
          return item.uid === uid;
        });
        if (!found) return;
        answer(uid, new Error('ipcPromise: answer timeout ' + timeout + ' for cmd "' + cmd + '", args "' + args + '"'));
      }, timeout);
    }
    if (handler === markUnhandled) {
      markUnhandled(uid, cmd, args);
      return;
    }
    return new Promise(function (resolve, reject) {
      runHandlers(handler, cmd, args, resolve, reject);
    }).then(function (data) {
      // note: handler doesn't handle the cmd => return undefined, should wait for timeout
      if (data === undefined) return markUnhandled(uid, cmd, args);
      answer(uid, null, data);
    }, function (err) {
      answer(uid, transformError(err), null);
    });
  });
  var wrapAsk = function wrapAsk(cmd, args, timeoutToOverride) {
    var uid = 'ipcp_' + new Date() * 1 + '_' + getNextNid();
    var finalTimeout = timeoutToOverride || timeout;
    var timer;
    if (args && args.payload && args.payload.args && args.payload.args.command && args.payload.args.command.cmd) {
      var _cmd = args.payload.args.command.cmd;
      if (_cmd === 'executeScript') {
        var minimumTimeout = _config["default"].executeScript.minimumTimeout; // 5000
        finalTimeout = finalTimeout < minimumTimeout ? minimumTimeout : finalTimeout;
      }
    }
    var ignoreCommands = ['SET_STATUS'];
    // Note: make it possible to disable timeout
    if (finalTimeout > 0 && !ignoreCommands.includes(cmd)) {
      timer = setTimeout(function () {
        var reject;
        if (askCache && askCache[uid]) {
          // console.log('== cmd:>> ', cmd)
          // console.log('== args:>> ', args)
          // console.log('== timeout:>> ', timeout)
          // console.log('== timeoutToOverride:>> ', timeoutToOverride)
          // console.log('== finalTimeout:>> ', finalTimeout) 
          reject = askCache[uid][1];
          askCache[uid] = TO_BE_REMOVED;
          console.error('ipcPromise: onAsk timeout ' + finalTimeout + ' for cmd "' + cmd + '", args ' + stringify(args));
          var errMsg = "Error #102: Lost contact to website";
          reject(new Error(errMsg));
        }
      }, finalTimeout);
    }
    return new Promise(function (resolve, reject) {
      askCache[uid] = [resolve, reject];
      Promise.resolve(ask(uid, cmd, args || []))["catch"](function (e) {
        reject(e);
      });
    }).then(function (data) {
      if (timer) {
        clearTimeout(timer);
      }
      return data;
    }, function (e) {
      if (timer) {
        clearTimeout(timer);
      }
      throw e;
    });
  };
  var wrapOnAsk = function wrapOnAsk(fn) {
    if (Array.isArray(handler)) {
      handler.push(fn);
    } else {
      handler = [fn];
    }
    var ps = unhandledAsk.map(function (task) {
      return new Promise(function (resolve, reject) {
        runHandlers(handler, task.cmd, task.args, resolve, reject);
      }).then(function (data) {
        // note: handler doens't handle the cmd => return undefined, should wait for timeout
        if (data === undefined) return;
        answer(task.uid, null, data);
        return task.uid;
      }, function (err) {
        answer(task.uid, err, null);
        return task.uid;
      });
    });
    Promise.all(ps).then(function (uids) {
      var _iterator = _createForOfIteratorHelper(uids),
        _step;
      try {
        var _loop = function _loop() {
          var uid = _step.value;
          if (uid === undefined) return 1; // continue
          var index = unhandledAsk.findIndex(function (item) {
            return item.uid === uid;
          });
          unhandledAsk.splice(index, 1);
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          if (_loop()) continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  };
  var destroy = function destroy(noReject) {
    userDestroy && userDestroy();
    ask = null;
    answer = null;
    onAnswer = null;
    onAsk = null;
    unhandledAsk = null;
    if (!noReject) {
      Object.keys(askCache).forEach(function (uid) {
        var tuple = askCache[uid];
        var reject = tuple[1];
        reject && reject(new Error('IPC Promise has been Destroyed.'));
        delete askCache[uid];
      });
    }
  };
  var waitForReady = function waitForReady(checkReady, fn) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var makeSureReady = (0, _utils.retry)(checkReady, {
        shouldRetry: function shouldRetry() {
          return true;
        },
        retryInterval: 200,
        timeout: 6000
      });
      return makeSureReady().then(function () {
        return fn.apply(void 0, args);
      });
    };
  };
  return {
    ask: waitForReady(checkReady, wrapAsk),
    onAsk: wrapOnAsk,
    destroy: destroy
  };
}
ipcPromise.serialize = function (obj) {
  return {
    ask: function ask(cmd, args, timeout) {
      return obj.ask(cmd, JSON.stringify(args), timeout);
    },
    onAsk: function onAsk(fn) {
      return obj.onAsk(function (cmd, args) {
        return fn(cmd, JSON.parse(args));
      });
    },
    destroy: obj.destroy
  };
};
function stringify(v) {
  return v === undefined ? 'undefined' : JSON.stringify(v);
}
module.exports = ipcPromise;

/***/ }),

/***/ 41334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var local = _web_extension["default"].storage.local;
var _default = exports["default"] = {
  get: function get(key) {
    return local.get(key).then(function (obj) {
      return obj[key];
    });
  },
  set: function set(key, value) {
    return local.set(_defineProperty({}, key, value)).then(function () {
      return true;
    });
  },
  remove: function remove(key) {
    return local.remove(key).then(function () {
      return true;
    });
  },
  clear: function clear() {
    return local.clear().then(function () {
      return true;
    });
  },
  addListener: function addListener(fn) {
    _web_extension["default"].storage.onChanged.addListener(function (changes, areaName) {
      var list = Object.keys(changes).map(function (key) {
        return _objectSpread(_objectSpread({}, changes[key]), {}, {
          key: key
        });
      });
      fn(list);
    });
  }
};

/***/ }),

/***/ 88555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _ext_storage = _interopRequireDefault(__webpack_require__(41334));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = _ext_storage["default"];

/***/ }),

/***/ 46580:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.and = void 0;
exports.arrayBufferToString = arrayBufferToString;
exports.bindOnce = exports.bind = void 0;
exports.blobToDataURL = blobToDataURL;
exports.blobToText = blobToText;
exports.composePromiseFn = exports.compose = exports.cn = exports.cloneSerializableLocalStorage = void 0;
exports.dataURItoArrayBuffer = dataURItoArrayBuffer;
exports.dataURItoBlob = dataURItoBlob;
exports.splitKeep = exports.splitIntoTwo = exports.setIn = exports.sanitizeFileName = exports.retry = exports.reduceRight = exports.range = exports.randomName = exports.pick = exports.partial = exports.parseQuery = exports.on = exports.objMap = exports.nameFactory = exports.mockAPIWith = exports.map = exports.loadImage = exports.loadCsv = exports.isSidePanelWindowAsync = exports.isSidePanelWindow = exports.insertScript = exports.getPageDpi = exports.getIn = exports.formatDate = exports.flatten = exports.ensureExtName = exports.dpiFromFileName = exports.delayMs = exports.delay = void 0;
exports.stringToArrayBuffer = stringToArrayBuffer;
exports.withTimeout = exports.withFileExtension = exports.waitForRenderComplete = exports.validateStandardName = exports.updateIn = exports.until = exports.uniqueName = exports.uid = exports.toRegExp = exports.subjectiveBindOnce = void 0;
var _lodash = _interopRequireDefault(__webpack_require__(20181));
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// delay the call of a function and return a promise
var delay = exports.delay = function delay(fn, timeout) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        resolve(fn());
      } catch (e) {
        reject(e);
      }
    }, timeout);
  });
};

// Poll on whatever you want to check, and will time out after a specific duration
// `check` should return `{ pass: Boolean, result: Any }`
// `name` is for a meaningful error message
var until = exports.until = function until(name, check) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var expire = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
  var errorMsg = arguments.length > 4 ? arguments[4] : undefined;
  var start = new Date();
  var go = function go() {
    if (expire && new Date() - start >= expire) {
      var msg = errorMsg || "until: ".concat(name, " expired!");
      throw new Error(msg);
    }
    var _check = check(),
      pass = _check.pass,
      result = _check.result;
    if (pass) return Promise.resolve(result);
    return delay(go, interval);
  };
  return new Promise(function (resolve, reject) {
    try {
      resolve(go());
    } catch (e) {
      reject(e);
    }
  });
};
var range = exports.range = function range(start, end) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var ret = [];
  for (var i = start; i < end; i += step) {
    ret.push(i);
  }
  return ret;
};

// create a curry version of the passed in function
var partial = exports.partial = function partial(fn) {
  var len = fn.length;
  var _arbitary;
  _arbitary = function arbitary(curArgs, leftArgCnt) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length >= leftArgCnt) {
        return fn.apply(null, curArgs.concat(args));
      }
      return _arbitary(curArgs.concat(args), leftArgCnt - args.length);
    };
  };
  return _arbitary([], len);
};
var reduceRight = exports.reduceRight = function reduceRight(fn, initial, list) {
  var ret = initial;
  for (var i = list.length - 1; i >= 0; i--) {
    ret = fn(list[i], ret);
  }
  return ret;
};

// compose functions into one
var compose = exports.compose = function compose() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return reduceRight(function (cur, prev) {
    return function (x) {
      return cur(prev(x));
    };
  }, function (x) {
    return x;
  }, args);
};
var map = exports.map = partial(function (fn, list) {
  var result = [];
  for (var i = 0, len = list.length; i < len; i++) {
    result.push(fn(list[i]));
  }
  return result;
});
var on = exports.on = partial(function (key, fn, dict) {
  if (Array.isArray(dict)) {
    return [].concat(_toConsumableArray(dict.slice(0, key)), [fn(dict[key])], _toConsumableArray(dict.slice(key + 1)));
  }
  return Object.assign({}, dict, _defineProperty({}, key, fn(dict[key])));
});

// immutably update any part in an object
var updateIn = exports.updateIn = partial(function (keys, fn, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? map : on(key);
  }));
  return updater(fn)(obj);
});

// immutably set any part in an object
// a restricted version of updateIn
var setIn = exports.setIn = partial(function (keys, value, obj) {
  var updater = compose.apply(null, keys.map(function (key) {
    return key === '[]' ? map : on(key);
  }));
  return updater(function () {
    return value;
  })(obj);
});

// return part of the object with a few keys deep inside
var getIn = exports.getIn = partial(function (keys, obj) {
  return keys.reduce(function (prev, key) {
    if (!prev) return prev;
    return prev[key];
  }, obj);
});

// return the passed in object with only certains keys
var pick = exports.pick = function pick(keys, obj) {
  return keys.reduce(function (prev, key) {
    if (obj[key] !== undefined) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
};
var uid = exports.uid = function uid() {
  return '' + new Date() * 1 + '.' + Math.floor(Math.random() * 10000000).toString(16);
};
var flatten = exports.flatten = function flatten(list) {
  return [].concat.apply([], list);
};
var splitIntoTwo = exports.splitIntoTwo = function splitIntoTwo(pattern, str) {
  var index = str.indexOf(pattern);
  if (index === -1) return [str];
  return [str.substr(0, index), str.substr(index + 1)];
};
var cn = exports.cn = function cn() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  return args.reduce(function (prev, cur) {
    if (typeof cur === 'string') {
      prev.push(cur);
    } else {
      Object.keys(cur).forEach(function (key) {
        if (cur[key]) {
          prev.push(key);
        }
      });
    }
    return prev;
  }, []).join(' ');
};
var objMap = exports.objMap = function objMap(fn, obj) {
  return Object.keys(obj).reduce(function (prev, key, i) {
    prev[key] = fn(obj[key], key, i);
    return prev;
  }, {});
};
var formatDate = exports.formatDate = function formatDate(d) {
  var pad = function pad(n) {
    return n >= 10 ? '' + n : '0' + n;
  };
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(pad).join('-');
};
var splitKeep = exports.splitKeep = function splitKeep(pattern, str) {
  var result = [];
  var startIndex = 0;
  var reg, match, lastMatchIndex;
  if (pattern instanceof RegExp) {
    reg = new RegExp(pattern, pattern.flags.indexOf('g') !== -1 ? pattern.flags : pattern.flags + 'g');
  } else if (typeof pattern === 'string') {
    reg = new RegExp(pattern, 'g');
  }

  // eslint-disable-next-line no-cond-assign
  while (match = reg.exec(str)) {
    if (lastMatchIndex === match.index) {
      break;
    }
    if (match.index > startIndex) {
      result.push(str.substring(startIndex, match.index));
    }
    result.push(match[0]);
    startIndex = match.index + match[0].length;
    lastMatchIndex = match.index;
  }
  if (startIndex < str.length) {
    result.push(str.substr(startIndex));
  }
  return result;
};
var nameFactory = exports.nameFactory = function nameFactory() {
  var all = {};
  return function (str) {
    if (!all[str]) {
      all[str] = true;
      return str;
    }
    var n = 2;
    while (all[str + '-' + n]) {
      n++;
    }
    all[str + '-' + n] = true;
    return str + '-' + n;
  };
};
var composePromiseFn = exports.composePromiseFn = function composePromiseFn() {
  for (var _len4 = arguments.length, list = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    list[_key4] = arguments[_key4];
  }
  return reduceRight(function (cur, prev) {
    return function (x) {
      return prev(x).then(cur);
    };
  }, function (x) {
    return Promise.resolve(x);
  }, list);
};
var parseQuery = exports.parseQuery = function parseQuery(query) {
  return query.slice(1).split('&').reduce(function (prev, cur) {
    var index = cur.indexOf('=');
    var key = cur.substring(0, index);
    var val = cur.substring(index + 1);
    prev[key] = decodeURIComponent(val);
    return prev;
  }, {});
};
var toRegExp = exports.toRegExp = function toRegExp(str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$needEncode = _ref.needEncode,
    needEncode = _ref$needEncode === void 0 ? false : _ref$needEncode,
    _ref$flag = _ref.flag,
    flag = _ref$flag === void 0 ? '' : _ref$flag;
  return new RegExp(needEncode ? str.replace(/[[\](){}^$.*+?|]/g, '\\$&') : str, flag);
};
var insertScript = exports.insertScript = function insertScript(file) {
  var s = document.constructor.prototype.createElement.call(document, 'script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  document.documentElement.appendChild(s);
  s.parentNode.removeChild(s);
};
var withTimeout = exports.withTimeout = function withTimeout(timeout, fn) {
  return new Promise(function (resolve, reject) {
    var cancel = function cancel() {
      return clearTimeout(timer);
    };
    var timer = setTimeout(function () {
      reject(new Error('timeout'));
    }, timeout);
    Promise.resolve(fn(cancel)).then(function (data) {
      cancel();
      resolve(data);
    }, function (e) {
      cancel();
      reject(e);
    });
  });
};
var retry = exports.retry = function retry(fn, options) {
  return function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    var _timeout$retryInterva = _objectSpread({
        timeout: 5000,
        retryInterval: 1000,
        onFirstFail: function onFirstFail() {},
        onFinal: function onFinal() {},
        shouldRetry: function shouldRetry() {
          return false;
        }
      }, options),
      timeout = _timeout$retryInterva.timeout,
      onFirstFail = _timeout$retryInterva.onFirstFail,
      onFinal = _timeout$retryInterva.onFinal,
      shouldRetry = _timeout$retryInterva.shouldRetry,
      retryInterval = _timeout$retryInterva.retryInterval;
    var retryCount = 0;
    var lastError = null;
    var timerToClear = null;
    var done = false;
    var wrappedOnFinal = function wrappedOnFinal() {
      done = true;
      if (timerToClear) {
        clearTimeout(timerToClear);
      }
      return onFinal.apply(void 0, arguments);
    };
    var intervalMan = function () {
      var lastInterval = null;
      var intervalFactory = function () {
        switch (_typeof(retryInterval)) {
          case 'function':
            return retryInterval;
          case 'number':
            return function () {
              return retryInterval;
            };
          default:
            throw new Error('retryInterval must be either a number or a function');
        }
      }();
      return {
        getLastInterval: function getLastInterval() {
          return lastInterval;
        },
        getInterval: function getInterval() {
          var interval = intervalFactory(retryCount, lastInterval);
          lastInterval = interval;
          return interval;
        }
      };
    }();
    var onError = function onError(e, reject) {
      if (!shouldRetry(e, retryCount)) {
        wrappedOnFinal(e);
        if (reject) return reject(e);else throw e;
      }
      lastError = e;
      return new Promise(function (resolve, reject) {
        if (retryCount++ === 0) {
          onFirstFail(e);
          timerToClear = setTimeout(function () {
            wrappedOnFinal(lastError);
            reject(lastError);
          }, timeout);
        }
        if (done) return;
        delay(run, intervalMan.getInterval()).then(resolve, function (e) {
          return onError(e, reject);
        });
      });
    };
    var run = function run() {
      return new Promise(function (resolve) {
        resolve(fn.apply(void 0, args.concat([{
          retryCount: retryCount,
          retryInterval: intervalMan.getLastInterval()
        }])));
      })["catch"](onError);
    };
    return run().then(function (result) {
      wrappedOnFinal(null, result);
      return result;
    });
  };
};

// refer to https://stackoverflow.com/questions/12168909/blob-from-dataurl
function dataURItoArrayBuffer(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(/^data:/.test(dataURI) ? dataURI.split(',')[1] : dataURI);

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return ab;
}
function dataURItoBlob(dataURI) {
  var ab = dataURItoArrayBuffer(dataURI);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {
    type: mimeString
  });
  return blob;
}
function blobToDataURL(blob) {
  var withBase64Prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = reject;
    reader.onload = function (e) {
      var str = reader.result;
      if (withBase64Prefix) return resolve(str);
      var b64 = 'base64,';
      var i = str.indexOf(b64);
      var ret = str.substr(i + b64.length);
      resolve(ret);
    };
    reader.readAsDataURL(blob);
  });
}
function blobToText(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = reject;
    reader.onload = function (e) {
      var str = reader.result;
      resolve(str);
    };
    reader.readAsText(blob);
  });
}
function arrayBufferToString(buf) {
  var decoder = new TextDecoder('utf-8');
  return decoder.decode(new Uint8Array(buf));
  // return String.fromCharCode.apply(null, new Uint16Array(buf))
}
function stringToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
var randomName = exports.randomName = function randomName() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  if (length <= 0 || length > 100) throw new Error('randomName, length must be between 1 and 100');
  var randomChar = function randomChar() {
    var n = Math.floor(62 * Math.random());
    var code;
    if (n <= 9) {
      code = 48 + n;
    } else if (n <= 35) {
      code = 65 + n - 10;
    } else {
      code = 97 + n - 36;
    }
    return String.fromCharCode(code);
  };
  return range(0, length).map(randomChar).join('').toLowerCase();
};
var withFileExtension = exports.withFileExtension = function withFileExtension(origName, fn) {
  var reg = /\.\w+$/;
  var m = origName.match(reg);
  var extName = m ? m[0] : '';
  var baseName = m ? origName.replace(reg, '') : origName;
  var result = fn(baseName, function (name) {
    return name + extName;
  });
  if (!result) {
    throw new Error('withFileExtension: should not return null/undefined');
  }
  if (typeof result.then === 'function') {
    return result.then(function (name) {
      return name + extName;
    });
  }
  return result + extName;
};
var uniqueName = exports.uniqueName = function uniqueName(name, options) {
  var opts = _objectSpread({
    generate: function generate(old) {
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var reg = /_\((\d+)\)$/;
      var m = old.match(reg);
      if (!m) return "".concat(old, "_(").concat(step, ")");
      return old.replace(reg, function (_, n) {
        return "_(".concat(parseInt(n, 10) + step, ")");
      });
    },
    check: function check() {
      return Promise.resolve(true);
    }
  }, options || {});
  var generate = opts.generate,
    check = opts.check;
  return withFileExtension(name, function (baseName, getFullName) {
    var go = function go(fileName, step) {
      return check(getFullName(fileName)).then(function (pass) {
        if (pass) return fileName;
        return go(generate(fileName, step), step);
      });
    };
    return go(baseName, 1);
  });
};
var and = exports.and = function and() {
  for (var _len6 = arguments.length, list = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    list[_key6] = arguments[_key6];
  }
  return list.reduce(function (prev, cur) {
    return prev && cur;
  }, true);
};
var loadCsv = exports.loadCsv = function loadCsv(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) throw new Error("failed to load csv - ".concat(url));
    return res.text();
  });
};
var loadImage = exports.loadImage = function loadImage(url) {
  return fetch(url).then(function (res) {
    if (!res.ok) throw new Error("failed to load image - ".concat(url));
    return res.blob();
  });
};
var ensureExtName = exports.ensureExtName = function ensureExtName(ext, name) {
  var extName = ext.indexOf('.') === 0 ? ext : '.' + ext;
  if (name.lastIndexOf(extName) + extName.length === name.length) return name;
  return name + extName;
};
var validateStandardName = exports.validateStandardName = function validateStandardName(name, isFileName) {
  if (!isFileName && !/^_|[a-zA-Z]/.test(name)) {
    throw new Error("must start with a letter or the underscore character.");
  }
  if (isFileName && !/^_|[a-zA-Z0-9]/.test(name)) {
    throw new Error("must start with alpha-numeric or the underscore character.");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error("can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )");
  }
};
var sanitizeFileName = exports.sanitizeFileName = function sanitizeFileName(fileName) {
  return withFileExtension(fileName, function (baseName) {
    return baseName.trim().replace(/[\\/:*?"<>|]/g, '_');
  });
};
var getPageDpi = exports.getPageDpi = function getPageDpi() {
  var DEFAULT_DPI = 96;
  var matchDpi = function matchDpi(dpi) {
    return window.matchMedia("(max-resolution: ".concat(dpi, "dpi)")).matches === true;
  };

  // We iteratively scan all possible media query matches.
  // We can't use binary search, because there are "many" correct answer in
  // problem space and we need the very first match.
  // To speed up computation we divide problem space into buckets.
  // We test each bucket's first element and if we found a match,
  // we make a full scan for previous bucket with including first match.
  // Still, we could use "divide-and-conquer" for such problems.
  // Due to common DPI values, it's not worth to implement such algorithm.

  var bucketSize = 24; // common divisor for 72, 96, 120, 144 etc.

  for (var i = bucketSize; i < 3000; i += bucketSize) {
    if (matchDpi(i)) {
      var start = i - bucketSize;
      var end = i;
      for (var k = start; k <= end; ++k) {
        if (matchDpi(k)) {
          return k;
        }
      }
    }
  }
  return DEFAULT_DPI; // default fallback
};
var dpiFromFileName = exports.dpiFromFileName = function dpiFromFileName(fileName) {
  var reg = /_dpi_(\d+)/i;
  var m = fileName.match(reg);
  return m ? parseInt(m[1], 10) : 0;
};
var mockAPIWith = exports.mockAPIWith = function mockAPIWith(factory, mock) {
  var promiseFunctionKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var real = mock;
  var exported = objMap(function (val, key) {
    if (typeof val === 'function') {
      if (promiseFunctionKeys.indexOf(key) !== -1) {
        return function () {
          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }
          return p.then(function () {
            var _real;
            return (_real = real)[key].apply(_real, args);
          });
        };
      } else {
        return function () {
          var _real3;
          for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }
          p.then(function () {
            var _real2;
            return (_real2 = real)[key].apply(_real2, args);
          });
          return (_real3 = real)[key].apply(_real3, args);
        };
      }
    } else {
      return val;
    }
  }, mock);
  var p = Promise.resolve(factory()).then(function (api) {
    real = api;
  });
  return exported;
};
var bindOnce = exports.bindOnce = function bindOnce(target, eventName, fn) {
  for (var _len9 = arguments.length, rest = new Array(_len9 > 3 ? _len9 - 3 : 0), _key9 = 3; _key9 < _len9; _key9++) {
    rest[_key9 - 3] = arguments[_key9];
  }
  var wrapped = function wrapped() {
    try {
      target.removeEventListener.apply(target, [eventName, wrapped].concat(rest));
    } catch (e) {}
    return fn.apply(void 0, arguments);
  };
  target.addEventListener.apply(target, [eventName, wrapped].concat(rest));
};
var subjectiveBindOnce = exports.subjectiveBindOnce = function subjectiveBindOnce(target, eventName, fn) {
  for (var _len10 = arguments.length, rest = new Array(_len10 > 3 ? _len10 - 3 : 0), _key10 = 3; _key10 < _len10; _key10++) {
    rest[_key10 - 3] = arguments[_key10];
  }
  var wrapped = function wrapped() {
    try {
      var _ref2;
      if ((_ref2 = arguments.length <= 0 ? undefined : arguments[0]) !== null && _ref2 !== void 0 && (_ref2 = _ref2.detail) !== null && _ref2 !== void 0 && _ref2.json) {
        // don't remove the event listener, because,
        // it's probably coming from embedded Ui.Vision macros. https://ui.vision/demo/runweb
      } else {
        target.removeEventListener.apply(target, [eventName, wrapped].concat(rest));
      }
    } catch (e) {}
    return fn.apply(void 0, arguments);
  };
  target.addEventListener.apply(target, [eventName, wrapped].concat(rest));
};
var bind = exports.bind = function bind(target, eventName, fn) {
  for (var _len11 = arguments.length, rest = new Array(_len11 > 3 ? _len11 - 3 : 0), _key11 = 3; _key11 < _len11; _key11++) {
    rest[_key11 - 3] = arguments[_key11];
  }
  target.addEventListener.apply(target, [eventName, fn].concat(rest));
};
var isSidePanelWindowAsync = exports.isSidePanelWindowAsync = function isSidePanelWindowAsync(win) {
  if (!win) return Promise.resolve(false);
  return new Promise(function (resolve) {
    var isSidePanel_ = win.location.href.startsWith("chrome-extension://".concat(_web_extension["default"].runtime.id, "/sidepanel.html")) || win.location.href.match(/moz-extension:\/\/[a-z0-9-]+\/sidepanel.html/);
    console.log('isSidePanelWindowAsync:>>', isSidePanel_);
    resolve(isSidePanel_);
  });
};

// export const isSidePanelWindow = () => window && window?.location?.href?.includes('sidepanel.html')
var isSidePanelWindow = exports.isSidePanelWindow = function isSidePanelWindow() {
  if (typeof window !== 'undefined') {
    return window.location.href.includes('sidepanel.html');
  } else {
    // running inside service worker
    return false;
  }
};
var waitForRenderComplete = exports.waitForRenderComplete = function waitForRenderComplete() {
  var parentSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var debounceInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var debounceResolve = (0, _lodash["default"])(function (resolve) {
    resolve();
  }, debounceInterval);
  return new Promise(function (resolve, reject) {
    var parentElement = parentSelector && document.querySelector(parentSelector) || document.body;
    if (!parentElement) {
      console.error('waitForRenderComplete: parentElement not found with selector:', parentSelector);
      reject(new Error('Rendering element not found.'));
    }
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) {
          // console.log('waitForRenderComplete...');
          debounceResolve(resolve);
        }
      });
    });
    observer.observe(parentElement, {
      childList: true
    });
    debounceResolve(resolve);
  });
};
var delayMs = exports.delayMs = function delayMs(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
};
var cloneSerializableLocalStorage = exports.cloneSerializableLocalStorage = function cloneSerializableLocalStorage(localStorage) {
  var clonedData = {};
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    try {
      // Attempt to stringify and store in cloned object
      clonedData[key] = localStorage.getItem(key);
    } catch (error) {
      // Skip non-serializable values
      console.warn("Skipping non-serializable item from localStorage: ".concat(key));
    }
  }
  return clonedData;
};

/***/ }),

/***/ 41953:
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/* global chrome browser */

// Note: it's an adapter for both chrome and web extension API
// chrome and web extension API have almost the same API signatures
// except that chrome accepts callback while web extension returns promises
//
// The whole idea here is to make sure all callback style API of chrome
// also return promises
//
// Important: You need to specify whatever API you need to use in `UsedAPI` below

(function () {
  var isDevelopment = "production" !== 'production';
  var adaptChrome = function adaptChrome(obj, chrome) {
    var adapt = function adapt(src, ret, obj, fn) {
      return Object.keys(obj).reduce(function (prev, key) {
        var keyParts = key.split('.');
        var _keyParts$reduce = keyParts.reduce(function (tuple, subkey) {
            var tar = tuple[0];
            var src = tuple[1];
            tar[subkey] = tar[subkey] || {};
            return [tar[subkey], src && src[subkey]];
          }, [prev, src]),
          _keyParts$reduce2 = _slicedToArray(_keyParts$reduce, 2),
          target = _keyParts$reduce2[0],
          source = _keyParts$reduce2[1];
        obj[key].forEach(function (method) {
          fn(method, source, target, isDevelopment);
        });
        return prev;
      }, ret);
    };
    var promisify = function promisify(method, source, target, isDevelopment) {
      if (!source) return;
      // array of error messages that should not be shown
      var ignoredErrors = [/The message port closed before a res?ponse was received/, /Extension context invalidated/, /Could not establish connection. Receiving end does not exist/];
      target[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return new Promise(function (resolve, reject) {
          var callback = function callback(result) {
            if (chrome.runtime.lastError) {
              if (ignoredErrors.some(function (error) {
                return error.test(chrome.runtime.lastError.message);
              })) {
                // don't show the error
                // console.error(`#31 never-show ${chrome.runtime.lastError.message}, ${method}, ${JSON.stringify(args)}`)
              } else {
                if (isDevelopment) {
                  // #31 show in development only
                  console.error("".concat(chrome.runtime.lastError.message, ", ").concat(method, ", ").concat(JSON.stringify(args)));
                }
                return reject(chrome.runtime.lastError);
              }
            }
            resolve(result);
          };
          source[method].apply(source, args.concat(callback));
        });
      };
    };
    var copy = function copy(method, source, target) {
      if (!source) return;
      target[method] = source[method];
    };
    return [[obj.toPromisify, promisify], [obj.toCopy, copy]].reduce(function (prev, tuple) {
      return adapt(chrome, prev, tuple[0], tuple[1]);
    }, {});
  };
  var UsedAPI = {
    toPromisify: {
      tabs: ['create', 'sendMessage', 'get', 'update', 'query', 'captureVisibleTab', 'remove', 'getZoom'],
      windows: ['update', 'getLastFocused', 'getCurrent', 'getAll', 'remove', 'create', 'get'],
      runtime: ['sendMessage', 'setUninstallURL'],
      cookies: ['get', 'getAll', 'set', 'remove'],
      notifications: ['create', 'clear'],
      action: ['getBadgeText', 'setIcon'],
      bookmarks: ['create', 'getTree'],
      "debugger": ['attach', 'detach', 'sendCommand', 'getTargets'],
      downloads: ['search', 'setUiOptions'],
      extension: ['isAllowedFileSchemeAccess'],
      contextMenus: ['create', 'update', 'remove', 'removeAll'],
      'storage.local': ['get', 'set'],
      scripting: ['executeScript'],
      permissions: ['request', 'contains']
    },
    toCopy: {
      tabs: ['onActivated', 'onUpdated', 'onRemoved'],
      windows: ['onFocusChanged'],
      runtime: ['onMessage', 'onInstalled', 'getManifest', 'getURL', 'onStartup', 'getPlatformInfo', 'onConnect', 'id'],
      storage: ['onChanged'],
      action: ['setBadgeText', 'setBadgeBackgroundColor', 'onClicked'],
      contextMenus: ['onClicked'],
      extension: ['getURL'],
      "debugger": ['onEvent', 'onDetach'],
      downloads: ['onCreated', 'onChanged', 'onDeterminingFilename'],
      webRequest: ['onAuthRequired'],
      sidePanel: ['setOptions', 'open'],
      sidebarAction: ['open', 'close', 'toggle']
    }
  };
  var Ext = typeof chrome !== 'undefined' ? adaptChrome(UsedAPI, chrome) : browser;
  Object.assign(Ext, {
    isFirefox: function isFirefox() {
      return /Firefox/.test(self.navigator.userAgent);
    }
  });
  if (true) {
    module.exports = Ext;
  } else {}
})();

/***/ })

}]);