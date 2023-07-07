const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'Product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'Price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0.00
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],  // withenum property we can have limited like company can only be limited to these 4 values anthing else will not be accepted
            message:'{VALUE} is not supportive'
        }
    }
})

module.exports = mongoose.model('Product', productSchema);