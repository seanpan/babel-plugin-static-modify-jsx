import traverse from "babel-traverse";
import {buildPredicate} from '../util/selectors';

export default function (ast, selector) {
    const matchPaths = [];
    traverse(ast, {
        JSXAttribute(path) {
            if (buildPredicate(selector)(path)) {
                matchPaths.push(path.find((path) => path.isJSXElement()));
            }
        }
    });
    return matchPaths;
};
