import { Group } from "server/mod.ts";
import { client } from "./db.ts";

export default function (g: Group) {
  g.get("/:pid", async (c) => {
    const pid = parseInt(c.params.pid);
    return client
      .query(`select pv from pv where pid = ?`, [pid])
      .then((pvs) => {
        let pv = 1;
        if (pvs.length) {
          pv = pvs[0].pv + 1;
          client.execute(`update pv set pv = ? where pid = ?`, [pv, pid]);
        } else {
          client.execute(`insert into pv(pv, pid) values(?, ?)`, [pv, pid]);
        }
        return { pid, pv };
      });
  });
}
