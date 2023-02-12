const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('./BookScema')
const Book = mongoose.model('BookScema')

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
app.get('/books', function (req, res) {
    Book.find()
        .then((book) => {
            console.log(book);
            res.json(book)
    })
})
app.get('/book/:id', function (req, res) {
    Book.findById(req.params.id)
        .then((book) => {
            if (book) {
                console.log(book);
                res.json(book)
            } else {
                res.sendStatus(404)
            }
            
        }).catch((e) => {
            if (e) {
            console.log(e);
        }
    })
  
  })
app.post('/book', (req, res) => {
    console.log(req.body);
    res.send('api workinhg but free ;D')
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numbersPage: req.body.numbersPage,
        Publisher: req.body.Publisher
    }
  let book =  new Book (newBook)
    book.save()
        .then(() => { console.log("yes finaly!!! it's save"); })
        .catch((err) => {
            if(err){
            console.log('kuch to garbar hai daya'+err);
            }
        })
    res.send("hua...")
})
app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id)
        .then((id) => {
            if (id) {
                res.send("katam tata bye bye gaya ")
                console.log("katam tata bye bye gaya " + id);
        }
    })
})
app.listen(3000, () => {
    console.log("jani server run ho rha hai...");
})