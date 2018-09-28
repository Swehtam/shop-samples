const express = require('express');
const crud = require('../lib/crud');
const router = express.Router();

router.get('/', (req, res) => {
	console.log(crud.getAllCategories())

	res.render('admin', {
		categories: crud.getAllCategories()
	})
})

router.post('/categorie/create', (req, res) => {
	crud.createCategorie(req.body.name)
})

router.post('/categorie/update', (req, res) => {
	crud.updateCategorie(req.body.id, req.body.name)
})

router.post('/product/create', (req, res) => {
	crud.createProduct(
		req.body.name, req.body.price,
		req.body.description, req.body.img,
		req.body.categorie
		)
})

router.post('/categorie/update', (req, res) => {
	crud.updateProduct(
		req.body.id, req.body.name, 
		req.body.price, req.body.description, 
		req.body.img, req.body.categorie)
})


module.exports = router;
