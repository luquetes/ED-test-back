import mongoose from 'mongoose'
const {Schema} = mongoose;

const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true});

export default mongoose.model('Product', productSchema)