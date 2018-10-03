const mysql = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
    user        : config.database.USERNAME,
    password    : config.database.PASSWORD,
    database    : config.database.DATABASE,
    host        : config.database.HOST,
});

function createCategory(name){
    let insert = `INSERT INTO categories(catName) VALUES ("${name}")`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function updateCategory(catid, name){
    let update = `UPDATE categories SET catName = "${name}" WHERE catId = ${catid}`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function deleteCategorie(catid){
    let update = `DELETE FROM categories WHERE catId = ${catid}`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function getAllCategories(){
    return new Promise((resolve, reject) => {
        let select = `SELECT * FROM categories`;
        pool.query(select, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getCategoryById(catid){
    return new Promise((resolve, reject) => {
        let select = `SELECT * FROM categories WHERE catId = ${catid}`;
        pool.query(select, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function createProduct(name, price, description, img, catid){
    let insert =    `INSERT INTO products(name, price, img, description, catId) 
                    VALUES ("${name}", ${price}, "${description}", "${img}", ${catid})`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function updateProduct(pid, name, price, description, img, catid){
    let update =    `SET @catid =(SELECT catId FROM categories WHERE prodName = ${cat});
                    UPDATE products SET name = ${name}, price = ${price}, 
                    description = ${description}, img = ${img}, catid = @catid 
                    WHERE pid = ${pid}`;
    pool.query(update, (err, result, fields) => {
        if (err) throw err;
    })
}

function getAllProducts(){
    return new Promise((resolve, reject) => {
        let select = `SELECT * FROM products`;
        pool.query(select, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getProductById(prodid){
    return new Promise((resolve, reject) => {
        let select =    `SELECT * FROM (SELECT * FROM products WHERE prodId = ${prodid}) 
                        AS product INNER JOIN categories WHERE product.catId = categories.catid`;
        pool.query(select, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function getProductsByCategory(catid){
    return new Promise((resolve, reject) => {
        let select = `SELECT * FROM products WHERE catId = ${catid}`;
        pool.query(select, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

module.exports = {
    createCategory,
    updateCategory,
    getCategoryById,
    getAllCategories,
    createProduct,
    updateProduct,
    getProductById,
    getProductsByCategory,
    getAllProducts
}