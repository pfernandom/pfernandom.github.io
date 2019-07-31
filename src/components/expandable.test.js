import React from 'react';
import renderer from 'react-test-renderer';
import Expandable from './expandable';

describe('Expandable', () => {
  it('renders correctly, expanded', () => {
    const tree = renderer
      .create(
        <Expandable title={<h1>Hello</h1>} expanded>
          Content
        </Expandable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, collapsed', () => {
    const tree = renderer
      .create(
        <Expandable title={<h1>Hello</h1>} expanded={false}>
          Content
        </Expandable>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
