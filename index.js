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

  db('zoos')
    .insert(name)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add that to the database."
      })
    })
})


server.get('/api/zoos', async (req, res) => {


  const animals = await db('zoos')
    res.json(animals)
})

server.get('/api/zoos/:id', async (req, res) => {
  const { id } =  req.params

  const animals = await db('zoos')
    .where({ id }).first() // .FIRST ALLOWS YOU TO GET THE INDIVIDUAL ITEM AS AN OBJECT

    res.json(animals)
})




server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})





server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
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
