var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var BaseError = (function () {
        function BaseError() {
            Error.apply(this, arguments);
        }
        return BaseError;
    }());
    BaseError.prototype = Object.create(Error.prototype);
    var getStackTrace;
    if (Error.captureStackTrace != null) {
        var captureStackTrace_1 = Error.captureStackTrace;
        getStackTrace = function (e) {
            captureStackTrace_1(e, e.constructor);
        };
    }
    else {
        getStackTrace = function (e, err) {
            if (!(err instanceof Error)) {
                err = new Error(err);
            }
            if (err.stack != null) {
                e.stack = err.stack;
            }
        };
    }
    var TypedError = (function (_super) {
        __extends(TypedError, _super);
        function TypedError(err) {
            if (err === void 0) { err = ''; }
            var _this = _super.call(this) || this;
            if (err instanceof Error) {
                _this.message = err.message;
            }
            else {
                _this.message = err;
            }
            _this.name = _this.constructor.name;
            getStackTrace(_this, err);
            return _this;
        }
        return TypedError;
    }(BaseError));
    return TypedError;
});
//# sourceMappingURL=typed-error.js.map