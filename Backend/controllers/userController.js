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
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
      
          return res.status(400).json({ message: "Invalid credentials" });

    }
};

const updateUserProfile = async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name; 
        
        if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
        }


        
        const updatedUser = await user.save();
        
        res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        
        token: generateToken(updatedUser._id),
      });
        
    } else {
      res.status(404).json({ message: "User not found" })
     
    }
};
  
 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
      }
      
    res.json(users); 
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { registerUser, loginUser , updateUserProfile , getAllUsers};