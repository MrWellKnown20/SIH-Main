const mongoose = require("mongoose");

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
}
connectdb();

const event_Schema = mongoose.Schema({

    title: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    organizer:
    {
        type: String
    },
    EventType:
    {
        type: String
    },
    ContactEmail:
    {
        type: String
    },
    Website:
    {
        type: String
    },
    Status:
    {
        type: String
    }
})
const event = mongoose.model("Event", event_Schema);
module.exports = event;