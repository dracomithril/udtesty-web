import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChoiceForm, { CHOICE_CORRECT_CHECKBOX } from './ChoiceForm';

describe('ChoiceForm', () => {
  it('should react on correct answer change', () => {
    const name = 'A';
    const onAnswerSelectedChange = jest.fn();
    const { baseElement, getByTestId } = render(<ChoiceForm
      correct
      name={name}
      id={3}
      onSelectChange={onAnswerSelectedChange}
    />);
    const correctAnswer = getByTestId(CHOICE_CORRECT_CHECKBOX);
    expect(correctAnswer).toBeChecked();
    fireEvent.click(correctAnswer);
    expect(onAnswerSelectedChange).toBeCalled();
    expect(baseElement).toMatchSnapshot();
  });
});
