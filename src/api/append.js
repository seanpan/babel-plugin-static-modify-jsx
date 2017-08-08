import util from "../util/index";

export default function (ast, path, code) {
    util.selfOpen(path);
    util.appendChild(path, util.build(code).program.body[0].expression);
};
