import React, {
  CSSProperties, SyntheticEvent, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import {
  ChoiceType, QuestionType, TranslationType, TranslationTypeKeys,
} from '@dracomithril/types';
import ChoicesContainer from './ChoicesContainer';
import { ChoiceButton } from '../../components/elements/Buttons';
import { ChoiceStatus } from '../../constants';
import QuestionPicture from './QuestionPicture';

const defaultLanguage = 'pl';

export const CHOICE_BUTTON_TEST_ID = 'choice-button';
export const CHOICE_CONTAINER_TEST_ID = 'choice-container';
export const QUESTION_ID_TEST_ID = 'question-qid-span';

type QuestionProps = {
  className?: string,
  style?: CSSProperties,
  question: QuestionType,
  language?: TranslationTypeKeys,
  answered?: boolean,
  onAnswer?: (correct: boolean) => void,
  onClick?: (event: SyntheticEvent<HTMLDivElement>)=> void,
};

const getValue = (value: TranslationType,
  index: TranslationTypeKeys) => value[index] || value[defaultLanguage];

const ChoiceContent = styled.span`
  margin: auto;
`;

type GetStatusType = {
  name: string,
  choice: ChoiceType,
  answered?: boolean,
  answer?: string
};

function getStatus({
  choice,
  name,
  answer,
  answered,
}:GetStatusType) {
  if (!answered) return ChoiceStatus.NONE;
  if (choice.correct) return ChoiceStatus.CORRECT;
  if (answer === name) return ChoiceStatus.WRONG;
  return ChoiceStatus.NONE;
}

const Question = ({
  className,
  question,
  language = 'pl',
  style,
  answered,
  onAnswer,
  onClick,
}: QuestionProps) => {
  const [answer, setAnswer] = useState<string>();
  useEffect(() => () => {
    setAnswer(undefined);
  }, []);
  if (!question) return null;
  const {
    choices, picture, qid, content, rotate,
  } = question;
  const handleAnswer = (name: string, choice: ChoiceType) => () => {
    setAnswer(name);
    onAnswer?.(choice.correct);
  };

  const mapChoiceButtons = (choice: ChoiceType, index: number) => {
    const name = `${CHOICE_BUTTON_TEST_ID}_${index}`;
    const status = getStatus({
      choice, answered, answer, name,
    });
    return (
      <ChoiceButton
        status={status}
        name={name}
        disabled={answered || !onAnswer}
        data-testid={CHOICE_BUTTON_TEST_ID}
        key={name}
        onClick={!answered ? handleAnswer(name, choice) : undefined}
      >
        {!rotate && <span>{`${String.fromCharCode(65 + index)}.`}</span>}
        <ChoiceContent>{getValue(choice.value, language)}</ChoiceContent>
      </ChoiceButton>

    );
  };

  return (
    <div
      role="presentation"
      className={className}
      style={style}
      onClick={onClick}
    >
      <div className="question">
        <span data-testid={QUESTION_ID_TEST_ID}>
          {`${qid}. ${getValue(content, language)}`}
        </span>
      </div>
      {picture.href && (<QuestionPicture data={picture} />)}
      <ChoicesContainer data-testid={CHOICE_CONTAINER_TEST_ID}>
        {choices.map(mapChoiceButtons)}
      </ChoicesContainer>
    </div>
  );
};

Question.defaultProps = {
  className: '',
  style: {},
  language: 'pl',
  answered: false,
  onAnswer: () => {},
  onClick: () => {},
};

export default styled(Question)`
  display: flex;
  min-height: 150px;
  min-width: 280px;
  padding: 10px;
  margin: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .question {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
`;
