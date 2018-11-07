const express = require('express');
const model = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
	let categories = model.category.findAll();
	let products = model.product.findAll({
		include: [{
			model: model.category,
			attributes: ['catName']
		}]
	});

	let result = await Promise.all([categories, products]);

	res.render('index', {
		categories: result[0],
		products: result[1],
		user: req.user,
		token: req.csrfToken()
	});
});

router.get('/category/:catid', async (req, res) => {
	let categories = model.category.findAll();
	let category = model.category.findById(req.params.catid);
	let products = model.product.findAll({ 
		where: {catId: req.params.catid} 
	});

	let result = await Promise.all([categories, category, products]);

	res.render('index', {
		categories: result[0],
		category: result[1].catName,
		products: result[2],
		user: req.user,
		token: req.csrfToken()
	})
});

router.get('/product/:prodid', async (req, res) => {
	let categories = model.category.findAll();
	let product = model.product.findById(req.params.prodid, {
		include: [{
			model: model.category,
			attributes: ['catName']
		}]
	});

	let result = await Promise.all([categories, product]);

	res.render('product', {
		categories: result[0],
		product: result[1],
		user: req.user,
		token: req.csrfToken()
	})
});

//shopping cart handler
router.get('/retrieve/:prodid', async (req, res) => {
	let product = await model.product.findById(req.params.prodid, {
  		attributes: [['prodName', 'name'], 'price', 'img']
	});
	
	res.send(product);
});

router.get('/checkout', isAuthenticated, (req, res) => {
	res.render('checkout', {
		user: req.user
	});
});

router.get('/checkout/confirm', isAuthenticated, (req, res) => {
	res.redirect('/');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) { return next(); } 
    else { res.redirect('/login'); }
}

module.exports = router;