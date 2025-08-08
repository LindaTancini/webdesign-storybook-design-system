import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/Input/Input"; // Importa il componente Input

// Definizione dei metadati per Storybook
const meta: Meta = {
  title: "Components/Input", // Titolo della storia nella sidebar di Storybook
  component: Input, // Componente da visualizzare
  parameters: {
    layout: "centered", // Centra il contenuto nello spazio della storia
  },
  args: {
    label: "Label", // Etichetta predefinita per il componente
  },
  tags: ["autodocs"], // Tag per abilitare la generazione automatica della documentazione
};

export default meta;

// Tipo per la storia basato sul meta definito sopra
type Story = StoryObj<typeof Input>;

// Storia che mostra il componente Input in diverse varianti
// Questa storia include un campo di input di tipo testo, un select e un radio
export const Default: Story = {
  render: ({ label }) => (
    <div>
      <Input
        placeholder="Text here"
        label={label}
        iconPosition="left"
        kind="email"
        icon="Book"
        errorText="Invalid email address"
      />
      <Input
        label={label}
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
        kind="select"
      />
      <Input
        label={label}
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
        kind="radio"
        name="example-radio"
      />
    </div>
  ),
};

// Storia per il componente Input con tipo testo
// Questa storia mostra come utilizzare il componente Input come un campo di testo
export const InputText: Story = {
  render: ({ label }) => <Input label={label} kind="text" />,
};

// Storia per il componente Input con tipo select
// Questa storia mostra come utilizzare il componente Input come un select
export const Select: Story = {
  render: ({ label }) => (
    <Input
      label={label}
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]}
      kind="select"
    />
  ),
};

// Storia per il componente Input con tipo radio
// Questa storia mostra come utilizzare il componente Input come un radio
export const Radio: Story = {
  render: ({ label }) => (
    <Input
      label={label}
      options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]}
      kind="radio"
      name="example-radio"
    />
  ),
};
