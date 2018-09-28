const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		categories: data.categories,
		products: data.products
	});
});

router.get('/categorie/:name', (req, res) => {
	let products = data.products.filter((item) => {
		return item.categorie == req.params.name;
	});

	res.render('index', {
		categorie: req.params.name,
		categories: data.categories,
		products: products
	});
});

router.get('/product/:id', (req, res) => {
	let product = data.products.filter((item) => {
		return item.id == req.params.id;
	});

	res.render('product', {
		categories: data.categories,
		product: product[0]
	});
});


router.post('/checkout', (req, res) => {
	console.log(req.body.shoppingList);
});

module.exports = router;