"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyManager = exports.testing = exports.signatureSubtle = exports.signature = exports.macSubtle = exports.mac = exports.hybrid = exports.generateNewKeysetHandle = exports.binaryInsecure = exports.binary = exports.aeadSubtle = exports.aead = exports.KeysetHandle = void 0;
// @ts-nocheck
var exported = {};
(function (global, factory) {
    typeof exported === 'object' && typeof module !== 'undefined' ? factory(exported, require('tslib')) :
        typeof define === 'function' && define.amd ? define('tink-crypto', ['exported', 'tslib'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tinkCrypto = {}, global.tslib));
}(this, (function (exported, tslib) {
    'use strict';
    var self = this;
    var window = {};
    window.navigator = {};
    const crypto = window.crypto = require('webcrypto').webcrypto;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * The base class for all security exceptions.
     */
    var SecurityException = /** @class */ (function (_super) {
        tslib.__extends(SecurityException, _super);
        function SecurityException(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, SecurityException.prototype);
            return _this;
        }
        return SecurityException;
    }(Error));
    SecurityException.prototype.name = 'SecurityException';
    // @ts-nocheck
    var PbMessage;
    var PbAesCmacKey;
    var PbAesCmacKeyFormat;
    var PbAesCmacParams;
    var PbAesCtrHmacAeadKey;
    var PbAesCtrHmacAeadKeyFormat;
    var PbAesCtrKey;
    var PbAesCtrKeyFormat;
    var PbAesCtrParams;
    var PbAesGcmKey;
    var PbAesGcmKeyFormat;
    var PbAesGcmSivKey;
    var PbAesGcmSivKeyFormat;
    var PbEcdsaKeyFormat;
    var PbEcdsaParams;
    var PbEcdsaPrivateKey;
    var PbEcdsaPublicKey;
    var PbEcdsaSignatureEncoding;
    var PbEciesAeadDemParams;
    var PbEciesAeadHkdfKeyFormat;
    var PbEciesAeadHkdfParams;
    var PbEciesAeadHkdfPrivateKey;
    var PbEciesAeadHkdfPublicKey;
    var PbEciesHkdfKemParams;
    var PbPointFormat;
    var PbEllipticCurveType;
    var PbEncryptedKeyset;
    var PbHashType;
    var PbHmacKey;
    var PbHmacKeyFormat;
    var PbHmacParams;
    var PbKeyData;
    var PbKeyMaterialType;
    var PbKeyset;
    var PbKeysetKey;
    var PbKeysetInfo;
    var PbKeyStatusType;
    var PbKeyTemplate;
    var PbOutputPrefixType;
    var PbXChaCha20Poly1305Key;
    var PbXChaCha20Poly1305KeyFormat;
    'use strict';
    var COMPILED = !0, goog = goog || {};
    goog.global = window;
    window.btoa = require('btoa');
    window.atob = require('atob');
    goog.isDef = function (a) {
        return void 0 !== a;
    };
    goog.isString = function (a) {
        return "string" == typeof a;
    };
    goog.isBoolean = function (a) {
        return "boolean" == typeof a;
    };
    goog.isNumber = function (a) {
        return "number" == typeof a;
    };
    goog.exportPath_ = function (a, b, c) {
        a = a.split(".");
        c = c || goog.global;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) {
            a.length || void 0 === b ? c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {} : c[d] = b;
        }
    };
    goog.define = function (a, b) {
        if (!COMPILED) {
            var c = goog.global.CLOSURE_UNCOMPILED_DEFINES, d = goog.global.CLOSURE_DEFINES;
            c && void 0 === c.nodeType && Object.prototype.hasOwnProperty.call(c, a) ? b = c[a] : d && void 0 === d.nodeType && Object.prototype.hasOwnProperty.call(d, a) && (b = d[a]);
        }
        return b;
    };
    goog.FEATURESET_YEAR = 2012;
    goog.DEBUG = !1;
    goog.LOCALE = "en";
    goog.TRUSTED_SITE = !0;
    goog.STRICT_MODE_COMPATIBLE = !1;
    goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
    goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
    goog.provide = function (a) {
        if (goog.isInModuleLoader_()) {
            throw Error("goog.provide cannot be used within a module.");
        }
        if (!COMPILED && goog.isProvided_(a)) {
            throw Error('Namespace "' + a + '" already declared.');
        }
        goog.constructNamespace_(a);
    };
    goog.constructNamespace_ = function (a, b) {
        if (!COMPILED) {
            delete goog.implicitNamespaces_[a];
            for (var c = a; (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
                goog.implicitNamespaces_[c] = !0;
            }
        }
        goog.exportPath_(a, b);
    };
    goog.getScriptNonce = function (a) {
        if (a && a != goog.global) {
            return goog.getScriptNonce_(a.document);
        }
        null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
        return goog.cspNonce_;
    };
    goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
    goog.cspNonce_ = null;
    goog.getScriptNonce_ = function (a) {
        return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : "";
    };
    goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
    goog.module = function (a) {
        if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
            throw Error("Invalid module identifier");
        }
        if (!goog.isInGoogModuleLoader_()) {
            throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
        }
        if (goog.moduleLoaderState_.moduleName) {
            throw Error("goog.module may only be called once per module.");
        }
        goog.moduleLoaderState_.moduleName = a;
        if (!COMPILED) {
            if (goog.isProvided_(a)) {
                throw Error('Namespace "' + a + '" already declared.');
            }
            delete goog.implicitNamespaces_[a];
        }
    };
    goog.module.get = function (a) {
        return goog.module.getInternal_(a);
    };
    goog.module.getInternal_ = function (a) {
        if (!COMPILED) {
            if (a in goog.loadedModules_) {
                return goog.loadedModules_[a].exported;
            }
            if (!goog.implicitNamespaces_[a]) {
                return a = goog.getObjectByName(a), null != a ? a : null;
            }
        }
        return null;
    };
    goog.ModuleType = { ES6: "es6", GOOG: "goog" };
    goog.moduleLoaderState_ = null;
    goog.isInModuleLoader_ = function () {
        return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
    };
    goog.isInGoogModuleLoader_ = function () {
        return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
    };
    goog.isInEs6ModuleLoader_ = function () {
        if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) {
            return !0;
        }
        var a = goog.global.$jscomp;
        return a ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1;
    };
    goog.module.declareLegacyNamespace = function () {
        if (!COMPILED && !goog.isInGoogModuleLoader_()) {
            throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
        }
        if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
            throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
        }
        goog.moduleLoaderState_.declareLegacyNamespace = !0;
    };
    goog.declareModuleId = function (a) {
        if (!COMPILED) {
            if (!goog.isInEs6ModuleLoader_()) {
                throw Error("goog.declareModuleId may only be called from within an ES6 module");
            }
            if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) {
                throw Error("goog.declareModuleId may only be called once per module.");
            }
            if (a in goog.loadedModules_) {
                throw Error('Module with namespace "' + a + '" already exists.');
            }
        }
        if (goog.moduleLoaderState_) {
            goog.moduleLoaderState_.moduleName = a;
        }
        else {
            var b = goog.global.$jscomp;
            if (!b || "function" != typeof b.getCurrentModulePath) {
                throw Error('Module with namespace "' + a + '" has been loaded incorrectly.');
            }
            b = b.require(b.getCurrentModulePath());
            goog.loadedModules_[a] = { exported: b, type: goog.ModuleType.ES6, moduleId: a };
        }
    };
    goog.setTestOnly = function (a) {
        if (goog.DISALLOW_TEST_ONLY_CODE) {
            throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
        }
    };
    goog.forwardDeclare = function (a) {
    };
    COMPILED || (goog.isProvided_ = function (a) {
        return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && null != goog.getObjectByName(a);
    }, goog.implicitNamespaces_ = { "goog.module": !0 });
    goog.getObjectByName = function (a, b) {
        a = a.split(".");
        b = b || goog.global;
        for (var c = 0; c < a.length; c++) {
            if (b = b[a[c]], null == b) {
                return null;
            }
        }
        return b;
    };
    goog.globalize = function (a, b) {
        b = b || goog.global;
        for (var c in a) {
            b[c] = a[c];
        }
    };
    goog.addDependency = function (a, b, c, d) {
        !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(a, b, c, d);
    };
    goog.ENABLE_DEBUG_LOADER = !0;
    goog.logToConsole_ = function (a) {
        goog.global.console && goog.global.console.error(a);
    };
    goog.require = function (a) {
        if (!COMPILED) {
            goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a);
            if (goog.isProvided_(a)) {
                if (goog.isInModuleLoader_()) {
                    return goog.module.getInternal_(a);
                }
            }
            else {
                if (goog.ENABLE_DEBUG_LOADER) {
                    var b = goog.moduleLoaderState_;
                    goog.moduleLoaderState_ = null;
                    try {
                        goog.debugLoader_.load_(a);
                    }
                    finally {
                        goog.moduleLoaderState_ = b;
                    }
                }
            }
            return null;
        }
    };
    goog.requireType = function (a) {
        return {};
    };
    goog.basePath = "";
    goog.nullFunction = function () {
    };
    goog.abstractMethod = function () {
        throw Error("unimplemented abstract method");
    };
    goog.addSingletonGetter = function (a) {
        a.instance_ = void 0;
        a.getInstance = function () {
            if (a.instance_) {
                return a.instance_;
            }
            goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
            return a.instance_ = new a;
        };
    };
    goog.instantiatedSingletons_ = [];
    goog.LOAD_MODULE_USING_EVAL = !0;
    goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
    goog.loadedModules_ = {};
    goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
    goog.TRANSPILE = "detect";
    goog.ASSUME_ES_MODULES_TRANSPILED = !1;
    goog.TRANSPILE_TO_LANGUAGE = "";
    goog.TRANSPILER = "transpile.js";
    goog.hasBadLetScoping = null;
    goog.useSafari10Workaround = function () {
        if (null == goog.hasBadLetScoping) {
            try {
                var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
            }
            catch (b) {
                a = !1;
            }
            goog.hasBadLetScoping = a;
        }
        return goog.hasBadLetScoping;
    };
    goog.workaroundSafari10EvalBug = function (a) {
        return "(function(){" + a + "\n;})();\n";
    };
    goog.loadModule = function (a) {
        var b = goog.moduleLoaderState_;
        try {
            goog.moduleLoaderState_ = { moduleName: "", declareLegacyNamespace: !1, type: goog.ModuleType.GOOG };
            if (goog.isFunction(a)) {
                var c = a.call(void 0, {});
            }
            else {
                if ("string" === typeof a) {
                    goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), c = goog.loadModuleFromSource_.call(void 0, a);
                }
                else {
                    throw Error("Invalid module definition");
                }
            }
            var d = goog.moduleLoaderState_.moduleName;
            if ("string" === typeof d && d) {
                goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c), goog.loadedModules_[d] = { exported: c, type: goog.ModuleType.GOOG, moduleId: goog.moduleLoaderState_.moduleName };
            }
            else {
                throw Error('Invalid module name "' + d + '"');
            }
        }
        finally {
            goog.moduleLoaderState_ = b;
        }
    };
    goog.loadModuleFromSource_ = function (a) {
        eval(a);
        return {};
    };
    goog.normalizePath_ = function (a) {
        a = a.split("/");
        for (var b = 0; b < a.length;) {
            "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
        }
        return a.join("/");
    };
    goog.loadFileSync_ = function (a) {
        if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
            return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
        }
        try {
            var b = new goog.global.XMLHttpRequest;
            b.open("get", a, !1);
            b.send();
            return 0 == b.status || 200 == b.status ? b.responseText : null;
        }
        catch (c) {
            return null;
        }
    };
    goog.transpile_ = function (a, b, c) {
        var d = goog.global.$jscomp;
        d || (goog.global.$jscomp = d = {});
        var e = d.transpile;
        if (!e) {
            var f = goog.basePath + goog.TRANSPILER, g = goog.loadFileSync_(f);
            if (g) {
                (function () {
                    (0, eval)(g + "\n//# sourceURL=" + f);
                }).call(goog.global);
                if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) {
                    throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
                }
                goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
                d = goog.global.$jscomp;
                e = d.transpile;
            }
        }
        e || (e = d.transpile = function (a, b) {
            goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
            return a;
        });
        return e(a, b, c);
    };
    goog.typeOf = function (a) {
        var b = typeof a;
        if ("object" == b) {
            if (a) {
                if (a instanceof Array) {
                    return "array";
                }
                if (a instanceof Object) {
                    return b;
                }
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) {
                    return "object";
                }
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
                    return "array";
                }
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
                    return "function";
                }
            }
            else {
                return "null";
            }
        }
        else {
            if ("function" == b && "undefined" == typeof a.call) {
                return "object";
            }
        }
        return b;
    };
    goog.isNull = function (a) {
        return null === a;
    };
    goog.isDefAndNotNull = function (a) {
        return null != a;
    };
    goog.isArray = function (a) {
        return "array" == goog.typeOf(a);
    };
    goog.isArrayLike = function (a) {
        var b = goog.typeOf(a);
        return "array" == b || "object" == b && "number" == typeof a.length;
    };
    goog.isDateLike = function (a) {
        return goog.isObject(a) && "function" == typeof a.getFullYear;
    };
    goog.isFunction = function (a) {
        return "function" == goog.typeOf(a);
    };
    goog.isObject = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b;
    };
    goog.getUid = function (a) {
        return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
    };
    goog.hasUid = function (a) {
        return !!a[goog.UID_PROPERTY_];
    };
    goog.removeUid = function (a) {
        null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
        try {
            delete a[goog.UID_PROPERTY_];
        }
        catch (b) {
        }
    };
    goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
    goog.uidCounter_ = 0;
    goog.getHashCode = goog.getUid;
    goog.removeHashCode = goog.removeUid;
    goog.cloneObject = function (a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if ("function" === typeof a.clone) {
                return a.clone();
            }
            b = "array" == b ? [] : {};
            for (var c in a) {
                b[c] = goog.cloneObject(a[c]);
            }
            return b;
        }
        return a;
    };
    goog.bindNative_ = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
    };
    goog.bindJs_ = function (a, b, c) {
        if (!a) {
            throw Error();
        }
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c);
            };
        }
        return function () {
            return a.apply(b, arguments);
        };
    };
    goog.bind = function (a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
        return goog.bind.apply(null, arguments);
    };
    goog.partial = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b);
        };
    };
    goog.mixin = function (a, b) {
        for (var c in b) {
            a[c] = b[c];
        }
    };
    goog.now = goog.TRUSTED_SITE && Date.now || function () {
        return +new Date;
    };
    goog.globalEval = function (a) {
        if (goog.global.execScript) {
            goog.global.execScript(a, "JavaScript");
        }
        else {
            if (goog.global.eval) {
                if (null == goog.evalWorksForGlobals_) {
                    try {
                        goog.global.eval("var _evalTest_ = 1;");
                    }
                    catch (d) {
                    }
                    if ("undefined" != typeof goog.global._evalTest_) {
                        try {
                            delete goog.global._evalTest_;
                        }
                        catch (d) {
                        }
                        goog.evalWorksForGlobals_ = !0;
                    }
                    else {
                        goog.evalWorksForGlobals_ = !1;
                    }
                }
                if (goog.evalWorksForGlobals_) {
                    goog.global.eval(a);
                }
                else {
                    var b = goog.global.document, c = b.createElement("script");
                    c.type = "text/javascript";
                    c.defer = !1;
                    c.appendChild(b.createTextNode(a));
                    b.head.appendChild(c);
                    b.head.removeChild(c);
                }
            }
            else {
                throw Error("goog.globalEval not available");
            }
        }
    };
    goog.evalWorksForGlobals_ = null;
    goog.getCssName = function (a, b) {
        if ("." == String(a).charAt(0)) {
            throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
        }
        var c = function (a) {
            return goog.cssNameMapping_[a] || a;
        }, d = function (a) {
            a = a.split("-");
            for (var b = [], d = 0; d < a.length; d++) {
                b.push(c(a[d]));
            }
            return b.join("-");
        };
        d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function (a) {
            return a;
        };
        a = b ? a + "-" + d(b) : d(a);
        return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a;
    };
    goog.setCssNameMapping = function (a, b) {
        goog.cssNameMapping_ = a;
        goog.cssNameMappingStyle_ = b;
    };
    !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
    goog.getMsg = function (a, b, c) {
        c && c.html && (a = a.replace(/</g, "&lt;"));
        b && (a = a.replace(/\{\$([^}]+)}/g, function (a, c) {
            return null != b && c in b ? b[c] : a;
        }));
        return a;
    };
    goog.getMsgWithFallback = function (a, b) {
        return a;
    };
    goog.exportSymbol = function (a, b, c) {
        goog.exportPath_(a, b, c);
    };
    goog.exportProperty = function (a, b, c) {
        a[b] = c;
    };
    goog.inherits = function (a, b) {
        function c() {
        }
        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.base = function (a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) {
                d[e - 2] = arguments[e];
            }
            return b.prototype[c].apply(a, d);
        };
    };
    goog.base = function (a, b, c) {
        var d = arguments.callee.caller;
        if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
            throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
        }
        if ("undefined" !== typeof d.superClass_) {
            for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) {
                e[f - 1] = arguments[f];
            }
            return d.superClass_.constructor.apply(a, e);
        }
        if ("string" != typeof b && "symbol" != typeof b) {
            throw Error("method names provided to goog.base must be a string or a symbol");
        }
        e = Array(arguments.length - 2);
        for (f = 2; f < arguments.length; f++) {
            e[f - 2] = arguments[f];
        }
        f = !1;
        for (var g = a.constructor.prototype; g; g = Object.getPrototypeOf(g)) {
            if (g[b] === d) {
                f = !0;
            }
            else {
                if (f) {
                    return g[b].apply(a, e);
                }
            }
        }
        if (a[b] === d) {
            return a.constructor.prototype[b].apply(a, e);
        }
        throw Error("goog.base called from a method of one name to a method of a different name");
    };
    goog.scope = function (a) {
        if (goog.isInModuleLoader_()) {
            throw Error("goog.scope is not supported within a module.");
        }
        a.call(goog.global);
    };
    COMPILED || (goog.global.COMPILED = COMPILED);
    goog.defineClass = function (a, b) {
        var c = b.constructor, d = b.statics;
        c && c != Object.prototype.constructor || (c = function () {
            throw Error("cannot instantiate an interface (no constructor defined).");
        });
        c = goog.defineClass.createSealingConstructor_(c, a);
        a && goog.inherits(c, a);
        delete b.constructor;
        delete b.statics;
        goog.defineClass.applyProperties_(c.prototype, b);
        null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
        return c;
    };
    goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
    goog.defineClass.createSealingConstructor_ = function (a, b) {
        if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
            return a;
        }
        var c = !goog.defineClass.isUnsealable_(b), d = function () {
            var b = a.apply(this, arguments) || this;
            b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
            this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
            return b;
        };
        return d;
    };
    goog.defineClass.isUnsealable_ = function (a) {
        return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
    };
    goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    goog.defineClass.applyProperties_ = function (a, b) {
        for (var c in b) {
            Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
        }
        for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) {
            c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
        }
    };
    goog.tagUnsealableClass = function (a) {
        !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
    };
    goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
    !COMPILED && goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function () {
        var a = goog.global.document;
        return null != a && "write" in a;
    }, goog.isDocumentLoading_ = function () {
        var a = goog.global.document;
        return a.attachEvent ? "complete" != a.readyState : "loading" == a.readyState;
    }, goog.findBasePath_ = function () {
        if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH) {
            goog.basePath = goog.global.CLOSURE_BASE_PATH;
        }
        else {
            if (goog.inHtmlDocument_()) {
                var a = goog.global.document, b = a.currentScript;
                a = b ? [b] : a.getElementsByTagName("SCRIPT");
                for (b = a.length - 1; 0 <= b; --b) {
                    var c = a[b].src, d = c.lastIndexOf("?");
                    d = -1 == d ? c.length : d;
                    if ("base.js" == c.substr(d - 7, 7)) {
                        goog.basePath = c.substr(0, d - 7);
                        break;
                    }
                }
            }
        }
    }, goog.findBasePath_(), goog.Transpiler = function () {
        this.requiresTranspilation_ = null;
        this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE;
    }, goog.Transpiler.prototype.createRequiresTranspilation_ = function () {
        function a(a, b) {
            e ? d[a] = !0 : b() ? (c = a, d[a] = !1) : e = d[a] = !0;
        }
        function b(a) {
            try {
                return !!eval(a);
            }
            catch (h) {
                return !1;
            }
        }
        var c = "es3", d = { es3: !1 }, e = !1, f = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
        a("es5", function () {
            return b("[1,].length==1");
        });
        a("es6", function () {
            return f.match(/Edge\/(\d+)(\.\d)*/i) ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
        });
        a("es7", function () {
            return b("2 ** 2 == 4");
        });
        a("es8", function () {
            return b("async () => 1, true");
        });
        a("es9", function () {
            return b("({...rest} = {}), true");
        });
        a("es_next", function () {
            return !1;
        });
        return { target: c, map: d };
    }, goog.Transpiler.prototype.needsTranspile = function (a, b) {
        if ("always" == goog.TRANSPILE) {
            return !0;
        }
        if ("never" == goog.TRANSPILE) {
            return !1;
        }
        if (!this.requiresTranspilation_) {
            var c = this.createRequiresTranspilation_();
            this.requiresTranspilation_ = c.map;
            this.transpilationTarget_ = this.transpilationTarget_ || c.target;
        }
        if (a in this.requiresTranspilation_) {
            return this.requiresTranspilation_[a] ? !0 : !goog.inHtmlDocument_() || "es6" != b || "noModule" in goog.global.document.createElement("script") ? !1 : !0;
        }
        throw Error("Unknown language mode: " + a);
    }, goog.Transpiler.prototype.transpile = function (a, b) {
        return goog.transpile_(a, b, this.transpilationTarget_);
    }, goog.transpiler_ = new goog.Transpiler, goog.protectScriptTag_ = function (a) {
        return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
    }, goog.DebugLoader_ = function () {
        this.dependencies_ = {};
        this.idToPath_ = {};
        this.written_ = {};
        this.loadingDeps_ = [];
        this.depsToLoad_ = [];
        this.paused_ = !1;
        this.factory_ = new goog.DependencyFactory(goog.transpiler_);
        this.deferredCallbacks_ = {};
        this.deferredQueue_ = [];
    }, goog.DebugLoader_.prototype.bootstrap = function (a, b) {
        function c() {
            d && (goog.global.setTimeout(d, 0), d = null);
        }
        var d = b;
        if (a.length) {
            b = [];
            for (var e = 0; e < a.length; e++) {
                var f = this.getPathFromDeps_(a[e]);
                if (!f) {
                    throw Error("Unregonized namespace: " + a[e]);
                }
                b.push(this.dependencies_[f]);
            }
            f = goog.require;
            var g = 0;
            for (e = 0; e < a.length; e++) {
                f(a[e]), b[e].onLoad(function () {
                    ++g == a.length && c();
                });
            }
        }
        else {
            c();
        }
    }, goog.DebugLoader_.prototype.loadClosureDeps = function () {
        this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}, !1));
        this.loadDeps_();
    }, goog.DebugLoader_.prototype.requested = function (a, b) {
        (a = this.getPathFromDeps_(a)) && (b || this.areDepsLoaded_(this.dependencies_[a].requires)) && (b = this.deferredCallbacks_[a]) && (delete this.deferredCallbacks_[a], b());
    }, goog.DebugLoader_.prototype.setDependencyFactory = function (a) {
        this.factory_ = a;
    }, goog.DebugLoader_.prototype.load_ = function (a) {
        if (this.getPathFromDeps_(a)) {
            var b = this, c = [], d = function (a) {
                var e = b.getPathFromDeps_(a);
                if (!e) {
                    throw Error("Bad dependency path or symbol: " + a);
                }
                if (!b.written_[e]) {
                    b.written_[e] = !0;
                    a = b.dependencies_[e];
                    for (e = 0; e < a.requires.length; e++) {
                        goog.isProvided_(a.requires[e]) || d(a.requires[e]);
                    }
                    c.push(a);
                }
            };
            d(a);
            a = !!this.depsToLoad_.length;
            this.depsToLoad_ = this.depsToLoad_.concat(c);
            this.paused_ || a || this.loadDeps_();
        }
        else {
            throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
        }
    }, goog.DebugLoader_.prototype.loadDeps_ = function () {
        for (var a = this, b = this.paused_; this.depsToLoad_.length && !b;) {
            (function () {
                var c = !1, d = a.depsToLoad_.shift(), e = !1;
                a.loading_(d);
                var f = { pause: function () {
                        if (c) {
                            throw Error("Cannot call pause after the call to load.");
                        }
                        b = !0;
                    }, resume: function () {
                        c ? a.resume_() : b = !1;
                    }, loaded: function () {
                        if (e) {
                            throw Error("Double call to loaded.");
                        }
                        e = !0;
                        a.loaded_(d);
                    }, pending: function () {
                        for (var b = [], c = 0; c < a.loadingDeps_.length; c++) {
                            b.push(a.loadingDeps_[c]);
                        }
                        return b;
                    }, setModuleState: function (a) {
                        goog.moduleLoaderState_ = { type: a, moduleName: "", declareLegacyNamespace: !1 };
                    }, registerEs6ModuleExports: function (a, b, c) {
                        c && (goog.loadedModules_[c] = { exported: b, type: goog.ModuleType.ES6, moduleId: c || "" });
                    }, registerGoogModuleExports: function (a, b) {
                        goog.loadedModules_[a] = { exported: b, type: goog.ModuleType.GOOG, moduleId: a };
                    }, clearModuleState: function () {
                        goog.moduleLoaderState_ = null;
                    }, defer: function (b) {
                        if (c) {
                            throw Error("Cannot register with defer after the call to load.");
                        }
                        a.defer_(d, b);
                    }, areDepsLoaded: function () {
                        return a.areDepsLoaded_(d.requires);
                    } };
                try {
                    d.load(f);
                }
                finally {
                    c = !0;
                }
            })();
        }
        b && this.pause_();
    }, goog.DebugLoader_.prototype.pause_ = function () {
        this.paused_ = !0;
    }, goog.DebugLoader_.prototype.resume_ = function () {
        this.paused_ && (this.paused_ = !1, this.loadDeps_());
    }, goog.DebugLoader_.prototype.loading_ = function (a) {
        this.loadingDeps_.push(a);
    }, goog.DebugLoader_.prototype.loaded_ = function (a) {
        for (var b = 0; b < this.loadingDeps_.length; b++) {
            if (this.loadingDeps_[b] == a) {
                this.loadingDeps_.splice(b, 1);
                break;
            }
        }
        for (b = 0; b < this.deferredQueue_.length; b++) {
            if (this.deferredQueue_[b] == a.path) {
                this.deferredQueue_.splice(b, 1);
                break;
            }
        }
        if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
            for (; this.deferredQueue_.length;) {
                this.requested(this.deferredQueue_.shift(), !0);
            }
        }
        a.loaded();
    }, goog.DebugLoader_.prototype.areDepsLoaded_ = function (a) {
        for (var b = 0; b < a.length; b++) {
            var c = this.getPathFromDeps_(a[b]);
            if (!c || !(c in this.deferredCallbacks_ || goog.isProvided_(a[b]))) {
                return !1;
            }
        }
        return !0;
    }, goog.DebugLoader_.prototype.getPathFromDeps_ = function (a) {
        return a in this.idToPath_ ? this.idToPath_[a] : a in this.dependencies_ ? a : null;
    }, goog.DebugLoader_.prototype.defer_ = function (a, b) {
        this.deferredCallbacks_[a.path] = b;
        this.deferredQueue_.push(a.path);
    }, goog.LoadController = function () {
    }, goog.LoadController.prototype.pause = function () {
    }, goog.LoadController.prototype.resume = function () {
    }, goog.LoadController.prototype.loaded = function () {
    }, goog.LoadController.prototype.pending = function () {
    }, goog.LoadController.prototype.registerEs6ModuleExports = function (a, b, c) {
    }, goog.LoadController.prototype.setModuleState = function (a) {
    }, goog.LoadController.prototype.clearModuleState = function () {
    }, goog.LoadController.prototype.defer = function (a) {
    }, goog.LoadController.prototype.areDepsLoaded = function () {
    }, goog.Dependency = function (a, b, c, d, e) {
        this.path = a;
        this.relativePath = b;
        this.provides = c;
        this.requires = d;
        this.loadFlags = e;
        this.loaded_ = !1;
        this.loadCallbacks_ = [];
    }, goog.Dependency.prototype.getPathName = function () {
        var a = this.path, b = a.indexOf("://");
        0 <= b && (a = a.substring(b + 3), b = a.indexOf("/"), 0 <= b && (a = a.substring(b + 1)));
        return a;
    }, goog.Dependency.prototype.onLoad = function (a) {
        this.loaded_ ? a() : this.loadCallbacks_.push(a);
    }, goog.Dependency.prototype.loaded = function () {
        this.loaded_ = !0;
        var a = this.loadCallbacks_;
        this.loadCallbacks_ = [];
        for (var b = 0; b < a.length; b++) {
            a[b]();
        }
    }, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function (a) {
        var b = Math.random().toString(32);
        goog.Dependency.callbackMap_[b] = a;
        return b;
    }, goog.Dependency.unregisterCallback_ = function (a) {
        delete goog.Dependency.callbackMap_[a];
    }, goog.Dependency.callback_ = function (a, b) {
        if (a in goog.Dependency.callbackMap_) {
            for (var c = goog.Dependency.callbackMap_[a], d = [], e = 1; e < arguments.length; e++) {
                d.push(arguments[e]);
            }
            c.apply(void 0, d);
        }
        else {
            throw Error("Callback key " + a + " does not exist (was base.js loaded more than once?).");
        }
    }, goog.Dependency.prototype.load = function (a) {
        if (goog.global.CLOSURE_IMPORT_SCRIPT) {
            goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
        }
        else {
            if (goog.inHtmlDocument_()) {
                var b = goog.global.document;
                if ("complete" == b.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
                    if (/\bdeps.js$/.test(this.path)) {
                        a.loaded();
                        return;
                    }
                    throw Error('Cannot write "' + this.path + '" after document load');
                }
                if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
                    var c = goog.Dependency.registerCallback_(function (b) {
                        goog.DebugLoader_.IS_OLD_IE_ && "complete" != b.readyState || (goog.Dependency.unregisterCallback_(c), a.loaded());
                    }), d = !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce() ? ' nonce="' + goog.getScriptNonce() + '"' : "";
                    d = '<script src="' + this.path + '" ' + (goog.DebugLoader_.IS_OLD_IE_ ? "onreadystatechange" : "onload") + "=\"goog.Dependency.callback_('" + c + '\', this)" type="text/javascript" ' + (goog.Dependency.defer_ ? "defer" : "") + d + ">\x3c/script>";
                    b.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d) : d);
                }
                else {
                    var e = b.createElement("script");
                    e.defer = goog.Dependency.defer_;
                    e.async = !1;
                    e.type = "text/javascript";
                    (d = goog.getScriptNonce()) && e.setAttribute("nonce", d);
                    goog.DebugLoader_.IS_OLD_IE_ ? (a.pause(), e.onreadystatechange = function () {
                        if ("loaded" == e.readyState || "complete" == e.readyState) {
                            a.loaded(), a.resume();
                        }
                    }) : e.onload = function () {
                        e.onload = null;
                        a.loaded();
                    };
                    e.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
                    b.head.appendChild(e);
                }
            }
            else {
                goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."), a.loaded()) : a.pause();
            }
        }
    }, goog.Es6ModuleDependency = function (a, b, c, d, e) {
        goog.Dependency.call(this, a, b, c, d, e);
    }, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function (a) {
        function b(a, b) {
            a = b ? '<script type="module" crossorigin>' + b + "\x3c/script>" : '<script type="module" crossorigin src="' + a + '">\x3c/script>';
            d.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(a) : a);
        }
        function c(a, b) {
            var c = d.createElement("script");
            c.defer = !0;
            c.async = !1;
            c.type = "module";
            c.setAttribute("crossorigin", !0);
            var e = goog.getScriptNonce();
            e && c.setAttribute("nonce", e);
            b ? c.textContent = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(b) : b : c.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(a) : a;
            d.head.appendChild(c);
        }
        if (goog.global.CLOSURE_IMPORT_SCRIPT) {
            goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
        }
        else {
            if (goog.inHtmlDocument_()) {
                var d = goog.global.document, e = this;
                if (goog.isDocumentLoading_()) {
                    var f = b;
                    goog.Dependency.defer_ = !0;
                }
                else {
                    f = c;
                }
                var g = goog.Dependency.registerCallback_(function () {
                    goog.Dependency.unregisterCallback_(g);
                    a.setModuleState(goog.ModuleType.ES6);
                });
                f(void 0, 'goog.Dependency.callback_("' + g + '")');
                f(this.path, void 0);
                var h = goog.Dependency.registerCallback_(function (b) {
                    goog.Dependency.unregisterCallback_(h);
                    a.registerEs6ModuleExports(e.path, b, goog.moduleLoaderState_.moduleName);
                });
                f(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + h + '", m)');
                var k = goog.Dependency.registerCallback_(function () {
                    goog.Dependency.unregisterCallback_(k);
                    a.clearModuleState();
                    a.loaded();
                });
                f(void 0, 'goog.Dependency.callback_("' + k + '")');
            }
            else {
                goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), a.pause();
            }
        }
    }, goog.TransformedDependency = function (a, b, c, d, e) {
        goog.Dependency.call(this, a, b, c, d, e);
        this.contents_ = null;
        this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
    }, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function (a) {
        function b() {
            e.contents_ = goog.loadFileSync_(e.path);
            e.contents_ && (e.contents_ = e.transform(e.contents_), e.contents_ && (e.contents_ += "\n//# sourceURL=" + e.path));
        }
        function c() {
            e.lazyFetch_ && b();
            if (e.contents_) {
                f && a.setModuleState(goog.ModuleType.ES6);
                try {
                    var c = e.contents_;
                    e.contents_ = null;
                    goog.globalEval(c);
                    if (f) {
                        var d = goog.moduleLoaderState_.moduleName;
                    }
                }
                finally {
                    f && a.clearModuleState();
                }
                f && goog.global.$jscomp.require.ensure([e.getPathName()], function () {
                    a.registerEs6ModuleExports(e.path, goog.global.$jscomp.require(e.getPathName()), d);
                });
                a.loaded();
            }
        }
        function d() {
            var a = goog.global.document, b = goog.Dependency.registerCallback_(function () {
                goog.Dependency.unregisterCallback_(b);
                c();
            }), d = '<script type="text/javascript">' + goog.protectScriptTag_('goog.Dependency.callback_("' + b + '");') + "\x3c/script>";
            a.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d) : d);
        }
        var e = this;
        if (goog.global.CLOSURE_IMPORT_SCRIPT) {
            b(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, a.loaded()) : a.pause();
        }
        else {
            var f = this.loadFlags.module == goog.ModuleType.ES6;
            this.lazyFetch_ || b();
            var g = 1 < a.pending().length, h = g && goog.DebugLoader_.IS_OLD_IE_;
            g = goog.Dependency.defer_ && (g || goog.isDocumentLoading_());
            if (h || g) {
                a.defer(function () {
                    c();
                });
            }
            else {
                var k = goog.global.document;
                h = goog.inHtmlDocument_() && "ActiveXObject" in goog.global;
                if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !h) {
                    goog.Dependency.defer_ = !0;
                    a.pause();
                    var l = k.onreadystatechange;
                    k.onreadystatechange = function () {
                        "interactive" == k.readyState && (k.onreadystatechange = l, c(), a.resume());
                        goog.isFunction(l) && l.apply(void 0, arguments);
                    };
                }
                else {
                    !goog.DebugLoader_.IS_OLD_IE_ && goog.inHtmlDocument_() && goog.isDocumentLoading_() ? d() : c();
                }
            }
        }
    }, goog.TransformedDependency.prototype.transform = function (a) {
    }, goog.TranspiledDependency = function (a, b, c, d, e, f) {
        goog.TransformedDependency.call(this, a, b, c, d, e);
        this.transpiler = f;
    }, goog.inherits(goog.TranspiledDependency, goog.TransformedDependency), goog.TranspiledDependency.prototype.transform = function (a) {
        return this.transpiler.transpile(a, this.getPathName());
    }, goog.PreTranspiledEs6ModuleDependency = function (a, b, c, d, e) {
        goog.TransformedDependency.call(this, a, b, c, d, e);
    }, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function (a) {
        return a;
    }, goog.GoogModuleDependency = function (a, b, c, d, e, f, g) {
        goog.TransformedDependency.call(this, a, b, c, d, e);
        this.needsTranspile_ = f;
        this.transpiler_ = g;
    }, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function (a) {
        this.needsTranspile_ && (a = this.transpiler_.transpile(a, this.getPathName()));
        return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify(a + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exported) {"use strict";' + a + "\n;return exported});\n//# sourceURL=" + this.path + "\n";
    }, goog.DebugLoader_.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.DebugLoader_.prototype.addDependency = function (a, b, c, d) {
        b = b || [];
        a = a.replace(/\\/g, "/");
        var e = goog.normalizePath_(goog.basePath + a);
        d && "boolean" !== typeof d || (d = d ? { module: goog.ModuleType.GOOG } : {});
        c = this.factory_.createDependency(e, a, b, c, d, goog.transpiler_.needsTranspile(d.lang || "es3", d.module));
        this.dependencies_[e] = c;
        for (c = 0; c < b.length; c++) {
            this.idToPath_[b[c]] = e;
        }
        this.idToPath_[a] = e;
    }, goog.DependencyFactory = function (a) {
        this.transpiler = a;
    }, goog.DependencyFactory.prototype.createDependency = function (a, b, c, d, e, f) {
        return e.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(a, b, c, d, e, f, this.transpiler) : f ? new goog.TranspiledDependency(a, b, c, d, e, this.transpiler) : e.module == goog.ModuleType.ES6 ? "never" == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency(a, b, c, d, e) : new goog.Es6ModuleDependency(a, b, c, d, e) : new goog.Dependency(a, b, c, d, e);
    }, goog.debugLoader_ = new goog.DebugLoader_, goog.loadClosureDeps = function () {
        goog.debugLoader_.loadClosureDeps();
    }, goog.setDependencyFactory = function (a) {
        goog.debugLoader_.setDependencyFactory(a);
    }, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function (a, b) {
        goog.debugLoader_.bootstrap(a, b);
    });
    goog.TRUSTED_TYPES_POLICY_NAME = "";
    goog.identity_ = function (a) {
        return a;
    };
    goog.createTrustedTypesPolicy = function (a) {
        var b = null, c = goog.global.trustedTypes || goog.global.TrustedTypes;
        if (!c || !c.createPolicy) {
            return b;
        }
        try {
            b = c.createPolicy(a, { createHTML: goog.identity_, createScript: goog.identity_, createScriptURL: goog.identity_, createURL: goog.identity_ });
        }
        catch (d) {
            goog.logToConsole_(d.message);
        }
        return b;
    };
    goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null;
    goog.debug = {};
    goog.debug.Error = function (a) {
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, goog.debug.Error);
        }
        else {
            var a_1 = Error().stack;
            a_1 && (this.stack = a_1);
        }
        a && (this.message = String(a));
        this.reportErrorToServer = !0;
    };
    goog.inherits(goog.debug.Error, Error);
    goog.debug.Error.prototype.name = "CustomError";
    goog.dom = {};
    goog.dom.NodeType = { ELEMENT: 1, ATTRIBUTE: 2, TEXT: 3, CDATA_SECTION: 4, ENTITY_REFERENCE: 5, ENTITY: 6, PROCESSING_INSTRUCTION: 7, COMMENT: 8, DOCUMENT: 9, DOCUMENT_TYPE: 10, DOCUMENT_FRAGMENT: 11, NOTATION: 12 };
    goog.asserts = {};
    goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
    goog.asserts.AssertionError = function (a, b) {
        goog.debug.Error.call(this, goog.asserts.subs_(a, b));
        this.messagePattern = a;
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
    goog.asserts.AssertionError.prototype.name = "AssertionError";
    goog.asserts.DEFAULT_ERROR_HANDLER = function (a) {
        throw a;
    };
    goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
    goog.asserts.subs_ = function (a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) {
            c += a[e] + (e < b.length ? b[e] : "%s");
        }
        return c + a[d];
    };
    goog.asserts.doAssertFailure_ = function (a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d;
        }
        else {
            a && (e += ": " + a, f = b);
        }
        a = new goog.asserts.AssertionError("" + e, f || []);
        goog.asserts.errorHandler_(a);
    };
    goog.asserts.setErrorHandler = function (a) {
        goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
    };
    goog.asserts.assert = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertExists = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && null == a && goog.asserts.doAssertFailure_("Expected to exist: %s.", [a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.fail = function (a, b) {
        goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
    };
    goog.asserts.assertNumber = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && "number" !== typeof a && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertString = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && "string" !== typeof a && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertFunction = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertObject = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertArray = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertBoolean = function (a, b, c) {
        goog.asserts.ENABLE_ASSERTS && "boolean" !== typeof a && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertElement = function (a, b, c) {
        !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertInstanceof = function (a, b, c, d) {
        !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
        return a;
    };
    goog.asserts.assertFinite = function (a, b, c) {
        !goog.asserts.ENABLE_ASSERTS || "number" == typeof a && isFinite(a) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [a], b, Array.prototype.slice.call(arguments, 2));
        return a;
    };
    goog.asserts.assertObjectPrototypeIsIntact = function () {
        for (var a in Object.prototype) {
            goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
        }
    };
    goog.asserts.getType_ = function (a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
    };
    goog.array = {};
    goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
    goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR;
    goog.array.peek = function (a) {
        return a[a.length - 1];
    };
    goog.array.last = goog.array.peek;
    goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.indexOf.call(a, b, c);
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if ("string" === typeof a) {
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, c);
        }
        for (; c < a.length; c++) {
            if (c in a && a[c] === b) {
                return c;
            }
        }
        return -1;
    };
    goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
    } : function (a, b, c) {
        c = null == c ? a.length - 1 : c;
        0 > c && (c = Math.max(0, a.length + c));
        if ("string" === typeof a) {
            return "string" !== typeof b || 1 != b.length ? -1 : a.lastIndexOf(b, c);
        }
        for (; 0 <= c; c--) {
            if (c in a && a[c] === b) {
                return c;
            }
        }
        return -1;
    };
    goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        Array.prototype.forEach.call(a, b, c);
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) {
            f in e && b.call(c, e[f], f, a);
        }
    };
    goog.array.forEachRight = function (a, b, c) {
        var d = a.length, e = "string" === typeof a ? a.split("") : a;
        for (--d; 0 <= d; --d) {
            d in e && b.call(c, e[d], d, a);
        }
    };
    goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.filter.call(a, b, c);
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = "string" === typeof a ? a.split("") : a, h = 0; h < d; h++) {
            if (h in g) {
                var k = g[h];
                b.call(c, k, h, a) && (e[f++] = k);
            }
        }
        return e;
    };
    goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.map.call(a, b, c);
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = "string" === typeof a ? a.split("") : a, g = 0; g < d; g++) {
            g in f && (e[g] = b.call(c, f[g], g, a));
        }
        return e;
    };
    goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function (a, b, c, d) {
        goog.asserts.assert(null != a.length);
        d && (b = goog.bind(b, d));
        return Array.prototype.reduce.call(a, b, c);
    } : function (a, b, c, d) {
        var e = c;
        goog.array.forEach(a, function (c, g) {
            e = b.call(d, e, c, g, a);
        });
        return e;
    };
    goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function (a, b, c, d) {
        goog.asserts.assert(null != a.length);
        goog.asserts.assert(null != b);
        d && (b = goog.bind(b, d));
        return Array.prototype.reduceRight.call(a, b, c);
    } : function (a, b, c, d) {
        var e = c;
        goog.array.forEachRight(a, function (c, g) {
            e = b.call(d, e, c, g, a);
        });
        return e;
    };
    goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.some.call(a, b, c);
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) {
            if (f in e && b.call(c, e[f], f, a)) {
                return !0;
            }
        }
        return !1;
    };
    goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.every.call(a, b, c);
    } : function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) {
            if (f in e && !b.call(c, e[f], f, a)) {
                return !1;
            }
        }
        return !0;
    };
    goog.array.count = function (a, b, c) {
        var d = 0;
        goog.array.forEach(a, function (a, f, g) {
            b.call(c, a, f, g) && ++d;
        }, c);
        return d;
    };
    goog.array.find = function (a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
    };
    goog.array.findIndex = function (a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++) {
            if (f in e && b.call(c, e[f], f, a)) {
                return f;
            }
        }
        return -1;
    };
    goog.array.findRight = function (a, b, c) {
        b = goog.array.findIndexRight(a, b, c);
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
    };
    goog.array.findIndexRight = function (a, b, c) {
        var d = a.length, e = "string" === typeof a ? a.split("") : a;
        for (--d; 0 <= d; d--) {
            if (d in e && b.call(c, e[d], d, a)) {
                return d;
            }
        }
        return -1;
    };
    goog.array.contains = function (a, b) {
        return 0 <= goog.array.indexOf(a, b);
    };
    goog.array.isEmpty = function (a) {
        return 0 == a.length;
    };
    goog.array.clear = function (a) {
        if (!goog.isArray(a)) {
            for (var b = a.length - 1; 0 <= b; b--) {
                delete a[b];
            }
        }
        a.length = 0;
    };
    goog.array.insert = function (a, b) {
        goog.array.contains(a, b) || a.push(b);
    };
    goog.array.insertAt = function (a, b, c) {
        goog.array.splice(a, c, 0, b);
    };
    goog.array.insertArrayAt = function (a, b, c) {
        goog.partial(goog.array.splice, a, c, 0).apply(null, b);
    };
    goog.array.insertBefore = function (a, b, c) {
        var d;
        2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
    };
    goog.array.remove = function (a, b) {
        b = goog.array.indexOf(a, b);
        var c;
        (c = 0 <= b) && goog.array.removeAt(a, b);
        return c;
    };
    goog.array.removeLast = function (a, b) {
        b = goog.array.lastIndexOf(a, b);
        return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
    };
    goog.array.removeAt = function (a, b) {
        goog.asserts.assert(null != a.length);
        return 1 == Array.prototype.splice.call(a, b, 1).length;
    };
    goog.array.removeIf = function (a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
    };
    goog.array.removeAllIf = function (a, b, c) {
        var d = 0;
        goog.array.forEachRight(a, function (e, f) {
            b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
        });
        return d;
    };
    goog.array.concat = function (a) {
        return Array.prototype.concat.apply([], arguments);
    };
    goog.array.join = function (a) {
        return Array.prototype.concat.apply([], arguments);
    };
    goog.array.toArray = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) {
                c[d] = a[d];
            }
            return c;
        }
        return [];
    };
    goog.array.clone = goog.array.toArray;
    goog.array.extend = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (goog.isArrayLike(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++) {
                    a[e + g] = d[g];
                }
            }
            else {
                a.push(d);
            }
        }
    };
    goog.array.splice = function (a, b, c, d) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
    };
    goog.array.slice = function (a, b, c) {
        goog.asserts.assert(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
    };
    goog.array.removeDuplicates = function (a, b, c) {
        b = b || a;
        var d = function (a) {
            return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
        };
        c = c || d;
        d = {};
        for (var e = 0, f = 0; f < a.length;) {
            var g = a[f++], h = c(g);
            Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
        }
        b.length = e;
    };
    goog.array.binarySearch = function (a, b, c) {
        return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
    };
    goog.array.binarySelect = function (a, b, c) {
        return goog.array.binarySearch_(a, b, !0, void 0, c);
    };
    goog.array.binarySearch_ = function (a, b, c, d, e) {
        for (var f = 0, g = a.length, h; f < g;) {
            var k = f + (g - f >>> 1);
            var l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
            0 < l ? f = k + 1 : (g = k, h = !l);
        }
        return h ? f : -f - 1;
    };
    goog.array.sort = function (a, b) {
        a.sort(b || goog.array.defaultCompare);
    };
    goog.array.stableSort = function (a, b) {
        for (var c = Array(a.length), d = 0; d < a.length; d++) {
            c[d] = { index: d, value: a[d] };
        }
        var e = b || goog.array.defaultCompare;
        goog.array.sort(c, function (a, b) {
            return e(a.value, b.value) || a.index - b.index;
        });
        for (d = 0; d < a.length; d++) {
            a[d] = c[d].value;
        }
    };
    goog.array.sortByKey = function (a, b, c) {
        var d = c || goog.array.defaultCompare;
        goog.array.sort(a, function (a, c) {
            return d(b(a), b(c));
        });
    };
    goog.array.sortObjectsByKey = function (a, b, c) {
        goog.array.sortByKey(a, function (a) {
            return a[b];
        }, c);
    };
    goog.array.isSorted = function (a, b, c) {
        b = b || goog.array.defaultCompare;
        for (var d = 1; d < a.length; d++) {
            var e = b(a[d - 1], a[d]);
            if (0 < e || 0 == e && c) {
                return !1;
            }
        }
        return !0;
    };
    goog.array.equals = function (a, b, c) {
        if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
            return !1;
        }
        var d = a.length;
        c = c || goog.array.defaultCompareEquality;
        for (var e = 0; e < d; e++) {
            if (!c(a[e], b[e])) {
                return !1;
            }
        }
        return !0;
    };
    goog.array.compare3 = function (a, b, c) {
        c = c || goog.array.defaultCompare;
        for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
            var f = c(a[e], b[e]);
            if (0 != f) {
                return f;
            }
        }
        return goog.array.defaultCompare(a.length, b.length);
    };
    goog.array.defaultCompare = function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    };
    goog.array.inverseDefaultCompare = function (a, b) {
        return -goog.array.defaultCompare(a, b);
    };
    goog.array.defaultCompareEquality = function (a, b) {
        return a === b;
    };
    goog.array.binaryInsert = function (a, b, c) {
        c = goog.array.binarySearch(a, b, c);
        return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
    };
    goog.array.binaryRemove = function (a, b, c) {
        b = goog.array.binarySearch(a, b, c);
        return 0 <= b ? goog.array.removeAt(a, b) : !1;
    };
    goog.array.bucket = function (a, b, c) {
        for (var d = {}, e = 0; e < a.length; e++) {
            var f = a[e], g = b.call(c, f, e, a);
            void 0 !== g && (d[g] || (d[g] = [])).push(f);
        }
        return d;
    };
    goog.array.toObject = function (a, b, c) {
        var d = {};
        goog.array.forEach(a, function (e, f) {
            d[b.call(c, e, f, a)] = e;
        });
        return d;
    };
    goog.array.range = function (a, b, c) {
        var d = [], e = 0, f = a;
        c = c || 1;
        void 0 !== b && (e = a, f = b);
        if (0 > c * (f - e)) {
            return [];
        }
        if (0 < c) {
            for (a = e; a < f; a += c) {
                d.push(a);
            }
        }
        else {
            for (a = e; a > f; a += c) {
                d.push(a);
            }
        }
        return d;
    };
    goog.array.repeat = function (a, b) {
        for (var c = [], d = 0; d < b; d++) {
            c[d] = a;
        }
        return c;
    };
    goog.array.flatten = function (a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            if (goog.isArray(d)) {
                for (var e = 0; e < d.length; e += 8192) {
                    var f = goog.array.slice(d, e, e + 8192);
                    f = goog.array.flatten.apply(null, f);
                    for (var g = 0; g < f.length; g++) {
                        b.push(f[g]);
                    }
                }
            }
            else {
                b.push(d);
            }
        }
        return b;
    };
    goog.array.rotate = function (a, b) {
        goog.asserts.assert(null != a.length);
        a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
        return a;
    };
    goog.array.moveItem = function (a, b, c) {
        goog.asserts.assert(0 <= b && b < a.length);
        goog.asserts.assert(0 <= c && c < a.length);
        b = Array.prototype.splice.call(a, b, 1);
        Array.prototype.splice.call(a, c, 0, b[0]);
    };
    goog.array.zip = function (a) {
        if (!arguments.length) {
            return [];
        }
        for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) {
            arguments[d].length < c && (c = arguments[d].length);
        }
        for (d = 0; d < c; d++) {
            for (var e = [], f = 0; f < arguments.length; f++) {
                e.push(arguments[f][d]);
            }
            b.push(e);
        }
        return b;
    };
    goog.array.shuffle = function (a, b) {
        b = b || Math.random;
        for (var c = a.length - 1; 0 < c; c--) {
            var d = Math.floor(b() * (c + 1)), e = a[c];
            a[c] = a[d];
            a[d] = e;
        }
    };
    goog.array.copyByIndex = function (a, b) {
        var c = [];
        goog.array.forEach(b, function (b) {
            c.push(a[b]);
        });
        return c;
    };
    goog.array.concatMap = function (a, b, c) {
        return goog.array.concat.apply([], goog.array.map(a, b, c));
    };
    goog.crypt = {};
    goog.crypt.stringToByteArray = function (a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255, e >>= 8);
            b[c++] = e;
        }
        return b;
    };
    goog.crypt.byteArrayToString = function (a) {
        if (8192 >= a.length) {
            return String.fromCharCode.apply(null, a);
        }
        for (var b = "", c = 0; c < a.length; c += 8192) {
            var d = goog.array.slice(a, c, c + 8192);
            b += String.fromCharCode.apply(null, d);
        }
        return b;
    };
    goog.crypt.byteArrayToHex = function (a, b) {
        return goog.array.map(a, function (a) {
            a = a.toString(16);
            return 1 < a.length ? a : "0" + a;
        }).join(b || "");
    };
    goog.crypt.hexToByteArray = function (a) {
        goog.asserts.assert(0 == a.length % 2, "Key string length must be multiple of 2");
        for (var b = [], c = 0; c < a.length; c += 2) {
            b.push(parseInt(a.substring(c, c + 2), 16));
        }
        return b;
    };
    goog.crypt.stringToUtf8ByteArray = function (a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
        }
        return b;
    };
    goog.crypt.utf8ByteArrayToString = function (a) {
        for (var b = [], c = 0, d = 0; c < a.length;) {
            var e = a[c++];
            if (128 > e) {
                b[d++] = String.fromCharCode(e);
            }
            else {
                if (191 < e && 224 > e) {
                    var f = a[c++];
                    b[d++] = String.fromCharCode((e & 31) << 6 | f & 63);
                }
                else {
                    if (239 < e && 365 > e) {
                        f = a[c++];
                        var g = a[c++], h = a[c++];
                        e = ((e & 7) << 18 | (f & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
                        b[d++] = String.fromCharCode(55296 + (e >> 10));
                        b[d++] = String.fromCharCode(56320 + (e & 1023));
                    }
                    else {
                        f = a[c++], g = a[c++], b[d++] = String.fromCharCode((e & 15) << 12 | (f & 63) << 6 | g & 63);
                    }
                }
            }
        }
        return b.join("");
    };
    goog.crypt.xorByteArray = function (a, b) {
        goog.asserts.assert(a.length == b.length, "XOR array lengths must match");
        for (var c = [], d = 0; d < a.length; d++) {
            c.push(a[d] ^ b[d]);
        }
        return c;
    };
    goog.dom.asserts = {};
    goog.dom.asserts.assertIsLocation = function (a) {
        if (goog.asserts.ENABLE_ASSERTS) {
            var b = goog.dom.asserts.getWindow_(a);
            b && (!a || !(a instanceof b.Location) && a instanceof b.Element) && goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(a));
        }
        return a;
    };
    goog.dom.asserts.assertIsElementType_ = function (a, b) {
        if (goog.asserts.ENABLE_ASSERTS) {
            var c = goog.dom.asserts.getWindow_(a);
            c && "undefined" != typeof c[b] && (a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)) || goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, goog.dom.asserts.debugStringForType_(a)));
        }
        return a;
    };
    goog.dom.asserts.assertIsHTMLAnchorElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLAnchorElement");
    };
    goog.dom.asserts.assertIsHTMLButtonElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLButtonElement");
    };
    goog.dom.asserts.assertIsHTMLLinkElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLLinkElement");
    };
    goog.dom.asserts.assertIsHTMLImageElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLImageElement");
    };
    goog.dom.asserts.assertIsHTMLAudioElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLAudioElement");
    };
    goog.dom.asserts.assertIsHTMLVideoElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLVideoElement");
    };
    goog.dom.asserts.assertIsHTMLInputElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLInputElement");
    };
    goog.dom.asserts.assertIsHTMLTextAreaElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLTextAreaElement");
    };
    goog.dom.asserts.assertIsHTMLCanvasElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLCanvasElement");
    };
    goog.dom.asserts.assertIsHTMLEmbedElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLEmbedElement");
    };
    goog.dom.asserts.assertIsHTMLFormElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLFormElement");
    };
    goog.dom.asserts.assertIsHTMLFrameElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLFrameElement");
    };
    goog.dom.asserts.assertIsHTMLIFrameElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLIFrameElement");
    };
    goog.dom.asserts.assertIsHTMLObjectElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLObjectElement");
    };
    goog.dom.asserts.assertIsHTMLScriptElement = function (a) {
        return goog.dom.asserts.assertIsElementType_(a, "HTMLScriptElement");
    };
    goog.dom.asserts.debugStringForType_ = function (a) {
        if (goog.isObject(a)) {
            try {
                return a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
            }
            catch (b) {
                return "<object could not be stringified>";
            }
        }
        else {
            return void 0 === a ? "undefined" : null === a ? "null" : typeof a;
        }
    };
    goog.dom.asserts.getWindow_ = function (a) {
        try {
            var b = a && a.ownerDocument, c = b && (b.defaultView || b.parentWindow);
            c = c || goog.global;
            if (c.Element && c.Location) {
                return c;
            }
        }
        catch (d) {
        }
        return null;
    };
    goog.functions = {};
    goog.functions.constant = function (a) {
        return function () {
            return a;
        };
    };
    goog.functions.FALSE = function () {
        return !1;
    };
    goog.functions.TRUE = function () {
        return !0;
    };
    goog.functions.NULL = function () {
        return null;
    };
    goog.functions.identity = function (a, b) {
        return a;
    };
    goog.functions.error = function (a) {
        return function () {
            throw Error(a);
        };
    };
    goog.functions.fail = function (a) {
        return function () {
            throw a;
        };
    };
    goog.functions.lock = function (a, b) {
        b = b || 0;
        return function () {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
        };
    };
    goog.functions.nth = function (a) {
        return function () {
            return arguments[a];
        };
    };
    goog.functions.partialRight = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.push.apply(b, c);
            return a.apply(this, b);
        };
    };
    goog.functions.withReturnValue = function (a, b) {
        return goog.functions.sequence(a, goog.functions.constant(b));
    };
    goog.functions.equalTo = function (a, b) {
        return function (c) {
            return b ? a == c : a === c;
        };
    };
    goog.functions.compose = function (a, b) {
        var c = arguments, d = c.length;
        return function () {
            var a;
            d && (a = c[d - 1].apply(this, arguments));
            for (var b_1 = d - 2; 0 <= b_1; b_1--) {
                a = c[b_1].call(this, a);
            }
            return a;
        };
    };
    goog.functions.sequence = function (a) {
        var b = arguments, c = b.length;
        return function () {
            var a;
            for (var d = 0; d < c; d++) {
                a = b[d].apply(this, arguments);
            }
            return a;
        };
    };
    goog.functions.and = function (a) {
        var b = arguments, c = b.length;
        return function () {
            for (var a_2 = 0; a_2 < c; a_2++) {
                if (!b[a_2].apply(this, arguments)) {
                    return !1;
                }
            }
            return !0;
        };
    };
    goog.functions.or = function (a) {
        var b = arguments, c = b.length;
        return function () {
            for (var a_3 = 0; a_3 < c; a_3++) {
                if (b[a_3].apply(this, arguments)) {
                    return !0;
                }
            }
            return !1;
        };
    };
    goog.functions.not = function (a) {
        return function () {
            return !a.apply(this, arguments);
        };
    };
    goog.functions.create = function (a, b) {
        var c = function () {
        };
        c.prototype = a.prototype;
        c = new c;
        a.apply(c, Array.prototype.slice.call(arguments, 1));
        return c;
    };
    goog.functions.CACHE_RETURN_VALUE = !0;
    goog.functions.cacheReturnValue = function (a) {
        var b = !1, c;
        return function () {
            if (!goog.functions.CACHE_RETURN_VALUE) {
                return a();
            }
            b || (c = a(), b = !0);
            return c;
        };
    };
    goog.functions.once = function (a) {
        var b = a;
        return function () {
            if (b) {
                var a_4 = b;
                b = null;
                a_4();
            }
        };
    };
    goog.functions.debounce = function (a, b, c) {
        var d = 0;
        return function (e) {
            goog.global.clearTimeout(d);
            var f = arguments;
            d = goog.global.setTimeout(function () {
                a.apply(c, f);
            }, b);
        };
    };
    goog.functions.throttle = function (a, b, c) {
        var d = 0, e = !1, f = [];
        var g = function () {
            d = 0;
            e && (e = !1, h());
        }, h = function () {
            d = goog.global.setTimeout(g, b);
            a.apply(c, f);
        };
        return function (a) {
            f = arguments;
            d ? e = !0 : h();
        };
    };
    goog.functions.rateLimit = function (a, b, c) {
        var d = 0;
        var e = function () {
            d = 0;
        };
        return function (f) {
            d || (d = goog.global.setTimeout(e, b), a.apply(c, arguments));
        };
    };
    goog.dom.HtmlElement = function () {
    };
    goog.dom.TagName = function (a) {
        this.tagName_ = a;
    };
    goog.dom.TagName.prototype.toString = function () {
        return this.tagName_;
    };
    goog.dom.TagName.A = new goog.dom.TagName("A");
    goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
    goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
    goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
    goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
    goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
    goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
    goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
    goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
    goog.dom.TagName.B = new goog.dom.TagName("B");
    goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
    goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
    goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
    goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
    goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
    goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
    goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
    goog.dom.TagName.BR = new goog.dom.TagName("BR");
    goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
    goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
    goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
    goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
    goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
    goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
    goog.dom.TagName.COL = new goog.dom.TagName("COL");
    goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
    goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
    goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
    goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
    goog.dom.TagName.DD = new goog.dom.TagName("DD");
    goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
    goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
    goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
    goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
    goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
    goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
    goog.dom.TagName.DL = new goog.dom.TagName("DL");
    goog.dom.TagName.DT = new goog.dom.TagName("DT");
    goog.dom.TagName.EM = new goog.dom.TagName("EM");
    goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
    goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
    goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
    goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
    goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
    goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
    goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
    goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
    goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
    goog.dom.TagName.H1 = new goog.dom.TagName("H1");
    goog.dom.TagName.H2 = new goog.dom.TagName("H2");
    goog.dom.TagName.H3 = new goog.dom.TagName("H3");
    goog.dom.TagName.H4 = new goog.dom.TagName("H4");
    goog.dom.TagName.H5 = new goog.dom.TagName("H5");
    goog.dom.TagName.H6 = new goog.dom.TagName("H6");
    goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
    goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
    goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
    goog.dom.TagName.HR = new goog.dom.TagName("HR");
    goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
    goog.dom.TagName.I = new goog.dom.TagName("I");
    goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
    goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
    goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
    goog.dom.TagName.INS = new goog.dom.TagName("INS");
    goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
    goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
    goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
    goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
    goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
    goog.dom.TagName.LI = new goog.dom.TagName("LI");
    goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
    goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
    goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
    goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
    goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
    goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
    goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
    goog.dom.TagName.META = new goog.dom.TagName("META");
    goog.dom.TagName.METER = new goog.dom.TagName("METER");
    goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
    goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
    goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
    goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
    goog.dom.TagName.OL = new goog.dom.TagName("OL");
    goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
    goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
    goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
    goog.dom.TagName.P = new goog.dom.TagName("P");
    goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
    goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
    goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
    goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
    goog.dom.TagName.Q = new goog.dom.TagName("Q");
    goog.dom.TagName.RP = new goog.dom.TagName("RP");
    goog.dom.TagName.RT = new goog.dom.TagName("RT");
    goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
    goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
    goog.dom.TagName.S = new goog.dom.TagName("S");
    goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
    goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
    goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
    goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
    goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
    goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
    goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
    goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
    goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
    goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
    goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
    goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
    goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
    goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
    goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
    goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
    goog.dom.TagName.TD = new goog.dom.TagName("TD");
    goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
    goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
    goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
    goog.dom.TagName.TH = new goog.dom.TagName("TH");
    goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
    goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
    goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
    goog.dom.TagName.TR = new goog.dom.TagName("TR");
    goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
    goog.dom.TagName.TT = new goog.dom.TagName("TT");
    goog.dom.TagName.U = new goog.dom.TagName("U");
    goog.dom.TagName.UL = new goog.dom.TagName("UL");
    goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
    goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
    goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
    goog.object = {};
    goog.object.is = function (a, b) {
        return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
    };
    goog.object.forEach = function (a, b, c) {
        for (var d in a) {
            b.call(c, a[d], d, a);
        }
    };
    goog.object.filter = function (a, b, c) {
        var d = {};
        for (var e in a) {
            b.call(c, a[e], e, a) && (d[e] = a[e]);
        }
        return d;
    };
    goog.object.map = function (a, b, c) {
        var d = {};
        for (var e in a) {
            d[e] = b.call(c, a[e], e, a);
        }
        return d;
    };
    goog.object.some = function (a, b, c) {
        for (var d in a) {
            if (b.call(c, a[d], d, a)) {
                return !0;
            }
        }
        return !1;
    };
    goog.object.every = function (a, b, c) {
        for (var d in a) {
            if (!b.call(c, a[d], d, a)) {
                return !1;
            }
        }
        return !0;
    };
    goog.object.getCount = function (a) {
        var b = 0;
        for (var c in a) {
            b++;
        }
        return b;
    };
    goog.object.getAnyKey = function (a) {
        for (var b in a) {
            return b;
        }
    };
    goog.object.getAnyValue = function (a) {
        for (var b in a) {
            return a[b];
        }
    };
    goog.object.contains = function (a, b) {
        return goog.object.containsValue(a, b);
    };
    goog.object.getValues = function (a) {
        var b = [];
        var c = 0;
        for (var d in a) {
            b[c++] = a[d];
        }
        return b;
    };
    goog.object.getKeys = function (a) {
        var b = [];
        var c = 0;
        for (var d in a) {
            b[c++] = d;
        }
        return b;
    };
    goog.object.getValueByKeys = function (a, b) {
        var c = goog.isArrayLike(b);
        var d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a) {
                return;
            }
            a = a[d[c]];
        }
        return a;
    };
    goog.object.containsKey = function (a, b) {
        return null !== a && b in a;
    };
    goog.object.containsValue = function (a, b) {
        for (var c in a) {
            if (a[c] == b) {
                return !0;
            }
        }
        return !1;
    };
    goog.object.findKey = function (a, b, c) {
        for (var d in a) {
            if (b.call(c, a[d], d, a)) {
                return d;
            }
        }
    };
    goog.object.findValue = function (a, b, c) {
        return (b = goog.object.findKey(a, b, c)) && a[b];
    };
    goog.object.isEmpty = function (a) {
        for (var b in a) {
            return !1;
        }
        return !0;
    };
    goog.object.clear = function (a) {
        for (var b in a) {
            delete a[b];
        }
    };
    goog.object.remove = function (a, b) {
        var c;
        (c = b in a) && delete a[b];
        return c;
    };
    goog.object.add = function (a, b, c) {
        if (null !== a && b in a) {
            throw Error('The object already contains the key "' + b + '"');
        }
        goog.object.set(a, b, c);
    };
    goog.object.get = function (a, b, c) {
        return null !== a && b in a ? a[b] : c;
    };
    goog.object.set = function (a, b, c) {
        a[b] = c;
    };
    goog.object.setIfUndefined = function (a, b, c) {
        return b in a ? a[b] : a[b] = c;
    };
    goog.object.setWithReturnValueIfNotSet = function (a, b, c) {
        if (b in a) {
            return a[b];
        }
        c = c();
        return a[b] = c;
    };
    goog.object.equals = function (a, b) {
        for (var c in a) {
            if (!(c in b) || a[c] !== b[c]) {
                return !1;
            }
        }
        for (var c in b) {
            if (!(c in a)) {
                return !1;
            }
        }
        return !0;
    };
    goog.object.clone = function (a) {
        var b = {};
        for (var c in a) {
            b[c] = a[c];
        }
        return b;
    };
    goog.object.unsafeClone = function (a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if (goog.isFunction(a.clone)) {
                return a.clone();
            }
            b = "array" == b ? [] : {};
            for (var c in a) {
                b[c] = goog.object.unsafeClone(a[c]);
            }
            return b;
        }
        return a;
    };
    goog.object.transpose = function (a) {
        var b = {};
        for (var c in a) {
            b[a[c]] = c;
        }
        return b;
    };
    goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    goog.object.extend = function (a, b) {
        var c, d;
        for (var b_2 = 1; b_2 < arguments.length; b_2++) {
            d = arguments[b_2];
            for (c in d) {
                a[c] = d[c];
            }
            for (var b_3 = 0; b_3 < goog.object.PROTOTYPE_FIELDS_.length; b_3++) {
                c = goog.object.PROTOTYPE_FIELDS_[b_3], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
            }
        }
    };
    goog.object.create = function (a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) {
            return goog.object.create.apply(null, arguments[0]);
        }
        if (b % 2) {
            throw Error("Uneven number of arguments");
        }
        var c = {};
        for (var a_5 = 0; a_5 < b; a_5 += 2) {
            c[arguments[a_5]] = arguments[a_5 + 1];
        }
        return c;
    };
    goog.object.createSet = function (a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) {
            return goog.object.createSet.apply(null, arguments[0]);
        }
        var c = {};
        for (var a_6 = 0; a_6 < b; a_6++) {
            c[arguments[a_6]] = !0;
        }
        return c;
    };
    goog.object.createImmutableView = function (a) {
        var b = a;
        Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
        return b;
    };
    goog.object.isImmutableView = function (a) {
        return !!Object.isFrozen && Object.isFrozen(a);
    };
    goog.object.getAllPropertyNames = function (a, b, c) {
        if (!a) {
            return [];
        }
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
            return goog.object.getKeys(a);
        }
        var d = {};
        for (; a && (a !== Object.prototype || b) && (a !== Function.prototype || c);) {
            var b_4 = Object.getOwnPropertyNames(a);
            for (var a_7 = 0; a_7 < b_4.length; a_7++) {
                d[b_4[a_7]] = !0;
            }
            a = Object.getPrototypeOf(a);
        }
        return goog.object.getKeys(d);
    };
    goog.object.getSuperClass = function (a) {
        return (a = Object.getPrototypeOf(a.prototype)) && a.constructor;
    };
    goog.dom.tags = {};
    goog.dom.tags.VOID_TAGS_ = { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 };
    goog.dom.tags.isVoidTag = function (a) {
        return !0 === goog.dom.tags.VOID_TAGS_[a];
    };
    goog.html = {};
    goog.html.trustedtypes = {};
    goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#html") : null;
    goog.string = {};
    goog.string.TypedString = function () {
    };
    goog.string.Const = function (a, b) {
        this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
        this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
    };
    goog.string.Const.prototype.implementsGoogStringTypedString = !0;
    goog.string.Const.prototype.getTypedStringValue = function () {
        return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    };
    goog.DEBUG && (goog.string.Const.prototype.toString = function () {
        return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
    });
    goog.string.Const.unwrap = function (a) {
        if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
            return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
        }
        goog.asserts.fail("expected object of type Const, got '" + a + "'");
        return "type_error:Const";
    };
    goog.string.Const.from = function (a) {
        return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, a);
    };
    goog.string.Const.TYPE_MARKER_ = {};
    goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    goog.string.Const.EMPTY = goog.string.Const.from("");
    goog.html.SafeScript = function () {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    };
    goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeScript.fromConstant = function (a) {
        a = goog.string.Const.unwrap(a);
        return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeScript.fromConstantAndArgs = function (a, b) {
        for (var c = [], d = 1; d < arguments.length; d++) {
            c.push(goog.html.SafeScript.stringify_(arguments[d]));
        }
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("(" + goog.string.Const.unwrap(a) + ")(" + c.join(", ") + ");");
    };
    goog.html.SafeScript.fromJson = function (a) {
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a));
    };
    goog.html.SafeScript.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
    };
    goog.DEBUG && (goog.html.SafeScript.prototype.toString = function () {
        return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}";
    });
    goog.html.SafeScript.unwrap = function (a) {
        return goog.html.SafeScript.unwrapTrustedScript(a).toString();
    };
    goog.html.SafeScript.unwrapTrustedScript = function (a) {
        if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
        }
        goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeScript";
    };
    goog.html.SafeScript.stringify_ = function (a) {
        return JSON.stringify(a).replace(/</g, "\\x3c");
    };
    goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function (a) {
        return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a);
    };
    goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a) : a;
        return this;
    };
    goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
    goog.fs = {};
    goog.fs.url = {};
    goog.fs.url.createObjectUrl = function (a) {
        return goog.fs.url.getUrlObject_().createObjectURL(a);
    };
    goog.fs.url.revokeObjectUrl = function (a) {
        goog.fs.url.getUrlObject_().revokeObjectURL(a);
    };
    goog.fs.url.getUrlObject_ = function () {
        var a = goog.fs.url.findUrlObject_();
        if (null != a) {
            return a;
        }
        throw Error("This browser doesn't seem to support blob URLs");
    };
    goog.fs.url.findUrlObject_ = function () {
        return void 0 !== goog.global.URL && void 0 !== goog.global.URL.createObjectURL ? goog.global.URL : void 0 !== goog.global.webkitURL && void 0 !== goog.global.webkitURL.createObjectURL ? goog.global.webkitURL : void 0 !== goog.global.createObjectURL ? goog.global : null;
    };
    goog.fs.url.browserSupportsObjectUrls = function () {
        return null != goog.fs.url.findUrlObject_();
    };
    goog.i18n = {};
    goog.i18n.bidi = {};
    goog.i18n.bidi.FORCE_RTL = !1;
    goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) || 7 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) && ("adlm" == goog.LOCALE.substring(3, 7).toLowerCase() || "arab" == goog.LOCALE.substring(3, 7).toLowerCase() || "hebr" == goog.LOCALE.substring(3, 7).toLowerCase() || "nkoo" == goog.LOCALE.substring(3, 7).toLowerCase() || "rohg" == goog.LOCALE.substring(3, 7).toLowerCase() || "thaa" == goog.LOCALE.substring(3, 7).toLowerCase()) || 8 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) && ("adlm" == goog.LOCALE.substring(4, 8).toLowerCase() || "arab" == goog.LOCALE.substring(4, 8).toLowerCase() || "hebr" == goog.LOCALE.substring(4, 8).toLowerCase() ||
        "nkoo" == goog.LOCALE.substring(4, 8).toLowerCase() || "rohg" == goog.LOCALE.substring(4, 8).toLowerCase() || "thaa" == goog.LOCALE.substring(4, 8).toLowerCase());
    goog.i18n.bidi.Format = { LRE: "\u202a", RLE: "\u202b", PDF: "\u202c", LRM: "\u200e", RLM: "\u200f" };
    goog.i18n.bidi.Dir = { LTR: 1, RTL: -1, NEUTRAL: 0 };
    goog.i18n.bidi.RIGHT = "right";
    goog.i18n.bidi.LEFT = "left";
    goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
    goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
    goog.i18n.bidi.toDir = function (a, b) {
        return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    };
    goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
    goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";
    goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
    goog.i18n.bidi.stripHtmlIfNeeded_ = function (a, b) {
        return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a;
    };
    goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.hasAnyRtl = function (a, b) {
        return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
    goog.i18n.bidi.hasAnyLtr = function (a, b) {
        return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.isRtlChar = function (a) {
        return goog.i18n.bidi.rtlRe_.test(a);
    };
    goog.i18n.bidi.isLtrChar = function (a) {
        return goog.i18n.bidi.ltrRe_.test(a);
    };
    goog.i18n.bidi.isNeutralChar = function (a) {
        return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a);
    };
    goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.startsWithRtl = function (a, b) {
        return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
    goog.i18n.bidi.startsWithLtr = function (a, b) {
        return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
    goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
    goog.i18n.bidi.isNeutralText = function (a, b) {
        a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
        return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a);
    };
    goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
    goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
    goog.i18n.bidi.endsWithLtr = function (a, b) {
        return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
    goog.i18n.bidi.endsWithRtl = function (a, b) {
        return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
    };
    goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
    goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
    goog.i18n.bidi.isRtlLanguage = function (a) {
        return goog.i18n.bidi.rtlLocalesRe_.test(a);
    };
    goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
    goog.i18n.bidi.guardBracketInText = function (a, b) {
        b = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
        return a.replace(goog.i18n.bidi.bracketGuardTextRe_, b + "$&" + b);
    };
    goog.i18n.bidi.enforceRtlInHtml = function (a) {
        return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
    };
    goog.i18n.bidi.enforceRtlInText = function (a) {
        return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF;
    };
    goog.i18n.bidi.enforceLtrInHtml = function (a) {
        return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
    };
    goog.i18n.bidi.enforceLtrInText = function (a) {
        return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF;
    };
    goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
    goog.i18n.bidi.leftRe_ = /left/gi;
    goog.i18n.bidi.rightRe_ = /right/gi;
    goog.i18n.bidi.tempRe_ = /%%%%/g;
    goog.i18n.bidi.mirrorCSS = function (a) {
        return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
    };
    goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
    goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
    goog.i18n.bidi.normalizeHebrewQuote = function (a) {
        return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3");
    };
    goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
    goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
    goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;
    goog.i18n.bidi.estimateDirection = function (a, b) {
        var c = 0, d = 0, e = !1;
        a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_);
        for (b = 0; b < a.length; b++) {
            var f = a[b];
            goog.i18n.bidi.startsWithRtl(f) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(f) ? e = !0 : goog.i18n.bidi.hasAnyLtr(f) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(f) && (e = !0);
        }
        return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    };
    goog.i18n.bidi.detectRtlDirectionality = function (a, b) {
        return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL;
    };
    goog.i18n.bidi.setElementDirAndAlign = function (a, b) {
        a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
    };
    goog.i18n.bidi.setElementDirByTextDirectionality = function (a, b) {
        switch (goog.i18n.bidi.estimateDirection(b)) {
            case goog.i18n.bidi.Dir.LTR:
                a.dir = "ltr";
                break;
            case goog.i18n.bidi.Dir.RTL:
                a.dir = "rtl";
                break;
            default:
                a.removeAttribute("dir");
        }
    };
    goog.i18n.bidi.DirectionalString = function () {
    };
    goog.html.TrustedResourceUrl = function (a, b) {
        this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a === goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
        this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    };
    goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
    goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
    };
    goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.TrustedResourceUrl.prototype.getDirection = function () {
        return goog.i18n.bidi.Dir.LTR;
    };
    goog.html.TrustedResourceUrl.prototype.cloneWithParams = function (a, b) {
        var c = goog.html.TrustedResourceUrl.unwrap(this);
        c = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c);
        var d = c[3] || "";
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c[1] + goog.html.TrustedResourceUrl.stringifyParams_("?", c[2] || "", a) + goog.html.TrustedResourceUrl.stringifyParams_("#", d, b));
    };
    goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function () {
        return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
    });
    goog.html.TrustedResourceUrl.unwrap = function (a) {
        return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a).toString();
    };
    goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function (a) {
        if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
        }
        goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:TrustedResourceUrl";
    };
    goog.html.TrustedResourceUrl.format = function (a, b) {
        var c = goog.string.Const.unwrap(a);
        if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c)) {
            throw Error("Invalid TrustedResourceUrl format: " + c);
        }
        a = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function (a, e) {
            if (!Object.prototype.hasOwnProperty.call(b, e)) {
                throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
            }
            a = b[e];
            return a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : encodeURIComponent(String(a));
        });
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
    goog.html.TrustedResourceUrl.BASE_URL_ = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
    goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
    goog.html.TrustedResourceUrl.formatWithParams = function (a, b, c, d) {
        return goog.html.TrustedResourceUrl.format(a, b).cloneWithParams(c, d);
    };
    goog.html.TrustedResourceUrl.fromConstant = function (a) {
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
    };
    goog.html.TrustedResourceUrl.fromConstants = function (a) {
        for (var b = "", c = 0; c < a.length; c++) {
            b += goog.string.Const.unwrap(a[c]);
        }
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function (a) {
        a = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a) : a;
        return new goog.html.TrustedResourceUrl(goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a);
    };
    goog.html.TrustedResourceUrl.stringifyParams_ = function (a, b, c) {
        if (null == c) {
            return b;
        }
        if ("string" === typeof c) {
            return c ? a + encodeURIComponent(c) : "";
        }
        for (var d in c) {
            var e = c[d];
            e = goog.isArray(e) ? e : [e];
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                null != g && (b || (b = a), b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(g)));
            }
        }
        return b;
    };
    goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    goog.string.internal = {};
    goog.string.internal.startsWith = function (a, b) {
        return 0 == a.lastIndexOf(b, 0);
    };
    goog.string.internal.endsWith = function (a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c;
    };
    goog.string.internal.caseInsensitiveStartsWith = function (a, b) {
        return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(0, b.length));
    };
    goog.string.internal.caseInsensitiveEndsWith = function (a, b) {
        return 0 == goog.string.internal.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
    };
    goog.string.internal.caseInsensitiveEquals = function (a, b) {
        return a.toLowerCase() == b.toLowerCase();
    };
    goog.string.internal.isEmptyOrWhitespace = function (a) {
        return /^[\s\xa0]*$/.test(a);
    };
    goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function (a) {
        return a.trim();
    } : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
    };
    goog.string.internal.caseInsensitiveCompare = function (a, b) {
        a = String(a).toLowerCase();
        b = String(b).toLowerCase();
        return a < b ? -1 : a == b ? 0 : 1;
    };
    goog.string.internal.newLineToBr = function (a, b) {
        return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
    };
    goog.string.internal.htmlEscape = function (a, b) {
        if (b) {
            a = a.replace(goog.string.internal.AMP_RE_, "&amp;").replace(goog.string.internal.LT_RE_, "&lt;").replace(goog.string.internal.GT_RE_, "&gt;").replace(goog.string.internal.QUOT_RE_, "&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.internal.NULL_RE_, "&#0;");
        }
        else {
            if (!goog.string.internal.ALL_RE_.test(a)) {
                return a;
            }
            -1 != a.indexOf("&") && (a = a.replace(goog.string.internal.AMP_RE_, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(goog.string.internal.LT_RE_, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(goog.string.internal.GT_RE_, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(goog.string.internal.QUOT_RE_, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(goog.string.internal.NULL_RE_, "&#0;"));
        }
        return a;
    };
    goog.string.internal.AMP_RE_ = /&/g;
    goog.string.internal.LT_RE_ = /</g;
    goog.string.internal.GT_RE_ = />/g;
    goog.string.internal.QUOT_RE_ = /"/g;
    goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
    goog.string.internal.NULL_RE_ = /\x00/g;
    goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
    goog.string.internal.whitespaceEscape = function (a, b) {
        return goog.string.internal.newLineToBr(a.replace(/  /g, " &#160;"), b);
    };
    goog.string.internal.contains = function (a, b) {
        return -1 != a.indexOf(b);
    };
    goog.string.internal.caseInsensitiveContains = function (a, b) {
        return goog.string.internal.contains(a.toLowerCase(), b.toLowerCase());
    };
    goog.string.internal.compareVersions = function (a, b) {
        var c = 0;
        a = goog.string.internal.trim(String(a)).split(".");
        b = goog.string.internal.trim(String(b)).split(".");
        var d = Math.max(a.length, b.length);
        for (var g = 0; 0 == c && g < d; g++) {
            var e = a[g] || "", f = b[g] || "";
            do {
                e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                if (0 == e[0].length && 0 == f[0].length) {
                    break;
                }
                c = 0 == e[1].length ? 0 : parseInt(e[1], 10);
                var a_8 = 0 == f[1].length ? 0 : parseInt(f[1], 10);
                c = goog.string.internal.compareElements_(c, a_8) || goog.string.internal.compareElements_(0 == e[2].length, 0 == f[2].length) || goog.string.internal.compareElements_(e[2], f[2]);
                e = e[3];
                f = f[3];
            } while (0 == c);
        }
        return c;
    };
    goog.string.internal.compareElements_ = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    };
    goog.html.SafeUrl = function (a, b) {
        this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = a === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b || "";
        this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    };
    goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
    goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeUrl.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
    };
    goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.SafeUrl.prototype.getDirection = function () {
        return goog.i18n.bidi.Dir.LTR;
    };
    goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function () {
        return "SafeUrl{" + this.privateDoNotAccessOrElseSafeUrlWrappedValue_ + "}";
    });
    goog.html.SafeUrl.unwrap = function (a) {
        if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseSafeUrlWrappedValue_;
        }
        goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeUrl";
    };
    goog.html.SafeUrl.fromConstant = function (a) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
    };
    goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;
    goog.html.SafeUrl.isSafeMimeType = function (a) {
        return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a);
    };
    goog.html.SafeUrl.fromBlob = function (a) {
        a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.DATA_URL_PATTERN_ = /^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;
    goog.html.SafeUrl.fromDataUrl = function (a) {
        a = a.replace(/(%0A|%0D)/g, "");
        var b = a.match(goog.html.DATA_URL_PATTERN_);
        b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING);
    };
    goog.html.SafeUrl.fromTelUrl = function (a) {
        goog.string.internal.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SIP_URL_PATTERN_ = /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;
    goog.html.SafeUrl.fromSipUrl = function (a) {
        goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a)) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.fromFacebookMessengerUrl = function (a) {
        goog.string.internal.caseInsensitiveStartsWith(a, "fb-messenger://share") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.fromWhatsAppUrl = function (a) {
        goog.string.internal.caseInsensitiveStartsWith(a, "whatsapp://send") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.fromSmsUrl = function (a) {
        goog.string.internal.caseInsensitiveStartsWith(a, "sms:") && goog.html.SafeUrl.isSmsUrlBodyValid_(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.isSmsUrlBodyValid_ = function (a) {
        var b = a.indexOf("#");
        0 < b && (a = a.substring(0, b));
        b = a.match(/[?&]body=/gi);
        if (!b) {
            return !0;
        }
        if (1 < b.length) {
            return !1;
        }
        a = a.match(/[?&]body=([^&]*)/)[1];
        if (!a) {
            return !0;
        }
        try {
            decodeURIComponent(a);
        }
        catch (c) {
            return !1;
        }
        return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a);
    };
    goog.html.SafeUrl.fromSshUrl = function (a) {
        goog.string.internal.caseInsensitiveStartsWith(a, "ssh://") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.sanitizeChromeExtensionUrl = function (a, b) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, a, b);
    };
    goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function (a, b) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, a, b);
    };
    goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function (a, b) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, a, b);
    };
    goog.html.SafeUrl.sanitizeExtensionUrl_ = function (a, b, c) {
        (a = a.exec(b)) ? (a = a[1], -1 == (c instanceof goog.string.Const ? [goog.string.Const.unwrap(c)] : c.map(function (a) {
            return goog.string.Const.unwrap(a);
        })).indexOf(a) && (b = goog.html.SafeUrl.INNOCUOUS_STRING)) : b = goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.SafeUrl.fromTrustedResourceUrl = function (a) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a));
    };
    goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
    goog.html.SafeUrl.sanitize = function (a) {
        if (a instanceof goog.html.SafeUrl) {
            return a;
        }
        a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
        goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.sanitizeAssertUnchanged = function (a, b) {
        if (a instanceof goog.html.SafeUrl) {
            return a;
        }
        a = "object" == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
        if (b && /^data:/i.test(a) && (b = goog.html.SafeUrl.fromDataUrl(a), b.getTypedStringValue() == a)) {
            return b;
        }
        goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a), "%s does not match the safe URL pattern", a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function (a) {
        return new goog.html.SafeUrl(goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a);
    };
    goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
    goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
    goog.html.SafeStyle = function () {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
        this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    };
    goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeStyle.fromConstant = function (a) {
        a = goog.string.Const.unwrap(a);
        if (0 === a.length) {
            return goog.html.SafeStyle.EMPTY;
        }
        goog.asserts.assert(goog.string.internal.endsWith(a, ";"), "Last character of style string is not ';': " + a);
        goog.asserts.assert(goog.string.internal.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeStyle.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    };
    goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function () {
        return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
    });
    goog.html.SafeStyle.unwrap = function (a) {
        if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
        }
        goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeStyle";
    };
    goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function (a) {
        return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a);
    };
    goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
        return this;
    };
    goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
    goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
    goog.html.SafeStyle.create = function (a) {
        var b = "", c;
        for (c in a) {
            if (!/^[-_a-zA-Z0-9]+$/.test(c)) {
                throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
            }
            var d = a[c];
            null != d && (d = goog.isArray(d) ? goog.array.map(d, goog.html.SafeStyle.sanitizePropertyValue_).join(" ") : goog.html.SafeStyle.sanitizePropertyValue_(d), b += c + ":" + d + ";");
        }
        return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
    };
    goog.html.SafeStyle.sanitizePropertyValue_ = function (a) {
        if (a instanceof goog.html.SafeUrl) {
            return 'url("' + goog.html.SafeUrl.unwrap(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        }
        a = a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : goog.html.SafeStyle.sanitizePropertyValueString_(String(a));
        if (/[{;}]/.test(a)) {
            throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.", [a]);
        }
        return a;
    };
    goog.html.SafeStyle.sanitizePropertyValueString_ = function (a) {
        var b = a.replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.URL_RE_, "url");
        if (goog.html.SafeStyle.VALUE_RE_.test(b)) {
            if (goog.html.SafeStyle.COMMENT_RE_.test(a)) {
                return goog.asserts.fail("String value disallows comments, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
            }
            if (!goog.html.SafeStyle.hasBalancedQuotes_(a)) {
                return goog.asserts.fail("String value requires balanced quotes, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
            }
            if (!goog.html.SafeStyle.hasBalancedSquareBrackets_(a)) {
                return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
            }
        }
        else {
            return goog.asserts.fail("String value allows only " + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + " and simple functions, got: " + a), goog.html.SafeStyle.INNOCUOUS_STRING;
        }
        return goog.html.SafeStyle.sanitizeUrl_(a);
    };
    goog.html.SafeStyle.hasBalancedQuotes_ = function (a) {
        for (var b = !0, c = !0, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            "'" == e && c ? b = !b : '"' == e && b && (c = !c);
        }
        return b && c;
    };
    goog.html.SafeStyle.hasBalancedSquareBrackets_ = function (a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b) {
                    return !1;
                }
                b = !0;
            }
            else {
                if ("[" == e) {
                    if (!b) {
                        return !1;
                    }
                    b = !1;
                }
                else {
                    if (!b && !c.test(e)) {
                        return !1;
                    }
                }
            }
        }
        return b;
    };
    goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ = "[-,.\"'%_!# a-zA-Z0-9\\[\\]]";
    goog.html.SafeStyle.VALUE_RE_ = new RegExp("^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$");
    goog.html.SafeStyle.URL_RE_ = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
    goog.html.SafeStyle.ALLOWED_FUNCTIONS_ = "calc cubic-bezier fit-content hsl hsla matrix minmax repeat rgb rgba (rotate|scale|translate)(X|Y|Z|3d)?".split(" ");
    goog.html.SafeStyle.FUNCTIONS_RE_ = new RegExp("\\b(" + goog.html.SafeStyle.ALLOWED_FUNCTIONS_.join("|") + ")\\([-+*/0-9a-z.%\\[\\], ]+\\)", "g");
    goog.html.SafeStyle.COMMENT_RE_ = /\/\*/;
    goog.html.SafeStyle.sanitizeUrl_ = function (a) {
        return a.replace(goog.html.SafeStyle.URL_RE_, function (a, c, d, e) {
            var b = "";
            d = d.replace(/^(['"])(.*)\1$/, function (a, c, d) {
                b = c;
                return d;
            });
            a = goog.html.SafeUrl.sanitize(d).getTypedStringValue();
            return c + b + a + b + e;
        });
    };
    goog.html.SafeStyle.concat = function (a) {
        var b = "", c = function (a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
        };
        goog.array.forEach(arguments, c);
        return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
    };
    goog.html.SafeStyleSheet = function () {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
        this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    };
    goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeStyleSheet.createRule = function (a, b) {
        if (goog.string.internal.contains(a, "<")) {
            throw Error("Selector does not allow '<', got: " + a);
        }
        var c = a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
        if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c)) {
            throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + a);
        }
        if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(c)) {
            throw Error("() and [] in selector must be balanced, got: " + a);
        }
        b instanceof goog.html.SafeStyle || (b = goog.html.SafeStyle.create(b));
        a = a + "{" + goog.html.SafeStyle.unwrap(b).replace(/</g, "\\3C ") + "}";
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeStyleSheet.hasBalancedBrackets_ = function (a) {
        for (var b = { "(": ")", "[": "]" }, c = [], d = 0; d < a.length; d++) {
            var e = a[d];
            if (b[e]) {
                c.push(b[e]);
            }
            else {
                if (goog.object.contains(b, e) && c.pop() != e) {
                    return !1;
                }
            }
        }
        return 0 == c.length;
    };
    goog.html.SafeStyleSheet.concat = function (a) {
        var b = "", c = function (a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a);
        };
        goog.array.forEach(arguments, c);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.SafeStyleSheet.fromConstant = function (a) {
        a = goog.string.Const.unwrap(a);
        if (0 === a.length) {
            return goog.html.SafeStyleSheet.EMPTY;
        }
        goog.asserts.assert(!goog.string.internal.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
    };
    goog.html.SafeStyleSheet.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    };
    goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function () {
        return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}";
    });
    goog.html.SafeStyleSheet.unwrap = function (a) {
        if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
        }
        goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeStyleSheet";
    };
    goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function (a) {
        return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a);
    };
    goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a) {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
        return this;
    };
    goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
    goog.labs = {};
    goog.labs.userAgent = {};
    goog.labs.userAgent.util = {};
    goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
        var a = goog.labs.userAgent.util.getNavigator_();
        return a && (a = a.userAgent) ? a : "";
    };
    goog.labs.userAgent.util.getNavigator_ = function () {
        return goog.global.navigator;
    };
    goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
    goog.labs.userAgent.util.setUserAgent = function (a) {
        goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
    };
    goog.labs.userAgent.util.getUserAgent = function () {
        return goog.labs.userAgent.util.userAgent_;
    };
    goog.labs.userAgent.util.matchUserAgent = function (a) {
        var b = goog.labs.userAgent.util.getUserAgent();
        return goog.string.internal.contains(b, a);
    };
    goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (a) {
        var b = goog.labs.userAgent.util.getUserAgent();
        return goog.string.internal.caseInsensitiveContains(b, a);
    };
    goog.labs.userAgent.util.extractVersionTuples = function (a) {
        for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) {
            c.push([d[1], d[2], d[3] || void 0]);
        }
        return c;
    };
    goog.labs.userAgent.browser = {};
    goog.labs.userAgent.browser.matchOpera_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Opera");
    };
    goog.labs.userAgent.browser.matchIE_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
    };
    goog.labs.userAgent.browser.matchEdgeHtml_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Edge");
    };
    goog.labs.userAgent.browser.matchEdgeChromium_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Edg/");
    };
    goog.labs.userAgent.browser.matchOperaChromium_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("OPR");
    };
    goog.labs.userAgent.browser.matchFirefox_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Firefox") || goog.labs.userAgent.util.matchUserAgent("FxiOS");
    };
    goog.labs.userAgent.browser.matchSafari_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdgeHtml_() || goog.labs.userAgent.browser.matchEdgeChromium_() || goog.labs.userAgent.browser.matchOperaChromium_() || goog.labs.userAgent.browser.matchFirefox_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
    };
    goog.labs.userAgent.browser.matchCoast_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Coast");
    };
    goog.labs.userAgent.browser.matchIosWebview_ = function () {
        return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && !goog.labs.userAgent.browser.matchFirefox_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
    };
    goog.labs.userAgent.browser.matchChrome_ = function () {
        return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdgeHtml_();
    };
    goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
        return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
    };
    goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
    goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
    goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdgeHtml_;
    goog.labs.userAgent.browser.isEdgeChromium = goog.labs.userAgent.browser.matchEdgeChromium_;
    goog.labs.userAgent.browser.isOperaChromium = goog.labs.userAgent.browser.matchOperaChromium_;
    goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
    goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
    goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
    goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
    goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
    goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
    goog.labs.userAgent.browser.isSilk = function () {
        return goog.labs.userAgent.util.matchUserAgent("Silk");
    };
    goog.labs.userAgent.browser.getVersion = function () {
        function a(a) {
            a = goog.array.find(a, d);
            return c[a] || "";
        }
        var b = goog.labs.userAgent.util.getUserAgent();
        if (goog.labs.userAgent.browser.isIE()) {
            return goog.labs.userAgent.browser.getIEVersion_(b);
        }
        b = goog.labs.userAgent.util.extractVersionTuples(b);
        var c = {};
        goog.array.forEach(b, function (a) {
            c[a[0]] = a[1];
        });
        var d = goog.partial(goog.object.containsKey, c);
        return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) : goog.labs.userAgent.browser.isEdgeChromium() ? a(["Edg"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
    };
    goog.labs.userAgent.browser.isVersionOrHigher = function (a) {
        return 0 <= goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
    };
    goog.labs.userAgent.browser.getIEVersion_ = function (a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) {
            return b[1];
        }
        b = "";
        var c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1]) {
            if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) {
                if (a && a[1]) {
                    switch (a[1]) {
                        case "4.0":
                            b = "8.0";
                            break;
                        case "5.0":
                            b = "9.0";
                            break;
                        case "6.0":
                            b = "10.0";
                            break;
                        case "7.0":
                            b = "11.0";
                    }
                }
                else {
                    b = "7.0";
                }
            }
            else {
                b = c[1];
            }
        }
        return b;
    };
    goog.html.SafeHtml = function () {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
        this.dir_ = null;
    };
    goog.html.SafeHtml.ENABLE_ERROR_MESSAGES = goog.DEBUG;
    goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE = !0;
    goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.SafeHtml.prototype.getDirection = function () {
        return this.dir_;
    };
    goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeHtml.prototype.getTypedStringValue = function () {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
    };
    goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function () {
        return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
    });
    goog.html.SafeHtml.unwrap = function (a) {
        return goog.html.SafeHtml.unwrapTrustedHTML(a).toString();
    };
    goog.html.SafeHtml.unwrapTrustedHTML = function (a) {
        if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
            return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
        }
        goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeHtml";
    };
    goog.html.SafeHtml.htmlEscape = function (a) {
        if (a instanceof goog.html.SafeHtml) {
            return a;
        }
        var b = "object" == typeof a, c = null;
        b && a.implementsGoogI18nBidiDirectionalString && (c = a.getDirection());
        a = b && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a), c);
    };
    goog.html.SafeHtml.htmlEscapePreservingNewlines = function (a) {
        if (a instanceof goog.html.SafeHtml) {
            return a;
        }
        a = goog.html.SafeHtml.htmlEscape(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection());
    };
    goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function (a) {
        if (a instanceof goog.html.SafeHtml) {
            return a;
        }
        a = goog.html.SafeHtml.htmlEscape(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection());
    };
    goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
    goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
    goog.html.SafeHtml.URL_ATTRIBUTES_ = { action: !0, cite: !0, data: !0, formaction: !0, href: !0, manifest: !0, poster: !0, src: !0 };
    goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = { APPLET: !0, BASE: !0, EMBED: !0, IFRAME: !0, LINK: !0, MATH: !0, META: !0, OBJECT: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0 };
    goog.html.SafeHtml.create = function (a, b, c) {
        goog.html.SafeHtml.verifyTagName(String(a));
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c);
    };
    goog.html.SafeHtml.verifyTagName = function (a) {
        if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) {
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Invalid tag name <" + a + ">." : "");
        }
        if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) {
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Tag name <" + a + "> is not allowed for SafeHtml." : "");
        }
    };
    goog.html.SafeHtml.createIframe = function (a, b, c, d) {
        a && goog.html.TrustedResourceUrl.unwrap(a);
        var e = {};
        e.src = a || null;
        e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
        a = goog.html.SafeHtml.combineAttributes(e, { sandbox: "" }, c);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
    };
    goog.html.SafeHtml.createSandboxIframe = function (a, b, c, d) {
        if (!goog.html.SafeHtml.canUseSandboxIframe()) {
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
        }
        var e = {};
        e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
        e.srcdoc = b || null;
        e.sandbox = "";
        a = goog.html.SafeHtml.combineAttributes(e, {}, c);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
    };
    goog.html.SafeHtml.canUseSandboxIframe = function () {
        return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
    };
    goog.html.SafeHtml.createScriptSrc = function (a, b) {
        goog.html.TrustedResourceUrl.unwrap(a);
        a = goog.html.SafeHtml.combineAttributes({ src: a }, {}, b);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", a);
    };
    goog.html.SafeHtml.createScript = function (a, b) {
        for (var c in b) {
            var d = c.toLowerCase();
            if ("language" == d || "src" == d || "text" == d || "type" == d) {
                throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot set "' + d + '" attribute' : "");
            }
        }
        c = "";
        a = goog.array.concat(a);
        for (d = 0; d < a.length; d++) {
            c += goog.html.SafeScript.unwrap(a[d]);
        }
        a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, a);
    };
    goog.html.SafeHtml.createStyle = function (a, b) {
        b = goog.html.SafeHtml.combineAttributes({ type: "text/css" }, {}, b);
        var c = "";
        a = goog.array.concat(a);
        for (var d = 0; d < a.length; d++) {
            c += goog.html.SafeStyleSheet.unwrap(a[d]);
        }
        a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", b, a);
    };
    goog.html.SafeHtml.createMetaRefresh = function (a, b) {
        a = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
        (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.internal.contains(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'");
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", { "http-equiv": "refresh", content: (b || 0) + "; url=" + a });
    };
    goog.html.SafeHtml.getAttrNameAndValue_ = function (a, b, c) {
        if (c instanceof goog.string.Const) {
            c = goog.string.Const.unwrap(c);
        }
        else {
            if ("style" == b.toLowerCase()) {
                if (goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE) {
                    c = goog.html.SafeHtml.getStyleValue_(c);
                }
                else {
                    throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : "");
                }
            }
            else {
                if (/^on/i.test(b)) {
                    throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.' : "");
                }
                if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_) {
                    if (c instanceof goog.html.TrustedResourceUrl) {
                        c = goog.html.TrustedResourceUrl.unwrap(c);
                    }
                    else {
                        if (c instanceof goog.html.SafeUrl) {
                            c = goog.html.SafeUrl.unwrap(c);
                        }
                        else {
                            if ("string" === typeof c) {
                                c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
                            }
                            else {
                                throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.' : "");
                            }
                        }
                    }
                }
            }
        }
        c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
        goog.asserts.assert("string" === typeof c || "number" === typeof c, "String or number value expected, got " + typeof c + " with value: " + c);
        return b + '="' + goog.string.internal.htmlEscape(String(c)) + '"';
    };
    goog.html.SafeHtml.getStyleValue_ = function (a) {
        if (!goog.isObject(a)) {
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a : "");
        }
        a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
        return goog.html.SafeStyle.unwrap(a);
    };
    goog.html.SafeHtml.createWithDir = function (a, b, c, d) {
        b = goog.html.SafeHtml.create(b, c, d);
        b.dir_ = a;
        return b;
    };
    goog.html.SafeHtml.join = function (a, b) {
        a = goog.html.SafeHtml.htmlEscape(a);
        var c = a.getDirection(), d = [], e = function (a) {
            goog.isArray(a) ? goog.array.forEach(a, e) : (a = goog.html.SafeHtml.htmlEscape(a), d.push(goog.html.SafeHtml.unwrap(a)), a = a.getDirection(), c == goog.i18n.bidi.Dir.NEUTRAL ? c = a : a != goog.i18n.bidi.Dir.NEUTRAL && c != a && (c = null));
        };
        goog.array.forEach(b, e);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d.join(goog.html.SafeHtml.unwrap(a)), c);
    };
    goog.html.SafeHtml.concat = function (a) {
        return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY, Array.prototype.slice.call(arguments));
    };
    goog.html.SafeHtml.concatWithDir = function (a, b) {
        var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
        c.dir_ = a;
        return c;
    };
    goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function (a, b) {
        return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b);
    };
    goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function (a, b) {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a) : a;
        this.dir_ = b;
        return this;
    };
    goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function (a, b, c) {
        var d = null;
        var e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
        null == c ? c = [] : goog.isArray(c) || (c = [c]);
        goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
        (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d);
    };
    goog.html.SafeHtml.stringifyAttributes = function (a, b) {
        var c = "";
        if (b) {
            for (var d in b) {
                if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) {
                    throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Invalid attribute name "' + d + '".' : "");
                }
                var e = b[d];
                null != e && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e));
            }
        }
        return c;
    };
    goog.html.SafeHtml.combineAttributes = function (a, b, c) {
        var d = {}, e;
        for (e in a) {
            goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
        }
        for (e in b) {
            goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
        }
        if (c) {
            for (e in c) {
                var f = e.toLowerCase();
                if (f in a) {
                    throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"' : "");
                }
                f in b && delete d[f];
                d[e] = c[e];
            }
        }
        return d;
    };
    goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.uncheckedconversions = {};
    goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function (a, b, c) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null);
    };
    goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function (a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function (a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function (a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function (a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function (a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
    };
    goog.dom.safe = {};
    goog.dom.safe.InsertAdjacentHtmlPosition = { AFTERBEGIN: "afterbegin", AFTEREND: "afterend", BEFOREBEGIN: "beforebegin", BEFOREEND: "beforeend" };
    goog.dom.safe.insertAdjacentHtml = function (a, b, c) {
        a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrapTrustedHTML(c));
    };
    goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = { MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0 };
    goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function () {
        if (goog.DEBUG && "undefined" === typeof document) {
            return !1;
        }
        var a = document.createElement("div"), b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        if (goog.DEBUG && !a.firstChild) {
            return !1;
        }
        b = a.firstChild.firstChild;
        a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);
        return !b.parentElement;
    });
    goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function (a, b) {
        if (goog.dom.safe.isInnerHtmlCleanupRecursive_()) {
            for (; a.lastChild;) {
                a.removeChild(a.lastChild);
            }
        }
        a.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b);
    };
    goog.dom.safe.setInnerHtml = function (a, b) {
        if (goog.asserts.ENABLE_ASSERTS) {
            var c = a.tagName.toUpperCase();
            if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c]) {
                throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
            }
        }
        goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a, b);
    };
    goog.dom.safe.setOuterHtml = function (a, b) {
        a.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b);
    };
    goog.dom.safe.setFormElementAction = function (a, b) {
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        goog.dom.asserts.assertIsHTMLFormElement(a).action = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setButtonFormAction = function (a, b) {
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        goog.dom.asserts.assertIsHTMLButtonElement(a).formAction = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setInputFormAction = function (a, b) {
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        goog.dom.asserts.assertIsHTMLInputElement(a).formAction = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setStyle = function (a, b) {
        a.style.cssText = goog.html.SafeStyle.unwrap(b);
    };
    goog.dom.safe.documentWrite = function (a, b) {
        a.write(goog.html.SafeHtml.unwrapTrustedHTML(b));
    };
    goog.dom.safe.setAnchorHref = function (a, b) {
        goog.dom.asserts.assertIsHTMLAnchorElement(a);
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        a.href = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setImageSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLImageElement(a);
        if (!(b instanceof goog.html.SafeUrl)) {
            var c = /^data:image\//i.test(b);
            b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
        }
        a.src = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setAudioSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLAudioElement(a);
        if (!(b instanceof goog.html.SafeUrl)) {
            var c = /^data:audio\//i.test(b);
            b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
        }
        a.src = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setVideoSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLVideoElement(a);
        if (!(b instanceof goog.html.SafeUrl)) {
            var c = /^data:video\//i.test(b);
            b = goog.html.SafeUrl.sanitizeAssertUnchanged(b, c);
        }
        a.src = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.setEmbedSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLEmbedElement(a);
        a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    };
    goog.dom.safe.setFrameSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLFrameElement(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b);
    };
    goog.dom.safe.setIframeSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLIFrameElement(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b);
    };
    goog.dom.safe.setIframeSrcdoc = function (a, b) {
        goog.dom.asserts.assertIsHTMLIFrameElement(a);
        a.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(b);
    };
    goog.dom.safe.setLinkHrefAndRel = function (a, b, c) {
        goog.dom.asserts.assertIsHTMLLinkElement(a);
        a.rel = c;
        goog.string.internal.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeAssertUnchanged(b));
    };
    goog.dom.safe.setObjectData = function (a, b) {
        goog.dom.asserts.assertIsHTMLObjectElement(a);
        a.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
    };
    goog.dom.safe.setScriptSrc = function (a, b) {
        goog.dom.asserts.assertIsHTMLScriptElement(a);
        a.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);
        (b = goog.getScriptNonce()) && a.setAttribute("nonce", b);
    };
    goog.dom.safe.setScriptContent = function (a, b) {
        goog.dom.asserts.assertIsHTMLScriptElement(a);
        a.text = goog.html.SafeScript.unwrapTrustedScript(b);
        (b = goog.getScriptNonce()) && a.setAttribute("nonce", b);
    };
    goog.dom.safe.setLocationHref = function (a, b) {
        goog.dom.asserts.assertIsLocation(a);
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        a.href = goog.html.SafeUrl.unwrap(b);
    };
    goog.dom.safe.assignLocation = function (a, b) {
        goog.dom.asserts.assertIsLocation(a);
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        a.assign(goog.html.SafeUrl.unwrap(b));
    };
    goog.dom.safe.replaceLocation = function (a, b) {
        goog.dom.asserts.assertIsLocation(a);
        b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
        a.replace(goog.html.SafeUrl.unwrap(b));
    };
    goog.dom.safe.openInWindow = function (a, b, c, d, e) {
        a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitizeAssertUnchanged(a);
        return (b || goog.global).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e);
    };
    goog.dom.safe.parseFromStringHtml = function (a, b) {
        return goog.dom.safe.parseFromString(a, b, "text/html");
    };
    goog.dom.safe.parseFromString = function (a, b, c) {
        return a.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b), c);
    };
    goog.dom.safe.createImageFromBlob = function (a) {
        if (!/^image\/.*/g.test(a.type)) {
            throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
        }
        var b = goog.global.URL.createObjectURL(a);
        a = new goog.global.Image;
        a.onload = function () {
            goog.global.URL.revokeObjectURL(b);
        };
        goog.dom.safe.setImageSrc(a, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."), b));
        return a;
    };
    goog.string.DETECT_DOUBLE_ESCAPING = !1;
    goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
    goog.string.Unicode = { NBSP: "\u00a0" };
    goog.string.startsWith = goog.string.internal.startsWith;
    goog.string.endsWith = goog.string.internal.endsWith;
    goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
    goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
    goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
    goog.string.subs = function (a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) {
            d += c.shift() + e.shift();
        }
        return d + c.join("%s");
    };
    goog.string.collapseWhitespace = function (a) {
        return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
    };
    goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
    goog.string.isEmptyString = function (a) {
        return 0 == a.length;
    };
    goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
    goog.string.isEmptyOrWhitespaceSafe = function (a) {
        return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
    };
    goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
    goog.string.isBreakingWhitespace = function (a) {
        return !/[^\t\n\r ]/.test(a);
    };
    goog.string.isAlpha = function (a) {
        return !/[^a-zA-Z]/.test(a);
    };
    goog.string.isNumeric = function (a) {
        return !/[^0-9]/.test(a);
    };
    goog.string.isAlphaNumeric = function (a) {
        return !/[^a-zA-Z0-9]/.test(a);
    };
    goog.string.isSpace = function (a) {
        return " " == a;
    };
    goog.string.isUnicodeChar = function (a) {
        return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
    };
    goog.string.stripNewlines = function (a) {
        return a.replace(/(\r\n|\r|\n)+/g, " ");
    };
    goog.string.canonicalizeNewlines = function (a) {
        return a.replace(/(\r\n|\r|\n)/g, "\n");
    };
    goog.string.normalizeWhitespace = function (a) {
        return a.replace(/\xa0|\s/g, " ");
    };
    goog.string.normalizeSpaces = function (a) {
        return a.replace(/\xa0|[ \t]+/g, " ");
    };
    goog.string.collapseBreakingSpaces = function (a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
    };
    goog.string.trim = goog.string.internal.trim;
    goog.string.trimLeft = function (a) {
        return a.replace(/^[\s\xa0]+/, "");
    };
    goog.string.trimRight = function (a) {
        return a.replace(/[\s\xa0]+$/, "");
    };
    goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
    goog.string.numberAwareCompare_ = function (a, b, c) {
        if (a == b) {
            return 0;
        }
        if (!a) {
            return -1;
        }
        if (!b) {
            return 1;
        }
        for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
            c = d[g];
            var h = e[g];
            if (c != h) {
                return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
            }
        }
        return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
    };
    goog.string.intAwareCompare = function (a, b) {
        return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
    };
    goog.string.floatAwareCompare = function (a, b) {
        return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
    };
    goog.string.numerateCompare = goog.string.floatAwareCompare;
    goog.string.urlEncode = function (a) {
        return encodeURIComponent(String(a));
    };
    goog.string.urlDecode = function (a) {
        return decodeURIComponent(a.replace(/\+/g, " "));
    };
    goog.string.newLineToBr = goog.string.internal.newLineToBr;
    goog.string.htmlEscape = function (a, b) {
        a = goog.string.internal.htmlEscape(a, b);
        goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
        return a;
    };
    goog.string.E_RE_ = /e/g;
    goog.string.unescapeEntities = function (a) {
        return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
    };
    goog.string.unescapeEntitiesWithDocument = function (a, b) {
        return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
    };
    goog.string.unescapeEntitiesUsingDom_ = function (a, b) {
        var c = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };
        var d = b ? b.createElement("div") : goog.global.document.createElement("div");
        return a.replace(goog.string.HTML_ENTITY_PATTERN_, function (a, b) {
            var e = c[a];
            if (e) {
                return e;
            }
            "#" == b.charAt(0) && (b = Number("0" + b.substr(1)), isNaN(b) || (e = String.fromCharCode(b)));
            e || (goog.dom.safe.setInnerHtml(d, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."), a + " ")), e = d.firstChild.nodeValue.slice(0, -1));
            return c[a] = e;
        });
    };
    goog.string.unescapePureXmlEntities_ = function (a) {
        return a.replace(/&([^;]+);/g, function (a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    return "#" != c.charAt(0) || (c = Number("0" + c.substr(1)), isNaN(c)) ? a : String.fromCharCode(c);
            }
        });
    };
    goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    goog.string.whitespaceEscape = function (a, b) {
        return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
    };
    goog.string.preserveSpaces = function (a) {
        return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
    };
    goog.string.stripQuotes = function (a, b) {
        for (var c = b.length, d = 0; d < c; d++) {
            var e = 1 == c ? b : b.charAt(d);
            if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
                return a.substring(1, a.length - 1);
            }
        }
        return a;
    };
    goog.string.truncate = function (a, b, c) {
        c && (a = goog.string.unescapeEntities(a));
        a.length > b && (a = a.substring(0, b - 3) + "...");
        c && (a = goog.string.htmlEscape(a));
        return a;
    };
    goog.string.truncateMiddle = function (a, b, c, d) {
        c && (a = goog.string.unescapeEntities(a));
        if (d && a.length > b) {
            d > b && (d = b);
            var e = a.length - d;
            a = a.substring(0, b - d) + "..." + a.substring(e);
        }
        else {
            a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
        }
        c && (a = goog.string.htmlEscape(a));
        return a;
    };
    goog.string.specialEscapeChars_ = { "\x00": "\\0", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\x0B", '"': '\\"', "\\": "\\\\", "<": "\\u003C" };
    goog.string.jsEscapeCache_ = { "'": "\\'" };
    goog.string.quote = function (a) {
        a = String(a);
        for (var b = ['"'], c = 0; c < a.length; c++) {
            var d = a.charAt(c), e = d.charCodeAt(0);
            b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
        }
        b.push('"');
        return b.join("");
    };
    goog.string.escapeString = function (a) {
        for (var b = [], c = 0; c < a.length; c++) {
            b[c] = goog.string.escapeChar(a.charAt(c));
        }
        return b.join("");
    };
    goog.string.escapeChar = function (a) {
        if (a in goog.string.jsEscapeCache_) {
            return goog.string.jsEscapeCache_[a];
        }
        if (a in goog.string.specialEscapeChars_) {
            return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
        }
        var b = a.charCodeAt(0);
        if (31 < b && 127 > b) {
            var c = a;
        }
        else {
            if (256 > b) {
                if (c = "\\x", 16 > b || 256 < b) {
                    c += "0";
                }
            }
            else {
                c = "\\u", 4096 > b && (c += "0");
            }
            c += b.toString(16).toUpperCase();
        }
        return goog.string.jsEscapeCache_[a] = c;
    };
    goog.string.contains = goog.string.internal.contains;
    goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
    goog.string.countOf = function (a, b) {
        return a && b ? a.split(b).length - 1 : 0;
    };
    goog.string.removeAt = function (a, b, c) {
        var d = a;
        0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
        return d;
    };
    goog.string.remove = function (a, b) {
        return a.replace(b, "");
    };
    goog.string.removeAll = function (a, b) {
        b = new RegExp(goog.string.regExpEscape(b), "g");
        return a.replace(b, "");
    };
    goog.string.replaceAll = function (a, b, c) {
        b = new RegExp(goog.string.regExpEscape(b), "g");
        return a.replace(b, c.replace(/\$/g, "$$$$"));
    };
    goog.string.regExpEscape = function (a) {
        return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    };
    goog.string.repeat = String.prototype.repeat ? function (a, b) {
        return a.repeat(b);
    } : function (a, b) {
        return Array(b + 1).join(a);
    };
    goog.string.padNumber = function (a, b, c) {
        a = void 0 !== c ? a.toFixed(c) : String(a);
        c = a.indexOf(".");
        -1 == c && (c = a.length);
        return goog.string.repeat("0", Math.max(0, b - c)) + a;
    };
    goog.string.makeSafe = function (a) {
        return null == a ? "" : String(a);
    };
    goog.string.buildString = function (a) {
        return Array.prototype.join.call(arguments, "");
    };
    goog.string.getRandomString = function () {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
    };
    goog.string.compareVersions = goog.string.internal.compareVersions;
    goog.string.hashCode = function (a) {
        for (var b = 0, c = 0; c < a.length; ++c) {
            b = 31 * b + a.charCodeAt(c) >>> 0;
        }
        return b;
    };
    goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
    goog.string.createUniqueString = function () {
        return "goog_" + goog.string.uniqueStringCounter_++;
    };
    goog.string.toNumber = function (a) {
        var b = Number(a);
        return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
    };
    goog.string.isLowerCamelCase = function (a) {
        return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
    };
    goog.string.isUpperCamelCase = function (a) {
        return /^([A-Z][a-z]*)+$/.test(a);
    };
    goog.string.toCamelCase = function (a) {
        return String(a).replace(/\-([a-z])/g, function (a, c) {
            return c.toUpperCase();
        });
    };
    goog.string.toSelectorCase = function (a) {
        return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
    };
    goog.string.toTitleCase = function (a, b) {
        b = "string" === typeof b ? goog.string.regExpEscape(b) : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
            return b + e.toUpperCase();
        });
    };
    goog.string.capitalize = function (a) {
        return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
    };
    goog.string.parseInt = function (a) {
        isFinite(a) && (a = String(a));
        return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
    };
    goog.string.splitLimit = function (a, b, c) {
        a = a.split(b);
        for (var d = []; 0 < c && a.length;) {
            d.push(a.shift()), c--;
        }
        a.length && d.push(a.join(b));
        return d;
    };
    goog.string.lastComponent = function (a, b) {
        if (b) {
            "string" == typeof b && (b = [b]);
        }
        else {
            return a;
        }
        for (var c = -1, d = 0; d < b.length; d++) {
            if ("" != b[d]) {
                var e = a.lastIndexOf(b[d]);
                e > c && (c = e);
            }
        }
        return -1 == c ? a : a.slice(c + 1);
    };
    goog.string.editDistance = function (a, b) {
        var c = [], d = [];
        if (a == b) {
            return 0;
        }
        if (!a.length || !b.length) {
            return Math.max(a.length, b.length);
        }
        for (var e = 0; e < b.length + 1; e++) {
            c[e] = e;
        }
        for (e = 0; e < a.length; e++) {
            d[0] = e + 1;
            for (var f = 0; f < b.length; f++) {
                d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
            }
            for (f = 0; f < c.length; f++) {
                c[f] = d[f];
            }
        }
        return d[b.length];
    };
    goog.labs.userAgent.engine = {};
    goog.labs.userAgent.engine.isPresto = function () {
        return goog.labs.userAgent.util.matchUserAgent("Presto");
    };
    goog.labs.userAgent.engine.isTrident = function () {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
    };
    goog.labs.userAgent.engine.isEdge = function () {
        return goog.labs.userAgent.util.matchUserAgent("Edge");
    };
    goog.labs.userAgent.engine.isWebKit = function () {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
    };
    goog.labs.userAgent.engine.isGecko = function () {
        return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
    };
    goog.labs.userAgent.engine.getVersion = function () {
        var a = goog.labs.userAgent.util.getUserAgent();
        if (a) {
            a = goog.labs.userAgent.util.extractVersionTuples(a);
            var b = goog.labs.userAgent.engine.getEngineTuple_(a);
            if (b) {
                return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
            }
            a = a[0];
            var c;
            if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) {
                return c[1];
            }
        }
        return "";
    };
    goog.labs.userAgent.engine.getEngineTuple_ = function (a) {
        if (!goog.labs.userAgent.engine.isEdge()) {
            return a[1];
        }
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if ("Edge" == c[0]) {
                return c;
            }
        }
    };
    goog.labs.userAgent.engine.isVersionOrHigher = function (a) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
    };
    goog.labs.userAgent.engine.getVersionForKey_ = function (a, b) {
        return (a = goog.array.find(a, function (a) {
            return b == a[0];
        })) && a[1] || "";
    };
    goog.labs.userAgent.platform = {};
    goog.labs.userAgent.platform.isAndroid = function () {
        return goog.labs.userAgent.util.matchUserAgent("Android");
    };
    goog.labs.userAgent.platform.isIpod = function () {
        return goog.labs.userAgent.util.matchUserAgent("iPod");
    };
    goog.labs.userAgent.platform.isIphone = function () {
        return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
    };
    goog.labs.userAgent.platform.isIpad = function () {
        return goog.labs.userAgent.util.matchUserAgent("iPad");
    };
    goog.labs.userAgent.platform.isIos = function () {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
    };
    goog.labs.userAgent.platform.isMacintosh = function () {
        return goog.labs.userAgent.util.matchUserAgent("Macintosh");
    };
    goog.labs.userAgent.platform.isLinux = function () {
        return goog.labs.userAgent.util.matchUserAgent("Linux");
    };
    goog.labs.userAgent.platform.isWindows = function () {
        return goog.labs.userAgent.util.matchUserAgent("Windows");
    };
    goog.labs.userAgent.platform.isChromeOS = function () {
        return goog.labs.userAgent.util.matchUserAgent("CrOS");
    };
    goog.labs.userAgent.platform.isChromecast = function () {
        return goog.labs.userAgent.util.matchUserAgent("CrKey");
    };
    goog.labs.userAgent.platform.isKaiOS = function () {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS");
    };
    goog.labs.userAgent.platform.isGo2Phone = function () {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("GAFP");
    };
    goog.labs.userAgent.platform.getVersion = function () {
        var a = goog.labs.userAgent.util.getUserAgent(), b = "";
        goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isKaiOS() ? (b = /(?:KaiOS)\/(\S+)/i, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isAndroid() ?
            (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
        return b || "";
    };
    goog.labs.userAgent.platform.isVersionOrHigher = function (a) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
    };
    goog.reflect = {};
    goog.reflect.object = function (a, b) {
        return b;
    };
    goog.reflect.objectProperty = function (a, b) {
        return a;
    };
    goog.reflect.sinkValue = function (a) {
        goog.reflect.sinkValue[" "](a);
        return a;
    };
    goog.reflect.sinkValue[" "] = goog.nullFunction;
    goog.reflect.canAccessProperty = function (a, b) {
        try {
            return goog.reflect.sinkValue(a[b]), !0;
        }
        catch (c) {
        }
        return !1;
    };
    goog.reflect.cache = function (a, b, c, d) {
        d = d ? d(b) : b;
        return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b);
    };
    goog.userAgent = {};
    goog.userAgent.ASSUME_IE = !1;
    goog.userAgent.ASSUME_EDGE = !1;
    goog.userAgent.ASSUME_GECKO = !1;
    goog.userAgent.ASSUME_WEBKIT = !1;
    goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
    goog.userAgent.ASSUME_OPERA = !1;
    goog.userAgent.ASSUME_ANY_VERSION = !1;
    goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
    goog.userAgent.getUserAgentString = function () {
        return goog.labs.userAgent.util.getUserAgent();
    };
    goog.userAgent.getNavigatorTyped = function () {
        return goog.global.navigator || null;
    };
    goog.userAgent.getNavigator = function () {
        return goog.userAgent.getNavigatorTyped();
    };
    goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
    goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
    goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
    goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
    goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
    goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
    goog.userAgent.isMobile_ = function () {
        return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
    };
    goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
    goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
    goog.userAgent.determinePlatform_ = function () {
        var a = goog.userAgent.getNavigatorTyped();
        return a && a.platform || "";
    };
    goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
    goog.userAgent.ASSUME_MAC = !1;
    goog.userAgent.ASSUME_WINDOWS = !1;
    goog.userAgent.ASSUME_LINUX = !1;
    goog.userAgent.ASSUME_X11 = !1;
    goog.userAgent.ASSUME_ANDROID = !1;
    goog.userAgent.ASSUME_IPHONE = !1;
    goog.userAgent.ASSUME_IPAD = !1;
    goog.userAgent.ASSUME_IPOD = !1;
    goog.userAgent.ASSUME_KAIOS = !1;
    goog.userAgent.ASSUME_GO2PHONE = !1;
    goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
    goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
    goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
    goog.userAgent.isLegacyLinux_ = function () {
        return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
    };
    goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
    goog.userAgent.isX11_ = function () {
        var a = goog.userAgent.getNavigatorTyped();
        return !!a && goog.string.contains(a.appVersion || "", "X11");
    };
    goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
    goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
    goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
    goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
    goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
    goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
    goog.userAgent.GO2PHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_GO2PHONE : goog.labs.userAgent.platform.isGo2Phone();
    goog.userAgent.determineVersion_ = function () {
        var a = "", b = goog.userAgent.getVersionRegexResult_();
        b && (a = b ? b[1] : "");
        return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a;
    };
    goog.userAgent.getVersionRegexResult_ = function () {
        var a = goog.userAgent.getUserAgentString();
        if (goog.userAgent.GECKO) {
            return /rv:([^\);]+)(\)|;)/.exec(a);
        }
        if (goog.userAgent.EDGE) {
            return /Edge\/([\d\.]+)/.exec(a);
        }
        if (goog.userAgent.IE) {
            return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        }
        if (goog.userAgent.WEBKIT) {
            return /WebKit\/(\S+)/.exec(a);
        }
        if (goog.userAgent.OPERA) {
            return /(?:Version)[ \/]?(\S+)/.exec(a);
        }
    };
    goog.userAgent.getDocumentMode_ = function () {
        var a = goog.global.document;
        return a ? a.documentMode : void 0;
    };
    goog.userAgent.VERSION = goog.userAgent.determineVersion_();
    goog.userAgent.compare = function (a, b) {
        return goog.string.compareVersions(a, b);
    };
    goog.userAgent.isVersionOrHigherCache_ = {};
    goog.userAgent.isVersionOrHigher = function (a) {
        return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function () {
            return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a);
        });
    };
    goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
    goog.userAgent.isDocumentModeOrHigher = function (a) {
        return Number(goog.userAgent.DOCUMENT_MODE) >= a;
    };
    goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
    goog.userAgent.DOCUMENT_MODE = function () {
        if (goog.global.document && goog.userAgent.IE) {
            return goog.userAgent.getDocumentMode_();
        }
    }();
    goog.userAgent.product = {};
    goog.userAgent.product.ASSUME_FIREFOX = !1;
    goog.userAgent.product.ASSUME_IPHONE = !1;
    goog.userAgent.product.ASSUME_IPAD = !1;
    goog.userAgent.product.ASSUME_ANDROID = !1;
    goog.userAgent.product.ASSUME_CHROME = !1;
    goog.userAgent.product.ASSUME_SAFARI = !1;
    goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
    goog.userAgent.product.OPERA = goog.userAgent.OPERA;
    goog.userAgent.product.IE = goog.userAgent.IE;
    goog.userAgent.product.EDGE = goog.userAgent.EDGE;
    goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
    goog.userAgent.product.isIphoneOrIpod_ = function () {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
    };
    goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
    goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
    goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
    goog.userAgent.product.isSafariDesktop_ = function () {
        return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
    };
    goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
    goog.crypt.base64 = {};
    goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "+/=";
    goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "-_.";
    goog.crypt.base64.Alphabet = { DEFAULT: 0, NO_PADDING: 1, WEBSAFE: 2, WEBSAFE_DOT_PADDING: 3, WEBSAFE_NO_PADDING: 4, };
    goog.crypt.base64.paddingChars_ = "=.";
    goog.crypt.base64.isPadding_ = function (a) {
        return goog.string.contains(goog.crypt.base64.paddingChars_, a);
    };
    goog.crypt.base64.byteToCharMaps_ = {};
    goog.crypt.base64.charToByteMap_ = null;
    goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
    goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
    goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
    goog.crypt.base64.encodeByteArray = function (a, b) {
        goog.asserts.assert(goog.isArrayLike(a), "encodeByteArray takes an array as a parameter");
        void 0 === b && (b = goog.crypt.base64.Alphabet.DEFAULT);
        goog.crypt.base64.init_();
        b = goog.crypt.base64.byteToCharMaps_[b];
        for (var c = [], d = 0; d < a.length; d += 3) {
            var e = a[d], f = d + 1 < a.length, g = f ? a[d + 1] : 0, h = d + 2 < a.length, k = h ? a[d + 2] : 0, l = e >> 2;
            e = (e & 3) << 4 | g >> 4;
            g = (g & 15) << 2 | k >> 6;
            k &= 63;
            h || (k = 64, f || (g = 64));
            c.push(b[l], b[e], b[g] || "", b[k] || "");
        }
        return c.join("");
    };
    goog.crypt.base64.encodeString = function (a, b) {
        return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b ? goog.global.btoa(a) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a), b);
    };
    goog.crypt.base64.decodeString = function (a, b) {
        if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b) {
            return goog.global.atob(a);
        }
        var c = "";
        goog.crypt.base64.decodeStringInternal_(a, function (a) {
            c += String.fromCharCode(a);
        });
        return c;
    };
    goog.crypt.base64.decodeStringToByteArray = function (a, b) {
        var c = [];
        goog.crypt.base64.decodeStringInternal_(a, function (a) {
            c.push(a);
        });
        return c;
    };
    goog.crypt.base64.decodeStringToUint8Array = function (a) {
        goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
        var b = a.length, c = 3 * b / 4;
        c % 3 ? c = Math.floor(c) : goog.crypt.base64.isPadding_(a[b - 1]) && (c = goog.crypt.base64.isPadding_(a[b - 2]) ? c - 2 : c - 1);
        var d = new Uint8Array(c), e = 0;
        goog.crypt.base64.decodeStringInternal_(a, function (a) {
            d[e++] = a;
        });
        return d.subarray(0, e);
    };
    goog.crypt.base64.decodeStringInternal_ = function (a, b) {
        function c(b) {
            for (; d < a.length;) {
                var c = a.charAt(d++), e = goog.crypt.base64.charToByteMap_[c];
                if (null != e) {
                    return e;
                }
                if (!goog.string.isEmptyOrWhitespace(c)) {
                    throw Error("Unknown base64 encoding at char: " + c);
                }
            }
            return b;
        }
        goog.crypt.base64.init_();
        for (var d = 0;;) {
            var e = c(-1), f = c(0), g = c(64), h = c(64);
            if (64 === h && -1 === e) {
                break;
            }
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
        }
    };
    goog.crypt.base64.init_ = function () {
        if (!goog.crypt.base64.charToByteMap_) {
            goog.crypt.base64.charToByteMap_ = {};
            for (var a = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""), b = ["+/=", "+/", "-_=", "-_.", "-_",], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                goog.crypt.base64.byteToCharMaps_[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e], g = goog.crypt.base64.charToByteMap_[f];
                    void 0 === g ? goog.crypt.base64.charToByteMap_[f] = e : goog.asserts.assert(g === e);
                }
            }
        }
    };
    var jspb = { BinaryConstants: {}, ConstBinaryMessage: function () {
        }, BinaryMessage: function () {
        } };
    jspb.BinaryConstants.FieldType = { INVALID: -1, DOUBLE: 1, FLOAT: 2, INT64: 3, UINT64: 4, INT32: 5, FIXED64: 6, FIXED32: 7, BOOL: 8, STRING: 9, GROUP: 10, MESSAGE: 11, BYTES: 12, UINT32: 13, ENUM: 14, SFIXED32: 15, SFIXED64: 16, SINT32: 17, SINT64: 18, FHASH64: 30, VHASH64: 31 };
    jspb.BinaryConstants.WireType = { INVALID: -1, VARINT: 0, FIXED64: 1, DELIMITED: 2, START_GROUP: 3, END_GROUP: 4, FIXED32: 5 };
    jspb.BinaryConstants.FieldTypeToWireType = function (a) {
        var b = jspb.BinaryConstants.FieldType, c = jspb.BinaryConstants.WireType;
        switch (a) {
            case b.INT32:
            case b.INT64:
            case b.UINT32:
            case b.UINT64:
            case b.SINT32:
            case b.SINT64:
            case b.BOOL:
            case b.ENUM:
            case b.VHASH64:
                return c.VARINT;
            case b.DOUBLE:
            case b.FIXED64:
            case b.SFIXED64:
            case b.FHASH64:
                return c.FIXED64;
            case b.STRING:
            case b.MESSAGE:
            case b.BYTES:
                return c.DELIMITED;
            case b.FLOAT:
            case b.FIXED32:
            case b.SFIXED32:
                return c.FIXED32;
            default:
                return c.INVALID;
        }
    };
    jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
    jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45;
    jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38;
    jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e+38;
    jspb.BinaryConstants.FLOAT64_EPS = 5e-324;
    jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308;
    jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e+308;
    jspb.BinaryConstants.TWO_TO_20 = 1048576;
    jspb.BinaryConstants.TWO_TO_23 = 8388608;
    jspb.BinaryConstants.TWO_TO_31 = 2147483648;
    jspb.BinaryConstants.TWO_TO_32 = 4294967296;
    jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
    jspb.BinaryConstants.TWO_TO_63 = 9223372036854775808;
    jspb.BinaryConstants.TWO_TO_64 = 18446744073709551616;
    jspb.BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
    jspb.utils = {};
    jspb.utils.split64Low = 0;
    jspb.utils.split64High = 0;
    jspb.utils.splitUint64 = function (a) {
        var b = a >>> 0;
        a = Math.floor((a - b) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
        jspb.utils.split64Low = b;
        jspb.utils.split64High = a;
    };
    jspb.utils.splitInt64 = function (a) {
        var b = 0 > a;
        a = Math.abs(a);
        var c = a >>> 0;
        a = Math.floor((a - c) / jspb.BinaryConstants.TWO_TO_32);
        a >>>= 0;
        b && (a = ~a >>> 0, c = (~c >>> 0) + 1, 4294967295 < c && (c = 0, a++, 4294967295 < a && (a = 0)));
        jspb.utils.split64Low = c;
        jspb.utils.split64High = a;
    };
    jspb.utils.splitZigzag64 = function (a) {
        var b = 0 > a;
        a = 2 * Math.abs(a);
        jspb.utils.splitUint64(a);
        a = jspb.utils.split64Low;
        var c = jspb.utils.split64High;
        b && (0 == a ? 0 == c ? c = a = 4294967295 : (c--, a = 4294967295) : a--);
        jspb.utils.split64Low = a;
        jspb.utils.split64High = c;
    };
    jspb.utils.splitFloat32 = function (a) {
        var b = 0 > a ? 1 : 0;
        a = b ? -a : a;
        if (0 === a) {
            0 < 1 / a ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648);
        }
        else {
            if (isNaN(a)) {
                jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647;
            }
            else {
                if (a > jspb.BinaryConstants.FLOAT32_MAX) {
                    jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | 2139095040) >>> 0;
                }
                else {
                    if (a < jspb.BinaryConstants.FLOAT32_MIN) {
                        a = Math.round(a / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | a) >>> 0;
                    }
                    else {
                        var c = Math.floor(Math.log(a) / Math.LN2);
                        a *= Math.pow(2, -c);
                        a = Math.round(a * jspb.BinaryConstants.TWO_TO_23) & 8388607;
                        jspb.utils.split64High = 0;
                        jspb.utils.split64Low = (b << 31 | c + 127 << 23 | a) >>> 0;
                    }
                }
            }
        }
    };
    jspb.utils.splitFloat64 = function (a) {
        var b = 0 > a ? 1 : 0;
        a = b ? -a : a;
        if (0 === a) {
            jspb.utils.split64High = 0 < 1 / a ? 0 : 2147483648, jspb.utils.split64Low = 0;
        }
        else {
            if (isNaN(a)) {
                jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295;
            }
            else {
                if (a > jspb.BinaryConstants.FLOAT64_MAX) {
                    jspb.utils.split64High = (b << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0;
                }
                else {
                    if (a < jspb.BinaryConstants.FLOAT64_MIN) {
                        var c = a / Math.pow(2, -1074);
                        a = c / jspb.BinaryConstants.TWO_TO_32;
                        jspb.utils.split64High = (b << 31 | a) >>> 0;
                        jspb.utils.split64Low = c >>> 0;
                    }
                    else {
                        c = a;
                        var d = 0;
                        if (2 <= c) {
                            for (; 2 <= c && 1023 > d;) {
                                d++, c /= 2;
                            }
                        }
                        else {
                            for (; 1 > c && -1022 < d;) {
                                c *= 2, d--;
                            }
                        }
                        c = a * Math.pow(2, -d);
                        a = c * jspb.BinaryConstants.TWO_TO_20 & 1048575;
                        c = c * jspb.BinaryConstants.TWO_TO_52 >>> 0;
                        jspb.utils.split64High = (b << 31 | d + 1023 << 20 | a) >>> 0;
                        jspb.utils.split64Low = c;
                    }
                }
            }
        }
    };
    jspb.utils.splitHash64 = function (a) {
        var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = a.charCodeAt(4), g = a.charCodeAt(5), h = a.charCodeAt(6);
        a = a.charCodeAt(7);
        jspb.utils.split64Low = b + (c << 8) + (d << 16) + (e << 24) >>> 0;
        jspb.utils.split64High = f + (g << 8) + (h << 16) + (a << 24) >>> 0;
    };
    jspb.utils.joinUint64 = function (a, b) {
        return b * jspb.BinaryConstants.TWO_TO_32 + (a >>> 0);
    };
    jspb.utils.joinInt64 = function (a, b) {
        var c = b & 2147483648;
        c && (a = ~a + 1 >>> 0, b = ~b >>> 0, 0 == a && (b = b + 1 >>> 0));
        a = jspb.utils.joinUint64(a, b);
        return c ? -a : a;
    };
    jspb.utils.toZigzag64 = function (a, b, c) {
        var d = b >> 31;
        return c(a << 1 ^ d, (b << 1 | a >>> 31) ^ d);
    };
    jspb.utils.joinZigzag64 = function (a, b) {
        return jspb.utils.fromZigzag64(a, b, jspb.utils.joinInt64);
    };
    jspb.utils.fromZigzag64 = function (a, b, c) {
        var d = -(a & 1);
        return c((a >>> 1 | b << 31) ^ d, b >>> 1 ^ d);
    };
    jspb.utils.joinFloat32 = function (a, b) {
        b = 2 * (a >> 31) + 1;
        var c = a >>> 23 & 255;
        a &= 8388607;
        return 255 == c ? a ? NaN : Infinity * b : 0 == c ? b * Math.pow(2, -149) * a : b * Math.pow(2, c - 150) * (a + Math.pow(2, 23));
    };
    jspb.utils.joinFloat64 = function (a, b) {
        var c = 2 * (b >> 31) + 1, d = b >>> 20 & 2047;
        a = jspb.BinaryConstants.TWO_TO_32 * (b & 1048575) + a;
        return 2047 == d ? a ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -1074) * a : c * Math.pow(2, d - 1075) * (a + jspb.BinaryConstants.TWO_TO_52);
    };
    jspb.utils.joinHash64 = function (a, b) {
        return String.fromCharCode(a >>> 0 & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255, b >>> 0 & 255, b >>> 8 & 255, b >>> 16 & 255, b >>> 24 & 255);
    };
    jspb.utils.DIGITS = "0123456789abcdef".split("");
    jspb.utils.ZERO_CHAR_CODE_ = 48;
    jspb.utils.A_CHAR_CODE_ = 97;
    jspb.utils.joinUnsignedDecimalString = function (a, b) {
        function c(a, b) {
            a = a ? String(a) : "";
            return b ? "0000000".slice(a.length) + a : a;
        }
        if (2097151 >= b) {
            return "" + (jspb.BinaryConstants.TWO_TO_32 * b + a);
        }
        var d = (a >>> 24 | b << 8) >>> 0 & 16777215;
        b = b >> 16 & 65535;
        a = (a & 16777215) + 6777216 * d + 6710656 * b;
        d += 8147497 * b;
        b *= 2;
        10000000 <= a && (d += Math.floor(a / 10000000), a %= 10000000);
        10000000 <= d && (b += Math.floor(d / 10000000), d %= 10000000);
        return c(b, 0) + c(d, b) + c(a, 1);
    };
    jspb.utils.joinSignedDecimalString = function (a, b) {
        var c = b & 2147483648;
        c && (a = ~a + 1 >>> 0, b = ~b + (0 == a ? 1 : 0) >>> 0);
        a = jspb.utils.joinUnsignedDecimalString(a, b);
        return c ? "-" + a : a;
    };
    jspb.utils.hash64ToDecimalString = function (a, b) {
        jspb.utils.splitHash64(a);
        a = jspb.utils.split64Low;
        var c = jspb.utils.split64High;
        return b ? jspb.utils.joinSignedDecimalString(a, c) : jspb.utils.joinUnsignedDecimalString(a, c);
    };
    jspb.utils.hash64ArrayToDecimalStrings = function (a, b) {
        for (var c = Array(a.length), d = 0; d < a.length; d++) {
            c[d] = jspb.utils.hash64ToDecimalString(a[d], b);
        }
        return c;
    };
    jspb.utils.decimalStringToHash64 = function (a) {
        function b(a, b) {
            for (var c = 0; 8 > c && (1 !== a || 0 < b); c++) {
                b = a * e[c] + b, e[c] = b & 255, b >>>= 8;
            }
        }
        function c() {
            for (var a = 0; 8 > a; a++) {
                e[a] = ~e[a] & 255;
            }
        }
        goog.asserts.assert(0 < a.length);
        var d = !1;
        "-" === a[0] && (d = !0, a = a.slice(1));
        for (var e = [0, 0, 0, 0, 0, 0, 0, 0], f = 0; f < a.length; f++) {
            b(10, a.charCodeAt(f) - jspb.utils.ZERO_CHAR_CODE_);
        }
        d && (c(), b(1, 1));
        return goog.crypt.byteArrayToString(e);
    };
    jspb.utils.splitDecimalString = function (a) {
        jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
    };
    jspb.utils.toHexDigit_ = function (a) {
        return String.fromCharCode(10 > a ? jspb.utils.ZERO_CHAR_CODE_ + a : jspb.utils.A_CHAR_CODE_ - 10 + a);
    };
    jspb.utils.fromHexCharCode_ = function (a) {
        return a >= jspb.utils.A_CHAR_CODE_ ? a - jspb.utils.A_CHAR_CODE_ + 10 : a - jspb.utils.ZERO_CHAR_CODE_;
    };
    jspb.utils.hash64ToHexString = function (a) {
        var b = Array(18);
        b[0] = "0";
        b[1] = "x";
        for (var c = 0; 8 > c; c++) {
            var d = a.charCodeAt(7 - c);
            b[2 * c + 2] = jspb.utils.toHexDigit_(d >> 4);
            b[2 * c + 3] = jspb.utils.toHexDigit_(d & 15);
        }
        return b.join("");
    };
    jspb.utils.hexStringToHash64 = function (a) {
        a = a.toLowerCase();
        goog.asserts.assert(18 == a.length);
        goog.asserts.assert("0" == a[0]);
        goog.asserts.assert("x" == a[1]);
        for (var b = "", c = 0; 8 > c; c++) {
            var d = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 2)), e = jspb.utils.fromHexCharCode_(a.charCodeAt(2 * c + 3));
            b = String.fromCharCode(16 * d + e) + b;
        }
        return b;
    };
    jspb.utils.hash64ToNumber = function (a, b) {
        jspb.utils.splitHash64(a);
        a = jspb.utils.split64Low;
        var c = jspb.utils.split64High;
        return b ? jspb.utils.joinInt64(a, c) : jspb.utils.joinUint64(a, c);
    };
    jspb.utils.numberToHash64 = function (a) {
        jspb.utils.splitInt64(a);
        return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.utils.countVarints = function (a, b, c) {
        for (var d = 0, e = b; e < c; e++) {
            d += a[e] >> 7;
        }
        return c - b - d;
    };
    jspb.utils.countVarintFields = function (a, b, c, d) {
        var e = 0;
        d = 8 * d + jspb.BinaryConstants.WireType.VARINT;
        if (128 > d) {
            for (; b < c && a[b++] == d;) {
                for (e++;;) {
                    var f = a[b++];
                    if (0 == (f & 128)) {
                        break;
                    }
                }
            }
        }
        else {
            for (; b < c;) {
                for (f = d; 128 < f;) {
                    if (a[b] != (f & 127 | 128)) {
                        return e;
                    }
                    b++;
                    f >>= 7;
                }
                if (a[b++] != f) {
                    break;
                }
                for (e++; f = a[b++], 0 != (f & 128);) {
                }
            }
        }
        return e;
    };
    jspb.utils.countFixedFields_ = function (a, b, c, d, e) {
        var f = 0;
        if (128 > d) {
            for (; b < c && a[b++] == d;) {
                f++, b += e;
            }
        }
        else {
            for (; b < c;) {
                for (var g = d; 128 < g;) {
                    if (a[b++] != (g & 127 | 128)) {
                        return f;
                    }
                    g >>= 7;
                }
                if (a[b++] != g) {
                    break;
                }
                f++;
                b += e;
            }
        }
        return f;
    };
    jspb.utils.countFixed32Fields = function (a, b, c, d) {
        return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED32, 4);
    };
    jspb.utils.countFixed64Fields = function (a, b, c, d) {
        return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED64, 8);
    };
    jspb.utils.countDelimitedFields = function (a, b, c, d) {
        var e = 0;
        for (d = 8 * d + jspb.BinaryConstants.WireType.DELIMITED; b < c;) {
            for (var f = d; 128 < f;) {
                if (a[b++] != (f & 127 | 128)) {
                    return e;
                }
                f >>= 7;
            }
            if (a[b++] != f) {
                break;
            }
            e++;
            for (var g = 0, h = 1; f = a[b++], g += (f & 127) * h, h *= 128, 0 != (f & 128);) {
            }
            b += g;
        }
        return e;
    };
    jspb.utils.debugBytesToTextFormat = function (a) {
        var b = '"';
        if (a) {
            a = jspb.utils.byteSourceToUint8Array(a);
            for (var c = 0; c < a.length; c++) {
                b += "\\x", 16 > a[c] && (b += "0"), b += a[c].toString(16);
            }
        }
        return b + '"';
    };
    jspb.utils.debugScalarToTextFormat = function (a) {
        return "string" === typeof a ? goog.string.quote(a) : a.toString();
    };
    jspb.utils.stringToByteArray = function (a) {
        for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            if (255 < d) {
                throw Error("Conversion error: string contains codepoint outside of byte range");
            }
            b[c] = d;
        }
        return b;
    };
    jspb.utils.byteSourceToUint8Array = function (a) {
        if (a.constructor === Uint8Array) {
            return a;
        }
        if (a.constructor === ArrayBuffer) {
            return new Uint8Array(a);
        }
        if ("undefined" != typeof Buffer && a.constructor === Buffer) {
            return new Uint8Array(a);
        }
        if (a.constructor === Array) {
            return new Uint8Array(a);
        }
        if (a.constructor === String) {
            return goog.crypt.base64.decodeStringToUint8Array(a);
        }
        goog.asserts.fail("Type not convertible to Uint8Array.");
        return new Uint8Array(0);
    };
    jspb.BinaryDecoder = function (a, b, c) {
        this.bytes_ = null;
        this.cursor_ = this.end_ = this.start_ = 0;
        this.error_ = !1;
        a && this.setBlock(a, b, c);
    };
    jspb.BinaryDecoder.instanceCache_ = [];
    jspb.BinaryDecoder.alloc = function (a, b, c) {
        if (jspb.BinaryDecoder.instanceCache_.length) {
            var d = jspb.BinaryDecoder.instanceCache_.pop();
            a && d.setBlock(a, b, c);
            return d;
        }
        return new jspb.BinaryDecoder(a, b, c);
    };
    jspb.BinaryDecoder.prototype.free = function () {
        this.clear();
        100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
    };
    jspb.BinaryDecoder.prototype.clone = function () {
        return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
    };
    jspb.BinaryDecoder.prototype.clear = function () {
        this.bytes_ = null;
        this.cursor_ = this.end_ = this.start_ = 0;
        this.error_ = !1;
    };
    jspb.BinaryDecoder.prototype.getBuffer = function () {
        return this.bytes_;
    };
    jspb.BinaryDecoder.prototype.setBlock = function (a, b, c) {
        this.bytes_ = jspb.utils.byteSourceToUint8Array(a);
        this.start_ = void 0 !== b ? b : 0;
        this.end_ = void 0 !== c ? this.start_ + c : this.bytes_.length;
        this.cursor_ = this.start_;
    };
    jspb.BinaryDecoder.prototype.getEnd = function () {
        return this.end_;
    };
    jspb.BinaryDecoder.prototype.setEnd = function (a) {
        this.end_ = a;
    };
    jspb.BinaryDecoder.prototype.reset = function () {
        this.cursor_ = this.start_;
    };
    jspb.BinaryDecoder.prototype.getCursor = function () {
        return this.cursor_;
    };
    jspb.BinaryDecoder.prototype.setCursor = function (a) {
        this.cursor_ = a;
    };
    jspb.BinaryDecoder.prototype.advance = function (a) {
        this.cursor_ += a;
        goog.asserts.assert(this.cursor_ <= this.end_);
    };
    jspb.BinaryDecoder.prototype.atEnd = function () {
        return this.cursor_ == this.end_;
    };
    jspb.BinaryDecoder.prototype.pastEnd = function () {
        return this.cursor_ > this.end_;
    };
    jspb.BinaryDecoder.prototype.getError = function () {
        return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
    };
    jspb.BinaryDecoder.prototype.readSplitVarint64 = function (a) {
        for (var b = 128, c = 0, d = 0, e = 0; 4 > e && 128 <= b; e++) {
            b = this.bytes_[this.cursor_++], c |= (b & 127) << 7 * e;
        }
        128 <= b && (b = this.bytes_[this.cursor_++], c |= (b & 127) << 28, d |= (b & 127) >> 4);
        if (128 <= b) {
            for (e = 0; 5 > e && 128 <= b; e++) {
                b = this.bytes_[this.cursor_++], d |= (b & 127) << 7 * e + 3;
            }
        }
        if (128 > b) {
            return a(c >>> 0, d >>> 0);
        }
        goog.asserts.fail("Failed to read varint, encoding is invalid.");
        this.error_ = !0;
    };
    jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function (a) {
        return this.readSplitVarint64(function (b, c) {
            return jspb.utils.fromZigzag64(b, c, a);
        });
    };
    jspb.BinaryDecoder.prototype.readSplitFixed64 = function (a) {
        var b = this.bytes_, c = this.cursor_;
        this.cursor_ += 8;
        for (var d = 0, e = 0, f = c + 7; f >= c; f--) {
            d = d << 8 | b[f], e = e << 8 | b[f + 4];
        }
        return a(d, e);
    };
    jspb.BinaryDecoder.prototype.skipVarint = function () {
        for (; this.bytes_[this.cursor_] & 128;) {
            this.cursor_++;
        }
        this.cursor_++;
    };
    jspb.BinaryDecoder.prototype.unskipVarint = function (a) {
        for (; 128 < a;) {
            this.cursor_--, a >>>= 7;
        }
        this.cursor_--;
    };
    jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
        var a = this.bytes_;
        var b = a[this.cursor_ + 0];
        var c = b & 127;
        if (128 > b) {
            return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), c;
        }
        b = a[this.cursor_ + 1];
        c |= (b & 127) << 7;
        if (128 > b) {
            return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), c;
        }
        b = a[this.cursor_ + 2];
        c |= (b & 127) << 14;
        if (128 > b) {
            return this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), c;
        }
        b = a[this.cursor_ + 3];
        c |= (b & 127) << 21;
        if (128 > b) {
            return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), c;
        }
        b = a[this.cursor_ + 4];
        c |= (b & 15) << 28;
        if (128 > b) {
            return this.cursor_ += 5, goog.asserts.assert(this.cursor_ <= this.end_), c >>> 0;
        }
        this.cursor_ += 5;
        128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && 128 <= a[this.cursor_++] && goog.asserts.assert(!1);
        goog.asserts.assert(this.cursor_ <= this.end_);
        return c;
    };
    jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
    jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function () {
        return this.readUnsignedVarint32().toString();
    };
    jspb.BinaryDecoder.prototype.readSignedVarint32String = function () {
        return this.readSignedVarint32().toString();
    };
    jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
        var a = this.readUnsignedVarint32();
        return a >>> 1 ^ -(a & 1);
    };
    jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
        return this.readSplitVarint64(jspb.utils.joinUint64);
    };
    jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function () {
        return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString);
    };
    jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
        return this.readSplitVarint64(jspb.utils.joinInt64);
    };
    jspb.BinaryDecoder.prototype.readSignedVarint64String = function () {
        return this.readSplitVarint64(jspb.utils.joinSignedDecimalString);
    };
    jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
        return this.readSplitVarint64(jspb.utils.joinZigzag64);
    };
    jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function () {
        return this.readSplitZigzagVarint64(jspb.utils.joinHash64);
    };
    jspb.BinaryDecoder.prototype.readZigzagVarint64String = function () {
        return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString);
    };
    jspb.BinaryDecoder.prototype.readUint8 = function () {
        var a = this.bytes_[this.cursor_ + 0];
        this.cursor_ += 1;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return a;
    };
    jspb.BinaryDecoder.prototype.readUint16 = function () {
        var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
        this.cursor_ += 2;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return a << 0 | b << 8;
    };
    jspb.BinaryDecoder.prototype.readUint32 = function () {
        var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
        this.cursor_ += 4;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return (a << 0 | b << 8 | c << 16 | d << 24) >>> 0;
    };
    jspb.BinaryDecoder.prototype.readUint64 = function () {
        var a = this.readUint32(), b = this.readUint32();
        return jspb.utils.joinUint64(a, b);
    };
    jspb.BinaryDecoder.prototype.readUint64String = function () {
        var a = this.readUint32(), b = this.readUint32();
        return jspb.utils.joinUnsignedDecimalString(a, b);
    };
    jspb.BinaryDecoder.prototype.readInt8 = function () {
        var a = this.bytes_[this.cursor_ + 0];
        this.cursor_ += 1;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return a << 24 >> 24;
    };
    jspb.BinaryDecoder.prototype.readInt16 = function () {
        var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
        this.cursor_ += 2;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return (a << 0 | b << 8) << 16 >> 16;
    };
    jspb.BinaryDecoder.prototype.readInt32 = function () {
        var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
        this.cursor_ += 4;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return a << 0 | b << 8 | c << 16 | d << 24;
    };
    jspb.BinaryDecoder.prototype.readInt64 = function () {
        var a = this.readUint32(), b = this.readUint32();
        return jspb.utils.joinInt64(a, b);
    };
    jspb.BinaryDecoder.prototype.readInt64String = function () {
        var a = this.readUint32(), b = this.readUint32();
        return jspb.utils.joinSignedDecimalString(a, b);
    };
    jspb.BinaryDecoder.prototype.readFloat = function () {
        var a = this.readUint32();
        return jspb.utils.joinFloat32(a, 0);
    };
    jspb.BinaryDecoder.prototype.readDouble = function () {
        var a = this.readUint32(), b = this.readUint32();
        return jspb.utils.joinFloat64(a, b);
    };
    jspb.BinaryDecoder.prototype.readBool = function () {
        return !!this.bytes_[this.cursor_++];
    };
    jspb.BinaryDecoder.prototype.readEnum = function () {
        return this.readSignedVarint32();
    };
    jspb.BinaryDecoder.prototype.readString = function (a) {
        var b = this.bytes_, c = this.cursor_;
        a = c + a;
        for (var d = [], e = ""; c < a;) {
            var f = b[c++];
            if (128 > f) {
                d.push(f);
            }
            else {
                if (192 > f) {
                    continue;
                }
                else {
                    if (224 > f) {
                        var g = b[c++];
                        d.push((f & 31) << 6 | g & 63);
                    }
                    else {
                        if (240 > f) {
                            g = b[c++];
                            var h = b[c++];
                            d.push((f & 15) << 12 | (g & 63) << 6 | h & 63);
                        }
                        else {
                            if (248 > f) {
                                g = b[c++];
                                h = b[c++];
                                var k = b[c++];
                                f = (f & 7) << 18 | (g & 63) << 12 | (h & 63) << 6 | k & 63;
                                f -= 65536;
                                d.push((f >> 10 & 1023) + 55296, (f & 1023) + 56320);
                            }
                        }
                    }
                }
            }
            8192 <= d.length && (e += String.fromCharCode.apply(null, d), d.length = 0);
        }
        e += goog.crypt.byteArrayToString(d);
        this.cursor_ = c;
        return e;
    };
    jspb.BinaryDecoder.prototype.readStringWithLength = function () {
        var a = this.readUnsignedVarint32();
        return this.readString(a);
    };
    jspb.BinaryDecoder.prototype.readBytes = function (a) {
        if (0 > a || this.cursor_ + a > this.bytes_.length) {
            return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), new Uint8Array(0);
        }
        var b = this.bytes_.subarray(this.cursor_, this.cursor_ + a);
        this.cursor_ += a;
        goog.asserts.assert(this.cursor_ <= this.end_);
        return b;
    };
    jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
        return this.readSplitVarint64(jspb.utils.joinHash64);
    };
    jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
        var a = this.bytes_, b = this.cursor_, c = a[b + 0], d = a[b + 1], e = a[b + 2], f = a[b + 3], g = a[b + 4], h = a[b + 5], k = a[b + 6];
        a = a[b + 7];
        this.cursor_ += 8;
        return String.fromCharCode(c, d, e, f, g, h, k, a);
    };
    jspb.BinaryReader = function (a, b, c) {
        this.decoder_ = jspb.BinaryDecoder.alloc(a, b, c);
        this.fieldCursor_ = this.decoder_.getCursor();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
        this.error_ = !1;
        this.readCallbacks_ = null;
    };
    jspb.BinaryReader.instanceCache_ = [];
    jspb.BinaryReader.alloc = function (a, b, c) {
        if (jspb.BinaryReader.instanceCache_.length) {
            var d = jspb.BinaryReader.instanceCache_.pop();
            a && d.decoder_.setBlock(a, b, c);
            return d;
        }
        return new jspb.BinaryReader(a, b, c);
    };
    jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
    jspb.BinaryReader.prototype.free = function () {
        this.decoder_.clear();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
        this.error_ = !1;
        this.readCallbacks_ = null;
        100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
    };
    jspb.BinaryReader.prototype.getFieldCursor = function () {
        return this.fieldCursor_;
    };
    jspb.BinaryReader.prototype.getCursor = function () {
        return this.decoder_.getCursor();
    };
    jspb.BinaryReader.prototype.getBuffer = function () {
        return this.decoder_.getBuffer();
    };
    jspb.BinaryReader.prototype.getFieldNumber = function () {
        return this.nextField_;
    };
    jspb.BinaryReader.prototype.getWireType = function () {
        return this.nextWireType_;
    };
    jspb.BinaryReader.prototype.isEndGroup = function () {
        return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
    };
    jspb.BinaryReader.prototype.getError = function () {
        return this.error_ || this.decoder_.getError();
    };
    jspb.BinaryReader.prototype.setBlock = function (a, b, c) {
        this.decoder_.setBlock(a, b, c);
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    };
    jspb.BinaryReader.prototype.reset = function () {
        this.decoder_.reset();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    };
    jspb.BinaryReader.prototype.advance = function (a) {
        this.decoder_.advance(a);
    };
    jspb.BinaryReader.prototype.nextField = function () {
        if (this.decoder_.atEnd()) {
            return !1;
        }
        if (this.getError()) {
            return goog.asserts.fail("Decoder hit an error"), !1;
        }
        this.fieldCursor_ = this.decoder_.getCursor();
        var a = this.decoder_.readUnsignedVarint32(), b = a >>> 3;
        a &= 7;
        if (a != jspb.BinaryConstants.WireType.VARINT && a != jspb.BinaryConstants.WireType.FIXED32 && a != jspb.BinaryConstants.WireType.FIXED64 && a != jspb.BinaryConstants.WireType.DELIMITED && a != jspb.BinaryConstants.WireType.START_GROUP && a != jspb.BinaryConstants.WireType.END_GROUP) {
            return goog.asserts.fail("Invalid wire type: %s (at position %s)", a, this.fieldCursor_), this.error_ = !0, !1;
        }
        this.nextField_ = b;
        this.nextWireType_ = a;
        return !0;
    };
    jspb.BinaryReader.prototype.unskipHeader = function () {
        this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
    };
    jspb.BinaryReader.prototype.skipMatchingFields = function () {
        var a = this.nextField_;
        for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a;) {
            this.skipField();
        }
        this.decoder_.atEnd() || this.unskipHeader();
    };
    jspb.BinaryReader.prototype.skipVarintField = function () {
        this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
    };
    jspb.BinaryReader.prototype.skipDelimitedField = function () {
        if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) {
            goog.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField();
        }
        else {
            var a = this.decoder_.readUnsignedVarint32();
            this.decoder_.advance(a);
        }
    };
    jspb.BinaryReader.prototype.skipFixed32Field = function () {
        this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
    };
    jspb.BinaryReader.prototype.skipFixed64Field = function () {
        this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
    };
    jspb.BinaryReader.prototype.skipGroup = function () {
        var a = this.nextField_;
        do {
            if (!this.nextField()) {
                goog.asserts.fail("Unmatched start-group tag: stream EOF");
                this.error_ = !0;
                break;
            }
            if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
                this.nextField_ != a && (goog.asserts.fail("Unmatched end-group tag"), this.error_ = !0);
                break;
            }
            this.skipField();
        } while (1);
    };
    jspb.BinaryReader.prototype.skipField = function () {
        switch (this.nextWireType_) {
            case jspb.BinaryConstants.WireType.VARINT:
                this.skipVarintField();
                break;
            case jspb.BinaryConstants.WireType.FIXED64:
                this.skipFixed64Field();
                break;
            case jspb.BinaryConstants.WireType.DELIMITED:
                this.skipDelimitedField();
                break;
            case jspb.BinaryConstants.WireType.FIXED32:
                this.skipFixed32Field();
                break;
            case jspb.BinaryConstants.WireType.START_GROUP:
                this.skipGroup();
                break;
            default:
                goog.asserts.fail("Invalid wire encoding for field.");
        }
    };
    jspb.BinaryReader.prototype.registerReadCallback = function (a, b) {
        null === this.readCallbacks_ && (this.readCallbacks_ = {});
        goog.asserts.assert(!this.readCallbacks_[a]);
        this.readCallbacks_[a] = b;
    };
    jspb.BinaryReader.prototype.runReadCallback = function (a) {
        goog.asserts.assert(null !== this.readCallbacks_);
        a = this.readCallbacks_[a];
        goog.asserts.assert(a);
        return a(this);
    };
    jspb.BinaryReader.prototype.readAny = function (a) {
        this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a);
        var b = jspb.BinaryConstants.FieldType;
        switch (a) {
            case b.DOUBLE:
                return this.readDouble();
            case b.FLOAT:
                return this.readFloat();
            case b.INT64:
                return this.readInt64();
            case b.UINT64:
                return this.readUint64();
            case b.INT32:
                return this.readInt32();
            case b.FIXED64:
                return this.readFixed64();
            case b.FIXED32:
                return this.readFixed32();
            case b.BOOL:
                return this.readBool();
            case b.STRING:
                return this.readString();
            case b.GROUP:
                goog.asserts.fail("Group field type not supported in readAny()");
            case b.MESSAGE:
                goog.asserts.fail("Message field type not supported in readAny()");
            case b.BYTES:
                return this.readBytes();
            case b.UINT32:
                return this.readUint32();
            case b.ENUM:
                return this.readEnum();
            case b.SFIXED32:
                return this.readSfixed32();
            case b.SFIXED64:
                return this.readSfixed64();
            case b.SINT32:
                return this.readSint32();
            case b.SINT64:
                return this.readSint64();
            case b.FHASH64:
                return this.readFixedHash64();
            case b.VHASH64:
                return this.readVarintHash64();
            default:
                goog.asserts.fail("Invalid field type in readAny()");
        }
        return 0;
    };
    jspb.BinaryReader.prototype.readMessage = function (a, b) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var c = this.decoder_.getEnd(), d = this.decoder_.readUnsignedVarint32();
        d = this.decoder_.getCursor() + d;
        this.decoder_.setEnd(d);
        b(a, this);
        this.decoder_.setCursor(d);
        this.decoder_.setEnd(c);
    };
    jspb.BinaryReader.prototype.readGroup = function (a, b, c) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
        goog.asserts.assert(this.nextField_ == a);
        c(b, this);
        this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (goog.asserts.fail("Group submessage did not end with an END_GROUP tag"), this.error_ = !0);
    };
    jspb.BinaryReader.prototype.getFieldDecoder = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor(), c = b + a;
        a = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b, a);
        this.decoder_.setCursor(c);
        return a;
    };
    jspb.BinaryReader.prototype.readInt32 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32();
    };
    jspb.BinaryReader.prototype.readInt32String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32String();
    };
    jspb.BinaryReader.prototype.readInt64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
    };
    jspb.BinaryReader.prototype.readInt64String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64String();
    };
    jspb.BinaryReader.prototype.readUint32 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32();
    };
    jspb.BinaryReader.prototype.readUint32String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32String();
    };
    jspb.BinaryReader.prototype.readUint64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64();
    };
    jspb.BinaryReader.prototype.readUint64String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64String();
    };
    jspb.BinaryReader.prototype.readSint32 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint32();
    };
    jspb.BinaryReader.prototype.readSint64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64();
    };
    jspb.BinaryReader.prototype.readSint64String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64String();
    };
    jspb.BinaryReader.prototype.readFixed32 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readUint32();
    };
    jspb.BinaryReader.prototype.readFixed64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64();
    };
    jspb.BinaryReader.prototype.readFixed64String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64String();
    };
    jspb.BinaryReader.prototype.readSfixed32 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32();
    };
    jspb.BinaryReader.prototype.readSfixed32String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32().toString();
    };
    jspb.BinaryReader.prototype.readSfixed64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64();
    };
    jspb.BinaryReader.prototype.readSfixed64String = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64String();
    };
    jspb.BinaryReader.prototype.readFloat = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readFloat();
    };
    jspb.BinaryReader.prototype.readDouble = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readDouble();
    };
    jspb.BinaryReader.prototype.readBool = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return !!this.decoder_.readUnsignedVarint32();
    };
    jspb.BinaryReader.prototype.readEnum = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
    };
    jspb.BinaryReader.prototype.readString = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readString(a);
    };
    jspb.BinaryReader.prototype.readBytes = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readBytes(a);
    };
    jspb.BinaryReader.prototype.readVarintHash64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readVarintHash64();
    };
    jspb.BinaryReader.prototype.readSintHash64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarintHash64();
    };
    jspb.BinaryReader.prototype.readSplitVarint64 = function (a) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(a);
    };
    jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function (a) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(function (b, c) {
            return jspb.utils.fromZigzag64(b, c, a);
        });
    };
    jspb.BinaryReader.prototype.readFixedHash64 = function () {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readFixedHash64();
    };
    jspb.BinaryReader.prototype.readSplitFixed64 = function (a) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readSplitFixed64(a);
    };
    jspb.BinaryReader.prototype.readPackedField_ = function (a) {
        goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var b = this.decoder_.readUnsignedVarint32();
        b = this.decoder_.getCursor() + b;
        for (var c = []; this.decoder_.getCursor() < b;) {
            c.push(a.call(this.decoder_));
        }
        return c;
    };
    jspb.BinaryReader.prototype.readPackedInt32 = function () {
        return this.readPackedField_(this.decoder_.readSignedVarint32);
    };
    jspb.BinaryReader.prototype.readPackedInt32String = function () {
        return this.readPackedField_(this.decoder_.readSignedVarint32String);
    };
    jspb.BinaryReader.prototype.readPackedInt64 = function () {
        return this.readPackedField_(this.decoder_.readSignedVarint64);
    };
    jspb.BinaryReader.prototype.readPackedInt64String = function () {
        return this.readPackedField_(this.decoder_.readSignedVarint64String);
    };
    jspb.BinaryReader.prototype.readPackedUint32 = function () {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32);
    };
    jspb.BinaryReader.prototype.readPackedUint32String = function () {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
    };
    jspb.BinaryReader.prototype.readPackedUint64 = function () {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64);
    };
    jspb.BinaryReader.prototype.readPackedUint64String = function () {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
    };
    jspb.BinaryReader.prototype.readPackedSint32 = function () {
        return this.readPackedField_(this.decoder_.readZigzagVarint32);
    };
    jspb.BinaryReader.prototype.readPackedSint64 = function () {
        return this.readPackedField_(this.decoder_.readZigzagVarint64);
    };
    jspb.BinaryReader.prototype.readPackedSint64String = function () {
        return this.readPackedField_(this.decoder_.readZigzagVarint64String);
    };
    jspb.BinaryReader.prototype.readPackedFixed32 = function () {
        return this.readPackedField_(this.decoder_.readUint32);
    };
    jspb.BinaryReader.prototype.readPackedFixed64 = function () {
        return this.readPackedField_(this.decoder_.readUint64);
    };
    jspb.BinaryReader.prototype.readPackedFixed64String = function () {
        return this.readPackedField_(this.decoder_.readUint64String);
    };
    jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
        return this.readPackedField_(this.decoder_.readInt32);
    };
    jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
        return this.readPackedField_(this.decoder_.readInt64);
    };
    jspb.BinaryReader.prototype.readPackedSfixed64String = function () {
        return this.readPackedField_(this.decoder_.readInt64String);
    };
    jspb.BinaryReader.prototype.readPackedFloat = function () {
        return this.readPackedField_(this.decoder_.readFloat);
    };
    jspb.BinaryReader.prototype.readPackedDouble = function () {
        return this.readPackedField_(this.decoder_.readDouble);
    };
    jspb.BinaryReader.prototype.readPackedBool = function () {
        return this.readPackedField_(this.decoder_.readBool);
    };
    jspb.BinaryReader.prototype.readPackedEnum = function () {
        return this.readPackedField_(this.decoder_.readEnum);
    };
    jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
        return this.readPackedField_(this.decoder_.readVarintHash64);
    };
    jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
        return this.readPackedField_(this.decoder_.readFixedHash64);
    };
    jspb.Map = function (a, b) {
        this.arr_ = a;
        this.valueCtor_ = b;
        this.map_ = {};
        this.arrClean = !0;
        0 < this.arr_.length && this.loadFromArray_();
    };
    jspb.Map.prototype.loadFromArray_ = function () {
        for (var a = 0; a < this.arr_.length; a++) {
            var b = this.arr_[a], c = b[0];
            this.map_[c.toString()] = new jspb.Map.Entry_(c, b[1]);
        }
        this.arrClean = !0;
    };
    jspb.Map.prototype.toArray = function () {
        if (this.arrClean) {
            if (this.valueCtor_) {
                var a = this.map_, b;
                for (b in a) {
                    if (Object.prototype.hasOwnProperty.call(a, b)) {
                        var c = a[b].valueWrapper;
                        c && c.toArray();
                    }
                }
            }
        }
        else {
            this.arr_.length = 0;
            a = this.stringKeys_();
            a.sort();
            for (b = 0; b < a.length; b++) {
                var d = this.map_[a[b]];
                (c = d.valueWrapper) && c.toArray();
                this.arr_.push([d.key, d.value]);
            }
            this.arrClean = !0;
        }
        return this.arr_;
    };
    jspb.Map.prototype.toObject = function (a, b) {
        for (var c = this.toArray(), d = [], e = 0; e < c.length; e++) {
            var f = this.map_[c[e][0].toString()];
            this.wrapEntry_(f);
            var g = f.valueWrapper;
            g ? (goog.asserts.assert(b), d.push([f.key, b(a, g)])) : d.push([f.key, f.value]);
        }
        return d;
    };
    jspb.Map.fromObject = function (a, b, c) {
        b = new jspb.Map([], b);
        for (var d = 0; d < a.length; d++) {
            var e = a[d][0], f = c(a[d][1]);
            b.set(e, f);
        }
        return b;
    };
    jspb.Map.ArrayIteratorIterable_ = function (a) {
        this.idx_ = 0;
        this.arr_ = a;
    };
    jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
        return this.idx_ < this.arr_.length ? { done: !1, value: this.arr_[this.idx_++] } : { done: !0, value: void 0 };
    };
    "undefined" != typeof Symbol && (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function () {
        return this;
    });
    jspb.Map.prototype.getLength = function () {
        return this.stringKeys_().length;
    };
    jspb.Map.prototype.clear = function () {
        this.map_ = {};
        this.arrClean = !1;
    };
    jspb.Map.prototype.del = function (a) {
        a = a.toString();
        var b = this.map_.hasOwnProperty(a);
        delete this.map_[a];
        this.arrClean = !1;
        return b;
    };
    jspb.Map.prototype.getEntryList = function () {
        var a = [], b = this.stringKeys_();
        b.sort();
        for (var c = 0; c < b.length; c++) {
            var d = this.map_[b[c]];
            a.push([d.key, d.value]);
        }
        return a;
    };
    jspb.Map.prototype.entries = function () {
        var a = [], b = this.stringKeys_();
        b.sort();
        for (var c = 0; c < b.length; c++) {
            var d = this.map_[b[c]];
            a.push([d.key, this.wrapEntry_(d)]);
        }
        return new jspb.Map.ArrayIteratorIterable_(a);
    };
    jspb.Map.prototype.keys = function () {
        var a = [], b = this.stringKeys_();
        b.sort();
        for (var c = 0; c < b.length; c++) {
            a.push(this.map_[b[c]].key);
        }
        return new jspb.Map.ArrayIteratorIterable_(a);
    };
    jspb.Map.prototype.values = function () {
        var a = [], b = this.stringKeys_();
        b.sort();
        for (var c = 0; c < b.length; c++) {
            a.push(this.wrapEntry_(this.map_[b[c]]));
        }
        return new jspb.Map.ArrayIteratorIterable_(a);
    };
    jspb.Map.prototype.forEach = function (a, b) {
        var c = this.stringKeys_();
        c.sort();
        for (var d = 0; d < c.length; d++) {
            var e = this.map_[c[d]];
            a.call(b, this.wrapEntry_(e), e.key, this);
        }
    };
    jspb.Map.prototype.set = function (a, b) {
        var c = new jspb.Map.Entry_(a);
        this.valueCtor_ ? (c.valueWrapper = b, c.value = b.toArray()) : c.value = b;
        this.map_[a.toString()] = c;
        this.arrClean = !1;
        return this;
    };
    jspb.Map.prototype.wrapEntry_ = function (a) {
        return this.valueCtor_ ? (a.valueWrapper || (a.valueWrapper = new this.valueCtor_(a.value)), a.valueWrapper) : a.value;
    };
    jspb.Map.prototype.get = function (a) {
        if (a = this.map_[a.toString()]) {
            return this.wrapEntry_(a);
        }
    };
    jspb.Map.prototype.has = function (a) {
        return a.toString() in this.map_;
    };
    jspb.Map.prototype.serializeBinary = function (a, b, c, d, e) {
        var f = this.stringKeys_();
        f.sort();
        for (var g = 0; g < f.length; g++) {
            var h = this.map_[f[g]];
            b.beginSubMessage(a);
            c.call(b, 1, h.key);
            this.valueCtor_ ? d.call(b, 2, this.wrapEntry_(h), e) : d.call(b, 2, h.value);
            b.endSubMessage();
        }
    };
    jspb.Map.deserializeBinary = function (a, b, c, d, e, f, g) {
        for (; b.nextField() && !b.isEndGroup();) {
            var h = b.getFieldNumber();
            1 == h ? f = c.call(b) : 2 == h && (a.valueCtor_ ? (goog.asserts.assert(e), g || (g = new a.valueCtor_), d.call(b, g, e)) : g = d.call(b));
        }
        goog.asserts.assert(void 0 != f);
        goog.asserts.assert(void 0 != g);
        a.set(f, g);
    };
    jspb.Map.prototype.stringKeys_ = function () {
        var a = this.map_, b = [], c;
        for (c in a) {
            Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
        }
        return b;
    };
    jspb.Map.Entry_ = function (a, b) {
        this.key = a;
        this.value = b;
        this.valueWrapper = void 0;
    };
    jspb.ExtensionFieldInfo = function (a, b, c, d, e) {
        this.fieldIndex = a;
        this.fieldName = b;
        this.ctor = c;
        this.toObjectFn = d;
        this.isRepeated = e;
    };
    jspb.ExtensionFieldBinaryInfo = function (a, b, c, d, e, f) {
        this.fieldInfo = a;
        this.binaryReaderFn = b;
        this.binaryWriterFn = c;
        this.binaryMessageSerializeFn = d;
        this.binaryMessageDeserializeFn = e;
        this.isPacked = f;
    };
    jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
        return !!this.ctor;
    };
    jspb.Message = function () {
    };
    jspb.Message.GENERATE_TO_OBJECT = !0;
    jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
    jspb.Message.GENERATE_TO_STRING = !0;
    jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
    jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0;
    jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
    jspb.Message.prototype.getJsPbMessageId = function () {
        return this.messageId_;
    };
    jspb.Message.getIndex_ = function (a, b) {
        return b + a.arrayIndexOffset_;
    };
    jspb.Message.hiddenES6Property_ = /** @class */ (function () {
        function hiddenES6Property_() {
        }
        return hiddenES6Property_;
    }());
    jspb.Message.getFieldNumber_ = function (a, b) {
        return b - a.arrayIndexOffset_;
    };
    jspb.Message.initialize = function (a, b, c, d, e, f) {
        a.wrappers_ = null;
        b || (b = c ? [c] : []);
        a.messageId_ = c ? String(c) : void 0;
        a.arrayIndexOffset_ = 0 === c ? -1 : 0;
        a.array = b;
        jspb.Message.initPivotAndExtensionObject_(a, d);
        a.convertedPrimitiveFields_ = {};
        jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS || (a.repeatedFields = e);
        if (e) {
            for (b = 0; b < e.length; b++) {
                c = e[b], c < a.pivot_ ? (c = jspb.Message.getIndex_(a, c), a.array[c] = a.array[c] || jspb.Message.EMPTY_LIST_SENTINEL_) : (jspb.Message.maybeInitEmptyExtensionObject_(a), a.extensionObject_[c] = a.extensionObject_[c] || jspb.Message.EMPTY_LIST_SENTINEL_);
            }
        }
        if (f && f.length) {
            for (b = 0; b < f.length; b++) {
                jspb.Message.computeOneofCase(a, f[b]);
            }
        }
    };
    jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
    jspb.Message.isArray_ = function (a) {
        return jspb.Message.ASSUME_LOCAL_ARRAYS ? a instanceof Array : goog.isArray(a);
    };
    jspb.Message.isExtensionObject_ = function (a) {
        return null !== a && "object" == typeof a && !jspb.Message.isArray_(a) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array);
    };
    jspb.Message.initPivotAndExtensionObject_ = function (a, b) {
        var c = a.array.length, d = -1;
        if (c && (d = c - 1, c = a.array[d], jspb.Message.isExtensionObject_(c))) {
            a.pivot_ = jspb.Message.getFieldNumber_(a, d);
            a.extensionObject_ = c;
            return;
        }
        -1 < b ? (a.pivot_ = Math.max(b, jspb.Message.getFieldNumber_(a, d + 1)), a.extensionObject_ = null) : a.pivot_ = Number.MAX_VALUE;
    };
    jspb.Message.maybeInitEmptyExtensionObject_ = function (a) {
        var b = jspb.Message.getIndex_(a, a.pivot_);
        a.array[b] || (a.extensionObject_ = a.array[b] = {});
    };
    jspb.Message.toObjectList = function (a, b, c) {
        for (var d = [], e = 0; e < a.length; e++) {
            d[e] = b.call(a[e], c, a[e]);
        }
        return d;
    };
    jspb.Message.toObjectExtension = function (a, b, c, d, e) {
        for (var f in c) {
            var g = c[f], h = d.call(a, g);
            if (null != h) {
                for (var k in g.fieldName) {
                    if (g.fieldName.hasOwnProperty(k)) {
                        break;
                    }
                }
                b[k] = g.toObjectFn ? g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e) : g.toObjectFn(e, h) : h;
            }
        }
    };
    jspb.Message.serializeBinaryExtensions = function (a, b, c, d) {
        for (var e in c) {
            var f = c[e], g = f.fieldInfo;
            if (!f.binaryWriterFn) {
                throw Error("Message extension present that was generated without binary serialization support");
            }
            var h = d.call(a, g);
            if (null != h) {
                if (g.isMessageType()) {
                    if (f.binaryMessageSerializeFn) {
                        f.binaryWriterFn.call(b, g.fieldIndex, h, f.binaryMessageSerializeFn);
                    }
                    else {
                        throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
                    }
                }
                else {
                    f.binaryWriterFn.call(b, g.fieldIndex, h);
                }
            }
        }
    };
    jspb.Message.readBinaryExtension = function (a, b, c, d, e) {
        var f = c[b.getFieldNumber()];
        if (f) {
            c = f.fieldInfo;
            if (!f.binaryReaderFn) {
                throw Error("Deserializing extension whose generated code does not support binary format");
            }
            if (c.isMessageType()) {
                var g = new c.ctor;
                f.binaryReaderFn.call(b, g, f.binaryMessageDeserializeFn);
            }
            else {
                g = f.binaryReaderFn.call(b);
            }
            c.isRepeated && !f.isPacked ? (b = d.call(a, c)) ? b.push(g) : e.call(a, c, [g]) : e.call(a, c, g);
        }
        else {
            b.skipField();
        }
    };
    jspb.Message.getField = function (a, b) {
        if (b < a.pivot_) {
            b = jspb.Message.getIndex_(a, b);
            var c = a.array[b];
            return c === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.array[b] = [] : c;
        }
        if (a.extensionObject_) {
            return c = a.extensionObject_[b], c === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.extensionObject_[b] = [] : c;
        }
    };
    jspb.Message.getRepeatedField = function (a, b) {
        return jspb.Message.getField(a, b);
    };
    jspb.Message.getOptionalFloatingPointField = function (a, b) {
        a = jspb.Message.getField(a, b);
        return null == a ? a : +a;
    };
    jspb.Message.getBooleanField = function (a, b) {
        a = jspb.Message.getField(a, b);
        return null == a ? a : !!a;
    };
    jspb.Message.getRepeatedFloatingPointField = function (a, b) {
        var c = jspb.Message.getRepeatedField(a, b);
        a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
        if (!a.convertedPrimitiveFields_[b]) {
            for (var d = 0; d < c.length; d++) {
                c[d] = +c[d];
            }
            a.convertedPrimitiveFields_[b] = !0;
        }
        return c;
    };
    jspb.Message.getRepeatedBooleanField = function (a, b) {
        var c = jspb.Message.getRepeatedField(a, b);
        a.convertedPrimitiveFields_ || (a.convertedPrimitiveFields_ = {});
        if (!a.convertedPrimitiveFields_[b]) {
            for (var d = 0; d < c.length; d++) {
                c[d] = !!c[d];
            }
            a.convertedPrimitiveFields_[b] = !0;
        }
        return c;
    };
    jspb.Message.bytesAsB64 = function (a) {
        if (null == a || "string" === typeof a) {
            return a;
        }
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) {
            return goog.crypt.base64.encodeByteArray(a);
        }
        goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(a));
        return null;
    };
    jspb.Message.bytesAsU8 = function (a) {
        if (null == a || a instanceof Uint8Array) {
            return a;
        }
        if ("string" === typeof a) {
            return goog.crypt.base64.decodeStringToUint8Array(a);
        }
        goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(a));
        return null;
    };
    jspb.Message.bytesListAsB64 = function (a) {
        jspb.Message.assertConsistentTypes_(a);
        return a.length && "string" !== typeof a[0] ? goog.array.map(a, jspb.Message.bytesAsB64) : a;
    };
    jspb.Message.bytesListAsU8 = function (a) {
        jspb.Message.assertConsistentTypes_(a);
        return !a.length || a[0] instanceof Uint8Array ? a : goog.array.map(a, jspb.Message.bytesAsU8);
    };
    jspb.Message.assertConsistentTypes_ = function (a) {
        if (goog.DEBUG && a && 1 < a.length) {
            var b = goog.typeOf(a[0]);
            goog.array.forEach(a, function (a) {
                goog.typeOf(a) != b && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(a) + " expected " + b);
            });
        }
    };
    jspb.Message.getFieldWithDefault = function (a, b, c) {
        a = jspb.Message.getField(a, b);
        return null == a ? c : a;
    };
    jspb.Message.getBooleanFieldWithDefault = function (a, b, c) {
        a = jspb.Message.getBooleanField(a, b);
        return null == a ? c : a;
    };
    jspb.Message.getFloatingPointFieldWithDefault = function (a, b, c) {
        a = jspb.Message.getOptionalFloatingPointField(a, b);
        return null == a ? c : a;
    };
    jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
    jspb.Message.getMapField = function (a, b, c, d) {
        a.wrappers_ || (a.wrappers_ = {});
        if (b in a.wrappers_) {
            return a.wrappers_[b];
        }
        var e = jspb.Message.getField(a, b);
        if (!e) {
            if (c) {
                return;
            }
            e = [];
            jspb.Message.setField(a, b, e);
        }
        return a.wrappers_[b] = new jspb.Map(e, d);
    };
    jspb.Message.setField = function (a, b, c) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        b < a.pivot_ ? a.array[jspb.Message.getIndex_(a, b)] = c : (jspb.Message.maybeInitEmptyExtensionObject_(a), a.extensionObject_[b] = c);
        return a;
    };
    jspb.Message.setProto3IntField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
    };
    jspb.Message.setProto3FloatField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0.0);
    };
    jspb.Message.setProto3BooleanField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, !1);
    };
    jspb.Message.setProto3StringField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, "");
    };
    jspb.Message.setProto3BytesField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, "");
    };
    jspb.Message.setProto3EnumField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, 0);
    };
    jspb.Message.setProto3StringIntField = function (a, b, c) {
        return jspb.Message.setFieldIgnoringDefault_(a, b, c, "0");
    };
    jspb.Message.setFieldIgnoringDefault_ = function (a, b, c, d) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        c !== d ? jspb.Message.setField(a, b, c) : a.array[jspb.Message.getIndex_(a, b)] = null;
        return a;
    };
    jspb.Message.addToRepeatedField = function (a, b, c, d) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        b = jspb.Message.getRepeatedField(a, b);
        void 0 != d ? b.splice(d, 0, c) : b.push(c);
        return a;
    };
    jspb.Message.setOneofField = function (a, b, c, d) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        (c = jspb.Message.computeOneofCase(a, c)) && c !== b && void 0 !== d && (a.wrappers_ && c in a.wrappers_ && (a.wrappers_[c] = void 0), jspb.Message.setField(a, c, void 0));
        return jspb.Message.setField(a, b, d);
    };
    jspb.Message.computeOneofCase = function (a, b) {
        for (var c, d, e = 0; e < b.length; e++) {
            var f = b[e], g = jspb.Message.getField(a, f);
            null != g && (c = f, d = g, jspb.Message.setField(a, f, void 0));
        }
        return c ? (jspb.Message.setField(a, c, d), c) : 0;
    };
    jspb.Message.getWrapperField = function (a, b, c, d) {
        a.wrappers_ || (a.wrappers_ = {});
        if (!a.wrappers_[c]) {
            var e = jspb.Message.getField(a, c);
            if (d || e) {
                a.wrappers_[c] = new b(e);
            }
        }
        return a.wrappers_[c];
    };
    jspb.Message.getRepeatedWrapperField = function (a, b, c) {
        jspb.Message.wrapRepeatedField_(a, b, c);
        b = a.wrappers_[c];
        b == jspb.Message.EMPTY_LIST_SENTINEL_ && (b = a.wrappers_[c] = []);
        return b;
    };
    jspb.Message.wrapRepeatedField_ = function (a, b, c) {
        a.wrappers_ || (a.wrappers_ = {});
        if (!a.wrappers_[c]) {
            for (var d = jspb.Message.getRepeatedField(a, c), e = [], f = 0; f < d.length; f++) {
                e[f] = new b(d[f]);
            }
            a.wrappers_[c] = e;
        }
    };
    jspb.Message.setWrapperField = function (a, b, c) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        a.wrappers_ || (a.wrappers_ = {});
        var d = c ? c.toArray() : c;
        a.wrappers_[b] = c;
        return jspb.Message.setField(a, b, d);
    };
    jspb.Message.setOneofWrapperField = function (a, b, c, d) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        a.wrappers_ || (a.wrappers_ = {});
        var e = d ? d.toArray() : d;
        a.wrappers_[b] = d;
        return jspb.Message.setOneofField(a, b, c, e);
    };
    jspb.Message.setRepeatedWrapperField = function (a, b, c) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        a.wrappers_ || (a.wrappers_ = {});
        c = c || [];
        for (var d = [], e = 0; e < c.length; e++) {
            d[e] = c[e].toArray();
        }
        a.wrappers_[b] = c;
        return jspb.Message.setField(a, b, d);
    };
    jspb.Message.addToRepeatedWrapperField = function (a, b, c, d, e) {
        jspb.Message.wrapRepeatedField_(a, d, b);
        var f = a.wrappers_[b];
        f || (f = a.wrappers_[b] = []);
        c = c ? c : new d;
        a = jspb.Message.getRepeatedField(a, b);
        void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.toArray())) : (f.push(c), a.push(c.toArray()));
        return c;
    };
    jspb.Message.toMap = function (a, b, c, d) {
        for (var e = {}, f = 0; f < a.length; f++) {
            e[b.call(a[f])] = c ? c.call(a[f], d, a[f]) : a[f];
        }
        return e;
    };
    jspb.Message.prototype.syncMapFields_ = function () {
        if (this.wrappers_) {
            for (var a in this.wrappers_) {
                var b = this.wrappers_[a];
                if (goog.isArray(b)) {
                    for (var c = 0; c < b.length; c++) {
                        b[c] && b[c].toArray();
                    }
                }
                else {
                    b && b.toArray();
                }
            }
        }
    };
    jspb.Message.prototype.toArray = function () {
        this.syncMapFields_();
        return this.array;
    };
    jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function () {
        this.syncMapFields_();
        return this.array.toString();
    });
    jspb.Message.prototype.getExtension = function (a) {
        if (this.extensionObject_) {
            this.wrappers_ || (this.wrappers_ = {});
            var b = a.fieldIndex;
            if (a.isRepeated) {
                if (a.isMessageType()) {
                    return this.wrappers_[b] || (this.wrappers_[b] = goog.array.map(this.extensionObject_[b] || [], function (b) {
                        return new a.ctor(b);
                    })), this.wrappers_[b];
                }
            }
            else {
                if (a.isMessageType()) {
                    return !this.wrappers_[b] && this.extensionObject_[b] && (this.wrappers_[b] = new a.ctor(this.extensionObject_[b])), this.wrappers_[b];
                }
            }
            return this.extensionObject_[b];
        }
    };
    jspb.Message.prototype.setExtension = function (a, b) {
        this.wrappers_ || (this.wrappers_ = {});
        jspb.Message.maybeInitEmptyExtensionObject_(this);
        var c = a.fieldIndex;
        a.isRepeated ? (b = b || [], a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = goog.array.map(b, function (a) {
            return a.toArray();
        })) : this.extensionObject_[c] = b) : a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = b ? b.toArray() : b) : this.extensionObject_[c] = b;
        return this;
    };
    jspb.Message.difference = function (a, b) {
        if (!(a instanceof b.constructor)) {
            throw Error("Messages have different types.");
        }
        var c = a.toArray();
        b = b.toArray();
        var d = [], e = 0, f = c.length > b.length ? c.length : b.length;
        a.getJsPbMessageId() && (d[0] = a.getJsPbMessageId(), e = 1);
        for (; e < f; e++) {
            jspb.Message.compareFields(c[e], b[e]) || (d[e] = b[e]);
        }
        return new a.constructor(d);
    };
    jspb.Message.equals = function (a, b) {
        return a == b || !(!a || !b) && a instanceof b.constructor && jspb.Message.compareFields(a.toArray(), b.toArray());
    };
    jspb.Message.compareExtensions = function (a, b) {
        a = a || {};
        b = b || {};
        var c = {}, d;
        for (d in a) {
            c[d] = 0;
        }
        for (d in b) {
            c[d] = 0;
        }
        for (d in c) {
            if (!jspb.Message.compareFields(a[d], b[d])) {
                return !1;
            }
        }
        return !0;
    };
    jspb.Message.compareFields = function (a, b) {
        if (a == b) {
            return !0;
        }
        if (!goog.isObject(a) || !goog.isObject(b)) {
            return "number" === typeof a && isNaN(a) || "number" === typeof b && isNaN(b) ? String(a) == String(b) : !1;
        }
        if (a.constructor != b.constructor) {
            return !1;
        }
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a.constructor === Uint8Array) {
            if (a.length != b.length) {
                return !1;
            }
            for (var c = 0; c < a.length; c++) {
                if (a[c] != b[c]) {
                    return !1;
                }
            }
            return !0;
        }
        if (a.constructor === Array) {
            var d = void 0, e = void 0, f = Math.max(a.length, b.length);
            for (c = 0; c < f; c++) {
                var g = a[c], h = b[c];
                g && g.constructor == Object && (goog.asserts.assert(void 0 === d), goog.asserts.assert(c === a.length - 1), d = g, g = void 0);
                h && h.constructor == Object && (goog.asserts.assert(void 0 === e), goog.asserts.assert(c === b.length - 1), e = h, h = void 0);
                if (!jspb.Message.compareFields(g, h)) {
                    return !1;
                }
            }
            return d || e ? (d = d || {}, e = e || {}, jspb.Message.compareExtensions(d, e)) : !0;
        }
        if (a.constructor === Object) {
            return jspb.Message.compareExtensions(a, b);
        }
        throw Error("Invalid type in JSPB array");
    };
    jspb.Message.prototype.cloneMessage = function () {
        return jspb.Message.cloneMessage(this);
    };
    jspb.Message.prototype.clone = function () {
        return jspb.Message.cloneMessage(this);
    };
    jspb.Message.clone = function (a) {
        return jspb.Message.cloneMessage(a);
    };
    jspb.Message.cloneMessage = function (a) {
        return new a.constructor(jspb.Message.clone_(a.toArray()));
    };
    jspb.Message.copyInto = function (a, b) {
        goog.asserts.assertInstanceof(a, jspb.Message);
        goog.asserts.assertInstanceof(b, jspb.Message);
        goog.asserts.assert(a.constructor == b.constructor, "Copy source and target message should have the same type.");
        a = jspb.Message.clone(a);
        for (var c = b.toArray(), d = a.toArray(), e = c.length = 0; e < d.length; e++) {
            c[e] = d[e];
        }
        b.wrappers_ = a.wrappers_;
        b.extensionObject_ = a.extensionObject_;
    };
    jspb.Message.clone_ = function (a) {
        if (goog.isArray(a)) {
            for (var b = Array(a.length), c = 0; c < a.length; c++) {
                var d = a[c];
                null != d && (b[c] = "object" == typeof d ? jspb.Message.clone_(goog.asserts.assert(d)) : d);
            }
            return b;
        }
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) {
            return new Uint8Array(a);
        }
        b = {};
        for (c in a) {
            d = a[c], null != d && (b[c] = "object" == typeof d ? jspb.Message.clone_(goog.asserts.assert(d)) : d);
        }
        return b;
    };
    jspb.Message.registerMessageType = function (a, b) {
        b.messageId = a;
    };
    jspb.Message.messageSetExtensions = {};
    jspb.Message.messageSetExtensionsBinary = {};
    jspb.BinaryEncoder = function () {
        this.buffer_ = [];
    };
    jspb.BinaryEncoder.prototype.length = function () {
        return this.buffer_.length;
    };
    jspb.BinaryEncoder.prototype.end = function () {
        var a = this.buffer_;
        this.buffer_ = [];
        return a;
    };
    jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (a, b) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(b == Math.floor(b));
        goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
        for (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32); 0 < b || 127 < a;) {
            this.buffer_.push(a & 127 | 128), a = (a >>> 7 | b << 25) >>> 0, b >>>= 7;
        }
        this.buffer_.push(a);
    };
    jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (a, b) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(b == Math.floor(b));
        goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
        goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32);
        this.writeUint32(a);
        this.writeUint32(b);
    };
    jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        for (goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32); 127 < a;) {
            this.buffer_.push(a & 127 | 128), a >>>= 7;
        }
        this.buffer_.push(a);
    };
    jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
        if (0 <= a) {
            this.writeUnsignedVarint32(a);
        }
        else {
            for (var b = 0; 9 > b; b++) {
                this.buffer_.push(a & 127 | 128), a >>= 7;
            }
            this.buffer_.push(1);
        }
    };
    jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
        jspb.utils.splitInt64(a);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitInt64(a);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
        this.writeUnsignedVarint32((a << 1 ^ a >> 31) >>> 0);
    };
    jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitZigzag64(a);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (a) {
        this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a));
    };
    jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function (a) {
        var b = this;
        jspb.utils.splitHash64(a);
        jspb.utils.toZigzag64(jspb.utils.split64Low, jspb.utils.split64High, function (a, d) {
            b.writeSplitVarint64(a >>> 0, d >>> 0);
        });
    };
    jspb.BinaryEncoder.prototype.writeUint8 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(0 <= a && 256 > a);
        this.buffer_.push(a >>> 0 & 255);
    };
    jspb.BinaryEncoder.prototype.writeUint16 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(0 <= a && 65536 > a);
        this.buffer_.push(a >>> 0 & 255);
        this.buffer_.push(a >>> 8 & 255);
    };
    jspb.BinaryEncoder.prototype.writeUint32 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
        this.buffer_.push(a >>> 0 & 255);
        this.buffer_.push(a >>> 8 & 255);
        this.buffer_.push(a >>> 16 & 255);
        this.buffer_.push(a >>> 24 & 255);
    };
    jspb.BinaryEncoder.prototype.writeUint64 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
        jspb.utils.splitUint64(a);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeInt8 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(-128 <= a && 128 > a);
        this.buffer_.push(a >>> 0 & 255);
    };
    jspb.BinaryEncoder.prototype.writeInt16 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(-32768 <= a && 32768 > a);
        this.buffer_.push(a >>> 0 & 255);
        this.buffer_.push(a >>> 8 & 255);
    };
    jspb.BinaryEncoder.prototype.writeInt32 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
        this.buffer_.push(a >>> 0 & 255);
        this.buffer_.push(a >>> 8 & 255);
        this.buffer_.push(a >>> 16 & 255);
        this.buffer_.push(a >>> 24 & 255);
    };
    jspb.BinaryEncoder.prototype.writeInt64 = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitInt64(a);
        this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeInt64String = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(+a >= -jspb.BinaryConstants.TWO_TO_63 && +a < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));
        this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeFloat = function (a) {
        goog.asserts.assert(Infinity === a || -Infinity === a || isNaN(a) || a >= -jspb.BinaryConstants.FLOAT32_MAX && a <= jspb.BinaryConstants.FLOAT32_MAX);
        jspb.utils.splitFloat32(a);
        this.writeUint32(jspb.utils.split64Low);
    };
    jspb.BinaryEncoder.prototype.writeDouble = function (a) {
        goog.asserts.assert(Infinity === a || -Infinity === a || isNaN(a) || a >= -jspb.BinaryConstants.FLOAT64_MAX && a <= jspb.BinaryConstants.FLOAT64_MAX);
        jspb.utils.splitFloat64(a);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeBool = function (a) {
        goog.asserts.assert("boolean" === typeof a || "number" === typeof a);
        this.buffer_.push(a ? 1 : 0);
    };
    jspb.BinaryEncoder.prototype.writeEnum = function (a) {
        goog.asserts.assert(a == Math.floor(a));
        goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
        this.writeSignedVarint32(a);
    };
    jspb.BinaryEncoder.prototype.writeBytes = function (a) {
        this.buffer_.push.apply(this.buffer_, a);
    };
    jspb.BinaryEncoder.prototype.writeVarintHash64 = function (a) {
        jspb.utils.splitHash64(a);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeFixedHash64 = function (a) {
        jspb.utils.splitHash64(a);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
    };
    jspb.BinaryEncoder.prototype.writeString = function (a) {
        for (var b = this.buffer_.length, c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            if (128 > d) {
                this.buffer_.push(d);
            }
            else {
                if (2048 > d) {
                    this.buffer_.push(d >> 6 | 192), this.buffer_.push(d & 63 | 128);
                }
                else {
                    if (65536 > d) {
                        if (55296 <= d && 56319 >= d && c + 1 < a.length) {
                            var e = a.charCodeAt(c + 1);
                            56320 <= e && 57343 >= e && (d = 1024 * (d - 55296) + e - 56320 + 65536, this.buffer_.push(d >> 18 | 240), this.buffer_.push(d >> 12 & 63 | 128), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 | 128), c++);
                        }
                        else {
                            this.buffer_.push(d >> 12 | 224), this.buffer_.push(d >> 6 & 63 | 128), this.buffer_.push(d & 63 | 128);
                        }
                    }
                }
            }
        }
        return this.buffer_.length - b;
    };
    jspb.arith = {};
    jspb.arith.UInt64 = function (a, b) {
        this.lo = a;
        this.hi = b;
    };
    jspb.arith.UInt64.prototype.cmp = function (a) {
        return this.hi < a.hi || this.hi == a.hi && this.lo < a.lo ? -1 : this.hi == a.hi && this.lo == a.lo ? 0 : 1;
    };
    jspb.arith.UInt64.prototype.rightShift = function () {
        return new jspb.arith.UInt64((this.lo >>> 1 | (this.hi & 1) << 31) >>> 0, this.hi >>> 1 >>> 0);
    };
    jspb.arith.UInt64.prototype.leftShift = function () {
        return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
    };
    jspb.arith.UInt64.prototype.msb = function () {
        return !!(this.hi & 2147483648);
    };
    jspb.arith.UInt64.prototype.lsb = function () {
        return !!(this.lo & 1);
    };
    jspb.arith.UInt64.prototype.zero = function () {
        return 0 == this.lo && 0 == this.hi;
    };
    jspb.arith.UInt64.prototype.add = function (a) {
        return new jspb.arith.UInt64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
    };
    jspb.arith.UInt64.prototype.sub = function (a) {
        return new jspb.arith.UInt64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
    };
    jspb.arith.UInt64.mul32x32 = function (a, b) {
        var c = a & 65535;
        a >>>= 16;
        var d = b & 65535, e = b >>> 16;
        b = c * d + 65536 * (c * e & 65535) + 65536 * (a * d & 65535);
        for (c = a * e + (c * e >>> 16) + (a * d >>> 16); 4294967296 <= b;) {
            b -= 4294967296, c += 1;
        }
        return new jspb.arith.UInt64(b >>> 0, c >>> 0);
    };
    jspb.arith.UInt64.prototype.mul = function (a) {
        var b = jspb.arith.UInt64.mul32x32(this.lo, a);
        a = jspb.arith.UInt64.mul32x32(this.hi, a);
        a.hi = a.lo;
        a.lo = 0;
        return b.add(a);
    };
    jspb.arith.UInt64.prototype.div = function (a) {
        if (0 == a) {
            return [];
        }
        var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(this.lo, this.hi);
        a = new jspb.arith.UInt64(a, 0);
        for (var d = new jspb.arith.UInt64(1, 0); !a.msb();) {
            a = a.leftShift(), d = d.leftShift();
        }
        for (; !d.zero();) {
            0 >= a.cmp(c) && (b = b.add(d), c = c.sub(a)), a = a.rightShift(), d = d.rightShift();
        }
        return [b, c];
    };
    jspb.arith.UInt64.prototype.toString = function () {
        for (var a = "", b = this; !b.zero();) {
            b = b.div(10);
            var c = b[0];
            a = b[1].lo + a;
            b = c;
        }
        "" == a && (a = "0");
        return a;
    };
    jspb.arith.UInt64.fromString = function (a) {
        for (var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(0, 0), d = 0; d < a.length; d++) {
            if ("0" > a[d] || "9" < a[d]) {
                return null;
            }
            var e = parseInt(a[d], 10);
            c.lo = e;
            b = b.mul(10).add(c);
        }
        return b;
    };
    jspb.arith.UInt64.prototype.clone = function () {
        return new jspb.arith.UInt64(this.lo, this.hi);
    };
    jspb.arith.Int64 = function (a, b) {
        this.lo = a;
        this.hi = b;
    };
    jspb.arith.Int64.prototype.add = function (a) {
        return new jspb.arith.Int64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
    };
    jspb.arith.Int64.prototype.sub = function (a) {
        return new jspb.arith.Int64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
    };
    jspb.arith.Int64.prototype.clone = function () {
        return new jspb.arith.Int64(this.lo, this.hi);
    };
    jspb.arith.Int64.prototype.toString = function () {
        var a = 0 != (this.hi & 2147483648), b = new jspb.arith.UInt64(this.lo, this.hi);
        a && (b = (new jspb.arith.UInt64(0, 0)).sub(b));
        return (a ? "-" : "") + b.toString();
    };
    jspb.arith.Int64.fromString = function (a) {
        var b = 0 < a.length && "-" == a[0];
        b && (a = a.substring(1));
        a = jspb.arith.UInt64.fromString(a);
        if (null === a) {
            return null;
        }
        b && (a = (new jspb.arith.UInt64(0, 0)).sub(a));
        return new jspb.arith.Int64(a.lo, a.hi);
    };
    jspb.BinaryWriter = function () {
        this.blocks_ = [];
        this.totalLength_ = 0;
        this.encoder_ = new jspb.BinaryEncoder;
        this.bookmarks_ = [];
    };
    jspb.BinaryWriter.prototype.appendUint8Array_ = function (a) {
        var b = this.encoder_.end();
        this.blocks_.push(b);
        this.blocks_.push(a);
        this.totalLength_ += b.length + a.length;
    };
    jspb.BinaryWriter.prototype.beginDelimited_ = function (a) {
        this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
        a = this.encoder_.end();
        this.blocks_.push(a);
        this.totalLength_ += a.length;
        a.push(this.totalLength_);
        return a;
    };
    jspb.BinaryWriter.prototype.endDelimited_ = function (a) {
        var b = a.pop();
        b = this.totalLength_ + this.encoder_.length() - b;
        for (goog.asserts.assert(0 <= b); 127 < b;) {
            a.push(b & 127 | 128), b >>>= 7, this.totalLength_++;
        }
        a.push(b);
        this.totalLength_++;
    };
    jspb.BinaryWriter.prototype.writeSerializedMessage = function (a, b, c) {
        this.appendUint8Array_(a.subarray(b, c));
    };
    jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function (a, b, c) {
        null != a && null != b && null != c && this.writeSerializedMessage(a, b, c);
    };
    jspb.BinaryWriter.prototype.reset = function () {
        this.blocks_ = [];
        this.encoder_.end();
        this.totalLength_ = 0;
        this.bookmarks_ = [];
    };
    jspb.BinaryWriter.prototype.getResultBuffer = function () {
        goog.asserts.assert(0 == this.bookmarks_.length);
        for (var a = new Uint8Array(this.totalLength_ + this.encoder_.length()), b = this.blocks_, c = b.length, d = 0, e = 0; e < c; e++) {
            var f = b[e];
            a.set(f, d);
            d += f.length;
        }
        b = this.encoder_.end();
        a.set(b, d);
        d += b.length;
        goog.asserts.assert(d == a.length);
        this.blocks_ = [a];
        return a;
    };
    jspb.BinaryWriter.prototype.getResultBase64String = function (a) {
        return goog.crypt.base64.encodeByteArray(this.getResultBuffer(), a);
    };
    jspb.BinaryWriter.prototype.beginSubMessage = function (a) {
        this.bookmarks_.push(this.beginDelimited_(a));
    };
    jspb.BinaryWriter.prototype.endSubMessage = function () {
        goog.asserts.assert(0 <= this.bookmarks_.length);
        this.endDelimited_(this.bookmarks_.pop());
    };
    jspb.BinaryWriter.prototype.writeFieldHeader_ = function (a, b) {
        goog.asserts.assert(1 <= a && a == Math.floor(a));
        this.encoder_.writeUnsignedVarint32(8 * a + b);
    };
    jspb.BinaryWriter.prototype.writeAny = function (a, b, c) {
        var d = jspb.BinaryConstants.FieldType;
        switch (a) {
            case d.DOUBLE:
                this.writeDouble(b, c);
                break;
            case d.FLOAT:
                this.writeFloat(b, c);
                break;
            case d.INT64:
                this.writeInt64(b, c);
                break;
            case d.UINT64:
                this.writeUint64(b, c);
                break;
            case d.INT32:
                this.writeInt32(b, c);
                break;
            case d.FIXED64:
                this.writeFixed64(b, c);
                break;
            case d.FIXED32:
                this.writeFixed32(b, c);
                break;
            case d.BOOL:
                this.writeBool(b, c);
                break;
            case d.STRING:
                this.writeString(b, c);
                break;
            case d.GROUP:
                goog.asserts.fail("Group field type not supported in writeAny()");
                break;
            case d.MESSAGE:
                goog.asserts.fail("Message field type not supported in writeAny()");
                break;
            case d.BYTES:
                this.writeBytes(b, c);
                break;
            case d.UINT32:
                this.writeUint32(b, c);
                break;
            case d.ENUM:
                this.writeEnum(b, c);
                break;
            case d.SFIXED32:
                this.writeSfixed32(b, c);
                break;
            case d.SFIXED64:
                this.writeSfixed64(b, c);
                break;
            case d.SINT32:
                this.writeSint32(b, c);
                break;
            case d.SINT64:
                this.writeSint64(b, c);
                break;
            case d.FHASH64:
                this.writeFixedHash64(b, c);
                break;
            case d.VHASH64:
                this.writeVarintHash64(b, c);
                break;
            default:
                goog.asserts.fail("Invalid field type in writeAny()");
        }
    };
    jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b));
    };
    jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
    };
    jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b));
    };
    jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b));
    };
    jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b));
    };
    jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b));
    };
    jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(b));
    };
    jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarintHash64(b));
    };
    jspb.BinaryWriter.prototype.writeInt32 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
    };
    jspb.BinaryWriter.prototype.writeInt32String = function (a, b) {
        null != b && (b = parseInt(b, 10), goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
    };
    jspb.BinaryWriter.prototype.writeInt64 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_(a, b));
    };
    jspb.BinaryWriter.prototype.writeInt64String = function (a, b) {
        null != b && (b = jspb.arith.Int64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b.lo, b.hi));
    };
    jspb.BinaryWriter.prototype.writeUint32 = function (a, b) {
        null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
    };
    jspb.BinaryWriter.prototype.writeUint32String = function (a, b) {
        null != b && (b = parseInt(b, 10), goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
    };
    jspb.BinaryWriter.prototype.writeUint64 = function (a, b) {
        null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a, b));
    };
    jspb.BinaryWriter.prototype.writeUint64String = function (a, b) {
        null != b && (b = jspb.arith.UInt64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b.lo, b.hi));
    };
    jspb.BinaryWriter.prototype.writeSint32 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeZigzagVarint32_(a, b));
    };
    jspb.BinaryWriter.prototype.writeSint64 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64_(a, b));
    };
    jspb.BinaryWriter.prototype.writeSintHash64 = function (a, b) {
        null != b && this.writeZigzagVarintHash64_(a, b);
    };
    jspb.BinaryWriter.prototype.writeSint64String = function (a, b) {
        null != b && this.writeZigzagVarint64String_(a, b);
    };
    jspb.BinaryWriter.prototype.writeFixed32 = function (a, b) {
        null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(b));
    };
    jspb.BinaryWriter.prototype.writeFixed64 = function (a, b) {
        null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(b));
    };
    jspb.BinaryWriter.prototype.writeFixed64String = function (a, b) {
        null != b && (b = jspb.arith.UInt64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b.lo, b.hi));
    };
    jspb.BinaryWriter.prototype.writeSfixed32 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(b));
    };
    jspb.BinaryWriter.prototype.writeSfixed64 = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(b));
    };
    jspb.BinaryWriter.prototype.writeSfixed64String = function (a, b) {
        null != b && (b = jspb.arith.Int64.fromString(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b.lo, b.hi));
    };
    jspb.BinaryWriter.prototype.writeFloat = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b));
    };
    jspb.BinaryWriter.prototype.writeDouble = function (a, b) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b));
    };
    jspb.BinaryWriter.prototype.writeBool = function (a, b) {
        null != b && (goog.asserts.assert("boolean" === typeof b || "number" === typeof b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool(b));
    };
    jspb.BinaryWriter.prototype.writeEnum = function (a, b) {
        null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
    };
    jspb.BinaryWriter.prototype.writeString = function (a, b) {
        null != b && (a = this.beginDelimited_(a), this.encoder_.writeString(b), this.endDelimited_(a));
    };
    jspb.BinaryWriter.prototype.writeBytes = function (a, b) {
        null != b && (b = jspb.utils.byteSourceToUint8Array(b), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b.length), this.appendUint8Array_(b));
    };
    jspb.BinaryWriter.prototype.writeMessage = function (a, b, c) {
        null != b && (a = this.beginDelimited_(a), c(b, this), this.endDelimited_(a));
    };
    jspb.BinaryWriter.prototype.writeMessageSet = function (a, b, c) {
        null != b && (this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.START_GROUP), this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(a), a = this.beginDelimited_(3), c(b, this), this.endDelimited_(a), this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.END_GROUP));
    };
    jspb.BinaryWriter.prototype.writeGroup = function (a, b, c) {
        null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b, this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP));
    };
    jspb.BinaryWriter.prototype.writeFixedHash64 = function (a, b) {
        null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeFixedHash64(b));
    };
    jspb.BinaryWriter.prototype.writeVarintHash64 = function (a, b) {
        null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeVarintHash64(b));
    };
    jspb.BinaryWriter.prototype.writeSplitFixed64 = function (a, b, c) {
        this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64);
        this.encoder_.writeSplitFixed64(b, c);
    };
    jspb.BinaryWriter.prototype.writeSplitVarint64 = function (a, b, c) {
        this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
        this.encoder_.writeSplitVarint64(b, c);
    };
    jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function (a, b, c) {
        this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
        var d = this.encoder_;
        jspb.utils.toZigzag64(b, c, function (a, b) {
            d.writeSplitVarint64(a >>> 0, b >>> 0);
        });
    };
    jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeSignedVarint32_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeInt32String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeSignedVarint64_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function (a, b, c, d) {
        if (null != b) {
            for (var e = 0; e < b.length; e++) {
                this.writeSplitFixed64(a, c(b[e]), d(b[e]));
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function (a, b, c, d) {
        if (null != b) {
            for (var e = 0; e < b.length; e++) {
                this.writeSplitVarint64(a, c(b[e]), d(b[e]));
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 = function (a, b, c, d) {
        if (null != b) {
            for (var e = 0; e < b.length; e++) {
                this.writeSplitZigzagVarint64(a, c(b[e]), d(b[e]));
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeInt64String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeUnsignedVarint32_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeUint32String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeUnsignedVarint64_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeUint64String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeZigzagVarint32_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeZigzagVarint64_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeZigzagVarint64String_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeZigzagVarintHash64_(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeFixed32(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeFixed64(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeFixed64String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeSfixed32(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeSfixed64(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeSfixed64String(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedFloat = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeFloat(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedDouble = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeDouble(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedBool = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeBool(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedEnum = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeEnum(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedString = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeString(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedBytes = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeBytes(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedMessage = function (a, b, c) {
        if (null != b) {
            for (var d = 0; d < b.length; d++) {
                var e = this.beginDelimited_(a);
                c(b[d], this);
                this.endDelimited_(e);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedGroup = function (a, b, c) {
        if (null != b) {
            for (var d = 0; d < b.length; d++) {
                this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b[d], this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeFixedHash64(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (a, b) {
        if (null != b) {
            for (var c = 0; c < b.length; c++) {
                this.writeVarintHash64(a, b[c]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedInt32 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeSignedVarint32(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedInt32String = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeSignedVarint32(parseInt(b[c], 10));
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedInt64 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeSignedVarint64(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function (a, b, c, d) {
        if (null != b) {
            a = this.beginDelimited_(a);
            for (var e = 0; e < b.length; e++) {
                this.encoder_.writeSplitFixed64(c(b[e]), d(b[e]));
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function (a, b, c, d) {
        if (null != b) {
            a = this.beginDelimited_(a);
            for (var e = 0; e < b.length; e++) {
                this.encoder_.writeSplitVarint64(c(b[e]), d(b[e]));
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 = function (a, b, c, d) {
        if (null != b) {
            a = this.beginDelimited_(a);
            for (var e = this.encoder_, f = 0; f < b.length; f++) {
                jspb.utils.toZigzag64(c(b[f]), d(b[f]), function (a, b) {
                    e.writeSplitVarint64(a >>> 0, b >>> 0);
                });
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedInt64String = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                var d = jspb.arith.Int64.fromString(b[c]);
                this.encoder_.writeSplitVarint64(d.lo, d.hi);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedUint32 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeUnsignedVarint32(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedUint32String = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeUnsignedVarint32(parseInt(b[c], 10));
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedUint64 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeUnsignedVarint64(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedUint64String = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                var d = jspb.arith.UInt64.fromString(b[c]);
                this.encoder_.writeSplitVarint64(d.lo, d.hi);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSint32 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeZigzagVarint32(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSint64 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeZigzagVarint64(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSint64String = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b[c]));
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedSintHash64 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeZigzagVarintHash64(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedFixed32 = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeUint32(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedFixed64 = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeUint64(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedFixed64String = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                var c = jspb.arith.UInt64.fromString(b[a]);
                this.encoder_.writeSplitFixed64(c.lo, c.hi);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedSfixed32 = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeInt32(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedSfixed64 = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeInt64(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedSfixed64String = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeInt64String(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedFloat = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeFloat(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedDouble = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeDouble(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedBool = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeBool(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedEnum = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeEnum(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (a, b) {
        if (null != b && b.length) {
            for (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b.length), a = 0; a < b.length; a++) {
                this.encoder_.writeFixedHash64(b[a]);
            }
        }
    };
    jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (a, b) {
        if (null != b && b.length) {
            a = this.beginDelimited_(a);
            for (var c = 0; c < b.length; c++) {
                this.encoder_.writeVarintHash64(b[c]);
            }
            this.endDelimited_(a);
        }
    };
    var proto = { google: {} };
    proto.google.crypto = {};
    proto.google.crypto.tink = {};
    proto.google.crypto.tink.AesCmacParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCmacParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCmacParams.displayName = "proto.google.crypto.tink.AesCmacParams");
    proto.google.crypto.tink.AesCmacKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCmacKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCmacKey.displayName = "proto.google.crypto.tink.AesCmacKey");
    proto.google.crypto.tink.AesCmacKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCmacKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCmacKeyFormat.displayName = "proto.google.crypto.tink.AesCmacKeyFormat");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCmacParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCmacParams.toObject(a, this);
    }, proto.google.crypto.tink.AesCmacParams.toObject = function (a, b) {
        var c = { tagSize: jspb.Message.getFieldWithDefault(b, 1, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesCmacParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCmacParams;
        return proto.google.crypto.tink.AesCmacParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCmacParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setTagSize(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCmacParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCmacParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCmacParams.serializeBinaryToWriter = function (a, b) {
        a = a.getTagSize();
        0 !== a && b.writeUint32(1, a);
    };
    proto.google.crypto.tink.AesCmacParams.prototype.getTagSize = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCmacParams.prototype.setTagSize = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCmacKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCmacKey.toObject(a, this);
    }, proto.google.crypto.tink.AesCmacKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), keyValue: b.getKeyValue_asB64(), params: (c = b.getParams()) && proto.google.crypto.tink.AesCmacParams.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCmacKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCmacKey;
        return proto.google.crypto.tink.AesCmacKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCmacKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                case 3:
                    c = new proto.google.crypto.tink.AesCmacParams;
                    b.readMessage(c, proto.google.crypto.tink.AesCmacParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCmacKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCmacKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCmacKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(2, c);
        c = a.getParams();
        null != c && b.writeMessage(3, c, proto.google.crypto.tink.AesCmacParams.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 2, "");
    };
    proto.google.crypto.tink.AesCmacKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.AesCmacKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.AesCmacKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 2, a);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCmacParams, 3);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 3, a);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.AesCmacKey.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 3);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCmacKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCmacKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.AesCmacKeyFormat.toObject = function (a, b) {
        var c, d = { keySize: jspb.Message.getFieldWithDefault(b, 1, 0), params: (c = b.getParams()) && proto.google.crypto.tink.AesCmacParams.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCmacKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCmacKeyFormat;
        return proto.google.crypto.tink.AesCmacKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setKeySize(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.AesCmacParams;
                    b.readMessage(c, proto.google.crypto.tink.AesCmacParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCmacKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCmacKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getKeySize();
        0 !== c && b.writeUint32(1, c);
        c = a.getParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.AesCmacParams.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.getKeySize = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.setKeySize = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCmacParams, 2);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.AesCmacKeyFormat.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.AesCtrParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCtrParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCtrParams.displayName = "proto.google.crypto.tink.AesCtrParams");
    proto.google.crypto.tink.AesCtrKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCtrKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCtrKeyFormat.displayName = "proto.google.crypto.tink.AesCtrKeyFormat");
    proto.google.crypto.tink.AesCtrKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCtrKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCtrKey.displayName = "proto.google.crypto.tink.AesCtrKey");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCtrParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCtrParams.toObject(a, this);
    }, proto.google.crypto.tink.AesCtrParams.toObject = function (a, b) {
        var c = { ivSize: jspb.Message.getFieldWithDefault(b, 1, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesCtrParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCtrParams;
        return proto.google.crypto.tink.AesCtrParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCtrParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setIvSize(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCtrParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCtrParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCtrParams.serializeBinaryToWriter = function (a, b) {
        a = a.getIvSize();
        0 !== a && b.writeUint32(1, a);
    };
    proto.google.crypto.tink.AesCtrParams.prototype.getIvSize = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCtrParams.prototype.setIvSize = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCtrKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCtrKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.AesCtrKeyFormat.toObject = function (a, b) {
        var c, d = { params: (c = b.getParams()) && proto.google.crypto.tink.AesCtrParams.toObject(a, c), keySize: jspb.Message.getFieldWithDefault(b, 2, 0) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCtrKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCtrKeyFormat;
        return proto.google.crypto.tink.AesCtrKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.AesCtrParams;
                    b.readMessage(c, proto.google.crypto.tink.AesCtrParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 2:
                    c = b.readUint32();
                    a.setKeySize(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCtrKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCtrKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getParams();
        null != c && b.writeMessage(1, c, proto.google.crypto.tink.AesCtrParams.serializeBinaryToWriter);
        c = a.getKeySize();
        0 !== c && b.writeUint32(2, c);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCtrParams, 1);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.getKeySize = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.AesCtrKeyFormat.prototype.setKeySize = function (a) {
        return jspb.Message.setProto3IntField(this, 2, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCtrKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCtrKey.toObject(a, this);
    }, proto.google.crypto.tink.AesCtrKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), params: (c = b.getParams()) && proto.google.crypto.tink.AesCtrParams.toObject(a, c), keyValue: b.getKeyValue_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCtrKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCtrKey;
        return proto.google.crypto.tink.AesCtrKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCtrKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.AesCtrParams;
                    b.readMessage(c, proto.google.crypto.tink.AesCtrParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCtrKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCtrKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCtrKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.AesCtrParams.serializeBinaryToWriter);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCtrParams, 2);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.AesCtrKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.AesCtrKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.AesCtrKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.AesCtrKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    proto.google.crypto.tink.EllipticCurveType = { UNKNOWN_CURVE: 0, NIST_P256: 2, NIST_P384: 3, NIST_P521: 4, CURVE25519: 5 };
    proto.google.crypto.tink.EcPointFormat = { UNKNOWN_FORMAT: 0, UNCOMPRESSED: 1, COMPRESSED: 2, DO_NOT_USE_CRUNCHY_UNCOMPRESSED: 3 };
    proto.google.crypto.tink.HashType = { UNKNOWN_HASH: 0, SHA1: 1, SHA384: 2, SHA256: 3, SHA512: 4 };
    proto.google.crypto.tink.HmacParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.HmacParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.HmacParams.displayName = "proto.google.crypto.tink.HmacParams");
    proto.google.crypto.tink.HmacKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.HmacKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.HmacKey.displayName = "proto.google.crypto.tink.HmacKey");
    proto.google.crypto.tink.HmacKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.HmacKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.HmacKeyFormat.displayName = "proto.google.crypto.tink.HmacKeyFormat");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.HmacParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.HmacParams.toObject(a, this);
    }, proto.google.crypto.tink.HmacParams.toObject = function (a, b) {
        var c = { hash: jspb.Message.getFieldWithDefault(b, 1, 0), tagSize: jspb.Message.getFieldWithDefault(b, 2, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.HmacParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.HmacParams;
        return proto.google.crypto.tink.HmacParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.HmacParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readEnum();
                    a.setHash(c);
                    break;
                case 2:
                    c = b.readUint32();
                    a.setTagSize(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.HmacParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.HmacParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.HmacParams.serializeBinaryToWriter = function (a, b) {
        var c = a.getHash();
        0.0 !== c && b.writeEnum(1, c);
        c = a.getTagSize();
        0 !== c && b.writeUint32(2, c);
    };
    proto.google.crypto.tink.HmacParams.prototype.getHash = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.HmacParams.prototype.setHash = function (a) {
        return jspb.Message.setProto3EnumField(this, 1, a);
    };
    proto.google.crypto.tink.HmacParams.prototype.getTagSize = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.HmacParams.prototype.setTagSize = function (a) {
        return jspb.Message.setProto3IntField(this, 2, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.HmacKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.HmacKey.toObject(a, this);
    }, proto.google.crypto.tink.HmacKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), params: (c = b.getParams()) && proto.google.crypto.tink.HmacParams.toObject(a, c), keyValue: b.getKeyValue_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.HmacKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.HmacKey;
        return proto.google.crypto.tink.HmacKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.HmacKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.HmacParams;
                    b.readMessage(c, proto.google.crypto.tink.HmacParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.HmacKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.HmacKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.HmacKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.HmacParams.serializeBinaryToWriter);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.HmacKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.HmacKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.HmacKey.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.HmacParams, 2);
    };
    proto.google.crypto.tink.HmacKey.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.HmacKey.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.HmacKey.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.HmacKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.HmacKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.HmacKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.HmacKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.HmacKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.HmacKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.HmacKeyFormat.toObject = function (a, b) {
        var c, d = { params: (c = b.getParams()) && proto.google.crypto.tink.HmacParams.toObject(a, c), keySize: jspb.Message.getFieldWithDefault(b, 2, 0), version: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.HmacKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.HmacKeyFormat;
        return proto.google.crypto.tink.HmacKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.HmacKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.HmacParams;
                    b.readMessage(c, proto.google.crypto.tink.HmacParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 2:
                    c = b.readUint32();
                    a.setKeySize(c);
                    break;
                case 3:
                    c = b.readUint32();
                    a.setVersion(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.HmacKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.HmacKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getParams();
        null != c && b.writeMessage(1, c, proto.google.crypto.tink.HmacParams.serializeBinaryToWriter);
        c = a.getKeySize();
        0 !== c && b.writeUint32(2, c);
        c = a.getVersion();
        0 !== c && b.writeUint32(3, c);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.HmacParams, 1);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.getKeySize = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.setKeySize = function (a) {
        return jspb.Message.setProto3IntField(this, 2, a);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.HmacKeyFormat.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 3, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCtrHmacAeadKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.displayName = "proto.google.crypto.tink.AesCtrHmacAeadKeyFormat");
    proto.google.crypto.tink.AesCtrHmacAeadKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesCtrHmacAeadKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesCtrHmacAeadKey.displayName = "proto.google.crypto.tink.AesCtrHmacAeadKey");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.toObject = function (a, b) {
        var c, d = { aesCtrKeyFormat: (c = b.getAesCtrKeyFormat()) && proto.google.crypto.tink.AesCtrKeyFormat.toObject(a, c), hmacKeyFormat: (c = b.getHmacKeyFormat()) && proto.google.crypto.tink.HmacKeyFormat.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCtrHmacAeadKeyFormat;
        return proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.AesCtrKeyFormat;
                    b.readMessage(c, proto.google.crypto.tink.AesCtrKeyFormat.deserializeBinaryFromReader);
                    a.setAesCtrKeyFormat(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.HmacKeyFormat;
                    b.readMessage(c, proto.google.crypto.tink.HmacKeyFormat.deserializeBinaryFromReader);
                    a.setHmacKeyFormat(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getAesCtrKeyFormat();
        null != c && b.writeMessage(1, c, proto.google.crypto.tink.AesCtrKeyFormat.serializeBinaryToWriter);
        c = a.getHmacKeyFormat();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.HmacKeyFormat.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.getAesCtrKeyFormat = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCtrKeyFormat, 1);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.setAesCtrKeyFormat = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.clearAesCtrKeyFormat = function () {
        return this.setAesCtrKeyFormat(void 0);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.hasAesCtrKeyFormat = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.getHmacKeyFormat = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.HmacKeyFormat, 2);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.setHmacKeyFormat = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.clearHmacKeyFormat = function () {
        return this.setHmacKeyFormat(void 0);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKeyFormat.prototype.hasHmacKeyFormat = function () {
        return null != jspb.Message.getField(this, 2);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesCtrHmacAeadKey.toObject(a, this);
    }, proto.google.crypto.tink.AesCtrHmacAeadKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), aesCtrKey: (c = b.getAesCtrKey()) && proto.google.crypto.tink.AesCtrKey.toObject(a, c), hmacKey: (c = b.getHmacKey()) && proto.google.crypto.tink.HmacKey.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.AesCtrHmacAeadKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesCtrHmacAeadKey;
        return proto.google.crypto.tink.AesCtrHmacAeadKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.AesCtrKey;
                    b.readMessage(c, proto.google.crypto.tink.AesCtrKey.deserializeBinaryFromReader);
                    a.setAesCtrKey(c);
                    break;
                case 3:
                    c = new proto.google.crypto.tink.HmacKey;
                    b.readMessage(c, proto.google.crypto.tink.HmacKey.deserializeBinaryFromReader);
                    a.setHmacKey(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesCtrHmacAeadKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getAesCtrKey();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.AesCtrKey.serializeBinaryToWriter);
        c = a.getHmacKey();
        null != c && b.writeMessage(3, c, proto.google.crypto.tink.HmacKey.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.getAesCtrKey = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.AesCtrKey, 2);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.setAesCtrKey = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.clearAesCtrKey = function () {
        return this.setAesCtrKey(void 0);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.hasAesCtrKey = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.getHmacKey = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.HmacKey, 3);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.setHmacKey = function (a) {
        return jspb.Message.setWrapperField(this, 3, a);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.clearHmacKey = function () {
        return this.setHmacKey(void 0);
    };
    proto.google.crypto.tink.AesCtrHmacAeadKey.prototype.hasHmacKey = function () {
        return null != jspb.Message.getField(this, 3);
    };
    proto.google.crypto.tink.AesGcmKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesGcmKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesGcmKeyFormat.displayName = "proto.google.crypto.tink.AesGcmKeyFormat");
    proto.google.crypto.tink.AesGcmKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesGcmKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesGcmKey.displayName = "proto.google.crypto.tink.AesGcmKey");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesGcmKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesGcmKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.AesGcmKeyFormat.toObject = function (a, b) {
        var c = { keySize: jspb.Message.getFieldWithDefault(b, 2, 0), version: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesGcmKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesGcmKeyFormat;
        return proto.google.crypto.tink.AesGcmKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesGcmKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 2:
                    var c = b.readUint32();
                    a.setKeySize(c);
                    break;
                case 3:
                    c = b.readUint32();
                    a.setVersion(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesGcmKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesGcmKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesGcmKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getKeySize();
        0 !== c && b.writeUint32(2, c);
        c = a.getVersion();
        0 !== c && b.writeUint32(3, c);
    };
    proto.google.crypto.tink.AesGcmKeyFormat.prototype.getKeySize = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.AesGcmKeyFormat.prototype.setKeySize = function (a) {
        return jspb.Message.setProto3IntField(this, 2, a);
    };
    proto.google.crypto.tink.AesGcmKeyFormat.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.AesGcmKeyFormat.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesGcmKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesGcmKey.toObject(a, this);
    }, proto.google.crypto.tink.AesGcmKey.toObject = function (a, b) {
        var c = { version: jspb.Message.getFieldWithDefault(b, 1, 0), keyValue: b.getKeyValue_asB64() };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesGcmKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesGcmKey;
        return proto.google.crypto.tink.AesGcmKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesGcmKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesGcmKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesGcmKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesGcmKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.AesGcmKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesGcmKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesGcmKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.AesGcmKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.AesGcmKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.AesGcmKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesGcmSivKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesGcmSivKeyFormat.displayName = "proto.google.crypto.tink.AesGcmSivKeyFormat");
    proto.google.crypto.tink.AesGcmSivKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.AesGcmSivKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.AesGcmSivKey.displayName = "proto.google.crypto.tink.AesGcmSivKey");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesGcmSivKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.AesGcmSivKeyFormat.toObject = function (a, b) {
        var c = { keySize: jspb.Message.getFieldWithDefault(b, 2, 0), version: jspb.Message.getFieldWithDefault(b, 1, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesGcmSivKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesGcmSivKeyFormat;
        return proto.google.crypto.tink.AesGcmSivKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 2:
                    var c = b.readUint32();
                    a.setKeySize(c);
                    break;
                case 1:
                    c = b.readUint32();
                    a.setVersion(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesGcmSivKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.serializeBinaryToWriter = function (a, b) {
        var c = a.getKeySize();
        0 !== c && b.writeUint32(2, c);
        c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.getKeySize = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.setKeySize = function (a) {
        return jspb.Message.setProto3IntField(this, 2, a);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesGcmSivKeyFormat.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.AesGcmSivKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.AesGcmSivKey.toObject(a, this);
    }, proto.google.crypto.tink.AesGcmSivKey.toObject = function (a, b) {
        var c = { version: jspb.Message.getFieldWithDefault(b, 1, 0), keyValue: b.getKeyValue_asB64() };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.AesGcmSivKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.AesGcmSivKey;
        return proto.google.crypto.tink.AesGcmSivKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.AesGcmSivKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.AesGcmSivKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.AesGcmSivKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.AesGcmSivKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    proto.google.crypto.tink.EcdsaParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EcdsaParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EcdsaParams.displayName = "proto.google.crypto.tink.EcdsaParams");
    proto.google.crypto.tink.EcdsaPublicKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EcdsaPublicKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EcdsaPublicKey.displayName = "proto.google.crypto.tink.EcdsaPublicKey");
    proto.google.crypto.tink.EcdsaPrivateKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EcdsaPrivateKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EcdsaPrivateKey.displayName = "proto.google.crypto.tink.EcdsaPrivateKey");
    proto.google.crypto.tink.EcdsaKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EcdsaKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EcdsaKeyFormat.displayName = "proto.google.crypto.tink.EcdsaKeyFormat");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EcdsaParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EcdsaParams.toObject(a, this);
    }, proto.google.crypto.tink.EcdsaParams.toObject = function (a, b) {
        var c = { hashType: jspb.Message.getFieldWithDefault(b, 1, 0), curve: jspb.Message.getFieldWithDefault(b, 2, 0), encoding: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.EcdsaParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EcdsaParams;
        return proto.google.crypto.tink.EcdsaParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EcdsaParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readEnum();
                    a.setHashType(c);
                    break;
                case 2:
                    c = b.readEnum();
                    a.setCurve(c);
                    break;
                case 3:
                    c = b.readEnum();
                    a.setEncoding(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EcdsaParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EcdsaParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EcdsaParams.serializeBinaryToWriter = function (a, b) {
        var c = a.getHashType();
        0.0 !== c && b.writeEnum(1, c);
        c = a.getCurve();
        0.0 !== c && b.writeEnum(2, c);
        c = a.getEncoding();
        0.0 !== c && b.writeEnum(3, c);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.getHashType = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.setHashType = function (a) {
        return jspb.Message.setProto3EnumField(this, 1, a);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.getCurve = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.setCurve = function (a) {
        return jspb.Message.setProto3EnumField(this, 2, a);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.getEncoding = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.EcdsaParams.prototype.setEncoding = function (a) {
        return jspb.Message.setProto3EnumField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EcdsaPublicKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EcdsaPublicKey.toObject(a, this);
    }, proto.google.crypto.tink.EcdsaPublicKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), params: (c = b.getParams()) && proto.google.crypto.tink.EcdsaParams.toObject(a, c), x: b.getX_asB64(), y: b.getY_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EcdsaPublicKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EcdsaPublicKey;
        return proto.google.crypto.tink.EcdsaPublicKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EcdsaPublicKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.EcdsaParams;
                    b.readMessage(c, proto.google.crypto.tink.EcdsaParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setX(c);
                    break;
                case 4:
                    c = b.readBytes();
                    a.setY(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EcdsaPublicKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EcdsaPublicKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.EcdsaParams.serializeBinaryToWriter);
        c = a.getX_asU8();
        0 < c.length && b.writeBytes(3, c);
        c = a.getY_asU8();
        0 < c.length && b.writeBytes(4, c);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EcdsaParams, 2);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getX = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getX_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getX());
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getX_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getX());
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.setX = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getY = function () {
        return jspb.Message.getFieldWithDefault(this, 4, "");
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getY_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getY());
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.getY_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getY());
    };
    proto.google.crypto.tink.EcdsaPublicKey.prototype.setY = function (a) {
        return jspb.Message.setProto3BytesField(this, 4, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EcdsaPrivateKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EcdsaPrivateKey.toObject(a, this);
    }, proto.google.crypto.tink.EcdsaPrivateKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), publicKey: (c = b.getPublicKey()) && proto.google.crypto.tink.EcdsaPublicKey.toObject(a, c), keyValue: b.getKeyValue_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EcdsaPrivateKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EcdsaPrivateKey;
        return proto.google.crypto.tink.EcdsaPrivateKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.EcdsaPublicKey;
                    b.readMessage(c, proto.google.crypto.tink.EcdsaPublicKey.deserializeBinaryFromReader);
                    a.setPublicKey(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EcdsaPrivateKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EcdsaPrivateKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getPublicKey();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.EcdsaPublicKey.serializeBinaryToWriter);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.getPublicKey = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EcdsaPublicKey, 2);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.setPublicKey = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.clearPublicKey = function () {
        return this.setPublicKey(void 0);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.hasPublicKey = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.EcdsaPrivateKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EcdsaKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EcdsaKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.EcdsaKeyFormat.toObject = function (a, b) {
        var c, d = { params: (c = b.getParams()) && proto.google.crypto.tink.EcdsaParams.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EcdsaKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EcdsaKeyFormat;
        return proto.google.crypto.tink.EcdsaKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EcdsaKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 2:
                    var c = new proto.google.crypto.tink.EcdsaParams;
                    b.readMessage(c, proto.google.crypto.tink.EcdsaParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EcdsaKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EcdsaKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EcdsaKeyFormat.serializeBinaryToWriter = function (a, b) {
        a = a.getParams();
        null != a && b.writeMessage(2, a, proto.google.crypto.tink.EcdsaParams.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.EcdsaKeyFormat.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EcdsaParams, 2);
    };
    proto.google.crypto.tink.EcdsaKeyFormat.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EcdsaKeyFormat.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.EcdsaKeyFormat.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EcdsaSignatureEncoding = { UNKNOWN_ENCODING: 0, IEEE_P1363: 1, DER: 2 };
    proto.google.crypto.tink.KeyTemplate = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.KeyTemplate, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.KeyTemplate.displayName = "proto.google.crypto.tink.KeyTemplate");
    proto.google.crypto.tink.KeyData = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.KeyData, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.KeyData.displayName = "proto.google.crypto.tink.KeyData");
    proto.google.crypto.tink.Keyset = function (a) {
        jspb.Message.initialize(this, a, 0, -1, proto.google.crypto.tink.Keyset.repeatedFields_, null);
    };
    goog.inherits(proto.google.crypto.tink.Keyset, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.Keyset.displayName = "proto.google.crypto.tink.Keyset");
    proto.google.crypto.tink.Keyset.Key = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.Keyset.Key, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.Keyset.Key.displayName = "proto.google.crypto.tink.Keyset.Key");
    proto.google.crypto.tink.KeysetInfo = function (a) {
        jspb.Message.initialize(this, a, 0, -1, proto.google.crypto.tink.KeysetInfo.repeatedFields_, null);
    };
    goog.inherits(proto.google.crypto.tink.KeysetInfo, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.KeysetInfo.displayName = "proto.google.crypto.tink.KeysetInfo");
    proto.google.crypto.tink.KeysetInfo.KeyInfo = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.KeysetInfo.KeyInfo, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.KeysetInfo.KeyInfo.displayName = "proto.google.crypto.tink.KeysetInfo.KeyInfo");
    proto.google.crypto.tink.EncryptedKeyset = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EncryptedKeyset, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EncryptedKeyset.displayName = "proto.google.crypto.tink.EncryptedKeyset");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.KeyTemplate.prototype.toObject = function (a) {
        return proto.google.crypto.tink.KeyTemplate.toObject(a, this);
    }, proto.google.crypto.tink.KeyTemplate.toObject = function (a, b) {
        var c = { typeUrl: jspb.Message.getFieldWithDefault(b, 1, ""), value: b.getValue_asB64(), outputPrefixType: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.KeyTemplate.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.KeyTemplate;
        return proto.google.crypto.tink.KeyTemplate.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.KeyTemplate.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readString();
                    a.setTypeUrl(c);
                    break;
                case 2:
                    c = b.readBytes();
                    a.setValue(c);
                    break;
                case 3:
                    c = b.readEnum();
                    a.setOutputPrefixType(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.KeyTemplate.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.KeyTemplate.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.KeyTemplate.serializeBinaryToWriter = function (a, b) {
        var c = a.getTypeUrl();
        0 < c.length && b.writeString(1, c);
        c = a.getValue_asU8();
        0 < c.length && b.writeBytes(2, c);
        c = a.getOutputPrefixType();
        0.0 !== c && b.writeEnum(3, c);
    };
    proto.google.crypto.tink.KeyTemplate.prototype.getTypeUrl = function () {
        return jspb.Message.getFieldWithDefault(this, 1, "");
    };
    proto.google.crypto.tink.KeyTemplate.prototype.setTypeUrl = function (a) {
        return jspb.Message.setProto3StringField(this, 1, a);
    };
    proto.google.crypto.tink.KeyTemplate.prototype.getValue = function () {
        return jspb.Message.getFieldWithDefault(this, 2, "");
    };
    proto.google.crypto.tink.KeyTemplate.prototype.getValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getValue());
    };
    proto.google.crypto.tink.KeyTemplate.prototype.getValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getValue());
    };
    proto.google.crypto.tink.KeyTemplate.prototype.setValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 2, a);
    };
    proto.google.crypto.tink.KeyTemplate.prototype.getOutputPrefixType = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.KeyTemplate.prototype.setOutputPrefixType = function (a) {
        return jspb.Message.setProto3EnumField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.KeyData.prototype.toObject = function (a) {
        return proto.google.crypto.tink.KeyData.toObject(a, this);
    }, proto.google.crypto.tink.KeyData.toObject = function (a, b) {
        var c = { typeUrl: jspb.Message.getFieldWithDefault(b, 1, ""), value: b.getValue_asB64(), keyMaterialType: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.KeyData.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.KeyData;
        return proto.google.crypto.tink.KeyData.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.KeyData.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readString();
                    a.setTypeUrl(c);
                    break;
                case 2:
                    c = b.readBytes();
                    a.setValue(c);
                    break;
                case 3:
                    c = b.readEnum();
                    a.setKeyMaterialType(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.KeyData.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.KeyData.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.KeyData.serializeBinaryToWriter = function (a, b) {
        var c = a.getTypeUrl();
        0 < c.length && b.writeString(1, c);
        c = a.getValue_asU8();
        0 < c.length && b.writeBytes(2, c);
        c = a.getKeyMaterialType();
        0.0 !== c && b.writeEnum(3, c);
    };
    proto.google.crypto.tink.KeyData.KeyMaterialType = { UNKNOWN_KEYMATERIAL: 0, SYMMETRIC: 1, ASYMMETRIC_PRIVATE: 2, ASYMMETRIC_PUBLIC: 3, REMOTE: 4 };
    proto.google.crypto.tink.KeyData.prototype.getTypeUrl = function () {
        return jspb.Message.getFieldWithDefault(this, 1, "");
    };
    proto.google.crypto.tink.KeyData.prototype.setTypeUrl = function (a) {
        return jspb.Message.setProto3StringField(this, 1, a);
    };
    proto.google.crypto.tink.KeyData.prototype.getValue = function () {
        return jspb.Message.getFieldWithDefault(this, 2, "");
    };
    proto.google.crypto.tink.KeyData.prototype.getValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getValue());
    };
    proto.google.crypto.tink.KeyData.prototype.getValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getValue());
    };
    proto.google.crypto.tink.KeyData.prototype.setValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 2, a);
    };
    proto.google.crypto.tink.KeyData.prototype.getKeyMaterialType = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.KeyData.prototype.setKeyMaterialType = function (a) {
        return jspb.Message.setProto3EnumField(this, 3, a);
    };
    proto.google.crypto.tink.Keyset.repeatedFields_ = [2];
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.Keyset.prototype.toObject = function (a) {
        return proto.google.crypto.tink.Keyset.toObject(a, this);
    }, proto.google.crypto.tink.Keyset.toObject = function (a, b) {
        var c = { primaryKeyId: jspb.Message.getFieldWithDefault(b, 1, 0), keyList: jspb.Message.toObjectList(b.getKeyList(), proto.google.crypto.tink.Keyset.Key.toObject, a) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.Keyset.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.Keyset;
        return proto.google.crypto.tink.Keyset.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.Keyset.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setPrimaryKeyId(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.Keyset.Key;
                    b.readMessage(c, proto.google.crypto.tink.Keyset.Key.deserializeBinaryFromReader);
                    a.addKey(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.Keyset.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.Keyset.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.Keyset.serializeBinaryToWriter = function (a, b) {
        var c = a.getPrimaryKeyId();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyList();
        0 < c.length && b.writeRepeatedMessage(2, c, proto.google.crypto.tink.Keyset.Key.serializeBinaryToWriter);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.Keyset.Key.prototype.toObject = function (a) {
        return proto.google.crypto.tink.Keyset.Key.toObject(a, this);
    }, proto.google.crypto.tink.Keyset.Key.toObject = function (a, b) {
        var c, d = { keyData: (c = b.getKeyData()) && proto.google.crypto.tink.KeyData.toObject(a, c), status: jspb.Message.getFieldWithDefault(b, 2, 0), keyId: jspb.Message.getFieldWithDefault(b, 3, 0), outputPrefixType: jspb.Message.getFieldWithDefault(b, 4, 0) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.Keyset.Key.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.Keyset.Key;
        return proto.google.crypto.tink.Keyset.Key.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.Keyset.Key.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.KeyData;
                    b.readMessage(c, proto.google.crypto.tink.KeyData.deserializeBinaryFromReader);
                    a.setKeyData(c);
                    break;
                case 2:
                    c = b.readEnum();
                    a.setStatus(c);
                    break;
                case 3:
                    c = b.readUint32();
                    a.setKeyId(c);
                    break;
                case 4:
                    c = b.readEnum();
                    a.setOutputPrefixType(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.Keyset.Key.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.Keyset.Key.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.Keyset.Key.serializeBinaryToWriter = function (a, b) {
        var c = a.getKeyData();
        null != c && b.writeMessage(1, c, proto.google.crypto.tink.KeyData.serializeBinaryToWriter);
        c = a.getStatus();
        0.0 !== c && b.writeEnum(2, c);
        c = a.getKeyId();
        0 !== c && b.writeUint32(3, c);
        c = a.getOutputPrefixType();
        0.0 !== c && b.writeEnum(4, c);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.getKeyData = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.KeyData, 1);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.setKeyData = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.clearKeyData = function () {
        return this.setKeyData(void 0);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.hasKeyData = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.getStatus = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.setStatus = function (a) {
        return jspb.Message.setProto3EnumField(this, 2, a);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.getKeyId = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.setKeyId = function (a) {
        return jspb.Message.setProto3IntField(this, 3, a);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.getOutputPrefixType = function () {
        return jspb.Message.getFieldWithDefault(this, 4, 0);
    };
    proto.google.crypto.tink.Keyset.Key.prototype.setOutputPrefixType = function (a) {
        return jspb.Message.setProto3EnumField(this, 4, a);
    };
    proto.google.crypto.tink.Keyset.prototype.getPrimaryKeyId = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.Keyset.prototype.setPrimaryKeyId = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.Keyset.prototype.getKeyList = function () {
        return jspb.Message.getRepeatedWrapperField(this, proto.google.crypto.tink.Keyset.Key, 2);
    };
    proto.google.crypto.tink.Keyset.prototype.setKeyList = function (a) {
        return jspb.Message.setRepeatedWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.Keyset.prototype.addKey = function (a, b) {
        return jspb.Message.addToRepeatedWrapperField(this, 2, a, proto.google.crypto.tink.Keyset.Key, b);
    };
    proto.google.crypto.tink.Keyset.prototype.clearKeyList = function () {
        return this.setKeyList([]);
    };
    proto.google.crypto.tink.KeysetInfo.repeatedFields_ = [2];
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.KeysetInfo.prototype.toObject = function (a) {
        return proto.google.crypto.tink.KeysetInfo.toObject(a, this);
    }, proto.google.crypto.tink.KeysetInfo.toObject = function (a, b) {
        var c = { primaryKeyId: jspb.Message.getFieldWithDefault(b, 1, 0), keyInfoList: jspb.Message.toObjectList(b.getKeyInfoList(), proto.google.crypto.tink.KeysetInfo.KeyInfo.toObject, a) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.KeysetInfo.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.KeysetInfo;
        return proto.google.crypto.tink.KeysetInfo.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.KeysetInfo.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setPrimaryKeyId(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.KeysetInfo.KeyInfo;
                    b.readMessage(c, proto.google.crypto.tink.KeysetInfo.KeyInfo.deserializeBinaryFromReader);
                    a.addKeyInfo(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.KeysetInfo.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.KeysetInfo.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.KeysetInfo.serializeBinaryToWriter = function (a, b) {
        var c = a.getPrimaryKeyId();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyInfoList();
        0 < c.length && b.writeRepeatedMessage(2, c, proto.google.crypto.tink.KeysetInfo.KeyInfo.serializeBinaryToWriter);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.toObject = function (a) {
        return proto.google.crypto.tink.KeysetInfo.KeyInfo.toObject(a, this);
    }, proto.google.crypto.tink.KeysetInfo.KeyInfo.toObject = function (a, b) {
        var c = { typeUrl: jspb.Message.getFieldWithDefault(b, 1, ""), status: jspb.Message.getFieldWithDefault(b, 2, 0), keyId: jspb.Message.getFieldWithDefault(b, 3, 0), outputPrefixType: jspb.Message.getFieldWithDefault(b, 4, 0) };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.KeysetInfo.KeyInfo.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.KeysetInfo.KeyInfo;
        return proto.google.crypto.tink.KeysetInfo.KeyInfo.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readString();
                    a.setTypeUrl(c);
                    break;
                case 2:
                    c = b.readEnum();
                    a.setStatus(c);
                    break;
                case 3:
                    c = b.readUint32();
                    a.setKeyId(c);
                    break;
                case 4:
                    c = b.readEnum();
                    a.setOutputPrefixType(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.KeysetInfo.KeyInfo.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.serializeBinaryToWriter = function (a, b) {
        var c = a.getTypeUrl();
        0 < c.length && b.writeString(1, c);
        c = a.getStatus();
        0.0 !== c && b.writeEnum(2, c);
        c = a.getKeyId();
        0 !== c && b.writeUint32(3, c);
        c = a.getOutputPrefixType();
        0.0 !== c && b.writeEnum(4, c);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.getTypeUrl = function () {
        return jspb.Message.getFieldWithDefault(this, 1, "");
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.setTypeUrl = function (a) {
        return jspb.Message.setProto3StringField(this, 1, a);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.getStatus = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.setStatus = function (a) {
        return jspb.Message.setProto3EnumField(this, 2, a);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.getKeyId = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.setKeyId = function (a) {
        return jspb.Message.setProto3IntField(this, 3, a);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.getOutputPrefixType = function () {
        return jspb.Message.getFieldWithDefault(this, 4, 0);
    };
    proto.google.crypto.tink.KeysetInfo.KeyInfo.prototype.setOutputPrefixType = function (a) {
        return jspb.Message.setProto3EnumField(this, 4, a);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.getPrimaryKeyId = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.setPrimaryKeyId = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.getKeyInfoList = function () {
        return jspb.Message.getRepeatedWrapperField(this, proto.google.crypto.tink.KeysetInfo.KeyInfo, 2);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.setKeyInfoList = function (a) {
        return jspb.Message.setRepeatedWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.addKeyInfo = function (a, b) {
        return jspb.Message.addToRepeatedWrapperField(this, 2, a, proto.google.crypto.tink.KeysetInfo.KeyInfo, b);
    };
    proto.google.crypto.tink.KeysetInfo.prototype.clearKeyInfoList = function () {
        return this.setKeyInfoList([]);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EncryptedKeyset.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EncryptedKeyset.toObject(a, this);
    }, proto.google.crypto.tink.EncryptedKeyset.toObject = function (a, b) {
        var c, d = { encryptedKeyset: b.getEncryptedKeyset_asB64(), keysetInfo: (c = b.getKeysetInfo()) && proto.google.crypto.tink.KeysetInfo.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EncryptedKeyset.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EncryptedKeyset;
        return proto.google.crypto.tink.EncryptedKeyset.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EncryptedKeyset.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 2:
                    var c = b.readBytes();
                    a.setEncryptedKeyset(c);
                    break;
                case 3:
                    c = new proto.google.crypto.tink.KeysetInfo;
                    b.readMessage(c, proto.google.crypto.tink.KeysetInfo.deserializeBinaryFromReader);
                    a.setKeysetInfo(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EncryptedKeyset.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EncryptedKeyset.serializeBinaryToWriter = function (a, b) {
        var c = a.getEncryptedKeyset_asU8();
        0 < c.length && b.writeBytes(2, c);
        c = a.getKeysetInfo();
        null != c && b.writeMessage(3, c, proto.google.crypto.tink.KeysetInfo.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.getEncryptedKeyset = function () {
        return jspb.Message.getFieldWithDefault(this, 2, "");
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.getEncryptedKeyset_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getEncryptedKeyset());
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.getEncryptedKeyset_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getEncryptedKeyset());
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.setEncryptedKeyset = function (a) {
        return jspb.Message.setProto3BytesField(this, 2, a);
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.getKeysetInfo = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.KeysetInfo, 3);
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.setKeysetInfo = function (a) {
        return jspb.Message.setWrapperField(this, 3, a);
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.clearKeysetInfo = function () {
        return this.setKeysetInfo(void 0);
    };
    proto.google.crypto.tink.EncryptedKeyset.prototype.hasKeysetInfo = function () {
        return null != jspb.Message.getField(this, 3);
    };
    proto.google.crypto.tink.KeyStatusType = { UNKNOWN_STATUS: 0, ENABLED: 1, DISABLED: 2, DESTROYED: 3 };
    proto.google.crypto.tink.OutputPrefixType = { UNKNOWN_PREFIX: 0, TINK: 1, LEGACY: 2, RAW: 3, CRUNCHY: 4 };
    proto.google.crypto.tink.EciesHkdfKemParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesHkdfKemParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesHkdfKemParams.displayName = "proto.google.crypto.tink.EciesHkdfKemParams");
    proto.google.crypto.tink.EciesAeadDemParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesAeadDemParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesAeadDemParams.displayName = "proto.google.crypto.tink.EciesAeadDemParams");
    proto.google.crypto.tink.EciesAeadHkdfParams = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesAeadHkdfParams, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesAeadHkdfParams.displayName = "proto.google.crypto.tink.EciesAeadHkdfParams");
    proto.google.crypto.tink.EciesAeadHkdfPublicKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesAeadHkdfPublicKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesAeadHkdfPublicKey.displayName = "proto.google.crypto.tink.EciesAeadHkdfPublicKey");
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesAeadHkdfPrivateKey, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesAeadHkdfPrivateKey.displayName = "proto.google.crypto.tink.EciesAeadHkdfPrivateKey");
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.EciesAeadHkdfKeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.EciesAeadHkdfKeyFormat.displayName = "proto.google.crypto.tink.EciesAeadHkdfKeyFormat");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesHkdfKemParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesHkdfKemParams.toObject(a, this);
    }, proto.google.crypto.tink.EciesHkdfKemParams.toObject = function (a, b) {
        var c = { curveType: jspb.Message.getFieldWithDefault(b, 1, 0), hkdfHashType: jspb.Message.getFieldWithDefault(b, 2, 0), hkdfSalt: b.getHkdfSalt_asB64() };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.EciesHkdfKemParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesHkdfKemParams;
        return proto.google.crypto.tink.EciesHkdfKemParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readEnum();
                    a.setCurveType(c);
                    break;
                case 2:
                    c = b.readEnum();
                    a.setHkdfHashType(c);
                    break;
                case 11:
                    c = b.readBytes();
                    a.setHkdfSalt(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesHkdfKemParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesHkdfKemParams.serializeBinaryToWriter = function (a, b) {
        var c = a.getCurveType();
        0.0 !== c && b.writeEnum(1, c);
        c = a.getHkdfHashType();
        0.0 !== c && b.writeEnum(2, c);
        c = a.getHkdfSalt_asU8();
        0 < c.length && b.writeBytes(11, c);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.getCurveType = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.setCurveType = function (a) {
        return jspb.Message.setProto3EnumField(this, 1, a);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.getHkdfHashType = function () {
        return jspb.Message.getFieldWithDefault(this, 2, 0);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.setHkdfHashType = function (a) {
        return jspb.Message.setProto3EnumField(this, 2, a);
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.getHkdfSalt = function () {
        return jspb.Message.getFieldWithDefault(this, 11, "");
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.getHkdfSalt_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getHkdfSalt());
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.getHkdfSalt_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getHkdfSalt());
    };
    proto.google.crypto.tink.EciesHkdfKemParams.prototype.setHkdfSalt = function (a) {
        return jspb.Message.setProto3BytesField(this, 11, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesAeadDemParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesAeadDemParams.toObject(a, this);
    }, proto.google.crypto.tink.EciesAeadDemParams.toObject = function (a, b) {
        var c, d = { aeadDem: (c = b.getAeadDem()) && proto.google.crypto.tink.KeyTemplate.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EciesAeadDemParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesAeadDemParams;
        return proto.google.crypto.tink.EciesAeadDemParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesAeadDemParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 2:
                    var c = new proto.google.crypto.tink.KeyTemplate;
                    b.readMessage(c, proto.google.crypto.tink.KeyTemplate.deserializeBinaryFromReader);
                    a.setAeadDem(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesAeadDemParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesAeadDemParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesAeadDemParams.serializeBinaryToWriter = function (a, b) {
        a = a.getAeadDem();
        null != a && b.writeMessage(2, a, proto.google.crypto.tink.KeyTemplate.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.EciesAeadDemParams.prototype.getAeadDem = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.KeyTemplate, 2);
    };
    proto.google.crypto.tink.EciesAeadDemParams.prototype.setAeadDem = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EciesAeadDemParams.prototype.clearAeadDem = function () {
        return this.setAeadDem(void 0);
    };
    proto.google.crypto.tink.EciesAeadDemParams.prototype.hasAeadDem = function () {
        return null != jspb.Message.getField(this, 2);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesAeadHkdfParams.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesAeadHkdfParams.toObject(a, this);
    }, proto.google.crypto.tink.EciesAeadHkdfParams.toObject = function (a, b) {
        var c, d = { kemParams: (c = b.getKemParams()) && proto.google.crypto.tink.EciesHkdfKemParams.toObject(a, c), demParams: (c = b.getDemParams()) && proto.google.crypto.tink.EciesAeadDemParams.toObject(a, c), ecPointFormat: jspb.Message.getFieldWithDefault(b, 3, 0) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EciesAeadHkdfParams.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesAeadHkdfParams;
        return proto.google.crypto.tink.EciesAeadHkdfParams.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.EciesHkdfKemParams;
                    b.readMessage(c, proto.google.crypto.tink.EciesHkdfKemParams.deserializeBinaryFromReader);
                    a.setKemParams(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.EciesAeadDemParams;
                    b.readMessage(c, proto.google.crypto.tink.EciesAeadDemParams.deserializeBinaryFromReader);
                    a.setDemParams(c);
                    break;
                case 3:
                    c = b.readEnum();
                    a.setEcPointFormat(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesAeadHkdfParams.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.serializeBinaryToWriter = function (a, b) {
        var c = a.getKemParams();
        null != c && b.writeMessage(1, c, proto.google.crypto.tink.EciesHkdfKemParams.serializeBinaryToWriter);
        c = a.getDemParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.EciesAeadDemParams.serializeBinaryToWriter);
        c = a.getEcPointFormat();
        0.0 !== c && b.writeEnum(3, c);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.getKemParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EciesHkdfKemParams, 1);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.setKemParams = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.clearKemParams = function () {
        return this.setKemParams(void 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.hasKemParams = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.getDemParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EciesAeadDemParams, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.setDemParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.clearDemParams = function () {
        return this.setDemParams(void 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.hasDemParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.getEcPointFormat = function () {
        return jspb.Message.getFieldWithDefault(this, 3, 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfParams.prototype.setEcPointFormat = function (a) {
        return jspb.Message.setProto3EnumField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesAeadHkdfPublicKey.toObject(a, this);
    }, proto.google.crypto.tink.EciesAeadHkdfPublicKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), params: (c = b.getParams()) && proto.google.crypto.tink.EciesAeadHkdfParams.toObject(a, c), x: b.getX_asB64(), y: b.getY_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesAeadHkdfPublicKey;
        return proto.google.crypto.tink.EciesAeadHkdfPublicKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.EciesAeadHkdfParams;
                    b.readMessage(c, proto.google.crypto.tink.EciesAeadHkdfParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setX(c);
                    break;
                case 4:
                    c = b.readBytes();
                    a.setY(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesAeadHkdfPublicKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getParams();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.EciesAeadHkdfParams.serializeBinaryToWriter);
        c = a.getX_asU8();
        0 < c.length && b.writeBytes(3, c);
        c = a.getY_asU8();
        0 < c.length && b.writeBytes(4, c);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EciesAeadHkdfParams, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getX = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getX_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getX());
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getX_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getX());
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.setX = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getY = function () {
        return jspb.Message.getFieldWithDefault(this, 4, "");
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getY_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getY());
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.getY_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getY());
    };
    proto.google.crypto.tink.EciesAeadHkdfPublicKey.prototype.setY = function (a) {
        return jspb.Message.setProto3BytesField(this, 4, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesAeadHkdfPrivateKey.toObject(a, this);
    }, proto.google.crypto.tink.EciesAeadHkdfPrivateKey.toObject = function (a, b) {
        var c, d = { version: jspb.Message.getFieldWithDefault(b, 1, 0), publicKey: (c = b.getPublicKey()) && proto.google.crypto.tink.EciesAeadHkdfPublicKey.toObject(a, c), keyValue: b.getKeyValue_asB64() };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesAeadHkdfPrivateKey;
        return proto.google.crypto.tink.EciesAeadHkdfPrivateKey.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 2:
                    c = new proto.google.crypto.tink.EciesAeadHkdfPublicKey;
                    b.readMessage(c, proto.google.crypto.tink.EciesAeadHkdfPublicKey.deserializeBinaryFromReader);
                    a.setPublicKey(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesAeadHkdfPrivateKey.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getPublicKey();
        null != c && b.writeMessage(2, c, proto.google.crypto.tink.EciesAeadHkdfPublicKey.serializeBinaryToWriter);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.getPublicKey = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EciesAeadHkdfPublicKey, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.setPublicKey = function (a) {
        return jspb.Message.setWrapperField(this, 2, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.clearPublicKey = function () {
        return this.setPublicKey(void 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.hasPublicKey = function () {
        return null != jspb.Message.getField(this, 2);
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.EciesAeadHkdfPrivateKey.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.EciesAeadHkdfKeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.EciesAeadHkdfKeyFormat.toObject = function (a, b) {
        var c, d = { params: (c = b.getParams()) && proto.google.crypto.tink.EciesAeadHkdfParams.toObject(a, c) };
        a && (d.$jspbMessageInstance = b);
        return d;
    });
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.EciesAeadHkdfKeyFormat;
        return proto.google.crypto.tink.EciesAeadHkdfKeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = new proto.google.crypto.tink.EciesAeadHkdfParams;
                    b.readMessage(c, proto.google.crypto.tink.EciesAeadHkdfParams.deserializeBinaryFromReader);
                    a.setParams(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.EciesAeadHkdfKeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.serializeBinaryToWriter = function (a, b) {
        a = a.getParams();
        null != a && b.writeMessage(1, a, proto.google.crypto.tink.EciesAeadHkdfParams.serializeBinaryToWriter);
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.getParams = function () {
        return jspb.Message.getWrapperField(this, proto.google.crypto.tink.EciesAeadHkdfParams, 1);
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.setParams = function (a) {
        return jspb.Message.setWrapperField(this, 1, a);
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.clearParams = function () {
        return this.setParams(void 0);
    };
    proto.google.crypto.tink.EciesAeadHkdfKeyFormat.prototype.hasParams = function () {
        return null != jspb.Message.getField(this, 1);
    };
    proto.google.crypto.tink.XChaCha20Poly1305KeyFormat = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.XChaCha20Poly1305KeyFormat, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.displayName = "proto.google.crypto.tink.XChaCha20Poly1305KeyFormat");
    proto.google.crypto.tink.XChaCha20Poly1305Key = function (a) {
        jspb.Message.initialize(this, a, 0, -1, null, null);
    };
    goog.inherits(proto.google.crypto.tink.XChaCha20Poly1305Key, jspb.Message);
    goog.DEBUG && !COMPILED && (proto.google.crypto.tink.XChaCha20Poly1305Key.displayName = "proto.google.crypto.tink.XChaCha20Poly1305Key");
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.prototype.toObject = function (a) {
        return proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.toObject(a, this);
    }, proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.toObject = function (a, b) {
        var c = {};
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.XChaCha20Poly1305KeyFormat;
        return proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            b.getFieldNumber(), b.skipField();
        }
        return a;
    };
    proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.XChaCha20Poly1305KeyFormat.serializeBinaryToWriter = function (a, b) {
    };
    jspb.Message.GENERATE_TO_OBJECT && (proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.toObject = function (a) {
        return proto.google.crypto.tink.XChaCha20Poly1305Key.toObject(a, this);
    }, proto.google.crypto.tink.XChaCha20Poly1305Key.toObject = function (a, b) {
        var c = { version: jspb.Message.getFieldWithDefault(b, 1, 0), keyValue: b.getKeyValue_asB64() };
        a && (c.$jspbMessageInstance = b);
        return c;
    });
    proto.google.crypto.tink.XChaCha20Poly1305Key.deserializeBinary = function (a) {
        a = new jspb.BinaryReader(a);
        var b = new proto.google.crypto.tink.XChaCha20Poly1305Key;
        return proto.google.crypto.tink.XChaCha20Poly1305Key.deserializeBinaryFromReader(b, a);
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.deserializeBinaryFromReader = function (a, b) {
        for (; b.nextField() && !b.isEndGroup();) {
            switch (b.getFieldNumber()) {
                case 1:
                    var c = b.readUint32();
                    a.setVersion(c);
                    break;
                case 3:
                    c = b.readBytes();
                    a.setKeyValue(c);
                    break;
                default:
                    b.skipField();
            }
        }
        return a;
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.serializeBinary = function () {
        var a = new jspb.BinaryWriter;
        proto.google.crypto.tink.XChaCha20Poly1305Key.serializeBinaryToWriter(this, a);
        return a.getResultBuffer();
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.serializeBinaryToWriter = function (a, b) {
        var c = a.getVersion();
        0 !== c && b.writeUint32(1, c);
        c = a.getKeyValue_asU8();
        0 < c.length && b.writeBytes(3, c);
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.getVersion = function () {
        return jspb.Message.getFieldWithDefault(this, 1, 0);
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.setVersion = function (a) {
        return jspb.Message.setProto3IntField(this, 1, a);
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.getKeyValue = function () {
        return jspb.Message.getFieldWithDefault(this, 3, "");
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.getKeyValue_asB64 = function () {
        return jspb.Message.bytesAsB64(this.getKeyValue());
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.getKeyValue_asU8 = function () {
        return jspb.Message.bytesAsU8(this.getKeyValue());
    };
    proto.google.crypto.tink.XChaCha20Poly1305Key.prototype.setKeyValue = function (a) {
        return jspb.Message.setProto3BytesField(this, 3, a);
    };
    var module$exported$epm$proto = {};
    PbMessage = jspb.Message;
    PbAesCmacKey = proto.google.crypto.tink.AesCmacKey;
    PbAesCmacKeyFormat = proto.google.crypto.tink.AesCmacKeyFormat;
    PbAesCmacParams = proto.google.crypto.tink.AesCmacParams;
    PbAesCtrHmacAeadKey = proto.google.crypto.tink.AesCtrHmacAeadKey;
    PbAesCtrHmacAeadKeyFormat = proto.google.crypto.tink.AesCtrHmacAeadKeyFormat;
    PbAesCtrKey = proto.google.crypto.tink.AesCtrKey;
    PbAesCtrKeyFormat = proto.google.crypto.tink.AesCtrKeyFormat;
    PbAesCtrParams = proto.google.crypto.tink.AesCtrParams;
    PbAesGcmKey = proto.google.crypto.tink.AesGcmKey;
    PbAesGcmKeyFormat = proto.google.crypto.tink.AesGcmKeyFormat;
    PbAesGcmSivKey = proto.google.crypto.tink.AesGcmSivKey;
    PbAesGcmSivKeyFormat = proto.google.crypto.tink.AesGcmSivKeyFormat;
    PbEcdsaKeyFormat = proto.google.crypto.tink.EcdsaKeyFormat;
    PbEcdsaParams = proto.google.crypto.tink.EcdsaParams;
    PbEcdsaPrivateKey = proto.google.crypto.tink.EcdsaPrivateKey;
    PbEcdsaPublicKey = proto.google.crypto.tink.EcdsaPublicKey;
    PbEcdsaSignatureEncoding = proto.google.crypto.tink.EcdsaSignatureEncoding;
    PbEciesAeadDemParams = proto.google.crypto.tink.EciesAeadDemParams;
    PbEciesAeadHkdfKeyFormat = proto.google.crypto.tink.EciesAeadHkdfKeyFormat;
    PbEciesAeadHkdfParams = proto.google.crypto.tink.EciesAeadHkdfParams;
    PbEciesAeadHkdfPrivateKey = proto.google.crypto.tink.EciesAeadHkdfPrivateKey;
    PbEciesAeadHkdfPublicKey = proto.google.crypto.tink.EciesAeadHkdfPublicKey;
    PbEciesHkdfKemParams = proto.google.crypto.tink.EciesHkdfKemParams;
    PbPointFormat = proto.google.crypto.tink.EcPointFormat;
    PbEllipticCurveType = proto.google.crypto.tink.EllipticCurveType;
    PbEncryptedKeyset = proto.google.crypto.tink.EncryptedKeyset;
    PbHashType = proto.google.crypto.tink.HashType;
    PbHmacKey = proto.google.crypto.tink.HmacKey;
    PbHmacKeyFormat = proto.google.crypto.tink.HmacKeyFormat;
    PbHmacParams = proto.google.crypto.tink.HmacParams;
    PbKeyData = proto.google.crypto.tink.KeyData;
    PbKeyMaterialType = proto.google.crypto.tink.KeyData.KeyMaterialType;
    PbKeyset = proto.google.crypto.tink.Keyset;
    PbKeysetKey = proto.google.crypto.tink.Keyset.Key;
    PbKeysetInfo = proto.google.crypto.tink.KeysetInfo;
    PbKeyStatusType = proto.google.crypto.tink.KeyStatusType;
    PbKeyTemplate = proto.google.crypto.tink.KeyTemplate;
    PbOutputPrefixType = proto.google.crypto.tink.OutputPrefixType;
    PbXChaCha20Poly1305Key = proto.google.crypto.tink.XChaCha20Poly1305Key;
    PbXChaCha20Poly1305KeyFormat = proto.google.crypto.tink.XChaCha20Poly1305KeyFormat;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Exception used when a function receives an invalid argument.
     */
    var InvalidArgumentsException = /** @class */ (function (_super) {
        tslib.__extends(InvalidArgumentsException, _super);
        function InvalidArgumentsException(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, InvalidArgumentsException.prototype);
            return _this;
        }
        return InvalidArgumentsException;
    }(Error));
    InvalidArgumentsException.prototype.name = 'InvalidArgumentsException';
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Does near constant time byte array comparison.
     * @param ba1 The first bytearray to check.
     * @param ba2 The second bytearray to check.
     * @return If the array are equal.
     */
    function isEqual(ba1, ba2) {
        if (ba1.length !== ba2.length) {
            return false;
        }
        var result = 0;
        for (var i = 0; i < ba1.length; i++) {
            result |= ba1[i] ^ ba2[i];
        }
        return result == 0;
    }
    /**
     * Returns a new array that is the result of joining the arguments.
     */
    function concat() {
        var var_args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            var_args[_i] = arguments[_i];
        }
        var length = 0;
        for (var i = 0; i < arguments.length; i++) {
            length += arguments[i].length;
        }
        var result = new Uint8Array(length);
        var curOffset = 0;
        for (var i = 0; i < arguments.length; i++) {
            result.set(arguments[i], curOffset);
            curOffset += arguments[i].length;
        }
        return result;
    }
    /**
     * Converts a non-negative integer number to a 64-bit big-endian byte array.
     * @param value The number to convert.
     * @return The number as a big-endian byte array.
     * @throws {InvalidArgumentsException}
     * @static
     */
    function fromNumber(value) {
        if (Number.isNaN(value) || value % 1 !== 0) {
            throw new InvalidArgumentsException('cannot convert non-integer value');
        }
        if (value < 0) {
            throw new InvalidArgumentsException('cannot convert negative number');
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new InvalidArgumentsException('cannot convert number larger than ' + Number.MAX_SAFE_INTEGER);
        }
        var twoPower32 = Math.pow(2, 32);
        var low = value % twoPower32;
        var high = value / twoPower32;
        var result = new Uint8Array(8);
        for (var i = 7; i >= 4; i--) {
            result[i] = low & 255;
            low >>>= 8;
        }
        for (var i = 3; i >= 0; i--) {
            result[i] = high & 255;
            high >>>= 8;
        }
        return result;
    }
    /**
     * Converts the hex string to a byte array.
     *
     * @param hex the input
     * @return the byte array output
     * @throws {!InvalidArgumentsException}
     * @static
     */
    function fromHex(hex) {
        if (hex.length % 2 != 0) {
            throw new InvalidArgumentsException('Hex string length must be multiple of 2');
        }
        var arr = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) {
            arr[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return arr;
    }
    /**
     * Converts a byte array to hex.
     *
     * @param bytes the byte array input
     * @return hex the output
     * @static
     */
    function toHex(bytes) {
        var result = '';
        for (var i = 0; i < bytes.length; i++) {
            var hexByte = bytes[i].toString(16);
            result += hexByte.length > 1 ? hexByte : '0' + hexByte;
        }
        return result;
    }
    /**
     * Converts the Base64 string to a byte array.
     *
     * @param encoded the base64 string
     * @param opt_webSafe True indicates we should use the alternative
     *     alphabet, which does not require escaping for use in URLs.
     * @return the byte array output
     * @static
     */
    function fromBase64(encoded, opt_webSafe) {
        if (opt_webSafe) {
            var normalBase64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
            return fromByteString(window.atob(normalBase64));
        }
        return fromByteString(window.atob(encoded));
    }
    /**
     * Base64 encode a byte array.
     *
     * @param bytes the byte array input
     * @param opt_webSafe True indicates we should use the alternative
     *     alphabet, which does not require escaping for use in URLs.
     * @return base64 output
     * @static
     */
    function toBase64(bytes, opt_webSafe) {
        var encoded = window
            .btoa(
        /* padding */
        toByteString(bytes))
            .replace(/=/g, '');
        if (opt_webSafe) {
            return encoded.replace(/\+/g, '-').replace(/\//g, '_');
        }
        return encoded;
    }
    /**
     * Converts a byte string to a byte array. Only support ASCII and Latin-1
     * strings, does not support multi-byte characters.
     *
     * @param str the input
     * @return the byte array output
     * @static
     */
    function fromByteString(str) {
        var output = [];
        var p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            output[p++] = c;
        }
        return new Uint8Array(output);
    }
    /**
     * Turns a byte array into the string given by the concatenation of the
     * characters to which the numbers correspond. Each byte is corresponding to a
     * character. Does not support multi-byte characters.
     *
     * @param bytes Array of numbers representing
     *     characters.
     * @return Stringification of the array.
     */
    function toByteString(bytes) {
        var str = '';
        for (var i = 0; i < bytes.length; i += 1) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Supported elliptic curves.
     */
    var CurveType;
    (function (CurveType) {
        CurveType[CurveType["P256"] = 1] = "P256";
        CurveType[CurveType["P384"] = 2] = "P384";
        CurveType[CurveType["P521"] = 3] = "P521";
    })(CurveType || (CurveType = {}));
    /**
     * Supported point format.
     */
    var PointFormatType;
    (function (PointFormatType) {
        PointFormatType[PointFormatType["UNCOMPRESSED"] = 1] = "UNCOMPRESSED";
        PointFormatType[PointFormatType["COMPRESSED"] = 2] = "COMPRESSED";
        // Like UNCOMPRESSED but without the \x04 prefix. Crunchy uses this format.
        // DO NOT USE unless you are a Crunchy user moving to Tink.
        PointFormatType[PointFormatType["DO_NOT_USE_CRUNCHY_UNCOMPRESSED"] = 3] = "DO_NOT_USE_CRUNCHY_UNCOMPRESSED";
    })(PointFormatType || (PointFormatType = {}));
    /**
     * Supported ECDSA signature encoding.
     */
    var EcdsaSignatureEncodingType;
    (function (EcdsaSignatureEncodingType) {
        // The DER signature is encoded using ASN.1
        // (https://tools.ietf.org/html/rfc5480#appendix-A):
        // ECDSA-Sig-Value :: = SEQUENCE { r INTEGER, s INTEGER }. In particular, the
        // encoding is:
        // 0x30 || totalLength || 0x02 || r's length || r || 0x02 || s's length || s.
        EcdsaSignatureEncodingType[EcdsaSignatureEncodingType["DER"] = 1] = "DER";
        // The IEEE_P1363 signature's format is r || s, where r and s are zero-padded
        // and have the same size in bytes as the order of the curve. For example, for
        // NIST P-256 curve, r and s are zero-padded to 32 bytes.
        EcdsaSignatureEncodingType[EcdsaSignatureEncodingType["IEEE_P1363"] = 2] = "IEEE_P1363";
    })(EcdsaSignatureEncodingType || (EcdsaSignatureEncodingType = {}));
    /**
     * Transform an ECDSA signature in DER encoding to IEEE P1363 encoding.
     *
     * @param der the ECDSA signature in DER encoding
     * @param ieeeLength the length of the ECDSA signature in IEEE
     *     encoding. This is usually 2 * size of the elliptic curve field.
     * @return ECDSA signature in IEEE encoding
     */
    function ecdsaDer2Ieee(der, ieeeLength) {
        if (!isValidDerEcdsaSignature(der)) {
            throw new InvalidArgumentsException('invalid DER signature');
        }
        if (!Number.isInteger(ieeeLength) || ieeeLength < 0) {
            throw new InvalidArgumentsException('ieeeLength must be a nonnegative integer');
        }
        var ieee = new Uint8Array(ieeeLength);
        var length = der[1] & 255;
        var offset = 1 +
            /* 0x30 */
            1;
        /* totalLength */
        if (length >= 128) {
            offset++;
        }
        // Long form length
        offset++;
        // 0x02
        var rLength = der[offset++];
        var extraZero = 0;
        if (der[offset] === 0) {
            extraZero = 1;
        }
        var rOffset = ieeeLength / 2 - rLength + extraZero;
        ieee.set(der.subarray(offset + extraZero, offset + rLength), rOffset);
        offset += rLength +
            /* r byte array */
            1;
        /* 0x02 */
        var sLength = der[offset++];
        extraZero = 0;
        if (der[offset] === 0) {
            extraZero = 1;
        }
        var sOffset = ieeeLength - sLength + extraZero;
        ieee.set(der.subarray(offset + extraZero, offset + sLength), sOffset);
        return ieee;
    }
    /**
     * Transform an ECDSA signature in IEEE 1363 encoding to DER encoding.
     *
     * @param ieee the ECDSA signature in IEEE encoding
     * @return ECDSA signature in DER encoding
     */
    function ecdsaIeee2Der(ieee) {
        if (ieee.length % 2 != 0 || ieee.length == 0 || ieee.length > 132) {
            throw new InvalidArgumentsException('Invalid IEEE P1363 signature encoding. Length: ' + ieee.length);
        }
        var r = toUnsignedBigNum(ieee.subarray(0, ieee.length / 2));
        var s = toUnsignedBigNum(ieee.subarray(ieee.length / 2, ieee.length));
        var offset = 0;
        var length = 1 + 1 + r.length + 1 + 1 + s.length;
        var der;
        if (length >= 128) {
            der = new Uint8Array(length + 3);
            der[offset++] = 48;
            der[offset++] = 128 + 1;
            der[offset++] = length;
        }
        else {
            der = new Uint8Array(length + 2);
            der[offset++] = 48;
            der[offset++] = length;
        }
        der[offset++] = 2;
        der[offset++] = r.length;
        der.set(r, offset);
        offset += r.length;
        der[offset++] = 2;
        der[offset++] = s.length;
        der.set(s, offset);
        return der;
    }
    /**
     * Validate that the ECDSA signature is in DER encoding, based on
     * https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki.
     *
     * @param sig an ECDSA siganture
     */
    function isValidDerEcdsaSignature(sig) {
        // Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
        // * total-length: 1-byte or 2-byte length descriptor of everything that
        // follows.
        // * R-length: 1-byte length descriptor of the R value that follows.
        // * R: arbitrary-length big-endian encoded R value. It must use the shortest
        //   possible encoding for a positive integers (which means no null bytes at
        //   the start, except a single one when the next byte has its highest bit
        //   set).
        // * S-length: 1-byte length descriptor of the S value that follows.
        // * S: arbitrary-length big-endian encoded S value. The same rules apply.
        /* S */
        if (sig.length < 1 +
            /* 0x30 */
            1 +
            /* total-length */
            1 +
            /* 0x02 */
            1 +
            /* R-length */
            1 +
            /* R */
            1 +
            /* 0x02 */
            1 +
            /* S-length */
            1) {
            // Signature is too short.
            return false;
        }
        // Checking bytes from left to right.
        // byte #1: a signature is of type 0x30 (compound).
        if (sig[0] != 48) {
            return false;
        }
        // byte #2 and maybe #3: the total length of the signature.
        var totalLen = sig[1] & 255;
        var totalLenLen = 1;
        // the length of the total length field, could be 2-byte.
        if (totalLen == 129) {
            // The signature is >= 128 bytes thus total length field is in long-form
            // encoding and occupies 2 bytes.
            totalLenLen = 2;
            // byte #3 is the total length.
            totalLen = sig[2] & 255;
            if (totalLen < 128) {
                // Length in long-form encoding must be >= 128.
                return false;
            }
        }
        else if (totalLen == 128 || totalLen > 129) {
            // Impossible values for the second byte.
            return false;
        }
        // Make sure the length covers the entire sig.
        if (totalLen != sig.length - 1 - totalLenLen) {
            return false;
        }
        // Start checking R.
        // Check whether the R element is an integer.
        if (sig[1 + totalLenLen] != 2) {
            return false;
        }
        // Extract the length of the R element.
        var rLen = sig[1 +
            /* 0x30 */
            totalLenLen + 1] &
            /* 0x02 */
            255;
        // Make sure the length of the S element is still inside the signature.
        if (1 +
            /* 0x30 */
            totalLenLen + 1 +
            /* 0x02 */
            1 +
            /* rLen */
            rLen + 1 >=
            /* 0x02 */
            sig.length) {
            return false;
        }
        // Zero-length integers are not allowed for R.
        if (rLen == 0) {
            return false;
        }
        // Negative numbers are not allowed for R.
        if ((sig[3 + totalLenLen] & 255) >= 128) {
            return false;
        }
        // Null bytes at the start of R are not allowed, unless R would
        // otherwise be interpreted as a negative number.
        if (rLen > 1 && sig[3 + totalLenLen] == 0 &&
            (sig[4 + totalLenLen] & 255) < 128) {
            return false;
        }
        // Start checking S.
        // Check whether the S element is an integer.
        if (sig[3 + totalLenLen + rLen] != 2) {
            return false;
        }
        // Extract the length of the S element.
        var sLen = sig[1 +
            /* 0x30 */
            totalLenLen + 1 +
            /* 0x02 */
            1 +
            /* rLen */
            rLen + 1] &
            /* 0x02 */
            255;
        // Verify that the length of the signature matches the sum of the length of
        // the elements.
        if (1 +
            /* 0x30 */
            totalLenLen + 1 +
            /* 0x02 */
            1 +
            /* rLen */
            rLen + 1 +
            /* 0x02 */
            1 +
            /* sLen */
            sLen !=
            sig.length) {
            return false;
        }
        // Zero-length integers are not allowed for S.
        if (sLen == 0) {
            return false;
        }
        // Negative numbers are not allowed for S.
        if ((sig[5 + totalLenLen + rLen] & 255) >= 128) {
            return false;
        }
        // Null bytes at the start of S are not allowed, unless S would
        // otherwise be interpreted as a negative number.
        if (sLen > 1 && sig[5 + totalLenLen + rLen] == 0 &&
            (sig[6 + totalLenLen + rLen] & 255) < 128) {
            return false;
        }
        return true;
    }
    /**
     * Transform a big integer in big endian to minimal unsigned form which has
     * no extra zero at the beginning except when the highest bit is set.
     *
     */
    function toUnsignedBigNum(bytes) {
        // Remove zero prefixes.
        var start = 0;
        while (start < bytes.length && bytes[start] == 0) {
            start++;
        }
        if (start == bytes.length) {
            start = bytes.length - 1;
        }
        var extraZero = 0;
        // If the 1st bit is not zero, add 1 zero byte.
        if ((bytes[start] & 128) == 128) {
            // Add extra zero.
            extraZero = 1;
        }
        var res = new Uint8Array(bytes.length - start + extraZero);
        res.set(bytes.subarray(start), extraZero);
        return res;
    }
    function curveToString(curve) {
        switch (curve) {
            case CurveType.P256:
                return 'P-256';
            case CurveType.P384:
                return 'P-384';
            case CurveType.P521:
                return 'P-521';
        }
        throw new InvalidArgumentsException('unknown curve: ' + curve);
    }
    function curveFromString(curve) {
        switch (curve) {
            case 'P-256':
                return CurveType.P256;
            case 'P-384':
                return CurveType.P384;
            case 'P-521':
                return CurveType.P521;
        }
        throw new InvalidArgumentsException('unknown curve: ' + curve);
    }
    function pointEncode(curve, format, point) {
        var fieldSize = fieldSizeInBytes(curveFromString(curve));
        switch (format) {
            case PointFormatType.UNCOMPRESSED:
                var x = point.x, y = point.y;
                if (x === undefined) {
                    throw new InvalidArgumentsException('x must be provided');
                }
                if (y === undefined) {
                    throw new InvalidArgumentsException('y must be provided');
                }
                var result = new Uint8Array(1 + 2 * fieldSize);
                result[0] = 4;
                result.set(
                /* opt_webSafe = */
                fromBase64(x, true), 1);
                result.set(
                /* opt_webSafe = */
                fromBase64(y, true), 1 + fieldSize);
                return result;
        }
        throw new InvalidArgumentsException('invalid format');
    }
    function pointDecode(curve, format, point) {
        var fieldSize = fieldSizeInBytes(curveFromString(curve));
        switch (format) {
            case PointFormatType.UNCOMPRESSED:
                if (point.length != 1 + 2 * fieldSize || point[0] != 4) {
                    throw new InvalidArgumentsException('invalid point');
                }
                var result = {
                    'kty': 'EC',
                    'crv': curve,
                    'x': toBase64(new Uint8Array(point.subarray(1, 1 + fieldSize)), 
                    /* websafe */
                    true),
                    'y': toBase64(new Uint8Array(point.subarray(1 + fieldSize, point.length)), 
                    /* websafe */
                    true),
                    'ext': true
                };
                return result;
        }
        throw new InvalidArgumentsException('invalid format');
    }
    function getJsonWebKey(curve, x, y, d) {
        var key = {
            'kty': 'EC',
            'crv': curveToString(curve),
            'x': toBase64(x, 
            /* websafe */
            true),
            'y': toBase64(y, 
            /* websafe */
            true),
            'ext': true
        };
        if (d) {
            key['d'] = toBase64(d, 
            /* websafe */
            true);
        }
        return key;
    }
    function fieldSizeInBytes(curve) {
        switch (curve) {
            case CurveType.P256:
                return 32;
            case CurveType.P384:
                return 48;
            case CurveType.P521:
                return 66;
        }
        throw new InvalidArgumentsException('unknown curve: ' + curve);
    }
    function encodingSizeInBytes(curve, pointFormat) {
        switch (pointFormat) {
            case PointFormatType.UNCOMPRESSED:
                return 2 * fieldSizeInBytes(curve) + 1;
            case PointFormatType.COMPRESSED:
                return fieldSizeInBytes(curve) + 1;
            case PointFormatType.DO_NOT_USE_CRUNCHY_UNCOMPRESSED:
                return 2 * fieldSizeInBytes(curve);
        }
        throw new InvalidArgumentsException('invalid format');
    }
    function computeEcdhSharedSecret(privateKey, publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var namedCurve, ecdhParams, fieldSizeInBits, sharedSecret;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        namedCurve = privateKey.algorithm.namedCurve;
                        if (!namedCurve) {
                            throw new InvalidArgumentsException('namedCurve must be provided');
                        }
                        ecdhParams = Object.assign({ 'public': publicKey }, privateKey.algorithm);
                        fieldSizeInBits = 8 * fieldSizeInBytes(curveFromString(namedCurve));
                        return [4 /*yield*/, window.crypto.subtle.deriveBits(ecdhParams, privateKey, fieldSizeInBits)];
                    case 1:
                        sharedSecret = _a.sent();
                        return [2 /*return*/, new Uint8Array(sharedSecret)];
                }
            });
        });
    }
    function generateKeyPair(algorithm, curve) {
        return __awaiter(this, void 0, void 0, function () {
            var params, ephemeralKeyPair;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (algorithm != 'ECDH' && algorithm != 'ECDSA') {
                            throw new InvalidArgumentsException('algorithm must be either ECDH or ECDSA');
                        }
                        params = { 'name': algorithm, 'namedCurve': curve };
                        return [4 /*yield*/, window.crypto.subtle.generateKey(params, /* extractable= */ true, algorithm == 'ECDH' ? ['deriveKey', 'deriveBits'] : ['sign', 'verify'])];
                    case 1:
                        ephemeralKeyPair = _a.sent();
                        return [2 /*return*/, ephemeralKeyPair];
                }
            });
        });
    }
    function exportCryptoKey(cryptoKey) {
        return __awaiter(this, void 0, void 0, function () {
            var jwk;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.crypto.subtle.exportKey('jwk', cryptoKey)];
                    case 1:
                        jwk = _a.sent();
                        return [2 /*return*/, jwk];
                }
            });
        });
    }
    function importPublicKey(algorithm, jwk) {
        return __awaiter(this, void 0, void 0, function () {
            var crv, publicKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (algorithm != 'ECDH' && algorithm != 'ECDSA') {
                            throw new InvalidArgumentsException('algorithm must be either ECDH or ECDSA');
                        }
                        crv = jwk.crv;
                        if (!crv) {
                            throw new InvalidArgumentsException('crv must be provided');
                        }
                        return [4 /*yield*/, window.crypto.subtle.importKey(
                            /* format */
                            'jwk', jwk, { 'name': algorithm, 'namedCurve': crv }, 
                            /* algorithm */
                            true, 
                            /* extractable */
                            algorithm == 'ECDH' ? [] : ['verify'])];
                    case 1:
                        publicKey = _a.sent();
                        /* usage */
                        return [2 /*return*/, publicKey];
                }
            });
        });
    }
    function importPrivateKey(algorithm, jwk) {
        return __awaiter(this, void 0, void 0, function () {
            var crv, privateKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (algorithm != 'ECDH' && algorithm != 'ECDSA') {
                            throw new InvalidArgumentsException('algorithm must be either ECDH or ECDSA');
                        }
                        crv = jwk.crv;
                        if (!crv) {
                            throw new InvalidArgumentsException('crv must be provided');
                        }
                        return [4 /*yield*/, window.crypto.subtle.importKey(
                            /* format */
                            'jwk', jwk, 
                            /* key material */
                            { 'name': algorithm, 'namedCurve': crv }, 
                            /* algorithm */
                            true, 
                            /* extractable */
                            algorithm == 'ECDH' ? ['deriveKey', 'deriveBits'] : ['sign'])];
                    case 1:
                        privateKey = _a.sent();
                        /* usage */
                        return [2 /*return*/, privateKey];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /** Like the `instanceof` operator, but works with `Constructor`. */
    function isInstanceOf(value, ctor) {
        return value instanceof ctor;
    }
    /**
     * Validates the given key and throws SecurityException if it is invalid.
     *
     */
    function validateKey(key) {
        if (!key) {
            throw new SecurityException('Key should be non null.');
        }
        if (!key.getKeyData()) {
            throw new SecurityException('Key data are missing for key ' + key.getKeyId() + '.');
        }
        if (key.getOutputPrefixType() === PbOutputPrefixType.UNKNOWN_PREFIX) {
            throw new SecurityException('Key ' + key.getKeyId() + ' has unknown output prefix type.');
        }
        if (key.getStatus() === PbKeyStatusType.UNKNOWN_STATUS) {
            throw new SecurityException('Key ' + key.getKeyId() + ' has unknown status.');
        }
    }
    /**
     * Validates the given keyset and throws SecurityException if it is invalid.
     *
     */
    function validateKeyset(keyset) {
        if (!keyset || !keyset.getKeyList() || keyset.getKeyList().length < 1) {
            throw new SecurityException('Keyset should be non null and must contain at least one key.');
        }
        var hasPrimary = false;
        var numberOfKeys = keyset.getKeyList().length;
        for (var i = 0; i < numberOfKeys; i++) {
            var key = keyset.getKeyList()[i];
            validateKey(key);
            if (keyset.getPrimaryKeyId() === key.getKeyId() &&
                key.getStatus() === PbKeyStatusType.ENABLED) {
                if (hasPrimary) {
                    throw new SecurityException('Primary key has to be unique.');
                }
                hasPrimary = true;
            }
        }
        if (!hasPrimary) {
            throw new SecurityException('Primary key has to be in the keyset and ' +
                'has to be enabled.');
        }
    }
    // Functions which are useful for implementation of
    // private and public EC keys.
    /**
     * Either prolong or shrinks the array representing number in BigEndian encoding
     * to have the specified size. As webcrypto API assumes that x, y and d values
     * has exactly the supposed number of bytes, whereas corresponding x, y and
     * keyValue values in proto might either have some leading zeros or the leading
     * zeros might be missing.
     *
     */
    function bigEndianNumberToCorrectLength(bigEndianNumber, sizeInBytes) {
        var numberLen = bigEndianNumber.length;
        if (numberLen < sizeInBytes) {
            var zeros = new Uint8Array(sizeInBytes - numberLen);
            return concat(zeros, bigEndianNumber);
        }
        if (numberLen > sizeInBytes) {
            for (var i = 0; i < numberLen - sizeInBytes; i++) {
                if (bigEndianNumber[i] != 0) {
                    throw new SecurityException('Number needs more bytes to be represented.');
                }
            }
            return bigEndianNumber.slice(numberLen - sizeInBytes, numberLen);
        }
        return bigEndianNumber;
    }
    function curveTypeProtoToSubtle(curveTypeProto) {
        switch (curveTypeProto) {
            case PbEllipticCurveType.NIST_P256:
                return CurveType.P256;
            case PbEllipticCurveType.NIST_P384:
                return CurveType.P384;
            case PbEllipticCurveType.NIST_P521:
                return CurveType.P521;
            default:
                throw new SecurityException('Unknown curve type.');
        }
    }
    function hashTypeProtoToString(hashTypeProto) {
        switch (hashTypeProto) {
            case PbHashType.SHA1:
                return 'SHA-1';
            case PbHashType.SHA256:
                return 'SHA-256';
            case PbHashType.SHA512:
                return 'SHA-512';
            default:
                throw new SecurityException('Unknown hash type.');
        }
    }
    function pointFormatProtoToSubtle(pointFormatProto) {
        switch (pointFormatProto) {
            case PbPointFormat.UNCOMPRESSED:
                return PointFormatType.UNCOMPRESSED;
            case PbPointFormat.COMPRESSED:
                return PointFormatType.COMPRESSED;
            case PbPointFormat.DO_NOT_USE_CRUNCHY_UNCOMPRESSED:
                return PointFormatType.DO_NOT_USE_CRUNCHY_UNCOMPRESSED;
            default:
                throw new SecurityException('Unknown point format.');
        }
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    // key managers maps
    var typeToManagerMap_ = new Map();
    var typeToNewKeyAllowedMap_ = new Map();
    // primitive wrappers map
    var primitiveTypeToWrapper_ = new Map();
    /**
     * Register the given manager for the given key type. Manager must be
     * non-nullptr. New keys are allowed if not specified.
     */
    function registerKeyManager(manager, opt_newKeyAllowed) {
        if (opt_newKeyAllowed === undefined) {
            opt_newKeyAllowed = true;
        }
        if (!manager) {
            throw new SecurityException('Key manager cannot be null.');
        }
        var typeUrl = manager.getKeyType();
        if (typeToManagerMap_.has(typeUrl)) {
            // Cannot overwrite the existing key manager by a new one.
            if (!(typeToManagerMap_.get(typeUrl) instanceof manager.constructor)) {
                throw new SecurityException('Key manager for key type ' + typeUrl +
                    ' has already been registered and cannot be overwritten.');
            }
            // It is forbidden to change new_key_allowed from false to true.
            if (!typeToNewKeyAllowedMap_.get(typeUrl) && opt_newKeyAllowed) {
                throw new SecurityException('Key manager for key type ' + typeUrl +
                    ' has already been registered with forbidden new key operation.');
            }
            typeToNewKeyAllowedMap_.set(typeUrl, opt_newKeyAllowed);
        }
        typeToManagerMap_.set(typeUrl, manager);
        typeToNewKeyAllowedMap_.set(typeUrl, opt_newKeyAllowed);
    }
    /**
     * Returns a key manager for the given key type or throws an exception if no
     * such manager found.
     *
     * @param typeUrl -- key type
     *
     */
    function getKeyManager(typeUrl) {
        var res = typeToManagerMap_.get(typeUrl);
        if (!res) {
            throw new SecurityException('Key manager for key type ' + typeUrl + ' has not been registered.');
        }
        return res;
    }
    window.getKeyManager = getKeyManager;
    /**
     * It finds KeyManager according to key type (which is either given by
     * PbKeyData or given by opt_typeUrl), than calls the corresponding
     * manager's getPrimitive method.
     *
     * Either key is of type PbKeyData or opt_typeUrl must be provided.
     *
     * @param key -- key is either a proto of some key
     *     or key data.
     * @param opt_typeUrl -- key type
     * @this {typeof Registry}
     *
     */
    function getPrimitive(primitiveType, key, opt_typeUrl) {
        return __awaiter$1(this, void 0, void 0, function () {
            var manager, primitive;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (key instanceof PbKeyData) {
                            if (opt_typeUrl && key.getTypeUrl() != opt_typeUrl) {
                                throw new SecurityException('Key type is ' + opt_typeUrl + ', but it is expected to be ' +
                                    key.getTypeUrl() + ' or undefined.');
                            }
                            opt_typeUrl = key.getTypeUrl();
                        }
                        if (!opt_typeUrl) {
                            throw new SecurityException('Key type has to be specified.');
                        }
                        manager = getKeyManager(opt_typeUrl);
                        return [4 /*yield*/, manager.getPrimitive(primitiveType, key)];
                    case 1:
                        primitive = _a.sent();
                        if (!isInstanceOf(primitive, primitiveType)) {
                            throw new TypeError('Unexpected type');
                        }
                        return [2 /*return*/, primitive];
                }
            });
        });
    }
    /**
     * Generates a new PbKeyData for the specified keyTemplate. It finds a
     * KeyManager given by keyTemplate.typeUrl and calls the newKeyData method of
     * that manager.
     *
     *
     *
     */
    function newKeyData(keyTemplate) {
        return __awaiter$1(this, void 0, void 0, function () {
            var manager;
            return tslib.__generator(this, function (_a) {
                manager = getKeyManagerWithNewKeyAllowedCheck_(keyTemplate);
                return [2 /*return*/, manager.getKeyFactory().newKeyData(keyTemplate.getValue_asU8())];
            });
        });
    }
    /**
     * Generates a new key for the specified keyTemplate using the
     * KeyManager determined by typeUrl field of the keyTemplate.
     *
     *
     *
     * @return returns a key proto
     */
    function newKey(keyTemplate) {
        return __awaiter$1(this, void 0, void 0, function () {
            var manager;
            return tslib.__generator(this, function (_a) {
                manager = getKeyManagerWithNewKeyAllowedCheck_(keyTemplate);
                return [2 /*return*/, manager.getKeyFactory().newKey(keyTemplate.getValue_asU8())];
            });
        });
    }
    /**
     * Convenience method for extracting the public key data from the private key
     * given by serializedPrivateKey.
     * It looks up a KeyManager identified by typeUrl, which must hold
     * PrivateKeyFactory, and calls getPublicKeyData method of that factory.
     *
     */
    function getPublicKeyData(typeUrl, serializedPrivateKey) {
        var manager = getKeyManager(typeUrl);
        // This solution might cause some problems in the future due to Closure
        // compiler optimizations, which may map factory.getPublicKeyData to
        // concrete function.
        var factory = manager.getKeyFactory();
        if (!factory.getPublicKeyData) {
            throw new SecurityException('Key manager for key type ' + typeUrl +
                ' does not have a private key factory.');
        }
        return factory.getPublicKeyData(serializedPrivateKey);
    }
    /**
     * Resets the registry.
     * After reset the registry is empty, i.e. it contains no key managers.
     *
     * This method is only for testing.
     */
    function reset() {
        typeToManagerMap_.clear();
        typeToNewKeyAllowedMap_.clear();
        primitiveTypeToWrapper_.clear();
    }
    /**
     * It finds a KeyManager given by keyTemplate.typeUrl and returns it if it
     * allows creating new keys.
     *
     *
     */
    function getKeyManagerWithNewKeyAllowedCheck_(keyTemplate) {
        var keyType = keyTemplate.getTypeUrl();
        var manager = getKeyManager(keyType);
        if (!typeToNewKeyAllowedMap_.get(keyType)) {
            throw new SecurityException('New key operation is forbidden for ' +
                'key type: ' + keyType + '.');
        }
        return manager;
    }
    /**
     * Tries to register a primitive wrapper.
     */
    function registerPrimitiveWrapper(wrapper) {
        if (!wrapper) {
            throw new SecurityException('primitive wrapper cannot be null');
        }
        var primitiveType = wrapper.getPrimitiveType();
        if (!primitiveType) {
            throw new SecurityException('primitive wrapper cannot be undefined');
        }
        if (primitiveTypeToWrapper_.has(primitiveType)) {
            // Cannot overwrite the existing key manager by a new one.
            if (!(primitiveTypeToWrapper_.get(primitiveType) instanceof
                wrapper.constructor)) {
                throw new SecurityException('primitive wrapper for type ' + primitiveType +
                    ' has already been registered and cannot be overwritten');
            }
        }
        primitiveTypeToWrapper_.set(primitiveType, wrapper);
    }
    /**
     * Wraps a PrimitiveSet and returns a single instance.
     */
    function wrap(primitiveSet) {
        if (!primitiveSet) {
            throw new SecurityException('primitive set cannot be null.');
        }
        var primitiveType = primitiveSet.getPrimitiveType();
        var wrapper = primitiveTypeToWrapper_.get(primitiveType);
        if (!wrapper) {
            throw new SecurityException('no primitive wrapper found for type ' + primitiveType);
        }
        var primitive = wrapper.wrap(primitiveSet);
        if (!isInstanceOf(primitive, primitiveType)) {
            throw new TypeError('Unexpected type');
        }
        return primitive;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for Authenticated Encryption with Associated Data (AEAD).
     *
     * Security guarantees: Implementations of this interface are secure against
     * adaptive chosen ciphertext attacks. Encryption with associated data ensures
     * authenticity (who the sender is) and integrity (the data has not been
     * tampered with) of that data, but not its secrecy.
     *
     * @see https://tools.ietf.org/html/rfc5116
     */
    var Aead = /** @class */ (function () {
        function Aead() {
        }
        return Aead;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Randomly generates `n` bytes.
     *
     * @param n number of bytes to generate
     * @return the random bytes
     * @static
     */
    function randBytes(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new InvalidArgumentsException('n must be a nonnegative integer');
        }
        var result = new Uint8Array(n);
        crypto.getRandomValues(result);
        return result;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var SUPPORTED_AES_KEY_SIZES = [16, 32];
    /**
     * Validates AES key sizes, at the moment only 128-bit and 256-bit keys are
     * supported.
     *
     * @param n the key size in bytes
     * @throws {!InvalidArgumentsException}
     * @static
     */
    function validateAesKeySize(n) {
        if (!SUPPORTED_AES_KEY_SIZES.includes(n)) {
            throw new InvalidArgumentsException('unsupported AES key size: ' + n);
        }
    }
    /**
     * Validates that the input is a non null Uint8Array.
     *
     * @throws {!InvalidArgumentsException}
     * @static
     */
    function requireUint8Array(input) {
        if (input == null || !(input instanceof Uint8Array)) {
            throw new InvalidArgumentsException('input must be a non null Uint8Array');
        }
    }
    /**
     * Validates version, throws exception if candidate version is negative or
     * bigger than expected.
     *
     * @param candidate - version to be validated
     * @param maxVersion - upper bound on version
     * @throws {!SecurityException}
     * @static
     */
    function validateVersion(candidate, maxVersion) {
        if (candidate < 0 || candidate > maxVersion) {
            throw new SecurityException('Version is out of bound, must be ' +
                'between 0 and ' + maxVersion + '.');
        }
    }
    /**
     * Validates ECDSA parameters.
     *
     * @throws {!SecurityException}
     */
    function validateEcdsaParams(curve, hash) {
        switch (curve) {
            case 'P-256':
                if (hash != 'SHA-256') {
                    throw new SecurityException('expected SHA-256 (because curve is P-256) but got ' + hash);
                }
                break;
            case 'P-384':
                if (hash != 'SHA-384' && hash != 'SHA-512') {
                    throw new SecurityException('expected SHA-384 or SHA-512 (because curve is P-384) but got ' +
                        hash);
                }
                break;
            case 'P-521':
                if (hash != 'SHA-512') {
                    throw new SecurityException('expected SHA-512 (because curve is P-521) but got ' + hash);
                }
                break;
            default:
                throw new SecurityException('unsupported curve: ' + curve);
        }
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * The minimum IV size.
     *
     */
    var MIN_IV_SIZE_IN_BYTES = 12;
    /**
     * AES block size.
     *
     */
    var AES_BLOCK_SIZE_IN_BYTES = 16;
    /**
     * Implementation of AES-CTR.
     *
     * @final
     */
    var AesCtr = /** @class */ (function () {
        /**
         * @param ivSize the size of the IV
         */
        function AesCtr(key, ivSize) {
            this.key = key;
            this.ivSize = ivSize;
        }
        /**
         * @override
         */
        AesCtr.prototype.encrypt = function (plaintext) {
            return __awaiter$2(this, void 0, void 0, function () {
                var iv, counter, alg, ciphertext;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(plaintext);
                            iv = randBytes(this.ivSize);
                            counter = new Uint8Array(AES_BLOCK_SIZE_IN_BYTES);
                            counter.set(iv);
                            alg = { 'name': 'AES-CTR', 'counter': counter, 'length': 128 };
                            return [4 /*yield*/, self.crypto.subtle.encrypt(alg, this.key, plaintext)];
                        case 1:
                            ciphertext = _a.sent();
                            return [2 /*return*/, concat(iv, new Uint8Array(ciphertext))];
                    }
                });
            });
        };
        /**
         * @override
         */
        AesCtr.prototype.decrypt = function (ciphertext) {
            return __awaiter$2(this, void 0, void 0, function () {
                var counter, alg, _a;
                return tslib.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            requireUint8Array(ciphertext);
                            if (ciphertext.length < this.ivSize) {
                                throw new SecurityException('ciphertext too short');
                            }
                            counter = new Uint8Array(AES_BLOCK_SIZE_IN_BYTES);
                            counter.set(ciphertext.subarray(0, this.ivSize));
                            alg = { 'name': 'AES-CTR', 'counter': counter, 'length': 128 };
                            _a = Uint8Array.bind;
                            return [4 /*yield*/, self.crypto.subtle.decrypt(alg, this.key, new Uint8Array(ciphertext.subarray(this.ivSize)))];
                        case 1: return [2 /*return*/, new (_a.apply(Uint8Array, [void 0, _b.sent()]))()];
                    }
                });
            });
        };
        return AesCtr;
    }());
    /**
     * @param ivSize the size of the IV, must be larger than or equal to
     *     {@link MIN_IV_SIZE_IN_BYTES}
     */
    function fromRawKey(key, ivSize) {
        return __awaiter$2(this, void 0, void 0, function () {
            var cryptoKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Number.isInteger(ivSize)) {
                            throw new SecurityException('invalid IV length, must be an integer');
                        }
                        if (ivSize < MIN_IV_SIZE_IN_BYTES || ivSize > AES_BLOCK_SIZE_IN_BYTES) {
                            throw new SecurityException('invalid IV length, must be at least ' + MIN_IV_SIZE_IN_BYTES +
                                ' and at most ' + AES_BLOCK_SIZE_IN_BYTES);
                        }
                        requireUint8Array(key);
                        validateAesKeySize(key.length);
                        return [4 /*yield*/, self.crypto.subtle.importKey('raw', key, { 'name': 'AES-CTR', 'length': key.length }, false, ['encrypt', 'decrypt'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [2 /*return*/, new AesCtr(cryptoKey, ivSize)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for Message Authentication Codes (MAC).
     *
     * Security guarantees: Message Authentication Codes provide symmetric message
     * authentication. Instances implementing this interface are secure against
     * existential forgery under chosen plaintext attack, and can be deterministic
     * or randomized. This interface should be used for authentication only, and not
     * for other purposes like generation of pseudorandom bytes.
     *
     */
    var Mac = /** @class */ (function () {
        function Mac() {
        }
        return Mac;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * The minimum tag size.
     *
     */
    var MIN_TAG_SIZE_IN_BYTES = 10;
    /**
     * Implementation of HMAC.
     *
     * @final
     */
    var Hmac = /** @class */ (function (_super) {
        tslib.__extends(Hmac, _super);
        /**
         * @param hash accepted names are SHA-1, SHA-256 and SHA-512
         * @param tagSize the size of the tag
         */
        function Hmac(hash, key, tagSize) {
            var _this = _super.call(this) || this;
            _this.hash = hash;
            _this.key = key;
            _this.tagSize = tagSize;
            return _this;
        }
        /**
         * @override
         */
        Hmac.prototype.computeMac = function (data) {
            return __awaiter$3(this, void 0, void 0, function () {
                var tag;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(data);
                            return [4 /*yield*/, self.crypto.subtle.sign({ 'name': 'HMAC', 'hash': { 'name': this.hash } }, this.key, data)];
                        case 1:
                            tag = _a.sent();
                            return [2 /*return*/, new Uint8Array(tag.slice(0, this.tagSize))];
                    }
                });
            });
        };
        /**
         * @override
         */
        Hmac.prototype.verifyMac = function (tag, data) {
            return __awaiter$3(this, void 0, void 0, function () {
                var computedTag;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(tag);
                            requireUint8Array(data);
                            return [4 /*yield*/, this.computeMac(data)];
                        case 1:
                            computedTag = _a.sent();
                            return [2 /*return*/, isEqual(tag, computedTag)];
                    }
                });
            });
        };
        return Hmac;
    }(Mac));
    /**
     * @param hash accepted names are SHA-1, SHA-256 and SHA-512
     * @param tagSize the size of the tag
     */
    function fromRawKey$1(hash, key, tagSize) {
        return __awaiter$3(this, void 0, void 0, function () {
            var cryptoKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requireUint8Array(key);
                        if (!Number.isInteger(tagSize)) {
                            throw new InvalidArgumentsException('invalid tag size, must be an integer');
                        }
                        if (tagSize < MIN_TAG_SIZE_IN_BYTES) {
                            throw new InvalidArgumentsException('tag too short, must be at least ' + MIN_TAG_SIZE_IN_BYTES + ' bytes');
                        }
                        switch (hash) {
                            case 'SHA-1':
                                if (tagSize > 20) {
                                    throw new InvalidArgumentsException('tag too long, must not be larger than 20 bytes');
                                }
                                break;
                            case 'SHA-256':
                                if (tagSize > 32) {
                                    throw new InvalidArgumentsException('tag too long, must not be larger than 32 bytes');
                                }
                                break;
                            case 'SHA-512':
                                if (tagSize > 64) {
                                    throw new InvalidArgumentsException('tag too long, must not be larger than 64 bytes');
                                }
                                break;
                            default:
                                throw new InvalidArgumentsException(hash + ' is not supported');
                        }
                        return [4 /*yield*/, self.crypto.subtle.importKey('raw', key, { 'name': 'HMAC', 'hash': { 'name': hash }, 'length': key.length * 8 }, false, ['sign', 'verify'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [2 /*return*/, new Hmac(hash, cryptoKey, tagSize)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * This primitive performs an encrypt-then-Mac operation on plaintext and
     * additional authenticated data (aad).
     *
     * The Mac is computed over `aad || ciphertext || size of aad`, thus it
     * doesn't violate https://en.wikipedia.org/wiki/Horton_Principle.
     *
     * This implementation is based on
     * http://tools.ietf.org/html/draft-mcgrew-aead-aes-cbc-hmac-sha2-05.
     *
     * @final
     */
    var EncryptThenAuthenticate = /** @class */ (function (_super) {
        tslib.__extends(EncryptThenAuthenticate, _super);
        /**
         * @param ivSize the IV size in bytes
         * @param tagSize the MAC tag size in bytes
         * @throws {InvalidArgumentsException}
         */
        function EncryptThenAuthenticate(cipher, ivSize, mac, tagSize) {
            var _this = _super.call(this) || this;
            _this.cipher = cipher;
            _this.ivSize = ivSize;
            _this.mac = mac;
            _this.tagSize = tagSize;
            return _this;
        }
        /**
         * The plaintext is encrypted with an {@link IndCpaCipher}, then MAC
         * is computed over `aad || ciphertext || t` where t is aad's length in bits
         * represented as 64-bit bigendian unsigned integer. The final ciphertext
         * format is `ind-cpa ciphertext || mac`.
         *
         * @override
         */
        EncryptThenAuthenticate.prototype.encrypt = function (plaintext, associatedData) {
            if (associatedData === void 0) {
                associatedData = new Uint8Array(0);
            }
            return __awaiter$4(this, void 0, void 0, function () {
                var payload, aadLength, mac;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(plaintext);
                            return [4 /*yield*/, this.cipher.encrypt(plaintext)];
                        case 1:
                            payload = _a.sent();
                            requireUint8Array(associatedData);
                            aadLength = fromNumber(associatedData.length * 8);
                            return [4 /*yield*/, this.mac.computeMac(concat(associatedData, payload, aadLength))];
                        case 2:
                            mac = _a.sent();
                            if (this.tagSize != mac.length) {
                                throw new SecurityException('invalid tag size, expected ' + this.tagSize + ' but got ' +
                                    mac.length);
                            }
                            return [2 /*return*/, concat(payload, mac)];
                    }
                });
            });
        };
        /**
         * @override
         */
        EncryptThenAuthenticate.prototype.decrypt = function (ciphertext, associatedData) {
            if (associatedData === void 0) {
                associatedData = new Uint8Array(0);
            }
            return __awaiter$4(this, void 0, void 0, function () {
                var payload, aadLength, input, tag, isValidMac;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(ciphertext);
                            if (ciphertext.length < this.ivSize + this.tagSize) {
                                throw new SecurityException('ciphertext too short');
                            }
                            payload = new Uint8Array(ciphertext.subarray(0, ciphertext.length - this.tagSize));
                            requireUint8Array(associatedData);
                            aadLength = fromNumber(associatedData.length * 8);
                            input = concat(associatedData, payload, aadLength);
                            tag = new Uint8Array(ciphertext.subarray(payload.length));
                            return [4 /*yield*/, this.mac.verifyMac(tag, input)];
                        case 1:
                            isValidMac = _a.sent();
                            if (!isValidMac) {
                                throw new SecurityException('invalid MAC');
                            }
                            return [2 /*return*/, this.cipher.decrypt(payload)];
                    }
                });
            });
        };
        return EncryptThenAuthenticate;
    }(Aead));
    /**
     * @param ivSize the size of the IV
     * @param hmacHashAlgo accepted names are SHA-1, SHA-256 and SHA-512
     * @param tagSize the size of the tag
     * @throws {InvalidArgumentsException}
     * @static
     */
    function aesCtrHmacFromRawKeys(aesKey, ivSize, hmacHashAlgo, hmacKey, tagSize) {
        return __awaiter$4(this, void 0, void 0, function () {
            var cipher, mac;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requireUint8Array(aesKey);
                        requireUint8Array(hmacKey);
                        return [4 /*yield*/, fromRawKey(aesKey, ivSize)];
                    case 1:
                        cipher = _a.sent();
                        return [4 /*yield*/, fromRawKey$1(hmacHashAlgo, hmacKey, tagSize)];
                    case 2:
                        mac = _a.sent();
                        return [2 /*return*/, new EncryptThenAuthenticate(cipher, ivSize, mac, tagSize)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var AesCtrHmacAeadKeyFactory = /** @class */ (function () {
        function AesCtrHmacAeadKeyFactory() {
        }
        /**
         * @override
         */
        AesCtrHmacAeadKeyFactory.prototype.newKey = function (keyFormat) {
            var keyFormatProto;
            if (keyFormat instanceof Uint8Array) {
                try {
                    keyFormatProto = PbAesCtrHmacAeadKeyFormat.deserializeBinary(keyFormat);
                }
                catch (e) {
                    throw new SecurityException('Could not parse the given Uint8Array as a serialized proto of ' +
                        AesCtrHmacAeadKeyManager.KEY_TYPE);
                }
                if (!keyFormatProto || !keyFormatProto.getAesCtrKeyFormat() ||
                    !keyFormatProto.getHmacKeyFormat()) {
                    throw new SecurityException('Could not parse the given Uint8Array as a serialized proto of ' +
                        AesCtrHmacAeadKeyManager.KEY_TYPE);
                }
            }
            else if (keyFormat instanceof PbAesCtrHmacAeadKeyFormat) {
                keyFormatProto = keyFormat;
            }
            else {
                throw new SecurityException('Expected AesCtrHmacAeadKeyFormat-proto');
            }
            var _a = this.validateAesCtrKeyFormat(keyFormatProto.getAesCtrKeyFormat()), aesCtrParams = _a.aesCtrParams, aesCtrKeySize = _a.aesCtrKeySize;
            var aesCtrKey = (new PbAesCtrKey())
                .setVersion(AesCtrHmacAeadKeyFactory.VERSION_)
                .setParams(aesCtrParams)
                .setKeyValue(randBytes(aesCtrKeySize));
            var _b = this.validateHmacKeyFormat(keyFormatProto.getHmacKeyFormat()), hmacParams = _b.hmacParams, hmacKeySize = _b.hmacKeySize;
            var hmacKey = (new PbHmacKey())
                .setVersion(AesCtrHmacAeadKeyFactory.VERSION_)
                .setParams(hmacParams)
                .setKeyValue(randBytes(hmacKeySize));
            var aesCtrHmacAeadKey = (new PbAesCtrHmacAeadKey()).setAesCtrKey(aesCtrKey).setHmacKey(hmacKey);
            return aesCtrHmacAeadKey;
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            var key = (this.newKey(serializedKeyFormat));
            var keyData = (new PbKeyData())
                .setTypeUrl(AesCtrHmacAeadKeyManager.KEY_TYPE)
                .setValue(key.serializeBinary())
                .setKeyMaterialType(PbKeyData.KeyMaterialType.SYMMETRIC);
            return keyData;
        };
        // helper functions
        /**
         * Checks the parameters and size of a given keyFormat.
         *
         */
        AesCtrHmacAeadKeyFactory.prototype.validateAesCtrKeyFormat = function (keyFormat) {
            if (!keyFormat) {
                throw new SecurityException('Invalid AES CTR HMAC key format: key format undefined');
            }
            var aesCtrKeySize = keyFormat.getKeySize();
            validateAesKeySize(aesCtrKeySize);
            var aesCtrParams = keyFormat.getParams();
            if (!aesCtrParams) {
                throw new SecurityException('Invalid AES CTR HMAC key format: params undefined');
            }
            var ivSize = aesCtrParams.getIvSize();
            if (ivSize < AesCtrHmacAeadKeyFactory.MIN_IV_SIZE_ ||
                ivSize > AesCtrHmacAeadKeyFactory.MAX_IV_SIZE_) {
                throw new SecurityException('Invalid AES CTR HMAC key format: IV size is out of range: ' +
                    ivSize);
            }
            return { aesCtrParams: aesCtrParams, aesCtrKeySize: aesCtrKeySize, ivSize: ivSize };
        };
        /**
         * Checks the parameters and size of a given keyFormat.
         *
         */
        AesCtrHmacAeadKeyFactory.prototype.validateHmacKeyFormat = function (keyFormat) {
            if (!keyFormat) {
                throw new SecurityException('Invalid AES CTR HMAC key format: key format undefined');
            }
            var hmacKeySize = keyFormat.getKeySize();
            if (hmacKeySize < AesCtrHmacAeadKeyFactory.MIN_KEY_SIZE_) {
                throw new SecurityException('Invalid AES CTR HMAC key format: HMAC key is too small: ' +
                    keyFormat.getKeySize());
            }
            var hmacParams = keyFormat.getParams();
            if (!hmacParams) {
                throw new SecurityException('Invalid AES CTR HMAC key format: params undefined');
            }
            var tagSize = hmacParams.getTagSize();
            if (tagSize < AesCtrHmacAeadKeyFactory.MIN_TAG_SIZE_) {
                throw new SecurityException('Invalid HMAC params: tag size ' + tagSize + ' is too small.');
            }
            if (!AesCtrHmacAeadKeyFactory.MAX_TAG_SIZE_.has(hmacParams.getHash())) {
                throw new SecurityException('Unknown hash type.');
            }
            else if (tagSize >
                AesCtrHmacAeadKeyFactory.MAX_TAG_SIZE_.get(hmacParams.getHash())) {
                throw new SecurityException('Invalid HMAC params: tag size ' + tagSize + ' is out of range.');
            }
            var hashType;
            switch (hmacParams.getHash()) {
                case PbHashType.SHA1:
                    hashType = 'SHA-1';
                    break;
                case PbHashType.SHA256:
                    hashType = 'SHA-256';
                    break;
                case PbHashType.SHA512:
                    hashType = 'SHA-512';
                    break;
                default:
                    hashType = 'UNKNOWN HASH';
            }
            return { hmacParams: hmacParams, hmacKeySize: hmacKeySize, hashType: hashType, tagSize: tagSize };
        };
        return AesCtrHmacAeadKeyFactory;
    }());
    AesCtrHmacAeadKeyFactory.VERSION_ = 0;
    AesCtrHmacAeadKeyFactory.MIN_KEY_SIZE_ = 16;
    AesCtrHmacAeadKeyFactory.MIN_IV_SIZE_ = 12;
    AesCtrHmacAeadKeyFactory.MAX_IV_SIZE_ = 16;
    AesCtrHmacAeadKeyFactory.MIN_TAG_SIZE_ = 10;
    AesCtrHmacAeadKeyFactory.MAX_TAG_SIZE_ = new Map([
        [PbHashType.SHA1, 20], [PbHashType.SHA256, 32], [PbHashType.SHA512, 64]
    ]);
    /**
     * @final
     */
    var AesCtrHmacAeadKeyManager = /** @class */ (function () {
        function AesCtrHmacAeadKeyManager() {
            this.keyFactory_ = new AesCtrHmacAeadKeyFactory();
        }
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$5(this, void 0, void 0, function () {
                var deserializedKey, _a, aesCtrKeyValue, ivSize, _b, hmacKeyValue, hashType, tagSize;
                return tslib.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (primitiveType != this.getPrimitiveType()) {
                                throw new SecurityException('Requested primitive type which is not ' +
                                    'supported by this key manager.');
                            }
                            if (key instanceof PbKeyData) {
                                if (!this.doesSupport(key.getTypeUrl())) {
                                    throw new SecurityException('Key type ' + key.getTypeUrl() +
                                        ' is not supported. This key manager supports ' +
                                        this.getKeyType() + '.');
                                }
                                try {
                                    deserializedKey = PbAesCtrHmacAeadKey.deserializeBinary(key.getValue());
                                }
                                catch (e) {
                                    throw new SecurityException('Could not parse the key in key data as a serialized proto of ' +
                                        AesCtrHmacAeadKeyManager.KEY_TYPE);
                                }
                                if (deserializedKey === null || deserializedKey === undefined) {
                                    throw new SecurityException('Could not parse the key in key data as a serialized proto of ' +
                                        AesCtrHmacAeadKeyManager.KEY_TYPE);
                                }
                            }
                            else if (key instanceof PbAesCtrHmacAeadKey) {
                                deserializedKey = key;
                            }
                            else {
                                throw new SecurityException('Given key type is not supported. ' +
                                    'This key manager supports ' + this.getKeyType() + '.');
                            }
                            _a = this.validateAesCtrKey_(deserializedKey.getAesCtrKey()), aesCtrKeyValue = _a.aesCtrKeyValue, ivSize = _a.ivSize;
                            _b = this.validateHmacKey_(deserializedKey.getHmacKey()), hmacKeyValue = _b.hmacKeyValue, hashType = _b.hashType, tagSize = _b.tagSize;
                            return [4 /*yield*/, aesCtrHmacFromRawKeys(aesCtrKeyValue, ivSize, hashType, hmacKeyValue, tagSize)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.getKeyType = function () {
            return AesCtrHmacAeadKeyManager.KEY_TYPE;
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.getPrimitiveType = function () {
            return AesCtrHmacAeadKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.getVersion = function () {
            return AesCtrHmacAeadKeyManager.VERSION_;
        };
        /**
         * @override
         */
        AesCtrHmacAeadKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory_;
        };
        // helper functions
        /**
         * Checks the parameters and size of a given AES-CTR key.
         *
         */
        AesCtrHmacAeadKeyManager.prototype.validateAesCtrKey_ = function (key) {
            if (!key) {
                throw new SecurityException('Invalid AES CTR HMAC key format: key undefined');
            }
            validateVersion(key.getVersion(), this.getVersion());
            var keyFormat = (new PbAesCtrKeyFormat())
                .setParams(key.getParams())
                .setKeySize(key.getKeyValue_asU8().length);
            var ivSize = this.keyFactory_.validateAesCtrKeyFormat(keyFormat).ivSize;
            return { aesCtrKeyValue: key.getKeyValue_asU8(), ivSize: ivSize };
        };
        /**
         * Checks the parameters and size of a given HMAC key.
         *
         */
        AesCtrHmacAeadKeyManager.prototype.validateHmacKey_ = function (key) {
            if (!key) {
                throw new SecurityException('Invalid AES CTR HMAC key format: key undefined');
            }
            validateVersion(key.getVersion(), this.getVersion());
            var keyFormat = (new PbHmacKeyFormat())
                .setParams(key.getParams())
                .setKeySize(key.getKeyValue_asU8().length);
            var _a = this.keyFactory_.validateHmacKeyFormat(keyFormat), hashType = _a.hashType, tagSize = _a.tagSize;
            return { hmacKeyValue: key.getKeyValue_asU8(), hashType: hashType, tagSize: tagSize };
        };
        AesCtrHmacAeadKeyManager.register = function () {
            registerKeyManager(new AesCtrHmacAeadKeyManager());
        };
        return AesCtrHmacAeadKeyManager;
    }());
    AesCtrHmacAeadKeyManager.SUPPORTED_PRIMITIVE_ = Aead;
    AesCtrHmacAeadKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.AesCtrHmacAeadKey';
    AesCtrHmacAeadKeyManager.VERSION_ = 0;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Pre-generated KeyTemplates for AES CTR HMAC AEAD keys.
     *
     * @final
     */
    var AesCtrHmacAeadKeyTemplates = /** @class */ (function () {
        function AesCtrHmacAeadKeyTemplates() {
        }
        /**
         * Returns a KeyTemplate that generates new instances of AesCtrHmacAeadKey
         * with the following parameters:
         *    AES key size: 16 bytes
         *    AES IV size: 16 bytes
         *    HMAC key size: 32 bytes
         *    HMAC tag size: 16 bytes
         *    HMAC hash function: SHA256
         *    OutputPrefixType: TINK
         *
         */
        AesCtrHmacAeadKeyTemplates.aes128CtrHmacSha256 = function () {
            return AesCtrHmacAeadKeyTemplates.newAesCtrHmacSha256KeyTemplate_(16, 
            /* aesKeySize = */
            16, 
            /* ivSize = */
            32, 
            /* hmacKeySize = */
            16);
        };
        /* tagSize = */
        /**
         * Returns a KeyTemplate that generates new instances of AesCtrHmacAeadKey
         * with the following parameters:
         *    AES key size: 32 bytes
         *    AES IV size: 16 bytes
         *    HMAC key size: 32 bytes
         *    HMAC tag size: 32 bytes
         *    HMAC hash function: SHA256
         *    OutputPrefixType: TINK
         *
         */
        AesCtrHmacAeadKeyTemplates.aes256CtrHmacSha256 = function () {
            return AesCtrHmacAeadKeyTemplates.newAesCtrHmacSha256KeyTemplate_(32, 
            /* aesKeySize = */
            16, 
            /* ivSize = */
            32, 
            /* hmacKeySize = */
            32);
        };
        /* tagSize = */
        AesCtrHmacAeadKeyTemplates.newAesCtrHmacSha256KeyTemplate_ = function (aesKeySize, ivSize, hmacKeySize, tagSize) {
            // Define AES CTR key format.
            var aesCtrKeyFormat = (new PbAesCtrKeyFormat())
                .setKeySize(aesKeySize)
                .setParams(new PbAesCtrParams());
            aesCtrKeyFormat.getParams().setIvSize(ivSize);
            // Define HMAC key format.
            var hmacKeyFormat = (new PbHmacKeyFormat())
                .setKeySize(hmacKeySize)
                .setParams(new PbHmacParams());
            hmacKeyFormat.getParams().setTagSize(tagSize);
            hmacKeyFormat.getParams().setHash(PbHashType.SHA256);
            // Define AES CTR HMAC AEAD key format.
            var keyFormat = (new PbAesCtrHmacAeadKeyFormat())
                .setAesCtrKeyFormat(aesCtrKeyFormat)
                .setHmacKeyFormat(hmacKeyFormat);
            // Define key template.
            var keyTemplate = (new PbKeyTemplate())
                .setTypeUrl(AesCtrHmacAeadKeyManager.KEY_TYPE)
                .setOutputPrefixType(PbOutputPrefixType.TINK)
                .setValue(keyFormat.serializeBinary());
            return keyTemplate;
        };
        return AesCtrHmacAeadKeyTemplates;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register() {
        registerKeyManager(new AesCtrHmacAeadKeyManager());
    }
    var aes128CtrHmacSha256KeyTemplate = AesCtrHmacAeadKeyTemplates.aes128CtrHmacSha256;
    var aes256CtrHmacSha256KeyTemplate = AesCtrHmacAeadKeyTemplates.aes256CtrHmacSha256;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$6 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * The only supported IV size.
     *
     */
    var IV_SIZE_IN_BYTES = 12;
    /**
     * The only supported tag size.
     *
     */
    var TAG_SIZE_IN_BITS = 128;
    /**
     * Implementation of AES-GCM.
     *
     * @final
     */
    var AesGcm = /** @class */ (function (_super) {
        tslib.__extends(AesGcm, _super);
        function AesGcm(key) {
            var _this = _super.call(this) || this;
            _this.key = key;
            return _this;
        }
        /**
         * @override
         */
        AesGcm.prototype.encrypt = function (plaintext, associatedData) {
            return __awaiter$6(this, void 0, void 0, function () {
                var iv, alg, ciphertext;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(plaintext);
                            if (associatedData != null) {
                                requireUint8Array(associatedData);
                            }
                            iv = randBytes(IV_SIZE_IN_BYTES);
                            alg = {
                                'name': 'AES-GCM',
                                'iv': iv,
                                'tagLength': TAG_SIZE_IN_BITS
                            };
                            if (associatedData) {
                                alg['additionalData'] = associatedData;
                            }
                            return [4 /*yield*/, self.crypto.subtle.encrypt(alg, this.key, plaintext)];
                        case 1:
                            ciphertext = _a.sent();
                            return [2 /*return*/, concat(iv, new Uint8Array(ciphertext))];
                    }
                });
            });
        };
        /**
         * @override
         */
        AesGcm.prototype.decrypt = function (ciphertext, associatedData) {
            return __awaiter$6(this, void 0, void 0, function () {
                var iv, alg, _a, e_1;
                return tslib.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            requireUint8Array(ciphertext);
                            if (ciphertext.length < IV_SIZE_IN_BYTES + TAG_SIZE_IN_BITS / 8) {
                                throw new SecurityException('ciphertext too short');
                            }
                            if (associatedData != null) {
                                requireUint8Array(associatedData);
                            }
                            iv = new Uint8Array(IV_SIZE_IN_BYTES);
                            iv.set(ciphertext.subarray(0, IV_SIZE_IN_BYTES));
                            alg = {
                                'name': 'AES-GCM',
                                'iv': iv,
                                'tagLength': TAG_SIZE_IN_BITS
                            };
                            if (associatedData) {
                                alg['additionalData'] = associatedData;
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = Uint8Array.bind;
                            return [4 /*yield*/, self.crypto.subtle.decrypt(alg, this.key, new Uint8Array(ciphertext.subarray(IV_SIZE_IN_BYTES)))];
                        case 2: return [2 /*return*/, new (_a.apply(Uint8Array, [void 0, _b.sent()]))()];
                        case 3:
                            e_1 = _b.sent();
                            throw new SecurityException(e_1.toString());
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return AesGcm;
    }(Aead));
    function fromRawKey$2(key) {
        return __awaiter$6(this, void 0, void 0, function () {
            var webCryptoKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requireUint8Array(key);
                        validateAesKeySize(key.length);
                        return [4 /*yield*/, self.crypto.subtle.importKey(
                            /* format */
                            'raw', key, 
                            /* keyData */
                            { 'name': 'AES-GCM', 'length': key.length }, 
                            /* algo */
                            false, 
                            /* extractable*/
                            ['encrypt', 'decrypt'])];
                    case 1:
                        webCryptoKey = _a.sent();
                        /* usage */
                        return [2 /*return*/, new AesGcm(webCryptoKey)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$7 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var VERSION = 0;
    /**
     * @final
     */
    var AesGcmKeyFactory = /** @class */ (function () {
        function AesGcmKeyFactory() {
        }
        /** @override */
        AesGcmKeyFactory.prototype.newKey = function (keyFormat) {
            var keyFormatProto = AesGcmKeyFactory.getKeyFormatProto_(keyFormat);
            AesGcmKeyFactory.validateKeyFormat_(keyFormatProto);
            var key = (new PbAesGcmKey())
                .setKeyValue(randBytes(keyFormatProto.getKeySize()))
                .setVersion(VERSION);
            return key;
        };
        /** @override */
        AesGcmKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            var key = (this.newKey(serializedKeyFormat));
            var keyData = (new PbKeyData())
                .setTypeUrl(AesGcmKeyManager.KEY_TYPE)
                .setValue(key.serializeBinary())
                .setKeyMaterialType(PbKeyData.KeyMaterialType.SYMMETRIC);
            return keyData;
        };
        AesGcmKeyFactory.validateKeyFormat_ = function (keyFormat) {
            validateAesKeySize(keyFormat.getKeySize());
        };
        /**
         * The input keyFormat is either deserialized (in case that the input is
         * Uint8Array) or checked to be an AesGcmKeyFormat-proto (otherwise).
         *
         */
        AesGcmKeyFactory.getKeyFormatProto_ = function (keyFormat) {
            if (keyFormat instanceof Uint8Array) {
                return AesGcmKeyFactory.deserializeKeyFormat_(keyFormat);
            }
            else if (keyFormat instanceof PbAesGcmKeyFormat) {
                return keyFormat;
            }
            else {
                throw new SecurityException('Expected AesGcmKeyFormat-proto');
            }
        };
        AesGcmKeyFactory.deserializeKeyFormat_ = function (keyFormat) {
            var keyFormatProto;
            try {
                keyFormatProto = PbAesGcmKeyFormat.deserializeBinary(keyFormat);
            }
            catch (e) {
                throw new SecurityException('Could not parse the input as a serialized proto of ' +
                    AesGcmKeyManager.KEY_TYPE + ' key format.');
            }
            if (!keyFormatProto.getKeySize()) {
                throw new SecurityException('Could not parse the input as a serialized proto of ' +
                    AesGcmKeyManager.KEY_TYPE + ' key format.');
            }
            return keyFormatProto;
        };
        return AesGcmKeyFactory;
    }());
    /**
     * @final
     */
    var AesGcmKeyManager = /** @class */ (function () {
        /** Visible for testing. */
        function AesGcmKeyManager() {
            this.keyFactory_ = new AesGcmKeyFactory();
        }
        /** @override */
        AesGcmKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$7(this, void 0, void 0, function () {
                var keyProto;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (primitiveType != this.getPrimitiveType()) {
                                throw new SecurityException('Requested primitive type which is not ' +
                                    'supported by this key manager.');
                            }
                            keyProto = AesGcmKeyManager.getKeyProto_(key);
                            AesGcmKeyManager.validateKey_(keyProto);
                            return [4 /*yield*/, fromRawKey$2(keyProto.getKeyValue_asU8())];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /** @override */
        AesGcmKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /** @override */
        AesGcmKeyManager.prototype.getKeyType = function () {
            return AesGcmKeyManager.KEY_TYPE;
        };
        /** @override */
        AesGcmKeyManager.prototype.getPrimitiveType = function () {
            return AesGcmKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /** @override */
        AesGcmKeyManager.prototype.getVersion = function () {
            return VERSION;
        };
        /** @override */
        AesGcmKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory_;
        };
        AesGcmKeyManager.validateKey_ = function (key) {
            validateAesKeySize(key.getKeyValue().length);
            validateVersion(key.getVersion(), VERSION);
        };
        /**
         * The input key is either deserialized (in case that the input is
         * KeyData-proto) or checked to be an AesGcmKey-proto (otherwise).
         *
         */
        AesGcmKeyManager.getKeyProto_ = function (keyMaterial) {
            if (keyMaterial instanceof PbKeyData) {
                return AesGcmKeyManager.getKeyProtoFromKeyData_(keyMaterial);
            }
            else if (keyMaterial instanceof PbAesGcmKey) {
                return keyMaterial;
            }
            else {
                throw new SecurityException('Key type is not supported. ' +
                    'This key manager supports ' + AesGcmKeyManager.KEY_TYPE + '.');
            }
        };
        /**
         * It validates the key type and returns a deserialized AesGcmKey-proto.
         *
         */
        AesGcmKeyManager.getKeyProtoFromKeyData_ = function (keyData) {
            if (keyData.getTypeUrl() != AesGcmKeyManager.KEY_TYPE) {
                throw new SecurityException('Key type ' + keyData.getTypeUrl() +
                    ' is not supported. This key manager supports ' +
                    AesGcmKeyManager.KEY_TYPE + '.');
            }
            var deserializedKey;
            try {
                deserializedKey = PbAesGcmKey.deserializeBinary(keyData.getValue());
            }
            catch (e) {
                throw new SecurityException('Could not parse the input as a ' +
                    'serialized proto of ' + AesGcmKeyManager.KEY_TYPE + ' key.');
            }
            if (!deserializedKey.getKeyValue()) {
                throw new SecurityException('Could not parse the input as a ' +
                    'serialized proto of ' + AesGcmKeyManager.KEY_TYPE + ' key.');
            }
            return deserializedKey;
        };
        AesGcmKeyManager.register = function () {
            registerKeyManager(new AesGcmKeyManager());
        };
        return AesGcmKeyManager;
    }());
    AesGcmKeyManager.SUPPORTED_PRIMITIVE_ = Aead;
    AesGcmKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.AesGcmKey';
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Pre-generated KeyTemplates for AES GCM keys.
     *
     * @final
     */
    var AesGcmKeyTemplates = /** @class */ (function () {
        function AesGcmKeyTemplates() {
        }
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *    key size: 16 bytes
         *    OutputPrefixType: TINK
         *
         */
        AesGcmKeyTemplates.aes128Gcm = function () {
            return AesGcmKeyTemplates.newAesGcmKeyTemplate_(
            /* keySize = */
            16, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *    key size: 32 bytes
         *    OutputPrefixType: TINK
         *
         */
        AesGcmKeyTemplates.aes256Gcm = function () {
            return AesGcmKeyTemplates.newAesGcmKeyTemplate_(
            /* keySize = */
            32, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *     key size: 32 bytes
         *     OutputPrefixType: RAW
         *
         */
        AesGcmKeyTemplates.aes256GcmNoPrefix = function () {
            return AesGcmKeyTemplates.newAesGcmKeyTemplate_(
            /* keySize = */
            32, 
            /* outputPrefixType = */
            PbOutputPrefixType.RAW);
        };
        AesGcmKeyTemplates.newAesGcmKeyTemplate_ = function (keySize, outputPrefixType) {
            // Define AES GCM key format.
            var keyFormat = (new PbAesGcmKeyFormat()).setKeySize(keySize);
            // Define key template.
            var keyTemplate = (new PbKeyTemplate())
                .setTypeUrl(AesGcmKeyManager.KEY_TYPE)
                .setOutputPrefixType(outputPrefixType)
                .setValue(keyFormat.serializeBinary());
            return keyTemplate;
        };
        return AesGcmKeyTemplates;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$1() {
        registerKeyManager(new AesGcmKeyManager());
    }
    var aes128GcmKeyTemplate = AesGcmKeyTemplates.aes128Gcm;
    var aes256GcmKeyTemplate = AesGcmKeyTemplates.aes256Gcm;
    var aes256GcmNoPrefixKeyTemplate = AesGcmKeyTemplates.aes256GcmNoPrefix;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Constants and methods that deal with the format of the outputs handled by
     * Tink.
     *
     * @static
     * @final
     */
    var CryptoFormat = /** @class */ (function () {
        function CryptoFormat() {
        }
        /**
         * Generates the prefix for the outputs handled by the given 'key'.
         * Throws an exception if the prefix type of 'key' is invalid.
         *
         *
         */
        CryptoFormat.getOutputPrefix = function (key) {
            switch (key.getOutputPrefixType()) {
                case PbOutputPrefixType.LEGACY:
                // fall through
                case PbOutputPrefixType.CRUNCHY:
                    return CryptoFormat.makeOutputPrefix_(key.getKeyId(), CryptoFormat.LEGACY_START_BYTE);
                case PbOutputPrefixType.TINK:
                    return CryptoFormat.makeOutputPrefix_(key.getKeyId(), CryptoFormat.TINK_START_BYTE);
                case PbOutputPrefixType.RAW:
                    return CryptoFormat.RAW_PREFIX;
                default:
                    throw new SecurityException('Unsupported key prefix type.');
            }
        };
        /**
         * Makes output prefix which consits of 4 bytes of key id in Big Endian
         * representation followed by 1 byte of key type identifier.
         *
         * @static
         *
         */
        CryptoFormat.makeOutputPrefix_ = function (keyId, keyTypeIdentifier) {
            var res = [keyTypeIdentifier];
            res = res.concat(CryptoFormat.numberAsBigEndian_(keyId));
            return new Uint8Array(res);
        };
        /**
         * Returns the given number as Uint8Array in Big Endian format.
         *
         * Given number has to be a non-negative integer smaller than 2^32.
         *
         * @static
         *
         */
        CryptoFormat.numberAsBigEndian_ = function (n) {
            if (!Number.isInteger(n) || n < 0 || n >= Math.pow(2, 32)) {
                throw new InvalidArgumentsException('Number has to be unsigned 32-bit integer.');
            }
            var numberOfBytes = 4;
            var res = new Array(numberOfBytes);
            for (var i = 0; i < numberOfBytes; i++) {
                res[i] = 255 & n >> 8 * (numberOfBytes - i - 1);
            }
            return res;
        };
        return CryptoFormat;
    }());
    /**
     * Prefix size of Tink and Legacy key types.
     */
    CryptoFormat.NON_RAW_PREFIX_SIZE = 5;
    /**
     * Prefix size of Legacy key types.
     */
    CryptoFormat.LEGACY_PREFIX_SIZE = CryptoFormat.NON_RAW_PREFIX_SIZE;
    /**
     * Legacy starts with 0 and is followed by 4-byte key id.
     */
    CryptoFormat.LEGACY_START_BYTE = 0;
    /**
     * Prefix size of Tink key types.
     */
    CryptoFormat.TINK_PREFIX_SIZE = CryptoFormat.NON_RAW_PREFIX_SIZE;
    /**
     * Tink starts with 1 and is followed by 4-byte key id.
     */
    CryptoFormat.TINK_START_BYTE = 1;
    /**
     * Raw prefix should have length 0.
     */
    CryptoFormat.RAW_PREFIX_SIZE = 0;
    /**
     * Raw prefix is empty Uint8Array.
     */
    CryptoFormat.RAW_PREFIX = new Uint8Array(0);
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$8 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var WrappedAead = /** @class */ (function (_super) {
        tslib.__extends(WrappedAead, _super);
        // The constructor should be @private, but it is not supported by Closure
        // (see https://github.com/google/closure-compiler/issues/2761).
        function WrappedAead(aeadSet) {
            var _this = _super.call(this) || this;
            _this.aeadSet = aeadSet;
            return _this;
        }
        WrappedAead.newAead = function (aeadSet) {
            if (!aeadSet) {
                throw new SecurityException('Primitive set has to be non-null.');
            }
            if (!aeadSet.getPrimary()) {
                throw new SecurityException('Primary has to be non-null.');
            }
            return new WrappedAead(aeadSet);
        };
        /**
         * @override
         */
        WrappedAead.prototype.encrypt = function (plaintext, opt_associatedData) {
            return __awaiter$8(this, void 0, void 0, function () {
                var primary, primitive, encryptedText, keyId, ciphertext;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!plaintext) {
                                throw new SecurityException('Plaintext has to be non-null.');
                            }
                            primary = this.aeadSet.getPrimary();
                            if (!primary) {
                                throw new SecurityException('Primary has to be non-null.');
                            }
                            primitive = primary.getPrimitive();
                            return [4 /*yield*/, primitive.encrypt(plaintext, opt_associatedData)];
                        case 1:
                            encryptedText = _a.sent();
                            keyId = primary.getIdentifier();
                            ciphertext = new Uint8Array(keyId.length + encryptedText.length);
                            ciphertext.set(keyId, 0);
                            ciphertext.set(encryptedText, keyId.length);
                            return [2 /*return*/, ciphertext];
                    }
                });
            });
        };
        /**
         * @override
         */
        WrappedAead.prototype.decrypt = function (ciphertext, opt_associatedData) {
            return __awaiter$8(this, void 0, void 0, function () {
                var keyId, entries_1, rawCiphertext, decryptedText_1, e_1, entries, decryptedText;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!ciphertext) {
                                throw new SecurityException('Ciphertext has to be non-null.');
                            }
                            if (!(ciphertext.length > CryptoFormat.NON_RAW_PREFIX_SIZE))
                                return [3 /*break*/, 6];
                            keyId = ciphertext.subarray(0, CryptoFormat.NON_RAW_PREFIX_SIZE);
                            return [4 /*yield*/, this.aeadSet.getPrimitives(keyId)];
                        case 1:
                            entries_1 = _a.sent();
                            rawCiphertext = ciphertext.subarray(CryptoFormat.NON_RAW_PREFIX_SIZE, ciphertext.length);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.tryDecryption_(entries_1, rawCiphertext, opt_associatedData)];
                        case 3:
                            decryptedText_1 = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            if (decryptedText_1) {
                                return [2 /*return*/, decryptedText_1];
                            }
                            _a.label = 6;
                        case 6: return [4 /*yield*/, this.aeadSet.getRawPrimitives()];
                        case 7:
                            entries = _a.sent();
                            return [4 /*yield*/, this.tryDecryption_(entries, ciphertext, opt_associatedData)];
                        case 8:
                            decryptedText = _a.sent();
                            return [2 /*return*/, decryptedText];
                    }
                });
            });
        };
        /**
         * Tries to decrypt the ciphertext using each entry in entriesArray and
         * returns the ciphertext decrypted by first primitive which succeed. It
         * throws an exception if no entry succeeds.
         *
         *
         */
        WrappedAead.prototype.tryDecryption_ = function (entriesArray, ciphertext, opt_associatedData) {
            return __awaiter$8(this, void 0, void 0, function () {
                var entriesArrayLength, i, primitive, decryptionResult, e_2;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entriesArrayLength = entriesArray.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < entriesArrayLength))
                                return [3 /*break*/, 7];
                            if (entriesArray[i].getKeyStatus() != PbKeyStatusType.ENABLED) {
                                return [3 /*break*/, 6];
                            }
                            primitive = entriesArray[i].getPrimitive();
                            decryptionResult = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, primitive.decrypt(ciphertext, opt_associatedData)];
                        case 3:
                            decryptionResult =
                                _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            return [3 /*break*/, 6];
                        case 5: return [2 /*return*/, decryptionResult];
                        case 6:
                            i++;
                            return [3 /*break*/, 1];
                        case 7: throw new SecurityException('Decryption failed for the given ciphertext.');
                    }
                });
            });
        };
        return WrappedAead;
    }(Aead));
    var AeadWrapper = /** @class */ (function () {
        function AeadWrapper() {
        }
        /**
         * @override
         */
        AeadWrapper.prototype.wrap = function (primitiveSet) {
            return WrappedAead.newAead(primitiveSet);
        };
        /**
         * @override
         */
        AeadWrapper.prototype.getPrimitiveType = function () {
            return Aead;
        };
        AeadWrapper.register = function () {
            registerPrimitiveWrapper(new AeadWrapper());
        };
        return AeadWrapper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$2() {
        registerPrimitiveWrapper(new AeadWrapper());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$3() {
        register();
        register$1();
        register$2();
    }
    var index = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        register: register$3,
        aes128GcmKeyTemplate: aes128GcmKeyTemplate,
        aes256GcmKeyTemplate: aes256GcmKeyTemplate,
        aes256GcmNoPrefixKeyTemplate: aes256GcmNoPrefixKeyTemplate,
        Aead: Aead,
        aes128CtrHmacSha256KeyTemplate: aes128CtrHmacSha256KeyTemplate,
        aes256CtrHmacSha256KeyTemplate: aes256CtrHmacSha256KeyTemplate
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var index$1 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        aesCtrHmac: aesCtrHmacFromRawKeys,
        AesGcm: AesGcm,
        aesGcmFromRawKey: fromRawKey$2,
        EncryptThenAuthenticate: EncryptThenAuthenticate
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * BinaryKeysetReader knows how to read a keyset or an encrypted keyset
     * serialized to binary format.
     *
     * @final
     */
    var BinaryKeysetReader = /** @class */ (function () {
        function BinaryKeysetReader(serializedKeyset) {
            this.serializedKeyset = serializedKeyset;
        }
        BinaryKeysetReader.withUint8Array = function (serializedKeyset) {
            if (!serializedKeyset) {
                throw new SecurityException('Serialized keyset has to be non-null.');
            }
            return new BinaryKeysetReader(serializedKeyset);
        };
        /** @override */
        BinaryKeysetReader.prototype.read = function () {
            var keyset;
            try {
                keyset = PbKeyset.deserializeBinary(this.serializedKeyset);
            }
            catch (e) {
                throw new SecurityException('Could not parse the given serialized proto as a keyset proto.');
            }
            if (keyset.getKeyList().length === 0) {
                throw new SecurityException('Could not parse the given serialized proto as a keyset proto.');
            }
            return keyset;
        };
        /** @override */
        BinaryKeysetReader.prototype.readEncrypted = function () {
            throw new SecurityException('Not implemented yet.');
        };
        return BinaryKeysetReader;
    }());
    /**
     * Auxiliary class for PrimitiveSet
     * Entry-objects hold individual instances of primitives in the set.
     *
     * @template P
     * @final
     */
    var Entry = /** @class */ (function () {
        function Entry(primitive, identifier, keyStatus, outputPrefixType) {
            this.primitive = primitive;
            this.identifier = identifier;
            this.keyStatus = keyStatus;
            this.outputPrefixType = outputPrefixType;
        }
        Entry.prototype.getPrimitive = function () {
            return this.primitive;
        };
        Entry.prototype.getIdentifier = function () {
            return this.identifier;
        };
        Entry.prototype.getKeyStatus = function () {
            return this.keyStatus;
        };
        Entry.prototype.getOutputPrefixType = function () {
            return this.outputPrefixType;
        };
        return Entry;
    }());
    /**
     * A container class for a set of primitives (i.e. implementations of
     * cryptographic primitives offered by Tink). It provides also additional
     * properties for the primitives it holds. In particular, one of the primitives
     * in the set can be distinguished as "the primary" one.
     *
     * PrimitiveSet is an auxiliary class used for supporting key rotation:
     * primitives in a set correspond to keys in a keyset. Users will usually work
     * with primitive instances which essentially wrap primitive sets. For example
     * an instance of an Aead-primitive for a given keyset holds a set of
     * Aead-primitives corresponding to the keys in the keyset, and uses the set
     * members to do the actual crypto operations: to encrypt data the primary
     * Aead-primitive from the set is used, and upon decryption the ciphertext's
     * prefix determines the identifier of the primitive from the set.
     *
     * PrimitiveSet is a public class to allow its use in implementations of custom
     * primitives.
     *
     * @final
     */
    var PrimitiveSet = /** @class */ (function () {
        function PrimitiveSet(primitiveType) {
            this.primitiveType = primitiveType;
            this.primary_ = null;
            this.identifierToPrimitivesMap_ = new Map();
        }
        /**
         * Returns the type of primitives contained in this set.
         *
         */
        PrimitiveSet.prototype.getPrimitiveType = function () {
            return this.primitiveType;
        };
        /**
         * Creates an entry in the primitive table and returns it.
         *
         *
         */
        PrimitiveSet.prototype.addPrimitive = function (primitive, key) {
            if (!primitive) {
                throw new SecurityException('Primitive has to be non null.');
            }
            if (!key) {
                throw new SecurityException('Key has to be non null.');
            }
            var identifier = CryptoFormat.getOutputPrefix(key);
            var entry = new Entry(primitive, identifier, key.getStatus(), key.getOutputPrefixType());
            this.addPrimitiveToMap_(entry);
            return entry;
        };
        /**
         * Returns the entry with the primary primitive.
         *
         */
        PrimitiveSet.prototype.getPrimary = function () {
            return this.primary_;
        };
        /**
         * Sets given Entry as the primary one.
         *
         */
        PrimitiveSet.prototype.setPrimary = function (primitive) {
            if (!primitive) {
                throw new SecurityException('Primary cannot be set to null.');
            }
            if (primitive.getKeyStatus() != PbKeyStatusType.ENABLED) {
                throw new SecurityException('Primary has to be enabled.');
            }
            // There has to be exactly one key enabled with this identifier.
            var entries = this.getPrimitives(primitive.getIdentifier());
            var entryFound = false;
            var entriesLength = entries.length;
            for (var i = 0; i < entriesLength; i++) {
                if (entries[i].getKeyStatus() === PbKeyStatusType.ENABLED) {
                    entryFound = true;
                    break;
                }
            }
            if (!entryFound) {
                throw new SecurityException('Primary cannot be set to an entry which is ' +
                    'not held by this primitive set.');
            }
            this.primary_ = primitive;
        };
        /**
         * Returns all primitives using RAW prefix.
         *
         */
        PrimitiveSet.prototype.getRawPrimitives = function () {
            return this.getPrimitives(CryptoFormat.RAW_PREFIX);
        };
        /**
         * Returns the entries with primitive identified with identifier.
         *
         *
         */
        PrimitiveSet.prototype.getPrimitives = function (identifier) {
            var result = this.getPrimitivesFromMap_(identifier);
            if (!result) {
                return [];
            }
            else {
                return result;
            }
        };
        /**
         * Returns a set of primitives which corresponds to the given identifier.
         *
         *
         */
        PrimitiveSet.prototype.getPrimitivesFromMap_ = function (identifier) {
            if (identifier instanceof Uint8Array) {
                identifier = tslib.__spread(identifier).toString();
            }
            return this.identifierToPrimitivesMap_.get(identifier);
        };
        /**
         * Add primitive to map.
         *
         */
        PrimitiveSet.prototype.addPrimitiveToMap_ = function (entry) {
            var identifier = entry.getIdentifier();
            var id = tslib.__spread(identifier).toString();
            var existing = this.getPrimitivesFromMap_(id);
            if (!existing) {
                this.identifierToPrimitivesMap_.set(id, [entry]);
            }
            else {
                existing.push(entry);
                this.identifierToPrimitivesMap_.set(id, existing);
            }
        };
        return PrimitiveSet;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$9 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Keyset handle provide abstracted access to Keysets, to limit the exposure of
     * actual protocol buffers that hold sensitive key material.
     *
     * @final
     */
    var KeysetHandle = /** @class */ (function () {
        function KeysetHandle(keyset) {
            validateKeyset(keyset);
            this.keyset_ = keyset;
        }
        /**
         * Returns a primitive that uses key material from this keyset handle. If
         * opt_customKeyManager is defined then the provided key manager is used to
         * instantiate primitives. Otherwise key manager from Registry is used.
         */
        KeysetHandle.prototype.getPrimitive = function (primitiveType, opt_customKeyManager) {
            return __awaiter$9(this, void 0, void 0, function () {
                var primitiveSet;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!primitiveType) {
                                throw new InvalidArgumentsException('primitive type must be non-null');
                            }
                            return [4 /*yield*/, this.getPrimitiveSet(primitiveType, opt_customKeyManager)];
                        case 1:
                            primitiveSet = _a.sent();
                            return [2 /*return*/, wrap(primitiveSet)];
                    }
                });
            });
        };
        /**
         * Creates a set of primitives corresponding to the keys with status Enabled
         * in the given keysetHandle, assuming all the correspoding key managers are
         * present (keys with status different from Enabled are skipped). If provided
         * uses customKeyManager instead of registered key managers for keys supported
         * by the customKeyManager.
         *
         * Visible for testing.
         */
        KeysetHandle.prototype.getPrimitiveSet = function (primitiveType, opt_customKeyManager) {
            return __awaiter$9(this, void 0, void 0, function () {
                var primitiveSet, keys, keysLength, i, key, keyData, primitive, entry;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            primitiveSet = new PrimitiveSet(primitiveType);
                            keys = this.keyset_.getKeyList();
                            keysLength = keys.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < keysLength))
                                return [3 /*break*/, 7];
                            key = keys[i];
                            if (!(key.getStatus() === PbKeyStatusType.ENABLED))
                                return [3 /*break*/, 6];
                            keyData = key.getKeyData();
                            if (!keyData) {
                                throw new SecurityException('Key data has to be non null.');
                            }
                            primitive = void 0;
                            if (!(opt_customKeyManager &&
                                opt_customKeyManager.getKeyType() === keyData.getTypeUrl()))
                                return [3 /*break*/, 3];
                            return [4 /*yield*/, opt_customKeyManager.getPrimitive(primitiveType, keyData)];
                        case 2:
                            primitive =
                                _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, getPrimitive(primitiveType, keyData)];
                        case 4:
                            primitive = _a.sent();
                            _a.label = 5;
                        case 5:
                            entry = primitiveSet.addPrimitive(primitive, key);
                            if (key.getKeyId() === this.keyset_.getPrimaryKeyId()) {
                                primitiveSet.setPrimary(entry);
                            }
                            _a.label = 6;
                        case 6:
                            i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/, primitiveSet];
                    }
                });
            });
        };
        /**
         * Encrypts the underlying keyset with the provided masterKeyAead wnd writes
         * the resulting encryptedKeyset to the given writer which must be non-null.
         *
         *
         */
        KeysetHandle.prototype.write = function (writer, masterKeyAead) {
            return __awaiter$9(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    // TODO implement
                    throw new SecurityException('KeysetHandle -- write: Not implemented yet.');
                });
            });
        };
        /**
         * Returns the keyset held by this KeysetHandle.
         *
         */
        KeysetHandle.prototype.getKeyset = function () {
            return this.keyset_;
        };
        return KeysetHandle;
    }());
    /**
     * Creates a KeysetHandle from an encrypted keyset obtained via reader, using
     * masterKeyAead to decrypt the keyset.
     *
     *
     */
    function read(reader, masterKeyAead) {
        return __awaiter$9(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                // TODO implement
                throw new SecurityException('KeysetHandle -- read: Not implemented yet.');
            });
        });
    }
    /**
     * Returns a new KeysetHandle that contains a single new key generated
     * according to keyTemplate.
     *
     *
     */
    function generateNew(keyTemplate) {
        return __awaiter$9(this, void 0, void 0, function () {
            var keyset;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, generateNewKeyset_(keyTemplate)];
                    case 1:
                        keyset = _a.sent();
                        return [2 /*return*/, new KeysetHandle(keyset)];
                }
            });
        });
    }
    /**
     * Generates a new Keyset that contains a single new key generated
     * according to keyTemplate.
     *
     */
    function generateNewKeyset_(keyTemplate) {
        return __awaiter$9(this, void 0, void 0, function () {
            var key, keyId, keyData, keyset;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = (new PbKeysetKey())
                            .setStatus(PbKeyStatusType.ENABLED)
                            .setOutputPrefixType(keyTemplate.getOutputPrefixType());
                        keyId = generateNewKeyId_();
                        key.setKeyId(keyId);
                        return [4 /*yield*/, newKeyData(keyTemplate)];
                    case 1:
                        keyData = _a.sent();
                        key.setKeyData(keyData);
                        keyset = new PbKeyset();
                        keyset.addKey(key);
                        keyset.setPrimaryKeyId(keyId);
                        return [2 /*return*/, keyset];
                }
            });
        });
    }
    /**
     * Generates a new random key ID.
     *
     * @return The key ID.
     */
    function generateNewKeyId_() {
        var bytes = randBytes(4);
        var value = 0;
        for (var i = 0; i < bytes.length; i++) {
            value += (bytes[i] & 255) << i * 8;
        }
        // Make sure the key ID is a positive integer smaller than 2^32.
        return Math.abs(value) % Math.pow(2, 32);
    }
    /**
     * Creates a KeysetHandle from a keyset, obtained via reader, which
     * must contain no secret key material.
     *
     * This can be used to load public keysets or envelope encryption keysets.
     * Users that need to load cleartext keysets can use CleartextKeysetHandle.
     *
     */
    function readNoSecret(reader) {
        var e_1, _a;
        if (reader === null) {
            throw new SecurityException('Reader has to be non-null.');
        }
        var keyset = reader.read();
        var keyList = keyset.getKeyList();
        try {
            for (var keyList_1 = tslib.__values(keyList), keyList_1_1 = keyList_1.next(); !keyList_1_1.done; keyList_1_1 = keyList_1.next()) {
                var key = keyList_1_1.value;
                var keyData = key.getKeyData();
                if (keyData) {
                    switch (keyData.getKeyMaterialType()) {
                        case PbKeyMaterialType.ASYMMETRIC_PUBLIC:
                        // fall through
                        case PbKeyMaterialType.REMOTE:
                            continue;
                    }
                }
                throw new SecurityException('Keyset contains secret key material.');
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (keyList_1_1 && !keyList_1_1.done && (_a = keyList_1.return))
                    _a.call(keyList_1);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        return new KeysetHandle(keyset);
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function deserializeNoSecretKeyset(serializedKeyset) {
        return readNoSecret(BinaryKeysetReader.withUint8Array(serializedKeyset));
    }
    var index$2 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        deserializeNoSecretKeyset: deserializeNoSecretKeyset
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * KeysetWriter knows how to write a keyset or an encrypted keyset.
     *
     * @final
     */
    var BinaryKeysetWriter = /** @class */ (function () {
        function BinaryKeysetWriter() {
        }
        /** @override */
        BinaryKeysetWriter.prototype.write = function (keyset) {
            if (!keyset) {
                throw new SecurityException('keyset has to be non-null.');
            }
            return keyset.serializeBinary();
        };
        return BinaryKeysetWriter;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var binaryKeysetWriter = new BinaryKeysetWriter();
    /**
     * Static methods for reading or writing cleartext keysets.
     *
     * @final
     */
    var CleartextKeysetHandle = /** @class */ (function () {
        function CleartextKeysetHandle() {
        }
        /**
         * Serializes a KeysetHandle to binary.
         *
         */
        CleartextKeysetHandle.serializeToBinary = function (keysetHandle) {
            return binaryKeysetWriter.write(keysetHandle.getKeyset());
        };
        /**
         * Creates a KeysetHandle from a binary representation of a keyset.
         *
         */
        CleartextKeysetHandle.deserializeFromBinary = function (keysetBinary) {
            var reader = BinaryKeysetReader.withUint8Array(keysetBinary);
            var keysetFromReader = reader.read();
            return new KeysetHandle(keysetFromReader);
        };
        return CleartextKeysetHandle;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var deserializeKeyset = CleartextKeysetHandle.deserializeFromBinary;
    var serializeKeyset = CleartextKeysetHandle.serializeToBinary;
    var index$3 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        deserializeKeyset: deserializeKeyset,
        serializeKeyset: serializeKeyset
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for hybrid encryption.
     *
     * Hybrid Encryption combines the efficiency of symmetric encryption with the
     * convenience of public-key encryption: to encrypt a message a fresh symmetric
     * key is generated and used to encrypt the actual plaintext data, while the
     * recipient’s public key is used to encrypt the symmetric key only, and the
     * final ciphertext consists of the symmetric ciphertext and the encrypted
     * symmetric key.
     *
     * WARNING: Hybrid Encryption does not provide authenticity, that is the
     * recipient of an encrypted message does not know the identity of the sender.
     * Similar to general public-key encryption schemes the security goal of Hybrid
     * Encryption is to provide privacy only. In other words, Hybrid Encryption is
     * secure if and only if the recipient can accept anonymous messages or can rely
     * on other mechanisms to authenticate the sender.
     *
     * Security guarantees: The functionality of Hybrid Encryption is represented as
     * a pair of primitives (interfaces): `HybridEncrypt` for encryption of data,
     * and `HybridDecrypt` for decryption. Implementations of these interfaces are
     * secure against adaptive chosen ciphertext attacks.
     *
     * In addition to `plaintext` the encryption takes an extra, optional parameter
     * `opt_contextInfo`, which usually is public data implicit from the context,
     * but should be bound to the resulting ciphertext, i.e. the ciphertext allows
     * for checking the integrity of `opt_contextInfo` (but there are no guarantees
     * wrt. the secrecy or authenticity of `opt_contextInfo`).
     *
     * `opt_contextInfo` can be empty or null, but to ensure the correct
     * decryption of a ciphertext the same value must be provided for the decryption
     * operation as was used during encryption (cf. `HybridEncrypt`}).
     *
     * A concrete instantiation of this interface can implement the binding of
     * contextInfo to the ciphertext in various ways, for example:
     *     * use `opt_contextInfo` as "associated data"-input for the employed
     *     AEAD symmetric encryption (cf. https://tools.ietf.org/html/rfc5116).
     *     * use `opt_contextInfo` as "CtxInfo"-input for HKDF (if the
     * implementation uses HKDF as key derivation function, cf.
     *      https://tools.ietf.org/html/rfc5869).
     *
     */
    var HybridDecrypt = /** @class */ (function () {
        function HybridDecrypt() {
        }
        return HybridDecrypt;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$a = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var WrappedHybridDecrypt = /** @class */ (function (_super) {
        tslib.__extends(WrappedHybridDecrypt, _super);
        // The constructor should be @private, but it is not supported by Closure
        // (see https://github.com/google/closure-compiler/issues/2761).
        function WrappedHybridDecrypt(hybridDecryptPrimitiveSet) {
            var _this = _super.call(this) || this;
            _this.hybridDecryptPrimitiveSet = hybridDecryptPrimitiveSet;
            return _this;
        }
        WrappedHybridDecrypt.newHybridDecrypt = function (hybridDecryptPrimitiveSet) {
            if (!hybridDecryptPrimitiveSet) {
                throw new SecurityException('Primitive set has to be non-null.');
            }
            return new WrappedHybridDecrypt(hybridDecryptPrimitiveSet);
        };
        /** @override */
        WrappedHybridDecrypt.prototype.decrypt = function (ciphertext, opt_contextInfo) {
            return __awaiter$a(this, void 0, void 0, function () {
                var keyId, primitives_1, rawCiphertext, decryptedText, e_1, primitives;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!ciphertext) {
                                throw new SecurityException('Ciphertext has to be non-null.');
                            }
                            if (!(ciphertext.length > CryptoFormat.NON_RAW_PREFIX_SIZE))
                                return [3 /*break*/, 6];
                            keyId = ciphertext.subarray(0, CryptoFormat.NON_RAW_PREFIX_SIZE);
                            return [4 /*yield*/, this.hybridDecryptPrimitiveSet.getPrimitives(keyId)];
                        case 1:
                            primitives_1 = _a.sent();
                            rawCiphertext = ciphertext.subarray(CryptoFormat.NON_RAW_PREFIX_SIZE, ciphertext.length);
                            decryptedText = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.tryDecryption_(primitives_1, rawCiphertext, opt_contextInfo)];
                        case 3:
                            decryptedText = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            if (decryptedText) {
                                return [2 /*return*/, decryptedText];
                            }
                            _a.label = 6;
                        case 6: return [4 /*yield*/, this.hybridDecryptPrimitiveSet.getRawPrimitives()];
                        case 7:
                            primitives = _a.sent();
                            return [2 /*return*/, this.tryDecryption_(primitives, ciphertext, opt_contextInfo)];
                    }
                });
            });
        };
        /**
         * Tries to decrypt the ciphertext using each entry in primitives and
         * returns the ciphertext decrypted by first primitive which succeed. It
         * throws an exception if no entry succeeds.
         *
         *
         */
        WrappedHybridDecrypt.prototype.tryDecryption_ = function (primitives, ciphertext, opt_contextInfo) {
            return __awaiter$a(this, void 0, void 0, function () {
                var primitivesLength, i, primitive, decryptionResult, e_2;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            primitivesLength = primitives.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < primitivesLength))
                                return [3 /*break*/, 7];
                            if (primitives[i].getKeyStatus() != PbKeyStatusType.ENABLED) {
                                return [3 /*break*/, 6];
                            }
                            primitive = primitives[i].getPrimitive();
                            decryptionResult = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, primitive.decrypt(ciphertext, opt_contextInfo)];
                        case 3:
                            decryptionResult = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            return [3 /*break*/, 6];
                        case 5: return [2 /*return*/, decryptionResult];
                        case 6:
                            i++;
                            return [3 /*break*/, 1];
                        case 7: throw new SecurityException('Decryption failed for the given ciphertext.');
                    }
                });
            });
        };
        return WrappedHybridDecrypt;
    }(HybridDecrypt));
    var HybridDecryptWrapper = /** @class */ (function () {
        function HybridDecryptWrapper() {
        }
        /**
         * @override
         */
        HybridDecryptWrapper.prototype.wrap = function (primitiveSet) {
            return WrappedHybridDecrypt.newHybridDecrypt(primitiveSet);
        };
        /**
         * @override
         */
        HybridDecryptWrapper.prototype.getPrimitiveType = function () {
            return HybridDecrypt;
        };
        return HybridDecryptWrapper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$4() {
        registerPrimitiveWrapper(new HybridDecryptWrapper());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$b = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Computes an HKDF.
     *
     * @param size The length of the generated pseudorandom string in
     *     bytes. The maximal size is 255 * DigestSize, where DigestSize is the size
     *     of the underlying HMAC.
     * @param hash the name of the hash function. Accepted names are SHA-1,
     *     SHA-256 and SHA-512
     * @param ikm Input keying material.
     * @param info Context and application specific
     *     information (can be a zero-length array).
     * @param opt_salt Salt value (a non-secret random
     *     value). If not provided, it is set to a string of hash length zeros.
     * @return Output keying material (okm).
     */
    function compute(size, hash, ikm, info, opt_salt) {
        return __awaiter$b(this, void 0, void 0, function () {
            var digestSize, salt, hmac, prk, ctr, pos, digest, result, input;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Number.isInteger(size)) {
                            throw new InvalidArgumentsException('size must be an integer');
                        }
                        if (size <= 0) {
                            throw new InvalidArgumentsException('size must be positive');
                        }
                        switch (hash) {
                            case 'SHA-1':
                                digestSize = 20;
                                if (size > 255 * 20) {
                                    throw new InvalidArgumentsException('size too large');
                                }
                                break;
                            case 'SHA-256':
                                digestSize = 32;
                                if (size > 255 * 32) {
                                    throw new InvalidArgumentsException('size too large');
                                }
                                break;
                            case 'SHA-512':
                                digestSize = 64;
                                if (size > 255 * 64) {
                                    throw new InvalidArgumentsException('size too large');
                                }
                                break;
                            default:
                                throw new InvalidArgumentsException(hash + ' is not supported');
                        }
                        requireUint8Array(ikm);
                        requireUint8Array(info);
                        salt = opt_salt;
                        if (opt_salt == null || salt === undefined || salt.length == 0) {
                            salt = new Uint8Array(digestSize);
                        }
                        requireUint8Array(salt);
                        return [4 /*yield*/, fromRawKey$1(hash, salt, digestSize)];
                    case 1:
                        hmac = _a.sent();
                        return [4 /*yield*/, hmac.computeMac(
                            // Pseudorandom Key
                            ikm)];
                    case 2:
                        prk = _a.sent();
                        return [4 /*yield*/, fromRawKey$1(hash, prk, digestSize)];
                    case 3:
                        // Expand
                        hmac = _a.sent();
                        ctr = 1;
                        pos = 0;
                        digest = new Uint8Array(0);
                        result = new Uint8Array(size);
                        _a.label = 4;
                    case 4:
                        if (!true)
                            return [3 /*break*/, 6];
                        input = new Uint8Array(digest.length + info.length + 1);
                        input.set(digest, 0);
                        input.set(info, digest.length);
                        input[input.length - 1] = ctr;
                        return [4 /*yield*/, hmac.computeMac(input)];
                    case 5:
                        digest = _a.sent();
                        if (pos + digest.length < size) {
                            result.set(digest, pos);
                            pos += digest.length;
                            ctr++;
                        }
                        else {
                            result.set(digest.subarray(0, size - pos), pos);
                            return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$c = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * HKDF-based ECIES-KEM (key encapsulation mechanism) for ECIES recipient.
     */
    var EciesHkdfKemRecipient = /** @class */ (function () {
        function EciesHkdfKemRecipient(privateKey) {
            if (!privateKey) {
                throw new SecurityException('Private key has to be non-null.');
            }
            // CryptoKey should have the properties type and algorithm.
            if (privateKey.type !== 'private' || !privateKey.algorithm) {
                throw new SecurityException('Expected crypto key of type: private.');
            }
            this.privateKey_ = privateKey;
        }
        /**
         * @param kemToken the public ephemeral point.
         * @param keySizeInBytes The length of the generated pseudorandom
         *     string in bytes. The maximal size is 255 * DigestSize, where DigestSize
         *     is the size of the underlying HMAC.
         * @param pointFormat The format of the
         *     public ephemeral point.
         * @param hkdfHash the name of the hash function. Accepted names are
         *     SHA-1, SHA-256 and SHA-512.
         * @param hkdfInfo Context and application specific
         *     information (can be a zero-length array).
         * @param opt_hkdfSalt Salt value (a non-secret random
         *     value). If not provided, it is set to a string of hash length zeros.
         * @return The KEM key and token.
         */
        EciesHkdfKemRecipient.prototype.decapsulate = function (kemToken, keySizeInBytes, pointFormat, hkdfHash, hkdfInfo, opt_hkdfSalt) {
            return __awaiter$c(this, void 0, void 0, function () {
                var namedCurve, jwk, publicKey, sharedSecret, hkdfIkm, kemKey;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namedCurve = this.privateKey_.algorithm.namedCurve;
                            if (!namedCurve) {
                                throw new SecurityException('Curve has to be defined.');
                            }
                            jwk = pointDecode(namedCurve, pointFormat, kemToken);
                            return [4 /*yield*/, importPublicKey('ECDH', jwk)];
                        case 1:
                            publicKey = _a.sent();
                            return [4 /*yield*/, computeEcdhSharedSecret(this.privateKey_, publicKey)];
                        case 2:
                            sharedSecret = _a.sent();
                            hkdfIkm = concat(kemToken, sharedSecret);
                            return [4 /*yield*/, compute(keySizeInBytes, hkdfHash, hkdfIkm, hkdfInfo, opt_hkdfSalt)];
                        case 3:
                            kemKey = _a.sent();
                            return [2 /*return*/, kemKey];
                    }
                });
            });
        };
        return EciesHkdfKemRecipient;
    }());
    function fromJsonWebKey(jwk) {
        return __awaiter$c(this, void 0, void 0, function () {
            var privateKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importPrivateKey('ECDH', jwk)];
                    case 1:
                        privateKey = _a.sent();
                        return [2 /*return*/, new EciesHkdfKemRecipient(privateKey)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$d = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Implementation of ECIES AEAD HKDF hybrid decryption.
     *
     * @final
     */
    var EciesAeadHkdfHybridDecrypt = /** @class */ (function (_super) {
        tslib.__extends(EciesAeadHkdfHybridDecrypt, _super);
        /**
         * @param hkdfHash the name of the HMAC algorithm, accepted names
         *     are: SHA-1, SHA-256 and SHA-512.
         */
        function EciesAeadHkdfHybridDecrypt(recipientPrivateKey, kemRecipient, hkdfHash, pointFormat, demHelper, opt_hkdfSalt) {
            var _this = _super.call(this) || this;
            if (!recipientPrivateKey) {
                throw new SecurityException('Recipient private key has to be non-null.');
            }
            if (!kemRecipient) {
                throw new SecurityException('KEM recipient has to be non-null.');
            }
            if (!hkdfHash) {
                throw new SecurityException('HKDF hash algorithm has to be non-null.');
            }
            if (!pointFormat) {
                throw new SecurityException('Point format has to be non-null.');
            }
            if (!demHelper) {
                throw new SecurityException('DEM helper has to be non-null.');
            }
            var crv = recipientPrivateKey.crv;
            if (!crv) {
                throw new SecurityException('Curve has to be defined.');
            }
            var curveType = curveFromString(crv);
            var headerSize = encodingSizeInBytes(curveType, pointFormat);
            _this.kemRecipient_ = kemRecipient;
            _this.hkdfHash_ = hkdfHash;
            _this.pointFormat_ = pointFormat;
            _this.demHelper_ = demHelper;
            _this.headerSize_ = headerSize;
            _this.hkdfSalt_ = opt_hkdfSalt;
            return _this;
        }
        /**
         * Decrypts ciphertext using opt_contextInfo as info parameter of the
         * underlying HKDF.
         *
         * @override
         */
        EciesAeadHkdfHybridDecrypt.prototype.decrypt = function (ciphertext, associatedData) {
            return __awaiter$d(this, void 0, void 0, function () {
                var kemToken, ciphertextBody, aead;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (ciphertext.length < this.headerSize_) {
                                throw new SecurityException('Ciphertext is too short.');
                            }
                            kemToken = ciphertext.slice(0, this.headerSize_);
                            ciphertextBody = ciphertext.slice(this.headerSize_, ciphertext.length);
                            return [4 /*yield*/, this.getAead_(kemToken, associatedData)];
                        case 1:
                            aead = _a.sent();
                            return [2 /*return*/, aead.decrypt(ciphertextBody)];
                    }
                });
            });
        };
        EciesAeadHkdfHybridDecrypt.prototype.getAead_ = function (kemToken, opt_contextInfo) {
            return __awaiter$d(this, void 0, void 0, function () {
                var symmetricKey;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Variable hkdfInfo is not optional for decapsulate method. Thus it should
                            // be an empty array in case that it is not defined by the caller of decrypt
                            // method.
                            if (!opt_contextInfo) {
                                opt_contextInfo = new Uint8Array(0);
                            }
                            return [4 /*yield*/, this.kemRecipient_.decapsulate(kemToken, this.demHelper_.getDemKeySizeInBytes(), this.pointFormat_, this.hkdfHash_, opt_contextInfo, this.hkdfSalt_)];
                        case 1:
                            symmetricKey = _a.sent();
                            return [2 /*return*/, this.demHelper_.getAead(symmetricKey)];
                    }
                });
            });
        };
        return EciesAeadHkdfHybridDecrypt;
    }(HybridDecrypt));
    /**
     * @param hkdfHash the name of the HMAC algorithm, accepted names
     *     are: SHA-1, SHA-256 and SHA-512.
     */
    function fromJsonWebKey$1(recipientPrivateKey, hkdfHash, pointFormat, demHelper, opt_hkdfSalt) {
        return __awaiter$d(this, void 0, void 0, function () {
            var kemRecipient;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!recipientPrivateKey) {
                            throw new SecurityException('Recipient private key has to be non-null.');
                        }
                        if (!hkdfHash) {
                            throw new SecurityException('HKDF hash algorithm has to be non-null.');
                        }
                        if (!pointFormat) {
                            throw new SecurityException('Point format has to be non-null.');
                        }
                        if (!demHelper) {
                            throw new SecurityException('DEM helper has to be non-null.');
                        }
                        if (!recipientPrivateKey) {
                            throw new SecurityException('Recipient private key has to be non-null.');
                        }
                        return [4 /*yield*/, fromJsonWebKey(recipientPrivateKey)];
                    case 1:
                        kemRecipient = _a.sent();
                        return [2 /*return*/, new EciesAeadHkdfHybridDecrypt(recipientPrivateKey, kemRecipient, hkdfHash, pointFormat, demHelper, opt_hkdfSalt)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for hybrid encryption.
     *
     * Hybrid Encryption combines the efficiency of symmetric encryption with the
     * convenience of public-key encryption: to encrypt a message a fresh symmetric
     * key is generated and used to encrypt the actual plaintext data, while the
     * recipient’s public key is used to encrypt the symmetric key only, and the
     * final ciphertext consists of the symmetric ciphertext and the encrypted
     * symmetric key.
     *
     * WARNING: Hybrid Encryption does not provide authenticity, that is the
     * recipient of an encrypted message does not know the identity of the sender.
     * Similar to general public-key encryption schemes the security goal of Hybrid
     * Encryption is to provide privacy only. In other words, Hybrid Encryption is
     * secure if and only if the recipient can accept anonymous messages or can rely
     * on other mechanisms to authenticate the sender.
     *
     * Security guarantees: The functionality of Hybrid Encryption is represented as
     * a pair of primitives (interfaces): `HybridEncrypt` for encryption of data,
     * and `HybridDecrypt` for decryption. Implementations of these interfaces are
     * secure against adaptive chosen ciphertext attacks.
     *
     * In addition to `plaintext` the encryption takes an extra, optional parameter
     * `opt_contextInfo`, which usually is public data implicit from the context,
     * but should be bound to the resulting ciphertext, i.e. the ciphertext allows
     * for checking the integrity of `opt_contextInfo` (but there are no guarantees
     * wrt. the secrecy or authenticity of `opt_contextInfo`).
     *
     * `opt_contextInfo` can be empty or null, but to ensure the correct
     * decryption of a ciphertext the same value must be provided for the decryption
     * operation as was used during encryption (cf. `HybridEncrypt`}).
     *
     * A concrete instantiation of this interface can implement the binding of
     * contextInfo to the ciphertext in various ways, for example:
     *     * use `opt_contextInfo` as "associated data"-input for the employed
     *     AEAD symmetric encryption (cf. https://tools.ietf.org/html/rfc5116).
     *     * use `opt_contextInfo` as "CtxInfo"-input for HKDF (if the
     * implementation uses HKDF as key derivation function, cf.
     *      https://tools.ietf.org/html/rfc5869).
     *
     */
    var HybridEncrypt = /** @class */ (function () {
        function HybridEncrypt() {
        }
        return HybridEncrypt;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$e = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * HKDF-based ECIES-KEM (key encapsulation mechanism) for ECIES sender.
     */
    var EciesHkdfKemSender = /** @class */ (function () {
        function EciesHkdfKemSender(recipientPublicKey) {
            if (!recipientPublicKey) {
                throw new SecurityException('Recipient public key has to be non-null.');
            }
            // CryptoKey should have the properties type and algorithm.
            if (recipientPublicKey.type !== 'public' || !recipientPublicKey.algorithm) {
                throw new SecurityException('Expected Crypto key of type: public.');
            }
            this.publicKey_ = recipientPublicKey;
        }
        /**
         * @param keySizeInBytes The length of the generated pseudorandom
         *     string in bytes. The maximal size is 255 * DigestSize, where DigestSize
         *     is the size of the underlying HMAC.
         * @param pointFormat The format of the
         *     public ephemeral point.
         * @param hkdfHash the name of the hash function. Accepted names are
         *     SHA-1, SHA-256 and SHA-512.
         * @param hkdfInfo Context and application specific
         *     information (can be a zero-length array).
         * @param opt_hkdfSalt Salt value (a non-secret random
         *     value). If not provided, it is set to a string of hash length zeros.
         * @return The KEM key and
         *     token.
         */
        EciesHkdfKemSender.prototype.encapsulate = function (keySizeInBytes, pointFormat, hkdfHash, hkdfInfo, opt_hkdfSalt) {
            return __awaiter$e(this, void 0, void 0, function () {
                var namedCurve, ephemeralKeyPair, sharedSecret, jwk, crv, kemToken, hkdfIkm, kemKey;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namedCurve = this.publicKey_.algorithm.namedCurve;
                            if (!namedCurve) {
                                throw new SecurityException('Curve has to be defined.');
                            }
                            return [4 /*yield*/, generateKeyPair('ECDH', namedCurve)];
                        case 1:
                            ephemeralKeyPair = _a.sent();
                            return [4 /*yield*/, computeEcdhSharedSecret(ephemeralKeyPair.privateKey, this.publicKey_)];
                        case 2:
                            sharedSecret = _a.sent();
                            return [4 /*yield*/, exportCryptoKey(ephemeralKeyPair.publicKey)];
                        case 3:
                            jwk = _a.sent();
                            crv = jwk.crv;
                            if (!crv) {
                                throw new SecurityException('Curve has to be defined.');
                            }
                            kemToken = pointEncode(crv, pointFormat, jwk);
                            hkdfIkm = concat(kemToken, sharedSecret);
                            return [4 /*yield*/, compute(keySizeInBytes, hkdfHash, hkdfIkm, hkdfInfo, opt_hkdfSalt)];
                        case 4:
                            kemKey = _a.sent();
                            return [2 /*return*/, { 'key': kemKey, 'token': kemToken }];
                    }
                });
            });
        };
        return EciesHkdfKemSender;
    }());
    function fromJsonWebKey$2(jwk) {
        return __awaiter$e(this, void 0, void 0, function () {
            var publicKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importPublicKey('ECDH', jwk)];
                    case 1:
                        publicKey = _a.sent();
                        return [2 /*return*/, new EciesHkdfKemSender(publicKey)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$f = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Implementation of ECIES AEAD HKDF hybrid encryption.
     *
     * @final
     */
    var EciesAeadHkdfHybridEncrypt = /** @class */ (function (_super) {
        tslib.__extends(EciesAeadHkdfHybridEncrypt, _super);
        /**
         * @param hkdfHash the name of the HMAC algorithm, accepted names
         *     are: SHA-1, SHA-256 and SHA-512.
         */
        function EciesAeadHkdfHybridEncrypt(kemSender, hkdfHash, pointFormat, demHelper, opt_hkdfSalt) {
            var _this = _super.call(this) || this;
            // TODO(thaidn): do we actually need these null checks?
            if (!kemSender) {
                throw new SecurityException('KEM sender has to be non-null.');
            }
            if (!hkdfHash) {
                throw new SecurityException('HMAC algorithm has to be non-null.');
            }
            if (!pointFormat) {
                throw new SecurityException('Point format has to be non-null.');
            }
            if (!demHelper) {
                throw new SecurityException('DEM helper has to be non-null.');
            }
            _this.kemSender_ = kemSender;
            _this.hkdfHash_ = hkdfHash;
            _this.pointFormat_ = pointFormat;
            _this.demHelper_ = demHelper;
            _this.hkdfSalt_ = opt_hkdfSalt;
            return _this;
        }
        /**
         * Encrypts plaintext using opt_contextInfo as info parameter of the
         * underlying HKDF.
         *
         * @override
         */
        EciesAeadHkdfHybridEncrypt.prototype.encrypt = function (plaintext, associatedData) {
            if (associatedData === void 0) {
                associatedData = new Uint8Array(0);
            }
            return __awaiter$f(this, void 0, void 0, function () {
                var keySizeInBytes, kemKey, aead, ciphertextBody, header;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            keySizeInBytes = this.demHelper_.getDemKeySizeInBytes();
                            return [4 /*yield*/, this.kemSender_.encapsulate(keySizeInBytes, this.pointFormat_, this.hkdfHash_, associatedData, this.hkdfSalt_)];
                        case 1:
                            kemKey = _a.sent();
                            return [4 /*yield*/, this.demHelper_.getAead(kemKey['key'])];
                        case 2:
                            aead = _a.sent();
                            return [4 /*yield*/, aead.encrypt(plaintext)];
                        case 3:
                            ciphertextBody = _a.sent();
                            header = kemKey['token'];
                            return [2 /*return*/, concat(header, ciphertextBody)];
                    }
                });
            });
        };
        return EciesAeadHkdfHybridEncrypt;
    }(HybridEncrypt));
    /**
     * @param hkdfHash the name of the HMAC algorithm, accepted names
     *     are: SHA-1, SHA-256 and SHA-512.
     */
    function fromJsonWebKey$3(recipientPublicKey, hkdfHash, pointFormat, demHelper, opt_hkdfSalt) {
        return __awaiter$f(this, void 0, void 0, function () {
            var kemSender;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!recipientPublicKey) {
                            throw new SecurityException('Recipient public key has to be non-null.');
                        }
                        if (!hkdfHash) {
                            throw new SecurityException('HMAC algorithm has to be non-null.');
                        }
                        if (!pointFormat) {
                            throw new SecurityException('Point format has to be non-null.');
                        }
                        if (!demHelper) {
                            throw new SecurityException('DEM helper has to be non-null.');
                        }
                        return [4 /*yield*/, fromJsonWebKey$2(recipientPublicKey)];
                    case 1:
                        kemSender = _a.sent();
                        return [2 /*return*/, new EciesAeadHkdfHybridEncrypt(kemSender, hkdfHash, pointFormat, demHelper, opt_hkdfSalt)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    // This file contains only functions which are useful for implementation of
    // private and public ECIES AEAD HKDF key manager.
    /**
     * WARNING: This method assumes that the given key proto is valid.
     *
     */
    function getJsonWebKeyFromProto(key) {
        var publicKey;
        var d = null;
        if (key instanceof PbEciesAeadHkdfPrivateKey) {
            publicKey = key.getPublicKey();
        }
        else {
            publicKey = key;
        }
        var params = publicKey.getParams();
        if (!params) {
            throw new SecurityException('Params not set');
        }
        var kemParams = params.getKemParams();
        if (!kemParams) {
            throw new SecurityException('KEM params not set');
        }
        var curveType = curveTypeProtoToSubtle(kemParams.getCurveType());
        var expectedLength = fieldSizeInBytes(curveType);
        var x = bigEndianNumberToCorrectLength(publicKey.getX_asU8(), expectedLength);
        var y = bigEndianNumberToCorrectLength(publicKey.getY_asU8(), expectedLength);
        if (key instanceof PbEciesAeadHkdfPrivateKey) {
            d = bigEndianNumberToCorrectLength(key.getKeyValue_asU8(), expectedLength);
        }
        return getJsonWebKey(curveType, x, y, d);
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Static methods and constants for registering with the Registry all instances
     * of Aead key types supported in a particular release of Tink.
     *
     * To register all Aead key types from the current Tink release one can do:
     *
     * AeadConfig.register();
     *
     * For more information on creation and usage of Aead instances see AeadFactory.
     *
     * @final
     */
    var AeadConfig = /** @class */ (function () {
        function AeadConfig() {
        }
        /**
         * Registers key managers for all Aead key types from the current Tink
         * release.
         */
        AeadConfig.register = function () {
            // TODO MacConfig.register() should be here.
            AesGcmKeyManager.register();
            AesCtrHmacAeadKeyManager.register();
            AeadWrapper.register();
        };
        return AeadConfig;
    }());
    AeadConfig.CONFIG_NAME_ = 'TINK_AEAD';
    AeadConfig.PRIMITIVE_NAME = 'Aead';
    AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL = AesCtrHmacAeadKeyManager.KEY_TYPE;
    AeadConfig.AES_GCM_TYPE_URL = AesGcmKeyManager.KEY_TYPE;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function validateKemParams(kemParams) {
        var curve = kemParams.getCurveType();
        if (curve !== PbEllipticCurveType.NIST_P256 &&
            curve !== PbEllipticCurveType.NIST_P384 &&
            curve !== PbEllipticCurveType.NIST_P521) {
            throw new SecurityException('Invalid KEM params - unknown curve type.');
        }
        var hashType = kemParams.getHkdfHashType();
        if (hashType !== PbHashType.SHA1 && hashType !== PbHashType.SHA256 &&
            hashType !== PbHashType.SHA384 && hashType !== PbHashType.SHA512) {
            throw new SecurityException('Invalid KEM params - unknown hash type.');
        }
    }
    function validateDemParams(demParams) {
        if (!demParams.getAeadDem()) {
            throw new SecurityException('Invalid DEM params - missing AEAD key template.');
        }
        // It is checked also here due to methods for creating new keys. We do not
        // allow creating new keys from formats which contains key templates of
        // not supported key types.
        var aeadKeyType = demParams.getAeadDem().getTypeUrl();
        if (aeadKeyType != AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL &&
            aeadKeyType != AeadConfig.AES_GCM_TYPE_URL) {
            throw new SecurityException('Invalid DEM params - ' + aeadKeyType +
                ' template is not supported by ECIES AEAD HKDF.');
        }
    }
    function validateParams(params) {
        var kemParams = params.getKemParams();
        if (!kemParams) {
            throw new SecurityException('Invalid params - missing KEM params.');
        }
        validateKemParams(kemParams);
        var demParams = params.getDemParams();
        if (!demParams) {
            throw new SecurityException('Invalid params - missing DEM params.');
        }
        validateDemParams(demParams);
        var pointFormat = params.getEcPointFormat();
        if (pointFormat !== PbPointFormat.UNCOMPRESSED &&
            pointFormat !== PbPointFormat.COMPRESSED &&
            pointFormat !== PbPointFormat.DO_NOT_USE_CRUNCHY_UNCOMPRESSED) {
            throw new SecurityException('Invalid key params - unknown EC point format.');
        }
    }
    function validateKeyFormat(keyFormat) {
        var params = keyFormat.getParams();
        if (!params) {
            throw new SecurityException('Invalid key format - missing key params.');
        }
        validateParams(params);
    }
    function validatePublicKey(key, publicKeyManagerVersion) {
        validateVersion(key.getVersion(), publicKeyManagerVersion);
        var params = key.getParams();
        if (!params) {
            throw new SecurityException('Invalid public key - missing key params.');
        }
        validateParams(params);
        if (!key.getX().length || !key.getY().length) {
            throw new SecurityException('Invalid public key - missing value of X or Y.');
        }
    }
    // TODO Should we add more checks here?
    function validatePrivateKey(key, privateKeyManagerVersion, publicKeyManagerVersion) {
        validateVersion(key.getVersion(), privateKeyManagerVersion);
        if (!key.getKeyValue()) {
            throw new SecurityException('Invalid private key - missing private key value.');
        }
        var publicKey = key.getPublicKey();
        if (!publicKey) {
            throw new SecurityException('Invalid private key - missing public key information.');
        }
        validatePublicKey(publicKey, publicKeyManagerVersion);
    }
    // TODO Should we add more checks here?
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$g = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var RegistryEciesAeadHkdfDemHelper = /** @class */ (function () {
        function RegistryEciesAeadHkdfDemHelper(keyTemplate) {
            var demKeySize;
            var aesCtrKeySize;
            var keyFormat;
            var keyTypeUrl = keyTemplate.getTypeUrl();
            switch (keyTypeUrl) {
                case AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL:
                    keyFormat =
                        RegistryEciesAeadHkdfDemHelper.getAesCtrHmacKeyFormat_(keyTemplate);
                    var aesCtrKeyFormat = keyFormat.getAesCtrKeyFormat();
                    if (!aesCtrKeyFormat) {
                        throw new SecurityException('AES-CTR key format not set');
                    }
                    aesCtrKeySize = aesCtrKeyFormat.getKeySize();
                    var hmacKeyFormat = keyFormat.getHmacKeyFormat();
                    if (!hmacKeyFormat) {
                        throw new SecurityException('HMAC key format not set');
                    }
                    var hmacKeySize = hmacKeyFormat.getKeySize();
                    demKeySize = aesCtrKeySize + hmacKeySize;
                    break;
                case AeadConfig.AES_GCM_TYPE_URL:
                    keyFormat =
                        RegistryEciesAeadHkdfDemHelper.getAesGcmKeyFormat_(keyTemplate);
                    demKeySize = keyFormat.getKeySize();
                    break;
                default:
                    throw new SecurityException('Key type URL ' + keyTypeUrl + ' is not supported.');
            }
            var keyFactory = getKeyManager(keyTypeUrl).getKeyFactory();
            this.key_ =
                keyFactory.newKey(keyFormat);
            this.demKeyTypeUrl_ = keyTypeUrl;
            this.demKeySize_ = demKeySize;
            this.aesCtrKeySize_ = aesCtrKeySize;
        }
        /**
         * @override
         */
        RegistryEciesAeadHkdfDemHelper.prototype.getDemKeySizeInBytes = function () {
            return this.demKeySize_;
        };
        /**
         * @override
         */
        RegistryEciesAeadHkdfDemHelper.prototype.getAead = function (demKey) {
            return __awaiter$g(this, void 0, void 0, function () {
                var key;
                return tslib.__generator(this, function (_a) {
                    if (demKey.length != this.demKeySize_) {
                        throw new SecurityException('Key is not of the correct length, expected length: ' +
                            this.demKeySize_ + ', but got key of length: ' + demKey.length + '.');
                    }
                    if (this.demKeyTypeUrl_ === AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL) {
                        key = this.replaceAesCtrHmacKeyValue_(demKey);
                    }
                    else {
                        key = this.replaceAesGcmKeyValue_(demKey);
                    }
                    return [2 /*return*/, getPrimitive(Aead, key, this.demKeyTypeUrl_)];
                });
            });
        };
        RegistryEciesAeadHkdfDemHelper.getAesGcmKeyFormat_ = function (keyTemplate) {
            var keyFormat;
            try {
                keyFormat = PbAesGcmKeyFormat.deserializeBinary(keyTemplate.getValue());
            }
            catch (e) {
                throw new SecurityException('Could not parse the given Uint8Array as a serialized proto of ' +
                    AeadConfig.AES_GCM_TYPE_URL + '.');
            }
            if (!keyFormat.getKeySize()) {
                throw new SecurityException('Could not parse the given Uint8Array as a serialized proto of ' +
                    AeadConfig.AES_GCM_TYPE_URL + '.');
            }
            return keyFormat;
        };
        RegistryEciesAeadHkdfDemHelper.getAesCtrHmacKeyFormat_ = function (keyTemplate) {
            var keyFormat;
            try {
                keyFormat =
                    PbAesCtrHmacAeadKeyFormat.deserializeBinary(keyTemplate.getValue());
            }
            catch (e) {
                throw new SecurityException('Could not parse the given Uint8Array ' +
                    'as a serialized proto of ' + AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL +
                    '.');
            }
            if (!keyFormat.getAesCtrKeyFormat() || !keyFormat.getHmacKeyFormat()) {
                throw new SecurityException('Could not parse the given Uint8Array as a serialized proto of ' +
                    AeadConfig.AES_CTR_HMAC_AEAD_TYPE_URL + '.');
            }
            return keyFormat;
        };
        RegistryEciesAeadHkdfDemHelper.prototype.replaceAesGcmKeyValue_ = function (symmetricKey) {
            if (!(this.key_ instanceof PbAesGcmKey)) {
                throw new SecurityException('Key is not an AES-CTR key');
            }
            var key = this.key_.setKeyValue(symmetricKey);
            return key;
        };
        RegistryEciesAeadHkdfDemHelper.prototype.replaceAesCtrHmacKeyValue_ = function (symmetricKey) {
            var key = this.key_;
            var aesCtrKey = key.getAesCtrKey();
            if (!aesCtrKey) {
                throw new SecurityException('AES-CTR key not set');
            }
            var aesCtrKeyValue = symmetricKey.slice(0, this.aesCtrKeySize_);
            aesCtrKey.setKeyValue(aesCtrKeyValue);
            var hmacKey = key.getHmacKey();
            if (!hmacKey) {
                throw new SecurityException('HMAC key not set');
            }
            var hmacKeyValue = symmetricKey.slice(this.aesCtrKeySize_, this.demKeySize_);
            hmacKey.setKeyValue(hmacKeyValue);
            return key;
        };
        return RegistryEciesAeadHkdfDemHelper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$h = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var EciesAeadHkdfPublicKeyFactory = /** @class */ (function () {
        function EciesAeadHkdfPublicKeyFactory() {
        }
        /** @override */
        EciesAeadHkdfPublicKeyFactory.prototype.newKey = function (keyFormat) {
            throw new SecurityException('This operation is not supported for public keys. ' +
                'Use EciesAeadHkdfPrivateKeyManager to generate new keys.');
        };
        /** @override */
        EciesAeadHkdfPublicKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            throw new SecurityException('This operation is not supported for public keys. ' +
                'Use EciesAeadHkdfPrivateKeyManager to generate new keys.');
        };
        return EciesAeadHkdfPublicKeyFactory;
    }());
    /**
     * @final
     */
    var EciesAeadHkdfPublicKeyManager = /** @class */ (function () {
        function EciesAeadHkdfPublicKeyManager() {
            this.keyFactory = new EciesAeadHkdfPublicKeyFactory();
        }
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$h(this, void 0, void 0, function () {
                var keyProto, recepientPublicKey, params, demParams, keyTemplate, demHelper, pointFormat, kemParams, hkdfHash, hkdfSalt;
                return tslib.__generator(this, function (_a) {
                    if (primitiveType !== this.getPrimitiveType()) {
                        throw new SecurityException('Requested primitive type which is not ' +
                            'supported by this key manager.');
                    }
                    keyProto = EciesAeadHkdfPublicKeyManager.getKeyProto_(key);
                    validatePublicKey(keyProto, this.getVersion());
                    recepientPublicKey = getJsonWebKeyFromProto(keyProto);
                    params = keyProto.getParams();
                    demParams = params.getDemParams();
                    if (!demParams) {
                        throw new SecurityException('DEM params not set');
                    }
                    keyTemplate = demParams.getAeadDem();
                    demHelper = new RegistryEciesAeadHkdfDemHelper(keyTemplate);
                    pointFormat = pointFormatProtoToSubtle(params.getEcPointFormat());
                    kemParams = params.getKemParams();
                    if (!kemParams) {
                        throw new SecurityException('KEM params not set');
                    }
                    hkdfHash = hashTypeProtoToString(kemParams.getHkdfHashType());
                    hkdfSalt = kemParams.getHkdfSalt_asU8();
                    return [2 /*return*/, fromJsonWebKey$3(recepientPublicKey, hkdfHash, pointFormat, demHelper, hkdfSalt)];
                });
            });
        };
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.getKeyType = function () {
            return EciesAeadHkdfPublicKeyManager.KEY_TYPE;
        };
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.getPrimitiveType = function () {
            return EciesAeadHkdfPublicKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.getVersion = function () {
            return EciesAeadHkdfPublicKeyManager.VERSION;
        };
        /** @override */
        EciesAeadHkdfPublicKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory;
        };
        EciesAeadHkdfPublicKeyManager.getKeyProto_ = function (keyMaterial) {
            if (keyMaterial instanceof PbKeyData) {
                return EciesAeadHkdfPublicKeyManager.getKeyProtoFromKeyData_(keyMaterial);
            }
            if (keyMaterial instanceof PbEciesAeadHkdfPublicKey) {
                return keyMaterial;
            }
            throw new SecurityException('Key type is not supported. This key manager supports ' +
                EciesAeadHkdfPublicKeyManager.KEY_TYPE + '.');
        };
        EciesAeadHkdfPublicKeyManager.getKeyProtoFromKeyData_ = function (keyData) {
            if (keyData.getTypeUrl() !== EciesAeadHkdfPublicKeyManager.KEY_TYPE) {
                throw new SecurityException('Key type ' + keyData.getTypeUrl() + ' is not supported. This key ' +
                    'manager supports ' + EciesAeadHkdfPublicKeyManager.KEY_TYPE + '.');
            }
            var key;
            try {
                key = PbEciesAeadHkdfPublicKey.deserializeBinary(keyData.getValue());
            }
            catch (e) {
                throw new SecurityException('Input cannot be parsed as ' +
                    EciesAeadHkdfPublicKeyManager.KEY_TYPE + ' key-proto.');
            }
            if (!key.getParams() || !key.getX() || !key.getY()) {
                throw new SecurityException('Input cannot be parsed as ' +
                    EciesAeadHkdfPublicKeyManager.KEY_TYPE + ' key-proto.');
            }
            return key;
        };
        return EciesAeadHkdfPublicKeyManager;
    }());
    EciesAeadHkdfPublicKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.EciesAeadHkdfPublicKey';
    EciesAeadHkdfPublicKeyManager.SUPPORTED_PRIMITIVE_ = HybridEncrypt;
    EciesAeadHkdfPublicKeyManager.VERSION = 0;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$i = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var VERSION$1 = 0;
    /**
     * @final
     */
    var EciesAeadHkdfPrivateKeyFactory = /** @class */ (function () {
        function EciesAeadHkdfPrivateKeyFactory() {
        }
        /**
         * @override
         */
        EciesAeadHkdfPrivateKeyFactory.prototype.newKey = function (keyFormat) {
            return __awaiter$i(this, void 0, void 0, function () {
                var keyFormatProto;
                return tslib.__generator(this, function (_a) {
                    if (!keyFormat) {
                        throw new SecurityException('Key format has to be non-null.');
                    }
                    keyFormatProto = EciesAeadHkdfPrivateKeyFactory.getKeyFormatProto_(keyFormat);
                    validateKeyFormat(keyFormatProto);
                    return [2 /*return*/, EciesAeadHkdfPrivateKeyFactory.newKeyImpl_(keyFormatProto)];
                });
            });
        };
        /**
         * @override
         */
        EciesAeadHkdfPrivateKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            return __awaiter$i(this, void 0, void 0, function () {
                var key, keyData;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.newKey(serializedKeyFormat)];
                        case 1:
                            key = _a.sent();
                            keyData = (new PbKeyData())
                                .setTypeUrl(EciesAeadHkdfPrivateKeyManager.KEY_TYPE)
                                .setValue(key.serializeBinary())
                                .setKeyMaterialType(PbKeyData.KeyMaterialType.ASYMMETRIC_PRIVATE);
                            return [2 /*return*/, keyData];
                    }
                });
            });
        };
        /** @override */
        EciesAeadHkdfPrivateKeyFactory.prototype.getPublicKeyData = function (serializedPrivateKey) {
            var privateKey = deserializePrivateKey(serializedPrivateKey);
            var publicKey = privateKey.getPublicKey();
            if (!publicKey) {
                throw new SecurityException('Public key not set');
            }
            var publicKeyData = (new PbKeyData())
                .setValue(publicKey.serializeBinary())
                .setTypeUrl(EciesAeadHkdfPublicKeyManager.KEY_TYPE)
                .setKeyMaterialType(PbKeyData.KeyMaterialType.ASYMMETRIC_PUBLIC);
            return publicKeyData;
        };
        /**
         * Generates key corresponding to the given key format.
         * WARNING: This function assume that the keyFormat has been validated.
         *
         */
        EciesAeadHkdfPrivateKeyFactory.newKeyImpl_ = function (keyFormat) {
            return __awaiter$i(this, void 0, void 0, function () {
                var params, kemParams, curveTypeProto, curveTypeSubtle, curveName, keyPair, jsonPublicKey, jsonPrivateKey;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = (keyFormat.getParams());
                            if (!params) {
                                throw new SecurityException('Params not set');
                            }
                            kemParams = params.getKemParams();
                            if (!kemParams) {
                                throw new SecurityException('KEM params not set');
                            }
                            curveTypeProto = kemParams.getCurveType();
                            curveTypeSubtle = curveTypeProtoToSubtle(curveTypeProto);
                            curveName = curveToString(curveTypeSubtle);
                            return [4 /*yield*/, generateKeyPair('ECDH', curveName)];
                        case 1:
                            keyPair = _a.sent();
                            return [4 /*yield*/, exportCryptoKey(keyPair.publicKey)];
                        case 2:
                            jsonPublicKey = _a.sent();
                            return [4 /*yield*/, exportCryptoKey(keyPair.privateKey)];
                        case 3:
                            jsonPrivateKey = _a.sent();
                            return [2 /*return*/, EciesAeadHkdfPrivateKeyFactory.jsonToProtoKey_(jsonPrivateKey, jsonPublicKey, params)];
                    }
                });
            });
        };
        /**
         * Creates a private key proto corresponding to given JSON key pair and with
         * the given params.
         *
         */
        EciesAeadHkdfPrivateKeyFactory.jsonToProtoKey_ = function (jsonPrivateKey, jsonPublicKey, params) {
            var x = jsonPublicKey.x, y = jsonPublicKey.y;
            if (x === undefined) {
                throw new SecurityException('x must be set');
            }
            if (y === undefined) {
                throw new SecurityException('y must be set');
            }
            var publicKeyProto = (new PbEciesAeadHkdfPublicKey())
                .setVersion(EciesAeadHkdfPublicKeyManager.VERSION)
                .setParams(params)
                .setX(fromBase64(x, true))
                .setY(fromBase64(y, true));
            var d = jsonPrivateKey.d;
            if (d === undefined) {
                throw new SecurityException('d must be set');
            }
            var privateKeyProto = (new PbEciesAeadHkdfPrivateKey())
                .setVersion(VERSION$1)
                .setPublicKey(publicKeyProto)
                .setKeyValue(fromBase64(d, true));
            return privateKeyProto;
        };
        /**
         * The input keyFormat is either deserialized (in case that the input is
         * Uint8Array) or checked to be an EciesAeadHkdfKeyFormat-proto (otherwise).
         *
         */
        EciesAeadHkdfPrivateKeyFactory.getKeyFormatProto_ = function (keyFormat) {
            if (keyFormat instanceof Uint8Array) {
                return EciesAeadHkdfPrivateKeyFactory.deserializeKeyFormat_(keyFormat);
            }
            else if (keyFormat instanceof PbEciesAeadHkdfKeyFormat) {
                return keyFormat;
            }
            else {
                throw new SecurityException('Expected ' + EciesAeadHkdfPrivateKeyManager.KEY_TYPE +
                    ' key format proto.');
            }
        };
        EciesAeadHkdfPrivateKeyFactory.deserializeKeyFormat_ = function (keyFormat) {
            var keyFormatProto;
            try {
                keyFormatProto = PbEciesAeadHkdfKeyFormat.deserializeBinary(keyFormat);
            }
            catch (e) {
                throw new SecurityException('Input cannot be parsed as ' +
                    EciesAeadHkdfPrivateKeyManager.KEY_TYPE + ' key format proto.');
            }
            if (!keyFormatProto.getParams()) {
                throw new SecurityException('Input cannot be parsed as ' +
                    EciesAeadHkdfPrivateKeyManager.KEY_TYPE + ' key format proto.');
            }
            return keyFormatProto;
        };
        return EciesAeadHkdfPrivateKeyFactory;
    }());
    /**
     * @final
     */
    var EciesAeadHkdfPrivateKeyManager = /** @class */ (function () {
        function EciesAeadHkdfPrivateKeyManager() {
            this.keyFactory = new EciesAeadHkdfPrivateKeyFactory();
        }
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$i(this, void 0, void 0, function () {
                var keyProto, recepientPrivateKey, publicKey, params, demParams, keyTemplate, demHelper, pointFormat, kemParams, hkdfHash, hkdfSalt;
                return tslib.__generator(this, function (_a) {
                    if (primitiveType !== this.getPrimitiveType()) {
                        throw new SecurityException('Requested primitive type which is not ' +
                            'supported by this key manager.');
                    }
                    keyProto = EciesAeadHkdfPrivateKeyManager.getKeyProto_(key);
                    validatePrivateKey(keyProto, VERSION$1, EciesAeadHkdfPublicKeyManager.VERSION);
                    recepientPrivateKey = getJsonWebKeyFromProto(keyProto);
                    publicKey = keyProto.getPublicKey();
                    if (!publicKey) {
                        throw new SecurityException('Public key not set');
                    }
                    params = publicKey.getParams();
                    if (!params) {
                        throw new SecurityException('Params not set');
                    }
                    demParams = params.getDemParams();
                    if (!demParams) {
                        throw new SecurityException('DEM params not set');
                    }
                    keyTemplate = (demParams.getAeadDem());
                    if (!keyTemplate) {
                        throw new SecurityException('Key template not set');
                    }
                    demHelper = new RegistryEciesAeadHkdfDemHelper(keyTemplate);
                    pointFormat = pointFormatProtoToSubtle(params.getEcPointFormat());
                    kemParams = params.getKemParams();
                    if (!kemParams) {
                        throw new SecurityException('KEM params not set');
                    }
                    hkdfHash = hashTypeProtoToString(kemParams.getHkdfHashType());
                    hkdfSalt = kemParams.getHkdfSalt_asU8();
                    return [2 /*return*/, fromJsonWebKey$1(recepientPrivateKey, hkdfHash, pointFormat, demHelper, hkdfSalt)];
                });
            });
        };
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.getKeyType = function () {
            return EciesAeadHkdfPrivateKeyManager.KEY_TYPE;
        };
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.getPrimitiveType = function () {
            return EciesAeadHkdfPrivateKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.getVersion = function () {
            return VERSION$1;
        };
        /** @override */
        EciesAeadHkdfPrivateKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory;
        };
        EciesAeadHkdfPrivateKeyManager.getKeyProto_ = function (keyMaterial) {
            if (keyMaterial instanceof PbKeyData) {
                return EciesAeadHkdfPrivateKeyManager.getKeyProtoFromKeyData_(keyMaterial);
            }
            if (keyMaterial instanceof PbEciesAeadHkdfPrivateKey) {
                return keyMaterial;
            }
            throw new SecurityException('Key type is not supported. This key ' +
                'manager supports ' + EciesAeadHkdfPrivateKeyManager.KEY_TYPE + '.');
        };
        EciesAeadHkdfPrivateKeyManager.getKeyProtoFromKeyData_ = function (keyData) {
            if (keyData.getTypeUrl() !== EciesAeadHkdfPrivateKeyManager.KEY_TYPE) {
                throw new SecurityException('Key type ' + keyData.getTypeUrl() +
                    ' is not supported. This key manager supports ' +
                    EciesAeadHkdfPrivateKeyManager.KEY_TYPE + '.');
            }
            return deserializePrivateKey(keyData.getValue_asU8());
        };
        return EciesAeadHkdfPrivateKeyManager;
    }());
    EciesAeadHkdfPrivateKeyManager.SUPPORTED_PRIMITIVE_ = HybridDecrypt;
    EciesAeadHkdfPrivateKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey';
    function deserializePrivateKey(serializedPrivateKey) {
        var key;
        try {
            key = PbEciesAeadHkdfPrivateKey.deserializeBinary(serializedPrivateKey);
        }
        catch (e) {
            throw new SecurityException('Input cannot be parsed as ' + EciesAeadHkdfPrivateKeyManager.KEY_TYPE +
                ' key-proto.');
        }
        if (!key.getPublicKey() || !key.getKeyValue()) {
            throw new SecurityException('Input cannot be parsed as ' + EciesAeadHkdfPrivateKeyManager.KEY_TYPE +
                ' key-proto.');
        }
        return key;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$5() {
        registerKeyManager(new EciesAeadHkdfPrivateKeyManager());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$6() {
        registerKeyManager(new EciesAeadHkdfPublicKeyManager());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$j = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var WrappedHybridEncrypt = /** @class */ (function (_super) {
        tslib.__extends(WrappedHybridEncrypt, _super);
        // The constructor should be @private, but it is not supported by Closure
        // (see https://github.com/google/closure-compiler/issues/2761).
        function WrappedHybridEncrypt(hybridEncryptPrimitiveSet) {
            var _this = _super.call(this) || this;
            _this.hybridEncryptPrimitiveSet = hybridEncryptPrimitiveSet;
            return _this;
        }
        WrappedHybridEncrypt.newHybridEncrypt = function (hybridEncryptPrimitiveSet) {
            if (!hybridEncryptPrimitiveSet) {
                throw new SecurityException('Primitive set has to be non-null.');
            }
            if (!hybridEncryptPrimitiveSet.getPrimary()) {
                throw new SecurityException('Primary has to be non-null.');
            }
            return new WrappedHybridEncrypt(hybridEncryptPrimitiveSet);
        };
        /** @override */
        WrappedHybridEncrypt.prototype.encrypt = function (plaintext, opt_contextInfo) {
            return __awaiter$j(this, void 0, void 0, function () {
                var primary, primitive, ciphertext, keyId;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!plaintext) {
                                throw new SecurityException('Plaintext has to be non-null.');
                            }
                            primary = this.hybridEncryptPrimitiveSet.getPrimary();
                            if (!primary) {
                                throw new SecurityException('Primary not set.');
                            }
                            primitive = primary.getPrimitive();
                            return [4 /*yield*/, primitive.encrypt(plaintext, opt_contextInfo)];
                        case 1:
                            ciphertext = _a.sent();
                            keyId = primary.getIdentifier();
                            return [2 /*return*/, concat(keyId, ciphertext)];
                    }
                });
            });
        };
        return WrappedHybridEncrypt;
    }(HybridEncrypt));
    var HybridEncryptWrapper = /** @class */ (function () {
        function HybridEncryptWrapper() {
        }
        /**
         * @override
         */
        HybridEncryptWrapper.prototype.wrap = function (primitiveSet) {
            return WrappedHybridEncrypt.newHybridEncrypt(primitiveSet);
        };
        /**
         * @override
         */
        HybridEncryptWrapper.prototype.getPrimitiveType = function () {
            return HybridEncrypt;
        };
        return HybridEncryptWrapper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$7() {
        registerPrimitiveWrapper(new HybridEncryptWrapper());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Pre-generated KeyTemplates for Aead keys.
     *
     * One can use these templates to generate new Keyset with
     * KeysetHandle.generateNew method. To generate a new keyset that contains a
     * single AesCtrHmacAeadKey, one can do:
     *
     * AeadConfig.Register();
     * KeysetHandle handle =
     *     KeysetHandle.generateNew(AeadKeyTemplates.aes128CtrHmacSha256());
     *
     * @final
     */
    var AeadKeyTemplates = /** @class */ (function () {
        function AeadKeyTemplates() {
        }
        /**
         * Returns a KeyTemplate that generates new instances of AesCtrHmacAeadKey
         * with the following parameters:
         *    AES key size: 16 bytes
         *    AES IV size: 16 bytes
         *    HMAC key size: 32 bytes
         *    HMAC tag size: 16 bytes
         *    HMAC hash function: SHA256
         *    OutputPrefixType: TINK
         *
         */
        AeadKeyTemplates.aes128CtrHmacSha256 = function () {
            return AesCtrHmacAeadKeyTemplates.aes128CtrHmacSha256();
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesCtrHmacAeadKey
         * with the following parameters:
         *    AES key size: 32 bytes
         *    AES IV size: 16 bytes
         *    HMAC key size: 32 bytes
         *    HMAC tag size: 32 bytes
         *    HMAC hash function: SHA256
         *    OutputPrefixType: TINK
         *
         */
        AeadKeyTemplates.aes256CtrHmacSha256 = function () {
            return AesCtrHmacAeadKeyTemplates.aes256CtrHmacSha256();
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *    key size: 16 bytes
         *    OutputPrefixType: TINK
         *
         */
        AeadKeyTemplates.aes128Gcm = function () {
            return AesGcmKeyTemplates.aes128Gcm();
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *    key size: 32 bytes
         *    OutputPrefixType: TINK
         *
         */
        AeadKeyTemplates.aes256Gcm = function () {
            return AesGcmKeyTemplates.aes256Gcm();
        };
        /**
         * Returns a KeyTemplate that generates new instances of AesGcmKey
         * with the following parameters:
         *     key size: 32 bytes
         *     OutputPrefixType: RAW
         *
         */
        AeadKeyTemplates.aes256GcmNoPrefix = function () {
            return AesGcmKeyTemplates.aes256GcmNoPrefix();
        };
        return AeadKeyTemplates;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    // Static methods and constants for registering with the Registry all instances
    // of key types for hybrid encryption and decryption supported in a particular
    // release of Tink.
    // To register all key types from the current Tink release one can do:
    // HybridConfig.register();
    // For more information on creation and usage of hybrid encryption instances
    // see HybridEncryptFactory (for encryption) and HybridDecryptFactory (for
    // decryption).
    /**
     * Registers key managers for all HybridEncrypt and HybridDecrypt key types
     * from the current Tink release.
     */
    function register$8() {
        AeadConfig.register();
        registerKeyManager(new EciesAeadHkdfPrivateKeyManager());
        registerKeyManager(new EciesAeadHkdfPublicKeyManager());
        registerPrimitiveWrapper(new HybridEncryptWrapper());
        registerPrimitiveWrapper(new HybridDecryptWrapper());
    }
    var ENCRYPT_PRIMITIVE_NAME = 'HybridEncrypt';
    var ECIES_AEAD_HKDF_PUBLIC_KEY_TYPE = EciesAeadHkdfPublicKeyManager.KEY_TYPE;
    var DECRYPT_PRIMITIVE_NAME = 'HybridDecrypt';
    var ECIES_AEAD_HKDF_PRIVATE_KEY_TYPE = EciesAeadHkdfPrivateKeyManager.KEY_TYPE;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Pre-generated KeyTemplates for keys for hybrid encryption.
     *
     * One can use these templates to generate new Keyset with
     * KeysetHandle.generateNew method. To generate a new keyset that contains a
     * single EciesAeadHkdfKey, one can do:
     *
     * HybridConfig.Register();
     * KeysetHandle handle = KeysetHandle.generateNew(
     *     HybridKeyTemplates.eciesP256HkdfHmacSha256Aes128Gcm());
     *
     * @final
     */
    var HybridKeyTemplates = /** @class */ (function () {
        function HybridKeyTemplates() {
        }
        /**
         * Returns a KeyTemplate that generates new instances of
         * EciesAeadHkdfPrivateKey with the following parameters:
         *
         *   KEM: ECDH over NIST P-256
         *   DEM: AES128-GCM
         *   KDF: HKDF-HMAC-SHA256 with an empty salt
         *   OutputPrefixType: TINK
         *
         */
        HybridKeyTemplates.eciesP256HkdfHmacSha256Aes128Gcm = function () {
            return createEciesAeadHkdfKeyTemplate_(
            /* curveType = */
            PbEllipticCurveType.NIST_P256, 
            /* hkdfHash = */
            PbHashType.SHA256, 
            /* pointFormat = */
            PbPointFormat.UNCOMPRESSED, 
            /* demKeyTemplate = */
            AeadKeyTemplates.aes128Gcm(), 
            /* hkdfSalt = */
            new Uint8Array(0));
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EciesAeadHkdfPrivateKey with the following parameters:
         *
         *   KEM: ECDH over NIST P-256
         *   DEM: AES128-CTR-HMAC-SHA256 with
         *        - AES key size: 16 bytes
         *        - AES CTR IV size: 16 bytes
         *        - HMAC key size: 32 bytes
         *        - HMAC tag size: 16 bytes
         *   KDF: HKDF-HMAC-SHA256 with an empty salt
         *   OutputPrefixType: TINK
         *
         */
        HybridKeyTemplates.eciesP256HkdfHmacSha256Aes128CtrHmacSha256 = function () {
            return createEciesAeadHkdfKeyTemplate_(
            /* curveType = */
            PbEllipticCurveType.NIST_P256, 
            /* hkdfHash = */
            PbHashType.SHA256, 
            /* pointFormat = */
            PbPointFormat.UNCOMPRESSED, 
            /* demKeyTemplate = */
            AeadKeyTemplates.aes128CtrHmacSha256(), 
            /* hkdfSalt = */
            new Uint8Array(0));
        };
        return HybridKeyTemplates;
    }());
    function createEciesAeadHkdfKeyTemplate_(curveType, hkdfHash, pointFormat, demKeyTemplate, hkdfSalt) {
        // key format
        var keyFormat = (new PbEciesAeadHkdfKeyFormat())
            .setParams(createEciesAeadHkdfParams_(curveType, hkdfHash, pointFormat, demKeyTemplate, hkdfSalt));
        // key template
        var keyTemplate = (new PbKeyTemplate())
            .setTypeUrl(ECIES_AEAD_HKDF_PRIVATE_KEY_TYPE)
            .setValue(keyFormat.serializeBinary())
            .setOutputPrefixType(PbOutputPrefixType.TINK);
        return keyTemplate;
    }
    function createEciesAeadHkdfParams_(curveType, hkdfHash, pointFormat, demKeyTemplate, hkdfSalt) {
        // KEM params
        var kemParams = (new PbEciesHkdfKemParams())
            .setCurveType(curveType)
            .setHkdfHashType(hkdfHash)
            .setHkdfSalt(hkdfSalt);
        // DEM params
        var demParams = (new PbEciesAeadDemParams()).setAeadDem(demKeyTemplate);
        // params
        var params = (new PbEciesAeadHkdfParams())
            .setKemParams(kemParams)
            .setDemParams(demParams)
            .setEcPointFormat(pointFormat);
        return params;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var eciesP256HkdfHmacSha256Aes128CtrHmacSha256KeyTemplate = HybridKeyTemplates.eciesP256HkdfHmacSha256Aes128CtrHmacSha256;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var eciesP256HkdfHmacSha256Aes128GcmKeyTemplate = HybridKeyTemplates.eciesP256HkdfHmacSha256Aes128Gcm;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$9() {
        register();
        register$1();
        register$4();
        register$5();
        register$6();
        register$7();
    }
    var index$4 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        register: register$9,
        eciesP256HkdfHmacSha256Aes128CtrHmacSha256KeyTemplate: eciesP256HkdfHmacSha256Aes128CtrHmacSha256KeyTemplate,
        eciesP256HkdfHmacSha256Aes128GcmKeyTemplate: eciesP256HkdfHmacSha256Aes128GcmKeyTemplate,
        HybridDecrypt: HybridDecrypt,
        HybridEncrypt: HybridEncrypt
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var index$5 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        Mac: Mac
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var index$6 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        hmacFromRawKey: fromRawKey$1,
        Hmac: Hmac
    });
    // Copyright 2018 Google LLC.
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for creating digital signatures.
     *
     * Security guarantees: Implementations of these interfaces are secure
     * against adaptive chosen-message attacks. Signing data ensures the
     * authenticity and the integrity of that data, but not its secrecy.
     *
     */
    var PublicKeySign = /** @class */ (function () {
        function PublicKeySign() {
        }
        return PublicKeySign;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$k = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Implementation of ECDSA signing.
     *
     * @final
     */
    var EcdsaSign = /** @class */ (function (_super) {
        tslib.__extends(EcdsaSign, _super);
        /**
         * @param opt_encoding The
         *     optional encoding of the signature. If absent, default is IEEE P1363.
         */
        function EcdsaSign(key, hash, opt_encoding) {
            var _this = _super.call(this) || this;
            _this.key = key;
            _this.hash = hash;
            if (!opt_encoding) {
                opt_encoding = EcdsaSignatureEncodingType.IEEE_P1363;
            }
            _this.encoding_ = opt_encoding;
            return _this;
        }
        /**
         * @override
         */
        EcdsaSign.prototype.sign = function (message) {
            return __awaiter$k(this, void 0, void 0, function () {
                var signature;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(message);
                            return [4 /*yield*/, window.crypto.subtle.sign({ name: 'ECDSA', hash: { name: this.hash } }, this.key, message)];
                        case 1:
                            signature = _a.sent();
                            if (this.encoding_ == EcdsaSignatureEncodingType.DER) {
                                return [2 /*return*/, ecdsaIeee2Der(new Uint8Array(signature))];
                            }
                            return [2 /*return*/, new Uint8Array(signature)];
                    }
                });
            });
        };
        return EcdsaSign;
    }(PublicKeySign));
    /**
     * @param opt_encoding The
     *     optional encoding of the signature. If absent, default is IEEE P1363.
     */
    function fromJsonWebKey$4(jwk, hash, opt_encoding) {
        return __awaiter$k(this, void 0, void 0, function () {
            var crv, cryptoKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!jwk) {
                            throw new SecurityException('private key has to be non-null');
                        }
                        crv = jwk.crv;
                        if (!crv) {
                            throw new SecurityException('curve has to be defined');
                        }
                        validateEcdsaParams(crv, hash);
                        return [4 /*yield*/, importPrivateKey('ECDSA', jwk)];
                    case 1:
                        cryptoKey = _a.sent();
                        return [2 /*return*/, new EcdsaSign(cryptoKey, hash, opt_encoding)];
                }
            });
        });
    }
    // Copyright 2018 Google LLC.
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Interface for verifying digital signatures.
     *
     * Security guarantees: Implementations of these interfaces are secure
     * against adaptive chosen-message attacks. Signing data ensures the
     * authenticity and the integrity of that data, but not its secrecy.
     *
     */
    var PublicKeyVerify = /** @class */ (function () {
        function PublicKeyVerify() {
        }
        return PublicKeyVerify;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$l = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Implementation of ECDSA verifying.
     *
     * @final
     */
    var EcdsaVerify = /** @class */ (function (_super) {
        tslib.__extends(EcdsaVerify, _super);
        /**
         * @param encoding The
         *     encoding of the signature.
         */
        function EcdsaVerify(key, hash, encoding) {
            var _this = _super.call(this) || this;
            _this.key = key;
            _this.hash = hash;
            _this.encoding = encoding;
            var namedCurve = key.algorithm.namedCurve;
            if (!namedCurve) {
                throw new SecurityException('Curve has to be defined.');
            }
            _this.ieeeSignatureLength_ = 2 *
                fieldSizeInBytes(curveFromString(namedCurve));
            return _this;
        }
        /**
         * @override
         */
        EcdsaVerify.prototype.verify = function (signature, message) {
            return __awaiter$l(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    requireUint8Array(signature);
                    requireUint8Array(message);
                    if (this.encoding === EcdsaSignatureEncodingType.DER) {
                        signature =
                            ecdsaDer2Ieee(signature, this.ieeeSignatureLength_);
                    }
                    return [2 /*return*/, window.crypto.subtle.verify({ name: 'ECDSA', hash: { name: this.hash } }, this.key, signature, message)];
                });
            });
        };
        return EcdsaVerify;
    }(PublicKeyVerify));
    /**
     * @param opt_encoding The
     *     optional encoding of the signature. If absent, default is IEEE P1363.
     */
    function fromJsonWebKey$5(jwk, hash, encoding) {
        if (encoding === void 0) {
            encoding = EcdsaSignatureEncodingType.IEEE_P1363;
        }
        return __awaiter$l(this, void 0, void 0, function () {
            var crv, cryptoKey;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!jwk) {
                            throw new SecurityException('public key has to be non-null');
                        }
                        crv = jwk.crv;
                        if (!crv) {
                            throw new SecurityException('curve has to be defined');
                        }
                        validateEcdsaParams(crv, hash);
                        return [4 /*yield*/, importPublicKey('ECDSA', jwk)];
                    case 1:
                        cryptoKey = _a.sent();
                        return [2 /*return*/, new EcdsaVerify(cryptoKey, hash, encoding)];
                }
            });
        });
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function validateKeyFormat$1(keyFormat) {
        var params = keyFormat.getParams();
        if (!params) {
            throw new SecurityException('Invalid key format - missing params.');
        }
        validateParams$1(params);
    }
    function validatePrivateKey$1(key, privateKeyManagerVersion, publicKeyManagerVersion) {
        validateVersion(key.getVersion(), privateKeyManagerVersion);
        if (!key.getKeyValue()) {
            throw new SecurityException('Invalid private key - missing private key value.');
        }
        var publicKey = key.getPublicKey();
        if (!publicKey) {
            throw new SecurityException('Invalid private key - missing public key information.');
        }
        validatePublicKey$1(publicKey, publicKeyManagerVersion);
    }
    function validatePublicKey$1(key, publicKeyManagerVersion) {
        validateVersion(key.getVersion(), publicKeyManagerVersion);
        var params = key.getParams();
        if (!params) {
            throw new SecurityException('Invalid public key - missing params.');
        }
        validateParams$1(params);
        if (!key.getX() || !key.getY()) {
            throw new SecurityException('Invalid public key - missing value of X or Y.');
        }
    }
    function validateParams$1(params) {
        if (params.getEncoding() === PbEcdsaSignatureEncoding.UNKNOWN_ENCODING) {
            throw new SecurityException('Invalid public key - missing signature encoding.');
        }
        var hash = hashTypeProtoToString(params.getHashType());
        var curve = curveToString(curveTypeProtoToSubtle(params.getCurve()));
        validateEcdsaParams(curve, hash);
    }
    function encodingTypeProtoToEnum(encodingTypeProto) {
        switch (encodingTypeProto) {
            case PbEcdsaSignatureEncoding.DER:
                return EcdsaSignatureEncodingType.DER;
            case PbEcdsaSignatureEncoding.IEEE_P1363:
                return EcdsaSignatureEncodingType.IEEE_P1363;
            default:
                throw new SecurityException('Unknown ECDSA signature encoding type.');
        }
    }
    /**
     * WARNING: This method assumes that the given key proto is valid.
     *
     */
    function getJsonWebKeyFromProto$1(key) {
        var publicKey;
        var d = null;
        if (key instanceof PbEcdsaPrivateKey) {
            publicKey = key.getPublicKey();
        }
        else {
            publicKey = key;
        }
        var params = publicKey.getParams();
        if (!params) {
            throw new SecurityException('Params not set');
        }
        var curveType = curveTypeProtoToSubtle(params.getCurve());
        var expectedLength = fieldSizeInBytes(curveType);
        var x = bigEndianNumberToCorrectLength(publicKey.getX_asU8(), expectedLength);
        var y = bigEndianNumberToCorrectLength(publicKey.getY_asU8(), expectedLength);
        if (key instanceof PbEcdsaPrivateKey) {
            d = bigEndianNumberToCorrectLength(key.getKeyValue_asU8(), expectedLength);
        }
        return getJsonWebKey(curveType, x, y, d);
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$m = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var EcdsaPublicKeyFactory = /** @class */ (function () {
        function EcdsaPublicKeyFactory() {
        }
        /** @override */
        EcdsaPublicKeyFactory.prototype.newKey = function (keyFormat) {
            throw new SecurityException('This operation is not supported for public keys. ' +
                'Use EcdsaPrivateKeyManager to generate new keys.');
        };
        /** @override */
        EcdsaPublicKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            throw new SecurityException('This operation is not supported for public keys. ' +
                'Use EcdsaPrivateKeyManager to generate new keys.');
        };
        return EcdsaPublicKeyFactory;
    }());
    /**
     * @final
     */
    var EcdsaPublicKeyManager = /** @class */ (function () {
        function EcdsaPublicKeyManager() {
            this.keyFactory = new EcdsaPublicKeyFactory();
        }
        /** @override */
        EcdsaPublicKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$m(this, void 0, void 0, function () {
                var keyProto, jwk, params, hash, encoding;
                return tslib.__generator(this, function (_a) {
                    if (primitiveType !== this.getPrimitiveType()) {
                        throw new SecurityException('Requested primitive type which is not ' +
                            'supported by this key manager.');
                    }
                    keyProto = EcdsaPublicKeyManager.getKeyProto_(key);
                    validatePublicKey$1(keyProto, this.getVersion());
                    jwk = getJsonWebKeyFromProto$1(keyProto);
                    params = keyProto.getParams();
                    hash = hashTypeProtoToString(params.getHashType());
                    encoding = encodingTypeProtoToEnum(params.getEncoding());
                    return [2 /*return*/, fromJsonWebKey$5(jwk, hash, encoding)];
                });
            });
        };
        /** @override */
        EcdsaPublicKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /** @override */
        EcdsaPublicKeyManager.prototype.getKeyType = function () {
            return EcdsaPublicKeyManager.KEY_TYPE;
        };
        /** @override */
        EcdsaPublicKeyManager.prototype.getPrimitiveType = function () {
            return EcdsaPublicKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /** @override */
        EcdsaPublicKeyManager.prototype.getVersion = function () {
            return EcdsaPublicKeyManager.VERSION;
        };
        /** @override */
        EcdsaPublicKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory;
        };
        EcdsaPublicKeyManager.getKeyProto_ = function (keyMaterial) {
            if (keyMaterial instanceof PbKeyData) {
                return EcdsaPublicKeyManager.getKeyProtoFromKeyData_(keyMaterial);
            }
            if (keyMaterial instanceof PbEcdsaPublicKey) {
                return keyMaterial;
            }
            throw new SecurityException('Key type is not supported. This key manager supports ' +
                EcdsaPublicKeyManager.KEY_TYPE + '.');
        };
        EcdsaPublicKeyManager.getKeyProtoFromKeyData_ = function (keyData) {
            if (keyData.getTypeUrl() !== EcdsaPublicKeyManager.KEY_TYPE) {
                throw new SecurityException('Key type ' + keyData.getTypeUrl() + ' is not supported. This key ' +
                    'manager supports ' + EcdsaPublicKeyManager.KEY_TYPE + '.');
            }
            var key;
            try {
                key = PbEcdsaPublicKey.deserializeBinary(keyData.getValue());
            }
            catch (e) {
                throw new SecurityException('Input cannot be parsed as ' + EcdsaPublicKeyManager.KEY_TYPE +
                    ' key-proto.');
            }
            if (!key.getParams() || !key.getX() || !key.getY()) {
                throw new SecurityException('Input cannot be parsed as ' + EcdsaPublicKeyManager.KEY_TYPE +
                    ' key-proto.');
            }
            return key;
        };
        return EcdsaPublicKeyManager;
    }());
    EcdsaPublicKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.EcdsaPublicKey';
    EcdsaPublicKeyManager.SUPPORTED_PRIMITIVE_ = PublicKeyVerify;
    EcdsaPublicKeyManager.VERSION = 0;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$n = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var VERSION$2 = 0;
    /**
     * @final
     */
    var EcdsaPrivateKeyFactory = /** @class */ (function () {
        function EcdsaPrivateKeyFactory() {
        }
        /**
         * @override
         */
        EcdsaPrivateKeyFactory.prototype.newKey = function (keyFormat) {
            return __awaiter$n(this, void 0, void 0, function () {
                var keyFormatProto;
                return tslib.__generator(this, function (_a) {
                    if (!keyFormat) {
                        throw new SecurityException('Key format has to be non-null.');
                    }
                    keyFormatProto = EcdsaPrivateKeyFactory.getKeyFormatProto_(keyFormat);
                    validateKeyFormat$1(keyFormatProto);
                    return [2 /*return*/, EcdsaPrivateKeyFactory.newKeyImpl_(keyFormatProto)];
                });
            });
        };
        /**
         * @override
         */
        EcdsaPrivateKeyFactory.prototype.newKeyData = function (serializedKeyFormat) {
            return __awaiter$n(this, void 0, void 0, function () {
                var key, keyData;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.newKey(serializedKeyFormat)];
                        case 1:
                            key = _a.sent();
                            keyData = (new PbKeyData())
                                .setTypeUrl(EcdsaPrivateKeyManager.KEY_TYPE)
                                .setValue(key.serializeBinary())
                                .setKeyMaterialType(PbKeyData.KeyMaterialType.ASYMMETRIC_PRIVATE);
                            return [2 /*return*/, keyData];
                    }
                });
            });
        };
        /** @override */
        EcdsaPrivateKeyFactory.prototype.getPublicKeyData = function (serializedPrivateKey) {
            var privateKey = deserializePrivateKey$1(serializedPrivateKey);
            var publicKey = privateKey.getPublicKey();
            if (!publicKey) {
                throw new SecurityException('Public key not set');
            }
            var publicKeyData = (new PbKeyData())
                .setValue(publicKey.serializeBinary())
                .setTypeUrl(EcdsaPublicKeyManager.KEY_TYPE)
                .setKeyMaterialType(PbKeyData.KeyMaterialType.ASYMMETRIC_PUBLIC);
            return publicKeyData;
        };
        /**
         * Generates key corresponding to the given key format.
         * WARNING: This function assumes that the keyFormat has been validated.
         *
         */
        EcdsaPrivateKeyFactory.newKeyImpl_ = function (keyFormat) {
            return __awaiter$n(this, void 0, void 0, function () {
                var params, curveTypeProto, curveTypeSubtle, curveName, keyPair, jsonPublicKey, jsonPrivateKey;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = (keyFormat.getParams());
                            if (!params) {
                                throw new SecurityException('Params not set');
                            }
                            curveTypeProto = params.getCurve();
                            curveTypeSubtle = curveTypeProtoToSubtle(curveTypeProto);
                            curveName = curveToString(curveTypeSubtle);
                            return [4 /*yield*/, generateKeyPair('ECDSA', curveName)];
                        case 1:
                            keyPair = _a.sent();
                            return [4 /*yield*/, exportCryptoKey(keyPair.publicKey)];
                        case 2:
                            jsonPublicKey = _a.sent();
                            return [4 /*yield*/, exportCryptoKey(keyPair.privateKey)];
                        case 3:
                            jsonPrivateKey = _a.sent();
                            return [2 /*return*/, EcdsaPrivateKeyFactory.jsonToProtoKey_(jsonPrivateKey, jsonPublicKey, params)];
                    }
                });
            });
        };
        /**
         * Creates a private key proto corresponding to given JSON key pair and with
         * the given params.
         *
         */
        EcdsaPrivateKeyFactory.jsonToProtoKey_ = function (jsonPrivateKey, jsonPublicKey, params) {
            var x = jsonPublicKey.x, y = jsonPublicKey.y;
            if (x === undefined) {
                throw new SecurityException('x must be set');
            }
            if (y === undefined) {
                throw new SecurityException('y must be set');
            }
            var publicKeyProto = (new PbEcdsaPublicKey())
                .setVersion(EcdsaPublicKeyManager.VERSION)
                .setParams(params)
                .setX(fromBase64(x, true))
                .setY(fromBase64(y, true));
            var d = jsonPrivateKey.d;
            if (d === undefined) {
                throw new SecurityException('d must be set');
            }
            var privateKeyProto = (new PbEcdsaPrivateKey())
                .setVersion(VERSION$2)
                .setPublicKey(publicKeyProto)
                .setKeyValue(fromBase64(d, true));
            return privateKeyProto;
        };
        /**
         * The input keyFormat is either deserialized (in case that the input is
         * Uint8Array) or checked to be an EcdsaKeyFormat-proto (otherwise).
         *
         */
        EcdsaPrivateKeyFactory.getKeyFormatProto_ = function (keyFormat) {
            if (keyFormat instanceof Uint8Array) {
                return EcdsaPrivateKeyFactory.deserializeKeyFormat_(keyFormat);
            }
            else if (keyFormat instanceof PbEcdsaKeyFormat) {
                return keyFormat;
            }
            else {
                throw new SecurityException('Expected ' + EcdsaPrivateKeyManager.KEY_TYPE + ' key format proto.');
            }
        };
        EcdsaPrivateKeyFactory.deserializeKeyFormat_ = function (keyFormat) {
            var keyFormatProto;
            try {
                keyFormatProto = PbEcdsaKeyFormat.deserializeBinary(keyFormat);
            }
            catch (e) {
                throw new SecurityException('Input cannot be parsed as ' + EcdsaPrivateKeyManager.KEY_TYPE +
                    ' key format proto.');
            }
            if (!keyFormatProto.getParams()) {
                throw new SecurityException('Input cannot be parsed as ' + EcdsaPrivateKeyManager.KEY_TYPE +
                    ' key format proto.');
            }
            return keyFormatProto;
        };
        return EcdsaPrivateKeyFactory;
    }());
    /**
     * @final
     */
    var EcdsaPrivateKeyManager = /** @class */ (function () {
        function EcdsaPrivateKeyManager() {
            this.keyFactory = new EcdsaPrivateKeyFactory();
        }
        /** @override */
        EcdsaPrivateKeyManager.prototype.getPrimitive = function (primitiveType, key) {
            return __awaiter$n(this, void 0, void 0, function () {
                var keyProto, recepientPrivateKey, publicKey, params, hash, encoding;
                return tslib.__generator(this, function (_a) {
                    if (primitiveType !== this.getPrimitiveType()) {
                        throw new SecurityException('Requested primitive type which is not ' +
                            'supported by this key manager.');
                    }
                    keyProto = EcdsaPrivateKeyManager.getKeyProto_(key);
                    validatePrivateKey$1(keyProto, VERSION$2, EcdsaPublicKeyManager.VERSION);
                    recepientPrivateKey = getJsonWebKeyFromProto$1(keyProto);
                    publicKey = keyProto.getPublicKey();
                    if (!publicKey) {
                        throw new SecurityException('Public key not set');
                    }
                    params = publicKey.getParams();
                    if (!params) {
                        throw new SecurityException('Params not set');
                    }
                    hash = hashTypeProtoToString(params.getHashType());
                    encoding = encodingTypeProtoToEnum(params.getEncoding());
                    return [2 /*return*/, fromJsonWebKey$4(recepientPrivateKey, hash, encoding)];
                });
            });
        };
        /** @override */
        EcdsaPrivateKeyManager.prototype.doesSupport = function (keyType) {
            return keyType === this.getKeyType();
        };
        /** @override */
        EcdsaPrivateKeyManager.prototype.getKeyType = function () {
            return EcdsaPrivateKeyManager.KEY_TYPE;
        };
        /** @override */
        EcdsaPrivateKeyManager.prototype.getPrimitiveType = function () {
            return EcdsaPrivateKeyManager.SUPPORTED_PRIMITIVE_;
        };
        /** @override */
        EcdsaPrivateKeyManager.prototype.getVersion = function () {
            return VERSION$2;
        };
        /** @override */
        EcdsaPrivateKeyManager.prototype.getKeyFactory = function () {
            return this.keyFactory;
        };
        EcdsaPrivateKeyManager.getKeyProto_ = function (keyMaterial) {
            if (keyMaterial instanceof PbKeyData) {
                return EcdsaPrivateKeyManager.getKeyProtoFromKeyData_(keyMaterial);
            }
            if (keyMaterial instanceof PbEcdsaPrivateKey) {
                return keyMaterial;
            }
            throw new SecurityException('Key type is not supported. This key ' +
                'manager supports ' + EcdsaPrivateKeyManager.KEY_TYPE + '.');
        };
        EcdsaPrivateKeyManager.getKeyProtoFromKeyData_ = function (keyData) {
            if (keyData.getTypeUrl() !== EcdsaPrivateKeyManager.KEY_TYPE) {
                throw new SecurityException('Key type ' + keyData.getTypeUrl() +
                    ' is not supported. This key manager supports ' +
                    EcdsaPrivateKeyManager.KEY_TYPE + '.');
            }
            return deserializePrivateKey$1(keyData.getValue_asU8());
        };
        return EcdsaPrivateKeyManager;
    }());
    EcdsaPrivateKeyManager.SUPPORTED_PRIMITIVE_ = PublicKeySign;
    EcdsaPrivateKeyManager.KEY_TYPE = 'type.googleapis.com/google.crypto.tink.EcdsaPrivateKey';
    function deserializePrivateKey$1(serializedPrivateKey) {
        var key;
        try {
            key = PbEcdsaPrivateKey.deserializeBinary(serializedPrivateKey);
        }
        catch (e) {
            throw new SecurityException('Input cannot be parsed as ' + EcdsaPrivateKeyManager.KEY_TYPE +
                ' key-proto.');
        }
        if (!key.getPublicKey() || !key.getKeyValue()) {
            throw new SecurityException('Input cannot be parsed as ' + EcdsaPrivateKeyManager.KEY_TYPE +
                ' key-proto.');
        }
        return key;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$o = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var WrappedPublicKeySign = /** @class */ (function (_super) {
        tslib.__extends(WrappedPublicKeySign, _super);
        // The constructor should be @private, but it is not supported by Closure
        // (see https://github.com/google/closure-compiler/issues/2761).
        function WrappedPublicKeySign(primitiveSet) {
            var _this = _super.call(this) || this;
            _this.primitiveSet = primitiveSet;
            return _this;
        }
        WrappedPublicKeySign.newPublicKeySign = function (primitiveSet) {
            if (!primitiveSet) {
                throw new SecurityException('Primitive set has to be non-null.');
            }
            if (!primitiveSet.getPrimary()) {
                throw new SecurityException('Primary has to be non-null.');
            }
            return new WrappedPublicKeySign(primitiveSet);
        };
        /** @override */
        WrappedPublicKeySign.prototype.sign = function (data) {
            return __awaiter$o(this, void 0, void 0, function () {
                var primary, primitive, signature, keyId;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(data);
                            primary = this.primitiveSet.getPrimary();
                            if (!primary) {
                                throw new SecurityException('Primary not set.');
                            }
                            primitive = primary.getPrimitive();
                            return [4 /*yield*/, primitive.sign(data)];
                        case 1:
                            signature = _a.sent();
                            keyId = primary.getIdentifier();
                            return [2 /*return*/, concat(keyId, signature)];
                    }
                });
            });
        };
        return WrappedPublicKeySign;
    }(PublicKeySign));
    var PublicKeySignWrapper = /** @class */ (function () {
        function PublicKeySignWrapper() {
        }
        /**
         * @override
         */
        PublicKeySignWrapper.prototype.wrap = function (primitiveSet) {
            return WrappedPublicKeySign.newPublicKeySign(primitiveSet);
        };
        /**
         * @override
         */
        PublicKeySignWrapper.prototype.getPrimitiveType = function () {
            return PublicKeySign;
        };
        return PublicKeySignWrapper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var __awaiter$p = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * @final
     */
    var WrappedPublicKeyVerify = /** @class */ (function (_super) {
        tslib.__extends(WrappedPublicKeyVerify, _super);
        // The constructor should be @private, but it is not supported by Closure
        // (see https://github.com/google/closure-compiler/issues/2761).
        function WrappedPublicKeyVerify(primitiveSet) {
            var _this = _super.call(this) || this;
            _this.primitiveSet = primitiveSet;
            return _this;
        }
        WrappedPublicKeyVerify.newPublicKeyVerify = function (primitiveSet) {
            if (!primitiveSet) {
                throw new SecurityException('Primitive set has to be non-null.');
            }
            return new WrappedPublicKeyVerify(primitiveSet);
        };
        /** @override */
        WrappedPublicKeyVerify.prototype.verify = function (signature, data) {
            return __awaiter$p(this, void 0, void 0, function () {
                var keyId, primitives_1, rawSignature, isValid, e_1, primitives;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requireUint8Array(signature);
                            requireUint8Array(data);
                            if (!(signature.length > CryptoFormat.NON_RAW_PREFIX_SIZE))
                                return [3 /*break*/, 6];
                            keyId = signature.subarray(0, CryptoFormat.NON_RAW_PREFIX_SIZE);
                            return [4 /*yield*/, this.primitiveSet.getPrimitives(keyId)];
                        case 1:
                            primitives_1 = _a.sent();
                            rawSignature = signature.subarray(CryptoFormat.NON_RAW_PREFIX_SIZE, signature.length);
                            isValid = false;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.tryVerification_(primitives_1, rawSignature, data)];
                        case 3:
                            isValid = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            if (isValid) {
                                return [2 /*return*/, isValid];
                            }
                            _a.label = 6;
                        case 6: return [4 /*yield*/, this.primitiveSet.getRawPrimitives()];
                        case 7:
                            primitives = _a.sent();
                            return [2 /*return*/, this.tryVerification_(primitives, signature, data)];
                    }
                });
            });
        };
        /**
         * Tries to verify the signature using each entry in primitives. It
         * returns false if no entry succeeds.
         *
         *
         */
        WrappedPublicKeyVerify.prototype.tryVerification_ = function (primitives, signature, data) {
            return __awaiter$p(this, void 0, void 0, function () {
                var primitivesLength, i, primitive, isValid, e_2;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            primitivesLength = primitives.length;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < primitivesLength))
                                return [3 /*break*/, 7];
                            if (primitives[i].getKeyStatus() != PbKeyStatusType.ENABLED) {
                                return [3 /*break*/, 6];
                            }
                            primitive = primitives[i].getPrimitive();
                            isValid = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, primitive.verify(signature, data)];
                        case 3:
                            isValid = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            if (isValid) {
                                return [2 /*return*/, isValid];
                            }
                            _a.label = 6;
                        case 6:
                            i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/, false];
                    }
                });
            });
        };
        return WrappedPublicKeyVerify;
    }(PublicKeyVerify));
    var PublicKeyVerifyWrapper = /** @class */ (function () {
        function PublicKeyVerifyWrapper() {
        }
        /**
         * @override
         */
        PublicKeyVerifyWrapper.prototype.wrap = function (primitiveSet) {
            return WrappedPublicKeyVerify.newPublicKeyVerify(primitiveSet);
        };
        /**
         * @override
         */
        PublicKeyVerifyWrapper.prototype.getPrimitiveType = function () {
            return PublicKeyVerify;
        };
        return PublicKeyVerifyWrapper;
    }());
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    // Static methods and constants for registering with the Registry all instances
    // of key types for digital signature supported in a particular release of Tink.
    // To register all key types from the current Tink release one can do:
    // SignatureConfig.register();
    /**
     * Registers key managers for all PublicKeyVerify and PublicKeySign key types
     * from the current Tink release.
     */
    function register$a() {
        registerKeyManager(new EcdsaPrivateKeyManager());
        registerKeyManager(new EcdsaPublicKeyManager());
        registerPrimitiveWrapper(new PublicKeySignWrapper());
        registerPrimitiveWrapper(new PublicKeyVerifyWrapper());
    }
    var VERIFY_PRIMITIVE_NAME = 'PublicKeyVerify';
    var ECDSA_PUBLIC_KEY_TYPE = EcdsaPublicKeyManager.KEY_TYPE;
    var SIGN_PRIMITIVE_NAME = 'PublicKeySign';
    var ECDSA_PRIVATE_KEY_TYPE = EcdsaPrivateKeyManager.KEY_TYPE;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * Pre-generated KeyTemplates for keys for digital signatures.
     *
     * One can use these templates to generate new Keyset with
     * KeysetHandle.generateNew method. To generate a new keyset that contains a
     * single EcdsaKey, one can do:
     *
     * SignatureConfig.Register();
     * KeysetHandle handle = KeysetHandle.generateNew(
     *     SignatureKeyTemplates.ecdsaP256());
     *
     * @final
     */
    var SignatureKeyTemplates = /** @class */ (function () {
        function SignatureKeyTemplates() {
        }
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA256
         *  Curve: NIST P-256
         *  Signature encoding: DER (this is the encoding that Java uses)
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP256 = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P256, 
            /* hashType = */
            PbHashType.SHA256, 
            /* encoding = */
            PbEcdsaSignatureEncoding.DER, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA512
         *  Curve: NIST P-384
         *  Signature encoding: DER (this is the encoding that Java uses)
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP384 = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P384, 
            /* hashType = */
            PbHashType.SHA512, 
            /* encoding = */
            PbEcdsaSignatureEncoding.DER, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA512
         *  Curve: NIST P-521
         *  Signature encoding: DER (this is the encoding that Java uses).
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP521 = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P521, 
            /* hashType = */
            PbHashType.SHA512, 
            /* encoding = */
            PbEcdsaSignatureEncoding.DER, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA256
         *  Curve: NIST P-256
         *  Signature encoding: IEEE_P1363 (this is the encoding that WebCrypto uses)
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP256IeeeEncoding = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P256, 
            /* hashType = */
            PbHashType.SHA256, 
            /* encoding = */
            PbEcdsaSignatureEncoding.IEEE_P1363, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA512
         *  Curve: NIST P-384
         *  Signature encoding: IEEE_P1363 (this is the encoding that WebCrypto uses)
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP384IeeeEncoding = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P384, 
            /* hashType = */
            PbHashType.SHA512, 
            /* encoding = */
            PbEcdsaSignatureEncoding.IEEE_P1363, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        /**
         * Returns a KeyTemplate that generates new instances of
         * EcdsaPrivateKey with the following parameters:
         *  Hash function: SHA512
         *  Curve: NIST P-521
         *  Signature encoding: IEEE_P1363 (this is the encoding that WebCrypto uses)
         *  OutputPrefixType: TINK
         *
         */
        SignatureKeyTemplates.ecdsaP521IeeeEncoding = function () {
            return createEcdsaKeyTemplate(
            /* curveType = */
            PbEllipticCurveType.NIST_P521, 
            /* hashType = */
            PbHashType.SHA512, 
            /* encoding = */
            PbEcdsaSignatureEncoding.IEEE_P1363, 
            /* outputPrefixType = */
            PbOutputPrefixType.TINK);
        };
        return SignatureKeyTemplates;
    }());
    function createEcdsaKeyTemplate(curveType, hashType, encoding, outputPrefixType) {
        // key format
        var keyFormat = new PbEcdsaKeyFormat();
        var params = (new PbEcdsaParams())
            .setCurve(curveType)
            .setHashType(hashType)
            .setEncoding(encoding);
        keyFormat.setParams(params);
        // key template
        var keyTemplate = (new PbKeyTemplate())
            .setTypeUrl(ECDSA_PRIVATE_KEY_TYPE)
            .setValue(keyFormat.serializeBinary())
            .setOutputPrefixType(outputPrefixType);
        return keyTemplate;
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$b() {
        registerKeyManager(new EcdsaPrivateKeyManager());
    }
    var ecdsaP256KeyTemplate = SignatureKeyTemplates.ecdsaP256;
    var ecdsaP384KeyTemplate = SignatureKeyTemplates.ecdsaP384;
    var ecdsaP521KeyTemplate = SignatureKeyTemplates.ecdsaP521;
    var ecdsaP256IeeeEncodingKeyTemplate = SignatureKeyTemplates.ecdsaP256IeeeEncoding;
    var ecdsaP384IeeeEncodingKeyTemplate = SignatureKeyTemplates.ecdsaP384IeeeEncoding;
    var ecdsaP521IeeeEncodingKeyTemplate = SignatureKeyTemplates.ecdsaP521IeeeEncoding;
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$c() {
        registerKeyManager(new EcdsaPublicKeyManager());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$d() {
        registerPrimitiveWrapper(new PublicKeySignWrapper());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$e() {
        registerPrimitiveWrapper(new PublicKeyVerifyWrapper());
    }
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    function register$f() {
        register$b();
        register$c();
        register$d();
        register$e();
    }
    var index$7 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        register: register$f,
        ecdsaP256IeeeEncodingKeyTemplate: ecdsaP256IeeeEncodingKeyTemplate,
        ecdsaP256KeyTemplate: ecdsaP256KeyTemplate,
        ecdsaP384IeeeEncodingKeyTemplate: ecdsaP384IeeeEncodingKeyTemplate,
        ecdsaP384KeyTemplate: ecdsaP384KeyTemplate,
        ecdsaP521IeeeEncodingKeyTemplate: ecdsaP521IeeeEncodingKeyTemplate,
        ecdsaP521KeyTemplate: ecdsaP521KeyTemplate,
        PublicKeySign: PublicKeySign,
        PublicKeyVerify: PublicKeyVerify
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var index$8 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        EcdsaSign: EcdsaSign,
        ecdsaSignFromJsonWebKey: fromJsonWebKey$4,
        get EcdsaSignatureEncodingType() { return EcdsaSignatureEncodingType; },
        exportCryptoKey: exportCryptoKey,
        generateKeyPair: generateKeyPair,
        importPrivateKey: importPrivateKey,
        importPublicKey: importPublicKey
    });
    /**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    var resetRegistry = reset;
    var index$9 = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        resetRegistry: resetRegistry
    });
    exported.KeysetHandle = KeysetHandle;
    exported.aead = index;
    exported.aeadSubtle = index$1;
    exported.binary = index$2;
    exported.binaryInsecure = index$3;
    exported.generateNewKeysetHandle = generateNew;
    exported.hybrid = index$4;
    exported.mac = index$5;
    exported.macSubtle = index$6;
    exported.signature = index$7;
    exported.signatureSubtle = index$8;
    exported.testing = index$9;
    exported.getKeyManager = window.getKeyManager;
    Object.defineProperty(exported, '__esModule', { value: true });
})));
const { KeysetHandle, aead, aeadSubtle, binary, binaryInsecure, generateNewKeysetHandle, hybrid, mac, macSubtle, signature, signatureSubtle, testing, getKeyManager } = exported;
exports.KeysetHandle = KeysetHandle;
exports.aead = aead;
exports.aeadSubtle = aeadSubtle;
exports.binary = binary;
exports.binaryInsecure = binaryInsecure;
exports.generateNewKeysetHandle = generateNewKeysetHandle;
exports.hybrid = hybrid;
exports.mac = mac;
exports.macSubtle = macSubtle;
exports.signature = signature;
exports.signatureSubtle = signatureSubtle;
exports.testing = testing;
exports.getKeyManager = getKeyManager;
//# sourceMappingURL=tink.js.map