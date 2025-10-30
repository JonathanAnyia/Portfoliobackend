require('dotenv').config();
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists:', email);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashed, name: 'Admin' });
  await user.save();
  console.log('Admin user created:', email);
  process.exit(0);
};

run();
