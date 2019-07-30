import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Expandable from '../components/expandable';

class Toggle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false,
    };
  }

  toggle() {
    this.setState(oldState => {
      return {
        expanded: !oldState.expanded,
      };
    });
  }

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <button onClick={this.toggle.bind(this)}>Toggle</button>
        <Expandable title="Title" preview={() => <span>Preview</span>} expanded={expanded}>
          Content
        </Expandable>
        <pre>The content is {expanded ? 'expanded' : 'not expanded'}</pre>
      </div>
    );
  }
}

storiesOf('Expandable', module)
  .addDecorator(withKnobs)
  .add('expanded', () => (
    <Expandable
      title={
        <div>
          <span>Title 1</span>
          <span>Title 2</span>
        </div>
      }
      expanded={boolean('Expanded?', true)}
    >
      Content
    </Expandable>
  ))
  .add('collapsed', () => (
    <Expandable title="Title" expanded={boolean('Expanded?', false)}>
      Content
    </Expandable>
  ))
  .add('collapsed with preview', () => (
    <Expandable title="Title" preview={() => <span>Preview</span>} expanded={false}>
      Content
    </Expandable>
  ))
  .add('inline theme', () => (
    <Expandable
      title={
        <div>
          <span>Title 1</span>
          <span>Title 2</span>
        </div>
      }
      expanded
      theme="inline"
    >
      Content
    </Expandable>
  ))
  .add('with toggle button', () => <Toggle />)
  .add('with toggle listener', () => (
    <Expandable
      title="Title"
      preview={() => <span>Preview</span>}
      expanded={false}
      onToggle={action('onToggle')}
    >
      Content
    </Expandable>
  ))
  .add('with toggle from inside', () => (
    <Expandable
      title="Title"
      preview={context => <button onClick={context.toggle}>Preview</button>}
      expanded={false}
      onToggle={action('onToggle')}
    >
      Content
    </Expandable>
  ));
