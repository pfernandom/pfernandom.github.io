/* eslint-disable import/prefer-default-export */
import React from 'react';

export interface AnimationContextType {
  isAnimating: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAnimating: (unknown) => boolean;
}

export const AnimationContext = React.createContext({
  isAnimating: false,
  setIsAnimating: value => {
    return !!value;
  },
});
