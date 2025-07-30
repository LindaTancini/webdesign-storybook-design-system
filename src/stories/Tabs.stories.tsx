// Importa i tipi Meta e StoryObj da Storybook per tipizzare le storie
import type { Meta, StoryObj } from "@storybook/react-vite";
// Importa il componente Tabs da una directory locale
import { Tabs } from "../components/Tabs/Tabs";
// Importo il componente Badge da una directory locale
import { Badge } from "../components/Badge/Badge";
// Importa il modulo react-shadow per usare Shadow DOM in React
import root from "react-shadow";

// Definizione delle meta-informazioni per Storybook riguardanti il componente Tabs
const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs", // Titolo con cui il componente apparirà nella sidebar di Storybook
  component: Tabs, // Componente React a cui è associata questa storia
};

// Esporta le meta-informazioni come default per Storybook
export default meta;

// Definizione di un tipo Story che rappresenta una storia per il componente Tabs
type Story = StoryObj<typeof Tabs>;

// Componente Skeleton: wrapper generico con stile personalizzato per contenere i contenuti dei tab
const Skeleton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <root.div>
      {" "}
      {/* Utilizza Shadow DOM per incapsulare gli stili */}
      <style>{` 
        div {
          text-align: center;
          background-color: var(--color-neutral-bcg); 
          border-radius: var(--border-radius-md, 0.5rem); 
          width: 30rem;                 
          max-width: 100%;              
          min-height: 4rem;             
          margin-bottom: 1rem;          
          align-content: center;        
        }
      `}</style>
      <div>{children}</div> {/* Primo blocco visibile con contenuto */}
      <div /> {/* Blocchi vuoti di decorazione o placeholder */}
      <div />
      <div />
    </root.div>
  );
};

// Definizione della storia "Default" per il componente Tabs
export const Default: Story = {
  render: () => (
    <Tabs>
      {" "}
      {/* Componente Tabs con tre voci/tab */}
      <Tabs.Item label="Label 1">
        <Skeleton>Tab content 1</Skeleton> {/* Contenuto del primo tab */}
      </Tabs.Item>
      <Tabs.Item label="Label 2">
        <Skeleton>Tab content 2</Skeleton> {/* Contenuto del secondo tab */}
      </Tabs.Item>
      <Tabs.Item
        label={
          <span>
            Label 3 <Badge>New</Badge> {/* Badge con testo "New" */}
          </span>
        }
      >
        <Skeleton>Tab content 3</Skeleton> {/* Contenuto del terzo tab */}
      </Tabs.Item>
      <Tabs.Item
        label={
          <span>
            Label 4 <Badge variant="positive">Positive</Badge>{" "}
            {/* Badge con variante positiva */}
          </span>
        }
      >
        <Skeleton>Tab content 4</Skeleton> {/* Contenuto del quarto tab */}
      </Tabs.Item>
      <Tabs.Item
        label={
          <span>
            Label 5 <Badge variant="negative">Negative</Badge>{" "}
            {/* Badge con variante negativa */}
          </span>
        }
      >
        <Skeleton>Tab content 5</Skeleton> {/* Contenuto del quinto tab */}
      </Tabs.Item>
    </Tabs>
  ),
};
