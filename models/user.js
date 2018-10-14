module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: type.STRING,
	    password: type.STRING,
	    authorization: type.BOOLEAN
    });
}
