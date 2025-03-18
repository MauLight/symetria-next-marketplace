import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 3,
        required: true
    },
    lastname: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v: unknown): boolean {
                if (typeof v !== 'string') return false
                return /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,5}$/.test(v)
            }
        }
    },
    phone: {
        type: Number,
        minLength: 11,
        maxLength: 11,
        required: true,
        unique: true
    },
    street: {
        type: String,
        minLength: 3,
    },
    street_number: {
        type: String,
        minLength: 3,
    },
    house_number: {
        type: String,
        minLength: 3,
    },
    city: {
        type: String,
        minLength: 3,
    },
    state: {
        type: String,
        minLength: 3,
    },
    country: {
        type: String,
        minLength: 3,
    },
    zipcode: {
        type: Number,
        minLength: 7,
    },
    passwordHash: {
        type: String,
        validate: {
            validator: function (v: unknown): boolean {
                if (typeof v !== 'string') return false
                //Minimum eight characters, at least one letter, one number and one special character
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v)
            }
        },
        required: true
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    purchaseHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }

    ],
    isAdmin: {
        type: Boolean
    }
}, { timestamps: true })

userSchema.set('toJSON', {
    transform: (_doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.passwordHash
    }
})

const User = mongoose.models ? mongoose.models.User : mongoose.model('User', userSchema)
export default User || mongoose.model('User', userSchema)