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
// Definizione del componente ClickToCopy come Functional Component (React.FC)
// Accetta una prop `value` (la stringa da copiare) e tutte le altre proprietà che un normale <button> può ricevere
const ClickToCopy: React.FC<
  { value: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ value, ...attrs }) => {
  return (
    <button
      className="click-to-copy" // Classe CSS per eventuali stili personalizzati
      {...attrs} // Spread delle altre props (es. onClick personalizzati, className, style, ecc.)
      style={{
        border: "none", // Rimuove il bordo predefinito
        cursor: "pointer", // Mostra il cursore "mano" al passaggio del mouse
        ...attrs.style, // Consente di sovrascrivere o aggiungere altri stili dinamici
      }}
      onClick={() => navigator.clipboard.writeText(value)} // Copia il valore negli appunti al click
      aria-label={`Copy ${value}`} // Accessibilità: descrive l’azione del bottone per screen reader
    />
  );
};

// Definizione della storia
export const Default: Story = {
  render: () => {
    // Array di 16 variabili per i grigi, rossi e verdi (da --color-gray-0 a --color-gray-15)
    const grays = Array.from({ length: 16 }, (_, i) => `--color-gray-${i}`);
    const reds = Array.from({ length: 16 }, (_, i) => `--color-red-${i}`);
    const greens = Array.from({ length: 16 }, (_, i) => `--color-green-${i}`);
    // Funzione che genera i quadrati di colore cliccabili
    const renderSwatches = (variables: string[]) => (
      <div className="container">
        {variables.map((variableName, index) => (
          <ClickToCopy
            key={index}
            value={variableName}
            className="info"
            style={{ backgroundColor: `var(${variableName})` }}
          >
            {variableName}
          </ClickToCopy>
        ))}
      </div>
    );

    return (
      <>
        <div>
          <style>{`
          .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
          }

          .info {
            padding: var(--spacing-md);
            background-color: var(--color-neutral-bcg);
            color: var(--color-neutral-text);
            border: 1px solid var(--color-neutral-accent);
            border-radius: var(--border-radius-sm, 0.25rem);
            text-align: center;
            font-family: monospace;
            font-size: 0.75rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
          {/* Titoli per organizzare la pagina */}
          <h1>Colors</h1>
          <h2>Primitives</h2>
          {/* Sezione grigi */}
          <h3>Gray</h3>
          {renderSwatches(grays)}
          {/* Sezione rossi */}
          <h3>Red</h3>
          {renderSwatches(reds)}
          {/* Sezione verdi */}
          <h3>Green</h3>
          {renderSwatches(greens)}
        </div>
        {/*Colori Semantici*/}
        <h2>Semantic</h2>
        {/* Box semantico: neutral */}
        <h3>Neutral</h3>
        <div className="info">
          Per questo box abbiamo usato:
          <ClickToCopy value="var(--color-neutral-bcg)">
            --color-neutral-bcg
          </ClickToCopy>
          ,
          <ClickToCopy value="var(--color-neutral-text)">
            --color-neutral-text
          </ClickToCopy>
          e
          <ClickToCopy value="var(--color-neutral-accent)">
            --color-neutral-accent
          </ClickToCopy>
        </div>

        {/* Box semantico: positivo */}
        <h3>Positive</h3>
        <div
          className="info"
          style={{
            backgroundColor: "var(--color-positive-bcg)",
            color: "var(--color-positive-text)",
            borderColor: "var(--color-positive-accent)",
          }}
        >
          Per questo box abbiamo usato:
          <ClickToCopy value="var(--color-positive-bcg)">
            --color-positive-bcg
          </ClickToCopy>
          ,
          <ClickToCopy value="var(--color-positive-text)">
            --color-positive-text
          </ClickToCopy>
          e
          <ClickToCopy value="var(--color-positive-accent)">
            --color-positive-accent
          </ClickToCopy>
        </div>

        {/* Box semantico: negativo */}
        <h3>Negative</h3>
        <div
          className="info"
          style={{
            backgroundColor: "var(--color-negative-bcg)",
            color: "var(--color-negative-text)",
            borderColor: "var(--color-negative-accent)",
          }}
        >
          Per questo box abbiamo usato:
          <ClickToCopy value="var(--color-negative-bcg)">
            --color-negative-bcg
          </ClickToCopy>
          ,
          <ClickToCopy value="var(--color-negative-text)">
            --color-negative-text
          </ClickToCopy>
          e
          <ClickToCopy value="var(--color-negative-accent)">
            --color-negative-accent
          </ClickToCopy>
        </div>
      </>
    );
  },
};
