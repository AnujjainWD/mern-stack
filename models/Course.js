const mongoose = require('mongoose');


//define schema

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
},{
    timestamps:true
})

//create collection

const CourseModel = mongoose.model('course', CourseSchema)

module.exports = CourseModel;