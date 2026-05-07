import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js'

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/contacts',contactRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongo db connected'); 
    app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
}).catch((err)=> {console.error('DB connection error:', err.message);
  process.exit(1);} );