import { Application } from "server/mod.ts";
import { logger } from "mw/logger.ts";
import { cors } from "mw/cors.ts";

const app = new Application();

app.use(logger()).use(cors());

app.start({ port: 8080 });

console.log(
  `server listening on http://localhost:${app.server?.listener.addr.port}`
);

app.get("/hello", c => {
  return c.path;
});
