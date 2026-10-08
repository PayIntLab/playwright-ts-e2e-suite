import { expect, test } from "../fixtures/test-fixtures";

test.describe("TodoMVC UI @ui", () => {
  test("adds a new todo @smoke", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Buy milk");
    await todoPage.expectTodoVisible("Buy milk");
    await todoPage.expectTodoCount(1);
  });

  test("completes a todo @regression", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Write test plan");
    await todoPage.completeTodo("Write test plan");
    await expect(
      todoPage.todoItems.filter({ hasText: "Write test plan" }),
    ).toHaveClass(/completed/);
  });

  test("deletes a todo @regression", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Temporary task");
    await todoPage.deleteTodo("Temporary task");
    await todoPage.expectTodoCount(0);
  });

  test("filters active and completed todos @regression", async ({
    todoPage,
  }) => {
    await todoPage.goto();
    await todoPage.addTodo("Active task");
    await todoPage.addTodo("Completed task");
    await todoPage.completeTodo("Completed task");

    await todoPage.page.getByRole("link", { name: "Active" }).click();
    await todoPage.expectTodoVisible("Active task");
    await expect(
      todoPage.todoItems.filter({ hasText: "Completed task" }),
    ).toHaveCount(0);

    await todoPage.page.getByRole("link", { name: "Completed" }).click();
    await todoPage.expectTodoVisible("Completed task");
    await expect(
      todoPage.todoItems.filter({ hasText: "Active task" }),
    ).toHaveCount(0);
  });

  test("clears completed todos @regression", async ({ todoPage }) => {
    await todoPage.goto();
    await todoPage.addTodo("Keep me");
    await todoPage.addTodo("Clear me");
    await todoPage.completeTodo("Clear me");
    await todoPage.page
      .getByRole("button", { name: "Clear completed" })
      .click();
    await todoPage.expectTodoVisible("Keep me");
    await expect(
      todoPage.todoItems.filter({ hasText: "Clear me" }),
    ).toHaveCount(0);
  });
});
