import React from "react";
import styled from "styled-components";
import { Button, Pagination, Switch } from "antd";
import { TranslationTypeKeys } from "@dracomithril/types";
import { ExportOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { END_BUTTON_TEST_ID } from "./QuestionContainer";

type ChangeLang = { onClick: () => void; lang: TranslationTypeKeys; next: TranslationTypeKeys };
const ChangeLanguage = ({ next, onClick, lang }: ChangeLang) => (
  <Button onClick={onClick}>{`${lang} => ${next}`.toUpperCase()}</Button>
);
const NavigationBar = styled.div`
  display: flex;
  flex: auto;
  max-height: 30px;
  flex-flow: row;
  min-width: 300px;
  justify-content: center;
  font-size: medium;

  input {
    font-size: medium;
    text-align: right;
  }
`;
interface QuestionNavigationProps {
  isLast: boolean;
  answered: boolean;
  size: number;
  current: number;
  lang: TranslationTypeKeys;
  next: TranslationTypeKeys | null;
  onChangeQuestion: (id: number) => void;
  onChangeLanguage: () => void;
  onFinish: () => void;
}

export const QuestionNavigation = ({
  isLast,
  answered,
  current,
  size,
  lang,
  next,
  onChangeQuestion,
  onChangeLanguage,
  onFinish,
}: QuestionNavigationProps) => {
  const { t } = useTranslation();
  return (
    <NavigationBar>
      {next && <Switch onClick={onChangeLanguage} unCheckedChildren={lang.toUpperCase()} checkedChildren={next.toUpperCase()} />}
      <Pagination
        simple
        disabled={!answered}
        current={current + 1}
        total={size}
        pageSize={1}
        onChange={(page) => {
          onChangeQuestion(page - 1);
        }}
      />
      {isLast && (
        <Button disabled={!answered} data-testid={END_BUTTON_TEST_ID} onClick={onFinish}>
          {t("questions.finish")}
          <ExportOutlined />
        </Button>
      )}
    </NavigationBar>
  );
};
