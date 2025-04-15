import { Page } from "@playwright/test";

export class HackerNewsPage {
  constructor(private readonly page: Page) {}

  async navigateHackerNewest() {
    await this.page.goto("https://news.ycombinator.com/newest");
  }

  async sortHundredArticles(count = 100) {
    const timestamps: number[] = [];
    await this.rateLimit();

    while (timestamps.length < count) {
      await this.pushToTimestampsArray(timestamps, count);
      await this.clickMore();
    }

    return timestamps;
  }

  private async pushToTimestampsArray(timestamps: number[], count: number) {
    await this.page.waitForSelector(".age", { state: "attached" });
    const ageSpans = await this.page.locator(".age").all();

    for (const ageSpan of ageSpans) {
      const titleAttr = await ageSpan.getAttribute("title");

      if (titleAttr && timestamps.length < count) {
        const timestamp = parseInt(titleAttr.split(" ")[1]);
        timestamps.push(timestamp);
      }
    }
  }

  private async rateLimit() {
    const reloadBtn = this.page.locator('td:has-text("reload") a');
    while (await reloadBtn.isVisible()) {
      await Promise.all([
        reloadBtn.click(),
        this.page.waitForLoadState("networkidle"),
      ]);
    }
  }

  private async clickMore() {
    await this.page.waitForSelector("a.morelink");
    const moreButton = this.page.locator("a.morelink");
    await moreButton.scrollIntoViewIfNeeded();
    await Promise.all([
      moreButton.click(),
      this.page.waitForLoadState("networkidle"),
    ]);

    await this.rateLimit();
  }
}
