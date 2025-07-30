// Importa il tipo ReactElement per tipizzare nodi React specifici
import type { ReactElement } from "react";
// Importa React per usare JSX e hook
import React from "react";
// Importa il componente Item e il suo tipo di props
import { Item, type ItemProps } from "./Tabs.Item";
// Importa il componente List che probabilmente renderizza le etichette/tab
import { List } from "./Tabs.List";
// Importa il contesto condiviso tra i componenti dei tab
import { TabsContext } from "./Tabs.Context";
// Importa il componente Tab che probabilmente mostra il contenuto associato a ogni etichetta
import { Tab } from "./Tabs.Tab";
// Importa react-shadow per usare Shadow DOM
import root from "react-shadow";

// Importa lo stile CSS come stringa raw (grazie a ?raw)
import css from "./Tabs.css?raw";
// Importa uno stile globale condiviso
import { GlobalStyles } from "../GlobalStyles";

// Funzione type-guard che verifica se un figlio è un elemento valido di tipo Item
const isTabValidChildren = (
  child: React.ReactNode
): child is ReactElement<typeof Item> => {
  return React.isValidElement(child) && child.type === Item;
};

// Tipi delle props accettate dal componente Tabs
type TabsProps = {
  children: React.ReactNode; // I figli da rendere nei tab
} & React.HTMLAttributes<HTMLDivElement>; // Permette anche attributi HTML standard come className, style, ecc.

// Componente Tabs con associato il componente Item come proprietà statica
export const Tabs: React.FC<TabsProps> & { Item: typeof Item } = ({
  children,
}) => {
  const id = React.useId(); // Genera un ID unico per ogni istanza di Tabs
  const [activeTab, setActiveTab] = React.useState(id + 0); // Stato del tab attivo (inizialmente il primo)

  // Filtra e mappa solo i figli validi di tipo Item
  const validChildren = React.Children.toArray(children)
    .filter(isTabValidChildren)
    .map((child, i) => ({ ...child, id: id + i })); // Aggiunge un ID unico a ogni elemento valido

  // Estrae le etichette (label) e gli id da passare al componente List
  const tabsLabels = validChildren.map((child) => ({
    label: (child.props as unknown as ItemProps).label, // Forza la tipizzazione per accedere a `label`
    tabId: child.id, // ID unico del tab
  }));

  // Avvisa se alcuni figli non sono validi (non sono componenti <Tabs.Item>)
  if (validChildren.length !== React.Children.count(children)) {
    console.warn("Invalid children for Tabs");
  }

  // Renderizza il componente con Shadow DOM
  return (
    <root.div role="tablist">
      {" "}
      {/* Aria role per accessibilità */}
      <GlobalStyles /> {/* Applica gli stili globali */}
      <style>{css}</style> {/* Applica gli stili specifici dei Tabs */}
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        {/* Passa stato e funzione di aggiornamento via context */}
        <List tabsLabels={tabsLabels} /> {/* Rende la lista delle etichette */}
        {validChildren.map(({ id, ...child }) => {
          return (
            <Tab id={id} key={id}>
              {child}
            </Tab>
          );
        })}
        {React.Children.map(children, (child) => {
          // Rende eventuali figli *non validi* così come sono
          if (!isTabValidChildren(child)) {
            return child;
          }
          return null; // Gli Item validi sono già stati resi sopra
        })}
      </TabsContext.Provider>
    </root.div>
  );
};

// Associa il componente Item come proprietà statica di Tabs per uso esterno (es. <Tabs.Item />)
Tabs.Item = Item;
