import React from 'react';

import { storiesOf } from '@storybook/react';

import Tooltip from '../components/tooltip';

storiesOf('Tooltip', module).add('default', () => (
  <Tooltip
    className="instructions"
    hoverText="Check this box if you don't want to include this project"
  >
    Don&apos;t print this project
  </Tooltip>
));
