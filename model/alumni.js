const mongoose = require("mongoose");

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
}
connectdb();

const alumni_Schema = mongoose.Schema({

    alumni_name:
    {
        type: String,
        required: true,
    },
    alumni_email:
    {
        type: String
    },
    alumni_password:
    {
        type: String
    },
    alumni_profilepicture:
    {
        type: String
    },
})
const alumni = mongoose.model("Admin", alumni_Schema);
module.exports = alumni;