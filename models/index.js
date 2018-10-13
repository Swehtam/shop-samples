const Sequelize = require('sequelize');
const productModel = require('./product');
const categoryModel = require('./category');
const config = require('../config/default');

const sequelize = new Sequelize(
   config.database.DATABASE,
   config.database.USERNAME,
   config.database.PASSWORD, {
      host: config.database.HOST,
      dialect: config.database.DIALECT, 
      operatorsAliases: false,
      logging: false,
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      }
});

const product = productModel(sequelize, Sequelize);
const category = categoryModel(sequelize, Sequelize);
product.belongsTo(category, {foreignKey: 'catId'});

sequelize.sync({ force: false })
   .then(() => {
      /*
      category.bulkCreate([
         { catName: 'Food' },
         { catName: 'Clothes' }
      ]).then(() => {
            product.bulkCreate([{
               prodName: 'Apple',
               price: 6.5,
               description: 'Bla bla',
               img: 'apple.jpg',
               catId: 1
         }, {
               prodName: 'Pear',
               price: 3,
               description: 'Pipipi popopo',
               img: 'pear.jpg',
               catId: 1
         }]);
      });*/

      console.log('database and tables created...')
   })

module.exports = {
   product,
   category
}