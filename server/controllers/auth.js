const User = require('../models/users');
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    try {
        const { email, password } = req.body.params;
        const user = await User.findOne({ email: email })

        if (Object.keys(user).length !== 0) {

            try {

                const doesPasswordMatch = bcrypt.compareSync(password, user.password);

                if (doesPasswordMatch) {

                    req.session.user = user

                    return res
                        .status(200)
                        .json({ msg: 'You have logged in successfully', user })

                }

            } catch {
                res.status(404)
                res.send({ error: "Password doesn't match the record" })
            }

        }

    } catch {
        res.status(404)
        res.send({ error: "User is not found" })
    }

}

const logout = async (req, res) => {

    req.session.destroy((error) => {
        if (error) throw error

        res.clearCookie('session-id')
        res.status(200).send('Logout Success')
    })

}

const auth = async (req, res) => {

    if (req.session.user) {
        return res.json(req.session.user)
    } else {
        return res.status(401).json('unauthorize')
    }

}

module.exports = { login, logout, auth };