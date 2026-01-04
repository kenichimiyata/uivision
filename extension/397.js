"use strict";
(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[397],{

/***/ 81909:
/***/ ((__unused_webpack_module, exports) => {



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
    var result = Math.trunc(length / 3) * 4;
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

/***/ 85393:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.availableCommandsForDesktop = exports.availableCommands = exports.CommandScope = void 0;
exports.canCommandFind = canCommandFind;
exports.canCommandReadCsv = canCommandReadCsv;
exports.canCommandReadImage = canCommandReadImage;
exports.canCommandRunMacro = canCommandRunMacro;
exports.canCommandSelect = canCommandSelect;
exports.commandScopes = void 0;
exports.commandText = commandText;
exports.doesCommandSupportTargetOptions = doesCommandSupportTargetOptions;
exports.indentCreatedByCommand = indentCreatedByCommand;
exports.isCommandAvailableForDesktop = isCommandAvailableForDesktop;
exports.isExtensionResourceOnlyCommand = isExtensionResourceOnlyCommand;
exports.isValidCmd = isValidCmd;
exports.normalizeCommandName = normalizeCommandName;
exports.parseImageTarget = parseImageTarget;
var CommandScope = exports.CommandScope = /*#__PURE__*/function (CommandScope) {
  CommandScope[CommandScope["All"] = 1] = "All";
  CommandScope[CommandScope["WebOnly"] = 2] = "WebOnly";
  CommandScope[CommandScope["DesktopOnly"] = 3] = "DesktopOnly";
  return CommandScope;
}({});
var commandScopes = exports.commandScopes = {
  'open': CommandScope.WebOnly,
  'openBrowser': CommandScope.WebOnly,
  'click': CommandScope.WebOnly,
  'clickAndWait': CommandScope.WebOnly,
  'saveItem': CommandScope.WebOnly,
  'select': CommandScope.WebOnly,
  'selectAndWait': CommandScope.WebOnly,
  'addSelection': CommandScope.WebOnly,
  'removeSelection': CommandScope.WebOnly,
  'type': CommandScope.WebOnly,
  'pause': CommandScope.All,
  'waitForPageToLoad': CommandScope.WebOnly,
  'selectFrame': CommandScope.WebOnly,
  'assertAlert': CommandScope.WebOnly,
  'assertConfirmation': CommandScope.WebOnly,
  'assertPrompt': CommandScope.WebOnly,
  'answerOnNextPrompt': CommandScope.WebOnly,
  'store': CommandScope.All,
  'storeText': CommandScope.WebOnly,
  'storeTitle': CommandScope.WebOnly,
  'storeAttribute': CommandScope.WebOnly,
  'storeXpathCount': CommandScope.WebOnly,
  'assertText': CommandScope.WebOnly,
  'assertTitle': CommandScope.WebOnly,
  'clickAt': CommandScope.WebOnly,
  'echo': CommandScope.All,
  'mouseOver': CommandScope.WebOnly,
  'verifyText': CommandScope.WebOnly,
  'verifyTitle': CommandScope.WebOnly,
  'sendKeys': CommandScope.WebOnly,
  'dragAndDropToObject': CommandScope.WebOnly,
  'selectWindow': CommandScope.WebOnly,
  'captureScreenshot': CommandScope.WebOnly,
  'captureDesktopScreenshot': CommandScope.DesktopOnly,
  'refresh': CommandScope.WebOnly,
  'assert': CommandScope.All,
  'assertElementPresent': CommandScope.WebOnly,
  'assertElementNotPresent': CommandScope.WebOnly,
  'assertEditable': CommandScope.WebOnly,
  'assertNotEditable': CommandScope.WebOnly,
  'verify': CommandScope.All,
  'verifyElementPresent': CommandScope.WebOnly,
  'verifyElementNotPresent': CommandScope.WebOnly,
  'verifyEditable': CommandScope.WebOnly,
  'verifyNotEditable': CommandScope.WebOnly,
  'deleteAllCookies': CommandScope.WebOnly,
  'label': CommandScope.All,
  'gotoLabel': CommandScope.All,
  'csvRead': CommandScope.All,
  'csvReadArray': CommandScope.All,
  'csvSave': CommandScope.All,
  'csvSaveArray': CommandScope.All,
  'storeValue': CommandScope.WebOnly,
  'assertValue': CommandScope.WebOnly,
  'verifyValue': CommandScope.WebOnly,
  'storeChecked': CommandScope.WebOnly,
  'captureEntirePageScreenshot': CommandScope.WebOnly,
  'onDownload': CommandScope.WebOnly,
  'throwError': CommandScope.All,
  'comment': CommandScope.All,
  'waitForElementVisible': CommandScope.WebOnly,
  'waitForElementNotVisible': CommandScope.WebOnly,
  'waitForElementPresent': CommandScope.WebOnly,
  'waitForElementNotPresent': CommandScope.WebOnly,
  'onError': CommandScope.All,
  'sourceSearch': CommandScope.WebOnly,
  'sourceExtract': CommandScope.WebOnly,
  'storeImage': CommandScope.WebOnly,
  'localStorageExport': CommandScope.All,
  'visionLimitSearchArea': CommandScope.All,
  'visionLimitSearchAreaRelative': CommandScope.All,
  'visionLimitSearchAreabyTextRelative': CommandScope.All,
  'visualSearch': CommandScope.All,
  'visualVerify': CommandScope.All,
  'visualAssert': CommandScope.All,
  'visualGetPixelColor': CommandScope.All,
  'editContent': CommandScope.WebOnly,
  'bringBrowserToForeground': CommandScope.All,
  'bringIDEandBrowserToBackground': CommandScope.All,
  'setWindowSize': CommandScope.All,
  'prompt': CommandScope.WebOnly,
  'XRun': CommandScope.All,
  'XRunAndWait': CommandScope.All,
  'XClick': CommandScope.All,
  'XClickRelative': CommandScope.All,
  'XClickTextRelative': CommandScope.All,
  'XClickText': CommandScope.All,
  'XMoveText': CommandScope.All,
  'XMoveTextRelative': CommandScope.All,
  'XType': CommandScope.All,
  'XMove': CommandScope.All,
  'XMoveRelative': CommandScope.All,
  'XMouseWheel': CommandScope.All,
  'XDesktopAutomation': CommandScope.All,
  'OCRSearch': CommandScope.All,
  'OCRExtractRelative': CommandScope.All,
  'OCRExtractbyTextRelative': CommandScope.All,
  'OCRExtractScreenshot': CommandScope.All,
  'aiPrompt': CommandScope.All,
  'aiScreenXY': CommandScope.All,
  'aiComputerUse': CommandScope.All,
  'setProxy': CommandScope.All,
  'run': CommandScope.All,
  'executeScript': CommandScope.All,
  'executeScript_Sandbox': CommandScope.All,
  'check': CommandScope.WebOnly,
  'uncheck': CommandScope.WebOnly,
  'assertChecked': CommandScope.WebOnly,
  'assertNotChecked': CommandScope.WebOnly,
  'verifyChecked': CommandScope.WebOnly,
  'verifyNotChecked': CommandScope.WebOnly,
  //'while',
  // 'endWhile',
  'do': CommandScope.All,
  'repeatIf': CommandScope.All,
  //'if',
  'else': CommandScope.All,
  'elseif': CommandScope.All,
  // 'endif',
  'end': CommandScope.All,
  'if': CommandScope.All,
  // war _v2
  'while': CommandScope.All,
  // war _v2
  'gotoIf': CommandScope.All,
  // war _v2
  'times': CommandScope.All,
  'forEach': CommandScope.All,
  'break': CommandScope.All,
  'continue': CommandScope.All
};
var availableCommands = exports.availableCommands = function () {
  var list = Object.keys(commandScopes);
  list.sort(function (a, b) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });
  return list;
}();
var availableCommandsForDesktop = exports.availableCommandsForDesktop = availableCommands.filter(isCommandAvailableForDesktop);
function normalizeCommandName(str) {
  if (!str) {
    return '';
  }
  var lower = str.toLowerCase();
  var lowerCommands = availableCommands.map(function (str) {
    return str.toLowerCase();
  });
  var index = lowerCommands.findIndex(function (cmd) {
    return cmd === lower;
  });
  return index === -1 ? str : availableCommands[index];
}
function commandText(cmd) {
  switch (cmd) {
    case 'ifxxx': //war _v1
    case 'whilexxx':
    case 'gotoIfxxx':
      return cmd + '_v1_deprecated';
    case 'storeEval':
    case 'endif':
    case 'endwhile':
    case 'resize':
      return cmd + '_deprecated';
    default:
      return cmd;
  }
}
function isValidCmd(str) {
  return availableCommands.indexOf(str) !== -1;
}
function isExtensionResourceOnlyCommand(str) {
  switch (str) {
    case 'if':
    case 'while':
    case 'gotoIf':
    case 'if_v2':
    case 'while_v2':
    case 'gotoIf_v2':
    case 'executeScript_Sandbox':
    case 'run':
    case 'store':
    case 'echo':
    case 'prompt':
    case 'throwError':
    case 'pause':
    case 'localStorageExport':
      return true;
    default:
      return false;
  }
}
function canCommandReadImage(str) {
  switch (str) {
    case 'visualSearch':
    case 'visualVerify':
    case 'visualAssert':
    case 'XClick':
    case 'XClickText':
    case 'XClickTextRelative':
    case 'XClickRelative':
    case 'XMove':
    case 'XMoveText':
    case 'XMoveTextRelative':
    case 'XMoveRelative':
    case 'OCRExtract':
    case 'OCRExtractRelative':
      return true;
    default:
      return false;
  }
}
function canCommandReadCsv(str) {
  switch (str) {
    case 'csvRead':
    case 'csvReadArray':
      return true;
    default:
      return false;
  }
}
function canCommandRunMacro(str) {
  switch (str) {
    case 'run':
      return true;
    default:
      return false;
  }
}
function doesCommandSupportTargetOptions(str) {
  switch (str) {
    case 'click':
    case 'saveItem':
    case 'clickAndWait':
    case 'select':
    case 'selectAndWait':
    case 'type':
    case 'mouseOver':
    case 'verifyText':
    case 'sendKeys':
    case 'dragAndDropToObject':
    case 'assertElementPresent':
    case 'assertEditable':
    case 'assertNotEditable':
    case 'verifyElementPresent':
    case 'verifyEditable':
    case 'verifyNotEditable':
    case 'storeValue':
    case 'assertValue':
    case 'verifyValue':
    case 'storeChecked':
    case 'waitForElementVisible':
    case 'waitForElementPresent':
    case 'XClick':
    case 'XClickRelative':
    case 'XClickTextRelative':
    case 'XClickText':
    case 'XMoveText':
    case 'XMoveTextRelative':
    case 'XMove':
    case 'XMoveRelative':
    case 'check':
    case 'uncheck':
    case 'assertChecked':
    case 'assertNotChecked':
    case 'verifyChecked':
    case 'verifyNotChecked':
    case 'aiPrompt':
    case 'aiScreenXY':
    case 'aiComputerUse':
      return true;
    default:
      return false;
  }
}
function canCommandFind(str) {
  switch (str) {
    case 'echo':
    case 'open':
    case 'openBrowser':
    case 'pause':
    case 'waitForPageToLoad':
    case 'assertAlert':
    case 'assertConfirmation':
    case 'assertPrompt':
    case 'answerOnNextPrompt':
    case 'store':
    case 'storeTitle':
    case 'assertTitle':
    case 'verifyTitle':
    case 'selectWindow':
    case 'captureScreenshot':
    case 'captureDesktopScreenshot':
    case 'refresh':
    case 'deleteAllCookies':
    case 'label':
    case 'gotoLabel':
    case 'csvRead':
    case 'csvReadArray':
    case 'csvSave':
    case 'csvSaveArray':
    case 'captureEntirePageScreenshot':
    case 'onDownload':
    case 'throwError':
    case 'comment':
    case 'onError':
    case 'sourceSearch':
    case 'sourceExtract':
    case 'localStorageExport':
    case 'visionLimitSearchArea':
    case 'visualGetPixelColor':
    case 'bringBrowserToForeground':
    case 'bringIDEandBrowserToBackground':
    case 'setWindowSize':
    case 'prompt':
    case 'XRun':
    case 'XRunAndWait':
    case 'XDesktopAutomation':
    case 'setProxy':
    case 'run':
    case 'executeScript':
    case 'executeScript_Sandbox':
    case 'do':
    case 'repeatIf':
    case 'else':
    case 'elseif':
    case 'end':
    case 'if_v2':
    case 'while_v2':
    case 'gotoIf_v2':
    case 'times':
    case 'forEach':
    case 'OCRExtractScreenshot':
    case 'aiPrompt':
    case 'aiComputerUse':
      return false;
    default:
      return true;
  }
}
function canCommandSelect(str) {
  var canFind = canCommandFind(str);
  if (canFind) {
    return canFind;
  }
  switch (str) {
    case 'visualGetPixelColor':
    case 'setWindowSize':
      return true;
    default:
      return false;
  }
}
function isCommandAvailableForDesktop(command) {
  var scope = commandScopes[command];
  if (!scope) {
    return false;
  }
  return scope === CommandScope.All || scope === CommandScope.DesktopOnly;
}
function indentCreatedByCommand(str) {
  switch (str) {
    case 'if':
    case 'if_v2':
    case 'while':
    case 'while_v2':
    case 'do':
    case 'times':
    case 'forEach':
      return {
        selfIndent: 0,
        nextIndent: 1
      };
    case 'else':
    case 'elseif':
      return {
        selfIndent: -1,
        nextIndent: 1
      };
    case 'end':
    case 'endif':
    case 'endwhile':
    case 'repeatIf':
      return {
        selfIndent: -1,
        nextIndent: 0
      };
    default:
      return {
        selfIndent: 0,
        nextIndent: 0
      };
  }
}
function parseImageTarget(target) {
  if (!target || !target.length) {
    return null;
  }
  var reg = /^([^@#]+?\.png)(?:@([\d.]+))?(?:#(\d+))?(?:\[([^\]]+)\])?$/;
  var m = target.match(reg);
  if (!m) {
    return null;
  }
  // throw new Error(`Target should be like 'abc.png@0.8#1'`)

  var fileName = m[1];
  var confidence = m[2] ? parseFloat(m[2]) : undefined;
  var index = m[3] ? parseInt(m[3]) - 1 : undefined;
  var imageUrl = m[4];
  return {
    fileName: fileName,
    confidence: confidence,
    index: index,
    imageUrl: imageUrl
  };
}

/***/ }),

/***/ 92950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.accurateOffset = accurateOffset;
exports.assertLocator = assertLocator;
exports.bindDrag = exports.bindContentEditableChange = void 0;
exports.canvasFromSVG = canvasFromSVG;
exports.domText = exports.cssSelector = void 0;
exports.elementByElementFromPoint = elementByElementFromPoint;
exports.getAncestor = getAncestor;
exports.getElementByLocator = getElementByLocator;
exports.getElementByXPath = getElementByXPath;
exports.getElementsByXPath = getElementsByXPath;
exports.getPixel = getPixel;
exports.getStyle = void 0;
exports.hasAncestor = hasAncestor;
exports.imageBlobFromSVG = imageBlobFromSVG;
exports.imageDataFromUrl = imageDataFromUrl;
exports.isEditable = isEditable;
exports.isElementFromPoint = isElementFromPoint;
exports.isFirefox = isFirefox;
exports.isLocator = isLocator;
exports.pixel = exports.offset = exports.isVisible = exports.isPositionFixed = void 0;
exports.preloadImage = preloadImage;
exports.rgbToHex = rgbToHex;
exports.scaleRect = scaleRect;
exports.setStyle = exports.scrollTop = exports.scrollLeft = void 0;
exports.subImage = subImage;
exports.svgNodetoString = svgNodetoString;
exports.svgToBase64 = svgToBase64;
exports.viewportCoordinateByElementFromPoint = viewportCoordinateByElementFromPoint;
var _glob = __webpack_require__(42143);
var _utils = __webpack_require__(46580);
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
var getStyle = exports.getStyle = function getStyle(dom) {
  if (!dom) throw new Error('getStyle: dom does not exist');
  return getComputedStyle(dom);
};
var setStyle = exports.setStyle = function setStyle(dom, style) {
  if (!dom) throw new Error('setStyle: dom does not exist');
  for (var i = 0, keys = Object.keys(style), len = keys.length; i < len; i++) {
    dom.style[keys[i]] = style[keys[i]];
  }
  return dom;
};
var pixel = exports.pixel = function pixel(num) {
  if ((num + '').indexOf('px') !== -1) return num;
  return (num || 0) + 'px';
};
var bindDrag = exports.bindDrag = function bindDrag(options) {
  var onDragStart = options.onDragStart,
    onDragEnd = options.onDragEnd,
    onDrag = options.onDrag,
    $el = options.$el,
    _options$preventGloba = options.preventGlobalClick,
    preventGlobalClick = _options$preventGloba === void 0 ? true : _options$preventGloba,
    _options$doc = options.doc,
    doc = _options$doc === void 0 ? document : _options$doc;
  var isDragging = false;
  var startPos = {
    x: 0,
    y: 0
  };
  var onMouseDown = function onMouseDown(e) {
    isDragging = true;
    startPos = {
      x: e.screenX,
      y: e.screenY
    };
    onDragStart(e);
  };
  var onMouseUp = function onMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;
    var dx = e.screenX - startPos.x;
    var dy = e.screenY - startPos.y;
    onDragEnd(e, {
      dx: dx,
      dy: dy
    });
  };
  var onMouseMove = function onMouseMove(e) {
    if (!isDragging) return;
    var dx = e.screenX - startPos.x;
    var dy = e.screenY - startPos.y;
    onDrag(e, {
      dx: dx,
      dy: dy
    });
    e.preventDefault();
    e.stopPropagation();
  };
  var onClick = function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  if (preventGlobalClick) {
    doc.addEventListener('click', onClick, true);
  }
  doc.addEventListener('mousemove', onMouseMove, true);
  doc.addEventListener('mouseup', onMouseUp, true);
  $el.addEventListener('mousedown', onMouseDown, true);
  return function () {
    doc.removeEventListener('click', onClick, true);
    doc.removeEventListener('mousemove', onMouseMove, true);
    doc.removeEventListener('mouseup', onMouseUp, true);
    $el.removeEventListener('mousedown', onMouseDown, true);
  };
};
var bindContentEditableChange = exports.bindContentEditableChange = function bindContentEditableChange(options) {
  var onChange = options.onChange,
    _options$doc2 = options.doc,
    doc = _options$doc2 === void 0 ? document : _options$doc2;
  var currentCE = null;
  var oldContent = null;
  var onFocus = function onFocus(e) {
    if (!e.target || e.target.contentEditable !== 'true') return;
    currentCE = e.target;
    oldContent = currentCE.innerHTML;
  };
  var onBlur = function onBlur(e) {
    if (e.target !== currentCE) {
      // Do nothing
    } else if (currentCE && currentCE.innerHTML !== oldContent) {
      onChange(e);
    }
    currentCE = null;
    oldContent = null;
  };
  doc.addEventListener('focus', onFocus, true);
  doc.addEventListener('blur', onBlur, true);
  return function () {
    doc.removeEventListener('focus', onFocus, true);
    doc.removeEventListener('blur', onBlur, true);
  };
};
var scrollLeft = exports.scrollLeft = function scrollLeft(document) {
  return document.documentElement.scrollLeft;
};
var scrollTop = exports.scrollTop = function scrollTop(document) {
  return document.documentElement.scrollTop;
};
var domText = exports.domText = function domText($dom) {
  var it = $dom.innerText ? $dom.innerText.trim() : '';
  var tc = $dom.textContent;
  var pos = tc.toUpperCase().indexOf(it.toUpperCase());
  return pos === -1 ? it : tc.substr(pos, it.length);
};
var isVisible = exports.isVisible = function isVisible(el) {
  if (el === window.document) return true;
  if (!el) return true;
  var style = window.getComputedStyle(el);
  if (style.display === 'none' || style.opacity === '0' || style.visibility === 'hidden') return false;
  return isVisible(el.parentNode);
};
var cssSelector = exports.cssSelector = function cssSelector(dom) {
  if (!dom) return '';
  if (dom.nodeType !== 1) return '';
  if (dom.tagName === 'BODY') return 'body';
  if (dom.id) return '#' + dom.id;
  var classes = dom.className.split(/\s+/g).filter(function (item) {
    return item && item.length;
  });
  var children = Array.from(dom.parentNode ? dom.parentNode.childNodes : []).filter(function ($el) {
    return $el.nodeType === 1;
  });
  var sameTag = children.filter(function ($el) {
    return $el.tagName === dom.tagName;
  });
  var sameClass = children.filter(function ($el) {
    var cs = typeof $el.className === 'string' ? $el.className.split(/\s+/g) : [];
    return _utils.and.apply(void 0, _toConsumableArray(classes.map(function (c) {
      return cs.indexOf(c) !== -1;
    })));
  });
  var extra = '';
  if (sameTag.length === 1) {
    extra = '';
  } else if (classes.length && sameClass.length === 1) {
    extra = '.' + classes.join('.');
  } else {
    extra = ':nth-child(' + (1 + children.findIndex(function (item) {
      return item === dom;
    })) + ')';
  }
  var me = dom.tagName.toLowerCase() + extra;

  // Note: browser will add an extra 'tbody' when tr directly in table, which will cause an wrong selector,
  // so the hack is to remove all tbody here
  var ret = cssSelector(dom.parentNode) + ' > ' + me;
  return ret;
  // return ret.replace(/\s*>\s*tbody\s*>?/g, ' ')
};
var isPositionFixed = exports.isPositionFixed = function isPositionFixed($dom) {
  if (!$dom || $dom === document.documentElement || $dom === document.body) return false;
  return getComputedStyle($dom)['position'] === 'fixed' || isPositionFixed($dom.parentNode);
};
var offset = exports.offset = function offset(dom) {
  if (!dom) return {
    left: 0,
    top: 0
  };
  var rect = dom.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
};
function accurateOffset(dom) {
  if (!dom) return {
    left: 0,
    top: 0
  };
  var doc = dom.ownerDocument;
  if (!doc || dom === doc.documentElement) return {
    left: 0,
    top: 0
  };
  var parentOffset = accurateOffset(dom.offsetParent);
  return {
    left: parentOffset.left + dom.offsetLeft,
    top: parentOffset.top + dom.offsetTop
  };
}
function preloadImage(url) {
  return new Promise(function (resolve, reject) {
    var $img = new Image();
    $img.onload = function () {
      resolve({
        $img: $img,
        width: $img.width,
        height: $img.height
      });
    };
    $img.onerror = function (e) {
      reject(e);
    };
    $img.src = url;
  });
}
function isFirefox() {
  return /Firefox/.test(window.navigator.userAgent);
}
function svgNodetoString(svgNode) {
  return svgNode.outerHTML;
}
function svgToBase64(str) {
  return 'data:image/svg+xml;base64,' + window.btoa(str);
}
function canvasFromSVG(str) {
  return new Promise(function (resolve, reject) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = document.createElement('img');
    var b64 = svgToBase64(str);
    var mw = str.match(/<svg[\s\S]*?width="(.*?)"/m);
    var mh = str.match(/<svg[\s\S]*?height="(.*?)"/m);
    var w = parseInt(mw[1], 10);
    var h = parseInt(mh[1], 10);
    img.src = b64;
    img.onload = function () {
      c.width = w;
      c.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(c);
    };
    img.onerror = function (e) {
      reject(e);
    };
  });
}
function imageBlobFromSVG(str) {
  var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/png';
  var quality = arguments.length > 2 ? arguments[2] : undefined;
  return canvasFromSVG(str).then(function (canvas) {
    var p = new Promise(function (resolve, reject) {
      try {
        canvas.toBlob(resolve, mimeType, quality);
      } catch (e) {
        reject(e);
      }
    });
    return p;
  });
}
function imageDataFromUrl(url) {
  return preloadImage(url).then(function (_ref) {
    var $img = _ref.$img,
      width = _ref.width,
      height = _ref.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage($img, 0, 0, width, height);
    return context.getImageData(0, 0, width, height);
  });
}
function subImage(imageUrl, rect) {
  return new Promise(function (resolve, reject) {
    var $img = new Image();
    $img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = rect.width;
      canvas.height = rect.height;
      var context = canvas.getContext('2d');
      context.drawImage($img, 0, 0, $img.width, $img.height, -1 * rect.x, -1 * rect.y, $img.width, $img.height);
      resolve(canvas.toDataURL());
    };
    $img.src = imageUrl;
  });
}
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw 'Invalid color component';
  }
  return (r << 16 | g << 8 | b).toString(16);
}
function getPixel(params) {
  var x = params.x,
    y = params.y,
    dataUrl = params.dataUrl;
  return new Promise(function (resolve, reject) {
    var $img = new Image();
    $img.onload = function () {
      var imgWidth = $img.width;
      var imgHeight = $img.height;
      if (x < 0 || y < 0 || x > imgWidth || y > imgHeight) {
        return reject(new Error("".concat(x, ", ").concat(y, " is out of screenshot bound 0, 0 ~ ").concat(imgWidth, ", ").concat(imgHeight)));
      }
      var canvas = document.createElement('canvas');
      canvas.width = x + 5;
      canvas.height = y + 5;
      var context = canvas.getContext('2d');
      context.drawImage($img, 0, 0, x + 5, y + 5, 0, 0, x + 5, y + 5);
      var hex;
      try {
        var p = context.getImageData(x, y, 1, 1).data;
        hex = '#' + ('000000' + rgbToHex(p[0], p[1], p[2])).slice(-6);
        resolve(hex);
      } catch (err) {
        var e = err;
        reject(new Error("Failed to get pixel color" + (e !== null && e !== void 0 && e.message ? ": ".concat(e.message, ".") : '.')));
      }
    };
    $img.src = dataUrl;
  });
}
function scaleRect(rect, scale) {
  return {
    x: scale * rect.x,
    y: scale * rect.y,
    width: scale * rect.width,
    height: scale * rect.height
  };
}
function isEditable(el) {
  if (el.contentEditable === 'true') {
    return true;
  }
  var tag = (el.tagName || '').toLowerCase();
  if (['input', 'textarea'].indexOf(tag) === -1) {
    return false;
  }
  var disabled = el.disabled;
  var readOnly = el.readOnly;
  return !disabled && !readOnly;
}
function hasAncestor(el, checkAncestor) {
  var node = el;
  while (node) {
    if (checkAncestor(node)) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
function getAncestor(el, checkAncestor) {
  var node = el;
  while (node) {
    if (checkAncestor(node)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}
function getElementsByXPath(xpath) {
  var snapshot = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var list = [];
  for (var i = 0, len = snapshot.snapshotLength; i < len; i++) {
    list.push(snapshot.snapshotItem(i));
  }
  return list;
}
function getElementByXPath(xpath) {
  return getElementsByXPath(xpath)[0];
}
function assertLocator(str) {
  var i = str.indexOf('=');

  // xpath
  if (/^\//.test(str)) return true;
  // efp
  if (/^#elementfrompoint/i.test(str)) return true;
  // Above is all locators that doesn't require '='
  if (i === -1) throw new Error('invalid locator, ' + str);
  var method = str.substr(0, i);
  var value = str.substr(i + 1);
  if (!value || !value.length) throw new Error('invalid locator, ' + str);
  switch (method && method.toLowerCase()) {
    case 'id':
    case 'name':
    case 'identifier':
    case 'link':
    case 'linktext':
    case 'partiallinktext':
    case 'css':
    case 'xpath':
      return true;
    default:
      throw new Error('invalid locator, ' + str);
  }
}
function isLocator(str) {
  try {
    assertLocator(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Note: parse the locator and return the element found accordingly
function getElementByLocator(str, shouldWaitForVisible) {
  var i = str.indexOf('=');
  var el;
  if (/^\//.test(str)) {
    el = getElementByXPath(str);
  } else if (/^#elementfrompoint/i.test(str.trim())) {
    el = elementByElementFromPoint(str);
  } else if (i === -1) {
    throw new Error('getElementByLocator: invalid locator, ' + str);
  } else {
    var method = str.substr(0, i);
    var value = str.substr(i + 1);
    var lowerMethod = method && method.toLowerCase();
    switch (lowerMethod) {
      case 'id':
        el = document.getElementById(value);
        break;
      case 'name':
        el = document.getElementsByName(value)[0];
        break;
      case 'identifier':
        el = document.getElementById(value) || document.getElementsByName(value)[0];
        break;
      case 'link-notused':
        {
          var links = [].slice.call(document.getElementsByTagName('a'));
          // Note: there are cases such as 'link=exact:xxx'
          var realVal = value.replace(/^exact:/, '');
          // Note: position support. eg. link=Download@POS=3
          var match = realVal.match(/^(.+)@POS=(\d+)$/i);
          var index = 0;
          if (match) {
            realVal = match[1];
            index = parseInt(match[2]) - 1;
          }

          // Note: use textContent instead of innerText to avoid influence from text-transform
          var candidates = links.filter(function (a) {
            return (0, _glob.globMatch)(realVal, domText(a));
          });
          el = candidates[index];
          break;
        }
      case 'link':
      case 'linktext':
      case 'partiallinktext':
        {
          var _links = [].slice.call(document.getElementsByTagName('a'));
          // Note: position support. eg. link=Download@POS=3
          var _match = value.match(/^(.+)@POS=(\d+)$/i);
          var _realVal = value;
          var _index = 0;
          if (_match) {
            _realVal = _match[1];
            _index = parseInt(_match[2]) - 1;
          }
          var pattern = lowerMethod === 'partiallinktext' ? "*".concat(_realVal, "*") : _realVal;
          var _candidates = _links.filter(function (link) {
            return (0, _glob.globMatch)(pattern, domText(link), {
              flags: 'im'
            });
          });
          el = _candidates[_index];
          break;
        }
      case 'css':
        el = document.querySelector(value);
        break;
      case 'xpath':
        el = getElementByXPath(value);
        break;
      default:
        throw new Error('getElementByLocator: unsupported locator method, ' + method);
    }
  }
  if (!el) {
    throw new Error('getElementByLocator: fail to find element based on the locator, ' + str);
  }
  if (shouldWaitForVisible && !isVisible(el)) {
    throw new Error('getElementByLocator: element is found but not visible yet');
  }
  return el;
}
function isElementFromPoint(str) {
  return /^#elementfrompoint/i.test(str.trim());
}
function viewportCoordinateByElementFromPoint(str) {
  var reg = /^#elementfrompoint\s*\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/i;
  var m = str.trim().match(reg);
  if (!m) {
    throw new Error("Invalid '#elementfrompoint' expression");
  }
  var viewportX = parseFloat(m[1]);
  var viewportY = parseFloat(m[2]);
  if (viewportX <= 0 || viewportY <= 0) {
    throw new Error("'#elementfrompoint' only accepts positive numbers");
  }
  return [viewportX, viewportY];
}
function elementByElementFromPoint(str) {
  var _viewportCoordinateBy = viewportCoordinateByElementFromPoint(str),
    _viewportCoordinateBy2 = _slicedToArray(_viewportCoordinateBy, 2),
    x = _viewportCoordinateBy2[0],
    y = _viewportCoordinateBy2[1];
  var el = document.elementFromPoint(x, y);
  return el;
}

/***/ }),

/***/ 14125:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.utf8 = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Adapted from: http://www.json.org/JSON_checker/utf8_decode.c
var Utf8Decoder = /*#__PURE__*/function () {
  function Utf8Decoder(input) {
    _classCallCheck(this, Utf8Decoder);
    this.input = input;
    this.position = 0;
  }

  /**
   * Gets the next byte.
   * @returns UTF8_END if there are no more bytes, next byte otherwise.
   */
  _createClass(Utf8Decoder, [{
    key: "getNextByte",
    value: function getNextByte() {
      if (this.position >= this.input.length) {
        return Utf8Decoder.END;
      }
      var c = this.input[this.position] & 0xff;
      ++this.position;
      return c;
    }

    /**
     *  Gets the 6-bit payload of the next continuation byte.
     * @returns Contination byte if it's valid, UTF8_ERROR otherwise.
     */
  }, {
    key: "getNextContinuationByte",
    value: function getNextContinuationByte() {
      var c = this.getNextByte();
      return (c & 0xc0) == 0x80 ? c & 0x3f : Utf8Decoder.ERROR;
    }

    /**
     * Decodes next codepoint.
     * @returns `Utf8Decoder.END` for end of stream, next codepoint if it's valid, `Utf8Decoder.ERROR` otherwise.
     */
  }, {
    key: "decodeNext",
    value: function decodeNext() {
      if (this.position >= this.input.length) {
        return this.position === this.input.length ? Utf8Decoder.END : Utf8Decoder.ERROR;
      }
      var c = this.getNextByte();

      // Zero continuation (0 to 127)
      if ((c & 0x80) == 0) {
        return c;
      }

      // One continuation (128 to 2047)
      if ((c & 0xe0) == 0xc0) {
        var c1 = this.getNextContinuationByte();
        if (c1 >= 0) {
          var r = (c & 0x1f) << 6 | c1;
          if (r >= 128) {
            return r;
          }
        }

        // Two continuations (2048 to 55295 and 57344 to 65535)
      } else if ((c & 0xf0) == 0xe0) {
        var _c = this.getNextContinuationByte();
        var c2 = this.getNextContinuationByte();
        if ((_c | c2) >= 0) {
          var _r = (c & 0x0f) << 12 | _c << 6 | c2;
          if (_r >= 2048 && (_r < 55296 || _r > 57343)) {
            return _r;
          }
        }

        // Three continuations (65536 to 1114111)
      } else if ((c & 0xf8) == 0xf0) {
        var _c2 = this.getNextContinuationByte();
        var _c3 = this.getNextContinuationByte();
        var c3 = this.getNextContinuationByte();
        if ((_c2 | _c3 | c3) >= 0) {
          var _r2 = (c & 0x07) << 18 | _c2 << 12 | _c3 << 6 | c3;
          if (_r2 >= 65536 && _r2 <= 1114111) {
            return _r2;
          }
        }
      }
      return Utf8Decoder.ERROR;
    }
  }]);
  return Utf8Decoder;
}();
_defineProperty(Utf8Decoder, "REPLACEMENT_CHARACTER", "\uFFFD");
_defineProperty(Utf8Decoder, "END", -1);
_defineProperty(Utf8Decoder, "ERROR", -2);
var utf8;
(function (_utf) {
  function isValid(input) {
    var decoder = new Utf8Decoder(input);
    while (true) {
      var cp = decoder.decodeNext();
      switch (cp) {
        case Utf8Decoder.END:
          return true;
        case Utf8Decoder.ERROR:
          return false;
        default:
        // ignore
      }
    }
  }
  _utf.isValid = isValid;
  function decode(input) {
    var decoder = new Utf8Decoder(input);
    var output = "";
    while (true) {
      var cp = decoder.decodeNext();
      if (cp === Utf8Decoder.END) {
        break;
      }
      output += cp !== Utf8Decoder.ERROR ? String.fromCodePoint(cp) : Utf8Decoder.REPLACEMENT_CHARACTER;
    }
    return output;
  }
  _utf.decode = decode;
})(utf8 || (exports.utf8 = utf8 = {}));

/***/ }),

/***/ 73632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PublicMethodTypes = exports.MethodTypeInvocationNames = exports.MethodTypeFriendlyNames = void 0;
var _kantuFileAccess = __webpack_require__(11434);
/**
 * Non-external method types which the user can use via UI.
 */
var PublicMethodTypes = exports.PublicMethodTypes = [_kantuFileAccess.KantuFileAccess.MethodType.GetFileSystemEntries, _kantuFileAccess.KantuFileAccess.MethodType.GetDirectories, _kantuFileAccess.KantuFileAccess.MethodType.GetFiles, _kantuFileAccess.KantuFileAccess.MethodType.DirectoryExists, _kantuFileAccess.KantuFileAccess.MethodType.FileExists, _kantuFileAccess.KantuFileAccess.MethodType.CreateDirectory, _kantuFileAccess.KantuFileAccess.MethodType.RemoveDirectory, _kantuFileAccess.KantuFileAccess.MethodType.CopyFile, _kantuFileAccess.KantuFileAccess.MethodType.MoveFile, _kantuFileAccess.KantuFileAccess.MethodType.DeleteFile, _kantuFileAccess.KantuFileAccess.MethodType.ReadAllText, _kantuFileAccess.KantuFileAccess.MethodType.WriteAllText, _kantuFileAccess.KantuFileAccess.MethodType.AppendAllText, _kantuFileAccess.KantuFileAccess.MethodType.ReadAllBytes, _kantuFileAccess.KantuFileAccess.MethodType.WriteAllBytes, _kantuFileAccess.KantuFileAccess.MethodType.AppendAllBytes];
var MethodTypeFriendlyNames = exports.MethodTypeFriendlyNames = ["GetVersion", "GetFileSystemEntries", "GetDirectories", "GetFiles", "GetFileSystemEntryInfo", "GetSpecialFolderPath", "DirectoryExists", "FileExists", "CreateDirectory", "RemoveDirectory", "CopyFile", "MoveFile", "DeleteFile", "ReadAllText", "WriteAllText", "AppendAllText", "ReadAllBytes", "WriteAllBytes", "AppendAllBytes", "GetMaxFileRange", "GetFileSize", "ReadFileRange", "RunProcess"];
var MethodTypeInvocationNames = exports.MethodTypeInvocationNames = ["get_version", "get_file_system_entries", "get_directories", "get_files", "get_file_system_entry_info", "get_special_folder_path", "directory_exists", "file_exists", "create_directory", "remove_directory", "copy_file", "move_file", "delete_file", "read_all_text", "write_all_text", "append_all_text", "read_all_bytes", "write_all_bytes", "append_all_bytes", "get_max_file_range", "get_file_size", "read_file_range", "run_process"];

/***/ }),

/***/ 89937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getNativeFileSystemAPI = exports.SpecialFolder = void 0;
var _constants = __webpack_require__(73632);
var _kantuFileAccessHost = __webpack_require__(81173);
var _ts_utils = __webpack_require__(1601);
var _log = _interopRequireDefault(__webpack_require__(89130));
var _path = _interopRequireDefault(__webpack_require__(26513));
var _utf = __webpack_require__(14125);
var _base = __webpack_require__(81909);
var _utils = __webpack_require__(46580);
var _semver = _interopRequireDefault(__webpack_require__(99589));
var _config = _interopRequireDefault(__webpack_require__(8747));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SpecialFolder = exports.SpecialFolder = /*#__PURE__*/function (SpecialFolder) {
  SpecialFolder[SpecialFolder["UserProfile"] = 0] = "UserProfile";
  SpecialFolder[SpecialFolder["UserDesktop"] = 1] = "UserDesktop";
  return SpecialFolder;
}({});
var getNativeFileSystemAPI = exports.getNativeFileSystemAPI = (0, _ts_utils.singletonGetter)(function () {
  var nativeHost = new _kantuFileAccessHost.KantuFileAccessHost();
  var pReady = nativeHost.connectAsync()["catch"](function (e) {
    _log["default"].warn('pReady - error', e);
    throw e;
  });
  var pendingRequestCount = 0;
  var api = _constants.MethodTypeInvocationNames.reduce(function (prev, method) {
    var camel = (0, _ts_utils.snakeToCamel)(method);
    if (prev[camel]) {
      return prev;
    }
    prev[camel] = function () {
      var fn = function fn(params) {
        return pReady.then(function () {
          pendingRequestCount += 1;
          return nativeHost.invokeAsync(method, params);
        }).then(function (data) {
          pendingRequestCount -= 1;
          return data;
        }, function (e) {
          //pendingRequestCount -= 1 // caused ~10s delay if no xmodule installed
          pendingRequestCount = 0;
          // Note: Looks like for now whenever there is an error, you have to reconnect native host
          // otherwise, all commands return "Disconnected" afterwards
          var typeSafeAPI = api;
          typeSafeAPI.reconnect()["catch"](function () {});
          throw e;
        });
      };
      return fn;
    }();
    return prev;
  }, {
    reconnect: function reconnect() {
      return (0, _ts_utils.until)('pendingRequestCount === 0', function () {
        return {
          pass: pendingRequestCount === 0,
          result: true
        };
      }).then(function () {
        (0, _log["default"])("FileSystem - reconnect", new Error().stack);
        nativeHost.disconnect();
        pReady = nativeHost.connectAsync();
        return pReady.then(function () {
          return api;
        });
      });
    },
    getEntries: function getEntries(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.getFileSystemEntries(params).then(function (res) {
        var errorCode = res.errorCode,
          entries = res.entries;
        if (params.brief) {
          return Promise.resolve({
            errorCode: errorCode,
            entries: entries.map(function (name) {
              return {
                name: name,
                length: 0,
                isDirectory: false,
                lastWriteTime: 0
              };
            })
          });
        }
        return Promise.all(entries.map(function (name) {
          var entryPath = _path["default"].join(params.path, name);
          return typeSafeAPI.getFileSystemEntryInfo({
            path: entryPath
          }).then(function (info) {
            return {
              name: name,
              length: info.length,
              isDirectory: info.isDirectory,
              lastWriteTime: info.lastWriteTime
            };
          });
        })).then(function (entryInfos) {
          return {
            errorCode: errorCode,
            entries: entryInfos
          };
        });
      });
    },
    ensureDir: function ensureDir(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.directoryExists({
        path: params.path
      }).then(function (exists) {
        if (exists) return true;
        return typeSafeAPI.ensureDir({
          path: _path["default"].dirname(params.path)
        }).then(function (done) {
          if (!done) return false;
          return typeSafeAPI.createDirectory({
            path: params.path
          });
        });
      })["catch"](function (e) {
        return false;
      });
    },
    readBigFile: function readBigFile(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.getFileSize(params).then(function (fileSize) {
        if (fileSize === 0) {
          return new Uint8Array(0);
        }
        var content = [];
        var go = function go(pos) {
          return typeSafeAPI.readFileRange({
            path: params.path,
            rangeStart: pos
          }).then(function (result) {
            var data = _base.base64.decode(result.buffer);
            if (data) {
              for (var i = 0; i < data.length; i++) {
                content.push(data[i]);
              }
            }
            if (result.rangeEnd <= pos || result.rangeEnd >= fileSize) {
              return new Uint8Array(content);
            }
            return go(result.rangeEnd);
          });
        };
        return go(0);
      });
    },
    isReadBigFileSupported: function isReadBigFileSupported() {
      var typeSafeAPI = api;
      return typeSafeAPI.getVersion().then(function (version) {
        return !_semver["default"].lt(version, _config["default"].xfile.minVersionToReadBigFile);
      });
    },
    readAllTextCompat: function readAllTextCompat(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.isReadBigFileSupported().then(function (supported) {
        if (!supported) {
          return typeSafeAPI.readAllText(params);
        }
        return typeSafeAPI.readBigFile(params).then(function (content) {
          var text = _utf.utf8.decode(content);
          return {
            errorCode: 0,
            content: text
          };
        });
      });
    },
    readAllBytesCompat: function readAllBytesCompat(params) {
      var typeSafeAPI = api;
      return typeSafeAPI.isReadBigFileSupported().then(function (supported) {
        if (!supported) {
          return typeSafeAPI.readAllBytes(params);
        }
        return typeSafeAPI.readBigFile(params).then(function (content) {
          return (0, _utils.blobToDataURL)(new Blob([content])).then(function (dataUrl) {
            return {
              errorCode: 0,
              content: dataUrl
            };
          });
        });
      });
    }
  });
  return api;
});

/***/ }),

/***/ 81173:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KantuFileAccessHost = void 0;
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
var KantuFileAccessHost = exports.KantuFileAccessHost = /*#__PURE__*/function (_NativeMessagingHost) {
  _inherits(KantuFileAccessHost, _NativeMessagingHost);
  function KantuFileAccessHost() {
    _classCallCheck(this, KantuFileAccessHost);
    return _callSuper(this, KantuFileAccessHost, [KantuFileAccessHost.HOST_NAME]);
  }
  return _createClass(KantuFileAccessHost);
}(_native_host.NativeMessagingHost);
_defineProperty(KantuFileAccessHost, "HOST_NAME", "com.a9t9.kantu.file_access");

/***/ }),

/***/ 11434:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KantuFileAccess = void 0;
var KantuFileAccess;
(function (_KantuFileAccess) {
  var MethodType = /*#__PURE__*/function (MethodType) {
    MethodType[MethodType["GetVersion"] = 0] = "GetVersion";
    MethodType[MethodType["GetFileSystemEntries"] = 1] = "GetFileSystemEntries";
    MethodType[MethodType["GetDirectories"] = 2] = "GetDirectories";
    MethodType[MethodType["GetFiles"] = 3] = "GetFiles";
    MethodType[MethodType["DirectoryExists"] = 4] = "DirectoryExists";
    MethodType[MethodType["FileExists"] = 5] = "FileExists";
    MethodType[MethodType["GetFileSystemEntryInfo"] = 6] = "GetFileSystemEntryInfo";
    MethodType[MethodType["GetSpecialFolderPath"] = 7] = "GetSpecialFolderPath";
    MethodType[MethodType["CreateDirectory"] = 8] = "CreateDirectory";
    MethodType[MethodType["RemoveDirectory"] = 9] = "RemoveDirectory";
    MethodType[MethodType["CopyFile"] = 10] = "CopyFile";
    MethodType[MethodType["MoveFile"] = 11] = "MoveFile";
    MethodType[MethodType["DeleteFile"] = 12] = "DeleteFile";
    MethodType[MethodType["ReadAllText"] = 13] = "ReadAllText";
    MethodType[MethodType["WriteAllText"] = 14] = "WriteAllText";
    MethodType[MethodType["AppendAllText"] = 15] = "AppendAllText";
    MethodType[MethodType["ReadAllBytes"] = 16] = "ReadAllBytes";
    MethodType[MethodType["WriteAllBytes"] = 17] = "WriteAllBytes";
    MethodType[MethodType["AppendAllBytes"] = 18] = "AppendAllBytes";
    MethodType[MethodType["GetMaxFileRange"] = 19] = "GetMaxFileRange";
    MethodType[MethodType["GetFileSize"] = 20] = "GetFileSize";
    MethodType[MethodType["ReadFileRange"] = 21] = "ReadFileRange";
    MethodType[MethodType["RunProcess"] = 22] = "RunProcess";
    return MethodType;
  }({});
  _KantuFileAccess.MethodType = MethodType;
  var ErrorCode = /*#__PURE__*/function (ErrorCode) {
    ErrorCode[ErrorCode["Succeeded"] = 0] = "Succeeded";
    ErrorCode[ErrorCode["Failed"] = 1] = "Failed";
    ErrorCode[ErrorCode["Truncated"] = 2] = "Truncated";
    return ErrorCode;
  }({});
  _KantuFileAccess.ErrorCode = ErrorCode;
})(KantuFileAccess || (exports.KantuFileAccess = KantuFileAccess = {}));

/***/ }),

/***/ 39356:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NativeMessagingHost = void 0;
var _config = _interopRequireDefault(__webpack_require__(8747));
var _lodash = _interopRequireDefault(__webpack_require__(20181));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /// <reference types="chrome"/>
var InvocationQueueItem = /*#__PURE__*/function () {
  function InvocationQueueItem(id, method, params, callback) {
    _classCallCheck(this, InvocationQueueItem);
    this.requestObject = {
      id: id,
      method: method,
      params: params
    };
    this.callback = callback;
  }
  _createClass(InvocationQueueItem, [{
    key: "request",
    get: function get() {
      return this.requestObject;
    }
  }]);
  return InvocationQueueItem;
}();
var NativeMessagingHost = exports.NativeMessagingHost = /*#__PURE__*/function () {
  function NativeMessagingHost(hostName) {
    var _this = this;
    _classCallCheck(this, NativeMessagingHost);
    _defineProperty(this, "ongoingInvocationCount", 0);
    _defineProperty(this, "debouncedDisconnectOnIdle", (0, _lodash["default"])(function () {
      if (_this.ongoingInvocationCount === 0) {
        _this.disconnect();
      } else {
        _this.debouncedDisconnectOnIdle();
      }
    }, _config["default"].nativeMessaging.idleTimeBeforeDisconnect));
    this.internalHostName = hostName;
    this.nextInvocationId = 1;
    this.queue = new Array();
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }
  _createClass(NativeMessagingHost, [{
    key: "processResponse",
    value: function processResponse(id, result, error) {
      var callback = undefined;
      for (var i = 0; i < this.queue.length; ++i) {
        var entry = this.queue[i];
        if (entry.request.id === id) {
          callback = entry.callback;
          this.queue.splice(i, 1);
          break;
        }
      }
      if (callback) {
        callback(result, error);
      }
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(message) {
      var response = message;
      if (typeof response.id !== "number") {
        return;
      }
      this.ongoingInvocationCount = Math.max(0, this.ongoingInvocationCount - 1);
      this.processResponse(response.id, response.result, response.error);
      if (response.error) {
        this.disconnect();
      }
    }
  }, {
    key: "handleDisconnect",
    value: function handleDisconnect() {
      this.disconnect();
    }
  }, {
    key: "hostName",
    get: function get() {
      return this.internalHostName;
    }
  }, {
    key: "connectAsync",
    value: function connectAsync() {
      // Commented out the following line to keep the connection to native messaging
      // to keep the service worker always alive
      // note that it only applies to Chrome 100+
      // reference: https://github.com/teamdocs/selenium-ide-chrome-light-2017/issues/884#issuecomment-1088739538
      //
      // this.debouncedDisconnectOnIdle();

      if (this.port) {
        return this.invokeAsync("get_version", undefined);
      }
      this.port = chrome.runtime.connectNative(this.hostName);
      this.port.onMessage.addListener(this.handleMessage);
      this.port.onDisconnect.addListener(this.handleDisconnect);
      this.ongoingInvocationCount = 0;
      return this.invokeAsync("get_version", undefined);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var message = chrome.runtime.lastError && chrome.runtime.lastError.message || "Disconnected";
      if (this.port) {
        this.port.disconnect();
        this.port = undefined;
      }

      // Discard all queued invocations
      var invocationIdArray = this.queue.map(function (x) {
        return x.request.id;
      });
      var _iterator = _createForOfIteratorHelper(invocationIdArray),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var id = _step.value;
          this.processResponse(id, undefined, {
            message: message
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.queue = new Array();
    }
  }, {
    key: "invoke",
    value: function () {
      var _invoke = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, params, callback) {
        var id, item;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (this.port) {
                _context.next = 3;
                break;
              }
              _context.next = 3;
              return this.connectAsync();
            case 3:
              id = this.nextInvocationId++;
              item = new InvocationQueueItem(id, method, params, callback);
              this.ongoingInvocationCount++;
              this.queue.push(item);
              this.port.postMessage(item.request);

              // "Chrome 100: native messaging port keeps service worker alive"
              // reference: https://developer.chrome.com/docs/extensions/whatsnew/#m100-native-msg-lifetime
              //
              // Commented out the following line to keep the connection to native messaging
              // to keep the service worker always alive
              // note that it only applies to Chrome 100+
              // reference: https://github.com/teamdocs/selenium-ide-chrome-light-2017/issues/884#issuecomment-1088739538
              //
              // this.debouncedDisconnectOnIdle();
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function invoke(_x, _x2, _x3) {
        return _invoke.apply(this, arguments);
      }
      return invoke;
    }()
  }, {
    key: "invokeAsync",
    value: function invokeAsync(method, params) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.invoke(method, params, function (result, error) {
          if (chrome.runtime.lastError) {
            error = new Error(chrome.runtime.lastError.message);
          }
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }]);
  return NativeMessagingHost;
}();

/***/ }),

/***/ 12702:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.delegateBrowserFileSystemAPI = delegateBrowserFileSystemAPI;
exports.getBrowserFileSystem = getBrowserFileSystem;
exports.handleDelegatedBrowserFileSystemAPI = handleDelegatedBrowserFileSystemAPI;
var _filesystem = _interopRequireDefault(__webpack_require__(61222));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var FS_API = 'fs_api';
var fsFuncs = ['list', 'readFile', 'writeFile', 'removeFile', 'moveFile', 'copyFile', 'getDirectory', 'getMetadata', 'exists', 'existsStat', 'ensureDirectory', 'rmdir', 'rmdirR'];
function getBrowserFileSystem() {
  return _filesystem["default"] !== null && _filesystem["default"] !== void 0 ? _filesystem["default"] : delegateBrowserFileSystemAPI();
}
function delegateBrowserFileSystemAPI() {
  return fsFuncs.reduce(function (api, funcName) {
    api[funcName] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
          type: FS_API,
          method: funcName,
          args: JSON.stringify(args)
        }, function (response) {
          if (response.error.length > 0) {
            return reject(new Error(response.error));
          }
          if (response.result === "undefined") {
            return resolve(undefined);
          }
          try {
            resolve(JSON.parse(response.result));
          } catch (e) {
            reject(e);
          }
        });
      });
    };
    return api;
  }, {});
}
function handleDelegatedBrowserFileSystemAPI() {
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if ((message === null || message === void 0 ? void 0 : message.type) != FS_API) {
      return;
    }
    if (!_filesystem["default"]) {
      sendResponse({
        result: "",
        error: "fs is not available on handler side"
      });
      return true;
    }
    var method = message.method;
    if (!fsFuncs.includes(method)) {
      sendResponse({
        result: "",
        error: "unknown fs method: ".concat(method)
      });
      return true;
    }
    var args;
    try {
      args = JSON.parse(message.args);
    } catch (e) {
      sendResponse({
        result: "",
        error: e.message
      });
      return true;
    }
    var fn = _filesystem["default"][method];
    fn.apply(void 0, _toConsumableArray(args)).then(function (data) {
      sendResponse({
        result: data === undefined ? "undefined" : JSON.stringify(data),
        error: ""
      });
    }, function (e) {
      sendResponse({
        result: "",
        error: e.message
      });
    });
    return true;
  });
}

/***/ }),

/***/ 83785:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ENOTEMPTY = exports.ENOTDIR = exports.ENOENT = exports.EMFILE = exports.EISDIR = exports.EEXIST = exports.EACCES = void 0;
var _ts_utils = __webpack_require__(1601);
// reference: https://nodejs.org/api/errors.html#errors_common_system_errors

var EACCES = exports.EACCES = (0, _ts_utils.errorClassFactory)('EACCES');
var EEXIST = exports.EEXIST = (0, _ts_utils.errorClassFactory)('EEXIST');
var EISDIR = exports.EISDIR = (0, _ts_utils.errorClassFactory)('EISDIR');
var EMFILE = exports.EMFILE = (0, _ts_utils.errorClassFactory)('EMFILE');
var ENOENT = exports.ENOENT = (0, _ts_utils.errorClassFactory)('ENOENT');
var ENOTDIR = exports.ENOTDIR = (0, _ts_utils.errorClassFactory)('ENOTDIR');
var ENOTEMPTY = exports.ENOTEMPTY = (0, _ts_utils.errorClassFactory)('ENOTEMPTY');

/***/ }),

/***/ 86086:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NativeFileSystemFlatStorage = exports.ErrorWithCode = void 0;
exports.getErrorMessageForCode = getErrorMessageForCode;
exports.getNativeFileSystemFlatStorage = void 0;
var _storage = __webpack_require__(82798);
var _filesystem = __webpack_require__(89937);
var _kantuFileAccess = __webpack_require__(11434);
var _path = _interopRequireDefault(__webpack_require__(26513));
var _utils = __webpack_require__(46580);
var _ts_utils = __webpack_require__(1601);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
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
var NativeFileSystemFlatStorage = exports.NativeFileSystemFlatStorage = /*#__PURE__*/function (_FlatStorage) {
  _inherits(NativeFileSystemFlatStorage, _FlatStorage);
  function NativeFileSystemFlatStorage(opts) {
    var _this;
    _classCallCheck(this, NativeFileSystemFlatStorage);
    _this = _callSuper(this, NativeFileSystemFlatStorage, [{
      encode: opts.encode,
      decode: opts.decode
    }]);
    _defineProperty(_assertThisInitialized(_this), "listFilter", function (list) {
      return list;
    });
    _defineProperty(_assertThisInitialized(_this), "displayedCount", 0);
    _defineProperty(_assertThisInitialized(_this), "totalCount", 0);
    var baseDir = opts.baseDir,
      rootDir = opts.rootDir,
      extensions = opts.extensions,
      _opts$shouldKeepExt = opts.shouldKeepExt,
      shouldKeepExt = _opts$shouldKeepExt === void 0 ? false : _opts$shouldKeepExt,
      listFilter = opts.listFilter;
    if (!baseDir || baseDir === '/') {
      throw new Error("Invalid baseDir, ".concat(baseDir));
    }
    _this.rootDir = rootDir;
    _this.baseDir = baseDir;
    _this.extensions = extensions;
    _this.shouldKeepExt = shouldKeepExt;
    if (listFilter) {
      _this.listFilter = listFilter;
    }
    _this.fs = (0, _filesystem.getNativeFileSystemAPI)();
    return _this;
  }
  _createClass(NativeFileSystemFlatStorage, [{
    key: "getDisplayCount",
    value: function getDisplayCount() {
      return this.displayedCount;
    }
  }, {
    key: "getTotalCount",
    value: function getTotalCount() {
      return this.totalCount;
    }
  }, {
    key: "readAll",
    value: function readAll() {
      var _this2 = this;
      var readFileType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Text';
      var onErrorFiles = arguments.length > 1 ? arguments[1] : undefined;
      return this.list().then(function (items) {
        return Promise.all(items.map(function (item) {
          return _this2.read(item.fileName, readFileType).then(function (content) {
            return {
              content: content,
              fileName: item.fileName
            };
          })
          // Note: Whenever there is error in reading file,
          // return null
          ["catch"](function (e) {
            return {
              fileName: item.fileName,
              fullFilePath: _this2.filePath(item.fileName),
              error: new Error("Error in parsing ".concat(_this2.filePath(item.fileName), ":\n").concat(e.message))
            };
          });
        })).then(function (list) {
          var errorFiles = list.filter(function (item) {
            return item.error;
          });
          if (onErrorFiles) onErrorFiles(errorFiles);
          return list.filter(function (item) {
            return item.content;
          });
        });
      });
    }
  }, {
    key: "getLink",
    value: function getLink(fileName) {
      return this.read(fileName, 'DataURL');
    }
  }, {
    key: "__list",
    value: function __list() {
      var _this3 = this;
      return this.ensureDir().then(function () {
        return _this3.fs.getEntries({
          path: _path["default"].join(_this3.rootDir, _this3.baseDir),
          extensions: _this3.extensions
        }).then(function (data) {
          var entries = data.entries;
          var errorCode = data.errorCode;
          if (errorCode !== _kantuFileAccess.KantuFileAccess.ErrorCode.Succeeded) {
            throw new ErrorWithCode(getErrorMessageForCode(errorCode), errorCode);
          }
          var convertName = function convertName(entryName) {
            return _this3.shouldKeepExt ? entryName : _this3.removeExt(entryName);
          };
          var convert = function convert(entry) {
            return {
              dir: _this3.baseDir,
              fileName: convertName(entry.name),
              lastModified: new Date(entry.lastWriteTime),
              size: (0, _storage.readableSize)(entry.length)
            };
          };
          var allList = entries.map(convert);
          return Promise.resolve(_this3.listFilter(allList)).then(function (displayList) {
            _this3.totalCount = allList.length;
            _this3.displayedCount = displayList.length;
            return displayList;
          });
        });
      });
    }
  }, {
    key: "exists",
    value: function exists(fileName) {
      return this.fs.fileExists({
        path: this.filePath(fileName)
      });
    }
  }, {
    key: "read",
    value: function read(fileName, type) {
      var _this4 = this;
      var onResolve = function onResolve(res) {
        if (res.errorCode !== _kantuFileAccess.KantuFileAccess.ErrorCode.Succeeded) {
          throw new ErrorWithCode("".concat(fileName, ": ") + getErrorMessageForCode(res.errorCode), res.errorCode);
        }
        var rawContent = res.content;
        var intermediate = function () {
          switch (type) {
            case 'Text':
            case 'DataURL':
              return rawContent;
            case 'ArrayBuffer':
              return (0, _utils.dataURItoArrayBuffer)(rawContent);
            case 'BinaryString':
              return (0, _utils.arrayBufferToString)((0, _utils.dataURItoArrayBuffer)(rawContent));
          }
        }();
        return _this4.decode(intermediate, fileName);
      };
      switch (type) {
        case 'Text':
          return this.fs.readAllTextCompat({
            path: this.filePath(fileName)
          }).then(onResolve);
        default:
          return this.fs.readAllBytesCompat({
            path: this.filePath(fileName)
          }).then(onResolve);
      }
    }
  }, {
    key: "__write",
    value: function __write(fileName, content) {
      var _this5 = this;
      return this.ensureDir().then(function () {
        return _this5.encode(content, fileName);
      }).then(function (encodedContent) {
        return _this5.fs.writeAllBytes({
          content: encodedContent,
          path: _this5.filePath(fileName, true)
        }).then(function (result) {
          if (!result) {
            throw new Error("Failed to write to '".concat(fileName, "'"));
          }
        });
      });
    }
  }, {
    key: "__overwrite",
    value: function __overwrite(fileName, content) {
      var _this6 = this;
      return this.remove(fileName)["catch"](function () {/* Ignore any error */}).then(function () {
        return _this6.write(fileName, content);
      });
    }
  }, {
    key: "__clear",
    value: function __clear() {
      var _this7 = this;
      return this.list().then(function (list) {
        var ps = list.map(function (file) {
          return _this7.remove(file.fileName);
        });
        return Promise.all(ps);
      }).then(function () {});
    }
  }, {
    key: "__remove",
    value: function __remove(fileName) {
      var _this8 = this;
      return this.ensureDir().then(function () {
        return _this8.fs.deleteFile({
          path: _this8.filePath(fileName)
        }).then(function () {});
      });
    }
  }, {
    key: "__rename",
    value: function __rename(fileName, newName) {
      var _this9 = this;
      return this.ensureDir().then(function () {
        return _this9.fs.moveFile({
          sourcePath: _this9.filePath(fileName),
          targetPath: _this9.filePath(newName, true)
        }).then(function () {});
      });
    }
  }, {
    key: "__copy",
    value: function __copy(fileName, newName) {
      var _this10 = this;
      return this.ensureDir().then(function () {
        return _this10.fs.copyFile({
          sourcePath: _this10.filePath(fileName),
          targetPath: _this10.filePath(newName, true)
        }).then(function () {});
      });
    }
  }, {
    key: "filePath",
    value: function filePath(fileName) {
      var shouldSanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sanitized = shouldSanitize ? (0, _utils.sanitizeFileName)(fileName) : fileName;
      var existingExt = _path["default"].extname(fileName);
      var ext = this.extensions[0];
      var finalFileName = existingExt && existingExt.substr(1).toLowerCase() === ext.toLowerCase() ? sanitized : sanitized + '.' + ext;
      return _path["default"].join(this.rootDir, this.baseDir, finalFileName);
    }
  }, {
    key: "removeExt",
    value: function removeExt(fileNameWithExt) {
      var name = _path["default"].basename(fileNameWithExt);
      var ext = _path["default"].extname(fileNameWithExt);
      var i = name.lastIndexOf(ext);
      return name.substring(0, i);
    }
  }, {
    key: "ensureDir",
    value: function ensureDir() {
      var fs = this.fs;
      var dir = _path["default"].join(this.rootDir, this.baseDir);
      return fs.directoryExists({
        path: dir
      }).then(function (existed) {
        if (existed) return existed;
        return fs.createDirectory({
          path: dir
        });
      }).then(function () {});
    }
  }]);
  return NativeFileSystemFlatStorage;
}(_storage.FlatStorage);
var getNativeFileSystemFlatStorage = exports.getNativeFileSystemFlatStorage = (0, _ts_utils.singletonGetterByKey)(function (opts) {
  return _path["default"].join(opts.rootDir, opts.baseDir);
}, function (opts) {
  return new NativeFileSystemFlatStorage(opts);
});
var ErrorWithCode = exports.ErrorWithCode = /*#__PURE__*/function (_Error) {
  _inherits(ErrorWithCode, _Error);
  function ErrorWithCode(message, code) {
    var _this11;
    _classCallCheck(this, ErrorWithCode);
    _this11 = _callSuper(this, ErrorWithCode, [message]);
    _this11.name = 'ErrorWithCode';
    _this11.code = code;

    // Note: better to keep stack trace
    // reference: https://stackoverflow.com/a/32749533/1755633
    var captured = true;
    if (typeof Error.captureStackTrace === 'function') {
      try {
        Error.captureStackTrace(_assertThisInitialized(_this11), _this11.constructor);
      } catch (e) {
        captured = false;
      }
    }
    if (!captured) {
      _this11.stack = new Error(message).stack;
    }
    return _this11;
  }
  return _createClass(ErrorWithCode);
}( /*#__PURE__*/_wrapNativeSuper(Error));
function getErrorMessageForCode(code) {
  switch (code) {
    case _kantuFileAccess.KantuFileAccess.ErrorCode.Succeeded:
      return 'Success';
    case _kantuFileAccess.KantuFileAccess.ErrorCode.Failed:
      return 'Failed to load';
    case _kantuFileAccess.KantuFileAccess.ErrorCode.Truncated:
      return 'File too large to load';
    default:
      return "Unknown error code: ".concat(code);
  }
}

/***/ }),

/***/ 82798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FlatStorageEvent = exports.FlatStorage = void 0;
exports.checkFileName = checkFileName;
exports.readableSize = void 0;
var _eventemitter = _interopRequireDefault(__webpack_require__(30228));
var _utils = __webpack_require__(46580);
var _ts_utils = __webpack_require__(1601);
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
var debounce = __webpack_require__(20181);
var FlatStorageEvent = exports.FlatStorageEvent = /*#__PURE__*/function (FlatStorageEvent) {
  FlatStorageEvent["ListChanged"] = "list_changed";
  FlatStorageEvent["FilesChanged"] = "files_changed";
  return FlatStorageEvent;
}({});
var FlatStorage = exports.FlatStorage = /*#__PURE__*/function (_EventEmitter) {
  _inherits(FlatStorage, _EventEmitter);
  function FlatStorage() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FlatStorage);
    _this = _callSuper(this, FlatStorage);
    _defineProperty(_assertThisInitialized(_this), "encode", function (x, fileName) {
      return x;
    });
    _defineProperty(_assertThisInitialized(_this), "decode", function (x, fileName) {
      return x;
    });
    // Q: Why do we need debounce for followingemitXXX?
    // A: So that there could be more than 1 invocation of emitXXX in one operation
    //    And it will just emit once. For downstream like React / Vue, it won't trigger
    //    unnecessary render
    // Note: list changed event is for move (rename) / remove / clear / write a new file
    _defineProperty(_assertThisInitialized(_this), "emitListChanged", debounce(function () {
      _this.list().then(function (fileInfos) {
        _this.emit(FlatStorageEvent.ListChanged, fileInfos);
      });
    }, 100));
    _defineProperty(_assertThisInitialized(_this), "changedFileNames", []);
    _defineProperty(_assertThisInitialized(_this), "__emitFilesChanged", debounce(function () {
      var fileNames = _this.changedFileNames;

      // Note: clear changedFileNames right after this method is called,
      // instead of waiting till promise resolved
      // so that new file changes won't be blocked or affect current emit
      _this.changedFileNames = [];
      return Promise.all(fileNames.map(function (fileName) {
        return _this.read(fileName, 'Text')["catch"](function () {
          return null;
        });
      })).then(function (contents) {
        if (contents.length === 0) return;

        // Note: in case some files don't exist any more, filter by content
        var changedFiles = contents.map(function (content, i) {
          return {
            content: content,
            fileName: fileNames[i]
          };
        }).filter(function (item) {
          return !!item.content;
        });
        _this.emit(FlatStorageEvent.FilesChanged, changedFiles);
      });
    }, 100));
    if (options.decode) {
      _this.decode = options.decode;
    }
    if (options.encode) {
      _this.encode = options.encode;
    }
    return _this;
  }
  _createClass(FlatStorage, [{
    key: "list",
    value: function list() {
      return this.__list().then(function (items) {
        items.sort(function (a, b) {
          var aFileName = a.fileName.toLowerCase();
          var bFileName = b.fileName.toLowerCase();
          if (aFileName < bFileName) return -1;
          if (aFileName > bFileName) return 1;
          return 0;
        });
        return items;
      });
    }
  }, {
    key: "readAll",
    value: function readAll() {
      var _this2 = this;
      var readFileType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Text';
      var onErrorFiles = arguments.length > 1 ? arguments[1] : undefined;
      return this.list().then(function (items) {
        return Promise.all(items.map(function (item) {
          return _this2.read(item.fileName, readFileType).then(function (content) {
            return {
              content: content,
              fileName: item.fileName
            };
          });
        }));
      });
    }
  }, {
    key: "bulkWrite",
    value: function bulkWrite(list) {
      var _this3 = this;
      return Promise.all(list.map(function (item) {
        return _this3.write(item.fileName, item.content);
      })).then(function () {});
    }
  }, {
    key: "write",
    value: function write(fileName, content) {
      var _this4 = this;
      return this.exists(fileName).then(function (isExist) {
        var next = function next() {
          if (!isExist) _this4.emitListChanged();
          _this4.emitFilesChanged([fileName]);
        };
        return _this4.__write(fileName, content).then(next);
      });
    }
  }, {
    key: "overwrite",
    value: function overwrite(fileName, content) {
      var _this5 = this;
      return this.__overwrite(fileName, content).then(function () {
        _this5.emitFilesChanged([fileName]);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this6 = this;
      return this.__clear().then(function () {
        _this6.emitListChanged();
      });
    }
  }, {
    key: "remove",
    value: function remove(fileName) {
      var _this7 = this;
      return this.__remove(fileName).then(function () {
        _this7.emitListChanged();
      });
    }
  }, {
    key: "rename",
    value: function rename(fileName, newName) {
      var _this8 = this;
      return this.__rename(fileName, newName).then(function () {
        _this8.emitListChanged();
        _this8.emitFilesChanged([newName]);
      });
    }
  }, {
    key: "copy",
    value: function copy(fileName, newName) {
      var _this9 = this;
      var pName = newName && newName.length ? Promise.resolve(newName) : (0, _ts_utils.uniqueName)(fileName, {
        generate: function generate(old) {
          var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var reg = /-(\d+)$/;
          var m = old.match(reg);
          if (!m) return "".concat(old, "-").concat(step);
          return old.replace(reg, function (_, n) {
            return "-".concat(parseInt(n, 10) + step);
          });
        },
        check: function check(fileName) {
          return _this9.exists(fileName).then(function (exists) {
            return !exists;
          });
        },
        postfixReg: /(_relative)?\.\w+$/
      });
      return pName.then(function (name) {
        return _this9.__copy(fileName, name).then(function () {
          _this9.emitListChanged();
          _this9.emitFilesChanged([name]);
        });
      });
    }
  }, {
    key: "emitFilesChanged",
    value:
    // Note: files changed event is for write file only  (rename excluded)
    function emitFilesChanged(fileNames) {
      this.changedFileNames = fileNames.reduce(function (prev, fileName) {
        if (prev.indexOf(fileName) === -1) prev.push(fileName);
        return prev;
      }, this.changedFileNames);
      this.__emitFilesChanged();
    }
  }]);
  return FlatStorage;
}(_eventemitter["default"]);
var readableSize = exports.readableSize = function readableSize(byteSize) {
  var kb = 1024;
  var mb = kb * kb;
  if (byteSize < kb) {
    return byteSize + ' byte';
  }
  if (byteSize < mb) {
    return (byteSize / kb).toFixed(1) + ' KB';
  }
  return (byteSize / mb).toFixed(1) + ' MB';
};
function checkFileName(fileName) {
  (0, _utils.withFileExtension)(fileName, function (baseName) {
    try {
      (0, _utils.validateStandardName)(baseName, true);
    } catch (e) {
      throw new Error("Invalid file name '".concat(fileName, "'. File name ") + e.message);
    }
    return baseName;
  });
}

/***/ }),

/***/ 97467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getStorageManager = exports.StorageTarget = exports.StorageStrategyType = exports.StorageManagerEvent = exports.StorageManager = void 0;
var _eventemitter = _interopRequireDefault(__webpack_require__(30228));
var _browser_filesystem_storage = __webpack_require__(10253);
var _native_filesystem_storage = __webpack_require__(82060);
var _ts_utils = __webpack_require__(1601);
var _xfile = __webpack_require__(63109);
var _convert_utils = __webpack_require__(75852);
var _convert_suite_utils = __webpack_require__(35379);
var _utils = __webpack_require__(46580);
var _path = _interopRequireDefault(__webpack_require__(26513));
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
var StorageStrategyType = exports.StorageStrategyType = /*#__PURE__*/function (StorageStrategyType) {
  StorageStrategyType["Browser"] = "browser";
  StorageStrategyType["XFile"] = "xfile";
  StorageStrategyType["Nil"] = "nil";
  return StorageStrategyType;
}({});
var StorageTarget = exports.StorageTarget = /*#__PURE__*/function (StorageTarget) {
  StorageTarget[StorageTarget["Macro"] = 0] = "Macro";
  StorageTarget[StorageTarget["TestSuite"] = 1] = "TestSuite";
  StorageTarget[StorageTarget["CSV"] = 2] = "CSV";
  StorageTarget[StorageTarget["Screenshot"] = 3] = "Screenshot";
  StorageTarget[StorageTarget["Vision"] = 4] = "Vision";
  return StorageTarget;
}({});
var StorageManagerEvent = exports.StorageManagerEvent = /*#__PURE__*/function (StorageManagerEvent) {
  StorageManagerEvent["StrategyTypeChanged"] = "StrategyTypeChanged";
  StorageManagerEvent["RootDirChanged"] = "RootDirChanged";
  StorageManagerEvent["ForceReload"] = "ForceReload";
  return StorageManagerEvent;
}({});
var StorageManager = exports.StorageManager = /*#__PURE__*/function (_EventEmitter) {
  _inherits(StorageManager, _EventEmitter);
  function StorageManager(strategyType, extraOptions) {
    var _this;
    _classCallCheck(this, StorageManager);
    _this = _callSuper(this, StorageManager);
    _defineProperty(_assertThisInitialized(_this), "strategyType", StorageStrategyType.Nil);
    _defineProperty(_assertThisInitialized(_this), "getMacros", function () {
      return [];
    });
    _defineProperty(_assertThisInitialized(_this), "getMaxMacroCount", function (s) {
      return Promise.resolve(Infinity);
    });
    _this.setCurrentStrategyType(strategyType);
    if (extraOptions && extraOptions.getMacros) {
      _this.getMacros = extraOptions.getMacros;
    }
    if (extraOptions && extraOptions.getMaxMacroCount) {
      _this.getMaxMacroCount = extraOptions.getMaxMacroCount;
    }
    _this.getConfig = extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.getConfig;
    return _this;
  }
  _createClass(StorageManager, [{
    key: "isXFileMode",
    value: function isXFileMode() {
      return this.strategyType === StorageStrategyType.XFile;
    }
  }, {
    key: "isBrowserMode",
    value: function isBrowserMode() {
      return this.strategyType === StorageStrategyType.Browser;
    }
  }, {
    key: "getCurrentStrategyType",
    value: function getCurrentStrategyType() {
      return this.strategyType;
    }
  }, {
    key: "setCurrentStrategyType",
    value: function setCurrentStrategyType(type) {
      var _this2 = this;
      var needChange = type !== this.strategyType;
      if (needChange) {
        setTimeout(function () {
          _this2.emit(StorageManagerEvent.StrategyTypeChanged, type);
        }, 0);
        this.strategyType = type;
      }
      return needChange;
    }
  }, {
    key: "isStrategyTypeAvailable",
    value: function isStrategyTypeAvailable(type) {
      switch (type) {
        case StorageStrategyType.Browser:
          return Promise.resolve(true);
        case StorageStrategyType.XFile:
          return (0, _xfile.getXFile)().sanityCheck();
        default:
          throw new Error("type '".concat(type, "' is not supported"));
      }
    }
  }, {
    key: "getStorageForTarget",
    value: function getStorageForTarget(target, forceStrategytype) {
      var _this3 = this;
      switch (forceStrategytype || this.strategyType) {
        case StorageStrategyType.Browser:
          {
            switch (target) {
              case StorageTarget.Macro:
                {
                  var storage = (0, _browser_filesystem_storage.getBrowserFileSystemStandardStorage)({
                    baseDir: 'macros',
                    extensions: ['json'],
                    shouldKeepExt: false,
                    decode: function decode(text, filePath) {
                      var obj = (0, _convert_utils.fromJSONString)(text, _path["default"].basename(filePath), {
                        withStatus: true
                      });

                      // Note: use filePath as id
                      return _objectSpread(_objectSpread({}, obj), {}, {
                        id: storage.filePath(filePath),
                        path: storage.relativePath(filePath)
                      });
                    },
                    encode: function encode(data, fileName) {
                      var str = (0, _convert_utils.toJSONString)(_objectSpread(_objectSpread({}, data), {}, {
                        commands: data.data.commands
                      }), {
                        withStatus: true,
                        ignoreTargetOptions: false //!!this.getConfig?.()?.saveAlternativeLocators
                      });
                      // Note: BrowserFileSystemStorage only supports writing file with Blob
                      // so have to convert it here in `encode`
                      return new Blob([str]);
                    }
                  })

                  // FIXE: it's for test
                  ;
                  window.newMacroStorage = storage;
                  return storage;
                }
              case StorageTarget.TestSuite:
                {
                  var _storage = (0, _browser_filesystem_storage.getBrowserFileSystemStandardStorage)({
                    baseDir: 'testsuites',
                    extensions: ['json'],
                    shouldKeepExt: false,
                    decode: function decode(text, filePath) {
                      console.log('test suite raw content', filePath, text, _this3.getMacros());
                      var obj = (0, _convert_suite_utils.parseTestSuite)(text, {
                        fileName: _path["default"].basename(filePath)
                      });

                      // Note: use filePath as id
                      return _objectSpread(_objectSpread({}, obj), {}, {
                        id: _storage.filePath(filePath),
                        path: _storage.relativePath(filePath)
                      });
                    },
                    encode: function encode(suite, fileName) {
                      var str = (0, _convert_suite_utils.stringifyTestSuite)(suite);
                      return new Blob([str]);
                    }
                  })

                  // FIXE: it's for test
                  ;
                  window.newTestSuiteStorage = _storage;
                  return _storage;
                }
              case StorageTarget.CSV:
                return (0, _browser_filesystem_storage.getBrowserFileSystemStandardStorage)({
                  baseDir: 'spreadsheets',
                  extensions: ['csv'],
                  shouldKeepExt: true,
                  transformFileName: function transformFileName(path) {
                    return path.toLowerCase();
                  }
                });
              case StorageTarget.Screenshot:
                return (0, _browser_filesystem_storage.getBrowserFileSystemStandardStorage)({
                  baseDir: 'screenshots',
                  extensions: ['png'],
                  shouldKeepExt: true,
                  transformFileName: function transformFileName(path) {
                    return path.toLowerCase();
                  }
                });
              case StorageTarget.Vision:
                return (0, _browser_filesystem_storage.getBrowserFileSystemStandardStorage)({
                  baseDir: 'visions',
                  extensions: ['png'],
                  shouldKeepExt: true,
                  transformFileName: function transformFileName(path) {
                    return path.toLowerCase();
                  }
                });
            }
          }
        case StorageStrategyType.XFile:
          {
            var _getXFile$getCachedCo = (0, _xfile.getXFile)().getCachedConfig(),
              rootDir = _getXFile$getCachedCo.rootDir;
            switch (target) {
              case StorageTarget.Macro:
                {
                  var _storage2 = (0, _native_filesystem_storage.getNativeFileSystemStandardStorage)({
                    rootDir: rootDir,
                    baseDir: 'macros',
                    extensions: ['json'],
                    shouldKeepExt: false,
                    listFilter: function listFilter(entryNodes) {
                      return _this3.getMaxMacroCount(_this3.strategyType).then(function (maxCount) {
                        return (0, _ts_utils.forestSlice)(maxCount, entryNodes);
                      });
                    },
                    decode: function decode(text, filePath) {
                      var obj = (0, _convert_utils.fromJSONString)(text, _path["default"].basename(filePath), {
                        withStatus: true
                      });

                      // Note: use filePath as id
                      return _objectSpread(_objectSpread({}, obj), {}, {
                        id: _storage2.filePath(filePath),
                        path: _storage2.relativePath(filePath)
                      });
                    },
                    encode: function encode(data, fileName) {
                      var str = (0, _convert_utils.toJSONString)(_objectSpread(_objectSpread({}, data), {}, {
                        commands: data.data.commands
                      }), {
                        withStatus: true,
                        ignoreTargetOptions: false
                      });
                      // Note: NativeFileSystemStorage only supports writing file with DataURL
                      // so have to convert it here in `encode`
                      return (0, _utils.blobToDataURL)(new Blob([str]));
                    }
                  });
                  return _storage2;
                }
              case StorageTarget.TestSuite:
                {
                  var _storage3 = (0, _native_filesystem_storage.getNativeFileSystemStandardStorage)({
                    rootDir: rootDir,
                    baseDir: 'testsuites',
                    extensions: ['json'],
                    shouldKeepExt: false,
                    decode: function decode(text, filePath) {
                      var obj = (0, _convert_suite_utils.parseTestSuite)(text, {
                        fileName: _path["default"].basename(filePath)
                      });

                      // Note: use filePath as id
                      return _objectSpread(_objectSpread({}, obj), {}, {
                        id: _storage3.filePath(filePath),
                        path: _storage3.relativePath(filePath)
                      });
                    },
                    encode: function encode(suite, fileName) {
                      var str = (0, _convert_suite_utils.stringifyTestSuite)(suite);
                      return (0, _utils.blobToDataURL)(new Blob([str]));
                    }
                  });
                  return _storage3;
                }
              case StorageTarget.CSV:
                return (0, _native_filesystem_storage.getNativeFileSystemStandardStorage)({
                  rootDir: rootDir,
                  baseDir: 'datasources',
                  extensions: ['csv'],
                  shouldKeepExt: true,
                  allowAbsoluteFilePath: true,
                  encode: function encode(text, fileName) {
                    return (0, _utils.blobToDataURL)(new Blob([text]));
                  }
                });
              case StorageTarget.Vision:
                return (0, _native_filesystem_storage.getNativeFileSystemStandardStorage)({
                  rootDir: rootDir,
                  baseDir: 'images',
                  extensions: ['png'],
                  shouldKeepExt: true,
                  decode: xFileDecodeImage,
                  encode: function encode(imageBlob, fileName) {
                    return (0, _utils.blobToDataURL)(imageBlob);
                  }
                });
              case StorageTarget.Screenshot:
                return (0, _native_filesystem_storage.getNativeFileSystemStandardStorage)({
                  rootDir: rootDir,
                  baseDir: 'screenshots',
                  extensions: ['png'],
                  shouldKeepExt: true,
                  decode: xFileDecodeImage,
                  encode: function encode(imageBlob, fileName) {
                    return (0, _utils.blobToDataURL)(imageBlob);
                  }
                });
            }
          }
        default:
          throw new Error("Unsupported strategy type: '".concat(this.strategyType, "'"));
      }
    }
  }, {
    key: "getMacroStorage",
    value: function getMacroStorage() {
      return this.getStorageForTarget(StorageTarget.Macro);
    }
  }, {
    key: "getTestSuiteStorage",
    value: function getTestSuiteStorage() {
      return this.getStorageForTarget(StorageTarget.TestSuite);
    }
  }, {
    key: "getCSVStorage",
    value: function getCSVStorage() {
      return this.getStorageForTarget(StorageTarget.CSV);
    }
  }, {
    key: "getVisionStorage",
    value: function getVisionStorage() {
      return this.getStorageForTarget(StorageTarget.Vision);
    }
  }, {
    key: "getScreenshotStorage",
    value: function getScreenshotStorage() {
      return this.getStorageForTarget(StorageTarget.Screenshot);
    }
  }]);
  return StorageManager;
}(_eventemitter["default"]);
function xFileDecodeImage(data, fileName, readFileType) {
  if (readFileType !== 'DataURL') {
    return data;
  }
  if (data.substr(0, 11) === 'data:image') {
    return data;
  }
  return 'data:image/png;base64,' + data;
}

// Note: in panel window (`src/index.js`), `getStorageManager` is provided with `getMacros` in `extraOptions`
// While in `bg.js` or `csv_edtior.js`, `vision_editor.js`, `extraOptions` is omitted with no harm,
// because they don't read/write test suites
var getStorageManager = exports.getStorageManager = (0, _ts_utils.singletonGetter)(function (strategyType, extraOptions) {
  return new StorageManager(strategyType || StorageStrategyType.XFile, extraOptions);
});

/***/ }),

/***/ 10253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getBrowserFileSystemStandardStorage = exports.BrowserFileSystemStandardStorage = void 0;
var _standard_storage = __webpack_require__(18074);
var _path = __webpack_require__(26513);
var _utils = __webpack_require__(46580);
var _dom_utils = __webpack_require__(92950);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _ts_utils = __webpack_require__(1601);
var _delegate = __webpack_require__(12702);
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
var BrowserFileSystemStandardStorage = exports.BrowserFileSystemStandardStorage = /*#__PURE__*/function (_StandardStorage) {
  _inherits(BrowserFileSystemStandardStorage, _StandardStorage);
  function BrowserFileSystemStandardStorage(opts) {
    var _this;
    _classCallCheck(this, BrowserFileSystemStandardStorage);
    _this = _callSuper(this, BrowserFileSystemStandardStorage, [{
      encode: opts.encode,
      decode: opts.decode
    }]);
    _defineProperty(_assertThisInitialized(_this), "transformFileName", function (path) {
      return path;
    });
    var extensions = opts.extensions,
      shouldKeepExt = opts.shouldKeepExt,
      transformFileName = opts.transformFileName,
      _opts$baseDir = opts.baseDir,
      baseDir = _opts$baseDir === void 0 ? 'share' : _opts$baseDir;
    if (!baseDir || baseDir === '/') {
      throw new Error("Invalid baseDir, ".concat(baseDir));
    }
    if (transformFileName) {
      _this.transformFileName = transformFileName;
    }
    _this.fs = (0, _delegate.getBrowserFileSystem)();
    _this.baseDir = baseDir;
    _this.extensions = extensions;
    _this.shouldKeepExt = shouldKeepExt;

    // Note: create the folder in which we will store files
    _this.fs.getDirectory(baseDir, true);
    return _this;
  }
  _createClass(BrowserFileSystemStandardStorage, [{
    key: "getLink",
    value: function getLink(filePath) {
      if (!(0, _dom_utils.isFirefox)()) {
        var tmp = _web_extension["default"].runtime.getURL('temporary');
        var link = "filesystem:".concat(tmp, "/").concat(this.filePath(filePath));
        return Promise.resolve(link + '?' + new Date().getTime());
      } else {
        // Note: Except for Chrome, the filesystem API we use is a polyfill from idb.filesystem.js
        // idb.filesystem.js works great but the only problem is that you can't use 'filesystem:' schema to retrieve that file
        // so here, we have to convert the file to data url
        return this.read(filePath, 'DataURL');
      }
    }
  }, {
    key: "read",
    value: function read(filePath, type) {
      var _this2 = this;
      var fullPath = this.filePath(filePath);
      var relativePath = _path.posix.relative(this.dirPath('/'), fullPath);
      return this.fs.readFile(fullPath, type).then(function (intermediate) {
        return _this2.decode(intermediate, relativePath, type);
      }, function (error) {
        if (error.message.indexOf("A requested file or directory could not be found") !== -1) {
          throw new Error("Error #301: File not found (file names are case-sensitive): ".concat(filePath));
        }
        return Promise.reject(error);
      });
    }
  }, {
    key: "stat",
    value: function stat(entryPath, isDir) {
      var _this3 = this;
      var name = _path.posix.basename(entryPath);
      var dir = _path.posix.dirname(entryPath);
      var fullPath = isDir ? this.dirPath(entryPath) : this.filePath(entryPath);
      var relativePath = _path.posix.relative(this.dirPath('/'), fullPath);
      return this.fs.existsStat(fullPath).then(function (_ref) {
        var isFile = _ref.isFile,
          isDirectory = _ref.isDirectory;
        // Note: idb.filesystem.js (we use it as polyfill for firefox) doesn't support getMetadata on folder yet
        // so we simply set size/lastModified to empty value for now.

        if (!isFile) {
          return {
            dir: dir,
            name: name,
            fullPath: fullPath,
            relativePath: relativePath,
            isFile: isFile,
            isDirectory: isDirectory,
            size: 0,
            lastModified: new Date(0)
          };
        }
        return _this3.fs.getMetadata(fullPath, isDirectory).then(function (meta) {
          return {
            dir: dir,
            name: name,
            fullPath: fullPath,
            relativePath: relativePath,
            isFile: isFile,
            isDirectory: isDirectory,
            size: meta.size,
            lastModified: meta.modificationTime
          };
        });
      });
    }
  }, {
    key: "__list",
    value: function __list() {
      var _this4 = this;
      var directoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var brief = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // TODO: Ignore brief param for browser fs for now
      var convertName = function convertName(entryName, isDirectory) {
        return _this4.shouldKeepExt || isDirectory ? entryName : _this4.removeExt(entryName);
      };
      return this.ensureBaseDir().then(function () {
        return _this4.fs.list(_this4.dirPath(directoryPath));
      }).then(function (fileEntries) {
        var ps = fileEntries.map(function (fileEntry) {
          return _this4.stat(fileEntry.fullPath, fileEntry.isDirectory).then(function (stat) {
            return _objectSpread(_objectSpread({}, stat), {}, {
              name: _this4.transformFileName(convertName(stat.name, fileEntry.isDirectory))
            });
          });
        });
        return Promise.all(ps).then(function (list) {
          list.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          _this4.totalCount = list.length;
          _this4.displayedCount = list.length;
          return list;
        });
      });
    }
  }, {
    key: "__write",
    value: function __write(filePath, content) {
      var _this5 = this;
      return this.ensureBaseDir().then(function () {
        return _this5.remove(filePath);
      })["catch"](function () {/* Ignore any error */}).then(function () {
        return _this5.encode(content, filePath);
      }).then(function (encodedContent) {
        return _this5.fs.writeFile(_this5.filePath(filePath, true), encodedContent);
      }).then(function () {});
    }
  }, {
    key: "__overwrite",
    value: function __overwrite(filePath, content) {
      return this.__write(filePath, content);
    }
  }, {
    key: "__removeFile",
    value: function __removeFile(filePath) {
      return this.fs.removeFile(this.filePath(filePath));
    }
  }, {
    key: "__removeEmptyDirectory",
    value: function __removeEmptyDirectory(directoryPath) {
      return this.fs.rmdir(this.dirPath(directoryPath));
    }
  }, {
    key: "__moveFile",
    value: function __moveFile(filePath, newPath) {
      return this.fs.moveFile(this.filePath(filePath), this.filePath(newPath, true)).then(function () {});
    }
  }, {
    key: "__copyFile",
    value: function __copyFile(filePath, newPath) {
      return this.fs.copyFile(this.filePath(filePath), this.filePath(newPath, true)).then(function () {});
    }
  }, {
    key: "__createDirectory",
    value: function __createDirectory(directoryPath) {
      return this.fs.getDirectory(this.dirPath(directoryPath, true), true).then(function () {});
    }
  }, {
    key: "dirPath",
    value: function dirPath(dir) {
      var _this6 = this;
      var shouldSanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var path = this.getPathLib();
      var absPath = function () {
        if (_this6.isStartWithBaseDir(dir)) {
          return dir;
        } else {
          return path.join('/', _this6.baseDir, dir);
        }
      }();
      var dirName = path.dirname(absPath);
      var baseName = path.basename(absPath);
      var sanitized = shouldSanitize ? (0, _utils.sanitizeFileName)(baseName) : baseName;
      return path.join(dirName, sanitized);
    }
  }, {
    key: "isWin32Path",
    value: function isWin32Path() {
      return false;
    }
  }, {
    key: "filePath",
    value: function filePath(_filePath) {
      var shouldSanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dirName = _path.posix.dirname(_filePath);
      var baseName = _path.posix.basename(_filePath);
      var sanitized = shouldSanitize ? (0, _utils.sanitizeFileName)(baseName) : baseName;
      var existingExt = _path.posix.extname(baseName);
      var ext = this.extensions[0];
      var finalFileName = existingExt && existingExt.substr(1).toLowerCase() === ext.toLowerCase() ? sanitized : sanitized + '.' + ext;
      if (this.isStartWithBaseDir(dirName)) {
        return _path.posix.join(dirName, this.transformFileName(finalFileName));
      } else {
        return _path.posix.join('/', this.baseDir, dirName, this.transformFileName(finalFileName));
      }
    }
  }, {
    key: "isStartWithBaseDir",
    value: function isStartWithBaseDir(str) {
      return str.indexOf('/' + this.baseDir) === 0;
    }
  }, {
    key: "ensureBaseDir",
    value: function ensureBaseDir() {
      return this.fs.ensureDirectory(this.baseDir).then(function () {});
    }
  }, {
    key: "removeExt",
    value: function removeExt(fileNameWithExt) {
      var name = _path.posix.basename(fileNameWithExt);
      var ext = _path.posix.extname(fileNameWithExt);
      var i = name.lastIndexOf(ext);
      return name.substring(0, i);
    }
  }]);
  return BrowserFileSystemStandardStorage;
}(_standard_storage.StandardStorage);
var getBrowserFileSystemStandardStorage = exports.getBrowserFileSystemStandardStorage = (0, _ts_utils.singletonGetterByKey)(function (opts) {
  return opts && opts.baseDir || 'share';
}, function (opts) {
  return new BrowserFileSystemStandardStorage(opts);
});

/***/ }),

/***/ 82060:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getNativeFileSystemStandardStorage = exports.NativeFileSystemStandardStorage = void 0;
var _path = _interopRequireDefault(__webpack_require__(26513));
var _standard_storage = __webpack_require__(18074);
var _utils = __webpack_require__(46580);
var _filesystem = __webpack_require__(89937);
var _kantuFileAccess = __webpack_require__(11434);
var _native_filesystem_storage = __webpack_require__(86086);
var _ts_utils = __webpack_require__(1601);
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
var NativeFileSystemStandardStorage = exports.NativeFileSystemStandardStorage = /*#__PURE__*/function (_StandardStorage) {
  _inherits(NativeFileSystemStandardStorage, _StandardStorage);
  function NativeFileSystemStandardStorage(opts) {
    var _this;
    _classCallCheck(this, NativeFileSystemStandardStorage);
    _this = _callSuper(this, NativeFileSystemStandardStorage, [{
      encode: opts.encode,
      decode: opts.decode,
      listFilter: opts.listFilter
    }]);
    var baseDir = opts.baseDir,
      rootDir = opts.rootDir,
      extensions = opts.extensions,
      _opts$shouldKeepExt = opts.shouldKeepExt,
      shouldKeepExt = _opts$shouldKeepExt === void 0 ? false : _opts$shouldKeepExt,
      _opts$allowAbsoluteFi = opts.allowAbsoluteFilePath,
      allowAbsoluteFilePath = _opts$allowAbsoluteFi === void 0 ? false : _opts$allowAbsoluteFi;
    if (!baseDir || baseDir === '/') {
      throw new Error("Invalid baseDir, ".concat(baseDir));
    }
    _this.rootDir = rootDir;
    _this.baseDir = baseDir;
    _this.extensions = extensions;
    _this.shouldKeepExt = shouldKeepExt;
    _this.allowAbsoluteFilePath = allowAbsoluteFilePath;
    _this.fs = (0, _filesystem.getNativeFileSystemAPI)();
    return _this;
  }
  _createClass(NativeFileSystemStandardStorage, [{
    key: "getLink",
    value: function getLink(fileName) {
      return this.read(fileName, 'DataURL');
    }
  }, {
    key: "read",
    value: function read(filePath, type) {
      var _this2 = this;
      var fullPath = this.filePath(filePath);
      var relativePath = _path["default"].relative(this.dirPath('/'), fullPath);
      var onResolve = function onResolve(res) {
        if (res.errorCode !== _kantuFileAccess.KantuFileAccess.ErrorCode.Succeeded) {
          throw new _native_filesystem_storage.ErrorWithCode("".concat(filePath, ": ") + (0, _native_filesystem_storage.getErrorMessageForCode)(res.errorCode), res.errorCode);
        }
        var rawContent = res.content;
        var intermediate = function () {
          switch (type) {
            case 'Text':
            case 'DataURL':
              return rawContent;
            case 'ArrayBuffer':
              return (0, _utils.dataURItoArrayBuffer)(rawContent);
            case 'BinaryString':
              return (0, _utils.arrayBufferToString)((0, _utils.dataURItoArrayBuffer)(rawContent));
          }
        }();
        return _this2.decode(intermediate, relativePath, type);
      };
      var onError = function onError(err) {
        if (/File size cannot be determined/.test(err.message)) {
          throw new Error("Error #301: File not found (file names are case-sensitive): ".concat(filePath));
        }
        return Promise.reject(err);
      };
      switch (type) {
        case 'Text':
          return this.fs.readAllTextCompat({
            path: fullPath
          }).then(onResolve, onError);
        default:
          return this.fs.readAllBytesCompat({
            path: fullPath
          }).then(onResolve, onError);
      }
    }
  }, {
    key: "stat",
    value: function stat(entryPath, isDirectory) {
      var _this3 = this;
      var dir = _path["default"].dirname(entryPath);
      var name = _path["default"].basename(entryPath);
      var fullPath = isDirectory ? this.dirPath(entryPath) : this.filePath(entryPath);
      var relativePath = _path["default"].relative(this.dirPath('/'), fullPath);
      var noEntry = {
        dir: dir,
        name: name,
        fullPath: fullPath,
        relativePath: relativePath,
        isFile: false,
        isDirectory: false,
        lastModified: new Date(0),
        size: 0
      };
      var pExists = isDirectory ? this.fs.directoryExists({
        path: fullPath
      }) : this.fs.fileExists({
        path: fullPath
      });
      return pExists.then(function (exists) {
        if (!exists) {
          return noEntry;
        }
        return _this3.fs.getFileSystemEntryInfo({
          path: fullPath
        }).then(function (info) {
          return {
            dir: dir,
            name: name,
            fullPath: fullPath,
            relativePath: relativePath,
            isFile: !info.isDirectory,
            isDirectory: info.isDirectory,
            lastModified: new Date(info.lastWriteTime),
            size: info.length
          };
        }, function (e) {
          return noEntry;
        });
      });
    }
  }, {
    key: "__list",
    value: function __list() {
      var _this4 = this;
      var directoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var brief = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.ensureBaseDir().then(function () {
        return _this4.fs.getEntries({
          brief: brief,
          path: _this4.dirPath(directoryPath),
          extensions: _this4.extensions
        }).then(function (data) {
          var entries = data.entries;
          var errorCode = data.errorCode;
          if (errorCode !== _kantuFileAccess.KantuFileAccess.ErrorCode.Succeeded) {
            throw new _native_filesystem_storage.ErrorWithCode((0, _native_filesystem_storage.getErrorMessageForCode)(errorCode) + ": ".concat(directoryPath), errorCode);
          }
          var convertName = function convertName(entryName, isDirectory) {
            return _this4.shouldKeepExt || isDirectory ? entryName : _this4.removeExt(entryName);
          };
          var convert = function convert(entry) {
            var dir = _this4.dirPath(directoryPath);
            var name = convertName(entry.name, entry.isDirectory);
            var fullPath = _path["default"].join(dir, entry.name);
            var relativePath = _path["default"].relative(_this4.dirPath('/'), fullPath);
            return {
              dir: dir,
              name: name,
              fullPath: fullPath,
              relativePath: relativePath,
              isFile: !entry.isDirectory,
              isDirectory: entry.isDirectory,
              lastModified: new Date(entry.lastWriteTime),
              size: entry.length
            };
          };
          return entries.map(convert);
        });
      });
    }
  }, {
    key: "__write",
    value: function __write(filePath, content) {
      var _this5 = this;
      return this.ensureBaseDir().then(function () {
        return _this5.encode(content, filePath);
      }).then(function (encodedContent) {
        return _this5.fs.writeAllBytes({
          content: encodedContent,
          path: _this5.filePath(filePath, true)
        }).then(function (result) {
          if (!result) {
            throw new Error("Failed to write to '".concat(filePath, "'"));
          }
        });
      });
    }
  }, {
    key: "__overwrite",
    value: function __overwrite(filePath, content) {
      return this.write(filePath, content);
    }
  }, {
    key: "__removeFile",
    value: function __removeFile(filePath) {
      var _this6 = this;
      return this.ensureBaseDir().then(function () {
        return _this6.fs.deleteFile({
          path: _this6.filePath(filePath)
        }).then(function () {});
      });
    }
  }, {
    key: "__removeEmptyDirectory",
    value: function __removeEmptyDirectory(directoryPath) {
      var _this7 = this;
      return this.ensureBaseDir().then(function () {
        return _this7.fs.removeDirectory({
          path: _this7.dirPath(directoryPath)
        }).then(function () {});
      });
    }
  }, {
    key: "__moveFile",
    value: function __moveFile(filePath, newPath) {
      var _this8 = this;
      return this.ensureBaseDir().then(function () {
        return _this8.fs.moveFile({
          sourcePath: _this8.filePath(filePath),
          targetPath: _this8.filePath(newPath, true)
        }).then(function () {});
      });
    }
  }, {
    key: "__copyFile",
    value: function __copyFile(filePath, newPath) {
      var _this9 = this;
      return this.ensureBaseDir().then(function () {
        return _this9.fs.copyFile({
          sourcePath: _this9.filePath(filePath),
          targetPath: _this9.filePath(newPath, true)
        }).then(function () {});
      });
    }
  }, {
    key: "__createDirectory",
    value: function __createDirectory(directoryPath) {
      var _this10 = this;
      return this.ensureBaseDir().then(function () {
        return _this10.fs.createDirectory({
          path: _this10.dirPath(directoryPath, true)
        }).then(function () {});
      });
    }
  }, {
    key: "dirPath",
    value: function dirPath(dir) {
      var _this11 = this;
      var shouldSanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var path = this.getPathLib();
      var absPath = function () {
        if (_this11.isStartWithBaseDir(dir)) {
          return path.normalize(dir);
        } else {
          return path.normalize(path.join(_this11.rootDir, _this11.baseDir, dir));
        }
      }();
      var dirName = path.dirname(absPath);
      var baseName = path.basename(absPath);
      var sanitized = shouldSanitize ? (0, _utils.sanitizeFileName)(baseName) : baseName;
      return path.join(dirName, sanitized);
    }
  }, {
    key: "filePath",
    value: function filePath(_filePath) {
      var shouldSanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dirName = _path["default"].dirname(_filePath);
      var baseName = _path["default"].basename(_filePath);
      var sanitized = shouldSanitize ? (0, _utils.sanitizeFileName)(baseName) : baseName;
      var existingExt = _path["default"].extname(baseName);
      var ext = this.extensions[0];
      var finalFileName = existingExt && existingExt.substr(1).toLowerCase() === ext.toLowerCase() ? sanitized : sanitized + '.' + ext;
      if (this.isStartWithBaseDir(dirName)) {
        return _path["default"].normalize(_path["default"].join(dirName, finalFileName));
      } else if (this.allowAbsoluteFilePath && this.isAbsoluteUrl(_filePath)) {
        return _path["default"].normalize(_path["default"].join(dirName, finalFileName));
      } else {
        return _path["default"].normalize(_path["default"].join(this.rootDir, this.baseDir, dirName, finalFileName));
      }
    }
  }, {
    key: "isWin32Path",
    value: function isWin32Path() {
      return /^([A-Z]:\\|\/\/|\\\\)/i.test(this.rootDir);
    }
  }, {
    key: "isAbsoluteUrl",
    value: function isAbsoluteUrl(str) {
      var path = this.getPathLib();
      return path.isAbsolute(str);
    }
  }, {
    key: "isStartWithBaseDir",
    value: function isStartWithBaseDir(str) {
      return str.indexOf(this.rootDir) === 0;
    }
  }, {
    key: "removeExt",
    value: function removeExt(fileNameWithExt) {
      var name = _path["default"].basename(fileNameWithExt);
      var ext = _path["default"].extname(fileNameWithExt);
      var i = name.lastIndexOf(ext);
      return name.substring(0, i);
    }
  }, {
    key: "ensureBaseDir",
    value: function ensureBaseDir() {
      var fs = this.fs;
      var dir = _path["default"].normalize(_path["default"].join(this.rootDir, this.baseDir));
      return fs.directoryExists({
        path: dir
      }).then(function (existed) {
        if (existed) return existed;
        return fs.createDirectory({
          path: dir
        });
      }).then(function () {});
    }
  }]);
  return NativeFileSystemStandardStorage;
}(_standard_storage.StandardStorage);
var getNativeFileSystemStandardStorage = exports.getNativeFileSystemStandardStorage = (0, _ts_utils.singletonGetterByKey)(function (opts) {
  return _path["default"].join(opts.rootDir, opts.baseDir);
}, function (opts) {
  return new NativeFileSystemStandardStorage(opts);
});

/***/ }),

/***/ 18074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StorageEvent = exports.StandardStorage = exports.EntryStatus = void 0;
var _eventemitter = _interopRequireDefault(__webpack_require__(30228));
var _ts_utils = __webpack_require__(1601);
var _path = __webpack_require__(26513);
var _error = __webpack_require__(83785);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var debounce = __webpack_require__(20181);
var StorageEvent = exports.StorageEvent = /*#__PURE__*/function (StorageEvent) {
  StorageEvent["ListChanged"] = "list_changed";
  StorageEvent["FilesChanged"] = "files_changed";
  return StorageEvent;
}({});
var EntryStatus = exports.EntryStatus = /*#__PURE__*/function (EntryStatus) {
  EntryStatus[EntryStatus["Unknown"] = 0] = "Unknown";
  EntryStatus[EntryStatus["NonExistent"] = 1] = "NonExistent";
  EntryStatus[EntryStatus["File"] = 2] = "File";
  EntryStatus[EntryStatus["Directory"] = 3] = "Directory";
  return EntryStatus;
}({});
var StandardStorage = exports.StandardStorage = /*#__PURE__*/function (_EventEmitter) {
  _inherits(StandardStorage, _EventEmitter);
  function StandardStorage() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, StandardStorage);
    _this = _callSuper(this, StandardStorage);
    _defineProperty(_assertThisInitialized(_this), "encode", function (x, fileName) {
      return x;
    });
    _defineProperty(_assertThisInitialized(_this), "decode", function (x, fileName) {
      return x;
    });
    _defineProperty(_assertThisInitialized(_this), "displayedCount", 0);
    _defineProperty(_assertThisInitialized(_this), "totalCount", 0);
    _defineProperty(_assertThisInitialized(_this), "listFilter", function (list) {
      return list;
    });
    // Q: Why do we need debounce for followingemitXXX?
    // A: So that there could be more than 1 invocation of emitXXX in one operation
    //    And it will just emit once. For downstream like React / Vue, it won't trigger
    //    unnecessary render
    // Note: list changed event is for move (rename) / remove / clear / write a new file
    _defineProperty(_assertThisInitialized(_this), "emitListChanged", debounce(function () {
      // FIXME:
      _this.list('/').then(function (fileInfos) {
        _this.emit(StorageEvent.ListChanged, fileInfos);
      });
    }, 100));
    _defineProperty(_assertThisInitialized(_this), "changedFileNames", []);
    _defineProperty(_assertThisInitialized(_this), "__emitFilesChanged", debounce(function () {
      var fileNames = _this.changedFileNames;

      // Note: clear changedFileNames right after this method is called,
      // instead of waiting till promise resolved
      // so that new file changes won't be blocked or affect current emit
      _this.changedFileNames = [];
      return Promise.all(fileNames.map(function (fileName) {
        return _this.read(fileName, 'Text')["catch"](function () {
          return null;
        });
      })).then(function (contents) {
        if (contents.length === 0) return;

        // Note: in case some files don't exist any more, filter by content
        var changedFiles = contents.map(function (content, i) {
          return {
            content: content,
            fileName: fileNames[i]
          };
        }).filter(function (item) {
          return !!item.content;
        });
        _this.emit(StorageEvent.FilesChanged, changedFiles);
      });
    }, 100));
    if (options.decode) {
      _this.decode = options.decode;
    }
    if (options.encode) {
      _this.encode = options.encode;
    }
    if (options.listFilter) {
      _this.listFilter = options.listFilter;
    }
    return _this;
  }
  _createClass(StandardStorage, [{
    key: "getPathLib",
    value: function getPathLib() {
      // Note: only subclass knows whether it should use win32/posix style path
      return this.isWin32Path() ? _path.win32 : _path.posix;
    }
  }, {
    key: "relativePath",
    value: function relativePath(entryPath, isDirectory) {
      var absPath = isDirectory ? this.dirPath(entryPath) : this.filePath(entryPath);
      var rootPath = this.dirPath('/');
      return this.getPathLib().relative(rootPath, absPath);
    }
  }, {
    key: "entryPath",
    value: function entryPath(_entryPath, isDirectory) {
      return isDirectory ? this.dirPath(_entryPath) : this.filePath(_entryPath);
    }
  }, {
    key: "list",
    value: function list() {
      var _this2 = this;
      var directoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var brief = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.__list(directoryPath, brief).then(function (items) {
        return _this2.sortEntries(items);
      });
    }
  }, {
    key: "listR",
    value: function listR() {
      var _this3 = this;
      var directoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var listDir = function listDir(dir) {
        return _this3.list(dir, false).then(function (entries) {
          return Promise.all(entries.map(function (entry) {
            if (entry.isDirectory) {
              return listDir(entry.fullPath);
            }
            return Promise.resolve(null);
          })).then(function (listOfEntries) {
            return _this3.sortEntries(entries.map(function (entry, i) {
              return _objectSpread(_objectSpread({}, entry), {}, {
                children: listOfEntries[i] || []
              });
            }));
          });
        });
      };
      return listDir(directoryPath).then(function (entryNodes) {
        if (directoryPath !== '/') {
          return entryNodes;
        }
        return Promise.resolve(_this3.listFilter(entryNodes)).then(function (displayEntryNodes) {
          _this3.totalCount = _ts_utils.sum.apply(void 0, _toConsumableArray(entryNodes.map(_ts_utils.nodeCount)));
          _this3.displayedCount = _ts_utils.sum.apply(void 0, _toConsumableArray(displayEntryNodes.map(_ts_utils.nodeCount)));
          return displayEntryNodes;
        });
      });
    }
  }, {
    key: "getDisplayCount",
    value: function getDisplayCount() {
      return this.displayedCount;
    }
  }, {
    key: "getTotalCount",
    value: function getTotalCount() {
      return this.totalCount;
    }
  }, {
    key: "exists",
    value: function exists(path) {
      return this.stat(path).then(function (_ref) {
        var isFile = _ref.isFile,
          isDirectory = _ref.isDirectory;
        return isFile || isDirectory;
      }, function () {
        return false;
      });
    }
  }, {
    key: "fileExists",
    value: function fileExists(path) {
      return this.stat(path).then(function (entry) {
        return entry.isFile;
      }, function () {
        return false;
      });
    }
  }, {
    key: "directoryExists",
    value: function directoryExists(path) {
      return this.stat(path, true).then(function (entry) {
        return entry.isDirectory;
      }, function () {
        return false;
      });
    }
  }, {
    key: "readR",
    value: function readR(directoryPath) {
      var _this4 = this;
      var readFileType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Text';
      var onErrorFiles = arguments.length > 2 ? arguments[2] : undefined;
      return this.listR(directoryPath).then(function (entryNodes) {
        return Promise.all(entryNodes.map(function (node) {
          if (node.isFile) {
            return _this4.read(node.fullPath, readFileType).then(function (content) {
              return [{
                content: content,
                filePath: node.fullPath
              }];
            });
          }
          if (node.isDirectory) {
            return _this4.readR(node.fullPath, readFileType);
          }
          throw new Error('Not file or directory');
        })).then(function (result) {
          return (0, _ts_utils.flatten)(result);
        });
      });
    }
  }, {
    key: "write",
    value: function write(fileName, content) {
      var _this5 = this;
      return this.exists(fileName).then(function (isExist) {
        var next = function next() {
          if (!isExist) _this5.emitListChanged();
          _this5.emitFilesChanged([fileName]);
        };
        return _this5.__write(fileName, content).then(next);
      });
    }
  }, {
    key: "overwrite",
    value: function overwrite(fileName, content) {
      var _this6 = this;
      return this.__overwrite(fileName, content).then(function () {
        _this6.emitFilesChanged([fileName]);
      });
    }
  }, {
    key: "bulkWrite",
    value: function bulkWrite(list) {
      var _this7 = this;
      return Promise.all(list.map(function (item) {
        return _this7.write(item.filePath, item.content);
      })).then(function () {});
    }
  }, {
    key: "removeFile",
    value: function removeFile(filePath) {
      var _this8 = this;
      return this.__removeFile(filePath).then(function () {
        _this8.emitListChanged();
      });
    }
  }, {
    key: "removeEmptyDirectory",
    value: function removeEmptyDirectory(directoryPath) {
      var _this9 = this;
      return this.__removeEmptyDirectory(directoryPath).then(function () {
        _this9.emitListChanged();
      });
    }
  }, {
    key: "removeDirectory",
    value: function removeDirectory(directoryPath) {
      return this.remove(directoryPath, true);
    }
  }, {
    key: "remove",
    value: function remove(path, isDirectory) {
      var _this10 = this;
      return this.stat(path, isDirectory).then(function (entry) {
        if (entry.isFile) {
          return _this10.removeFile(entry.fullPath);
        }
        if (entry.isDirectory) {
          return _this10.list(entry.fullPath).then(function (entries) {
            return Promise.all(entries.map(function (item) {
              return _this10.remove(item.fullPath, item.isDirectory);
            })).then(function () {
              return _this10.removeEmptyDirectory(entry.fullPath);
            });
          });
        }
        throw new Error('Not file or directory');
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this11 = this;
      return this.list('/').then(function (entries) {
        return Promise.all(entries.map(function (entry) {
          return _this11.remove(entry.fullPath);
        })).then(function () {});
      });
    }
  }, {
    key: "moveFile",
    value: function moveFile(filePath, newPath) {
      var _this12 = this;
      return this.__moveFile(filePath, newPath).then(function () {
        _this12.emitListChanged();
      });
    }
  }, {
    key: "copyFile",
    value: function copyFile(filePath, newPath) {
      var _this13 = this;
      return this.__copyFile(filePath, newPath).then(function () {
        _this13.emitListChanged();
      });
    }
  }, {
    key: "moveDirectory",
    value: function moveDirectory(directoryPath, newPath) {
      return this.move(directoryPath, newPath, true, true);
    }
  }, {
    key: "copyDirectory",
    value: function copyDirectory(directoryPath, newPath) {
      return this.copy(directoryPath, newPath, true, true);
    }
  }, {
    key: "move",
    value: function move(src, dst, isSourceDirectory, isTargetDirectory) {
      var _this14 = this;
      var absSrc = this.entryPath(src, isSourceDirectory);
      var absDst = this.entryPath(dst, isTargetDirectory);
      if (absSrc === absDst) {
        throw new Error('move: src should not be the same as dst');
      }
      if (this.getPathLib().dirname(absSrc) === absDst) {
        throw new Error('move: cannot move to original dir');
      }
      if (isSourceDirectory && isTargetDirectory && this.isTargetInSourceDirectory(dst, src)) {
        throw new Error('Cannot move a directory into its sub directory');
      }

      // It's slow to copy then remove. Subclass should definitely
      // override this method if it has native support for move operation
      return this.copy(src, dst, isSourceDirectory, isTargetDirectory).then(function () {
        return _this14.remove(src, isSourceDirectory);
      });
    }
  }, {
    key: "copy",
    value: function copy(src, dst, isSourceDirectory, isTargetDirectory) {
      var _this15 = this;
      var srcDir = this.getPathLib().dirname(src);
      var dstDir = this.getPathLib().dirname(dst);
      var isSameDir = srcDir === dstDir;
      if (src === dst) {
        throw new Error('copy: dst should not be the same as src');
      }
      return Promise.all([this.getEntryStatus(src, isSourceDirectory), this.getEntryStatus(dst, isTargetDirectory), isSameDir ? Promise.resolve(EntryStatus.Directory) : this.getEntryStatus(this.getPathLib().dirname(dst), true)]).then(function (triple) {
        var _triple = _slicedToArray(triple, 3),
          srcStatus = _triple[0],
          dstStatus = _triple[1],
          dstDirStatus = _triple[2];
        if (dstDirStatus !== EntryStatus.Directory) {
          throw new _error.ENOTDIR(_this15.getPathLib().dirname(dst));
        }
        switch (srcStatus) {
          case EntryStatus.NonExistent:
            throw new _error.ENOENT(src);
          case EntryStatus.Unknown:
            throw new Error("source (".concat(src, ") exists but is neither a file nor a directory"));
          case EntryStatus.File:
            {
              switch (dstStatus) {
                case EntryStatus.File:
                  throw new _error.EEXIST(dst);
                case EntryStatus.Unknown:
                  throw new Error("dst '".concat(dst, "' is neither a file nor directory"));
                case EntryStatus.Directory:
                  {
                    var dstFilePath = _this15.getPathLib().resolve(dst, _this15.getPathLib().basename(src));
                    return _this15.copyFile(src, dstFilePath);
                  }
                case EntryStatus.NonExistent:
                  {
                    return _this15.copyFile(src, dst);
                  }
              }
            }
          case EntryStatus.Directory:
            {
              switch (dstStatus) {
                case EntryStatus.File:
                  throw new Error("dst '".concat(dst, "' is an existing file, but src '").concat(src, "' is a directory"));
                case EntryStatus.Unknown:
                  throw new Error("dst '".concat(dst, "' is neither a file nor directory"));
                case EntryStatus.Directory:
                  {
                    if (_this15.isTargetInSourceDirectory(dst, src)) {
                      throw new Error('Cannot copy a directory into its sub directory');
                    }
                    var _dstDir = _this15.getPathLib().resolve(dst, _this15.getPathLib().basename(src));
                    return _this15.ensureDirectory(_dstDir).then(function () {
                      return _this15.copyAllInDirectory(src, _dstDir);
                    });
                  }
                case EntryStatus.NonExistent:
                  {
                    return _this15.ensureDirectory(dst).then(function () {
                      return _this15.copyAllInDirectory(src, dst);
                    });
                  }
              }
            }
        }
      });
    }
  }, {
    key: "createDirectory",
    value: function createDirectory(directoryPath) {
      return this.mkdir(directoryPath, false);
    }
  }, {
    key: "ensureDirectory",
    value: function ensureDirectory(directoryPath) {
      var _this16 = this;
      return this.getEntryStatus(directoryPath, true).then(function (status) {
        switch (status) {
          case EntryStatus.File:
          case EntryStatus.Unknown:
            throw new _error.EEXIST();
          case EntryStatus.Directory:
            return;
          case EntryStatus.NonExistent:
            return _this16.mkdir(directoryPath, true);
        }
      });
    }
  }, {
    key: "ensureDir",
    value: function ensureDir() {
      return this.ensureDirectory('/');
    }
  }, {
    key: "rename",
    value: function rename(filePath, newPath) {
      return this.move(filePath, newPath);
    }
  }, {
    key: "readAll",
    value: function readAll() {
      var _this17 = this;
      var readFileType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Text';
      var onErrorFiles = arguments.length > 1 ? arguments[1] : undefined;
      return this.list('/').then(function (items) {
        return Promise.all(items.filter(function (item) {
          return item.isFile;
        }).map(function (item) {
          return _this17.read(item.fullPath, readFileType).then(function (content) {
            return {
              content: content,
              fileName: item.name
            };
          })
          // Note: Whenever there is error in reading file,
          // return null
          ["catch"](function (e) {
            return {
              fileName: item.name,
              fullFilePath: item.fullPath,
              error: new Error("Error in parsing ".concat(item.fullPath, ":\n").concat(e.message))
            };
          });
        })).then(function (list) {
          var errorFiles = list.filter(function (item) {
            return item.error;
          });
          if (onErrorFiles) onErrorFiles(errorFiles);
          return list.filter(function (item) {
            return item.content;
          });
        });
      });
    }
  }, {
    key: "isTargetInSourceDirectory",
    value: function isTargetInSourceDirectory(targetPath, sourcePath) {
      var dstPath = this.dirPath(targetPath);
      var srcPath = this.dirPath(sourcePath);
      var sep = this.getPathLib().sep;
      var relativePath = this.getPathLib().relative(srcPath, dstPath);
      var parts = relativePath.split(sep);
      return parts.indexOf('..') === -1;
    }
  }, {
    key: "sortEntries",
    value: function sortEntries(entries) {
      // Sort entries in this order
      // 1. Directories come before files
      // 2. Inside directories or files, sort it alphabetically a-z (ignore case)
      var items = _toConsumableArray(entries);
      items.sort(function (a, b) {
        if (a.isDirectory && b.isFile) {
          return -1;
        }
        if (a.isFile && b.isDirectory) {
          return 1;
        }
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
      });
      return items;
    }
  }, {
    key: "copyAllInDirectory",
    value: function copyAllInDirectory(srcDir, dstDir) {
      var _this18 = this;
      return this.list(srcDir).then(function (entries) {
        return Promise.all(entries.map(function (entry) {
          if (entry.isFile) {
            return _this18.copyFile(entry.fullPath, _this18.getPathLib().resolve(dstDir, entry.name));
          }
          if (entry.isDirectory) {
            var dstSubDir = _this18.getPathLib().resolve(dstDir, entry.name);
            return _this18.ensureDirectory(dstSubDir).then(function () {
              return _this18.copyAllInDirectory(entry.fullPath, dstSubDir);
            });
          }
          return Promise.resolve();
        })).then(function () {});
      });
    }
  }, {
    key: "mkdir",
    value: function mkdir(dir) {
      var _this19 = this;
      var sureAboutNonExistent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var makeSureNonExistent = function makeSureNonExistent() {
        if (sureAboutNonExistent) {
          return Promise.resolve();
        }
        return _this19.getEntryStatus(dir, true).then(function (status) {
          if (status !== EntryStatus.NonExistent) {
            throw new _error.EEXIST(dir);
          }
        });
      };
      return makeSureNonExistent().then(function () {
        var parentDir = _this19.getPathLib().dirname(dir);
        if (parentDir === '/') {
          return _this19.__createDirectory(dir);
        }
        return _this19.getEntryStatus(parentDir, true).then(function (status) {
          switch (status) {
            case EntryStatus.File:
            case EntryStatus.Unknown:
              throw new _error.EEXIST(parentDir);
            case EntryStatus.Directory:
              return _this19.__createDirectory(dir);
            case EntryStatus.NonExistent:
              return _this19.mkdir(parentDir, true).then(function () {
                return _this19.__createDirectory(dir);
              });
          }
        });
      }).then(function () {
        _this19.emitListChanged();
      });
    }
  }, {
    key: "getEntryStatus",
    value: function getEntryStatus(path, isDirectory) {
      return this.stat(path, isDirectory).then(function (entry) {
        if (entry.isFile) return EntryStatus.File;
        if (entry.isDirectory) return EntryStatus.Directory;
        return EntryStatus.NonExistent;
      }, function (e) {
        return EntryStatus.NonExistent;
      });
    }
  }, {
    key: "emitFilesChanged",
    value:
    // Note: files changed event is for write file only  (rename excluded)
    function emitFilesChanged(fileNames) {
      this.changedFileNames = fileNames.reduce(function (prev, fileName) {
        if (prev.indexOf(fileName) === -1) prev.push(fileName);
        return prev;
      }, this.changedFileNames);
      this.__emitFilesChanged();
    }
  }]);
  return StandardStorage;
}(_eventemitter["default"]);

/***/ }),

/***/ 41279:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.polyfillTimeoutFunctions = polyfillTimeoutFunctions;
var _log = _interopRequireDefault(__webpack_require__(89130));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var oldSetTimeout = window.setTimeout;
var oldClearTimeout = window.clearTimeout;
var oldSetInterval = window.setInterval;
var oldClearInterval = window.clearInterval;
function uid() {
  return Math.floor(Math.random() * 1e8);
}
function polyfillTimeoutFunctions(csIpc) {
  var timeoutRecords = {};
  function createSetTimeoutViaBackground(identity) {
    var id = identity !== null && identity !== void 0 ? identity : uid();
    return function setTimeoutViaBackground(fn) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      timeoutRecords[id] = true;
      csIpc.ask('TIMEOUT', {
        id: id,
        timeout: timeout
      }).then(function (identity) {
        if (!timeoutRecords[identity]) {
          return;
        }
        fn.apply(void 0, args);
      })["catch"](function (e) {
        _log["default"].error('Error in setTimeout', e.stack);
      });
      return id;
    };
  }
  function clearTimeoutViaBackground(id) {
    delete timeoutRecords[id];
  }

  // Call both native setTimeout and setTimeoutViaBackground
  // and take the first one resolved
  function smartSetTimeout(fn) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var done = false;
    var wrappedFn = function wrappedFn() {
      if (done) {
        return null;
      }
      done = true;
      return fn.apply(void 0, arguments);
    };
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    var id = oldSetTimeout.apply(void 0, [wrappedFn, timeout].concat(args));
    createSetTimeoutViaBackground(id).apply(void 0, [wrappedFn, timeout].concat(args));
    return id;
  }
  var intervalRecords = {};
  function smartSetInterval(fn) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }
    var id = uid();
    var wrappedFn = function wrappedFn() {
      if (!intervalRecords[id]) {
        return;
      }
      smartSetTimeout(wrappedFn, timeout);
      fn.apply(void 0, args);
    };
    intervalRecords[id] = true;
    smartSetTimeout(wrappedFn, timeout);
    return id;
  }
  function clearIntervalViaBackground(id) {
    delete intervalRecords[id];
  }
  var runBoth = function runBoth(f1, f2) {
    return function () {
      f1.apply(void 0, arguments);
      f2.apply(void 0, arguments);
    };
  };
  window.setTimeout = smartSetTimeout;
  window.clearTimeout = runBoth(clearTimeoutViaBackground, oldClearTimeout);
  window.setInterval = smartSetInterval;
  window.clearInterval = clearIntervalViaBackground;
}

/***/ }),

/***/ 97846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XModuleTypes = exports.XModule = void 0;
var _storage = _interopRequireDefault(__webpack_require__(88555));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var XModuleTypes = exports.XModuleTypes = /*#__PURE__*/function (XModuleTypes) {
  XModuleTypes["XFile"] = "xFile";
  XModuleTypes["XLocal"] = "xLocal";
  XModuleTypes["XUserIO"] = "xClick";
  XModuleTypes["XDesktop"] = "xDesktop";
  XModuleTypes["XScreenCapture"] = "xScreenCapture";
  return XModuleTypes;
}({});
var XModule = exports.XModule = /*#__PURE__*/function () {
  function XModule() {
    _classCallCheck(this, XModule);
    _defineProperty(this, "cachedConfig", {});
    this.initConfig();
  }
  _createClass(XModule, [{
    key: "getVersion",
    value: function getVersion() {
      var _this = this;
      return this.getAPI().reconnect()["catch"](function (e) {
        throw new Error("".concat(_this.getName(), " is not installed yet"));
      }).then(function (api) {
        return api.getVersion().then(function (version) {
          return {
            version: version,
            installed: true
          };
        });
      })["catch"](function (e) {
        return {
          installed: false
        };
      });
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      var _this2 = this;
      this.cachedConfig = _objectSpread(_objectSpread({}, this.cachedConfig), config);
      return this.getConfig().then(function (oldConfig) {
        var nextConfig = _objectSpread(_objectSpread({}, oldConfig), config);
        return _storage["default"].set(_this2.getStoreKey(), nextConfig).then(function (success) {
          if (success) {
            _this2.cachedConfig = nextConfig;
          }
          return success;
        });
      });
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      var _this3 = this;
      return _storage["default"].get(this.getStoreKey()).then(function (data) {
        _this3.cachedConfig = data || {};
        return _this3.cachedConfig;
      });
    }
  }, {
    key: "getCachedConfig",
    value: function getCachedConfig() {
      return this.cachedConfig;
    }
  }, {
    key: "getStoreKey",
    value: function getStoreKey() {
      return this.getName().toLowerCase();
    }
  }]);
  return XModule;
}();

/***/ }),

/***/ 63109:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getXFile = exports.XFile = void 0;
var _common = __webpack_require__(97846);
var _filesystem = __webpack_require__(89937);
var _ts_utils = __webpack_require__(1601);
var _path = _interopRequireDefault(__webpack_require__(26513));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
var XFile = exports.XFile = /*#__PURE__*/function (_XModule) {
  _inherits(XFile, _XModule);
  function XFile() {
    _classCallCheck(this, XFile);
    return _callSuper(this, XFile, arguments);
  }
  _createClass(XFile, [{
    key: "getName",
    value: function getName() {
      return _common.XModuleTypes.XFile;
    }
  }, {
    key: "getAPI",
    value: function getAPI() {
      return (0, _filesystem.getNativeFileSystemAPI)();
    }
  }, {
    key: "getLangs",
    value: function getLangs(osType) {
      return this.getConfig().then(function (config) {
        var _getXFile$getCachedCo = getXFile().getCachedConfig(),
          rootDir = _getXFile$getCachedCo.rootDir;
        var fsAPI = (0, _filesystem.getNativeFileSystemAPI)();
        return fsAPI.getSpecialFolderPath({
          folder: _filesystem.SpecialFolder.UserProfile
        }).then(function (profilePath) {
          var uivision = osType == "mac" ? '/Library/uivision-xmodules/2.2.2/xmodules/' : _path["default"].join(profilePath, "\\AppData\\Roaming\\UI.Vision\\XModules\\ocr");
          return fsAPI.ensureDir({
            path: uivision
          }).then(function (Opath) {
            var path = uivision;
            var outputpath = rootDir;
            var filepath = '',
              Arguments = '';
            var ocrOutputJson = '';
            if (osType == "mac") {
              filepath = path + '/ocr3';
              Arguments = " --in get-installed-lng --out " + outputpath + "/logs/ocrlang.json";
              ocrOutputJson = outputpath + "/logs/ocrlang.json";
            } else {
              filepath = path + '\\ocrexe\\ocrcl1.exe';
              Arguments = "get-installed-lng " + outputpath + "\\logs\\ocrlang.json";
              ocrOutputJson = outputpath + "\\logs\\ocrlang.json";
            }
            var params = {
              fileName: filepath,
              arguments: Arguments,
              waitForExit: true
            };
            return fsAPI.runProcess(params).then(function (res) {
              if (res != undefined && res.exitCode != null && res.exitCode >= 0) {
                var _params = {
                  path: ocrOutputJson,
                  waitForExit: true
                };
                return fsAPI.readAllBytes(_params);
              } else {
                return;
              }
            }).then(function (json) {
              if (json) {
                if (json.errorCode == 0) {
                  console.log(json.content);
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
      });
    }
  }, {
    key: "initConfig",
    value: function initConfig() {
      var _this = this;
      return this.getConfig().then(function (config) {
        if (!config.rootDir) {
          var fsAPI = (0, _filesystem.getNativeFileSystemAPI)();
          return fsAPI.getSpecialFolderPath({
            folder: _filesystem.SpecialFolder.UserDesktop
          }).then(function (profilePath) {
            var kantuDir = _path["default"].join(profilePath, 'uivision');
            return fsAPI.ensureDir({
              path: kantuDir
            }).then(function (done) {
              _this.setConfig({
                rootDir: done ? kantuDir : profilePath
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
      });
    }
  }, {
    key: "sanityCheck",
    value: function sanityCheck(simple) {
      var _this2 = this;
      return Promise.all([this.getConfig(), this.getAPI().getVersion().then(function () {
        return _this2.getAPI();
      }, function () {
        return _this2.getAPI().reconnect();
      })["catch"](function (e) {
        throw new Error('xFile is not installed yet');
      })]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          config = _ref2[0],
          api = _ref2[1];
        if (simple) {
          return true;
        }
        if (!config.rootDir) {
          throw new Error('rootDir is not set');
        }
        var checkDirectoryExists = function checkDirectoryExists() {
          return api.directoryExists({
            path: config.rootDir
          }).then(function (existed) {
            if (!existed) throw new Error("Directory '".concat(config.rootDir, "' doesn't exist"));
            return true;
          });
        };
        var checkDirectoryWritable = function checkDirectoryWritable() {
          var testDir = _path["default"].join(config.rootDir, '__kantu__' + Math.round(Math.random() * 100));
          return api.createDirectory({
            path: testDir
          }).then(function (created) {
            if (!created) throw new Error();
            return api.removeDirectory({
              path: testDir
            });
          }).then(function (deleted) {
            if (!deleted) throw new Error();
            return true;
          })["catch"](function (e) {
            throw new Error("Directory '".concat(config.rootDir, "' is not writable"));
          });
        };
        return checkDirectoryExists().then(checkDirectoryWritable);
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
      return "https://goto.ui.vision/x/idehelp?help=xfileaccess_updatecheck&xversion=".concat(modVersion, "&kantuversion=").concat(extVersion);
    }
  }, {
    key: "downloadLink",
    value: function downloadLink() {
      return 'https://goto.ui.vision/x/idehelp?help=xfileaccess_download';
    }
  }, {
    key: "infoLink",
    value: function infoLink() {
      return 'https://goto.ui.vision/x/idehelp?help=xfileaccess';
    }
  }]);
  return XFile;
}(_common.XModule);
var getXFile = exports.getXFile = (0, _ts_utils.singletonGetter)(function () {
  return new XFile();
});

/***/ }),

/***/ 35379:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.validateTestSuiteText = exports.stringifyTestSuite = exports.parseTestSuite = void 0;
__webpack_require__(25259);
var _parseJson = _interopRequireDefault(__webpack_require__(78261));
var _utils = __webpack_require__(46580);
var _storage = __webpack_require__(97467);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var stringifyTestSuite = exports.stringifyTestSuite = function stringifyTestSuite(testSuite) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var obj = _objectSpread(_objectSpread(_objectSpread({
    creationDate: (0, _utils.formatDate)(new Date()),
    name: testSuite.name,
    macros: testSuite.cases.map(function (item) {
      var loops = parseInt(item.loops, 10);
      return {
        macro: item.testCaseId,
        loops: loops
      };
    })
  }, opts.withFold ? {
    fold: !!testSuite.fold
  } : {}), opts.withId && testSuite.id ? {
    id: testSuite.id
  } : {}), opts.withPlayStatus && testSuite.playStatus ? {
    playStatus: testSuite.playStatus
  } : {});
  return JSON.stringify(obj, null, 2);
};
var parseTestSuite = exports.parseTestSuite = function parseTestSuite(text) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Note: Exported JSON from older version Kantu (via 'export to json')
  // has an invisible charactor (char code65279, known as BOM). It breaks JSON parser.
  // So it's safer to filter it out here
  var obj = (0, _parseJson["default"])(text.replace(/^\s*/, ''));
  if (typeof obj.name !== 'string' || obj.name.length === 0) {
    throw new Error('name must be a string');
  }
  if (!Array.isArray(obj.macros)) {
    throw new Error('macros must be an array');
  }
  var cases = obj.macros.map(function (item) {
    if (typeof item.loops !== 'number' || item.loops < 1) {
      item.loops = 1;
    }
    return {
      testCaseId: item.macro,
      loops: item.loops
    };
  });
  var ts = _objectSpread(_objectSpread(_objectSpread({
    cases: cases,
    name: opts.fileName ? opts.fileName.replace(/\.json$/i, '') : obj.name
  }, opts.withFold ? {
    fold: obj.fold === undefined ? true : obj.fold
  } : {}), opts.withId && obj.id ? {
    id: obj.id
  } : {}), opts.withPlayStatus && obj.playStatus ? {
    playStatus: obj.playStatus
  } : {});
  return ts;
};
var validateTestSuiteText = exports.validateTestSuiteText = parseTestSuite;

/***/ }),

/***/ 75852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fromHtml = fromHtml;
exports.fromJSONString = fromJSONString;
exports.generateEmptyHtml = generateEmptyHtml;
exports.generateMacroEntryHtml = generateMacroEntryHtml;
exports.toBookmarkData = toBookmarkData;
exports.toHtml = toHtml;
exports.toHtmlDataUri = toHtmlDataUri;
exports.toJSONDataUri = toJSONDataUri;
exports.toJSONString = toJSONString;
__webpack_require__(25259);
var _parseJson = _interopRequireDefault(__webpack_require__(78261));
var _urlParse = _interopRequireDefault(__webpack_require__(61160));
var _command = __webpack_require__(85393);
var _storage = __webpack_require__(97467);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var joinUrl = function joinUrl(base, url) {
  var urlObj = new _urlParse["default"](url, base);
  return urlObj.toString();
};

// HTML template from test case
function genHtml(_ref) {
  var name = _ref.name,
    baseUrl = _ref.baseUrl,
    commandTrs = _ref.commandTrs,
    noImport = _ref.noImport;
  var tableHtml = noImport ? '<h3>Starting Browser and UI.Vision...</h3>' : "\n    <table cellpadding=\"1\" cellspacing=\"1\" border=\"1\">\n    <thead>\n    <tr><td rowspan=\"1\" colspan=\"3\">".concat(name, "</td></tr>\n    </thead><tbody>\n    ").concat(commandTrs.join('\n'), "\n    </tbody></table>\n  ");
  var baseLink = noImport ? '' : "<link rel=\"selenium.base\" href=\"".concat(baseUrl, "\" />");
  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\n<head profile=\"http://selenium-ide.openqa.org/profiles/test-case\">\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n".concat(baseLink, "\n<title>").concat(name, "</title>\n</head>\n<body>\n").concat(tableHtml, "\n<script>\n(function() {\n  var isExtensionLoaded = function () {\n    const $root = document.documentElement\n    return !!$root && !!$root.getAttribute('data-kantu')\n  }\n  var increaseCountInUrl = function (max) {\n    var url   = new URL(window.location.href)\n    var count = 1 + (parseInt(url.searchParams.get('reload') || 0))\n\n    url.searchParams.set('reload', count)\n    var nextUrl = url.toString()\n\n    var shouldStop = count > max\n    return [shouldStop, !shouldStop ? nextUrl : null]\n  }\n  var run = function () {\n    try {\n      var evt = new CustomEvent('kantuSaveAndRunMacro', {\n        detail: {\n          html: document.documentElement.outerHTML,\n          noImport: ").concat(noImport || 'false', ",\n          storageMode: '").concat((0, _storage.getStorageManager)().getCurrentStrategyType(), "'\n        }\n      })\n\n      window.dispatchEvent(evt)\n      var intervalTimer = setInterval(() => window.dispatchEvent(evt), 1000);\n\n      if (window.location.protocol === 'file:') {\n        var onInvokeSuccess = function () {\n          clearTimeout(timer)\n          clearTimeout(reloadTimer)\n          clearInterval(intervalTimer)\n          window.removeEventListener('kantuInvokeSuccess', onInvokeSuccess)\n        }\n        var timer = setTimeout(function () {\n          alert('Error #203: It seems you need to turn on *Allow access to file URLs* for Kantu in your browser extension settings.')\n        }, 8000)\n\n        window.addEventListener('kantuInvokeSuccess', onInvokeSuccess)\n      }\n    } catch (e) {\n      alert('Kantu Bookmarklet error: ' + e.toString());\n    }\n  }\n  var reloadTimer = null\n  var main = function () {\n    if (isExtensionLoaded())  return run()\n\n    var MAX_TRY   = 3\n    var INTERVAL  = 1000\n    var tuple     = increaseCountInUrl(MAX_TRY)\n\n    if (tuple[0]) {\n      return alert('Error #204: It seems Ui.Vision is not installed yet - or you need to turn on *Allow access to file URLs* for Ui.Vision in your browser extension settings.')\n    } else {\n      reloadTimer = setTimeout(function () {\n        window.location.href = tuple[1]\n      }, INTERVAL)\n    }\n  }\n\n  setTimeout(main, 500)\n})();\n</script>\n</body>\n</html>\n  ");
}

// generate data uri from html
function htmlDataUri(html) {
  return 'data:text/html;base64,' + window.btoa(unescape(encodeURIComponent(html)));
}

// generate data uri from json
function jsonDataUri(str) {
  return 'data:text/json;base64,' + window.btoa(unescape(encodeURIComponent(str)));
}

// generate html from a test case
function toHtml(_ref2) {
  var name = _ref2.name,
    commands = _ref2.commands;
  var copyCommands = commands.map(function (c) {
    return Object.assign({}, c);
  });
  var openTc = copyCommands.find(function (tc) {
    return tc.cmd === 'open';
  });

  // Note: Aug 10, 2018, no baseUrl when exported to html
  // so that `${variable}` could be used in open command, and won't be prefixed with baseUrl
  var origin = null;
  var replacePath = function replacePath(path) {
    return path;
  };
  // const url         = openTc && new URL(openTc.target)
  // const origin      = url && url.origin
  // const replacePath = (path) => {
  //   if (path.indexOf(origin) !== 0) return path
  //   const result = path.replace(origin, '')
  //   return result.length === 0 ? '/' : result
  // }

  if (openTc) {
    openTc.target = replacePath(openTc.target);
  }
  var commandTrs = copyCommands.map(function (c) {
    if (c.cmd === 'open') {
      // Note: remove origin if it's the same as the first open command
      c.target = replacePath(c.target);
    }
    return "\n      <tr>\n        <td>".concat(c.cmd || '', "</td>\n        <td>").concat(c.target || '', "</td>\n        <td>").concat(c.value || '', "</td>\n      </tr>\n    ");
  });
  return genHtml({
    name: name,
    commandTrs: commandTrs,
    baseUrl: origin || ''
  });
}
function generateEmptyHtml() {
  return genHtml({
    name: 'UI.Vision Autostart Page',
    commandTrs: [],
    baseUrl: '',
    noImport: true
  });
}

// generate data uri of html from a test case
function toHtmlDataUri(obj) {
  return htmlDataUri(toHtml(obj));
}

// parse html to test case
function fromHtml(html) {
  var $root = document.createElement('div');
  $root.innerHTML = html;
  var $base = $root.querySelector('link');
  var $title = $root.querySelector('title');
  var $trs = $root.querySelectorAll('tbody > tr');
  var baseUrl = $base && $base.getAttribute('href');
  var name = $title.innerText;
  if (!name || !name.length) {
    throw new Error('fromHtml: missing title');
  }
  var commands = [].slice.call($trs).map(function (tr) {
    var trHtml = tr.outerHtml;

    // Note: remove any datalist option in katalon-like html file
    Array.from(tr.querySelectorAll('datalist')).forEach(function ($item) {
      $item.remove();
    });
    var children = tr.children;
    var $cmd = children[0];
    var $tgt = children[1];
    var $val = children[2];
    var cmd = (0, _command.normalizeCommandName)($cmd && $cmd.innerText);
    var value = $val && $val.innerText;
    var target = $tgt && $tgt.innerText;
    if (!cmd || !cmd.length) {
      throw new Error('missing cmd in ' + trHtml);
    }
    if (cmd === 'open') {
      // Note: with or without baseUrl
      target = baseUrl && baseUrl.length && !/:\/\//.test(target) ? joinUrl(baseUrl, target) : target;
    }
    return {
      cmd: cmd,
      target: target,
      value: value
    };
  });
  return {
    name: name,
    data: {
      commands: commands
    }
  };
}

// parse json to test case
// the current json structure doesn't provide fileName,
// so must provide a file name as the second parameter
function fromJSONString(str, fileName) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Note: Exported JSON from older version Kantu (via 'export to json')
  // has an invisible charactor (char code65279, known as BOM). It breaks JSON parser.
  // So it's safer to filter it out here
  var obj = (0, _parseJson["default"])(str.replace(/^\s*/, ''));
  var name = fileName ? fileName.replace(/\.json$/i, '') : obj.Name || '__imported__';
  if (obj.macros) {
    throw new Error("This is a test suite, not a macro");
  }
  if (!Array.isArray(obj.Commands)) {
    throw new Error("'Commands' field must be an array");
  }
  var commands = obj.Commands.map(function (c) {
    var obj = {
      cmd: (0, _command.normalizeCommandName)(c.Command),
      target: c.Target,
      value: c.Value,
      description: c.Description || ''
    };
    if (Array.isArray(c.Targets)) {
      obj.targetOptions = c.Targets;
    }
    return obj;
  });
  return _objectSpread(_objectSpread({
    name: name,
    data: {
      commands: commands
    }
  }, opts.withStatus && obj.status ? {
    status: obj.status
  } : {}), opts.withId && obj.id ? {
    id: obj.id
  } : {});
}

// generate json from a test case
function toJSONString(obj) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var getToday = function getToday() {
    var d = new Date();
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  };
  var data = _objectSpread(_objectSpread({
    Name: obj.name,
    CreationDate: getToday(),
    Commands: obj.commands.map(function (c) {
      return {
        Command: c.cmd,
        Target: c.target || '',
        Value: c.value || '',
        Targets: !opts.ignoreTargetOptions ? c.targetOptions : undefined,
        Description: c.description || ''
      };
    })
  }, opts.withStatus && obj.status ? {
    status: obj.status
  } : {}), opts.withId && obj.id ? {
    id: obj.id
  } : {});
  return JSON.stringify(data, null, 2);
}

// generate data uri of json from a test case
function toJSONDataUri(obj) {
  return jsonDataUri(toJSONString(obj));
}
function toBookmarkData(obj) {
  var path = obj.path,
    bookmarkTitle = obj.bookmarkTitle;
  if (!path) throw new Error('path is required to generate bookmark for macro');
  if (!bookmarkTitle) throw new Error('bookmarkTitle is required to generate bookmark for macro');

  // Note: for backward compatibility, still use `name` field (which makes sense in flat fs mode) to store `path`
  // after we migrate to standard folder mode
  //
  // Use `JSON.stringify(path)` so that it could escape "\" in win32 paths
  return {
    title: bookmarkTitle,
    url: "javascript:\n      (function() {\n        try {\n          var evt = new CustomEvent('kantuRunMacro', {\n            detail: {\n              name: ".concat(JSON.stringify(path.replace(/\.json$/i, '')), ",\n              from: 'bookmark',\n              storageMode: '").concat((0, _storage.getStorageManager)().getCurrentStrategyType(), "',\n              closeRPA: 1\n            }\n          });\n          window.dispatchEvent(evt);\n        } catch (e) {\n          alert('Ui.Vision Bookmarklet error: ' + e.toString());\n        }\n      })();\n    ").replace(/\n\s*/g, '')
  };
}

// It's a macro.html file that tries to open ui.vision.html which will be exported together
// with this entry html
function generateMacroEntryHtml(macroRelativePath) {
  return "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <title>UI.Vision Shortcut Page</title>\n  </head>\n  <body>\n    <h3>Command line:</h3>\n    <a id=\"run\" href=\"ui.vision.html?direct=1&savelog=log.txt&macro=".concat(macroRelativePath, "\">Click here</a>\n    <br>\n    <br>\n    <!-- To start another macro just edit this HTML file and change the macro name in the command line above^. -->\n    <!-- For more command line parameters see https://ui.vision/rpa/docs#cmd -->\n    <script>\n      window.location.href = document.getElementById(\"run\").getAttribute(\"href\");\n    </script>\n  </body>\n</html>\n");
}

/***/ }),

/***/ 9863:
/***/ (() => {

// purpose of this module is to be use by webpack NormalModuleReplacementPlugin


/***/ }),

/***/ 61222:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
__webpack_require__(9863);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // idb.filesystem.js is required for Firefox because it doesn't support `requestFileSystem` and `webkitRequestFileSystem`
var fs = function () {
  var requestFileSystem = self.requestFileSystem || self.webkitRequestFileSystem;
  if (!requestFileSystem) {
    console.warn('requestFileSystem not supported');
    return undefined;
  }
  var dumbSize = 1024 * 1024;
  var maxSize = 5 * 1024 * 1024;
  var getFS = function getFS(size) {
    size = size || maxSize;
    return new Promise(function (resolve, reject) {
      requestFileSystem(window.TEMPORARY, size, resolve, reject);
    });
  };
  var getDirectory = function getDirectory(dir, shouldCreate, fs) {
    var parts = (Array.isArray(dir) ? dir : dir.split('/')).filter(function (p) {
      return p && p.length;
    });
    var getDir = function getDir(parts, directoryEntry) {
      if (!parts || !parts.length) return Promise.resolve(directoryEntry);
      return new Promise(function (resolve, reject) {
        directoryEntry.getDirectory(parts[0], {
          create: !!shouldCreate
        }, function (dirEntry) {
          return resolve(dirEntry);
        }, function (e) {
          return reject(e);
        });
      }).then(function (entry) {
        return getDir(parts.slice(1), entry);
      });
    };
    var pFS = fs ? Promise.resolve(fs) : getFS(dumbSize);
    return pFS.then(function (fs) {
      return getDir(parts, fs.root);
    });
  };
  var ensureDirectory = function ensureDirectory(dir, fs) {
    return getDirectory(dir, true, fs);
  };
  var rmdir = function rmdir(dir, fs) {
    return getDirectory(dir, false, fs).then(function (directoryEntry) {
      return new Promise(function (resolve, reject) {
        directoryEntry.remove(resolve, reject);
      });
    });
  };
  var rmdirR = function rmdirR(dir, fs) {
    return getDirectory(dir, false, fs).then(function (directoryEntry) {
      return new Promise(function (resolve, reject) {
        return directoryEntry.removeRecursively(resolve, reject);
      });
    });
  };

  // @return a Promise of [FileSystemEntries]
  var list = function list() {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    return getFS(dumbSize).then(function (fs) {
      return new Promise(function (resolve, reject) {
        getDirectory(dir).then(function (dirEntry) {
          var result = [];
          var dirReader = dirEntry.createReader();
          var read = function read() {
            dirReader.readEntries(function (entries) {
              if (entries.length === 0) {
                resolve(result.sort());
              } else {
                result = result.concat(Array.from(entries));
                read();
              }
            }, reject);
          };
          read();
        })["catch"](reject);
      });
    })["catch"](function (e) {
      console.warn('list', e.code, e.name, e.message);
      throw e;
    });
  };
  var fileLocator = function fileLocator(filePath, fs) {
    var parts = filePath.split('/');
    return getDirectory(parts.slice(0, -1), false, fs).then(function (directoryEntry) {
      return {
        directoryEntry: directoryEntry,
        fileName: parts.slice(-1)[0]
      };
    });
  };
  var readFile = function readFile(filePath, type) {
    if (['ArrayBuffer', 'BinaryString', 'DataURL', 'Text'].indexOf(type) === -1) {
      throw new Error("invalid readFile type, '".concat(type, "'"));
    }
    return getFS().then(function (fs) {
      return fileLocator(filePath, fs).then(function (_ref) {
        var directoryEntry = _ref.directoryEntry,
          fileName = _ref.fileName;
        return new Promise(function (resolve, reject) {
          directoryEntry.getFile(fileName, {}, function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function () {
                resolve(this.result);
              };
              switch (type) {
                case 'ArrayBuffer':
                  return reader.readAsArrayBuffer(file);
                case 'BinaryString':
                  return reader.readAsBinaryString(file);
                case 'DataURL':
                  return reader.readAsDataURL(file);
                case 'Text':
                  return reader.readAsText(file);
                default:
                  throw new Error("unsupported data type, '".concat(type));
              }
            }, reject);
          }, reject);
        });
      });
    })["catch"](function (e) {
      console.warn('readFile', e.code, e.name, e.message);
      throw e;
    });
  };
  var writeFile = function writeFile(filePath, blob, size) {
    return getFS(size).then(function (fs) {
      return fileLocator(filePath, fs).then(function (_ref2) {
        var directoryEntry = _ref2.directoryEntry,
          fileName = _ref2.fileName;
        return new Promise(function (resolve, reject) {
          directoryEntry.getFile(fileName, {
            create: true
          }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
              fileWriter.onwriteend = function () {
                return resolve(fileEntry.toURL());
              };
              fileWriter.onerror = reject;
              fileWriter.write(blob);
            });
          }, reject);
        });
      });
    })["catch"](function (e) {
      console.warn(e.code, e.name, e.message);
      throw e;
    });
  };
  var removeFile = function removeFile(filePath) {
    return getFS().then(function (fs) {
      return fileLocator(filePath, fs).then(function (_ref3) {
        var directoryEntry = _ref3.directoryEntry,
          fileName = _ref3.fileName;
        return new Promise(function (resolve, reject) {
          directoryEntry.getFile(fileName, {
            create: true
          }, function (fileEntry) {
            fileEntry.remove(resolve, reject);
          }, reject);
        });
      });
    })["catch"](function (e) {
      console.warn('removeFile', e.code, e.name, e.message);
      throw e;
    });
  };
  var moveFile = function moveFile(srcPath, targetPath) {
    return getFS().then(function (fs) {
      return Promise.all([fileLocator(srcPath, fs), fileLocator(targetPath, fs)]).then(function (tuple) {
        var srcDirEntry = tuple[0].directoryEntry;
        var srcFileName = tuple[0].fileName;
        var tgtDirEntry = tuple[1].directoryEntry;
        var tgtFileName = tuple[1].fileName;
        return new Promise(function (resolve, reject) {
          srcDirEntry.getFile(srcFileName, {}, function (fileEntry) {
            try {
              fileEntry.moveTo(tgtDirEntry, tgtFileName, resolve, reject);
            } catch (e) {
              // Note: For firefox, we use `idb.filesystem.js`, but it hasn't implemented `moveTo` method
              // so we have to mock it with read / write / remove
              readFile(srcPath, 'ArrayBuffer').then(function (arrayBuffer) {
                return writeFile(targetPath, new Blob([new Uint8Array(arrayBuffer)]));
              }).then(function () {
                return removeFile(srcPath);
              }).then(resolve, reject);
            }
          }, reject);
        });
      });
    });
  };
  var copyFile = function copyFile(srcPath, targetPath) {
    return getFS().then(function (fs) {
      return Promise.all([fileLocator(srcPath, fs), fileLocator(targetPath, fs)]).then(function (tuple) {
        var srcDirEntry = tuple[0].directoryEntry;
        var srcFileName = tuple[0].fileName;
        var tgtDirEntry = tuple[1].directoryEntry;
        var tgtFileName = tuple[1].fileName;
        return new Promise(function (resolve, reject) {
          srcDirEntry.getFile(srcFileName, {}, function (fileEntry) {
            try {
              fileEntry.copyTo(tgtDirEntry, tgtFileName, resolve, reject);
            } catch (e) {
              // Note: For firefox, we use `idb.filesystem.js`, but it hasn't implemented `copyTo` method
              // so we have to mock it with read / write
              readFile(srcPath, 'ArrayBuffer').then(function (arrayBuffer) {
                return writeFile(targetPath, new Blob([new Uint8Array(arrayBuffer)]));
              }).then(resolve, reject);
            }
          }, reject);
        });
      });
    })["catch"](function (e) {
      console.warn('copyFile', e.code, e.name, e.message);
      throw e;
    });
  };
  var getMetadata = function getMetadata(filePath) {
    var isDirectory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return getFS().then(function (fs) {
      if (filePath.getMetadata) {
        return new Promise(function (resolve, reject) {
          return filePath.getMetadata(resolve);
        });
      }
      return fileLocator(filePath, fs).then(function (_ref4) {
        var directoryEntry = _ref4.directoryEntry,
          fileName = _ref4.fileName;
        return new Promise(function (resolve, reject) {
          var args = [fileName, {
            create: false
          }, function (entry) {
            entry.getMetadata(resolve);
          }, reject];
          if (isDirectory) {
            directoryEntry.getDirectory.apply(directoryEntry, args);
          } else {
            directoryEntry.getFile.apply(directoryEntry, args);
          }
        });
      });
    })["catch"](function (e) {
      console.warn('getMetadata', e.code, e.name, e.message);
      throw e;
    });
  };
  var existsStat = function existsStat(entryPath) {
    return getFS().then(function (fs) {
      return fileLocator(entryPath, fs).then(function (_ref5) {
        var directoryEntry = _ref5.directoryEntry,
          fileName = _ref5.fileName;
        var isSomeEntry = function isSomeEntry(getMethodName) {
          return new Promise(function (resolve) {
            directoryEntry[getMethodName](fileName, {
              create: false
            }, function (data) {
              resolve(true);
            }, function () {
              return resolve(false);
            });
          });
        };
        var pIsFile = isSomeEntry('getFile');
        var pIsDir = isSomeEntry('getDirectory');
        return Promise.all([pIsFile, pIsDir]).then(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
            isFile = _ref7[0],
            isDirectory = _ref7[1];
          return {
            isFile: isFile,
            isDirectory: isDirectory
          };
        });
      });
    })["catch"](function (e) {
      // DOMException.NOT_FOUND_ERR === 8
      if (e && e.code === 8) {
        return {
          isFile: false,
          isDirectory: false
        };
      }
      console.warn('fs.exists', e.code, e.name, e.message);
      throw e;
    });
  };
  var exists = function exists(entryPath) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      type = _ref8.type;
    return existsStat(entryPath).then(function (stat) {
      switch (type) {
        case 'file':
          return stat.isFile;
        case 'directory':
          return stat.isDirectory;
        default:
          return stat.isFile || stat.isDirectory;
      }
    });
  };
  return {
    list: list,
    readFile: readFile,
    writeFile: writeFile,
    removeFile: removeFile,
    moveFile: moveFile,
    copyFile: copyFile,
    getDirectory: getDirectory,
    getMetadata: getMetadata,
    ensureDirectory: ensureDirectory,
    exists: exists,
    existsStat: existsStat,
    rmdir: rmdir,
    rmdirR: rmdirR
  };
}();

// For test only
self.fs = fs;
var _default = exports["default"] = fs;

/***/ }),

/***/ 42143:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.globMatch = globMatch;
var _kdGlobToRegexp = _interopRequireDefault(__webpack_require__(44191));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function globMatch(pattern, text, opts) {
  var reg = (0, _kdGlobToRegexp["default"])(pattern, opts || {});
  var res = reg.test(text);
  return res;
}

/***/ }),

/***/ 26513:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
Object.defineProperty(exports, "posix", ({
  enumerable: true,
  get: function get() {
    return _path.posix;
  }
}));
Object.defineProperty(exports, "win32", ({
  enumerable: true,
  get: function get() {
    return _path.win32;
  }
}));
var _path = __webpack_require__(43627);
var isWindows = /windows/i.test(self.navigator.userAgent);
var path = isWindows ? _path.win32 : _path.posix;
var _default = exports["default"] = path;

/***/ })

}]);