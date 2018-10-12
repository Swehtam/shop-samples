const express = require('express');
const { category, product } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
	let categories = await category.findAll();
	let products = await product.findAll({
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	res.render('index', {
		categories: categories,
		products: products
	})
});

router.get('/category/:catid', async (req, res) => {
	let categories = await category.findAll();
	let category = await category.findById(req.params.catid);
	let products = await product.getAll({ where: {catId: req.params.catid} });

	res.render('index', {
		category: category[0].catName,
		categories: categories,
		products: products
	})
});

router.get('/product/:prodid', async (req, res) => {
	let categories = await category.findAll();
	let prod = await product.findById(req.params.prodid, {
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	console.log(prod);

	res.render('product', {
		categories: categories,
		product: prod
	})
});

router.post('/checkout', (req, res) => {
	console.log(req.body.shoppingList);
});

module.exports = router;