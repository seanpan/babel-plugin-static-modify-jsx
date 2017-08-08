import Cast from "./cast";
import p from "path";

export default function () {
    return {
        inherits: require("babel-plugin-syntax-jsx"),
        pre(state) {
            this.ast = state.ast;
        },
        visitor: {
            ClassDeclaration(path, state) {
                const {config} = state.opts;
                const cus = require(p.resolve(__dirname, config))[state.file.opts.filename];
                if (cus) {
                    cus(new Cast(this.ast));
                }
            }
        }
    };
}