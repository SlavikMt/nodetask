const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let TodoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }

});



module.exports = mongoose.model('Todo', TodoSchema);