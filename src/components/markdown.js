/* eslint-disable react/no-danger */
import React from 'react';
import Remarkable from 'remarkable';

const md = new Remarkable();

export default ({ value, children, className = '', ...props }) => (
  <div
    className={`markdown ${className}`}
    {...props}
    dangerouslySetInnerHTML={{ __html: md.render(value || children) }}
  />
);
