#!/bin/sh

./run.sh &
deno test -A --importmap=import_map.json
