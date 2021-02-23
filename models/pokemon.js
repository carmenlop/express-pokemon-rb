'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
=======
      models.pokemon.belongsToMany(models.user, { through: "usersPokemons" })
>>>>>>> submain
    }
  };
  pokemon.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pokemon',
  });
  return pokemon;
};