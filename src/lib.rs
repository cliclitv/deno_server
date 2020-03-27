#[macro_use]
extern crate deno_core;
extern crate crypto;
extern crate futures;
extern crate rustc_serialize;
extern crate serde_json;

use crypto::hmac::Hmac;
use crypto::mac::Mac;
use crypto::sha1::Sha1;
use deno_core::{CoreOp, Op, PluginInitContext, ZeroCopyBuf};
use rustc_serialize::hex::ToHex;

fn init(context: &mut dyn PluginInitContext) {
  context.register_op("getToken", Box::new(get_token));
}
init_fn!(init);

pub fn get_token(data: &[u8], _zero_copy: Option<ZeroCopyBuf>) -> CoreOp {
  let mut mac = Hmac::new(Sha1::new(), b"3e2333eb0b03973dbe6f38d8654dad61");
  mac.input(data);
  let result = mac.result();
  let code = result.code();
  Op::Sync(
    serde_json::to_vec(&code.to_hex())
      .unwrap()
      .into_boxed_slice(),
  )
}
