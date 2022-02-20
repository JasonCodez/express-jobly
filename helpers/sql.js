const { BadRequestError } = require("../expressError");

// accepts an object as a first argument and takes the keys of that object to
// format it for a SQL query.

// accepts an object as a second argument that converts js style
// name conventions to db column names.

// returns an object with formatted data to be used in conjunction
// with the update method

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
