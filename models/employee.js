const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
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
        minLength: 3,
        maxLength: 20
    },
    Mobile: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10
    },
    Company: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20
    },
    Position: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
});

module.exports = mongoose.model("Employee", employeeSchema);