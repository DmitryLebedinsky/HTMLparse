const axios = require("axios");
const HTMLParser = require('node-html-parser');

main();

async function main() {
    let url = "https://www.dissercat.com/search?q=";
    const query = '%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%BA%D0%B0+%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'
    const diserts = [];
    let page = 1;

    for (let i = 1; i <= page; i++) {
        let _url = url + query;

        if (i > 1) {
            _url = _url + '&page=' + i;
        }

        const res = await axios.get(_url)

        if (res?.data) {
            const document = HTMLParser.parse(res.data);
            const searchResults = document.querySelectorAll('.search-result');

            searchResults.forEach((element) => {
                const disert = {};
                disert.title = element.querySelector('a').textContent;
                disert.keyWords = element.querySelector('a').getElementsByTagName('strong').map(strongMap);
                const infoArr = element.querySelector('h3 > span').innerHTML.split(' &mdash; ');
                disert.year = infoArr[0];
                disert.author = infoArr[1];

                diserts.push(disert);
            });

            page = getLastPage(document);

            await delay();
        }
    }
    console.log(diserts);
}

function getLastPage(document) {
    const pages = document.querySelectorAll('.page-item').map(pageMap).filter(pageFilter)
    const lastPage = Math.max(...pages);

    if (lastPage > 1) {
        return lastPage;
    }

    return 1;
}

function pageMap(element) {
    return parseInt(element.textContent, 10)
}

function pageFilter(page) {
    return !isNaN(page)
}

function strongMap(strong) {
    return strong.textContent;
}

function delay() {
    return new Promise(resolve => setTimeout(resolve, 500));
}