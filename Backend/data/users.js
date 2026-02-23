import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10), // Password ko lock (encrypt) kar rahe hain
    isAdmin: true, // <--- Ye Malik hai (Dukaan ka seth)
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false, // <--- Ye Grahak hai
  },
];

export default users;