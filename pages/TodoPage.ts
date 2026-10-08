import { expect, type Locator, type Page } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.locator("input.new-todo");
    this.todoItems = page.locator(".todo-list li");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://demo.playwright.dev/todomvc/");
  }

  async addTodo(title: string): Promise<void> {
    await this.newTodo.fill(title);
    await this.newTodo.press("Enter");
  }

  async completeTodo(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    await item.locator(".toggle").check();
  }

  async deleteTodo(title: string): Promise<void> {
    const item = this.todoItems.filter({ hasText: title });
    await item.hover();
    await item.locator(".destroy").click();
  }

  async expectTodoVisible(title: string): Promise<void> {
    await expect(this.todoItems.filter({ hasText: title })).toBeVisible();
  }

  async expectTodoCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }
}
