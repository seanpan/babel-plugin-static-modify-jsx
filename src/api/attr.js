import util from "../util/index";

export default function (paths, name, value, asExpression) {
    paths.forEach(path => {
        util.setAttribute(path, name, value, asExpression);
    });
};
