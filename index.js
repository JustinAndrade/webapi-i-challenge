const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// POST to /api/users
server.post('/users', (req, res) => {
	const newUser = req.body;

	db
		.insert(newUser)
		.then((addedUser) => {
			if (addedUser.name && addedUser.bio) {
				res.status(201).json(addedUser);
			} else {
				res.status(400).json({ err: 'Please provide name and bio for the user.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ err: 'There was an error while saving the user to the database' });
		});
});

// GET to /api/users/
server.get('/users', (req, res) => {
	db
		.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(400).json({ err: 'The users information could not be retrieved.' });
		});
});

// GET to /api/users/:id
server.get('/users/:id', (req, res) => {
	const { id } = req.params;

	db
		.findById(id)
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ err: 'The user with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ err: 'The user information could not be retrieved' });
		});
});

// DELETE to /api/users/:id
server.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	db
		.remove(id)
		.then((removedUser) => {
			if (removedUser) {
				res.json(removedUser);
			} else {
				res.status(404).json({ err: 'The user with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(404).json({ err: 'The user could not be removed.' });
		});
});

// PUT to /api/users/:id
server.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	db
		.update(id, user)
		.then((updatedUser) => {
			if (!user.name && user.bio) {
				res.status(400).json({ err: 'Please provide name and bio for the user.' });
			} else if (updatedUser) {
				res.status(200).json(updatedUser);
			} else {
				res.status(404).json({ err: 'The user with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(404).json({ err: 'Something went wrong!' });
		});
});

server.listen(5000, () => {
	console.log('Server listening on port 5000');
});
