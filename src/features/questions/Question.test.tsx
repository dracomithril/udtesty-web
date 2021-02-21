import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Question, { CHOICE_BUTTON_TEST_ID } from './Question';
import questions from '../../providers/database/questions';

const [question] = questions;
jest.mock('../../providers/firebase');
it('should render component', () => {
  const handleAnswer = jest.fn();
  const {
    getAllByTestId,
  } = render(<Question
    question={question}
    language="en"
    onAnswer={handleAnswer}
  />);
  const buttons = getAllByTestId(CHOICE_BUTTON_TEST_ID);
  expect(buttons).toHaveLength(4);
  const choice1 = buttons[0];
  fireEvent.click(choice1);
  expect(handleAnswer).toBeCalled();
});
