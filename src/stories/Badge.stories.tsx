import type { Meta, StoryObj } from "@storybook/react-vite"; // Importa tipi per definire le storie in Storybook

import { Badge } from "../components/Badge/Badge"; // Importa il componente Badge

// Metadati per Storybook relativi al componente Badge
const meta: Meta<typeof Badge> = {
  title: "Components/Badge", // Titolo della storia nella sidebar di Storybook
  component: Badge, // Componente associato alla storia
  argTypes: {
    children: { control: "text" }, // Permette di modificare il contenuto testuale da Storybook Controls
  },
  args: {
    children: "Badge", // Valore di default per la prop children
  },
  parameters: {
    layout: "centered", // Centra il contenuto della storia nella finestra di anteprima
  },
};

export default meta; // Esporta i metadati come default per Storybook

type Story = StoryObj<typeof meta>; // Tipo per le storie basato sul meta definito sopra

// Storia Default che mostra un Badge con props personalizzabili
export const Default: Story = {
  render: ({ children, variant }) => (
    <Badge variant={variant}>{children}</Badge> // Renderizza Badge con variante e contenuto passati da Storybook
  ),
};

// Storia che mostra tutte le varianti del Badge affiancate
export const AllBadges: Story = {
  render: ({ children }) => (
    <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
      <Badge variant="neutral">{children}</Badge> {/* Variante neutrale */}
      <Badge variant="positive">{children}</Badge> {/* Variante positiva */}
      <Badge variant="negative">{children}</Badge> {/* Variante negativa */}
    </div>
  ),
};
