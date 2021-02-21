import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { TranslationTypeKeys } from '@dracomithril/types';
import { LANGUAGES, LanguageType } from '../../constants';
import translations from '../../translations';

interface LanguageInterface <T> {
  value?: T | T[];
  onChange: (value: T | T[])=>void,
  availableLanguages?: T[],
}
export const SELECT_LANGUAGE_TEST_ID = 'select-language-id';
type LanguageSelectorProps = {
  className?: string;
  disabled?: boolean;
  defaultText?: string;
  multiple?: boolean;
};
const LanguageSelector = function LanguageSelector({
  onChange,
  value,
  className,
  availableLanguages,
  disabled,
  multiple,
  defaultText,
}: LanguageSelectorProps & LanguageInterface<TranslationTypeKeys>) {
  const useLanguages = !availableLanguages
    ? LANGUAGES
    : (LANGUAGES as LanguageType[]).filter((lang) => availableLanguages.includes(lang.code));

  return (
    <Select
      data-testid={SELECT_LANGUAGE_TEST_ID}
      className={className}
      placeholder={defaultText}
      disabled={disabled}
      value={value}
      onChange={onChange}
      mode={multiple ? 'multiple' : undefined}
    >
      {useLanguages
        .map(({ code, inPolish }) => (
          <Select.Option
            key={code}
            data-testid={`langCode-${code}`}
            value={code}
          >
            {inPolish}
          </Select.Option>
        ))}
    </Select>
  );
};

LanguageSelector.defaultProps = {
  className: '',
  disabled: false,
  defaultText: translations.common.choose_lang,
  value: '',
  availableLanguages: [],
  multiple: false,
};

export default styled(LanguageSelector)<{color?:string}>`
  color: inherit;
  font-size: inherit;
  width: 100px;

  :disabled {
    opacity: 0.7;
  }
`;
