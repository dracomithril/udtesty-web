import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TranslationForm from './TranslationForm';
import { TRANSLATION_INPUT_TEXTAREA } from './TranslationInput';

describe('TranslationForm', () => {
  it('should render component', () => {
    const translation = { pl: '', ua: '' };
    const handleChange = jest.fn();
    const { baseElement, getByTestId } = render(<TranslationForm
      name="ABC"
      onChange={handleChange}
      value={translation}
      availableLanguages={['pl']}
      type="choice"
    />);
    expect(baseElement).toMatchSnapshot();
    const elementsByTagName = getByTestId(TRANSLATION_INPUT_TEXTAREA);
    const change = { target: { value: 'abcd' } };
    fireEvent.change(elementsByTagName, change);
    expect(handleChange)
      .toBeCalledWith(
        expect.objectContaining({
          value: expect
            .objectContaining({
              pl: change.target.value,
            }),
        }),
      );
  });
});
