const commandHandler = require("@sustainer-network/create-auth-token-command-handler");
const tokenFromReq = require("@sustainer-network/token-from-req");

exports.http = (req, res) => {
  commandHandler({ body: req.body, token: tokenFromReq(req) })
    .then(response => res.send(response))
    .catch(e => res.status(e.statusCode).send(e));
};
