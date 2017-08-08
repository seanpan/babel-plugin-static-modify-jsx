"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babelGenerator = require("babel-generator");

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    build: function build(code) {
        return babylon.parse(code, {
            sourceType: "module",
            plugins: ['jsx']
        });
    },
    generate: function generate(ast, code) {
        return (0, _babelGenerator2.default)(ast, {}, code);
    },
    getClassNames: function getClassNames(ast) {
        var classNames = [];
        (0, _babelTraverse2.default)(ast, {
            ClassDeclaration: function ClassDeclaration(path) {
                classNames.push(path.node.id.name);
            }
        });
        return classNames;
    },
    combine: function combine(ast, srcAst) {
        ast.program.body = srcAst.program.body.concat(ast.program.body);
    },

    //todo
    setAttribute: function setAttribute(path, name, value) {
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'string';

        var attributes = path.node.openingElement.attributes;
        var toModify = attributes.find(function (attribute) {
            return attribute.name.name === name;
        });
        if (toModify) {
            this._modifyAttribute(toModify, value);
        } else {
            this._addAttribute(attributes, name, value);
        }
    },
    _modifyAttribute: function _modifyAttribute(attribute, value) {
        attribute.value.value = value;
    },
    _addAttribute: function _addAttribute(attributes, name, value) {
        attributes.push(t.jSXAttribute(t.jSXIdentifier(name), t.stringLiteral(value)));
    },
    removeAttribute: function removeAttribute(path, name) {
        var attributes = path.node.openingElement.attributes;
        var toModify = attributes.find(function (attribute) {
            return attribute.name.name === name;
        });
        if (toModify) {
            attributes.splice(attributes.indexOf(toModify), 1);
        }
    },
    appendChild: function appendChild(path, child) {
        path.node.children.push(child);
    },
    appendChildren: function appendChildren(path, children) {
        var node = path.node;
        node.children = node.children.concat(children);
    },
    prependChild: function prependChild(path, child) {
        path.node.children.unshift(child);
    },
    prependChildren: function prependChildren(path, children) {
        var node = path.node;
        node.children = children.concat(node.children);
    },
    removeChild: function removeChild(path) {
        path.remove();
    },
    selfOpen: function selfOpen(path) {
        var node = path.node;
        node.openingElement.selfClosing = false;
        node.closingElement = t.jSXClosingElement(t.jSXIdentifier(node.openingElement.name.name));
    },
    selfClose: function selfClose(path) {
        var node = path.node;
        node.openingElement.selfClosing = true;
        node.closingElement = null;
    }
};