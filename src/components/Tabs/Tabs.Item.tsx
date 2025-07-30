// Definisce l'interfaccia delle props accettate dal componente Item
export interface ItemProps {
  label: React.ReactNode; // Etichetta del tab (visualizzata nella lista dei tab)
  children: React.ReactNode; // Contenuto da mostrare quando il tab è attivo
}

// Componente Item che funge da wrapper per il contenuto del tab
export const Item: React.FC<ItemProps> = ({ children }) => {
  return <div>{children}</div>; // Rende semplicemente i figli (contenuto del tab)
};
