import * as babylon from "babylon";
import * as t from "babel-types";
import traverse from "babel-traverse";
import generate from "babel-generator";
import serialize from 'babel-literal-to-ast';

function convertToText(obj) {
    //create an array that will later be joined into a string.
    let string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (let prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        }
        var last = string[string.length - 1];
        string[string.length - 1] = last.substr(0, last.length - 1);
        string.push("}");

        //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[");
        for (let prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        var last = string[string.length - 1];
        string[string.length - 1] = last.substr(0, last.length - 1);
        string.push("]")

        //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

        //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}

export default {
    build(code) {
        return babylon.parse(code, {
            sourceType: "module",
            plugins: ['jsx']
        });
    },
    buildExpression(value, asExpression) {
        if (asExpression) {
            return this.buildForceExpression(value);
        }
        const ast = serialize(value);
        if (value === null) {
            return this.buildNullExpression(ast);
        }
        switch (typeof value) {
            case 'function':
                return this.buildFunctionExpression(ast);
            case 'number':
                return this.buildNumericExpression(ast);
            case 'string':
                return this.buildStringExpression(ast);
            case 'boolean':
                return this.buildBooleanExpression(ast);
            // case 'object':
            //     return this.buildObjectExpression(value);
            case 'undefined':
                return this.buildUndefinedExpression(ast);
            default:
                return this.buildDefaultExpression(ast);
        }
    },
    buildForceExpression(value) {
        return t.jSXExpressionContainer(this.build(value).program.body[0].expression);
    },
    buildUndefinedExpression(undefinedExpression) {
        return t.jSXExpressionContainer(undefinedExpression);
    },
    buildNullExpression(nullLiteral) {
        return t.jSXExpressionContainer(nullLiteral);
    },
    buildBooleanExpression(booleanLiteral) {
        return t.jSXExpressionContainer(booleanLiteral);
    },
    buildDefaultExpression(expression) {
        return t.jSXExpressionContainer(expression);
    },
    buildStringExpression(stringLiteral) {
        return stringLiteral
    },
    buildNumericExpression(numericExpression) {
        return t.jSXExpressionContainer(numericExpression);
    },
    buildFunctionExpression(ast) {
        const functionDeclaration = ast.program.body[0];
        const {id, params, body, generator, async} = functionDeclaration;
        return t.jSXExpressionContainer(t.functionExpression(id, params, body, generator, async));
    },
    convertToText(obj) {
        return convertToText(obj);
    },
    generate(ast, code) {
        return generate(ast, {}, code);
    },
    getClassNames(ast) {
        let classNames = [];
        traverse(ast, {
            ClassDeclaration(path) {
                classNames.push(path.node.id.name);
            }
        });
        return classNames;
    },
    combine(ast, srcAst) {
        ast.program.body = srcAst.program.body.concat(ast.program.body);
    },
    setAttribute(path, name, value, asExpression = false) {
        const attributes = path.node.openingElement.attributes;
        const toModify = attributes.find((attribute) => {
            return attribute.name.name === name;
        });
        const expression = this.buildExpression(value, asExpression);
        if (toModify) {
            this._modifyAttribute(toModify, expression)
        }
        else {
            this._addAttribute(attributes, name, expression);
        }
    },
    _modifyAttribute(attribute, expression) {
        attribute.value = expression;
    },
    _addAttribute(attributes, name, expression) {
        attributes.push(t.jSXAttribute(t.jSXIdentifier(name), expression));
    },
    removeAttribute(path, name) {
        const attributes = path.node.openingElement.attributes;
        const toModify = attributes.find((attribute) => {
            return attribute.name.name === name;
        });
        if (toModify) {
            attributes.splice(attributes.indexOf(toModify), 1);
        }
    },
    appendChild(path, child) {
        path.node.children.push(child);
    },
    appendChildren(path, children) {
        const node = path.node;
        node.children = node.children.concat(children);
    },
    prependChild(path, child) {
        path.node.children.unshift(child);
    },
    prependChildren(path, children) {
        const node = path.node;
        node.children = children.concat(node.children);
    },
    removeChild(path) {
        path.remove();
    },
    selfOpen(path) {
        const node = path.node;
        node.openingElement.selfClosing = false;
        node.closingElement = t.jSXClosingElement(t.jSXIdentifier(node.openingElement.name.name));
    },
    selfClose(path) {
        const node = path.node;
        node.openingElement.selfClosing = true;
        node.closingElement = null;
    }
}