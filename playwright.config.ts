import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: "http://127.0.0.1:3000",
    channel: "chrome",
    screenshot: "only-on-failure",
  },
  reporter: "list",
});
