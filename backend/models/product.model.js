import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
},{
    timestamps: true //create and update info
});

const Product = mongoose.model('Product', productSchema);

export default Product;