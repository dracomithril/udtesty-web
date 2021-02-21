import uniqid from 'uniqid';
import { TestType, TranslationTypeKeys } from '@dracomithril/types';

type CreateTestType = { name?: string, counter?: number, languages?: TranslationTypeKeys[] };
export const createTest = (props: CreateTestType = {}) => {
  const {
    name = uniqid(),
    counter = 5,
    languages = ['pl', 'en'],
  } = props;
  return ({
    id: uniqid(),
    languages,
    name,
    counter,
    description: `fake description for ${name}`,
  });
};

function generateTests(count: number): TestType[] {
  return Array.from({ length: count }, () => createTest()) || [];
}
export function generateTestFromList(list: string[]): TestType[] {
  return list.map((name) => createTest({ name }));
}

export default generateTests;
