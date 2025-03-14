import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: String,
    description: {
        type: String,
        required: true
    },
    quantity: Number,
    weight: Number,
    height: Number,
    width: Number,
    length: Number,

    images: [
        {
            image: {
                type: String,
                required: true
            },
            image_public_id: {
                type: String,
                required: true
            }
        }
    ],
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    },
    tags: [String]
}, { timestamps: true })

productSchema.set('toJSON', {
    transform: (_doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const Product = mongoose.models ? mongoose.models.Product : mongoose.model('Product', productSchema)
export default Product || mongoose.model('Product', productSchema)

