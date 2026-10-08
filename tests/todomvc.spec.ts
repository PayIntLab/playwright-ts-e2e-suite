import { expect, test } from '../fixtures/test-fixtures';

test.describe('TodoMVC UI', () => {
  test('adds a new todo', async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo('Buy milk');
    await todoPage.expectTodoVisible('Buy milk');
    await todoPage.expectTodoCount(1);
  });

  test('completes a todo', async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo('Write test plan');
    await todoPage.completeTodo('Write test plan');
    await expect(
      todoPage.todoItems.filter({ hasText: 'Write test plan' }),
    ).toHaveClass(/completed/);
  });

  test('deletes a todo', async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo('Temporary task');
    await todoPage.deleteTodo('Temporary task');
    await todoPage.expectTodoCount(0);
  });
});
