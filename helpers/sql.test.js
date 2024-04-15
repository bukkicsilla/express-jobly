const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("works: one property", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Lua" },
      { firstName: "first_name", lastName: "last_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Lua"],
    });
  });

  test("works: two properties", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Katie", age: 42 },
      { firstName: "first_name", age: "age" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Katie", 42],
    });
  });
});
