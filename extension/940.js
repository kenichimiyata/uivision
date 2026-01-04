"use strict";
(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[940],{

/***/ 43396:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
__webpack_require__(12425);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _global_state = __webpack_require__(8327);
var _run_command = __webpack_require__(60741);
var _redux2 = __webpack_require__(68806);
var _antd = __webpack_require__(33061);
var _variables = __webpack_require__(54836);
var _helper = __webpack_require__(49644);
var _service = __webpack_require__(28307);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import { runComputerUseService } from '@/services/ai/computer_use/computer_use.service'
// import { Player } from '@/common/player'
// import varsFactory from '@/common/variables'
/*
You:A tick tak toe game is open.
AI: I'll help play the tic ....
Action: Screenshot
AI: I see the ...
*/
var SampleConversation = [{
  sender: 'You',
  message: 'A tick tak toe game is open.'
}, {
  sender: 'AI',
  message: "I'll help play the tic ...."
}, {
  sender: 'Action',
  message: 'Screenshot'
}, {
  sender: 'AI',
  message: 'I see the ...'
}, {
  sender: 'AI',
  message: "I'll help play the tic ...."
}, {
  sender: 'Action',
  message: 'Screenshot'
}, {
  sender: 'AI',
  message: 'I see the ...'
}];
var AiChat = /*#__PURE__*/function (_React$Component) {
  _inherits(AiChat, _React$Component);
  function AiChat(props) {
    var _this;
    _classCallCheck(this, AiChat);
    _this = _callSuper(this, AiChat, [props]);
    _defineProperty(_assertThisInitialized(_this), "state", {
      processRunning: false,
      conversation: [],
      aiPromptText: "",
      //Use the calculator to calculate 5 + 8 and verify the result. Then stop.
      latestMouseCoordinate: null
    });
    _defineProperty(_assertThisInitialized(_this), "appendMessage", function (message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var isActionOrResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (type === 'ai') {
        if (isActionOrResult === 'action') {} else if (isActionOrResult === 'result') {} else {
          _this.addConversation('AI', message);
        }
      } else if (type === 'user') {
        if (isActionOrResult === 'action') {} else if (isActionOrResult === 'result') {
          _this.addConversation('Action', message);
        } else {
          _this.addConversation('You', message);
        }
      } else if (type === 'status') {
        // TODO: show it in the UI top
        console.log('appendMessage:>> status:>> ', message);
        _this.props.renderStatus(message);
      } else if (type === 'set-coordinate') {
        var action = JSON.parse(message);
        console.log('appendMessage:>> set-coordinate:>> ', action);
        _this.setState({
          latestMouseCoordinate: {
            x: action.x,
            y: action.y
          }
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getComputerUseService", function () {
      if (!_this.computerUseService) {
        var config = _this.props.config;
        var isDesktop = config.cvScope === 'desktop';
        var loopCompletedCount = 0;
        var getTerminationRequest = function getTerminationRequest(_loopCompletedCount) {
          var state = _redux2.store.getState();
          loopCompletedCount = _loopCompletedCount;
          var maxLoop = parseInt(state.config.aiComputerUseMaxLoops);
          console.log('#220 getTerminationRequest:>> loopCompletedCount:>> ', loopCompletedCount);
          console.log('#220 getTerminationRequest:>> maxLoop:>> ', maxLoop);
          if (loopCompletedCount >= maxLoop) {
            _this.addConversation('Action', "Computer Use sequence ended (".concat(loopCompletedCount, " loops)"));
            return 'max_loop_reached';
          }
          if (_this.state.processRunning === false) {
            _this.addConversation('Action', "Computer Use sequence ended (".concat(loopCompletedCount, " loops)"));
            return 'stop_requested';
          }
        };
        var captureScreenShotFunction = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var vars, isDesktop;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  vars = (0, _variables.getVarsInstance)();
                  isDesktop = config.cvScope === 'desktop';
                  _context.next = 4;
                  return (0, _helper.captureScreenShot)({
                    vars: vars,
                    isDesktop: isDesktop
                  });
                case 4:
                  return _context.abrupt("return", _context.sent);
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function captureScreenShotFunction() {
            return _ref.apply(this, arguments);
          };
        }();
        _this.computerUseService = new _service.ComputerUseService({
          runCsFreeCommands: _run_command.runCsFreeCommands,
          value: null,
          captureScreenShotFunction: captureScreenShotFunction,
          isDesktop: isDesktop,
          logMessage: _this.appendMessage,
          getTerminationRequest: getTerminationRequest
        });
      }
      return _this.computerUseService;
    });
    _defineProperty(_assertThisInitialized(_this), "addConversation", function (sender, message, isError) {
      _this.setState({
        conversation: [].concat(_toConsumableArray(_this.state.conversation), [{
          sender: sender,
          message: message
          // timestamp: new Date()
        }])
      });
      setTimeout(function () {
        if (_this.conversationRef.current) {
          _this.conversationRef.current.scrollTop = _this.conversationRef.current.scrollHeight;
        }
      }, 100);
    });
    _defineProperty(_assertThisInitialized(_this), "send", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(prompt_) {
        var prompt, vars;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // const config = this.props.config
              // const isDesktop = config.cvScope === 'desktop'
              // const anthropicAPIKey = getVarsInstance().anthropicAPIKey
              // console.log('anthropicAPIKey:>> ', anthropicAPIKey)
              // return;
              prompt = prompt_ || _this.state.aiPromptText;
              if (!(_this.state.processRunning || prompt === '')) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return");
            case 3:
              _this.setState({
                processRunning: true
              });
              _context2.next = 6;
              return (0, _global_state.updateState)({
                status: C.APP_STATUS.PLAYER,
                pendingPlayingTab: false,
                xClickNeedCalibrationInfo: null
              });
            case 6:
              vars = (0, _variables.getVarsInstance)();
              return _context2.abrupt("return", _this.getComputerUseService().run(prompt, 'ai_result', vars).then(function (result) {
                _this.setState({
                  processRunning: false
                });
              }).then(function () {
                _this.setState({
                  processRunning: false
                });
                // this.addConversation('Action', 'Computer Use sequence ended')
              })["catch"](function (error) {
                console.log('error:>> ', error);
                _this.setState({
                  processRunning: false
                });
                _this.addConversation('Error', error.message, true);
              }));
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      _this.setState({
        processRunning: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "find", function () {
      // for XClick and XMove Only
      // let coordinates: Coordinate | null = null

      // this.state.conversation.forEach((item) => {
      //   if (coordinates) {
      //     return
      //   }
      //   // Moved 857,52
      //   // 'Moved' : action.command === 'left_click' ? 'Clicked left' : 'Clicked right'
      //   const match = item.message.match(/XMove (\d+),(\d+)/)
      //   if (match) {
      //     const [_, x, y] = match
      //     coordinates = { x: parseInt(x, 10), y: parseInt(y, 10) }
      //   }
      // })

      // console.log('#238 find:>> coordinates:>> ', coordinates)

      if (!_this.state.latestMouseCoordinate) {
        _this.props.renderStatus('No coordinates found');
        return;
      }

      // let foundCoordinate = coordinates as Coordinate

      // XMove 857,52
      var isDesktop = _this.props.config.cvScope === 'desktop';
      console.log('#238 find:>> isDesktop:>> ', isDesktop);
      return (0, _run_command.runCsFreeCommands)({
        cmd: 'XMove',
        target: "".concat(_this.state.latestMouseCoordinate.x, ",").concat(_this.state.latestMouseCoordinate.y),
        extra: {
          debugVisual: true
        },
        spExtra: {
          isDesktop: isDesktop,
          useLatestScreenShot: isDesktop ? true : undefined
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "newChat", function () {
      if (_this.state.processRunning) {
        return;
      }
      _this.getComputerUseService().createNewChat();
      _this.setState({
        conversation: []
      });
    });
    _this.conversationRef = /*#__PURE__*/_react["default"].createRef();
    _this.computerUseService = _this.getComputerUseService();
    _this.appendMessage = _this.appendMessage.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(AiChat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var useInitialPromptInAiChat = this.props.config.useInitialPromptInAiChat;
      var aiChatSidebarPrompt = this.props.config.aiChatSidebarPrompt;
      if (useInitialPromptInAiChat) {
        this.send(aiChatSidebarPrompt);
      }
      // this.props.renderStatus('AI Chat')
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ai-chat"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.conversationRef,
        className: "ai-conversation"
      }, this.state.conversation.map(function (item, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "ai-conversation-item",
          key: i
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(item.sender === 'Error' ? 'sender-error' : item.sender === 'You' ? 'sender-you' : item.sender === 'AI' ? 'sender-ai' : 'sender-action')
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "sender"
        }, "".concat(item.sender, ": ")), item.message));
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "chat-footer"
      }, /*#__PURE__*/_react["default"].createElement("textarea", {
        className: "chat-input",
        value: this.state.aiPromptText,
        onChange: function onChange(e) {
          return _this2.setState({
            aiPromptText: e.target.value
          });
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "chat-actions"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.state.processRunning,
        onClick: function onClick() {
          _this2.send();
        }
      }, "Send"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        className: "find-button",
        disabled: this.state.processRunning,
        onClick: function onClick() {
          _this2.find();
        }
      }, "Find"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        className: "find-button",
        disabled: this.state.processRunning,
        onClick: function onClick() {
          _this2.newChat();
        }
      }, "New Chat"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        className: "stop-button",
        onClick: this.stop,
        disabled: !this.state.processRunning
      }, "Stop"))));
    }
  }]);
  return AiChat;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    config: state.config
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(AiChat);

/***/ }),

/***/ 59480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CommandItem = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(5556));
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactDom = __webpack_require__(40961);
var _command = __webpack_require__(85393);
var _ts_utils = __webpack_require__(1601);
var _utils = __webpack_require__(46580);
var _reactDnd = __webpack_require__(81592);
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
          width: columnWidths.cmd * tableWidth,
          maxWidth: 170
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
      }, command.value)));
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

/***/ 75472:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _icons = __webpack_require__(29937);
var _reactFontawesome = __webpack_require__(20982);
var _freeRegularSvgIcons = __webpack_require__(7065);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var C = _interopRequireWildcard(__webpack_require__(95902));
var _storage = __webpack_require__(97467);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _global_state = __webpack_require__(8327);
var _tab = __webpack_require__(13755);
var _player = __webpack_require__(18392);
var _simple_actions = __webpack_require__(8588);
var _utils = __webpack_require__(46580);
__webpack_require__(97605);
var _storage2 = _interopRequireDefault(__webpack_require__(88555));
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
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
var Controls = /*#__PURE__*/function (_React$Component) {
  _inherits(Controls, _React$Component);
  function Controls() {
    var _this;
    _classCallCheck(this, Controls);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Controls, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      openIDEClicked: false
    });
    _defineProperty(_assertThisInitialized(_this), "openRegisterSettings", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      _this.props.updateUI({
        showSettings: true,
        settingsTab: 'register'
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getTestCaseName", function () {
      var src = _this.props.editing.meta.src;
      return src && src.name && src.name.length ? src.name : 'Untitled';
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
    _defineProperty(_assertThisInitialized(_this), "checkWindowisOpen", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(bwindowId) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
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
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "playCurrentMacro", /*#__PURE__*/function () {
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
              if (!(bwindowId != '')) {
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
              _context2.t0 = '';
            case 11:
              wTab = _context2.t0;
              _web_extension["default"].tabs.query({
                active: true
              }).then(function (tabs) {
                if (tabs.length === 0) {
                  (0, _tab.getPlayTab)().then(function (tab) {
                    (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toPlay'], tab.id));
                    var commands = _this.props.editing.commands;
                    var src = _this.props.editing.meta.src;
                    var openTc = commands.find(function (tc) {
                      return tc.cmd.toLowerCase() === 'open' || 'openbrowser';
                    });
                    _this.setState({
                      lastOperation: 'play'
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
                      isStep: isStep
                    });
                  });
                } else {
                  var tab = wTab != '' ? wTab : tabs[0];
                  (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toPlay'], tab.id));
                  var commands = _this.props.editing.commands;
                  var src = _this.props.editing.meta.src;
                  var openTc = commands.find(function (tc) {
                    return tc.cmd.toLowerCase() === 'open' || 'openbrowser';
                  });
                  _this.setState({
                    lastOperation: 'play'
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
                    isStep: isStep
                  });
                }
              });
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "onClickOpenIDE", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var showSettingsOnStart,
        userResponse,
        tabId,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            showSettingsOnStart = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
            if (!_web_extension["default"].isFirefox()) {
              _context3.next = 9;
              break;
            }
            userResponse = confirm('To Open IDE, click OK and click the Extension icon in extension bar.');
            if (userResponse) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return");
          case 5:
            _context3.next = 7;
            return _this.props.updateConfig(_defineProperty({}, "oneTimeShowSidePanel", false));
          case 7:
            _web_extension["default"].sidebarAction.close();
            return _context3.abrupt("return");
          case 9:
            _context3.next = 11;
            return (0, _tab.getActiveTabId)();
          case 11:
            tabId = _context3.sent;
            if (tabId) {
              if (showSettingsOnStart) {
                (0, _tab.showPanelWindow)({
                  showSettingsOnStart: showSettingsOnStart
                });
              } else {
                _this.setState({
                  openIDEClicked: true
                });

                // disable open sidepanel first
                _storage2["default"].get("config").then(function (config) {
                  _storage2["default"].set("config", _objectSpread(_objectSpread({}, config), {}, {
                    disableOpenSidepanelBtnTemporarily: true
                  })).then(function () {
                    return (0, _tab.showPanelWindow)().then(function () {
                      return (
                        // re-enable open sidepanel after window shows
                        _storage2["default"].get("config").then(function (config) {
                          _storage2["default"].set("config", _objectSpread(_objectSpread({}, config), {}, {
                            disableOpenSidepanelBtnTemporarily: false
                          }));
                        }).then(function () {
                          return (
                            // close sidepanel
                            //  
                            // issue: sidebarAction.close may only be called from a user input handler
                            // Ext.sidebarAction.close()

                            _web_extension["default"].sidePanel.setOptions({
                              enabled: false
                            }).then(function () {
                              _web_extension["default"].sidePanel.setOptions({
                                enabled: true
                              });
                            })
                          );
                        })
                      );
                    });
                  });
                });
              }
            }
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    return _this;
  }
  _createClass(Controls, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var type = (0, _storage.getStorageManager)().getCurrentStrategyType();
      this.setState({
        storageMode: type
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "control-panel-container"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "control-panel"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "action-button-container"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.props.player.status === C.PLAYER_STATUS.PLAYING || this.props.player.status === C.PLAYER_STATUS.PAUSED,
        onClick: function onClick() {
          return _this2.playCurrentMacro(false);
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeRegularSvgIcons.faCirclePlay
      }), /*#__PURE__*/_react["default"].createElement("span", null, " Play")), this.props.player.status === C.PLAYER_STATUS.PAUSED ? /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        onClick: function onClick() {
          return _this2.getPlayer().resume();
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeRegularSvgIcons.faCirclePlay
      }), /*#__PURE__*/_react["default"].createElement("span", null, " Resume")) : /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.props.player.status !== C.PLAYER_STATUS.PLAYING,
        onClick: function onClick() {
          return _this2.getPlayer().pause();
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeRegularSvgIcons.faCirclePause
      }), /*#__PURE__*/_react["default"].createElement("span", null, " Pause")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.props.player.status === C.PLAYER_STATUS.STOPPED,
        onClick: function onClick() {
          return _this2.getPlayer().stop();
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeRegularSvgIcons.faCircleStop
      }), /*#__PURE__*/_react["default"].createElement("span", null, " Stop"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "action-button-container"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.props.player.status === C.PLAYER_STATUS.PLAYING || this.state.openIDEClicked,
        onClick: function onClick() {
          return _this2.onClickOpenIDE();
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeRegularSvgIcons.faPenToSquare
      }), /*#__PURE__*/_react["default"].createElement("span", null, " Open IDE")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        disabled: this.props.player.status === C.PLAYER_STATUS.PLAYING,
        onClick: function onClick() {
          return _this2.onClickOpenIDE(true);
        },
        shape: "circle"
      }, /*#__PURE__*/_react["default"].createElement(_icons.SettingOutlined, null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "action-button-container"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          chrome.tabs.create({
            url: "https://goto.ui.vision/x/idehelp?help=sidepanel"
          });
        }
      }, "Ui.Vision Side Panel"))));
    }
  }]);
  return Controls;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
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
})(Controls);

/***/ }),

/***/ 69981:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _icons = __webpack_require__(29937);
var _antd = __webpack_require__(33061);
var _jszip = _interopRequireDefault(__webpack_require__(71710));
var _keycode = _interopRequireDefault(__webpack_require__(36545));
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _convert_utils = __webpack_require__(75852);
var _file_saver = _interopRequireDefault(__webpack_require__(50261));
var _messages = _interopRequireDefault(__webpack_require__(6866));
var _player = __webpack_require__(18392);
var _utils = __webpack_require__(46580);
var _context_menu = __webpack_require__(35802);
var _prompt = __webpack_require__(10409);
var _save_test_case = _interopRequireDefault(__webpack_require__(64305));
var _tree_file = __webpack_require__(78290);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _tab = __webpack_require__(13755);
var _recomputed = __webpack_require__(87307);
var _state = __webpack_require__(78493);
var _license = __webpack_require__(12277);
var _types = __webpack_require__(58704);
var _storage = __webpack_require__(97467);
var _utils2 = __webpack_require__(46580);
var _resource_not_loaded = __webpack_require__(11199);
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
var Files = /*#__PURE__*/function (_React$Component) {
  _inherits(Files, _React$Component);
  function Files() {
    var _this;
    _classCallCheck(this, Files);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Files, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      showRename: false,
      rename: '',
      folderToImport: '/'
    });
    _defineProperty(_assertThisInitialized(_this), "unbindKeydown", function () {});
    // unbindScroll = () => {}
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
      _this.props.macroMoveEntry({
        entryId: sourceId,
        dirId: targetId,
        isSourceDirectory: isDirectory
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onDoubleClickNode", function (data, paths, e) {
      if (data.type === _tree_file.FileNodeType.File) {
        _this.playTestCase(data.id);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "applyTreeViewScrollTop", function () {
      (0, _utils2.delayMs)(200).then(function () {
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
          // const container = document.querySelector('.files-tree-view-container').closest('.ant-tabs-content')
          // container.scrollTo({ top: lastScrollTop, behavior: 'instant' })
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onClickEditInIDE", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this.changeTestCase(id).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var tabId;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _tab.getActiveTabId)();
                    case 2:
                      tabId = _context.sent;
                      if (tabId) {
                        (0, _tab.showPanelWindow)();
                      }
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }
  _createClass(Files, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.bindKeydown();
      this.applyTreeViewScrollTop();
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
          type: _context_menu.MenuItemType.Divider,
          data: {}
        }, {
          type: _context_menu.MenuItemType.Button,
          data: {
            content: 'Edit (in IDE)',
            onClick: function onClick() {
              _this4.onClickEditInIDE(macroNode.fullPath);
            }
          }
        }, {
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
    key: "getTestCaseMenuItems",
    value: function getTestCaseMenuItems() {
      var _this5 = this;
      var onClickMenuItem = function onClickMenuItem(_ref3) {
        var key = _ref3.key;
        switch (key) {
          case 'new_macro_folder':
            {
              _this5.props.macroCreateFolder({
                name: 'untitled',
                dir: '/'
              });
              break;
            }
          case 'export_all_json':
            {
              var macroStorage = (0, _storage.getStorageManager)().getMacroStorage();
              var path = macroStorage.getPathLib();
              var zip = new _jszip["default"]();
              var getFolder = function getFolder(relativePath, zipRoot) {
                var dirs = relativePath.split(/\/|\\/g);
                return dirs.reduce(function (prev, dir) {
                  return prev.folder(dir);
                }, zipRoot);
              };
              if (_this5.props.macros.length === 0) {
                return _antd.message.error('No saved macros to export', 1.5);
              }
              return Promise.all(_this5.props.macros.map(function (macroNode) {
                var dirPath = path.dirname(macroNode.relativePath);
                var fileName = path.basename(macroNode.relativePath);
                var folder = getFolder(dirPath, zip);
                return (0, _storage.getStorageManager)().getMacroStorage().read(macroNode.fullPath, 'Text').then(function (macro) {
                  folder.file(fileName, (0, _convert_utils.toJSONString)({
                    name: macro.name,
                    commands: macro.data.commands
                  }, {
                    ignoreTargetOptions: _this5.props.ignoreTargetOptions
                  }));
                });
              })).then(function () {
                return zip.generateAsync({
                  type: 'blob'
                }).then(function (blob) {
                  _file_saver["default"].saveAs(blob, 'all_test_cases.zip');
                });
              });
            }
          case 'import_json':
            {
              var $selectFile = document.getElementById('select_json_files_for_macros');
              if ($selectFile) {
                _this5.setState({
                  folderToImport: '/'
                });
                $selectFile.click();
              }
              break;
            }
        }
      };
      var menuItems = [{
        key: 'new_macro_folder',
        label: 'New Folder',
        onClick: function onClick() {
          onClickMenuItem({
            key: 'new_macro_folder'
          });
        }
      }, {
        key: 'export_all_json',
        label: 'Export All (JSON)',
        onClick: function onClick() {
          onClickMenuItem({
            key: 'export_all_json'
          });
        }
      }, {
        key: 'import_json',
        label: 'Import JSON or ZIP',
        onClick: function onClick() {
          onClickMenuItem({
            key: 'import_json'
          });
        }
      }];
      return menuItems;
    }
  }, {
    key: "renderRenameModal",
    value: function renderRenameModal() {
      var _this6 = this;
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
          e.keyCode === 13 && _this6.onClickRename();
        },
        onChange: this.onChangeRename,
        placeholder: "macro name",
        ref: function ref(el) {
          _this6.inputRenameTestCase = el;
        }
      }));
    }
  }, {
    key: "renderShowListAction",
    value: function renderShowListAction() {
      var _this7 = this;
      return /*#__PURE__*/_react["default"].createElement(_resource_not_loaded.ResourceNotLoaded, {
        name: "Macro list",
        from: this.props.from,
        showList: function showList() {
          _this7.props.setFrom(_state.RunBy.Manual);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;
      if (!this.props.shouldLoadResources) {
        return this.renderShowListAction();
      }
      if (this.props.isPlaying && this.props.macros.length > _config["default"].performanceLimit.fileCount) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "hidden-during-replay"
        }, _messages["default"].contentHidden);
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "files-tree-view-container"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        multiple: true,
        type: "file",
        accept: ".json, .zip",
        id: "select_json_files_for_macros",
        onChange: this.onJsonOrZipFileChange,
        ref: function ref(_ref4) {
          _this8.jsonFileInput = _ref4;
        },
        style: {
          display: 'none'
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "test-case-actions"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Dropdown, {
        menu: {
          items: this.getTestCaseMenuItems()
        },
        trigger: ['click']
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        shape: "circle"
      }, /*#__PURE__*/_react["default"].createElement(_icons.FolderAddOutlined, null))), /*#__PURE__*/_react["default"].createElement(_antd.Input.Search, {
        style: {
          flex: 1
        },
        placeholder: "search macro",
        value: this.props.searchText,
        onChange: function onChange(e) {
          return _this8.props.setMacroQuery(e.target.value);
        }
      })), this.renderMacros(), this.renderRenameModal());
    }
  }]);
  return Files;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    from: state.from,
    ui: state.ui,
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
})(Files);

/***/ }),

/***/ 8153:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
var _jszip = _interopRequireDefault(__webpack_require__(71710));
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
__webpack_require__(97395);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
var _file_saver = _interopRequireDefault(__webpack_require__(50261));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _macro_log = __webpack_require__(91433);
var _utils = __webpack_require__(46580);
var _recomputed = __webpack_require__(87307);
var _storage = __webpack_require__(97467);
var _cv_utils = __webpack_require__(7345);
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Logs = /*#__PURE__*/function (_React$Component) {
  _inherits(Logs, _React$Component);
  function Logs() {
    var _this;
    _classCallCheck(this, Logs);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Logs, [].concat(args));
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
    _defineProperty(_assertThisInitialized(_this), "logLinkPatterns", [[/Error #101/i, 'https://goto.ui.vision/x/idehelp?help=error101'], [/Error #120/i, 'https://goto.ui.vision/x/idehelp?help=error120'], [/Error #121/i, 'https://goto.ui.vision/x/idehelp?help=error121'], [/Error #170/i, 'https://goto.ui.vision/x/idehelp?help=error179'], [/Error #220/i, 'https://goto.ui.vision/x/idehelp?help=error220']]);
    return _this;
  }
  _createClass(Logs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      (0, _storage.getStorageManager)().on(_storage.StorageManagerEvent.StrategyTypeChanged, function (type) {
        _this2.forceUpdate();
      });
    }
  }, {
    key: "logStyle",
    value: function logStyle(log) {
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
    key: "renderLogStack",
    value: function renderLogStack(log) {
      var _this3 = this;
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
              _this3.props.gotoLineInMacro(item.macroId, item.commandIndex);
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
      var _this4 = this;
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
              _this4.props.updateUI({
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
              _this4.props.updateUI({
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
              _this4.props.updateUI({
                showSettings: true,
                settingsTab: 'ocr'
              });
            }
          }, "OCR Settings"));
        }
        return _this4.appendLinkIfPatternMatched(log.text);
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
            _this4.props.gotoLineInMacro(source.macroId, source.commandIndex);
          }
        }
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Line ", source.commandIndex + 1), !source.isSubroutine ? null : /*#__PURE__*/_react["default"].createElement("span", null, " (Sub: ", source.macroName, ")")), /*#__PURE__*/_react["default"].createElement("span", null, ": "), content);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.logs.length !== this.props.logs.length) {
        var $logContent = document.querySelector('.log-content');
        if (!$logContent) {
          return false;
        }
        setTimeout(function () {
          var $last = $logContent.children[$logContent.children.length - 1];
          if ($last) {
            $last.scrollIntoView();
          }
        }, 100);
        return true;
      } else {
        // update on filter even when logs length is the same
        var nextLog = nextProps.logs[nextProps.logs.length - 1];
        var thisLog = this.props.logs[this.props.logs.length - 1];
        if (nextLog && thisLog) {
          return true;
        }
      }

      // update on logs filtered
      if (nextProps.config.logFilter !== this.props.config.logFilter) {
        return true;
      }

      // update on logs cleared
      if (nextProps.logs.length === 0 && this.props.logs.length > 0) {
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
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
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "log-controls"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        value: this.props.config.logFilter,
        onChange: function onChange(value) {
          _this5.props.updateConfig({
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
      }, "No log")), ",", /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: "small",
        onClick: this.props.clearLogs
      }, "Clear")), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "log-content"
      }, logs.map(function (log, i) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: log.type,
          key: log.id,
          style: _this5.logStyle(log)
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "log-type"
        }, (0, _macro_log.renderLogType)(log)), /*#__PURE__*/_react["default"].createElement("pre", {
          className: "log-detail"
        }, _this5.renderLogText(log)), _this5.shouldRenderLogStack(log) ? _this5.renderLogStack(log) : null);
      })));
    }
  }]);
  return Logs;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    hasSelectedCommand: state.editor.editing && state.editor.editing.meta && state.editor.editing.meta.selectedIndex !== -1,
    selectedCommand: (0, _recomputed.editorSelectedCommand)(state),
    shouldLoadResources: (0, _recomputed.getShouldLoadResources)(state),
    isPlaying: (0, _recomputed.isPlaying)(state),
    status: state.status,
    from: state.from,
    logs: state.logs,
    config: state.config
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({}, actions), _simple_actions.Actions), dispatch);
})(Logs);

/***/ }),

/***/ 89938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(96540));
__webpack_require__(62243);
var _macro_table = _interopRequireDefault(__webpack_require__(32953));
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
var Macro = /*#__PURE__*/function (_React$Component) {
  _inherits(Macro, _React$Component);
  function Macro() {
    _classCallCheck(this, Macro);
    return _callSuper(this, Macro, arguments);
  }
  _createClass(Macro, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "macro-table-container"
      }, /*#__PURE__*/_react["default"].createElement(_macro_table["default"], null));
    }
  }]);
  return Macro;
}(_react["default"].Component);
var _default = exports["default"] = Macro;

/***/ }),

/***/ 32953:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
__webpack_require__(55218);
__webpack_require__(97923);
__webpack_require__(15237);
__webpack_require__(9914);
__webpack_require__(16792);
var _reactCodemirror = __webpack_require__(82349);
var _keycode = _interopRequireDefault(__webpack_require__(36545));
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _reactVirtualized = __webpack_require__(56692);
__webpack_require__(62227);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var _simple_actions = __webpack_require__(8588);
var _command = __webpack_require__(85393);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _cv_utils = __webpack_require__(7345);
var _inspector = _interopRequireDefault(__webpack_require__(51152));
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _player = __webpack_require__(18392);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _ts_utils = __webpack_require__(1601);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _tab = __webpack_require__(13755);
var _recomputed = __webpack_require__(87307);
var _state = __webpack_require__(78493);
var _license = __webpack_require__(12277);
var _types = __webpack_require__(58704);
var _storage2 = __webpack_require__(97467);
var _command_item = __webpack_require__(59480);
var _utils = __webpack_require__(46580);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
var newCommand = {
  cmd: '',
  target: '',
  value: ''
};
var defaultDataSource = [newCommand];
var ITEM_HEIGHT = _config["default"].ui.commandItemHeight;
var MacroTable = /*#__PURE__*/function (_React$Component) {
  _inherits(MacroTable, _React$Component);
  function MacroTable() {
    var _this;
    _classCallCheck(this, MacroTable);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MacroTable, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "_lastSelectedMacroName", null);
    _defineProperty(_assertThisInitialized(_this), "_macroTableContainer", null);
    _defineProperty(_assertThisInitialized(_this), "state", {
      // cursor: null,

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
      updateCommandsFromStorage: false,
      tableWidth: 0,
      // primary width
      tableHeight: 0,
      // primary height
      headerWidthPatchFactor: 1,
      //.6, // patch factor for header width

      columnWidths: {
        serialFixed: 30,
        cmd: .4,
        target: .3,
        value: .3
        // opsFixed: 80
      }
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
              var commandIndexToSelect = Math.max(0, _this.props.selectedCommandIndex - 1);
              _this.selectCommandAndScroll(commandIndexToSelect);
            }
            break;
          case 'down':
            {
              if (_this.props.selectedCommandIndex !== null) {
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
      var visionStorage = (0, _storage2.getStorageManager)().getVisionStorage();
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
    _defineProperty(_assertThisInitialized(_this), "commandClassName", function (record, index) {
      var _this$props = _this.props,
        editing = _this$props.editing,
        player = _this$props.player,
        breakpointIndices = _this$props.breakpointIndices,
        doneCommandIndices = _this$props.doneCommandIndices,
        errorCommandIndices = _this$props.errorCommandIndices,
        warningCommandIndices = _this$props.warningCommandIndices;
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
      var _this$props$editing$c = _this.props.editing.commands,
        commands = _this$props$editing$c === void 0 ? [] : _this$props$editing$c;
      var threshold = 0;
      return commands.length >= threshold;
    });
    _defineProperty(_assertThisInitialized(_this), "virtualCommmandList", function (_ref) {
      var virtual = _ref.virtual,
        itemHeight = _ref.itemHeight;
      var commands = _this.props.editing.commands;
      commands = (commands || []).filter(function (res) {
        return res.cmd && res.cmd.length > 0;
      });
      var editable = _this.isPlayerStopped() && (0, _license.getLicenseService)().canPerform(_types.Feature.Edit);
      var renderItem = function renderItem(item, i) {
        if (item.header) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "command-row header-row",
            key: "header"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "row-col index-col"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row-col command-col"
          }, "Command"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row-col target-col"
          }, "Target"), /*#__PURE__*/_react["default"].createElement("div", {
            className: "row-col value-col"
          }, "Value"));
        }
        return /*#__PURE__*/_react["default"].createElement(_command_item.CommandItem, {
          key: item.key,
          index: item.realIndex + 1,
          command: item,
          style: {
            height: itemHeight + 'px'
          },
          className: "command-row real-command " + _this.commandClassName(item, item.realIndex),
          attributes: {
            'data-index': '' + item.realIndex
          },
          editable: editable,
          onClick: function onClick(e, command) {
            return _this.onClickCommand(e, command);
          },
          onContextMenu: function onContextMenu(e, command) {
            return _this.onContextMenu(e, command.realIndex);
          },
          onToggleComment: function onToggleComment(e, command) {
            _this.props.toggleComment(command.realIndex);
            e.stopPropagation();
          },
          onDuplicate: function onDuplicate(e, command) {
            _this.props.duplicateCommand(command.realIndex);
            e.stopPropagation();
          },
          onMouseEnterTarget: _this.onMouseEnterTarget,
          onMouseLeaveTarget: _this.onMouseLeaveTarget,
          onMoveCommand: _this.onMoveCommand,
          onDragStart: _this.onStartDraggingCommand,
          onDragEnd: _this.onEndDraggingCommand
        });
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: virtual.style
      }, virtual.items.map(renderItem));
    });
    _defineProperty(_assertThisInitialized(_this), "getEditingFromStorage", function () {
      return _storage["default"].get('editing').then(function (editingFromStorage) {
        return editingFromStorage;
      })["catch"](function (err) {
        return null;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleStorageChange", function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        storage = _ref3[0];
      if (storage.key === 'editing') {
        if (storage.oldValue.meta.hasUnsaved && !storage.newValue.meta.hasUnsaved) {
          _this.getEditingFromStorage().then(function (editingFromStorage) {
            var idFromStorage = editingFromStorage.meta.src.id;
            var idFromState = _this.props.editing.meta.src.id;
            if (idFromStorage === idFromState) {
              // update redux state only
              _this.props.updateEditing(editingFromStorage);
            }
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onWindowResize", function () {
      // TODO: find a better way to calculate table width/height
      _this.setState({
        tableWidth: document.querySelector('.ant-tabs-content').clientWidth
      });
      _this.setState({
        tableHeight: document.querySelector('.ant-tabs-content').clientHeight
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
    _defineProperty(_assertThisInitialized(_this), "onClickEditInIDE", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(macroId, commandIndex) {
        var tabId;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _tab.getActiveTabId)();
            case 2:
              tabId = _context.sent;
              if (tabId) {
                (0, _tab.showPanelWindow)({
                  selectCommandIndex: commandIndex
                });
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }());
    return _this;
  }
  _createClass(MacroTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      document.addEventListener('click', this.onHideMenu);
      document.addEventListener('click', this.onDoubleClick);
      document.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('resize', this.onWindowResize);
      _storage["default"].addListener(this.handleStorageChange.bind(this));
      this.forceUpdate();
      (0, _utils.waitForRenderComplete)('.ant-tabs-content').then(function () {
        _this2.setState({
          tableWidth: document.querySelector('.ant-tabs-content').clientWidth
        });
        _this2.setState({
          tableHeight: document.querySelector('.ant-tabs-content').clientHeight
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
    key: "getMacroName",
    value: function getMacroName() {
      var src = this.props.editing.meta.src;
      return src && src.name && src.name.length ? src.name : '';
    }
  }, {
    key: "getMacroTableContainer",
    value: function getMacroTableContainer() {
      return this._macroTableContainer || (this._macroTableContainer = document.querySelector('.table-wrapper .ReactVirtualized__Table__Grid'));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // Note: update sourceText whenever editing changed
      // if (nextProps.editing.meta.src !== this.props.editing.meta.src ||
      //     nextProps.editing.commands !== this.props.editing.commands) {
      //   const resetCursor = nextProps.editing.meta.src !== this.props.editing.meta.src

      //   this.setState(
      //     this.resetSourceCodeCursor(resetCursor)
      //   )
      // }

      var tableNode = this.getMacroTableContainer();
      if (nextProps.status === C.APP_STATUS.PLAYER) {
        if (nextProps.player.nextCommandIndex === 0) {
          this._lastSelectedMacroName = this.getMacroName();
          tableNode.scrollTop = 0;
        } else if (nextProps.player.nextCommandIndex !== this.props.player.nextCommandIndex) {
          var itemHeight = ITEM_HEIGHT;
          var scrollTop = itemHeight * nextProps.player.nextCommandIndex;
          tableNode.scrollTop = scrollTop;
        }
      } else if (this._lastSelectedMacroName !== this.getMacroName()) {
        // bring scroll position to top when new macro selected
        this._lastSelectedMacroName = this.getMacroName();
        tableNode.scrollTop = 0;
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
      var _this$props2 = this.props,
        editing = _this$props2.editing,
        config = _this$props2.config;
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
      var _this3 = this;
      var _this$props3 = this.props,
        clipboard = _this$props3.clipboard,
        status = _this$props3.status;
      var contextMenu = this.state.contextMenu;
      var isNormal = status === C.APP_STATUS.NORMAL;
      var dw = document.documentElement.clientWidth;
      var dh = document.documentElement.clientHeight;
      var mw = 222;
      var otherItemsHeight = 62;
      var container = document.querySelector('.ant-tabs-content');
      if (!container) {
        return null;
      }
      var x = contextMenu.x + container.scrollLeft;
      var y = contextMenu.y + (container.scrollTop || 0) - otherItemsHeight;
      if (!isNormal) {
        return null;
      }
      if (x + mw > dw) x -= mw;
      if (x < 0) x = 10;
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
      var handleClick = function handleClick(e) {
        switch (e.key) {
          case 'run_line':
            {
              return _this3.playLine(commandIndex);
            }
          case 'play_from_here_keep_variables':
            {
              var commands = _this3.props.editing.commands;
              _this3.setState({
                lastOperation: 'play'
              });
              return _this3.props.playerPlay({
                macroId: _this3.props.macroId,
                title: _this3.getTestCaseName(),
                extra: {
                  id: _this3.props.macroId
                },
                mode: _player.Player.C.MODE.STRAIGHT,
                startIndex: commandIndex,
                keepVariables: 'yes',
                startUrl: null,
                resources: commands,
                postDelay: _this3.props.config.playCommandInterval * 1000
              });
            }
          case 'play_to_here':
            {
              var _commands = _this3.props.editing.commands;
              _this3.setState({
                lastOperation: 'play'
              });
              return _this3.props.playerPlay({
                macroId: _this3.props.macroId,
                title: _this3.getTestCaseName(),
                extra: {
                  id: _this3.props.macroId
                },
                mode: _player.Player.C.MODE.STRAIGHT,
                keepVariables: 'reset',
                startIndex: 0,
                startUrl: null,
                resources: _commands,
                postDelay: _this3.props.config.playCommandInterval * 1000,
                breakpoints: [commandIndex]
              });
            }
          case 'edit_in_ide':
            {
              _this3.onClickEditInIDE(_this3.props.macroId, commandIndex);
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
          key: 'run_line',
          label: 'Execute this command'
        }, {
          key: 'play_from_here_keep_variables',
          label: 'Play from here and keep variables'
        }, {
          key: 'play_to_here',
          label: 'Play to this point'
        }, {
          type: 'divider'
        }, {
          key: 'edit_in_ide',
          label: 'Edit (in IDE)'
        }]
      }));
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this$props4 = this.props,
        editing = _this$props4.editing,
        player = _this$props4.player;
      var commands = editing.commands;
      var _reduce = (commands && commands.length ? commands : defaultDataSource).reduce(function (_ref5, command, i) {
          var dataSource = _ref5.dataSource,
            indent = _ref5.indent;
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
      var _this4 = this;
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
        width: tableWidth,
        height: tableHeight
        // style={{ height: 'calc(100% - 40px)' }}
        ,
        className: "command-table",
        headerHeight: ITEM_HEIGHT,
        rowHeight: ITEM_HEIGHT,
        rowCount: dataSource.length,
        rowGetter: function rowGetter(_ref6) {
          var index = _ref6.index;
          return dataSource[index] || {
            key: index
          };
        },
        rowClassName: function rowClassName(_ref7) {
          var index = _ref7.index;
          return index === -1 || index >= dataSource.length ? '' : "command-row real-command " + _this4.commandClassName(dataSource[index], index);
        },
        rowRenderer: function rowRenderer(_ref8) {
          var key = _ref8.key,
            index = _ref8.index,
            style = _ref8.style;
          var item = dataSource[index];
          return /*#__PURE__*/_react["default"].createElement(_command_item.CommandItem, {
            key: key,
            index: item.realIndex + 1,
            command: item,
            style: _objectSpread(_objectSpread({}, style), {}, {
              height: itemHeight + 'px'
            }),
            columnWidths: columnWidths,
            tableWidth: tableWidth,
            className: "command-row real-command " + _this4.commandClassName(item, item.realIndex),
            attributes: {
              'data-index': '' + item.realIndex
            },
            editable: editable,
            onClick: function onClick(e, command) {
              return _this4.onClickCommand(e, command);
            },
            onContextMenu: function onContextMenu(e, command) {
              return _this4.onContextMenu(e, command.realIndex);
            },
            onToggleComment: function onToggleComment(e, command) {
              _this4.props.toggleComment(command.realIndex);
              e.stopPropagation();
            },
            onDuplicate: function onDuplicate(e, command) {
              _this4.props.duplicateCommand(command.realIndex);
              e.stopPropagation();
            },
            onMouseEnterTarget: _this4.onMouseEnterTarget,
            onMouseLeaveTarget: _this4.onMouseLeaveTarget,
            onMoveCommand: _this4.onMoveCommand,
            onDragStart: _this4.onStartDraggingCommand,
            onDragEnd: _this4.onEndDraggingCommand
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "serial",
        label: "",
        width: columnWidths.serialFixed
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column
      // headerRenderer={this.headerRenderer}
      , {
        dataKey: "cmd",
        label: "Command",
        width: columnWidths.cmd * (tableWidth + 50) * headerWidthPatchFactor,
        maxWidth: 170
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column
      // headerRenderer={this.headerRenderer}
      , {
        dataKey: "target",
        label: "Target",
        width: columnWidths.target * (tableWidth + 50) * headerWidthPatchFactor
      }), /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Column, {
        dataKey: "value",
        label: "Value",
        width: columnWidths.value * (tableWidth + 50) * headerWidthPatchFactor
      })));
    }
  }, {
    key: "renderNormalTable",
    value: function renderNormalTable(dataSource) {
      var _this5 = this;
      var columns = [{
        title: 'Command',
        dataIndex: 'cmd',
        key: 'cmd',
        width: 130
      }, {
        title: 'Target',
        dataIndex: 'target',
        key: 'target',
        width: 190
      }, {
        title: 'Value',
        dataIndex: 'value',
        key: 'value'
      }];
      var tableConfig = {
        dataSource: dataSource,
        columns: columns,
        pagination: false,
        onRowClick: function onRowClick(record, index, e) {
          _this5.props.selectCommand(index);
        },
        rowClassName: this.commandClassName
      };
      return /*#__PURE__*/_react["default"].createElement(_antd.Table, tableConfig);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "editor-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tabs-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group table-wrapper",
        style: {
          marginBottom: 0
        },
        ref: function ref(_ref9) {
          _this6.listContainer = _ref9;
        }
      }, this.renderTable())), this.renderContextMenu(), this.renderVisionFindPreview());
    }
  }]);
  return MacroTable;
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
})(MacroTable);

/***/ }),

/***/ 92368:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
__webpack_require__(73133);
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
var _cv_utils = __webpack_require__(7345);
var _ipc_bg_cs = __webpack_require__(59711);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var actions = _interopRequireWildcard(__webpack_require__(35127));
var C = _interopRequireWildcard(__webpack_require__(95902));
var _utils = __webpack_require__(46580);
var _state = __webpack_require__(78493);
var _storage2 = __webpack_require__(97467);
var _controlbar = _interopRequireDefault(__webpack_require__(75472));
var _files = _interopRequireDefault(__webpack_require__(69981));
var _logs = _interopRequireDefault(__webpack_require__(8153));
var _ai_chat = _interopRequireDefault(__webpack_require__(43396));
var _macro = _interopRequireDefault(__webpack_require__(89938));
var _computer = _interopRequireDefault(__webpack_require__(61533));
var _browser = _interopRequireDefault(__webpack_require__(77458));
__webpack_require__(97102);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var Sidepanel = /*#__PURE__*/function (_React$Component) {
  _inherits(Sidepanel, _React$Component);
  // constructor
  function Sidepanel(props) {
    var _this;
    _classCallCheck(this, Sidepanel);
    _this = _callSuper(this, Sidepanel, [props]);
    _defineProperty(_assertThisInitialized(_this), "_lastStatus", null);
    _defineProperty(_assertThisInitialized(_this), "_lastMacroLog", null);
    _defineProperty(_assertThisInitialized(_this), "_lastSelectedMacroName", null);
    _defineProperty(_assertThisInitialized(_this), "state", {
      drag: {
        isDragging: false,
        startX: 0,
        movingX: 0,
        lastWidth: 260,
        currentMinWidth: 260
      },
      fullStatusText: '',
      shortStatus: ''
    });
    _defineProperty(_assertThisInitialized(_this), "getSideBarMinWidth", function () {
      var _this$state$drag = _this.state.drag,
        isDragging = _this$state$drag.isDragging,
        lastWidth = _this$state$drag.lastWidth,
        currentMinWidth = _this$state$drag.currentMinWidth;
      return (isDragging ? currentMinWidth : lastWidth) + 'px';
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
    _this.renderStatus = _this.renderStatus.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Sidepanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      chrome.runtime.connect({
        name: _ipc_bg_cs.SIDEPANEL_PORT_NAME
      });
      var type = (0, _storage2.getStorageManager)().getCurrentStrategyType();
      this.setState({
        storageMode: type
      });

      // the idea is to load the config from storage and update the sidepanel state
      // TODO: consider using other storage key to keep temporary configs like showSidePanel, oneTimeShowSidePanel
      _storage["default"].addListener(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          storage = _ref2[0];
        if (storage.key === 'config') {
          // get all changed config values
          var changedConfig = Object.keys(storage.newValue).reduce(function (acc, key) {
            if (storage.newValue[key] !== _this2.props.config[key] &&
            // ignore array and object. otherwise it it can cause infinite loop
            !Array.isArray(storage.newValue[key]) && _typeof(storage.newValue[key]) !== 'object') {
              acc[key] = storage.newValue[key];
            }
            return acc;
          }, {});
          // update config to sidepanel state
          if (Object.keys(changedConfig).length) {
            console.log('config updateConfig:>> ========= changedConfig:', changedConfig);
            _this2.props.updateConfig(changedConfig);
          }
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;
      if (prevProps.logs_ !== this.props.logs_ || prevProps.player !== this.props.player || prevProps.status !== this.props.status) {
        var _this$props;
        // Perform actions when the 'message' prop changes

        console.log('prevProps for statusText:>> ', prevProps);
        var fullStatusText = '';
        if (['Files', 'Macro', 'Logs'].includes((_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.ui) === null || _this$props === void 0 ? void 0 : _this$props.sidebarTab)) {
          // If user selects macro, then the macro name is shown in status bar
          // Status bar should contain macro result. So either the error message or "[info] Macro completed (Runtime 6.66s)" => So same text as in log file (or similar text, whatever is easier)
          var _this$props2 = this.props,
            status = _this$props2.status,
            player = _this$props2.player;
          var renderInner = function renderInner() {
            switch (status) {
              case C.APP_STATUS.RECORDER:
                return 'Recording';
              case C.APP_STATUS.PLAYER:
                {
                  _this3._lastMacroLog = null;
                  switch (player.status) {
                    case C.PLAYER_STATUS.PLAYING:
                      {
                        var nextCommandIndex = player.nextCommandIndex,
                          loops = player.loops,
                          currentLoop = player.currentLoop,
                          timeoutStatus = player.timeoutStatus;
                        if (nextCommandIndex === null || loops === null || currentLoop === 0) {
                          return '';
                        }
                        var parts = ["Line ".concat(nextCommandIndex + 1), "Round ".concat(currentLoop, "/").concat(loops)];
                        if (timeoutStatus && timeoutStatus.type && timeoutStatus.total) {
                          var type = timeoutStatus.type,
                            total = timeoutStatus.total,
                            past = timeoutStatus.past;
                          parts.unshift("".concat(type, " ").concat(past / 1000, "s (").concat(total / 1000, ")"));
                        }
                        return parts.join(' | ');
                      }
                    case C.PLAYER_STATUS.PAUSED:
                      return 'Player paused';
                    default:
                      return '';
                  }
                }
              default:
                // pick between macro name or macro stopped log, whichever is latest
                if (!_this3.getLatestMacroLog()) {
                  _this3._lastStatus = _this3._lastSelectedMacroName = _this3.getMacroName();
                } else {
                  if (_this3._lastMacroLog !== _this3.getLatestMacroLog()) {
                    _this3._lastStatus = _this3._lastMacroLog = _this3.getLatestMacroLog();
                  } else if (_this3._lastSelectedMacroName !== _this3.getMacroName()) {
                    _this3._lastStatus = _this3._lastSelectedMacroName = _this3.getMacroName();
                  }
                }
                return _this3._lastStatus;
            }
          };
          fullStatusText = renderInner();
          // ... and if it is too long, then show it in a tooltip
          var shortStatus = fullStatusText.length > 40 ? fullStatusText.substring(0, 40).replace(/(\s+\S+)$/, '...') : fullStatusText;
          this.setState({
            fullStatusText: fullStatusText,
            shortStatus: shortStatus
          });
        }
      }
    }
  }, {
    key: "prefixHardDisk",
    value: function prefixHardDisk(str) {
      var isXFileMode = (0, _storage2.getStorageManager)().isXFileMode();
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
    key: "shouldRenderMacroNote",
    value: function shouldRenderMacroNote() {
      var _this$props$config = this.props.config,
        xmodulesStatus = _this$props$config.xmodulesStatus,
        storageMode = _this$props$config.storageMode;
      if (storageMode !== _storage2.StorageStrategyType.XFile) return false;
      if (xmodulesStatus === 'pro') return false;
      var macroStorage = (0, _storage2.getStorageManager)().getMacroStorage();
      return macroStorage.getDisplayCount() < macroStorage.getTotalCount();
    }
  }, {
    key: "getMacroName",
    value: function getMacroName() {
      var src = this.props.editing.meta.src;
      return src && src.name && src.name.length ? src.name : 'Untitled';
    }
  }, {
    key: "getLatestMacroLog",
    value: function getLatestMacroLog() {
      var _this$props3 = this.props,
        player = _this$props3.player,
        logs_ = _this$props3.logs_;
      if (player.status === C.PLAYER_STATUS.STOPPED && logs_ && logs_.length) {
        var latestMacroLogs = logs_.filter(function (log) {
          var _log$text;
          return log.type === 'info' && ((_log$text = log.text) === null || _log$text === void 0 ? void 0 : _log$text.startsWith('Macro '));
        });
        if (!latestMacroLogs.length) return '-0-';
        var latestMacroLog = latestMacroLogs[latestMacroLogs.length - 1];
        if (latestMacroLog) {
          return '[info] ' + latestMacroLog.text;
        }
      }
      return '';
    }
  }, {
    key: "renderStatus",
    value: function renderStatus(statusText) {
      console.log('renderStatus:>> statusText:  ', statusText);
      if (statusText) {
        var fullStatusText = statusText;
        // ... and if it is too long, then show it in a tooltip
        var shortStatus = fullStatusText.length > 40 ? fullStatusText.substring(0, 40).replace(/(\s+\S+)$/, '...') : fullStatusText;
        this.setState({
          fullStatusText: fullStatusText,
          shortStatus: shortStatus
        });
      }
    }
  }, {
    key: "showDesktopIcon",
    value: function showDesktopIcon() {
      var _this$props4 = this.props,
        ui = _this$props4.ui,
        config = _this$props4.config;
      var doShowDesktopIcon = (0, _cv_utils.isCVTypeForDesktop)(config.cvScope) && ui.shouldEnableDesktopAutomation !== false || ui.shouldEnableDesktopAutomation === true;
      return doShowDesktopIcon && /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-type"
      }, /*#__PURE__*/_react["default"].createElement(_computer["default"], null)) || /*#__PURE__*/_react["default"].createElement("div", {
        className: "vision-type"
      }, /*#__PURE__*/_react["default"].createElement(_browser["default"], null));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('sidepanel', {
          'with-xmodules-note': this.shouldRenderMacroNote()
        }),
        ref: function ref(el) {
          _this4.$dom = el;
        },
        style: {
          minWidth: this.getSideBarMinWidth()
        },
        onClickCapture: this.onClickSidebar
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "status",
        style: {
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
          fontSize: '14px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: this.state.fullStatusText
      }, this.state.shortStatus)), this.showDesktopIcon(), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _utils.cn)('sidebar-inner', {
          'no-tab': !this.props.config.showTestCaseTab
        })
      }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
        type: "card",
        defaultActiveKey: "Files",
        activeKey: this.props.ui.sidebarTab || 'Files',
        onChange: function onChange(activeKey) {
          return _this4.props.updateUI({
            sidebarTab: activeKey
          });
        },
        items: [{
          key: 'Files',
          label: 'Files',
          children: /*#__PURE__*/_react["default"].createElement(_files["default"], null)
        }, {
          key: 'Macro',
          label: 'Macro',
          children: /*#__PURE__*/_react["default"].createElement(_macro["default"], null)
        }, {
          key: 'Logs',
          label: 'Logs',
          children: /*#__PURE__*/_react["default"].createElement(_logs["default"], null)
        }, {
          key: 'AiChat',
          label: 'AI Chat',
          children: /*#__PURE__*/_react["default"].createElement(_ai_chat["default"], {
            renderStatus: this.renderStatus
          })
        }]
      })), /*#__PURE__*/_react["default"].createElement(_controlbar["default"], null));
    }
  }]);
  return Sidepanel;
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    status: state.status,
    editing: state.editor.editing,
    player: state.player,
    config: state.config,
    ui: state.ui,
    logs_: state.logs
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread({}, actions), dispatch);
})(Sidepanel);

/***/ }),

/***/ 96940:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _antd = __webpack_require__(33061);
var _react = _interopRequireWildcard(__webpack_require__(96540));
var _reactRedux = __webpack_require__(73729);
var _redux = __webpack_require__(28895);
__webpack_require__(32121);
__webpack_require__(59620);
__webpack_require__(65733);
var actions = _interopRequireWildcard(__webpack_require__(35127));
var C = _interopRequireWildcard(__webpack_require__(95902));
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var _player = __webpack_require__(18392);
var _sidepanel = _interopRequireDefault(__webpack_require__(92368));
var _recomputed = __webpack_require__(87307);
var _state = __webpack_require__(78493);
var _simple_actions = __webpack_require__(8588);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
var SidepanelApp = /*#__PURE__*/function (_Component) {
  _inherits(SidepanelApp, _Component);
  function SidepanelApp() {
    var _this;
    _classCallCheck(this, SidepanelApp);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, SidepanelApp, [].concat(args));
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
    _defineProperty(_assertThisInitialized(_this), "showGUI", function () {
      store.dispatch(_simple_actions.Actions.setNoDisplayInPlay(false));
      store.dispatch(_simple_actions.Actions.setReplaySpeedOverrideToFastMode(true));
    });
    return _this;
  }
  _createClass(SidepanelApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.props.updateConfig(_defineProperty({}, "oneTimeShowSidePanel", null));
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
    key: "render",
    value: function render() {
      var _this3 = this;
      if (this.props.noDisplay) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "app no-display"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "sidepanel content"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "status"
        }, "UI.Vision is in \"No Display\" mode now"), /*#__PURE__*/_react["default"].createElement(_antd.Button.Group, {
          className: "simple-actions"
        }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "large",
          onClick: function onClick() {
            return _this3.getPlayer().stop();
          }
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Stop")), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          size: "large",
          onClick: this.showGUI
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Show GUI")))));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "app with-sidebar",
        ref: function ref(el) {
          _this3.$app = el;
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
      }, /*#__PURE__*/_react["default"].createElement(_sidepanel["default"], null)));
    }
  }]);
  return SidepanelApp;
}(_react.Component);
var _default = exports["default"] = (0, _reactRedux.connect)(function (state) {
  return {
    ui: state.ui,
    player: state.player,
    noDisplay: (0, _recomputed.isNoDisplay)(state)
  };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread({}, actions), dispatch);
})(SidepanelApp);

/***/ }),

/***/ 63978:
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
___CSS_LOADER_EXPORT___.push([module.id, `.ai-chat .ai-conversation{overflow-y:scroll;width:96%;margin:0px 0px 100px 12px;position:fixed;height:calc(100% - 300px)}.ai-chat .ai-conversation .ai-conversation-item{padding:1px 5px;font-size:15px}.ai-chat .ai-conversation .ai-conversation-item .sender-you{color:green}.ai-chat .ai-conversation .ai-conversation-item .sender-ai{color:#000}.ai-chat .ai-conversation .ai-conversation-item .sender-action{color:orange}.ai-chat .ai-conversation .ai-conversation-item .sender-error{color:red}.ai-chat .ai-conversation .ai-conversation-item .sender{margin-right:2px;font-weight:bold}.chat-footer{margin-bottom:100px;padding-top:5px;border-top:1px solid #d3d3d3;position:fixed;bottom:0px;height:100px;background:#fff;width:100%}.chat-footer .chat-input{width:calc(100% - 15px);border:1px solid #d3d3d3;padding:4px;margin:2px 8px;border-radius:5px;font-weight:bold;outline:none}.chat-footer .chat-actions{width:calc(100% - 7px);position:relative;padding:0px 10px}.chat-footer .chat-actions button{cursor:pointer}.chat-footer .chat-actions .find-button{margin-left:5px}.chat-footer .chat-actions .stop-button{position:absolute;right:0}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 62898:
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
___CSS_LOADER_EXPORT___.push([module.id, `.control-panel-container{position:absolute;bottom:0;left:0;right:0;height:100px;padding:5px 10px 15px}.control-panel .action-button-container{display:flex;gap:6px;justify-content:center;margin-bottom:6px}.control-panel .action-button-container button>svg{width:15px;height:15px;margin-right:5px}.control-panel .action-button-container a{font-size:14px;text-decoration:underline;color:#007bff;cursor:pointer}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 94532:
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
___CSS_LOADER_EXPORT___.push([module.id, `.log-controls{width:100%;text-align:right;padding:2px 5px}.log-content{list-style:none;margin:0;padding:0 10px;height:calc(100% - 38px)}.log-content li{padding:5px 0;font-size:12px;border-bottom:1px solid #f3f3f3}.log-content li:after{content:"";display:table;clear:both}.log-content li a.info{color:#108ee9 !important}.log-content li.error{color:red;font-weight:bold}.log-content li.error a{color:red;text-decoration:underline}.log-content li.warning{color:orange}.log-content li pre{margin-bottom:0}.log-content li .log-type{float:left;margin-right:10px}.log-content li .log-detail{white-space:pre-wrap}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 31892:
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
___CSS_LOADER_EXPORT___.push([module.id, `.macro-table-container{display:flex;flex-direction:column;flex:1;position:relative}.macro-table-container .flex-row{display:flex;flex-direction:row}.macro-table-container .form-group{margin-bottom:15px}.macro-table-container .title{margin:0px 0px 12px;text-align:center;width:100%;font-weight:bold;font-size:15px}.macro-table-container .ant-table-pagination{display:none}.macro-table-container .ant-table-header{overflow:hidden !important;margin-bottom:0 !important;padding-bottom:0 !important}.macro-table-container .ant-table-header .ant-table-thead>tr>th{padding:13px 8px}.macro-table-container .ant-table-body .ant-table-thead>tr>th{padding:10px 8px}.macro-table-container .ant-table-tbody>tr>td{padding:8px 8px}.macro-table-container tr.selected-command>td{background-color:#fdffd1 !important}.macro-table-container tr.error-command>td{background-color:#f7c1c1 !important}.macro-table-container tr.running-command>td{background-color:#d5d6f9 !important}.macro-table-container tr.done-command>td{background-color:#d1ffd8 !important}.macro-table-container .ant-btn-group>.ant-btn-group{float:none}.macro-table-container .ant-form-item{margin-bottom:8px}.macro-table-container .editor-wrapper{display:flex;flex-direction:column;flex:2}.macro-table-container .editor-wrapper .tabs-wrapper{position:relative;display:flex;flex-direction:column;flex:1}.macro-table-container .editor-wrapper .tabs-wrapper .vision-type{position:absolute;right:0;top:0px;display:flex;flex-direction:row;align-items:center;cursor:pointer}.macro-table-container .editor-wrapper .tabs-wrapper .vision-type svg{display:block;margin-right:10px;width:20px;height:20px}.macro-table-container .editor-wrapper .tabs-wrapper .vision-type span{text-decoration:underline;color:#108ee9;font-size:16px}.macro-table-container .ant-tabs-tabpane{flex:1;flex-shrink:unset !important;position:relative}.macro-table-container .table-wrapper{top:0;bottom:165px;left:0;right:0}.macro-table-container .fields-wrapper{position:absolute;left:0;right:0;bottom:0;height:155px}.macro-table-container .fields-wrapper .ant-form-item-label{text-align:left}.macro-table-container .fields-wrapper .target-row .flex-row{align-items:center}.macro-table-container .fields-wrapper .target-row .select-input{flex:1}.macro-table-container .fields-wrapper .target-row .select-input input{width:100%}.macro-table-container .fields-wrapper .target-row .textarea-wrapper{position:relative;flex:1;max-width:60%;margin-right:10px}.macro-table-container .fields-wrapper .target-row .textarea-wrapper .open-full-editor{position:absolute;bottom:5px;right:15px;cursor:pointer}.macro-table-container .fields-wrapper .target-row .textarea-wrapper .open-full-editor:hover{color:#108ee9}.macro-table-container .fields-wrapper .target-row button{margin-left:10px}.macro-table-container .react-codemirror2{position:relative}.macro-table-container .react-codemirror2.has-error{height:calc(100% - 70px)}.macro-table-container .react-codemirror2.no-error{height:calc(100% - 0px)}.macro-table-container .react-codemirror2 .CodeMirror{position:absolute;top:0;bottom:0;left:0;right:0;height:auto;font-size:13px}.macro-table-container .ant-table-wrapper,.macro-table-container .ant-spin-nested-loading,.macro-table-container .ant-spin-container,.macro-table-container .ant-table,.macro-table-container .ant-table-content,.macro-table-container .ant-table-scroll{display:flex;flex-direction:column;flex:1}.macro-table-container .ant-table-scroll{overflow-y:auto}.macro-table-container #context_menu{z-index:10;border:1px solid #eee;border-radius:4px}.macro-table-container #context_menu .ant-menu{border:"1px solid #ccc";border-radius:4px;box-shadow:0 1px 6px rgba(0,0,0,.2)}.macro-table-container #context_menu .ant-menu .ant-menu-item{height:36px;line-height:36px}.macro-table-container #context_menu .ant-menu .ant-menu-item:hover{background:#ecf6fd}.macro-table-container #context_menu .ant-menu .ant-menu-item .shortcut{float:right;color:#999}.command-row{position:relative;display:flex;flex-direction:row;padding-left:5px;border-bottom:1px solid #e9e9e9;line-height:35px;font-size:13px}.command-row:hover{background:#ecf6fd}.command-row.dragging{opacity:0}.command-row.header-row,.command-row.footer-row{background-color:#f7f7f7;font-weight:bold;margin-top:5px}.command-row.footer-row{display:block;text-align:center;cursor:pointer}.command-row.breakpoint-command::before{content:"";position:absolute;top:50%;left:0;transform:translateY(-50%);width:0;height:0;border:8px solid rgba(0,0,0,0);border-left-color:green}.command-row.error-command{background-color:#f7c1c1;color:red}.command-row.error-command.blur{background-color:rgba(247,193,193,.6)}.command-row.warning-command{background-color:rgba(248,207,157,.7);color:orange}.command-row.warning-command.blur{background-color:rgba(248,207,157,.3)}.command-row.running-command{background-color:#d5d6f9}.command-row.running-command.blur{background-color:rgba(213,214,249,.6)}.command-row.done-command{background-color:#d1ffd8}.command-row.done-command.blur{background-color:rgba(209,255,216,.6)}.command-row.selected-command{background-color:#fdffd1}.command-row.selected-command.blur{background-color:rgba(253,255,209,.6)}.command-row.comment-command{background-color:rgba(0,0,0,0);color:#ccc;font-style:italic}.command-row.comment-command.selected-command{background-color:#fdffd1}.command-row.comment-command.selected-command.blur{background-color:rgba(253,255,209,.6)}.command-row .row-col{padding:0 8px}.command-row .row-col.index-col{padding:0;width:25px;text-align:center}.command-row .row-col.command-col{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.command-row .row-col.target-col{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.command-row .row-col.value-col{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.command-row .row-col.op-col{width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.command-row .table-footer{position:absolute;left:0;right:0;top:0;bottom:0;line-height:32px;text-align:center;font-weight:bold;background:#f7f7f7;cursor:pointer}.command-row .table-footer:hover{background:#e0e0e0}.command-row .logs-screenshots{display:flex;flex-direction:column;position:relative;margin-top:15px}.command-row .logs-screenshots.fold{height:32px !important;overflow:hidden}.command-row .logs-screenshots.fold .ant-tabs-content{display:none}.command-row .logs-screenshots .resize-handler{position:absolute;top:-10px;left:0;width:100%;height:6px;background:rgba(0,0,0,0);cursor:row-resize}.command-row .logs-screenshots .resize-handler:hover,.command-row .logs-screenshots .resize-handler.focused{height:6px;background:#ccc}.command-row .logs-screenshots .ant-tabs.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab{padding:5px 12px 4px}.command-row .logs-screenshots .ant-tabs{display:flex;flex-direction:column;flex:1}.command-row .logs-screenshots .ant-tabs-bar{margin-bottom:0}.command-row .logs-screenshots .ant-tabs-content{flex:1;overflow-y:auto;min-height:70px;border:1px solid #d9d9d9;border-width:0 1px 1px}.command-row .logs-screenshots .ls-toolbox{position:absolute;right:0px;top:0px;display:flex;flex-direction:row}.command-row .logs-screenshots .ls-toolbox>*{margin-right:5px}.command-row .logs-screenshots .ls-toolbox>:last-child{margin-right:0}.command-row .online-help{display:flex;flex-direction:row;justify-content:space-between;margin-top:15px;padding:0 10px;height:25px;line-height:25px;font-size:14px;text-align:right}.command-row .target-full-editor .mask{position:fixed;z-index:100;top:0;bottom:0;left:0;right:0;background:#000;opacity:.4}.command-row .target-full-editor .react-codemirror2{position:fixed;z-index:100;top:40px;bottom:40px;left:40px;right:40px}.command-row .target-full-editor .react-codemirror2 .CodeMirror{height:100%}.command-row .target-full-editor .close-button{position:fixed;z-index:101;top:25px;right:25px}.source-error{color:red;white-space:pre-wrap;font-size:12px;margin:0px}.ant-dropdown .ant-dropdown-menu{max-height:none}@media(max-width: 768px){.rename-modal,.duplicate-modal,.save-modal,.play-loop-modal{width:90% !important;margin:0 auto}}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 44091:
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
___CSS_LOADER_EXPORT___.push([module.id, `.sidepanel{position:relative;flex:1;min-width:260px;height:100%;border-right:2px solid #ccc}.sidepanel .vision-type{position:absolute;width:15px;height:15px;right:20px;top:10px;z-index:10}.sidepanel .vision-type svg{width:inherit;height:inherit}.sidepanel .sidebar-inner{position:absolute;top:40px;bottom:100px;margin-top:-8px;right:0;left:0}.sidepanel .sidebar-inner.no-tab{padding-top:8px;overflow-x:hidden}.sidepanel .no-data{margin-top:20px;text-align:center;font-size:14px;color:#aaa}.sidepanel .sidebar-macros .untitled{display:flex;flex-direction:row;align-items:center;padding:5px 10px;font-size:14px}.sidepanel .sidebar-macros .untitled.selected{background:#fdffd1}.sidepanel .sidebar-macros .untitled .icon-wrapper{display:flex;flex-direction:row;justify-content:center;align-items:center;margin-right:5px;width:20px}.sidepanel .sidebar-macros .untitled .icon-wrapper .file-icon{display:block;height:16px}.sidepanel .test-case-actions,.sidepanel .test-suite-actions{padding:0 10px 10px}.sidepanel .test-case-actions button,.sidepanel .test-suite-actions button{margin-right:10px}.sidepanel .test-case-actions{display:flex;padding-bottom:0;margin-top:10px}.sidepanel .sidebar-test-suites .test-suite-item{padding:0 0 10px 0;margin-bottom:5px}.sidepanel .sidebar-test-suites .test-suite-item.playing{background:#fdffd1}.sidepanel .sidebar-test-suites .test-suite-item.fold{margin-bottom:0;padding-bottom:0}.sidepanel .sidebar-test-suites .test-suite-item.fold .test-suite-more-actions,.sidepanel .sidebar-test-suites .test-suite-item.fold .test-suite-cases{display:none}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-row{padding:5px 10px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-row .test-suite-title{flex:1;margin-left:10px}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-row .more-button{display:none}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-row:hover .more-button{display:block}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases{padding:3px 5px}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li{display:flex;justify-content:space-between;align-items:center;padding:3px 5px 3px 20px;margin-bottom:5px}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.done-tc{background-color:#d1ffd8}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.done-tc.blur{background-color:rgba(209,255,216,.6)}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.error-tc{background-color:#f7c1c1}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.error-tc.blur{background-color:rgba(247,193,193,.6)}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.current-tc{background-color:#d5d6f9}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-cases li.current-tc.blur{background-color:rgba(213,214,249,.6)}.sidepanel .sidebar-test-suites .test-suite-item .test-suite-more-actions{padding-left:27px}.sidepanel .ant-tabs{min-height:100%;height:100%}.sidepanel .ant-tabs-content{height:calc(100% - 20px);overflow-y:auto;overflow-x:hidden}.sidepanel .ant-tabs-bar{margin-bottom:0}.sidepanel .ant-tabs-nav-container-scrolling{padding-left:0;padding-right:0}.sidepanel .ant-tabs-tab-prev.ant-tabs-tab-arrow-show,.sidepanel .ant-tabs-tab-next.ant-tabs-tab-arrow-show{display:none}.sidepanel .ant-tabs-nav{height:35px}.sidepanel .ant-tabs-nav .ant-tabs-tab{margin-right:0;line-height:27px}.sidepanel .ant-tabs-nav-scroll{text-align:left}.sidepanel .resize-handler{position:absolute;right:-2px;top:0;bottom:0;width:2px;background:#ccc;cursor:col-resize}.sidepanel .resize-handler:hover,.sidepanel .resize-handler.focused{right:-4px;width:6px;background:#aaa}.sidepanel.with-xmodules-note .sidebar-inner{bottom:160px}.sidepanel.with-xmodules-note .sidebar-storage-mode{height:160px}.sidepanel.with-xmodules-note .note-for-macros{margin-bottom:20px;padding:10px 10px 0;border-top:1px solid #333;font-size:12px}.with-sidebar .sidepanel{display:block}.context-menu{z-index:10}.context-menu .ant-menu{border:"1px solid #ccc";border-radius:4px;box-shadow:0 1px 6px rgba(0,0,0,.2)}.context-menu .ant-menu .ant-menu-item{height:36px;line-height:36px}.context-menu .ant-menu .ant-menu-item:hover{background:#ecf6fd}.xfile-not-installed-modal.left-bottom{position:absolute;top:auto !important;bottom:100px;left:100px}.xfile-not-installed-modal p{margin-bottom:20px;font-size:16px;font-weight:bold}.macros-dropdown{width:auto !important}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 12425:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_ai_chat_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63978);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_ai_chat_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_ai_chat_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_ai_chat_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_ai_chat_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 97605:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_controlbar_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62898);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_controlbar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_controlbar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_controlbar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_controlbar_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 97395:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_logs_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94532);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_logs_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_logs_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_logs_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_logs_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 62243:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_macro_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(31892);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_macro_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_macro_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_macro_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_macro_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 97102:
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidepanel_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(44091);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidepanel_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidepanel_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidepanel_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_sidepanel_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ })

}]);