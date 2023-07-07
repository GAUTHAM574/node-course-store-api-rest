require('dotenv').config();

connectDB = require('./db/connect');
const Product = require('./models/product');

const productList = require('./products.json');


const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(productList);
        console.log('done');
        process.exit(0);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

start();