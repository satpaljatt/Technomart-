import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';
import bcrypt from "bcryptjs";


// 🧑‍💻 1. REGISTER USER  (Naya Khata Kholna)
// ==========================================
const registerUser = async (req, res) => {

    const {name, email, password} = req.body

    
    if (!name || !email || !password) {
       return res.status(400).json({ message: "Please add all fields" });
    }

    const userExist =  await User.findOne({ email });

    console.log(userExist);
    
    if (userExist) {
       return res.status(400).json({ message: "User already exists" });
       
        
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
            token: generateToken(user._id),
        });
    }
    else {
       return res.status(400).json({ message: "Invalid user data" });
       
    }
    
   
};


// ==========================================
// 🔐 2. LOGIN USER LOGIC (Dukaan mein Entry)
// ==========================================
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    

        const user = await User.findOne({ email })
 
    if (!user) {
     return res.status(400).json({ message: "User not found" });
}



const ismatch = await bcrypt.compare(password,user.password);



    if (ismatch) {
       return  res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
      
          return res.status(400).json({ message: "Invalid credentials" });

    }
};


export { registerUser, loginUser };