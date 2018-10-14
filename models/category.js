module.exports = (sequelize, type) => {
    return sequelize.define('category', {
        catId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        catName: type.STRING
    });
}
