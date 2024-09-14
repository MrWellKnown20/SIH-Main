const mongoose = require("mongoose");

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
    image: {
        type: String,
        default: "https://www.scodetechnologies.in/content-images/6217amdocs.jpg",
        set: (v) => v === "" ? "https://www.scodetechnologies.in/content-images/6217amdocs.jpg" : v
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