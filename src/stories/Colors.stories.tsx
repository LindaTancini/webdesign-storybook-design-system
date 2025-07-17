import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonHTMLAttributes } from "react";

// Definizione dei metadati per Storybook
const meta: Meta = {
  title: "Atoms/Colors", // Titolo della storia nella sidebar di Storybook
  parameters: {
    layout: "centered", // Centra il contenuto nello spazio della storia
  },
  tags: ["autodocs"], // Tag per abilitare la generazione automatica della documentazione
};

export default meta;
// Tipo per la storia basato sul meta definito sopra
type Story = StoryObj<typeof meta>;
// Colori cliccabili
const ClickToCopy: React.FC<
  { value: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ value, ...attrs }) => {
  return (
    <button
      className="click-to-copy"
      {...attrs}
      style={{ border: "none", cursor: "pointer", ...attrs.style }}
      onClick={() => navigator.clipboard.writeText(value)}
      aria-label={`Copy ${value}`}
    />
  );
};
// Definizione della storia
export const Default: Story = {};
