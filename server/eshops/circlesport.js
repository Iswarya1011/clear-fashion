const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-grid-container .grid__item')
    .map((i, element) => {
      var name = $(element)
        .find('.card__heading')
        .text()
        .trim()
        .replace(/\s/g, ' ')

        ;

      name=name.substr(0, name.length/2).trim();
      var caracteristic = $(element)
       .find('.card__characteristic')
       .text()
       .trim()
       .replace(/\s/g, ' ');

       caracteristic=caracteristic.substr(0, caracteristic.length/2);
       
      const price = parseInt(
        $(element)
          .find('.price__regular .money')
          .text().slice(1)
      
      );
      const brand='Circlesport';
      var url=$(element)
      .find('.full-unstyled-link')
      .attr('href')

      url="https://shop.circlesportswear.com" +url;

      var photo="https:"
      
       photo =photo + $(element)
      .find('img')
      .attr('src');

      const date= '2023-03-30'

      return {name,caracteristic, price,url,brand,photo,date};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }


};


