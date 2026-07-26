import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ek email se ek hi account banega
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false // By default koi admin nahi hoga
    },


    addresses: [
        {
            addressType: { type: String, default: 'Home' },
            address: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
            country: { type: String, required: true },
        }
    ],
    
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;