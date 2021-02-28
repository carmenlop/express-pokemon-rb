const db = require('../models');
const express = require ("express")
const router = express.Router()
const methodOverride = require('method-override')
router.use(express.static(__dirname + "/public/"))
const isLoggedIn = require('../middleware/isLoggedIn')
router.use(methodOverride("_method")) 

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
            }).catch(error => {
                req.flash('error', 'Check spelling')
                res.redirect('/pokemon/add')
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


// DELETE!!! 
router.delete('/:id', isLoggedIn, (req, res) => {
    db.usersPokemons.destroy({
        where: {
            userId: req.user.dataValues.id,
            pokemonId: req.params.id
        }
    }).then(info => {
        res.redirect('/pokemon')
    })
})


// Experiemental random add
// GET show selector page
router.get('/selector', (req, res) => {
    db.pokemon.findAll().then(foundPokemons => {
        res.render('battle/teamSelection.ejs', { pokemons: foundPokemons })
    })
})

// POST - adds random pokemon selected
router.post('/selector/:id', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        db.pokemon.findOne ({
            where: {
                id: req.params.id
            }
        }).then((foundPokemon) => {
            foundUser.addPokemon(foundPokemon).then((relationInfo) => {
                db.usersPokemons.update({
                    note: req.body.pokemonNotes
                }, { where: {
                    pokemonId: req.params.id,
                    userId: req.user.dataValues.id
                }
                })
                res.redirect('/pokemon')
            })
        })
    })
})

// GET show battle page
router.get('/battle', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        foundUser.getPokemons().then(function(foundUserPokemons) {
            db.pokemon.findAll().then(foundCpuPokemons => {
                res.render('battle/inBattle.ejs', { cpuTeam: foundCpuPokemons, playerTeam: foundUserPokemons})
            })
            //res.render('userTeam/show.ejs', { pokemons: foundPokemons })
        })
    })
})


module.exports = router;