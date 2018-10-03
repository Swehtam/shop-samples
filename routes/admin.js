const express = require('express');
const crud = require('../lib/crud');
const router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: './static/images/cu/' })

router.get('/', (req, res) => {
	crud.getAllCategories().then((value) => {
		res.render('admin', {
			categories: value
		})
	})
})

router.post('/category/create', (req, res) => {
	crud.createCategorie(req.body.name)
	res.redirect('/');
})

router.post('/category/update', (req, res) => {
	crud.updateCategorie(req.body.id, req.body.name);
	res.redirect('/');
})

router.post('/product/create', upload.single('img'), (req, res) => {
	res.redirect('/admin')

	crud.createProduct(
		req.body.name, req.body.price,
		req.body.description, req.body.img,
		req.body.category
		)
})

router.post('/categorie/update', (req, res) => {
	crud.updateProduct(
		req.body.id, req.body.name, 
		req.body.price, req.body.description, 
		req.body.img, req.body.categorie
		)
})


module.exports = router;
