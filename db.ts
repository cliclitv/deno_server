import "dotenv/load.ts";
import { Client } from "mysql/mod.ts";
const { MysqlHostname, MysqlUsername, MysqlDB, MysqlPassword } = Deno.env();

export const client = await new Client().connect({
  hostname: MysqlHostname,
  username: MysqlUsername,
  db: MysqlDB,
  password: MysqlPassword,
});
