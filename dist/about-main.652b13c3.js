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
})({"js/mobileMenu.js":[function(require,module,exports) {
var btnMenu = document.querySelector('.mobile__menu');
var mobileClose = document.querySelector('.mobile__close');
var nav = document.querySelector('.nav__top');
var navLinks = document.querySelectorAll('.nav__top a');
var overlay = document.querySelector('.overlay__menu');
var body = document.querySelector('body'); //-----
// This if statement will make sure this Function will only applies for mobile viewport.
//-----

if (window.innerWidth <= 700) {
  //---
  //Opening the Mobile Menu
  //---
  btnMenu.addEventListener('click', function () {
    btnMenu.style.display = 'none';
    mobileClose.style.display = 'block';
    overlay.style.visibility = 'visible';
    overlay.style.height = '100vh';
    nav.style.height = '250px';
    body.style.overflow = 'hidden';
    setTimeout(function () {
      navLinks[0].style.visibility = 'visible';
      navLinks[0].style.fontSize = '24px';
    }, 200);
    setTimeout(function () {
      navLinks[1].style.visibility = 'visible';
      navLinks[1].style.fontSize = '24px';
    }, 300);
    setTimeout(function () {
      navLinks[2].style.visibility = 'visible';
      navLinks[2].style.fontSize = '24px';
    }, 400);
  }); //---
  // Closing the Mobile Menu
  //---

  mobileClose.addEventListener('click', function () {
    setTimeout(function () {
      navLinks[0].style.visibility = 'hidden';
      navLinks[0].style.fontSize = '0';
    }, 300);
    setTimeout(function () {
      navLinks[1].style.visibility = 'hidden';
      navLinks[1].style.fontSize = '0';
    }, 200);
    setTimeout(function () {
      navLinks[2].style.visibility = 'hidden';
      navLinks[2].style.fontSize = '0';
    }, 100);
    setTimeout(function () {
      nav.style.height = '0';
    }, 300);
    setTimeout(function () {
      overlay.style.visibility = 'hidden';
      overlay.style.height = '0';
    }, 400);
    mobileClose.style.display = 'none';
    btnMenu.style.display = 'block';
    body.style.overflow = 'scroll';
  });
}
},{}],"assets/about/tablet/image-commitment.jpg":[function(require,module,exports) {
module.exports = "/image-commitment.14f2a310.jpg";
},{}],"assets/about/desktop/image-commitment.jpg":[function(require,module,exports) {
module.exports = "/image-commitment.c36e915c.jpg";
},{}],"assets/about/mobile/image-commitment.jpg":[function(require,module,exports) {
module.exports = "/image-commitment.d2f408a0.jpg";
},{}],"js/about-commit-image.js":[function(require,module,exports) {
"use strict";

var _imageCommitment = _interopRequireDefault(require("../assets/about/tablet/image-commitment.jpg"));

var _imageCommitment2 = _interopRequireDefault(require("../assets/about/desktop/image-commitment.jpg"));

var _imageCommitment3 = _interopRequireDefault(require("../assets/about/mobile/image-commitment.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commitImage = document.querySelector('.commitment__image img');

if (window.innerWidth <= 935) {
  commitImage.src = _imageCommitment.default;
}

if (window.innerWidth > 935) {
  commitImage.src = _imageCommitment2.default;
}

if (window.innerWidth <= 700) {
  commitImage.src = _imageCommitment3.default;
}

window.addEventListener('resize', function () {
  if (window.innerWidth >= 936) {
    commitImage.src = _imageCommitment2.default;
  }

  if (window.innerWidth <= 935) {
    commitImage.src = _imageCommitment.default;
  }

  if (window.innerWidth <= 700) {
    commitImage.src = _imageCommitment3.default;
  }
});
},{"../assets/about/tablet/image-commitment.jpg":"assets/about/tablet/image-commitment.jpg","../assets/about/desktop/image-commitment.jpg":"assets/about/desktop/image-commitment.jpg","../assets/about/mobile/image-commitment.jpg":"assets/about/mobile/image-commitment.jpg"}],"assets/about/tablet/image-quality.jpg":[function(require,module,exports) {
module.exports = "/image-quality.8ce79933.jpg";
},{}],"assets/about/desktop/image-quality.jpg":[function(require,module,exports) {
module.exports = "/image-quality.310619e1.jpg";
},{}],"assets/about/mobile/image-quality.jpg":[function(require,module,exports) {
module.exports = "/image-quality.d1a68c10.jpg";
},{}],"js/about-qulity-images.js":[function(require,module,exports) {
"use strict";

var _imageQuality = _interopRequireDefault(require("../assets/about/tablet/image-quality.jpg"));

var _imageQuality2 = _interopRequireDefault(require("../assets/about/desktop/image-quality.jpg"));

var _imageQuality3 = _interopRequireDefault(require("../assets/about/mobile/image-quality.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var qualityImage = document.querySelector('.quality__image img');

if (window.innerWidth <= 1200) {
  qualityImage.src = _imageQuality.default;
}

if (window.innerWidth > 1200) {
  qualityImage.src = _imageQuality2.default;
}

if (window.innerWidth <= 700) {
  qualityImage.src = _imageQuality3.default;
}

window.addEventListener('resize', function () {
  if (window.innerWidth >= 1200) {
    qualityImage.src = _imageQuality2.default;
  }

  if (window.innerWidth <= 1200) {
    qualityImage.src = _imageQuality.default;
  }

  if (window.innerWidth <= 700) {
    qualityImage.src = _imageQuality3.default;
  }
});
},{"../assets/about/tablet/image-quality.jpg":"assets/about/tablet/image-quality.jpg","../assets/about/desktop/image-quality.jpg":"assets/about/desktop/image-quality.jpg","../assets/about/mobile/image-quality.jpg":"assets/about/mobile/image-quality.jpg"}],"js/about-main.js":[function(require,module,exports) {
"use strict";

var _mobileMenu = require("./mobileMenu");

var _aboutCommitImage = require("./about-commit-image");

var _aboutQulityImages = require("./about-qulity-images");
},{"./mobileMenu":"js/mobileMenu.js","./about-commit-image":"js/about-commit-image.js","./about-qulity-images":"js/about-qulity-images.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61623" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/about-main.js"], null)
//# sourceMappingURL=/about-main.652b13c3.js.map