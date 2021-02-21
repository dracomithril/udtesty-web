import { QuestionType, TestType } from '@dracomithril/types';
import { initQuestion } from './initState';

it('should initialize question', () => {
  const test: TestType = {
    languages: ['en', 'pl'],
    counter: 1,
    description: 'example of the test',
    id: 'MxAzE',
    name: 'Test1',
  };
  const question: QuestionType = initQuestion(test);
  expect(question).toEqual({
    content: { en: '', pl: '' },
    choices:
      [{ value: { en: '', pl: '' }, correct: false },
        { value: { en: '', pl: '' }, correct: false },
        { value: { en: '', pl: '' }, correct: false },
        { value: { en: '', pl: '' }, correct: false }],
    picture: { alt: '' },
    rotate: false,
    qid: 2,
  });
});
