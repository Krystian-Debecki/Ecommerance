const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const validateUser = require('../validations/validateUser')

const User = require('../models/users.model')

const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const auth = require('./auth')


router.get('/getName', auth ,async (req,res) => {
    let response = await User.findOne({ _id: req.user.id}, 'name');
    res.json(response.name)
})

router.post('/', async (req,res) => {
    const { error } = validateUser.validateLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid password or email')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if( !validPassword) return res.status(400).send('Invalid password or email')

    const token = jwt.sign({ id: user._id }, config.get('TOKEN_PASSWORD'))

    res.send({
        token: token,
        login: 'user',
        role: user.role,
        email: user.email,
        id: user._id,
    })
})


router.post('/register', async (req,res) => {
    console.log(req.body)

    const { error } = validateUser.validateRegistration(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})

    let newUser = await User.findOne({email: req.body.email});
    if(newUser) return res.status(400).json({message: 'użytkownik jest już zarejestrowany'})

    newUser = new User ({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password,salt)

    await newUser.save()
    res.json('Udało się')
})

module.exports = router;