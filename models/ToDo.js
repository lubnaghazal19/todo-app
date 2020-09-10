const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ToDoModel = new Schema({
    taskName: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    creator: {
        type: String
    },
    duration: {
        type: Number
    },
    expiryDate: {
        type: Date
    }
},
    // {
    //     expire_at: {type: Date, default: Date.now, expires: 7200} 
    // },
    {
        timestamps: true
    });
const ToDo = mongoose.model('ToDo', ToDoModel);
module.exports = ToDo;
