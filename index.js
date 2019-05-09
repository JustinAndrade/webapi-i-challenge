const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('server running');
});

server.get('/users', (req, res) => {
	db
		.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.json({ error: err, message: 'Something broke' });
		});
});

// POST to /api/users
server.post('/users', (req, res) => {
	const newUser = req.body;

	users
		.add(mewUser)
		.then((addedUser) => {
			res.status(201).json(addedUser);
		})
		.catch((err) => {
			res.status(400).json({ err: 'There was an error while saving the user to the database' });
		});
});
// GET   /api/users

server.listen(5000, () => {
	console.log('Server listening on port 5000');
});
