import type { Meta, StoryObj } from "@storybook/react-vite";

// Definizione dei metadati per Storybook
const meta: Meta = {
  title: "Atoms/Typography", // Titolo della storia nella sidebar di Storybook
  parameters: {
    layout: "centered", // Centra il contenuto nello spazio della storia
  },
  tags: ["autodocs"], // Tag per abilitare la generazione automatica della documentazione
};

export default meta;
// Tipo per la storia basato sul meta definito sopra
type Story = StoryObj<typeof meta>;
// Componente che mostra le dimensioni dei font definiti nel tema
export const Default: Story = {
  // args sono le proprietà che puoi passare al componente
  args: {
    children: "The quick brown fox",
  },
  // children: "The quick brown fox" è il testo che verrà visualizzato nei vari tag di intestazione
  render: ({ children }) => (
    <>
      <div className="font-size-hero">{children}</div>
      <h1>{children}</h1>
      <h2>{children}</h2>
      <h3>{children}</h3>
      <h4>{children}</h4>
      <h5>{children}</h5>
      <h6>{children}</h6>
      <div className="font-size-body">{children}</div>
      <div className="font-size-sm">{children}</div>
      <div className="font-size-xs">{children}</div>
    </>
  ),
};
