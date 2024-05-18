require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const listRepo = require('./repositories/repository.list');

const port = process.env.port;
const app = express();


//Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//Endpoint
app.post('/add', listRepo.addData);
app.delete('/remove/:id', listRepo.removeData);
app.get('/watchlist', listRepo.getList);


app.listen(port, () => {
    console.log("🚀 Server is running and listening on port", port);
});