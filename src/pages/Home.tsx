import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";

type HomePropType = { className?: string };
const QUIZ_QUESTIONS_NUM = 5;

const handleLog = (...args: any[]) => {
  console.info(...args);
};

async function getQuestions(token: string): Promise<any> {
  // TODO should be able to get questions from local storage
  return {};
}

function getRandomQuestions(testInfo: any /*GetTestReturnType*/): void /* GetTestReturnType */ {
  //TODO should create quiz selection
}

type AvailableTokensType = {
  name: string;
  value?: string;
};

const Home = styled(({ className }: HomePropType) => {
  const { t } = useTranslation();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [availableTokens, setAvailableTokens] = useState<AvailableTokensType[]>([]);

  useEffect(() => {
    // TODO need to be implemented
    return () => {};
  }, []);

  const handleSubmit = async () => {
    // TODO handle redirect to selected test
  };

  const handleQuiz = async () => {
    // TODO redirect to selected quiz
  };

  const handleEnterButton = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      await handleSubmit();
    }
  };

  const handleTokenChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    setToken(currentTarget.value);
  };

  return (
    <div className={className}>
      <div className="token-list">
        <Typography.Title level={4}>{t("home.saved_tokens")}</Typography.Title>
        {availableTokens.map((availableToken) => (
          <Button
            key={availableToken.name}
            type="dashed"
            onClick={() => {
              setToken(availableToken.name);
            }}
          >
            {availableToken.value}
          </Button>
        ))}
      </div>
      <Input
        type="text"
        name="token"
        className="token_input"
        placeholder={t("home.put_token")}
        value={token}
        data-cy="token"
        onKeyDown={handleEnterButton}
        onChange={handleTokenChange}
      />
      <Button.Group>
        <Button type="primary" disabled={!token.length} loading={loading} onClick={handleSubmit}>
          {t("home.start")}
        </Button>
        <Button
          danger
          type="primary"
          disabled={!token.length}
          loading={loadingQuiz}
          onClick={handleQuiz}
        >
          {t("home.quiz")}
        </Button>
      </Button.Group>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  margin: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;

  .token_input {
    margin: 1em;
    text-align: center;
  }

  .token-list {
    margin: 1em;
    display: flex;
    flex-flow: column;
  }
`;

export default Home;
