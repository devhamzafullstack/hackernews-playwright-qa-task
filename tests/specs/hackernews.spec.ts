import { test, expect, Page } from "@playwright/test";
import { HackerNewsPage } from "../pages/pageObjectModel";

test.describe("Hacker News Validation", () => {
  let hackerNewsPage: HackerNewsPage;

  test.beforeEach(async ({ page }) => {
    hackerNewsPage = new HackerNewsPage(page);
    await hackerNewsPage.navigateHackerNewest();
  });

  test("First 100 articles sorted newest-first", async ({ page }) => {
    const timestamps = await hackerNewsPage.sortHundredArticles();
    expect(timestamps).toHaveLength(100);

    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i - 1]).toBeGreaterThanOrEqual(timestamps[i]);
    }
  });
});
