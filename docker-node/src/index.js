import express from "express";
import http from "http";

// Import utils
import { Utils } from "../../utils/index.mjs";

// Import data
import Data from "../../_data/db.json" with { type: "json" };

const settings = {
  host: "0.0.0.0",
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
    const { name, username, email, company } = req.query;

    const nameRegExp = new RegExp(name, "i");
    const
      limit = req.query.limit ? parseInt(req.query.limit) : 10,
      skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const
      result = [],
      hasCondition = Boolean(name || username || email || company);
    let N = limit + skip;
    for (let i = skip; i < N; i++) {
      if(hasCondition) {
        if (name && nameRegExp.test(Data.users[i].name)) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (username && Data.users[i].username === username) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (email && Data.users[i].email === email) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (company && Data.users[i].company.name === company) {
          Data.users[i] && result.push(Data.users[i]);
        }

        if (result.length < limit && N < Data.users.length) {
          N += 1;
        }
      } else
        Data.users[i] && result.push(Data.users[i]);
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