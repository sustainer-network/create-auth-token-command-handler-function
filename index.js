const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");
const logger = require("@sustainer-network/logger");

exports.command = (req, res) => {
  logger.info("REQ BE: ", { req });
  commandHandler({
    params: req.body,
    tokens: tokensFromReq(req),
    publishEventFn: eventStore.add
  })
    .then(response => res.send(response))
    .catch(e => {
      logger.info("EEE BE: ", { req });
      res.status(e.statusCode).send(e);
    });
};
