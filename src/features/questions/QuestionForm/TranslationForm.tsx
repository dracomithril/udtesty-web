import React, { ChangeEvent } from 'react';
import { TranslationType, TranslationTypeKeys } from '@dracomithril/types';
import { LANGUAGES, LanguageType } from '../../../constants';
import TranslationInput from './TranslationInput';

export type TranslationFormChangeType = {
  name: string,
  value: TranslationType,
  isValid: boolean
};

export const TRANSLATION_FORM_TEST_ID = 'translation-form';

interface TranslationFormType {
  name: string,
  value: TranslationType;
  disabled?: boolean;
  'data-testid'?: string
  onChange?: (newValue: TranslationFormChangeType) => void,
  availableLanguages: TranslationTypeKeys[]
  type: 'choice' | 'question';
  className?: string;
}

const handleInputChange = (
  lang: TranslationTypeKeys,
  value: TranslationType,
  handler: (newValue: TranslationFormChangeType) => void,
) => ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
  const translations = { ...value, [lang]: currentTarget.value };
  handler({
    name: currentTarget.name,
    value: translations,
    isValid: Object.values(translations).every((v) => !!v),
  });
};

const TranslationForm = ({
  value,
  type,
  name,
  onChange,
  className,
  disabled,
  availableLanguages = [],
  'data-testid': dataTestId,
}:
TranslationFormType) => {
  // todo hidden and needed?
  const inputs = (LANGUAGES as LanguageType[])
    .filter(({ code }) => availableLanguages.includes(code))
    .map(({ code, inPolish }: LanguageType) => {
      const id = `${[type, name, code].join('.')}`;
      const valueElement = value[code];
      return (
        valueElement != null && (
        <TranslationInput
          label={inPolish}
          data-testid={id}
          key={id}
          name={name}
          value={valueElement}
          needed={availableLanguages.includes(code)}
          hidden={!availableLanguages.includes(code)}
          disabled={disabled}
          onChange={onChange && handleInputChange(code, value, onChange)}
        />
        )
      );
    });
  return (
    <div data-testid={dataTestId} className={className}>
      {inputs}
    </div>
  );
};

TranslationForm.defaultProps = {
  className: undefined,
  disabled: false,
  'data-testid': TRANSLATION_FORM_TEST_ID,
  onChange: () => {},
};

export default TranslationForm;
