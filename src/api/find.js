import traverse from "babel-traverse";
import {buildPredicate} from '../util/selectors';

export default function (paths, selector) {
    const matchPaths = [];
    paths.forEach(path => {
        traverse(path.node, {
            JSXAttribute(path) {
                if (buildPredicate(selector)(path)) {
                    matchPaths.push(path.find((path) => path.isJSXElement()));
                }
            }
        }, path.scope, undefined, path.parentPath);
    });
    return matchPaths;
};
