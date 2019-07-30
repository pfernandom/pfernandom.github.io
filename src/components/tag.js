/**
 * Created by pedro.f.marquez.soto on 4/13/2017.
 */
import React from 'react';
import './tag.scss';

export default ({ value, children, isSelected, className, toggle }) => {
  const classes = isSelected ? `tag tag--selected` : `tag no-print`;
  return (
    <button className={`${classes} ${className}`} onClick={toggle}>
      {value || children}
    </button>
  );
};
