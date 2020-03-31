import { Group } from "server/mod.ts";
import { client } from "./db.ts";

export default function (g: Group) {
  g.get("/:pid", async (c) => {
    const pid = parseInt(c.params.pid);
    const pv = await client.transaction(async (conn) => {
      const pvs = (await conn.query(`select pv from pv where pid = ?`, [
        pid,
      ])) as Array<{ pv: number }>;
      if (pvs.length) {
        const pv = pvs[0].pv + 1;
        await conn.execute(`update pv set pv = ?`, [pv]);
        return pv;
      } else {
        await conn.execute(`insert into pv(pv) values(?)`, [1]);
      }

      return 1;
    });

    return { pid, pv };
  });
}
