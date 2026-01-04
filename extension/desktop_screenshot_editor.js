/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 42860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $e: () => (/* binding */ warning),
/* harmony export */   Em: () => (/* binding */ getSecondaryColor),
/* harmony export */   P3: () => (/* binding */ isIconDefinition),
/* harmony export */   al: () => (/* binding */ normalizeTwoToneColors),
/* harmony export */   cM: () => (/* binding */ generate),
/* harmony export */   lf: () => (/* binding */ useInsertStyles)
/* harmony export */ });
/* unused harmony exports normalizeAttrs, svgBaseProps, iconStyles */
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89379);
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82284);
/* harmony import */ var _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20439);
/* harmony import */ var rc_util_es_Dom_dynamicCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85089);
/* harmony import */ var rc_util_es_Dom_shadow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(72633);
/* harmony import */ var rc_util_es_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68210);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(96540);
/* harmony import */ var _components_Context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(61053);








function camelCase(input) {
  return input.replace(/-(.)/g, function (match, g) {
    return g.toUpperCase();
  });
}
function warning(valid, message) {
  (0,rc_util_es_warning__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay)(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];
    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;
      default:
        delete acc[key];
        acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(node.tag, (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(node.tag, (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return (0,_ant_design_colors__WEBPACK_IMPORTED_MODULE_0__/* .generate */ .cM)(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
var svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
var iconStyles = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles(eleRef) {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_components_Context__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A),
    csp = _useContext.csp,
    prefixCls = _useContext.prefixCls;
  var mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    var ele = eleRef.current;
    var shadowRoot = (0,rc_util_es_Dom_shadow__WEBPACK_IMPORTED_MODULE_7__/* .getShadowRoot */ .j)(ele);
    (0,rc_util_es_Dom_dynamicCSS__WEBPACK_IMPORTED_MODULE_1__/* .updateCSS */ .BD)(mergedStyleStr, '@ant-design-icons', {
      prepend: true,
      csp: csp,
      attachTo: shadowRoot
    });
  }, []);
};

/***/ }),

/***/ 90364:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactDom = _interopRequireDefault(__webpack_require__(40961));
var _antd = __webpack_require__(33061);
var _en_US = _interopRequireDefault(__webpack_require__(13173));
var _select_area = __webpack_require__(35645);
var _types = __webpack_require__(76701);
var _desktop = __webpack_require__(14406);
var _ipc_bg_cs = __webpack_require__(59711);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _dom_utils = __webpack_require__(92950);
var _storage2 = __webpack_require__(97467);
var _xfile = __webpack_require__(63109);
var _ts_utils = __webpack_require__(1601);
var _utils = __webpack_require__(46580);
var _types2 = __webpack_require__(35847);
var _ocr = __webpack_require__(99998);
var _cs_timeout = __webpack_require__(41279);
var _global_state = __webpack_require__(8327);
__webpack_require__(45786);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import 'antd/dist/antd.css'
var csIpc = (0, _ipc_bg_cs.csInit)(true);
var allState = {};
init();
(0, _cs_timeout.polyfillTimeoutFunctions)(csIpc);
function init() {
  return Promise.all([restoreConfig(), (0, _xfile.getXFile)().getConfig()]).then( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var _ref3, config, xFileConfig;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref3 = _slicedToArray(_ref, 2), config = _ref3[0], xFileConfig = _ref3[1];
            _context.next = 3;
            return (0, _global_state.getState)();
          case 3:
            allState = _context.sent;
            (0, _storage2.getStorageManager)(config.storageMode);
            render();
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), render);
}
function restoreConfig() {
  return _storage["default"].get('config').then(function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({
      storageMode: _storage2.StorageStrategyType.Browser
    }, config);
  });
}
function render() {
  var rootEl = document.getElementById('root');
  return _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_antd.ConfigProvider, {
    locale: _en_US["default"]
  }, /*#__PURE__*/_react["default"].createElement(App, null)), rootEl);
}
var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);
  function App() {
    var _this;
    _classCallCheck(this, App);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, App, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      mode: _types.DesktopScreenshot.RequestType.DisplayVisualResult,
      rects: [],
      ocrMatches: [],
      imageUrl: '',
      scale: 0.5,
      imagePageRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      imageSize: {
        width: 0,
        height: 0
      }
    });
    return _this;
  }
  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      console.log('state:>> ', this.state);
      csIpc.onAsk(function (type, data) {
        console.log('onAsk type:>>', type);
        console.log('onAsk data:>>', data);
        switch (type) {
          case 'DOM_READY':
            return true;
          case _types.DesktopScreenshot.RequestType.DisplayVisualX:
            {
              var d = data;
              _this2.setState({
                mode: _types.DesktopScreenshot.RequestType.DisplayVisualX,
                rects: d.rects
              });
              return _this2.consumeImageInfo(d.image).then(function () {
                return true;
              });
            }
          case _types.DesktopScreenshot.RequestType.DisplayVisualResult:
            {
              var _d = data;
              _this2.setState({
                mode: _types.DesktopScreenshot.RequestType.DisplayVisualResult,
                rects: _d.rects
              });
              return _this2.consumeImageInfo(_d.image).then(function () {
                return true;
              });
            }
          case _types.DesktopScreenshot.RequestType.DisplayOcrResult:
            {
              var _d2 = data;
              _this2.setState({
                mode: _types.DesktopScreenshot.RequestType.DisplayOcrResult,
                ocrMatches: _d2.ocrMatches
              });
              return _this2.consumeImageInfo(_d2.image).then(function () {
                return true;
              });
            }
          case _types.DesktopScreenshot.RequestType.Capture:
            {
              var _d3 = data;
              _this2.setState({
                mode: _types.DesktopScreenshot.RequestType.Capture
              });
              return _this2.consumeImageInfo(_d3.image).then(function () {
                return (0, _ts_utils.delay)(function () {}, 1000);
              }).then(function () {
                return _this2.selectAreaOnImage();
              });
            }
        }
      });
    }
  }, {
    key: "resetToMode",
    value: function resetToMode(mode) {
      var _this3 = this;
      return new Promise(function (resolve) {
        _this3.setState({
          mode: mode,
          rects: [],
          ocrMatches: []
        }, function () {
          return resolve();
        });
      });
    }
  }, {
    key: "updateImagePageRect",
    value: function updateImagePageRect() {
      var $image = this.$image;
      if (!$image) return;
      var offset = (0, _dom_utils.accurateOffset)($image);
      this.setState({
        imagePageRect: {
          x: offset.left,
          y: offset.top,
          width: $image.offsetWidth,
          height: $image.offsetHeight
        }
      });
    }
  }, {
    key: "getImagePageRect",
    value: function getImagePageRect() {
      return this.state.imagePageRect;
    }
  }, {
    key: "selectAreaOnImage",
    value: function selectAreaOnImage() {
      var _this4 = this;
      return new Promise(function (resolve, reject) {
        (0, _select_area.selectArea)({
          preventGlobalClick: false,
          clickToDestroy: false,
          overlayStyles: {
            top: _this4.state.imagePageRect.y + 'px'
          },
          onDestroy: function onDestroy() {
            resolve(null);
          },
          done: function done(rect, boundingRect) {
            var areaPageRect = rect;
            var imagePageRect = _this4.getImagePageRect();
            var relativeRect = {
              x: areaPageRect.x - imagePageRect.x,
              y: areaPageRect.y - imagePageRect.y,
              width: areaPageRect.width,
              height: areaPageRect.height
            };
            var finalScale = 1 / _this4.state.scale * (_this4.state.imageSize.width / screen.width);
            var finalRect = {
              x: relativeRect.x * finalScale,
              y: relativeRect.y * finalScale,
              width: relativeRect.width * finalScale,
              height: relativeRect.height * finalScale
            };
            return (0, _dom_utils.subImage)(_this4.state.imageUrl, finalRect).then(resolve, reject);
          },
          allowCursor: function allowCursor(e) {
            var imagePageRect = _this4.getImagePageRect();
            var x = e.pageX;
            var y = e.pageY;
            return x > imagePageRect.x && y > imagePageRect.y && x < imagePageRect.x + imagePageRect.width && y < imagePageRect.y + imagePageRect.height;
          }
        });
      }).then(function (result) {
        _this4.setState({
          mode: _types.DesktopScreenshot.RequestType.DisplayVisualResult
        });
        return result;
      })["catch"](function (e) {
        _this4.setState({
          mode: _types.DesktopScreenshot.RequestType.DisplayVisualResult
        });
        throw e;
      });
    }
  }, {
    key: "consumeImageInfo",
    value: function consumeImageInfo(image) {
      var _this5 = this;
      var pImageDataUrl = function () {
        switch (image.source) {
          case _types.DesktopScreenshot.ImageSource.HardDrive:
          case _types.DesktopScreenshot.ImageSource.Storage:
            return (0, _storage2.getStorageManager)().getScreenshotStorage().read(image.path, 'DataURL');
          case _types.DesktopScreenshot.ImageSource.CV:
            return (0, _desktop.getNativeCVAPI)().readFileAsDataURL(image.path, true);
          case _types.DesktopScreenshot.ImageSource.DataUrl:
            return Promise.resolve(image.path);
        }
      }();
      return pImageDataUrl.then(function (dataUrl) {
        _this5.setState({
          imageUrl: dataUrl
        });
        (0, _dom_utils.preloadImage)(dataUrl).then(function (result) {
          _this5.setState({
            imageSize: {
              width: result.width,
              height: result.height
            }
          });
        });
        setTimeout(function () {
          _this5.updateImagePageRect();
        }, 1000);
      });
    }
  }, {
    key: "cornerPosition",
    value: function cornerPosition(rect) {
      var required = {
        width: 50,
        height: 20
      };
      var horizon = rect.x < required.width ? 'right' : 'left';
      var vertical = rect.y < required.height ? 'bottom' : 'top';
      return vertical + '-' + horizon;
    }
  }, {
    key: "ocrMatchStyle",
    value: function ocrMatchStyle(pw, match) {
      var scale = this.state.scale;
      var styleByType = function () {
        switch (match.highlight) {
          case _types2.OcrHighlightType.Identified:
            return {
              color: 'rgba(255, 0, 0, 1)',
              backgroundColor: 'rgba(200, 200, 200, 0.75)'
            };
          case _types2.OcrHighlightType.Matched:
            return {
              color: '#f00',
              backgroundColor: 'rgba(255, 215, 15, 0.5)'
            };
          case _types2.OcrHighlightType.TopMatched:
            return {
              color: '#fe1492',
              backgroundColor: 'rgba(255, 215, 15, 0.5)'
            };
        }
      }();
      return _objectSpread({
        boxSizing: 'border-box',
        position: 'absolute',
        left: "".concat(scale * pw.word.Left, "px"),
        top: "".concat(scale * pw.word.Top, "px"),
        width: "".concat(scale * pw.word.Width, "px"),
        height: "".concat(scale * pw.word.Height, "px"),
        lineHeight: "".concat(scale * pw.word.Height, "px"),
        fontSize: "".concat(scale * pw.word.Height * 0.8, "px"),
        fontWeight: 'bold',
        textAlign: 'center',
        pointerEvents: 'none'
      }, styleByType);
    }
  }, {
    key: "renderRectForOcrMatch",
    value: function renderRectForOcrMatch(match, allState, serial) {
      var scale = this.state.scale;
      var rect = (0, _ocr.ocrMatchRect)(match);
      var styles = {
        boxSizing: 'border-box',
        position: 'absolute',
        left: "".concat(scale * rect.x, "px"),
        top: "".concat(scale * rect.y, "px"),
        width: "".concat(scale * rect.width, "px"),
        height: "".concat(scale * rect.height, "px"),
        border: "2px solid #fe1492",
        background: "transparent",
        pointerEvents: 'none'
      };
      var serialElementStyles = {
        position: 'absolute',
        left: "".concat(scale * (rect.x - 15), "px"),
        top: "".concat(scale * (rect.y - 15), "px"),
        fontSize: '10px',
        lineHeight: '10px',
        color: '#e31399',
        border: '2px solid',
        padding: '2px 4px',
        borderRadius: '4px'
      };
      var circleElementStyles = {
        left: "".concat(scale * (rect.x + rect.width / 2 - 5), "px"),
        top: "".concat(scale * (rect.y + rect.height / 2 - 5), "px"),
        position: 'absolute',
        border: '3px solid #e31399ba',
        padding: '3px 3px',
        borderRadius: '10px'
      };
      var textElementStyles = {
        position: 'absolute',
        left: "".concat(scale * rect.x, "px"),
        top: "".concat(scale * (rect.y + rect.height - 5), "px"),
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4697fc'
      };
      if (allState['curent_cmd'] == "XClickTextRelative" || !!localStorage.getItem('curent_cmd') && localStorage.getItem('curent_cmd') == "XClickTextRelative") {
        var markerDiv = "";
        var stylesY = {};
        var stylesX = {};
        var stylesBox = {};
        var xD = 0,
          yD = 0;
        var isLeft = false;
        var isTopY = false;
        var isXavilable = false;
        if (allState['curent_cmd'] == "XClickTextRelative" || allState['curent-cmd'] == "XClickTextRelative" || !!localStorage.getItem('curent_cmd') && localStorage.getItem('curent_cmd') == "XClickTextRelative") {
          var getTickCounter = function getTickCounter(str) {
            function getNumberSet(num, type) {
              if (parseInt(num) > 0 && type == 'X') {
                return ['>', parseInt(num)];
              } else if (parseInt(num) < 0 && type == 'X') {
                return ['<', parseInt(num.replace('-', ''))];
              } else if (parseInt(num) > 0 && type == 'Y') {
                return ['^', parseInt(num)];
              } else {
                return ['v', parseInt(num.replace('-', ''))];
              }
            }
            function getAllNumbersWithSign(str) {
              var matches = str.match(/-?\d+/g);
              if (matches) {
                return matches;
              }
              return null;
            }
            if (str.indexOf('#R') !== -1) {
              //ABC #R-6,3
              var parts = str.split("#R");
              var nums = getAllNumbersWithSign(parts[1]);
              var _getNumberSet = getNumberSet(nums[0], 'X'),
                _getNumberSet2 = _slicedToArray(_getNumberSet, 2),
                x1 = _getNumberSet2[0],
                y1 = _getNumberSet2[1];
              var _getNumberSet3 = getNumberSet(nums[1], 'Y'),
                _getNumberSet4 = _slicedToArray(_getNumberSet3, 2),
                x2 = _getNumberSet4[0],
                y2 = _getNumberSet4[1];
              ; // 3
              var valueObj = {};
              valueObj[x1] = y1;
              valueObj[x2] = y2;
              return valueObj;
            }

            // return str.split('').reduce((total, letter) => {
            //   total[letter] ? total[letter]++ : total[letter] = 1;
            //   return total;
            // }, {});
          };
          ;
          var cal_tragte = !!localStorage.getItem('caliber_trget') ? localStorage.getItem('caliber_trget') : '';
          //const caliberTick = cal_tragte.split('#R')[1];
          var caliberTick = cal_tragte;
          var countCalObj = getTickCounter(caliberTick);
          //const ocrCalibration:any = !!localStorage.getItem('ocrCalibration') ? localStorage.getItem('ocrCalibration'):6;
          var ocrCalibration = 7;
          for (var x in countCalObj) {
            if (x == 'v' || x == 'v') {
              yD += rect['y'] + ocrCalibration * countCalObj[x]; //down (add in y offset)
            }
            if (x == '>') {
              xD += rect['x'] + ocrCalibration * countCalObj[x]; //right (add in x offset)
            }
            if (x == '<') {
              xD += rect['x'] - ocrCalibration * countCalObj[x]; //left (minus in x offset)
              isLeft = true;
            }
            if (x == '^') {
              yD += rect['y'] - ocrCalibration * countCalObj[x]; //up (minus in y offset)
              isTopY = true;
            }
          }
          if (yD != 0) {
            var stylesY = {
              position: 'absolute',
              left: "".concat(scale * (rect.x + rect.width / 2), "px"),
              top: "".concat(scale * rect.y, "px"),
              height: "".concat(scale * Math.abs(rect.y - yD), "px"),
              borderLeft: "2px solid red"
            };
            if (isTopY) {
              var yHeight = stylesY['height'];
              var yTop = stylesY['top'];
              stylesY['top'] = Math.abs(parseFloat(yTop) - parseInt(yHeight));
            }
          } else {
            yD = rect.y;
          }
          if (xD != 0) {
            var stylesX = {
              position: 'absolute',
              left: "".concat(scale * (rect.x + rect.width / 2), "px"),
              top: "".concat(scale * yD, "px"),
              width: "".concat(scale * Math.abs(rect.x - xD), "px"),
              borderBottom: "2px solid red"
            };
            if (isLeft) {
              stylesX['left'] = scale * Math.abs(rect.x + rect.width / 2 - Math.abs(rect.x - xD));
            }
            isXavilable = true;
          }
          if (isXavilable) {
            var xWidth = stylesX['width'];
            var xLeft = stylesX['left'];
            var leftNewX = isLeft ? parseFloat(xLeft) - scale * 20 : parseFloat(xLeft) + parseFloat(xWidth);
            var stylesBox = {
              position: 'absolute',
              left: "".concat(leftNewX, "px"),
              top: "".concat(scale * yD - scale * 20 / 2, "px"),
              width: "".concat(scale * 20, "px"),
              height: "".concat(scale * 20, "px"),
              border: "2px solid green"
            };
          } else {
            var yLeft = stylesY['left'];
            var _yHeight = stylesY['height'];
            var leftNewY = parseFloat(yLeft);
            var _yTop = stylesY['top'];
            var toptNewY = isTopY ? parseFloat(_yTop) - scale * 20 : parseFloat(_yTop) + parseFloat(_yHeight);
            var stylesBox = {
              position: 'absolute',
              left: "".concat(leftNewY - scale * 20 / 2, "px"),
              top: "".concat(toptNewY, "px"),
              width: "".concat(scale * 20, "px"),
              height: "".concat(scale * 20, "px"),
              border: "2px solid green"
            };
          }
        }
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
          style: styles
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesY
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesX
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesBox
        }));
      } else if (allState['curent_cmd'] == "OCRExtractbyTextRelative" || !!localStorage.getItem('curent_cmd') && localStorage.getItem('curent_cmd') == "OCRExtractbyTextRelative" || allState['curent_cmd'] == "visionLimitSearchAreabyTextRelative" || !!localStorage.getItem('curent_cmd') && localStorage.getItem('curent_cmd') == "visionLimitSearchAreabyTextRelative") {
        var getCoordinates = function getCoordinates(str) {
          //var regex = /TL(-?\d+),(-?\d+)BR(-?\d+),(-?\d+)/;
          var regex = /R(-?\d+),(-?\d+)W(-?\d+)H(-?\d+)/;
          var matches = str.match(regex);
          var x = parseInt(matches[1]);
          var y = parseInt(matches[2]);
          var W = parseInt(matches[3]);
          var H = parseInt(matches[4]);
          return [x, y, W, H];
        };
        var _getTickCounter = function _getTickCounter(str) {
          function getNumberSet(num, type) {
            if (parseInt(num) > 0 && type == 'X') {
              return ['>', parseInt(num)];
            } else if (parseInt(num) < 0 && type == 'X') {
              return ['<', parseInt(String(num).replace('-', ''))];
            } else if (parseInt(num) > 0 && type == 'Y') {
              return ['^', parseInt(num)];
            } else {
              return ['v', parseInt(String(num).replace('-', ''))];
            }
          }
          var nums = getCoordinates(str);
          var _getNumberSet5 = getNumberSet(nums[0], 'X'),
            _getNumberSet6 = _slicedToArray(_getNumberSet5, 2),
            x1 = _getNumberSet6[0],
            y1 = _getNumberSet6[1];
          var _getNumberSet7 = getNumberSet(nums[1], 'Y'),
            _getNumberSet8 = _slicedToArray(_getNumberSet7, 2),
            x2 = _getNumberSet8[0],
            y2 = _getNumberSet8[1];
          ;
          var valueObj = {};
          valueObj[x1] = y1;
          valueObj[x2] = y2;
          return valueObj;
        };
        var $rectBox = document.createElement('div');
        $rectBox.setAttribute('id', 'rect-ocr-box');
        var _styles = {
          boxSizing: 'border-box',
          position: 'absolute',
          left: "".concat(scale * rect.x, "px"),
          top: "".concat(scale * rect.y, "px"),
          width: "".concat(scale * rect.width, "px"),
          height: "".concat(scale * rect.height, "px"),
          border: "2px solid #fe1492",
          background: "transparent",
          pointerEvents: 'none'
        };
        var _markerDiv = "";
        var stylesY = {};
        var stylesX = {};
        var stylesBox = {};
        var _xD = 0,
          _yD = 0;
        var _isLeft = false;
        var _isTopY = false;
        var _isXavilable = false;
        var _cal_tragte = !!localStorage.getItem('caliber_trget') ? localStorage.getItem('caliber_trget') : '';
        var _caliberTick = _cal_tragte;
        if (_caliberTick.indexOf('W') == -1 || _caliberTick.indexOf('H') == -1) {
          _caliberTick = _caliberTick + 'W30H10';
        }
        ;
        var _countCalObj = _getTickCounter(_caliberTick);

        //let ocrCalibration:any = !!localStorage.getItem('ocrCalibration') ? localStorage.getItem('ocrCalibration') : 7;

        var _ocrCalibration = 7;
        for (var x in _countCalObj) {
          if (x == 'v' || x == 'v') {
            _yD += rect['y'] + _ocrCalibration * _countCalObj[x]; //down (add in y offset)
          }
          if (x == '>') {
            _xD += rect['x'] + _ocrCalibration * _countCalObj[x]; //right (add in x offset)
          }
          if (x == '<') {
            _xD += rect['x'] - _ocrCalibration * _countCalObj[x]; //left (minus in x offset)
            _isLeft = true;
          }
          if (x == '^') {
            _yD += rect['y'] - _ocrCalibration * _countCalObj[x]; //up (minus in y offset)
            _isTopY = true;
          }
        }
        var all_nums = getCoordinates(_caliberTick);
        var rectTop = _yD;
        var rectLeft = _xD;
        var rectWidth = _ocrCalibration * all_nums[2];
        var rectHeight = _ocrCalibration * all_nums[3];
        var stylesBox = {
          position: 'absolute',
          left: "".concat(scale * rectLeft, "px"),
          top: "".concat(scale * rectTop, "px"),
          width: "".concat(scale * rectWidth, "px"),
          height: "".concat(scale * rectHeight, "px"),
          border: "2px solid green"
        };
        if (_yD != 0) {
          var stylesY = {
            position: 'absolute',
            left: "".concat(scale * rectLeft, "px"),
            top: "".concat(scale * rect.y, "px"),
            height: "".concat(scale * Math.abs(rect.y - _yD), "px"),
            borderLeft: "2px solid red"
          };
          if (_isTopY) {
            var _yHeight2 = stylesY['height'];
            var _yTop2 = stylesY['top'];
            stylesY['top'] = Math.abs(parseFloat(_yTop2) - parseInt(_yHeight2));
          }
        } else {
          _yD = rect.y;
        }
        if (_yD) if (_xD != 0) {
          var stylesX = {
            position: 'absolute',
            left: "".concat(scale * rect.x, "px"),
            top: "".concat(scale * rect.y, "px"),
            width: "".concat(scale * Math.abs(rect.x - _xD), "px"),
            borderBottom: "2px solid red"
          };
          if (_isLeft) {
            stylesX['left'] = scale * Math.abs(rect.x - Math.abs(rect.x - _xD));
            stylesY['left'] = scale * Math.abs(rect.x - Math.abs(rect.x - _xD));
          }
        }
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
          style: _styles
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesY
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesX
        }), /*#__PURE__*/_react["default"].createElement("div", {
          style: stylesBox
        }));
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
          "data-for": "serial",
          style: serialElementStyles
        }, serial), /*#__PURE__*/_react["default"].createElement("div", {
          "data-for": "circle",
          style: circleElementStyles
        }), /*#__PURE__*/_react["default"].createElement("div", {
          "data-for": "text",
          style: textElementStyles
        }, match.words[0].word.WordText));
      }
    }
  }, {
    key: "colorForRectType",
    value: function colorForRectType(rectType) {
      switch (rectType) {
        case _types.DesktopScreenshot.RectType.Match:
          return 'orange';
        case _types.DesktopScreenshot.RectType.BestMatch:
          return '#ff0000';
        case _types.DesktopScreenshot.RectType.Reference:
        case _types.DesktopScreenshot.RectType.ReferenceOfBestMatch:
          return '#00ff00';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this,
        _this$state$rects,
        _this$state$rects2;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "desktop-screenshot-editor"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "top-bar"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          _this6.setState({
            scale: _this6.state.scale < 1 ? 1 : 0.5
          }, function () {
            setTimeout(function () {
              _this6.updateImagePageRect();
            }, 1000);
          });
        }
      }, this.state.scale < 1 ? 'Show Original Size' : 'Show 50%'), /*#__PURE__*/_react["default"].createElement("button", {
        disabled: this.state.mode === _types.DesktopScreenshot.RequestType.Capture,
        onClick: function onClick() {
          _this6.resetToMode(_types.DesktopScreenshot.RequestType.Capture).then(function () {
            return _this6.selectAreaOnImage();
          }).then(function (dataUrl) {
            if (dataUrl) return csIpc.ask('DESKTOP_EDITOR_ADD_VISION_IMAGE', {
              dataUrl: dataUrl
            });
          });
        }
      }, this.state.mode === _types.DesktopScreenshot.RequestType.Capture ? 'Selecting...' : 'Select Image')), /*#__PURE__*/_react["default"].createElement("div", {
        className: "editing-area"
      }, this.state.imageUrl.length > 0 ? /*#__PURE__*/_react["default"].createElement("img", {
        ref: function ref(_ref4) {
          _this6.$image = _ref4;
        },
        style: {
          width: screen.width * this.state.scale + 'px',
          height: screen.height * this.state.scale + 'px'
        },
        src: this.state.imageUrl
      }) : null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "highlight-rect-list"
      }, this.state.mode !== _types.DesktopScreenshot.RequestType.DisplayVisualX ? (_this$state$rects = this.state.rects) === null || _this$state$rects === void 0 ? void 0 : _this$state$rects.map(function (rect, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          style: {
            top: rect.y * _this6.state.scale + 'px',
            left: rect.x * _this6.state.scale + 'px',
            width: rect.width * _this6.state.scale + 'px',
            height: rect.height * _this6.state.scale + 'px',
            border: "1px solid ".concat(_this6.colorForRectType(rect.type)),
            color: _this6.colorForRectType(rect.type)
          },
          className: "highlight-rect"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _utils.cn)('score', _this6.cornerPosition(rect))
        }, rect.text ? rect.text + (_this6.state.rects.length > 1 ? "#".concat(rect.index + 1) : '') : (rect.score !== undefined ? rect.score.toFixed(2) : '') + "#".concat(rect.index + 1)));
      }) : (_this$state$rects2 = this.state.rects) === null || _this$state$rects2 === void 0 ? void 0 : _this$state$rects2.map(function (rect, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          style: {
            top: rect.y * _this6.state.scale - 8 + 'px',
            // half of 16px 
            left: rect.x * _this6.state.scale - 8 + 'px',
            // half of 16px
            color: _this6.colorForRectType(rect.type)
          },
          className: "highlight-rect"
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 64 64",
          width: "16px",
          height: "16px"
        }, /*#__PURE__*/_react["default"].createElement("line", {
          x1: "8",
          y1: "8",
          x2: "56",
          y2: "56",
          stroke: "red",
          "stroke-width": "12"
        }), /*#__PURE__*/_react["default"].createElement("line", {
          x1: "56",
          y1: "8",
          x2: "8",
          y2: "56",
          stroke: "red",
          "stroke-width": "12"
        })));
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ocr-match-list"
      }, this.state.ocrMatches.map(function (match, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i
        }, match.words.map(function (pw, j) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: j,
            style: _this6.ocrMatchStyle(pw, match),
            className: "ocr-match"
          }, pw.word.WordText);
        }), [_types2.OcrHighlightType.Matched, _types2.OcrHighlightType.TopMatched, _types2.OcrHighlightType.WildcardMatched, _types2.OcrHighlightType.WildcardTopMatched].includes(match.highlight) ? _this6.renderRectForOcrMatch(match, allState, i) : null);
      }))));
    }
  }]);
  return App;
}(_react["default"].Component);

/***/ }),

/***/ 12660:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pointAtPos = exports.getAnchorRects = exports.genGetAnchorRects = exports.fitSquarePoint = exports.diagonalPos = exports.diagonalPoint = exports.calcRectAndAnchor = exports.Box = exports.BOX_ANCHOR_POS = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BOX_ANCHOR_POS = exports.BOX_ANCHOR_POS = {
  TOP_LEFT: 1,
  TOP_RIGHT: 2,
  BOTTOM_RIGHT: 3,
  BOTTOM_LEFT: 4
};
var fitSquarePoint = exports.fitSquarePoint = function fitSquarePoint(movingPoint, fixedPoint) {
  var mp = movingPoint;
  var fp = fixedPoint;
  var xlen = Math.abs(mp.x - fp.x);
  var ylen = Math.abs(mp.y - fp.y);
  var len = Math.min(xlen, ylen);
  return {
    x: fp.x + Math.sign(mp.x - fp.x) * len,
    y: fp.y + Math.sign(mp.y - fp.y) * len
  };
};
var calcRectAndAnchor = exports.calcRectAndAnchor = function calcRectAndAnchor(movingPoint, fixedPoint) {
  var mp = movingPoint;
  var fp = fixedPoint;
  var pos = null;
  var tlp = null;
  if (mp.x <= fp.x && mp.y <= fp.y) {
    pos = BOX_ANCHOR_POS.TOP_LEFT;
    tlp = mp;
  } else if (mp.x > fp.x && mp.y > fp.y) {
    pos = BOX_ANCHOR_POS.BOTTOM_RIGHT;
    tlp = fp;
  } else if (mp.x > fp.x) {
    pos = BOX_ANCHOR_POS.TOP_RIGHT;
    tlp = {
      x: fp.x,
      y: mp.y
    };
  } else if (mp.y > fp.y) {
    pos = BOX_ANCHOR_POS.BOTTOM_LEFT;
    tlp = {
      x: mp.x,
      y: fp.y
    };
  }
  return {
    rect: {
      x: tlp.x,
      y: tlp.y,
      width: Math.abs(mp.x - fp.x),
      height: Math.abs(mp.y - fp.y)
    },
    anchorPos: pos
  };
};
var pointAtPos = exports.pointAtPos = function pointAtPos(rect, pos) {
  switch (pos) {
    case BOX_ANCHOR_POS.TOP_LEFT:
      return {
        x: rect.x,
        y: rect.y
      };
    case BOX_ANCHOR_POS.TOP_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y
      };
    case BOX_ANCHOR_POS.BOTTOM_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height
      };
    case BOX_ANCHOR_POS.BOTTOM_LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height
      };
  }
};
var diagonalPos = exports.diagonalPos = function diagonalPos(pos) {
  switch (pos) {
    case BOX_ANCHOR_POS.TOP_LEFT:
      return BOX_ANCHOR_POS.BOTTOM_RIGHT;
    case BOX_ANCHOR_POS.TOP_RIGHT:
      return BOX_ANCHOR_POS.BOTTOM_LEFT;
    case BOX_ANCHOR_POS.BOTTOM_RIGHT:
      return BOX_ANCHOR_POS.TOP_LEFT;
    case BOX_ANCHOR_POS.BOTTOM_LEFT:
      return BOX_ANCHOR_POS.TOP_RIGHT;
  }
};
var diagonalPoint = exports.diagonalPoint = function diagonalPoint(rect, anchorPos) {
  return pointAtPos(rect, diagonalPos(anchorPos));
};
var genGetAnchorRects = exports.genGetAnchorRects = function genGetAnchorRects(ANCHOR_POS, pointAtPos) {
  return function (_ref) {
    var rect = _ref.rect,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 5 : _ref$size;
    var values = function values(obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    };
    var createRect = function createRect(point, size) {
      return {
        x: point.x - size,
        y: point.y - size,
        width: size * 2,
        height: size * 2
      };
    };
    return values(ANCHOR_POS).map(function (pos) {
      return {
        anchorPos: pos,
        rect: createRect(pointAtPos(rect, pos), size)
      };
    });
  };
};
var getAnchorRects = exports.getAnchorRects = genGetAnchorRects(BOX_ANCHOR_POS, pointAtPos);
var Box = exports.Box = /*#__PURE__*/function () {
  function Box(options) {
    _classCallCheck(this, Box);
    _defineProperty(this, "state", {
      type: 'box',
      data: null,
      style: {},
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    });
    _defineProperty(this, "local", {});
    var opts = Object.assign({
      firstSilence: true,
      transform: function transform(x) {
        return x;
      },
      onStateChange: function onStateChange() {}
    }, options);
    this.transform = opts.transform;
    this.onStateChange = opts.onStateChange;
    this.normalizeRect = opts.normalizeRect || function (x) {
      return x;
    };
    this.__setState({
      id: opts.id,
      data: opts.data,
      type: this.getType(),
      style: this.getDefaultStyle(),
      category: this.getCategory(),
      rect: {
        x: opts.x,
        y: opts.y,
        width: opts.width || 0,
        height: opts.height || 0
      }
    }, {
      silent: opts.firstSilence
    });
  }
  _createClass(Box, [{
    key: "getType",
    value: function getType() {
      return 'box';
    }
  }, {
    key: "getCategory",
    value: function getCategory() {
      return Box.category;
    }
  }, {
    key: "getDefaultAnchorPos",
    value: function getDefaultAnchorPos() {
      return BOX_ANCHOR_POS.BOTTOM_RIGHT;
    }
  }, {
    key: "getDefaultStyle",
    value: function getDefaultStyle() {
      return {};
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.state.id;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.transform(this.state);
    }
  }, {
    key: "processIncomingStyle",
    value: function processIncomingStyle(style) {
      return style;
    }
  }, {
    key: "setStyle",
    value: function setStyle(obj) {
      this.__setState({
        style: _objectSpread(_objectSpread({}, this.state.style), this.processIncomingStyle(obj))
      });
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.__setState({
        data: data
      });
    }
  }, {
    key: "moveAnchorStart",
    value: function moveAnchorStart(_ref2) {
      var anchorPos = _ref2.anchorPos;
      this.__setLocal({
        oldPoint: pointAtPos(this.state.rect, anchorPos),
        oldAnchorPos: anchorPos,
        anchorPos: anchorPos
      });
    }
  }, {
    key: "moveAnchor",
    value: function moveAnchor(_ref3) {
      var x = _ref3.x,
        y = _ref3.y;
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        fit = _ref4.fit;
      var old = this.state.rect;
      var pos = this.local.anchorPos;
      var fixed = diagonalPoint(old, pos);
      var moving = !fit ? {
        x: x,
        y: y
      } : fitSquarePoint({
        x: x,
        y: y
      }, fixed);
      var res = calcRectAndAnchor(moving, fixed);
      this.__setLocal({
        anchorPos: res.anchorPos
      });
      this.__setState({
        rect: this.normalizeRect(res.rect, 'moveAnchor')
      });
    }
  }, {
    key: "moveAnchorEnd",
    value: function moveAnchorEnd() {
      this.__setLocal({
        oldPoint: null,
        oldAnchorPos: null,
        anchorPos: null
      });
    }
  }, {
    key: "moveBoxStart",
    value: function moveBoxStart() {
      this.__setLocal({
        oldRect: _objectSpread({}, this.state.rect)
      });
    }
  }, {
    key: "moveBox",
    value: function moveBox(_ref5) {
      var dx = _ref5.dx,
        dy = _ref5.dy;
      var old = this.local.oldRect;
      var upd = _objectSpread(_objectSpread({}, old), {}, {
        x: old.x + dx,
        y: old.y + dy
      });
      this.__setState({
        rect: this.normalizeRect(upd, 'moveBox')
      });
    }
  }, {
    key: "moveBoxEnd",
    value: function moveBoxEnd() {
      this.__setLocal({
        oldRect: null
      });
    }
  }, {
    key: "__setState",
    value: function __setState(obj) {
      var _this = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var last = this.getState();
      this.state = _objectSpread(_objectSpread({}, this.state), obj);
      if (opts.silent) return;
      var fn = function fn() {
        return _this.onStateChange(_this.getState(), last);
      };
      var invoke = opts.nextTick ? function (fn) {
        return setTimeout(fn, 0);
      } : function (fn) {
        return fn();
      };
      invoke(fn);
    }
  }, {
    key: "__setLocal",
    value: function __setLocal(obj) {
      this.local = _objectSpread(_objectSpread({}, this.local), obj);
    }
  }]);
  return Box;
}();
// Note: possible settings
_defineProperty(Box, "settings", []);
_defineProperty(Box, "category", 'rect');
_defineProperty(Box, "defaultAnchorPos", BOX_ANCHOR_POS.BOTTOM_RIGHT);

/***/ }),

/***/ 35645:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.selectAreaPromise = exports.selectArea = exports.createRect = exports.createEl = exports.commonStyle = void 0;
var _dom_utils = __webpack_require__(92950);
var _box = __webpack_require__(12660);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var commonStyle = exports.commonStyle = {
  boxSizing: 'border-box',
  fontFamily: 'Arial'
};
var createEl = exports.createEl = function createEl(_ref) {
  var _ref$tag = _ref.tag,
    tag = _ref$tag === void 0 ? 'div' : _ref$tag,
    _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    text = _ref.text;
  var $el = document.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    $el.setAttribute(key, attrs[key]);
  });
  if (text && text.length) {
    $el.innerText = text;
  }
  (0, _dom_utils.setStyle)($el, style);
  return $el;
};
var createRect = exports.createRect = function createRect(opts) {
  var containerStyle = _objectSpread(_objectSpread({}, commonStyle), {}, {
    position: 'absolute',
    zIndex: 100000,
    top: (0, _dom_utils.pixel)(opts.top),
    left: (0, _dom_utils.pixel)(opts.left),
    width: (0, _dom_utils.pixel)(opts.width),
    height: (0, _dom_utils.pixel)(opts.height)
  }, opts.containerStyle || {});
  var rectStyle = _objectSpread(_objectSpread({}, commonStyle), {}, {
    width: '100%',
    height: '100%',
    border: "".concat(opts.rectBorderWidth, "px solid rgb(239, 93, 143)"),
    cursor: 'move',
    background: 'transparent'
  }, opts.rectStyle || {});
  var circleStyle = _objectSpread(_objectSpread({}, commonStyle), {}, {
    width: '8px',
    height: '8px',
    border: "".concat(opts.rectBorderWidth, "px solid rgb(239, 93, 143)"),
    cursor: 'pointer',
    background: 'red',
    position: 'absolute',
    'border-radius': '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }, opts.rectStyle || {});
  var $container = createEl({
    style: containerStyle
  });
  var $rectangle = createEl({
    style: rectStyle
  });
  var $circlePointer = createEl({
    style: circleStyle
  });
  $container.appendChild($rectangle);
  $container.appendChild($circlePointer);
  document.documentElement.appendChild($container);
  return {
    $container: $container,
    $rectangle: $rectangle,
    destroy: function destroy() {
      $container.remove();
    },
    hide: function hide() {
      (0, _dom_utils.setStyle)($container, {
        display: 'none'
      });
    },
    show: function show() {
      (0, _dom_utils.setStyle)($container, {
        display: 'block'
      });
    }
  };
};
var createOverlay = function createOverlay(extraStyles) {
  var $overlay = createEl({
    style: _objectSpread({
      position: 'fixed',
      zIndex: 9000,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'transparent',
      cursor: 'crosshair'
    }, extraStyles)
  });
  document.documentElement.appendChild($overlay);
  return {
    $overlay: $overlay,
    destroy: function destroy() {
      return $overlay.remove();
    }
  };
};
var selectArea = exports.selectArea = function selectArea(_ref2) {
  var done = _ref2.done,
    _ref2$onDestroy = _ref2.onDestroy,
    onDestroy = _ref2$onDestroy === void 0 ? function () {} : _ref2$onDestroy,
    _ref2$allowCursor = _ref2.allowCursor,
    allowCursor = _ref2$allowCursor === void 0 ? function (e) {
      return true;
    } : _ref2$allowCursor,
    _ref2$overlayStyles = _ref2.overlayStyles,
    overlayStyles = _ref2$overlayStyles === void 0 ? {} : _ref2$overlayStyles,
    _ref2$clickToDestroy = _ref2.clickToDestroy,
    clickToDestroy = _ref2$clickToDestroy === void 0 ? true : _ref2$clickToDestroy,
    _ref2$preventGlobalCl = _ref2.preventGlobalClick,
    preventGlobalClick = _ref2$preventGlobalCl === void 0 ? true : _ref2$preventGlobalCl;
  var go = function go(done) {
    var state = {
      box: null,
      activated: false,
      startPos: null,
      rect: null
    };
    var resetBodyStyle = function () {
      var userSelectKey = _web_extension["default"].isFirefox() ? '-moz-user-select' : 'user-select';
      var style = window.getComputedStyle(document.body);
      var oldCursor = style.cursor;
      var oldUserSelect = style[userSelectKey];
      (0, _dom_utils.setStyle)(document.body, _defineProperty({
        cursor: 'crosshair'
      }, userSelectKey, 'none'));
      return function () {
        return (0, _dom_utils.setStyle)(document.body, _defineProperty({
          cursor: oldCursor
        }, userSelectKey, oldUserSelect));
      };
    }();
    var overlayApi = createOverlay(overlayStyles);
    var unbindDrag = (0, _dom_utils.bindDrag)({
      preventGlobalClick: preventGlobalClick,
      $el: overlayApi.$overlay,
      onDragStart: function onDragStart(e) {
        e.preventDefault();
        if (!allowCursor(e)) return;
        state.activated = true;
        state.startPos = {
          x: e.pageX,
          y: e.pageY
        };
      },
      onDragEnd: function onDragEnd(e) {
        e.preventDefault();
        state.activated = false;
        if (state.box) {
          state.box.moveAnchorEnd();
          var boundingRect = rectObj.$container.getBoundingClientRect();
          API.hide();

          // Note: API.hide() takes some time to have effect
          setTimeout(function () {
            state.box = null;
            return Promise.resolve(done(state.rect, boundingRect))["catch"](function (e) {}).then(function () {
              return API.destroy();
            });
          }, 100);
        }
      },
      onDrag: function onDrag(e, _ref3) {
        var dx = _ref3.dx,
          dy = _ref3.dy;
        e.preventDefault();
        if (!allowCursor(e)) return;
        if (!state.activated) return;
        if (!state.box) {
          var rect = {
            x: state.startPos.x,
            y: state.startPos.y,
            width: dx,
            height: dy
          };
          state.rect = rect;
          state.box = new _box.Box(_objectSpread(_objectSpread({}, rect), {}, {
            onStateChange: function onStateChange(_ref4) {
              var rect = _ref4.rect;
              state.rect = rect;
              API.show();
              API.updatePos(rect);
            }
          }));
          state.box.moveAnchorStart({
            anchorPos: _box.BOX_ANCHOR_POS.BOTTOM_RIGHT
          });
        }
        state.box.moveAnchor({
          x: e.pageX,
          y: e.pageY
        });
      }
    });
    var rectObj = createRect({
      top: -999,
      left: -999,
      width: 0,
      height: 0,
      rectStyle: {
        border: '1px solid #ff0000',
        background: 'rgba(255, 0, 0, 0.1)'
      }
    });
    var API = {
      updatePos: function updatePos(rect) {
        (0, _dom_utils.setStyle)(rectObj.$container, {
          top: (0, _dom_utils.pixel)(rect.y),
          left: (0, _dom_utils.pixel)(rect.x),
          width: (0, _dom_utils.pixel)(rect.width),
          height: (0, _dom_utils.pixel)(rect.height)
        });
      },
      destroy: function destroy() {
        resetBodyStyle();
        unbindDrag();
        overlayApi.destroy();
        rectObj.destroy();
        setTimeout(function () {
          document.removeEventListener('click', onClick, true);
          document.removeEventListener('keydown', onKeyDown, true);
        }, 0);
        onDestroy();
      },
      hide: function hide() {
        rectObj.hide();
      },
      show: function show() {
        rectObj.show();
      }
    };
    var onClick = function onClick(e) {
      // If drag starts, we should ignore click event
      if (state.box) return;
      e.preventDefault();
      e.stopPropagation();
      API.destroy();
    };
    var onKeyDown = function onKeyDown(e) {
      return e.keyCode === 27 && API.destroy();
    };
    document.addEventListener('keydown', onKeyDown, true);
    if (clickToDestroy) {
      document.addEventListener('click', onClick, true);
    }
    API.hide();
    return API;
  };
  return go(done);
};
var selectAreaPromise = exports.selectAreaPromise = function selectAreaPromise(opts) {
  return new Promise(function (resolve, reject) {
    var wrappedDone = function wrappedDone() {
      resolve(opts.done.apply(opts, arguments));
    };
    var wrappedOnDestroy = function wrappedOnDestroy() {
      try {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (opts.onDestroy) opts.onDestroy(args);
      } catch (e) {}
      resolve();
    };
    selectArea(_objectSpread(_objectSpread({}, opts), {}, {
      done: wrappedDone,
      onDestroy: wrappedOnDestroy
    }));
  });
};

/***/ }),

/***/ 19385:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(31896), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body{display:flex;flex-direction:column}#root{flex:1;min-width:100%;min-height:100%}.desktop-screenshot-editor{display:flex;flex-direction:column;min-height:100%}.desktop-screenshot-editor .top-bar{position:fixed;z-index:2;top:0;left:0;right:0;height:54px;background:#007bff;display:flex;flex-direction:row;align-items:center;cursor:default}.desktop-screenshot-editor .top-bar button{margin-left:20px;padding:0 20px;height:40px;line-height:40px;border:1px solid #fff;border-radius:4px;font-size:14px;color:#fff;background:rgba(0,0,0,0);cursor:pointer;transition:all .3s ease}.desktop-screenshot-editor .top-bar button:hover{background:#fefefe;color:#007bff}.desktop-screenshot-editor .top-bar button[disabled]{background:rgba(255,255,255,.5);color:#fff;cursor:not-allowed}.desktop-screenshot-editor .editing-area{flex:1;position:relative;z-index:1;margin-top:54px;width:100%;min-height:calc(100% - 54px);background:url(${___CSS_LOADER_URL_REPLACEMENT_0___});background-repeat:repeat}.desktop-screenshot-editor .editing-area img{display:block}.desktop-screenshot-editor .editing-area .highlight-rect{position:absolute;z-index:110001;pointer-events:none;font-size:14px}.desktop-screenshot-editor .editing-area .highlight-rect .score{position:absolute;width:200px}.desktop-screenshot-editor .editing-area .highlight-rect .score.top-left{top:0px;left:0px;transform:translate(-100%, -100%);text-align:right}.desktop-screenshot-editor .editing-area .highlight-rect .score.top-right{top:0px;right:0px;transform:translate(100%, -100%)}.desktop-screenshot-editor .editing-area .highlight-rect .score.bottom-right{bottom:0px;right:0px;transform:translate(100%, 100%)}.desktop-screenshot-editor .editing-area .highlight-rect .score.bottom-left{bottom:0px;left:0px;transform:translate(-100%, 100%);text-align:right}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4417:
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 40961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(22551);
} else {}


/***/ }),

/***/ 96540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(15287);
} else {}


/***/ }),

/***/ 45786:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19385);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 31896:
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEUAAABaWlrMzMz////nPAkwAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+IDGRUHMxeV5KYAAAAXSURBVAjXY1i16v9/BiKI//9XrSKCAABNyDUhZP4pqwAAAABJRU5ErkJggg==";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			848: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [787,626,624,397,188], () => (__webpack_require__(90364)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;