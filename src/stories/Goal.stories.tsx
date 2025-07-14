import { Meta, StoryObj } from "@storybook/react-vite";

import Badge from "./assets/badges.png";
import Tabs from "./assets/01.gif";

const meta: Meta = {
  title: "Goal",
};

export default meta;

const Template = () => (
  <>
    <h1>Goal</h1>

    <h2>Badges</h2>
    <img src={Badge} style={{ width: "25rem" }} alt="Badge" />

    <h2>Tabs</h2>
    <img src={Tabs} alt="Tabs" />
  </>
);

export const Default: StoryObj = {
  render: () => <Template />,
};
