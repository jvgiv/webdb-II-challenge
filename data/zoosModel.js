const knex = require('knex')
const db = require('./dbConfig')

function findById(id) {
    return db('zoos')
        .where({ id })
        .first()
}