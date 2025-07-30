// Importa il componente Button utilizzato per rendere ciascun tab
import { Button } from "./Tabs.Button";

// Definizione del tipo delle props per il componente List
type TablistProp = {
  tabsLabels: {
    label: React.ReactNode; // Etichetta da mostrare nel pulsante del tab
    tabId: string; // ID univoco del tab
  }[];
};

// Componente List che mostra l'elenco dei tab come pulsanti e gestisce la navigazione da tastiera
export const List: React.FC<TablistProp> = ({ tabsLabels }) => {
  // Funzione per gestire la navigazione da tastiera tra i tab
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Ottiene tutti i pulsanti con role='tab' all'interno del contenitore attuale
    const buttons = Array.from(
      event.currentTarget.querySelectorAll("button[role='tab']")
    );

    // Trova l'indice del pulsante attualmente selezionato
    const currentIndex = buttons.findIndex((button) => button === event.target);
    let newIndex = currentIndex;

    // Switch per navigazione da tastiera
    switch (event.key) {
      case "Home": // Vai al primo tab
        newIndex = 0;
        break;
      case "ArrowRight": // Vai al tab successivo
      case "ArrowUp": // (Supporto anche per freccia su)
        newIndex = (currentIndex + 1) % buttons.length;
        break;
      case "ArrowLeft": // Vai al tab precedente
      case "ArrowDown": // (Supporto anche per freccia giù)
        newIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        break;
      case "End": // Vai all'ultimo tab
        newIndex = buttons.length - 1;
        break;
      default:
        return; // Esci se il tasto non è gestito
    }

    // Imposta il focus sul nuovo tab selezionato
    const next = buttons[newIndex] as HTMLButtonElement;
    next?.focus();
    event.preventDefault(); // Previene il comportamento di default del browser
  };

  return (
    // Contenitore dei pulsanti dei tab con listener per la navigazione da tastiera
    <div className="tablist" onKeyDownCapture={handleKeyDown}>
      {tabsLabels.map(({ label, tabId }) => (
        // Rende ogni tab come pulsante, passando l'id come prop
        <Button key={tabId} tabId={tabId}>
          {label} {/* Mostra il contenuto dell'etichetta */}
        </Button>
      ))}
    </div>
  );
};
