import util from "../util/index";

export default function (ast, path) {
    // console.log(JSON.stringify(path.parentPath.node))
    // return
    util.removeChild(path);
    return ast;
};
