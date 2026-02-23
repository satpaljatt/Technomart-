import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Purana kachra saaf karo
    await Product.deleteMany(); 
    await User.deleteMany();

    // 2. Naye Users (Malik aur Grahak) DB mein daalo
    const createdUsers = await User.insertMany(users); 
    
    // 3. Malik ki ID nikalo (Pehla user malik hai)
    const adminUser = createdUsers[0]._id; 

    // 4. Har Samaan par Malik ka thappa (ID) lagao
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; 
    });

    // 5. Saara Samaan DB mein daal do
    await Product.insertMany(sampleProducts); 

    console.log('Data Imported! 🌱'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Robot ko chalu karo
importData();