const express = require('express');
const router = express.Router();

const Product = require('../models/products.model');
const mongoosePaginate = require('mongoose-paginate-v2')

router.post('/add', (req,res) => {
    const newProduct = new Product ({
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        description: req.body.description,
        left: req.body.left,
        category: req.body.category,
    })

    newProduct.save()
        .then(() => res.json('Produkt dodany'))
        .catch(err => res.status(400).send('ERROR'))

})

router.get('/getLeft/:id', async (req,res) => {
    const response = await Product.findById(req.params.id).select('left')
    console.log(response)
    res.send(response)
})

router.get('/get', (req,res) => {
    let queries = {}
    let limit = {limit:16}

    req.query.id
        ? queries._id = req.query.id
        : null

    req.query.category 
        ? queries.category = req.query.category
        : null

    req.query.name 
        ? queries.name =  new RegExp(req.query.name,'gi')
        : null

    req.query.limit 
        ? limit = {limit:req.query.limit}
        : limit 

    console.log(limit)

    Product
        .paginate( queries , limit)
        .then(data => res.send(data))
        .catch(err => res.status(500).send('Problem occured'))
        
        /*.find(queries)
        .exec()
        .then(data => res.send(data))*/
})

router.get('/', (req,res) => {   
    Product.paginate({},{ limit:4 })
        .then(data => res.send(data))
        .catch(err => res.status(500).send('Problem occured'))
})

router.put('/addSales', async (req,res) => {
    try{
        const response = await Product.update(
            { _id: { $in: req.body.ids } },
            { $set: { sale : req.body.sale } },
            {multi: true}
         )
         res.send('Done') 
     } catch( err ){
         res.send(err)
     }
})

router.get('/getSales/:sale', (req,res) => {

    console.log(req.params)

    Product
        .paginate( { 'sale.sale_name': req.params.sale} ,{ limit:16 })
        .then(data => res.send(data))
        .catch(err => res.status(500).send('Problem occured'))
        
        /*.find(queries)
        .exec()
        .then(data => res.send(data))*/
})

module.exports = router