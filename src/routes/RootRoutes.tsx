import React from 'react';
import { Route, Switch } from 'react-router-dom';
import get from 'lodash/get';
import styled from 'styled-components';
import { GetTestReturnType } from '@dracomithril/types';
import Home from "../pages/Home"
import * as ROUTES from './routes'
import QuestionsContainer from "../features/questions/QuestionContainer"

const RootRoutes = styled(({ className }:{className?:string}) => (
  <section className={className}>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route
        path={ROUTES.QUESTION}
        render={(props) => {
          const { testInfo, isQuiz } = get(props, 'location.state');
          const {
            questions,
            otherLanguage,
            test,
            validTo,
          }: GetTestReturnType = testInfo;
          return (
            <QuestionsContainer
              questions={questions}
              otherLanguage={otherLanguage}
              test={test}
              validTo={validTo}
              isQuiz={isQuiz}
            />
          );
        }}
      />
    </Switch>
  </section>
))`
  display: flex;
  flex: auto;

  @media (min-width: 800px) {
    max-width: 1010px;
    min-width: 700px;
    margin: auto;
    justify-content: center;
    align-content: center;
  }
`;

export default RootRoutes;
