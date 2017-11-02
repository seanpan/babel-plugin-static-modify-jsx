module.exports = {
    './test/append/SimpleParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.append('<div>child</div>');
    },
    './test/append/ClosedParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.append('<div>child</div>');
    },
    './test/append/ComplexParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.append('<div>child</div>');
    },
    './test/append/DuplicateParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.append('<div>child</div>');
    },
    './test/append/MoveExistingNode.jsx': function (cast) {
        // const parentNode = cast.find('.parent-main');
        const parentSubNode = cast.find('.parent-sub');
        const childNode = cast.find('.child');
        parentSubNode.append(childNode);
    },
    './test/prepend/SimpleParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.prepend('<div>child</div>');
    },
    './test/prepend/ClosedParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.prepend('<div>child</div>');
    },
    './test/prepend/ComplexParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.prepend('<div>child</div>');
    },
    './test/prepend/DuplicateParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.prepend('<div>child</div>');
    },
    './test/prepend/MoveExistingNode.jsx': function (cast) {
        // const parentNode = cast.find('.parent-main');
        const parentSubNode = cast.find('.parent-sub');
        const childNode = cast.find('.child');
        parentSubNode.prepend(childNode);
    },
    './test/appendModule/SimpleParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.appendModule('./test/appendModule/Child.jsx', [
            {
                key: 'name',
                value: 'test-name'
            },
            {
                key: 'value',
                value: 'this.state.value',
                asExpression: true
            }
        ]);
    },
    './test/appendModule/DuplicateParent.jsx': function (cast) {
        const nodeCast = cast.find('.parent');
        nodeCast.appendModule('./test/appendModule/Child.jsx', [
            {
                key: 'name',
                value: 'test-name'
            },
            {
                key: 'value',
                value: 'this.state.value',
                asExpression: true
            }
        ]);
    },
    './test/remove/SimpleChild.jsx': function (cast) {
        const childNode = cast.find('.child');
        childNode.remove();
    },
    './test/remove/SimpleChildInParent.jsx': function (cast) {
        const parentNode = cast.find('.parent'), childNode = cast.find('.child');
        parentNode.remove(childNode);
    },
    './test/attr/Component.jsx': function (cast) {
        const input = cast.find('.input');
        const obj = {
            a: 1,
            b: {
                c: 2
            }
        };
        //add
        input.attr('name', 'input-name-modified');
        input.attr('value', null);
        input.attr('onChange', function onChange() {
            console.log('onChange');
        });
        input.attr('onClick', 'this.handleClick.bind(this)', true);
        //modified
        input.attr('obj', obj);
        input.attr('type', 'hidden');
        input.removeAttr('type');
    }
};