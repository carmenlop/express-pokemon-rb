const db = require('./models')

// create a pokemon
// db.pokemon.create({
//     name: 'pikachu',
//     imageURL: 'urltest',
//     hp: 50,
//     attack: 50,
//     defense: 50
// }).then(function(pokemon){
//     console.log(pokemon.id)
// })

// pokemon users table 
// db.pokemon.findOne ({
//     where: { id: 1 }
// }).then(function(foundPokemon) {
//    db.user.findOne({
//        where: { id: 1 }
//    }).then(function(foundUser) {
//        foundPokemon.addUser(foundUser).then(function(){
//            console.log("done!")
//        })
//    }) 
// })