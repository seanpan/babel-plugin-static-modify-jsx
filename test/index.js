const snapshot = require('snap-shot');
const babel = require('babel-core');

const transform = function (path) {
    return babel.transformFileSync(path, {
        babelrc: false,
        plugins: [["../../lib/index.js", {
            config: "../customization.js"
        }]]
    }).code;
};

describe('append', () => {
    it('append', function () {
        const code = transform("./test/append/parent.jsx");
        snapshot(code);
    });
    it('appendModule', () => {
        const code = transform("./test/appendModule/parent.jsx");
        snapshot(code);
    })
});