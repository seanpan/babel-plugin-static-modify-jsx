import traverse from "babel-traverse";

export default function (ast, selector) {
    let matchPath = null;
    traverse(ast, {
        JSXAttribute(path){
            if (path.node.value.value === selector) {
                matchPath = path.find((path) => path.isJSXElement());
            }
        }
    });
    return matchPath;
};
