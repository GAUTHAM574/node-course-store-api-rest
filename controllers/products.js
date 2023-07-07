const Product = require('../models/product')

const getAllProducts = async(req , res) => {
    const {featured, company ,name, sort, fields, numericFilters} =  req.query;
    const queryObj = {};
    //cheching if a product is featured
    if(featured){
        queryObj.featured = featured === 'true' ? true : false;
    }
    //checking for company search
    if(company){
        queryObj.company = company;
    }
    //name search
    if(name){
        queryObj.name = {$regex:name, $options:'i'}; // regex is used as if in instead of exact match
    }

    if(numericFilters){
        // Mapping symbols with mongoose redabale
        const operatorMap = {
            '>=' : '$gte',   
            '<=' : '$lte', 
            '>' : '$gt',
            '<' : '$lt',   
        }
        //This here is a regular expression usually used to search and replace characters 
        const regEX = /\b(<|>|<=|>=)\b/g
        let filters = numericFilters.replace(regEX,(match) =>`-${operatorMap[match]}-`)
        //console.log(filters);
        const options = ['price', 'rating'];
        filters.split(',').forEach((item) => {
            const [fields, operator, value] = item.split('-');
            if(options.includes(fields)){ // if the filed(is a numeric value that is available in options then it will be added)
                queryObj[fields] = { [operator] : Number(value) };
            }
        }) 
    }
    //Finding the products that meet the above searches
    let result = Product.find(queryObj);
    console.log(queryObj);
    //if sort is needed then sorting
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('-rating');
    }
    
    //select helps us to return only necessary fields
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page-1)*limit;
    result = result.skip(skip).limit(limit);

    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProducts};