const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017whatever')
}

//creating scheems

const student = new mongoose.Schema ( {
    firstName: {
        type: String,
        required: true,
        unique: true
    },

    faveFood: [{type: Strings}],

    info: {
        school: {
            type: String
        },
        shoeSize: {
            type: Number
        }

    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    }
}, {timestamps: true})

const school =new mongoose.Schema({
    name: String

})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

//connecting with db

connect()
.then(async connection => {
    const student= await Student.create({firstName: 'Tim'})
    const found = await student.find({firstName:'Thi'})
    const foundById= await student.findById('asygcgk')
    const updated= await student.findByIdUpdate('fytdydtd',{})
    console.log(student)
})
.catch(e => console.error(e))