const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const eventStore = require("@sustainer-network/event-store-js");
const eventBus = require("@sustainer-network/event-bus");

exports.http = (req, res) => {
  commandHandler({
    body: req.body,
    tokens: tokensFromReq(req),
    publishEventFn: event => {
      eventStore.add(event);
      eventBus.publish(event);
    }
  })
    .then(response => res.send(response))
    .catch(e => res.status(e.statusCode).send(e));
};
