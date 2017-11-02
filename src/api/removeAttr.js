import util from "../util/index";

export default function (paths, name) {
    paths.forEach(path => {
        util.removeAttribute(path, name);
    })
};
