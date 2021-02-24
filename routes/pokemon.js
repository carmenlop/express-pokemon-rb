const db = require('../models');
const express = require ("express")
const router = express.Router()
router.use(express.static(__dirname + "/public/"))
const isLoggedIn = require('../middleware/isLoggedIn')


router.get('/', isLoggedIn, (req, res) => {
    // res.send("Hello")
    db.user.findOne ({
        where: {id: req.user.dataValues.id}
    }).then((foundUser) => {
        foundUser.getPokemons().then(function(foundPokemons) {
            res.render('userTeam/show.ejs', { pokemon: foundPokemons })
        })
    })
})

module.exports = router