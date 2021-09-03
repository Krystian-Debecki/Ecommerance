const auth = require('./auth');
const express = require('express');
const router = express.Router();

const User = require('../models/users.model')
const Product = require('../models/products.model')
const mongoose = require('mongoose')

router.get('/', auth ,(req,res)=>{
    res.send('Acces granted')
})

router.put('/saveBasket', auth, async (req,res) => {
    try{
        console.log(req.body.inBasket)
       const response = await User.updateOne({_id: req.user.id}, { basket: req.body.basket, inBasket: req.body.inBasket})
        res.send('Done') 
    } catch( err ){
        res.send(err)
    }
    
})

router.get('/getBasket', auth ,async (req,res) => {
    try{
    console.log('getBasket',req.user.id)
    let data = await User.find({_id: req.user.id},'basket inBasket')

    let basket = await Product.find({ _id: data[0].basket })
    
    data = { basket: basket, inBasket: data[0].inBasket }
    res.json(data)
    } catch(err) {
        console.log('getBasket', err)
    }
})

router.post('/getLocalBasket',async (req,res) => {
    try{
        ids = req.body.filter(id => id !== '')
    let basket = await Product.find({ _id: ids })

    res.json(basket)
    } catch(err) {
        console.log('getLocalBasket',err)
    }
})

router.put('/saveFavorites', auth, async (req,res) => {
    try{
       const response = await User.updateOne({_id: req.user.id}, { favorites: req.body})
        res.send('Done') 
    } catch( err ){
        res.send(err)
    }
    
})

router.get('/getFavorites', auth, async (req,res) => {
    try{
    console.log(req.user.id)
    let data = await User.find({_id: req.user.id},'favorites')

    let favorites = await Product.find({ _id: data[0].favorites })
    
    data = { favorites: favorites }
    res.json(data)
    } catch(err) {
        console.log('getFavorites', err)
    }
})

router.post('/getLocalFavorites',async (req,res) => {
    try{
    console.log(req.body)
    const ids = req.body.filter(id => id !== '')
    let favorites = await Product.find({ _id: ids })
    
    console.log(favorites)
    res.json(favorites)
    } catch(err){
        console.log('getLocalFavorites', err)
    }
})


module.exports = router;