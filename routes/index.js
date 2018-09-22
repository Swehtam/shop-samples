const express = require('express');
const fs = require('fs');
const router = express.Router();

const data = JSON.parse(fs.readFileSync('data/products.json'));

router.get('/', (req, res) => {
	res.render('index', {
		categories: data.categories,
		products: data.products
	});
});

router.get('/product/:id', (req, res) => {
	let product;

	data.products.forEach((item) => {
		if(item.id == req.params.id)
			product = item;
	});

	res.render('product', {
		categories: data.categories,
		product: product
	});
	
});

module.exports = router;