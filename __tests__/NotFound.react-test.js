import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils'
import NotFound from '../src/components/error';


const rend = ReactTestUtils.createRenderer();
rend.render(<NotFound />);
const result = rend.getRenderOutput();

test('NotFound matches snapshot', () => {
	const component = renderer.create(
		<NotFound/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});



