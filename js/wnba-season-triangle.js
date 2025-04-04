// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
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
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

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

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"hZBy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;
exports.selectAll = selectAll;
exports.find = find;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.hasClass = hasClass;
exports.jumpTo = jumpTo;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// DOM helper functions
// public
function select(selector) {
  return document.querySelector(selector);
}

function selectAll(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return _toConsumableArray(parent.querySelectorAll(selector));
}

function find(el, selector) {
  return _toConsumableArray(el.querySelectorAll(selector));
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp("(^|\\b)".concat(className.split(' ').join('|'), "(\\b|$)"), 'gi'), ' ');
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);else el.className = "".concat(el.className, " ").concat(className);
}

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  return new RegExp("(^| )".concat(className, "( |$)"), 'gi').test(el.className);
}

function jumpTo(el, offset) {
  offset = offset || 0;
  var top = el.getBoundingClientRect().top + offset;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var destY = scrollTop + top;
  window.scrollTo(0, destY);
}
},{}],"U9xJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linkFix;

var _dom = require("./dom");

/**
 * Fixes target blanks links
 */
function linkFix() {
  var links = (0, _dom.selectAll)("[target='_blank']");
  links.forEach(function (link) {
    return link.setAttribute("rel", "noopener");
  });
}
},{"./dom":"hZBy"}],"PLxb":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

exports.default = function () {};

module.exports = exports["default"];
},{}],"km9A":[function(require,module,exports) {
/* eslint max-len: 0 */
// TODO: eventually deprecate this console.trace("use the `babel-register` package instead of `babel-core/register`");
module.exports = require("babel-register");

},{"babel-register":"PLxb"}],"QiIT":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"kOQz":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"BI7s":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"jVdc":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"BI7s"}],"DcE6":[function(require,module,exports) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"tZ11":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"AIrJ":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"tZ11"}],"cz6Q":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"tZ11","./_global":"QiIT"}],"kIpn":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"jVdc","./_fails":"BI7s","./_dom-create":"cz6Q"}],"S7GM":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"tZ11"}],"gGgn":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"AIrJ","./_ie8-dom-define":"kIpn","./_to-primitive":"S7GM","./_descriptors":"jVdc"}],"zQQJ":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"nCfi":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"gGgn","./_property-desc":"zQQJ","./_descriptors":"jVdc"}],"jLFM":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"dG4y":[function(require,module,exports) {
module.exports = false;

},{}],"k492":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"DcE6","./_global":"QiIT","./_library":"dG4y"}],"it4f":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"k492"}],"jDrK":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"QiIT","./_hide":"nCfi","./_has":"kOQz","./_uid":"jLFM","./_function-to-string":"it4f","./_core":"DcE6"}],"QKlW":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"W8bf":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"QKlW"}],"Vobs":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"QiIT","./_core":"DcE6","./_hide":"nCfi","./_redefine":"jDrK","./_ctx":"W8bf"}],"nxhn":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"jLFM","./_is-object":"tZ11","./_has":"kOQz","./_object-dp":"gGgn","./_fails":"BI7s"}],"I5XL":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"k492","./_uid":"jLFM","./_global":"QiIT"}],"IBDH":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"gGgn","./_has":"kOQz","./_wks":"I5XL"}],"Jnk4":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"I5XL"}],"ZenZ":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"QiIT","./_core":"DcE6","./_library":"dG4y","./_wks-ext":"Jnk4","./_object-dp":"gGgn"}],"DrRY":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"sUp0":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"DrRY"}],"V0RG":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"zakI":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"sUp0","./_defined":"V0RG"}],"ubM9":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"KLzx":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"ubM9"}],"tPLG":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"ubM9"}],"ntLR":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"zakI","./_to-length":"KLzx","./_to-absolute-index":"tPLG"}],"UE8F":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"k492","./_uid":"jLFM"}],"tBLI":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"kOQz","./_to-iobject":"zakI","./_array-includes":"ntLR","./_shared-key":"UE8F"}],"qGBL":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"huXi":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"tBLI","./_enum-bug-keys":"qGBL"}],"vSss":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"NRj4":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"BDXu":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"huXi","./_object-gops":"vSss","./_object-pie":"NRj4"}],"JI5q":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"DrRY"}],"XMZs":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"V0RG"}],"L4n9":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"gGgn","./_an-object":"AIrJ","./_object-keys":"huXi","./_descriptors":"jVdc"}],"HDWL":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"QiIT"}],"EH8e":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"AIrJ","./_object-dps":"L4n9","./_enum-bug-keys":"qGBL","./_shared-key":"UE8F","./_dom-create":"cz6Q","./_html":"HDWL"}],"HNVq":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"tBLI","./_enum-bug-keys":"qGBL"}],"NpQ8":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"zakI","./_object-gopn":"HNVq"}],"EGJe":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"NRj4","./_property-desc":"zQQJ","./_to-iobject":"zakI","./_to-primitive":"S7GM","./_has":"kOQz","./_ie8-dom-define":"kIpn","./_descriptors":"jVdc"}],"rGq9":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"QiIT","./_has":"kOQz","./_descriptors":"jVdc","./_export":"Vobs","./_redefine":"jDrK","./_meta":"nxhn","./_fails":"BI7s","./_shared":"k492","./_set-to-string-tag":"IBDH","./_uid":"jLFM","./_wks":"I5XL","./_wks-ext":"Jnk4","./_wks-define":"ZenZ","./_enum-keys":"BDXu","./_is-array":"JI5q","./_an-object":"AIrJ","./_is-object":"tZ11","./_to-object":"XMZs","./_to-iobject":"zakI","./_to-primitive":"S7GM","./_property-desc":"zQQJ","./_object-create":"EH8e","./_object-gopn-ext":"NpQ8","./_object-gopd":"EGJe","./_object-gops":"vSss","./_object-dp":"gGgn","./_object-keys":"huXi","./_object-gopn":"HNVq","./_object-pie":"NRj4","./_library":"dG4y","./_hide":"nCfi"}],"v5CS":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":"Vobs","./_object-create":"EH8e"}],"pS46":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"Vobs","./_descriptors":"jVdc","./_object-dp":"gGgn"}],"sbXv":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_export":"Vobs","./_descriptors":"jVdc","./_object-dps":"L4n9"}],"gG9K":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"Vobs","./_core":"DcE6","./_fails":"BI7s"}],"xCvV":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"zakI","./_object-gopd":"EGJe","./_object-sap":"gG9K"}],"dlIw":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"kOQz","./_to-object":"XMZs","./_shared-key":"UE8F"}],"Dkc5":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"XMZs","./_object-gpo":"dlIw","./_object-sap":"gG9K"}],"RpZ9":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"XMZs","./_object-keys":"huXi","./_object-sap":"gG9K"}],"mVnl":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"gG9K","./_object-gopn-ext":"NpQ8"}],"bkZb":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"tZ11","./_meta":"nxhn","./_object-sap":"gG9K"}],"LEG2":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"tZ11","./_meta":"nxhn","./_object-sap":"gG9K"}],"OeTo":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"tZ11","./_meta":"nxhn","./_object-sap":"gG9K"}],"Lm2M":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"tZ11","./_object-sap":"gG9K"}],"Lrni":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"tZ11","./_object-sap":"gG9K"}],"ypI7":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"tZ11","./_object-sap":"gG9K"}],"v89L":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"jVdc","./_object-keys":"huXi","./_object-gops":"vSss","./_object-pie":"NRj4","./_to-object":"XMZs","./_iobject":"sUp0","./_fails":"BI7s"}],"av62":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"Vobs","./_object-assign":"v89L"}],"wc34":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"OI80":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"Vobs","./_same-value":"wc34"}],"IC1x":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"tZ11","./_an-object":"AIrJ","./_ctx":"W8bf","./_object-gopd":"EGJe"}],"xZ9m":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"Vobs","./_set-proto":"IC1x"}],"pLtw":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"DrRY","./_wks":"I5XL"}],"zmtK":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"pLtw","./_wks":"I5XL","./_redefine":"jDrK"}],"Grvq":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"s1yo":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"QKlW","./_is-object":"tZ11","./_invoke":"Grvq"}],"qI6I":[function(require,module,exports) {
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_export":"Vobs","./_bind":"s1yo"}],"z3jV":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"gGgn","./_descriptors":"jVdc"}],"owRX":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"tZ11","./_object-gpo":"dlIw","./_wks":"I5XL","./_object-dp":"gGgn"}],"Pm3s":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"JIX2":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"Vobs","./_defined":"V0RG","./_fails":"BI7s","./_string-ws":"Pm3s"}],"UD3M":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"QiIT","./_string-trim":"JIX2","./_string-ws":"Pm3s"}],"nPGY":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"Vobs","./_parse-int":"UD3M"}],"tlHn":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"QiIT","./_string-trim":"JIX2","./_string-ws":"Pm3s"}],"yexh":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":"Vobs","./_parse-float":"tlHn"}],"IxAU":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"tZ11","./_set-proto":"IC1x"}],"F74v":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"QiIT","./_has":"kOQz","./_cof":"DrRY","./_inherit-if-required":"IxAU","./_to-primitive":"S7GM","./_fails":"BI7s","./_object-gopn":"HNVq","./_object-gopd":"EGJe","./_object-dp":"gGgn","./_string-trim":"JIX2","./_object-create":"EH8e","./_descriptors":"jVdc","./_redefine":"jDrK"}],"Kwjt":[function(require,module,exports) {
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":"DrRY"}],"Lz3r":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"ubM9","./_defined":"V0RG"}],"qGBb":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_export":"Vobs","./_to-integer":"ubM9","./_a-number-value":"Kwjt","./_string-repeat":"Lz3r","./_fails":"BI7s"}],"bLBB":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_export":"Vobs","./_fails":"BI7s","./_a-number-value":"Kwjt"}],"oSwj":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"Vobs"}],"Iwqp":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"Vobs","./_global":"QiIT"}],"tjYZ":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"tZ11"}],"XPnJ":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"Vobs","./_is-integer":"tjYZ"}],"PMgb":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"Vobs"}],"EvBV":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"Vobs","./_is-integer":"tjYZ"}],"fOC8":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"Vobs"}],"yvVo":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"Vobs"}],"a09l":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"Vobs","./_parse-float":"tlHn"}],"fCj1":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"Vobs","./_parse-int":"UD3M"}],"rR7R":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"o78V":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"Vobs","./_math-log1p":"rR7R"}],"xkGF":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"Vobs"}],"Pmrp":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"Vobs"}],"ZIrZ":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"Giui":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"Vobs","./_math-sign":"ZIrZ"}],"HsTu":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"Vobs"}],"xEUq":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"Vobs"}],"sm22":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"aBEU":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"Vobs","./_math-expm1":"sm22"}],"lqkS":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"ZIrZ"}],"IjCR":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"Vobs","./_math-fround":"lqkS"}],"HXfT":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"Vobs"}],"m2OX":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"Vobs","./_fails":"BI7s"}],"E567":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"Vobs"}],"ymfv":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"Vobs","./_math-log1p":"rR7R"}],"hUIM":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"Vobs"}],"d1Y4":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"Vobs","./_math-sign":"ZIrZ"}],"dhHM":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"Vobs","./_math-expm1":"sm22","./_fails":"BI7s"}],"cxv8":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"Vobs","./_math-expm1":"sm22"}],"xO7u":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"Vobs"}],"DdG0":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"Vobs","./_to-absolute-index":"tPLG"}],"KDcE":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"Vobs","./_to-iobject":"zakI","./_to-length":"KLzx"}],"DDrZ":[function(require,module,exports) {
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":"JIX2"}],"j93N":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"ubM9","./_defined":"V0RG"}],"H5RD":[function(require,module,exports) {
module.exports = {};

},{}],"gj4O":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"EH8e","./_property-desc":"zQQJ","./_set-to-string-tag":"IBDH","./_hide":"nCfi","./_wks":"I5XL"}],"MKcl":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"dG4y","./_export":"Vobs","./_redefine":"jDrK","./_hide":"nCfi","./_iterators":"H5RD","./_iter-create":"gj4O","./_set-to-string-tag":"IBDH","./_object-gpo":"dlIw","./_wks":"I5XL"}],"WN4F":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"j93N","./_iter-define":"MKcl"}],"gGid":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"Vobs","./_string-at":"j93N"}],"r5g1":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"tZ11","./_cof":"DrRY","./_wks":"I5XL"}],"dpxX":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"r5g1","./_defined":"V0RG"}],"Z7lT":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"I5XL"}],"PmIB":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"Vobs","./_to-length":"KLzx","./_string-context":"dpxX","./_fails-is-regexp":"Z7lT"}],"qgIv":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"Vobs","./_string-context":"dpxX","./_fails-is-regexp":"Z7lT"}],"ZAbm":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"Vobs","./_string-repeat":"Lz3r"}],"U3MC":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"Vobs","./_to-length":"KLzx","./_string-context":"dpxX","./_fails-is-regexp":"Z7lT"}],"OaTR":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"Vobs","./_fails":"BI7s","./_defined":"V0RG"}],"eRhq":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"OaTR"}],"HLSM":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"OaTR"}],"RtH9":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"OaTR"}],"efe7":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"OaTR"}],"v3Ez":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"OaTR"}],"RECM":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"OaTR"}],"l7OI":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"OaTR"}],"uJlj":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"OaTR"}],"vYww":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"OaTR"}],"AiXZ":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"OaTR"}],"MhVl":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"OaTR"}],"DFMN":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"OaTR"}],"X3LC":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"OaTR"}],"Sydr":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"Vobs"}],"GNUn":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"Vobs","./_to-object":"XMZs","./_to-primitive":"S7GM","./_fails":"BI7s"}],"wk7G":[function(require,module,exports) {
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":"BI7s"}],"fPZl":[function(require,module,exports) {
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_export":"Vobs","./_date-to-iso-string":"wk7G"}],"FKfL":[function(require,module,exports) {
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":"jDrK"}],"EnIA":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"AIrJ","./_to-primitive":"S7GM"}],"nktC":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"I5XL","./_hide":"nCfi","./_date-to-primitive":"EnIA"}],"XjkF":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"Vobs","./_is-array":"JI5q"}],"RG8K":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"AIrJ"}],"TuHS":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"H5RD","./_wks":"I5XL"}],"g07e":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"gGgn","./_property-desc":"zQQJ"}],"um4Z":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"pLtw","./_wks":"I5XL","./_iterators":"H5RD","./_core":"DcE6"}],"zP7t":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"I5XL"}],"WZRw":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"W8bf","./_export":"Vobs","./_to-object":"XMZs","./_iter-call":"RG8K","./_is-array-iter":"TuHS","./_to-length":"KLzx","./_create-property":"g07e","./core.get-iterator-method":"um4Z","./_iter-detect":"zP7t"}],"URTo":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"Vobs","./_create-property":"g07e","./_fails":"BI7s"}],"TiCE":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"BI7s"}],"BTDR":[function(require,module,exports) {
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":"Vobs","./_to-iobject":"zakI","./_iobject":"sUp0","./_strict-method":"TiCE"}],"Ui7t":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_export":"Vobs","./_html":"HDWL","./_cof":"DrRY","./_to-absolute-index":"tPLG","./_to-length":"KLzx","./_fails":"BI7s"}],"TqUy":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"Vobs","./_a-function":"QKlW","./_to-object":"XMZs","./_fails":"BI7s","./_strict-method":"TiCE"}],"TVdo":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"tZ11","./_is-array":"JI5q","./_wks":"I5XL"}],"M6RC":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"TVdo"}],"tMyS":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"W8bf","./_iobject":"sUp0","./_to-object":"XMZs","./_to-length":"KLzx","./_array-species-create":"M6RC"}],"vDWP":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-methods":"tMyS","./_strict-method":"TiCE"}],"O0lf":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-methods":"tMyS","./_strict-method":"TiCE"}],"PXKF":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-methods":"tMyS","./_strict-method":"TiCE"}],"wD6H":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-methods":"tMyS","./_strict-method":"TiCE"}],"n6bP":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-methods":"tMyS","./_strict-method":"TiCE"}],"fXgB":[function(require,module,exports) {
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":"QKlW","./_to-object":"XMZs","./_iobject":"sUp0","./_to-length":"KLzx"}],"OWmJ":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_export":"Vobs","./_array-reduce":"fXgB","./_strict-method":"TiCE"}],"k5ri":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_export":"Vobs","./_array-reduce":"fXgB","./_strict-method":"TiCE"}],"HB9A":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_export":"Vobs","./_array-includes":"ntLR","./_strict-method":"TiCE"}],"tgt4":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":"Vobs","./_to-iobject":"zakI","./_to-integer":"ubM9","./_to-length":"KLzx","./_strict-method":"TiCE"}],"QXjR":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"XMZs","./_to-absolute-index":"tPLG","./_to-length":"KLzx"}],"ke6T":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"I5XL","./_hide":"nCfi"}],"c9DC":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"Vobs","./_array-copy-within":"QXjR","./_add-to-unscopables":"ke6T"}],"hOOH":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"XMZs","./_to-absolute-index":"tPLG","./_to-length":"KLzx"}],"ZBH0":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"Vobs","./_array-fill":"hOOH","./_add-to-unscopables":"ke6T"}],"wTIB":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"Vobs","./_array-methods":"tMyS","./_add-to-unscopables":"ke6T"}],"ksrS":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"Vobs","./_array-methods":"tMyS","./_add-to-unscopables":"ke6T"}],"YBdf":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"QiIT","./_object-dp":"gGgn","./_descriptors":"jVdc","./_wks":"I5XL"}],"Adki":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"YBdf"}],"PECj":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"ZCkT":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"ke6T","./_iter-step":"PECj","./_iterators":"H5RD","./_to-iobject":"zakI","./_iter-define":"MKcl"}],"BaNd":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"AIrJ"}],"lK2M":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"QiIT","./_inherit-if-required":"IxAU","./_object-dp":"gGgn","./_object-gopn":"HNVq","./_is-regexp":"r5g1","./_flags":"BaNd","./_descriptors":"jVdc","./_fails":"BI7s","./_wks":"I5XL","./_redefine":"jDrK","./_set-species":"YBdf"}],"N1Dl":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"BaNd"}],"f98m":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"N1Dl","./_export":"Vobs"}],"S072":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"jVdc","./_object-dp":"gGgn","./_flags":"BaNd"}],"jkaB":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"S072","./_an-object":"AIrJ","./_flags":"BaNd","./_descriptors":"jVdc","./_redefine":"jDrK","./_fails":"BI7s"}],"Js7k":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"j93N"}],"DcMJ":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"pLtw"}],"SCKl":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"f98m","./_redefine":"jDrK","./_hide":"nCfi","./_fails":"BI7s","./_defined":"V0RG","./_wks":"I5XL","./_regexp-exec":"N1Dl"}],"Iomp":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"AIrJ","./_to-length":"KLzx","./_advance-string-index":"Js7k","./_regexp-exec-abstract":"DcMJ","./_fix-re-wks":"SCKl"}],"weWA":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"AIrJ","./_to-object":"XMZs","./_to-length":"KLzx","./_to-integer":"ubM9","./_advance-string-index":"Js7k","./_regexp-exec-abstract":"DcMJ","./_fix-re-wks":"SCKl"}],"EA9T":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"AIrJ","./_same-value":"wc34","./_regexp-exec-abstract":"DcMJ","./_fix-re-wks":"SCKl"}],"othv":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"AIrJ","./_a-function":"QKlW","./_wks":"I5XL"}],"d289":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"r5g1","./_an-object":"AIrJ","./_species-constructor":"othv","./_advance-string-index":"Js7k","./_to-length":"KLzx","./_regexp-exec-abstract":"DcMJ","./_regexp-exec":"N1Dl","./_fails":"BI7s","./_fix-re-wks":"SCKl"}],"Qz2Q":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"L3cZ":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"W8bf","./_iter-call":"RG8K","./_is-array-iter":"TuHS","./_an-object":"AIrJ","./_to-length":"KLzx","./core.get-iterator-method":"um4Z"}],"fNEO":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"W8bf","./_invoke":"Grvq","./_html":"HDWL","./_dom-create":"cz6Q","./_global":"QiIT","./_cof":"DrRY"}],"m7QH":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"QiIT","./_task":"fNEO","./_cof":"DrRY"}],"hTzn":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"QKlW"}],"X7pO":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"KrKR":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"QiIT"}],"FQFX":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"AIrJ","./_is-object":"tZ11","./_new-promise-capability":"hTzn"}],"lGTj":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"jDrK"}],"MWl4":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"dG4y","./_global":"QiIT","./_ctx":"W8bf","./_classof":"pLtw","./_export":"Vobs","./_is-object":"tZ11","./_a-function":"QKlW","./_an-instance":"Qz2Q","./_for-of":"L3cZ","./_species-constructor":"othv","./_task":"fNEO","./_microtask":"m7QH","./_new-promise-capability":"hTzn","./_perform":"X7pO","./_user-agent":"KrKR","./_promise-resolve":"FQFX","./_wks":"I5XL","./_redefine-all":"lGTj","./_set-to-string-tag":"IBDH","./_set-species":"YBdf","./_core":"DcE6","./_iter-detect":"zP7t"}],"yRub":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"tZ11"}],"I9w7":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"gGgn","./_object-create":"EH8e","./_redefine-all":"lGTj","./_ctx":"W8bf","./_an-instance":"Qz2Q","./_for-of":"L3cZ","./_iter-define":"MKcl","./_iter-step":"PECj","./_set-species":"YBdf","./_descriptors":"jVdc","./_meta":"nxhn","./_validate-collection":"yRub"}],"J5Ss":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"QiIT","./_export":"Vobs","./_redefine":"jDrK","./_redefine-all":"lGTj","./_meta":"nxhn","./_for-of":"L3cZ","./_an-instance":"Qz2Q","./_is-object":"tZ11","./_fails":"BI7s","./_iter-detect":"zP7t","./_set-to-string-tag":"IBDH","./_inherit-if-required":"IxAU"}],"ksBa":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"I9w7","./_validate-collection":"yRub","./_collection":"J5Ss"}],"jPMF":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"I9w7","./_validate-collection":"yRub","./_collection":"J5Ss"}],"y1p1":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"lGTj","./_meta":"nxhn","./_an-object":"AIrJ","./_is-object":"tZ11","./_an-instance":"Qz2Q","./_for-of":"L3cZ","./_array-methods":"tMyS","./_has":"kOQz","./_validate-collection":"yRub"}],"Y0Wb":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"QiIT","./_array-methods":"tMyS","./_redefine":"jDrK","./_meta":"nxhn","./_object-assign":"v89L","./_collection-weak":"y1p1","./_is-object":"tZ11","./_validate-collection":"yRub","./_collection":"J5Ss"}],"oeIc":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"y1p1","./_validate-collection":"yRub","./_collection":"J5Ss"}],"zl6z":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"QiIT","./_hide":"nCfi","./_uid":"jLFM"}],"dyWK":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"ubM9","./_to-length":"KLzx"}],"hFSM":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"QiIT","./_descriptors":"jVdc","./_library":"dG4y","./_typed":"zl6z","./_hide":"nCfi","./_redefine-all":"lGTj","./_fails":"BI7s","./_an-instance":"Qz2Q","./_to-integer":"ubM9","./_to-length":"KLzx","./_to-index":"dyWK","./_object-gopn":"HNVq","./_object-dp":"gGgn","./_array-fill":"hOOH","./_set-to-string-tag":"IBDH"}],"VqD6":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"Vobs","./_typed":"zl6z","./_typed-buffer":"hFSM","./_an-object":"AIrJ","./_to-absolute-index":"tPLG","./_to-length":"KLzx","./_is-object":"tZ11","./_global":"QiIT","./_species-constructor":"othv","./_fails":"BI7s","./_set-species":"YBdf"}],"q3b2":[function(require,module,exports) {
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":"Vobs","./_typed":"zl6z","./_typed-buffer":"hFSM"}],"sXGm":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"jVdc","./_library":"dG4y","./_global":"QiIT","./_fails":"BI7s","./_export":"Vobs","./_typed":"zl6z","./_typed-buffer":"hFSM","./_ctx":"W8bf","./_an-instance":"Qz2Q","./_property-desc":"zQQJ","./_hide":"nCfi","./_redefine-all":"lGTj","./_to-integer":"ubM9","./_to-length":"KLzx","./_to-index":"dyWK","./_to-absolute-index":"tPLG","./_to-primitive":"S7GM","./_has":"kOQz","./_classof":"pLtw","./_is-object":"tZ11","./_to-object":"XMZs","./_is-array-iter":"TuHS","./_object-create":"EH8e","./_object-gpo":"dlIw","./_object-gopn":"HNVq","./core.get-iterator-method":"um4Z","./_uid":"jLFM","./_wks":"I5XL","./_array-methods":"tMyS","./_array-includes":"ntLR","./_species-constructor":"othv","./es6.array.iterator":"ZCkT","./_iterators":"H5RD","./_iter-detect":"zP7t","./_set-species":"YBdf","./_array-fill":"hOOH","./_array-copy-within":"QXjR","./_object-dp":"gGgn","./_object-gopd":"EGJe"}],"FrGE":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"jLcZ":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"dFjM":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"sXGm"}],"XAXm":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"Vod2":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"Mnlj":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"JJCv":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"Asas":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"ZKGF":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"sXGm"}],"sL26":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"Vobs","./_a-function":"QKlW","./_an-object":"AIrJ","./_global":"QiIT","./_fails":"BI7s"}],"n0sj":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"Vobs","./_object-create":"EH8e","./_a-function":"QKlW","./_an-object":"AIrJ","./_is-object":"tZ11","./_fails":"BI7s","./_bind":"s1yo","./_global":"QiIT"}],"XoPA":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"gGgn","./_export":"Vobs","./_an-object":"AIrJ","./_to-primitive":"S7GM","./_fails":"BI7s"}],"YgqD":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"Vobs","./_object-gopd":"EGJe","./_an-object":"AIrJ"}],"CKoQ":[function(require,module,exports) {
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_export":"Vobs","./_an-object":"AIrJ","./_iter-create":"gj4O"}],"Jr0s":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"EGJe","./_object-gpo":"dlIw","./_has":"kOQz","./_export":"Vobs","./_is-object":"tZ11","./_an-object":"AIrJ"}],"rsHl":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"EGJe","./_export":"Vobs","./_an-object":"AIrJ"}],"mTTK":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"Vobs","./_object-gpo":"dlIw","./_an-object":"AIrJ"}],"VxVc":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"Vobs"}],"lQ3X":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"Vobs","./_an-object":"AIrJ"}],"yE4E":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"HNVq","./_object-gops":"vSss","./_an-object":"AIrJ","./_global":"QiIT"}],"vOF6":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"Vobs","./_own-keys":"yE4E"}],"hWQ0":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"Vobs","./_an-object":"AIrJ"}],"AiN1":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"gGgn","./_object-gopd":"EGJe","./_object-gpo":"dlIw","./_has":"kOQz","./_export":"Vobs","./_property-desc":"zQQJ","./_an-object":"AIrJ","./_is-object":"tZ11"}],"EPEE":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"Vobs","./_set-proto":"IC1x"}],"gMo0":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"Vobs","./_array-includes":"ntLR","./_add-to-unscopables":"ke6T"}],"M1I7":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"JI5q","./_is-object":"tZ11","./_to-length":"KLzx","./_ctx":"W8bf","./_wks":"I5XL"}],"zKV8":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"Vobs","./_flatten-into-array":"M1I7","./_to-object":"XMZs","./_to-length":"KLzx","./_a-function":"QKlW","./_array-species-create":"M6RC","./_add-to-unscopables":"ke6T"}],"GDMJ":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_export":"Vobs","./_flatten-into-array":"M1I7","./_to-object":"XMZs","./_to-length":"KLzx","./_to-integer":"ubM9","./_array-species-create":"M6RC","./_add-to-unscopables":"ke6T"}],"K4uP":[function(require,module,exports) {
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"Vobs","./_string-at":"j93N"}],"m0x4":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"KLzx","./_string-repeat":"Lz3r","./_defined":"V0RG"}],"hmYY":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"Vobs","./_string-pad":"m0x4","./_user-agent":"KrKR"}],"RIKd":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"Vobs","./_string-pad":"m0x4","./_user-agent":"KrKR"}],"hNft":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"JIX2"}],"uLyC":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"JIX2"}],"dRqM":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_export":"Vobs","./_defined":"V0RG","./_to-length":"KLzx","./_is-regexp":"r5g1","./_flags":"BaNd","./_iter-create":"gj4O"}],"enid":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"ZenZ"}],"Oxke":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"ZenZ"}],"ovdg":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"Vobs","./_own-keys":"yE4E","./_to-iobject":"zakI","./_object-gopd":"EGJe","./_create-property":"g07e"}],"HVWH":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"jVdc","./_object-keys":"huXi","./_to-iobject":"zakI","./_object-pie":"NRj4"}],"exYH":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"Vobs","./_object-to-array":"HVWH"}],"jLAB":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"Vobs","./_object-to-array":"HVWH"}],"Se8n":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"dG4y","./_fails":"BI7s","./_global":"QiIT"}],"y7i0":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"Vobs","./_to-object":"XMZs","./_a-function":"QKlW","./_object-dp":"gGgn","./_descriptors":"jVdc","./_object-forced-pam":"Se8n"}],"vFGQ":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"Vobs","./_to-object":"XMZs","./_a-function":"QKlW","./_object-dp":"gGgn","./_descriptors":"jVdc","./_object-forced-pam":"Se8n"}],"urEd":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"Vobs","./_to-object":"XMZs","./_to-primitive":"S7GM","./_object-gpo":"dlIw","./_object-gopd":"EGJe","./_descriptors":"jVdc","./_object-forced-pam":"Se8n"}],"qicQ":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"Vobs","./_to-object":"XMZs","./_to-primitive":"S7GM","./_object-gpo":"dlIw","./_object-gopd":"EGJe","./_descriptors":"jVdc","./_object-forced-pam":"Se8n"}],"VUTp":[function(require,module,exports) {
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"L3cZ"}],"NEML":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_classof":"pLtw","./_array-from-iterable":"VUTp"}],"gCox":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_export":"Vobs","./_collection-to-json":"NEML"}],"CwpA":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_export":"Vobs","./_collection-to-json":"NEML"}],"rIFj":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"Vobs"}],"bPOJ":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":"rIFj"}],"swmI":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":"rIFj"}],"Kb3C":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":"rIFj"}],"HgXJ":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":"rIFj"}],"sb9z":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"Vobs","./_a-function":"QKlW","./_ctx":"W8bf","./_for-of":"L3cZ"}],"mnJw":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":"sb9z"}],"Wc9c":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":"sb9z"}],"RABC":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":"sb9z"}],"irWo":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":"sb9z"}],"DjhA":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":"Vobs","./_global":"QiIT"}],"zQTI":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":"Vobs","./_global":"QiIT"}],"sx2w":[function(require,module,exports) {
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_export":"Vobs","./_cof":"DrRY"}],"duUS":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":"Vobs"}],"Nayo":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":"Vobs"}],"pK3L":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":"Vobs"}],"ZVag":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],"cNya":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":"Vobs","./_math-scale":"ZVag","./_math-fround":"lqkS"}],"JpQg":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":"Vobs"}],"kYRl":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":"Vobs"}],"iMz3":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":"Vobs"}],"Xbc5":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":"Vobs"}],"YSH8":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":"Vobs"}],"gu1X":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":"Vobs","./_math-scale":"ZVag"}],"dDqv":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":"Vobs"}],"Q8U8":[function(require,module,exports) {
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":"Vobs"}],"q6pY":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"Vobs","./_core":"DcE6","./_global":"QiIT","./_species-constructor":"othv","./_promise-resolve":"FQFX"}],"aULC":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"Vobs","./_new-promise-capability":"hTzn","./_perform":"X7pO"}],"Qewb":[function(require,module,exports) {
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./es6.map":"ksBa","./_export":"Vobs","./_shared":"k492","./es6.weak-map":"Y0Wb"}],"zkDQ":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ"}],"fy5i":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ"}],"KBrn":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ","./_object-gpo":"dlIw"}],"y0Gk":[function(require,module,exports) {
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./es6.set":"jPMF","./_array-from-iterable":"VUTp","./_metadata":"Qewb","./_an-object":"AIrJ","./_object-gpo":"dlIw"}],"sn4U":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ"}],"bQoJ":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ"}],"jR0d":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ","./_object-gpo":"dlIw"}],"tWeA":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ"}],"rYHV":[function(require,module,exports) {
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_metadata":"Qewb","./_an-object":"AIrJ","./_a-function":"QKlW"}],"kvVj":[function(require,module,exports) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_export":"Vobs","./_microtask":"m7QH","./_global":"QiIT","./_cof":"DrRY"}],"iOLx":[function(require,module,exports) {

'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_export":"Vobs","./_global":"QiIT","./_core":"DcE6","./_microtask":"m7QH","./_wks":"I5XL","./_a-function":"QKlW","./_an-object":"AIrJ","./_an-instance":"Qz2Q","./_redefine-all":"lGTj","./_hide":"nCfi","./_for-of":"L3cZ","./_set-species":"YBdf"}],"pUQh":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"QiIT","./_export":"Vobs","./_user-agent":"KrKR"}],"uORE":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"Vobs","./_task":"fNEO"}],"kCWy":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"ZCkT","./_object-keys":"huXi","./_redefine":"jDrK","./_global":"QiIT","./_hide":"nCfi","./_iterators":"H5RD","./_wks":"I5XL"}],"y1LN":[function(require,module,exports) {
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.exec');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/es6.symbol":"rGq9","./modules/es6.object.create":"v5CS","./modules/es6.object.define-property":"pS46","./modules/es6.object.define-properties":"sbXv","./modules/es6.object.get-own-property-descriptor":"xCvV","./modules/es6.object.get-prototype-of":"Dkc5","./modules/es6.object.keys":"RpZ9","./modules/es6.object.get-own-property-names":"mVnl","./modules/es6.object.freeze":"bkZb","./modules/es6.object.seal":"LEG2","./modules/es6.object.prevent-extensions":"OeTo","./modules/es6.object.is-frozen":"Lm2M","./modules/es6.object.is-sealed":"Lrni","./modules/es6.object.is-extensible":"ypI7","./modules/es6.object.assign":"av62","./modules/es6.object.is":"OI80","./modules/es6.object.set-prototype-of":"xZ9m","./modules/es6.object.to-string":"zmtK","./modules/es6.function.bind":"qI6I","./modules/es6.function.name":"z3jV","./modules/es6.function.has-instance":"owRX","./modules/es6.parse-int":"nPGY","./modules/es6.parse-float":"yexh","./modules/es6.number.constructor":"F74v","./modules/es6.number.to-fixed":"qGBb","./modules/es6.number.to-precision":"bLBB","./modules/es6.number.epsilon":"oSwj","./modules/es6.number.is-finite":"Iwqp","./modules/es6.number.is-integer":"XPnJ","./modules/es6.number.is-nan":"PMgb","./modules/es6.number.is-safe-integer":"EvBV","./modules/es6.number.max-safe-integer":"fOC8","./modules/es6.number.min-safe-integer":"yvVo","./modules/es6.number.parse-float":"a09l","./modules/es6.number.parse-int":"fCj1","./modules/es6.math.acosh":"o78V","./modules/es6.math.asinh":"xkGF","./modules/es6.math.atanh":"Pmrp","./modules/es6.math.cbrt":"Giui","./modules/es6.math.clz32":"HsTu","./modules/es6.math.cosh":"xEUq","./modules/es6.math.expm1":"aBEU","./modules/es6.math.fround":"IjCR","./modules/es6.math.hypot":"HXfT","./modules/es6.math.imul":"m2OX","./modules/es6.math.log10":"E567","./modules/es6.math.log1p":"ymfv","./modules/es6.math.log2":"hUIM","./modules/es6.math.sign":"d1Y4","./modules/es6.math.sinh":"dhHM","./modules/es6.math.tanh":"cxv8","./modules/es6.math.trunc":"xO7u","./modules/es6.string.from-code-point":"DdG0","./modules/es6.string.raw":"KDcE","./modules/es6.string.trim":"DDrZ","./modules/es6.string.iterator":"WN4F","./modules/es6.string.code-point-at":"gGid","./modules/es6.string.ends-with":"PmIB","./modules/es6.string.includes":"qgIv","./modules/es6.string.repeat":"ZAbm","./modules/es6.string.starts-with":"U3MC","./modules/es6.string.anchor":"eRhq","./modules/es6.string.big":"HLSM","./modules/es6.string.blink":"RtH9","./modules/es6.string.bold":"efe7","./modules/es6.string.fixed":"v3Ez","./modules/es6.string.fontcolor":"RECM","./modules/es6.string.fontsize":"l7OI","./modules/es6.string.italics":"uJlj","./modules/es6.string.link":"vYww","./modules/es6.string.small":"AiXZ","./modules/es6.string.strike":"MhVl","./modules/es6.string.sub":"DFMN","./modules/es6.string.sup":"X3LC","./modules/es6.date.now":"Sydr","./modules/es6.date.to-json":"GNUn","./modules/es6.date.to-iso-string":"fPZl","./modules/es6.date.to-string":"FKfL","./modules/es6.date.to-primitive":"nktC","./modules/es6.array.is-array":"XjkF","./modules/es6.array.from":"WZRw","./modules/es6.array.of":"URTo","./modules/es6.array.join":"BTDR","./modules/es6.array.slice":"Ui7t","./modules/es6.array.sort":"TqUy","./modules/es6.array.for-each":"vDWP","./modules/es6.array.map":"O0lf","./modules/es6.array.filter":"PXKF","./modules/es6.array.some":"wD6H","./modules/es6.array.every":"n6bP","./modules/es6.array.reduce":"OWmJ","./modules/es6.array.reduce-right":"k5ri","./modules/es6.array.index-of":"HB9A","./modules/es6.array.last-index-of":"tgt4","./modules/es6.array.copy-within":"c9DC","./modules/es6.array.fill":"ZBH0","./modules/es6.array.find":"wTIB","./modules/es6.array.find-index":"ksrS","./modules/es6.array.species":"Adki","./modules/es6.array.iterator":"ZCkT","./modules/es6.regexp.constructor":"lK2M","./modules/es6.regexp.exec":"f98m","./modules/es6.regexp.to-string":"jkaB","./modules/es6.regexp.flags":"S072","./modules/es6.regexp.match":"Iomp","./modules/es6.regexp.replace":"weWA","./modules/es6.regexp.search":"EA9T","./modules/es6.regexp.split":"d289","./modules/es6.promise":"MWl4","./modules/es6.map":"ksBa","./modules/es6.set":"jPMF","./modules/es6.weak-map":"Y0Wb","./modules/es6.weak-set":"oeIc","./modules/es6.typed.array-buffer":"VqD6","./modules/es6.typed.data-view":"q3b2","./modules/es6.typed.int8-array":"FrGE","./modules/es6.typed.uint8-array":"jLcZ","./modules/es6.typed.uint8-clamped-array":"dFjM","./modules/es6.typed.int16-array":"XAXm","./modules/es6.typed.uint16-array":"Vod2","./modules/es6.typed.int32-array":"Mnlj","./modules/es6.typed.uint32-array":"JJCv","./modules/es6.typed.float32-array":"Asas","./modules/es6.typed.float64-array":"ZKGF","./modules/es6.reflect.apply":"sL26","./modules/es6.reflect.construct":"n0sj","./modules/es6.reflect.define-property":"XoPA","./modules/es6.reflect.delete-property":"YgqD","./modules/es6.reflect.enumerate":"CKoQ","./modules/es6.reflect.get":"Jr0s","./modules/es6.reflect.get-own-property-descriptor":"rsHl","./modules/es6.reflect.get-prototype-of":"mTTK","./modules/es6.reflect.has":"VxVc","./modules/es6.reflect.is-extensible":"lQ3X","./modules/es6.reflect.own-keys":"vOF6","./modules/es6.reflect.prevent-extensions":"hWQ0","./modules/es6.reflect.set":"AiN1","./modules/es6.reflect.set-prototype-of":"EPEE","./modules/es7.array.includes":"gMo0","./modules/es7.array.flat-map":"zKV8","./modules/es7.array.flatten":"GDMJ","./modules/es7.string.at":"K4uP","./modules/es7.string.pad-start":"hmYY","./modules/es7.string.pad-end":"RIKd","./modules/es7.string.trim-left":"hNft","./modules/es7.string.trim-right":"uLyC","./modules/es7.string.match-all":"dRqM","./modules/es7.symbol.async-iterator":"enid","./modules/es7.symbol.observable":"Oxke","./modules/es7.object.get-own-property-descriptors":"ovdg","./modules/es7.object.values":"exYH","./modules/es7.object.entries":"jLAB","./modules/es7.object.define-getter":"y7i0","./modules/es7.object.define-setter":"vFGQ","./modules/es7.object.lookup-getter":"urEd","./modules/es7.object.lookup-setter":"qicQ","./modules/es7.map.to-json":"gCox","./modules/es7.set.to-json":"CwpA","./modules/es7.map.of":"bPOJ","./modules/es7.set.of":"swmI","./modules/es7.weak-map.of":"Kb3C","./modules/es7.weak-set.of":"HgXJ","./modules/es7.map.from":"mnJw","./modules/es7.set.from":"Wc9c","./modules/es7.weak-map.from":"RABC","./modules/es7.weak-set.from":"irWo","./modules/es7.global":"DjhA","./modules/es7.system.global":"zQTI","./modules/es7.error.is-error":"sx2w","./modules/es7.math.clamp":"duUS","./modules/es7.math.deg-per-rad":"Nayo","./modules/es7.math.degrees":"pK3L","./modules/es7.math.fscale":"cNya","./modules/es7.math.iaddh":"JpQg","./modules/es7.math.isubh":"kYRl","./modules/es7.math.imulh":"iMz3","./modules/es7.math.rad-per-deg":"Xbc5","./modules/es7.math.radians":"YSH8","./modules/es7.math.scale":"gu1X","./modules/es7.math.umulh":"dDqv","./modules/es7.math.signbit":"Q8U8","./modules/es7.promise.finally":"q6pY","./modules/es7.promise.try":"aULC","./modules/es7.reflect.define-metadata":"zkDQ","./modules/es7.reflect.delete-metadata":"fy5i","./modules/es7.reflect.get-metadata":"KBrn","./modules/es7.reflect.get-metadata-keys":"y0Gk","./modules/es7.reflect.get-own-metadata":"sn4U","./modules/es7.reflect.get-own-metadata-keys":"bQoJ","./modules/es7.reflect.has-metadata":"jR0d","./modules/es7.reflect.has-own-metadata":"tWeA","./modules/es7.reflect.metadata":"rYHV","./modules/es7.asap":"kvVj","./modules/es7.observable":"iOLx","./modules/web.timers":"pUQh","./modules/web.immediate":"uORE","./modules/web.dom.iterable":"kCWy","./modules/_core":"DcE6"}],"DkPQ":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

},{}],"dUxS":[function(require,module,exports) {
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],"AoXz":[function(require,module,exports) {
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":"Vobs","./_replacer":"dUxS"}],"Rlym":[function(require,module,exports) {
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/core.regexp.escape":"AoXz","../../modules/_core":"DcE6"}],"zUFY":[function(require,module,exports) {
var global = arguments[3];

"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
},{"core-js/shim":"y1LN","regenerator-runtime/runtime":"DkPQ","core-js/fn/regexp/escape":"Rlym"}],"graphic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("babel-core/register");

require("babel-polyfill");

/* global d3 */
var NUM_GAMES, START_YEAR, END_YEAR, INTERVAL, GAME_TICK_INTERVAL, DEFAULT_TEAM, PADDING, BEST_WINS, MEDIOCRE_WINS, WORST_WINS, FONT_SIZE, IS_DEFAULT_CLICK;
var PATH_ID = '#paths-wrapper';
var NBA = 'NBA';
var WNBA = 'WNBA';
var LEAGUE = WNBA;

function resize() {
  drawExplanatoryGraph(LEAGUE);
  drawSeasonPaths(LEAGUE);
}

function init() {
  setConfig(LEAGUE); // drawRecordigamiBarChart(LEAGUE)
  // drawRecordigami(LEAGUE)

  drawExplanatoryGraph(LEAGUE);
  drawSeasonPaths(LEAGUE);
}

var teamAccessor = function teamAccessor(d) {
  return d.team;
};

var teamParentAccessor = function teamParentAccessor(d) {
  return d.parent;
};

var dateAccessor = function dateAccessor(d) {
  return new Date(d.date * 1000);
}; //convert to milliseconds


var yearAccessor = function yearAccessor(d) {
  return d.year;
};

var colorAccessor = function colorAccessor(d) {
  return d.primary_color;
};

var secondaryColorAccessor = function secondaryColorAccessor(d) {
  return d.secondary_color;
};

var winAccessor = function winAccessor(d) {
  return d.win;
};

var lossAccessor = function lossAccessor(d) {
  return d.loss;
};

var countAccessor = function countAccessor(d) {
  return d.count;
};

function setConfig(_x) {
  return _setConfig.apply(this, arguments);
}

function _setConfig() {
  _setConfig = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(league) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            IS_DEFAULT_CLICK = false;

            if (league == WNBA) {
              START_YEAR = 1997;
              END_YEAR = 2024;
              NUM_GAMES = 40;
              INTERVAL = 10;
              GAME_TICK_INTERVAL = 5;
              DEFAULT_TEAM = "Washington Mystics";
              PADDING = 2;
              BEST_WINS = 32;
              MEDIOCRE_WINS = 20;
              WORST_WINS = 8;
              FONT_SIZE = 15;
              if (_isMobile.default.any()) {
                PADDING = 1;
                FONT_SIZE = 10;
              }
            } else if (league == NBA) {
              START_YEAR = 1946;
              END_YEAR = 2023;
              NUM_GAMES = 82;
              INTERVAL = 10;
              GAME_TICK_INTERVAL = 10;
              DEFAULT_TEAM = "Atlanta Hawks";
              PADDING = 1;
              BEST_WINS = 73;
              MEDIOCRE_WINS = 41;
              WORST_WINS = 9;
              FONT_SIZE = 15;

              if (_isMobile.default.any()) {
                PADDING = 0.5;
                FONT_SIZE = 10;
              }
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setConfig.apply(this, arguments);
}

function drawBaseTiles(league) {
  var wrapperId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".wrapper-container";
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var shouldTranslate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  // 2. Define Dimensions
  d3.select(".".concat(extra, "svg")).remove();
  d3.select(".".concat(extra, "bounds")).remove(); // d3.select('.bounds-background').remove()

  var wrapperWidth = d3.select(wrapperId).node().offsetWidth;
  var wrapperHeight = d3.select(wrapperId).node().offsetHeight;
  var width = d3.min([1 * wrapperWidth, 1 * wrapperHeight]);
  if (_isMobile.default.any()) {
    width = d3.min([.9 * wrapperWidth, .9 * wrapperHeight]);
  }
  var dimensions = {
    width: width,
    height: width,
    margin: {
      top: 60,
      right: 60,
      bottom: 80,
      left: 90
    },
    legendWidth: width * 0.6,
    legendHeight: 20
  }; // on mobile

  if (_isMobile.default.any()) {
    if (extra === "") {
      dimensions['legendWidth'] = width * .85;
      dimensions['height'] = 1.5 * width;
      dimensions['margin'] = {
        top: 50,
        right: 0,
        bottom: .5 * width,
        left: 60
      };
    } else {
      dimensions['height'] = 1.5 * width;
      dimensions['margin'] = {
        top: 30,
        right: 0,
        bottom: .5 * width,
        left: 30
      };
    }
  }

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom; // 3. Draw Canvas

  var wrapper;
  var pathsWrapperWidth = d3.select("#".concat(extra, "paths-wrapper")).node().offsetWidth;
  wrapper = d3.select("#".concat(extra, "paths-wrapper")).append("svg").style("transform", "translate(".concat((pathsWrapperWidth - dimensions.width) / 2, "px, ", 0, "px)")).attr("width", dimensions.width).attr("height", dimensions.height).attr("class", "".concat(extra, "svg"));
  var bounds = wrapper.append("g").style("transform", "translate(".concat(dimensions.margin.left, "px, ").concat(dimensions.margin.top, "px)")).attr("class", "".concat(extra, "bounds"));
  var boundsBackground = bounds.append("rect").attr("class", "bounds-background").attr("x", 0).attr("width", dimensions.boundedWidth).attr("y", 0).attr("height", dimensions.boundedHeight); // 4. Create Scales

  var tileSize = dimensions.boundedWidth / NUM_GAMES - PADDING;
  var xScale = d3.scaleLinear().domain([0, NUM_GAMES]).range([0, dimensions.boundedWidth - tileSize]);
  var yScale = d3.scaleLinear().domain([0, NUM_GAMES]).range([dimensions.boundedHeight - tileSize, 0]);
  var yearIntervals = getIntervalArray(START_YEAR, END_YEAR, INTERVAL); // 5. Draw Data

  var defaultTileData = getEmptyWinLossData();
  var tilesGroup = bounds.append("g");
  var tiles = tilesGroup.selectAll(".rect-tile").data(defaultTileData, function (d) {
    return d[0];
  }).join("rect").attr("class", "rect-tile").attr("height", tileSize).attr("width", tileSize).attr("x", function (d) {
    return xScale(lossAccessor(d)) + PADDING / 2;
  }).attr("y", function (d) {
    return yScale(winAccessor(d)) + PADDING / 2;
  }).attr("id", function (d, i) {
    return "".concat(extra, "tile-").concat(i);
  }).attr("winPct", function (d) {
    var totalGames = lossAccessor(d) + winAccessor(d);

    if (totalGames > 0) {
      var winPct = 1.0 * winAccessor(d) / totalGames;
      return winPct;
    } else {
      return 0.5;
    }
  }).style("fill", "#d8d8d8").style("opacity", 0.5).attr("rx", 0).attr("ry", 0);
  var winLossGroup = bounds.append("g");
  var winsText = winLossGroup.append("text").text("Wins").attr("x", -12).attr("y", -10).attr("font-size", FONT_SIZE).attr("text-anchor", "middle").attr("fill", "#828282").attr("id", "".concat(extra, "wins-text")); // .attr("opacity", 0.5)

  var lossesText = winLossGroup.append("text").text("Losses").attr("id", "".concat(extra, "losses-text")).attr("x", dimensions.boundedWidth + 10).attr("y", dimensions.boundedHeight + 17).attr("font-size", FONT_SIZE).attr("text-anchor", "start").attr("alignment-baseline", "middle").attr("fill", "#828282"); // on desktop

  if (_isMobile.default.any()) {
    d3.select("#losses-text").remove();
    lossesText = winLossGroup.append("text").text("Losses").attr("x", dimensions.boundedWidth / 2).attr("y", dimensions.boundedHeight + 35).attr("font-size", FONT_SIZE).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "#828282");
  }

  var winLossIntervals = getIntervalArray(GAME_TICK_INTERVAL, NUM_GAMES, GAME_TICK_INTERVAL);
  var winLabels = winLossGroup.selectAll(".".concat(extra, "win-labels")).data(winLossIntervals).enter().append("text").text(function (d) {
    return d;
  }).attr("class", "".concat(extra, "win-labels")).attr("x", -15).attr("y", function (win) {
    return yScale(win - 0.5);
  }).attr("font-size", FONT_SIZE).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "#828282");
  var lossLabels = winLossGroup.selectAll(".loss-labels").data(winLossIntervals).enter().append("text").text(function (d) {
    return d;
  }).attr("class", "".concat(extra, "loss-labels")).attr("x", function (loss) {
    return xScale(loss + 0.5);
  }).attr("y", dimensions.boundedHeight + 17).attr("font-size", FONT_SIZE).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "#828282");
  var zeroLabel = bounds.append("text").text("0").attr("x", -12).attr("y", dimensions.boundedHeight + 17).attr("font-size", FONT_SIZE).attr("text-anchor", "start").attr("alignment-baseline", "middle").attr("fill", "#828282");
  return [wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale];
}

function substringMatcher(strs) {
  return function findMatches(q, cb) {
    // an array that will be populated with substring matches
    var matches = []; // regex used to determine if a string contains the substring `q`

    var substrRegex = new RegExp(q, 'i'); // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array

    for (var i = 0; i < strs.length; i++) {
      var str = strs[i];

      if (substrRegex.test(str)) {
        matches.push(str);
      }
    }

    cb(matches);
  };
}

;

function drawSeasonPaths(_x2) {
  return _drawSeasonPaths.apply(this, arguments);
}

function _drawSeasonPaths() {
  _drawSeasonPaths = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(league) {
    var _drawBaseTiles, _drawBaseTiles2, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale, seasonData, teamData, teams, suggestionGroup, onSuggestionClick;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            onSuggestionClick = function _ref(e, suggestionIndex) {
              var suggestionItem = d3.select(suggestionGroup.nodes()[suggestionIndex]);
              var suggestion = suggestionItem.attr("value");
              var suggestionDecade = parseInt(suggestionItem.attr("decade"));
              d3.select("#basketball-autocomplete").attr("autocomplete", "on");
              $("#basketball-autocomplete").val(suggestion);
              DEFAULT_TEAM = suggestion;
              d3.selectAll("#graphic-wrapper > *").remove();
              setConfig();
              d3.select("#basketball-team-input").property('value', suggestion);
              $('#basketball-team-input').typeahead('val', suggestion);
              IS_DEFAULT_CLICK = true;
              drawSeasonPathsByTeam(league, DEFAULT_TEAM, seasonData, teamData, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale, suggestionDecade); // d3.select(".pac-container").style("height", 0)
            };

            _drawBaseTiles = drawBaseTiles(league), _drawBaseTiles2 = _slicedToArray(_drawBaseTiles, 8), wrapper = _drawBaseTiles2[0], bounds = _drawBaseTiles2[1], dimensions = _drawBaseTiles2[2], tiles = _drawBaseTiles2[3], tilesGroup = _drawBaseTiles2[4], yearIntervals = _drawBaseTiles2[5], xScale = _drawBaseTiles2[6], yScale = _drawBaseTiles2[7];
            _context2.next = 4;
            return d3.json("/assets/data/".concat(league, "_season_paths.json"));

          case 4:
            seasonData = _context2.sent;
            _context2.next = 7;
            return d3.json("/assets/data/".concat(league, "_teams.json"));

          case 7:
            teamData = _context2.sent;
            teams = Object.keys(teamData); // bounds.on("mousemove", onMouseMove)
            // function onMouseMove(e) {
            //  const [x, y] = d3.mouse(this)
            //  const mouseLosses = Math.round(xScale.invert(x))
            //  const mouseWins = Math.round(yScale.invert(y))
            //  const mouseTotal = mouseLosses + mouseWins
            //  let timer;
            //     let fadeInBuffer = false;
            //  if (mouseLosses > 0 && mouseWins > 0 && mouseTotal <= NUM_GAMES) {
            //    if (!fadeInBuffer && timer) {
            //      clearTimeout(timer);
            //      timer = 0;
            //      d3.select('html').style("cursor", "none")
            //    } else {
            //      bounds.style("cursor", "default")
            //      fadeInBuffer = false;
            //    }
            //    timer = setTimeout(function() {
            //      bounds.style("cursor", "none")
            //      fadeInBuffer = true;
            //    }, 1000)
            //  } else {
            //    clearTimeout(timer);
            //    timer = 0;
            //    fadeInBuffer = false;
            //    bounds.style("cursor", "default")
            //  }
            // }

            $('#basketball-team-input').typeahead({
              hint: true,
              highlight: true,
              minLength: 0
            }, {
              name: 'teams',
              limit: 200,
              source: substringMatcher(teams)
            });
            suggestionGroup = d3.selectAll(".suggestion");
            suggestionGroup.on("click", onSuggestionClick); // d3.select("#autocomplete").on("keydown", onAutocompleteKeydown)

            d3.select("#nba-autocomplete").style("transform", "translate(".concat(dimensions.width / 4, "px, ").concat(dimensions.margin.top / 2, "px)"));
            drawSeasonPathsByTeam(league, "", seasonData, teamData, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale);
            d3.select(".typeahead").style("border", "1px solid #828282").style("border-radius", '30px');
            d3.select("#basketball-team-input").style("color", '#828282');
            d3.select("#nba-autocomplete").style("display", "block");
            d3.select("#basketball-team-input").property('value', "");
            $('#basketball-team-input').on('typeahead:selected', function (e, team) {
              drawSeasonPathsByTeam(league, team, seasonData, teamData, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale);
              DEFAULT_TEAM = team;
              d3.select("#basketball-team-input").property('value', DEFAULT_TEAM);
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _drawSeasonPaths.apply(this, arguments);
}

function highlightLine(lineId, animationTime, lineColor) {
  var lineIdString = "#".concat(lineId);
  d3.select(lineIdString).transition("highlight-line-".concat(lineIdString)).duration(animationTime).attr("stroke", lineColor).style("opacity", 1);
}

function fadeLine(lineId, animationTime) {
  var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var lineIdString = "#".concat(lineId);
  d3.select(lineIdString).transition("fade-line-".concat(lineIdString)).duration(animationTime).style("opacity", opacity);
}

function animateLine(lineId, animationTime, lineColor) {
  var lineIdString = "#".concat(lineId);
  var totalLength = d3.select(lineIdString).node().getTotalLength();
  d3.select(lineIdString).attr("stroke", lineColor).style("opacity", 1) // Set the line pattern to be an long line followed by an equally long gap
  .attr("stroke-dasharray", totalLength + " " + totalLength) // Set the intial starting position so that only the gap is shown by offesetting by the total length of the line
  .attr("stroke-dashoffset", totalLength) // Then the following lines transition the line so that the gap is hidden...
  .transition("draw-line-".concat(lineIdString)).duration(animationTime).style("fill-opacity", 1).ease(d3.easeSin).attr("stroke-dashoffset", 0).end();
}

function randomizeBetweenTwoNumbers(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

function drawSeasonPathsByTeam(_x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14) {
  return _drawSeasonPathsByTeam.apply(this, arguments);
}

function _drawSeasonPathsByTeam() {
  _drawSeasonPathsByTeam = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(league, team, seasonData, teamData, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale) {
    var decade,
        filterTeam,
        filteredCumulativeSeasons,
        seasonsData,
        seasons,
        seasonIntervals,
        seasonLineGenerator,
        primaryColor,
        secondaryColor,
        numTeamColors,
        primaryTeamColors,
        secondaryTeamColors,
        primaryTeamColorScale,
        secondaryTeamColorScale,
        fillerLegendGroup,
        legendGroup,
        legendTileWidth,
        legendY,
        legendX,
        legendXPadding,
        legendFontSize,
        legendXRange,
        legendXScale,
        grayColors,
        grayContinuousScale,
        firstYear,
        lastYear,
        fillerIntervals,
        fillerTiles,
        fillerLabels,
        legendTiles,
        bookendYears,
        bookendTiles,
        legendLabels,
        orderedTeamHistory,
        teamParent,
        logoShift,
        logoSize,
        logoY,
        logoFontSize,
        logoPadding,
        logoFade,
        logo,
        logoLabel,
        hoverPct,
        hoverFontSize,
        hoverFontSizeSmall,
        hoverGapY,
        hoverStartingPointX,
        hoverWin,
        hoverHyphen,
        hoverLoss,
        hoverWinPct,
        seasonLines,
        seasonLinesFormatted,
        seasonPathIds,
        i,
        season,
        seasonLineFormatted,
        seasonLine,
        seasonPathId,
        getWinPctFromWinsAndLosses,
        getRecordDataFromSeasons,
        recordData,
        recordFontSize,
        recordFontSizeSmall,
        recordSpacingX,
        recordSpacingY,
        recordStartingPointY,
        recordSectionSpacing,
        overallPct,
        overallStartingPointX,
        overallStartingPointY,
        overallSpacing,
        overallWins,
        overallLosses,
        overallWinPct,
        overallNumYears,
        overallWin,
        overallWinWidth,
        overallHyphen,
        overallLoss,
        overallLossWidth,
        overallWinPctLabel,
        overallWinBBox,
        overallMidpoint,
        overallText,
        overallTextBBox,
        bestPct,
        bestStartingPointX,
        bestStartingPointY,
        bestSpacing,
        bestWins,
        bestLosses,
        bestWinPct,
        bestYear,
        bestWin,
        bestWinWidth,
        bestText,
        bestHyphen,
        bestLoss,
        bestLossWidth,
        bestWinPctLabel,
        worstPct,
        worstStartingPointX,
        worstStartingPointY,
        worstSpacing,
        worstWins,
        worstLosses,
        worstWinPct,
        worstYear,
        worstWin,
        worstWinWidth,
        worstText,
        worstHyphen,
        worstLoss,
        worstLossWidth,
        worstWinPctLabel,
        xTransform,
        seasonPaths,
        championshipSeasons,
        seasonLabelPositionTaken,
        seasonLabels,
        championshipLabels,
        championshipStarSize,
        championshipStars,
        hoverSquare,
        legendFade,
        seasonFade,
        seasonSemiFade,
        intervalStart,
        intervalEnd,
        filteredRecordData,
        filteredSeasons,
        filteredSeasonLabels,
        filteredChampionshipStars,
        matchingSeasons,
        matchingSeasonLabels,
        matchingChampionshipStars,
        onLogoMouseClick,
        onSeasonPathMouseMove,
        onSeasonPathMouseEnter,
        onSeasonPathMouseLeave,
        allLegendsSelected,
        newLegendSelected,
        oldLegendTile,
        currentLegendTile,
        onLegendMouseClick,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            onLegendMouseClick = function _ref8(e) {
              var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
              var x, clickedYear;

              if (year !== null && IS_DEFAULT_CLICK) {
                clickedYear = year;
              } else {
                var _d3$mouse3 = d3.mouse(this);

                var _d3$mouse4 = _slicedToArray(_d3$mouse3, 1);

                x = _d3$mouse4[0];
                clickedYear = legendXScale.invert(x);
              }

              intervalStart = Math.floor(clickedYear / INTERVAL) * INTERVAL;
              intervalEnd = intervalStart + (INTERVAL - 1);
              var intervalYears = range(intervalStart, intervalEnd);
              filteredRecordData = getRecordDataFromSeasons(intervalYears, seasonsData);
              filteredSeasons = seasonPaths.filter(function (d) {
                return d >= intervalStart && d <= intervalEnd;
              });
              filteredSeasonLabels = seasonLabels.filter(function (d) {
                return d >= intervalStart && d <= intervalEnd;
              });
              filteredChampionshipStars = championshipStars.filter(function (d) {
                return d >= intervalStart && d <= intervalEnd;
              });
              var filteredLegendTiles = legendTiles.filter(function (d) {
                return d >= intervalStart && d <= intervalEnd;
              });
              var otherLegendTiles = legendTiles.filter(function (d) {
                return d < intervalStart || d > intervalEnd;
              });
              var filteredLegendLabels = legendLabels.filter(function (d) {
                return d >= intervalStart && d <= intervalEnd;
              });
              var otherLegendLabels = legendLabels.filter(function (d) {
                return d < intervalStart || d > intervalEnd;
              });
              currentLegendTile = filteredLegendTiles.data()[0];
              newLegendSelected = currentLegendTile !== oldLegendTile;

              if (currentLegendTile != null) {
                if (!allLegendsSelected && !newLegendSelected) {
                  drawVoronoi(seasons, seasonsData, seasonLinesFormatted, xScale, yScale, dimensions, bounds, onSeasonPathMouseEnter, onSeasonPathMouseLeave, onSeasonPathMouseMove);
                  seasonPaths.style("opacity", 1);
                  seasonLabels.style("opacity", 0);
                  legendTiles.style("opacity", 1).style("stroke-opacity", 0);
                  legendLabels.style("opacity", 1).style("stroke", function (d) {
                    return primaryTeamColorScale(d);
                  });
                  championshipStars.style("opacity", 1);
                  championshipLabels.style("opacity", 1);
                  filteredSeasons = {
                    '_groups': [[]]
                  };
                  filteredSeasonLabels = {
                    '_groups': [[]]
                  };
                  filteredChampionshipStars = {
                    '_groups': [[]]
                  };
                  d3.select('#overall-win').text(recordData['overall']['wins']);
                  d3.select('#overall-loss').text(recordData['overall']['losses']);
                  d3.select('#overall-win-pct').text(recordData['overall']['win_pct']);
                  d3.select('#overall-text').text(recordData['overall']['num_years'] > 1 ? "Overall (".concat(recordData['overall']['num_years'], " yrs.)") : "Overall (".concat(recordData['overall']['num_years'], " yr.)"));
                  d3.select('#best-win').text(recordData['best']['wins']);
                  d3.select('#best-loss').text(recordData['best']['losses']);
                  d3.select('#best-win-pct').text(recordData['best']['win_pct']);
                  d3.select('#best-text').text("Best (".concat(recordData['best']['year'], ")"));
                  d3.select('#worst-win').text(recordData['worst']['wins']);
                  d3.select('#worst-loss').text(recordData['worst']['losses']);
                  d3.select('#worst-win-pct').text(recordData['worst']['win_pct']);
                  d3.select('#worst-text').text("Worst (".concat(recordData['worst']['year'], ")"));
                  allLegendsSelected = true;
                } else {
                  drawVoronoi(intervalYears, seasonsData, seasonLinesFormatted, xScale, yScale, dimensions, bounds, onSeasonPathMouseEnter, onSeasonPathMouseLeave, onSeasonPathMouseMove);
                  seasonPaths.style("opacity", seasonFade);
                  seasonLabels.style("opacity", 0);
                  championshipStars.style("opacity", seasonFade);
                  otherLegendTiles.style("opacity", legendFade);
                  otherLegendLabels.style("opacity", legendFade).style("stroke", function (d) {
                    return primaryTeamColorScale(d);
                  });
                  filteredSeasons.style("opacity", 1);
                  filteredLegendTiles.style("opacity", 1); //.style("stroke-opacity", 1).style("stroke", d => secondaryTeamColorScale(d))

                  filteredLegendLabels.style("opacity", 1).style("stroke", function (d) {
                    return secondaryTeamColorScale(d);
                  });
                  filteredSeasonLabels.style("opacity", 1);
                  filteredChampionshipStars.style("opacity", 1);
                  d3.select('#overall-win').text(filteredRecordData['overall']['wins']);
                  d3.select('#overall-loss').text(filteredRecordData['overall']['losses']);
                  d3.select('#overall-win-pct').text(filteredRecordData['overall']['win_pct']);
                  d3.select('#overall-text').text(filteredRecordData['overall']['num_years'] > 1 ? "Overall (".concat(filteredRecordData['overall']['num_years'], " yrs.)") : "Overall (".concat(filteredRecordData['overall']['num_years'], " yr.)"));
                  d3.select('#best-win').text(filteredRecordData['best']['wins']);
                  d3.select('#best-loss').text(filteredRecordData['best']['losses']);
                  d3.select('#best-win-pct').text(filteredRecordData['best']['win_pct']);
                  d3.select('#best-text').text("Best (".concat(filteredRecordData['best']['year'], ")"));
                  d3.select('#worst-win').text(filteredRecordData['worst']['wins']);
                  d3.select('#worst-loss').text(filteredRecordData['worst']['losses']);
                  d3.select('#worst-win-pct').text(filteredRecordData['worst']['win_pct']);
                  d3.select('#worst-text').text("Worst (".concat(filteredRecordData['worst']['year'], ")"));
                  allLegendsSelected = false;
                }
              }

              oldLegendTile = currentLegendTile;
            };

            onSeasonPathMouseLeave = function _ref7(datum) {
              if (filteredSeasons._groups[0].length > 0) {
                filteredSeasons.style("opacity", 1);
                filteredSeasonLabels.style("opacity", 1);
                filteredChampionshipStars.style("opacity", 1);
              } else {
                seasonPaths.style("opacity", 1);
                seasonLabels.style("opacity", 0);
                championshipStars.style("opacity", 1);
                championshipLabels.style("opacity", 1);
              }

              hoverSquare.style("opacity", 0);
              hoverWin.style("opacity", 0);
              hoverHyphen.style("opacity", 0);
              hoverLoss.style("opacity", 0);
              hoverWinPct.style("opacity", 0);
            };

            onSeasonPathMouseEnter = function _ref6(datum) {
              var losses = Math.round(xScale.invert(datum[0]));
              var wins = Math.round(yScale.invert(datum[1]));
              var winPct = getWinPctFromWinsAndLosses(wins, losses);
              var matchingYears = getMatchingYearsFromWinsAndLosses(wins, losses, seasons, seasonsData);
              hoverSquare.attr("transform", "translate(".concat(xScale(losses) + PADDING / 2, ", ").concat(yScale(wins) + PADDING / 2, ")")).style("opacity", 1);
              hoverWin.text(wins).style("opacity", 1);
              hoverHyphen.style("opacity", 1);
              hoverLoss.text(losses).style("opacity", 1);
              hoverWinPct.text(winPct).style("opacity", 1);

              if (filteredSeasons._groups[0].length > 0) {
                matchingSeasons = filteredSeasons.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });
                matchingSeasonLabels = filteredSeasonLabels.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });
                matchingChampionshipStars = filteredChampionshipStars.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });

                if (matchingSeasons._groups[0].length > 0) {
                  filteredSeasons.style("opacity", seasonSemiFade);
                  filteredSeasonLabels.style("opacity", seasonSemiFade);
                  filteredChampionshipStars.style("opacity", seasonSemiFade);
                  matchingSeasons.style("opacity", 1);
                  matchingSeasonLabels.style("opacity", 1);
                  matchingChampionshipStars.style("opacity", 1);
                }
              } else {
                matchingSeasons = seasonPaths.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });
                matchingSeasonLabels = seasonLabels.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });
                matchingChampionshipStars = championshipStars.filter(function (d) {
                  return matchingYears.includes(parseInt(d));
                });
                seasonPaths.style("opacity", seasonFade);
                championshipStars.style("opacity", seasonFade);
                championshipLabels.style("opacity", seasonFade);
                matchingSeasons.style("opacity", 1);
                matchingSeasonLabels.style("opacity", 1);
                matchingChampionshipStars.style("opacity", 1);
              }
            };

            onSeasonPathMouseMove = function _ref5(datum) {
              var _d3$mouse = d3.mouse(this),
                  _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
                  x = _d3$mouse2[0],
                  y = _d3$mouse2[1];

              var mouseLosses = Math.round(xScale.invert(x));
              var mouseWins = Math.round(yScale.invert(y));
              var mouseWinPct = getWinPctFromWinsAndLosses(mouseWins, mouseLosses);
              var mouseTotal = mouseLosses + mouseWins;

              if (mouseTotal > 1.15 * NUM_GAMES) {
                if (filteredSeasons._groups[0].length > 0) {
                  filteredSeasons.style("opacity", 1);
                  filteredSeasonLabels.style("opacity", 1);
                  filteredChampionshipStars.style("opacity", 1);
                } else {
                  seasonPaths.style("opacity", 1);
                  seasonLabels.style("opacity", 0);
                  championshipStars.style("opacity", 1);
                  championshipLabels.style("opacity", 1);
                }

                hoverSquare.style("opacity", 0);
                hoverWin.text(mouseWins).style("opacity", 0);
                hoverHyphen.style("opacity", 0);
                hoverLoss.text(mouseLosses).style("opacity", 0);
                hoverWinPct.text(mouseWinPct).style("opacity", 0);
              } else if (mouseTotal <= 1.15 * NUM_GAMES && mouseTotal > NUM_GAMES) {
                if (matchingSeasons._groups[0].length > 0) {
                  hoverSquare.style("opacity", 1);

                  if (filteredSeasons._groups[0].length > 0) {
                    filteredSeasons.style("opacity", seasonSemiFade);
                    filteredSeasonLabels.style("opacity", seasonSemiFade);
                    filteredChampionshipStars.style("opacity", seasonSemiFade);
                    matchingSeasons.style("opacity", 1);
                    matchingSeasonLabels.style("opacity", 1);
                    matchingChampionshipStars.style("opacity", 1);
                  } else {
                    seasonPaths.style("opacity", seasonFade);
                    championshipStars.style("opacity", seasonFade);
                    championshipLabels.style("opacity", seasonFade);
                    matchingSeasons.style("opacity", 1);
                    matchingSeasonLabels.style("opacity", 1);
                    matchingChampionshipStars.style("opacity", 1);
                  }
                }
              }
            };

            onLogoMouseClick = function _ref4(clickedTeam) {
              if (clickedTeam !== filterTeam) {
                var basketballTeamInput = d3.select("#basketball-team-input");
                basketballTeamInput.property("value", clickedTeam);
                $('#basketball-team-input').typeahead('val', clickedTeam);
                drawSeasonPathsByTeam(league, clickedTeam, seasonData, teamData, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale);
              }
            };

            getRecordDataFromSeasons = function _ref3(years, seasonsData) {
              var overallWins = 0;
              var overallLosses = 0;
              var overallNumYears = 0;
              var bestYear;
              var bestWins = 0;
              var bestLosses = 0;
              var bestWinPct = 0;
              var worstYear;
              var worstWins = 0;
              var worstLosses = 0;
              var worstWinPct = 1;

              for (var i = 0; i < years.length; i++) {
                var year = years[i];

                if (typeof year === 'number') {
                  year = year.toString();
                }

                if (year in seasonsData) {
                  var _season = seasonsData[year];
                  var sortedKeys = Object.keys(_season).sort();
                  var lastEntry = _season[sortedKeys[sortedKeys.length - 1]];
                  var lastEntryWins = lastEntry['win'];
                  var lastEntryLosses = lastEntry['loss'];
                  var winPct = getWinPctFromWinsAndLosses(lastEntryWins, lastEntryLosses);

                  if (winPct > bestWinPct) {
                    bestYear = year;
                    bestWins = lastEntryWins;
                    bestLosses = lastEntryLosses;
                    bestWinPct = winPct;
                  }

                  if (winPct < worstWinPct) {
                    worstYear = year;
                    worstWins = lastEntryWins;
                    worstLosses = lastEntryLosses;
                    worstWinPct = winPct;
                  }

                  overallNumYears += 1;
                  overallWins += lastEntry['win'];
                  overallLosses += lastEntry['loss'];
                }
              }

              var recordData = {
                'overall': {
                  'wins': overallWins,
                  'losses': overallLosses,
                  'win_pct': getWinPctFromWinsAndLosses(overallWins, overallLosses),
                  'num_years': overallNumYears
                },
                'best': {
                  'wins': bestWins,
                  'losses': bestLosses,
                  'win_pct': bestWinPct,
                  'year': bestYear
                },
                'worst': {
                  'wins': worstWins,
                  'losses': worstLosses,
                  'win_pct': worstWinPct,
                  'year': worstYear
                }
              };
              return recordData;
            };

            getWinPctFromWinsAndLosses = function _ref2(wins, losses) {
              var winPct = wins + losses > 0 ? (Math.round(1000.0 * wins / (wins + losses)) / 1000).toFixed(3).toString() : '';

              if (winPct.startsWith('0.')) {
                return '.' + winPct.split('0.')[1];
              }

              return winPct;
            };

            decade = _args3.length > 12 && _args3[12] !== undefined ? _args3[12] : null;
            bounds.selectAll(".season-path").remove();
            bounds.selectAll(".voronoi").remove();
            bounds.selectAll(".season-label").remove();
            bounds.selectAll(".legend-tile").remove();
            bounds.selectAll(".legend-value").remove();
            bounds.selectAll(".bookend-legend-tile").remove();
            bounds.selectAll(".championship-star").remove();
            bounds.selectAll(".record-label").remove();
            bounds.selectAll(".best-label").remove();
            bounds.selectAll(".overall-label").remove();
            bounds.selectAll(".worst-label").remove();
            wrapper.selectAll(".team-logo").remove();
            wrapper.selectAll(".team-logo-label").remove(); // 5. Draw Data
            // Plotting Season Paths

            filterTeam = team;
            filteredCumulativeSeasons = seasonData[filterTeam]['cumulative_seasons'];
            seasonsData = seasonData[filterTeam]['seasons'];
            seasons = Object.keys(seasonsData);
            seasonIntervals = getIntervalArray(seasons[0], seasons[seasons.length - 1], INTERVAL);
            seasonLineGenerator = d3.line().x(function (d) {
              return xScale(lossAccessor(d)) + dimensions.boundedWidth / NUM_GAMES / 2;
            }).y(function (d) {
              return yScale(winAccessor(d)) + dimensions.boundedWidth / NUM_GAMES / 2;
            });
            primaryColor = teamData[filterTeam]['primary_color'];
            secondaryColor = teamData[filterTeam]['secondary_color'];
            d3.select("#basketball-team-input").style("color", primaryColor);
            d3.select("#nba-autocomplete").style("display", "block"); // d3.select(".autocomplete")
            //  .style("border", `1px solid ${secondaryColor}`)
            //  .style("border-radius", '30px')

            d3.select(".typeahead").style("border", "1px solid ".concat(secondaryColor)).style("border-radius", '30px');
            numTeamColors = yearIntervals.length;
            primaryTeamColors = makeColors(primaryColor, 0, numTeamColors, 0.8);
            secondaryTeamColors = makeColors(secondaryColor, 0, numTeamColors, 0.8);
            primaryTeamColorScale = d3.scaleThreshold().domain(yearIntervals).range(primaryTeamColors);
            secondaryTeamColorScale = d3.scaleThreshold().domain(yearIntervals).range(secondaryTeamColors); // 6. Draw Peripherals
            // Define legend

            fillerLegendGroup = bounds.append("g");
            legendGroup = bounds.append("g");
            legendTileWidth = Math.min(dimensions.legendWidth / yearIntervals.length, dimensions.legendWidth / 9);
            legendY = dimensions.boundedHeight + 35;
            legendX = 0;
            legendXPadding = 10;
            legendFontSize = 12;

            if (_isMobile.default.any()) {
              legendY = dimensions.boundedHeight + 60;
              legendX = -dimensions.margin.left;
              legendXPadding = 5;
              legendFontSize = FONT_SIZE;
            }

            legendXRange = Array.from({
              length: yearIntervals.length
            }, function (_, n) {
              return legendX + n * (legendTileWidth + legendXPadding);
            });
            legendXScale = d3.scaleLinear().domain(d3.extent(yearIntervals)).range(d3.extent(legendXRange));
            grayColors = makeColors("#d8d8d8");
            grayContinuousScale = d3.scaleLinear().domain(yearIntervals).range(grayColors).interpolate(d3.interpolateRgb);
            firstYear = parseInt(seasons[0]);
            lastYear = parseInt(seasons[seasons.length - 1]);
            fillerIntervals = yearIntervals.filter(function (d) {
              return !seasonIntervals.includes(d);
            });
            fillerTiles = fillerLegendGroup.selectAll(".rect").data(fillerIntervals).enter().append("rect").attr("class", "legend-tile").attr("x", function (d) {
              return legendXScale(d);
            }).attr("y", legendY) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", legendTileWidth).attr("height", dimensions.legendHeight).style("fill", function (d) {
              return "#d8d8d8";
            }).style("opacity", 0.5);
            fillerLabels = fillerLegendGroup.selectAll(".text").data(fillerIntervals).enter().append("text").attr("class", "legend-value").attr("x", function (d) {
              return legendXScale(d) + legendTileWidth / 2;
            }).attr("y", legendY + dimensions.legendHeight + 10).style("fill", function (d) {
              return "#d8d8d8";
            }).text(function (d) {
              return "".concat(d, "s");
            }).attr("text-anchor", "middle").style("alignment-baseline", "middle").style("font-size", legendFontSize);
            legendTiles = legendGroup.selectAll(".legend-tile").data(seasonIntervals).enter().append("rect").attr("class", "legend-tile") // .attr("x", d => legendXScale(d))
            .attr("x", function (d) {
              if (firstYear >= d && firstYear <= d + INTERVAL - 1) {
                return legendXScale(d) + legendTileWidth * ((firstYear - d) / INTERVAL);
              }

              return legendXScale(d);
            }).attr("y", legendY) // 100 is where the first dot appears. 25 is the distance between dots
            // .attr("width", legendTileWidth)
            .attr("width", function (d) {
              if (firstYear >= d && firstYear <= d + INTERVAL - 1) {
                var multiplier = 1 - (firstYear - d) / INTERVAL;

                if (lastYear >= d && lastYear <= d + INTERVAL - 1) {
                  multiplier = (lastYear - firstYear + 1) / INTERVAL;
                }

                return legendTileWidth * multiplier;
              }

              if (lastYear >= d && lastYear <= d + INTERVAL - 1) {
                var _multiplier = (lastYear - d + 1) / INTERVAL;

                return legendTileWidth * _multiplier;
              }

              return legendTileWidth;
            }).attr("height", dimensions.legendHeight).style("fill", function (d) {
              return primaryTeamColorScale(d);
            }).style("opacity", 1);
            bookendYears = [seasonIntervals[0], seasonIntervals[seasonIntervals.length - 1]];
            bookendTiles = legendGroup.selectAll(".bookend-legend-tile").data(bookendYears).enter().append("rect").attr("class", "bookend-legend-tile").attr("x", function (d, i) {
              if (i === 1 && lastYear >= d && lastYear <= d + INTERVAL - 1) {
                return legendXScale(d) + legendTileWidth * ((lastYear + 1 - d) / INTERVAL);
              }

              return legendXScale(d);
            }).attr("y", legendY).attr("width", function (d, i) {
              if (firstYear >= d && firstYear <= d + INTERVAL - 1) {
                var multiplier = 1 - (firstYear - d) / INTERVAL;

                if (i === 1 && lastYear >= d && lastYear <= d + INTERVAL - 1) {
                  multiplier = (lastYear - d + 1) / INTERVAL;
                }

                return legendTileWidth - legendTileWidth * multiplier;
              }

              if (i === 1 && lastYear >= d && lastYear <= d + INTERVAL - 1) {
                var _multiplier2 = (lastYear - d + 1) / INTERVAL;

                return legendTileWidth - legendTileWidth * _multiplier2;
              }

              return legendTileWidth;
            }).attr("height", dimensions.legendHeight).style("fill", "#d8d8d8").style("opacity", 0.5);
            legendLabels = legendGroup.selectAll(".legend-value").data(seasonIntervals).enter().append("text").attr("class", "legend-value").attr("x", function (d) {
              return legendXScale(d) + legendTileWidth / 2;
            }).attr("y", legendY + dimensions.legendHeight + 10).style("opacity", 1).style("fill", function (d) {
              return primaryColor;
            }).text(function (d) {
              // let labelYear = d
              // if (firstYear >= d && firstYear <= (d + INTERVAL - 1)) {
              //  if (lastYear >= d && lastYear <= (d + INTERVAL - 1)) {
              //    if (firstYear == lastYear) {
              //      return `${firstYear}`
              //    }
              //    return `${firstYear} - ${lastYear}`
              //  }
              //  return `${firstYear}`
              // } else if (lastYear >= d && lastYear <= (d + INTERVAL - 1)) {
              //  return `${lastYear}`
              // }
              return "".concat(d, "s");
            }).attr("text-anchor", "middle").style("alignment-baseline", "middle").style("font-size", legendFontSize);
            legendLabels.style("opacity", 1).style("stroke", function (d) {
              return primaryTeamColorScale(d);
            });
            orderedTeamHistory = teamData[filterTeam]['history'] === 0 ? [filterTeam] : JSON.parse(teamData[filterTeam]['history']);
            teamParent = teamData[filterTeam]['parent'];

            if (![0, 'deprecated'].includes(teamParent)) {
              orderedTeamHistory = JSON.parse(teamData[teamParent]['history']);
            }

            logoShift = 20;
            logoSize = 55;
            logoY = -15;
            logoFontSize = 10;

            if (_isMobile.default.any()) {
              logoSize = 25;
              logoShift = 25;
              logoY = -15;
              logoFontSize = 6;
            }

            logoPadding = 25;
            logoFade = 0.4;
            logo = bounds.selectAll(".team-logo").data(orderedTeamHistory).enter().append("svg:image").attr("class", "team-logo").attr("xlink:href", function (team) {
              return "/assets/images/logos/".concat(league, "/").concat(team, ".png");
            }).attr("width", logoSize).attr("height", logoSize).attr("x", -dimensions.margin.left + logoShift / 2 - 10).attr("y", function (d, i) {
              return logoY + i * (logoSize + logoPadding);
            }).attr("opacity", function (d) {
              if (d === filterTeam) {
                return 1;
              } else {
                return logoFade;
              }
            }).style('filter', function (d) {
              if (d !== filterTeam) {
                return 'url(#grayscale)';
              }

              return;
            });
            logoLabel = bounds.selectAll(".team-logo-label").data(orderedTeamHistory).enter().append("text").text(function (d) {
              var logoSeasons = Object.keys(seasonData[d]['seasons']);
              var logoStartYear = logoSeasons[0];
              var logoEndYear = parseInt(logoSeasons[logoSeasons.length - 1]) === END_YEAR ? "Now" : logoSeasons[logoSeasons.length - 1];

              if (logoStartYear === logoEndYear) {
                return logoStartYear;
              }

              return "".concat(logoStartYear, " - ").concat(logoEndYear);
            }).attr("class", "team-logo-label").attr("x", -dimensions.margin.left + logoShift / 2 + logoSize / 2 - 10).attr("y", function (d, i) {
              return logoY + (i + 1) * (logoSize + logoPadding) - logoPadding * .6;
            }).attr("text-anchor", "middle").style("font-size", logoFontSize).attr("opacity", function (d) {
              if (d === filterTeam) {
                return 1;
              } else {
                return logoFade;
              }
            }).attr("fill", function (d) {
              if (d === filterTeam) {
                return "black"; // teamData[d]['primary_color']
              } else {
                return "d8d8d8";
              }
            });
            hoverPct = .75;
            hoverFontSize = 30;
            hoverFontSizeSmall = 18;
            hoverGapY = 30;

            if (_isMobile.default.any()) {
              hoverPct = .65;
              hoverFontSize = 15;
              hoverFontSizeSmall = 12;
              hoverGapY = 20;
            }

            hoverStartingPointX = dimensions.width / 2 - dimensions.margin.left;
            hoverWin = bounds.append("text").text('0').attr("class", "record-label").attr("x", hoverStartingPointX - 14.5).attr("y", -10).attr("text-anchor", "end").style("font-size", hoverFontSize).style("fill", primaryColor).style("opacity", 0);
            hoverHyphen = bounds.append("text").text('-').attr("class", "record-label").attr("x", hoverStartingPointX).attr("y", -10).attr("text-anchor", "middle").style("font-size", hoverFontSize).style("fill", primaryColor).style("opacity", 0);
            hoverLoss = bounds.append("text").text('0').attr("class", "record-label").attr("x", hoverStartingPointX + 14.5).attr("y", -10).attr("text-anchor", "start").style("font-size", hoverFontSize).style("fill", primaryColor).style("opacity", 0);
            hoverWinPct = bounds.append("text").text('0').attr("class", "record-label").attr("x", hoverStartingPointX).attr("y", -10 + hoverGapY).attr("text-anchor", "middle").style("font-size", hoverFontSizeSmall).style("fill", primaryColor).style("opacity", 0);
            seasonLines = [];
            seasonLinesFormatted = {};
            seasonPathIds = [];

            for (i = 0; i < seasons.length; i++) {
              season = seasons[i];
              seasonLineFormatted = formatSeasonToDrawPath(seasonsData[season], xScale);
              seasonLine = seasonLineGenerator(seasonLineFormatted);
              seasonPathId = Math.round(seasons[i]);
              seasonLines.push(seasonLine);
              seasonLinesFormatted[season] = seasonLineFormatted;
              seasonPathIds.push("season-path-".concat(seasonPathId.toString()));
            }

            recordData = getRecordDataFromSeasons(seasons, seasonsData);
            recordFontSize = 17;
            recordFontSizeSmall = 15;
            recordSpacingX = 10.5;
            recordSpacingY = 25;
            recordStartingPointY = -10;
            recordSectionSpacing = 30;
            overallPct = .75;

            if (_isMobile.default.any()) {
              overallPct = .65;
              recordFontSize = 1.1 * FONT_SIZE;
              recordFontSizeSmall = 10;
              recordSpacingX = 7;
              recordSpacingY = 12;
              recordStartingPointY = -10;
              recordSectionSpacing = 15;
            }

            overallStartingPointX = dimensions.boundedWidth * overallPct;
            overallStartingPointY = recordStartingPointY;
            overallSpacing = recordSpacingX;
            overallWins = recordData['overall']['wins'];
            overallLosses = recordData['overall']['losses'];
            overallWinPct = recordData['overall']['win_pct'];
            overallNumYears = recordData['overall']['num_years'];
            overallWin = bounds.append("text").text(overallWins).attr("class", "overall-label").attr("id", "overall-win").attr("x", overallStartingPointX).attr("y", overallStartingPointY + recordSpacingY).attr("text-anchor", "end").style("font-size", recordFontSize).style("fill", "black").style("opacity", 0);
            overallWinWidth = d3.select("#overall-win").node().getBoundingClientRect().width;
            overallHyphen = bounds.append("text").text('-').attr("class", "overall-label").attr("x", overallStartingPointX + overallSpacing).attr("y", overallStartingPointY + recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "black").style("opacity", 0);
            overallLoss = bounds.append("text").text(overallLosses).attr("class", "overall-label").attr("id", "overall-loss").attr("x", overallStartingPointX + 2 * overallSpacing).attr("y", overallStartingPointY + recordSpacingY).attr("text-anchor", "start").style("font-size", recordFontSize).style("fill", "black").style("opacity", 0);
            overallLossWidth = d3.select("#overall-loss").node().getBoundingClientRect().width;
            overallWinPctLabel = bounds.append("text").text("".concat(overallWinPct)).attr("class", "overall-label").attr("id", "overall-win-pct").attr("id", "overall-win-pct").attr("x", overallStartingPointX + overallSpacing).attr("y", overallStartingPointY + 2 * recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSizeSmall).style("fill", "black").style("opacity", 0);
            overallWinBBox = d3.select("#overall-win").node().getBBox();
            overallMidpoint = overallStartingPointX + overallSpacing; // overallWinBBox.x + ((overallWinPctBBox.x + overallWinPctBBox.width) - overallWinBBox.x) / 2

            overallText = bounds.append("text").text(overallNumYears > 1 ? "Overall (".concat(overallNumYears, " yrs.)") : "Overall (".concat(overallNumYears, " yr.)")).attr('text-decoration', 'underline').attr("id", "overall-text").attr("class", "overall-label").attr("x", overallMidpoint).attr("y", overallStartingPointY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "#5F5F5F").style("opacity", 0);
            overallTextBBox = d3.select("#overall-text").node().getBBox();
            bestPct = .75;

            if (_isMobile.default.any()) {
              bestPct = .65;
            }

            bestStartingPointX = dimensions.boundedWidth * bestPct;
            bestStartingPointY = overallStartingPointY + 3 * recordSpacingY + recordSectionSpacing;
            bestSpacing = recordSpacingX;
            bestWins = recordData['best']['wins'];
            bestLosses = recordData['best']['losses'];
            bestWinPct = recordData['best']['win_pct'];
            bestYear = recordData['best']['year'];
            bestWin = bounds.append("text").text(bestWins).attr("class", "best-label").attr("id", "best-win").attr("x", bestStartingPointX).attr("y", bestStartingPointY + recordSpacingY).attr("text-anchor", "end").style("font-size", recordFontSize).style("fill", "#1a9850").style("opacity", 0);
            bestWinWidth = d3.select("#best-win").node().getBoundingClientRect().width;
            bestText = bounds.append("text").text("Best (".concat(bestYear, ")")).attr('text-decoration', 'underline').attr("class", "best-label").attr("id", "best-text").attr("x", overallMidpoint).attr("y", bestStartingPointY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "#5F5F5F").style("opacity", 0);
            bestHyphen = bounds.append("text").text('-').attr("class", "best-label").attr("x", bestStartingPointX + bestSpacing).attr("y", bestStartingPointY + recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "#1a9850").style("opacity", 0);
            bestLoss = bounds.append("text").text(bestLosses).attr("class", "best-label").attr("id", "best-loss").attr("x", bestStartingPointX + 2 * bestSpacing).attr("y", bestStartingPointY + recordSpacingY).attr("text-anchor", "start").style("font-size", recordFontSize).style("fill", "#1a9850").style("opacity", 0);
            bestLossWidth = d3.select("#best-loss").node().getBoundingClientRect().width;
            bestWinPctLabel = bounds.append("text").text("".concat(bestWinPct)).attr("class", "best-label").attr("id", "best-win-pct").attr("x", overallMidpoint).attr("y", bestStartingPointY + 2 * recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSizeSmall).style("fill", "#1a9850").style("opacity", 0);
            worstPct = .75;

            if (_isMobile.default.any()) {
              worstPct = .65;
            }

            worstStartingPointX = dimensions.boundedWidth * worstPct;
            worstStartingPointY = overallStartingPointY + 6 * recordSpacingY + 2 * recordSectionSpacing;
            worstSpacing = recordSpacingX;
            worstWins = recordData['worst']['wins'];
            worstLosses = recordData['worst']['losses'];
            worstWinPct = recordData['worst']['win_pct'];
            worstYear = recordData['worst']['year'];
            worstWin = bounds.append("text").text(worstWins).attr("class", "worst-label").attr("id", "worst-win").attr("x", worstStartingPointX).attr("y", worstStartingPointY + recordSpacingY).attr("text-anchor", "end").style("font-size", recordFontSize).style("fill", "#d73027").style("opacity", 0);
            worstWinWidth = d3.select("#worst-win").node().getBoundingClientRect().width;
            worstText = bounds.append("text").text("Worst (".concat(worstYear, ")")).attr('text-decoration', 'underline').attr("class", "worst-label").attr("id", "worst-text").attr("x", overallMidpoint).attr("y", worstStartingPointY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "#5F5F5F").style("opacity", 0);
            worstHyphen = bounds.append("text").text('-').attr("class", "worst-label").attr("x", worstStartingPointX + worstSpacing).attr("y", worstStartingPointY + recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSize).style("fill", "#d73027").style("opacity", 0);
            worstLoss = bounds.append("text").text(worstLosses).attr("class", "worst-label").attr("id", "worst-loss").attr("x", worstStartingPointX + 2 * worstSpacing).attr("y", worstStartingPointY + recordSpacingY).attr("text-anchor", "start").style("font-size", recordFontSize).style("fill", "#d73027").style("opacity", 0);
            worstLossWidth = d3.select("#worst-loss").node().getBoundingClientRect().width;
            worstWinPctLabel = bounds.append("text").text("".concat(worstWinPct)).attr("class", "worst-label").attr("id", "worst-win-pct").attr("x", overallMidpoint).attr("y", worstStartingPointY + 2 * recordSpacingY).attr("text-anchor", "middle").style("font-size", recordFontSizeSmall).style("fill", "#d73027").style("opacity", 0);
            xTransform = dimensions.boundedWidth + dimensions.margin.right - (overallTextBBox.x + overallTextBBox.width) - 2;
            d3.selectAll(".overall-label").attr("transform", "translate(".concat(xTransform, ", ", 0, ")")).style("opacity", 1);
            d3.selectAll(".best-label").attr("transform", "translate(".concat(xTransform, ", ", 0, ")")).style("opacity", 1);
            d3.selectAll(".worst-label").attr("transform", "translate(".concat(xTransform, ", ", 0, ")")).style("opacity", 1);
            seasonPaths = bounds.selectAll(".path").data(seasons).enter().append("path").attr("class", "season-path").attr("fill", "none").attr("opacity", 0).attr("stroke", function (d) {
              return primaryTeamColorScale(d);
            }) // year
            .attr("stroke-width", dimensions.boundedWidth / NUM_GAMES - PADDING).attr("id", function (d) {
              return "season-path-".concat(Math.round(d).toString());
            }).attr("d", function (d, i) {
              return seasonLines[i];
            }); // season

            d3.selectAll('.season-path').style("opacity", 1);
            championshipSeasons = seasonData[filterTeam]['championship_seasons'];
            seasonLabelPositionTaken = {};
            seasonLabels = bounds.selectAll(".season-label").data(seasons).enter().append("text").attr("class", "season-label").attr("x", function (d, i) {
              var seasonArray = seasonLinesFormatted[d];
              var finalRecordLosses = lossAccessor(seasonArray[seasonArray.length - 1]);
              return xScale(finalRecordLosses + 0.5) + 25;
            }).attr("y", function (d, i) {
              var seasonArray = seasonLinesFormatted[d];
              var finalRecordWins = winAccessor(seasonArray[seasonArray.length - 1]);
              return yScale(finalRecordWins) - 5;
            }).text(function (d) {
              return "".concat(d);
            }).style("opacity", 0).style("fill", function (d) {
              return "black";
            }).attr("text-anchor", "end").style("alignment-baseline", "middle").style("font-size", 10); // .attr("stroke-opacity", )

            championshipLabels = seasonLabels.filter(function (d) {
              return championshipSeasons.includes(parseInt(d));
            });
            championshipLabels.style("opacity", 1);
            championshipStarSize = 40;
            championshipStars = bounds.selectAll(".championship-star").data(championshipSeasons).enter().append("g").attr("class", "championship-star").attr("transform", function (season) {
              var seasonArray = formatSeasonToDrawPath(seasonsData[season], xScale);
              var finalRecordLosses = lossAccessor(seasonArray[seasonArray.length - 1]);
              var finalRecordWins = winAccessor(seasonArray[seasonArray.length - 1]);
              var x = xScale(finalRecordLosses + 0.5) + 35;
              var y = yScale(finalRecordWins) - 7;
              return "translate(".concat(x, ",").concat(y, ")");
            }).attr("fill", "black").attr("stroke-width", 1).append("path").attr("d", function (d) {
              return d3.symbol().type(d3.symbolStar).size(championshipStarSize)();
            }).attr("stroke", function (d) {
              return secondaryTeamColorScale(d);
            }).style("fill", function (d) {
              return primaryTeamColorScale(d);
            }).style("opacity", 1);
            hoverSquare = bounds.append("rect").attr("class", "rect").attr("height", dimensions.boundedWidth / NUM_GAMES - PADDING).attr("width", dimensions.boundedWidth / NUM_GAMES - PADDING).attr("fill", "transparent").attr("x", 0).attr("y", 0).style("opacity", 0).style("stroke", "white").style("stroke-width", "1.5px"); // // 7. Create Interactions

            legendFade = 0.25;
            seasonFade = 0.05;
            seasonSemiFade = 0.25;

            if (seasons.length < 15) {
              seasonFade = 0.1;
              seasonSemiFade = 0.35;
            }

            filteredSeasons = {
              '_groups': [[]]
            };
            filteredSeasonLabels = {
              '_groups': [[]]
            };
            filteredChampionshipStars = {
              '_groups': [[]]
            };
            matchingSeasons = {
              '_groups': [[]]
            };
            matchingSeasonLabels = {
              '_groups': [[]]
            };
            matchingChampionshipStars = {
              '_groups': [[]]
            };
            logo.on("click", onLogoMouseClick);
            legendGroup.on("click", onLegendMouseClick);
            drawVoronoi(seasons, seasonsData, seasonLinesFormatted, xScale, yScale, dimensions, bounds, onSeasonPathMouseEnter, onSeasonPathMouseLeave, onSeasonPathMouseMove);
            allLegendsSelected = true;
            newLegendSelected = false;

            if (decade !== null && IS_DEFAULT_CLICK) {
              onLegendMouseClick(null, decade);
              IS_DEFAULT_CLICK = false;
            }

          case 173:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _drawSeasonPathsByTeam.apply(this, arguments);
}

function drawVoronoi(years, seasonsData, seasonLinesFormatted, xScale, yScale, dimensions, bounds, onMouseEnter, onMouseLeave, onMouseMove) {
  bounds.selectAll(".voronoi").remove();
  var voronoiPoints = getVoronoiPoints(years, seasonsData, seasonLinesFormatted, xScale, yScale);

  var _getVoronoi = getVoronoi(voronoiPoints, dimensions),
      _getVoronoi2 = _slicedToArray(_getVoronoi, 2),
      voronoi = _getVoronoi2[0],
      delaunay = _getVoronoi2[1];

  var voronoiDiagram = bounds.selectAll(".voronoi").data(voronoiPoints).enter().append("path").attr("class", "voronoi").attr("d", function (d, i) {
    return voronoi.renderCell(i);
  }) // .attr("stroke", "salmon")
  .on("mousemove", onMouseMove).on("mouseenter", onMouseEnter).on("mouseleave", onMouseLeave);
}

function getVoronoi(points, dimensions) {
  var delaunay = d3.Delaunay.from(points);
  var voronoi = delaunay.voronoi();
  voronoi.xmax = dimensions.boundedWidth + dimensions.boundedWidth / NUM_GAMES;
  voronoi.ymax = dimensions.boundedHeight + dimensions.boundedWidth / NUM_GAMES;
  return [voronoi, delaunay];
}

function getVoronoiPoints(seasons, seasonsData, seasonLinesFormatted, xScale, yScale) {
  var gamesSeen = {};
  var points = [];

  for (var i = 0; i < seasons.length; i++) {
    var year = seasons[i].toString();

    if (year in seasonsData) {
      var seasonXValues = seasonLinesFormatted[year].map(function (game) {
        return xScale(game.loss);
      });
      var seasonYValues = seasonLinesFormatted[year].map(function (game) {
        return yScale(game.win);
      });

      for (var j = 0; j < seasonXValues.length; j++) {
        var gameX = seasonXValues[j];
        var gameY = seasonYValues[j];
        var gameKey = "".concat(gameX, "_").concat(gameY);

        if (!(gameKey in gamesSeen)) {
          gamesSeen[gameKey] = 1;
          points.push([gameX, gameY]);
        } else {
          gamesSeen[gameKey] += 1;
        }
      }
    }
  }

  return points;
}

function getMatchingYearsFromWinsAndLosses(wins, losses, seasons, seasonsData) {
  var matchingYears = [];
  var winString = wins > 9 ? wins.toString() : "0".concat(wins.toString());
  var lossString = losses > 9 ? losses.toString() : "0".concat(losses.toString());
  var winLossKey = "".concat(winString).concat(lossString);

  for (var i = 0; i < seasons.length; i++) {
    var year = seasons[i];
    var seasonData = seasonsData[year];

    if (winLossKey in seasonData) {
      matchingYears.push(parseInt(year));
    }
  }

  return matchingYears;
}

function range(start, end) {
  var range = Array(end - start + 1).fill().map(function (_, idx) {
    return start + idx;
  });
  return range;
}

function formatSeasonToDrawPath(seasonData, xScale) {
  var sortedKeys = Object.keys(seasonData).sort();
  var winLossData = [];

  for (var i = 0; i < sortedKeys.length; i++) {
    winLossData.push(seasonData[sortedKeys[i]]);
  }

  var season = [[{
    "win": 0,
    "loss": -0.5 + xScale.invert(PADDING / 2)
  }], winLossData, [{
    "win": winLossData[winLossData.length - 1]["win"],
    "loss": winLossData[winLossData.length - 1]["loss"] + 0.5 - xScale.invert(PADDING / 2)
  }]].flat(1);
  return season;
}

function makeColors(primaryColor) {
  var numDarker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var numLighter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var pctDarker = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.64;
  var pctLighter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.8;
  primaryColor = d3.rgb(primaryColor);
  var primaryRed = primaryColor.r;
  var primaryGreen = primaryColor.g;
  var primaryBlue = primaryColor.b;
  var darkScale = [primaryColor];
  var darkRedStep = primaryRed * pctDarker / numDarker;
  var darkGreenStep = primaryGreen * pctDarker / numDarker;
  var darkBlueStep = primaryBlue * pctDarker / numDarker;

  for (var i = 0; i < numDarker; i++) {
    var darkerColor = d3.rgb(darkScale[i].r - darkRedStep, darkScale[i].g - darkGreenStep, darkScale[i].b - darkBlueStep);
    darkScale.push(darkerColor);
  }

  var lightScale = [primaryColor];
  var lightRedStep = (255 - primaryRed) * pctLighter / numLighter;
  var lightGreenStep = (255 - primaryGreen) * pctLighter / numLighter;
  var lightBlueStep = (255 - primaryBlue) * pctLighter / numLighter;

  for (var i = 0; i < numLighter; i++) {
    var lighterColor = d3.rgb(lightScale[i].r + lightRedStep, lightScale[i].g + lightGreenStep, lightScale[i].b + lightBlueStep);
    lightScale.push(lighterColor);
  } // Remove 1st element to avoid double inclusion


  darkScale.shift();
  var colorScale = [lightScale.reverse(), darkScale].flat(1);
  return colorScale;
}

function getIntervalArray(start, end, intervalLength) {
  var startInterval = Math.floor(start / intervalLength) * intervalLength;
  var endInterval = Math.floor(end / intervalLength) * intervalLength;
  var numIntervals = Math.ceil((endInterval - startInterval) / intervalLength);
  var intervals = [startInterval];

  for (var i = 0; i < numIntervals; i++) {
    var currentInterval = intervals[i] + intervalLength;
    intervals.push(currentInterval);
  }

  return intervals;
}

function getEmptyWinLossData() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NUM_GAMES;
  var emptyWinLossData = [];

  for (var i = 0; i <= n; i++) {
    for (var j = 0; j <= n; j++) {
      if (i + j <= n) {
        emptyWinLossData.push({
          win: i,
          loss: j
        });
      }
    }
  }

  return emptyWinLossData;
} // To find the win-loss index, we act like it's an (n+1) x (n+1) square-tiled board (n = NUM_GAMES).
// Imagine for the square-tiled board that we've constructed this representation by looping through
// wins first, then looping through losses resulting in a flat array of ordered (wins, losses) items.
//    [ (0,0), (0,1) ... (0,n)
//      (1,0), (1,1) ... (1,n)
//      ...
//      (n,0), (n,1) ... (n,n)  ]
//
// The above has the following index structure derived from wins and losses. Note that there are n+1
// items in a given row/column due to the 0-indexed wins/losses. Assume n=82 (n^2 = 6889).
//
//                Row         Col   Index
//    (0,0) -> index = (n+1)(0)       + 0      = 0 
//    (x,y) -> index = (n+1)(x)       + y 
//    (n,n) -> index = (n+1)(n)       + n    = 6888
//
// In our chart, we use the same construction process, but we only allow max(wins + losses) = n.
// This reduces the board to a tiled triangle that has the square's full diagonal:
//
//    (# of triangle tiles) = .5(square-tiles) + .5(diagonal-tiles) = (n^2)/2 + n/2 = 3486
//
// This complicates the index structure only a little. Given wins (x) and losses (y), we act like
// we have a square-tiled board. Then we make an adjustment:
// 
//    For each row we go up (i.e. each win increment), we have fewer and fewer squares per row. They 
//    get shorter. If n=82, the sequence goes 82, 81, 80, ... 2, 1. As we move up the rows beyond row 
//    0, we cumulatively lose tiles. Rows [1, 2, 3, 4, ... n] lose [0, 1, 1+2, 1+2+3, ... n-1(n)/2].
//
//                Row         Col   Adjustment      Index
//    (0,0) -> index = (n+1)(0)       + 0         - 0        = 0
//    (x,y) -> index = (n+1)(x)       + y         - (x-1)(x)/2
//    (n,n) -> index = (n+1)(n)       + n         - (n-1)(n)/2   = 3485
//


function getTriangleIndex(x, y) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NUM_GAMES;
  square_index = (n + 1) * x + y;
  adjustment = (x - 1) * x / 2;
  index = square_index - adjustment;
  return index;
}

function drawLogo() {
  // 2. Define Dimensions
  var width = d3.min([window.innerWidth * 0.85, window.innerHeight * 0.85]);
  var dimensions = {
    width: width,
    height: width,
    margin: {
      top: 60,
      right: 45,
      bottom: 60,
      left: 90
    },
    legendWidth: width * 0.6,
    legendHeight: 20
  };
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom; // 3. Draw Canvas

  var wrapper = d3.select("#wrapper").append("svg").attr("width", dimensions.width).attr("height", dimensions.height);
  var bounds = wrapper.append("g").attr("class", "bounds").style("transform", "translate(".concat(dimensions.margin.left, "px, ").concat(dimensions.margin.top, "px)"));
  var boundsBackground = bounds.append("rect").attr("class", "bounds-background").attr("x", 0).attr("width", dimensions.boundedWidth).attr("y", 0).attr("height", dimensions.boundedHeight);
  bounds.append();
}

function drawExplanatoryGraph(_x15) {
  return _drawExplanatoryGraph.apply(this, arguments);
}

function _drawExplanatoryGraph() {
  _drawExplanatoryGraph = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(league) {
    var _drawBaseTiles3, _drawBaseTiles4, wrapper, bounds, dimensions, tiles, tilesGroup, yearIntervals, xScale, yScale, seasonData, evenSeasons, evenSeasonTeams, evenSeasonYears, teams, i, team, _seasons, years, j, year, season, evenRecord, previousWins, previousLosses, previousState, evenSeasonStreakCounts, evenSeasonDistances, evenSeason, evenSeasonStreakCount, totalDistance, winLossKeys, winLossKey, wins, losses, state, expectedWins, expectedLosses, distance, evenSeasonSummary, summary, colours, heatmapColour, iterableTiles, tile, tileId, winPct, tileById, seasonLines, seasonPathIds, seasonPathColors, seasonLineGenerator, pureWinKey, pureWinSeason, pureWinSeasonLine, bestSeason, bestSeasonLine, middleSeason, middleWins, middleLosses, middleWinsText, middleLossText, middleKey, middleSeasonLine, mediocreSeason, mediocreSeasonLine, pureLossKey, pureLossSeason, pureLossSeasonLine, worstSeason, worstSeasonLine, delay, seasonPaths, seasonPathWins, hoverPct, hoverStartingPointX, hoverWin, hoverHyphen, hoverLoss, updateChart, _updateChart, container, stepSel;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _updateChart = function _ref10() {
              _updateChart = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(index, seasonPathIds, seasonPathColors, seasonPathWins, stage, league) {
                var animationTime, fadeOpacity;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        animationTime = 1000;
                        fadeOpacity = 0.2;

                        if (!(index === -2)) {
                          _context4.next = 6;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 6:
                        if (index === -1) {
                          if (stage == "exit") {
                            d3.select("#win-label").style("opacity", 0);
                            d3.select("#hyphen").style("opacity", 0);
                            d3.select("#loss-label").style("opacity", 0); // d3.selectAll(".rect-tile").transition(`higlight-tiles`).duration(animationTime).style("opacity", 0.5)

                            d3.selectAll("#explanatory-wins-text").style("opacity", 1).attr("fill", "#828282").attr("font-weight", "normal");
                            d3.selectAll(".explanatory-win-labels").style("opacity", 1).attr("fill", "#828282").attr("font-weight", "normal");
                            d3.selectAll("#explanatory-losses-text").style("opacity", 1).attr("fill", "#828282").attr("font-weight", "normal");
                            d3.selectAll(".explanatory-loss-labels").style("opacity", 1).attr("fill", "#828282").attr("font-weight", "normal");
                            fadeLine(seasonPathIds[index + 1], animationTime);
                          }

                          if (stage == "enter") {
                            // d3.selectAll(".rect-tile").transition(`higlight-tiles`).duration(animationTime).style("opacity", 0.5)
                            d3.selectAll("#explanatory-wins-text").style("opacity", 1).attr("fill", "#1a9850").attr("font-weight", "bold");
                            d3.selectAll(".explanatory-win-labels").style("opacity", 1).attr("fill", "#1a9850").attr("font-weight", "bold");
                            d3.selectAll("#explanatory-losses-text").style("opacity", 1).attr("fill", "#d73027").attr("font-weight", "bold");
                            d3.selectAll(".explanatory-loss-labels").style("opacity", 1).attr("fill", "#d73027").attr("font-weight", "bold");
                          }
                        } else if (index === 0) {
                          if (stage == "enter") {
                            d3.selectAll("#explanatory-losses-text").transition("fade-losses-text").duration(animationTime).style("opacity", 0.25);
                            d3.selectAll(".explanatory-loss-labels").transition("fade-losses").duration(animationTime).style("opacity", 0.25); // d3.selectAll("#wins-text").transition(`higlight-wins-text`).duration(animationTime).style("opacity", 1).attr("fill", "#1a9850").attr("font-weight", "bold")
                            // d3.selectAll(".win-labels").transition(`higlight-wins`).duration(animationTime).style("opacity", 1).attr("fill", "#1a9850").attr("font-weight", "bold")
                            // d3.selectAll("#losses-text").transition(`higlight-losses-text`).duration(animationTime).style("opacity", 1).attr("fill", "#d73027").attr("font-weight", "bold")
                            // d3.selectAll(".loss-labels").transition(`higlight-losses`).duration(animationTime).style("opacity", 1).attr("fill", "#d73027").attr("font-weight", "bold")

                            d3.select("#win-label").style("opacity", 1).style("fill", seasonPathColors[index]).text(parseInt(seasonPathWins[index]));
                            d3.select("#hyphen").style("opacity", 1).style("fill", seasonPathColors[index]);
                            d3.select("#loss-label").style("opacity", 1).style("fill", seasonPathColors[index]).text(parseInt(NUM_GAMES - seasonPathWins[index]));
                            animateLine(seasonPathIds[index], animationTime, seasonPathColors[index]);
                          }

                          if (stage == "exit") {
                            d3.select("#win-label").style("opacity", 0);
                            d3.select("#hyphen").style("opacity", 0);
                            d3.select("#loss-label").style("opacity", 0);
                            d3.selectAll("#explanatory-losses-text").style("opacity", 1);
                            d3.selectAll(".explanatory-loss-labels").style("opacity", 1);
                            fadeLine(seasonPathIds[index], animationTime, 0);
                          }
                        } else if (index === seasonPathIds.length) {
                          if (stage === "enter") {
                            d3.select("#win-label").style("opacity", 0);
                            d3.select("#hyphen").style("opacity", 0);
                            d3.select("#loss-label").style("opacity", 0);
                            d3.selectAll("#explanatory-losses-text").transition("fade-losses-text").duration(animationTime).style("opacity", 0.25);
                            d3.selectAll(".explanatory-loss-labels").transition("fade-losses").duration(animationTime).style("opacity", 0.25);
                            fadeLine(seasonPathIds[index - 1], animationTime, fadeOpacity);
                          }

                          if (stage === "exit") {
                            d3.select("#win-label").style("opacity", 1).style("fill", seasonPathColors[index - 1]).text(parseInt(seasonPathWins[index - 1]));
                            d3.select("#hyphen").style("opacity", 1).style("fill", seasonPathColors[index - 1]);
                            d3.select("#loss-label").style("opacity", 1).style("fill", seasonPathColors[index - 1]).text(parseInt(NUM_GAMES - seasonPathWins[index - 1]));
                            d3.selectAll("#explanatory-losses-text").style("opacity", 1);
                            d3.selectAll(".explanatory-loss-labels").style("opacity", 1);
                            highlightLine(seasonPathIds[index - 1], 0, seasonPathColors[index - 1]);
                          }
                        } else {
                          if (index === 2) {
                            if (stage === "enter") {
                              d3.selectAll("#explanatory-wins-text").transition("fade-wins-text").duration(animationTime).style("opacity", 0.25);
                              d3.selectAll(".explanatory-win-labels").transition("fade-win-labels").duration(animationTime).style("opacity", 0.25);
                            }

                            if (stage === "exit") {
                              d3.selectAll("#explanatory-wins-text").style("opacity", 1);
                              d3.selectAll(".explanatory-win-labels").style("opacity", 1);
                            }
                          }

                          if (index === 4) {
                            if (stage === "enter") {
                              d3.selectAll("#explanatory-losses-text").transition("highlight-losses-text").duration(animationTime).style("opacity", 1);
                              d3.selectAll(".explanatory-loss-labels").transition("highlight-loss-label").duration(animationTime).style("opacity", 1);
                            }

                            if (stage === "exit") {
                              d3.selectAll("#explanatory-losses-text").transition("fade-losses-text").duration(animationTime).style("opacity", 0.25);
                              d3.selectAll(".explanatory-loss-labels").transition("fade-losses").duration(animationTime).style("opacity", 0.25);
                            }
                          }

                          if (stage === "enter") {
                            d3.select("#win-label").style("opacity", 1).style("fill", seasonPathColors[index]).text(parseInt(seasonPathWins[index]));
                            d3.select("#hyphen").style("opacity", 1).style("fill", seasonPathColors[index]);
                            d3.select("#loss-label").style("opacity", 1).style("fill", seasonPathColors[index]).text(parseInt(NUM_GAMES - seasonPathWins[index]));
                            fadeLine(seasonPathIds[index - 1], animationTime, fadeOpacity);
                            animateLine(seasonPathIds[index], animationTime, seasonPathColors[index]);
                          }

                          if (stage === "exit") {
                            d3.select("#win-label").style("opacity", 1).style("fill", seasonPathColors[index - 1]).text(parseInt(seasonPathWins[index - 1]));
                            d3.select("#hyphen").style("opacity", 1).style("fill", seasonPathColors[index - 1]);
                            d3.select("#loss-label").style("opacity", 1).style("fill", seasonPathColors[index - 1]).text(parseInt(NUM_GAMES - seasonPathWins[index - 1]));
                            highlightLine(seasonPathIds[index - 1], 0, seasonPathColors[index - 1]);
                            fadeLine(seasonPathIds[index], animationTime, 0);
                          }
                        }

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _updateChart.apply(this, arguments);
            };

            updateChart = function _ref9(_x16, _x17, _x18, _x19, _x20, _x21) {
              return _updateChart.apply(this, arguments);
            };

            // if (isMobile.any()) {
            //  d3.select("#scrolly-overlay").style("display", "block").style("visibility", "visible");
            // } else {
            //  d3.select("#scrolly-side").style("display", "block").style("visibility", "visible");
            // }
            _drawBaseTiles3 = drawBaseTiles(league, ".explanatory-container", "explanatory-", false), _drawBaseTiles4 = _slicedToArray(_drawBaseTiles3, 8), wrapper = _drawBaseTiles4[0], bounds = _drawBaseTiles4[1], dimensions = _drawBaseTiles4[2], tiles = _drawBaseTiles4[3], tilesGroup = _drawBaseTiles4[4], yearIntervals = _drawBaseTiles4[5], xScale = _drawBaseTiles4[6], yScale = _drawBaseTiles4[7];
            _context5.next = 5;
            return d3.json("/assets/data/".concat(league, "_season_paths.json"));

          case 5:
            seasonData = _context5.sent;
            evenSeasons = [];
            evenSeasonTeams = [];
            evenSeasonYears = [];
            teams = Object.keys(seasonData);

            for (i = 0; i < teams.length; i++) {
              team = teams[i];
              _seasons = seasonData[team]['seasons'];
              years = Object.keys(_seasons);

              for (j = 0; j < years.length; j++) {
                year = years[j];
                season = _seasons[year];
                evenRecord = league === "NBA" ? "4141" : "1717";

                if (Object.keys(season).includes(evenRecord)) {
                  evenSeasons.push(season);
                  evenSeasonTeams.push(team);
                  evenSeasonYears.push(year);
                }
              }
            }

            previousWins = 0;
            previousLosses = 0;
            previousState = '';
            evenSeasonStreakCounts = [];
            evenSeasonDistances = [];

            for (i = 0; i < evenSeasons.length; i++) {
              evenSeason = evenSeasons[i];
              evenSeasonStreakCount = 0;
              totalDistance = 0;
              winLossKeys = Object.keys(evenSeason).sort();

              for (j = 0; j < winLossKeys.length; j++) {
                winLossKey = winLossKeys[j];
                wins = evenSeason[winLossKey]['win'];
                losses = evenSeason[winLossKey]['loss'];
                state = wins > previousWins ? 'W' : 'L';
                expectedWins = j % 2 === 0 ? j / 2 : (j - 1) / 2 + 1;
                expectedLosses = j % 2 === 0 ? expectedWins : expectedWins - 1;
                distance = Math.abs(expectedWins - wins);
                totalDistance += distance;

                if (state === previousState) {
                  evenSeasonStreakCount += 1;
                }

                previousWins = wins;
                previousLosses = losses;
                previousState = state;
              }

              evenSeasonStreakCounts.push(evenSeasonStreakCount);
              evenSeasonDistances.push(totalDistance);
            }

            evenSeasonSummary = [];

            for (i = 0; i < evenSeasonTeams.length; i++) {
              summary = {
                'team': evenSeasonTeams[i],
                'season': evenSeasons[i],
                'year': evenSeasonYears[i],
                'streak': evenSeasonStreakCounts[i],
                'distance': evenSeasonDistances[i],
                'multiplier': evenSeasonStreakCounts[i] * evenSeasonDistances[i]
              };
              evenSeasonSummary.push(summary);
            } // var colours = ["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c",
            //             "#f9d057","#f29e2e","#e76818","#d7191c"];


            colours = ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'];
            heatmapColour = d3.scaleLinear().domain(d3.range(0, 1.1, 1.0 / (colours.length - 1))).range(colours); // var heatmapColour = d3.scaleLinear()
            //  .domain([0,1])
            //  .range(['#d73027', '#1a9850'])
            //  .interpolate(d3.interpolateHcl);

            iterableTiles = tiles._groups[0];

            for (i = 0; i < iterableTiles.length; i++) {
              tile = iterableTiles[i];
              tileId = tile.id;
              winPct = tile.attributes.winPct.value;
              tileById = d3.select("#".concat(tileId)); // tileById.style("fill", heatmapColour(winPct))
              // tileById.style("opacity", 1)
            }

            seasonLines = [];
            seasonPathIds = [];
            seasonPathColors = [];
            seasonLineGenerator = d3.line().x(function (d) {
              return xScale(lossAccessor(d)) + dimensions.boundedWidth / NUM_GAMES / 2;
            }).y(function (d) {
              return yScale(winAccessor(d)) + dimensions.boundedWidth / NUM_GAMES / 2;
            });
            pureWinKey = "".concat(NUM_GAMES, "00");
            pureWinSeason = {
              "0000": {
                "win": 0,
                "loss": 0
              }
            };
            pureWinSeason[pureWinKey] = {
              "win": NUM_GAMES,
              "loss": 0
            };
            pureWinSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(pureWinSeason, xScale));
            seasonLines.push(pureWinSeasonLine);
            seasonPathIds.push("pure-win");
            seasonPathColors.push("#1a9850");

            if (LEAGUE === NBA) {
              // Golden State Warriors (2017)
              bestSeason = {
                "0000": {
                  "win": 0,
                  "loss": 0
                },
                "0100": {
                  "win": 1.0,
                  "loss": 0.0
                },
                "0200": {
                  "win": 2.0,
                  "loss": 0.0
                },
                "0300": {
                  "win": 3.0,
                  "loss": 0.0
                },
                "0400": {
                  "win": 4.0,
                  "loss": 0.0
                },
                "0500": {
                  "win": 5.0,
                  "loss": 0.0
                },
                "0600": {
                  "win": 6.0,
                  "loss": 0.0
                },
                "0700": {
                  "win": 7.0,
                  "loss": 0.0
                },
                "0800": {
                  "win": 8.0,
                  "loss": 0.0
                },
                "0900": {
                  "win": 9.0,
                  "loss": 0.0
                },
                "1000": {
                  "win": 10.0,
                  "loss": 0.0
                },
                "1100": {
                  "win": 11.0,
                  "loss": 0.0
                },
                "1200": {
                  "win": 12.0,
                  "loss": 0.0
                },
                "1300": {
                  "win": 13.0,
                  "loss": 0.0
                },
                "1400": {
                  "win": 14.0,
                  "loss": 0.0
                },
                "1500": {
                  "win": 15.0,
                  "loss": 0.0
                },
                "1600": {
                  "win": 16.0,
                  "loss": 0.0
                },
                "1700": {
                  "win": 17.0,
                  "loss": 0.0
                },
                "1800": {
                  "win": 18.0,
                  "loss": 0.0
                },
                "1900": {
                  "win": 19.0,
                  "loss": 0.0
                },
                "2000": {
                  "win": 20.0,
                  "loss": 0.0
                },
                "2100": {
                  "win": 21.0,
                  "loss": 0.0
                },
                "2200": {
                  "win": 22.0,
                  "loss": 0.0
                },
                "2300": {
                  "win": 23.0,
                  "loss": 0.0
                },
                "2400": {
                  "win": 24.0,
                  "loss": 0.0
                },
                "2401": {
                  "win": 24.0,
                  "loss": 1.0
                },
                "2501": {
                  "win": 25.0,
                  "loss": 1.0
                },
                "2601": {
                  "win": 26.0,
                  "loss": 1.0
                },
                "2701": {
                  "win": 27.0,
                  "loss": 1.0
                },
                "2801": {
                  "win": 28.0,
                  "loss": 1.0
                },
                "2901": {
                  "win": 29.0,
                  "loss": 1.0
                },
                "2902": {
                  "win": 29.0,
                  "loss": 2.0
                },
                "3002": {
                  "win": 30.0,
                  "loss": 2.0
                },
                "3102": {
                  "win": 31.0,
                  "loss": 2.0
                },
                "3202": {
                  "win": 32.0,
                  "loss": 2.0
                },
                "3302": {
                  "win": 33.0,
                  "loss": 2.0
                },
                "3402": {
                  "win": 34.0,
                  "loss": 2.0
                },
                "3502": {
                  "win": 35.0,
                  "loss": 2.0
                },
                "3602": {
                  "win": 36.0,
                  "loss": 2.0
                },
                "3603": {
                  "win": 36.0,
                  "loss": 3.0
                },
                "3703": {
                  "win": 37.0,
                  "loss": 3.0
                },
                "3704": {
                  "win": 37.0,
                  "loss": 4.0
                },
                "3804": {
                  "win": 38.0,
                  "loss": 4.0
                },
                "3904": {
                  "win": 39.0,
                  "loss": 4.0
                },
                "4004": {
                  "win": 40.0,
                  "loss": 4.0
                },
                "4104": {
                  "win": 41.0,
                  "loss": 4.0
                },
                "4204": {
                  "win": 42.0,
                  "loss": 4.0
                },
                "4304": {
                  "win": 43.0,
                  "loss": 4.0
                },
                "4404": {
                  "win": 44.0,
                  "loss": 4.0
                },
                "4504": {
                  "win": 45.0,
                  "loss": 4.0
                },
                "4604": {
                  "win": 46.0,
                  "loss": 4.0
                },
                "4704": {
                  "win": 47.0,
                  "loss": 4.0
                },
                "4804": {
                  "win": 48.0,
                  "loss": 4.0
                },
                "4805": {
                  "win": 48.0,
                  "loss": 5.0
                },
                "4905": {
                  "win": 49.0,
                  "loss": 5.0
                },
                "5005": {
                  "win": 50.0,
                  "loss": 5.0
                },
                "5105": {
                  "win": 51.0,
                  "loss": 5.0
                },
                "5205": {
                  "win": 52.0,
                  "loss": 5.0
                },
                "5305": {
                  "win": 53.0,
                  "loss": 5.0
                },
                "5405": {
                  "win": 54.0,
                  "loss": 5.0
                },
                "5505": {
                  "win": 55.0,
                  "loss": 5.0
                },
                "5506": {
                  "win": 55.0,
                  "loss": 6.0
                },
                "5606": {
                  "win": 56.0,
                  "loss": 6.0
                },
                "5706": {
                  "win": 57.0,
                  "loss": 6.0
                },
                "5806": {
                  "win": 58.0,
                  "loss": 6.0
                },
                "5906": {
                  "win": 59.0,
                  "loss": 6.0
                },
                "6006": {
                  "win": 60.0,
                  "loss": 6.0
                },
                "6106": {
                  "win": 61.0,
                  "loss": 6.0
                },
                "6206": {
                  "win": 62.0,
                  "loss": 6.0
                },
                "6207": {
                  "win": 62.0,
                  "loss": 7.0
                },
                "6307": {
                  "win": 63.0,
                  "loss": 7.0
                },
                "6407": {
                  "win": 64.0,
                  "loss": 7.0
                },
                "6507": {
                  "win": 65.0,
                  "loss": 7.0
                },
                "6607": {
                  "win": 66.0,
                  "loss": 7.0
                },
                "6707": {
                  "win": 67.0,
                  "loss": 7.0
                },
                "6807": {
                  "win": 68.0,
                  "loss": 7.0
                },
                "6808": {
                  "win": 68.0,
                  "loss": 8.0
                },
                "6908": {
                  "win": 69.0,
                  "loss": 8.0
                },
                "6909": {
                  "win": 69.0,
                  "loss": 9.0
                },
                "7009": {
                  "win": 70.0,
                  "loss": 9.0
                },
                "7109": {
                  "win": 71.0,
                  "loss": 9.0
                },
                "7209": {
                  "win": 72.0,
                  "loss": 9.0
                },
                "7309": {
                  "win": 73.0,
                  "loss": 9.0
                }
              };
            } else {
              // New York Liberty (2024)
              bestSeason = {
                "1002": {
                    "win": 10,
                    "loss": 2
                },
                "1102": {
                    "win": 11,
                    "loss": 2
                },
                "1202": {
                    "win": 12,
                    "loss": 2
                },
                "1203": {
                    "win": 12,
                    "loss": 3
                },
                "1303": {
                    "win": 13,
                    "loss": 3
                },
                "1403": {
                    "win": 14,
                    "loss": 3
                },
                "1503": {
                    "win": 15,
                    "loss": 3
                },
                "1603": {
                    "win": 16,
                    "loss": 3
                },
                "1703": {
                    "win": 17,
                    "loss": 3
                },
                "1704": {
                    "win": 17,
                    "loss": 4
                },
                "1804": {
                    "win": 18,
                    "loss": 4
                },
                "1904": {
                    "win": 19,
                    "loss": 4
                },
                "2004": {
                    "win": 20,
                    "loss": 4
                },
                "2104": {
                    "win": 21,
                    "loss": 4
                },
                "2204": {
                    "win": 22,
                    "loss": 4
                },
                "2304": {
                    "win": 23,
                    "loss": 4
                },
                "2404": {
                    "win": 24,
                    "loss": 4
                },
                "2504": {
                    "win": 25,
                    "loss": 4
                },
                "2505": {
                    "win": 25,
                    "loss": 5
                },
                "2605": {
                    "win": 26,
                    "loss": 5
                },
                "2606": {
                    "win": 26,
                    "loss": 6
                },
                "2706": {
                    "win": 27,
                    "loss": 6
                },
                "2806": {
                    "win": 28,
                    "loss": 6
                },
                "2906": {
                    "win": 29,
                    "loss": 6
                },
                "3006": {
                    "win": 30,
                    "loss": 6
                },
                "3106": {
                    "win": 31,
                    "loss": 6
                },
                "3107": {
                    "win": 31,
                    "loss": 7
                },
                "3207": {
                    "win": 32,
                    "loss": 7
                },
                "3208": {
                    "win": 32,
                    "loss": 8
                },
                "0000": {
                    "win": 0,
                    "loss": 0
                },
                "0100": {
                    "win": 1,
                    "loss": 0
                },
                "0200": {
                    "win": 2,
                    "loss": 0
                },
                "0300": {
                    "win": 3,
                    "loss": 0
                },
                "0400": {
                    "win": 4,
                    "loss": 0
                },
                "0401": {
                    "win": 4,
                    "loss": 1
                },
                "0402": {
                    "win": 4,
                    "loss": 2
                },
                "0502": {
                    "win": 5,
                    "loss": 2
                },
                "0602": {
                    "win": 6,
                    "loss": 2
                },
                "0702": {
                    "win": 7,
                    "loss": 2
                },
                "0802": {
                    "win": 8,
                    "loss": 2
                },
                "0902": {
                    "win": 9,
                    "loss": 2
                }
            };
            }

            bestSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(bestSeason, xScale));
            seasonLines.push(bestSeasonLine);
            seasonPathIds.push("best-line");
            seasonPathColors.push("#1a9850"); // 66bd63

            middleSeason = {
              "0000": {
                'win': 0,
                'loss': 0
              }
            };
            middleWins = 0;
            middleLosses = 0;

            for (i = 0; i < NUM_GAMES; i++) {
              if (i % 2 === 0) {
                middleWins += 1;
              } else {
                middleLosses += 1;
              }

              middleWinsText = middleWins < 10 ? "0".concat(middleWins) : middleWins;
              middleLossText = middleLosses < 10 ? "0".concat(middleLosses) : middleLosses;
              middleKey = "".concat(middleWinsText).concat(middleLossText);
              middleSeason[middleKey] = {
                'win': middleWins,
                'loss': middleLosses
              };
            }

            middleSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(middleSeason, xScale));
            seasonLines.push(middleSeasonLine);
            seasonPathIds.push("middle-line");
            seasonPathColors.push("#fecb3f");

            if (LEAGUE === NBA) {
              // Miami Heat 2017 (41-41) - weird year
              // mediocreSeason = {"1020": {"win": 10,"loss": 20},"1021": {"win": 10,"loss": 21},"1022": {"win": 10,"loss": 22},"1023": {"win": 10,"loss": 23},"1024": {"win": 10,"loss": 24},"1025": {"win": 10,"loss": 25},"1026": {"win": 10,"loss": 26},"1126": {"win": 11,"loss": 26},"1127": {"win": 11,"loss": 27},"1128": {"win": 11,"loss": 28},"1129": {"win": 11,"loss": 29},"1130": {"win": 11,"loss": 30},"1230": {"win": 12,"loss": 30},"1330": {"win": 13,"loss": 30},"1430": {"win": 14,"loss": 30},"1530": {"win": 15,"loss": 30},"1630": {"win": 16,"loss": 30},"1730": {"win": 17,"loss": 30},"1830": {"win": 18,"loss": 30},"1930": {"win": 19,"loss": 30},"2030": {"win": 20,"loss": 30},"2130": {"win": 21,"loss": 30},"2230": {"win": 22,"loss": 30},"2330": {"win": 23,"loss": 30},"2430": {"win": 24,"loss": 30},"2431": {"win": 24,"loss": 31},"2432": {"win": 24,"loss": 32},"2532": {"win": 25,"loss": 32},"2632": {"win": 26,"loss": 32},"2732": {"win": 27,"loss": 32},"2733": {"win": 27,"loss": 33},"2833": {"win": 28,"loss": 33},"2834": {"win": 28,"loss": 34},"2934": {"win": 29,"loss": 34},"3034": {"win": 30,"loss": 34},"3134": {"win": 31,"loss": 34},"3234": {"win": 32,"loss": 34},"3235": {"win": 32,"loss": 35},"3335": {"win": 33,"loss": 35},"3435": {"win": 34,"loss": 35},"3436": {"win": 34,"loss": 36},"3536": {"win": 35,"loss": 36},"3537": {"win": 35,"loss": 37},"3538": {"win": 35,"loss": 38},"3638": {"win": 36,"loss": 38},"3738": {"win": 37,"loss": 38},"3739": {"win": 37,"loss": 39},"3740": {"win": 37,"loss": 40},"3840": {"win": 38,"loss": 40},"3841": {"win": 38,"loss": 41},"3941": {"win": 39,"loss": 41},"4041": {"win": 40,"loss": 41},"4141": {"win": 41,"loss": 41},"0000": {"win": 0,"loss": 0},"0100": {"win": 1,"loss": 0},"0101": {"win": 1,"loss": 1},"0102": {"win": 1,"loss": 2},"0202": {"win": 2,"loss": 2},"0203": {"win": 2,"loss": 3},"0204": {"win": 2,"loss": 4},"0205": {"win": 2,"loss": 5},"0206": {"win": 2,"loss": 6},"0207": {"win": 2,"loss": 7},"0208": {"win": 2,"loss": 8},"0308": {"win": 3,"loss": 8},"0408": {"win": 4,"loss": 8},"0409": {"win": 4,"loss": 9},"0410": {"win": 4,"loss": 10},"0510": {"win": 5,"loss": 10},"0511": {"win": 5,"loss": 11},"0512": {"win": 5,"loss": 12},"0612": {"win": 6,"loss": 12},"0712": {"win": 7,"loss": 12},"0713": {"win": 7,"loss": 13},"0714": {"win": 7,"loss": 14},"0715": {"win": 7,"loss": 15},"0716": {"win": 7,"loss": 16},"0717": {"win": 7,"loss": 17},"0817": {"win": 8,"loss": 17},"0917": {"win": 9,"loss": 17},"0918": {"win": 9,"loss": 18},"0919": {"win": 9,"loss": 19},"0920": {"win": 9,"loss": 20}}
              // Seattle Supersonics 1990 (41-41)
              mediocreSeason = {
                "1007": {
                  "win": 10,
                  "loss": 7
                },
                "1107": {
                  "win": 11,
                  "loss": 7
                },
                "1108": {
                  "win": 11,
                  "loss": 8
                },
                "1109": {
                  "win": 11,
                  "loss": 9
                },
                "1110": {
                  "win": 11,
                  "loss": 10
                },
                "1111": {
                  "win": 11,
                  "loss": 11
                },
                "1211": {
                  "win": 12,
                  "loss": 11
                },
                "1212": {
                  "win": 12,
                  "loss": 12
                },
                "1312": {
                  "win": 13,
                  "loss": 12
                },
                "1313": {
                  "win": 13,
                  "loss": 13
                },
                "1314": {
                  "win": 13,
                  "loss": 14
                },
                "1414": {
                  "win": 14,
                  "loss": 14
                },
                "1514": {
                  "win": 15,
                  "loss": 14
                },
                "1515": {
                  "win": 15,
                  "loss": 15
                },
                "1516": {
                  "win": 15,
                  "loss": 16
                },
                "1616": {
                  "win": 16,
                  "loss": 16
                },
                "1716": {
                  "win": 17,
                  "loss": 16
                },
                "1816": {
                  "win": 18,
                  "loss": 16
                },
                "1817": {
                  "win": 18,
                  "loss": 17
                },
                "1818": {
                  "win": 18,
                  "loss": 18
                },
                "1819": {
                  "win": 18,
                  "loss": 19
                },
                "1820": {
                  "win": 18,
                  "loss": 20
                },
                "1821": {
                  "win": 18,
                  "loss": 21
                },
                "1921": {
                  "win": 19,
                  "loss": 21
                },
                "1922": {
                  "win": 19,
                  "loss": 22
                },
                "2022": {
                  "win": 20,
                  "loss": 22
                },
                "2122": {
                  "win": 21,
                  "loss": 22
                },
                "2222": {
                  "win": 22,
                  "loss": 22
                },
                "2223": {
                  "win": 22,
                  "loss": 23
                },
                "2224": {
                  "win": 22,
                  "loss": 24
                },
                "2324": {
                  "win": 23,
                  "loss": 24
                },
                "2325": {
                  "win": 23,
                  "loss": 25
                },
                "2425": {
                  "win": 24,
                  "loss": 25
                },
                "2525": {
                  "win": 25,
                  "loss": 25
                },
                "2625": {
                  "win": 26,
                  "loss": 25
                },
                "2725": {
                  "win": 27,
                  "loss": 25
                },
                "2825": {
                  "win": 28,
                  "loss": 25
                },
                "2826": {
                  "win": 28,
                  "loss": 26
                },
                "2827": {
                  "win": 28,
                  "loss": 27
                },
                "2927": {
                  "win": 29,
                  "loss": 27
                },
                "2928": {
                  "win": 29,
                  "loss": 28
                },
                "3028": {
                  "win": 30,
                  "loss": 28
                },
                "3029": {
                  "win": 30,
                  "loss": 29
                },
                "3030": {
                  "win": 30,
                  "loss": 30
                },
                "3130": {
                  "win": 31,
                  "loss": 30
                },
                "3230": {
                  "win": 32,
                  "loss": 30
                },
                "3231": {
                  "win": 32,
                  "loss": 31
                },
                "3331": {
                  "win": 33,
                  "loss": 31
                },
                "3332": {
                  "win": 33,
                  "loss": 32
                },
                "3432": {
                  "win": 34,
                  "loss": 32
                },
                "3433": {
                  "win": 34,
                  "loss": 33
                },
                "3434": {
                  "win": 34,
                  "loss": 34
                },
                "3435": {
                  "win": 34,
                  "loss": 35
                },
                "3535": {
                  "win": 35,
                  "loss": 35
                },
                "3536": {
                  "win": 35,
                  "loss": 36
                },
                "3636": {
                  "win": 36,
                  "loss": 36
                },
                "3736": {
                  "win": 37,
                  "loss": 36
                },
                "3737": {
                  "win": 37,
                  "loss": 37
                },
                "3738": {
                  "win": 37,
                  "loss": 38
                },
                "3739": {
                  "win": 37,
                  "loss": 39
                },
                "3839": {
                  "win": 38,
                  "loss": 39
                },
                "3939": {
                  "win": 39,
                  "loss": 39
                },
                "3940": {
                  "win": 39,
                  "loss": 40
                },
                "4040": {
                  "win": 40,
                  "loss": 40
                },
                "4140": {
                  "win": 41,
                  "loss": 40
                },
                "4141": {
                  "win": 41,
                  "loss": 41
                },
                "0000": {
                  "win": 0,
                  "loss": 0
                },
                "0100": {
                  "win": 1,
                  "loss": 0
                },
                "0101": {
                  "win": 1,
                  "loss": 1
                },
                "0201": {
                  "win": 2,
                  "loss": 1
                },
                "0202": {
                  "win": 2,
                  "loss": 2
                },
                "0203": {
                  "win": 2,
                  "loss": 3
                },
                "0303": {
                  "win": 3,
                  "loss": 3
                },
                "0304": {
                  "win": 3,
                  "loss": 4
                },
                "0404": {
                  "win": 4,
                  "loss": 4
                },
                "0504": {
                  "win": 5,
                  "loss": 4
                },
                "0505": {
                  "win": 5,
                  "loss": 5
                },
                "0605": {
                  "win": 6,
                  "loss": 5
                },
                "0606": {
                  "win": 6,
                  "loss": 6
                },
                "0706": {
                  "win": 7,
                  "loss": 6
                },
                "0707": {
                  "win": 7,
                  "loss": 7
                },
                "0807": {
                  "win": 8,
                  "loss": 7
                },
                "0907": {
                  "win": 9,
                  "loss": 7
                }
              };
            } else {
              // Indiana Fever 2024 (20-20)
              mediocreSeason = {
                "1014": {
                    "win": 10,
                    "loss": 14
                },
                "1114": {
                    "win": 11,
                    "loss": 14
                },
                "1115": {
                    "win": 11,
                    "loss": 15
                },
                "1215": {
                    "win": 12,
                    "loss": 15
                },
                "1315": {
                    "win": 13,
                    "loss": 15
                },
                "1316": {
                    "win": 13,
                    "loss": 16
                },
                "1416": {
                    "win": 14,
                    "loss": 16
                },
                "1516": {
                    "win": 15,
                    "loss": 16
                },
                "1616": {
                    "win": 16,
                    "loss": 16
                },
                "1716": {
                    "win": 17,
                    "loss": 16
                },
                "1816": {
                    "win": 18,
                    "loss": 16
                },
                "1817": {
                    "win": 18,
                    "loss": 17
                },
                "1917": {
                    "win": 19,
                    "loss": 17
                },
                "1918": {
                    "win": 19,
                    "loss": 18
                },
                "1919": {
                    "win": 19,
                    "loss": 19
                },
                "2019": {
                    "win": 20,
                    "loss": 19
                },
                "2020": {
                    "win": 20,
                    "loss": 20
                },
                "0000": {
                    "win": 0,
                    "loss": 0
                },
                "0001": {
                    "win": 0,
                    "loss": 1
                },
                "0002": {
                    "win": 0,
                    "loss": 2
                },
                "0003": {
                    "win": 0,
                    "loss": 3
                },
                "0004": {
                    "win": 0,
                    "loss": 4
                },
                "0005": {
                    "win": 0,
                    "loss": 5
                },
                "0105": {
                    "win": 1,
                    "loss": 5
                },
                "0106": {
                    "win": 1,
                    "loss": 6
                },
                "0107": {
                    "win": 1,
                    "loss": 7
                },
                "0108": {
                    "win": 1,
                    "loss": 8
                },
                "0208": {
                    "win": 2,
                    "loss": 8
                },
                "0209": {
                    "win": 2,
                    "loss": 9
                },
                "0309": {
                    "win": 3,
                    "loss": 9
                },
                "0310": {
                    "win": 3,
                    "loss": 10
                },
                "0410": {
                    "win": 4,
                    "loss": 10
                },
                "0510": {
                    "win": 5,
                    "loss": 10
                },
                "0610": {
                    "win": 6,
                    "loss": 10
                },
                "0710": {
                    "win": 7,
                    "loss": 10
                },
                "0711": {
                    "win": 7,
                    "loss": 11
                },
                "0712": {
                    "win": 7,
                    "loss": 12
                },
                "0812": {
                    "win": 8,
                    "loss": 12
                },
                "0813": {
                    "win": 8,
                    "loss": 13
                },
                "0913": {
                    "win": 9,
                    "loss": 13
                },
                "0914": {
                    "win": 9,
                    "loss": 14
                }
              };
            }

            mediocreSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(mediocreSeason, xScale));
            seasonLines.push(mediocreSeasonLine);
            seasonPathIds.push("medicore-line-".concat(i));
            seasonPathColors.push("#fecb3f"); // fee08b

            pureLossKey = "00".concat(NUM_GAMES);
            pureLossSeason = {
              "0000": {
                "win": 0,
                "loss": 0
              }
            };
            pureLossSeason[pureLossKey] = {
              "win": 0,
              "loss": NUM_GAMES
            };
            pureLossSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(pureLossSeason, xScale));
            seasonLines.push(pureLossSeasonLine);
            seasonPathIds.push("pure-loss");
            seasonPathColors.push("#d73027");

            if (LEAGUE === NBA) {
              // Philadelphia 76ers
              worstSeason = {
                "0000": {
                  "win": 0,
                  "loss": 0
                },
                "0001": {
                  "win": 0.0,
                  "loss": 1.0
                },
                "0002": {
                  "win": 0.0,
                  "loss": 2.0
                },
                "0003": {
                  "win": 0.0,
                  "loss": 3.0
                },
                "0004": {
                  "win": 0.0,
                  "loss": 4.0
                },
                "0005": {
                  "win": 0.0,
                  "loss": 5.0
                },
                "0006": {
                  "win": 0.0,
                  "loss": 6.0
                },
                "0007": {
                  "win": 0.0,
                  "loss": 7.0
                },
                "0008": {
                  "win": 0.0,
                  "loss": 8.0
                },
                "0009": {
                  "win": 0.0,
                  "loss": 9.0
                },
                "0010": {
                  "win": 0.0,
                  "loss": 10.0
                },
                "0011": {
                  "win": 0.0,
                  "loss": 11.0
                },
                "0012": {
                  "win": 0.0,
                  "loss": 12.0
                },
                "0013": {
                  "win": 0.0,
                  "loss": 13.0
                },
                "0014": {
                  "win": 0.0,
                  "loss": 14.0
                },
                "0015": {
                  "win": 0.0,
                  "loss": 15.0
                },
                "0115": {
                  "win": 1.0,
                  "loss": 15.0
                },
                "0116": {
                  "win": 1.0,
                  "loss": 16.0
                },
                "0117": {
                  "win": 1.0,
                  "loss": 17.0
                },
                "0118": {
                  "win": 1.0,
                  "loss": 18.0
                },
                "0119": {
                  "win": 1.0,
                  "loss": 19.0
                },
                "0120": {
                  "win": 1.0,
                  "loss": 20.0
                },
                "0121": {
                  "win": 1.0,
                  "loss": 21.0
                },
                "0221": {
                  "win": 2.0,
                  "loss": 21.0
                },
                "0222": {
                  "win": 2.0,
                  "loss": 22.0
                },
                "0223": {
                  "win": 2.0,
                  "loss": 23.0
                },
                "0224": {
                  "win": 2.0,
                  "loss": 24.0
                },
                "0324": {
                  "win": 3.0,
                  "loss": 24.0
                },
                "0325": {
                  "win": 3.0,
                  "loss": 25.0
                },
                "0326": {
                  "win": 3.0,
                  "loss": 26.0
                },
                "0327": {
                  "win": 3.0,
                  "loss": 27.0
                },
                "0328": {
                  "win": 3.0,
                  "loss": 28.0
                },
                "0329": {
                  "win": 3.0,
                  "loss": 29.0
                },
                "0330": {
                  "win": 3.0,
                  "loss": 30.0
                },
                "0331": {
                  "win": 3.0,
                  "loss": 31.0
                },
                "0332": {
                  "win": 3.0,
                  "loss": 32.0
                },
                "0333": {
                  "win": 3.0,
                  "loss": 33.0
                },
                "0334": {
                  "win": 3.0,
                  "loss": 34.0
                },
                "0335": {
                  "win": 3.0,
                  "loss": 35.0
                },
                "0336": {
                  "win": 3.0,
                  "loss": 36.0
                },
                "0337": {
                  "win": 3.0,
                  "loss": 37.0
                },
                "0338": {
                  "win": 3.0,
                  "loss": 38.0
                },
                "0438": {
                  "win": 4.0,
                  "loss": 38.0
                },
                "0439": {
                  "win": 4.0,
                  "loss": 39.0
                },
                "0440": {
                  "win": 4.0,
                  "loss": 40.0
                },
                "0441": {
                  "win": 4.0,
                  "loss": 41.0
                },
                "0442": {
                  "win": 4.0,
                  "loss": 42.0
                },
                "0443": {
                  "win": 4.0,
                  "loss": 43.0
                },
                "0444": {
                  "win": 4.0,
                  "loss": 44.0
                },
                "0445": {
                  "win": 4.0,
                  "loss": 45.0
                },
                "0446": {
                  "win": 4.0,
                  "loss": 46.0
                },
                "0447": {
                  "win": 4.0,
                  "loss": 47.0
                },
                "0448": {
                  "win": 4.0,
                  "loss": 48.0
                },
                "0449": {
                  "win": 4.0,
                  "loss": 49.0
                },
                "0450": {
                  "win": 4.0,
                  "loss": 50.0
                },
                "0451": {
                  "win": 4.0,
                  "loss": 51.0
                },
                "0452": {
                  "win": 4.0,
                  "loss": 52.0
                },
                "0453": {
                  "win": 4.0,
                  "loss": 53.0
                },
                "0454": {
                  "win": 4.0,
                  "loss": 54.0
                },
                "0455": {
                  "win": 4.0,
                  "loss": 55.0
                },
                "0456": {
                  "win": 4.0,
                  "loss": 56.0
                },
                "0457": {
                  "win": 4.0,
                  "loss": 57.0
                },
                "0458": {
                  "win": 4.0,
                  "loss": 58.0
                },
                "0558": {
                  "win": 5.0,
                  "loss": 58.0
                },
                "0658": {
                  "win": 6.0,
                  "loss": 58.0
                },
                "0659": {
                  "win": 6.0,
                  "loss": 59.0
                },
                "0759": {
                  "win": 7.0,
                  "loss": 59.0
                },
                "0760": {
                  "win": 7.0,
                  "loss": 60.0
                },
                "0860": {
                  "win": 8.0,
                  "loss": 60.0
                },
                "0960": {
                  "win": 9.0,
                  "loss": 60.0
                },
                "0961": {
                  "win": 9.0,
                  "loss": 61.0
                },
                "0962": {
                  "win": 9.0,
                  "loss": 62.0
                },
                "0963": {
                  "win": 9.0,
                  "loss": 63.0
                },
                "0964": {
                  "win": 9.0,
                  "loss": 64.0
                },
                "0965": {
                  "win": 9.0,
                  "loss": 65.0
                },
                "0966": {
                  "win": 9.0,
                  "loss": 66.0
                },
                "0967": {
                  "win": 9.0,
                  "loss": 67.0
                },
                "0968": {
                  "win": 9.0,
                  "loss": 68.0
                },
                "0969": {
                  "win": 9.0,
                  "loss": 69.0
                },
                "0970": {
                  "win": 9.0,
                  "loss": 70.0
                },
                "0971": {
                  "win": 9.0,
                  "loss": 71.0
                },
                "0972": {
                  "win": 9.0,
                  "loss": 72.0
                },
                "0973": {
                  "win": 9.0,
                  "loss": 73.0
                }
              };
            } else {
              // Los Angeles Sparks (2024)

              worstSeason = {
                "0000": {
                    "win": 0,
                    "loss": 0
                },
                "0001": {
                    "win": 0,
                    "loss": 1
                },
                "0002": {
                    "win": 0,
                    "loss": 2
                },
                "0102": {
                    "win": 1,
                    "loss": 2
                },
                "0103": {
                    "win": 1,
                    "loss": 3
                },
                "0104": {
                    "win": 1,
                    "loss": 4
                },
                "0204": {
                    "win": 2,
                    "loss": 4
                },
                "0205": {
                    "win": 2,
                    "loss": 5
                },
                "0206": {
                    "win": 2,
                    "loss": 6
                },
                "0207": {
                    "win": 2,
                    "loss": 7
                },
                "0307": {
                    "win": 3,
                    "loss": 7
                },
                "0407": {
                    "win": 4,
                    "loss": 7
                },
                "0408": {
                    "win": 4,
                    "loss": 8
                },
                "0409": {
                    "win": 4,
                    "loss": 9
                },
                "0410": {
                    "win": 4,
                    "loss": 10
                },
                "0411": {
                    "win": 4,
                    "loss": 11
                },
                "0412": {
                    "win": 4,
                    "loss": 12
                },
                "0413": {
                    "win": 4,
                    "loss": 13
                },
                "0414": {
                    "win": 4,
                    "loss": 14
                },
                "0415": {
                    "win": 4,
                    "loss": 15
                },
                "0515": {
                    "win": 5,
                    "loss": 15
                },
                "0516": {
                    "win": 5,
                    "loss": 16
                },
                "0517": {
                    "win": 5,
                    "loss": 17
                },
                "0617": {
                    "win": 6,
                    "loss": 17
                },
                "0618": {
                    "win": 6,
                    "loss": 18
                },
                "0619": {
                    "win": 6,
                    "loss": 19
                },
                "0620": {
                    "win": 6,
                    "loss": 20
                },
                "0621": {
                    "win": 6,
                    "loss": 21
                },
                "0622": {
                    "win": 6,
                    "loss": 22
                },
                "0623": {
                    "win": 6,
                    "loss": 23
                },
                "0624": {
                    "win": 6,
                    "loss": 24
                },
                "0724": {
                    "win": 7,
                    "loss": 24
                },
                "0725": {
                    "win": 7,
                    "loss": 25
                },
                "0726": {
                    "win": 7,
                    "loss": 26
                },
                "0727": {
                    "win": 7,
                    "loss": 27
                },
                "0728": {
                    "win": 7,
                    "loss": 28
                },
                "0729": {
                    "win": 7,
                    "loss": 29
                },
                "0730": {
                    "win": 7,
                    "loss": 30
                },
                "0731": {
                    "win": 7,
                    "loss": 31
                },
                "0732": {
                    "win": 7,
                    "loss": 32
                },
                "0832": {
                    "win": 8,
                    "loss": 32
                }
            };
            }

            worstSeasonLine = seasonLineGenerator(formatSeasonToDrawPath(worstSeason, xScale));
            seasonLines.push(worstSeasonLine);
            seasonPathIds.push("worst-line");
            seasonPathColors.push("#d73027"); // f46d43
            // DRAWING EXPLANATORY GRAPH

            delay = function delay(ms) {
              return new Promise(function (res) {
                return setTimeout(res, ms);
              });
            };

            seasonPaths = bounds.selectAll(".path").data(seasonLines).enter().append("path").attr("class", "explanatory-path").attr("fill", "none").attr("opacity", 0).attr("stroke", function (d, i) {
              return seasonPathColors[i];
            }) // year
            .attr("stroke-width", dimensions.boundedWidth / NUM_GAMES - PADDING).attr("id", function (d, i) {
              return seasonPathIds[i];
            }).attr("d", function (d, i) {
              return seasonLines[i];
            }); // season

            seasonPathWins = [NUM_GAMES, BEST_WINS, NUM_GAMES / 2, MEDIOCRE_WINS, 0, WORST_WINS]; //    for (var i = 0; i < seasonPathIds.length; i++) {
            //  const animationTime = 1500
            //  const pathId = seasonPathIds[i]
            //  await delay(2000);
            //  animateLine(pathId, animationTime)
            // }  
            // SEASON_HISTORY[]

            hoverPct = .75;

            if (_isMobile.default.any()) {
              hoverPct = .65;
            }

            hoverStartingPointX = dimensions.boundedWidth * hoverPct;
            hoverWin = bounds.append("text").text('0').attr("class", "record-label").attr("id", 'win-label').attr("x", hoverStartingPointX).attr("y", 40).attr("text-anchor", "end").style("font-size", 30).style("fill", 'none').style("opacity", 0);
            hoverHyphen = bounds.append("text").text('-').attr("class", "record-label").attr("id", 'hyphen').attr("x", hoverStartingPointX + 14.5).attr("y", 40).attr("text-anchor", "middle").style("font-size", 30).style("fill", 'none').style("opacity", 0);
            hoverLoss = bounds.append("text").text('0').attr("class", "record-label").attr("id", 'loss-label').attr("x", hoverStartingPointX + 29).attr("y", 40).attr("text-anchor", "start").style("font-size", 30).style("fill", 'none').style("opacity", 0);
            container = d3.select('*[id^=scrolly-]');
            stepSel = container.selectAll('*[class^=step]');
            enterView({
              selector: stepSel.nodes(),
              offset: 0.6,
              enter: function enter(el) {
                var index = parseInt(d3.select(el).attr('data-index'));
                updateChart(index, seasonPathIds, seasonPathColors, seasonPathWins, "enter", league);
              },
              exit: function exit(el) {
                var index = parseInt(d3.select(el).attr('data-index'));
                updateChart(index, seasonPathIds, seasonPathColors, seasonPathWins, "exit", league);
              }
            });

          case 76:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _drawExplanatoryGraph.apply(this, arguments);
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{"babel-core/register":"km9A","babel-polyfill":"zUFY","./utils/is-mobile":"WEtf"}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{}, {
  "image": "nba",
  "url": "html/nba-season-history",
  "hed": "NBA Season History"
}, {
  "image": "nba",
  "url": "html/wnba-season-history",
  "hed": "WNBA Season History"
}, {}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName("script")[0];
  var script = document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === "function") {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://narro.design/assets/data/stories.json?v=".concat(v);
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  if (d.url !== " ") {
    return "\n\t<a class='footer-recirc__article' href='https://narro.design/".concat(d.url, "' target='_blank' rel='noopener'>\n\t\t<img class='article__img' src='./../assets/images/").concat(d.image, ".png' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
  } else {
    return "\n\t<a class='footer-recirc__article' target='_blank' rel='noopener'>\n\t\t<img class='article__img'".concat("' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
  }
}

function recircHTML() {
  var storyData = [{
    "image": "nba_season_triangle",
    "url": "html/nba-season-triangle",
    "hed": "NBA Season Triangle"
  }, {
    "image": "wnba_season_paths",
    "url": "html/wnba-season-history",
    "hed": "WNBA Season History"
  }, {
    "image": "nba_season_paths",
    "url": "html/nba-season-history",
    "hed": "NBA Season History"
  }];
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join("");
  d3.select(".narro-footer .footer-recirc__articles").html(html);
}

function init() {
  loadStories(function (data) {
    storyData
    recircHTML();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _linkFix = _interopRequireDefault(require("./utils/link-fix"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select("body");
var previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStickyHeader() {
  var $header = $body.select("header");

  if ($header.classed("is-sticky")) {
    var $menu = $body.select(".header__menu");
    var $toggle = $body.select(".header__toggle");
    $toggle.on("click", function () {
      var visible = $menu.classed("is-visible");
      $menu.classed("is-visible", !visible);
      $toggle.classed("is-visible", !visible);
    });
  }
}

function init() {
  // adds rel="noopener" to all target="_blank" links
  (0, _linkFix.default)(); // add mobile class to body tag

  $body.classed("is-mobile", _isMobile.default.any()); // setup resize event

  window.addEventListener("resize", (0, _lodash.default)(resize, 150)); // setup sticky header menu

  setupStickyHeader(); // kick off graphic code

  _graphic.default.init(); // load footer stories


  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./utils/link-fix":"U9xJ","./graphic":"graphic.js","./footer":"v9Q8"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map