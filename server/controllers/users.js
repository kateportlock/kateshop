const User = require('../models/users');

const getUsers = async (req, res) => {

	try {
		const users = await User.find()
		res.send(users)
	} catch {
		res.status(404)
		res.send({ error: "User list is not found" })
	}

}

const getUser = async (req, res) => {

	try {
		const { email } = req.query;
		const user = await User.findOne({ email: email })
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User is not found" })
	}

}

const getUserAdmin = async (req, res) => {

	try {
		const id = req.params.id;
		const user = await User.findOne({ _id: id })
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User is not found" })
	}

}

const addUser = async (req, res) => {

	const user = await User.findOne({ email: req.body.email })

	try {

		if (!user) {
			const user = new User({
				name: req.body.name,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				role: 'user'
			})
			req.session.user = user
			await user.save()
			res.send(user)
		}

	} catch {
		res.send({ error: "Can't add this user" })
	}
}

const updateUser = async (req, res) => {

	const user = await User.findOne({ _id: req.params.id });

	try {

		if (Object.keys(user).length !== 0) {
			if (req.body.name) {
				user.name = req.body.name
			}
			if (req.body.lastName) {
				user.lastName = req.body.lastName
			}
			if (req.body.email) {
				user.email = req.body.email
			}
			if (req.body.password) {
				user.password = req.body.password
			}
			await user.save()
			res.send(user)
		}

	} catch {
		res.status(404)
		res.send({ error: "Can't update this user" })
	}

}

const updateUserAdmin = async (req, res) => {

	const user = await User.findOne({ _id: req.params.id });
	const { name, lastName, email, role } = req.body.params;

	try {

		if (Object.keys(user).length !== 0) {
			user.name = name;
			user.lastName = lastName;
			user.email = email;
			user.role = role;
			await user.save()
			res.send(user)
		}

	} catch {
		res.status(404)
		res.send({ error: "Can't update this user" })
	}

}

const deleteUser = async (req, res) => {

	try {
		await User.deleteOne({ _id: req.query.id })

		const users = await User.find()
		res.send(users)

	} catch {
		res.status(404)
		res.send({ error: "Can't delete this user" })
	}
}


module.exports = { getUsers, getUser, getUserAdmin, addUser, updateUser, updateUserAdmin, deleteUser };