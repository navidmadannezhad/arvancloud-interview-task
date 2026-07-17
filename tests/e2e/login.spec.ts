import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByPlaceholder('Enter your username')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();

    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });
});
