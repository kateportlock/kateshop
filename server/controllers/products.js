const Product = require('../models/products')

const getProducts = async (req, res) => {

	try {

		if (req.query.type) {
			const products = await Product.find()
			res.send(products)
		} else {
			const products = await Product.find({ visibility: true })
			res.send(products)
		}
	} catch {
		res.status(404)
		res.send({ error: "Products list is empty" })
	}
}

const addProductAdmin = async (req, res) => {

	try {

		const { img, title, desc, price, totalStock, visibility } = req.body.params;
		const products = await Product.find();

		const newProduct = new Product({
			img: img,
			desc: desc,
			price: price,
			totalStock: totalStock,
			title: title,
			visibility: visibility,
			index: products.length
		})

		newProduct.save();
		res.send(newProduct);

	} catch {
		res.status(404)
		res.send({ error: "Coudnt add this product" })
	}
}

const cloneProductAdmin = async (req, res) => {

	try {

		const product = await Product.find({ _id: req.body.params.id }).select("-_id");
		const products = await Product.find();

		const clonedProduct = new Product({
			img: product[0].img,
			desc: product[0].desc,
			price: product[0].price,
			totalStock: product[0].totalStock,
			title: product[0].title,
			visibility: product[0].visibility,
			index: products.length
		})

		clonedProduct.save();
		res.send(clonedProduct._id)

	} catch {
		res.status(404)
		res.send({ error: "Can't clone this product" })
	}
}

const deleteProductAdmin = async (req, res) => {

	try {

		await Product.deleteOne({ _id: req.query.id })

		const products = await Product.find()
		res.send(products)

	} catch {
		res.status(404)
		res.send({ error: "Can't delete this product" })
	}
}

const getProduct = async (req, res) => {

	try {

		const product = await Product.find({ _id: req.params.id })
		res.send(product)

	} catch {
		res.status(404)
		res.send({ error: "Can't find this product" })
	}
}

const updateProductAdmin = async (req, res) => {

	try {

		const product = await Product.findOne({ _id: req.params.id });
		const { img, title, desc, price, totalStock, visibility } = req.body.params;

		if (Object.keys(product).length !== 0) {
			product.img = img
			product.title = title
			product.desc = desc
			product.price = price
			product.totalStock = totalStock
			product.visibility = visibility
			await product.save()
			res.send(product)
		}

	} catch {
		res.status(404)
		res.send({ error: "Can't update this product" })
	}

}

const updateProductIndexAdmin = async (req, res) => {

	const index = req.body.params.index;
	const direction = req.body.params.direction;
	const curProduct = await Product.findOne({ _id: req.body.params.id });
	const prevProduct = await Product.findOne({ index: index - 1 });
	const nextProduct = await Product.findOne({ index: index + 1 });

	try {

		if (direction === 'up') {

			curProduct.index = index - 1;
			prevProduct.index = index;
			await curProduct.save();
			await prevProduct.save();

		}

		if (direction === 'down') {
			curProduct.index = index + 1;
			nextProduct.index = index;
			await curProduct.save();
			await nextProduct.save();
		}

		const products = await Product.find();
		res.send(products)

	} catch {
		res.status(404)
		res.send({ error: "Can't update index of this product" })
	}
}

module.exports = { getProducts, getProduct, addProductAdmin, updateProductAdmin, updateProductIndexAdmin, cloneProductAdmin, deleteProductAdmin };