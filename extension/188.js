(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[188],{

/***/ 95902:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UNTITLED_ID = exports.TEST_CASE_STATUS = exports.STATE_STORAGE_KEY = exports.SCREENSHOT_DELAY = exports.RECORDER_STATUS = exports.PLAYER_STATUS = exports.PLAYER_MODE = exports.LAST_SCREENSHOT_FILE_NAME = exports.LAST_DESKTOP_SCREENSHOT_FILE_NAME = exports.INSPECTOR_STATUS = exports.CS_IPC_TIMEOUT = exports.CONTENT_SCRIPT_STATUS = exports.APP_STATUS = exports.ANTHROPIC = void 0;
var mk = function mk(list) {
  return list.reduce(function (prev, key) {
    prev[key] = key;
    return prev;
  }, {});
};
var APP_STATUS = exports.APP_STATUS = mk(['NORMAL', 'INSPECTOR', 'RECORDER', 'PLAYER']);
var INSPECTOR_STATUS = exports.INSPECTOR_STATUS = mk(['PENDING', 'INSPECTING', 'STOPPED']);
var RECORDER_STATUS = exports.RECORDER_STATUS = mk(['PENDING', 'RECORDING', 'STOPPED']);
var PLAYER_STATUS = exports.PLAYER_STATUS = mk(['PLAYING', 'PAUSED', 'STOPPED']);
var PLAYER_MODE = exports.PLAYER_MODE = mk(['TEST_CASE', 'TEST_SUITE']);
var CONTENT_SCRIPT_STATUS = exports.CONTENT_SCRIPT_STATUS = mk(['NORMAL', 'RECORDING', 'INSPECTING', 'PLAYING']);
var TEST_CASE_STATUS = exports.TEST_CASE_STATUS = mk(['NORMAL', 'SUCCESS', 'ERROR', 'ERROR_IN_SUB']);
var LAST_SCREENSHOT_FILE_NAME = exports.LAST_SCREENSHOT_FILE_NAME = '__lastscreenshot';
var LAST_DESKTOP_SCREENSHOT_FILE_NAME = exports.LAST_DESKTOP_SCREENSHOT_FILE_NAME = '__last_desktop_screenshot';
var UNTITLED_ID = exports.UNTITLED_ID = '__untitled__';

// Note: in Ubuntu, you have to take some delay after activating some tab, otherwise there are chances
// Chrome still think the panel is the window you want to take screenshot, and weird enough in Ubuntu,
// You can't take screenshot of tabs with 'chrome-extension://' schema, even if it's your own extension
var SCREENSHOT_DELAY = exports.SCREENSHOT_DELAY = /Linux/i.test(self.navigator.userAgent) ? 200 : 0;
var CS_IPC_TIMEOUT = exports.CS_IPC_TIMEOUT = 4000;
var STATE_STORAGE_KEY = exports.STATE_STORAGE_KEY = 'background_state';
var ANTHROPIC = exports.ANTHROPIC = {
  COMPUTER_USE_MODEL: 'claude-3-5-sonnet-20241022'
};

/***/ }),

/***/ 76701:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DesktopScreenshot = void 0;
var DesktopScreenshot;
(function (_DesktopScreenshot) {
  var RequestType = /*#__PURE__*/function (RequestType) {
    RequestType["DisplayVisualResult"] = "display_visual_result";
    RequestType["DisplayVisualX"] = "display_visual_x";
    RequestType["DisplayOcrResult"] = "display_ocr_result";
    RequestType["Capture"] = "capture";
    return RequestType;
  }({});
  _DesktopScreenshot.RequestType = RequestType;
  var ImageSource = /*#__PURE__*/function (ImageSource) {
    ImageSource[ImageSource["Storage"] = 0] = "Storage";
    ImageSource[ImageSource["HardDrive"] = 1] = "HardDrive";
    ImageSource[ImageSource["CV"] = 2] = "CV";
    ImageSource[ImageSource["DataUrl"] = 3] = "DataUrl";
    return ImageSource;
  }({});
  _DesktopScreenshot.ImageSource = ImageSource;
  var RectType = /*#__PURE__*/function (RectType) {
    RectType[RectType["Match"] = 0] = "Match";
    RectType[RectType["Reference"] = 1] = "Reference";
    RectType[RectType["BestMatch"] = 2] = "BestMatch";
    RectType[RectType["ReferenceOfBestMatch"] = 3] = "ReferenceOfBestMatch";
    return RectType;
  }({});
  _DesktopScreenshot.RectType = RectType;
})(DesktopScreenshot || (exports.DesktopScreenshot = DesktopScreenshot = {}));

/***/ }),

/***/ 8327:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getState = getState;
exports.updateState = updateState;
var _storage = _interopRequireDefault(__webpack_require__(88555));
var C = _interopRequireWildcard(__webpack_require__(95902));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultState = {
  status: C.APP_STATUS.NORMAL,
  tabIds: {
    lastActivated: [],
    lastInspect: null,
    lastRecord: null,
    toInspect: null,
    firstRecord: null,
    toRecord: null,
    lastPlay: null,
    firstPlay: null,
    toPlay: null,
    panel: null,
    lastPanelWindow: null
  },
  pullback: false,
  // Note: heartBeatSecret = -1, means no heart beat available, and panel should not retry on heart beat lost
  heartBeatSecret: 0,
  // Note: disableHeartBeat = true, `checkHeartBeat` will stop working, it's useful for cases like close current tab
  disableHeartBeat: false,
  // Note: pendingPlayingTab = true, tells `getPlayTab` to wait until the current tab is closed and another tab is focused on
  pendingPlayingTab: false,
  xClickNeedCalibrationInfo: null,
  lastCsIpcSecret: null,
  closingAllWindows: false
};
function getState(optionalKey) {
  return _storage["default"].get(C.STATE_STORAGE_KEY).then(function (state) {
    var st = state || defaultState;
    if (typeof optionalKey === 'string') {
      return st[optionalKey];
    }
    return st;
  });
}
function updateState(updateFunc) {
  var fn = typeof updateFunc === 'function' ? updateFunc : function (state) {
    return _objectSpread(_objectSpread({}, state), updateFunc);
  };
  return getState().then(function (state) {
    var result = fn(state);
    return _storage["default"].set(C.STATE_STORAGE_KEY, result).then(function () {});
  });
}

/***/ }),

/***/ 58607:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.base64 = void 0;
var base64;
(function (_base) {
  // prettier-ignore
  var encodingTable = new Uint8Array([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47]);

  // prettier-ignore
  var decodingTable = new Uint8Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  var paddingChar = 61;
  function calculateEncodedLength(length) {
    var result = length / 3 * 4;
    result += length % 3 != 0 ? 4 : 0;
    return result;
  }
  function readWord(input, i, maxLength) {
    if (maxLength > 4) {
      throw new Error("maxLength should be in range [0, 4].");
    }
    var t = new Uint8Array(4);
    for (var k = 0; k < maxLength; ++k) {
      var c = input.charCodeAt(i + k);
      var b = decodingTable[c];
      if (b === 0xff) {
        return undefined;
      }
      t[k] = b;
    }
    return (t[0] << 3 * 6) + (t[1] << 2 * 6) + (t[2] << 1 * 6) + (t[3] << 0 * 6);
  }
  function writeWord(output, i, triple) {
    output[i + 0] = triple >> 16 & 0xff;
    output[i + 1] = triple >> 8 & 0xff;
    output[i + 2] = triple & 0xff;
  }
  function encode(input) {
    var inLen = input.length;
    var outLen = calculateEncodedLength(inLen);
    var lengthMod3 = inLen % 3;
    var calcLength = inLen - lengthMod3;
    var output = new Uint8Array(outLen);
    var i;
    var j = 0;
    for (i = 0; i < calcLength; i += 3) {
      output[j + 0] = encodingTable[(input[i] & 0xfc) >> 2];
      output[j + 1] = encodingTable[(input[i] & 0x03) << 4 | (input[i + 1] & 0xf0) >> 4];
      output[j + 2] = encodingTable[(input[i + 1] & 0x0f) << 2 | (input[i + 2] & 0xc0) >> 6];
      output[j + 3] = encodingTable[input[i + 2] & 0x3f];
      j += 4;
    }
    i = calcLength;
    switch (lengthMod3) {
      case 2:
        // One character padding needed
        output[j + 0] = encodingTable[(input[i] & 0xfc) >> 2];
        output[j + 1] = encodingTable[(input[i] & 0x03) << 4 | (input[i + 1] & 0xf0) >> 4];
        output[j + 2] = encodingTable[(input[i + 1] & 0x0f) << 2];
        output[j + 3] = paddingChar;
        j += 4;
        break;
      case 1:
        // Two character padding needed
        output[j + 0] = encodingTable[(input[i] & 0xfc) >> 2];
        output[j + 1] = encodingTable[(input[i] & 0x03) << 4];
        output[j + 2] = paddingChar;
        output[j + 3] = paddingChar;
        j += 4;
        break;
    }
    var decoder = new TextDecoder("ascii");
    return decoder.decode(output);
  }
  _base.encode = encode;
  function decode(input) {
    var inLen = input.length;
    if (inLen % 4 != 0) {
      return undefined;
    }
    var padding = 0;
    if (inLen > 0 && input.charCodeAt(inLen - 1) == paddingChar) {
      ++padding;
      if (inLen > 1 && input.charCodeAt(inLen - 2) == paddingChar) {
        ++padding;
      }
    }
    var encodedLen = inLen - padding;
    var completeLen = encodedLen & ~3;
    var outLen = 6 * inLen / 8 - padding;
    var output = new Uint8Array(outLen);
    var triple;
    var i = 0;
    var j = 0;
    while (i < completeLen) {
      triple = readWord(input, i, 4);
      if (typeof triple === "undefined") {
        return undefined;
      }
      writeWord(output, j, triple);
      i += 4;
      j += 3;
    }
    if (padding > 0) {
      triple = readWord(input, i, 4 - padding);
      if (typeof triple === "undefined") {
        return undefined;
      }
      switch (padding) {
        case 1:
          output[j + 0] = triple >> 16 & 0xff;
          output[j + 1] = triple >> 8 & 0xff;
          break;
        case 2:
          output[j + 0] = triple >> 16 & 0xff;
          break;
      }
    }
    return output;
  }
  _base.decode = decode;
})(base64 || (exports.base64 = base64 = {}));

/***/ }),

/***/ 90783:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MethodTypeInvocationNames = void 0;
var MethodTypeInvocationNames = exports.MethodTypeInvocationNames = ['get_version', 'get_desktop_dpi', 'get_image_info', 'capture_desktop', 'search_image', 'search_desktop', 'get_max_file_range', 'get_file_size', 'read_file_range'];

/***/ }),

/***/ 14406:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertImageSearchResultForPage = convertImageSearchResultForPage;
exports.convertImageSearchResultIfAllCoordiatesBasedOnTopLeftScreen = convertImageSearchResultIfAllCoordiatesBasedOnTopLeftScreen;
exports.getNativeCVAPI = void 0;
exports.guardSearchResult = guardSearchResult;
exports.serializeDataUrl = serializeDataUrl;
exports.serializeImageData = serializeImageData;
var _constants = __webpack_require__(90783);
var _ts_utils = __webpack_require__(1601);
var _kantuCvHost = __webpack_require__(73904);
var _kantuCv = __webpack_require__(7337);
var _base = __webpack_require__(58607);
var _utils = __webpack_require__(46580);
var _dom_utils = __webpack_require__(92950);
var _log = _interopRequireDefault(__webpack_require__(89130));
var _path = _interopRequireDefault(__webpack_require__(26513));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getNativeCVAPI = exports.getNativeCVAPI = (0, _ts_utils.singletonGetter)(function () {
  var nativeHost = new _kantuCvHost.KantuCVHost();
  var pReady = nativeHost.connectAsync()["catch"](function (e) {
    _log["default"].warn('pReady - error', e);
    throw e;
  });
  var api = _constants.MethodTypeInvocationNames.reduce(function (prev, method) {
    var camel = (0, _ts_utils.snakeToCamel)(method);
    prev[camel] = function () {
      var fn = function fn(params) {
        return pReady.then(function () {
          return nativeHost.invokeAsync(method, params)["catch"](function (e) {
            // Note: Looks like for now whenever there is an error, you have to reconnect native host
            // otherwise, all commands return "Disconnected" afterwards
            var typeSafeAPI = api;
            typeSafeAPI.reconnect()["catch"](function () {});

            // Note: For now, native host doesn't provide any useful error message if captureDesktop fails
            // but for most cases it's due to directory not exist
            if (camel === 'captureDesktop') {
              var _filePath = params.path;
              if (_filePath && /[\\/]/.test(_filePath)) {
                throw new Error("Failed to captureDesktop, please confirm directory exists at '".concat(_path["default"].dirname(_filePath), "'"));
              }
            }
            throw e;
          });
        });
      };
      return fn;
    }();
    return prev;
  }, {
    reconnect: function reconnect() {
      nativeHost.disconnect();
      pReady = nativeHost.connectAsync();
      return pReady.then(function () {
        return api;
      });
    },
    searchDesktopWithGuard: function searchDesktopWithGuard(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.searchDesktop(params).then(guardSearchResult);
    },
    searchImageWithGuard: function searchImageWithGuard(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.searchImage(params).then(guardSearchResult);
    },
    getImageFromDataUrl: function getImageFromDataUrl(dataUrl, dpi) {
      var typeSafeAPI = api;
      var removeBase64Prefix = function removeBase64Prefix(str) {
        var b64 = 'base64,';
        var i = str.indexOf(b64);
        if (i === -1) return str;
        return str.substr(i + b64.length);
      };
      return typeSafeAPI.getImageInfo({
        content: removeBase64Prefix(dataUrl)
      }).then(function (info) {
        var DEFAULT_DPI = 96;
        var dpiX = info.dpiX || dpi || DEFAULT_DPI;
        var dpiY = info.dpiY || dpi || DEFAULT_DPI;
        return serializeDataUrl(dataUrl, dpiX, dpiY);
      });
    },
    readFileAsArrayBuffer: function readFileAsArrayBuffer(filePath) {
      var typeSafeAPI = api;
      var readMore = function readMore(filePath) {
        var totalSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
        var rangeStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var dataUrls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        return typeSafeAPI.readFileRange({
          rangeStart: rangeStart,
          path: filePath
        }).then(function (range) {
          var result = range.rangeEnd > range.rangeStart ? dataUrls.concat([range.buffer]) : dataUrls;
          if (range.rangeEnd >= totalSize || range.rangeEnd <= range.rangeStart) return result;
          return readMore(filePath, totalSize, range.rangeEnd, result);
        });
      };
      return typeSafeAPI.getFileSize({
        path: filePath
      }).then(function (fileSize) {
        return readMore(filePath, fileSize, 0, []);
      }).then(function (dataUrls) {
        var arr = _ts_utils.concatUint8Array.apply(void 0, _toConsumableArray(dataUrls.map(function (dataUrl) {
          return new Uint8Array((0, _utils.dataURItoArrayBuffer)(dataUrl));
        })));
        return arr.buffer;
      });
    },
    readFileAsBlob: function readFileAsBlob(filePath) {
      var typeSafeAPI = api;
      return typeSafeAPI.readFileAsArrayBuffer(filePath).then(function (buffer) {
        return new Blob([buffer]);
      });
    },
    readFileAsDataURL: function readFileAsDataURL(filePath) {
      var withBase64Prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var typeSafeAPI = api;
      return typeSafeAPI.readFileAsBlob(filePath).then(function (blob) {
        return (0, _utils.blobToDataURL)(blob, withBase64Prefix);
      });
    },
    readFileAsText: function readFileAsText(filePath) {
      var typeSafeAPI = api;
      return typeSafeAPI.readFileAsBlob(filePath).then(function (blob) {
        return (0, _utils.blobToText)(blob);
      });
    },
    readFileAsBinaryString: function readFileAsBinaryString(filePath) {
      var typeSafeAPI = api;
      return typeSafeAPI.readFileAsArrayBuffer(filePath).then(function (buffer) {
        return (0, _utils.arrayBufferToString)(buffer);
      });
    }
  });
  return api;
});
function guardSearchResult(result) {
  switch (result.errorCode) {
    case _kantuCv.KantuCV.ImageSearchErrorCode.Ok:
      return result;
    case _kantuCv.KantuCV.ImageSearchErrorCode.NoGreenPinkBoxes:
      throw new Error('E601: Cannot find green and/or pink boxes');
    case _kantuCv.KantuCV.ImageSearchErrorCode.NoPinkBox:
      throw new Error('E602: Pattern image contains green box but does not contain pink box');
    case _kantuCv.KantuCV.ImageSearchErrorCode.TooManyGreenBox:
      throw new Error('E603: Pattern image contains more than one green box');
    case _kantuCv.KantuCV.ImageSearchErrorCode.TooManyPinkBox:
      throw new Error('E604: Pattern image contains more than one pink box');
    case _kantuCv.KantuCV.ImageSearchErrorCode.Fail:
      throw new Error('E605: Unspecified error has occured');
    default:
      throw new Error("E606: Unknown error code ".concat(result.errorCode));
  }
}

// Note: `matched` is pink box,  `reference` is green box

function convertImageSearchResultIfAllCoordiatesBasedOnTopLeftScreen(result) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var searchArea = arguments.length > 2 ? arguments[2] : undefined;
  var errorCode = result.errorCode,
    containsGreenPinkBoxes = result.containsGreenPinkBoxes,
    regions = result.regions;
  var convert = function convert(region) {
    var _searchArea$x, _searchArea$y;
    var searchAreaX = (_searchArea$x = searchArea === null || searchArea === void 0 ? void 0 : searchArea.x) !== null && _searchArea$x !== void 0 ? _searchArea$x : 0;
    var searchAreaY = (_searchArea$y = searchArea === null || searchArea === void 0 ? void 0 : searchArea.y) !== null && _searchArea$y !== void 0 ? _searchArea$y : 0;

    // All x, y in relativeRect and matchedRect are relatve to the whole screen
    if (!region.relativeRect) {
      return {
        matched: {
          offsetLeft: scale * region.matchedRect.x - scale * searchAreaX,
          offsetTop: scale * region.matchedRect.y - scale * searchAreaY,
          viewportLeft: scale * region.matchedRect.x,
          viewportTop: scale * region.matchedRect.y,
          pageLeft: scale * region.matchedRect.x,
          pageTop: scale * region.matchedRect.y,
          width: scale * region.matchedRect.width,
          height: scale * region.matchedRect.height,
          score: region.score
        },
        reference: null
      };
    } else {
      return {
        matched: {
          offsetLeft: scale * region.relativeRect.x - scale * searchAreaX,
          offsetTop: scale * region.relativeRect.y - scale * searchAreaY,
          viewportLeft: scale * region.relativeRect.x,
          viewportTop: scale * region.relativeRect.y,
          pageLeft: scale * region.relativeRect.x,
          pageTop: scale * region.relativeRect.y,
          width: scale * region.relativeRect.width,
          height: scale * region.relativeRect.height,
          score: region.score
        },
        reference: {
          offsetLeft: scale * region.matchedRect.x - scale * searchAreaX,
          offsetTop: scale * region.matchedRect.y - scale * searchAreaY,
          viewportLeft: scale * region.matchedRect.x,
          viewportTop: scale * region.matchedRect.y,
          pageLeft: scale * region.matchedRect.x,
          pageTop: scale * region.matchedRect.y,
          width: scale * region.matchedRect.width,
          height: scale * region.matchedRect.height,
          score: region.score
        }
      };
    }
  };
  return regions.map(function (r) {
    return convert(r);
  });
}
function convertImageSearchResultForPage(result, scale, pageOffset, viewportOffset) {
  var convert = function convert(region) {
    if (!region.relativeRect) {
      return {
        reference: null,
        matched: {
          offsetLeft: scale * region.matchedRect.x,
          offsetTop: scale * region.matchedRect.y,
          viewportLeft: scale * region.matchedRect.x + viewportOffset.x,
          viewportTop: scale * region.matchedRect.y + viewportOffset.y,
          pageLeft: scale * region.matchedRect.x + pageOffset.x,
          pageTop: scale * region.matchedRect.y + pageOffset.y,
          width: scale * region.matchedRect.width,
          height: scale * region.matchedRect.height,
          score: region.score
        }
      };
    } else {
      return {
        reference: {
          offsetLeft: scale * region.matchedRect.x,
          offsetTop: scale * region.matchedRect.y,
          viewportLeft: scale * region.matchedRect.x + viewportOffset.x,
          viewportTop: scale * region.matchedRect.y + viewportOffset.y,
          pageLeft: scale * region.matchedRect.x + pageOffset.x,
          pageTop: scale * region.matchedRect.y + pageOffset.y,
          width: scale * region.matchedRect.width,
          height: scale * region.matchedRect.height,
          score: region.score
        },
        matched: {
          offsetLeft: scale * region.relativeRect.x,
          offsetTop: scale * region.relativeRect.y,
          viewportLeft: scale * region.relativeRect.x + viewportOffset.x,
          viewportTop: scale * region.relativeRect.y + viewportOffset.y,
          pageLeft: scale * region.relativeRect.x + pageOffset.x,
          pageTop: scale * region.relativeRect.y + pageOffset.y,
          width: scale * region.relativeRect.width,
          height: scale * region.relativeRect.height,
          score: region.score
        }
      };
    }
  };
  return result.regions.map(function (r) {
    return convert(r);
  });
}
function serializeImageData(imageData, dpiX, dpiY) {
  // Convert RGBA -> RGB -> Base64
  var w = imageData.width;
  var h = imageData.height;
  var src = imageData.data;
  var rgb = new Uint8Array(w * h * 3);
  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      var base = y * w + x;
      var k = 3 * base;
      var j = 4 * base;
      rgb[k + 0] = src[j + 0];
      rgb[k + 1] = src[j + 1];
      rgb[k + 2] = src[j + 2];
    }
  }
  var data = _base.base64.encode(rgb);
  return {
    width: w,
    height: h,
    dpiX: dpiX,
    dpiY: dpiY,
    data: data
  };
}
function serializeDataUrl(dataUrl, dpiX, dpiY) {
  return (0, _dom_utils.imageDataFromUrl)(dataUrl).then(function (imageData) {
    return serializeImageData(imageData, dpiX, dpiY);
  });
}

/***/ }),

/***/ 73904:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KantuCVHost = void 0;
var _native_host = __webpack_require__(39356);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var KantuCVHost = exports.KantuCVHost = /*#__PURE__*/function (_NativeMessagingHost) {
  _inherits(KantuCVHost, _NativeMessagingHost);
  function KantuCVHost() {
    _classCallCheck(this, KantuCVHost);
    return _callSuper(this, KantuCVHost, [KantuCVHost.HOST_NAME]);
  }
  return _createClass(KantuCVHost);
}(_native_host.NativeMessagingHost);
_defineProperty(KantuCVHost, "HOST_NAME", "com.a9t9.kantu.cv");

/***/ }),

/***/ 7337:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KantuCV = void 0;
var KantuCV;
(function (_KantuCV) {
  var MethodType = /*#__PURE__*/function (MethodType) {
    MethodType["GetVersion"] = "get_version";
    MethodType["GetDesktopDpi"] = "get_desktop_dpi";
    MethodType["GetImageInfo"] = "get_image_info";
    MethodType["CaptureDesktop"] = "capture_desktop";
    MethodType["SearchImage"] = "search_image";
    MethodType["SearchDesktop"] = "search_desktop";
    MethodType["GetMaxFileRange"] = "get_max_file_range";
    MethodType["GetFileSize"] = "get_file_size";
    MethodType["ReadFileRange"] = "read_file_range";
    return MethodType;
  }({});
  _KantuCV.MethodType = MethodType;
  var ImageFormat = /*#__PURE__*/function (ImageFormat) {
    ImageFormat[ImageFormat["Unknown"] = 0] = "Unknown";
    ImageFormat[ImageFormat["Png"] = 1] = "Png";
    return ImageFormat;
  }({});
  _KantuCV.ImageFormat = ImageFormat;
  var ColorFormat = /*#__PURE__*/function (ColorFormat) {
    ColorFormat[ColorFormat["Unknown"] = 0] = "Unknown";
    ColorFormat[ColorFormat["Palette"] = 1] = "Palette";
    ColorFormat[ColorFormat["Grayscale"] = 2] = "Grayscale";
    ColorFormat[ColorFormat["GrayscaleAlpha"] = 3] = "GrayscaleAlpha";
    ColorFormat[ColorFormat["Rgb"] = 4] = "Rgb";
    ColorFormat[ColorFormat["Rgba"] = 5] = "Rgba";
    return ColorFormat;
  }({});
  _KantuCV.ColorFormat = ColorFormat;
  var ImageSearchErrorCode = /*#__PURE__*/function (ImageSearchErrorCode) {
    ImageSearchErrorCode[ImageSearchErrorCode["Ok"] = 0] = "Ok";
    ImageSearchErrorCode[ImageSearchErrorCode["Fail"] = 1] = "Fail";
    ImageSearchErrorCode[ImageSearchErrorCode["NoGreenPinkBoxes"] = 2] = "NoGreenPinkBoxes";
    ImageSearchErrorCode[ImageSearchErrorCode["NoPinkBox"] = 3] = "NoPinkBox";
    ImageSearchErrorCode[ImageSearchErrorCode["TooManyGreenBox"] = 4] = "TooManyGreenBox";
    ImageSearchErrorCode[ImageSearchErrorCode["TooManyPinkBox"] = 5] = "TooManyPinkBox";
    return ImageSearchErrorCode;
  }({});
  _KantuCV.ImageSearchErrorCode = ImageSearchErrorCode;
})(KantuCV || (exports.KantuCV = KantuCV = {}));

/***/ }),

/***/ 99998:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WordMatchType = void 0;
exports.allWordsWithPosition = allWordsWithPosition;
exports.getOcrPositionedWordsFromParseResults = getOcrPositionedWordsFromParseResults;
exports.guardOCRResponse = guardOCRResponse;
exports.hasWordMatch = hasWordMatch;
exports.isOcrSpaceFreeKey = isOcrSpaceFreeKey;
exports.isWordEqual = isWordEqual;
exports.isWordPositionEqual = isWordPositionEqual;
exports.iterateThroughParseResults = iterateThroughParseResults;
exports.ocrMatchCenter = ocrMatchCenter;
exports.ocrMatchRect = ocrMatchRect;
exports.runDownloadLog = runDownloadLog;
exports.runOCR = runOCR;
exports.runOCRLocal = runOCRLocal;
exports.runOCRTesseractC = runOCRTesseractC;
exports.scaleOcrParseResultWord = scaleOcrParseResultWord;
exports.scaleOcrResponseCoordinates = scaleOcrResponseCoordinates;
exports.scaleOcrTextSearchMatch = scaleOcrTextSearchMatch;
exports.searchTextInOCRResponse = searchTextInOCRResponse;
exports.testOcrSpaceAPIKey = testOcrSpaceAPIKey;
exports.wordIteratorFromParseResults = wordIteratorFromParseResults;
var _superagent = _interopRequireDefault(__webpack_require__(15734));
var _types = __webpack_require__(35847);
var _utils = __webpack_require__(46580);
var _ts_utils = __webpack_require__(1601);
var _filesystem = __webpack_require__(89937);
var _xfile = __webpack_require__(63109);
var _path = _interopRequireDefault(__webpack_require__(26513));
var _tesseract_c = _interopRequireDefault(__webpack_require__(67802));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function runDownloadLog(base64result, targetP, osType) {
  var fsAPI = (0, _filesystem.getNativeFileSystemAPI)();
  return fsAPI.getSpecialFolderPath({
    folder: _filesystem.SpecialFolder.UserProfile
  }).then(function (profilePath) {
    var uivision = osType == "mac" ? '/Library/uivision-xmodules/2.2.2/xmodules/' : _path["default"].join(profilePath, "\\AppData\\Roaming\\UI.Vision\\XModules\\ocr");
    return fsAPI.ensureDir({
      path: uivision
    }).then(function (Opath) {
      var _getXFile$getCachedCo = (0, _xfile.getXFile)().getCachedConfig(),
        rootDir = _getXFile$getCachedCo.rootDir;
      var path = uivision;
      var outputpath = rootDir;
      var filepath = '',
        targetpath = targetP;
      if (osType == "mac") {
        filepath = path + '/ocr3';
        //targetpath = outputpath+'/images/image.png';
      } else {
        filepath = path + '\\ocrexe\\ocrcl1.exe';
        //targetpath = outputpath+'\\images\\image.png';
      }
      var params = {
        fileName: filepath,
        path: targetpath,
        content: base64result,
        waitForExit: true
      };
      return fsAPI.writeAllText(params).then(function (res) {
        if (res != undefined) {
          return res;
        }
      })["catch"](function () {
        return console.log({
          result: false
        });
      });
    });
  })["catch"](function (e) {
    // Ignore host not found error, `initConfig` is supposed to be called on start
    // But we can't guarantee that native fs module is already installed
    if (!/Specified native messaging host not found/.test(e)) {
      throw e;
    }
  });
}
function runOCRTesseractC(_x, _x2) {
  return _runOCRTesseractC.apply(this, arguments);
}
function _runOCRTesseractC() {
  _runOCRTesseractC = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(options, logCB) {
    var language, imageDataURL, tesseractWrapper, extractionResult, retVal;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          language = options.language;
          imageDataURL = options.imageDataURL;
          _context.next = 4;
          return _tesseract_c["default"].getInstance();
        case 4:
          tesseractWrapper = _context.sent;
          tesseractWrapper.setLogger(logCB);
          _context.next = 8;
          return tesseractWrapper.start(imageDataURL, language);
        case 8:
          extractionResult = _context.sent;
          retVal = {
            "ParsedResults": extractionResult.resultData,
            "ProcessingTimeInMilliseconds": extractionResult.processingTimeInMilliseconds
          };
          return _context.abrupt("return", Promise.resolve(retVal));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _runOCRTesseractC.apply(this, arguments);
}
function runOCRLocal(options) {
  var language = options.language;
  var base64result = options.image;
  var osType = options.os;
  var fsAPI = (0, _filesystem.getNativeFileSystemAPI)();
  return fsAPI.getSpecialFolderPath({
    folder: _filesystem.SpecialFolder.UserProfile
  }).then(function (profilePath) {
    var uivision = osType == "mac" ? '/Library/uivision-xmodules/2.2.2/xmodules/' : _path["default"].join(profilePath, "\\AppData\\Roaming\\UI.Vision\\XModules\\ocr");
    return fsAPI.ensureDir({
      path: uivision
    }).then(function (Opath) {
      var _getXFile$getCachedCo2 = (0, _xfile.getXFile)().getCachedConfig(),
        rootDir = _getXFile$getCachedCo2.rootDir;
      var path = uivision;
      var outputpath = rootDir;
      var filepath = '',
        targetpath = '';
      if (osType == "mac") {
        filepath = path + '/ocr3';
        //targetpath = outputpath+'/images/image.png';
        targetpath = outputpath + '/image.png';
      } else {
        filepath = path + '\\ocrexe\\ocrcl1.exe';
        //targetpath = outputpath+'\\images\\image.png';
        targetpath = outputpath + '/image.png';
      }
      var params = {
        fileName: filepath,
        path: targetpath,
        content: base64result,
        waitForExit: true
      };
      return fsAPI.writeAllBytes(params).then(function (res) {
        if (res != undefined) {
          var _filepath = '';
          var _params = {};
          if (osType == "mac") {
            _filepath = path + '/ocr3';
            _params = {
              arguments: '--in ' + outputpath + "/image.png" + " --out " + outputpath + "/ocr_output.json --lang " + language,
              //arguments: '--in '+outputpath+"/image.png"+" --out "+outputpath+"/ocr_output.json --lang "+language,
              fileName: _filepath,
              waitForExit: true
            };
          } else {
            _filepath = path + '\\ocrexe\\ocrcl1.exe';
            _params = {
              arguments: outputpath + "\\image.png" + " " + outputpath + "\\ocr_output.json " + language,
              //arguments: outputpath+"\\images\\image.png"+" "+outputpath+"\\logs\\ocr_output.json "+language,
              fileName: _filepath,
              waitForExit: true
            };
          }
          return fsAPI.runProcess(_params);
        } else {
          console.log({
            result: false
          });
        }
      }).then(function (res) {
        if (res != undefined && res.exitCode != null && res.exitCode >= 0) {
          var _filepath2 = '';
          var _params2 = {};
          if (osType == "mac") {
            _params2 = {
              path: outputpath + "/ocr_output.json",
              //path: outputpath+"/logs/ocr_output.json",
              waitForExit: true
            };
          } else {
            _params2 = {
              path: outputpath + "\\ocr_output.json",
              //path: outputpath+"\\logs\\ocr_output.json",
              waitForExit: true
            };
          }
          console.log('params:>> ', _params2);
          return fsAPI.readAllBytes(_params2);
        }
      }).then(function (json) {
        if (json) {
          if (json.errorCode == 0) {
            //console.log(json.content);
            return json.content;
          } else {
            return false;
          }
        }
      })["catch"](function () {
        return console.log({
          result: false
        });
      });
    });
  })["catch"](function (e) {
    // Ignore host not found error, `initConfig` is supposed to be called on start
    // But we can't guarantee that native fs module is already installed
    if (!/Specified native messaging host not found/.test(e)) {
      throw e;
    }
  });
}
function runOCR(options) {
  var scaleStr = (options.scale + '').toLowerCase();
  var scale = ['true', 'false'].indexOf(scaleStr) !== -1 ? scaleStr : 'true';
  var engine = [1, 2].indexOf(options.engine || 0) !== -1 ? options.engine : 1;
  var singleRun = function singleRun() {
    return options.getApiUrlAndApiKey().then(function (server) {
      var url = server.url,
        key = server.key;
      var f = new FormData();
      console.log('runOCR url:>> ', url);
      console.log('runOCR key:>> ', key);
      f.append('apikey', key);
      f.append('language', options.language);
      f.append('scale', scale);
      f.append('OCREngine', '' + engine);
      f.append('isOverlayRequired', '' + options.isOverlayRequired);
      if (options.isTable !== undefined) {
        f.append('isTable', '' + options.isTable);
      }
      if (typeof options.image === 'string') {
        f.append('file', (0, _utils.dataURItoBlob)(options.image), 'unknown.png');
      } else {
        f.append('file', options.image.blob, options.image.name);
      }
      var startTime = new Date().getTime();
      if (options.willSendRequest) {
        options.willSendRequest({
          server: server,
          startTime: startTime
        });
      }
      return (0, _utils.withTimeout)(options.singleApiTimeout, function () {
        return _superagent["default"].post(url).send(f);
      }).then(function (res) {
        if (options.didGetResponse) {
          return options.didGetResponse({
            server: server,
            startTime: startTime,
            endTime: new Date().getTime(),
            response: res.body,
            error: null
          }).then(function () {
            return res;
          }, function () {
            return res;
          });
        }
        return res;
      }, function (e) {
        var err = getApiError(e);
        if (options.didGetResponse) {
          return options.didGetResponse({
            server: server,
            startTime: startTime,
            endTime: new Date().getTime(),
            response: null,
            error: err
          }).then(function () {
            throw err;
          }, function () {
            throw err;
          });
        }
        throw e;
      }).then(onApiReturn, onApiError)["catch"](function (e) {
        if (/timeout/i.test(e.message)) {
          throw new Error("OCR request timeout ".concat((options.singleApiTimeout / 1000).toFixed(1), "s"));
        } else {
          throw e;
        }
      });
    });
  };
  var run = (0, _ts_utils.retry)(singleRun, {
    // We don't want timeout mechanism from retry, so just make it big enough
    timeout: options.singleApiTimeout * 10,
    retryInterval: 0,
    shouldRetry: options.shouldRetry || function () {
      return false;
    }
  });
  return (0, _utils.withTimeout)(options.totalTimeout, run)["catch"](function (e) {
    if (/timeout/i.test(e.message)) {
      throw new Error('OCR timeout');
    } else {
      throw e;
    }
  });
}
function isOcrSpaceFreeKey(key) {
  return !!key && key.startsWith('K8');
}
function testOcrSpaceAPIKey(_ref) {
  var url = _ref.url,
    key = _ref.key;
  var f = new FormData();
  console.log('runOCR url:>> ', url);
  console.log('runOCR key:>> ', key);
  f.append('apikey', key);
  return (0, _utils.withTimeout)(10 * 1000, function () {
    return _superagent["default"].post(url).send(f);
  }).then(function (res) {
    // if res.body is json object
    if (res.body && res.body.ErrorMessage && res.body.ErrorMessage.length > 0 && res.body.ErrorMessage[0] === "Unable to recognize the file type") {
      // key is valid
      return true;
    } else {
      return false;
    }
  })["catch"](function (e) {
    console.log('testOcrSpaceAPIKey e:>> ', e);
    return false;
  });
}
function getApiError(e) {
  if (e.response && typeof e.response.body === 'string') {
    return new Error(e.response.body);
  }
  return e;
}
function onApiError(e) {
  console.error(e);
  throw getApiError(e);
}
function onApiReturn(res) {
  guardOCRResponse(res.body);
  return res.body;
}
function guardOCRResponse(data) {
  switch (data.OCRExitCode) {
    case _types.OCRExitCode.AllParsed:
      return;
    case _types.OCRExitCode.PartiallyParsed:
      throw new Error(['Parsed Partially (Only few pages out of all the pages parsed successfully)', data.ErrorMessage || '', data.ErrorDetails || ''].filter(function (s) {
        return s.length > 0;
      }).join('; '));
    case _types.OCRExitCode.Failed:
      throw new Error(['OCR engine fails to parse an image', data.ErrorMessage || '', data.ErrorDetails || ''].filter(function (s) {
        return s.length > 0;
      }).join('; '));
    case _types.OCRExitCode.Fatal:
      throw new Error(['Fatal error occurs during parsing', data.ErrorMessage || '', data.ErrorDetails || ''].filter(function (s) {
        return s.length > 0;
      }).join('; '));
  }
}
function wordIteratorFromParseResults(parseResults) {
  var pageIndex = 0;
  var lineIndex = 0;
  var wordIndex = 0;
  var next = function next() {
    var page = parseResults[pageIndex];
    var currentLines = page ? page.TextOverlay.Lines : [];
    var line = page ? page.TextOverlay.Lines[lineIndex] : null;
    var currentWords = line ? line.Words : [];
    var word = line ? line.Words[wordIndex] : null;
    if (!word) {
      return {
        done: true,
        value: null
      };
    }
    var value = {
      word: word,
      position: {
        pageIndex: pageIndex,
        lineIndex: lineIndex,
        wordIndex: wordIndex
      }
    };
    var _ref2 = function () {
      var nextWordIndex = wordIndex + 1;
      var nextLineIndex = lineIndex;
      var nextPageIndex = pageIndex;
      if (nextWordIndex >= currentWords.length) {
        nextWordIndex = 0;
        nextLineIndex += 1;
      }
      if (nextLineIndex >= currentLines.length) {
        nextLineIndex = 0;
        nextPageIndex += 1;
      }
      if (nextPageIndex >= parseResults.length) {
        return [-1, -1, -1];
      }
      return [nextPageIndex, nextLineIndex, nextWordIndex];
    }();
    var _ref3 = _slicedToArray(_ref2, 3);
    pageIndex = _ref3[0];
    lineIndex = _ref3[1];
    wordIndex = _ref3[2];
    return {
      value: value,
      done: false
    };
  };
  return {
    next: next
  };
}
function iterateThroughParseResults(parseResults, fn) {
  var iterator = wordIteratorFromParseResults(parseResults);
  while (true) {
    var _iterator$next = iterator.next(),
      done = _iterator$next.done,
      value = _iterator$next.value;
    if (done) break;
    var shouldContinue = fn(value);
    if (!shouldContinue) break;
  }
}
var getMatchedBlockInfo = function getMatchedBlockInfo(matchedLineWords) {
  var matchedLineWordsCopy = _toConsumableArray(matchedLineWords);
  var _matchedLineWordsCopy = _slicedToArray(matchedLineWordsCopy, 1),
    firstWord = _matchedLineWordsCopy[0];
  var _matchedLineWordsCopy2 = matchedLineWordsCopy.reverse(),
    _matchedLineWordsCopy3 = _slicedToArray(_matchedLineWordsCopy2, 1),
    lastWord = _matchedLineWordsCopy3[0];
  var left = firstWord.Left;
  var width = lastWord.Left + lastWord.Width - left;
  var top, height;
  matchedLineWordsCopy.reverse().forEach(function (_ref4) {
    var Height = _ref4.Height,
      Top = _ref4.Top;
    if (top === undefined || top > Top) top = Top;
    if (height === undefined || height < Height) height = Height;
  });
  return {
    BlockRect: {
      Left: left,
      Top: top,
      Width: width,
      Height: height
    },
    BlockCenterPoint: [Math.round(left + width / 2), Math.round(top + height / 2)]
  };
};
function getOcrPositionedWordsFromParseResults(parseResults, searchText) {
  var searchWords = searchText.toLowerCase().split(/\s+/).filter(function (word) {
    return word !== "";
  });

  // Perform a deep copy of the data to ensure that the original
  // data is used for each search operation
  // const cachedDataDeepCopy = JSON.parse(JSON.stringify(cachedData));
  // const { TextOverlay } = cachedDataDeepCopy[0];
  // const { Lines } = TextOverlay;

  var TextOverlay = parseResults[0].TextOverlay;
  var Lines = TextOverlay.Lines;
  console.log('TextOverlay:>> ', TextOverlay);
  console.log('Lines:>> ', Lines);
  var searchResult = [];
  if (searchWords.length !== 0) {
    for (var i = 0; i < Lines.length; i++) {
      var lineWords = Lines[i].Words;
      var currentMatch = [];
      for (var j = 0; j < lineWords.length; j++) {
        var word = lineWords[j];
        var wordText = word.WordText.toLowerCase().replace(/[,\.\"]/g, "");
        var currentSearchWordIndex = currentMatch.length;
        var currentSearchWord = searchWords[currentSearchWordIndex];
        if (currentSearchWord.indexOf("?") > -1 || currentSearchWord.indexOf("*") > -1) {
          // Regular expression matching based on wildcard characters such as ? and *

          var searchPattern = currentSearchWord.replace(/\?/g, ".").replace(/\*/g, ".*?");
          var regexp = new RegExp("^".concat(searchPattern, "$"));
          if (regexp.test(wordText)) {
            currentMatch.push(word);
          } else {
            currentMatch = [];
          }
        } else {
          // Matching based on text comparison method.

          if (wordText === currentSearchWord) {
            currentMatch.push(word);
          } else {
            currentMatch = [];
          }
        }

        // When a set of information is matched, push it into searchResult, clear
        // currentMatch, and prepare to start matching the next set of information.
        if (currentMatch.length === searchWords.length) {
          var _getMatchedBlockInfo = getMatchedBlockInfo(currentMatch),
            BlockRect = _getMatchedBlockInfo.BlockRect,
            BlockCenterPoint = _getMatchedBlockInfo.BlockCenterPoint;

          // Since searchText could be either text or a regular expression, concatenation
          // should be based on the actual matched content rather than searchText
          var matchedBlockText = currentMatch.map(function (_ref5) {
            var WordText = _ref5.WordText;
            return WordText;
          }).join(" ");
          searchResult.push({
            Block: _objectSpread({
              Text: matchedBlockText
            }, BlockRect),
            BlockCenterPoint: BlockCenterPoint,
            Words: currentMatch
          });
          currentMatch = [];
        }
      }
    }
  }
  var SearchResult = {
    MatchesFound: searchResult.length,
    Matches: searchResult
  };
  console.log('SearchResult:>> ', SearchResult);
  var convertSearchResultToFound = function convertSearchResultToFound(searchResult) {
    var found = [];
    searchResult.Matches.forEach(function (match) {
      var foundItem = [];
      match.Words.forEach(function (word) {
        foundItem.push({
          word: word,
          position: {
            pageIndex: word.pageIndex,
            lineIndex: word.lineIndex,
            wordIndex: word.wordIndex
          }
        });
      });
      found.push(foundItem);
    });
    return found;
  };
  var found = convertSearchResultToFound(SearchResult);
  return found;
}
function searchTextInOCRResponse(data) {
  var text = data.text,
    index = data.index,
    parsedResults = data.parsedResults,
    exhaust = data.exhaust;
  console.log('searchTextInOCRResponse data:>> ', data);
  var isExactMatch = /^\[.*\]$/.test(text);
  var realText = isExactMatch ? text.slice(1, -1) : text;
  var words = realText.split(/\s+/g).map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s.length > 0;
  });
  if (index < 0 || Math.round(index) !== index) {
    throw new Error('index must be positive integer');
  }
  var found = [];
  found = getOcrPositionedWordsFromParseResults(parsedResults, text);
  console.log('found:>> ', found);
  var all = found.filter(function (pWords) {
    return pWords.length === words.length;
  }).map(function (pWords) {
    return {
      words: pWords,
      // Note: similarity is useless in current implementation
      similarity: 1
    };
  });
  var hit = all[index] || null;
  return {
    hit: hit,
    all: all,
    exhaust: exhaust
  };
}
function isWordEqual(a, b) {
  if (!a || !b) return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
var WordMatchType = exports.WordMatchType = /*#__PURE__*/function (WordMatchType) {
  WordMatchType[WordMatchType["Full"] = 0] = "Full";
  WordMatchType[WordMatchType["Prefix"] = 1] = "Prefix";
  WordMatchType[WordMatchType["Postfix"] = 2] = "Postfix";
  WordMatchType[WordMatchType["AnyPart"] = 3] = "AnyPart";
  return WordMatchType;
}({});
function wildcardToRegExp(pattern) {
  // Escape special characters in the pattern
  var escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Replace wildcard characters with their regex equivalents
  var regexPattern = escapedPattern.replace(/\\\*/g, '.*') // Replace \* with .*
  .replace(/\\\?/g, '.'); // Replace \? with .

  // Create RegExp object with the pattern and global flag
  return new RegExp('^' + regexPattern + '$');
}

// Example usage:
// console.log(matchWithWildcard('hello', 'he*'));   // true
// console.log(matchWithWildcard('hello', 'h?llo')); // true
// console.log(matchWithWildcard('hello', 'he??o')); // true
// console.log(matchWithWildcard('hello', 'hi*'));   // false
function matchWithWildcard(string, pattern) {
  var regex = wildcardToRegExp(pattern);
  return regex.test(string);
}
function hasWordMatch(pattern, target, matchType) {
  if (!pattern || !target) return false;
  var lowerPattern = pattern.trim().toLowerCase();
  var lowerTarget = target.trim().toLowerCase();
  switch (matchType) {
    case WordMatchType.Full:
      {
        return lowerPattern === lowerTarget;
      }
    case WordMatchType.Prefix:
      {
        return lowerTarget.indexOf(lowerPattern) === 0;
      }
    case WordMatchType.Postfix:
      {
        var index = lowerTarget.indexOf(lowerPattern);
        return index !== -1 && index === lowerTarget.length - lowerPattern.length;
      }
    case WordMatchType.AnyPart:
      {
        var wMatch = matchWithWildcard(lowerTarget, lowerPattern);
        console.log('wMatch:>> ', wMatch);
        return wMatch;
      }
  }
}
function isWordPositionEqual(a, b) {
  return a.pageIndex === b.pageIndex && a.lineIndex === b.lineIndex && a.wordIndex === b.wordIndex;
}
function allWordsWithPosition(parseResults, excludePositions) {
  var result = [];
  var isAtKnownPosition = function isAtKnownPosition(wordWithPos) {
    return excludePositions.reduce(function (prev, pos) {
      if (prev) return true;
      return isWordPositionEqual(pos, wordWithPos.position);
    }, false);
  };

  // TODO: consider using getOcrPositionedWordsFromParseResults instead of iterateThroughParseResults
  iterateThroughParseResults(parseResults, function (wordWithPos) {
    if (!isAtKnownPosition(wordWithPos)) {
      result.push(wordWithPos);
    }
    return true;
  });
  return result;
}
function ocrMatchRect(match) {
  var rectsByLine = match.words.reduce(function (prev, cur) {
    var key = "".concat(cur.position.pageIndex, "_").concat(cur.position.lineIndex);
    if (!prev[key]) {
      prev[key] = {
        x: cur.word.Left,
        y: cur.word.Top,
        width: cur.word.Width,
        height: cur.word.Height
      };
    } else {
      prev[key] = _objectSpread(_objectSpread({}, prev[key]), {}, {
        width: Math.max(prev[key].width, cur.word.Left + cur.word.Width - prev[key].x),
        height: Math.max(prev[key].height, cur.word.Top + cur.word.Height - prev[key].y)
      });
    }
    return prev;
  }, {});
  var widestRect = Object.keys(rectsByLine).reduce(function (prev, key) {
    return prev.width < rectsByLine[key].width ? rectsByLine[key] : prev;
  }, {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  return widestRect;
}
function ocrMatchCenter(match) {
  var rect = ocrMatchRect(match);
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
    width: rect.width,
    height: rect.height
  };
}
function scaleOcrParseResultWord(word, scale) {
  return _objectSpread(_objectSpread({}, word), {}, {
    Width: scale * word.Width,
    Height: scale * word.Height,
    Left: scale * word.Left,
    Top: scale * word.Top
  });
}

// export function scaleOcrParseResultWord (word: OcrParseResultWord, scale: number): OcrParseResultWord {  const scaledWord = {
//     ...word,
//     Width: scale * word.Width,
//     Height: scale * word.Height,
//     Left: scale * word.Left,
//     Top: scale * word.Top
//   };

//   // Adjust positions based on scaling factor
//   scaledWord.Left /= scale;
//   scaledWord.Top /= scale;

//   return scaledWord;
// }

function scaleOcrResponseCoordinates(res, scale) {
  var data = (0, _ts_utils.safeUpdateIn)(['ParsedResults', '[]', 'TextOverlay', 'Lines', '[]', 'Words', '[]'], function (word) {
    return scaleOcrParseResultWord(word, scale);
  }, res);
  return data;
}
function scaleOcrTextSearchMatch(match, scale) {
  var data = (0, _ts_utils.safeUpdateIn)(['words', '[]', 'word'], function (word) {
    return scaleOcrParseResultWord(word, scale);
  }, match);
  return data;
}

/***/ }),

/***/ 64013:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertOcrLanguageToTesseractLanguage = convertOcrLanguageToTesseractLanguage;
exports.isValidOCRLanguage = isValidOCRLanguage;
exports.tesseractLanguages = exports.tesseractLanguageOptions = exports.ocrLanguages = exports.ocrLanguageOptions = void 0;
var ocr_languages = {
  ara: {
    "lang": "ara",
    "name": "Arabic",
    "short": "AR"
  },
  chs: {
    "lang": "chs",
    "name": "ChineseSimplified",
    "short": "简"
  },
  cht: {
    "lang": "cht",
    "name": "ChineseTraditional",
    "short": "繁"
  },
  ce: {
    "lang": "ce",
    "name": "Czech",
    "short": "CS"
  },
  dan: {
    "lang": "dan",
    "name": "Danish",
    "short": "DA"
  },
  dut: {
    "lang": "dut",
    "name": "Dutch",
    "short": "NL"
  },
  eng: {
    "lang": "eng",
    "name": "English",
    "short": "EN"
  },
  fin: {
    "lang": "fin",
    "name": "Finnish",
    "short": "FI"
  },
  fre: {
    "lang": "fre",
    "name": "French",
    "short": "FR"
  },
  ger: {
    "lang": "ger",
    "name": "German",
    "short": "DE"
  },
  gre: {
    "lang": "gre",
    "name": "Greek",
    "short": "EL"
  },
  hun: {
    "lang": "hun",
    "name": "Hungarian",
    "short": "HU"
  },
  ita: {
    "lang": "ita",
    "name": "Italian",
    "short": "IT"
  },
  jpn: {
    "lang": "jpn",
    "name": "Japanese",
    "short": "JP"
  },
  kor: {
    "lang": "kor",
    "name": "Korean",
    "short": "KO"
  },
  nor: {
    "lang": "nor",
    "name": "Norwegian",
    "short": "NN"
  },
  pol: {
    "lang": "pol",
    "name": "Polish",
    "short": "PL"
  },
  por: {
    "lang": "por",
    "name": "Portuguese",
    "short": "PT"
  },
  rus: {
    "lang": "rus",
    "name": "Russian",
    "short": "RU"
  },
  spa: {
    "lang": "spa",
    "name": "Spanish",
    "short": "ES"
  },
  swe: {
    "lang": "swe",
    "name": "Swedish",
    "short": "SV"
  },
  tur: {
    "lang": "tur",
    "name": "Turkish",
    "short": "TR"
  }
};

// tesseract languages reflecting ocr_languages
var tesseract_languages = {
  ara: {
    "lang": "ara",
    "name": "Arabic",
    "short": "AR"
  },
  chi_sim: {
    "lang": "chi_sim",
    "name": "ChineseSimplified",
    "short": "简"
  },
  chi_tra: {
    "lang": "chi_tra",
    "name": "ChineseTraditional",
    "short": "繁"
  },
  ces: {
    "lang": "ces",
    "name": "Czech",
    "short": "CS"
  },
  dan: {
    "lang": "dan",
    "name": "Danish",
    "short": "DA"
  },
  nld: {
    "lang": "nld",
    "name": "Dutch",
    "short": "NL"
  },
  eng: {
    "lang": "eng",
    "name": "English",
    "short": "EN"
  },
  fin: {
    "lang": "fin",
    "name": "Finnish",
    "short": "FI"
  },
  fra: {
    "lang": "fra",
    "name": "French",
    "short": "FR"
  },
  deu: {
    "lang": "deu",
    "name": "German",
    "short": "DE"
  },
  ell: {
    "lang": "ell",
    "name": "Greek",
    "short": "EL"
  },
  hun: {
    "lang": "hun",
    "name": "Hungarian",
    "short": "HU"
  },
  ita: {
    "lang": "ita",
    "name": "Italian",
    "short": "IT"
  },
  jpn: {
    "lang": "jpn",
    "name": "Japanese",
    "short": "JP"
  },
  kor: {
    "lang": "kor",
    "name": "Korean",
    "short": "KO"
  },
  nor: {
    "lang": "nor",
    "name": "Norwegian",
    "short": "NN"
  },
  pol: {
    "lang": "pol",
    "name": "Polish",
    "short": "PL"
  },
  por: {
    "lang": "por",
    "name": "Portuguese",
    "short": "PT"
  },
  rus: {
    "lang": "rus",
    "name": "Russian",
    "short": "RU"
  },
  spa: {
    "lang": "spa",
    "name": "Spanish",
    "short": "ES"
  },
  swe: {
    "lang": "swe",
    "name": "Swedish",
    "short": "SV"
  },
  tur: {
    "lang": "tur",
    "name": "Turkish",
    "short": "TR"
  }
};
var ocrLanguages = exports.ocrLanguages = ocr_languages;
var ocrLanguageOptions = exports.ocrLanguageOptions = function () {
  var list = Object.keys(ocrLanguages).map(function (key) {
    return {
      text: ocrLanguages[key].name,
      value: ocrLanguages[key].lang
    };
  });
  list.sort(function (a, b) {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  return list;
}();
var tesseractLanguages = exports.tesseractLanguages = tesseract_languages;
var tesseractLanguageOptions = exports.tesseractLanguageOptions = function () {
  var list = Object.keys(tesseractLanguages).map(function (key) {
    return {
      text: tesseractLanguages[key].name,
      value: tesseractLanguages[key].lang
    };
  });
  list.sort(function (a, b) {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  return list;
}();

/**
 * 
 * @param ocrLang 
 * @returns 
 * @throws Error if the language is not found
 * @example 
 * convertOcrLanguageToTesseractLanguage('ger') // 'deu'
 * convertOcrLanguageToTesseractLanguage('chs') // 'chi_sim'
 * convertOcrLanguageToTesseractLanguage('cht') // 'chi_tra'
 * convertOcrLanguageToTesseractLanguage('eng') // 'eng'
 */
function convertOcrLanguageToTesseractLanguage(ocrLang) {
  // if there's an entry in tesseract_languages with the key, just return it
  var tesseractLangObj = tesseract_languages[ocrLang];
  if (tesseractLangObj) {
    return tesseractLangObj.lang;
  }
  var ocrLangObj = ocr_languages[ocrLang];
  if (!ocrLangObj) {
    throw new Error("E502: JavaScript OCR encountered a problem");
  } else {
    // find language by name 
    var languageName = ocrLangObj.name;
    var found = Object.keys(tesseract_languages).filter(function (res) {
      var _ref;
      return ((_ref = tesseract_languages[res]) === null || _ref === void 0 || (_ref = _ref.name) === null || _ref === void 0 ? void 0 : _ref.toLowerCase()) === languageName.toLowerCase();
    });
    if (found.length > 0) {
      var tesseractLang = tesseract_languages[found[0]].lang;
      return tesseractLang;
    } else {
      throw new Error("Tesseract language not found for ".concat(ocrLang));
    }
  }
}
function isValidOCRLanguage(lang, store) {
  var ocrEngine = store.getState().config.ocrEngine;
  var ocrLanguageOption = store.getState().config.ocrLanguageOption;
  if (ocrEngine == 99) {
    var found = ocrLanguageOption.filter(function (res) {
      return res.value.toLowerCase() === lang.toLowerCase();
    });
    return typeof lang === 'string' && !!(found.length > 0);
  } else if (ocrEngine == 98) {
    var tesseractLangAr = tesseractLanguageOptions.map(function (item) {
      return {
        text: item.text,
        value: item.value
      };
    });
    var _found = tesseractLangAr.filter(function (res) {
      return res.value.toLowerCase() === lang.toLowerCase();
    });
    return typeof lang === 'string' && !!(_found.length > 0);
  } else {
    return typeof lang === 'string' && !!ocr_languages[lang.toLowerCase()];
  }
}

/***/ }),

/***/ 67802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _tesseract = __webpack_require__(34995);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TesseractWrapper = /*#__PURE__*/function () {
  function TesseractWrapper() {
    _classCallCheck(this, TesseractWrapper);
    // logger
    _defineProperty(this, "log", function (log, isNetwork) {
      console.log('Tesseract Logger:', {
        timestamp: +new Date(),
        log: log
      });
      console.log('Tesseract Logger:', "isNetwork: ".concat(isNetwork));
    });
    this.workers = {};
  }
  _createClass(TesseractWrapper, [{
    key: "setLogger",
    value: function setLogger(logger) {
      this.log = logger;
    }
  }, {
    key: "getWorker",
    value: function () {
      var _getWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(language) {
        var _this = this;
        var tesseractWorkerConfig, languageFileName, url;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              tesseractWorkerConfig = {
                workerBlobURL: false,
                workerPath: './lib/tesseract/worker.min.js',
                corePath: './lib/tesseract/core'
              };
              console.log('language:>>', language);
              languageFileName = "".concat(language, ".traineddata.gz");
              url = chrome.runtime.getURL("./lib/tesseract/lang/".concat(languageFileName));
              console.log('lang file url:>>', url);
              // see if file existx
              return _context2.abrupt("return", fetch(url).then(function (response) {
                console.log("lang file ".concat(languageFileName, " exists:>>"));
                return true;
              })["catch"](function (error) {
                console.log("lang file ".concat(languageFileName, " doesn't exist:>>"));
                return false;
              }).then( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(langFileExists) {
                  var initConfig, _initConfig;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (!(!_this.workers[language] && langFileExists)) {
                          _context.next = 7;
                          break;
                        }
                        // Use local language pack
                        initConfig = _objectSpread(_objectSpread({}, tesseractWorkerConfig), {}, {
                          langPath: './lib/tesseract/lang',
                          logger: function logger(log) {
                            _this.log(log, false);
                          }
                        });
                        _context.next = 4;
                        return (0, _tesseract.createWorker)(language, 1, initConfig);
                      case 4:
                        _this.workers[language] = _context.sent;
                        _context.next = 12;
                        break;
                      case 7:
                        if (_this.workers[language]) {
                          _context.next = 12;
                          break;
                        }
                        // Use network for other languages
                        _initConfig = _objectSpread(_objectSpread({}, tesseractWorkerConfig), {}, {
                          logger: function logger(log) {
                            _this.log(log, true);
                          }
                        });
                        _context.next = 11;
                        return (0, _tesseract.createWorker)(language, 1, _initConfig);
                      case 11:
                        _this.workers[language] = _context.sent;
                      case 12:
                        return _context.abrupt("return", _this.workers[language]);
                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getWorker(_x) {
        return _getWorker.apply(this, arguments);
      }
      return getWorker;
    }()
  }, {
    key: "transferToOCRSpaceFormat",
    value: function transferToOCRSpaceFormat() {
      var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var ParsedText = arguments.length > 1 ? arguments[1] : undefined;
      var Lines = lines.map(function (_ref2) {
        var LineText = _ref2.text,
          _ref2$words = _ref2.words,
          words = _ref2$words === void 0 ? [] : _ref2$words;
        var MaxHeight, MinTop;
        return {
          LineText: LineText,
          Words: words.map(function (_ref3) {
            var WordText = _ref3.text,
              _ref3$bbox = _ref3.bbox,
              bbox = _ref3$bbox === void 0 ? {} : _ref3$bbox;
            var x0 = bbox.x0,
              y0 = bbox.y0,
              x1 = bbox.x1,
              y1 = bbox.y1;
            var Width = x1 - x0;
            var Height = y1 - y0;
            if (MaxHeight === undefined || Height > MaxHeight) {
              MaxHeight = Height;
            }
            if (MinTop === undefined || y0 < MinTop) {
              MinTop = y0;
            }
            return {
              WordText: WordText,
              Left: x0,
              Top: y0,
              Height: Height,
              Width: Width
            };
          }),
          MaxHeight: MaxHeight,
          MinTop: MinTop
        };
      });
      return [{
        TextOverlay: {
          Lines: Lines,
          HasOverlay: true,
          Message: "Total lines: ".concat(lines.length)
        },
        TextOrientation: "0",
        FileParseExitCode: 1,
        ParsedText: ParsedText,
        ErrorMessage: "",
        ErrorDetails: ""
      }];
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(input, language) {
        var startTime, worker, _ref4, data, resultData, processingTimeInMilliseconds;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              startTime = performance.now();
              _context3.prev = 1;
              _context3.next = 4;
              return this.getWorker(language);
            case 4:
              worker = _context3.sent;
              _context3.next = 7;
              return worker.reinitialize(language);
            case 7:
              _context3.next = 9;
              return worker.recognize(input);
            case 9:
              _ref4 = _context3.sent;
              data = _ref4.data;
              console.log('Tesseract raw data:', data);
              resultData = this.transferToOCRSpaceFormat(data.lines, data.text); // Calculate the processing time of Tesseract
              processingTimeInMilliseconds = performance.now() - startTime;
              return _context3.abrupt("return", {
                resultData: resultData,
                processingTimeInMilliseconds: processingTimeInMilliseconds
              });
            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](1);
              throw new Error(_context3.t0);
            case 20:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 17]]);
      }));
      function start(_x3, _x4) {
        return _start.apply(this, arguments);
      }
      return start;
    }()
  }], [{
    key: "getInstance",
    value: function () {
      var _getInstance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.instance) {
                this.instance = new TesseractWrapper();
              }
              return _context4.abrupt("return", this.instance);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getInstance() {
        return _getInstance.apply(this, arguments);
      }
      return getInstance;
    }()
  }]);
  return TesseractWrapper;
}();
var _default = exports["default"] = TesseractWrapper;

/***/ }),

/***/ 35847:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OCRExitCode = exports.FileParseExitCode = void 0;
Object.defineProperty(exports, "OCRLanguage", ({
  enumerable: true,
  get: function get() {
    return _languages.OCRLanguage;
  }
}));
exports.OcrHighlightType = void 0;
var _languages = __webpack_require__(64013);
var OCRExitCode = exports.OCRExitCode = /*#__PURE__*/function (OCRExitCode) {
  OCRExitCode[OCRExitCode["AllParsed"] = 1] = "AllParsed";
  OCRExitCode[OCRExitCode["PartiallyParsed"] = 2] = "PartiallyParsed";
  OCRExitCode[OCRExitCode["Failed"] = 3] = "Failed";
  OCRExitCode[OCRExitCode["Fatal"] = 4] = "Fatal";
  return OCRExitCode;
}({});
var FileParseExitCode = exports.FileParseExitCode = /*#__PURE__*/function (FileParseExitCode) {
  FileParseExitCode[FileParseExitCode["FileNotFound"] = 0] = "FileNotFound";
  FileParseExitCode[FileParseExitCode["Success"] = 1] = "Success";
  FileParseExitCode[FileParseExitCode["ParseError"] = -10] = "ParseError";
  FileParseExitCode[FileParseExitCode["Timeout"] = -20] = "Timeout";
  FileParseExitCode[FileParseExitCode["ValidationError"] = -30] = "ValidationError";
  FileParseExitCode[FileParseExitCode["UnknownError"] = -99] = "UnknownError";
  return FileParseExitCode;
}({});
var OcrHighlightType = exports.OcrHighlightType = /*#__PURE__*/function (OcrHighlightType) {
  OcrHighlightType[OcrHighlightType["Identified"] = 0] = "Identified";
  OcrHighlightType[OcrHighlightType["Matched"] = 1] = "Matched";
  OcrHighlightType[OcrHighlightType["TopMatched"] = 2] = "TopMatched";
  OcrHighlightType[OcrHighlightType["WildcardTopMatched"] = 3] = "WildcardTopMatched";
  OcrHighlightType[OcrHighlightType["WildcardMatched"] = 4] = "WildcardMatched";
  return OcrHighlightType;
}({});

/***/ }),

/***/ 42634:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 22623:
/***/ (() => {

/* (ignored) */

/***/ })

}]);