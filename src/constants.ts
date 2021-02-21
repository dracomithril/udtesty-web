import { TranslationTypeKeys } from '@dracomithril/types';

export type LanguageType = {
  code: TranslationTypeKeys, name: string, inPolish: string
}
export const LANGUAGES: LanguageType[] = [
  { code: 'en', name: 'english', inPolish: 'angielski' },
  { code: 'pl', name: 'polski', inPolish: 'polski' },
  { code: 'ua', name: 'український', inPolish: 'ukraiński' },
  { code: 'ru', name: 'русский', inPolish: 'rosyjski' },
  { code: 'tr', name: 'Türk', inPolish: 'turecki' },
];

export const getLanguageNameByCode = (
  code: TranslationTypeKeys | null,
): string | undefined => {
  if (!code) return undefined;

  return LANGUAGES
    .find((lang) => lang.code === code)?.inPolish;
};

export enum ChoiceStatus {
  NONE = '#ffffff',
  CORRECT = '#9ee4a7',
  WRONG = '#f38989',
  HOVER = '#b9b9b9'
}

export const COMPANIES = [
  'marimar',
  'feuer',
];

export const COMPANIES_LOGO: {[name in typeof COMPANIES[number]]: string} = {
  marimar: '/images/marimar.png',
  feuer: '/images/feuer.png',
};
