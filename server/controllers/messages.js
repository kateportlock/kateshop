const Message = require('../models/messages');

const getMessagesAdmin = async (req, res) => {

	try {
		const messages = await Message.find()
		res.send(messages)
	} catch {
		res.status(404)
		res.send({ error: "Message list is not found" })
	}

}

const getMessageAdmin = async (req, res) => {

	try {
		const id = req.params.id;
		const message = await Message.findOne({ _id: id })
		res.send(message)
	} catch {
		res.status(404)
		res.send({ error: "Message is not found" })
	}

}

const addMessageAdmin = async (req, res) => {

	const { type, backgroundUrl, textColor, textPosition, textWeight, content, visibility } = req.body.params;

	try {

		const newMessage = new Message({
			type: type,
			backgroundUrl: backgroundUrl,
			textColor: textColor,
			textPosition: textPosition,
			textWeight: textWeight,
            content: content,
			visibility: visibility
		})

		newMessage.save();
		res.send(newMessage);

	} catch {
		res.send({ error: "Can't add this message" })
	}
}

const updateMessageAdmin = async (req, res) => {

	const message = await Message.findOne({ _id: req.params.id });
	const { type, backgroundUrl, textColor, textPosition, textWeight, content, visibility } = req.body.params;

	try {

		if (Object.keys(message).length !== 0) {
			message.type = type;
            message.backgroundUrl = backgroundUrl;
			message.textColor = textColor;
			message.textPosition = textPosition;
			message.textWeight = textWeight;
            message.content = content;
            message.visibility = visibility;
			await message.save()
			res.send(message)
		}

	} catch {
		res.status(404)
		res.send({ error: "Can't update this message" })
	}

}

const deleteMessageAdmin = async (req, res) => {
	try {
		await Message.deleteOne({ _id: req.query.id })
		
		const messages = await Message.find();
		res.send(messages);
	} catch {
		res.status(404)
		res.send({ error: "Can't delete this message" })
	}
}


module.exports = { getMessagesAdmin, getMessageAdmin, addMessageAdmin, updateMessageAdmin, deleteMessageAdmin };