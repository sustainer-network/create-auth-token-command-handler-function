const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const commandInfoFromReq = require("@sustainer-network/command-info-from-req");
const eventStore = require("@sustainer-network/event-store-js");
const eventBus = require("@sustainer-network/event-bus");

exports.command = (req, res) => {
  // eslint-disable-next-line no-console
  console.log("req: ", { req });
  // eslint-disable-next-line no-console
  console.log("BODY: ", { ...req.body, ...commandInfoFromReq(req) });
  const host = req.get("host");
  const subdomains = host.split(".");
  // eslint-disable-next-line no-console
  console.log("HOST: ", host);
  // eslint-disable-next-line no-console
  console.log("Sub d's: ", subdomains);
  // eslint-disable-next-line no-console
  console.log("command info: ", commandInfoFromReq(req));

  commandHandler({
    body: { ...req.body, ...commandInfoFromReq(req) },
    tokens: tokensFromReq(req),
    publishEventFn: event => {
      eventStore.add(event);
      eventBus.publish(event);
    }
  })
    .then(response => res.send(response))
    .catch(e => {
      // eslint-disable-next-line no-console
      console.log("EEEE: ", { e, stack: e.stack });
      res.status(e.statusCode).send(e);
    });
};
