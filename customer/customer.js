const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('./CustomerScema')
const Customer = mongoose.model('CustomerScema')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://user:<password>@cluster0.vo1hsye.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected!'))
    .catch(() => {
        console.log(` yes dude error `);
    })
  

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.post('/customer',(req, res)=> {
    const User = {
        name: req.body.name,
        addres: req.body.addres,
        age:req.body.age
    } 

    const Cust = new Customer(User)
    Cust.save()
    .then(() => { console.log("yes finaly!!! it's save"); })
        .catch((err) => {
            if(err){
            console.log('kuch to garbar hai daya'+err);
            }
        })
    res.send("hua...")
})


app.get('/customer', function (req, res) {
    Customer.find()
        .then((cust) => {
            console.log(cust);
            res.json(cust)
    })
})
app.get('/customer/:id', function (req, res) {
    Customer.findById(req.params.id)
        .then((cust) => {
            if (cust) {
                console.log(cust);
                res.json(cust)
            } else {
                res.send("id invaild")
            }
            
        }).catch((e) => {
            if (e) {
            console.log(e);
        }
    })
  
})
app.delete('/book/:id', (req, res) => {
    Customer.findOneAndRemove(req.params.id)
        .then((id) => {
            if (id) {
                res.send("katam tata bye bye gaya ")
                console.log("katam tata bye bye gaya " + id);
        }
    })
})
app.listen(5000)