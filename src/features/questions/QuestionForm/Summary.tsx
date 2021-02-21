import React, { useState } from 'react';
import uniqid from 'uniqid';
import { QuestionType, TranslationTypeKeys } from '@dracomithril/types';
import styled from 'styled-components';
import LanguageSelector from '../../../components/elements/LanguageSelector';
import PictureCompare from './PictureCompare';

export const SUBMIT_BUTTON_TEST_ID = 'question_form_submit_button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const translations = {
  summary: 'Podsumowanie Nr.',
  question: 'Pytanie:',
  answers: 'Odpowiedzi:',
  answer: 'odpowiedź:',
};

export const Summary = styled(({
  data, availableLanguages,
}: {
  data: QuestionType,
  availableLanguages: TranslationTypeKeys[],
}) => {
  const [language, setLanguage] = useState('pl' as TranslationTypeKeys);
  const { picture } = data;
  return (
    <div>
      <h4>{`${translations.summary}${data.qid}`}</h4>
      {availableLanguages.length > 1 && (
      <LanguageSelector
        value={language}
        availableLanguages={availableLanguages}
        onChange={(value) => {
          setLanguage(Array.isArray(value) ? value[0] : value);
        }}
      />
      )}
      <Container>
        {translations.question}
        {data.content[language] && (<span>{data.content[language]}</span>)}
      </Container>
      <PictureCompare picture={picture} />
      <div>
        {translations.answers}
        {data.choices.map(({ value }, index) => (
          value[language] && (
            <Container key={uniqid()}>
              <span>{`${translations.answer} ${index + 1}`}</span>
              <span>{value[language]}</span>
            </Container>
          )
        ))}
      </div>
    </div>
  );
})`
  display: flex;
  flex-flow: column;
`;
