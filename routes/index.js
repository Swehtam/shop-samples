const express = require('express');
const { category, product, user } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
	let cats = category.findAll();
	let prod = product.findAll({
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	let result = await Promise.all([cats, prod])

	res.render('index', {
		categories: result[0],
		products: result[1],
		token: req.csrfToken()
	})
});

router.get('/category/:catid', async (req, res) => {
	let cats = category.findAll();
	let cat = category.findById(req.params.catid);
	let prod = product.findAll({ where: {catId: req.params.catid} });

	let result = await Promise.all([cats, cat, prod]);

	res.render('index', {
		categories: result[0],
		category: result[1].catName,
		products: result[2],
		token: req.csrfToken()
	})
});

router.get('/product/:prodid', async (req, res) => {
	let cats = category.findAll();
	let prod = product.findById(req.params.prodid, {
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	let result = await Promise.all([cats, prod]);

	res.render('product', {
		categories: result[0],
		product: result[1],
		token: req.csrfToken()
	})
});

router.post('/checkout', (req, res) => {
	console.log(req.body.shoppingList);
});

module.exports = router;