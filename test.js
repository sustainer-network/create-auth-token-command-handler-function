const { expect } = require("chai");
const { post } = require("@sustainer-network/request");
const { fineTimestamp } = require("@sustainer-network/datetime");

const address =
  "https://create.auth-token.core.staging.sustainer.network/v1/issue";
describe("Create auth token command", () => {
  it("should return successfully", async () => {
    const response = await post(address, {
      principle: "some-other-principle-root",
      audiences: ["*"],
      scopes: ["*:*:*"],
      issuedTimestamp: fineTimestamp(),
      issuerInfo: {
        id: "asdf",
        ip: "asdf"
      }
    });

    expect(response.statusCode).to.equal(200);
    //eslint-disable-next-line no-console
    console.log(JSON.parse(response.body).token);

    expect(JSON.parse(response.body).token).to.exist;
  });
  it("should return an error if incorrect params", async () => {
    const response = await post(address, {});
    expect(response.statusCode).to.be.at.least(400);
  });
});
