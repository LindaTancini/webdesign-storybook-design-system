import React from "react";
// Importa il custom hook per accedere al contesto dei Tabs
import { useTabsContext } from "./Tabs.Context";

// Tipi delle props accettate dal componente Button
type ButtonProps = {
  children: React.ReactNode; // Contenuto da mostrare nel pulsante (es. etichetta del tab)
  tabId: string; // ID del tab associato a questo pulsante
};

// Componente Button che rappresenta un tab cliccabile
export const Button: React.FC<ButtonProps> = ({ children, tabId }) => {
  // Recupera il tab attivo e la funzione per aggiornarlo dal context
  const { activeTab, setActiveTab } = useTabsContext();

  // Stato interno per gestire la messa a fuoco (tabIndex dinamico)
  const [focusable, setFocusable] = React.useState(activeTab === tabId);

  return (
    <button
      role="tab" // Ruolo ARIA per indicare che questo pulsante è parte di un tab
      type="button" // Tipo di input: button, per evitare submit accidentali
      key={tabId} // Chiave univoca per React
      onClick={() => setActiveTab(tabId)} // Cambia il tab attivo al click
      aria-controls={tabId} // Collega questo pulsante al pannello corrispondente
      aria-selected={activeTab === tabId} // Indica se è il tab attualmente selezionato
      id={`button-${tabId}`} // ID unico per collegamento con aria-labelledby
      tabIndex={focusable ? 0 : -1} // Solo il tab "focusable" è navigabile da tastiera
      onFocus={() => setFocusable(true)} // Rende il tab navigabile se viene messo a fuoco
      onBlur={() => setFocusable(activeTab === tabId)} // Lo mantiene focusable solo se è attivo
    >
      {children} {/* Contenuto del pulsante, tipicamente il nome del tab */}
    </button>
  );
};
