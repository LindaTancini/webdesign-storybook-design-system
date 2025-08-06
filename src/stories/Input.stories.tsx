import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/Input/Input"; // Importa il componente Input

// Definizione dei metadati per Storybook
const meta: Meta = {
  title: "Components/Input", // Titolo della storia nella sidebar di Storybook
  component: Input, // Componente da visualizzare
  parameters: {
    layout: "centered", // Centra il contenuto nello spazio della storia
  },
  tags: ["autodocs"], // Tag per abilitare la generazione automatica della documentazione
};

export default meta;

// Tipo per la storia basato sul meta definito sopra
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input kind="text" label="Label" placeholder="placeholder" />,
};
