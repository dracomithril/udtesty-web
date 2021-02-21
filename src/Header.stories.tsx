import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Header, HeaderProps } from "./Header";
import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from "@storybook/addon-viewport";
export default {
  title: "User/Header",
  component: Header,
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

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Basic = Template.bind({});

export const Mobile = Template.bind({});

Mobile.args = {
  isMobile: true,
};

Mobile.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};

export const MobileMenuOpened = Template.bind({});
MobileMenuOpened.args = {
  isMobile: true,
  isOpened: true,
};

MobileMenuOpened.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};
