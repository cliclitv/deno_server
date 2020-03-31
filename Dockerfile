FROM hayd/alpine-deno:0.38.0

COPY ./ /server/
WORKDIR /server/
RUN touch .env && deno fetch --importmap import_map.json main.ts

EXPOSE 8083
ENTRYPOINT []

CMD [ "deno", "-A", "--importmap", "import_map.json", "main.ts" ]
