"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _find2 = require("./api/find");

var _find3 = _interopRequireDefault(_find2);

var _attr2 = require("./api/attr");

var _attr3 = _interopRequireDefault(_attr2);

var _removeAttr2 = require("./api/removeAttr");

var _removeAttr3 = _interopRequireDefault(_removeAttr2);

var _append2 = require("./api/append");

var _append3 = _interopRequireDefault(_append2);

var _prepend2 = require("./api/prepend");

var _prepend3 = _interopRequireDefault(_prepend2);

var _appendModule2 = require("./api/appendModule");

var _appendModule3 = _interopRequireDefault(_appendModule2);

var _remove2 = require("./api/remove");

var _remove3 = _interopRequireDefault(_remove2);

var _index = require("./util/index");

var _index2 = _interopRequireDefault(_index);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && obj.join == undefined) {
        string.push("{");
        for (var prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        }
        string.push("}");

        //is array
    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && !(obj.join == undefined)) {
        string.push("[");
        for (var _prop in obj) {
            string.push(convertToText(obj[_prop]), ",");
        }
        string.push("]");

        //is function
    } else if (typeof obj == "function") {
        string.push(obj.toString());

        //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj));
    }

    return string.join("");
}

var Cast = function () {
    function Cast(ast) {
        _classCallCheck(this, Cast);

        this.ast = ast;
    }

    _createClass(Cast, [{
        key: "set",
        value: function set(path) {
            this.path = path;
        }
    }, {
        key: "get",
        value: function get() {
            return this.path;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.path = null;
        }
    }, {
        key: "generate",
        value: function generate() {
            return _index2.default.generate(this.ast, this.code);
        }
    }, {
        key: "find",
        value: function find(selector) {
            var cast = new Cast(this.ast);
            cast.set((0, _find3.default)(this.ast, selector));
            return cast;
        }
    }, {
        key: "attr",
        value: function attr(name, value) {
            (0, _attr3.default)(this.ast, this.path, name, value);
            return this.ast;
        }
    }, {
        key: "removeAttr",
        value: function removeAttr(name) {
            (0, _removeAttr3.default)(this.ast, this.path, name);
            return this.ast;
        }
    }, {
        key: "append",
        value: function append(code) {
            (0, _append3.default)(this.ast, this.path, code);
            return this.ast;
        }
    }, {
        key: "prepend",
        value: function prepend(code) {
            (0, _prepend3.default)(this.ast, this.path, code);
            return this.ast;
        }
    }, {
        key: "appendModule",
        value: function appendModule(file, props) {
            (0, _appendModule3.default)(this.ast, this.path, _fs2.default.readFileSync(_path2.default.resolve(file), {
                encoding: 'utf8'
            }), convertToText(props));
            return this.ast;
        }
    }, {
        key: "remove",
        value: function remove() {
            (0, _remove3.default)(this.ast, this.path);
            return this.ast;
        }
    }]);

    return Cast;
}();

exports.default = Cast;
;