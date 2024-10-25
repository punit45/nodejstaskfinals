import connectDB from './db.js';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import express from "express";

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
