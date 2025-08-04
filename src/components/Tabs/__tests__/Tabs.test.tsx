// Importa le funzioni necessarie per testare componenti React
import { fireEvent, render, within } from "@testing-library/react";
// Estende Jest con matchers personalizzati come toBeInTheDocument(), toBeVisible(), ecc.
import "@testing-library/jest-dom";

// Importa il componente Tabs da testare
import { Tabs } from "../Tabs";

// Funzione di utilità per ottenere lo Shadow Root del componente Tabs
const getShadowRoot = (): HTMLElement | null => {
  // Seleziona il contenitore radice dei Tabs tramite data-testid
  const shadowHost = document.querySelector('div[data-testid="tabs-root"]');
  // Restituisce lo shadowRoot (castato come HTMLElement), oppure null
  return shadowHost ? (shadowHost.shadowRoot as unknown as HTMLElement) : null;
};

// Inizia il blocco di test per il componente Tabs
describe("Tabs Component", () => {
  // Funzione helper per rendere i Tabs con 3 tab di esempio
  const renderTabs = () => (
    <Tabs>
      <Tabs.Item label="Tab 1">Content 1</Tabs.Item>
      <Tabs.Item label="Tab 2">Content 2</Tabs.Item>
      <Tabs.Item label="Tab 3">Content 3</Tabs.Item>
    </Tabs>
  );

  // Variabile per salvare lo Shadow DOM tra i test
  let shadowRoot: HTMLElement | null = null;

  // Prima di ogni test: renderizza i Tabs e salva lo shadowRoot
  beforeEach(() => {
    render(renderTabs());
    shadowRoot = getShadowRoot();
    // Verifica che lo shadowRoot sia stato trovato correttamente
    expect(shadowRoot).not.toBeNull();
  });

  // Dopo ogni test: resetta shadowRoot
  afterEach(() => {
    shadowRoot = null;
  });

  // Test 1: Verifica che tutte le etichette dei tab siano presenti
  it("renders all tab labels", () => {
    if (!shadowRoot) return;
    const { getByText } = within(shadowRoot);
    expect(getByText("Tab 1")).toBeInTheDocument();
    expect(getByText("Tab 2")).toBeInTheDocument();
    expect(getByText("Tab 3")).toBeInTheDocument();
  });

  // Test 2: Verifica che il primo tab sia visibile di default e gli altri nascosti
  it("displays the first tab content by default and hides the others", () => {
    if (!shadowRoot) return;
    const { getByText } = within(shadowRoot);
    const content1 = getByText("Content 1");
    const content2 = getByText("Content 2");
    const content3 = getByText("Content 3");

    expect(content1).toBeInTheDocument();
    expect(content1).toBeVisible();
    expect(content2).toBeInTheDocument();
    expect(content2).not.toBeVisible();
    expect(content3).toBeInTheDocument();
    expect(content3).not.toBeVisible();
  });

  // Test 3: Verifica che il contenuto cambi cliccando su un altro tab
  it("switches content when clicking on a different tab", async () => {
    if (!shadowRoot) return;
    const { getByText } = within(shadowRoot);
    // Ottiene i contenitori dei contenuti dei 3 tab
    const content1 = getByText("Content 1").parentElement;
    const content2 = getByText("Content 2").parentElement;
    const content3 = getByText("Content 3").parentElement;

    // Clicca su Tab 2 e verifica che solo il suo contenuto sia visibile
    const tab2 = getByText("Tab 2");
    fireEvent.click(tab2);
    expect(content1).toHaveAttribute("hidden");
    expect(content2).not.toHaveAttribute("hidden");
    expect(content3).toHaveAttribute("hidden");

    // Clicca su Tab 3 e verifica che cambi ancora
    const tab3 = getByText("Tab 3");
    fireEvent.click(tab3);
    expect(content1).toHaveAttribute("hidden");
    expect(content2).toHaveAttribute("hidden");
    expect(content3).not.toHaveAttribute("hidden");
  });

  // Test 4: Verifica che l'attributo aria-selected sia applicato correttamente
  it("applies aria-selected attribute to the selected tab", () => {
    if (!shadowRoot) return;
    const { getAllByRole } = within(shadowRoot);
    const tabs = getAllByRole("tab"); // Recupera tutti gli elementi con ruolo "tab"

    // Controlla che inizialmente solo il primo tab sia selezionato
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");

    // Clicca sul secondo tab e verifica che la selezione cambi
    fireEvent.click(tabs[1]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });
});
