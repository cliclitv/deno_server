import { assert } from "testing/asserts.ts";
import { addr, cloudTest } from "./test_config";
const { test } = Deno;

test(async function hcy() {
  const url: string = await fetch(`${addr}/cloud/hcy/${cloudTest.hcy.content}`)
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.hcy.url));
});

test(async function dogecloud() {
  const url: string = await fetch(
    `${addr}/cloud/dogecloud/${cloudTest.dogecloud.content}`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.dogecloud.url));
});

test(async function weibo() {
  const url: string = await fetch(
    `${addr}/cloud/weibo/${cloudTest.weibo.content}`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.weibo.url));
});

test(async function _1096() {
  const url: string = await fetch(
    `${addr}/cloud/1096/${cloudTest._1096.content}`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.includes(cloudTest._1096.url));
});
