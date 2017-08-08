"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, path) {
    // console.log(JSON.stringify(path.parentPath.node))
    // return
    _index2.default.removeChild(path);
    return ast;
};

var _index = require("../util/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;