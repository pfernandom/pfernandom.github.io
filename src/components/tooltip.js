import React from 'react';
import './tooltip.scss';

export default function Tooltip({ className, hoverText, children }) {
  return (
    <div className={`tooltip ${className}`}>
      {children}
      <span className="tooltip__text">{hoverText}</span>
    </div>
  );
}
