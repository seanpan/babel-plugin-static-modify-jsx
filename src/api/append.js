import util from "../util/index";
// import Cast from "../Cast";

export default function (paths, child, Cast) {
    paths.forEach((path) => {
        util.selfOpen(path);
        let node;
        if (child instanceof Cast) {
            const childPath = child.paths[0];
            node = childPath.node;
            util.appendChild(path, node);
            util.removeChild(childPath);
        }
        else {
            node = util.build(child).program.body[0].expression;
            util.appendChild(path, node);
        }
    });
};
