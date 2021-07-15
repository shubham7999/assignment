//schema of the student

const mongoose = require('mongoose')


const studentInfoSchema = new mongoose.Schema({
    name: String,
    contact: String,
    subjects: [],
    class: String,
    society: [],
    year: Number
})

module.exports = mongoose.model('studentName', studentInfoSchema)