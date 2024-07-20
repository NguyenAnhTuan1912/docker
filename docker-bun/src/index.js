import Bun from "bun";
import { Hono } from "hono";

// Import utils
import { Utils } from "../../utils/index.mjs";

// Import data
import Data from "../../_data/db.json" with { type: "json" };

const settings = {
  host: "0.0.0.0",
  port: 3300
};

// Setup app
const app = new Hono();

// Get
app.get("/", (ctx) => {
  return Utils.Error.handleResponseError(app, ctx, function(o) {
    o.data = "Welcome to my app";
    return o;
  });
});

// Get albums
app.get("/albums", (ctx) => {
  return Utils.Error.handleResponseError(app, ctx, function(o) {
    const { title } = ctx.req.query();

    const titleRegExp = new RegExp(title, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(title);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (title && titleRegExp.test(Data.albums[i].title)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.albums.length) {
          N += 1;
        }
      } else
        Data.users[i] && result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query albums successfully";

    return o;
  });
});

// Get album
app.get("/albums/:id", (ctx) => {
  return Utils.Error.handleResponseError(app, ctx, function(o) {
    const { id } = ctx.req.param();

    o.data = Data.albums.find(album => album.id == id);
    o.success.message = "Query album successfully";

    return o;
  });
});

Bun.serve({
  port: settings.port,
  hostname: settings.host,
  fetch: app.fetch
});

console.log(`You server is served at http://${settings.host}:${settings.port}`);