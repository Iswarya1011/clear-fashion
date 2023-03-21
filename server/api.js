const { ObjectID } = require('bson');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://iswarya:1234@cluster0.evj6cag.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

var ObjectId=require('mongodb').ObjectId;


const PORT = 8092;
const app = express();




module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

async function ID(id){

  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');
  const produ = await collection.find({"_id": new ObjectId(id)}).toArray();
  return produ;
}

async function getProducts(limit, brand , price) {
  const client = await MongoClient.connect(MONGODB_URI, { 'useNewUrlParser': true });
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  let query = {};
  if (brand) {
    query.brand = brand;
  }
  if (price) {
    query.price = { $lte: parseInt(price) };
  }

  const products = await collection.find(query).sort({ price: 1 }).limit(limit).toArray();

  return products;
}


app.get('/products/search', async (request, response) => {
  const limit = parseInt(request.query.limit) || 12;
  const brand = request.query.brand || null;
  const price = request.query.price || null;

  const products = await getProducts(limit, brand, price);
  response.json(products); 
});

app.get('/brands', async(request,response)=>{

  const client = await MongoClient.connect(MONGODB_URI, { 'useNewUrlParser': true });
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');
  const produ = await collection.distinct('brand');

  response.send(produ);
})

app.get('/products/:id', async(request, response) => {

  const result=await ID(request.params.id);
  response.send(result);
});

