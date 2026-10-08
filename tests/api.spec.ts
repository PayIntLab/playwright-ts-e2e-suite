import { expect, test } from '@playwright/test';

test.describe('Public API smoke tests', () => {
  test('JSONPlaceholder returns a post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(body.title).toBeTruthy();
  });

  test('httpbin echoes query parameters', async ({ request }) => {
    const response = await request.get('https://httpbin.org/get', {
      params: { source: 'playwright-ts-demo' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.args.source).toBe('playwright-ts-demo');
  });
});
