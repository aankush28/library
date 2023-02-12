const mongoose = require('mongoose');
mongoose.model("BookScema", {
    title: {
        type: String,
        require:true
    },
    author: {
        type: String,
        require:true
    },
    numbersPage: {
        type: Number,
        require:false
    },
    Publisher: {
        type: String,
        require:false
    }
})