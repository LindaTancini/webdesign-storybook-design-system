import type { Meta, StoryObj } from "@storybook/react-vite";

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
// Definizione della storia
export const Colors: Story = {};
