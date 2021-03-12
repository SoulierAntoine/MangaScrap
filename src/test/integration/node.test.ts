const {tree} = require('../fixtures/provider');
import NodeUtils from '../../main/commons/utils/node-utils';



describe('node', () => {
	test('get nodes at level', () => {
		const childrenAtLevel = NodeUtils.getNodesAtLevel(tree, 3);
		expect(childrenAtLevel.map(child => child.id)).toEqual([5,6,7]);
	});
});
