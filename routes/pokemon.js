const db = require('../models');
const express = require ("express")
const router = express.Router()
router.use(express.static(__dirname + "/public/"))
const isLoggedIn = require('../middleware/isLoggedIn')
// router.use(methodOverride("_method")) 

// GET shows current team
router.get('/', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        foundUser.getPokemons().then(function(foundPokemons) {
            res.render('userTeam/show.ejs', { pokemons: foundPokemons })
        })
    })
})

// GET show add pokemon page
router.get('/add', (req, res) => {
    res.render('userTeam/add.ejs')
})

// POST adds to usersPokemons model and adds notes, redirects back to pokemon team page
router.post('/', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        db.pokemon.findOne ({
            where: {
                name: req.body.pokemonName
            }
        }).then((foundPokemon) => {
            foundUser.addPokemon(foundPokemon).then((relationInfo) => {
                db.usersPokemons.update({
                    note: req.body.pokemonNotes
                }, { where: {
                    pokemonId: relationInfo[0].dataValues.pokemonId
                }
                })
                res.redirect('/pokemon')
            })
        })
        })
})

// GET shows EDIT page
router.get('/edit/:id', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        foundUser.getPokemons().then((foundPokemons) => {
            db.pokemon.findOne({
                where: { id: req.params.id }
            }).then((foundPokemon) => {
                // console.log(foundPokemons)
                // console.log(foundPokemon)
                res.render('userTeam/edit.ejs', { pokemons: foundPokemons, pokemonInfo: foundPokemon })
            })
        })
    })
})

// POST edits usersPokemons notes and redirects back to pokemon team page
router.post('/edit/:id', isLoggedIn, (req, res) => {
    db.usersPokemons.update({
        note: req.body.pokemonNotes 
    },  { where: {
                userId: req.user.dataValues.id,
                pokemonId: req.params.id
            }
        }).then(info => {
            res.redirect('/pokemon')
        })

})



// delete pokemon
// router.delete('/:id', isLoggedIn, (req, res) => {
//     db.user.findOne ({
//         where: {id: req.user.dataValues.id}
//     }).then((foundUser) => {
//         foundUser.getPokemons().then(function(foundPokemons) {
//     db.usersPokemons.destroy({
//       where: { id: req.params.id }
//     }).then(function() {
//       res.redirect('/')
//     })
//   })
// })  


module.exports = router;