import { Group } from "server/mod.ts";
import { getToken } from "./util.ts";

export default function(g: Group) {
  g.get("/auth", async c => {
    const { fname, rname } = c.queryParams;
    const params = `/auth/upload.json?filename=${encodeURIComponent(
      fname
    )}&vn=${encodeURIComponent(rname)}`;
    let accessToken = getToken(params + "\n");
    const uploadToken = await fetch(`https://api.dogecloud.com${params}`, {
      headers: {
        Host: "api.dogecloud.com",
        Authorization: `TOKEN ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then(data => data.data.uploadToken);

    return { uploadToken };
  });
}
