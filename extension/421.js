(self["webpackChunkui_vision_web_extension"] = self["webpackChunkui_vision_web_extension"] || []).push([[421],{

/***/ 35802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MenuItemType = exports.ContextMenuDisplayStatus = exports.ContextMenu = void 0;
exports.hideContextMenu = hideContextMenu;
exports.showContextMenu = showContextMenu;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _reactDom = _interopRequireDefault(__webpack_require__(40961));
var _propTypes = _interopRequireDefault(__webpack_require__(5556));
var _antd = __webpack_require__(33061);
var _reactClickOutside = _interopRequireDefault(__webpack_require__(81904));
var _ts_utils = __webpack_require__(1601);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import { ClickParam } from 'antd/lib/menu' // deprecated
var MenuItemType = exports.MenuItemType = /*#__PURE__*/function (MenuItemType) {
  MenuItemType["Divider"] = "divider";
  MenuItemType["Button"] = "button";
  return MenuItemType;
}({});
var ContextMenuDisplayStatus = exports.ContextMenuDisplayStatus = /*#__PURE__*/function (ContextMenuDisplayStatus) {
  ContextMenuDisplayStatus[ContextMenuDisplayStatus["Hidden"] = 0] = "Hidden";
  ContextMenuDisplayStatus[ContextMenuDisplayStatus["Transparent"] = 1] = "Transparent";
  ContextMenuDisplayStatus[ContextMenuDisplayStatus["Visible"] = 2] = "Visible";
  return ContextMenuDisplayStatus;
}({});
var ContextMenu = exports.ContextMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(ContextMenu, _React$Component);
  function ContextMenu() {
    var _this;
    _classCallCheck(this, ContextMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ContextMenu, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "$container", null);
    _defineProperty(_assertThisInitialized(_this), "state", {
      isCollectingSize: false,
      status: ContextMenuDisplayStatus.Transparent,
      size: {
        width: 0,
        height: 0
      }
    });
    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      _this.props.onHide();
    });
    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var found = _this.findMenuItem(e.key);
      if (!found) {
        return;
      }
      switch (found.type) {
        case MenuItemType.Button:
          {
            var _ref = found.data,
              _context = _ref.context,
              onClick = _ref.onClick;
            try {
              onClick(e.domEvent, _context);
            } catch (e) {
              console.warn(e);
            } finally {
              _this.hide();
            }
            break;
          }
        case MenuItemType.Divider:
        default:
          break;
      }
    });
    return _this;
  }
  _createClass(ContextMenu, [{
    key: "findMenuItem",
    value: function findMenuItem(menuItemId) {
      var _this2 = this;
      return this.props.menuItems.find(function (item, i) {
        return _this2.getId(item, i) === menuItemId;
      });
    }
  }, {
    key: "getId",
    value: function getId(menuItem, index) {
      return menuItem.id + '_' + index;
    }
  }, {
    key: "getContextMenuStyle",
    value: function getContextMenuStyle() {
      var _this3 = this;
      var status = this.state.status;
      var common = {
        position: 'fixed'
      };
      var byStatus = function () {
        switch (status) {
          case ContextMenuDisplayStatus.Hidden:
            return {
              display: 'none'
            };
          case ContextMenuDisplayStatus.Transparent:
            {
              return {
                top: 0,
                left: 0,
                visibility: 'hidden'
              };
            }
          case ContextMenuDisplayStatus.Visible:
            {
              var leftTopPoint = (0, _ts_utils.pointToFitRect)({
                bound: {
                  x: 0,
                  y: 0,
                  width: window.innerWidth,
                  height: window.innerHeight
                },
                size: _this3.state.size,
                point: {
                  x: _this3.props.x,
                  y: _this3.props.y
                }
              });
              return {
                top: leftTopPoint.y + 'px',
                left: leftTopPoint.x + 'px'
              };
            }
        }
      }();
      return _objectSpread(_objectSpread({}, common), byStatus);
    }
  }, {
    key: "collectSize",
    value: function collectSize() {
      var _this4 = this;
      this.setState({
        isCollectingSize: true
      });
      setTimeout(function () {
        if (!_this4.$container) {
          return;
        }
        _this4.setState({
          isCollectingSize: false,
          status: ContextMenuDisplayStatus.Visible,
          size: {
            width: _this4.$container.offsetWidth,
            height: _this4.$container.offsetHeight
          }
        });
      }, 100);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.isCollectingSize && this.state.status === ContextMenuDisplayStatus.Transparent) {
        this.collectSize();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(_ref2) {
          _this5.$container = _ref2;
        },
        style: this.getContextMenuStyle(),
        className: "context-menu"
      }, /*#__PURE__*/_react["default"].createElement(_reactClickOutside["default"], {
        onClickOutside: this.hide
      }, /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
        onClick: this.onClick,
        style: {
          width: this.props.width + 'px'
        },
        mode: "vertical",
        selectable: false
      }, this.props.menuItems.map(function (item, i) {
        switch (item.type) {
          case MenuItemType.Divider:
            return /*#__PURE__*/_react["default"].createElement(_antd.Menu.Divider, {
              key: _this5.getId(item, i)
            });
          case MenuItemType.Button:
            return /*#__PURE__*/_react["default"].createElement(_antd.Menu.Item, {
              key: _this5.getId(item, i),
              disabled: !!item.disabled
            }, item.data.content);
          default:
            return null;
        }
      }))));
    }
  }]);
  return ContextMenu;
}(_react["default"].Component);
_defineProperty(ContextMenu, "propTypes", {
  menuItems: _propTypes["default"].array.isRequired,
  onHide: _propTypes["default"].func.isRequired,
  width: _propTypes["default"].number
});
_defineProperty(ContextMenu, "defaultProps", {
  width: 230
});
function getContainer() {
  var id = '__kantu_context_menus__';
  var $el = document.getElementById(id);
  if ($el) return $el;
  var $new = document.createElement('div');
  $new.id = id;
  document.body.appendChild($new);
  return $new;
}
function showContextMenu(props) {
  var $box = document.createElement('div');
  getContainer().appendChild($box);

  // Delay 20ms is for firefox
  setTimeout(function () {
    _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(ContextMenu, _extends({}, props, {
      onHide: function onHide() {
        setTimeout(function () {
          $box.remove();
        });
        props.onHide();
      }
    })), $box);
  }, 20);
}
function hideContextMenu() {
  var $el = document.getElementById('__kantu_context_menus__');
  if ($el) {
    $el.remove();
  }
}

/***/ }),

/***/ 11199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ResourceNotLoaded = ResourceNotLoaded;
var _react = _interopRequireDefault(__webpack_require__(96540));
var _antd = __webpack_require__(33061);
var _state = __webpack_require__(78493);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ResourceNotLoaded(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "list-not-loaded"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Started by ", (0, _state.stringForRunBy)(props.from), "."), /*#__PURE__*/_react["default"].createElement("p", null, props.name, " not loaded."), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    onClick: props.showList
  }, "Load now"));
}

/***/ }),

/***/ 51152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _log = _interopRequireDefault(__webpack_require__(89130));
var _dom_utils = __webpack_require__(92950);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*
 * Basic tool function
 */

var extend = function extend() {
  var args = Array.from(arguments);
  var len = args.length;
  if (len <= 0) return {};
  if (len === 1) return args[0];
  var head = args[0];
  var rest = args.slice(1);
  return rest.reduce(function (prev, cur) {
    for (var i = 0, keys = Object.keys(cur), len = keys.length; i < len; i++) {
      prev[keys[i]] = cur[keys[i]];
    }
    return prev;
  }, head);
};
var isArray = Array.isArray;
var id = function id(x) {
  return x;
};
var trim = function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
};
var flatten = function flatten(list) {
  return [].concat.apply([], list);
};
var sum = function sum() {
  var list = Array.from(arguments);
  return list.reduce(function (prev, cur) {
    return prev + cur;
  }, 0);
};
var last = function last(list) {
  return list[list.length - 1];
};
var or = function or(list) {
  return (list || []).reduce(function (prev, cur) {
    return prev || cur;
  }, false);
};
var and = function and(list) {
  return (list || []).reduce(function (prev, cur) {
    return prev && cur;
  }, true);
};
var zipWith = function zipWith(fn) {
  if (arguments.length < 3) return null;
  var list = Array.from(arguments).slice(1);
  var len = list.reduce(function (min, cur) {
    return cur.length < min ? cur.length : min;
  }, Infinity);
  var ret = [];
  for (var i = 0; i < len; i++) {
    ret.push(fn.apply(null, list.map(function (item) {
      return item[i];
    })));
  }
  return ret;
};
var intersect = function intersect() {
  var list = Array.from(arguments);
  var len = Math.max.apply(null, list.map(function (item) {
    return item.length;
  }));
  var result = [];
  for (var i = 0; i < len; i++) {
    var val = list[0][i];
    var no = list.filter(function (item) {
      return item[i] !== val;
    });
    if (no && no.length) break;
    result.push(val);
  }
  return result;
};
var deepEqual = function deepEqual(a, b) {
  if (isArray(a) && isArray(b)) {
    return a.length === b.length && and(zipWith(deepEqual, a, b));
  }
  if (_typeof(a) === 'object' && _typeof(b) === 'object') {
    // TODO
    return false;
  }
  return a === b;
};

/*
 * Dom helper function
 */

var pixel = function pixel(num) {
  if ((num + '').indexOf('px') !== -1) return num;
  return (num || 0) + 'px';
};
var getStyle = function getStyle(dom, styleName) {
  if (!dom) throw new Error('getStyle: dom does not exist');
  return getComputedStyle(dom)[styleName];
};
var setStyle = function setStyle(dom, style) {
  if (!dom) throw new Error('setStyle: dom does not exist');
  for (var i = 0, keys = Object.keys(style), len = keys.length; i < len; i++) {
    dom.style[keys[i]] = style[keys[i]];
  }
  return dom;
};
var cssSum = function cssSum(dom, list) {
  var isInline = getStyle(dom, 'display') === 'inline';
  return list.reduce(function (prev, cur) {
    var val = isInline && ['width', 'height'].indexOf(cur) !== -1 ? dom.getClientRects()[0][cur] : getStyle(dom, cur);
    return prev + parseInt(val || '0', 10);
  }, 0);
};
var offset = function offset(dom, noPx) {
  if (!dom) return {
    left: 0,
    top: 0
  };
  var rect = dom.getBoundingClientRect();
  var fn = noPx ? id : pixel;
  return {
    left: fn(rect.left + window.scrollX),
    top: fn(rect.top + window.scrollY)
  };
};
var rect = function rect(dom, noPx) {
  var pos = offset(dom, noPx);
  var isInline = getStyle(dom, 'display') === 'inline';
  var w = isInline ? dom.getClientRects()[0]['width'] : getStyle(dom, 'width');
  var h = isInline ? dom.getClientRects()[0]['height'] : getStyle(dom, 'height');
  var fn = noPx ? id : pixel;
  return extend({
    width: fn(w),
    height: fn(h)
  }, pos);
};

// Reference: http://ryanve.com/lab/dimensions/
var clientWidth = function clientWidth(document) {
  return document.documentElement.clientWidth;
};
var clientHeight = function clientHeight(document) {
  return document.documentElement.clientHeight;
};
var removeChildren = function removeChildren(dom, predicate) {
  var pred = predicate || function () {
    return true;
  };
  var children = dom.childNodes;
  for (var i = children.length - 1; i >= 0; i--) {
    if (pred(children[i])) {
      dom.removeChild(children[i]);
    }
  }
};
var inDom = function inDom($outer, $el) {
  if (!$el) return false;
  if ($outer === $el) return true;
  return inDom($outer, $el.parentNode);
};
var inDomList = function inDomList(list, $el) {
  return or(list.map(function ($outer) {
    return inDom($outer, $el);
  }));
};
var parentWithTag = function parentWithTag(tag, $el) {
  var lowerTag = tag.toLowerCase();
  var $dom = $el;
  while ($dom) {
    if ($dom.tagName.toLowerCase() === lowerTag) {
      return $dom;
    }
    $dom = $dom.parentNode;
  }
  return null;
};
var parentWithClass = function parentWithClass(className, $el) {
  var $dom = $el;
  while ($dom) {
    // Note: In Firefox, HTML Document object doesn't have `classList` property
    if ($dom.classList !== undefined && $dom.classList.contains(className)) {
      return $dom;
    }
    $dom = $dom.parentNode;
  }
  return null;
};
var selector = function selector(dom) {
  if (dom.nodeType !== 1) return '';
  if (dom.tagName === 'BODY') return 'body';
  if (dom.id) return '#' + dom.id;
  var classes = (dom.getAttribute('class') || '').split(/\s+/g).filter(function (item) {
    return item && item.length;
  });
  var children = Array.from(dom.parentNode.childNodes).filter(function ($el) {
    return $el.nodeType === 1;
  });
  var sameTag = children.filter(function ($el) {
    return $el.tagName === dom.tagName;
  });
  var sameClass = children.filter(function ($el) {
    var cs = ($el.getAttribute('class') || '').split(/\s+/g);
    return and(classes.map(function (c) {
      return cs.indexOf(c) !== -1;
    }));
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
  var ret = selector(dom.parentNode) + ' > ' + me;
  return ret;
  // return ret.replace(/\s*>\s*tbody\s*>?/g, ' ')
};
var getTagIndex = function getTagIndex(dom) {
  return Array.from(dom.parentNode.childNodes).filter(function (item) {
    return item.nodeType === dom.nodeType && item.tagName === dom.tagName;
  }).reduce(function (prev, node, i) {
    if (prev !== null) return prev;
    return node === dom ? i + 1 : prev;
  }, null);
};
var relativeXPath = function relativeXPath(dom) {
  if (!dom) return null;
  if (dom.nodeType === 3) return '@text';
  var index = getTagIndex(dom);
  var count = Array.from(dom.parentNode.childNodes).filter(function (item) {
    return item.nodeType === dom.nodeType && item.tagName === dom.tagName;
  }).length;
  var tag = dom.tagName.toLowerCase();
  return index > 1 ? tag + '[' + index + ']' : tag;
};
var xpath = function xpath(dom, cur, list) {
  var helper = function helper(dom, cur, list) {
    if (!dom) return null;
    if (!cur) {
      if (dom.nodeType === 3) {
        return helper(dom.parentNode);
      } else {
        return helper(dom, dom, []);
      }
    }
    if (!cur.parentNode) {
      return ['html'].concat(list);
    }
    if (cur.tagName === 'BODY') {
      return ['html', 'body'].concat(list);
    }
    if (cur.id) {
      return ["*[@id=\"".concat(cur.id, "\"]")].concat(list);
    }
    return helper(dom, cur.parentNode, [relativeXPath(cur)].concat(list));
  };
  var parts = helper(dom, cur, list);
  var prefix = parts[0] === 'html' ? '/' : '//';
  var ret = prefix + parts.join('/');
  return ret;
};
var xpathPosition = function xpathPosition(dom) {
  var path = '';
  var current = dom;
  try {
    while (current !== null) {
      var currentPath = void 0;
      if (current.parentNode != null) {
        currentPath = '/' + relativeXPath(current);
      } else if (current.tagName === 'BODY') {
        currentPath = 'html/body';
      } else {
        currentPath = '/' + current.nodeName.toLowerCase();
      }
      path = currentPath + path;
      var locator = '/' + path;
      if (dom === (0, _dom_utils.getElementByXPath)(locator)) {
        return locator;
      }
      current = current.parentNode;
    }
  } catch (e) {}
  return null;
};
var attributeValue = function attributeValue(value) {
  if (value.indexOf("'") < 0) {
    return "'" + value + "'";
  } else if (value.indexOf('"') < 0) {
    return '"' + value + '"';
  } else {
    var result = 'concat(';
    var part = '';
    var didReachEndOfValue = false;
    while (!didReachEndOfValue) {
      var apos = value.indexOf("'");
      var quot = value.indexOf('"');
      if (apos < 0) {
        result += "'" + value + "'";
        didReachEndOfValue = true;
        break;
      } else if (quot < 0) {
        result += '"' + value + '"';
        didReachEndOfValue = true;
        break;
      } else if (quot < apos) {
        part = value.substring(0, apos);
        result += "'" + part + "'";
        value = value.substring(part.length);
      } else {
        part = value.substring(0, quot);
        result += '"' + part + '"';
        value = value.substring(part.length);
      }
      result += ',';
    }
    result += ')';
    return result;
  }
};
var xpathAttr = function xpathAttr(dom) {
  function attributesXPath(name, attNames, attributes) {
    var locator = '//' + name + '[';
    for (var i = 0; i < attNames.length; i++) {
      if (i > 0) {
        locator += ' and ';
      }
      var attName = attNames[i];
      locator += '@' + attName + '=' + attributeValue(attributes[attName]);
    }
    locator += ']';
    return locator;
  }
  try {
    var PREFERRED_ATTRIBUTES = ['id', 'name', 'value', 'type', 'action', 'onclick'];
    var i = 0;
    if (dom.attributes) {
      var atts = dom.attributes;
      var attsMap = {};
      for (i = 0; i < atts.length; i++) {
        var att = atts[i];
        attsMap[att.name] = att.value;
      }
      var names = [];
      // try preferred attributes
      for (i = 0; i < PREFERRED_ATTRIBUTES.length; i++) {
        var name = PREFERRED_ATTRIBUTES[i];
        if (attsMap[name] != null) {
          names.push(name);
          var locator = attributesXPath(dom.nodeName.toLowerCase(), names, attsMap);
          if (dom === (0, _dom_utils.getElementByXPath)(locator)) {
            return locator;
          }
        }
      }
    }
  } catch (e) {}
  return null;
};
var atXPath = function atXPath(xpath, document) {
  var lower = function lower(str) {
    return str && str.toLowerCase();
  };
  var reg = /^([a-zA-Z0-9]+)(\[(\d+)\])?$/;
  return xpath.reduce(function (prev, cur) {
    if (!prev) return prev;
    if (!prev.childNodes || !prev.childNodes.length) return null;
    var match = cur.match(reg);
    var tag = match[1];
    var index = match[3] ? parseInt(match[3], 10) : 1;
    var list = Array.from(prev.childNodes).filter(function (item) {
      return item.nodeType === 1 && lower(item.tagName) === lower(tag);
    });
    return list[index - 1];
  }, document);
};
var domText = function domText($dom) {
  var it = $dom.innerText && $dom.innerText.trim();
  var tc = $dom.textContent;
  var pos = tc.toUpperCase().indexOf(it.toUpperCase());
  return tc.substr(pos, it.length);
};
var getFirstWorkingLocator = function getFirstWorkingLocator(locators, $el) {
  var _loop = function _loop(i) {
      var $match = function () {
        try {
          return (0, _dom_utils.getElementByLocator)(locators[i]);
        } catch (e) {
          return null;
        }
      }();
      if ($el === $match) {
        return {
          v: locators[i]
        };
      }
    },
    _ret;
  for (var i = 0, len = locators.length; i < len; i++) {
    _ret = _loop(i);
    if (_ret) return _ret.v;
  }
  return null;
};

// Note: get the locator of a DOM
var getLocator = function getLocator($dom, withAllOptions) {
  var id = $dom.getAttribute('id');
  var name = $dom.getAttribute('name');
  var isLink = $dom.tagName.toLowerCase() === 'a';
  var text = function () {
    try {
      return domText($dom);
    } catch (e) {
      return null;
    }
  }();
  var classes = Array.from($dom.classList);
  var candidates = [];

  // link
  if (isLink && text && text.length) {
    var links = [].slice.call(document.getElementsByTagName('a'));
    var matches = links.filter(function ($el) {
      return domText($el) === text;
    });
    var index = matches.findIndex(function ($el) {
      return $el === $dom;
    });
    if (index !== -1) {
      candidates.push(index === 0 ? "linkText=".concat(text) : "linkText=".concat(text, "@POS=").concat(index + 1));
    }
  }

  // id
  if (id && id.length) {
    candidates.push("id=".concat(id));
  }

  // name
  if (name && name.length) {
    candidates.push("name=".concat(name));
  }

  // xpath
  candidates.push('xpath=' + xpath($dom));
  var attrXPath = xpathAttr($dom);
  if (attrXPath) {
    candidates.push('xpath=' + attrXPath);
  }
  var positionXPath = xpathPosition($dom);
  if (positionXPath) {
    candidates.push('xpath=' + positionXPath);
  }

  // css
  // Try with simple css selector first. If not unqiue, use full css selector
  /**
   * Below is the old logic with a shorter css selector
   *
   let sel = null
   if (classes.length > 0) {
    sel = $dom.tagName.toLowerCase() + classes.map(c => '.' + c).join('')
     if ($dom !== document.querySelectorAll(sel)[0]) {
      sel = null
    }
  }
   if (!sel) {
    sel = selector($dom)
  }
  */
  candidates.push("css=".concat(selector($dom)));

  // Get the first one working
  var chosen = getFirstWorkingLocator(candidates, $dom);
  if (withAllOptions) {
    return {
      target: chosen,
      targetOptions: candidates
    };
  }
  return chosen;
};
var checkIframe = function checkIframe(iframeWin) {
  var key = new Date() * 1 + '' + Math.random();
  try {
    iframeWin[key] = 'asd';
    return iframeWin[key] === 'asd';
  } catch (e) {
    return false;
  }
};

// Note: get the locator for frame
var getFrameLocator = function getFrameLocator(frameWin, win) {
  if (checkIframe(frameWin)) {
    var frameDom = frameWin.frameElement;
    var locator = getLocator(frameDom);
    if (/^id=/.test(locator) || /^name=/.test(locator)) {
      return locator;
    }
  }
  for (var i = 0, len = win.frames.length; i < len; i++) {
    if (win.frames[i] === frameWin) {
      return "index=".concat(i);
    }
  }
  throw new Error('Frame locator not found');
};

/*
 * Mask related
 */

var maskFactory = function maskFactory() {
  var cache = [];
  var prefix = '__mask__' + new Date() * 1 + Math.round(Math.random() * 1000) + '__';
  var uid = 1;
  var defaultStyle = {
    position: 'absolute',
    zIndex: '999',
    display: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'red',
    opacity: 0.5,
    pointerEvents: 'none'
  };
  var genMask = function genMask(style, dom) {
    var mask = document.createElement('div');
    if (dom) {
      style = extend({}, defaultStyle, style || {}, rect(dom));
    } else {
      style = extend({}, defaultStyle, style || {});
    }
    setStyle(mask, style);
    mask.id = prefix + uid++;
    cache.push(mask);
    return mask;
  };
  var clear = function clear() {
    for (var i = 0, len = cache.length; i < len; i++) {
      var mask = cache[i];
      if (mask && mask.parentNode) {
        mask.parentNode.removeChild(mask);
      }
    }
  };
  return {
    gen: genMask,
    clear: clear
  };
};
var showMaskOver = function showMaskOver(mask, el) {
  var pos = offset(el);
  var w = cssSum(el, ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth']);
  var h = cssSum(el, ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', ' borderBottomWidth']);
  setStyle(mask, extend(pos, {
    width: pixel(w),
    height: pixel(h),
    display: 'block'
  }));
};
var isVisible = function isVisible(el) {
  if (el === window.document) return true;
  if (!el) return true;
  var style = window.getComputedStyle(el);
  if (style.display === 'none' || style.opacity === '0' || style.visibility === 'hidden') return false;
  return isVisible(el.parentNode);
};
var _default = exports["default"] = {
  offset: offset,
  setStyle: setStyle,
  selector: selector,
  xpath: xpath,
  atXPath: atXPath,
  domText: domText,
  getLocator: getLocator,
  getFrameLocator: getFrameLocator,
  maskFactory: maskFactory,
  showMaskOver: showMaskOver,
  inDom: inDom,
  isVisible: isVisible,
  parentWithTag: parentWithTag,
  parentWithClass: parentWithClass
};

/***/ }),

/***/ 18619:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, `.ant-btn{font-size:12px}.ant-btn-lg{font-size:12px}.ant-btn-sm{font-size:12px}.ant-btn-sm.ant-btn-circle{line-height:1;margin:1px}.ant-tabs-content{overflow:hidden}.ant-form-item .ant-form-item-label>label{font-size:12px}.ant-checkbox-wrapper{font-size:12px}.ant-col{font-size:12px}.ant-radio-wrapper{font-size:12px}.ant-select-single .ant-select-selector{font-size:12px}.ant-select-dropdown .ant-select-item{font-size:12px}.ant-modal .ant-modal-title{font-size:14px}.ant-tabs{font-size:12px}.ant-modal-body{font-size:12px}.ant-checkbox-wrapper+span,.ant-checkbox+span{padding-left:8px;padding-right:8px}pre.log-detail{overflow:visible}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 38574:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, `body{margin:0;padding:0;font-size:16px}*{box-sizing:border-box}.app{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column}.app.ocr-overlay{background-color:#fff;z-index:10000}.app.no-display .status{margin-bottom:20px;font-size:14px}.app.no-display .content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex;justify-content:center;align-items:center}.app.with-alert .backup-alert{display:block}.app .app-inner{flex:1;display:flex;flex-direction:row}.app .backup-alert{display:none;padding:5px 0;text-align:center;font-size:14px;background:#fdfdc2}.app .backup-alert .backup-actions{margin-left:20px}.app .backup-alert .backup-actions button{margin-right:10px}.app .content{display:flex;flex-direction:column;flex:3;min-width:520px;background:#fff;overflow-y:auto}.app .content.sidepanel{min-width:100%;width:100%}.app .hidden-during-replay{display:flex;flex-direction:row;align-items:center;justify-content:center;padding-top:15px;font-size:14px;color:#999}.app .list-not-loaded{display:flex;flex-direction:column;justify-content:center;align-items:center}.app .list-not-loaded button{margin-top:20px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 39550:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, `html[data-theme=dark] .ant-btn{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-btn[disabled]:not(.ant-btn-primary){background-color:#23272f;border-color:#7b7b7b;color:#666}html[data-theme=dark] .ant-btn:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-primary):hover{background-color:gray;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-btn.ant-btn-primary{background-color:#1677ff;border-color:#1677ff}html[data-theme=dark] .ant-btn.ant-btn-primary:hover{background-color:#69b1ff;border-color:#69b1ff}html[data-theme=dark] .ant-btn.ant-btn-circle:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-primary){background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-btn.ant-btn-circle:not(:disabled):not(.ant-btn-disabled):not(.ant-btn-primary):hover{background-color:gray;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-menu-light .ant-menu-item-disabled,html[data-theme=dark] .ant-menu-light>.ant-menu .ant-menu-item-disabled,html[data-theme=dark] .ant-menu-light .ant-menu-submenu-disabled,html[data-theme=dark] .ant-menu-light>.ant-menu .ant-menu-submenu-disabled{color:#ababab !important}html[data-theme=dark] .ant-input-search>.ant-input-group>.ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary){color:#fff}html[data-theme=dark] .ant-menu-light .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected):hover,html[data-theme=dark] .ant-menu-light>.ant-menu .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected):hover,html[data-theme=dark] .ant-menu-light .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected)>.ant-menu-submenu-title:hover,html[data-theme=dark] .ant-menu-light>.ant-menu .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected)>.ant-menu-submenu-title:hover{background-color:gray;color:#fff}html[data-theme=dark] .ant-dropdown .ant-dropdown-menu,html[data-theme=dark] .ant-dropdown-menu-submenu .ant-dropdown-menu{background-color:#565656;color:#fff}html[data-theme=dark] .ant-dropdown .ant-dropdown-menu li,html[data-theme=dark] .ant-dropdown-menu-submenu .ant-dropdown-menu li{color:#fff}html[data-theme=dark] .ant-dropdown .ant-dropdown-menu li:hover,html[data-theme=dark] .ant-dropdown-menu-submenu .ant-dropdown-menu li:hover{background-color:gray;color:#fff}html[data-theme=dark] .ant-table-wrapper .ant-table-tbody>tr.ant-table-placeholder:hover>th,html[data-theme=dark] .ant-table-wrapper .ant-table-tbody>tr.ant-table-placeholder:hover>td,html[data-theme=dark] .ant-table-wrapper .ant-table-tbody>tr.ant-table-placeholder{background:gray}html[data-theme=dark] .ant-table-wrapper .ant-table-tbody>tr.ant-table-placeholder{background:gray}html[data-theme=dark] .ant-empty .ant-empty-description{color:#fff}html[data-theme=dark] .ant-modal-confirm-title{color:#fff}html[data-theme=dark] .ant-modal-confirm-content{color:#fff}html[data-theme=dark] .ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover .ant-select-selector{border-color:#0a4983}html[data-theme=dark] .ant-input{background-color:#23272f;border-color:#7b7b7b;color:#fff}html[data-theme=dark] .ant-input.ant-input-disabled,html[data-theme=dark] .ant-input[disabled]{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-input:not(:disabled):not(.ant-input-disabled):hover,html[data-theme=dark] .ant-input:not(:disabled):not(.ant-input-disabled):focus{border-color:#0a4983}html[data-theme=dark] .ant-input::-moz-placeholder{color:#666}html[data-theme=dark] .ant-input::placeholder{color:#666}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox:hover .ant-checkbox-inner{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked::after{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled+span{color:#fff}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light,html[data-theme=dark] .ant-menu{background-color:#565656;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-item,html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-submenu-title,html[data-theme=dark] .ant-menu .ant-menu-item,html[data-theme=dark] .ant-menu .ant-menu-submenu-title{color:#fff}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-item:hover,html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-submenu-title:hover,html[data-theme=dark] .ant-menu .ant-menu-item:hover,html[data-theme=dark] .ant-menu .ant-menu-submenu-title:hover{background-color:gray}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-item-selected,html[data-theme=dark] .ant-menu .ant-menu-item-selected{background-color:#0a4983;color:#fff}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-item-disabled,html[data-theme=dark] .ant-menu .ant-menu-item-disabled{color:#fff}html[data-theme=dark] .macro-table-container #context_menu .ant-menu.ant-menu-light .ant-menu-divider,html[data-theme=dark] .ant-menu .ant-menu-divider{background-color:#444}html[data-theme=dark] .ant-modal{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-modal .ant-modal-header{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-modal .ant-modal-title{color:#fff}html[data-theme=dark] .ant-modal .ant-modal-body{background-color:#23272f;color:#fff}html[data-theme=dark] .ant-modal .ant-modal-footer{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-modal .ant-btn{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-modal .ant-btn:hover{background-color:gray;border-color:#0a4983;color:#0a4983}html[data-theme=dark] .ant-modal .ant-btn-primary{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-modal .ant-btn-primary:hover{border-color:#0e63b2}html[data-theme=dark] .ant-modal .ant-modal-close .ant-modal-close-x{color:#fff;background-color:#23272f}html[data-theme=dark] .ant-modal .ant-modal-close .ant-modal-close-x:hover{color:#0a4983}html[data-theme=dark] .ant-tooltip .ant-tooltip-inner{background-color:#23272f;color:#fff}html[data-theme=dark] .ant-tooltip .ant-tooltip-arrow{border-top-color:#23272f}html[data-theme=dark] .ant-tabs-nav{background-color:#23272f}html[data-theme=dark] .ant-tabs-nav .ant-tabs-nav-wrap{background-color:#23272f}html[data-theme=dark] .ant-tabs-tab{color:#fff}html[data-theme=dark] .ant-tabs-tab:hover{color:#0a4983}html[data-theme=dark] .ant-tabs-tab-active .ant-tabs-tab-btn{color:#0a4983}html[data-theme=dark] .ant-tabs-ink-bar{background-color:#0a4983}html[data-theme=dark] .ant-tabs-content{background-color:#23272f;color:#fff}html[data-theme=dark] .ant-tabs-nav,html[data-theme=dark] .ant-tabs-content{border-color:#7b7b7b}html[data-theme=dark] .ant-tabs-tabpane{background-color:#23272f;color:#fff}html[data-theme=dark] .ant-table{background-color:#23272f}html[data-theme=dark] .ant-table-thead .ant-table-cell{background-color:#2a2a2a;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-table-tbody .ant-table-cell{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-table-row:hover .ant-table-cell{background-color:gray}html[data-theme=dark] .ant-table-pagination .ant-pagination-item{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-table-pagination .ant-pagination-item a{color:#fff}html[data-theme=dark] .ant-table-pagination .ant-pagination-item-active{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-table-pagination .ant-pagination-item-active a{color:#fff}html[data-theme=dark] .ant-table-pagination .ant-pagination-prev a,html[data-theme=dark] .ant-table-pagination .ant-pagination-next a{color:#fff}html[data-theme=dark] .ant-table-pagination .ant-pagination-options .ant-select .ant-select-selector{background-color:#23272f;color:#fff}html[data-theme=dark] .ant-table-pagination .ant-pagination-options .ant-select .ant-select-arrow{color:#fff}html[data-theme=dark] .ant-table-filter-dropdown{background-color:#23272f}html[data-theme=dark] .ant-table-filter-dropdown .ant-dropdown-menu-item{color:#fff}html[data-theme=dark] .ant-table-filter-dropdown .ant-dropdown-menu-item:hover{background-color:gray}html[data-theme=dark] .ant-table-body::-webkit-scrollbar{width:8px;height:8px}html[data-theme=dark] .ant-table-body::-webkit-scrollbar-thumb{background-color:#7b7b7b;border-radius:4px}html[data-theme=dark] .ant-table-body::-webkit-scrollbar-track{background-color:#23272f}html[data-theme=dark] .ant-table-column-sorter .anticon{color:#fff}html[data-theme=dark] .ant-table-filter-dropdown{background-color:#23272f}html[data-theme=dark] .ant-table-filter-dropdown .ant-dropdown-menu-item{color:#fff}html[data-theme=dark] .ant-table-filter-dropdown .ant-dropdown-menu-item:hover{background-color:gray}html[data-theme=dark] .ant-table-summary .ant-table-cell{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-table-sticky .ant-table-header{background-color:#2a2a2a}html[data-theme=dark] .ant-table-sticky .ant-table-header .ant-table-cell{background-color:#2a2a2a;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-select-selector{background-color:#23272f;border-color:#7b7b7b;color:#fff}html[data-theme=dark] .ant-select-selector:hover{border-color:#0a4983}html[data-theme=dark] .ant-select-dropdown{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-select-dropdown .ant-select-item{color:#fff;background-color:#23272f}html[data-theme=dark] .ant-select-dropdown .ant-select-item:hover{background-color:gray}html[data-theme=dark] .ant-select-dropdown .ant-select-item-option-selected{background-color:#0a4983;color:#fff}html[data-theme=dark] .ant-select-dropdown .ant-select-item-option-disabled{color:#fff;cursor:not-allowed;background-color:#23272f}html[data-theme=dark] .ant-select-dropdown .ant-select-item-option-disabled:hover{background-color:#23272f}html[data-theme=dark] .ant-select-arrow{color:#fff}html[data-theme=dark] .ant-select-clear{color:#fff}html[data-theme=dark] .ant-select-dropdown::-webkit-scrollbar{width:8px;height:8px}html[data-theme=dark] .ant-select-dropdown::-webkit-scrollbar-thumb{background-color:#7b7b7b;border-radius:4px}html[data-theme=dark] .ant-select-dropdown::-webkit-scrollbar-track{background-color:#23272f}html[data-theme=dark] .ant-radio-wrapper{color:#fff}html[data-theme=dark] .ant-radio-wrapper .ant-radio .ant-radio-inner{background-color:#23272f;border-color:#bcbaba}html[data-theme=dark] .ant-radio-wrapper .ant-radio:hover .ant-radio-inner{border-color:#0a4983}html[data-theme=dark] .ant-radio-wrapper .ant-radio-checked .ant-radio-inner{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-radio-wrapper .ant-radio-checked::after{background-color:#0a4983}html[data-theme=dark] .ant-radio-wrapper .ant-radio-disabled .ant-radio-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-radio-wrapper .ant-radio-disabled+span{color:#fff}html[data-theme=dark] .ant-radio-button-wrapper{background-color:#23272f;color:#fff;border-color:#7b7b7b}html[data-theme=dark] .ant-radio-button-wrapper:hover{color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-radio-button-wrapper-checked{background-color:#0a4983;border-color:#0a4983;color:#fff}html[data-theme=dark] .ant-radio-button-wrapper-checked:hover{border-color:#0e63b2}html[data-theme=dark] .ant-radio-button-wrapper-disabled{color:#fff;background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-radio-button-wrapper-disabled:hover{color:#fff;background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-radio-group .ant-radio-button-wrapper:first-child{border-radius:4px 0 0 4px}html[data-theme=dark] .ant-radio-group .ant-radio-button-wrapper:last-child{border-radius:0 4px 4px 0}html[data-theme=dark] .ant-checkbox-wrapper{color:#fff}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox:hover .ant-checkbox-inner{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked::after{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled+span{color:#fff}html[data-theme=dark] .ant-form-item-label label{color:#fff;background-color:#23272f}html[data-theme=dark] .ant-checkbox-wrapper{color:#fff}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox:hover .ant-checkbox-inner{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner{background-color:#0a4983;border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-checked::after{border-color:#0a4983}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled .ant-checkbox-inner{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .ant-checkbox-wrapper .ant-checkbox-disabled+span{color:#fff}html[data-theme=dark] .ant-form-item-label label{color:#fff;background-color:#23272f}html[data-theme=dark] .drop-down .option-list{background:#23272f;box-shadow:0 1px 6px rgba(255,255,255,.2);color:#fff}html[data-theme=dark] .drop-down .option-list .plain-text-option.selected{background-color:#404755}html[data-theme=dark] .drop-down .option-list .plain-text-option:hover{background-color:gray}html[data-theme=dark] .CodeMirror{background-color:#1e1e1e;color:#fff}html[data-theme=dark] .CodeMirror .CodeMirror-gutters{background-color:#2e2e2e;border-right:1px solid #151515;color:#ccc}html[data-theme=dark] .CodeMirror .CodeMirror-linenumber{color:#ccc}html[data-theme=dark] .CodeMirror .CodeMirror-cursor{border-left:1px solid #fc0}html[data-theme=dark] .CodeMirror .CodeMirror-selected{background-color:#555}html[data-theme=dark] .CodeMirror .CodeMirror-activeline-background{background-color:#333}html[data-theme=dark] .CodeMirror .CodeMirror-matchingbracket{text-decoration:underline;color:#fff}html[data-theme=dark] .CodeMirror .cm-keyword{color:#c586c0}html[data-theme=dark] .CodeMirror .cm-operator{color:#d4d4d4}html[data-theme=dark] .CodeMirror .cm-variable-2,html[data-theme=dark] .CodeMirror .cm-variable-3,html[data-theme=dark] .CodeMirror .cm-def{color:#9cdcfe}html[data-theme=dark] .CodeMirror .cm-comment{color:#6a9955}html[data-theme=dark] .CodeMirror .cm-string{color:#ce9178}html[data-theme=dark] .CodeMirror .cm-number{color:#b5cea8}html[data-theme=dark] .CodeMirror .cm-builtin{color:#dcdcaa}html[data-theme=dark] .CodeMirror .cm-tag{color:#569cd6}html[data-theme=dark] .CodeMirror .cm-attribute{color:#9cdcfe}html[data-theme=dark] .CodeMirror .cm-property{color:#4ec9b0}html[data-theme=dark] .CodeMirror .cm-variable{color:#dcdcaa}html[data-theme=dark]{color:#f6f6f9;background-color:#23272f;scrollbar-width:thin;scrollbar-color:#3a3a3a #5a5a5a}html[data-theme=dark] a{color:#1677ff}html[data-theme=dark] a:hover{color:#69b1ff}html[data-theme=dark] .app.ocr-overlay{background-color:#23272f}html[data-theme=dark] .app .backup-alert{background:#565656}html[data-theme=dark] .header{background:#565656}html[data-theme=dark] .sidebar .resize-handler{background-color:#353b46}html[data-theme=dark] .macro-table-container #context_menu{border:0px}html[data-theme=dark] .file-root .file-node.error>.tree-node-content{background:#784646}html[data-theme=dark] .command-row:hover{background:#4f5c62}html[data-theme=dark] .command-row.selected-command{background:#424234 !important}html[data-theme=dark] .command-row.selected-command.selected-command{background:rgba(66,66,52,.5411764706) !important}html[data-theme=dark] .command-row.running-command{background:#575880 !important}html[data-theme=dark] .command-row.running-command.selected-command{background:rgba(66,66,52,.5411764706) !important}html[data-theme=dark] .command-row.error-command{background:#dab7b7 !important}html[data-theme=dark] .command-row.error-command.selected-command{background:rgba(66,66,52,.5411764706) !important}html[data-theme=dark] .command-row.done-command{background:#94b799 !important}html[data-theme=dark] .command-row.done-command.selected-command{background:rgba(66,66,52,.5411764706) !important}html[data-theme=dark] .command-row.comment-command{background:#8b8b8b !important}html[data-theme=dark] .dashboard #context_menu .ant-menu .ant-menu-item:hover{background:gray}html[data-theme=dark] .dashboard .commands-view .command-row{border-bottom:1px solid rgba(233,233,233,.3490196078)}html[data-theme=dark] .dashboard .logs-screenshots .log-content li{border-bottom:1px solid #5c5c5c}html[data-theme=dark] .ant-select-selection-placeholder{color:#666}html[data-theme=dark] .ant-select-open{color:#f6f6f9}html[data-theme=dark] .ant-select-open .ant-select-selection-item{color:#f6f6f9}html[data-theme=dark] .ant-select-single.ant-select-sm.ant-select-open .ant-select-selection-item{color:#f6f6f9}html[data-theme=dark] .ant-select-single.ant-select-sm.ant-select-show-arrow .ant-select-selection-item,html[data-theme=dark] .ant-select-single.ant-select-sm.ant-select-show-arrow .ant-select-selection-placeholder{color:#f6f6f9}html[data-theme=dark] .ant-input-search .ant-input-group .ant-input-affix-wrapper{background-color:#23272f;border-color:#7b7b7b}html[data-theme=dark] .dashboard .commands-view .ant-tabs-content{border-color:#353b46}html[data-theme=dark] .ant-modal{background-color:rgba(0,0,0,0)}html[data-theme=dark] .ant-tabs .ant-tabs-tab-btn:hover{color:#7ea3e1}html[data-theme=dark] .header{border-bottom-color:#353b46}html[data-theme=dark] .ant-modal .ant-modal-content{background-color:#23272f}html[data-theme=dark] .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector{background:rgba(0,0,0,0);border-color:#353b46}html[data-theme=dark] .ant-table-wrapper .ant-table.ant-table-bordered>.ant-table-container{border-color:#353b46}html[data-theme=dark] .ant-table-wrapper .ant-table.ant-table-bordered>.ant-table-container>.ant-table-content>table th{border-inline-end-color:#353b46}html[data-theme=dark] .ant-table-wrapper .ant-table.ant-table-bordered>.ant-table-container>.ant-table-content>table td{border-inline-end-color:#353b46}html[data-theme=dark] .ant-tabs .ant-tabs-tab{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .ant-tabs-card>.ant-tabs-nav .ant-tabs-tab-active{color:#f6f6f9;background-color:#404755}html[data-theme=dark] .dashboard .dashboard .resize-handler{background:rgba(204,204,204,.2666666667)}html[data-theme=dark] .dashboard .dashboard .resize-handler:hover,html[data-theme=dark] .dashboard .dashboard .resize-handler.focused{background:rgba(170,170,170,.2666666667)}html[data-theme=dark] .sidebar-inner svg{fill:#f6f6f9;width:16px}html[data-theme=dark] .vision-type svg{fill:#f6f6f9;display:block;margin-right:10px;width:20px;height:20px}html[data-theme=dark] .content{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content div.header.normal{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .editor-wrapper{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .tabs-wrapper{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .ant-tabs{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .ant-form-item{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .ant-form-item .ant-form-item-label>label{color:#f6f6f9;background-color:#23272f}html[data-theme=dark] .content .ant-tabs-card .ant-tabs-nav .ant-tabs-tab{border-color:#353b46}html[data-theme=dark] .content .logs-screenshots .ant-tabs-content{border-color:#353b46}html[data-theme=dark] .content div.done-command{background-color:#819083 !important}html[data-theme=dark] .content div.selected-command{background-color:#424234 !important}html[data-theme=dark] .content .commands-view .command-row.footer-row{background-color:#424b5c}html[data-theme=dark] .file-root .file-node.selected>.tree-node-content{background-color:#8e8f74}html[data-theme=dark] .file-root .file-node.success>.tree-node-content{background:#6f8d73}html[data-theme=dark] .file-root .file-node.selected.success>.tree-node-content::after{border-color:#a1cba8}html[data-theme=dark] .file-root .tree-node.success>.tree-node-content{background:#6f8d73}html[data-theme=dark] .file-root .tree-node.selected>.tree-node-content{background-color:#8e8f74}html[data-theme=dark] .file-root .tree-node.selected.success>.tree-node-content::after{border-color:#a1cba8}html[data-theme=dark] .dashboard .commands-view .command-row:hover{background:#7e858a}html[data-theme=dark] .context-menu .ant-menu .ant-menu-item{color:#f6f6f9}html[data-theme=dark] .ant-menu-submenu-title:hover{color:#ececec}html[data-theme=dark] ::-webkit-scrollbar{width:12px;height:12px}html[data-theme=dark] ::-webkit-scrollbar-track{background-color:#3a3a3a}html[data-theme=dark] ::-webkit-scrollbar-thumb{background-color:#5a5a5a;border-radius:6px;border:2px solid #3a3a3a}html[data-theme=dark] ::-webkit-scrollbar-thumb:hover{background-color:#7a7a7a}html[data-theme=dark] ::-webkit-scrollbar-corner{background-color:#3a3a3a}html[data-theme=dark] .CodeMirror-scrollbar-filler{background-color:#23272f}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 59620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_antd_override_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18619);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_antd_override_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_antd_override_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_antd_override_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_antd_override_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 32121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_app_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38574);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_app_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_app_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_app_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_app_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 65733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dark_theme_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39550);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dark_theme_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dark_theme_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dark_theme_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_2_use_3_dark_theme_scss__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 77458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(96540);

function Browser (props) {
    return React.createElement("svg",props,React.createElement("g",null,[React.createElement("path",{"d":"M0 0 C1.37648864 -0.00302649 2.75297559 -0.00691846 4.12945962 -0.01159257 C7.88380264 -0.02181738 11.63804957 -0.01970492 15.39240026 -0.01541197 C19.45252845 -0.01293463 23.5126341 -0.02197144 27.57275391 -0.02944946 C35.51656415 -0.04217105 43.46034056 -0.04399329 51.40415928 -0.0416492 C57.8649659 -0.03986285 64.32576229 -0.04162247 70.78656769 -0.04587364 C72.16829182 -0.04676643 72.16829182 -0.04676643 73.57792957 -0.04767724 C75.44954473 -0.04888906 77.32115989 -0.05010319 79.19277504 -0.05131962 C96.72863997 -0.06218561 114.26448564 -0.06003727 131.80035165 -0.05393478 C147.82006223 -0.04876781 163.83971195 -0.06001694 179.85941049 -0.07903299 C196.33202768 -0.09843585 212.80461612 -0.10666302 229.27724481 -0.10290974 C238.5158617 -0.10100124 247.75442683 -0.10345088 256.99303436 -0.11762428 C264.85906382 -0.12957037 272.72500966 -0.130907 280.59104034 -0.11883412 C284.5990068 -0.1129677 288.60682055 -0.11178349 292.61477661 -0.12383652 C296.29386055 -0.13477128 299.97266569 -0.13150307 303.651737 -0.11757483 C305.59164664 -0.11371791 307.53156903 -0.12441268 309.47144866 -0.13587171 C321.17985594 -0.06475955 333.1335134 1.35074611 343.53570557 7.07319641 C344.2061792 7.4272052 344.87665283 7.78121399 345.56744385 8.14595032 C350.44190175 10.77266892 354.96768098 13.5484528 359.09820557 17.26069641 C359.89484619 17.95421204 360.69148682 18.64772766 361.51226807 19.36225891 C374.1578751 31.09096392 382.19052025 47.91784782 383.21357298 65.21078277 C383.41241525 70.80804298 383.39231034 76.40749309 383.38873291 82.00752258 C383.3947262 83.88776921 383.40153358 85.76801339 383.40908813 87.64825439 C383.42666496 92.72650392 383.43143974 97.80468594 383.43271971 102.88296294 C383.43414557 106.05924342 383.43842319 109.23550696 383.44371414 112.41178322 C383.46218055 123.50197558 383.47038822 134.59212004 383.46881104 145.68232727 C383.46760767 156.00769742 383.48875702 166.33285921 383.52029836 176.6581766 C383.54645772 185.53913929 383.55717861 194.42003383 383.55590022 203.30103475 C383.55539087 208.59858347 383.56106012 213.89594645 383.58225632 219.19345665 C383.60163516 224.17174954 383.60176555 229.14967922 383.58722305 234.127985 C383.58513406 235.95166683 383.58984124 237.77537141 383.60194397 239.59901428 C383.61742879 242.09430685 383.60806813 244.58835161 383.59268188 247.08361816 C383.60296901 247.79987419 383.61325614 248.51613021 383.62385499 249.25409096 C383.55092531 254.62975499 382.09407059 258.85617949 379.09820557 263.26069641 C373.86004706 267.42984298 369.77495135 268.80797066 363.09820557 268.26069641 C357.82581209 266.45077029 354.15299799 264.02617259 351.09820557 259.26069641 C340.76756075 228.26876198 350.09820557 193.92906371 350.09820557 161.26069641 C220.07820557 161.26069641 90.05820557 161.26069641 -43.90179443 161.26069641 C-43.81929443 199.43757141 -43.73679443 237.61444641 -43.65179443 276.94819641 C-43.63600342 288.99408264 -43.6202124 301.03996887 -43.60394287 313.45088196 C-43.57071513 324.26684714 -43.57071513 324.26684714 -43.53222656 335.08279419 C-43.51524995 339.89308809 -43.5093616 344.70325716 -43.51025391 349.51358032 C-43.51102736 355.65848959 -43.49265714 361.80306766 -43.46070528 367.94789088 C-43.45221665 370.19738769 -43.45032823 372.44692195 -43.45597029 374.6964277 C-43.60550468 396.66026705 -43.60550468 396.66026705 -32.90179443 415.26069641 C-32.377146 415.81370422 -31.85249756 416.36671204 -31.31195068 416.93647766 C-23.75352365 424.10364494 -14.09470629 426.38561183 -3.9384613 426.38526917 C-3.24971336 426.38667931 -2.56096541 426.38808946 -1.85134631 426.38954234 C0.44997361 426.39318396 2.75123147 426.38986372 5.05255127 426.38667297 C6.70531258 426.38806834 8.35807353 426.38996805 10.01083374 426.39233398 C13.56737365 426.39682597 17.12390204 426.39868696 20.68044472 426.39879608 C26.30769898 426.39993782 31.93488785 426.41278631 37.56211853 426.42835999 C38.51247665 426.43093284 39.46283477 426.43350569 40.44199163 426.43615651 C42.38516304 426.44142291 44.3283344 426.44670839 46.27150571 426.45201254 C59.36926684 426.48710255 72.46694624 426.51367391 85.5647583 426.51118469 C94.40403053 426.50959513 103.24307927 426.5256532 112.08227986 426.56189132 C116.75732827 426.58033411 121.43200357 426.58970871 126.10708046 426.57741547 C130.50596145 426.56596016 134.90417475 426.57772564 139.30296707 426.60704994 C140.91376858 426.61367766 142.52463146 426.61184573 144.1354084 426.60075188 C160.0800029 426.50008105 160.0800029 426.50008105 166.09820557 432.26069641 C169.72914666 436.75443539 169.6005465 440.79613449 169.44976807 446.38179016 C168.81528066 451.577537 166.30990827 454.13987141 162.59820557 457.57319641 C158.25519164 460.50473081 154.44227503 460.38862045 149.26426697 460.40113831 C148.2337098 460.40559499 148.2337098 460.40559499 147.18233329 460.41014171 C144.88043395 460.41881201 142.57858673 460.42033559 140.27667236 460.42182922 C138.62556345 460.4264589 136.9744556 460.43148377 135.323349 460.43687439 C130.83511894 460.44999357 126.34690384 460.45644343 121.8586576 460.46088505 C119.04971412 460.46381902 116.2407747 460.46792464 113.43183327 460.47238922 C104.62988164 460.48606832 95.82793931 460.49573065 87.02597779 460.49959111 C76.89212819 460.50406076 66.75841422 460.5215559 56.62460583 460.55059171 C48.77721914 460.57228874 40.92987036 460.5822998 33.08245403 460.58363223 C28.40331703 460.58467534 23.72430745 460.59047606 19.04520226 460.60845184 C14.63336543 460.62506973 10.22174985 460.62702233 5.80989265 460.61831284 C4.20201393 460.6175495 2.59412265 460.62179071 0.98627472 460.63177109 C-12.20888624 460.70878444 -25.52076838 459.94979981 -37.33929443 453.44819641 C-38.34500488 452.91718323 -38.34500488 452.91718323 -39.37103271 452.3754425 C-44.24549062 449.7487239 -48.77126985 446.97294003 -52.90179443 443.26069641 C-53.69843506 442.56718079 -54.49507568 441.87366516 -55.31585693 441.15913391 C-68.41264208 429.0119646 -76.05449763 411.90420908 -77.08581412 394.08035326 C-77.16106428 390.50508452 -77.17324007 386.9349503 -77.16249084 383.35890198 C-77.16551734 381.98241334 -77.1694093 380.60592639 -77.17408341 379.22944236 C-77.18430823 375.47509934 -77.18219577 371.72085241 -77.17790282 367.96650171 C-77.17542547 363.90637353 -77.18446229 359.84626788 -77.19194031 355.78614807 C-77.2046619 347.84233782 -77.20648413 339.89856142 -77.20414004 331.9547427 C-77.2023537 325.49393608 -77.20411331 319.03313969 -77.20836449 312.57233429 C-77.20895968 311.65118487 -77.20955486 310.73003545 -77.21016809 309.78097241 C-77.2113799 307.90935725 -77.21259404 306.03774209 -77.21381047 304.16612694 C-77.22467645 286.63026201 -77.22252811 269.09441633 -77.21642562 251.55855033 C-77.21125865 235.53883975 -77.22250778 219.51919003 -77.24152384 203.49949148 C-77.2609267 187.02687429 -77.26915386 170.55428586 -77.26540059 154.08165717 C-77.26349208 144.84304028 -77.26594173 135.60447515 -77.28011513 126.36586761 C-77.29206122 118.49983815 -77.29339784 110.63389231 -77.28132496 102.76786163 C-77.27545854 98.75989518 -77.27427434 94.75208142 -77.28632736 90.74412537 C-77.29726213 87.06504143 -77.29399392 83.38623629 -77.28006568 79.70716497 C-77.27620875 77.76725533 -77.28690353 75.82733295 -77.29836255 73.88745332 C-77.2272504 62.17904604 -75.81174473 50.22538857 -70.08929443 39.82319641 C-69.73528564 39.15272278 -69.38127686 38.48224915 -69.01654053 37.79145813 C-66.38982192 32.91700022 -63.61403805 28.391221 -59.90179443 24.26069641 C-59.20827881 23.46405579 -58.51476318 22.66741516 -57.80023193 21.84663391 C-42.44165293 5.28738423 -21.97055106 -0.06604118 0 0 Z M-37.17523193 48.82319641 C-52.12329959 69.92635076 -43.90179443 111.71626595 -43.90179443 128.26069641 C86.11820557 128.26069641 216.13820557 128.26069641 350.09820557 128.26069641 C354.81059987 84.06032282 354.81059987 84.06032282 339.05914307 44.06538391 C331.60474012 36.92706872 322.80558778 33.14219709 312.48021507 33.12926865 C311.32889733 33.1254275 310.17757958 33.12158636 308.99137342 33.11762881 C307.72583305 33.1184953 306.46029267 33.11936178 305.15640259 33.12025452 C303.79889232 33.11767059 302.4413828 33.11465735 301.08387434 33.11125112 C297.3496947 33.10318089 293.61553428 33.10139153 289.88134694 33.10065365 C285.85527992 33.0988031 281.82922288 33.09125569 277.80316162 33.08451843 C268.99722414 33.07093378 260.1912912 33.06491001 251.38534498 33.06050777 C245.88623553 33.05774522 240.38712783 33.0535078 234.88801956 33.0490036 C219.66129097 33.03681009 204.43456379 33.02651137 189.20783043 33.02312851 C188.23317482 33.02290894 187.25851921 33.02268938 186.25432859 33.02246316 C184.78884982 33.02213574 184.78884982 33.02213574 183.29376543 33.02180171 C181.31402802 33.02135824 179.33429062 33.02091168 177.35455322 33.02046204 C176.37253546 33.02024061 175.39051769 33.02001918 174.37874182 33.01979104 C158.47160898 33.01584424 142.56452198 32.99839418 126.65740685 32.97510251 C110.32403087 32.95137989 93.99067787 32.93892622 77.65728438 32.93776059 C68.48746407 32.93684427 59.31770347 32.93110291 50.14789963 32.91294098 C42.33828962 32.89752761 34.52875778 32.89242678 26.71913545 32.90067908 C22.7361358 32.90458139 18.75329348 32.9036766 14.77031326 32.88962173 C11.11959018 32.87685743 7.46914225 32.87810232 3.81841941 32.89021245 C1.88143463 32.89308577 -0.05555503 32.88125275 -1.99250185 32.86879039 C-16.81871671 32.95251399 -27.50872042 37.42364498 -37.17523193 48.82319641 Z ","transform":"translate(102.90179443359375,25.739303588867188)","key":0}),React.createElement("path",{"d":"M0 0 C1.22916274 0.71365767 2.45882822 1.42645007 3.68896484 2.13842773 C6.21177697 3.60018848 8.73178989 5.06659906 11.24951172 6.53710938 C15.77579577 9.17935265 20.3185633 11.79277704 24.86108398 14.40698242 C28.07842438 16.25916748 31.29347663 18.11526253 34.5078125 19.97265625 C40.98260022 23.71401656 47.45986343 27.45107483 53.9375 31.1875 C56.1041775 32.43748122 58.27084417 33.68748121 60.4375 34.9375 C61.51 35.55625 62.5825 36.175 63.6875 36.8125 C66.9375 38.6875 70.1875 40.5625 73.4375 42.4375 C74.51136963 43.0569751 75.58523926 43.6764502 76.69165039 44.31469727 C78.84471037 45.55697806 80.99754478 46.79964988 83.15014648 48.04272461 C88.17851461 50.94586112 93.20889814 53.84528867 98.24771118 56.73025513 C100.02182545 57.74627184 101.79519919 58.76356928 103.56835938 59.78125 C105.78565314 61.05332292 108.00431075 62.32302285 110.22460938 63.58984375 C134.16712139 77.34112697 134.16712139 77.34112697 137.9375 88.6875 C140.08249605 97.78620875 139.20836372 105.29095774 134.9375 113.6875 C126.30844737 126.80365999 110.43121458 129.62852607 96.25 134 C94.46919788 134.5546867 92.68859712 135.11002033 90.90820312 135.66601562 C86.58691957 137.01397592 82.2630097 138.35316646 77.9375 139.6875 C79.26520924 142.46628287 80.74109341 144.99396109 82.484375 147.53125 C82.99282959 148.2732666 83.50128418 149.0152832 84.02514648 149.77978516 C84.84801147 150.971604 84.84801147 150.971604 85.6875 152.1875 C86.25734619 153.01685059 86.82719238 153.84620117 87.41430664 154.70068359 C92.26448889 161.74576651 97.16483604 168.75578463 102.09082031 175.74804688 C104.85193098 179.67387384 107.59161295 183.61338213 110.28515625 187.5859375 C110.77121338 188.30185059 111.25727051 189.01776367 111.75805664 189.75537109 C114.4632319 194.18690846 114.41111124 198.65860975 113.9375 203.6875 C111.91497266 209.3292868 108.80182485 212.17996061 103.5625 214.9375 C97.55762139 216.6531796 93.28826949 215.77997169 87.91967773 212.98095703 C84.67431252 210.86321532 82.75734068 208.12298119 80.625 204.9375 C80.16262939 204.2777417 79.70025879 203.6179834 79.22387695 202.93823242 C77.77773067 200.86605091 76.35657933 198.77828343 74.9375 196.6875 C74.05333592 195.4066865 73.16794432 194.12671939 72.28125 192.84765625 C70.48822132 190.25486414 68.70585388 187.65514936 66.9296875 185.05078125 C63.41011821 179.90151406 59.83005526 174.79481616 56.25 169.6875 C55.62504639 168.79587158 55.00009277 167.90424316 54.35620117 166.9855957 C52.88384223 164.88584974 51.41098163 162.78645822 49.9375 160.6875 C46.06618579 161.97793807 45.24916149 163.6455592 42.875 166.9375 C42.07375371 168.03446605 41.27163927 169.1307984 40.46875 170.2265625 C40.05367188 170.79665039 39.63859375 171.36673828 39.2109375 171.95410156 C35.54989242 176.93750265 31.72810272 181.80251359 27.9375 186.6875 C27.20015625 187.64527344 26.4628125 188.60304688 25.703125 189.58984375 C25.01734375 190.46769531 24.3315625 191.34554687 23.625 192.25 C23.03074219 193.01441406 22.43648438 193.77882813 21.82421875 194.56640625 C16.57795572 200.46437897 10.40511064 204.22233688 2.5234375 205.04296875 C-9.27251606 205.30818826 -14.99628525 203.08200507 -23.765625 195.33203125 C-30.58328714 187.48244406 -31.59444563 178.01005593 -33.27734375 168.1328125 C-33.57161473 166.46201522 -33.86701288 164.79141613 -34.16345215 163.1210022 C-34.95862413 158.62202655 -35.73839841 154.12051137 -36.51484299 149.61827087 C-37.32832207 144.91374044 -38.15407098 140.21136505 -38.97875977 135.50878906 C-39.99555003 129.7061685 -41.01070267 123.9032777 -42.01939392 118.09924316 C-44.12376305 105.99648538 -46.27439416 93.90306209 -48.46818352 81.81620407 C-49.38391961 76.76326362 -50.29179297 71.70890449 -51.19956303 66.65452766 C-51.91421788 62.67849876 -52.63324973 58.7033733 -53.36276245 54.7300415 C-54.04579004 51.00815823 -54.71528873 47.28407452 -55.37519836 43.55802536 C-55.72849772 41.58275319 -56.09564015 39.60997185 -56.46350098 37.63735962 C-58.61175733 25.37716326 -60.44357754 12.45005415 -53.9609375 1.25 C-38.95690894 -19.00235131 -18.00582711 -10.58508628 0 0 Z M-24.0625 25.6875 C-22.44712485 39.70347678 -19.88025448 53.5633669 -17.41727209 67.44954562 C-16.80375839 70.91242117 -16.19384777 74.37593135 -15.58352661 77.83937073 C-14.4315336 84.37356056 -13.27638187 90.90718767 -12.12004483 97.44060999 C-10.80193441 104.8889863 -9.48742178 112.33799617 -8.17318511 119.7870568 C-5.47357713 135.0879043 -2.76953619 150.38796485 -0.0625 165.6875 C3.33717244 164.10111202 5.00051729 162.66194304 7.22265625 159.609375 C8.13422485 158.3726001 8.13422485 158.3726001 9.06420898 157.11083984 C10.02242554 155.78753662 10.02242554 155.78753662 11 154.4375 C12.34510379 152.61105765 13.69146562 150.78554116 15.0390625 148.9609375 C15.70067383 148.06213867 16.36228516 147.16333984 17.04394531 146.23730469 C21.21448622 140.62137777 25.58090669 135.1593812 29.9375 129.6875 C30.71222656 128.70652344 31.48695313 127.72554688 32.28515625 126.71484375 C37.68456276 119.90434007 40.85981028 116.40419533 49.3125 113.76171875 C50.57030273 113.3566082 50.57030273 113.3566082 51.85351562 112.9433136 C54.54550185 112.07857716 57.24135082 111.22665686 59.9375 110.375 C61.690371 109.81398408 63.44297808 109.25214282 65.1953125 108.68945312 C70.438607 107.00910243 75.68736429 105.34633334 80.9375 103.6875 C81.85354004 103.39780334 82.76958008 103.10810669 83.71337891 102.80963135 C89.12061839 101.09970961 94.5286863 99.39243535 99.9375 97.6875 C97.16012654 94.69864732 94.49821009 92.67699092 90.921875 90.7265625 C89.93082764 90.18016113 88.93978027 89.63375977 87.91870117 89.07080078 C86.31925659 88.20044189 86.31925659 88.20044189 84.6875 87.3125 C82.40655029 86.05389717 80.12662627 84.79343395 77.84765625 83.53125 C77.26772415 83.21060577 76.68779205 82.88996155 76.09028625 82.55960083 C70.38383285 79.39730463 64.74981951 76.11715246 59.125 72.8125 C50.42934531 67.71103007 41.69728128 62.67768486 32.9375 57.6875 C24.01736562 52.60392004 15.11683328 47.48872895 6.25 42.3125 C4.78506104 41.45760986 4.78506104 41.45760986 3.29052734 40.58544922 C-1.2372335 37.93867554 -5.75666592 35.27900654 -10.26171875 32.59375 C-11.05682861 32.12114746 -11.85193848 31.64854492 -12.67114258 31.16162109 C-14.138194 30.28831224 -15.6030328 29.41127116 -17.06518555 28.52978516 C-20.33617233 26.40209441 -20.33617233 26.40209441 -24.0625 25.6875 Z ","transform":"translate(347.0625,270.3125)","key":1}),React.createElement("path",{"d":"M0 0 C4.52966583 2.47551505 7.16586374 5.37259122 8.8125 10.3125 C9.33416057 15.28110315 9.3849051 19.16768979 7.125 23.6875 C3.97435815 27.26390426 0.600321 31.05176854 -4.359375 31.515625 C-9.73559462 31.61337445 -13.61459513 31.46998194 -18.1875 28.3125 C-22.07198797 24.21220714 -23.92820608 20.60292965 -24.5625 15 C-24.09585238 10.4112984 -22.85964573 7.07148176 -20.1875 3.3125 C-13.86626389 -1.71868793 -7.56870114 -3.50193635 0 0 Z ","transform":"translate(226.1875,91.6875)","key":2}),React.createElement("path",{"d":"M0 0 C3.68807589 2.6217409 5.39998447 6.08667215 6.796875 10.27734375 C7.38405152 16.2665443 6.10254574 20.37215491 2.796875 25.27734375 C-2.08429015 29.92040329 -6.17013106 30.63462388 -12.69921875 30.55859375 C-17.65359055 30.00209645 -20.34237806 27.25440784 -23.515625 23.65234375 C-26.84395604 18.96802599 -26.67930997 14.90498435 -26.203125 9.27734375 C-24.21468945 3.62600061 -21.06271824 0.78239283 -15.828125 -1.97265625 C-9.86887837 -3.67529814 -5.33117953 -2.90321986 0 0 Z ","transform":"translate(175.203125,92.72265625)","key":3}),React.createElement("path",{"d":"M0 0 C3.88446678 2.58964452 6.69907021 5.64814041 8.8125 9.875 C9.40770744 15.47845293 9.93404174 21.08849855 6.6875 25.9375 C3.49455924 29.58403402 0.35074826 31.49532925 -4.51171875 32.22265625 C-10.13248446 32.55835282 -13.81056369 31.53832972 -18.49609375 28.45703125 C-21.49471499 25.65231623 -23.01256463 23.0459638 -23.62109375 18.97265625 C-23.62905637 12.78570231 -23.58727589 8.63151447 -19.1875 3.875 C-13.37010796 -1.37484159 -7.3959011 -2.61031804 0 0 Z ","transform":"translate(119.1875,91.125)","key":4})]));
}

Browser.defaultProps = {"version":"1.1","width":"512","height":"512","x":"0px","y":"0px","viewBox":"0 0 512 512","xmlSpace":"preserve"};

module.exports = Browser;

Browser.default = Browser;


/***/ }),

/***/ 61533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(96540);

function Computer (props) {
    return React.createElement("svg",props,[React.createElement("g",{"key":0},React.createElement("g",null,React.createElement("g",null,[React.createElement("path",{"d":"M381.299,209.457c-0.578-2.01-1.785-3.783-3.442-5.062c-14.076-10.851-28.529-16.818-42.853-18.164\n\t\t\t\tc0,0-1.908-0.307-6.504-0.307c-4.598,0-6.941,0.299-6.941,0.299c-13.812,1.629-27.643,7.711-41.215,18.172\n\t\t\t\tc-1.658,1.277-2.864,3.053-3.442,5.062c-6.662,23.091-8.439,45.242-5.597,69.711c2.513,21.63,8.472,43.341,15.425,67.442\n\t\t\t\tc0.579,2.011,1.786,3.785,3.442,5.062c10.658,8.217,24.482,12.739,38.926,12.739c14.444,0,28.271-4.522,38.929-12.737\n\t\t\t\tc1.657-1.277,2.864-3.054,3.444-5.063c6.953-24.104,12.912-45.812,15.425-67.441\n\t\t\t\tC389.738,254.699,387.961,232.546,381.299,209.457z M337.701,249.556c0,4.751-3.853,8.602-8.603,8.602s-8.6-3.851-8.6-8.602\n\t\t\t\tv-35.875c0-4.75,3.85-8.603,8.6-8.603s8.603,3.853,8.603,8.603V249.556z","key":0}),React.createElement("path",{"d":"M263.645,341.357h-15.51l-12.8-43.521h26.126c-0.816-4.665-1.514-9.327-2.059-14.008\n\t\t\t\tc-1.648-14.195-1.847-27.68-0.576-40.992H30V50.857h310v123.237c10.1,1.013,20.131,3.962,30,8.795V35.857c0-8.284-6.717-15-15-15\n\t\t\t\tH15c-8.284,0-15,6.716-15,15v246.979c0,8.285,6.716,15,15,15h119.664l-12.799,43.521h-15.508c-3.938,0-7.131,3.192-7.131,7.13\n\t\t\t\tv11.726c0,3.938,3.193,7.131,7.131,7.131h157.288c3.938,0,7.13-3.192,7.13-7.131v-11.726\n\t\t\t\tC270.773,344.549,267.582,341.357,263.645,341.357z","key":1})]))),React.createElement("g",{"key":1}),React.createElement("g",{"key":2}),React.createElement("g",{"key":3}),React.createElement("g",{"key":4}),React.createElement("g",{"key":5}),React.createElement("g",{"key":6}),React.createElement("g",{"key":7}),React.createElement("g",{"key":8}),React.createElement("g",{"key":9}),React.createElement("g",{"key":10}),React.createElement("g",{"key":11}),React.createElement("g",{"key":12}),React.createElement("g",{"key":13}),React.createElement("g",{"key":14}),React.createElement("g",{"key":15})]);
}

Computer.defaultProps = {"version":"1.1","id":"Capa_1","x":"0px","y":"0px","width":"388.2px","height":"388.201px","viewBox":"0 0 388.2 388.201","style":{"enableBackground":"new 0 0 388.2 388.201"},"xmlSpace":"preserve"};

module.exports = Computer;

Computer.default = Computer;


/***/ })

}]);