const express = require('express');
const model = require('../models');
const router = express.Router();

router.get('/add/:prodid', async (req, res) => {
	let found = false;

	req.session.cart.forEach(product => {
		if(product.id == req.params.prodid){
			product.quantity++;
			found = true;
		}
	});

	if(!found){
		let prod = await model.product.findById(req.params.prodid, {
  			attributes: ['prodId', 'prodName', 'price', 'img']
		});

		req.session.cart.push({
			name: prod.prodName,
			price: prod.price,
			img: prod.img,
			quantity: 1,
			id: prod.prodId
		});
	}

	req.session.total = getTotal(req);
	res.render('cart', {
		cart: req.session.cart,
		total: req.session.total
	});
});

router.get('/remove/:prodid', (req, res) => {
	req.session.cart = req.session.cart.filter(product => {
		return product.id != req.params.prodid;
	});

	req.session.total = getTotal(req);
	res.render('cart', {
		cart: req.session.cart,
		total: req.session.total
	});
});

function getTotal(req){
	let total = 0;
	req.session.cart.forEach(product => {
		total += product.price * product.quantity;
	});
	return total.toFixed(2);
}

module.exports = router;