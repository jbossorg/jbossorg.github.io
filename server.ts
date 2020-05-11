import { Application } from "https://deno.land/x/abc/mod.ts";
/*
import { serve } from "https://deno.land/std/http/server.ts";
import { watch } from "https://deno.land/x/watch@1.1.0/mod.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  } from "https://deno.land/std/ws/mod.ts";

const port = Deno.args[0] || "8088";
*/

const app = new Application();

app.static("/", "./gh-pages/").start({hostname: "0.0.0.0", port: 8080 });

/*
for await (const req of serve(`:${port}`)) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;

  try {
    const sock = await acceptWebSocket({
            conn,
	    bufReader
	    bufWriter,
	    headers,
	    });
    console.log("socket connected!");

    try {
      for await (const ev of sock) {
        if (typeof ev === "string") {
          console.log("ws:Text", ev);
            await sock.send(ev);
        } else if (isWebSocketPingEvent(ev)) {
          const [,body] = ev;
          console.log("ws:Ping", body);
        } else if (isWebSocketCloseEvent(ev)) {
          const { code, reason } = ev;
          console.log("ws:Close", code, reason);
        }
      }
    } catch (err) {
      console.error(`failed to accept websocket: ${err}`);
      await req.respond({ status: 400 });
    }
 }
 */
