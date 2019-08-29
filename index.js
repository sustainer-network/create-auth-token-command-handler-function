const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");

app.post("/", (req, res) => {
  commandHandler({
    params: req.body,
    tokens: tokensFromReq(req),
    publishEventFn: eventStore.add
  })
    .then(response => res.send(response))
    .catch(e => res.status(e.statusCode).send(e));
});

const port = process.env.PORT || 8080;
app.listen(port);
