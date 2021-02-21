import React from 'react';
import styled from 'styled-components';
import { QuestionType, TestType } from '@dracomithril/types';
import { Checkbox, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import translation from '../../../translations';
import { ActionType, reducer, ValidationType } from './reducers';
import ChoiceList, { ChoiceListOnChangeType } from './ChoiceList';
import TranslationForm, { TranslationFormChangeType } from './TranslationForm';
import PictureForm, { PictureFormChangeType } from './PictureForm';
import PictureCompare from './PictureCompare';

export const QUESTION_VALUE_TEST_ID = 'question_content_value';
export const ROTATE_CHOICES_TEST_ID = 'rotate_choices_test_id';
const questionFormTranslation = translation.question_form;

type HandleChangePropType = {
  value: QuestionType,
  validation?: ValidationType
}
export type HandleChangeType = (event: HandleChangePropType) => void

interface NestedQuestionFormPropTypes {
  test?: TestType,
  question?: QuestionType,
  className?: string,
  onChange?: HandleChangeType
}

const NestedQuestionForm = (props: NestedQuestionFormPropTypes) => {
  const {
    className, test, question, onChange,
  } = props;
  if (!test) return null;
  if (!question) return null;

  const dispatch = (action: ActionType) => {
    onChange?.({ value: reducer(question, action), validation: action.validation });
  };

  const handleRotateChange = ({ target }: CheckboxChangeEvent) => {
    dispatch({ type: 'rotate_choices_enable', value: target.checked });
  };
  const handlePictureChange = ({ value }: PictureFormChangeType) => {
    dispatch({ type: 'update_picture', value });
  };
  const handleQuestionUpdate = ({ name, value, isValid }: TranslationFormChangeType) => {
    dispatch({ type: 'update_question', value, validation: { name, isValid } });
  };

  const handleChoiceListChange: ChoiceListOnChangeType = ({ value, id }) => {
    dispatch({ type: 'update_choice', value, id });
  };
  return (
    <div className={className}>
      <div className="stage1">
        <div>
          <PictureCompare picture={question.picture} />
          <PictureForm
            picture={question.picture}
            onChange={handlePictureChange}
            selectedTestId={test.id}
          />
        </div>
      </div>
      <Typography.Title level={4}>{questionFormTranslation.question}</Typography.Title>
      <TranslationForm
        key="question"
        availableLanguages={test?.languages}
        data-testid={QUESTION_VALUE_TEST_ID}
        name="question"
        type="question"
        onChange={handleQuestionUpdate}
        value={question.content}
      />
      <Typography.Title level={4}>
        {questionFormTranslation.answers}
      </Typography.Title>
      <Checkbox
        id="rotateChoices"
        name="rotateChoices"
        data-testid={ROTATE_CHOICES_TEST_ID}
        checked={question.rotate}
        onChange={handleRotateChange}
      >
        {questionFormTranslation.rotate_questions}
      </Checkbox>
      <ChoiceList
        choices={question.choices}
        availableLangs={test?.languages}
        onChange={handleChoiceListChange}
      />
    </div>
  );
};

NestedQuestionForm.defaultProps = {
  className: '',
  test: undefined,
  question: undefined,
  onChange: () => {},
};

export default styled(NestedQuestionForm)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: auto;

  .stage1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 10px;
  }
`;
