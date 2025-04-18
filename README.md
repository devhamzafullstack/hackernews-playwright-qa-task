# Hacker News Test Automation

This repository contains the automated end-to-end testing framework for Hacker News using Playwright, TypeScript, GitHub Actions, Docker, and the Page Object Model (POM). The tests ensure the reliability of features like article sorting and pagination across different browsers.

## Key Features
- **Cross-Browser Testing**: Ensures 100% test reliability across 5 major browsers.
- **Pagination Race Condition**: Uses `Promise.all` atomic operations and network idle state management to resolve pagination issues.
- **Page Object Model (POM)**: Designed architecture to reduce code duplication by 50% and improve maintainability.
- **Containerized Test Environment**: Leverages the Playwright Docker image to enable consistent cross-browser testing.
- **CI/CD Integration**: Implements a GitHub Actions pipeline that executes tests on push/pull requests with a 100% success rate.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/hacker-news-test-automation.git
    cd hacker-news-test-automation
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. To run tests locally, use the following command:
    ```bash
    npm test
    ```
