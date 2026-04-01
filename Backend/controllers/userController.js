import User from "../models/userModel.js";

import bcrypt from "bcryptjs";


// 🧑‍💻 1. REGISTER USER LOGIC (Naya Khata Kholna)
// ==========================================
const registerUser = async (req, res) => {

    const {name, email, password} = req.body

    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const userExist =  await User.findOne({ email });

    console.log(userExist);
    
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

   if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
   
};


// ==========================================
// 🔐 2. LOGIN USER LOGIC (Dukaan mein Entry)
// ==========================================
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    
   
        const user = await User.findOne({ email })
      
    if(!user) {
        res.status(400);
        throw new Error("User not found");
    }
   

    const ismatch = await bcrypt.compare(password,user.password);
    
   

    if (ismatch) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
};



export { registerUser, loginUser };