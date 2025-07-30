import React from "react";

// Definisce il tipo per il contesto dei Tabs
interface TabsContextType {
  activeTab: string; // ID del tab attualmente attivo
  setActiveTab: (tabId: string) => void; // Funzione per aggiornare il tab attivo
}

// Crea il contesto con valore iniziale undefined
export const TabsContext = React.createContext<TabsContextType | undefined>(
  undefined
);

// Custom hook per accedere in modo sicuro al contesto dei Tabs
export const useTabsContext = () => {
  const context = React.useContext(TabsContext); // Ottiene il valore attuale del contesto
  if (context === undefined) {
    // Se il contesto è undefined, significa che il componente non è stato usato all'interno di <TabsContext.Provider>
    throw new Error("useTabsContext must be used within a Tabs component");
  }
  return context; // Restituisce il valore del contesto (activeTab e setActiveTab)
};
