console.log("server.js loaded~");

require('dotenv').config();
console.log("ENV PORT:", process.env.PORT);

const express = require('express');
const cors = require('cors');
const connectDB = require(__dirname + '/config/db.js');

const projectsRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// connect DB
console.log("connectDB is:", connectDB);
connectDB();

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// routes
app.use('/api/projectRoutes', projectsRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));
app.get("/", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});


const PORT = process.env.PORT || 5000;
console.log("⚡ About to start listening...");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
