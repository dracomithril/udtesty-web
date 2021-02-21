import { QuestionType, TestType } from '@dracomithril/types';
import fakeData from './example.json';
import { wait } from '../../utils';

const tests :{
  [name:string]: QuestionType[]
} = {
  test1: fakeData as QuestionType[],
  test2: [],
};

export const getQuestions = (testName: string):Promise<QuestionType[]> => wait(
  3000,
  tests[testName] || fakeData,
);
export const getTests = ():Promise<TestType[]> => wait(3000, [
  {
    id: 'test1', name: 'test 1', counter: 0, languages: ['en', 'pl'], description: '',
  },
  {
    id: 'test2', name: 'test 2', counter: 6, languages: ['en', 'pl', 'ua'], description: '',
  },
]);
