import _find from "./api/find";
import _attr from "./api/attr";
import _removeAttr from "./api/removeAttr";
import _append from "./api/append";
import _prepend from "./api/prepend";
import _appendModule from "./api/appendModule";
import _remove from "./api/remove";

import util from "./util/index";
import fs from "fs";
import path from "path";

export default class Cast {
    constructor(ast) {
        this.ast = ast;
    }

    set(paths) {
        this.paths = paths;
    }

    get() {
        return this.paths;
    }

    reset() {
        this.paths = null;
    }

    generate() {
        return util.generate(this.ast, this.code);
    }

    find(selector) {
        const cast = new Cast(this.ast);
        cast.set(_find(this.ast, selector));
        return cast;
    }

    attr(name, value, asExpression) {
        _attr(this.paths, name, value, asExpression);
        return this;
    }

    removeAttr(name) {
        _removeAttr(this.paths, name);
        return this;
    }

    append(child) {
        _append(this.paths, child, Cast);
        // return new Cast(this.ast);
        return this;
    }

    prepend(child) {
        _prepend(this.paths, child, Cast);
        // return new Cast(this.ast);
        return this;
    }

    appendModule(file, props) {
        _appendModule(this.ast, this.paths, fs.readFileSync(path.resolve(file), {
            encoding: 'utf8'
        }), props);
        // return new Cast(this.ast);
        return this;
    }

    remove(targetCast) {
        if (targetCast) {
            _remove(targetCast.get());
        }
        else {
            _remove(this.paths);
        }
        // return new Cast(this.ast);
        return this;
    }
};