import * as t from "babel-types";
import * as babylon from "babylon";
import util from "../util/index";


/**
 * todo props
 * @param ast
 * @param path
 * @param code
 * @param props
 */
export default function (ast, path, code, propsString) {
    const srcAst = util.build(code);
    util.combine(ast, srcAst);
    util.selfOpen(path);
    const classNames = util.getClassNames(srcAst);
    let attributes = [];
    if (propsString) {
        const propsAst = babylon.parseExpression(propsString, {
            sourceType: "module",
            plugins: ['jsx']
        });
        attributes = propsAst.properties.map((prop) => {
            return t.jSXAttribute(t.jSXIdentifier(prop.key.name), t.jSXExpressionContainer(prop.value))
        });
    }
    const arr = classNames.map((className) => {
        return t.jSXElement(t.jSXOpeningElement(t.jSXIdentifier(className), attributes, true), null, [], true);
    });
    const node = path.node;
    node.children = node.children.concat(arr);
};
