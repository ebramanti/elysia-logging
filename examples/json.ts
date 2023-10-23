import { Elysia } from "elysia";
import { ElysiaLogging } from "../src/elysiaLogging";

// Use console for logging
const logger = console;

// Create ElysiaLogging instance
const elysiaLogging = ElysiaLogging(logger, {
  format: "json",
});

// Create Elysia app
const app = new Elysia()
  .use(elysiaLogging)
  .get("/", () => {
    if (Math.random() < 0.75) {
      return new Response("Welcome to Bun!");
    }
    throw { message: 'Whoops!', name: 'CustomError' };
  })
  .listen({
    port: Bun.env.PORT ?? 3000,
    maxRequestBodySize: Number.MAX_SAFE_INTEGER,
  });

logger.info(
  `🦊 API is running at http://${app.server?.hostname}:${app.server?.port}`
);
