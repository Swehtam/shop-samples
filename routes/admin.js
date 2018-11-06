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

router.get('/', isAuthenticated, async (req, res) => {
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
		user: req.user,
		token: req.csrfToken(),
		helpers: {
       		ifEquals:  function(arg1, arg2, options) {
    			return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
			}
    }});
})

router.post('/category/create', async (req, res) => {
	await category.create({
		catName: req.body.name
	});

	res.redirect('/admin');
});

router.get('/category/edit/:catid', async (req, res) => {
	await category.update(
		{ catName: req.body.name },
		{ where: { catId: req.params.catid } }
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
        img: req.file.filename,
        catId: req.body.category
	})
	
	res.redirect('/admin');
});

router.post('/product/edit/:prodid', upload.single('img'), async (req, res) => {
	if(req.file){
		await product.update({
			prodName: req.body.name,
	       	price: req.body.price,
	       	description: req.body.description,
	        img: req.file.filename,
	        catId: req.body.category },
			{ where: {prodId: req.params.prodid} }
  		);
	} else {
		await product.update({
			prodName: req.body.name,
	       	price: req.body.price,
	       	description: req.body.description,
	        catId: req.body.category },
			{ where: {prodId: req.params.prodid} }
  		);
	}
	
	res.redirect('/admin');
});

router.get('/product/delete/:prodid', async (req, res) => {
	await product.destroy({
		where: {prodId: req.params.prodid}
	});

	res.redirect('/admin');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) { 
    	if(req.user.authorization) return next(); 
    	else res.redirect('/');
    }
    else { res.redirect('/login'); }
}

module.exports = router;
