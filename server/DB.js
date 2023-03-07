const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://iswarya:1234@cluster0.evj6cag.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


async function main(){

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const products=require('./product_list.json');
    const collection=db.collection('products');
    const result=await collection.insertMany(products);
    client.close();


}

async function brands(brand){
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const produ = await collection.find({brand}).toArray();;
    
    console.log(produ);

    client.close();

}



async function lessthan(ltprice){

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const produ = await collection.find({"price":{$lte:ltprice}}).toArray();
    console.log(produ);

    client.close();

 
}

async function sortprice(){

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const produ = await collection.find().sort({ "price": 1 }).toArray();
    console.log(produ);
    client.close();

 
}

async function sortdate(){

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const produ = await collection.find().sort({ "date":1 }).toArray();
    console.log(produ);
    client.close();

 
}

async function newdate()
{
    
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const now =new Date();
    now.setDate(now.getDate()-14);

    const product = await collection.find({"date" : { $gt: new Date(now).toISOString() } }).toArray();
    console.log(product);
    client.close();


}
//brands('Circlesport');
//lessthan(100);

//sortprice();

//sortdate();

newdate();

//main();

