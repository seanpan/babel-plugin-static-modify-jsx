import util from "../util/index";

export default function (ast, path, name) {
    util.removeAttribute(path, name);
    return ast;
};
