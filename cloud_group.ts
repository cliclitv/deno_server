import { Group } from "server/mod.ts";
import { getToken } from "./util.ts";

export default function(g: Group) {
  g.get("/hcy/:content", async c => {
    const content = c.params.content;
    const info = atob(content).split(",");
    let url =
      `https://caiyun.feixin.10086.cn/webdisk2/downLoadAction!downloadToPC.action?contentID=${info
        [1]}&shareContentIDs=${info[1]}&catalogList=&downloadSize=214446914`;
    const cookie: string = await fetch(
      `https://api.clicli.us/cookie/${info[0]}`
    )
      .then(resp => resp.json())
      .then(data => data.result.hcy);
    url = await fetch(url, {
      headers: {
        Cookie: cookie,
        Host: "caiyun.feixin.10086.cn"
      }
    })
      .then(resp => resp.json())
      .then(data => data.downloadUrl);

    return { url, type: "mp4" };
  });

  g.get("/dogecloud/:content", async c => {
    const content = c.params.content;
    const ip = (c.request.conn.remoteAddr as any).hostname;
    const param = `/video/streams.json?platform=pch5&vid=${content}&ip=${ip}`;
    const token = getToken(param + "\n");
    const url = await fetch(`https://api.dogecloud.com${param}`, {
      headers: {
        Host: "api.dogecloud.com",
        Authorization: `TOKEN ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => data.data.stream[0].url);

    return { url, type: "hls" };
  });
}