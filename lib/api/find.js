"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, selector) {
    var matchPath = null;
    (0, _babelTraverse2.default)(ast, {
        JSXAttribute: function JSXAttribute(path) {
            if (path.node.value.value === selector) {
                matchPath = path.find(function (path) {
                    return path.isJSXElement();
                });
            }
        }
    });
    return matchPath;
};

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;