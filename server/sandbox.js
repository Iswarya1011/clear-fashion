/* eslint-disable no-console, no-process-exit */
/** 
const dedicatedbrand = require('./eshops/dedicatedbrand');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/all-men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;
*/



 /**
const circlesport = require('./eshops/circlesport');

async function sandbox (eshop = 'https://shop.circlesportswear.com/collections/collection-femme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlesport.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, eshop] = process.argv;
 */







const montlimart = require('./eshops/montlimart');

async function sandbox (eshop = 'https://www.montlimart.com/99-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimart.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
    
  }
}
const [,, eshop] = process.argv;

sandbox(eshop);




