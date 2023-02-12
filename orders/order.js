const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('./orderScema')
const Order = mongoose.model('orderScema')
const Axios = require('axios')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://user:<password>@cluster0.vo1hsye.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected!'))
    .catch(() => {
        console.log(` yes dude error `);
    })
app.get('/order', function (req, res) {
    Order.find()
    .then((o) => {
        console.log(o);
        res.json(o)
})
})
app.get('/order/:id', function (req, res) {
    Order.findById(req.params.id)
        .then((o) => {
            if (o) {
                Axios.get('http://localhost:5000/customer/' + o.CustomerID)
                    .then((r) => {
                        console.log(r);
                        const orderObject = { customerName: r.data.name, bookTitle: '' }
                        Axios.get('http://localhost:3000/book/' + o.BookID)
                        .then((r) => {
                            orderObject.bookTitle = r.data.title
                            res.json(orderObject)
                        }) })
                res.send("Quick response")
            } else {
                res.send("id invaild")
            }
            
        }).catch((e) => {
            if (e) {
            console.log(e);
        }
    })
  
})
app.post('/order',(req, res)=> {
    const data = {
        CustomerID: mongoose.Types.ObjectId( req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    } 
    const need = new Order(data)
    need.save()
    .then(() => { console.log("yes finaly!!! it's save"); })
        .catch((err) => {
            if(err){
            console.log('kuch to garbar hai daya'+err);
            }
        })
    res.send("hua...")
})
app.listen(8000)