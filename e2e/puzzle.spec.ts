import { test, expect } from '@playwright/test';

test.describe('Tests des puzzles', () => {
  test('Mot de Passe - Saisie et validation de réponse', async ({ page }) => {
    // 1. Accéder à la page d'accueil
    await page.goto('/');
    
    // 2. Attendre que le puzzle du mot de passe soit chargé
    await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
    
    // 3. Vérifier que le champ de saisie est présent
    const input = page.getByPlaceholder('Entrez le mot de passe');
    await expect(input).toBeVisible();
    
    // 4. Saisir une réponse
    await input.fill('test123');
    await expect(input).toHaveValue('test123');
    
    // 5. Vérifier que le bouton de validation est présent
    const validateButton = page.getByRole('button', { name: 'Valider' });
    await expect(validateButton).toBeVisible();
    
    // 6. Cliquer sur le bouton de validation
    await validateButton.click();
    
    // 7. Vérifier que le message d'erreur s'affiche (car la réponse est incorrecte)
    const errorMessage = page.locator('.error-message').first();
    await expect(errorMessage).toBeVisible();
    
    // 8. Saisir la bonne réponse
    await input.fill('escape');
    await expect(input).toHaveValue('escape');
    
    // 9. Cliquer sur le bouton de validation
    await validateButton.click();
    
    // 10. Attendre que le coffre s'ouvre (3 secondes)
    await page.waitForTimeout(3000);
    
    // 11. Vérifier que le message de succès s'affiche
    const successMessage = page.locator('.success-message').first();
    await expect(successMessage).toBeVisible();
    
    // 12. Attendre que le puzzle suivant se charge (4 secondes)
    await page.waitForTimeout(4000);
    
    // 13. Vérifier que nous sommes sur le puzzle suivant
    await expect(page.locator('h2')).toContainText('Le Coffre-Fort Numérique');
  });

  test('Mot de Passe - Message d\'erreur avec réponse incorrecte', async ({ page }) => {
    // 1. Accéder à la page d'accueil
    await page.goto('/');
    
    // 2. Attendre que le puzzle du mot de passe soit chargé
    await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
    
    // 3. Vérifier que le champ de saisie est présent
    const input = page.getByPlaceholder('Entrez le mot de passe');
    await expect(input).toBeVisible();
    
    // 4. Saisir une réponse incorrecte
    await input.fill('mauvais_mot_de_passe');
    await expect(input).toHaveValue('mauvais_mot_de_passe');
    
    // 5. Vérifier que le bouton de validation est présent
    const validateButton = page.getByRole('button', { name: 'Valider' });
    await expect(validateButton).toBeVisible();
    
    // 6. Cliquer sur le bouton de validation
    await validateButton.click();
    
    // 7. Vérifier que le message d'erreur s'affiche
    const errorMessage = page.locator('.error-message').first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Mot de passe incorrect');
    
    // 8. Vérifier que le champ de saisie est vidé
    await expect(input).toHaveValue('');
    
    // 9. Vérifier que le compteur de tentatives est incrémenté
    const attemptsCounter = page.locator('text=Tentatives : 1');
    await expect(attemptsCounter).toBeVisible();
  });

  test('Mot de Passe - Progression vers l\'énigme suivante avec la bonne réponse', async ({ page }) => {
    // 1. Accéder à la page d'accueil
    await page.goto('/');
    
    // 2. Attendre que le puzzle du mot de passe soit chargé
    await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
    
    // 3. Vérifier que le champ de saisie est présent
    const input = page.getByPlaceholder('Entrez le mot de passe');
    await expect(input).toBeVisible();
    
    // 4. Saisir la bonne réponse
    await input.fill('escape');
    await expect(input).toHaveValue('escape');
    
    // 5. Vérifier que le bouton de validation est présent
    const validateButton = page.getByRole('button', { name: 'Valider' });
    await expect(validateButton).toBeVisible();
    
    // 6. Cliquer sur le bouton de validation
    await validateButton.click();
    
    // 7. Attendre que le coffre s'ouvre (3 secondes)
    await page.waitForTimeout(3000);
    
    // 8. Vérifier que le message de succès s'affiche
    const successMessage = page.locator('.success-message').first();
    await expect(successMessage).toBeVisible();
    
    // 9. Attendre que le puzzle suivant se charge (4 secondes)
    await page.waitForTimeout(4000);
    
    // 10. Vérifier que nous sommes sur le puzzle suivant (Le Coffre-Fort Numérique)
    await expect(page.locator('h2')).toContainText('Le Coffre-Fort Numérique');
    
    // 11. Vérifier que les éléments du nouveau puzzle sont présents
    await expect(page.locator('[data-testid="code-digit-1"]')).toBeVisible();
    await expect(page.getByRole('button', { name: '1' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();
  });
});
