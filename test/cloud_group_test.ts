import { assert } from "testing/asserts.ts";
import { addr, cloudTest } from "./test_config.ts";
const { test } = Deno;

test(async function hcy() {
  const url: string = await fetch(`${addr}/jx?url=${cloudTest.hcy.content}@hcy`)
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.hcy.url));
});

test(async function dogecloud() {
  const url: string = await fetch(
    `${addr}/jx?url=${cloudTest.dogecloud.content}@dogecloud`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.dogecloud.url));
});

test(async function weibo() {
  const url: string = await fetch(
    `${addr}/jx?url=${cloudTest.weibo.content}@weibo`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.startsWith(cloudTest.weibo.url));
});

test(async function _1096() {
  const url: string = await fetch(
    `${addr}/jx?url=${cloudTest._1096.content}@1096`,
  )
    .then((resp) => resp.json())
    .then((data) => data.url);
  assert(url.includes(cloudTest._1096.url));
});
