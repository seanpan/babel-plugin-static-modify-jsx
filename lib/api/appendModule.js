"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (ast, path, code, propsString) {
    var srcAst = _index2.default.build(code);
    _index2.default.combine(ast, srcAst);
    _index2.default.selfOpen(path);
    var classNames = _index2.default.getClassNames(srcAst);
    var attributes = [];
    if (propsString) {
        var propsAst = babylon.parseExpression(propsString, {
            sourceType: "module",
            plugins: ['jsx']
        });
        attributes = propsAst.properties.map(function (prop) {
            return t.jSXAttribute(t.jSXIdentifier(prop.key.name), t.jSXExpressionContainer(prop.value));
        });
    }
    var arr = classNames.map(function (className) {
        return t.jSXElement(t.jSXOpeningElement(t.jSXIdentifier(className), attributes, true), null, [], true);
    });
    var node = path.node;
    node.children = node.children.concat(arr);
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _index = require("../util/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

;

/**
 * todo props
 * @param ast
 * @param path
 * @param code
 * @param props
 */