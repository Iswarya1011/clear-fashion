// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrands = [];
let allproduct=[];
let page = document.querySelector('body');
// indicators 

var newprod;
var Newdate;
var p50;
var p90;
var p95;



// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectRecent= document.querySelector('#recently-released');
const selectReasonable= document.querySelector('#reasonable-price');
const selectSort=document.querySelector('#sort-select')
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanbrands=document.querySelector('#nbBrands');
const spanP50=document.querySelector('#p50');
const spanP90=document.querySelector('#p90');
const spanP95=document.querySelector('#p95');
const spanRelease=document.querySelector('#releaseDate');
const spanNbNewProducts = document.querySelector('#nbNewProducts');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};




/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


/**
 * Set global value
 * @param {Array} result - products to display
 * 
 */
const setCurrentBrand = (result) => {
  currentBrands = result;
}



/**
 * Fetch brands from api
 * @return {Object} 
 */
const fetchbrand= async () => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app/brands`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return currentBrands;
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return currentBrands;
  }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
        <span>${product.released}</span>

      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};



/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  
}
  

/**
 * Render brand name (Feature 2)
 *@param  {Array} brand
 */
const renderBrands = brand => {
  
  const b=brand.result;
  const options = Array.from(b, i =>`<option value="${i}">${i}</option>`);
  selectBrand.innerHTML = options;
  spanbrands.innerHTML= (options.length) -1;
  
}

/**
 * Render number of new product (Feature 8)
 *@param  {Array} products
 */
 const renderNewProduct = products => {

  


  spanP50.innerHTML=p50;
  spanP90.innerHTML=p90;
  spanP95.innerHTML=p95;
  
}




const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderNewProduct(products);
 
};

/**
 * Filter by brand
 * @param  {Object} products
 */
const bybrand = products =>{
  
  const result = products.filter(product => product.brand == selectBrand.value);
  return result;
}




const Filterbydate= products =>{

  const result=products.filter(product=> (((new Date()- new Date (product.released)) / (1000 * 3600 * 24 )) <30) );
  // newprod=products.length;
  return result;

}

/**
 * Filter by price (50€)
 * @param  {Object} products
 */

const Filterbyprice= products =>{

  const result=products.filter(product=>  ((product.price) < 50) );
 
  return result;

}


/**
 * Sort by price asc
 * @param  {Object} products
 */

const SortPricesA= products =>{

  const result=products.sort((a,b)=> (parseFloat(a.price)-parseFloat(b.price)) );
   
 
  return result;

}
/**
 * Sort by price desc
 * @param  {Object} products
 */

const SortPricesD= products =>{

  const result=products.sort((a,b)=> (parseFloat(b.price)-parseFloat(a.price)) );
   
 
  return result;

}

/**
 * Sort by date Recent
 * @param  {Object} products
 */

const SortDateR= products =>{

  const result=products.sort((a,b)=> (new Date(b.released)-new Date(a.released)) );

  Newdate=result[0].released;
 
  return result;

}
/**
 * Sort by date old
 * @param  {Object} products
 */

const SortDateO= products =>{

  const result=products.sort((a,b)=> (new Date(a.released)-new Date(b.released)) );
 
  return result;

}

/** Calculate Quatile
 * 
 */

const quantile = (arr, q) => {

  const sorted=arr.sort((a, b) => a - b)
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
      return sorted[base];
  }
};



/**
 * Declaration of all Listeners
 */




/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


/**
 * Select the pages to display (Feature 1)
 */
selectPage.addEventListener('change', async (event) => {
  
  const products = await fetchProducts( parseInt(event.target.value),currentPagination.pageSize);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Filter by brand (Feature 2)
 */
selectBrand.addEventListener('change', async (event) => {
  
  const products = await fetchProducts(currentPagination.currentPage,currentPagination.count);
  products.result = bybrand(products.result);
  console.log(products);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
 * Filter By date(Feature 3)
 */
selectRecent.addEventListener('change', async (event) => {
  
  const products = await fetchProducts(currentPagination.currentPage,currentPagination.count);

  
  if(event.target.value == "Yes"){

    products.result = Filterbydate(products.result);
   
   
    
    
  }
  else{

    const products = await fetchProducts();
  }
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


/**
 * Filter By price(Feature 4)
 */
selectReasonable.addEventListener('change', async (event) => {
  
  const products = await fetchProducts(currentPagination.currentPage,currentPagination.count);
  if(event.target.value == "Yes"){

    products.result = Filterbyprice(products.result);
    
  }
  else{

    const products = await fetchProducts();
  }
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


/**
 * Sort by priceBy price (Feature 5)
 */

selectSort.addEventListener('change', async (event) => {
  
  const products = await fetchProducts(currentPagination.currentPage,currentPagination.count);

  if(event.target.value =="price-asc"){

    products.result = SortPricesA(products.result);
  }
    
  else if(event.target.value == "price-desc"){

    products.result =SortPricesD(products.result);
    
    
  }

  else if(event.target.value == "date-asc"){

    products.result =SortDateR(products.result);
    
  }
  else if(event.target.value == "date-desc"){

    products.result =SortDateO(products.result);
  }
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});







document.addEventListener('DOMContentLoaded', async () => {


  const products = await fetchProducts();
 
  const brands = await fetchbrand();


  brands.result.unshift("All the products");

  setCurrentProducts(products);
  setCurrentBrand(brands);

  renderBrands(brands);
  render(currentProducts, currentPagination);
  
  const pro = await fetchProducts(currentPagination.currentPage,currentPagination.count);
  
  spanNbNewProducts.innerHTML=pro.result.filter(product=> (((new Date()- new Date (product.released)) / (1000 * 3600 * 24 )) <30) ).length;
 

  spanRelease.innerHTML= pro.result.sort((a,b)=> (new Date(b.released)-new Date(a.released)) )[0].released;


  const price=[];
 

  for(let step = 0; step < currentPagination.count; step++){

    price.push(pro.result[step].price);

  }
  


  console.log(price);
  
  
  spanP50.innerHTML=quantile(price,0.50);
  spanP90.innerHTML=quantile(price,0.90);
  spanP95.innerHTML=quantile(price,0.95);


  
 
});






