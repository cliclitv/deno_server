import { Group } from "server/mod.ts";

export default function (g: Group) {
  g.get("/:pid", async (c) => {
    const pid = c.params.pid;

    const pv: number = await fetch(`https://jx.clicli.us/get/pv?pid=${pid}`)
      .then((resp) => resp.json())
      .then((data) => data.pv);

    return { pid, pv };
  });
}
