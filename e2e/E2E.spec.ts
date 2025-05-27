import { test, expect } from '@playwright/test';

test.describe('Escape The Web - Tests E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should validate answers and progress through puzzles', async ({ page }) => {
    // Test du Code Secret
    await test.step('Code Secret - Validation de réponse', async () => {
      // Attendre que le composant soit chargé
      const heading = page.getByRole('heading', { name: /coffre-fort numérique/i });
      await heading.waitFor({ state: 'visible', timeout: 10000 });

      // 1. Vérifier qu'on peut entrer une réponse
      for (const digit of '1234') {
        const button = page.getByRole('button', { name: digit }).first();
        await button.waitFor({ state: 'visible' });
        await button.click();
        await page.waitForTimeout(100); // Petit délai entre chaque clic
      }

      // 2. Vérifier le message d'erreur pour une réponse incorrecte
      const validateButton = page.getByRole('button', { name: /valider/i }).first();
      await validateButton.waitFor({ state: 'visible' });
      await validateButton.click();

      // Attendre que le message d'erreur apparaisse
      await page.waitForTimeout(1000);
      const errorMessage = page.locator('.error-message').first();
      await expect(errorMessage).toBeVisible({ timeout: 10000 });

      // 3. Vérifier la progression avec la bonne réponse
      for (const digit of '1337') {
        const button = page.getByRole('button', { name: digit }).first();
        await button.waitFor({ state: 'visible' });
        await button.click();
        await page.waitForTimeout(100); // Petit délai entre chaque clic
      }
      await validateButton.click();

      // Attendre que le message de succès apparaisse
      await page.waitForTimeout(1000);
      const successMessage = page.locator('.success-message').first();
      await expect(successMessage).toBeVisible({ timeout: 10000 });

      // Attendre la transition vers l'énigme suivante
      await page.waitForTimeout(3000);
    });

    // Test du Mot de Passe
    await test.step('Mot de Passe - Validation de réponse', async () => {
      // Attendre que le composant soit chargé
      const heading = page.getByRole('heading', { name: /coffre-fort secret/i });
      await heading.waitFor({ state: 'visible', timeout: 15000 });

      // 1. Vérifier qu'on peut entrer une réponse
      const input = page.getByPlaceholder(/entrez le mot de passe/i).first();
      await input.waitFor({ state: 'visible' });
      await input.fill('wrong');

      // 2. Vérifier le message d'erreur pour une réponse incorrecte
      const validateButton = page.getByRole('button', { name: /valider/i }).first();
      await validateButton.waitFor({ state: 'visible' });
      await validateButton.click();

      // Attendre que le message d'erreur apparaisse
      await page.waitForTimeout(1000);
      const errorMessage = page.locator('.error-message').first();
      await expect(errorMessage).toBeVisible({ timeout: 10000 });

      // 3. Vérifier la progression avec la bonne réponse
      await input.fill('escape');
      await validateButton.click();

      // Attendre que le message de succès apparaisse
      await page.waitForTimeout(1000);
      const successMessage = page.locator('.success-message').first();
      await expect(successMessage).toBeVisible({ timeout: 10000 });

      // Attendre la transition vers l'énigme suivante
      await page.waitForTimeout(3000);
    });

    // Test du Labyrinthe
    await test.step('Labyrinthe - Validation de réponse', async () => {
      // Attendre que le composant soit chargé
      const heading = page.getByRole('heading', { name: /l'ordre des couleurs/i });
      await heading.waitFor({ state: 'visible', timeout: 15000 });

      // 1. Vérifier qu'on peut entrer une séquence
      const wrongColors = ['vert', 'bleu', 'rouge', 'orange', 'jaune', 'indigo', 'violet'];
      for (const color of wrongColors) {
        const button = page.getByRole('button', { name: color }).first();
        await button.waitFor({ state: 'visible' });
        await button.click();
        await page.waitForTimeout(100); // Petit délai entre chaque clic
      }

      // 2. Vérifier le message d'erreur pour une séquence incorrecte
      const validateButton = page.getByRole('button', { name: /valider/i }).first();
      await validateButton.waitFor({ state: 'visible' });
      await validateButton.click();

      // Attendre que le message d'erreur apparaisse
      await page.waitForTimeout(1000);
      const errorMessage = page.locator('.error-message').first();
      await expect(errorMessage).toBeVisible({ timeout: 10000 });

      // 3. Vérifier la progression avec la bonne séquence
      const correctColors = ['rouge', 'orange', 'jaune', 'vert', 'bleu', 'indigo', 'violet'];
      for (const color of correctColors) {
        const button = page.getByRole('button', { name: color }).first();
        await button.waitFor({ state: 'visible' });
        await button.click();
        await page.waitForTimeout(100); // Petit délai entre chaque clic
      }
      await validateButton.click();

      // Attendre que le message de succès apparaisse
      await page.waitForTimeout(1000);
      const successMessage = page.locator('.success-message').first();
      await expect(successMessage).toBeVisible({ timeout: 10000 });

      // Attendre la transition vers l'écran final
      await page.waitForTimeout(3000);
    });

    // Vérification finale
    await test.step('Fin du jeu', async () => {
      const congratsTitle = page.getByRole('heading', { name: /félicitations/i });
      await congratsTitle.waitFor({ state: 'visible', timeout: 15000 });

      const congratsMessage = page.getByText(/vous avez réussi/i);
      await congratsMessage.waitFor({ state: 'visible', timeout: 15000 });
    });
  });
}); 