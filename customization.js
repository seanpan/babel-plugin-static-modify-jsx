module.exports = {
    './test/append/parent.jsx': function (cast) {
        const nodeCast = cast.find('parent-div');
        nodeCast.append('<div></div>');
    },
    './test/appendModule/parent.jsx': function (cast) {
        const nodeCast = cast.find('parent-div');
        nodeCast.appendModule('./test/appendModule/child.jsx', {
            name: "test-name",
            title: () => {
                console.log(123)
            }
        });
    },
};