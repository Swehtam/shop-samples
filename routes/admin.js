const express = require('express');
const { category, product } = require('../models');
const router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: './static/images/teste/' })

router.get('/', async (req, res) => {
	let categories = await category.findAll();
	let products = await product.findAll({
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	res.render('admin', {
		categories: categories,
		products: products
	});
})

router.post('/category/create', async (req, res) => {
	await category.create({
		catName: req.body.name
	});

	res.redirect('/admin');
});

router.put('/category/update', async (req, res) => {
	await category.update(
		{ catName: req.body.name },
		{ where: { catId: req.body.id } }
  	);

	res.redirect('/admin');
});

router.get('/category/delete/:catid', async (req, res) => {
	await category.destroy({
		where: {catId: req.params.catid}
	});

	res.redirect('/admin');
});

router.post('/product/create', upload.single('img'), async (req, res) => {
	console.log(`BODY:`);
	console.log(req.body);
	console.log(`FILE:`);
	console.log(req.body);

	await product.create({
		prodName: req.body.name,
       	price: req.body.price,
       	description: req.body.description,
        img: req.body.img,
        catId: req.body.category
	})
	
	res.redirect('/admin');
});

router.put('/product/update', async (req, res) => {
	await product.update({
		prodName: req.body.name,
       	price: req.body.price,
       	description: req.body.description,
        img: req.body.img,
        catId: req.body.category },
		{ where: req.body.id }
  	);

	res.redirect('/admin');
});

router.delete('/product/delete/:id', async (req, res) => {
	await product.destroy({
		where: {prodId: req.params.id}
	});
});

module.exports = router;
