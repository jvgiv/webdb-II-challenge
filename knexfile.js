// Update with your config settings.

const knex = require('knex')



module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
  },
};
