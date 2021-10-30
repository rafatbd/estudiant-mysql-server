'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facultat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  facultat.init({
  	// id: {
   //      allowNull: false,
   //      autoIncrement: true,
   //      primaryKey: true,
   //      type: DataTypes.INTEGER
   //  },
    nom: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    direccio:  {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    universitat:  {
    	allowNull: false,
    	type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'facultat',
  });
  return facultat;
};