const axios = require("axios");
const HTMLParser = require('node-html-parser');

let url = "https://www.dissercat.com/search?q=";

const query = '%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%BA%D0%B0+%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'
url = url + query

const diserts = [];

let page = 1;
while (page < 20){

if (page != 1){
    url = url + '&page=' + page;
}

    axios.get(url).then(resultHandler);
    page++;
}

 

function resultHandler(res) {
    var document = HTMLParser.parse(res.data);
    const searchResults = document.querySelectorAll('.search-result');
    searchResults.forEach(handlerElement);
    getLastPage(document);
}

function getLastPage(document){
    const pages = document.querySelectorAll('.page-item').map(pageMap).filter(pageFilter)
    console.log(pages)
}

function pageMap(element){
    return parseInt(element.textContent, 10)
}

function pageFilter(page){
    return !isNaN(page)
}

function handlerElement(element){
    const disert = {};
    disert.title = element.querySelector('a').textContent;
    disert.keyWords = element.querySelector('a').getElementsByTagName('strong').map(strongMap);
    const infoArr = element.querySelector('h3 > span').innerHTML.split(' &mdash; ');
    disert.year = infoArr[0];
    disert.author = infoArr[1];

    diserts.push(disert);
}

function strongMap(strong){
    return strong.textContent;
}

