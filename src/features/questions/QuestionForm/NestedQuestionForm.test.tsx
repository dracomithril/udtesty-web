import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';
import NestedQuestionForm, { ROTATE_CHOICES_TEST_ID } from './NestedQuestionForm';
import { initQuestion } from './initState';
import { createTest } from '../../../providers/database/tests';

describe('NestedQuestionForm', () => {
  it('should be able to change rotate', () => {
    const test = createTest({ name: 'test1' });
    const question = initQuestion(test);
    const handleChange = jest.fn();
    const { getByTestId } = render(<NestedQuestionForm
      question={question}
      onChange={handleChange}
      test={test}
    />);
    const rotate = getByTestId(ROTATE_CHOICES_TEST_ID);
    fireEvent.click(rotate);
    expect(handleChange).toBeCalledTimes(1);
    expect(handleChange).toBeCalledWith(expect.objectContaining({
      value: {
        ...question,
        rotate: true,
      },
    }));
  });
});
