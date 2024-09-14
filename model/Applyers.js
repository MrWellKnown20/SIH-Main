const mongoose = require("mongoose");

const Applyer = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
    },
    phone :{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    experienceLevel: {
        type: String,
    },
    skill :{
        type : String,
        required : true,
    },
    qualification :{
        type : String,
        required : true,
    },
    for_post :{
        type : String,
    },
})
const Apply = mongoose.model("Apply", Applyer);
module.exports = Apply;