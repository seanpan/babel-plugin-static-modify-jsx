"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, path, name) {
    _index2.default.removeAttribute(path, name);
    return ast;
};

var _index = require("../util/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;