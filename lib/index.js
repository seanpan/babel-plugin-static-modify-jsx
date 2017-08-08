"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        inherits: require("babel-plugin-syntax-jsx"),
        pre: function pre(state) {
            this.ast = state.ast;
        },

        visitor: {
            ClassDeclaration: function ClassDeclaration(path, state) {
                var config = state.opts.config;

                var cus = require(_path2.default.resolve(__dirname, config))[state.file.opts.filename];
                if (cus) {
                    cus(new _cast2.default(this.ast));
                }
            }
        }
    };
};

var _cast = require("./cast");

var _cast2 = _interopRequireDefault(_cast);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }