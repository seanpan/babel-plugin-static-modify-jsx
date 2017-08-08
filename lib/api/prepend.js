"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, path, code) {
    _index2.default.selfOpen(path);
    _index2.default.prependChild(path, _index2.default.build(code).program.body[0].expression);
};

var _index = require("../util/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;