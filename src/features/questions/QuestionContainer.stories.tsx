import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from "@storybook/addon-viewport";
import AppLayout from "../../AppLayout";
import { generateQuestions } from "../../providers/database/questions";
import { createTest } from "../../providers/database/tests";
import QuestionContainer from "./QuestionContainer";

export default {
  title: "User/QuestionContainer",
  component: QuestionContainer,
  parameters: {
    // the viewports object from the Essentials addon
    viewport: {
      // the viewports you want to use
      viewports: INITIAL_VIEWPORTS,
      // your own default viewport
      defaultViewport: DEFAULT_VIEWPORT,
    },
  },
} as Meta;

const test1 = createTest();
const questions = generateQuestions(3);
export const Simple: React.VFC<{}> = () => (
  <QuestionContainer test={test1} questions={questions} validTo={""} otherLanguage={"en"} />
);

export const WithLayout: Story<{}> = () => (
  <AppLayout>
    <QuestionContainer test={test1} questions={questions} validTo={""} otherLanguage={"en"} />
  </AppLayout>
);

export const MobileWithLayout: Story<{}> = () => (
  <AppLayout>
    <QuestionContainer test={test1} questions={questions} validTo={""} otherLanguage={"en"} />
  </AppLayout>
);

MobileWithLayout.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};
