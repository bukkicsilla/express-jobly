const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/**
 * Generates SQL string and parameter values for a partial
 * update operation on a database table.
 * @param dataToUpdate: An object containing the data to be updated.
 * Keys represent column names, and values represent the new data.
 * @param jsToSql: An optional object mapping JavaScript object keys
 * to their corresponding column names in the database.
 * If a mapping exists, it will be used; otherwise,
 * the JavaScript object key will be used as is.
 * @returns An object with the following properties:
 * { setCols: A comma-separated string of column names and placeholders
 * for the SET clause in an SQL UPDATE statement.
 *   values: An array of parameter values corresponding
 * to the placeholders in the setCols string.
 * }
 * @errors BadRequestError: Thrown if the dataToUpdate object is empty.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
