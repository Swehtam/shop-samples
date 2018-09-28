const mysql = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
    user        : config.database.USERNAME,
    password    : config.database.PASSWORD,
    database    : config.database.DATABASE,
    host        : config.database.HOST,
});

function createCategorie(name){
    let insert = `INSERT INTO categories(name) VALUES ("${name}")`;
    console.log(insert);
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function updateCategorie(id, name){
    let update = `UPDATE categories SET name = "${name}" WHERE catid = ${id}`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function deleteCategorie(id){
    let update = `DELETE FROM categories SET name = ${name} WHERE catid = ${id}`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function getCategorieId(name){
    let select = `SELECT catid FROM categories WHERE name = ${name}`;
    pool.query(select, (err, result, fields) => {
        if (err) throw err;
        else return result[0];
    })
}

function getAllCategories(){
    let select = `SELECT * FROM categories`;
    pool.query(select, (err, result, fields) => {
        if (err) throw err;
        return result;
    })
}

function createProduct(name, price, description, img, cat){
    let insert =    `SET @catid =(SELECT catid FROM categories WHERE name = ${cat});
                    INSERT INTO products(name, price, description, catid) 
                    VALUES (${name}, ${price}, ${description}, ${img}, @catid})`;
    pool.query(insert, (err, result, fields) => {
        if (err) throw err;
    })
}

function updateProduct(pid, name, price, description, img, cat){
    let update =    `SET @catid =(SELECT catid FROM categories WHERE name = ${cat});
                    UPDATE products SET name = ${name}, price = ${price}, 
                    description = ${description}, img = ${img}, catid = @catid 
                    WHERE pid = ${pid}`;
    pool.query(update, (err, result, fields) => {
        if (err) throw err;
    })
}

function getProductsByCategorie(cat){
    let select =    `SET @catid =(SELECT catid FROM categories WHERE name = ${cat});
                    SELECT * FROM products WHERE catid = @catid;`;

    pool.query(select, (err, result, fields) => {
        if (err) throw err;
        else return results;
    })
}

module.exports = {
    createCategorie,
    updateCategorie,
    getAllCategories,
    createProduct,
    updateProduct,
    getProductsByCategorie,
}