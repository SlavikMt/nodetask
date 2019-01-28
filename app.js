const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Joi = require('joi');
const expressJoi = require('express-joi-validator');
mongoose.connect("mongodb://localhost:27017/todolist", { useNewUrlParser: true })
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const todo = require('./routes/todo.route')
const app = express();



const schema = {
    query: {
        name: Joi.string().required()
    },
    body: {
        password: Joi.number().required(),
    },
    params: {
        id: Joi.number().required()
    }
}

app.post('/testapi/:id', expressJoi(schema), function(req, res) {
    res.send('validated');
});

//error handler
app.use(function(err, req, res, next) {
    if (err.isBoom) {
        return res.status(err.output.statusCode).json(err.output.payload);
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/Todo', todo);


let port = 3000;

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});