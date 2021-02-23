'use strict';
const db = require("../models")
const axios = require("axios");


// for (let i = 1; i < 152; i++){
//   console.log(i)
//   const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + i
//   axios.get(pokemonUrl)
//     .then(function(apiInfo) {
//       const pokemon = apiInfo.data
//       console.log(pokemon.name)
      
//     })
//   // fetch("https://pokeapi.co/api/v2/pokemon/" + i)
//   //     .then(function(data){ 
//   //         //console.log(data, "data")
//   //         return data.json() 
//   //     })
//   //     .then(function(parsedData){ 
//   //         const posts = parsedData
//   //         //console.log(posts)
//   //         pokemonList(posts);   
//   //     })
//     }
  
  module.exports = {
    
    up: async (queryInterface, Sequelize) => {
  
      await db.sequelize.sync({force: true});
      console.log('All models synced');
  
  
      //Delete and empty table
      await queryInterface.bulkDelete('pokemons', null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
      });
      
      
      for (let i = 1; i < 152; i++) {

        console.log(i + " i check")
        const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + i
        axios.get(pokemonUrl)
          .then(function(apiInfo) {
            const pokemon = apiInfo.data
            console.log(pokemon.name + " " + i)
            
          
  
      
      // Populate pokemon table
      const bulkPokemons =  queryInterface.bulkInsert('pokemons', [
        
        {name: pokemon.name,
        imageUrl: pokemon.sprites.front_default,
        hp: pokemon.stats[0].base_stat ,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat ,
        createdAt: new Date(),
        updatedAt: new Date(),
        pokemonNumber: pokemon.id
        },
        
      ], {returning: true})
      console.log("bulk insert: ", bulkPokemons);
    
  
    })}},
    
    down: async (queryInterface, Sequelize) => {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
    }
  }
  





