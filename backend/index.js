import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import noteRoutes from './routes/note.route.js';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

//database connection code
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//Routing middleware
app.use(express.json());
app.use('/api/v1/notes', noteRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
