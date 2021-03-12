import Node from '../../models/node';

export default class NodeUtils {

	/**
	 * Get all nodes at given level
	 * @param {Node} root
	 * @param {number} level
	 * @param {Node[]} accumulator
	 * @returns {Node[]}
	 */
	static getNodesAtLevel(root: Node, level: number, accumulator: Node[] = []): Node[] {
		if (root.level === level && root.parent < 0)
			return new Array(root);

		const children = root.children;
		for (const child of children) {
			if (child.level === level) {
				accumulator.push(child);
			} else {
				NodeUtils.getNodesAtLevel(child, level, accumulator);
			}
		}

		return accumulator;
	}
}
