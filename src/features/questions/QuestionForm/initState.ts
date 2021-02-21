import {
  ChoiceType,
  QuestionType,
  TestType,
  TranslationType,
  TranslationTypeKeys,
} from '@dracomithril/types';

const initTranslations = (langs: TranslationTypeKeys[]): TranslationType => langs
  .reduce((acc, code) => ({ ...acc, [code]: '' }), {});

export const initChoice = (languages: TranslationTypeKeys[]) => (): ChoiceType => ({
  value: initTranslations(languages),
  correct: false,
});

export const initQuestion = (test: TestType): QuestionType => ({
  content: initTranslations(test.languages),
  choices: Array.from({ length: 4 }, initChoice(test.languages)),
  picture: {
    alt: '',
  },
  rotate: false,
  qid: test.counter + 1,
});
