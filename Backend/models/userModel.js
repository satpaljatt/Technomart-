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
    }
}, {
    timestamps: true // Ye batayega account kab bana (Date/Time)
});

const User = mongoose.model('User', userSchema);

export default User;