/* eslint-disable react/no-danger */
import React from 'react';
import Remarkable from 'remarkable';

const md = new Remarkable({
  html: true,
});

export default function Markdown({
  children,
  className,
  value,
}: {
  children?: Element;
  className?: string;
  value?: string;
}) {
  return (
    <div
      className={`markdown ${className}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      dangerouslySetInnerHTML={{ __html: md.render(value || children) }}
    />
  );
}

Markdown.defaultProps = {
  className: '',
  value: null,
  children: null,
};
