const express = require('express');
const crud = require('../lib/crud');
const router = express.Router();

router.get('/', (req, res) => {
	crud.getAllCategories().then((categories) => {
		crud.getAllProducts().then((products) => {
			res.render('index', {
				categories: categories,
				products: products
			})
		})
	})
});

router.get('/category/:catid', (req, res) => {
	crud.getAllCategories().then((categories) => {
		crud.getCategoryById(req.params.id).then((category) => {
			crud.getProductsByCategory(req.params.catid).then((products) => {
				res.render('index', {
					category: category[0].catName,
					categories: categories,
					products: products
				})
			})
		})
	});
});

router.get('/product/:prodid', (req, res) => {
	crud.getAllCategories().then((categories) => {
		crud.getProductById(req.params.prodid).then((product) => {
			res.render('product', {
				categories: categories,
				product: product[0]
			})
		})
	})
});

router.post('/checkout', (req, res) => {
	console.log(req.body.shoppingList);
});

module.exports = router;