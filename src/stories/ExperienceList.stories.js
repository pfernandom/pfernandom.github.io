/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import './style.scss';

import { ExperienceList } from '../components/experience';

const mockExperience = (_, id) => ({
  id,
  project: 'TDSI Consultoria',
  startDate: new Date(),
  endDate: new Date(),
  startYear: '2009',
  role: 'Web Developer',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in lacus vel ante consequat luctus eu vel libero. Aliquam at lacus vehicula, vehicula felis vitae, fringilla metus. Cras et consectetur velit, fringilla pellentesque odio. Proin in venenatis felis, sed viverra lorem. Pellentesque lobortis elit nisl, eget convallis sapien faucibus pulvinar. Suspendisse eu justo sit amet nibh facilisis fringilla. Maecenas dictum magna sed ante ornare vestibulum. Vivamus feugiat velit eget arcu feugiat, vel vulputate lectus suscipit. In turpis nisi, scelerisque vitae tempor faucibus, egestas eget felis. Sed commodo gravida nulla, vel faucibus velit consectetur id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce finibus ante nisl, a dapibus velit pharetra eget. Duis pulvinar erat vitae nisl porttitor semper. Sed molestie eleifend tristique. Proin euismod porttitor purus vel eleifend.`,
  tags: ['js', 'jquery', 'extjs', 'lotus-domino', 'ruby-on-rails', 'ui'],
  responsibilities: [
    {
      categories: ['backend', 'ui'],
      summary: 'Lotus Domino developer',
      content: 'Used JQuery to perform AJAX requests to backend services exposed by Lotus Domino',
    },
    {
      categories: ['ui'],
      content: 'Created UI modules using HTML, CSS and JavaScript',
    },
    {
      categories: ['backend'],
      content: 'Maintained a Lotus Domino database, to store client records',
    },
    {
      categories: ['backend', 'ruby-on-rails'],
      content: 'Implemented a proof of concept using Ruby on Rails to create a web application',
    },
  ],
});

const data = Array(4)
  .fill()
  .map(mockExperience);

const highlights = ['ui'];

storiesOf('ExperienceList', module)
  .add('default', () => <ExperienceList data={data} highlight={[]} />)
  .add('default (with highlights)', () => <ExperienceList data={data} highlight={highlights} />);
