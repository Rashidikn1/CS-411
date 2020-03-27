# CS-411 Recipe Finder App

The purpose of this app is to search for recipes and find out which ones you can make based on what you already have in your fridge

It uses the Edamam API to find recipes and the Nutritionix API to calculate nutritional info based on the ingredients


### Team Members

 - Rashid
 - Daniel
 - Marcus
 - Kenneth
 - Janice


## Running the App

In order to run the server, use the terminal to cd into the backend folder and run the following command.

```sh
$ sudo npm install -g nodemon
$ nodemon server
```
Nodemon will keep restarting the server whenever changes are made. It makes development a little easier


In order to run the React app, use the terminal to cd into the src folder and run the following command

```sh
$ npm start
```



### TODO

 - Connect OAuth servers
 - Create User objects in MongoDB
 - Create Fridge section in order to maintain list of User's ingredients and saved recipes
 - implement "favorites" button into each recipe card
 - Connect Nutritionix API
 - make the website not look like total crap*
