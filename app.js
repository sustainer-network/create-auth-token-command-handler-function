const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");
const { sign } = require("@sustainer-network/kms");
const logger = require("@sustainer-network/logger");

app.use(bodyParser.json());

app.post("/", (req, res) => {
  logger.info("env: ", process.env);
  commandHandler({
    params: req.body,
    tokens: tokensFromReq(req),
    signFn: sign,
    publishEventFn: eventStore.add
  })
    .then(response => res.send(response))
    .catch(e => res.status(e.statusCode).send(e));
});

module.exports = app;
