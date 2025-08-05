// Importa le API principali di Playwright Test
import { test, expect } from "@playwright/test";

// Definisce un gruppo di test (suite) per i test visuali del componente Tabs
test.describe("Tabs Component Visual Tests", () => {
  // Test singolo: verifica che il rendering del componente Tabs corrisponda allo snapshot visivo
  test("should match snapshot", async ({ page }) => {
    // Naviga alla pagina specifica dello Storybook che contiene il componente Tabs in modalità light
    await page.goto(
      "/iframe.html?globals=theme%3Alight&args=&id=components-tabs--default&viewMode=story"
    );

    // Attende che l'elemento radice del componente Tabs sia presente nel DOM
    await page.waitForSelector("div[data-testid='tabs-root']");

    // Primo controllo: genera uno screenshot automatico e lo confronta con lo snapshot salvato
    await expect(page).toHaveScreenshot();

    // Secondo controllo: salva (o confronta) uno screenshot con nome specifico e tolleranza di differenze
    await expect(page).toHaveScreenshot("tabs-default.png", {
      maxDiffPixelRatio: 0.01, // Consente una differenza massima dello 0.01% nei pixel
    });
  });
});
