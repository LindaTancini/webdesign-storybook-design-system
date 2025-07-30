// Importa il contenuto CSS dei file reset e typography come stringhe (grazie a ?raw)
import reset from "../styles/reset.css?raw";
import typography from "../styles/typography.css?raw";

// Componente React che inietta gli stili globali nell'app
export const GlobalStyles = () => (
  <style>{`${reset} ${typography}`}</style> // Inserisce entrambi i CSS all'interno di un <style> HTML
);
