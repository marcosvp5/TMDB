const express = require ('express');
const Series = express.Router()
const axios = require('axios')
const apiKey= '0ed87d57b84f7c9d6c2300276bae6c03';

Series.get('/', (req,res)=>{
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`)
   .then((series)=> res.send(series.data.results))
})

module.exports= Series
