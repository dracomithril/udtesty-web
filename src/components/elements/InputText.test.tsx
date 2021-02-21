import React from 'react';
import { render } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  it('should render InputText', () => {
    const { baseElement } = render(<InputText />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should add label', () => {
    const label = 'example';
    const { getByLabelText } = render(<InputText label={label} />);

    expect(getByLabelText(label)).toBeDefined();
  });
});
