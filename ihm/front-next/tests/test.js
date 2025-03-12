const axios = require("axios");
const assert = require("assert");

describe("Root Endpoint", () => {
  it("/ should return a 200 status code", async () => {
    const response = await axios.get("http://docker:3000");
    // const response = await axios.get("localhost:3000");
    assert.strictEqual(response.status, 200);
  });

});

