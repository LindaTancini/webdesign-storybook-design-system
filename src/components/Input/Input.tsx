// Importa React per usare JSX e gli hook
import React from "react";
// Importa css per gli stili del componente
import css from "../Input/Input.css?raw";
// React shadow per il supporto di CSS in JS
import root from "react-shadow";
// Importo le icone da react-feather per l'input
import * as Icon from "react-feather";
import { GlobalStyles } from "../GlobalStyles";

// Definisce i props per un input generico (text, email, password)
// Estende i normali attributi HTML per input
type InputProps = {
  kind: "text" | "email" | "password";
  icon?: keyof typeof Icon; // Icona opzionale da mostrare accanto all'input
  iconPosition?: "left" | "right"; // Posizione dell'icona, se presente
} & React.InputHTMLAttributes<HTMLInputElement>;

// Definisce i props per un elemento select
// Estende i normali attributi HTML per select
type SelectProps = {
  kind: "select";
  options: { label: string; value: string }[]; // Opzioni da mostrare nel menu a tendina
  placeholder?: string; // Placeholder opzionale mostrato come prima option disabilitata
  icon?: never; // Non si usa l'icona per i select
  iconPosition?: never; // Non si usa l'icona per i select
} & React.SelectHTMLAttributes<HTMLSelectElement>;

// Definisce i props per un gruppo di radio button
// Estende i normali attributi HTML per input, specificando che il tipo sarà "radio"
type RadioProps = {
  kind: "radio";
  options: { label: string; value: string }[]; // Opzioni radio da mostrare
  placeholder?: never; // Non si usa il placeholder per i radio
  name: string; // Necessario per raggruppare i radio button
  icon?: never; // Non si usa l'icona per i radio
  iconPosition?: never; // Non si usa l'icona per i radio
} & React.InputHTMLAttributes<HTMLInputElement>;

// Unione dei tre tipi di input possibili, tutti richiedono una label
type GeneralInputProps = (InputProps | SelectProps | RadioProps) & {
  label: React.ReactNode; // Etichetta associata all’input
  icon?: keyof typeof Icon; // Icona opzionale da mostrare accanto all'input
};

// Componente interno che gestisce il rendering dell’elemento HTML corretto
export const InternalInput: React.FC<InputProps | SelectProps | RadioProps> = (
  props
) => {
  switch (props.kind) {
    // Se il tipo è select, renderizza un <select> con le opzioni
    case "select":
      return (
        <select {...props}>
          {/* Se è presente un placeholder, lo mostra come prima option disabilitata */}
          {props.placeholder && (
            <option value="" disabled selected>
              {props.placeholder}
            </option>
          )}
          {/* Mappa ogni opzione in un elemento <option> */}
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    // Se il tipo è radio, renderizza un gruppo di <input type="radio"> con etichette
    case "radio":
      return (
        <>
          {props.options.map((option) => (
            <label key={option.value}>
              {/* Ogni radio button ha lo stesso name ma un valore diverso */}
              <input type="radio" {...props} value={option.value} />
              {option.label}
            </label>
          ))}
        </>
      );

    // Default: input text/email/password
    default:
      return <input type={props.kind} {...props} />;
  }
};

// Componente principale Input che mostra una label e il campo corrispondente
export const Input: React.FC<GeneralInputProps> = ({
  label,
  id,
  className,
  icon,
  iconPosition,
  ...props
}) => {
  // Usa useId per generare un ID se non è stato passato (NB: questo ignora il valore di `id` se definito)
  const defaultId = React.useId() || id;
  const IconComponent = icon ? Icon[icon] : null;

  return (
    <root.div>
      <GlobalStyles />
      <style>{css}</style>
      {/* Contenitore principale con classi dinamiche per stile e tipo di input */}
      <div className={`${className ?? ""} container ${props.kind}`}>
        {/* Se è un gruppo di radio button, mostra il label come semplice testo */}
        {props.kind === "radio" ? (
          <span className="label">{label}</span>
        ) : (
          // Altrimenti, crea un elemento <label> associato all'input
          <label htmlFor={defaultId}>{label}</label>
        )}
        <div className="input-container">
          {/* Mostra l’input vero e proprio */}
          <InternalInput {...props} id={defaultId} />
        </div>
        {/* Se è stata specificata un'icona, la mostra accanto all'input */}
        {IconComponent && (
          <div className={`icon ${iconPosition || ""}`}>
            <IconComponent />
          </div>
        )}
      </div>
    </root.div>
  );
};
