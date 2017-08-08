import util from "../util/index";

export default function (ast, path, code) {
    util.selfOpen(path);
    util.prependChild(path, util.build(code).program.body[0].expression);
};
