import { QuestionType } from '@dracomithril/types';
import uniqid from 'uniqid';

export const Answers = ['A', 'B', 'C', 'D'] as const;

const randomAnswer = () => Math.floor(Math.random() * 4);

export const generateQuestions = (count: number) => Array
  .from({ length: count }, (_, index): QuestionType => {
    const qid = index + 1;
    const answer = randomAnswer();
    return ({
      id: uniqid(),
      qid,
      rotate: false,
      content: {
        en: `Eiusmod non officia aute sunt non cupidatat ipsum consectetur cupidatat exercitation est ipsum laboris.`,
        pl: `Officia excepteur reprehenderit laborum proident ipsum laborum culpa do.`,
        ua: `Aute duis dolor eiusmod ipsum.`,
      },
      choices: Array.from({ length: 4 }, (a, id) => {
        const letter = String.fromCharCode(65 + id);
        return ({
          correct: id === answer,
          value: {
            en: `Cupidatat aute esse dolore cillum cupidatat laborum irure magna. ${letter}`,
            pl: `Velit est laborum proident non amet aliqua. ${letter}`,
            ua: `Proident ut ad non mollit sint mollit ullamco. ${letter}`,
          },
        });
      }),
      picture: {
        href: 'https://via.placeholder.com/150',
        alt: '',
      },
    });
  });

const questions: QuestionType[] = generateQuestions(3);
export default questions;
