const mongoose = require("mongoose");

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
}
connectdb();

const job_Schema = mongoose.Schema({
    title: {
        type: String,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    requirements: {
        type: [String],
    },
    salary: {
        type: Number,
    },
    industry: {
        type: String,
    },
    jobType: {
        type: String,
    },
    experienceLevel: {
        type: String,
    },
})
const job = mongoose.model("Job", job_Schema);
module.exports = job;