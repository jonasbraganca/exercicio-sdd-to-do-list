const { test, expect } = require('@playwright/test');

test.describe('Todo app acceptance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('1. cannot create task without title', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('#form-message')).toHaveText('Informe um título para a tarefa.');
    await expect(page.locator('#task-list li')).toHaveCount(0);
  });

  test('2. valid task appears immediately after creation', async ({ page }) => {
    await page.fill('#task-title', 'Comprar pão');
    await page.click('button[type="submit"]');
    await expect(page.locator('#task-list li')).toHaveCount(1);
    await expect(page.locator('#task-list li .task-title')).toHaveText(['Comprar pão']);
  });

  test('3. task can be toggled complete and incomplete', async ({ page }) => {
    await page.fill('#task-title', 'Estudar');
    await page.click('button[type="submit"]');
    const checkbox = page.locator('#task-list li .task-checkbox').first();
    await checkbox.check();
    await expect(page.locator('#task-list li')).toHaveClass(/is-completed/);
    await expect(page.locator('#task-list li .task-status')).toHaveText('Concluída');
    await expect(page.locator('#task-list li .task-title')).toHaveCSS('text-decoration-line', 'line-through');
    await checkbox.uncheck();
    await expect(page.locator('#task-list li')).not.toHaveClass(/is-completed/);
    await expect(page.locator('#task-list li .task-status')).toHaveText('Pendente');
    await expect(page.locator('#task-list li .task-title')).toHaveCSS('text-decoration-line', 'none');
  });

  test('4. task can be deleted', async ({ page }) => {
    await page.fill('#task-title', 'Lavar louça');
    await page.click('button[type="submit"]');
    await page.click('#task-list li .delete-button');
    await expect(page.locator('#task-list li')).toHaveCount(0);
  });

  test('5. tasks persist after page reload', async ({ page }) => {
    await page.fill('#task-title', 'Levar o lixo');
    await page.click('button[type="submit"]');
    await page.reload();
    await expect(page.locator('#task-list li')).toHaveCount(1);
    await expect(page.locator('#task-list li .task-title')).toHaveText(['Levar o lixo']);
  });

  test('6. completed state persists after page reload', async ({ page }) => {
    await page.fill('#task-title', 'Fazer revisão');
    await page.click('button[type="submit"]');
    await page.locator('#task-list li .task-checkbox').check();
    await page.reload();
    await expect(page.locator('#task-list li')).toHaveClass(/is-completed/);
    await expect(page.locator('#task-list li .task-status')).toHaveText('Concluída');
    await expect(page.locator('#task-list li .task-checkbox')).toBeChecked();
  });
});
