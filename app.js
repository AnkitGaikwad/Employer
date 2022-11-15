const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employerRouter = require('./routes/employer');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/v1/employers', employerRouter);

const start =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to database");
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
        });
    } catch (error) {
        console.log(error);
    }
};

start();