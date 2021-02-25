const db = require('./models')

// db.pokemon.create({
//     name: 'bulbasaur',
//     imageUrl: 'urltest',
//     hp: 50,
//     attack: 50, 
//     defense: 50,
// }).then(function(pokemon) {
//     console.log(pokemon.id)
// })

// db.pokemon.findOne({
//     where: { id: 3 }
// }).then(function(foundPokemon) {
//     db.user.findOne({
//         where: { id: 1 }
//     }).then(function(foundUser) {
//         foundPokemon.addUser(foundUser).then(function(){
//             console.log('done!')
//         })
//     })
// })