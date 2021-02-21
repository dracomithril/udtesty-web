import React from 'react';
import { ChoiceType, TranslationTypeKeys } from '@dracomithril/types';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TranslationForm, {
  TranslationFormChangeType,
} from './TranslationForm';
import ChoiceForm from './ChoiceForm';

export type ChoiceListOnChangeType = ({ value, id }: { value: ChoiceType, id: number}) => void

type ChoiceListPropsTyp = {
  choices: ChoiceType[],
  availableLangs: TranslationTypeKeys[],
  onChange: ChoiceListOnChangeType,
}

const ChoiceList = ({
  choices,
  availableLangs,
  onChange,
}: ChoiceListPropsTyp) => (
  <>
    {
  choices.map(({ value, correct }, id) => {
    const name = `choice.${id}`;
    const handleAnswerSelectedChange = (event: CheckboxChangeEvent) => {
      onChange({ value: { value, correct: event.target.checked }, id });
    };
    const handleChoiceChange = ({ value: translationValue }: TranslationFormChangeType) => {
      onChange({ value: { correct, value: translationValue }, id });
    };
    return (
      <ChoiceForm
        key={name}
        id={id}
        name={name}
        correct={correct}
        onSelectChange={handleAnswerSelectedChange}
      >
        <TranslationForm
          name={name}
          availableLanguages={availableLangs}
          type="choice"
          onChange={handleChoiceChange}
          value={value}
        />
      </ChoiceForm>
    );
  })
}
  </>
);

export default ChoiceList;
