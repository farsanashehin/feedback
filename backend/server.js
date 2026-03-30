const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://farsanass:farsanashehin@cluster0.k7sqgl3.mongodb.net/feedbackapp?appName=Cluster0';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedbacks', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
