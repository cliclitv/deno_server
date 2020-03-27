import ops from "./plugin.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const AccessKey = "d54899f6d6036a2d";
export function getToken(s: string) {
  const b = ops.getToken.dispatch(encoder.encode(s));
  let token = "";
  if (b) {
    token = decoder.decode(b);
    token = AccessKey + ":" + token.slice(1, token.length - 1);
  }
  return token;
}
