import { expect, test } from "@playwright/test";

test.describe("Public API smoke tests @api", () => {
  test("JSONPlaceholder returns a post @smoke", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(body.title).toBeTruthy();
  });

  test("JSONPlaceholder returns 404 for a missing post @regression", async ({
    request,
  }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/999999",
    );
    expect(response.status()).toBe(404);
  });

  test("JSONPlaceholder creates a post @regression", async ({ request }) => {
    const response = await request.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        data: { title: "AI QA demo", body: "Playwright TypeScript", userId: 1 },
      },
    );
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe("AI QA demo");
    expect(body.id).toBeTruthy();
  });

  test("JSONPlaceholder list endpoint returns data @regression", async ({
    request,
  }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(5);
  });

  test("httpbin echoes query parameters @smoke", async ({ request }) => {
    const response = await request.get("https://httpbin.org/get", {
      params: { source: "playwright-ts-e2e-suite" },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.args.source).toBe("playwright-ts-e2e-suite");
  });

  test("httpbin echoes custom headers @regression", async ({ request }) => {
    const response = await request.get("https://httpbin.org/headers", {
      headers: { "x-demo-source": "playwright-ts-e2e-suite" },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.headers["X-Demo-Source"]).toBe("playwright-ts-e2e-suite");
  });
});
