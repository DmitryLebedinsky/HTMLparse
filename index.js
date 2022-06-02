const axios = require("axios");
const cheerio = require('cheerio');


axios.get('https://www.dissercat.com/search?q=%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%BA%D0%B0+%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F')
.then(resultHandler)
 

function resultHandler(res) {
    const $ = cheerio.load(res.data);
    console.log($("h1").html);
}