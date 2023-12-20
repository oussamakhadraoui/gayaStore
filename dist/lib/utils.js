"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absoluteUrl = exports.formatPrice = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatPrice(price, option) {
    if (option === void 0) { option = {}; }
    var _a = option.currency, currency = _a === void 0 ? 'USD' : _a, _b = option.notation, notation = _b === void 0 ? 'compact' : _b;
    var numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        notation: notation,
        maximumFractionDigits: 2
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
function absoluteUrl(path) {
    var _a;
    if (typeof window !== 'undefined')
        return path;
    if (process.env.VERCEL_URL)
        return "https://".concat(process.env.VERCEL_URL).concat(path);
    return "http://localhost:".concat((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000).concat(path);
}
exports.absoluteUrl = absoluteUrl;
