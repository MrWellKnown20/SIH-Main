const mongoose = require("mongoose");

async function connectdb(){
    await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
}
connectdb();

const message_Schema = mongoose.Schema({
    sender: 
    { 
        type: String
     }, 
    receiver:
     {
         type: String  
     },
    content:
     {
         type: String
     },
    timestamp: 
    { 
        type: Date
    }, 
    status:
     {
         type: String
    },
})
const message = mongoose.model("Message",message_Schema);
module.exports=message;