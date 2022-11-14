const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    Company: {
        type: String,
        minLength: 6,
        maxLength: 20
    }
});

module.exports = mongoose.model('Employer', employerSchema);