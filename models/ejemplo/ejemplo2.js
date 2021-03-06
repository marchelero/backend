'use strict';
module.exports = (sequelize, DataTypes) =>  {
	const  Ejemplo = sequelize.define('ejemplo', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'nombre'
		},
		detalle: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'detalle'
		}
	}, {
		tableName: 'ejemplo',
	//	timestamps: false
	});
	return Ejemplo;
};
