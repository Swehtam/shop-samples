module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        prodId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prodName: type.STRING,
        price: type.DECIMAL(6,2),
        description: type.TEXT,
        img: type.STRING });
}
