import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import QuestionsContainer, {
  END_BUTTON_TEST_ID,
  NEXT_BUTTON_TEST_ID,
  PAGE_COUNT_TEST_ID,
} from './QuestionContainer';
import questions, { generateQuestions } from '../../providers/database/questions';
import { CHOICE_BUTTON_TEST_ID, QUESTION_ID_TEST_ID } from './Question';

jest.mock('../../providers/firebase');

describe('QuestionContainer', () => {
  it('should render component', () => {
    const { getByTestId, getAllByTestId } = render(<QuestionsContainer
      questions={questions}
      otherLanguage={null}
      test={{
        name: 'zzz',
        description: '',
      }}
      validTo=""
    />);
    const buttons = getAllByTestId(CHOICE_BUTTON_TEST_ID);
    expect(buttons).toHaveLength(4);
    buttons[0].click();
    const actual = buttons
      .every((button) => button.hasAttribute('disabled'));
    expect(actual).toBeTruthy();

    const next = getByTestId(NEXT_BUTTON_TEST_ID);
    next.click();
    expect(getByTestId(PAGE_COUNT_TEST_ID)).toHaveValue(2);
  });

  it('should be able to switch question', () => {
    const { getByTestId } = render(
      <Router>
        <QuestionsContainer
          questions={questions}
          otherLanguage={null}
          test={{
            name: 'zzz',
            description: '',
          }}
          validTo=""
        />
      </Router>,
    );
    const pageCount = getByTestId(PAGE_COUNT_TEST_ID);
    fireEvent.change(pageCount, { target: { value: '3' } });
    expect(pageCount).toHaveValue(3);
    expect(getByTestId(QUESTION_ID_TEST_ID)).toHaveTextContent('3');
  });

  it('should be able to see summary after quiz', async () => {
    const {
      getByTestId, getAllByTestId, findByText,
    } = render(
      <Router>
        <QuestionsContainer
          questions={generateQuestions(1)}
          otherLanguage={null}
          test={{
            name: 'zzz',
            description: '',
          }}
          validTo=""
          isQuiz
        />
      </Router>,
    );
    const buttons = getAllByTestId(CHOICE_BUTTON_TEST_ID);
    buttons[0].click();
    const endButton = getByTestId(END_BUTTON_TEST_ID);
    endButton.click();
    const text = await findByText('Wynik');
    const statistic = await findByText('/ 1');

    expect(text).toBeVisible();
    expect(statistic).toBeVisible();
  });
});
