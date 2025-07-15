import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Definizione dei metadati per Storybook
const meta: Meta = {
  title: "Atoms/Spacing", // Titolo della storia nella sidebar di Storybook
  parameters: {
    layout: "centered", // Centra il contenuto nello spazio della storia
  },
  tags: ["autodocs"], // Tag per abilitare la generazione automatica della documentazione
};

export default meta;

// Tipo per la storia basato sul meta definito sopra
type Story = StoryObj<typeof meta>;

// Componente che legge e mostra il valore della variabile CSS passata come prop
const SpaceCalc = ({ value }: { value: string }) => {
  const spacing = React.useMemo(() => {
    // Ottiene tutti gli stili calcolati del body (dove sono definite le variabili CSS)
    const bodyStyle = window.getComputedStyle(document.body);
    // Restituisce il valore della variabile CSS specificata (es: --spacing-sm)
    return bodyStyle.getPropertyValue(value);
  }, [value]); // Ricalcola solo se cambia il nome della variabile

  return <span>{spacing}</span>; // Visualizza il valore testuale (es: "16px")
};

// Componente che inietta stili CSS direttamente nella pagina Storybook
const Style: React.FC = () => {
  return (
    <style>{`
     dl {
      font-size: 1rem;
      border: 1px solid #ccc;
      display: grid;
      max-width: calc(550rem / 16); /* circa 34.375rem */
      grid-template-columns: min-content max-content min-content;
      border-bottom: none;
      border-radius: 0.5rem;
     }
      dt {
        font-weight: 600;
        padding: var(--spacing-sm) var(--spacing-md); /* padding verticale e orizzontale */
        border-bottom: 1px solid #ccc;
      }

      dd {
        padding: var(--spacing-sm) var(--spacing-md);
        border-bottom: 1px solid #ccc;
        font-family: monospace; /* font a larghezza fissa per il valore */
        display: grid;
        gap: 1ch; /* spazio tra colonne */
        grid-template-columns: subgrid;
        grid-column: 2/4; /* occupa le colonne 2 e 3 della grid padre */
        align-items: center; 
      }

      .info {
        background: green; 
        height: 1rem;
        width: var(--story-spacing);  /* larghezza dinamica dalla variabile CSS */
        display: block; 
      }
    `}</style>
  );
};

// Definizione della storia Storybook Default
export const Default: Story = {
  render: () => (
    <>
      {/* Iniezione degli stili definiti sopra */}
      <Style />
      {/* Lista descrittiva per ogni dimensione di spacing */}
      <dl>
        {["0", "xs", "sm", "md", "lg", "xl"].map((key) => (
          <React.Fragment key={key}>
            {/* Etichetta della dimensione (es: "sm") */}
            <dt>{key}</dt>
            {/* Valore e blocco visivo, con variabile CSS dinamica per dimensione */}
            <dd style={{ "--story-spacing": `var(--spacing-${key})` }}>
              <span>
                {/* Mostra il valore numerico reale della variabile CSS */}
                <SpaceCalc value={`--spacing-${key}`} />
              </span>
              {/* Blocco verde la cui dimensione è legata alla variabile CSS */}
              <span className="info" />
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </>
  ),
};
