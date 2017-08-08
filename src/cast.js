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

function convertToText(obj) {
    //create an array that will later be joined into a string.
    let string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (let prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        }
        string.push("}");

        //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[");
        for (let prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        string.push("]")

        //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

        //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}

export default class Cast {
    constructor(ast) {
        this.ast = ast;
    }

    set (path) {
        this.path = path;
    }

    get () {
        return this.path;
    }

    reset() {
        this.path = null;
    }

    generate() {
        return util.generate(this.ast, this.code);
    }

    find(selector) {
        const cast = new Cast(this.ast);
        cast.set(_find(this.ast, selector));
        return cast;
    }

    attr(name, value) {
        _attr(this.ast, this.path, name, value);
        return this.ast;
    }

    removeAttr(name) {
        _removeAttr(this.ast, this.path, name);
        return this.ast;
    }

    append(code) {
        _append(this.ast, this.path, code);
        return this.ast;
    }

    prepend(code) {
        _prepend(this.ast, this.path, code);
        return this.ast;
    }

    appendModule(file, props) {
        _appendModule(this.ast, this.path, fs.readFileSync(path.resolve(file), {
                encoding: 'utf8'
            }), convertToText(props)
        );
        return this.ast;
    }

    remove() {
        _remove(this.ast, this.path);
        return this.ast;
    }
};