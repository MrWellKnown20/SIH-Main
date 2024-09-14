const mongoose = require("mongoose");

async function connectdb() {
    console.log("connections successull");
    await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
}
connectdb();

const admin_Schema = mongoose.Schema({

    admin_name:
    {
        type: String,
        required: true,
    },
    admin_email:
    {
        type: String,
    },
    admin_password:
    {
        type: String,
    },
    admin_profilepicture:
    {
        type: String,
    }
})
const admin = mongoose.model("Admin", admin_Schema);
module.exports = admin;