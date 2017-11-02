import * as t from "babel-types";
import util from "../util/index";


/**
 * todo props
 * @param ast
 * @param paths
 * @param code
 * @param props
 */
export default function (ast, paths, code, props) {
    const srcAst = util.build(code);
    const classNames = util.getClassNames(srcAst);
    util.combine(ast, srcAst);
    paths.forEach((path) => {
        util.selfOpen(path);
        let attributes = [];
        if (props && props.length) {
            attributes = props.map(prop => {
                const {key, value, asExpression} = prop;
                const expression = util.buildExpression(value, asExpression);
                return t.jSXAttribute(t.jSXIdentifier(key), expression);
            })
        }
        const arr = classNames.map((className) => {
            return t.jSXElement(t.jSXOpeningElement(t.jSXIdentifier(className), attributes, true), null, [], true);
        });
        const node = path.node;
        node.children = node.children.concat(arr);
    })
};
