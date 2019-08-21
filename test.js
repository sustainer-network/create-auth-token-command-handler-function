const { expect } = require("chai");
const { post } = require("@sustainer-network/request");

const address =
  "https://create.auth-token.staging.sustainable.network/v1/issue";
describe("Create auth token command", () => {
  it("should return successfully", async () => {
    const response = await post(address, {
      data: [
        {
          issuedTimestamp: 123,
          payload: {
            metadata: {
              a: 1
            },
            permissions: ["*:some-domain:<some-actions"]
          }
        }
      ],
      clientInfo: {
        id: "asdf",
        ip: "asdf"
      }
    });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal({});
  });
  it("should return an error if incorrect params", async () => {
    const response = await post(address, {});
    expect(response.statusCode).to.be.greaterThan(400);
  });
});
