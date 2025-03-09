import { test, expect } from '@playwright/test';
import { CareerPage } from '../pages/careerPage';
import formData from '../formData.json';


let careerPage;
test.describe('Career Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    careerPage = new CareerPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test('Positive Case', async ({}) => {
    await careerPage.positiveTest(formData);
    await careerPage.assertationForPositiveTest(formData);
  });

  test('Negative Case', async ({}) => {
    await careerPage.negativeTest(formData);
    await careerPage.assertationForNegativeTest(formData);
  });
});
