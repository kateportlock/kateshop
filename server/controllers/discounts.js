const Discount = require('../models/discounts')

const getDiscounts = async (req, res) => {
	try {
		const discounts = await Discount.find()
		res.send(discounts)
	} catch {
		res.status(404)
		res.send({ error: "Discounts list is empty" })
	}
}

const getDiscountAdmin = async (req, res) => {
	try {
		const id = req.params.id;
		const discount = await Discount.find({ _id: id })
		res.send(discount)
	} catch {
		res.status(404)
		res.send({ error: "Couldn't find this discount" })
	}
}

const addDiscountAdmin = async (req, res) => {
	try {

		const { code, discountAmount, discountType, minimumSpend, isUnique, notes } = req.body.params;

		const newDiscount = new Discount({
			code: code,
			discount: discountAmount,
			discountType: discountType,
			minimumSpend: minimumSpend,
			isUnique: isUnique,
			notes: notes
		})

		newDiscount.save();
		res.send(newDiscount);

	} catch {
		res.status(404)
		res.send({ error: "Coudnt add this discount" })
	}
}

const deleteDiscountAdmin = async (req, res) => {

	console.log(req.params.id)
	try {
		await Discount.deleteOne({ _id: req.query.id })

		const discounts = await Discount.find();
		res.send(discounts);
	} catch {
		res.status(404)
		res.send({ error: "Can't delete this discount" })
	}
}


const updateDiscountAdmin = async (req, res) => {
	const discount = await Discount.findOne({ _id: req.params.id });
	const { discountAmount, discountType, minimumSpend, isUnique, notes } = req.body.params;

	try {

		if (Object.keys(discount).length !== 0) {
			discount.discount = discountAmount;
			discount.discountType = discountType;
			discount.minimumSpend = minimumSpend;
			discount.isUnique = isUnique;
			discount.notes = notes;
			await discount.save()
			res.send(discount)
		}

	} catch {
		res.status(404)
		res.send({ error: "Can't update this discount" })
	}
}

module.exports = { getDiscounts, getDiscountAdmin, deleteDiscountAdmin, addDiscountAdmin, updateDiscountAdmin };