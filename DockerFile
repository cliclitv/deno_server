FROM hayd/alpine-deno:0.38.0

COPY ./ /server/
WORKDIR /server/
RUN deno fetch --importmap import_map.json main.ts

EXPOSE 8080
ENTRYPOINT []

CMD [ "deno", "-A", "--importmap", "import_map.json", "main.ts" ]
