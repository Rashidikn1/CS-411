const router = require('express').Router();
let Search = require('../models/search.model');
const axios = require('axios');
require('dotenv').config();

router.route('/').post((req,res) => {
    const searchItem = req.body.searchItem;
    const startIndex = req.body.startIndex;
    const numResults = req.body.numResults;
    console.log(searchItem);

    axios.get('https://api.edamam.com/search', {
        params: {
            q: searchItem,
            app_id: process.env.APP_ID,
            app_key: process.env.APP_KEY,
            from: startIndex,
            to: (startIndex+numResults)
            
        }
    })
        .then(function(response){
            console.log(response.data.count);
            res.send(response.data);
        })
        .catch(function(error){
            console.log(error);
        })

    


});
module.exports = router;
