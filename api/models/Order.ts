import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    street_number: {
        type: String,
        required: true
    },
    house_number: {
        type: String
    },
    zipcode: {
        type: String,
        required: true
    },

})

const orderSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: addressSchema
    },
    additional: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    delivery: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, { timestamps: true })

orderSchema.set('toJSON', {
    transform: (_doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const Order = mongoose.models ? mongoose.models.Order : mongoose.model('Order', orderSchema)
export default Order || mongoose.model('Order', orderSchema)