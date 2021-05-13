/* Inclue "type": "module" in package.json as We are using ES Modules */
// const express = require('express');
import express from 'express';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
// const products = require('./data/products');
// import products from './data/products.js';
import connectDB from './config/db.js';
import colors from 'colors'
import morgan from 'morgan'
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import blogUploadRoutes from './routes/blogUploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// To be able to achieve JSON data from body
app.use(express.json())


// app.get('/', (req, res) => {
//     res.send('API is Running.....');
// });

app.use('/api/products', productRoutes);


app.use('/api/users', userRoutes);


app.use('/api/orders', orderRoutes);


app.use('/api/upload', uploadRoutes);
app.use('/api/uploadBlog', blogUploadRoutes);


app.use('/api/blogs', blogRoutes);

// Sending PAYPAL CLIENT ID from Backend
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// To Make uploads folder Static so that it's accsesible in Browser
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/uploadsBlog', express.static(path.join(__dirname, '/uploadsBlog')))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is Running.....');
    });
}


// Error Handler Middleware -- When User tries to visit Unusual Route
app.use(notFound)


// Error Handler Middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.bold));