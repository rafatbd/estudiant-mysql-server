'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estudiant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  estudiant.init({
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
    vivenda: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    poblacio:  {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    carrera:  {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    tipus_estudi:  {
    	allowNull: false,
    	type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'estudiant',
  });
  return estudiant;
};