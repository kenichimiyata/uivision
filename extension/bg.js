/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 94083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

const colorConvert = __webpack_require__(10734);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ 81909:
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

/***/ 92642:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function setStyle($dom, obj) {
  Object.keys(obj).forEach(function (key) {
    $dom.style[key] = obj[key];
  });
}
function createTextarea() {
  // [legacy code] Used to use textarea for copy/paste
  //
  // const $input = document.createElement('textarea')
  // // Note: Firefox requires 'contenteditable' attribute, even on textarea element
  // // without it, execCommand('paste') won't work in Firefox
  // // reference: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#Browser-specific_considerations_2
  // $input.setAttribute('contenteditable', true)
  // $input.id = 'clipboard_textarea'

  // Note: 2018-09-01, Firefox 61.0.2: Only able to paste clipboard into textarea for one time.
  // Switching to contenteditable div works fine
  var $input = document.createElement('div');
  $input.setAttribute('contenteditable', 'true');
  $input.id = 'clipboard_textarea';
  setStyle($input, {
    position: 'aboslute',
    top: '-9999px',
    left: '-9999px'
  });
  (document.body || document.documentElement).appendChild($input);
  return $input;
}
function getTextArea() {
  var $el = document.getElementById('clipboard_textarea');
  if ($el) return $el;
  return createTextarea();
}
function withInput(fn) {
  var $input = getTextArea();
  var ret;
  try {
    ret = fn($input);
  } catch (e) {
    console.error(e);
  } finally {
    $input.innerHTML = '';
  }
  return ret;
}
var api = {
  set: function set(text) {
    withInput(function ($input) {
      $input.innerText = text;
      $input.focus();
      document.execCommand('selectAll', false, null);
      document.execCommand('copy');
    });
  },
  get: function get() {
    return withInput(function ($input) {
      $input.blur();
      $input.focus();
      var res = document.execCommand('paste');
      if (res) {
        return $input.innerText;
      }
      return 'no luck';
    });
  }
};
var _default = exports["default"] = api;

/***/ }),

/***/ 85393:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

/***/ 62042:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

/***/ 92950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 36447:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = interceptLog;
/**
 * 
 * @description 
 * it is used to intercept log in production environment
 */
function interceptLog() {
  var isProduction = "production" === 'production';
  if (isProduction) {
    var noop = function noop() {};
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
  }
}

/***/ }),

/***/ 75866:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 50298:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

/***/ 89130:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

/***/ 6866:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  proxy: {
    notControllable: 'The proxy settings are controlled by other app(s) or extension(s). Please disable or uninstall the apps or extensions in conflict'
  },
  contentHidden: 'Content is hidden during replay'
};

/***/ }),

/***/ 50149:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Registry = void 0;
exports.createListenerRegistry = createListenerRegistry;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Registry = exports.Registry = /*#__PURE__*/function () {
  function Registry(_ref) {
    var process = _ref.process,
      onZero = _ref.onZero,
      onOne = _ref.onOne;
    _classCallCheck(this, Registry);
    this.cache = {};
    this.process = process;
    this.onZero = onZero || function () {};
    this.onOne = onOne || function () {};
  }
  _createClass(Registry, [{
    key: "add",
    value: function add(id, obj) {
      this.cache[id] = this.cache[id] || [];
      this.cache[id].push(obj);
      if (this.cache[id].length === 1) {
        try {
          this.onOne(id);
        } catch (e) {
          // tslint:disable-next-line
          console.error('in onOne, ' + e.message);
        }
      }
      return true;
    }
  }, {
    key: "remove",
    value: function remove(id, obj) {
      if (!this.cache[id]) {
        return false;
      }
      this.cache[id] = this.cache[id].filter(function (item) {
        return item !== obj;
      });
      if (this.cache[id].length === 0) {
        try {
          this.onZero(id);
        } catch (e) {
          // tslint:disable-next-line
          console.error('in onZero, ' + e.message);
        }
      }
      return true;
    }
  }, {
    key: "removeAllWithData",
    value: function removeAllWithData(obj) {
      var _this = this;
      Object.keys(this.cache).forEach(function (id) {
        for (var i = _this.cache[id].length - 1; i >= 0; i--) {
          if (_this.cache[id][i] === obj) {
            _this.remove(id, _this.cache[id][i]);
          }
        }
      });
    }
  }, {
    key: "fire",
    value: function fire(id, data) {
      var _this2 = this;
      if (!this.cache[id]) {
        return false;
      }
      this.cache[id].forEach(function (item) {
        try {
          _this2.process(item, data, id);
        } catch (e) {
          // tslint:disable-next-line
          console.error('in process, ' + e.message);
        }
      });
      return true;
    }
  }, {
    key: "has",
    value: function has(id) {
      return this.cache[id] && this.cache[id].length > 0;
    }
  }, {
    key: "keys",
    value: function keys() {
      var _this3 = this;
      return Object.keys(this.cache).filter(function (key) {
        return _this3.cache[key] && _this3.cache[key].length > 0;
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;
      Object.keys(this.cache).forEach(function (id) {
        try {
          _this4.onZero(id);
        } catch (e) {
          // tslint:disable-next-line
          console.error('in onZero, ' + e.message);
        }
      });
      this.cache = {};
    }
  }]);
  return Registry;
}();
function createListenerRegistry() {
  return new Registry({
    process: function process(fn, data, id) {
      fn(data);
    }
  });
}

/***/ }),

/***/ 20041:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createTab = exports.activateTab = void 0;
exports.getAllTabs = getAllTabs;
exports.getAllTabsInWindow = getAllTabsInWindow;
exports.getAllWindows = getAllWindows;
exports.getTab = exports.getCurrentTab = void 0;
exports.updateUrlForTab = updateUrlForTab;
var _ts_utils = __webpack_require__(1601);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _global_state = __webpack_require__(8327);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var createTab = exports.createTab = function createTab(url) {
  return _web_extension["default"].tabs.create({
    url: url,
    active: true
  });
};
var activateTab = exports.activateTab = function activateTab(tabId) {
  var focusWindow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return _web_extension["default"].tabs.get(tabId).then(function (tab) {
    var p = focusWindow ? _web_extension["default"].windows.update(tab.windowId, {
      focused: true
    }) : Promise.resolve();
    return p.then(function () {
      return _web_extension["default"].tabs.update(tab.id, {
        active: true
      });
    }).then(function () {
      return tab;
    });
  });
};
var getTab = exports.getTab = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(tabId) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", _web_extension["default"].tabs.get(tabId));
        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _web_extension["default"].tabs.query({
            active: true
          }));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function getTab(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getCurrentTab = exports.getCurrentTab = function getCurrentTab(winId) {
  var pWin = winId ? _web_extension["default"].windows.get(winId) : _web_extension["default"].windows.getLastFocused();
  return pWin.then(function (win) {
    return _web_extension["default"].tabs.query({
      active: true,
      windowId: win.id
    }).then(function (tabs) {
      return tabs[0];
    });
  });
};
function updateUrlForTab(_x2, _x3, _x4) {
  return _updateUrlForTab.apply(this, arguments);
}
function _updateUrlForTab() {
  _updateUrlForTab = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tabId, url, cmd) {
    var _newUrl$hash;
    var tab, tabUrl, newUrl, isSamePath, noReload, state, bwindowId, doFlag, wTabs, i, winTab, wTab, targetTabId;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(typeof tabId === "number")) {
            _context2.next = 6;
            break;
          }
          _context2.next = 3;
          return _web_extension["default"].tabs.get(tabId);
        case 3:
          _context2.t0 = _context2.sent;
          _context2.next = 7;
          break;
        case 6:
          _context2.t0 = tabId;
        case 7:
          tab = _context2.t0;
          tabUrl = new URL(tab.url);
          newUrl = new URL(url);
          isSamePath = tabUrl.origin + tabUrl.pathname === newUrl.origin + tabUrl.pathname; // Browsers won't reload the page if the new url is only different in hash
          noReload = isSamePath && !!((_newUrl$hash = newUrl.hash) !== null && _newUrl$hash !== void 0 && _newUrl$hash.length);
          _context2.next = 14;
          return (0, _global_state.getState)();
        case 14:
          state = _context2.sent;
          bwindowId = state.tabIds.bwindowId;
          doFlag = [];
          _context2.next = 19;
          return _web_extension["default"].windows.getAll();
        case 19:
          wTabs = _context2.sent;
          i = wTabs.length - 1;
        case 21:
          if (!(i >= 0)) {
            _context2.next = 28;
            break;
          }
          if (!(wTabs[i].id === bwindowId)) {
            _context2.next = 25;
            break;
          }
          doFlag = wTabs[i];
          return _context2.abrupt("break", 28);
        case 25:
          i--;
          _context2.next = 21;
          break;
        case 28:
          if (!(cmd == "openBrowser" && doFlag.length == 0)) {
            _context2.next = 42;
            break;
          }
          _context2.next = 31;
          return _web_extension["default"].windows.create({
            url: url
          });
        case 31:
          _context2.next = 33;
          return getCurrentTab();
        case 33:
          winTab = _context2.sent;
          bwindowId = winTab.windowId;
          _context2.next = 37;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                lastPlay: state.tabIds.toPlay,
                toPlay: winTab.id,
                firstPlay: winTab.id,
                bwindowId: winTab.windowId
              })
            });
          });
        case 37:
          _context2.next = 39;
          return getTab(winTab.id);
        case 39:
          return _context2.abrupt("return", _context2.sent);
        case 42:
          if (!(doFlag.length != 0)) {
            _context2.next = 48;
            break;
          }
          _context2.next = 45;
          return getCurrentTab(doFlag.id);
        case 45:
          _context2.t1 = _context2.sent;
          _context2.next = 49;
          break;
        case 48:
          _context2.t1 = '';
        case 49:
          wTab = _context2.t1;
          //const targetTabId = wTab !="" && cmd == "openBrowser" ? wTab.id : tab.id;
          targetTabId = tab.id;
          if (!noReload) {
            _context2.next = 56;
            break;
          }
          _context2.next = 54;
          return _web_extension["default"].tabs.update(targetTabId, {
            url: "about:blank"
          });
        case 54:
          _context2.next = 56;
          return (0, _ts_utils.delay)(function () {}, 100);
        case 56:
          _context2.next = 58;
          return _web_extension["default"].tabs.update(targetTabId, {
            url: url
          });
        case 58:
          _context2.next = 60;
          return getTab(targetTabId);
        case 60:
          return _context2.abrupt("return", _context2.sent);
        case 61:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _updateUrlForTab.apply(this, arguments);
}
function getAllWindows() {
  return _web_extension["default"].windows.getAll();
}
function getAllTabsInWindow(windowId) {
  return _web_extension["default"].windows.get(windowId, {
    populate: true
  }).then(function (win) {
    var _win$tabs;
    return (_win$tabs = win === null || win === void 0 ? void 0 : win.tabs) !== null && _win$tabs !== void 0 ? _win$tabs : [];
  });
}
function getAllTabs() {
  return _getAllTabs.apply(this, arguments);
}
function _getAllTabs() {
  _getAllTabs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _ref2;
    var wins, list;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getAllWindows();
        case 2:
          wins = _context3.sent;
          _context3.next = 5;
          return Promise.all(wins.map(function (win) {
            return getAllTabsInWindow(win.id);
          }));
        case 5:
          list = _context3.sent;
          return _context3.abrupt("return", (_ref2 = []).concat.apply(_ref2, _toConsumableArray(list)));
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getAllTabs.apply(this, arguments);
}

/***/ }),

/***/ 1601:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 14125:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

/***/ 8747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 40987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 17767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.checkIfSidePanelOpen = void 0;
var _ipc_bg_cs = __webpack_require__(59711);
var _global_state = __webpack_require__(8327);
var _tab = __webpack_require__(13755);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var checkIfSidePanelOpen = exports.checkIfSidePanelOpen = function checkIfSidePanelOpen() {
  return (0, _tab.getPanelTabIpc)().then(function (panelIpc) {
    var isActivePromise = panelIpc.ask("IS_ACTIVE");
    // Timeout promise to reject if the panel doesn't respond in 1.5 seconds
    var timeoutPromise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        // console.error("Error:>> Panel did not respond in time. It is considered to be closed.");
        reject(false);
      }, 1500);
    });
    var racePromise = Promise.race([isActivePromise, timeoutPromise]);
    return racePromise;
  }).then(function (isPanelActive) {
    console.log("isPanel tab Active:>>", isPanelActive);
    return (0, _global_state.getState)().then(function (state) {
      return [isPanelActive, state];
    });
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      isPanelActive = _ref2[0],
      state = _ref2[1];
    var isSidePanelOpen = isPanelActive && state.tabIds.panel === _ipc_bg_cs.SIDEPANEL_TAB_ID;
    return isSidePanelOpen;
  })["catch"](function (err) {
    console.error("Error in checkIfSidePanelOpen:>>", err);
    return false;
  });
};

/***/ }),

/***/ 13755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.genGetTabIpc = genGetTabIpc;
exports.getActiveTab = getActiveTab;
exports.getActiveTabId = getActiveTabId;
exports.getPanelTabIpc = exports.getInspectTabIpc = void 0;
exports.getPlayTab = getPlayTab;
exports.getPlayTabIpc = void 0;
exports.getPlayTabOpenB = getPlayTabOpenB;
exports.getRecordTabIpc = void 0;
exports.showPanelWindow = showPanelWindow;
exports.withPanelIpc = withPanelIpc;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _ts_utils = __webpack_require__(1601);
var _ipc_cache = __webpack_require__(75866);
var _global_state = __webpack_require__(8327);
var _tab_utils = __webpack_require__(20041);
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _ipc_bg_cs = __webpack_require__(59711);
var _sidepanel = __webpack_require__(17767);
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Generate function to get ipc based on tabIdName and some error message
function genGetTabIpc(tabIdName, purpose) {
  return function () {
    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
    return (0, _ts_utils.retry)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var state, tabId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _global_state.getState)();
          case 2:
            state = _context.sent;
            tabId = state.tabIds[tabIdName];
            if (tabId) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", Promise.reject(new Error("Error #150: No tab for ".concat(purpose, " yet"))));
          case 6:
            if (!(tabId === _ipc_bg_cs.SIDEPANEL_TAB_ID)) {
              _context.next = 10;
              break;
            }
            return _context.abrupt("return", {
              id: _ipc_bg_cs.SIDEPANEL_TAB_ID
            });
          case 10:
            return _context.abrupt("return", _web_extension["default"].tabs.get(tabId));
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })), {
      timeout: timeout,
      retryInterval: 100,
      shouldRetry: function shouldRetry() {
        return true;
      }
    })().then(function (tab) {
      if (!tab) {
        throw new Error("Error #160: The ".concat(purpose, " tab seems to be closed"));
      }
      return (0, _ipc_cache.getIpcCache)().get(tab.id, timeout, before)["catch"](function (e) {
        throw new Error("Error #170: No ipc available for the ".concat(purpose, " tab"));
      });
    });
  };
}
var getRecordTabIpc = exports.getRecordTabIpc = genGetTabIpc('toRecord', 'recording');
var getPlayTabIpc = exports.getPlayTabIpc = genGetTabIpc('toPlay', 'playing commands');
var getInspectTabIpc = exports.getInspectTabIpc = genGetTabIpc('toInspect', 'inspect');
var getPanelTabIpc = exports.getPanelTabIpc = genGetTabIpc('panel', 'dashboard');
function showPanelWindow() {
  return _showPanelWindow.apply(this, arguments);
}
function _showPanelWindow() {
  _showPanelWindow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _ref2,
      params,
      showSettingsOnStart,
      selectCommandIndex,
      state,
      panelTabId,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _ref2 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, params = _ref2.params, showSettingsOnStart = _ref2.showSettingsOnStart, selectCommandIndex = _ref2.selectCommandIndex;
          _context3.next = 3;
          return (0, _global_state.getState)();
        case 3:
          state = _context3.sent;
          if (!showSettingsOnStart) {
            _context3.next = 9;
            break;
          }
          _context3.next = 7;
          return _storage["default"].get('config').then(function (config) {
            _storage["default"].set('config', _objectSpread(_objectSpread({}, config), {}, {
              showSettingsOnStart: true
            }));
          });
        case 7:
          _context3.next = 11;
          break;
        case 9:
          _context3.next = 11;
          return _storage["default"].get('config').then(function (config) {
            _storage["default"].set('config', _objectSpread(_objectSpread({}, config), {}, {
              showSettingsOnStart: false,
              selectCommandIndex: selectCommandIndex
            }));
          });
        case 11:
          panelTabId = (0, _utils.isSidePanelWindow)() ? state.tabIds.lastPanelWindow : state.tabIds.panel;
          console.log('panelTabId :>> ', panelTabId);
          return _context3.abrupt("return", (0, _tab_utils.activateTab)(panelTabId, true).then(function () {
            return false;
          }, function () {
            console.log('activateTab failed, :>> ');
            return _storage["default"].get('config').then(function (config) {
              config = config || {};
              return (config.size || {})[config.showSidebar ? 'with_sidebar' : 'standard'];
            }).then( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(size) {
                var urlQuery, base, url;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      size = size || {
                        width: 850,
                        height: 775
                      };
                      urlQuery = Object.keys(params || {}).map(function (key) {
                        return "".concat(key, "=").concat(params[key]);
                      }).join('&');
                      base = _web_extension["default"].runtime.getURL('popup.html');
                      url = urlQuery.length > 0 ? "".concat(base, "?").concat(urlQuery) : base;
                      _context2.next = 6;
                      return (0, _global_state.updateState)({
                        closingAllWindows: false
                      });
                    case 6:
                      return _context2.abrupt("return", _web_extension["default"].windows.create({
                        url: url,
                        type: 'popup',
                        width: size.width,
                        height: size.height
                      }).then(function (win) {
                        // because closing of sidepanel sends the IDE to background
                        var isEdge = navigator.userAgent.includes('Edg');
                        if (isEdge) {
                          _web_extension["default"].runtime.sendMessage({
                            type: 'BringIDEToFront',
                            windowId: win.id,
                            delay: 2500 // 500ms + the delay in the next line   
                          });
                        }
                        if (!_web_extension["default"].isFirefox()) return;

                        // Refer to https://bugzilla.mozilla.org/show_bug.cgi?id=1425829
                        // Firefox New popup window appears blank until right-click
                        return (0, _ts_utils.delay)(function () {
                          return _web_extension["default"].windows.update(win.id, {
                            width: size.width + 1,
                            height: size.height + 1
                          });
                        }, 1000);
                      }).then(function () {
                        return (0, _ts_utils.delay)(function () {
                          return true;
                        }, 2000);
                      }));
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _showPanelWindow.apply(this, arguments);
}
function withPanelIpc(options) {
  return (0, _sidepanel.checkIfSidePanelOpen)().then(function (isSidePanelOpen) {
    if (isSidePanelOpen) {
      return getPanelTabIpc(6 * 1000);
    } else {
      return showPanelWindow(options).then(function () {
        return getPanelTabIpc(6 * 1000);
      });
    }
  });
}

// Get the current tab for play, if url provided, it will be loaded in the tab
function getPlayTab(_x) {
  return _getPlayTab.apply(this, arguments);
} // Get the current tab for play, if url provided, it will be loaded in the tab
function _getPlayTab() {
  _getPlayTab = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url) {
    var theError, createOne, runRealLogic, state;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // Note: update error message to be more user friendly. But the original message is kept as comment
          // const theError  = new Error('Either a played tab or a url must be provided to start playing')
          theError = new Error('Error #180: No connection to browser tab');
          createOne = /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
              var tab;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (url) {
                      _context4.next = 2;
                      break;
                    }
                    throw theError;
                  case 2:
                    _context4.next = 4;
                    return (0, _tab_utils.createTab)(url);
                  case 4:
                    tab = _context4.sent;
                    _context4.next = 7;
                    return (0, _global_state.updateState)(function (state) {
                      return _objectSpread(_objectSpread({}, state), {}, {
                        tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                          lastPlay: state.tabIds.toPlay,
                          toPlay: tab.id,
                          firstPlay: tab.id
                        })
                      });
                    });
                  case 7:
                    return _context4.abrupt("return", tab);
                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function createOne(_x4) {
              return _ref4.apply(this, arguments);
            };
          }();
          runRealLogic = function runRealLogic(state) {
            if (!state.tabIds.toPlay && !url) {
              throw theError;
            }
            if (!state.tabIds.toPlay) {
              return createOne(url);
            }
            return (0, _tab_utils.getTab)(state.tabIds.toPlay).then(function (tab) {
              if (!url) {
                return tab;
              }

              // Note: must disable ipcCache manually here, so that further messages
              // won't be sent the old ipc
              (0, _ipc_cache.getIpcCache)().disable(tab.id);
              var finalUrl = function () {
                try {
                  var u = new URL(url, tab.url);
                  return u.toString();
                } catch (e) {
                  return url;
                }
              }();
              return (0, _tab_utils.updateUrlForTab)(tab, finalUrl, 'open');
            }, function () {
              return createOne(url);
            });
          };
          _context5.next = 5;
          return (0, _global_state.getState)();
        case 5:
          state = _context5.sent;
          if (!state.pendingPlayingTab) {
            _context5.next = 9;
            break;
          }
          _context5.next = 9;
          return (0, _ts_utils.until)('pendingPlayingTab reset', function () {
            return {
              pass: !state.pendingPlayingTab,
              result: true
            };
          }, 100, 5000);
        case 9:
          return _context5.abrupt("return", runRealLogic(state));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getPlayTab.apply(this, arguments);
}
function getPlayTabOpenB(_x2) {
  return _getPlayTabOpenB.apply(this, arguments);
}
function _getPlayTabOpenB() {
  _getPlayTabOpenB = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(url) {
    var theError, createOne, runRealLogic, state;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          // Note: update error message to be more user friendly. But the original message is kept as comment
          // const theError  = new Error('Either a played tab or a url must be provided to start playing')
          theError = new Error('Error #180: No connection to browser tab');
          createOne = /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(url) {
              var tab;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    if (url) {
                      _context6.next = 2;
                      break;
                    }
                    throw theError;
                  case 2:
                    _context6.next = 4;
                    return (0, _tab_utils.createTab)(url);
                  case 4:
                    tab = _context6.sent;
                    _context6.next = 7;
                    return (0, _global_state.updateState)(function (state) {
                      return _objectSpread(_objectSpread({}, state), {}, {
                        tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                          lastPlay: state.tabIds.toPlay,
                          toPlay: tab.id,
                          firstPlay: tab.id
                        })
                      });
                    });
                  case 7:
                    return _context6.abrupt("return", tab);
                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function createOne(_x5) {
              return _ref5.apply(this, arguments);
            };
          }();
          runRealLogic = function runRealLogic(state) {
            if (!state.tabIds.toPlay && !url) {
              throw theError;
            }
            if (!state.tabIds.toPlay) {
              return createOne(url);
            }
            return (0, _tab_utils.getTab)(state.tabIds.toPlay).then(function (tab) {
              if (!url) {
                return tab;
              }

              // Note: must disable ipcCache manually here, so that further messages
              // won't be sent the old ipc
              (0, _ipc_cache.getIpcCache)().disable(tab.id);
              var finalUrl = function () {
                try {
                  var u = new URL(url, tab.url);
                  return u.toString();
                } catch (e) {
                  return url;
                }
              }();
              return (0, _tab_utils.updateUrlForTab)(tab, finalUrl, 'openBrowser');
            }, function () {
              return createOne(url);
            });
          };
          _context7.next = 5;
          return (0, _global_state.getState)();
        case 5:
          state = _context7.sent;
          if (!state.pendingPlayingTab) {
            _context7.next = 9;
            break;
          }
          _context7.next = 9;
          return (0, _ts_utils.until)('pendingPlayingTab reset', function () {
            return {
              pass: !state.pendingPlayingTab,
              result: true
            };
          }, 100, 5000);
        case 9:
          return _context7.abrupt("return", runRealLogic(state));
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getPlayTabOpenB.apply(this, arguments);
}
function getActiveTab() {
  return _getActiveTab.apply(this, arguments);
}
function _getActiveTab() {
  _getActiveTab = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var tabs;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _web_extension["default"].tabs.query({
            active: true,
            currentWindow: true
          });
        case 2:
          tabs = _context8.sent;
          return _context8.abrupt("return", tabs && tabs[0]);
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getActiveTab.apply(this, arguments);
}
function getActiveTabId() {
  return _getActiveTabId.apply(this, arguments);
}
function _getActiveTabId() {
  _getActiveTabId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var tab;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return getActiveTab();
        case 2:
          tab = _context9.sent;
          return _context9.abrupt("return", tab && tab.id);
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _getActiveTabId.apply(this, arguments);
}

/***/ }),

/***/ 54490:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getContextMenuService = exports.ContextMenuService = void 0;
var _ts_utils = __webpack_require__(1601);
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ContextMenuService = exports.ContextMenuService = /*#__PURE__*/function () {
  function ContextMenuService() {
    _classCallCheck(this, ContextMenuService);
    _defineProperty(this, "menuInfos", []);
    _defineProperty(this, "bound", false);
  }
  _createClass(ContextMenuService, [{
    key: "createMenus",
    value: function createMenus(menuInfos) {
      this.menuInfos = menuInfos;
      this.bindOnClick();
      return _ts_utils.flow.apply(void 0, _toConsumableArray(menuInfos.map(function (info) {
        return function () {
          var copy = _objectSpread({}, info);
          delete copy.onclick;
          return _web_extension["default"].contextMenus.create(copy);
        };
      }))).then(function () {});
    }
  }, {
    key: "destroyMenus",
    value: function destroyMenus() {
      this.menuInfos = [];
      return _web_extension["default"].contextMenus.removeAll();
    }
  }, {
    key: "bindOnClick",
    value: function bindOnClick() {
      var _this = this;
      if (this.bound) {
        return;
      }
      this.bound = true;
      _web_extension["default"].contextMenus.onClicked.addListener(function (info, tab) {
        var id = info.menuItemId;
        for (var i = 0, len = _this.menuInfos.length; i < len; i++) {
          if (_this.menuInfos[i].id === id) {
            var _this$menuInfos$i$onc, _this$menuInfos$i;
            (_this$menuInfos$i$onc = (_this$menuInfos$i = _this.menuInfos[i]).onclick) === null || _this$menuInfos$i$onc === void 0 || _this$menuInfos$i$onc.call(_this$menuInfos$i, info);
            break;
          }
        }
      });
    }
  }]);
  return ContextMenuService;
}();
var getContextMenuService = exports.getContextMenuService = (0, _ts_utils.singletonGetter)(function () {
  return new ContextMenuService();
});

/***/ }),

/***/ 73632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

/***/ 26480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getLogService = exports.LogService = void 0;
var _filesystem = __webpack_require__(89937);
var _xfile = __webpack_require__(63109);
var _path = _interopRequireDefault(__webpack_require__(26513));
var _log2 = _interopRequireDefault(__webpack_require__(89130));
var _ts_utils = __webpack_require__(1601);
var _storage = __webpack_require__(97467);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LogService = exports.LogService = /*#__PURE__*/function () {
  function LogService() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, LogService);
    _defineProperty(this, "pDirReady", Promise.resolve(false));
    _defineProperty(this, "logsDir", '');
    _defineProperty(this, "fileName", 'log.txt');
    _defineProperty(this, "waitForStorageManager", function () {
      return Promise.resolve((0, _storage.getStorageManager)());
    });
    this.check();
    this.updateLogFileName();
    if (params.waitForStorageManager) {
      this.waitForStorageManager = params.waitForStorageManager;
    }
  }
  _createClass(LogService, [{
    key: "updateLogFileName",
    value: function updateLogFileName() {
      var now = new Date();
      var dateStr = "".concat(now.getFullYear()).concat((0, _ts_utils.pad2digits)(now.getMonth() + 1)).concat((0, _ts_utils.pad2digits)(now.getDate()));
      var timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()].map(function (n) {
        return (0, _ts_utils.pad2digits)(n);
      }).join('');
      this.fileName = "log-".concat(dateStr, "-").concat(timeStr, ".txt");
    }
  }, {
    key: "check",
    value: function check() {
      var _this = this;
      this.pDirReady = (0, _xfile.getXFile)().sanityCheck(true).then(function (isSane) {
        if (!isSane) {
          return false;
        }
        var _getXFile$getCachedCo = (0, _xfile.getXFile)().getCachedConfig(),
          rootDir = _getXFile$getCachedCo.rootDir;
        if (!rootDir) {
          return false;
        }
        _this.logsDir = _path["default"].join(rootDir, 'logs');
        return (0, _filesystem.getNativeFileSystemAPI)().ensureDir({
          path: _this.logsDir
        });
      });
      return this.pDirReady;
    }
  }, {
    key: "log",
    value: function log(str) {
      var _this2 = this;
      return this.waitForStorageManager().then(function (storageManager) {
        if (!storageManager.isXFileMode()) {
          return false;
        }
        return (0, _xfile.getXFile)().sanityCheck(true).then(function () {
          return _this2.pDirReady;
        }).then(function (ready) {
          if (!ready) {
            return false;
          }
          return (0, _filesystem.getNativeFileSystemAPI)().appendAllText({
            path: _path["default"].join(_this2.logsDir, _this2.fileName),
            content: ensureLineBreak(str)
          });
        }, function (e) {
          _log2["default"].warn('Failed to log: ', e.message);
          return false;
        });
      });
    }
  }, {
    key: "logWithTime",
    value: function logWithTime(str) {
      return this.log("".concat(new Date().toISOString(), " - ").concat(str));
    }
  }, {
    key: "logTo",
    value: function logTo(filePath, str) {
      return this.waitForStorageManager().then(function (storageManager) {
        if (!storageManager.isXFileMode()) {
          return false;
        }
        return (0, _xfile.getXFile)().sanityCheck(true).then(function (ready) {
          if (!ready) {
            return false;
          }
          var dirPath = _path["default"].dirname(filePath);
          return (0, _filesystem.getNativeFileSystemAPI)().ensureDir({
            path: dirPath
          }).then(function (dirReady) {
            if (!dirReady) {
              return false;
            }
            return (0, _filesystem.getNativeFileSystemAPI)().appendAllText({
              path: filePath,
              content: ensureLineBreak(str)
            });
          });
        }, function (e) {
          _log2["default"].warn('Failed to log: ', e.message);
          return false;
        });
      });
    }
  }]);
  return LogService;
}();
var getLogService = exports.getLogService = (0, _ts_utils.singletonGetter)(function () {
  return new LogService();
});
function ensureLineBreak(str) {
  if (str.length === 0) {
    return str;
  }
  if (str.charAt(str.length - 1) !== '\n') {
    return str + '\n';
  }
  return str;
}

/***/ }),

/***/ 39356:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 51557:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseProxyManager = void 0;
var _registry = __webpack_require__(50149);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseProxyManager = exports.BaseProxyManager = /*#__PURE__*/function () {
  function BaseProxyManager() {
    _classCallCheck(this, BaseProxyManager);
    _defineProperty(this, "proxy", null);
    _defineProperty(this, "registry", (0, _registry.createListenerRegistry)());
  }
  _createClass(BaseProxyManager, [{
    key: "getProxy",
    value: function getProxy() {
      return Promise.resolve(this.proxy);
    }
  }, {
    key: "getAuth",
    value: function getAuth(host, port) {
      if (!this.proxy || !this.proxy.username) {
        return null;
      }

      // port could be number, so must convert it to string before compare
      if (this.proxy.host === host && this.proxy.port === '' + port) {
        return {
          username: this.proxy.username,
          password: this.proxy.password
        };
      }
      return null;
    }
  }, {
    key: "onChange",
    value: function onChange(listener) {
      var _this = this;
      this.registry.add('change', listener);
      return function () {
        _this.registry.remove('change', listener);
      };
    }
  }]);
  return BaseProxyManager;
}();

/***/ }),

/***/ 6825:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProxyHttpAuth = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ProxyHttpAuth = exports.ProxyHttpAuth = /*#__PURE__*/function () {
  function ProxyHttpAuth(params) {
    _classCallCheck(this, ProxyHttpAuth);
    _defineProperty(this, "unbindListener", function () {});
    _defineProperty(this, "bound", false);
    this.getAuth = params.getAuth;
  }
  _createClass(ProxyHttpAuth, [{
    key: "bind",
    value: function bind() {
      if (this.bound) {
        return;
      }
      this.bound = true;
      var listener = this.onAuthRequired.bind(this);
      _web_extension["default"].webRequest.onAuthRequired.addListener(listener, {
        urls: ['<all_urls>']
      }, ['blocking']);
      this.unbindListener = function () {
        return _web_extension["default"].webRequest.onAuthRequired.removeListener(listener);
      };
    }
  }, {
    key: "unbind",
    value: function unbind() {
      if (!this.bound) {
        return;
      }
      this.unbindListener();
      this.bound = false;
    }
  }, {
    key: "onAuthRequired",
    value: function onAuthRequired(details) {
      if (!details.isProxy) {
        return {};
      }
      var auth = this.getAuth(details.challenger.host, '' + details.challenger.port);
      return auth ? {
        authCredentials: auth
      } : {};
    }
  }]);
  return ProxyHttpAuth;
}();

/***/ }),

/***/ 44790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getProxyManager = getProxyManager;
exports.parseProxyUrl = parseProxyUrl;
exports.setProxy = setProxy;
var _types = __webpack_require__(78847);
var _listener_api_proxy = __webpack_require__(56584);
var _settings_api_proxy = __webpack_require__(75277);
var _pac_api_proxy = __webpack_require__(12050);
var _http_auth = __webpack_require__(6825);
var _messages = _interopRequireDefault(__webpack_require__(6866));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allAvailableProxyManagers = [new _listener_api_proxy.ProxyManagerViaListenerAPI(), new _pac_api_proxy.ProxyManagerViaPacAPI(), new _settings_api_proxy.ProxyManagerViaSettingsAPI()];
var proxyHttpAuth = new _http_auth.ProxyHttpAuth({
  getAuth: function getAuth(host, port) {
    return getProxyManager().getAuth(host, port);
  }
});
function getProxyManager() {
  for (var i = 0, len = allAvailableProxyManagers.length; i < len; i++) {
    if (allAvailableProxyManagers[i].isSupported()) {
      return allAvailableProxyManagers[i];
    }
  }
  throw new Error('Unable to use proxy');
}
function setProxy(proxy) {
  return new Promise(function (resolve, reject) {
    var proxyManager = getProxyManager();

    // Default to not incognito mode
    proxyManager.isControllable(false).then(function (controllable) {
      if (!controllable) {
        throw new Error(_messages["default"].proxy.notControllable);
      }
      proxyHttpAuth.bind();
      if (!proxy) {
        return proxyManager.reset();
      }
      return proxyManager.setProxy(proxy);
    }).then(resolve, reject);
  });
}
function parseProxyUrl(proxyUrl, usernameAndPassword) {
  var url = new URL(proxyUrl);
  // URL has problem parsing non-standard url like socks4://0.0.0.0
  // hostname will be empty string, so we have to replace protocol with http
  var httpUrl = new URL(proxyUrl.replace(/\s*socks[45]/i, 'http'));
  var host = httpUrl.hostname;
  var type = function () {
    switch (url.protocol) {
      case 'http:':
        return _types.ProxyScheme.Http;
      case 'https:':
        return _types.ProxyScheme.Https;
      case 'socks4:':
        return _types.ProxyScheme.Socks4;
      case 'socks5:':
        return _types.ProxyScheme.Socks5;
      default:
        throw new Error('Invalid proxy protocol');
    }
  }();
  var port = function () {
    if (httpUrl.port) {
      return httpUrl.port;
    }
    switch (type) {
      case _types.ProxyScheme.Http:
        return '80';
      case _types.ProxyScheme.Https:
        return '443';
      case _types.ProxyScheme.Socks4:
      case _types.ProxyScheme.Socks5:
        return '1080';
    }
  }();
  if (!host || !host.length) {
    throw new Error('No host found in proxy');
  }
  if (!port || isNaN(parseInt(port, 10))) {
    throw new Error('No valid port found in proxy');
  }
  var _ref = function () {
      if (!usernameAndPassword || !usernameAndPassword.length) {
        return {};
      }
      var index = usernameAndPassword.indexOf(',');
      if (index === -1) {
        return {
          username: usernameAndPassword
        };
      }
      return {
        username: usernameAndPassword.substr(0, index),
        password: usernameAndPassword.substr(index + 1)
      };
    }(),
    username = _ref.username,
    password = _ref.password;
  return {
    type: type,
    host: host,
    port: port,
    username: username,
    password: password
  };
}

/***/ }),

/***/ 56584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProxyManagerViaListenerAPI = void 0;
exports.convertToFirefoxProxyInfo = convertToFirefoxProxyInfo;
var _types = __webpack_require__(78847);
var _base = __webpack_require__(51557);
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function convertToFirefoxProxyInfo(proxy) {
  return _objectSpread(_objectSpread({}, proxy), {}, {
    type: proxy.type === _types.ProxyScheme.Socks5 ? _types.FirefoxProxyType.Socks5 : proxy.type
  });
}
var ProxyManagerViaListenerAPI = exports.ProxyManagerViaListenerAPI = /*#__PURE__*/function (_BaseProxyManager) {
  _inherits(ProxyManagerViaListenerAPI, _BaseProxyManager);
  function ProxyManagerViaListenerAPI() {
    var _this;
    _classCallCheck(this, ProxyManagerViaListenerAPI);
    _this = _callSuper(this, ProxyManagerViaListenerAPI);
    _defineProperty(_assertThisInitialized(_this), "unbind", function () {});
    _defineProperty(_assertThisInitialized(_this), "isBound", false);
    return _this;
  }
  _createClass(ProxyManagerViaListenerAPI, [{
    key: "isSupported",
    value: function isSupported() {
      return typeof browser !== 'undefined' && browser.proxy && browser.proxy.onRequest;
    }
  }, {
    key: "isControllable",
    value: function isControllable(incognito) {
      return Promise.resolve(true);
    }
  }, {
    key: "setProxy",
    value: function setProxy(proxy) {
      this.bind();
      this.proxy = proxy;
      this.notifyProxyChange();
      return Promise.resolve();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.proxy = null;
      this.notifyProxyChange();
      return Promise.resolve();
    }
  }, {
    key: "notifyProxyChange",
    value: function notifyProxyChange() {
      var _this2 = this;
      setTimeout(function () {
        _this2.registry.fire('change', _this2.proxy);
      }, 10);
    }
  }, {
    key: "bind",
    value: function bind() {
      if (this.isBound) {
        return;
      }
      this.isBound = true;
      var listener = this.onProxyRequest.bind(this);
      browser.proxy.onRequest.addListener(listener, {
        urls: ['<all_urls>']
      });
      this.unbind = function () {
        return browser.proxy.onRequest.removeListener(listener);
      };
    }
  }, {
    key: "onProxyRequest",
    value: function onProxyRequest(requestInfo) {
      return this.proxy ? convertToFirefoxProxyInfo(this.proxy) : {
        type: _types.FirefoxProxyType.Direct
      };
    }
  }]);
  return ProxyManagerViaListenerAPI;
}(_base.BaseProxyManager);

/***/ }),

/***/ 12050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProxyManagerViaPacAPI = void 0;
var _base = __webpack_require__(51557);
var _listener_api_proxy = __webpack_require__(56584);
var _ipc_cs = _interopRequireDefault(__webpack_require__(96571));
var _log = _interopRequireDefault(__webpack_require__(89130));
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
var ProxyManagerViaPacAPI = exports.ProxyManagerViaPacAPI = /*#__PURE__*/function (_BaseProxyManager) {
  _inherits(ProxyManagerViaPacAPI, _BaseProxyManager);
  function ProxyManagerViaPacAPI() {
    var _this;
    _classCallCheck(this, ProxyManagerViaPacAPI);
    _this = _callSuper(this, ProxyManagerViaPacAPI);
    _defineProperty(_assertThisInitialized(_this), "unbind", function () {});
    _defineProperty(_assertThisInitialized(_this), "isBound", false);
    return _this;
  }
  _createClass(ProxyManagerViaPacAPI, [{
    key: "isSupported",
    value: function isSupported() {
      return typeof browser !== 'undefined' && browser.proxy && browser.proxy.register;
    }
  }, {
    key: "isControllable",
    value: function isControllable() {
      return Promise.resolve(true);
    }
  }, {
    key: "setProxy",
    value: function setProxy(proxy) {
      this.bind();
      this.proxy = proxy;
      this.notifyProxyChange();

      // Not sure if 1s delay could be omitted. Just keep it here in case legacy pac api
      // takes time before proxy takes effect
      return browser.runtime.sendMessage({
        cmd: 'SET_PROXY',
        data: proxy ? (0, _listener_api_proxy.convertToFirefoxProxyInfo)(proxy) : null
      }, {
        toProxyScript: true
      }).then(function () {
        return (0, _ts_utils.delay)(function () {}, 1000);
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.proxy = null;
      this.notifyProxyChange();
      return _ipc_cs["default"].ask('PANEL_SET_PROXY_FOR_PAC', {
        proxy: null
      }).then(function () {
        return (0, _ts_utils.delay)(function () {}, 1000);
      });
    }
  }, {
    key: "getAuth",
    value: function getAuth(host, port) {
      if (!this.proxy || !this.proxy.username) {
        return null;
      }
      if (this.proxy.host === host && this.proxy.port === port) {
        return {
          username: this.proxy.username,
          password: this.proxy.password
        };
      }
      return null;
    }
  }, {
    key: "notifyProxyChange",
    value: function notifyProxyChange() {
      var _this2 = this;
      setTimeout(function () {
        _this2.registry.fire('change', _this2.proxy);
      }, 10);
    }
  }, {
    key: "bind",
    value: function bind() {
      if (this.isBound) {
        return;
      }
      this.isBound = true;
      var pacListener = function pacListener(data) {
        if (data.type === 'PROXY_LOG') {
          (0, _log["default"])('PROXY_LOG', data);
        }
      };
      browser.proxy.register('firefox_pac.js');
      browser.runtime.onMessage.addListener(pacListener);
      this.unbind = function () {
        browser.proxy.unregister();
        browser.runtime.onMessage.removeListener(pacListener);
      };
    }
  }]);
  return ProxyManagerViaPacAPI;
}(_base.BaseProxyManager);

/***/ }),

/***/ 75277:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProxyManagerViaSettingsAPI = void 0;
var _base = __webpack_require__(51557);
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
var ProxyManagerViaSettingsAPI = exports.ProxyManagerViaSettingsAPI = /*#__PURE__*/function (_BaseProxyManager) {
  _inherits(ProxyManagerViaSettingsAPI, _BaseProxyManager);
  function ProxyManagerViaSettingsAPI() {
    var _this;
    _classCallCheck(this, ProxyManagerViaSettingsAPI);
    _this = _callSuper(this, ProxyManagerViaSettingsAPI);
    _defineProperty(_assertThisInitialized(_this), "isBound", false);
    return _this;
  }
  _createClass(ProxyManagerViaSettingsAPI, [{
    key: "isSupported",
    value: function isSupported() {
      return typeof chrome !== 'undefined' && chrome.proxy && chrome.proxy.settings && chrome.proxy.settings.onChange;
    }
  }, {
    key: "isControllable",
    value: function isControllable(incognito) {
      return new Promise(function (resolve, reject) {
        chrome.proxy.settings.get({
          incognito: !!incognito
        }, function (details) {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          var levelOfControl = details.levelOfControl;
          var inControl = ['controllable_by_this_extension', 'controlled_by_this_extension'].indexOf(levelOfControl) !== -1;
          resolve(inControl);
        });
      });
    }
  }, {
    key: "setProxy",
    value: function setProxy(proxy) {
      this.bindProxyChange();
      this.proxy = proxy;
      return new Promise(function (resolve, reject) {
        chrome.proxy.settings.set({
          value: {
            mode: 'fixed_servers',
            rules: {
              singleProxy: {
                scheme: proxy.type,
                host: proxy.host,
                port: parseInt(proxy.port, 10)
              }
            }
          }
        }, function () {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          resolve();
        });
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      return new Promise(function (resolve, reject) {
        chrome.proxy.settings.set({
          value: {
            mode: 'direct'
          }
        }, function () {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          resolve();
        });
      });
    }
  }, {
    key: "bindProxyChange",
    value: function bindProxyChange() {
      var _this2 = this;
      if (this.isBound) {
        return;
      }
      this.isBound = true;
      chrome.proxy.settings.onChange.addListener(function (details) {
        var proxyData = _this2.fromChromeDetails(details);

        // Proxy data returned by fromChromeDetails doesn't contain username/password
        // so must avoid it overwrites the one with auth info
        _this2.setLocalProxyIfIsNew(proxyData);
        _this2.registry.fire('change', proxyData);
      });
    }
  }, {
    key: "fetchProxyFromSettings",
    value: function fetchProxyFromSettings() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        chrome.proxy.settings.get({
          incognito: false
        }, function (details) {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          var proxyData = _this3.fromChromeDetails(details);
          _this3.setLocalProxyIfIsNew(proxyData);
          _this3.registry.fire('change', proxyData);
          resolve();
        });
      });
    }
  }, {
    key: "fromChromeDetails",
    value: function fromChromeDetails(details) {
      if (details.value.mode !== 'fixed_servers' || !details.value.rules || !details.value.rules.singleProxy) {
        return null;
      }
      var singleProxy = details.value.rules.singleProxy;
      return {
        host: singleProxy.host,
        port: '' + singleProxy.port,
        type: singleProxy.scheme
      };
    }
  }, {
    key: "setLocalProxyIfIsNew",
    value: function setLocalProxyIfIsNew(proxyData) {
      var _this$proxy, _this$proxy2;
      if ((proxyData === null || proxyData === void 0 ? void 0 : proxyData.host) !== ((_this$proxy = this.proxy) === null || _this$proxy === void 0 ? void 0 : _this$proxy.host) || (proxyData === null || proxyData === void 0 ? void 0 : proxyData.port) !== ((_this$proxy2 = this.proxy) === null || _this$proxy2 === void 0 ? void 0 : _this$proxy2.port)) {
        this.proxy = proxyData;
      }
    }
  }]);
  return ProxyManagerViaSettingsAPI;
}(_base.BaseProxyManager);

/***/ }),

/***/ 78847:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProxyScheme = exports.FirefoxProxyType = void 0;
var ProxyScheme = exports.ProxyScheme = /*#__PURE__*/function (ProxyScheme) {
  ProxyScheme["Http"] = "http";
  ProxyScheme["Https"] = "https";
  ProxyScheme["Socks4"] = "socks4";
  ProxyScheme["Socks5"] = "socks5";
  return ProxyScheme;
}({});
var FirefoxProxyType = exports.FirefoxProxyType = /*#__PURE__*/function (FirefoxProxyType) {
  FirefoxProxyType["Direct"] = "direct";
  FirefoxProxyType["Http"] = "http";
  FirefoxProxyType["Https"] = "https";
  FirefoxProxyType["Socks4"] = "socks4";
  FirefoxProxyType["Socks5"] = "socks";
  return FirefoxProxyType;
}({});

/***/ }),

/***/ 12702:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

/***/ 97846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

/***/ 80978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withDebugger = exports.setFileInputFiles = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _utils = __webpack_require__(46580);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PROTOCOL_VERSION = '1.2';
var ClEANUP_TIMEOUT = 0;
var withDebugger = exports.withDebugger = function () {
  var state = {
    connected: null,
    cleanupTimer: null
  };
  var setState = function setState(obj) {
    Object.assign(state, obj);
  };
  var cancelCleanup = function cancelCleanup() {
    if (state.cleanupTimer) clearTimeout(state.cleanupTimer);
    setState({
      cleanupTimer: null
    });
  };
  var isSameDebuggee = function isSameDebuggee(a, b) {
    return a && b && a.tabId && b.tabId && a.tabId === b.tabId;
  };
  return function (debuggee, fn) {
    var attach = function attach(debuggee) {
      if (isSameDebuggee(state.connected, debuggee)) {
        cancelCleanup();
        return Promise.resolve();
      }
      return detach(state.connected).then(function () {
        return _web_extension["default"]["debugger"].attach(debuggee, PROTOCOL_VERSION);
      }).then(function () {
        return setState({
          connected: debuggee
        });
      });
    };
    var detach = function detach(debuggee) {
      if (!debuggee) return Promise.resolve();
      return _web_extension["default"]["debugger"].detach(debuggee).then(function () {
        if (state.cleanupTimer) clearTimeout(state.cleanupTimer);
        setState({
          connected: null,
          cleanupTimer: null
        });
      }, function (e) {
        return console.error('error in detach', e.stack);
      });
    };
    var scheduleDetach = function scheduleDetach() {
      var timer = setTimeout(function () {
        return detach(debuggee);
      }, ClEANUP_TIMEOUT);
      setState({
        cleanupTimer: timer
      });
    };
    var sendCommand = function sendCommand(cmd, params) {
      return _web_extension["default"]["debugger"].sendCommand(debuggee, cmd, params);
    };
    var onEvent = function onEvent(callback) {
      _web_extension["default"]["debugger"].onEvent.addListener(callback);
    };
    var onDetach = function onDetach(callback) {
      _web_extension["default"]["debugger"].onDetach.addListener(callback);
    };
    return new Promise(function (resolve, reject) {
      var done = function done(error, result) {
        scheduleDetach();
        if (error) return reject(error);else return resolve(result);
      };
      return attach(debuggee).then(function () {
        fn({
          sendCommand: sendCommand,
          onEvent: onEvent,
          onDetach: onDetach,
          done: done
        });
      }, function (e) {
        return reject(e);
      });
    });
  };
}();
var __getDocument = function __getDocument(_ref) {
  var sendCommand = _ref.sendCommand,
    done = _ref.done;
  return function () {
    return sendCommand('DOM.getDocument').then(function (obj) {
      return obj.root;
    });
  };
};
var __querySelector = function __querySelector(_ref2) {
  var sendCommand = _ref2.sendCommand,
    done = _ref2.done;
  return (0, _utils.partial)(function (selector, nodeId) {
    return sendCommand('DOM.querySelector', {
      nodeId: nodeId,
      selector: selector
    }).then(function (res) {
      return res && res.nodeId;
    });
  });
};
var __setFileInputFiles = function __setFileInputFiles(_ref3) {
  var sendCommand = _ref3.sendCommand,
    done = _ref3.done;
  return (0, _utils.partial)(function (files, nodeId) {
    return sendCommand('DOM.setFileInputFiles', {
      nodeId: nodeId,
      files: files
    }).then(function () {
      return true;
    });
  });
};
var setFileInputFiles = exports.setFileInputFiles = function setFileInputFiles(_ref4) {
  var tabId = _ref4.tabId,
    selector = _ref4.selector,
    files = _ref4.files;
  return withDebugger({
    tabId: tabId
  }, function (api) {
    var go = (0, _utils.composePromiseFn)(__setFileInputFiles(api)(files), __querySelector(api)(selector), function (node) {
      return node.nodeId;
    }, __getDocument(api));
    return go().then(function (res) {
      return api.done(null, res);
    });
  });
};

/***/ }),

/***/ 54138:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDownloadMan = exports.DownloadMan = void 0;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _utils = __webpack_require__(46580);
var _ts_utils = __webpack_require__(1601);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DownloadMan = exports.DownloadMan = /*#__PURE__*/function () {
  function DownloadMan() {
    var _this = this;
    _classCallCheck(this, DownloadMan);
    _defineProperty(this, "activeDownloads", []);
    _defineProperty(this, "eventsBound", false);
    _defineProperty(this, "filterActiveDownloads", function (predicate) {
      _this.activeDownloads = _this.activeDownloads.filter(predicate);
      if (_this.activeDownloads.length === 0) {
        _this.unbindEvents();
      }
    });
    _defineProperty(this, "createdListener", function (downloadItem) {
      if (!_this.isActive()) return;
      (0, _log["default"])('download on created', downloadItem);
      var item = _this.activeDownloads.find(function (item) {
        return !item.id;
      });
      if (!item) return;

      // Note: 3 things to do on download created
      // 1. record download id
      // 2. Start timer for timeout
      // 3. Start interval timer for count down message
      Object.assign(item, _objectSpread({
        id: downloadItem.id
      }, !item.wait && item.timeout > 0 ? {} : {
        timeoutTimer: setTimeout(function () {
          item.reject(new Error("download timeout ".concat(item.timeout / 1000, "s")));
          _this.filterActiveDownloads(function (d) {
            return item.uid !== d.uid;
          });
        }, item.timeout),
        countDownTimer: setInterval(function () {
          if (!_this.countDownHandler) return;
          var _item$past = item.past,
            past = _item$past === void 0 ? 0 : _item$past;
          var newPast = past + 1000;
          _this.countDownHandler({
            total: item.timeout,
            past: newPast
          });
          Object.assign(item, {
            past: newPast
          });
        }, 1000)
      }));
    });
    _defineProperty(this, "changedListener", function (downloadDelta) {
      if (!_this.isActive()) return;
      (0, _log["default"])('download on changed', downloadDelta);
      var item = _this.findById(downloadDelta.id);
      if (!item) return;
      if (downloadDelta.state) {
        var fn = function fn() {};
        var done = false;
        switch (downloadDelta.state.current) {
          case 'complete':
            fn = function fn() {
              return item.resolve(true);
            };
            done = true;
            if (_this.completeHandler) {
              _web_extension["default"].downloads.search({
                id: item.id
              }).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 1),
                  downloadItem = _ref2[0];
                if (downloadItem) {
                  _this.completeHandler(downloadItem);
                }
              });
            }
            break;
          case 'interrupted':
            fn = function fn() {
              return item.reject(new Error('download interrupted'));
            };
            done = true;
            break;
        }

        // Remove this download item from our todo list if it's done
        if (done) {
          clearTimeout(item.timeoutTimer);
          clearInterval(item.countDownTimer);
          _this.filterActiveDownloads(function (item) {
            return item.id !== downloadDelta.id;
          });
        }

        // resolve or reject that promise object
        fn();
      }
    });
    _defineProperty(this, "determineFileNameListener", function (downloadItem, suggest) {
      if (!_this.isActive()) return;
      (0, _log["default"])('download on determine', downloadItem);
      var item = _this.findById(downloadItem.id);
      if (!item) return;
      var tmpName = item.fileName.trim();
      var fileName = tmpName === '' || tmpName === '*' ? null : tmpName;
      if (fileName) {
        return suggest({
          filename: fileName,
          conflictAction: 'uniquify'
        });
      }
    });
  }
  _createClass(DownloadMan, [{
    key: "isActive",
    value:
    /*
     * Private methods
     */

    function isActive() {
      return this.activeDownloads.length > 0;
    }
  }, {
    key: "findById",
    value: function findById(id) {
      return this.activeDownloads.find(function (item) {
        return item.id === id;
      });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      if (this.eventsBound) return;
      _web_extension["default"].downloads.onCreated.addListener(this.createdListener);
      _web_extension["default"].downloads.onChanged.addListener(this.changedListener);

      // Note: only chrome supports api `chrome.downloads.onDeterminingFilename`
      if (_web_extension["default"].downloads.onDeterminingFilename) {
        _web_extension["default"].downloads.onDeterminingFilename.addListener(this.determineFileNameListener);
      }
      this.eventsBound = true;
    }
  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      if (!this.eventsBound) return;
      if (_web_extension["default"].downloads.onCreated.removeListener) {
        _web_extension["default"].downloads.onCreated.removeListener(this.createdListener);
      }
      if (_web_extension["default"].downloads.onChanged.removeListener) {
        _web_extension["default"].downloads.onChanged.removeListener(this.changedListener);
      }
      if (_web_extension["default"].downloads.onDeterminingFilename && _web_extension["default"].downloads.onDeterminingFilename.removeListener) {
        _web_extension["default"].downloads.onDeterminingFilename.removeListener(this.determineFileNameListener);
      }
      this.eventsBound = false;
    }

    /*
     * Public methods
     */
  }, {
    key: "reset",
    value: function reset() {
      this.activeDownloads.forEach(function (item) {
        if (item.timeoutTimer) clearTimeout(item.timeoutTimer);
        if (item.countDownTimer) clearInterval(item.countDownTimer);
      });
      this.activeDownloads = [];
      this.unbindEvents();
    }
  }, {
    key: "prepareDownload",
    value: function prepareDownload(fileName) {
      var _this2 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var downloadToCreate = this.activeDownloads.find(function (item) {
        return !item.id;
      });
      if (downloadToCreate) throw new Error('only one not-created download allowed at a time');
      this.bindEvents();
      var opts = Object.assign({
        timeoutForStart: 10000,
        timeout: 60000,
        wait: false
      }, options);
      var promise = new Promise(function (resolve, reject) {
        var uid = Math.floor(Math.random() * 1000) + new Date() * 1;

        // Note: we need to cache promise object, so have to wait for next tick
        setTimeout(function () {
          _this2.activeDownloads.push({
            uid: uid,
            resolve: resolve,
            reject: reject,
            fileName: fileName,
            promise: promise,
            timeoutForStart: opts.timeoutForStart,
            timeout: opts.timeout,
            wait: opts.wait
          });
        }, 0);
      });
      return promise;
    }
  }, {
    key: "waitForDownloadIfAny",
    value: function waitForDownloadIfAny() {
      var _this3 = this;
      var downloadToCreate = this.activeDownloads.find(function (item) {
        return !item.id;
      });
      if (downloadToCreate) {
        return (0, _utils.until)('download start', function () {
          return {
            pass: !!downloadToCreate.id,
            result: true
          };
        }, 50, downloadToCreate.timeoutForStart).then(function () {
          return _this3.waitForDownloadIfAny();
        });
      }

      // Note: check if id exists, because it means this download item is created
      var downloadToComplete = this.activeDownloads.find(function (item) {
        return item.wait && item.id;
      });

      // A short delay after download is complete, so that background has time to send DOWNLOAD_COMPLETE event before it unblocks next command
      if (!downloadToComplete) return (0, _ts_utils.delay)(function () {
        return true;
      }, 500);
      return downloadToComplete.promise.then(function () {
        return _this3.waitForDownloadIfAny();
      });
    }
  }, {
    key: "onCountDown",
    value: function onCountDown(fn) {
      this.countDownHandler = fn;
    }
  }, {
    key: "onDownloadComplete",
    value: function onDownloadComplete(fn) {
      this.completeHandler = fn;
    }
  }, {
    key: "hasPendingDownload",
    value: function hasPendingDownload() {
      var downloadToCreate = this.activeDownloads.find(function (item) {
        return !item.id;
      });
      return !!downloadToCreate;
    }
  }]);
  return DownloadMan;
}();
var getDownloadMan = exports.getDownloadMan = function () {
  var instance;
  return function () {
    if (!instance) {
      instance = new DownloadMan();
    }
    return instance;
  };
}();

/***/ }),

/***/ 9863:
/***/ (() => {

"use strict";
// purpose of this module is to be use by webpack NormalModuleReplacementPlugin


/***/ }),

/***/ 61222:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

/***/ 50366:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

/***/ 59711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 96571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _ipc_bg_cs = __webpack_require__(59711);
var throwNotTop = function throwNotTop() {
  throw new Error('You are not a top window, not allowed to initialize/use csIpc');
};

// browser.runtime.id in firefox extension isn't necessarily found in window.location.href 
// window.location.href  eg. "moz-extension://add2840d-0b3e-41f0-8da1-55d780cc5dd8/sidepanel.html"
var isSidepanelInFirefox = typeof window !== 'undefined' && window.location.href.match(/moz-extension:\/\/[a-z0-9-]+\/sidepanel.html/);
var isSidepanel = false;
if (typeof window !== 'undefined' && (window.location.href.startsWith("chrome-extension://".concat(chrome.runtime.id, "/sidepanel.html")) || isSidepanelInFirefox)) {
  isSidepanel = true;
}

// Note: csIpc is only available to top window
var ipc = typeof window !== 'undefined' && window.top === window ? isSidepanel ? (0, _ipc_bg_cs.spInit)() : (0, _ipc_bg_cs.csInit)() : {
  ask: throwNotTop,
  send: throwNotTop,
  onAsk: throwNotTop,
  destroy: throwNotTop
};

// Note: one ipc singleton per content script
var _default = exports["default"] = ipc;

/***/ }),

/***/ 18020:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


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

/***/ 26513:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ }),

/***/ 55720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFocusedWindowSize = getFocusedWindowSize;
exports.getWindowSize = getWindowSize;
exports.resizeViewport = resizeViewport;
exports.resizeViewportOfTab = resizeViewportOfTab;
exports.resizeWindow = resizeWindow;
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _utils = __webpack_require__(46580);
var _log = _interopRequireDefault(__webpack_require__(89130));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var calcOffset = function calcOffset(screenTotal, screenOffset, oldOffset, oldSize, newSize) {
  var preferStart = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var isCloserToStart = preferStart || oldOffset < screenTotal - oldOffset - oldSize;
  (0, _log["default"])('calcOffset', screenTotal, oldOffset, oldSize, newSize, preferStart);
  if (isCloserToStart) {
    return oldOffset;

    // Note: comment out a smarter position for now
    // if (newSize < oldSize) {
    //   return oldOffset
    // }

    // if (newSize < oldSize + oldOffset - screenOffset) {
    //   return oldSize + oldOffset - newSize
    // }

    // return screenOffset
  }
  if (!isCloserToStart) {
    var oldEndOffset = screenOffset + screenTotal - oldOffset - oldSize;
    return oldSize + oldOffset - newSize;

    // Note: comment out a smarter position for now
    // if (newSize < oldSize) {
    //   return oldSize + oldOffset - newSize
    // }

    // if (newSize < oldSize + oldEndOffset) {
    //   return oldOffset
    // }

    // return screenOffset + screenTotal - newSize
  }
};

// winSize.width
// winSize.height
function resizeWindow(winId, winSize, screenAvailableRect) {
  var sw = screenAvailableRect.width;
  var sh = screenAvailableRect.height;
  var sx = screenAvailableRect.x;
  var sy = screenAvailableRect.y;
  return _web_extension["default"].windows.get(winId).then(function (win) {
    var lastLeft = win.left;
    var lastTop = win.top;
    var lastWidth = win.width;
    var lastHeight = win.height;
    return _web_extension["default"].windows.update(winId, winSize).then(function (win) {
      var left = calcOffset(sw, sx, lastLeft, lastWidth, win.width);
      var top = calcOffset(sh, sy, lastTop, lastHeight, win.height, true);
      _web_extension["default"].windows.update(winId, {
        left: left,
        top: top
      });
      var actual = {
        width: win.width,
        height: win.height
      };
      return {
        actual: actual,
        desired: winSize,
        diff: ['width', 'height'].filter(function (key) {
          return actual[key] !== winSize[key];
        })
      };
    });
  });
}

// pureViewportSize.width
// pureViewportSize.height
// referenceViewportWindowSize.window.width
// referenceViewportWindowSize.window.height
// referenceViewportWindowSize.viewport.width
// referenceViewportWindowSize.viewport.height
function resizeViewport(winId, pureViewportSize, screenAvailableRect) {
  var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var maxRetry = 2;
  (0, _log["default"])('resizeViewport, ROUND', count);
  return getWindowSize(winId).then(function (currentSize) {
    logWindowSize(currentSize);
    var dx = currentSize.window.width - currentSize.viewport.width;
    var dy = currentSize.window.height - currentSize.viewport.height;
    var newWinSize = {
      width: dx + pureViewportSize.width,
      height: dy + pureViewportSize.height
    };
    (0, _log["default"])('size set to', newWinSize);
    return resizeWindow(winId, newWinSize, screenAvailableRect).then(function () {
      return getWindowSize(winId);
    }).then(function (newSize) {
      logWindowSize(newSize);
      var data = {
        actual: newSize.viewport,
        desired: pureViewportSize,
        diff: ['width', 'height'].filter(function (key) {
          return newSize.viewport[key] !== pureViewportSize[key];
        })
      };
      if (data.diff.length === 0 || count >= maxRetry) {
        return data;
      }
      return (0, _utils.delay)(function () {}, 0).then(function () {
        return resizeViewport(winId, pureViewportSize, screenAvailableRect, count + 1);
      });
    });
  });
}
function resizeViewportOfTab(tabId, pureViewportSize, screenAvailableRect) {
  return _web_extension["default"].tabs.get(tabId).then(function (tab) {
    return resizeViewport(tab.windowId, pureViewportSize, screenAvailableRect);
  });
}

// size.window.width
// size.window.height
// size.window.left
// size.window.top
// size.viewport.wdith
// size.viewport.height
function getWindowSize(winId) {
  return _web_extension["default"].windows.get(winId, {
    populate: true
  }).then(function (win) {
    var tab = win.tabs.find(function (tab) {
      return tab.active;
    });
    return {
      window: {
        width: win.width,
        height: win.height,
        left: win.left,
        top: win.top
      },
      viewport: {
        width: tab.width,
        height: tab.height
      }
    };
  });
}
function getFocusedWindowSize() {
  return _web_extension["default"].windows.getLastFocused().then(function (win) {
    return getWindowSize(win.id);
  });
}
function logWindowSize(winSize) {
  (0, _log["default"])(winSize.window, winSize.viewport);
  (0, _log["default"])('dx = ', winSize.window.width - winSize.viewport.width);
  (0, _log["default"])('dy = ', winSize.window.height - winSize.viewport.height);
}

/***/ }),

/***/ 41334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

/***/ }),

/***/ 12736:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(__webpack_require__(74099).check)("es5");

/***/ }),

/***/ 74099:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(1553);
module.exports = __webpack_require__(63187);


/***/ }),

/***/ 19663:
/***/ ((module) => {

var CapabilityDetector = function () {
    this.tests = {};
    this.cache = {};
};
CapabilityDetector.prototype = {
    constructor: CapabilityDetector,
    define: function (name, test) {
        if (typeof (name) != "string" || !(test instanceof Function))
            throw new Error("Invalid capability definition.");
        if (this.tests[name])
            throw new Error('Duplicated capability definition by "' + name + '".');
        this.tests[name] = test;
    },
    check: function (name) {
        if (!this.test(name))
            throw new Error('The current environment does not support "' + name + '", therefore we cannot continue.');
    },
    test: function (name) {
        if (this.cache[name] !== undefined)
            return this.cache[name];
        if (!this.tests[name])
            throw new Error('Unknown capability with name "' + name + '".');
        var test = this.tests[name];
        this.cache[name] = !!test();
        return this.cache[name];
    }
};

module.exports = CapabilityDetector;

/***/ }),

/***/ 1553:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var capability = __webpack_require__(63187),
    define = capability.define,
    test = capability.test;

define("strict mode", function () {
    return (this === undefined);
});

define("arguments.callee.caller", function () {
    try {
        return (function () {
                return arguments.callee.caller;
            })() === arguments.callee;
    } catch (strictModeIsEnforced) {
        return false;
    }
});

define("es5", function () {
    return test("Array.prototype.forEach") &&
        test("Array.prototype.map") &&
        test("Function.prototype.bind") &&
        test("Object.create") &&
        test("Object.defineProperties") &&
        test("Object.defineProperty") &&
        test("Object.prototype.hasOwnProperty");
});

define("Array.prototype.forEach", function () {
    return Array.prototype.forEach;
});

define("Array.prototype.map", function () {
    return Array.prototype.map;
});

define("Function.prototype.bind", function () {
    return Function.prototype.bind;
});

define("Object.create", function () {
    return Object.create;
});

define("Object.defineProperties", function () {
    return Object.defineProperties;
});

define("Object.defineProperty", function () {
    return Object.defineProperty;
});

define("Object.prototype.hasOwnProperty", function () {
    return Object.prototype.hasOwnProperty;
});

define("Error.captureStackTrace", function () {
    return Error.captureStackTrace;
});

define("Error.prototype.stack", function () {
    try {
        throw new Error();
    }
    catch (e) {
        return e.stack || e.stacktrace;
    }
});

/***/ }),

/***/ 63187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var CapabilityDetector = __webpack_require__(19663);

var detector = new CapabilityDetector();

var capability = function (name) {
    return detector.test(name);
};
capability.define = function (name, test) {
    detector.define(name, test);
};
capability.check = function (name) {
    detector.check(name);
};
capability.test = capability;

module.exports = capability;

/***/ }),

/***/ 15896:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(65606);

const escapeStringRegexp = __webpack_require__(52834);
const ansiStyles = __webpack_require__(94083);
const stdoutColor = (__webpack_require__(2747).stdout);

const template = __webpack_require__(16791);

const isSimpleWindowsTerm = process.platform === 'win32' && !(({"NODE_ENV":"production"}).TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports["default"] = module.exports; // For TypeScript


/***/ }),

/***/ 16791:
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),

/***/ 15659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
var cssKeywords = __webpack_require__(8156);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 10734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(15659);
var route = __webpack_require__(8507);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 8507:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(15659);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 8156:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 25259:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(82715);

/***/ }),

/***/ 82715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(12736);

var capability = __webpack_require__(74099);

var polyfill;
if (capability("Error.captureStackTrace"))
    polyfill = __webpack_require__(95737);
else if (capability("Error.prototype.stack"))
    polyfill = __webpack_require__(17076);
else
    polyfill = __webpack_require__(20292);

module.exports = polyfill();

/***/ }),

/***/ 20005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Class = (__webpack_require__(30827).Class),
    abstractMethod = (__webpack_require__(30827).abstractMethod);

var Frame = Class(Object, {
    prototype: {
        init: Class.prototype.merge,
        frameString: undefined,
        toString: function () {
            return this.frameString;
        },
        functionValue: undefined,
        getThis: abstractMethod,
        getTypeName: abstractMethod,
        getFunction: function () {
            return this.functionValue;
        },
        getFunctionName: abstractMethod,
        getMethodName: abstractMethod,
        getFileName: abstractMethod,
        getLineNumber: abstractMethod,
        getColumnNumber: abstractMethod,
        getEvalOrigin: abstractMethod,
        isTopLevel: abstractMethod,
        isEval: abstractMethod,
        isNative: abstractMethod,
        isConstructor: abstractMethod
    }
});

module.exports = Frame;

/***/ }),

/***/ 4491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Class = (__webpack_require__(30827).Class),
    Frame = __webpack_require__(20005),
    cache = (__webpack_require__(51185).cache);

var FrameStringParser = Class(Object, {
    prototype: {
        stackParser: null,
        frameParser: null,
        locationParsers: null,
        constructor: function (options) {
            Class.prototype.merge.call(this, options);
        },
        getFrames: function (frameStrings, functionValues) {
            var frames = [];
            for (var index = 0, length = frameStrings.length; index < length; ++index)
                frames[index] = this.getFrame(frameStrings[index], functionValues[index]);
            return frames;
        },
        getFrame: function (frameString, functionValue) {
            var config = {
                frameString: frameString,
                functionValue: functionValue
            };
            return new Frame(config);
        }
    }
});

module.exports = {
    getClass: cache(function () {
        return FrameStringParser;
    }),
    getInstance: cache(function () {
        var FrameStringParser = this.getClass();
        var instance = new FrameStringParser();
        return instance;
    })
};

/***/ }),

/***/ 87689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Class = (__webpack_require__(30827).Class),
    abstractMethod = (__webpack_require__(30827).abstractMethod),
    eachCombination = (__webpack_require__(51185).eachCombination),
    cache = (__webpack_require__(51185).cache),
    capability = __webpack_require__(74099);

var AbstractFrameStringSource = Class(Object, {
    prototype: {
        captureFrameStrings: function (frameShifts) {
            var error = this.createError();
            frameShifts.unshift(this.captureFrameStrings);
            frameShifts.unshift(this.createError);
            var capturedFrameStrings = this.getFrameStrings(error);

            var frameStrings = capturedFrameStrings.slice(frameShifts.length),
                functionValues = [];

            if (capability("arguments.callee.caller")) {
                var capturedFunctionValues = [
                    this.createError,
                    this.captureFrameStrings
                ];
                try {
                    var aCaller = arguments.callee;
                    while (aCaller = aCaller.caller)
                        capturedFunctionValues.push(aCaller);
                }
                catch (useStrictError) {
                }
                functionValues = capturedFunctionValues.slice(frameShifts.length);
            }
            return {
                frameStrings: frameStrings,
                functionValues: functionValues
            };
        },
        getFrameStrings: function (error) {
            var message = error.message || "";
            var name = error.name || "";
            var stackString = this.getStackString(error);
            if (stackString === undefined)
                return;
            var stackStringChunks = stackString.split("\n");
            var fromPosition = 0;
            var toPosition = stackStringChunks.length;
            if (this.hasHeader)
                fromPosition += name.split("\n").length + message.split("\n").length - 1;
            if (this.hasFooter)
                toPosition -= 1;
            return stackStringChunks.slice(fromPosition, toPosition);
        },
        createError: abstractMethod,
        getStackString: abstractMethod,
        hasHeader: undefined,
        hasFooter: undefined
    }
});

var FrameStringSourceCalibrator = Class(Object, {
    prototype: {
        calibrateClass: function (FrameStringSource) {
            return this.calibrateMethods(FrameStringSource) && this.calibrateEnvelope(FrameStringSource);
        },
        calibrateMethods: function (FrameStringSource) {
            try {
                eachCombination([[
                    function (message) {
                        return new Error(message);
                    },
                    function (message) {
                        try {
                            throw new Error(message);
                        }
                        catch (error) {
                            return error;
                        }
                    }
                ], [
                    function (error) {
                        return error.stack;
                    },
                    function (error) {
                        return error.stacktrace;
                    }
                ]], function (createError, getStackString) {
                    if (getStackString(createError()))
                        throw {
                            getStackString: getStackString,
                            createError: createError
                        };
                });
            } catch (workingImplementation) {
                Class.merge.call(FrameStringSource, {
                    prototype: workingImplementation
                });
                return true;
            }
            return false;
        },
        calibrateEnvelope: function (FrameStringSource) {
            var getStackString = FrameStringSource.prototype.getStackString;
            var createError = FrameStringSource.prototype.createError;
            var calibratorStackString = getStackString(createError("marker"));
            var calibratorFrameStrings = calibratorStackString.split("\n");
            Class.merge.call(FrameStringSource, {
                prototype: {
                    hasHeader: /marker/.test(calibratorFrameStrings[0]),
                    hasFooter: calibratorFrameStrings[calibratorFrameStrings.length - 1] === ""
                }
            });
            return true;
        }
    }
});


module.exports = {
    getClass: cache(function () {
        var FrameStringSource;
        if (FrameStringSource)
            return FrameStringSource;
        FrameStringSource = Class(AbstractFrameStringSource, {});
        var calibrator = new FrameStringSourceCalibrator();
        if (!calibrator.calibrateClass(FrameStringSource))
            throw new Error("Cannot read Error.prototype.stack in this environment.");
        return FrameStringSource;
    }),
    getInstance: cache(function () {
        var FrameStringSource = this.getClass();
        var instance = new FrameStringSource();
        return instance;
    })
};

/***/ }),

/***/ 17076:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var FrameStringSource = __webpack_require__(87689),
    FrameStringParser = __webpack_require__(4491),
    cache = (__webpack_require__(51185).cache),
    prepareStackTrace = __webpack_require__(57313);

module.exports = function () {

    Error.captureStackTrace = function captureStackTrace(throwable, terminator) {
        var warnings;
        var frameShifts = [
            captureStackTrace
        ];
        if (terminator) {
            // additional frames can come here if arguments.callee.caller is supported
            // otherwise it is hard to identify the terminator
            frameShifts.push(terminator);
        }
        var captured = FrameStringSource.getInstance().captureFrameStrings(frameShifts);
        Object.defineProperties(throwable, {
            stack: {
                configurable: true,
                get: cache(function () {
                    var frames = FrameStringParser.getInstance().getFrames(captured.frameStrings, captured.functionValues);
                    return (Error.prepareStackTrace || prepareStackTrace)(throwable, frames, warnings);
                })
            },
            cachedStack: {
                configurable: true,
                writable: true,
                enumerable: false,
                value: true
            }
        });
    };

    Error.getStackTrace = function (throwable) {
        if (throwable.cachedStack)
            return throwable.stack;
        var frameStrings = FrameStringSource.getInstance().getFrameStrings(throwable),
            frames = [],
            warnings;
        if (frameStrings)
            frames = FrameStringParser.getInstance().getFrames(frameStrings, []);
        else
            warnings = [
                "The stack is not readable by unthrown errors in this environment."
            ];
        var stack = (Error.prepareStackTrace || prepareStackTrace)(throwable, frames, warnings);
        if (frameStrings)
            try {
                Object.defineProperties(throwable, {
                    stack: {
                        configurable: true,
                        writable: true,
                        enumerable: false,
                        value: stack
                    },
                    cachedStack: {
                        configurable: true,
                        writable: true,
                        enumerable: false,
                        value: true
                    }
                });
            } catch (nonConfigurableError) {
            }
        return stack;
    };

    return {
        prepareStackTrace: prepareStackTrace
    };
};

/***/ }),

/***/ 57313:
/***/ ((module) => {

var prepareStackTrace = function (throwable, frames, warnings) {
    var string = "";
    string += throwable.name || "Error";
    string += ": " + (throwable.message || "");
    if (warnings instanceof Array)
        for (var warningIndex in warnings) {
            var warning = warnings[warningIndex];
            string += "\n   # " + warning;
        }
    for (var frameIndex in frames) {
        var frame = frames[frameIndex];
        string += "\n   at " + frame.toString();
    }
    return string;
};

module.exports = prepareStackTrace;

/***/ }),

/***/ 20292:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cache = (__webpack_require__(51185).cache),
    prepareStackTrace = __webpack_require__(57313);

module.exports = function () {

    Error.captureStackTrace = function (throwable, terminator) {
        Object.defineProperties(throwable, {
            stack: {
                configurable: true,
                get: cache(function () {
                    return (Error.prepareStackTrace || prepareStackTrace)(throwable, []);
                })
            },
            cachedStack: {
                configurable: true,
                writable: true,
                enumerable: false,
                value: true
            }
        });
    };

    Error.getStackTrace = function (throwable) {
        if (throwable.cachedStack)
            return throwable.stack;
        var stack = (Error.prepareStackTrace || prepareStackTrace)(throwable, []);
        try {
            Object.defineProperties(throwable, {
                stack: {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: stack
                },
                cachedStack: {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: true
                }
            });
        } catch (nonConfigurableError) {
        }
        return stack;
    };

    return {
        prepareStackTrace: prepareStackTrace
    };
};

/***/ }),

/***/ 95737:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var prepareStackTrace = __webpack_require__(57313);

module.exports = function () {
    Error.getStackTrace = function (throwable) {
        return throwable.stack;
    };

    return {
        prepareStackTrace: prepareStackTrace
    };
};

/***/ }),

/***/ 52834:
/***/ ((module) => {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),

/***/ 30228:
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 65879:
/***/ ((__unused_webpack_module, exports) => {

// Copyright 2014, 2015, 2016, 2017, 2018 Simon Lydell
// License: MIT. (See LICENSE.)

Object.defineProperty(exports, "__esModule", ({
  value: true
}))

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
exports["default"] = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g

exports.matchToToken = function(match) {
  var token = {type: "invalid", value: match[0], closed: undefined}
       if (match[ 1]) token.type = "string" , token.closed = !!(match[3] || match[4])
  else if (match[ 5]) token.type = "comment"
  else if (match[ 6]) token.type = "comment", token.closed = !!match[7]
  else if (match[ 8]) token.type = "regex"
  else if (match[ 9]) token.type = "number"
  else if (match[10]) token.type = "name"
  else if (match[11]) token.type = "punctuator"
  else if (match[12]) token.type = "whitespace"
  return token
}


/***/ }),

/***/ 44191:
/***/ ((module) => {

module.exports = function (glob, opts) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string');
  }

  var str = String(glob);

  // The regexp we are building, as a string.
  var reStr = "";

  // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.
  var extended = opts ? !!opts.extended : false;

  // Whether or not to capture those stars, it means wrapping them with parentheses
  // It's not necessary if globstart is turned on
  var capture = opts ? !!opts.capture : false;

  var nonGreedy = opts ? !!opts.nonGreedy : false;

  // When globstar is _false_ (default), '/foo/*' is translated a regexp like
  // '^\/foo\/.*$' which will match any string beginning with '/foo/'
  // When globstar is _true_, '/foo/*' is translated to regexp like
  // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
  // which does not have a '/' to the right of it.
  // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
  // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
  // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
  // globstar is _false_
  var globstar = opts ? !!opts.globstar : false;

  // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.
  var inGroup = false;

  // RegExp flags (eg "i" ) to pass in to RegExp constructor.
  var flags = opts && typeof( opts.flags ) === "string" ? opts.flags : "";

  var c;
  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
    case "/":
    case "$":
    case "^":
    case "+":
    case ".":
    case "(":
    case ")":
    case "=":
    case "!":
    case "|":
      reStr += "\\" + c;
      break;

    case "?":
      if (extended) {
        reStr += ".";
	    break;
      }

    case "[":
    case "]":
      if (extended) {
        reStr += c;
	    break;
      }

    case "{":
      if (extended) {
        inGroup = true;
	    reStr += "(";
	    break;
      }

    case "}":
      if (extended) {
        inGroup = false;
	    reStr += ")";
	    break;
      }

    case ",":
      if (inGroup) {
        reStr += "|";
	    break;
      }
      reStr += "\\" + c;
      break;

    case "*":
      // Move over all consecutive "*"'s.
      // Also store the previous and next characters
      var prevChar = str[i - 1];
      var starCount = 1;
      while(str[i + 1] === "*") {
        starCount++;
        i++;
      }
      var nextChar = str[i + 1];

      if (!globstar) {
        // globstar is disabled, so treat any number of "*" as one
        var s = nonGreedy ? ".*?" : ".*";

        if (capture) {
          s = "(" + s + ")";
        }

        reStr += s;
      } else {
        // globstar is enabled, so determine if this is a globstar segment
        var isGlobstar = starCount > 1                      // multiple "*"'s
          && (prevChar === "/" || prevChar === undefined)   // from the start of the segment
          && (nextChar === "/" || nextChar === undefined)   // to the end of the segment

        if (isGlobstar) {
          // it's a globstar, so match zero or more path segments
          reStr += "((?:[^/]*(?:\/|$))*)";
          i++; // move over the "/"
        } else {
          // it's not a globstar, so only match one path segment
          reStr += "([^/]*)";
        }
      }
      break;

    default:
      reStr += c;
    }
  }

  // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $
  if (!flags || !~flags.indexOf('g')) {
    reStr = "^" + reStr + "$";
  }

  return new RegExp(reStr, flags);
};


/***/ }),

/***/ 20181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

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

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),

/***/ 30827:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(12736);

module.exports = __webpack_require__(31931);

/***/ }),

/***/ 31007:
/***/ ((module) => {

var Class = function () {
    var options = Object.create({
        Source: Object,
        config: {},
        buildArgs: []
    });

    function checkOption(option) {
        var key = "config";
        if (option instanceof Function)
            key = "Source";
        else if (option instanceof Array)
            key = "buildArgs";
        else if (option instanceof Object)
            key = "config";
        else
            throw new Error("Invalid configuration option.");
        if (options.hasOwnProperty(key))
            throw new Error("Duplicated configuration option: " + key + ".");
        options[key] = option;
    }

    for (var index = 0, length = arguments.length; index < length; ++index)
        checkOption(arguments[index]);

    var Source = options.Source,
        config = options.config,
        buildArgs = options.buildArgs;

    return (Source.extend || Class.extend).call(Source, config, buildArgs);
};

Class.factory = function () {
    var Source = this;
    return function () {
        var instance = this;
        if (instance.build instanceof Function)
            instance.build.apply(instance, arguments);
        if (instance.init instanceof Function)
            instance.init.apply(instance, arguments);
    };
};

Class.extend = function (config, buildArgs) {
    var Source = this;
    if (!config)
        config = {};
    var Subject;
    if ((config.prototype instanceof Object) && config.prototype.constructor !== Object)
        Subject = config.prototype.constructor;
    else if (config.factory instanceof Function)
        Subject = config.factory.call(Source);
    Subject = (Source.clone || Class.clone).call(Source, Subject, buildArgs);
    (Subject.merge || Class.merge).call(Subject, config);
    return Subject;
};

Class.prototype.extend = function (config, buildArgs) {
    var subject = this;
    var instance = (subject.clone || Class.prototype.clone).apply(subject, buildArgs);
    (instance.merge || Class.prototype.merge).call(instance, config);
    return instance;
};

Class.clone = function (Subject, buildArgs) {
    var Source = this;
    if (!(Subject instanceof Function))
        Subject = (Source.factory || Class.factory).call(Source);
    Subject.prototype = (Source.prototype.clone || Class.prototype.clone).apply(Source.prototype, buildArgs || []);
    Subject.prototype.constructor = Subject;
    for (var staticProperty in Source)
        if (staticProperty !== "prototype")
            Subject[staticProperty] = Source[staticProperty];
    return Subject;
};

Class.prototype.clone = function () {
    var subject = this;
    var instance = Object.create(subject);
    if (instance.build instanceof Function)
        instance.build.apply(instance, arguments);
    return instance;
};

Class.merge = function (config) {
    var Subject = this;
    for (var staticProperty in config)
        if (staticProperty !== "prototype")
            Subject[staticProperty] = config[staticProperty];
    if (config.prototype instanceof Object)
        (Subject.prototype.merge || Class.prototype.merge).call(Subject.prototype, config.prototype);
    return Subject;
};

Class.prototype.merge = function (config) {
    var subject = this;
    for (var property in config)
        if (property !== "constructor")
            subject[property] = config[property];
    return subject;
};

Class.absorb = function (config) {
    var Subject = this;
    for (var staticProperty in config)
        if (staticProperty !== "prototype" && (Subject[staticProperty] === undefined || Subject[staticProperty] === Function.prototype[staticProperty]))
            Subject[staticProperty] = config[staticProperty];
    if (config.prototype instanceof Object)
        (Subject.prototype.absorb || Class.prototype.absorb).call(Subject.prototype, config.prototype);
    return Subject;
};

Class.prototype.absorb = function (config) {
    var subject = this;
    for (var property in config)
        if (property !== "constructor" && (subject[property] === undefined || subject[property] === Object.prototype[property]))
            subject[property] = config[property];
    return subject;
};

Class.getAncestor = function () {
    var Source = this;
    if (Source !== Source.prototype.constructor)
        return Source.prototype.constructor;
};

Class.newInstance = function () {
    var Subject = this;
    var instance = Object.create(this.prototype);
    Subject.apply(instance, arguments);
    return instance;
};

module.exports = Class;

/***/ }),

/***/ 23952:
/***/ ((module) => {

module.exports = function () {
    throw new Error("Not implemented.");
};

/***/ }),

/***/ 31931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
    Class: __webpack_require__(31007),
    abstractMethod: __webpack_require__(23952)
};

/***/ }),

/***/ 43627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(65606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.




var isWindows = process.platform === 'win32';
var util = __webpack_require__(40537);


// resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  var res = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    // ignore empty parts
    if (!p || p === '.')
      continue;

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

// returns an array with empty elements removed from either end of the input
// array or the original array if no elements need to be removed
function trimArray(arr) {
  var lastIndex = arr.length - 1;
  var start = 0;
  for (; start <= lastIndex; start++) {
    if (arr[start])
      break;
  }

  var end = lastIndex;
  for (; end >= 0; end--) {
    if (arr[end])
      break;
  }

  if (start === 0 && end === lastIndex)
    return arr;
  if (start > end)
    return [];
  return arr.slice(start, end + 1);
}

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

function win32StatPath(path) {
  var result = splitDeviceRe.exec(path),
      device = result[1] || '',
      isUnc = !!device && device[1] !== ':';
  return {
    device: device,
    isUnc: isUnc,
    isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
    tail: result[3]
  };
}

function normalizeUNCRoot(device) {
  return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
}

// path.resolve([from ...], to)
win32.resolve = function() {
  var resolvedDevice = '',
      resolvedTail = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1; i--) {
    var path;
    if (i >= 0) {
      path = arguments[i];
    } else if (!resolvedDevice) {
      path = process.cwd();
    } else {
      // Windows has the concept of drive-specific current working
      // directories. If we've resolved a drive letter but not yet an
      // absolute path, get cwd for that drive. We're sure the device is not
      // an unc path at this points, because unc paths are always absolute.
      path = ({"NODE_ENV":"production"})['=' + resolvedDevice];
      // Verify that a drive-local cwd was found and that it actually points
      // to our drive. If not, default to the drive's root.
      if (!path || path.substr(0, 3).toLowerCase() !==
          resolvedDevice.toLowerCase() + '\\') {
        path = resolvedDevice + '\\';
      }
    }

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    var result = win32StatPath(path),
        device = result.device,
        isUnc = result.isUnc,
        isAbsolute = result.isAbsolute,
        tail = result.tail;

    if (device &&
        resolvedDevice &&
        device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      // This path points to another device so it is not applicable
      continue;
    }

    if (!resolvedDevice) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = tail + '\\' + resolvedTail;
      resolvedAbsolute = isAbsolute;
    }

    if (resolvedDevice && resolvedAbsolute) {
      break;
    }
  }

  // Convert slashes to backslashes when `resolvedDevice` points to an UNC
  // root. Also squash multiple slashes into a single one where appropriate.
  if (isUnc) {
    resolvedDevice = normalizeUNCRoot(resolvedDevice);
  }

  // At this point the path should be resolved to a full absolute path,
  // but handle relative paths to be safe (might happen when process.cwd()
  // fails)

  // Normalize the tail path
  resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/),
                                !resolvedAbsolute).join('\\');

  return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
         '.';
};


win32.normalize = function(path) {
  var result = win32StatPath(path),
      device = result.device,
      isUnc = result.isUnc,
      isAbsolute = result.isAbsolute,
      tail = result.tail,
      trailingSlash = /[\\\/]$/.test(tail);

  // Normalize the tail path
  tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join('\\');

  if (!tail && !isAbsolute) {
    tail = '.';
  }
  if (tail && trailingSlash) {
    tail += '\\';
  }

  // Convert slashes to backslashes when `device` points to an UNC root.
  // Also squash multiple slashes into a single one where appropriate.
  if (isUnc) {
    device = normalizeUNCRoot(device);
  }

  return device + (isAbsolute ? '\\' : '') + tail;
};


win32.isAbsolute = function(path) {
  return win32StatPath(path).isAbsolute;
};

win32.join = function() {
  var paths = [];
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!util.isString(arg)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    if (arg) {
      paths.push(arg);
    }
  }

  var joined = paths.join('\\');

  // Make sure that the joined path doesn't start with two slashes, because
  // normalize() will mistake it for an UNC path then.
  //
  // This step is skipped when it is very clear that the user actually
  // intended to point at an UNC path. This is assumed when the first
  // non-empty string arguments starts with exactly two slashes followed by
  // at least one more non-slash character.
  //
  // Note that for normalize() to treat a path as an UNC path it needs to
  // have at least 2 components, so we don't filter for that here.
  // This means that the user can use join to construct UNC paths from
  // a server name and a share name; for example:
  //   path.join('//server', 'share') -> '\\\\server\\share\')
  if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
    joined = joined.replace(/^[\\\/]{2,}/, '\\');
  }

  return win32.normalize(joined);
};


// path.relative(from, to)
// it will solve the relative path from 'from' to 'to', for instance:
// from = 'C:\\orandea\\test\\aaa'
// to = 'C:\\orandea\\impl\\bbb'
// The output of the function should be: '..\\..\\impl\\bbb'
win32.relative = function(from, to) {
  from = win32.resolve(from);
  to = win32.resolve(to);

  // windows is not case sensitive
  var lowerFrom = from.toLowerCase();
  var lowerTo = to.toLowerCase();

  var toParts = trimArray(to.split('\\'));

  var lowerFromParts = trimArray(lowerFrom.split('\\'));
  var lowerToParts = trimArray(lowerTo.split('\\'));

  var length = Math.min(lowerFromParts.length, lowerToParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (lowerFromParts[i] !== lowerToParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  if (samePartsLength == 0) {
    return to;
  }

  var outputParts = [];
  for (var i = samePartsLength; i < lowerFromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('\\');
};


win32._makeLong = function(path) {
  // Note: this will *probably* throw somewhere.
  if (!util.isString(path))
    return path;

  if (!path) {
    return '';
  }

  var resolvedPath = win32.resolve(path);

  if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
    // path is local filesystem path, which needs to be converted
    // to long UNC path.
    return '\\\\?\\' + resolvedPath;
  } else if (/^\\\\[^?.]/.test(resolvedPath)) {
    // path is network UNC path, which needs to be converted
    // to long UNC path.
    return '\\\\?\\UNC\\' + resolvedPath.substring(2);
  }

  return path;
};


win32.dirname = function(path) {
  var result = win32SplitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


win32.basename = function(path, ext) {
  var f = win32SplitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


win32.extname = function(path) {
  return win32SplitPath(path)[3];
};


win32.format = function(pathObject) {
  if (!util.isObject(pathObject)) {
    throw new TypeError(
        "Parameter 'pathObject' must be an object, not " + typeof pathObject
    );
  }

  var root = pathObject.root || '';

  if (!util.isString(root)) {
    throw new TypeError(
        "'pathObject.root' must be a string or undefined, not " +
        typeof pathObject.root
    );
  }

  var dir = pathObject.dir;
  var base = pathObject.base || '';
  if (!dir) {
    return base;
  }
  if (dir[dir.length - 1] === win32.sep) {
    return dir + base;
  }
  return dir + win32.sep + base;
};


win32.parse = function(pathString) {
  if (!util.isString(pathString)) {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


win32.sep = '\\';
win32.delimiter = ';';


// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


// path.resolve([from ...], to)
// posix version
posix.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path[0] === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(resolvedPath.split('/'),
                                !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
posix.normalize = function(path) {
  var isAbsolute = posix.isAbsolute(path),
      trailingSlash = path && path[path.length - 1] === '/';

  // Normalize the path
  path = normalizeArray(path.split('/'), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
posix.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
posix.join = function() {
  var path = '';
  for (var i = 0; i < arguments.length; i++) {
    var segment = arguments[i];
    if (!util.isString(segment)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    if (segment) {
      if (!path) {
        path += segment;
      } else {
        path += '/' + segment;
      }
    }
  }
  return posix.normalize(path);
};


// path.relative(from, to)
// posix version
posix.relative = function(from, to) {
  from = posix.resolve(from).substr(1);
  to = posix.resolve(to).substr(1);

  var fromParts = trimArray(from.split('/'));
  var toParts = trimArray(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};


posix._makeLong = function(path) {
  return path;
};


posix.dirname = function(path) {
  var result = posixSplitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


posix.basename = function(path, ext) {
  var f = posixSplitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


posix.extname = function(path) {
  return posixSplitPath(path)[3];
};


posix.format = function(pathObject) {
  if (!util.isObject(pathObject)) {
    throw new TypeError(
        "Parameter 'pathObject' must be an object, not " + typeof pathObject
    );
  }

  var root = pathObject.root || '';

  if (!util.isString(root)) {
    throw new TypeError(
        "'pathObject.root' must be a string or undefined, not " +
        typeof pathObject.root
    );
  }

  var dir = pathObject.dir ? pathObject.dir + posix.sep : '';
  var base = pathObject.base || '';
  return dir + base;
};


posix.parse = function(pathString) {
  if (!util.isString(pathString)) {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


posix.sep = '/';
posix.delimiter = ':';


if (isWindows)
  module.exports = win32;
else /* posix */
  module.exports = posix;

module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 65606:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 73992:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encode(key);
      value = encode(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),

/***/ 92063:
/***/ ((module) => {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),

/***/ 93904:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }

  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    comp = comp.trim().split(/\s+/).join(' ')
    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    options = parseOptions(options)

    // Special cases where nothing can possibly be lower
    if (options.includePrerelease &&
      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
      return false
    }
    if (!options.includePrerelease &&
      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
      return false
    }

    // Same direction increasing (> or >=)
    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
      return true
    }
    // Same direction decreasing (< or <=)
    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
      return true
    }
    // same SemVer and both sides are inclusive (<= or >=)
    if (
      (this.semver.version === comp.semver.version) &&
      this.operator.includes('=') && comp.operator.includes('=')) {
      return true
    }
    // opposite directions less than
    if (cmp(this.semver, '<', comp.semver, options) &&
      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
      return true
    }
    // opposite directions greater than
    if (cmp(this.semver, '>', comp.semver, options) &&
      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
      return true
    }
    return false
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(98587)
const { safeRe: re, t } = __webpack_require__(99718)
const cmp = __webpack_require__(72111)
const debug = __webpack_require__(57272)
const SemVer = __webpack_require__(53908)
const Range = __webpack_require__(78311)


/***/ }),

/***/ 78311:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First reduce all whitespace as much as possible so we do not have to rely
    // on potentially slow regexes like \s*. This is then stored and used for
    // future error messages as well.
    this.raw = range
      .trim()
      .split(/\s+/)
      .join(' ')

    // First, split on ||
    this.set = this.raw
      .split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0) {
        this.set = [first]
      } else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => comps.join(' ').trim())
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts =
      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
      (this.options.loose && FLAG_LOOSE)
    const memoKey = memoOpts + ':' + range
    const cached = cache.get(memoKey)
    if (cached) {
      return cached
    }

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)

    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range)

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)
    debug('tilde trim', range)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)
    debug('caret trim', range)

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    let rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))

    if (loose) {
      // in loose mode, throw out any that are not valid comparators
      rangeList = rangeList.filter(comp => {
        debug('loose invalid filter', comp, this.options)
        return !!comp.match(re[t.COMPARATORLOOSE])
      })
    }
    debug('range list', rangeList)

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const rangeMap = new Map()
    const comparators = rangeList.map(comp => new Comparator(comp, this.options))
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp]
      }
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has('')) {
      rangeMap.delete('')
    }

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}

module.exports = Range

const LRU = __webpack_require__(38357)
const cache = new LRU({ max: 1000 })

const parseOptions = __webpack_require__(98587)
const Comparator = __webpack_require__(93904)
const debug = __webpack_require__(57272)
const SemVer = __webpack_require__(53908)
const {
  safeRe: re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = __webpack_require__(99718)
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __webpack_require__(16874)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceTilde(c, options))
    .join(' ')
}

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceCaret(c, options))
    .join(' ')
}

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp
    .split(/\s+/)
    .map((c) => replaceXRange(c, options))
    .join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<') {
        pr = '-0'
      }

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp
    .trim()
    .replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp
    .trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return `${from} ${to}`.trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 53908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(57272)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(16874)
const { safeRe: re, t } = __webpack_require__(99718)

const parseOptions = __webpack_require__(98587)
const { compareIdentifiers } = __webpack_require__(61123)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier, identifierBase) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier, identifierBase)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier, identifierBase)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier, identifierBase)
        this.inc('pre', identifier, identifierBase)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase)
        }
        this.inc('pre', identifier, identifierBase)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre': {
        const base = Number(identifierBase) ? 1 : 0

        if (!identifier && identifierBase === false) {
          throw new Error('invalid increment argument: identifier is empty')
        }

        if (this.prerelease.length === 0) {
          this.prerelease = [base]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            if (identifier === this.prerelease.join('.') && identifierBase === false) {
              throw new Error('invalid increment argument: identifier already exists')
            }
            this.prerelease.push(base)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          let prerelease = [identifier, base]
          if (identifierBase === false) {
            prerelease = [identifier]
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease
            }
          } else {
            this.prerelease = prerelease
          }
        }
        break
      }
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.raw = this.format()
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`
    }
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 57414:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(30144)
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ 72111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eq = __webpack_require__(94641)
const neq = __webpack_require__(13999)
const gt = __webpack_require__(35580)
const gte = __webpack_require__(54089)
const lt = __webpack_require__(7059)
const lte = __webpack_require__(25200)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a === b

    case '!==':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 46170:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const parse = __webpack_require__(30144)
const { safeRe: re, t } = __webpack_require__(99718)

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL]
    let next
    while ((next = coerceRtlRegex.exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    coerceRtlRegex.lastIndex = -1
  }

  if (match === null) {
    return null
  }

  const major = match[2]
  const minor = match[3] || '0'
  const patch = match[4] || '0'
  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : ''
  const build = options.includePrerelease && match[6] ? `+${match[6]}` : ''

  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
}
module.exports = coerce


/***/ }),

/***/ 40909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ 11763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ 50560:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 51832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(30144)

const diff = (version1, version2) => {
  const v1 = parse(version1, null, true)
  const v2 = parse(version2, null, true)
  const comparison = v1.compare(v2)

  if (comparison === 0) {
    return null
  }

  const v1Higher = comparison > 0
  const highVersion = v1Higher ? v1 : v2
  const lowVersion = v1Higher ? v2 : v1
  const highHasPre = !!highVersion.prerelease.length
  const lowHasPre = !!lowVersion.prerelease.length

  if (lowHasPre && !highHasPre) {
    // Going from prerelease -> no prerelease requires some special casing

    // If the low version has only a major, then it will always be a major
    // Some examples:
    // 1.0.0-1 -> 1.0.0
    // 1.0.0-1 -> 1.1.1
    // 1.0.0-1 -> 2.0.0
    if (!lowVersion.patch && !lowVersion.minor) {
      return 'major'
    }

    // Otherwise it can be determined by checking the high version

    if (highVersion.patch) {
      // anything higher than a patch bump would result in the wrong version
      return 'patch'
    }

    if (highVersion.minor) {
      // anything higher than a minor bump would result in the wrong version
      return 'minor'
    }

    // bumping major/minor/patch all have same result
    return 'major'
  }

  // add the `pre` prefix if we are going to a prerelease version
  const prefix = highHasPre ? 'pre' : ''

  if (v1.major !== v2.major) {
    return prefix + 'major'
  }

  if (v1.minor !== v2.minor) {
    return prefix + 'minor'
  }

  if (v1.patch !== v2.patch) {
    return prefix + 'patch'
  }

  // high and low are preleases
  return 'prerelease'
}

module.exports = diff


/***/ }),

/***/ 94641:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 35580:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 54089:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 93007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)

const inc = (version, release, options, identifier, identifierBase) => {
  if (typeof (options) === 'string') {
    identifierBase = identifier
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(
      version instanceof SemVer ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ 7059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 25200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 32938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 46254:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ 13999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 30144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version
  }
  try {
    return new SemVer(version, options)
  } catch (er) {
    if (!throwErrors) {
      return null
    }
    throw er
  }
}

module.exports = parse


/***/ }),

/***/ 24493:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ 31729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(30144)
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ 9970:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(50560)
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ 74277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(40909)
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ 97638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(78311)
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ 43927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(40909)
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ 56953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(30144)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 99589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// just pre-load all the stuff that index.js lazily exports
const internalRe = __webpack_require__(99718)
const constants = __webpack_require__(16874)
const SemVer = __webpack_require__(53908)
const identifiers = __webpack_require__(61123)
const parse = __webpack_require__(30144)
const valid = __webpack_require__(56953)
const clean = __webpack_require__(57414)
const inc = __webpack_require__(93007)
const diff = __webpack_require__(51832)
const major = __webpack_require__(32938)
const minor = __webpack_require__(46254)
const patch = __webpack_require__(24493)
const prerelease = __webpack_require__(31729)
const compare = __webpack_require__(50560)
const rcompare = __webpack_require__(9970)
const compareLoose = __webpack_require__(11763)
const compareBuild = __webpack_require__(40909)
const sort = __webpack_require__(43927)
const rsort = __webpack_require__(74277)
const gt = __webpack_require__(35580)
const lt = __webpack_require__(7059)
const eq = __webpack_require__(94641)
const neq = __webpack_require__(13999)
const gte = __webpack_require__(54089)
const lte = __webpack_require__(25200)
const cmp = __webpack_require__(72111)
const coerce = __webpack_require__(46170)
const Comparator = __webpack_require__(93904)
const Range = __webpack_require__(78311)
const satisfies = __webpack_require__(97638)
const toComparators = __webpack_require__(77631)
const maxSatisfying = __webpack_require__(19628)
const minSatisfying = __webpack_require__(270)
const minVersion = __webpack_require__(41261)
const validRange = __webpack_require__(13874)
const outside = __webpack_require__(97075)
const gtr = __webpack_require__(75571)
const ltr = __webpack_require__(5342)
const intersects = __webpack_require__(76780)
const simplifyRange = __webpack_require__(72525)
const subset = __webpack_require__(75032)
module.exports = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
}


/***/ }),

/***/ 16874:
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]

module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010,
}


/***/ }),

/***/ 57272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(65606);
const debug = (
  typeof process === 'object' &&
  ({"NODE_ENV":"production"}) &&
  ({"NODE_ENV":"production"}).NODE_DEBUG &&
  /\bsemver\b/i.test(({"NODE_ENV":"production"}).NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 61123:
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers,
}


/***/ }),

/***/ 98587:
/***/ ((module) => {

// parse out just the options we care about
const looseOption = Object.freeze({ loose: true })
const emptyOpts = Object.freeze({ })
const parseOptions = options => {
  if (!options) {
    return emptyOpts
  }

  if (typeof options !== 'object') {
    return looseOption
  }

  return options
}
module.exports = parseOptions


/***/ }),

/***/ 99718:
/***/ ((module, exports, __webpack_require__) => {

const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH,
} = __webpack_require__(16874)
const debug = __webpack_require__(57272)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const safeRe = exports.safeRe = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const LETTERDASHNUMBER = '[a-zA-Z0-9-]'

// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
  ['\\s', 1],
  ['\\d', MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
]

const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value
      .split(`${token}*`).join(`${token}{0,${max}}`)
      .split(`${token}+`).join(`${token}{1,${max}}`)
  }
  return value
}

const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value)
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '\\d+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`)

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`)

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`)
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`)
createToken('COERCEFULL', src[t.COERCEPLAIN] +
              `(?:${src[t.PRERELEASE]})?` +
              `(?:${src[t.BUILD]})?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)
createToken('COERCERTLFULL', src[t.COERCEFULL], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


/***/ }),

/***/ 38357:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(4927)

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ 50723:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 4927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(50723)(Yallist)
} catch (er) {}


/***/ }),

/***/ 75571:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Determine if version is greater than all the versions possible in the range.
const outside = __webpack_require__(97075)
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ 76780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(78311)
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2, options)
}
module.exports = intersects


/***/ }),

/***/ 5342:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const outside = __webpack_require__(97075)
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ 19628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const Range = __webpack_require__(78311)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const Range = __webpack_require__(78311)
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ 41261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const Range = __webpack_require__(78311)
const gt = __webpack_require__(35580)

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin))) {
      minver = setMin
    }
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ 97075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(53908)
const Comparator = __webpack_require__(93904)
const { ANY } = Comparator
const Range = __webpack_require__(78311)
const satisfies = __webpack_require__(97638)
const gt = __webpack_require__(35580)
const lt = __webpack_require__(7059)
const lte = __webpack_require__(25200)
const gte = __webpack_require__(54089)

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ 72525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __webpack_require__(97638)
const compare = __webpack_require__(50560)
module.exports = (versions, range, options) => {
  const set = []
  let first = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!first) {
        first = version
      }
    } else {
      if (prev) {
        set.push([first, prev])
      }
      prev = null
      first = null
    }
  }
  if (first) {
    set.push([first, null])
  }

  const ranges = []
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min)
    } else if (!max && min === v[0]) {
      ranges.push('*')
    } else if (!max) {
      ranges.push(`>=${min}`)
    } else if (min === v[0]) {
      ranges.push(`<=${max}`)
    } else {
      ranges.push(`${min} - ${max}`)
    }
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ 75032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(78311)
const Comparator = __webpack_require__(93904)
const { ANY } = Comparator
const satisfies = __webpack_require__(97638)
const compare = __webpack_require__(50560)

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true
  }

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub) {
        continue OUTER
      }
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull) {
      return false
    }
  }
  return true
}

const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')]
const minimumVersion = [new Comparator('>=0.0.0')]

const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true
  }

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease
    } else {
      sub = minimumVersion
    }
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true
    } else {
      dom = minimumVersion
    }
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=') {
      gt = higherGT(gt, c, options)
    } else if (c.operator === '<' || c.operator === '<=') {
      lt = lowerLT(lt, c, options)
    } else {
      eqSet.add(c.semver)
    }
  }

  if (eqSet.size > 1) {
    return null
  }

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0) {
      return null
    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
      return null
    }
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options)) {
      return null
    }

    if (lt && !satisfies(eq, String(lt), options)) {
      return null
    }

    for (const c of dom) {
      if (!satisfies(eq, String(c), options)) {
        return false
      }
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt) {
          return false
        }
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
        return false
      }
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt) {
          return false
        }
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
        return false
      }
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0) {
      return false
    }
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0) {
    return false
  }

  if (lt && hasDomGT && !gt && gtltComp !== 0) {
    return false
  }

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre) {
    return false
  }

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ 77631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(78311)

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ 13874:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(78311)
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ 2747:
/***/ ((module) => {

"use strict";

module.exports = {
	stdout: false,
	stderr: false
};


/***/ }),

/***/ 51185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(3241);

/***/ }),

/***/ 26311:
/***/ ((module) => {

var cache = function (fn) {
    var called = false,
        store;

    if (!(fn instanceof Function)) {
        called = true;
        store = fn;
        fn = null;
    }

    return function () {
        if (!called) {
            called = true;
            store = fn.apply(this, arguments);
            fn = null;
        }
        return store;
    };
};

module.exports = cache;

/***/ }),

/***/ 48217:
/***/ ((module) => {

module.exports = function eachCombination(alternativesByDimension, callback, combination) {
    if (!combination)
        combination = [];
    if (combination.length < alternativesByDimension.length) {
        var alternatives = alternativesByDimension[combination.length];
        for (var index in alternatives) {
            combination[combination.length] = alternatives[index];
            eachCombination(alternativesByDimension, callback, combination);
            --combination.length;
        }
    }
    else
        callback.apply(null, combination);
};

/***/ }),

/***/ 3241:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
    cache: __webpack_require__(26311),
    eachCombination: __webpack_require__(48217)
};

/***/ }),

/***/ 61160:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var required = __webpack_require__(92063)
  , qs = __webpack_require__(73992)
  , controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
  , CRHTLF = /[\n\r\t]/g
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , port = /:\d+$/
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
  , windowsDriveLetter = /^[a-zA-Z]:/;

/**
 * Remove control characters and whitespace from the beginning of a string.
 *
 * @param {Object|String} str String to trim.
 * @returns {String} A new string representing `str` stripped of control
 *     characters and whitespace from its beginning.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(controlOrWhitespace, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address, url) {     // Sanitize what is left of the address
    return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d*)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof __webpack_require__.g !== 'undefined') globalVar = __webpack_require__.g;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * Check whether a protocol scheme is special.
 *
 * @param {String} The protocol scheme of the URL
 * @return {Boolean} `true` if the protocol scheme is special, else `false`
 * @private
 */
function isSpecial(scheme) {
  return (
    scheme === 'file:' ||
    scheme === 'ftp:' ||
    scheme === 'http:' ||
    scheme === 'https:' ||
    scheme === 'ws:' ||
    scheme === 'wss:'
  );
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @param {Object} location
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');
  location = location || {};

  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : '';
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;

  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4]
    }
  }

  if (protocol === 'file:') {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }

  return {
    protocol: protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount: slashesCount,
    rest: rest
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, '');

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '', location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (
    extracted.protocol === 'file:' && (
      extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) ||
    (!extracted.slashes &&
      (extracted.protocol ||
        extracted.slashesCount < 2 ||
        !isSpecial(url.protocol)))
  ) {
    instructions[3] = [/(.*)/, 'pathname'];
  }

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address, url);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      index = parse === '@'
        ? address.lastIndexOf(parse)
        : address.indexOf(parse);

      if (~index) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // Default to a / for pathname if none exists. This normalizes the URL
  // to always have a /
  //
  if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
    url.pathname = '/' + url.pathname;
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';

  if (url.auth) {
    index = url.auth.indexOf(':');

    if (~index) {
      url.username = url.auth.slice(0, index);
      url.username = encodeURIComponent(decodeURIComponent(url.username));

      url.password = url.auth.slice(index + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password))
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }

    url.auth = url.password ? url.username +':'+ url.password : url.username;
  }

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (port.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    case 'username':
    case 'password':
      url[part] = encodeURIComponent(value);
      break;

    case 'auth':
      var index = value.indexOf(':');

      if (~index) {
        url.username = value.slice(0, index);
        url.username = encodeURIComponent(decodeURIComponent(url.username));

        url.password = value.slice(index + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(value));
      }
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.auth = url.password ? url.username +':'+ url.password : url.username;

  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , host = url.host
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result =
    protocol +
    ((url.protocol && url.slashes) || isSpecial(url.protocol) ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  } else if (url.password) {
    result += ':'+ url.password;
    result += '@';
  } else if (
    url.protocol !== 'file:' &&
    isSpecial(url.protocol) &&
    !host &&
    url.pathname !== '/'
  ) {
    //
    // Add back the empty userinfo, otherwise the original invalid URL
    // might be transformed into a valid one with `url.pathname` as host.
    //
    result += '@';
  }

  //
  // Trailing colon is removed from `url.host` when it is parsed. If it still
  // ends with a colon, then add back the trailing colon that was removed. This
  // prevents an invalid URL from being transformed into a valid one.
  //
  if (host[host.length - 1] === ':' || (port.test(url.hostname) && !url.port)) {
    host += ':';
  }

  result += host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;


/***/ }),

/***/ 36622:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 81135:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 40537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(65606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = ({"NODE_ENV":"production"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(81135);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(36622);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ 62882:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/* provided dependency */ var process = __webpack_require__(65606);


__webpack_unused_export__ = ({
  value: true
});
exports.gl = codeFrameColumns;
__webpack_unused_export__ = _default;
var _highlight = __webpack_require__(22013);
var _chalk = _interopRequireWildcard(__webpack_require__(15896), true);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let chalkWithForcedColor = undefined;
function getChalk(forceColor) {
  if (forceColor) {
    var _chalkWithForcedColor;
    (_chalkWithForcedColor = chalkWithForcedColor) != null ? _chalkWithForcedColor : chalkWithForcedColor = new _chalk.default.constructor({
      enabled: true,
      level: 1
    });
    return chalkWithForcedColor;
  }
  return _chalk.default;
}
let deprecationWarningShown = false;
function getDefs(chalk) {
  return {
    gutter: chalk.grey,
    marker: chalk.red.bold,
    message: chalk.red.bold
  };
}
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
function getMarkerLines(loc, source, opts) {
  const startLoc = Object.assign({
    column: 0,
    line: -1
  }, loc.start);
  const endLoc = Object.assign({}, startLoc, loc.end);
  const {
    linesAbove = 2,
    linesBelow = 3
  } = opts || {};
  const startLine = startLoc.line;
  const startColumn = startLoc.column;
  const endLine = endLoc.line;
  const endColumn = endLoc.column;
  let start = Math.max(startLine - (linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + linesBelow);
  if (startLine === -1) {
    start = 0;
  }
  if (endLine === -1) {
    end = source.length;
  }
  const lineDiff = endLine - startLine;
  const markerLines = {};
  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine;
      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn];
      } else {
        const sourceLength = source[lineNumber - i].length;
        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0];
      } else {
        markerLines[startLine] = true;
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn];
    }
  }
  return {
    start,
    end,
    markerLines
  };
}
function codeFrameColumns(rawLines, loc, opts = {}) {
  const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts);
  const chalk = getChalk(opts.forceColor);
  const defs = getDefs(chalk);
  const maybeHighlight = (chalkFn, string) => {
    return highlighted ? chalkFn(string) : string;
  };
  const lines = rawLines.split(NEWLINE);
  const {
    start,
    end,
    markerLines
  } = getMarkerLines(loc, lines, opts);
  const hasColumns = loc.start && typeof loc.start.column === "number";
  const numberMaxWidth = String(end).length;
  const highlightedLines = highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines;
  let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index) => {
    const number = start + 1 + index;
    const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
    const gutter = ` ${paddedNumber} |`;
    const hasMarker = markerLines[number];
    const lastMarkerLine = !markerLines[number + 1];
    if (hasMarker) {
      let markerLine = "";
      if (Array.isArray(hasMarker)) {
        const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
        const numberOfMarkers = hasMarker[1] || 1;
        markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
        if (lastMarkerLine && opts.message) {
          markerLine += " " + maybeHighlight(defs.message, opts.message);
        }
      }
      return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine].join("");
    } else {
      return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
    }
  }).join("\n");
  if (opts.message && !hasColumns) {
    frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`;
  }
  if (highlighted) {
    return chalk.reset(frame);
  } else {
    return frame;
  }
}
function _default(rawLines, lineNumber, colNumber, opts = {}) {
  if (!deprecationWarningShown) {
    deprecationWarningShown = true;
    const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
    if (process.emitWarning) {
      process.emitWarning(message, "DeprecationWarning");
    } else {
      const deprecationError = new Error(message);
      deprecationError.name = "DeprecationWarning";
      console.warn(new Error(message));
    }
  }
  colNumber = Math.max(colNumber, 0);
  const location = {
    start: {
      column: colNumber,
      line: lineNumber
    }
  };
  return codeFrameColumns(rawLines, location, opts);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ 38721:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isIdentifierChar = isIdentifierChar;
exports.isIdentifierName = isIdentifierName;
exports.isIdentifierStart = isIdentifierStart;
let nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
let nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";
const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function isInAstralSet(code, set) {
  let pos = 0x10000;
  for (let i = 0, length = set.length; i < length; i += 2) {
    pos += set[i];
    if (pos > code) return false;
    pos += set[i + 1];
    if (pos >= code) return true;
  }
  return false;
}
function isIdentifierStart(code) {
  if (code < 65) return code === 36;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code <= 90) return true;
  if (code < 97) return code === 95;
  if (code <= 122) return true;
  if (code <= 0xffff) {
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function isIdentifierName(name) {
  let isFirst = true;
  for (let i = 0; i < name.length; i++) {
    let cp = name.charCodeAt(i);
    if ((cp & 0xfc00) === 0xd800 && i + 1 < name.length) {
      const trail = name.charCodeAt(++i);
      if ((trail & 0xfc00) === 0xdc00) {
        cp = 0x10000 + ((cp & 0x3ff) << 10) + (trail & 0x3ff);
      }
    }
    if (isFirst) {
      isFirst = false;
      if (!isIdentifierStart(cp)) {
        return false;
      }
    } else if (!isIdentifierChar(cp)) {
      return false;
    }
  }
  return !isFirst;
}

//# sourceMappingURL=identifier.js.map


/***/ }),

/***/ 61000:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "isIdentifierChar", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierChar;
  }
}));
Object.defineProperty(exports, "isIdentifierName", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierName;
  }
}));
Object.defineProperty(exports, "isIdentifierStart", ({
  enumerable: true,
  get: function () {
    return _identifier.isIdentifierStart;
  }
}));
Object.defineProperty(exports, "isKeyword", ({
  enumerable: true,
  get: function () {
    return _keyword.isKeyword;
  }
}));
Object.defineProperty(exports, "isReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictBindOnlyReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictBindOnlyReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictBindReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictBindReservedWord;
  }
}));
Object.defineProperty(exports, "isStrictReservedWord", ({
  enumerable: true,
  get: function () {
    return _keyword.isStrictReservedWord;
  }
}));
var _identifier = __webpack_require__(38721);
var _keyword = __webpack_require__(43115);

//# sourceMappingURL=index.js.map


/***/ }),

/***/ 43115:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isKeyword = isKeyword;
exports.isReservedWord = isReservedWord;
exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
exports.isStrictBindReservedWord = isStrictBindReservedWord;
exports.isStrictReservedWord = isStrictReservedWord;
const reservedWords = {
  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
  strictBind: ["eval", "arguments"]
};
const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
function isReservedWord(word, inModule) {
  return inModule && word === "await" || word === "enum";
}
function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}
function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}
function isStrictBindReservedWord(word, inModule) {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}
function isKeyword(word) {
  return keywords.has(word);
}

//# sourceMappingURL=keyword.js.map


/***/ }),

/***/ 22013:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = highlight;
exports.shouldHighlight = shouldHighlight;
var _jsTokens = __webpack_require__(65879);
var _helperValidatorIdentifier = __webpack_require__(61000);
var _chalk = _interopRequireWildcard(__webpack_require__(15896), true);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const sometimesKeywords = new Set(["as", "async", "from", "get", "of", "set"]);
function getDefs(chalk) {
  return {
    keyword: chalk.cyan,
    capitalized: chalk.yellow,
    jsxIdentifier: chalk.yellow,
    punctuator: chalk.yellow,
    number: chalk.magenta,
    string: chalk.green,
    regex: chalk.magenta,
    comment: chalk.grey,
    invalid: chalk.white.bgRed.bold
  };
}
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
const BRACKET = /^[()[\]{}]$/;
let tokenize;
{
  const JSX_TAG = /^[a-z][\w-]*$/i;
  const getTokenType = function (token, offset, text) {
    if (token.type === "name") {
      if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, true) || sometimesKeywords.has(token.value)) {
        return "keyword";
      }
      if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.slice(offset - 2, offset) == "</")) {
        return "jsxIdentifier";
      }
      if (token.value[0] !== token.value[0].toLowerCase()) {
        return "capitalized";
      }
    }
    if (token.type === "punctuator" && BRACKET.test(token.value)) {
      return "bracket";
    }
    if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
      return "punctuator";
    }
    return token.type;
  };
  tokenize = function* (text) {
    let match;
    while (match = _jsTokens.default.exec(text)) {
      const token = _jsTokens.matchToToken(match);
      yield {
        type: getTokenType(token, match.index, text),
        value: token.value
      };
    }
  };
}
function highlightTokens(defs, text) {
  let highlighted = "";
  for (const {
    type,
    value
  } of tokenize(text)) {
    const colorize = defs[type];
    if (colorize) {
      highlighted += value.split(NEWLINE).map(str => colorize(str)).join("\n");
    } else {
      highlighted += value;
    }
  }
  return highlighted;
}
function shouldHighlight(options) {
  return _chalk.default.level > 0 || options.forceColor;
}
let chalkWithForcedColor = undefined;
function getChalk(forceColor) {
  if (forceColor) {
    var _chalkWithForcedColor;
    (_chalkWithForcedColor = chalkWithForcedColor) != null ? _chalkWithForcedColor : chalkWithForcedColor = new _chalk.default.constructor({
      enabled: true,
      level: 1
    });
    return chalkWithForcedColor;
  }
  return _chalk.default;
}
{
  exports.getChalk = options => getChalk(options.forceColor);
}
function highlight(code, options = {}) {
  if (code !== "" && shouldHighlight(options)) {
    const defs = getDefs(getChalk(options.forceColor));
    return highlightTokens(defs, code);
  } else {
    return code;
  }
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ 78261:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  JSONError: () => (/* binding */ JSONError),
  "default": () => (/* binding */ parseJson)
});

// EXTERNAL MODULE: ./node_modules/@babel/code-frame/lib/index.js
var lib = __webpack_require__(62882);
;// CONCATENATED MODULE: ./node_modules/index-to-position/index.js
// Prevent `String#lastIndexOf` treat negative index as `0`
const safeLastIndexOf = (string, searchString, index) =>
	index < 0 ? -1 : string.lastIndexOf(searchString, index);

function getPosition(text, textIndex) {
	const lineBreakBefore = safeLastIndexOf(text, '\n', textIndex - 1);
	const column = textIndex - lineBreakBefore - 1;

	let line = 0;
	for (
		let index = lineBreakBefore;
		index >= 0;
		index = safeLastIndexOf(text, '\n', index - 1)
	) {
		line++;
	}

	return {line, column};
}

function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	const position = getPosition(text, textIndex);

	return oneBased ? {line: position.line + 1, column: position.column + 1} : position;
}

;// CONCATENATED MODULE: ./node_modules/parse-json/index.js



const getCodePoint = character => `\\u{${character.codePointAt(0).toString(16)}}`;

class JSONError extends Error {
	name = 'JSONError';
	fileName;
	codeFrame;
	rawCodeFrame;
	#message;

	constructor(message) {
		// We cannot pass message to `super()`, otherwise the message accessor will be overridden.
		// https://262.ecma-international.org/14.0/#sec-error-message
		super();

		this.#message = message;
		Error.captureStackTrace?.(this, JSONError);
	}

	get message() {
		const {fileName, codeFrame} = this;
		return `${this.#message}${fileName ? ` in ${fileName}` : ''}${codeFrame ? `\n\n${codeFrame}\n` : ''}`;
	}

	set message(message) {
		this.#message = message;
	}
}

const generateCodeFrame = (string, location, highlightCode = true) =>
	(0,lib/* codeFrameColumns */.gl)(string, {start: location}, {highlightCode});

const getErrorLocation = (string, message) => {
	const match = message.match(/in JSON at position (?<index>\d+)(?: \(line (?<line>\d+) column (?<column>\d+)\))?$/);

	if (!match) {
		return;
	}

	let {index, line, column} = match.groups;

	if (line && column) {
		return {line: Number(line), column: Number(column)};
	}

	index = Number(index);

	// The error location can be out of bounds.
	if (index === string.length) {
		const {line, column} = indexToLineColumn(string, string.length - 1, {oneBased: true});
		return {line, column: column + 1};
	}

	return indexToLineColumn(string, index, {oneBased: true});
};

const addCodePointToUnexpectedToken = message => message.replace(
	// TODO[engine:node@>=20]: The token always quoted after Node.js 20
	/(?<=^Unexpected token )(?<quote>')?(.)\k<quote>/,
	(_, _quote, token) => `"${token}"(${getCodePoint(token)})`,
);

function parseJson(string, reviver, fileName) {
	if (typeof reviver === 'string') {
		fileName = reviver;
		reviver = undefined;
	}

	let message;
	try {
		return JSON.parse(string, reviver);
	} catch (error) {
		message = error.message;
	}

	let location;
	if (string) {
		location = getErrorLocation(string, message);
		message = addCodePointToUnexpectedToken(message);
	} else {
		message += ' while parsing empty string';
	}

	const jsonError = new JSONError(message);

	jsonError.fileName = fileName;

	if (location) {
		jsonError.codeFrame = generateCodeFrame(string, location);
		jsonError.rawCodeFrame = generateCodeFrame(string, location, /* highlightCode */ false);
	}

	throw jsonError;
}


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
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
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ui-vision-web-extension:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			130: 0,
/******/ 			624: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
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
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* provided dependency */ var process = __webpack_require__(65606);


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _web_extension = _interopRequireDefault(__webpack_require__(41953));
var _utils = __webpack_require__(46580);
var _ipc_bg_cs = __webpack_require__(59711);
var C = _interopRequireWildcard(__webpack_require__(95902));
var _log = _interopRequireDefault(__webpack_require__(89130));
var _clipboard = _interopRequireDefault(__webpack_require__(92642));
var _storage = _interopRequireDefault(__webpack_require__(88555));
var _debugger = __webpack_require__(80978);
var _download_man = __webpack_require__(54138);
var _config = _interopRequireDefault(__webpack_require__(8747));
var _storage2 = __webpack_require__(97467);
var _xfile = __webpack_require__(63109);
var _resize_window = __webpack_require__(55720);
var _ipc_cache = __webpack_require__(75866);
var _tab_utils = __webpack_require__(20041);
var _service = __webpack_require__(40987);
var _types = __webpack_require__(76701);
var _ts_utils = __webpack_require__(1601);
var _proxy = __webpack_require__(44790);
var _log2 = __webpack_require__(26480);
var _contextMenu = __webpack_require__(54490);
var _global_state = __webpack_require__(8327);
var _tab = __webpack_require__(13755);
var _sidepanel = __webpack_require__(17767);
var _intercept_log = _interopRequireDefault(__webpack_require__(36447));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* global browser */
var downloadMan = new _download_man.DownloadMan();
(0, _intercept_log["default"])();
var checkTaIsPresent = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(idexId, wid) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            chrome.tabs.query({
              windowId: wid
            }, function (tabs) {
              var doFlag = "";
              for (var i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].index === idexId) {
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
  return function checkTaIsPresent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var checkWindowisOpen = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(toplayId) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            chrome.tabs.query({}, function (tabs) {
              var doFlag = [];
              for (var i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].id === toplayId) {
                  doFlag = tabs[i];
                  break;
                }
              }
              resolve(doFlag);
            });
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function checkWindowisOpen(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getToplayTabId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            return _web_extension["default"].tabs.query({
              active: true
            }).then( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tabs) {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      resolve(tabs[0]);
                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }());
          }));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getToplayTabId() {
    return _ref3.apply(this, arguments);
  };
}();
var getRecordTabIpc = (0, _tab.genGetTabIpc)('toRecord', 'recording');
var getPlayTabIpc = (0, _tab.genGetTabIpc)('toPlay', 'playing commands');
var getInspectTabIpc = (0, _tab.genGetTabIpc)('toInspect', 'inspect');
var getPanelTabIpc = (0, _tab.genGetTabIpc)('panel', 'dashboard');
var showBadge = function showBadge(options) {
  var _clear$text$color$bli = _objectSpread({
      clear: false,
      text: '',
      color: '#ff0000',
      blink: 0
    }, options || {}),
    clear = _clear$text$color$bli.clear,
    text = _clear$text$color$bli.text,
    color = _clear$text$color$bli.color,
    blink = _clear$text$color$bli.blink;
  if (clear) {
    return _web_extension["default"].action.setBadgeText({
      text: ''
    });
  }
  _web_extension["default"].action.setBadgeBackgroundColor({
    color: color
  });
  _web_extension["default"].action.setBadgeText({
    text: text
  });
  if (blink) {
    setTimeout(function () {
      _web_extension["default"].action.getBadgeText({}).then(function (curText) {
        if (curText !== text) return false;
        return _web_extension["default"].action.setBadgeText({
          text: ''
        });
      });
    }, blink);
  }
  return true;
};
var toggleRecordingBadge = function toggleRecordingBadge(isRecording, options) {
  return showBadge(_objectSpread(_objectSpread({
    color: '#ff0000',
    text: 'R'
  }, options || {}), {}, {
    clear: !isRecording
  }));
};
var toggleInspectingBadge = function toggleInspectingBadge(isInspecting, options) {
  return showBadge(_objectSpread(_objectSpread({
    color: '#ffa800',
    text: 'S'
  }, options || {}), {}, {
    clear: !isInspecting
  }));
};
var togglePlayingBadge = function togglePlayingBadge(isPlaying, options) {
  return showBadge(_objectSpread(_objectSpread({
    color: '#14c756',
    text: 'P'
  }, options || {}), {}, {
    clear: !isPlaying
  }));
};
var isUpgradeViewed = function isUpgradeViewed() {
  return _web_extension["default"].storage.local.get('upgrade_not_viewed').then(function (obj) {
    return obj['upgrade_not_viewed'] !== 'not_viewed';
  });
};
var notifyRecordCommand = function notifyRecordCommand(command) {
  var notifId = (0, _utils.uid)();
  _web_extension["default"].notifications.create(notifId, {
    type: 'basic',
    iconUrl: './logo.png',
    title: 'Record command!',
    message: function () {
      var list = [];
      list.push("command: ".concat(command.cmd));
      if (command.target) list.push("target: ".concat(command.target));
      if (command.value) list.push("value: ".concat(command.value));
      return list.join('\n');
    }()
  });

  // Note: close record notifications right away, so that notifications won't be stacked
  setTimeout(function () {
    _web_extension["default"].notifications.clear(notifId)["catch"](function (e) {
      return _log["default"].error(e);
    });
  }, 2000);
};
var notifyAutoPause = function notifyAutoPause() {
  _web_extension["default"].notifications.create({
    type: 'basic',
    iconUrl: './logo.png',
    title: 'Replay paused!',
    message: 'Auto paused by command'
  });
};
var notifyBreakpoint = function notifyBreakpoint() {
  _web_extension["default"].notifications.create({
    type: 'basic',
    iconUrl: './logo.png',
    title: 'Replay paused!',
    message: 'Auto paused by breakpoint'
  });
};
var notifyEcho = function notifyEcho(text) {
  _web_extension["default"].notifications.create({
    type: 'basic',
    iconUrl: './logo.png',
    title: 'Echo',
    message: text
  });
};
var closeAllWindows = function closeAllWindows() {
  return _web_extension["default"].windows.getAll().then(function (wins) {
    return Promise.all(wins.map(function (win) {
      return _web_extension["default"].windows.remove(win.id);
    }));
  });
};
var isTimeToBackup = function isTimeToBackup() {
  return _storage["default"].get('config').then(function (config) {
    var enableAutoBackup = config.enableAutoBackup,
      lastBackupActionTime = config.lastBackupActionTime,
      autoBackupInterval = config.autoBackupInterval;
    if (!enableAutoBackup) {
      return {
        timeout: false,
        remain: -1
      };
    }
    var diff = new Date() * 1 - (lastBackupActionTime || 0);
    return {
      timeout: diff > autoBackupInterval * 24 * 3600000,
      remain: diff
    };
  });
};
var notifyPanelAboutActiveTab = function notifyPanelAboutActiveTab(activeTabId) {
  Promise.all([_web_extension["default"].tabs.get(activeTabId), getPanelTabIpc()["catch"](function () {
    return null;
  })]).then(function (tuple) {
    var _tuple = _slicedToArray(tuple, 2),
      tab = _tuple[0],
      panelIpc = _tuple[1];
    if (!panelIpc) return;
    if (tab.url.indexOf(_web_extension["default"].runtime.getURL('')) !== -1) return;
    if (!tab.title || tab.title.trim().length === 0) {
      return (0, _utils.delay)(function () {
        return notifyPanelAboutActiveTab(activeTabId);
      }, 200);
    }
    return panelIpc.ask('UPDATE_ACTIVE_TAB', {
      url: tab.url,
      title: tab.title
    });
  });
};
var isTabActiveAndFocused = function isTabActiveAndFocused(tabId) {
  return Promise.all([_web_extension["default"].tabs.get(tabId), (0, _global_state.getState)()]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      tab = _ref6[0],
      state = _ref6[1];
    if (!tab.active) return false;
    switch (state.status) {
      case C.APP_STATUS.NORMAL:
        return _web_extension["default"].windows.get(tab.windowId).then(function (win) {
          return win.focused;
        });
      case C.APP_STATUS.PLAYER:
        return tabId === state.tabIds.toPlay;
      case C.APP_STATUS.RECORDER:
        return tabId === state.tabIds.toRecord;
      default:
        throw new Error("E213: isTabActiveAndFocused: unknown app status, '".concat(state.status, "'"));
    }
  })["catch"](function (e) {
    return false;
  });
};
var getStorageManagerForBg = (0, _ts_utils.singletonGetterByKey)(function (mode) {
  return mode;
}, function (mode, extraOptions) {
  return new _storage2.StorageManager(mode, extraOptions);
});
var getCurrentStorageManager = function getCurrentStorageManager() {
  var restoreConfig = function restoreConfig() {
    return _storage["default"].get('config');
  };
  return Promise.all([restoreConfig(), (0, _xfile.getXFile)().getConfig()]).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      config = _ref8[0],
      xFileConfig = _ref8[1];
    return getStorageManagerForBg(config.storageMode);
  });
};
var getLogServiceForBg = (0, _ts_utils.singletonGetter)(function () {
  return new _log2.LogService({
    waitForStorageManager: getCurrentStorageManager
  });
});
function logKantuClosing() {
  return getLogServiceForBg().logWithTime('Ui.Vision closing');
}
var closeSidePanel = function closeSidePanel() {
  if (_web_extension["default"].isFirefox()) {
    _web_extension["default"].sidebarAction.close().then(function () {
      // debugger; 
    });
  } else {
    return _web_extension["default"].sidePanel.setOptions({
      enabled: false
    }).then(function () {
      _web_extension["default"].sidePanel.setOptions({
        enabled: true
      });
    });
  }
};
var bindEvents = function bindEvents() {
  _web_extension["default"].action.onClicked.addListener(function (tab) {
    if (_web_extension["default"].isFirefox()) {
      // if browser is firefox
      // placeholder for now
      if (showSidePanel) {
        // debugger;
        _web_extension["default"].sidebarAction.open();
      } else {
        isUpgradeViewed().then(function (isViewed) {
          if (isViewed) {
            return (0, _tab.showPanelWindow)().then(function (isWindowCreated) {
              if (isWindowCreated) {
                getLogServiceForBg().updateLogFileName();
                getLogServiceForBg().logWithTime('Ui.Vision started');
              }
            });
          } else {
            _web_extension["default"].action.setBadgeText({
              text: ''
            });
            _web_extension["default"].storage.local.set({
              upgrade_not_viewed: ''
            });
            return _web_extension["default"].tabs.create({
              url: _config["default"].urlAfterUpgrade
            });
          }
        });
      }
    } else {
      // if browser is chrome or edge
      if (showSidePanel) {
        if (!isSidePanelOpen) {
          _web_extension["default"].sidePanel.setOptions({
            enabled: true
          });
          // keeping it in then block will cause error
          _web_extension["default"].sidePanel.open({
            tabId: tab.id
          }).then(function (e) {
            isSidePanelOpen = true;
          })["catch"](function () {
            isSidePanelOpen = false;
          });
        } else {
          closeSidePanel(tab.id).then(function () {
            isSidePanelOpen = false;
          });
        }
      } else {
        closeSidePanel(tab.id).then(function () {
          isSidePanelOpen = false;
        });
        isUpgradeViewed().then(function (isViewed) {
          if (isViewed) {
            return (0, _tab.showPanelWindow)().then(function (isWindowCreated) {
              if (isWindowCreated) {
                getLogServiceForBg().updateLogFileName();
                getLogServiceForBg().logWithTime('Ui.Vision started');
              }
            });
          } else {
            _web_extension["default"].action.setBadgeText({
              text: ''
            });
            _web_extension["default"].storage.local.set({
              upgrade_not_viewed: ''
            });
            return _web_extension["default"].tabs.create({
              url: _config["default"].urlAfterUpgrade
            });
          }
        });
      }
    }
  });
  _web_extension["default"].tabs.onRemoved.addListener( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(tabId, removeInfo) {
      var state;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _global_state.getState)();
          case 2:
            state = _context5.sent;
            if (!(state.status === C.APP_STATUS.PLAYER && tabId === state.tabIds.toPlay)) {
              _context5.next = 7;
              break;
            }
            if (!state.pendingPlayingTab) {
              _context5.next = 6;
              break;
            }
            return _context5.abrupt("return");
          case 6:
            return _context5.abrupt("return", _web_extension["default"].windows.get(removeInfo.windowId, {
              populate: true
            }).then(function (win) {
              var pActiveTab = !win ? (0, _tab_utils.getCurrentTab)().then(function (tab) {
                if (!tab) return null;
                // Do nothing if window is also closed and Kantu window is focused
                if (tab.id === state.tabIds.panel) return null;
                return tab;
              }) : Promise.resolve(win.tabs.find(function (tab) {
                return tab.active;
              }));
              return pActiveTab.then(function (tab) {
                if (tab && tab.id) {
                  // This is the main purpose for this callback: Update tabIds.toPlay to new active tab
                  (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toPlay'], tab.id));
                }
              });
            }));
          case 7:
            if (tabId === state.tabIds.panel && !state.closingAllWindows) {
              logKantuClosing();
            }
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x5, _x6) {
      return _ref9.apply(this, arguments);
    };
  }());
  _web_extension["default"].tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!tab.active) return;
    isTabActiveAndFocused(tabId).then(function (isFocused) {
      if (!isFocused) return;
      return notifyPanelAboutActiveTab(tabId);
    });
  });

  // it caused issues in chrome:
  // storage.addListener(([storage]) => {
  //   console.log('storage changed:>> ', storage)
  //   if (storage.key === 'config' && storage.newValue.showSidePanel !== storage.oldValue.showSidePanel) {
  //     showSidePanel = storage.newValue.showSidePanel
  //     ;getState().then((state) => {
  //       isSidePanelOpen = state.tabIds.panel === SIDEPANEL_TAB_ID
  //     })
  //   }
  // })

  var getCalculatedShowSidePanelValue = function getCalculatedShowSidePanelValue(config) {
    var value = false;
    if (config) {
      if (config.oneTimeShowSidePanel && [true, false].includes(config.oneTimeShowSidePanel)) {
        value = config.oneTimeShowSidePanel;
      } else {
        value = config.showSidePanel;
      }
    }
    return value;
  };
  if (_web_extension["default"].isFirefox()) {
    _storage["default"].addListener(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 1),
        storage = _ref11[0];
      if (storage.key === 'config') {
        console.log('config changed:>> ', storage);
        if (storage.newValue.oneTimeShowSidePanel !== storage.oldValue.oneTimeShowSidePanel && [true, false].includes(storage.newValue.oneTimeShowSidePanel)) {
          showSidePanel = storage.newValue.oneTimeShowSidePanel;
        } else {
          showSidePanel = storage.newValue.showSidePanel;
          (0, _global_state.getState)().then(function (state) {
            isSidePanelOpen = state.tabIds.panel === _ipc_bg_cs.SIDEPANEL_TAB_ID;
          });
        }
      }
    });
  }

  // these three variables are used for the feature of opening side panel on icon click according to the settings stored in storage->config
  // using async functions to get the active tab id, and the showSidePanel variable from storage config will cause an error.
  // https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re
  var showSidePanel, isSidePanelOpen, keepAliveInterval;

  // keep service worker alive only when side panel is set to open on icon click
  var manageKeepSWAlive = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _storage["default"].get('config').then(function (config) {
              // because we cannot read this storage value between user clicking extension icon and calling Ext.sidePanel.open
              showSidePanel = getCalculatedShowSidePanelValue(config); // config && config.showSidePanel
              if (showSidePanel && !keepAliveInterval) {
                keepAliveInterval = setInterval(function () {
                  _web_extension["default"].runtime.getPlatformInfo();
                }, 25e3);
              } else if (!showSidePanel && keepAliveInterval) {
                clearInterval(keepAliveInterval);
                keepAliveInterval = null;
              }
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function manageKeepSWAlive() {
      return _ref12.apply(this, arguments);
    };
  }();
  _web_extension["default"].windows.onFocusChanged.addListener(function (windowId) {
    manageKeepSWAlive();
    _web_extension["default"].tabs.query({
      windowId: windowId,
      active: true
    }).then(function (tabs) {
      if (tabs.length === 0) return;
      (0, _ipc_cache.getIpcCache)().get(tabs[0].id, 100).then(function (ipc) {
        return ipc.ask('TAB_ACTIVATED', {});
      }, function (e) {
        return 'Comment: ignore this error';
      });
    });
  });
  _web_extension["default"].runtime.onStartup.addListener( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          manageKeepSWAlive();
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));

  // Note: set the activated tab as the one to play
  _web_extension["default"].tabs.onActivated.addListener( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(activeInfo) {
      var _yield$Promise$all, _yield$Promise$all2, state, tab, updateTabIds;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            manageKeepSWAlive();
            _context9.next = 3;
            return Promise.all([(0, _global_state.getState)(), _web_extension["default"].tabs.get(activeInfo.tabId)]);
          case 3:
            _yield$Promise$all = _context9.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            state = _yield$Promise$all2[0];
            tab = _yield$Promise$all2[1];
            (0, _sidepanel.checkIfSidePanelOpen)().then(function (isOpen) {
              isSidePanelOpen = isOpen;
            });
            if (!(activeInfo.tabId === state.tabIds.panel || tab.url.indexOf(_web_extension["default"].runtime.getURL('')) !== -1)) {
              _context9.next = 10;
              break;
            }
            return _context9.abrupt("return");
          case 10:
            _context9.next = 12;
            return (0, _global_state.updateState)(function (state) {
              return _objectSpread(_objectSpread({}, state), {}, {
                tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                  lastActivated: state.tabIds.lastActivated.concat(activeInfo.tabId).filter(function (tabId) {
                    return tabId !== state.tabIds.panel;
                  }).slice(-2)
                })
              });
            });
          case 12:
            (0, _ipc_cache.getIpcCache)().get(activeInfo.tabId, 100).then(function (ipc) {
              return ipc.ask('TAB_ACTIVATED', {});
            }, function (e) {
              return 'Comment: ingore this error';
            });
            notifyPanelAboutActiveTab(activeInfo.tabId);
            _context9.t0 = state.status;
            _context9.next = _context9.t0 === C.APP_STATUS.NORMAL ? 17 : _context9.t0 === C.APP_STATUS.RECORDER ? 22 : 24;
            break;
          case 17:
            if (!(activeInfo.tabId === state.tabIds.panel)) {
              _context9.next = 19;
              break;
            }
            return _context9.abrupt("return");
          case 19:
            updateTabIds = function updateTabIds() {
              _web_extension["default"].tabs.get(activeInfo.tabId).then(function (tab) {
                if (tab.url.indexOf(_web_extension["default"].runtime.getURL('')) !== -1) return;
                if (activeInfo.tabId === state.tabIds.panel) return;
                (0, _log["default"])('in tab activated, set toPlay to ', activeInfo);
                return (0, _global_state.updateState)(function (state) {
                  return _objectSpread(_objectSpread({}, state), {}, {
                    tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                      lastPlay: state.tabIds.toPlay,
                      toPlay: activeInfo.tabId,
                      firstPlay: activeInfo.tabId
                    })
                  });
                });
              });
            }; // Note: In Firefox, without this delay of 100ms, `tab.url` will still be 'about:config'
            // so have to wait for the url to take effect
            if (_web_extension["default"].isFirefox()) {
              setTimeout(updateTabIds, 100);
            } else {
              updateTabIds();
            }
            return _context9.abrupt("break", 24);
          case 22:
            // Note: three things to do when switch tab in recording
            // 1. set the new tab to RECORDING status,
            // 2. and the original one back to NORMAL status
            // 3. commit a `selectWindow` command
            //
            // Have to wait for the new tab establish connection with background
            (0, _ipc_cache.getIpcCache)().get(activeInfo.tabId, 5000)
            // Note: wait for 2 seconds, expecting commands from original page to be committed
            .then(function (ipc) {
              return (0, _utils.delay)(function () {
                return ipc;
              }, 2000);
            }).then(function (ipc) {
              return ipc.ask('SET_STATUS', {
                status: C.CONTENT_SCRIPT_STATUS.RECORDING
              });
            }).then(function () {
              // Note: set the original tab to NORMAL status
              // only if the new tab is set to RECORDING status
              return getRecordTabIpc().then(function (ipc) {
                ipc.ask('SET_STATUS', {
                  status: C.CONTENT_SCRIPT_STATUS.NORMAL
                });
              });
            }).then(function () {
              return (0, _global_state.getState)();
            }).then(function (state) {
              // Note: get window locator & update recording tab
              var oldTabId = state.tabIds.firstRecord;
              var newTabId = activeInfo.tabId;
              return Promise.all([_web_extension["default"].tabs.get(oldTabId), _web_extension["default"].tabs.get(newTabId)]).then( /*#__PURE__*/function () {
                var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref15) {
                  var _ref17, oldTab, newTab, result;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _ref17 = _slicedToArray(_ref15, 2), oldTab = _ref17[0], newTab = _ref17[1];
                        result = []; // update recording tab
                        _context8.next = 4;
                        return (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toRecord'], activeInfo.tabId));
                      case 4:
                        if (oldTab.windowId === newTab.windowId) {
                          result.push("tab=".concat(newTab.index - oldTab.index));
                        }
                        result.push("title=".concat(newTab.title));
                        return _context8.abrupt("return", {
                          target: result[0],
                          targetOptions: result
                        });
                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x8) {
                  return _ref16.apply(this, arguments);
                };
              }());
            }).then(function (data) {
              // Note: commit the `selectWindow` command
              var command = _objectSpread({
                cmd: 'selectWindow'
              }, data);
              return getPanelTabIpc().then(function (panelIpc) {
                return panelIpc.ask('RECORD_ADD_COMMAND', command);
              }).then(function (shouldNotify) {
                if (shouldNotify) {
                  notifyRecordCommand(command);
                }
              });
            })["catch"](function (e) {
              _log["default"].error(e.stack);
            });
            return _context9.abrupt("break", 24);
          case 24:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function (_x7) {
      return _ref14.apply(this, arguments);
    };
  }());
  _web_extension["default"].runtime.onConnect.addListener(function (port) {
    if (port.name === _ipc_bg_cs.SIDEPANEL_PORT_NAME) {
      console.log('side panel connected');
      isSidePanelOpen = true;
      port.onDisconnect.addListener( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              console.log('side panel disconnected');
              isSidePanelOpen = false;
            case 2:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      })));
    }
  });

  // Ext.downloads.onDeterminingFilename.addListener(async(downloadItem, suggest) => {
  //   const downloadId = downloadItem.id; // Store the downloadItem.id in a separate variable
  //   await delay(() => {}, 5000)
  //  console.log("Proposed filename: " + downloadItem);
  //   var downloadItem={filename:downloadItem.filename}

  //   const item = downloadMan.findById(downloadId)
  //   if (!item){
  //     getPanelTabIpc().then(panelIpc => {
  //       panelIpc.ask('DOWNLOAD_COMPLETE', downloadItem) 
  //     })
  //     return
  //   } 

  //   const tmpName   = item.fileName.trim()
  //   const fileName  = tmpName === '' || tmpName === '*' ? null : tmpName

  //   var downloadItem={filename:fileName}

  //   getPanelTabIpc().then(panelIpc => {
  //     panelIpc.ask('DOWNLOAD_COMPLETE', downloadItem) 
  //   })

  //   if (fileName) {
  //     return suggest({
  //       filename: fileName,
  //       conflictAction: 'uniquify'
  //     })
  //   }

  // });

  // Ext.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest) {
  //   console.log("Proposed filename: " + downloadItem);
  //   var downloadItem={filename:downloadItem.filename}

  //   const item = this.findById(downloadItem.id)
  //   if (!item)  return

  //   const tmpName   = item.fileName.trim()
  //   const fileName  = tmpName === '' || tmpName === '*' ? null : tmpName

  //   if (fileName) {
  //     return suggest({
  //       filename: fileName,
  //       conflictAction: 'uniquify'
  //     })
  //   }

  //   getPanelTabIpc().then(panelIpc => {
  //     panelIpc.ask('DOWNLOAD_COMPLETE', downloadItem) 
  //   })
  // });

  _web_extension["default"].downloads.onChanged.addListener(function (e) {
    var downloadDelta = e;
    getPanelTabIpc().then(function (panelIpc) {
      if (typeof downloadDelta.state !== "undefined") {
        if (downloadDelta.state.current === "complete") {
          chrome.downloads.search({
            id: downloadDelta.id
          }, function (downloadItems) {
            if (downloadItems && downloadItems.length > 0) {
              console.log("Downloaded file name111: " + downloadItems[0].filename);
              var downloadItem = {
                filename: downloadItems[0].filename
              };
              panelIpc.ask('DOWNLOAD_COMPLETE', downloadItem);
            }
          });
          _storage["default"].get('config').then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
            var config,
              state,
              _args11 = arguments;
            return _regeneratorRuntime().wrap(function _callee11$(_context11) {
              while (1) switch (_context11.prev = _context11.next) {
                case 0:
                  config = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
                  _context11.next = 3;
                  return (0, _global_state.getState)();
                case 3:
                  state = _context11.sent;
                  if (config.cvScope === "browser" && state.status == "PLAYER") {
                    setTimeout(function () {
                      chrome.downloads.erase({
                        state: "complete"
                      });
                    }, 2000);
                  }
                case 5:
                case "end":
                  return _context11.stop();
              }
            }, _callee11);
          })));
        }
      }
    });
  });
};

// usage:
// 1. set tabId for inspector:  `setInspectorTabId(someTabId)`
// 2. clear tabId for inspector: `setInspectorTabId(null, true)`
var setInspectorTabId = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(tabId, shouldRemove, noNotify) {
    var state, lastInspect;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _global_state.getState)();
        case 2:
          state = _context12.sent;
          lastInspect = state.tabIds.toInspect;
          _context12.next = 6;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                lastInspect: lastInspect,
                toInspect: tabId
              })
            });
          });
        case 6:
          if (!shouldRemove) {
            _context12.next = 12;
            break;
          }
          if (!lastInspect) {
            _context12.next = 11;
            break;
          }
          if (!noNotify) {
            _context12.next = 10;
            break;
          }
          return _context12.abrupt("return", Promise.resolve(true));
        case 10:
          return _context12.abrupt("return", (0, _ipc_cache.getIpcCache)().get(lastInspect).then(function (ipc) {
            return ipc.ask('STOP_INSPECTING');
          })["catch"](function (e) {
            return (0, _log["default"])(e.stack);
          }));
        case 11:
          return _context12.abrupt("return", Promise.resolve(true));
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function setInspectorTabId(_x9, _x10, _x11) {
    return _ref20.apply(this, arguments);
  };
}();
var startSendingTimeoutStatus = function startSendingTimeoutStatus(timeout) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'wait';
  var timer;
  var p = (0, _global_state.getState)().then(function (state) {
    var past = 0;
    if (state.timer) clearInterval(state.timer);
    timer = setInterval(function () {
      past += 1000;
      getPanelTabIpc().then(function (panelIpc) {
        panelIpc.ask('TIMEOUT_STATUS', {
          type: type,
          past: past,
          total: timeout
        });
      });
      if (past >= timeout) {
        clearInterval(timer);
      }
    }, 1000);
    return (0, _global_state.updateState)({
      timer: timer
    });
  });
  return function () {
    return p.then(function () {
      return clearInterval(timer);
    });
  };
};
var pacListener = function pacListener(data) {
  if (data.type === 'PROXY_LOG') {
    (0, _log["default"])('PROXY_LOG', data);
  }
};

// Processor for all message background could receive
// All messages from panel starts with 'PANEL_'
// All messages from content script starts with 'CS_'
var onRequest = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(cmd, args) {
    var _args$sender$tab;
    var state, isSidePanel, panelTabId, ipcTimeout, ipcNoLaterThan, payload, tabId, timeout, menuInfos, list, lastActivatedTabId, dict, fn, pPanelTab, pAllWindows, last, getWindowInfo, isWindowInfoEqual, _tabId, url, _cmd, rect, devicePixelRatio, fileName, _tabId2, _rect, _devicePixelRatio, _tabId3, _tabId4, pullbackTimeout, isFirst, _tabId5, _tabId6, closeTabAndGetNextTabOnWindow, withKantuWindowMinimized, closeAndGetNextTab, runWithTab, oldTablId, _splitIntoTwo, _splitIntoTwo2, type, locator, pGetTabs, offset, _url, p, from;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _global_state.getState)();
        case 2:
          state = _context22.sent;
          if (cmd !== 'CS_ACTIVATE_ME' && cmd !== 'TIMEOUT') {
            (0, _log["default"])('onAsk', cmd, args);
          }
          _context22.t0 = cmd;
          _context22.next = _context22.t0 === 'I_AM_PANEL' ? 7 : _context22.t0 === 'PANEL_CAPTURE_VISIBLE_TAB' ? 19 : _context22.t0 === 'PANEL_SET_PROXY' ? 20 : _context22.t0 === 'PANEL_GET_PROXY' ? 21 : _context22.t0 === 'PANEL_TIME_FOR_BACKUP' ? 22 : _context22.t0 === 'PANEL_LOG' ? 23 : _context22.t0 === 'PANEL_CALL_PLAY_TAB' ? 24 : _context22.t0 === 'PANEL_CS_IPC_READY' ? 26 : _context22.t0 === 'PANEL_HAS_PENDING_DOWNLOAD' ? 28 : _context22.t0 === 'PANEL_WAIT_FOR_ANY_DOWNLOAD' ? 29 : _context22.t0 === 'PANEL_START_RECORDING' ? 30 : _context22.t0 === 'PANEL_STOP_RECORDING' ? 41 : _context22.t0 === 'PANEL_TRY_TO_RECORD_OPEN_COMMAND' ? 48 : _context22.t0 === 'PANEL_START_INSPECTING' ? 51 : _context22.t0 === 'PANEL_STOP_INSPECTING' ? 57 : _context22.t0 === 'PANEL_START_PLAYING' ? 62 : _context22.t0 === 'PANEL_HEART_BEAT' ? 72 : _context22.t0 === 'PANEL_STOP_PLAYING' ? 73 : _context22.t0 === 'PANEL_HIGHLIGHT_DOM' ? 80 : _context22.t0 === 'PANEL_HIGHLIGHT_RECT' ? 81 : _context22.t0 === 'PANEL_HIGHLIGHT_X' ? 82 : _context22.t0 === 'PANEL_HIGHLIGHT_RECTS' ? 83 : _context22.t0 === 'PANEL_HIGHLIGHT_DESKTOP_RECTS' ? 85 : _context22.t0 === 'PANEL_HIGHLIGHT_DESKTOP_X' ? 86 : _context22.t0 === 'PANEL_HIGHLIGHT_OCR_MATCHES' ? 87 : _context22.t0 === 'PANEL_CLEAR_OCR_MATCHES_ON_PLAYING_PAGE' ? 92 : _context22.t0 === 'PANEL_RESIZE_WINDOW' ? 93 : _context22.t0 === 'PANEL_UPDATE_BADGE' ? 96 : _context22.t0 === 'PANEL_NOTIFY_AUTO_PAUSE' ? 101 : _context22.t0 === 'PANEL_NOTIFY_BREAKPOINT' ? 103 : _context22.t0 === 'PANEL_NOTIFY_ECHO' ? 105 : _context22.t0 === 'PANEL_CLOSE_ALL_WINDOWS' ? 107 : _context22.t0 === 'PANEL_CURRENT_PLAY_TAB_INFO' ? 110 : _context22.t0 === 'PANEL_MINIMIZE_ALL_WINDOWS_BUT_PANEL' ? 111 : _context22.t0 === 'PANEL_MINIMIZE_ALL_WINDOWS' ? 114 : _context22.t0 === 'PANEL_BRING_PANEL_TO_FOREGROUND' ? 115 : _context22.t0 === 'PANEL_BRING_PLAYING_WINDOW_TO_FOREGROUND' ? 116 : _context22.t0 === 'PANEL_RESIZE_PLAY_TAB' ? 117 : _context22.t0 === 'PANEL_GET_WINDOW_SIZE_OF_PLAY_TAB' ? 118 : _context22.t0 === 'PANEL_SELECT_AREA_ON_CURRENT_PAGE' ? 119 : _context22.t0 === 'PANEL_CLEAR_VISION_RECTS_ON_PLAYING_PAGE' ? 120 : _context22.t0 === 'PANEL_HIDE_VISION_HIGHLIGHT' ? 121 : _context22.t0 === 'PANEL_SHOW_VISION_HIGHLIGHT' ? 122 : _context22.t0 === 'PANEL_SCREENSHOT_PAGE_INFO' ? 123 : _context22.t0 === 'PANEL_TOGGLE_HIGHLIGHT_VIEWPORT' ? 124 : _context22.t0 === 'PANEL_DISABLE_DOWNLOAD_BAR' ? 125 : _context22.t0 === 'PANEL_ENABLE_DOWNLOAD_BAR' ? 127 : _context22.t0 === 'PANEL_GET_VIEWPORT_RECT_IN_SCREEN' ? 129 : _context22.t0 === 'PANEL_XCLICK_NEED_CALIBRATION' ? 130 : _context22.t0 === 'PANEL_CLOSE_CURRENT_TAB_AND_SWITCH_TO_LAST_PLAYED' ? 134 : _context22.t0 === 'PANEL_OPEN_IN_SIDEPANEL' ? 135 : _context22.t0 === 'CS_LOAD_URL' ? 135 : _context22.t0 === 'CS_STORE_SCREENSHOT_IN_SELECTION' ? 139 : _context22.t0 === 'CS_SCREEN_AREA_SELECTED' ? 142 : _context22.t0 === 'CS_DONE_INSPECTING' ? 146 : _context22.t0 === 'CS_ACTIVATE_ME' ? 153 : _context22.t0 === 'CS_RECORD_ADD_COMMAND' ? 164 : _context22.t0 === 'PANEL_CLOSE_OTHER_TABS' ? 180 : _context22.t0 === 'PANEL_CLOSE_CURRENT_TAB' ? 182 : _context22.t0 === 'PANEL_SELECT_WINDOW' ? 190 : _context22.t0 === 'CS_TIMEOUT_STATUS' ? 210 : _context22.t0 === 'CS_DELETE_ALL_COOKIES' ? 211 : _context22.t0 === 'CS_SET_FILE_INPUT_FILES' ? 213 : _context22.t0 === 'CS_ON_DOWNLOAD' ? 214 : _context22.t0 === 'CS_INVOKE' ? 216 : _context22.t0 === 'CS_IMPORT_AND_INVOKE' ? 217 : _context22.t0 === 'CS_ADD_LOG' ? 219 : _context22.t0 === 'CS_OPEN_PANEL_SETTINGS' ? 220 : _context22.t0 === 'DESKTOP_EDITOR_ADD_VISION_IMAGE' ? 222 : _context22.t0 === 'TIMEOUT' ? 223 : 224;
          break;
        case 7:
          _context22.next = 9;
          return (0, _utils.delay)(function () {}, 500);
        case 9:
          // When panel window is opened, it's always in normal mode,
          // so make sure contextMenus for record mode are removed
          isSidePanel = ((_args$sender$tab = args.sender.tab) === null || _args$sender$tab === void 0 ? void 0 : _args$sender$tab.id) === _ipc_bg_cs.SIDEPANEL_TAB_ID || args.sender.url === "chrome-extension://".concat(_web_extension["default"].runtime.id, "/sidepanel.html") || args.sender.url.match(/moz-extension:\/\/[a-z0-9-]+\/sidepanel.html/);
          panelTabId = isSidePanel ? _ipc_bg_cs.SIDEPANEL_TAB_ID : args.sender.tab.id;
          _context22.next = 13;
          return (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'panel'], panelTabId));
        case 13:
          if (!isSidePanel) {
            (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'lastPanelWindow'], panelTabId));
          }
          (0, _contextMenu.getContextMenuService)().destroyMenus();

          // Note: when the panel first open first, it could be marked as the tab to play
          // That's something we don't want to happen
          if (!(args.sender.tab && args.sender.tab.id && state.tabIds.toPlay === args.sender.tab.id)) {
            _context22.next = 18;
            break;
          }
          _context22.next = 18;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                toPlay: state.tabIds.lastPlay,
                firstPlay: state.tabIds.lastPlay,
                lastActivated: state.tabIds.lastActivated.filter(function (id) {
                  return id !== args.sender.tab.id;
                })
              })
            });
          });
        case 18:
          return _context22.abrupt("return", true);
        case 19:
          return _context22.abrupt("return", _web_extension["default"].tabs.captureVisibleTab(args.windowId, args.options)["catch"](function (e) {
            console.log('captureVisibleTab e:>>', e);
            if (e == "Error: Missing activeTab permission") {
              throw new Error('Error E144: Screenshot permission issue. To fix, please reload extension.' + 'To do so, go to extension settings and turn the blue switch OFF and then ON again.');
            }
            throw e;
          }));
        case 20:
          return _context22.abrupt("return", (0, _proxy.setProxy)(args.proxy).then(function () {
            return true;
          }));
        case 21:
          return _context22.abrupt("return", (0, _proxy.getProxyManager)().getProxy());
        case 22:
          return _context22.abrupt("return", isTimeToBackup().then(function (obj) {
            return obj.timeout;
          }));
        case 23:
          return _context22.abrupt("return", getLogServiceForBg().log(args.log));
        case 24:
          ipcTimeout = args.ipcTimeout, ipcNoLaterThan = args.ipcNoLaterThan, payload = args.payload;
          return _context22.abrupt("return", getPlayTabIpc(ipcTimeout, ipcNoLaterThan).then(function (ipc) {
            return ipc.ask(payload.command, payload.args);
          }));
        case 26:
          tabId = args.tabId, timeout = args.timeout;
          return _context22.abrupt("return", (0, _ipc_cache.getIpcCache)().get(tabId, timeout).then(function () {
            return true;
          }));
        case 28:
          return _context22.abrupt("return", (0, _download_man.getDownloadMan)().hasPendingDownload());
        case 29:
          return _context22.abrupt("return", (0, _download_man.getDownloadMan)().waitForDownloadIfAny().then(function () {
            return true;
          }));
        case 30:
          (0, _log["default"])('Start to record...');
          _context22.next = 33;
          return (0, _global_state.updateState)({
            status: C.APP_STATUS.RECORDER
          });
        case 33:
          setInspectorTabId(null, true);
          toggleRecordingBadge(true);
          menuInfos = [{
            id: 'verifyText',
            title: 'Verify Text',
            contexts: ['page', 'selection']
          }, {
            id: 'verifyTitle',
            title: 'Verify Title',
            contexts: ['page', 'selection']
          }, {
            id: 'assertText',
            title: 'Assert Text',
            contexts: ['page', 'selection']
          }, {
            id: 'assertTitle',
            title: 'Assert Title',
            contexts: ['page', 'selection']
          }].map(function (item) {
            return _objectSpread(_objectSpread({}, item), {}, {
              onclick: function onclick() {
                getRecordTabIpc().then(function (ipc) {
                  return ipc.ask('CONTEXT_MENU_IN_RECORDING', {
                    command: item.id
                  });
                });
              }
            });
          });
          (0, _contextMenu.getContextMenuService)().createMenus(menuInfos);
          list = state.tabIds.lastActivated.filter(function (id) {
            return id !== state.tabIds.panel;
          });
          lastActivatedTabId = list[list.length - 1];
          if (lastActivatedTabId) {
            (0, _tab_utils.activateTab)(lastActivatedTabId, true)["catch"](function (e) {
              _log["default"].warn("Failed to activate current tab: ".concat(e.message));
            });
          }
          return _context22.abrupt("return", true);
        case 41:
          (0, _log["default"])('Stop recording...');
          (0, _contextMenu.getContextMenuService)().destroyMenus();
          getRecordTabIpc().then(function (ipc) {
            ipc.ask('SET_STATUS', {
              status: C.CONTENT_SCRIPT_STATUS.NORMAL
            });
          });
          _context22.next = 46;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              status: C.APP_STATUS.NORMAL,
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                toRecord: null,
                firstRecord: null,
                lastRecord: state.tabIds.toRecord
              })
            });
          });
        case 46:
          toggleRecordingBadge(false);
          return _context22.abrupt("return", true);
        case 48:
          if (!(state.status !== C.APP_STATUS.RECORDER)) {
            _context22.next = 50;
            break;
          }
          throw new Error('E215: Not in recorder mode');
        case 50:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then( /*#__PURE__*/function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(tab) {
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    (0, _log["default"])('PANEL_TRY_TO_RECORD_OPEN_COMMAND', tab);
                    if (/^(https?:|file:)/.test(tab.url)) {
                      _context13.next = 3;
                      break;
                    }
                    throw new Error('E216: Not a valid url to record as open command');
                  case 3:
                    _context13.next = 5;
                    return (0, _global_state.updateState)(function (state) {
                      return _objectSpread(_objectSpread({}, state), {}, {
                        tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                          toRecord: tab.id,
                          firstRecord: tab.id
                        })
                      });
                    });
                  case 5:
                    getPanelTabIpc().then(function (panelIpc) {
                      var command = {
                        cmd: 'open',
                        target: tab.url
                      };
                      panelIpc.ask('RECORD_ADD_COMMAND', command);
                      notifyRecordCommand(command);
                    });
                    return _context13.abrupt("return", true);
                  case 7:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            return function (_x14) {
              return _ref22.apply(this, arguments);
            };
          }()));
        case 51:
          (0, _log["default"])('start to inspect...');
          toggleInspectingBadge(true);
          if (state.tabIds.toPlay) {
            (0, _tab_utils.activateTab)(state.tabIds.toPlay, true);
          }
          _context22.next = 56;
          return (0, _global_state.updateState)({
            status: C.APP_STATUS.INSPECTOR
          });
        case 56:
          return _context22.abrupt("return", true);
        case 57:
          (0, _log["default"])('start to inspect...');
          _context22.next = 60;
          return (0, _global_state.updateState)({
            status: C.APP_STATUS.NORMAL
          });
        case 60:
          toggleInspectingBadge(false);
          return _context22.abrupt("return", setInspectorTabId(null, true));
        case 62:
          (0, _log["default"])('start to play...');
          _context22.next = 65;
          return (0, _global_state.updateState)({
            status: C.APP_STATUS.PLAYER,
            pendingPlayingTab: false,
            xClickNeedCalibrationInfo: null
          });
        case 65:
          _storage["default"].get('config').then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
            var config,
              state,
              _args14 = arguments;
            return _regeneratorRuntime().wrap(function _callee14$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  config = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : {};
                  _context14.next = 3;
                  return (0, _global_state.getState)();
                case 3:
                  state = _context14.sent;
                  if (config.cvScope === "browser" && state.status == "PLAYER") {
                    setTimeout(function () {
                      chrome.downloads.erase({
                        state: "complete"
                      });
                    }, 2000);
                  }
                case 5:
                case "end":
                  return _context14.stop();
              }
            }, _callee14);
          })));
          setInspectorTabId(null, true);
          togglePlayingBadge(true);
          // Note: reset download manager to clear any previous downloads
          (0, _download_man.getDownloadMan)().reset();
          // Re-check log service to see if xfile is ready to write log
          getLogServiceForBg().check();
          if (state.timer) clearInterval(state.timer);
          return _context22.abrupt("return", true);
        case 72:
          return _context22.abrupt("return", (0, _global_state.getState)('heartBeatSecret').then(function () {
            var secret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return secret;
          }));
        case 73:
          _context22.next = 75;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              status: C.APP_STATUS.NORMAL,
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                // Note: reset firstPlay to current toPlay when stopped playing
                // userful for playing loop (reset firstPlay after each loop)
                firstPlay: state.tabIds.toPlay,
                // reset lastPlay here is useful for ContinueInLastUsedTab
                lastPlay: state.tabIds.toPlay
              })
            });
          });
        case 75:
          // Note: let cs know that it should exit playing mode
          (0, _ipc_cache.getIpcCache)().get(state.tabIds.toPlay).then(function (ipc) {
            return ipc.ask('SET_STATUS', {
              status: C.CONTENT_SCRIPT_STATUS.NORMAL
            }, C.CS_IPC_TIMEOUT);
          });
          togglePlayingBadge(false);

          // Note: reset download manager to clear any previous downloads
          (0, _download_man.getDownloadMan)().reset();
          if (state.timer) clearInterval(state.timer);
          return _context22.abrupt("return", true);
        case 80:
          return _context22.abrupt("return", Promise.all([getRecordTabIpc().then(function (ipc) {
            return {
              ipc: ipc,
              type: 'record'
            };
          })["catch"](function () {
            return null;
          }), getPlayTabIpc().then(function (ipc) {
            return {
              ipc: ipc,
              type: 'play'
            };
          })["catch"](function () {
            return null;
          })]).then(function (tuple) {
            if (!tuple[0] && !tuple[1]) {
              throw new Error('E218: No where to look for the dom');
            }
            return tuple.filter(function (x) {
              return !!x;
            });
          }).then(function (list) {
            return Promise.all(list.map(function (_ref24) {
              var ipc = _ref24.ipc,
                type = _ref24.type;
              return ipc.ask('FIND_DOM', {
                locator: args.locator
              }).then(function (result) {
                return {
                  result: result,
                  type: type,
                  ipc: ipc
                };
              });
            }));
          }).then( /*#__PURE__*/function () {
            var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(list) {
              var foundedList, item, state, tabId;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    foundedList = list.filter(function (x) {
                      return x.result;
                    });
                    if (!(foundedList.length === 0)) {
                      _context15.next = 3;
                      break;
                    }
                    throw new Error('E219: DOM not found');
                  case 3:
                    item = foundedList.length === 2 ? foundedList.find(function (item) {
                      return item.type === args.lastOperation;
                    }) : foundedList[0];
                    _context15.next = 6;
                    return (0, _global_state.getState)();
                  case 6:
                    state = _context15.sent;
                    tabId = state.tabIds[item.type === 'record' ? 'lastRecord' : 'toPlay'];
                    return _context15.abrupt("return", (0, _tab_utils.activateTab)(tabId, true).then(function () {
                      return item.ipc.ask('HIGHLIGHT_DOM', {
                        locator: args.locator,
                        cmd: args.cmd
                      });
                    }));
                  case 9:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }));
            return function (_x15) {
              return _ref25.apply(this, arguments);
            };
          }()));
        case 81:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('HIGHLIGHT_RECT', args, C.CS_IPC_TIMEOUT);
          }));
        case 82:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('HIGHLIGHT_X', args, C.CS_IPC_TIMEOUT);
          }));
        case 83:
          console.log('PANEL_HIGHLIGHT_RECTS:>>', args);
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('HIGHLIGHT_RECTS', args, C.CS_IPC_TIMEOUT);
          }));
        case 85:
          return _context22.abrupt("return", (0, _service.runInDesktopScreenshotEditor)(args.screenAvailableSize, {
            type: _types.DesktopScreenshot.RequestType.DisplayVisualResult,
            data: {
              rects: args.scoredRects,
              image: args.imageInfo
            }
          }));
        case 86:
          return _context22.abrupt("return", (0, _service.runInDesktopScreenshotEditor)(args.screenAvailableSize, {
            type: _types.DesktopScreenshot.RequestType.DisplayVisualX,
            data: {
              rects: [_objectSpread({}, args.coordinates)],
              image: args.imageInfo
            }
          }));
        case 87:
          if (!args.isDesktop) {
            _context22.next = 91;
            break;
          }
          return _context22.abrupt("return", getCurrentStorageManager().then(function (storageManager) {
            var source = storageManager.getCurrentStrategyType() === _storage2.StorageStrategyType.XFile ? _types.DesktopScreenshot.ImageSource.HardDrive : _types.DesktopScreenshot.ImageSource.Storage;
            return (0, _service.runInDesktopScreenshotEditor)(args.screenAvailableSize, {
              type: _types.DesktopScreenshot.RequestType.DisplayOcrResult,
              data: {
                ocrMatches: args.ocrMatches,
                image: {
                  source: source,
                  path: (0, _utils.ensureExtName)('.png', C.LAST_DESKTOP_SCREENSHOT_FILE_NAME)
                }
              }
            });
          }));
        case 91:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('HIGHLIGHT_OCR_MATCHES', args, C.CS_IPC_TIMEOUT);
          }));
        case 92:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return Promise.all([ipc.ask('CLEAR_VISION_RECTS', {}, C.CS_IPC_TIMEOUT), ipc.ask('CLEAR_OCR_MATCHES', {}, C.CS_IPC_TIMEOUT)]);
          }));
        case 93:
          if (state.tabIds.panel) {
            _context22.next = 95;
            break;
          }
          throw new Error('E220: Panel not available');
        case 95:
          return _context22.abrupt("return", _web_extension["default"].tabs.get(state.tabIds.panel).then(function (tab) {
            return _web_extension["default"].windows.update(tab.windowId, (0, _utils.pick)(['width', 'height'], _objectSpread(_objectSpread({}, args.size), {}, {
              width: args.size.width,
              height: args.size.height
            })));
          }));
        case 96:
          dict = {
            play: togglePlayingBadge,
            record: toggleRecordingBadge,
            inspect: toggleInspectingBadge
          };
          fn = dict[args.type];
          if (fn) {
            _context22.next = 100;
            break;
          }
          throw new Error("E221: unknown type for updating badge, '".concat(args.type, "'"));
        case 100:
          return _context22.abrupt("return", fn(!args.clear, args));
        case 101:
          notifyAutoPause();
          return _context22.abrupt("return", true);
        case 103:
          notifyBreakpoint();
          return _context22.abrupt("return", true);
        case 105:
          notifyEcho(args.text);
          return _context22.abrupt("return", true);
        case 107:
          _context22.next = 109;
          return (0, _global_state.updateState)({
            closingAllWindows: true
          });
        case 109:
          return _context22.abrupt("return", logKantuClosing()["catch"](function (e) {
            _log["default"].warn('E222: Error in log => RPA closing: ', e.message);
          }).then(function () {
            closeAllWindows();
            return true;
          }));
        case 110:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (tab) {
            return {
              url: tab.url,
              title: tab.title
            };
          }));
        case 111:
          pPanelTab = !state.tabIds.panel ? Promise.resolve() : _web_extension["default"].tabs.get(state.tabIds.panel);
          pAllWindows = _web_extension["default"].windows.getAll();
          return _context22.abrupt("return", Promise.all([pPanelTab, pAllWindows]).then(function (_ref26) {
            var _ref27 = _slicedToArray(_ref26, 2),
              tab = _ref27[0],
              wins = _ref27[1];
            var list = !tab ? wins : wins.filter(function (win) {
              return win.id !== tab.windowId;
            });
            return Promise.all(list.map(function (win) {
              return _web_extension["default"].windows.update(win.id, {
                state: 'minimized'
              });
            }));
          }).then(function () {
            return (0, _utils.delay)(function () {
              return true;
            }, 500);
          }));
        case 114:
          return _context22.abrupt("return", _web_extension["default"].windows.getAll().then(function (wins) {
            return Promise.all(wins.map(function (win) {
              return _web_extension["default"].windows.update(win.id, {
                state: 'minimized'
              });
            })).then(function () {
              return (0, _utils.delay)(function () {
                return true;
              }, 500);
            });
          }));
        case 115:
          return _context22.abrupt("return", (0, _tab.showPanelWindow)().then(function () {
            return true;
          }));
        case 116:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (tab) {
            return (0, _tab_utils.activateTab)(tab.id, true);
          })["catch"](function (e) {
            return (0, _tab.showPanelWindow)();
          }).then(function () {
            return true;
          }));
        case 117:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (tab) {
            return (0, _resize_window.resizeViewportOfTab)(tab.id, args.viewportSize, args.screenAvailableRect);
          }));
        case 118:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (tab) {
            console.log('PANEL_GET_WINDOW_SIZE_OF_PLAY_TAB tab:>> ', tab);
            return (0, _resize_window.getWindowSize)(tab.windowId);
          }));
        case 119:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            (0, _tab_utils.activateTab)(state.tabIds.toPlay, true);
            return ipc.ask('SELECT_SCREEN_AREA');
          })["catch"](function (e) {
            _log["default"].error(e.stack);
            throw new Error('E205: Not able to take screenshot on the current tab');
          }));
        case 120:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return Promise.all([ipc.ask('CLEAR_VISION_RECTS', {}, C.CS_IPC_TIMEOUT), ipc.ask('CLEAR_OCR_MATCHES', {}, C.CS_IPC_TIMEOUT)]);
          }));
        case 121:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('HIDE_VISION_RECTS', {}, C.CS_IPC_TIMEOUT);
          }));
        case 122:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('SHOW_VISION_RECTS', {}, C.CS_IPC_TIMEOUT);
          }));
        case 123:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('SCREENSHOT_PAGE_INFO', {}, C.CS_IPC_TIMEOUT);
          }));
        case 124:
          return _context22.abrupt("return", getPlayTabIpc().then(function (ipc) {
            return ipc.ask('TOGGLE_HIGHLIGHT_VIEWPORT', args, C.CS_IPC_TIMEOUT);
          }));
        case 125:
          // Ext.downloads.setShelfEnabled(false)
          _web_extension["default"].downloads.setUiOptions({
            enabled: false
          });
          return _context22.abrupt("return", (0, _utils.delay)(function () {
            return true;
          }, 1000));
        case 127:
          // Ext.downloads.setShelfEnabled(true)
          _web_extension["default"].downloads.setUiOptions({
            enabled: true
          });
          return _context22.abrupt("return", (0, _utils.delay)(function () {
            return true;
          }, 1000));
        case 129:
          return _context22.abrupt("return", Promise.all([getPlayTabIpc(), (0, _tab.getPlayTab)().then(function (tab) {
            return _web_extension["default"].tabs.getZoom(tab.id);
          })]).then(function (_ref28) {
            var _ref29 = _slicedToArray(_ref28, 2),
              ipc = _ref29[0],
              zoom = _ref29[1];
            return getPlayTabIpc().then(function (ipc) {
              return ipc.ask('GET_VIEWPORT_RECT_IN_SCREEN', {
                zoom: zoom
              });
            });
          }));
        case 130:
          last = state.xClickNeedCalibrationInfo;
          getWindowInfo = function getWindowInfo(win, tabId) {
            return {
              id: win.id,
              top: win.top,
              left: win.left,
              width: win.width,
              height: win.height,
              activeTabId: tabId
            };
          };
          isWindowInfoEqual = function isWindowInfoEqual(a, b) {
            return _utils.and.apply(void 0, _toConsumableArray('id, top, left, width, height, activeTabId'.split(/,\s*/g).map(function (key) {
              return a[key] === b[key];
            })));
          }; // Note: we take every request as it will do calibration
          // and next request should get `false` (no need for more calibration, unless there are window change or window resize)
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (tab) {
            if (!tab) throw new Error('E206: no play tab found for calibration');
            return _web_extension["default"].windows.get(tab.windowId).then( /*#__PURE__*/function () {
              var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(win) {
                var winInfo;
                return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      winInfo = getWindowInfo(win, tab.id);
                      (0, _log["default"])('CALIBRATION NEED???', last, winInfo);

                      // Note: cache last value
                      _context16.next = 4;
                      return (0, _global_state.updateState)({
                        xClickNeedCalibrationInfo: winInfo
                      });
                    case 4:
                      return _context16.abrupt("return", !isWindowInfoEqual(winInfo, last || {}));
                    case 5:
                    case "end":
                      return _context16.stop();
                  }
                }, _callee16);
              }));
              return function (_x16) {
                return _ref30.apply(this, arguments);
              };
            }());
          }));
        case 134:
          return _context22.abrupt("return", (0, _tab.getPlayTab)().then(function (currentTab) {
            return _web_extension["default"].windows.get(currentTab.windowId, {
              populate: true
            }).then( /*#__PURE__*/function () {
              var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(win) {
                var index, prevIndex, prevTab, state, pNextTab;
                return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                  while (1) switch (_context17.prev = _context17.next) {
                    case 0:
                      if (!(win.tabs.length < 2)) {
                        _context17.next = 2;
                        break;
                      }
                      return _context17.abrupt("return", true);
                    case 2:
                      index = win.tabs.findIndex(function (tab) {
                        return tab.id === currentTab.id;
                      });
                      prevIndex = (index - 1 + win.tabs.length) % win.tabs.length;
                      prevTab = win.tabs[prevIndex];
                      _context17.next = 7;
                      return (0, _global_state.getState)();
                    case 7:
                      state = _context17.sent;
                      pNextTab = function () {
                        if (state.tabIds.lastPlay) {
                          return _web_extension["default"].tabs.get(state.tabIds.lastPlay)["catch"](function () {
                            return prevTab;
                          });
                        } else {
                          return Promise.resolve(prevTab);
                        }
                      }();
                      if (!(currentTab.id == state.tabIds.lastPlay)) {
                        _context17.next = 13;
                        break;
                      }
                      return _context17.abrupt("return", _web_extension["default"].tabs.get(currentTab.id).then(function () {
                        return pNextTab;
                      }).then(function (nextTab) {
                        return (0, _tab_utils.activateTab)(nextTab.id);
                      }).then(function () {
                        return (0, _utils.delay)(function () {}, 500);
                      }).then(function () {
                        return true;
                      }));
                    case 13:
                      return _context17.abrupt("return", _web_extension["default"].tabs.remove(currentTab.id).then(function () {
                        return pNextTab;
                      }).then(function (nextTab) {
                        return (0, _tab_utils.activateTab)(nextTab.id);
                      })
                      // Note: add this delay to avoid Error #101
                      // looks like when the pc is quick enough, there are chances
                      // that next macro run fails to find the tab for replay
                      .then(function () {
                        return (0, _utils.delay)(function () {}, 500);
                      }).then(function () {
                        return true;
                      }));
                    case 14:
                    case "end":
                      return _context17.stop();
                  }
                }, _callee17);
              }));
              return function (_x17) {
                return _ref31.apply(this, arguments);
              };
            }());
          }));
        case 135:
          _tabId = args.sender.tab.id;
          url = args.url;
          _cmd = args.cmd;
          return _context22.abrupt("return", (0, _tab_utils.getTab)(_tabId).then(function (tab) {
            var finalUrl = function () {
              try {
                var u = new URL(url, tab.url);
                return u.toString();
              } catch (e) {
                return url;
              }
            }();
            return (0, _tab_utils.updateUrlForTab)(_tabId, finalUrl, _cmd).then(function () {
              return true;
            });
          }));
        case 139:
          rect = args.rect, devicePixelRatio = args.devicePixelRatio, fileName = args.fileName;
          _tabId2 = args.sender.tab.id;
          return _context22.abrupt("return", getPanelTabIpc().then(function (ipc) {
            return ipc.ask('STORE_SCREENSHOT_IN_SELECTION', {
              rect: rect,
              tabId: _tabId2,
              fileName: fileName,
              devicePixelRatio: devicePixelRatio
            });
          }));
        case 142:
          _rect = args.rect, _devicePixelRatio = args.devicePixelRatio;
          _tabId3 = args.sender.tab.id;
          (0, _log["default"])('CS_SCREEN_AREA_SELECTED', _rect, _devicePixelRatio, _tabId3);
          return _context22.abrupt("return", getPanelTabIpc().then(function (ipc) {
            return ipc.ask('SCREEN_AREA_SELECTED', {
              rect: _rect,
              tabId: _tabId3,
              devicePixelRatio: _devicePixelRatio
            }).then(function (data) {
              return (0, _tab.withPanelIpc)().then(function () {
                return data;
              });
            });
          }));
        case 146:
          (0, _log["default"])('done inspecting...');
          _context22.next = 149;
          return (0, _global_state.updateState)({
            status: C.APP_STATUS.NORMAL
          });
        case 149:
          toggleInspectingBadge(false);
          setInspectorTabId(null, true, true);
          (0, _tab_utils.activateTab)(state.tabIds.panel, true);
          return _context22.abrupt("return", getPanelTabIpc().then(function (panelIpc) {
            return panelIpc.ask('INSPECT_RESULT', args);
          }));
        case 153:
          _context22.t1 = state.status;
          _context22.next = _context22.t1 === C.APP_STATUS.INSPECTOR ? 156 : 163;
          break;
        case 156:
          if (state.tabIds.toInspect) {
            _context22.next = 162;
            break;
          }
          _tabId4 = args.sender.tab.id;
          _context22.next = 160;
          return (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toInspect'], _tabId4));
        case 160:
          setTimeout(function () {
            (0, _ipc_cache.getIpcCache)().get(_tabId4).then(function (ipc) {
              return ipc.ask('SET_STATUS', {
                status: C.CONTENT_SCRIPT_STATUS.INSPECTING
              });
            });
          }, 0);
          return _context22.abrupt("return", true);
        case 162:
          return _context22.abrupt("break", 163);
        case 163:
          return _context22.abrupt("return", false);
        case 164:
          pullbackTimeout = 1000;
          isFirst = false;
          if (!(state.status !== C.APP_STATUS.RECORDER)) {
            _context22.next = 168;
            break;
          }
          return _context22.abrupt("return", false);
        case 168:
          if (state.tabIds.toRecord) {
            _context22.next = 172;
            break;
          }
          isFirst = true;
          _context22.next = 172;
          return (0, _global_state.updateState)(function (state) {
            return _objectSpread(_objectSpread({}, state), {}, {
              tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                toRecord: args.sender.tab.id,
                firstRecord: args.sender.tab.id
              })
            });
          });
        case 172:
          if (!(state.tabIds.toRecord !== args.sender.tab.id)) {
            _context22.next = 174;
            break;
          }
          return _context22.abrupt("return", false);
        case 174:
          if (!(args.cmd === 'pullback')) {
            _context22.next = 178;
            break;
          }
          (0, _global_state.updateState)({
            pullback: true
          });
          setTimeout(function () {
            return (0, _global_state.updateState)({
              pullback: false
            });
          }, pullbackTimeout * 2);
          return _context22.abrupt("return", false);
        case 178:
          setTimeout(function () {
            (0, _ipc_cache.getIpcCache)().get(state.tabIds.toRecord).then(function (ipc) {
              return ipc.ask('SET_STATUS', {
                status: C.CONTENT_SCRIPT_STATUS.RECORDING
              });
            });
          }, 0);
          return _context22.abrupt("return", (0, _utils.delay)(function () {}, pullbackTimeout).then(function () {
            return getPanelTabIpc();
          }).then( /*#__PURE__*/function () {
            var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(panelIpc) {
              var state;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    if (isFirst) {
                      panelIpc.ask('RECORD_ADD_COMMAND', {
                        cmd: 'open',
                        target: args.url
                      });
                    }

                    // Note: remove AndWait from commands if we got a pullback
                    _context18.next = 3;
                    return (0, _global_state.getState)();
                  case 3:
                    state = _context18.sent;
                    if (!state.pullback) {
                      _context18.next = 8;
                      break;
                    }
                    args.cmd = args.cmd.replace('AndWait', '');
                    _context18.next = 8;
                    return (0, _global_state.updateState)({
                      pullback: false
                    });
                  case 8:
                    return _context18.abrupt("return", panelIpc.ask('RECORD_ADD_COMMAND', args));
                  case 9:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18);
            }));
            return function (_x18) {
              return _ref32.apply(this, arguments);
            };
          }()).then(function () {
            return Promise.all([_storage["default"].get('config'), (0, _global_state.getState)()]);
          }).then(function (_ref33) {
            var _ref34 = _slicedToArray(_ref33, 2),
              config = _ref34[0],
              state = _ref34[1];
            if (config.recordNotification && state.status === C.APP_STATUS.RECORDER) {
              notifyRecordCommand(args);
            }
          }).then(function () {
            return true;
          }));
        case 180:
          _tabId5 = state.tabIds.toPlay;
          return _context22.abrupt("return", _web_extension["default"].tabs.get(_tabId5).then(function (tab) {
            return _web_extension["default"].tabs.query({
              windowId: tab.windowId
            }).then(function (tabs) {
              return tabs.filter(function (t) {
                return t.id !== _tabId5;
              });
            }).then(function (tabs) {
              return _web_extension["default"].tabs.remove(tabs.map(function (t) {
                return t.id;
              }));
            });
          }).then(function () {
            return true;
          }));
        case 182:
          _tabId6 = state.tabIds.toPlay; // Note: must disable heart beat check here, since the heart beat of current tab is destined to be lost
          // The following two states are dedicated to this close tab task
          _context22.next = 185;
          return (0, _global_state.updateState)({
            disableHeartBeat: true,
            pendingPlayingTab: true
          });
        case 185:
          closeTabAndGetNextTabOnWindow = function closeTabAndGetNextTabOnWindow(winId) {
            return _web_extension["default"].tabs.remove(_tabId6).then(function () {
              return (0, _utils.delay)(function () {
                return (0, _tab_utils.getCurrentTab)(winId);
              }, 1000);
            });
          };
          withKantuWindowMinimized = function withKantuWindowMinimized(fn) {
            var getPanelWinId = function getPanelWinId() {
              return _web_extension["default"].tabs.get(state.tabIds.panel).then(function (tab) {
                return tab.windowId;
              });
            };
            var minimize = function minimize() {
              return getPanelWinId().then(function (winId) {
                return _web_extension["default"].windows.update(winId, {
                  state: 'minimized'
                });
              });
            };
            var restore = function restore() {
              return getPanelWinId().then(function (winId) {
                return _web_extension["default"].windows.update(winId, {
                  state: 'normal'
                });
              });
            };
            return minimize().then(function () {
              return (0, _utils.delay)(function () {}, 1000);
            }).then(fn).then(function (data) {
              restore();
              return data;
            }, function (e) {
              restore();
              throw e;
            });
          };
          closeAndGetNextTab = function closeAndGetNextTab() {
            return _web_extension["default"].tabs.get(_tabId6).then(function (tab) {
              // Note: If the current tab is the only tab in its window, we won't know which one is the next focused window,
              // if Kantu window happens to be on the top. In this case, we need to focus on the tab
              // that is going to be closed first
              return _web_extension["default"].windows.get(tab.windowId, {
                populate: true
              }).then(function (win) {
                if (win.tabs.length !== 1) {
                  return closeTabAndGetNextTabOnWindow(tab.windowId);
                }

                // If Kantu window is now on top, try to pick the next one (by minimize Kantu window)
                // Otherwise pick the current tab will be fine
                return (0, _tab_utils.getCurrentTab)().then(function (tab) {
                  if (tab && tab.id !== state.tabIds.panel) {
                    return closeTabAndGetNextTabOnWindow().then(function (tab) {
                      if (tab && tab.id === state.tabIds.panel) {
                        return withKantuWindowMinimized(_tab_utils.getCurrentTab);
                      }
                      return tab;
                    });
                  }
                  return withKantuWindowMinimized(closeTabAndGetNextTabOnWindow);
                });
              });
            })["catch"](function (e) {
              _log["default"].error(e);
            });
          };
          runWithTab = function runWithTab(pTab) {
            return pTab.then(function (tab) {
              (0, _log["default"])('getCurrentTab - ', tab);
              var isValidTab = !!tab && !!tab.id;
              var isPanelTab = isValidTab && tab.id === state.tabIds.panel;
              return (0, _global_state.updateState)((0, _utils.setIn)(['tabIds', 'toPlay'], isValidTab && !isPanelTab ? tab.id : null));
            })["catch"](function () {}).then(function () {
              // Note: should always reset pendingPlayingTab, no matter there is an error or not
              (0, _log["default"])('resetting pendingPlayingTab');
              return (0, _global_state.updateState)({
                pendingPlayingTab: false
              });
            });
          };
          return _context22.abrupt("return", runWithTab(closeAndGetNextTab()).then(function () {
            return true;
          }));
        case 190:
          oldTablId = state.tabIds.toPlay;
          _splitIntoTwo = (0, _utils.splitIntoTwo)('=', args.target), _splitIntoTwo2 = _slicedToArray(_splitIntoTwo, 2), type = _splitIntoTwo2[0], locator = _splitIntoTwo2[1];
          if (locator) {
            _context22.next = 194;
            break;
          }
          throw new Error("E207: invalid window locator, '".concat(args.target, "'"));
        case 194:
          _context22.t2 = type.toLowerCase();
          _context22.next = _context22.t2 === 'title' ? 197 : _context22.t2 === 'tab' ? 199 : 208;
          break;
        case 197:
          pGetTabs = _web_extension["default"].tabs.query({
            title: locator
          });
          return _context22.abrupt("break", 209);
        case 199:
          if (!/^\s*open\s*$/i.test(locator)) {
            _context22.next = 203;
            break;
          }
          pGetTabs = _web_extension["default"].tabs.get(state.tabIds.toPlay).then(function (tab) {
            return _web_extension["default"].tabs.create({
              url: args.value,
              windowId: tab.windowId
            });
          }).then(function (tab) {
            return [tab];
          });
          _context22.next = 207;
          break;
        case 203:
          offset = parseInt(locator, 10);
          if (!isNaN(offset)) {
            _context22.next = 206;
            break;
          }
          throw new Error("E208: Invalid tab offset, '".concat(locator, "'"));
        case 206:
          pGetTabs = _web_extension["default"].tabs.get(state.tabIds.firstPlay).then(function (tab) {
            return _web_extension["default"].tabs.query({
              windowId: tab.windowId,
              index: tab.index + offset
            });
          });
        case 207:
          return _context22.abrupt("break", 209);
        case 208:
          throw new Error("E209: window locator type '".concat(type, "' not supported"));
        case 209:
          return _context22.abrupt("return", pGetTabs.then(function (tabs) {
            if (tabs.length === 0) {
              throw new Error("E210: failed to find the tab with locator '".concat(args.target, "'"));
            }
            return tabs[0];
          }).then(function (tab) {
            (0, _log["default"])('selectWindow, got tab', tab);
            return (0, _ipc_cache.getIpcCache)().domReadyGet(tab.id, 30000)["catch"](function (e) {
              // args.target = 'tab=open' is a valid value, so this is commented out.
              // if (/tab=\s*open\s*/i.test(args.target)) {
              //   throw new Error('E211: To open a new tab, a valid URL is needed')
              // }
              throw new Error("E225: DOM failed to be ready in 30sec.");
            }).then(function (ipc) {
              (0, _log["default"])('selectWindow, got ipc', ipc);
              var domReadyTimeout = 20000;
              return ipc.ask('DOM_READY', {}, domReadyTimeout)["catch"](function (e) {
                _log["default"].error(e);
                // most likely, ipc is not running properly in this tab     
                throw new Error("E226: DOM failed to be ready in ".concat(domReadyTimeout, " ms'"));
              }).then(function () {
                ipc.ask('SET_STATUS', {
                  status: C.CONTENT_SCRIPT_STATUS.PLAYING
                });
                return true;
              });
            })["catch"](function (e) {
              console.error("DOM_READY Error ==:>> ", e);
              throw e;
            }).then(function () {
              // Note: set the original tab to NORMAL status
              // only if the new tab is set to PLAYING status
              (0, _log["default"])('selectWindow, set orignial to normal');
              (0, _ipc_cache.getIpcCache)().get(oldTablId).then(function (ipc) {
                return ipc.ask('SET_STATUS', {
                  status: C.CONTENT_SCRIPT_STATUS.NORMAL
                });
              });
            }).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    _context19.next = 2;
                    return (0, _global_state.updateState)(function (state) {
                      return _objectSpread(_objectSpread({}, state), {}, {
                        tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                          lastPlay: state.tabIds.toPlay,
                          toPlay: tab.id
                        })
                      });
                    });
                  case 2:
                    return _context19.abrupt("return", (0, _tab_utils.activateTab)(tab.id));
                  case 3:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19);
            })));
          })["catch"](function (e) {
            if (e.message.includes('DOM failed to be ready in')) {
              throw e;
            }
            //new Error(`failed to find the tab with locator '${args.target}'`)
            /*IN case when index 0 tab not found*/
            return Promise.all([_web_extension["default"].windows.getCurrent()]).then(function (window) {
              return _web_extension["default"].tabs.query({
                active: true,
                windowId: window.id
              }).then( /*#__PURE__*/function () {
                var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(tabs) {
                  var ctab, offset, wt, tab;
                  return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                    while (1) switch (_context20.prev = _context20.next) {
                      case 0:
                        if (!(!tabs || !tabs.length)) {
                          _context20.next = 2;
                          break;
                        }
                        return _context20.abrupt("return", false);
                      case 2:
                        (0, _log["default"])('in initPlayTab, set toPlay to', tabs[0]);
                        ctab = tabs.filter(function (r) {
                          return r.active === true && r.url.indexOf('chrome-extension://') == -1;
                        });
                        offset = parseInt(locator, 10);
                        _context20.next = 7;
                        return checkTaIsPresent(ctab[0].index + offset, tabs[0].windowId);
                      case 7:
                        wt = _context20.sent;
                        tab = wt == "" ? ctab[0] : wt;
                        if (!(tab.index == 0 && offset == 0 || wt != "")) {
                          _context20.next = 15;
                          break;
                        }
                        _context20.next = 12;
                        return (0, _global_state.updateState)(function (state) {
                          return _objectSpread(_objectSpread({}, state), {}, {
                            tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                              lastPlay: state.tabIds.toPlay,
                              toPlay: tab.id,
                              firstPlay: ctab[0].id
                            })
                          });
                        });
                      case 12:
                        return _context20.abrupt("return", (0, _tab_utils.activateTab)(tab.id));
                      case 15:
                        throw new Error("E212: failed to find the tab with locator '".concat(args.target, "'"));
                      case 16:
                      case "end":
                        return _context20.stop();
                    }
                  }, _callee20);
                }));
                return function (_x19) {
                  return _ref36.apply(this, arguments);
                };
              }());
            });
            //throw new Error(`failed to find the tab with locator '${args.target}'`)
          }));
        case 210:
          return _context22.abrupt("return", getPanelTabIpc().then(function (ipc) {
            return ipc.ask('TIMEOUT_STATUS', args);
          }));
        case 211:
          _url = args.url;
          return _context22.abrupt("return", _web_extension["default"].cookies.getAll({
            url: _url
          }).then(function (cookies) {
            var ps = cookies.map(function (c) {
              return _web_extension["default"].cookies.remove({
                url: "".concat(_url).concat(c.path),
                name: c.name
              });
            });
            return Promise.all(ps);
          }));
        case 213:
          return _context22.abrupt("return", chrome.extension.isAllowedFileSchemeAccess().then(function (isAllowed) {
            if (!isAllowed) {
              throw new Error('E510: Please allow access to file urls');
            }
          })["catch"](function (e) {
            throw e;
          }).then(function () {
            return (0, _debugger.setFileInputFiles)({
              tabId: args.sender.tab.id,
              selector: args.selector,
              files: args.files
            });
          }));
        case 214:
          p = (0, _download_man.getDownloadMan)().prepareDownload(args.fileName, {
            wait: !!args.wait,
            timeout: args.timeout,
            timeoutForStart: args.timeoutForStart
          });
          return _context22.abrupt("return", true);
        case 216:
          return _context22.abrupt("return", _storage["default"].get('config').then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
            var config,
              state,
              tabId,
              wTab,
              tab,
              from,
              isFileSchema,
              isHttpSchema,
              _args21 = arguments;
            return _regeneratorRuntime().wrap(function _callee21$(_context21) {
              while (1) switch (_context21.prev = _context21.next) {
                case 0:
                  config = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : {};
                  _context21.next = 3;
                  return (0, _global_state.getState)();
                case 3:
                  state = _context21.sent;
                  tabId = state.tabIds.toPlay;
                  if (!(tabId != "")) {
                    _context21.next = 11;
                    break;
                  }
                  _context21.next = 8;
                  return checkWindowisOpen(tabId);
                case 8:
                  _context21.t0 = _context21.sent;
                  _context21.next = 12;
                  break;
                case 11:
                  _context21.t0 = '';
                case 12:
                  wTab = _context21.t0;
                  if (!(wTab != "")) {
                    _context21.next = 17;
                    break;
                  }
                  _context21.t1 = wTab;
                  _context21.next = 20;
                  break;
                case 17:
                  _context21.next = 19;
                  return getToplayTabId();
                case 19:
                  _context21.t1 = _context21.sent;
                case 20:
                  tab = _context21.t1;
                  _context21.next = 23;
                  return (0, _global_state.updateState)(function (state) {
                    return _objectSpread(_objectSpread({}, state), {}, {
                      tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                        lastPlay: state.tabIds.lastPlay,
                        toPlay: tab.id,
                        firstPlay: tab.id
                      })
                    });
                  });
                case 23:
                  from = args.testCase && args.testCase.from || args.testSuite && args.testSuite.from;
                  _context21.t2 = from;
                  _context21.next = _context21.t2 === 'bookmark' ? 27 : _context21.t2 === 'html' ? 30 : 37;
                  break;
                case 27:
                  if (config.allowRunFromBookmark) {
                    _context21.next = 29;
                    break;
                  }
                  throw new Error('[Message from RPA] Error E103: To run a macro or a test suite from bookmarks, you need to allow it in the Ui.Vision settings first');
                case 29:
                  return _context21.abrupt("break", 38);
                case 30:
                  isFileSchema = /^file:\/\//.test(args.sender.url);
                  isHttpSchema = /^https?:\/\//.test(args.sender.url);
                  if (!(isFileSchema && !config.allowRunFromFileSchema)) {
                    _context21.next = 34;
                    break;
                  }
                  throw new Error('Error #103: To run test suite from local file, enable it in Ui.Vision settings first');
                case 34:
                  if (!(isHttpSchema && !config.allowRunFromHttpSchema)) {
                    _context21.next = 36;
                    break;
                  }
                  throw new Error('Error #104: To run test suite from public website, enable it in Ui.Vision settings first');
                case 36:
                  return _context21.abrupt("break", 38);
                case 37:
                  throw new Error('E212: unknown source not allowed');
                case 38:
                  return _context21.abrupt("return", (0, _tab.withPanelIpc)({
                    params: {
                      from: from
                    }
                  }).then(function (panelIpc) {
                    // in case of side panel
                    if (!panelIpc) return false;
                    if (args.testCase) {
                      return panelIpc.ask('RUN_TEST_CASE', {
                        testCase: args.testCase,
                        options: args.options
                      });
                    }
                    if (args.testSuite) {
                      return panelIpc.ask('RUN_TEST_SUITE', {
                        testSuite: args.testSuite,
                        options: args.options
                      });
                    }
                    return true;
                  }));
                case 39:
                case "end":
                  return _context21.stop();
              }
            }, _callee21);
          }))));
        case 217:
          from = args.from;
          return _context22.abrupt("return", _storage["default"].get('config').then(function () {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var isFileSchema = /^file:\/\//.test(args.sender.url);
            var isHttpSchema = /^https?:\/\//.test(args.sender.url);
            if (isFileSchema && !config.allowRunFromFileSchema) {
              throw new Error('Error #105: To run macro from local file, enable it in RPA settings first');
            }
            if (isHttpSchema && !config.allowRunFromHttpSchema) {
              throw new Error('Error #105: To run macro from public website, enable it in the RPA settings first');
            }
            return (0, _tab.withPanelIpc)({
              params: {
                from: from
              }
            }).then(function (panelIpc) {
              return panelIpc.ask('IMPORT_AND_RUN', args);
            });
          }));
        case 219:
          return _context22.abrupt("return", getPanelTabIpc().then(function (ipc) {
            return ipc.ask('ADD_LOG', args);
          }));
        case 220:
          (0, _tab.withPanelIpc)({
            params: {
              settings: true
            }
          }).then(function (ipc) {
            return ipc.ask('OPEN_SETTINGS');
          })["catch"](function (e) {
            console.error(e);
          });
          return _context22.abrupt("return", true);
        case 222:
          return _context22.abrupt("return", (0, _tab.withPanelIpc)().then(function (ipc) {
            return ipc.ask('ADD_VISION_IMAGE', {
              dataUrl: args.dataUrl,
              requireRename: true
            });
          }));
        case 223:
          return _context22.abrupt("return", (0, _utils.delay)(function () {
            return args.id;
          }, args.timeout));
        case 224:
          return _context22.abrupt("return", 'unknown');
        case 225:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function onRequest(_x12, _x13) {
    return _ref21.apply(this, arguments);
  };
}();
var initIPC = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    var tabs, tabIdDict, remainingTabIdDict;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return (0, _tab_utils.getAllTabs)();
        case 2:
          tabs = _context24.sent;
          tabIdDict = tabs.reduce(function (prev, cur) {
            prev[cur.id] = true;
            return prev;
          }, {});
          _context24.next = 6;
          return (0, _ipc_cache.getIpcCache)().cleanup(tabIdDict);
        case 6:
          remainingTabIdDict = _context24.sent;
          // Restore connection with existing pages, it's for cases when background turns inactive and then active again
          Object.keys(remainingTabIdDict).forEach(function (tabIdStr) {
            var tabId = parseInt(tabIdStr);
            (0, _ipc_cache.getIpcCache)().get(tabId).then(function (ipc) {
              ipc.onAsk(onRequest);
            });
          });
          (0, _ipc_bg_cs.bgInit)( /*#__PURE__*/function () {
            var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(tabId, cuid, ipc) {
              return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return (0, _ipc_cache.getIpcCache)().has(tabId, cuid);
                  case 2:
                    if (_context23.sent) {
                      _context23.next = 6;
                      break;
                    }
                    (0, _log["default"])('connect cs/sp ipc: tabId, cuid, ipc:>> ', tabId, cuid, ipc);
                    (0, _ipc_cache.getIpcCache)().set(tabId, ipc, cuid);
                    ipc.onAsk(onRequest);
                  case 6:
                  case "end":
                    return _context23.stop();
                }
              }, _callee23);
            }));
            return function (_x20, _x21, _x22) {
              return _ref39.apply(this, arguments);
            };
          }(), getLogServiceForBg);
        case 9:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function initIPC() {
    return _ref38.apply(this, arguments);
  };
}();
var initOnInstalled = function initOnInstalled() {
  if (typeof process !== 'undefined' && "production" === 'production') {
    _web_extension["default"].runtime.setUninstallURL(_config["default"].urlAfterUninstall);
    chrome.runtime.onInstalled.addListener(function (_ref40) {
      var reason = _ref40.reason,
        previousVersion = _ref40.previousVersion;
      // * Why doesn't it fire in firefox?
      switch (reason) {
        case 'install':
          {
            _storage["default"].get('config').then(function (config) {
              return _storage["default"].set('config', _objectSpread(_objectSpread({}, config), {}, {
                showTestCaseTab: false
              }));
            });
            return _web_extension["default"].tabs.create({
              url: _config["default"].urlAfterInstall
            });
          }
        case 'update':
          {
            _web_extension["default"].action.setBadgeText({
              text: 'NEW'
            });
            _web_extension["default"].action.setBadgeBackgroundColor({
              color: '#4444FF'
            });
            return _web_extension["default"].storage.local.set({
              upgrade_not_viewed: 'not_viewed'
            });
          }
      }
    });
  }
};

// With service worker, this method could be called multiple times as background,
// must make sure that it only set those tabIds when it's in normal mode
// (not playing/recording/inspecting)
var initPlayTab = function initPlayTab() {
  return Promise.all([_web_extension["default"].windows.getCurrent(), (0, _global_state.getState)()]).then(function (_ref41) {
    var _ref42 = _slicedToArray(_ref41, 2),
      window = _ref42[0],
      state = _ref42[1];
    // *** this line has been fixed. Look for any unintended side effects ***    
    // console.log('state:>> ', state)
    // console.log('window:>> ', window)
    if (state.status !== C.APP_STATUS.NORMAL) {
      return false;
    }
    return _web_extension["default"].tabs.query({
      active: true,
      windowId: window.id
    }).then( /*#__PURE__*/function () {
      var _ref43 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(tabs) {
        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              if (!(!tabs || !tabs.length)) {
                _context25.next = 2;
                break;
              }
              return _context25.abrupt("return", false);
            case 2:
              if (!(tabs[0].id === state.tabIds.panel)) {
                _context25.next = 4;
                break;
              }
              return _context25.abrupt("return", false);
            case 4:
              (0, _log["default"])('in initPlayTab, set toPlay to', tabs[0]);
              _context25.next = 7;
              return (0, _global_state.updateState)(function (state) {
                return _objectSpread(_objectSpread({}, state), {}, {
                  tabIds: _objectSpread(_objectSpread({}, state.tabIds), {}, {
                    lastPlay: state.tabIds.toPlay,
                    toPlay: tabs[0].id,
                    firstPlay: tabs[0].id
                  })
                });
              });
            case 7:
              return _context25.abrupt("return", true);
            case 8:
            case "end":
              return _context25.stop();
          }
        }, _callee25);
      }));
      return function (_x23) {
        return _ref43.apply(this, arguments);
      };
    }());
  });
};
var initDownloadMan = function initDownloadMan() {
  (0, _download_man.getDownloadMan)().onCountDown(function (data) {
    getPanelTabIpc().then(function (panelIpc) {
      panelIpc.ask('TIMEOUT_STATUS', _objectSpread(_objectSpread({}, data), {}, {
        type: 'download'
      }));
    });
  });
  (0, _download_man.getDownloadMan)().onDownloadComplete(function (downloadItem) {
    getPanelTabIpc().then(function (panelIpc) {
      panelIpc.ask('DOWNLOAD_COMPLETE', downloadItem);
    });
  });
};
var initProxyMan = function initProxyMan() {
  var onProxyChange = /*#__PURE__*/function () {
    var _ref44 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(newProxy) {
      var img, state;
      return _regeneratorRuntime().wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            img = newProxy ? _config["default"].icons.inverted : _config["default"].icons.normal;
            _web_extension["default"].action.setIcon({
              path: img
            });
            _context26.next = 4;
            return (0, _global_state.getState)();
          case 4:
            state = _context26.sent;
            if (state.tabIds.panel) {
              getPanelTabIpc().then(function (ipc) {
                return ipc.ask('PROXY_UPDATE', {
                  proxy: newProxy
                });
              })["catch"](function (e) {
                return _log["default"].warn(e);
              });
            }
          case 6:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    }));
    return function onProxyChange(_x24) {
      return _ref44.apply(this, arguments);
    };
  }();
  (0, _proxy.getProxyManager)().getProxy().then(onProxyChange);
  (0, _proxy.getProxyManager)().onChange(onProxyChange);
};
bindEvents();
initIPC();
initOnInstalled();
initPlayTab();
initDownloadMan();
initProxyMan();
(0, _contextMenu.getContextMenuService)().destroyMenus();
self.clip = _clipboard["default"];

// Initialize Supabase Realtime Bridge
__webpack_require__.e(/* import() */ 34).then(__webpack_require__.t.bind(__webpack_require__, 52034, 23))["catch"](function (e) {
  console.error('❌ Failed to initialize Supabase:', e);
});
})();

/******/ })()
;