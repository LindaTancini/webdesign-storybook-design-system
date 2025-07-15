import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Atoms/Spacing",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const SpaceCalc = ({ value }: { value: string }) => {
  const spacing = React.useMemo(() => {
    const bodyStyle = window.getComputedStyle(document.body);
    return bodyStyle.getPropertyValue(value);
  }, [value]);
  return <span>{spacing}</span>;
};

export const Default: Story = {
  render: () => (
    <>
      <dl>
        {["0", "xs", "sm", "md", "lg", "xl"].map((key) => (
          <React.Fragment key={key}>
            <dt>{key}</dt>
            <dd>
              <SpaceCalc value={`--spacing-${key}`} />
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </>
  ),
};
