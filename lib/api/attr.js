"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, path, name, value) {
    _index2.default.setAttribute(path, name, value);
    return ast;
};

var _index = require("../util/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;