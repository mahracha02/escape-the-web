# Test info

- Name: Escape The Web - Tests E2E >> should validate answers and progress through puzzles
- Location: C:\Users\abdel\Desktop\Bachelor 3 Dev\test et qualité\EscapeTheWeb\escape-the-web\e2e\E2E.spec.ts:10:7

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '3' }).first()
    - locator resolved to <button tabindex="0" class="keypad-button">3</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

    at C:\Users\abdel\Desktop\Bachelor 3 Dev\test et qualité\EscapeTheWeb\escape-the-web\e2e\E2E.spec.ts:39:22
    at C:\Users\abdel\Desktop\Bachelor 3 Dev\test et qualité\EscapeTheWeb\escape-the-web\e2e\E2E.spec.ts:12:5
```

# Page snapshot

```yaml
- heading "Escape The Web" [level=1]
- heading "Progression" [level=2]
- text: 1 Le Coffre-Fort 2 Le Mot Caché 3 L'Ordre des Couleurs
- heading "Le Coffre-Fort Numérique" [level=2]
- button "Voir l'indice"
- text: 1 3
- button "1"
- button "2"
- button "3"
- button "4"
- button "5"
- button "6"
- button "7"
- button "8"
- button "9"
- button "C"
- button "0"
- button "←"
- button "Valider" [disabled]
- paragraph: Code incorrect. Essayez encore.
- paragraph: "Tentatives : 1/3"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Escape The Web - Tests E2E', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('http://localhost:5173');
   6 |     await page.waitForLoadState('networkidle');
   7 |     await page.waitForLoadState('domcontentloaded');
   8 |   });
   9 |
   10 |   test('should validate answers and progress through puzzles', async ({ page }) => {
   11 |     // Test du Code Secret
   12 |     await test.step('Code Secret - Validation de réponse', async () => {
   13 |       // Attendre que le composant soit chargé
   14 |       const heading = page.getByRole('heading', { name: /coffre-fort numérique/i });
   15 |       await heading.waitFor({ state: 'visible', timeout: 10000 });
   16 |
   17 |       // 1. Vérifier qu'on peut entrer une réponse
   18 |       for (const digit of '1234') {
   19 |         const button = page.getByRole('button', { name: digit }).first();
   20 |         await button.waitFor({ state: 'visible' });
   21 |         await button.click();
   22 |         await page.waitForTimeout(100); // Petit délai entre chaque clic
   23 |       }
   24 |
   25 |       // 2. Vérifier le message d'erreur pour une réponse incorrecte
   26 |       const validateButton = page.getByRole('button', { name: /valider/i }).first();
   27 |       await validateButton.waitFor({ state: 'visible' });
   28 |       await validateButton.click();
   29 |
   30 |       // Attendre que le message d'erreur apparaisse
   31 |       await page.waitForTimeout(1000);
   32 |       const errorMessage = page.locator('.error-message').first();
   33 |       await expect(errorMessage).toBeVisible({ timeout: 10000 });
   34 |
   35 |       // 3. Vérifier la progression avec la bonne réponse
   36 |       for (const digit of '1337') {
   37 |         const button = page.getByRole('button', { name: digit }).first();
   38 |         await button.waitFor({ state: 'visible' });
>  39 |         await button.click();
      |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
   40 |         await page.waitForTimeout(100); // Petit délai entre chaque clic
   41 |       }
   42 |       await validateButton.click();
   43 |
   44 |       // Attendre que le message de succès apparaisse
   45 |       await page.waitForTimeout(1000);
   46 |       const successMessage = page.locator('.success-message').first();
   47 |       await expect(successMessage).toBeVisible({ timeout: 10000 });
   48 |
   49 |       // Attendre la transition vers l'énigme suivante
   50 |       await page.waitForTimeout(3000);
   51 |     });
   52 |
   53 |     // Test du Mot de Passe
   54 |     await test.step('Mot de Passe - Validation de réponse', async () => {
   55 |       // Attendre que le composant soit chargé
   56 |       const heading = page.getByRole('heading', { name: /coffre-fort secret/i });
   57 |       await heading.waitFor({ state: 'visible', timeout: 15000 });
   58 |
   59 |       // 1. Vérifier qu'on peut entrer une réponse
   60 |       const input = page.getByPlaceholder(/entrez le mot de passe/i).first();
   61 |       await input.waitFor({ state: 'visible' });
   62 |       await input.fill('wrong');
   63 |
   64 |       // 2. Vérifier le message d'erreur pour une réponse incorrecte
   65 |       const validateButton = page.getByRole('button', { name: /valider/i }).first();
   66 |       await validateButton.waitFor({ state: 'visible' });
   67 |       await validateButton.click();
   68 |
   69 |       // Attendre que le message d'erreur apparaisse
   70 |       await page.waitForTimeout(1000);
   71 |       const errorMessage = page.locator('.error-message').first();
   72 |       await expect(errorMessage).toBeVisible({ timeout: 10000 });
   73 |
   74 |       // 3. Vérifier la progression avec la bonne réponse
   75 |       await input.fill('escape');
   76 |       await validateButton.click();
   77 |
   78 |       // Attendre que le message de succès apparaisse
   79 |       await page.waitForTimeout(1000);
   80 |       const successMessage = page.locator('.success-message').first();
   81 |       await expect(successMessage).toBeVisible({ timeout: 10000 });
   82 |
   83 |       // Attendre la transition vers l'énigme suivante
   84 |       await page.waitForTimeout(3000);
   85 |     });
   86 |
   87 |     // Test du Labyrinthe
   88 |     await test.step('Labyrinthe - Validation de réponse', async () => {
   89 |       // Attendre que le composant soit chargé
   90 |       const heading = page.getByRole('heading', { name: /l'ordre des couleurs/i });
   91 |       await heading.waitFor({ state: 'visible', timeout: 15000 });
   92 |
   93 |       // 1. Vérifier qu'on peut entrer une séquence
   94 |       const wrongColors = ['vert', 'bleu', 'rouge', 'orange', 'jaune', 'indigo', 'violet'];
   95 |       for (const color of wrongColors) {
   96 |         const button = page.getByRole('button', { name: color }).first();
   97 |         await button.waitFor({ state: 'visible' });
   98 |         await button.click();
   99 |         await page.waitForTimeout(100); // Petit délai entre chaque clic
  100 |       }
  101 |
  102 |       // 2. Vérifier le message d'erreur pour une séquence incorrecte
  103 |       const validateButton = page.getByRole('button', { name: /valider/i }).first();
  104 |       await validateButton.waitFor({ state: 'visible' });
  105 |       await validateButton.click();
  106 |
  107 |       // Attendre que le message d'erreur apparaisse
  108 |       await page.waitForTimeout(1000);
  109 |       const errorMessage = page.locator('.error-message').first();
  110 |       await expect(errorMessage).toBeVisible({ timeout: 10000 });
  111 |
  112 |       // 3. Vérifier la progression avec la bonne séquence
  113 |       const correctColors = ['rouge', 'orange', 'jaune', 'vert', 'bleu', 'indigo', 'violet'];
  114 |       for (const color of correctColors) {
  115 |         const button = page.getByRole('button', { name: color }).first();
  116 |         await button.waitFor({ state: 'visible' });
  117 |         await button.click();
  118 |         await page.waitForTimeout(100); // Petit délai entre chaque clic
  119 |       }
  120 |       await validateButton.click();
  121 |
  122 |       // Attendre que le message de succès apparaisse
  123 |       await page.waitForTimeout(1000);
  124 |       const successMessage = page.locator('.success-message').first();
  125 |       await expect(successMessage).toBeVisible({ timeout: 10000 });
  126 |
  127 |       // Attendre la transition vers l'écran final
  128 |       await page.waitForTimeout(3000);
  129 |     });
  130 |
  131 |     // Vérification finale
  132 |     await test.step('Fin du jeu', async () => {
  133 |       const congratsTitle = page.getByRole('heading', { name: /félicitations/i });
  134 |       await congratsTitle.waitFor({ state: 'visible', timeout: 15000 });
  135 |
  136 |       const congratsMessage = page.getByText(/vous avez réussi/i);
  137 |       await congratsMessage.waitFor({ state: 'visible', timeout: 15000 });
  138 |     });
  139 |   });
```