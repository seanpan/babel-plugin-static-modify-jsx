import * as babylon from "babylon";
import * as t from "babel-types";
import traverse from "babel-traverse";
import generate from "babel-generator";

export default {
    build(code){
        return babylon.parse(code, {
            sourceType: "module",
            plugins: ['jsx']
        });
    },
    generate(ast, code) {
        return generate(ast, {}, code);
    },
    getClassNames(ast){
        let classNames = [];
        traverse(ast, {
            ClassDeclaration(path){
                classNames.push(path.node.id.name);
            }
        });
        return classNames;
    },
    combine(ast, srcAst){
        ast.program.body = srcAst.program.body.concat(ast.program.body);
    },
    //todo
    setAttribute(path, name, value, type = 'string'){
        const attributes = path.node.openingElement.attributes;
        const toModify = attributes.find((attribute) => {
            return attribute.name.name === name;
        });
        if (toModify) {
            this._modifyAttribute(toModify, value)
        }
        else {
            this._addAttribute(attributes, name, value);
        }
    },
    _modifyAttribute(attribute, value){
        attribute.value.value = value;
    },
    _addAttribute(attributes, name, value){
        attributes.push(t.jSXAttribute(t.jSXIdentifier(name), t.stringLiteral(value)));
    },
    removeAttribute(path, name){
        const attributes = path.node.openingElement.attributes;
        const toModify = attributes.find((attribute) => {
            return attribute.name.name === name;
        });
        if (toModify) {
            attributes.splice(attributes.indexOf(toModify), 1);
        }
    },
    appendChild(path, child){
        path.node.children.push(child);
    },
    appendChildren(path, children){
        const node = path.node;
        node.children = node.children.concat(children);
    },
    prependChild(path, child){
        path.node.children.unshift(child);
    },
    prependChildren(path, children){
        const node = path.node;
        node.children = children.concat(node.children);
    },
    removeChild(path){
        path.remove();
    },
    selfOpen(path){
        const node = path.node;
        node.openingElement.selfClosing = false;
        node.closingElement = t.jSXClosingElement(t.jSXIdentifier(node.openingElement.name.name));
    },
    selfClose(path){
        const node = path.node;
        node.openingElement.selfClosing = true;
        node.closingElement = null;
    }
}