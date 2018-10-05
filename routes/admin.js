const express = require('express');
const crud = require('../lib/crud');
const router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: './static/images/' })

router.get('/', async (req, res) => {
	let categories = await crud.getAllCategories();
	let products = await crud.getAllProducts();

	res.render('admin', {
		categories: categories,
		products: products
	})
})

router.post('/category', (req, res) => {
	crud.createCategory(req.body.name)
	res.redirect('/');
})

router.put('/category', (req, res) => {
	crud.updateCategory(req.body.id, req.body.name);
	res.redirect('/');
})

router.delete('/category/:id', (req, res) => {
	crud.deleteCategory(req.params.id);
	res.redirect('/');
})

router.post('/product', upload.single('img'), (req, res) => {
	res.redirect('/admin')

	crud.createProduct(
		req.body.name, req.body.price,
		req.body.description, req.body.img,
		req.body.category
		)
	res.redirect('/');
})

router.put('/product', (req, res) => {
	crud.updateProduct(
		req.body.id, req.body.name, 
		req.body.price, req.body.description, 
		req.body.img, req.body.categorie
		)
	res.redirect('/');
})

router.delete('/product/:id', (req, res) => {
	crud.deleteProduct(req.params.id);
	res.redirect('/');
})



module.exports = router;
