import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { shuffle } from "lodash";
import { Modal, Statistic } from "antd";
import { GetTestReturnType, QuestionType, TranslationTypeKeys } from "@dracomithril/types";
import Question from "./Question";
import { HOME } from "../../routes/routes";
import { useTranslation } from "react-i18next";
import { QuestionNavigation } from "./QuestionNavigation";

type QuestionContainerPropTypes = GetTestReturnType & {
  className?: string;
  isQuiz?: boolean;
};

export const NEXT_BUTTON_TEST_ID = "next-button";
export const PAGE_COUNT_TEST_ID = "page-count";
export const END_BUTTON_TEST_ID = "end-button";
export const STATISTICS_TEST_ID = "statistics";

const shuffleChoices = (question: QuestionType) => ({
  ...question,
  choices: question && shuffle(question.choices),
});

const defaultLang = "pl";
// TODO useReducer
// TODO fix iphon5
const QuestionsContainer = (props: QuestionContainerPropTypes) => {
  const { className, questions, otherLanguage, isQuiz } = props;
  const { t } = useTranslation();
  const [qid, setQid] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [current, setCurrent] = useState<QuestionType>();
  const [useSecondLanguage, setUseSecondLanguage] = useState(false);
  const [answers, setAnswers] = useState({});
  const history = useHistory();

  const lang: TranslationTypeKeys =
    (useSecondLanguage ? otherLanguage : defaultLang) || defaultLang;
  useEffect(() => {
    if (questions && questions[qid]) {
      const question = questions[qid];
      const shuffleChoices1 = question.rotate ? shuffleChoices(question) : question;
      setCurrent(shuffleChoices1);
    }
    setAnswered(false);
  }, [qid, questions]);

  const isEmpty = questions.length === 0;
  const isLast = isEmpty || qid === questions.length - 1;

  const handleAnswer = (isCorrect: boolean) => {
    if (current?.qid) {
      setAnswers((currentAnswers) => ({
        ...currentAnswers,
        [current?.qid]: isCorrect,
      }));
    }

    setAnswered(true);
  };

  const handleEndButtonClick = () => {
    if (isQuiz) {
      Modal.info({
        title: t("questions.result"),
        onOk: () => {
          history.push(HOME);
        },
        content: (
          <Statistic
            data-testid={STATISTICS_TEST_ID}
            value={Object.values(answers).filter((a) => a).length}
            suffix={`/ ${questions.length}`}
          />
        ),
      });
    } else {
      history.push(HOME);
    }
  };
  const handlePageCountChange = (value: number) => {
    setQid(value);
  };
  const handleLanguageChangeClick = () => {
    setUseSecondLanguage(!useSecondLanguage);
  };
  return (
    <div className={className}>
      {!isEmpty && current && (
        <Question question={current} language={lang} answered={answered} onAnswer={handleAnswer} />
      )}
      {isEmpty && <span>No questions</span>}
      {!isEmpty && (
        <QuestionNavigation
          isLast={isLast}
          answered={answered}
          size={questions.length}
          current={qid}
          lang={defaultLang}
          next={otherLanguage}
          onChangeLanguage={handleLanguageChangeClick}
          onChangeQuestion={handlePageCountChange}
          onFinish={handleEndButtonClick}
        />
      )}
    </div>
  );
};

QuestionsContainer.defaultProps = {
  className: "",
  isQuiz: false,
};

export default styled(QuestionsContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  flex: 1;
`;
