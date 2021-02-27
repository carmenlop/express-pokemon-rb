'use strict';
const db = require("../models")
const axios = require("axios");
const bcrypt = require("bcrypt");


  module.exports = {
    
    up: async (queryInterface, Sequelize) => {
  
      await db.sequelize.sync({force: true});
      console.log('All models synced');
  
      //Delete and empty table pokemons
      await queryInterface.bulkDelete('pokemons', null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
      });

      //Delete and empty table users
      await queryInterface.bulkDelete('users', null, {
        truncate: true, 
        cascade: true, 
        restartIdentity: true
      });
      
      const pk = 200
      for (let i = 1; i < pk; i++) {
        console.log(i + " i check")
        const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + i
        await axios.get(pokemonUrl)
          .then(function(apiInfo) {
            const pokemon = apiInfo.data
            console.log(pokemon.name + " " + i)
            
            // Populate pokemon table
            const bulkPokemons = queryInterface.bulkInsert('pokemons', [
              
              {
                name: pokemon.name,
                imageUrl: pokemon.sprites.other.dream_world.front_default,
                hp: pokemon.stats[0].base_stat ,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat ,
                createdAt: new Date(),
                updatedAt: new Date(),
                pokemonNumber: pokemon.id
              },
            ], {returning: true})
            console.log("bulk pokemons insert: ", bulkPokemons);
            
            if (i === (pk -1)) {
              
            }
        })
      }

      // Populate users table with users
      const bulkUsers = queryInterface.bulkInsert('users', [ 
        {
          email: "dtest@test.com",
          name: "Devin",
          password: bcrypt.hashSync('password', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "jtest@test.com",
          name: "Jelleny",
          password: bcrypt.hashSync('password', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "ctest@test.com",
          name: "Carmen",
          password: bcrypt.hashSync('password', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {returning: true})
      console.log("Bulk users insert: ", bulkUsers)
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
  





