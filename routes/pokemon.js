const db = require('../models');
const express = require ("express")
const router = express.Router()
router.use(express.static(__dirname + "/public/"))
const isLoggedIn = require('../middleware/isLoggedIn')
// router.use(methodOverride("_method")) 


router.get('/', isLoggedIn, (req, res) => {
    // res.send("Hello")
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        foundUser.getPokemons().then(function(foundPokemons) {
            // console.log(foundPokemons)
            // console.log(foundPokemons[0].dataValues.name)
            res.render('userTeam/show.ejs', { pokemons: foundPokemons })
        })
    })
})

router.get('/add', (req, res) => {
    res.render('userTeam/add.ejs')
})

router.post('/', isLoggedIn, (req, res) => {
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        db.pokemon.findOne ({
            where {
                name: req.body.pokemonName
            }
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

router.get('/edit/:id', (req, res) => {
    db.usersPokemons.update({
        note: req.body.note
        }, {
        where: { pokemonId: req.params.id }
  }).then((updatedUsersPokemons) => {
      console.log("___________")
      console.log(updatedUsersPokemons)
      res.render('userTeam/edit.ejs', { usersPokemons: updatedUsersPokemons })
  })
})


module.exports = router

