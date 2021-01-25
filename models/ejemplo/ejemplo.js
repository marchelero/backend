'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ejemplo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ejemplo.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ejemplo',
  });
  return ejemplo;
};