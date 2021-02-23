'use strict';
const db = require("../models")
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await db.sequelize.sync({force: true});
    console.log('All models synced');


    // Delete and empty table
    await queryInterface.bulkDelete('pokemons', null, {
      truncate: true, 
      cascade: true, 
      restartIdentity: true
    });
    
    // fetch(https://pokeapi.co/api/v2/pokemon/1)
    // .then(function(data){ 
    //     //console.log(data, "data")
    //     return data.json() 
    // })
    // .then(function(parsedData){ 
    //     const posts = parsedData
    //     //console.log(posts)
    //     pokemonList(posts);   
    // })


    
    // Populate pokemon table
    const bulkPokemons = await queryInterface.bulkInsert('pokemons', [
      
      {
        name: "Bulbasaur",
        imageUrl: "something.com",
        hp: 5,
        attack: 5,
        defense: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {returning: true})
    console.log("bulk insert: ", bulkPokemons);
  

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}

