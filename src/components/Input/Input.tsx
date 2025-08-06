// Importa React per usare JSX e gli hook
import React from "react";

// Definisce i props per un input generico (text, email, password)
// Estende i normali attributi HTML per input
type InputProps = {
  kind: "text" | "email" | "password";
} & React.InputHTMLAttributes<HTMLInputElement>;

// Definisce i props per un elemento select
// Estende i normali attributi HTML per select
type SelectProps = {
  kind: "select";
  options: { label: string; value: string }[]; // Opzioni da mostrare nel menu a tendina
  placeholder?: string; // Placeholder opzionale mostrato come prima option disabilitata
} & React.SelectHTMLAttributes<HTMLSelectElement>;

// Definisce i props per un gruppo di radio button
// Estende i normali attributi HTML per input, specificando che il tipo sarà "radio"
type RadioProps = {
  kind: "radio";
  options: { label: string; value: string }[]; // Opzioni radio da mostrare
  placeholder?: never; // Non si usa il placeholder per i radio
  name: string; // Necessario per raggruppare i radio button
} & React.InputHTMLAttributes<HTMLInputElement>;

// Unione dei tre tipi di input possibili, tutti richiedono una label
type GeneralInputProps = (InputProps | SelectProps | RadioProps) & {
  label: React.ReactNode; // Etichetta associata all’input
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
export const Input: React.FC<GeneralInputProps> = ({ label, id, ...props }) => {
  // Genera un id univoco se non viene passato
  const defaultId = React.useId() || id;

  return (
    <>
      {/* Associa la label all’input usando htmlFor */}
      <label htmlFor={defaultId}>{label}</label>
      {/* Passa i props al componente interno e imposta l’id */}
      <InternalInput {...props} id={defaultId} />
    </>
  );
};
