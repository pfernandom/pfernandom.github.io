import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Expandable from './expandable';

describe('Expandable', () => {
  function fireToggleEvent(element) {
    // eslint-disable-next-line no-param-reassign
    element.open = !element.open;
    return fireEvent(
      element,
      new Event('toggle', {
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  it('renders correctly, expanded', () => {
    const { container, getByTestId } = render(
      <Expandable title={<span>Hello</span>} expanded>
        Content
      </Expandable>,
    );
    expect(getByTestId('expandable-details')).toBeInTheDocument();
    expect(getByTestId('expandable-details').hasAttribute('open')).toBe(true);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly, collapsed', () => {
    const { container, getByTestId } = render(
      <Expandable title={<span>Hello</span>} expanded={false}>
        Content
      </Expandable>,
    );
    const expandableDetails = getByTestId('expandable-details');
    expect(expandableDetails).toBeInTheDocument();
    expect(expandableDetails.hasAttribute('open')).toBe(false);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('it toggles correctly with toggle event', () => {
    const { getByTestId } = render(
      <Expandable title={<span>Hello</span>} expanded>
        Content
      </Expandable>,
    );
    const expandableDetails = getByTestId('expandable-details');
    expect(expandableDetails.hasAttribute('open')).toBe(true);

    const expandableSummary = getByTestId('expandable-summary');
    expect(expandableSummary).toBeInTheDocument();

    fireToggleEvent(expandableDetails);

    expect(expandableDetails.hasAttribute('open')).toBe(false);

    fireToggleEvent(expandableDetails);

    expect(expandableDetails.hasAttribute('open')).toBe(true);
  });

  it('it toggles correctly by updating props', () => {
    const { rerender, getByTestId } = render(
      <Expandable title={<span>Hello</span>} expanded>
        Content
      </Expandable>,
    );
    const expandableDetails = getByTestId('expandable-details');
    expect(expandableDetails.hasAttribute('open')).toBe(true);

    rerender(
      <Expandable title={<span>Hello</span>} expanded={false}>
        Content
      </Expandable>,
    );

    expect(expandableDetails.hasAttribute('open')).toBe(false);

    rerender(
      <Expandable title={<span>Hello</span>} expanded>
        Content
      </Expandable>,
    );

    expect(expandableDetails.hasAttribute('open')).toBe(true);
  });
});
