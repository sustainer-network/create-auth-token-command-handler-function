const { expect } = require("chai");
const { post } = require("@sustainer-network/request");

const address =
  "https://TODO=<some-command>.command.staging.sustainable.network/v1/issue";
describe("TODO=<change this name, like `Change account email command`>", () => {
  it("should return successfully", async () => {
    const response = await post(address, {
      data: [
        {
          issuedTimestamp: 123,
          payload: {
            TODO: "Write in sample input data",
            a: 1
          }
        }
      ],
      clientInfo: {
        id: "asdf",
        ip: "asdf"
      }
    });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal("");
  });
  it("should return an error if incorrect params", async () => {
    const response = await post(address, {});
    expect(response.statusCode).to.be.greaterThan(400);
  });
});
