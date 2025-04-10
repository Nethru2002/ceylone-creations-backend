const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Contact API');
});

app.use('/api', contactRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

