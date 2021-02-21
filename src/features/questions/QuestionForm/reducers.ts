/* eslint-disable import/prefer-default-export */
import { Reducer } from 'react';
import {
  ChoiceType, PictureType, QuestionType, TranslationType,
} from '@dracomithril/types';

export type ValidationType = {
  name: string
  isValid: boolean
}

type UpdatePictureActionType = { type: 'update_picture', value: PictureType, validation?: ValidationType };
type RotateChoicesActionType = { type: 'rotate_choices_enable', value: boolean, validation?: ValidationType };
type UpdateQuestionActionType = { type: 'update_question', value: TranslationType, validation?: ValidationType };
type UpdateChoiceActionType = { type: 'update_choice', value: ChoiceType, id: number, validation?: ValidationType };
export type ActionType =
  UpdatePictureActionType |
  RotateChoicesActionType |
  UpdateQuestionActionType |
  UpdateChoiceActionType
const pictureReducer: Reducer<PictureType, ActionType> = (picture = {
  alt: '',
}, action) => {
  switch (action.type) {
    case 'update_picture':
      return action.value;
    default:
      return picture;
  }
};
const choiceReducer: Reducer<ChoiceType[], ActionType> = (choices, action) => {
  switch (action.type) {
    case 'update_choice':
      return choices.map((choice, id) => {
        if (action.id === id) {
          return action.value;
        }
        return choice;
      });
    default:
      return choices;
  }
};
const questionReducer: Reducer<TranslationType, ActionType> = (content, action) => {
  switch (action.type) {
    case 'update_question':
      return action.value;
    default:
      return content;
  }
};
const rotateReducer: Reducer<boolean, ActionType> = (rotate, action) => {
  if (action.type === 'rotate_choices_enable') {
    return action.value;
  }
  return rotate;
};
export const reducer: Reducer<QuestionType, ActionType> = (question, action): QuestionType => ({
  ...question,
  picture: pictureReducer(question.picture, action),
  rotate: rotateReducer(question.rotate, action),
  choices: choiceReducer(question.choices, action),
  content: questionReducer(question.content, action),
});
