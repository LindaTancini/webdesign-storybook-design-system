import React from "react";
import root from "react-shadow"; // Importa il supporto per Shadow DOM via react-shadow
import css from "./Badge.css?raw"; // Importa il CSS come stringa raw da usare nello shadow DOM

// Definizione delle props accettate dal componente Badge
type BadgeProps = {
  children: React.ReactNode; // Contenuto interno del badge
  variant?: "neutral" | "positive" | "negative"; // Variante visiva (per colori o stile)
} & React.HTMLAttributes<HTMLDivElement>; // Estende tutte le proprietà native di un div

// Definizione del componente Badge
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral", // Imposta "neutral" come variante di default
  ...attrs // Raccoglie tutte le altre props HTML
}) => {
  return (
    <root.div>
      {" "}
      {/* Inizia un contenitore Shadow DOM */}
      <style>{css}</style>{" "}
      {/* Inserisce lo stile CSS direttamente nello shadow DOM */}
      <div className={`badge ${variant}`} {...attrs}>
        {" "}
        {/* Applica classe dinamica in base alla variante e altre props */}
        {children} {/* Mostra il contenuto passato al componente */}
      </div>
    </root.div>
  );
};
