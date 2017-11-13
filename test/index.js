const snapshot = require('snap-shot');
const babel = require('babel-core');
const config = require('../config.js');

function transform(path) {
    return babel.transformFileSync(path, {
        babelrc: false,
        plugins: [["../../lib/index.js", {config}]]
    }).code;
}

describe('test find functionality', () => {
    it('find by html class', () => {
        snapshot(transform("./test/find/SimpleParentWithHTMLClass.jsx"));
    });
    it('find by id', () => {
        snapshot(transform("./test/find/SimpleParentWithId.jsx"));
    });
    it('find by attr', () => {
        snapshot(transform("./test/find/SimpleParentWithAttr.jsx"));
    });
    it('find by type', () => {
        snapshot(transform("./test/find/SimpleParentWithType.jsx"));
    });
    it('find by class', () => {
        snapshot(transform("./test/find/SimpleParentWithClass.jsx"));
    });
    it('find by ref', () => {
        snapshot(transform("./test/find/SimpleParentWithRef.jsx"));
    });
    it('nested find', () => {
        snapshot(transform("./test/find/Nested.jsx"));
    });
});

describe('test append functionality', () => {
    it('append code to simple parent', () => {
        snapshot(transform("./test/append/SimpleParent.jsx"));
    });
    it('append code to closed parent', () => {
        snapshot(transform("./test/append/ClosedParent.jsx"));
    });
    it('append code to complex parent', () => {
        snapshot(transform("./test/append/ComplexParent.jsx"));
    });
    it('append code to duplicate parent', () => {
        snapshot(transform("./test/append/DuplicateParent.jsx"));
    });
    it('append existing node', () => {
        snapshot(transform("./test/append/MoveExistingNode.jsx"));
    });
});

describe('test prepend functionality', () => {
    it('prepend code to simple parent', () => {
        snapshot(transform("./test/prepend/SimpleParent.jsx"));
    });
    it('prepend code to closed parent', () => {
        snapshot(transform("./test/prepend/ClosedParent.jsx"));
    });
    it('prepend code to complex parent', () => {
        snapshot(transform("./test/prepend/ComplexParent.jsx"));
    });
    it('prepend code to duplicate parent', () => {
        snapshot(transform("./test/prepend/DuplicateParent.jsx"));
    });
    it('prepend existing node', () => {
        snapshot(transform("./test/prepend/MoveExistingNode.jsx"));
    });
});

describe('test append module functionality', () => {
    it('append module to simple parent', () => {
        snapshot(transform("./test/appendModule/SimpleParent.jsx"));
    });
    it('append module to duplicate parent', () => {
        snapshot(transform("./test/appendModule/DuplicateParent.jsx"));
    });
});

describe('test remove functionality', () => {
    it('remove simple child by call remove on child itself', () => {
        snapshot(transform("./test/remove/SimpleChild.jsx"));
    });
    it('remove simple child by call remove on parent', () => {
        snapshot(transform("./test/remove/SimpleChildInParent.jsx"));
    });
});

describe('test attr functionality', () => {
    it('change attr value', () => {
        snapshot(transform("./test/attr/Component.jsx"));
    });
});