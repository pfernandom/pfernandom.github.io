import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tag from '../components/tag';

storiesOf('Tag', module)
  .add('default', () => <Tag toggle={action('click tag')}>Click me</Tag>)
  .add('selected', () => (
    <Tag isSelected toggle={action('click tag')}>
      Click me
    </Tag>
  ))
  .add('with className', () => (
    <Tag className="my-class" toggle={action('Click tag')}>
      Click me
    </Tag>
  ));
