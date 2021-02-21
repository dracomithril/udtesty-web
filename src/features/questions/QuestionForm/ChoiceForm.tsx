import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Choice from './Choice';

export const CHOICE_CORRECT_CHECKBOX = 'choice-correct-checkbox';
export const CHOICE_TEST_ID = 'choice_container';

const ChoiceHeader = styled.header`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const translations = {
  correct: 'poprawna',
};

const ChoiceForm = ({
  id,
  onSelectChange,
  correct,
  name,
  'data-testid': dataTestId,
  children,
  className,
}:
{
  correct: boolean,
  name: string,
  id: number,
  onSelectChange: (event: CheckboxChangeEvent) => void,
  children?: React.ReactNode,
  'data-testid'?: string,
  className?: string,
}) => (
  <Choice
    selected={correct}
    odd={id % 2 === 0}
    data-testid={dataTestId}
    className={className}
  >
    <ChoiceHeader>
      <span>{`${name}.`}</span>
      <label htmlFor={`correct.${name}`}>
        {translations.correct}
        <Checkbox
          id={`correct.${name}`}
          data-testid={CHOICE_CORRECT_CHECKBOX}
          name={name}
          checked={correct}
          onChange={onSelectChange}
        />
      </label>
    </ChoiceHeader>
    {children}
  </Choice>
);

ChoiceForm.defaultProps = {
  className: '',
  children: undefined,
  'data-testid': CHOICE_TEST_ID,
};

export default ChoiceForm;
