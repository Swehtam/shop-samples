const express = require('express');
const crud = require('../lib/crud');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

router.get('/', (req, res) => {
	crud.getAllCategories().then((value) => {
		res.render('admin', {
			categories: value
		})
	})
})

router.post('/categorie/create', (req, res) => {
	crud.createCategorie(req.body.name)
	res.redirect('/');
})

router.post('/categorie/update', (req, res) => {
	crud.updateCategorie(req.body.id, req.body.name);
	res.redirect('/');
})

router.post('/product/create', (req, res) => {
	console.log(req);
	let img = req.file.img;
 
	img.mv('./static/images/filename.jpg', function(err) {
		if (err) return res.status(500).send(err);
	 
	    res.send('File uploaded!');
	});
    
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
		req.body.img, req.body.categorie
		)
})


module.exports = router;
