'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class desplacament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      desplacament.belongsTo(models.estudiant,
        {
            as: 'estudiant',
            foreignKey: 'estudiant_id',
        }
      );
      desplacament.belongsTo(models.facultat,
        {
            as: 'facultat',
            foreignKey: 'facultat_id',
        }
      );
    }
  };
  desplacament.init({
    estudiant_id: DataTypes.INTEGER,
    facultat_id: DataTypes.INTEGER,
    distancia: DataTypes.STRING,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'desplacament',
  });
  return desplacament;
};