/* eslint-disable no-console, no-process-exit */

const fs = require('fs');

const dedicatedbrand = require('./eshops/dedicatedbrand');

async function sandboxdedicated (eshop1 = 'https://www.dedicatedbrand.com/en/men/all-men') {
  try {

    
    console.log(`🕵️‍♀️  browsing ${eshop1} eshop`);

    const products = await dedicatedbrand.scrape(eshop1);

    //console.log(products);
    console.log('done');
    return products;
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
}

const circlesport = require('./eshops/circlesport');

async function sandboxcircle (eshop2 = 'https://shop.circlesportswear.com/collections/all') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop2} eshop`);

    const products = await circlesport.scrape(eshop2);

    //console.log(products);
    console.log('done');
    return products;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const montlimart = require('./eshops/montlimart');
const { contentSecurityPolicy } = require('helmet');

async function sandboxmontlimart (eshop = 'https://www.montlimart.com/99-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimart.scrape(eshop);

   // console.log(products);
    console.log('done');
    return products;
    
  } catch (e) {
    console.error(e);
    process.exit(1);
    
  }
}

async function main(){

  var products  =[];

  for (let i =1;i<17;i++)
  {
    var url1= `https://www.dedicatedbrand.com/en/men/all-men?p=${i}`;
    
    var url2= `https://www.dedicatedbrand.com/en/women/all-women?p=${i}`
    branddedi1=await sandboxdedicated(url1);
    branddedi2=await sandboxdedicated(url2);
    products=products.concat(branddedi1);
    products=products.concat(branddedi2);

  }
  brand2=await sandboxcircle();

  brand3=await sandboxmontlimart();

  products=products.concat(brand2);
  products=products.concat(brand3);

  console.table(products);
 
  const jsonData = JSON.stringify(products, null, 2);
    fs.writeFile('products.json',jsonData , (err) => {
      if (err) throw err;
      console.log('Table saved to file!');
    });

}

main()








