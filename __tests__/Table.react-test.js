import React from 'react';
import renderer from 'react-test-renderer';
import {SCTable} from '../src/components/table';

test('SCTable matches snapshot', () => {
	const component = renderer.create(
		<SCTable>
			<tbody>
				<tr><td>Test</td></tr>
			</tbody>
		</SCTable>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});



