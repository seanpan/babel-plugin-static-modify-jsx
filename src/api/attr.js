import util from "../util/index";

export default function (ast, path, name, value) {
    util.setAttribute(path, name, value);
    return ast;
};
