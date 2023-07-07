require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();


const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');


const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('<h1>Store api - hello there');
});


app.use('/api/v1/products' , productsRouter);

//Middle wares
app.use(notFoundMW);
app.use(errorHandlerMW);

const port = process.env.PORT || 5000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to Database Sucessfully');
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch(error){
        console.log(error);
    }
}

start();