const express = require('express');
const { category, product, user } = require('../models');
const router = express.Router();

const multer  = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './static/images/products/');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
	let cats = category.findAll();
	let prod = product.findAll({
		include: [{
			model: category,
			attributes: ['catName']
		}]
	});

	let result = await Promise.all([cats, prod])

	res.render('admin', {
		categories: result[0],
		products: result[1],
		token: req.csrfToken()
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

	res.redirect('/admin');
});

module.exports = router;
