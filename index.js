const express = require('express');
const helmet = require('helmet');

const knex = require('knex')
const db = require('./data/dbConfig')

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const name = req.body;

  db.insert(name)
    .into('lambda')
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add that to the database."
      })
    })
})


server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('lambda')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json({
        message: "Couldn't update that item."
      })
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
