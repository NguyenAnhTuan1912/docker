import express from "express";
import http from "http";

// Import utils
import { Utils } from "../../utils/index.mjs";

// Import data
import Data from "../../_data/db.json" with { type: "json" };

const settings = {
  host: "127.0.0.1",
  port: 3000
};

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    o.data = "Welcome to my app";
    return o;
  });
});

// Get users
app.get("/users", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { limit = 10, skip = 0, name, username, email, company } = req.query;

    const nameRegExp = new RegExp(name, "i");

    const
      result = [],
      hasCondition = Boolean(name || username || email || company);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (name && nameRegExp.test(Data.users[i].name)) {
          result.push(Data.users[i]);
        }

        if (username && Data.users[i].username === username) {
          result.push(Data.users[i]);
        }

        if (email && Data.users[i].email === email) {
          result.push(Data.users[i]);
        }

        if (company && Data.users[i].company.name === company) {
          result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.users.length) {
          N += 1;
        }
      } else
        result.push(Data.users[i]);
    }

    o.data = result;
    o.success.message = "Query users successfully";

    return o;
  });
});

// Get user
app.get("/users/:id", (req, res) => {
  return Utils.Error.handleResponseError(app, res, function(o) {
    const { id } = req.params;

    o.data = Data.users.find(user => user.id == id);
    o.success.message = "Query user successfully";

    return o;
  });
});

server.listen(settings.port, settings.host, () => {
  console.log(`You server is served at http://${settings.host}:${settings.port}`);
});