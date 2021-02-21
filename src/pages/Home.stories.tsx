import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import AppLayout from "../AppLayout";
import Home from "./Home";
import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

export default {
  title: "User/Home",
  component: Home,
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

export const Basic: React.VFC<{}> = () => <Home />

export const WithLayout: React.VFC<{}> = () => <AppLayout>
  <Home />
</AppLayout> 

export const MobileLayout: Story<{}> = ()=> <AppLayout>
<Home />
</AppLayout> 

MobileLayout.parameters = {
  viewport: {
    defaultViewport: "iphonex",
  },
};
