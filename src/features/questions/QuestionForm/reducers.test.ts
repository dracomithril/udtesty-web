import { ChoiceType, QuestionType, TranslationType } from '@dracomithril/types';
import { ActionType, reducer } from './reducers';

describe('reducer', () => {
  const initial: QuestionType = {
    content: {
      en: 'alfa',
    },
    choices: [{
      correct: false,
      value: { en: 'omega' },
    },
    {
      correct: true,
      value: { en: 'gamma' },
    },
    ],
    picture: {
      alt: '',
    },
    rotate: false,
    qid: 1,
  };
  it('should be able to update rotate', () => {
    const action: ActionType = { type: 'rotate_choices_enable', value: true };
    const result = reducer(initial, action);
    expect(result).toHaveProperty('rotate', true);
  });
  it('should be able to update question', () => {
    const question: TranslationType = {
      en: 'beta',
    };
    const action: ActionType = { type: 'update_question', value: question };
    const result = reducer(initial, action);
    expect(result).toHaveProperty('content.en', question.en);
  });

  it('should update 2 choice', () => {
    const choice: ChoiceType = {
      correct: false,
      value: { en: 'beta' },
    };
    const action: ActionType = { type: 'update_choice', id: 1, value: choice };
    const result = reducer(initial, action);
    expect(result).toHaveProperty(['choices', 1, 'value', 'en'], choice.value.en);
  });
});
