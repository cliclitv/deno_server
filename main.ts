import { Application } from "server/mod.ts";
import { logger } from "mw/logger.ts";
import { cors } from "mw/cors.ts";
import cloudGroup from "./cloud_group.ts";
import pvGroup from "./pv_group.ts";
import uploadGroup from "./upload_group.ts";

const app = new Application();

app.use(logger()).use(cors());

app.start({ port: 8080 });

console.log(
  `server listening on http://localhost:${(app.server?.listener.addr as any).port}`
);

cloudGroup(app.group("/cloud"));
// pv: page views
pvGroup(app.group("/pv"));
uploadGroup(app.group("/upload"));
