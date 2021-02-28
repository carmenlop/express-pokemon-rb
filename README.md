# Pokemon Team Builder
An application where a user can create a profile and build a team with their battle ready pokemon, once their team is built the user is able to look at their individual pokemon’s stats and add/delete members to their pokemon team. There is a feature where the user can get a random Pokemon to display and they decide if they want to add the Pokemon to their team or skip to the next random Pokemon. Users can also add/edit notes for each Pokemon.

## Link to application


## Screenshots
![screenshot](/public/assets/page_1.jpg)
![screenshot](/public/assets/page_2.jpg)
![screenshot](/public/assets/page_3.jpg)
![screenshot](/public/assets/page_4.jpg)
![screenshot](/public/assets/page_5.jpg)
![screenshot](/public/assets/page_6.jpg)

## Technologies Used
* Javascript
* CSS
* HTML
* Boostrap 
* Sequelize
* Node.JS with the following dependencies: 
    * Express 
    * Axios
    * bcrypt
    * ejs
    * method override

## Installation Instructions 
#### 1. Create a new repo on Github and fork/clone this repository 

#### 2. Install node modules from the package.json by running `npm install`. 

#### 3. Make a .env file and add a session secret formatted the following way `SESSION_SECRET= `

#### 4. Edit your config file (if necessary) with user name, password, and database information.

#### 5. Create database by running `createdb express_pokemon_rb`. Run `sequelize db:seed --seed seeders/20210223220429-pokemonInfo.js` to fill models with data. 


## User Stories
* As a user I want to build my pokemon team with the ability to save it onto my profile. 
* As a user I want to add notes to invidual team members and be able to edit them. 
* As a user I want to add and delete team members. 
* As a user I want to be able to signup, login and logout of my profile. 


## Wireframes
![screenshot](/public/assets/home_page.jpg)
![screenshot](/public/assets/first_round.jpg)
![screenshot](/public/assets/round_2.jpg)
![screenshot](/public/assets/search_and_add.jpg)
![screenshot](/public/assets/choose_by_type.jpg)

## Unsolved Problems
Looking forward to improving our CSS skills! 

## Planned Features 
We plan to create a game that will allow users to battle a computer generated pokemon team. We'd also like to add a page that shows users their battle history to see their stats. 