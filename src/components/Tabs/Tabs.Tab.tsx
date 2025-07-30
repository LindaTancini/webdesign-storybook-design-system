// Importa il custom hook per accedere al contesto dei Tabs
import { useTabsContext } from "./Tabs.Context";

// Tipizzazione delle props accettate dal componente Tab
interface TabProps {
  id: string; // ID univoco del tab
  children: React.ReactNode; // Contenuto da mostrare nel pannello del tab
}

// Componente Tab che mostra il contenuto del tab attivo
export const Tab: React.FC<TabProps> = ({ id, children }) => {
  const { activeTab } = useTabsContext(); // Recupera l'ID del tab attualmente attivo dal context

  return (
    <div
      aria-labelledby={`button-${id}`} // Collega questo pannello al pulsante/tab corrispondente (per accessibilità)
      role="tabpanel" // Ruolo ARIA per indicare che è un pannello di un tab
      key={id} // Chiave univoca per React
      id={id} // ID usato per identificare questo tab
      hidden={activeTab !== id} // Nasconde il pannello se non è quello attivo
    >
      {children}
    </div>
  );
};
