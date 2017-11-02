import util from "../util/index";

export default function (paths) {
    // console.log(JSON.stringify(path.parentPath.node))
    // return
    paths.forEach((path) => {
        util.removeChild(path);
    })
};
