const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // this will store the URL or file path of the image
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cars', CarsSchema);
