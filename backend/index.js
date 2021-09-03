const express = require('express');
const app = express();

const config = require('config')
const PORT = config.get('PORT') || 3000;

const cors = require('cors');
const mongoose = require('mongoose')

const test = require('./routes/test')
const products = require('./routes/products')
const login = require('./routes/login')
const user = require('./routes/user')

app.use(cors());
app.use(express.json());
app.use('/api/products', products)
app.use('/api/login', login)
app.use('/api/user', user)

const dbConnect = config.get('ATLAS_URL');

mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log('Connected to MongoDB'))
    .catch(err => {
        throw new Error('Error, cannot connect MongoDB', err);
     })



app.get('/', ( req , res )=> {
    res.send('Działa wszystko fajnie');
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

