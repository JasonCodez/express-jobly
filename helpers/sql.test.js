const { sqlForPartialUpdate } = require("./sql");

describe("configures data recieved", function() {
   test("works: 1 user", function () {
      const result = sqlForPartialUpdate(
         { username: "user1" },
         { username: "user2", email: "user@mail.com"}
      )
      expect(result).toEqual({
         setCols: "\"user2\"=$1",
         values: ["user1"]
      });
   });
})