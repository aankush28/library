const mongoose = require('mongoose');
mongoose.model("CustomerScema", {
    name: {
        type: String,
        require:true
    },
    addres: {
        type: String,
        require:true
    },
    age: {
        type: Number,
        require:true
    }
})