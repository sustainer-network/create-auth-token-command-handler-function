const express = require("express");

const app = express();

const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");
const logger = require("@sustainer-network/logger");

app.post("/", (req, res) => {
  logger.info("TARGET: ", { target: process.env.TARGET });
  logger.info("REQ BE: ", { req });
  logger.info("HEADERS BE: ", { headers: req.headers });
  logger.info("BODY BE: ", { body: req.body });
  logger.info("PARAMS BE: ", { body: req.params });
  logger.info("QUERY BE: ", { body: req.query });
  commandHandler({
    params: req.body,
    tokens: tokensFromReq(req),
    publishEventFn: eventStore.add
  })
    .then(response => res.send(response))
    .catch(e => {
      logger.info("EEE BE: ", { e });
      res.status(e.statusCode).send(e);
    });
});

const port = process.env.PORT || 8080;
app.listen(port);
