import flatten from 'lodash/flatten';
import entries from 'object.entries';
import isSubset from 'is-subset';
import functionName from 'function.prototype.name';
import {nodeHasProperty} from './Utils';

export function propsOfNode(node) {
    return (node && node.props) || {};
}

export function childrenOfNode(node) {
    if (!node) return [];
    return Array.isArray(node.rendered) ? flatten(node.rendered, true) : [node.rendered];
}

// export function hasClassName(node, className) {
//   let classes = propsOfNode(node).className || '';
//   classes = String(classes).replace(/\s/g, ' ');
//   return ` ${classes} `.indexOf(` ${className} `) > -1;
// }

export function hasClassName(path, className) {
    const node = path.node;
    return node.name.name === 'className' && node.value.value === className;
}

export function treeForEach(tree, fn) {
    if (tree !== null && tree !== false && typeof tree !== 'undefined') {
        fn(tree);
    }
    childrenOfNode(tree).forEach(node => treeForEach(node, fn));
}

export function treeFilter(tree, fn) {
    const results = [];
    treeForEach(tree, (node) => {
        if (fn(node)) {
            results.push(node);
        }
    });
    return results;
}

/**
 * To support sibling selectors we need to be able to find
 * the siblings of a node. The easiest way to do that is find
 * the parent of the node and access its children.
 *
 * This would be unneeded if the RST spec included sibling pointers
 * such as node.nextSibling and node.prevSibling
 * @param {*} root
 * @param {*} targetNode
 */
export function findParentNode(root, targetNode) {
    const results = treeFilter(
        root,
        (node) => {
            if (!node.rendered) {
                return false;
            }
            return Array.isArray(node.rendered)
                ? node.rendered.indexOf(targetNode) !== -1
                : node.rendered === targetNode;
        },
    );
    return results[0] || null;
}

function pathFilter(path, fn) {
    return path.filter(tree => treeFilter(tree, fn).length !== 0);
}

export function pathToNode(node, root) {
    const queue = [root];
    const path = [];

    const hasNode = testNode => node === testNode;

    while (queue.length) {
        const current = queue.pop();
        const children = childrenOfNode(current);
        if (current === node) return pathFilter(path, hasNode);

        path.push(current);

        if (children.length === 0) {
            // leaf node. if it isn't the node we are looking for, we pop.
            path.pop();
        }
        queue.push(...children);
    }

    return null;
}

export function parentsOfNode(node, root) {
    return pathToNode(node, root).reverse();
}

export function nodeHasId(node, id) {
    return propsOfNode(node).id === id;
}


export {nodeHasProperty};

const CAN_NEVER_MATCH = {};

function replaceUndefined(v) {
    return typeof v !== 'undefined' ? v : CAN_NEVER_MATCH;
}

function replaceUndefinedValues(obj) {
    return entries(obj)
        .reduce((acc, [k, v]) => ({...acc, [k]: replaceUndefined(v)}), {});
}

export function nodeMatchesObjectProps(node, props) {
    return isSubset(propsOfNode(node), replaceUndefinedValues(props));
}

export function getTextFromNode(node) {
    if (node == null) {
        return '';
    }

    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (node.type && typeof node.type === 'function') {
        return `<${node.type.displayName || functionName(node.type)} />`;
    }

    return childrenOfNode(node).map(getTextFromNode)
        .join('')
        .replace(/\s+/, ' ');
}