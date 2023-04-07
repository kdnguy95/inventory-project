const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
))

app.get('/', (req, res) => {
  knex
    .select('*')
    .from('items')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: err }))
})

app.get('/inventory/:manager', (req, res) => {
  // console.log('req.param from inventory:\n', req.params.manager);
  const manager = req.params.manager;
  let managerID = 0;

  knex('users').where({ username: manager }).select('id')
    .then(data => managerID = data[0].id)
    .then(() => {
      knex('items').where({ userID: managerID }).select('*')
        .then(data => res.status(200).json(data))
    })
    .catch(err => res.status(404).json({ message: err }))
})

app.post('/signup', (req, res) => {
  console.log('req.body from signup:\n', req.body)

  knex
    .insert(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
      }
    )
    .into('users')
    .then(data => res.status(200).json({ message: `Sucessfully registered user '${req.body.username}'` }))
    .catch(err => {
      console.log('error:\n', err);
      res.status(404).json(err)
    })

  // res.status(200).json({message: `Sucessfully registered user '${req.body.username}'`})
})

app.post('/login', (req, res) => {
  console.log('req.body from login:\n', req.body);

  knex('users').where({
    username: req.body.username,
    password: req.body.password
  }).select('*')
    .then(data => {
      console.log('knex data:\n', data);
      if (data.length === 0) {
        res.status(401).json({ message: 'Unsuccessful login' })
      }
      else (
        knex.select('username').from('users')
          .then(usernames => {
            let managers = usernames.map(manager => manager.username)
            console.log('managers:\n', managers);
            res.status(200).json({ message: managers })
          })
      )

    })
    .catch(err => {
      console.log('error:\n', err);
      res.status(404).json(err)
    })

  // res.status(200).json({message: `Sucessfully logged in '${req.body.username}'`})
})

app.post('/inventory/:manager', (req, res) => {
  const manager = req.params.manager;
  let managerID = 0;
  let newItem = req.body;

  // console.log('post newItem:\n', newItem)
  knex('users').where({ username: manager }).select('id')
    .then(data => {
      managerID = data[0].id
      knex.insert({
        userID: managerID,
        itemName: newItem.itemName,
        description: newItem.description,
        quantity: newItem.quantity
      })
        .into('items')
        .then(() => {
          knex('items').where({ userID: managerID }).select('*')
            .then(data => res.status(200).json(data))
        })
    })
    .catch(err => {
      console.log('Error:\n', err)
      res.status(404).json({ message: err })
    })
})

app.patch('/inventory/:manager', (req, res) => {
  const manager = req.params.manager;
  let updatedInventory = req.body;
  // console.log('patch updatedInventory:\n', updatedInventory)
  let managerID = 0;

  knex('users').where({ username: manager }).select('id')
    .then(data => {
      managerID = data[0].id;
      let promises = updatedInventory.map(item => {
        return knex('items').where({ itemName: item.itemName })
          .update({ quantity: item.quantity });
      })
      return Promise.all(promises);
    })
    .then(() => {
      knex('items').where({ userID: managerID }).select('*')
        .then(data => res.status(200).json(data))
    })
    .catch(err => {
      console.log('Error:\n', err)
      res.status(404).json({ message: err })
    })

  // res.status(200).json({ message: 'Patching...' })
})

app.delete('/inventory/:manager', (req, res) => {
  const manager = req.params.manager;
  let managerID = 0;
  const itemID = req.body.id;
  console.log('itemID:\n', itemID)

  knex('items').where('id', itemID).del()
    .then(() => {
      knex('users').where({ username: manager }).select('id')
        .then(data => managerID = data[0].id)
        .then(() => {
          knex('items').where({ userID: managerID }).select('*')
            .then(data => res.status(200).json(data))
        })
    })
    .catch(err => res.status(404).json({ message: err }))

  // res.status(200).json({ message: 'Deleting...' })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})