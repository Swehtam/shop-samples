module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
        	type: type.STRING,
        	primaryKey: true
        },
	    password: type.STRING,
	    authorization: type.BOOLEAN
    });
}
