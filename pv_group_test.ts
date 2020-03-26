import { runIfMain } from "testing/bench.ts";
import { assert } from "testing/asserts.ts";
import { addr, pvTest } from "./test_config.ts";
const { test } = Deno;

test(async function pv() {
  const data = await fetch(`${addr}/pv/${pvTest.pid}`).then(resp =>
    resp.json()
  );
  assert(data.pid === pvTest.pid);
  assert(data.pv > pvTest.minpv);
});

runIfMain(import.meta);
