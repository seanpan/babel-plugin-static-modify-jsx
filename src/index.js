import Cast from "./cast";
import p from "path";


export default function () {
    return {
        inherits: require("babel-plugin-syntax-jsx"),
        pre(state) {
            this.root = state.ast;
            this.paths = [state.path];
        },
        visitor: {
            Program(path, pluginPass) {
                const {config} = pluginPass.opts;
                let configObj;
                if (typeof config === 'string') {
                    configObj = require(p.resolve(__dirname, config))
                }
                else {
                    configObj = config;
                }
                const cus = configObj[pluginPass.file.opts.filename];
                if (cus) {
                    cus(new Cast(this.paths, this.root));
                }
            }
        }
    };
}