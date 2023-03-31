const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");
//const nodemailer = require('nodemailer');
require("dotenv").config();

const MAX_AGE = 1000 * 60 * 60 * 3 // 3 hours session

const mongoDBstore = new MongoDBStore({
	uri: process.env.ATLAS_URI,
	collection: 'sessions',
})

//Email sending logic below - ignore for now - pls don't comment out !!

// let transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		type: "OAuth2",
// 		user: process.env.EMAIL,
// 		pass: process.env.WORD,
// 		clientId: process.env.OAUTH_CLIENTID,
// 		clientSecret: process.env.OAUTH_CLIENT_SECRET,
// 		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
// 	},
// });

// let mailOptions = {
// 	from: "test@gmail.com",
// 	to: process.env.EMAIL,
// 	subject: "Nodemailer API",
// 	text: "Hi from your nodemailer API",
// };

// transporter.sendMail(mailOptions, function (err, data) {
// 	if (err) {
// 		console.log("Error " + err);
// 	} else {
// 		console.log("Email sent successfully");
// 	}
// });


mongoose
	.connect(process.env.ATLAS_URI, { useNewUrlParser: true })
	.then(() => {
		const app = express();
		app.use(express.json());
		app.use(cors({
			origin: true,
			credentials: true,
			optionsSuccessStatus: 200
		}));
		app.use(session({
			secret: 'a1s2d3f4g5h6',
			name: 'session-id',
			store: mongoDBstore,
			cookie: {
				maxAge: MAX_AGE,
				sameSite: false,
				secure: false,
			},
			resave: false,
			saveUninitialized: false,
		}))
		app.use(cookieParser());
		app.use("/api", routes);
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
