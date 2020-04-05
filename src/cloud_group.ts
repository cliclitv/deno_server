import { Context } from "server/mod.ts";
import { getToken } from "./util.ts";

export default async (c: Context) => {
  const [content, type] = c.queryParams.url.split("@");
  let url = content;
  switch (type) {
    case "hcy":
      const info = atob(content).split(",");
      url =
        `https://caiyun.feixin.10086.cn/webdisk2/downLoadAction!downloadToPC.action?contentID=${info[1]}&shareContentIDs=${info[1]}&catalogList=&downloadSize=214446914`;
      const cookie: string = await fetch(
        `https://api.clicli.us/cookie/${info[0]}`,
      )
        .then((resp) => resp.json())
        .then((data) => data.result.hcy);
      url = await fetch(url, {
        headers: {
          Cookie: cookie,
          Host: "caiyun.feixin.10086.cn",
        },
      })
        .then((resp) => resp.json())
        .then((data) => data.downloadUrl);
      return { url, type: "mp4" };
    case "dogecloud":
      const ip = (c.request.conn.remoteAddr as Deno.NetAddr).hostname;
      const param = `/video/streams.json?platform=pch5&vid=${content}&ip=${ip}`;
      const token = getToken(param + "\n");
      url = await fetch(`https://api.dogecloud.com${param}`, {
        headers: {
          Host: "api.dogecloud.com",
          Authorization: `TOKEN ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => data.data.stream[0].url);
      return { url, type: "hls" };
    case "1096":
      const vid = await fetch(
        `https://www.wegame.com.cn/api/forum/lua/wegame_feeds/get_feed_item_data?p={"iid":"${content}","uid":211762212}`,
      )
        .then((resp) => resp.json())
        .then((data) => JSON.parse(data.data.data.data).video.vid);

      url = await fetch(
        `https://qt.qq.com/php_cgi/cod_video/php/get_video_url.php?json=1&multirate=1&filetype=40&game_id=123456&vid=${vid}`,
      )
        .then((resp) => resp.json())
        .then((data) => data.data[0].data[0]);

      return { url, type: "mp4" };
    case "1072":
      url = await fetch(
        `https://api.pengyou.com/go-cgi-bin/moment_h5/getFeedDetail?feedId=${content}`,
      )
        .then((resp) => resp.json())
        .then((data) => data.result.contents[0].video.urls.f0);
      return { url, type: "mp4" };
    case "weibo":
      url = await fetch(`https://m.weibo.cn/statuses/show?id=${content}`)
        .then((resp) => resp.json())
        .then((data) =>
          data.data.page_info.urls.mp4_720p_mp4.replace("http", "https")
        );

      return { url, type: "mp4" };
    default:
      // 时光的处理
      if (content.includes("1098")) {
        const url = await fetch(content)
          .then((resp) => resp.url)
          .then((data) => data);
        return { url, type: "mp4" };
      }
      return { url: content, type: "mp4" };
  }
};
