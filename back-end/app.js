import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import constructorMethod from './routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// Call constructor method to set up routes
constructorMethod(app);

app.listen(3000, () => {
  console.log("Server is running");
  console.log("Our routes are running on http://localhost:3000");
});
