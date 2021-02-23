'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersPokemons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usersPokemons.init({
    userId: DataTypes.INTEGER,
    pokemonId: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'usersPokemons',
  });
  return usersPokemons;
};