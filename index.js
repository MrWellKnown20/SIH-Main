const express = require('express');
const User = require("./model/user"); // Import your user model
const Job = require("./model/job.js"); //Import your job model
const Appliance = require("./model/Applyers.js") //import your applyer model
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const passport = require("passport");
const wrapAsync = require('./util/wrapAsync');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const { isLogin } = require("./middleWare.js");
const { title } = require('process');
const multer = require('multer');
const eventdb = require('./model/event');
const job = require('./model/job.js');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//multer file upload:
const storage = multer.diskStorage({
    destination: './uploads/', // Ensure this matches the folder where images are saved
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Connect to database
async function connectdb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/AlumniConnect", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
connectdb();

// Session and Flash Configuration
const sessionOptions = {
    secret: 'your_secret_key', // Ensure this is a strong and unique string
    resave: false,
    saveUninitialized: true,
};

// Middleware for sessions and flash messages
app.use(session(sessionOptions));
app.use(flash());

//flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // Use passport-local-mongoose's authenticate method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/login", (req, res) => {
    console.log("login request sent");
    res.render("login.ejs");
});

app.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch users
        res.send("Server is Working");
        // res.json(users); // Uncomment to see JSON output
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});

app.use(express.static('public'));

app.get("/home", (req, res) => {
    eventdb.find({})
        .then((event_data) => {
            job.find({})
                .then((job_data) => {
                    res.render("home.ejs", { event_data, job_data });
                })

        })

})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.post("/signup", wrapAsync(async (req, res) => {
    if (req.isAuthenticated()) {  // Check if user is already logged in
        req.flash("error", "You account is already signup.");
        return res.redirect("/login");  // Redirect to a page where the user can see the error message
    }

    let { username, email, password } = req.body;
    let presentUser = new User({ email, username });

    try {
        const registerUser = await User.register(presentUser, password);
        req.flash("success", "You have successfully signed up....!");
        res.redirect("/login");
    } catch (error) {
        req.flash("error", "your account is already signup.....!");
        res.redirect("/login");
    }
}));

//about
app.get("/about", (req, res) => {
    res.render("about.ejs");
})

//netoworking hub
app.get("/networkinghub", (req, res) => {
    res.render("networkinghub.ejs");
})

//events
app.get("/event", (req, res) => {
    res.redirect("/events")
})

//donation
app.get("/donations", (req, res) => {
    res.render("donation.ejs");
})

//job
app.get("/job", (req, res) => {
    job.find({})
        .then((job_data) => {
            res.render("job.ejs", { job_data });
        })

})

// Authenticated routes
app.post("/user", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true //error asel tar
}), (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect..!");
    res.render("UserDashboard");
    console.log("user click");
});

app.post("/alumni", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect..!");
    res.render("AlumniDashboard.ejs");
    console.log("alumni click");
});

app.get("/alumni/dashboard", (req, res) => {//alumni dashboard 
    res.render("AlumniDashboard.ejs");
    console.log("alumni click");
});

app.post("/admin", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), async (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect..!");
    let alldata = await Job.find({});
    res.render("AdminDashboard.ejs", { alldata });
    console.log("admin click");
});

//admin/new
app.get("/admin/new", async (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect..!");
    let alldata = await Job.find({});
    res.render("AdminDashboard.ejs", { alldata });
    console.log("admin click");
})

//database connected
//admin/job
app.get("/admin/job", async (req, res) => {
    const allJobs = await Job.find({});
    res.render("AdminJobListings.ejs", { allJobs });
})


//jop post for user
app.get("/user/job", async (req, res) => {
    const allJobs = await Job.find({});
    res.render("UserJoblistings.ejs", { allJobs });
})

app.get("/user/jobview/:id", async (req, res) => {
    let { id } = req.params;
    const Data = await Job.findById(id);
    res.render("UserJobView", { Data });
})

//newJob posting
app.get("/alumni/job", async (req, res) => {
    const allJobs = await Job.find({});
    res.render("AlumniJob.ejs", { allJobs });
});

// //newJob posting for alumni
// app.get("/alumni/post",(req,res)=>{
//     res.render("")
// })

//admin/createJob
app.get("/admin/post", (req, res) => {
    res.render("AdminNewJob.ejs");
})

//Apply Job
app.get("/user/apply/:title", (req, res) => {
    let { title } = req.params;
    res.render("UserApply.ejs", { title });
})

//applyer job store 
app.post("/user/applyData", async (req, res) => {
    let data = req.body;
    console.log(data);
    const dataApply = await new Appliance(data);
    await dataApply.save();
    console.log("The received data is:", dataApply);
    res.redirect("/user/job");
});

//job add
app.post("/admin/post", async (req, res) => {
    const data = req.body;
    const PutData = new Job(data);
    await PutData.save();
    res.redirect("/admin/job");
})

//admin/jobedit
const { ObjectId } = mongoose.Types;  //this is string taking perfect _id



//user see details in job

//edit put request
app.put("/admin/:id", async (req, res) => {
    let { id } = req.params;

    if (!ObjectId.isValid(id)) {
        req.flash("error", "Invalid job ID");
        return res.redirect("/admin/job");
    }

    try {
        const updateJob = await Job.findByIdAndUpdate(id, req.body, {
            new: true, // returns the updated document
            runValidators: true // runs the schema validators
        });

        if (updateJob) {
            req.flash("success", "Job updated successfully");
            res.redirect("/admin/job");
        } else {
            req.flash("error", "Job not found");
            res.redirect("/admin/job");
        }
    } catch (err) {
        console.error("Error updating job:", err);
        req.flash("error", "Error occurred while updating job");
        res.redirect("/admin/job");
    }
});

//send request for edit
app.get("/alumni/jobedit/:id", async (req, res) => {
    let { id } = req.params;
    const allJobs = await Job.findById(id);
    res.render("AlumniEditJob", { allJobs });
})


//alumni job edit
app.put("/alumni/:id", async (req, res) => {
    let { id } = req.params;

    if (!ObjectId.isValid(id)) {
        req.flash("error", "Invalid job ID");
        return res.redirect("/alumni/job");
    }

    try {
        const updateJob = await Job.findByIdAndUpdate(id, req.body, {
            new: true, // returns the updated document
            runValidators: true // runs the schema validators
        });

        if (updateJob) {
            req.flash("success", "Job updated successfully");
            res.redirect("/alumni/job");
        } else {
            req.flash("error", "Job not found");
            res.redirect("/alumni/job");
        }
    } catch (err) {
        console.error("Error updating job:", err);
        req.flash("error", "Error occurred while updating job");
        res.redirect("/alumni/job");
    }
})


//admin delete job
app.delete("/admin/:id", async (req, res) => {
    let { id } = req.params;

    if (!ObjectId.isValid(id)) {
        req.flash("error", "Invalid job ID");
        return res.redirect("/admin/job");
    }

    try {
        const updateJob = await Job.findByIdAndDelete(id);

        if (updateJob) {
            req.flash("success", "Job updated successfully");
            res.redirect("/admin/job");
        } else {
            req.flash("error", "Job not found");
            res.redirect("/admin/job");
        }
    } catch (err) {
        console.error("Error updating job:", err);
        req.flash("error", "Error occurred while updating job");
        res.redirect("/admin/job");
    }
});

//alumni delete Job
app.delete("/alumniJobDelete/:id", async (req, res) => {
    let { id } = req.params;

    if (!ObjectId.isValid(id)) {
        req.flash("error", "Invalid job ID");
        return res.redirect("/alumni/job");
    }

    try {
        const updateJob = await Job.findByIdAndDelete(id);

        if (updateJob) {
            req.flash("success", "Job updated successfully");
            res.redirect("/alumni/job");
        } else {
            req.flash("error", "Job not found");
            res.redirect("/alumni/job");
        }
    } catch (err) {
        console.error("Error updating job:", err);
        req.flash("error", "Error occurred while updating job");
        res.redirect("/alumni/job");
    }
});

//admin fetch apply 
//admin fetch apply 
app.get("/fetchApply/:title", async (req, res) => {
    try {
        // Fetch the title from params
        let { title } = req.params;

        // Log the title to ensure it's being passed correctly
        console.log("Fetching job with title:", title);

        // Adjust the query to ensure you're matching exactly
        const fetchdata = await Appliance.find({ for_post: title });

        console.log(fetchdata);

        // Send the fetched data to the EJS template
        res.render("AdminViewApplyer", { fetchdata });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});




//alumni delete job
app.delete("/alumniJobDelete/:id", async (req, res) => {
    let { id } = req.params;
    const DataDelete = await Job.findByIdAndDelete(id);
    console.log(DataDelete);
    res.redirect("/alumni/job");
})

//alumni cancel edit job
app.get("/alumni/cancel", (req, res) => {
    res.redirect("/alumni/job");
})

//alumni create job
app.get("/alumni/newJob", (req, res) => {
    res.render("AlumniCreateJob");
})

//take data for new job
app.post("/alumni/newpost", async (req, res) => {
    const data = req.body;
    const newJob = new Job(data);
    newJob.save();
    res.redirect("/alumni/job");
})



//admin/forum
app.get("/admin/forum", (req, res) => {
    res.render("AdminForumEvent.ejs");
})

//admin/Alumnilist
app.get("/admin/alumni", (req, res) => {
    res.render("AdminAlumniListing.ejs");
})

//alumni/alumniListng
app.get("/alumni/AlumniListing", (req, res) => {
    res.render("AlumniListings")
})

//alumni/job
app.get("/alumni/job", (req, res) => {
    res.render("AlumniJob");
})

// //alumni/network
app.get("/alumni/network", (req, res) => {
    res.render("AlumniNetworHub")
})

//alumni event
app.get("/alumni/event", (req, res) => {
    res.render("AlumniEvent.ejs")
});



//user/dashboard
app.get("/user/dashboard", (req, res) => {
    res.render("UserDashboard");
})

//user/directory
app.get("/user/Directory", (req, res) => {
    res.render("UserAlumniDirectory");
})

// //user/job
// app.get("/user/job", (req, res) => {
//     res.render("UserJob");
// })



//user/forum
app.get("/user/forum", (req, res) => {
    res.render("UserForum");
})

//temperary
app.get("/temp", isLogin, (req, res) => {
    res.render("/temp")
})



//EVENT ROUETS:
//USER EVENT :
app.get("/events", (req, res) => { //user event dashboard
    eventdb.find()
        .then((result) => {

            res.render("Events.ejs", { result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })
})

app.get("/events/:eventname", (req, res) => {
    let eventname = req.params.eventname;
    eventdb.findOne({ title: eventname })
        .then((result) => {
            console.log(result)
            res.render("detail_event.ejs", { data: result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })
})

app.get("/alumni/event/:eventname", (req, res) => {
    let eventname = req.params.eventname;
    eventdb.findOne({ title: eventname })
        .then((result) => {
            console.log(result)
            res.render("detail_event_alumia.ejs", { data: result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })
})

app.get("/alumni/event/:eventname/edit", (req, res) => {
    let eventname = req.params.eventname;
    eventdb.findOne({ title: eventname })
        .then((result) => {
            console.log(result)
            res.render("alumia_event_edit.ejs", { data: result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })
})

app.get("/:event_name/get_form", (req, res) => {
    let temp = req.params.event_name;
    res.render('event_apply_form.ejs', { name: temp })
})

app.post("/Admin/event/:event_name/update-event", (req, res) => {
    let data = req.body
    let event_name = req.params.event_name;
    let event = ""
    for (let i = 0; i < event_name.length; i++) {
        if (event_name[i] == "+") break;
        else {
            event += event_name[i]
        }
    }
    console.log(data)
    eventdb.replaceOne({ title: event }, {
        title: data.title,
        image: data.image,
        description: data.description,
        date: data.date,
        time: data.time,
        location: data.location,
        organizer: data.organizer,
        EventType: data.eventType,
        ContactEmail: data.contact,
        Website: data.website,
        Status: data.status,
    })
        .then((result) => {
            res.redirect("/admin/event")
        })
})

app.get("/admin/events/:event_name/final", async (req, res) => {
    let name = req.params.event_name;
    async function connectdb() {
        await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
    }
    connectdb();
    const eventdb = mongoose.connection.collection('events');
    // Delete the event
    await eventdb.deleteOne({ title: name });
    const collection = mongoose.connection.collection(name + "apply_form");
    const data = await collection.drop();
    console.log(data)
    res.redirect("/admin/event")
})

app.post("/:event_name/submit-application", async (req, res) => {
    async function connectdb() {
        await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
    }
    connectdb();
    let event_name = req.params.event_name;
    console.log(event_name)
    // Accessing the collection named after the event
    const collection = mongoose.connection.collection(event_name + "apply_form");

    let alert_val = false;
    const data = await collection.findOne({ "$or": [{ email: req.body.email }, { studentID: req.body.studentID }] })
    if (data != null) {
        alert_val = true;
    }
    else {
        //  Inserting the student application data into the collection
        const result = await collection.insertOne({

            name: req.body.name,
            email: req.body.email,
            studentID: req.body.studentID,
            department: req.body.department,
            year: req.body.year,
            contact: req.body.contact,
            address: req.body.address,
            motivation: req.body.motivation,
            applicationDate: new Date() // Automatically set to the current date
        });
        eventdb.find()
            .then((result) => {

                res.render("Events.ejs", { result })
            })
            .catch((e) => {
                res.send("<h1>404 Error<h1>")
            })
        console.log("success")
    }
})

app.get("/admin/delete/:event_name", (req, res) => {
    let name = req.params.event_name
    eventdb.find()
        .then((result) => {

            res.render("delete_event.ejs", { result, name: name })
        })

})


// ADMIN EVENT:
app.get("/admin/event", (req, res) => { //dashboard alumni/admin
    console.log("oko")
    eventdb.find()
        .then((result) => {
            res.render("AdminEvent.ejs", { result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })

})

app.get("/admin/event/:event_name/application", async (req, res) => {
    async function connectdb() {
        await mongoose.connect("mongodb://localhost:27017/AlumniConnect")
    }
    connectdb();
    let event_name = req.params.event_name;
    // Accessing the collection named after the event
    const collection = mongoose.connection.collection(event_name + "apply_form");
    const data = await collection.find().toArray()
    console.log(data)
    res.render("display_event_application.ejs", { application: data })
})

app.get("/admin/event/new", (req, res) => {
    let eventname = req.params.eventname;
    eventdb.findOne({ title: eventname })
        .then((result) => {
            console.log(result)
            res.render("admin_event_new.ejs", { data: result })
        })
        .catch((e) => {
            res.send("<h1>404 Error<h1>")
        })
})



app.post('/admin/add-event', upload.single('image'), async (req, res) => {
    try {
        eventdb.collection.insertOne({
            image: req.file ? "../uploads/" + req.file.filename : null, //../uploads/image-1726080521523.png
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            organizer: req.body.organizer,
            eventType: req.body.eventType,
            contact: req.body.contact,
            website: req.body.website,
            status: req.body.status,
        });


        res.redirect('/admin/event'); // Redirect to the admin event page after saving
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).send('An error occurred while adding the event.');
    }
});

app.use('/uploads', express.static('uploads'));

app.get("/admin/:id", async (req, res) => {
    const id = req.params.id;

    // Check if the id is valid
    if (!ObjectId.isValid(id)) {
        req.flash("error", "Invalid job ID");
        return res.redirect("/admin/job");
    }

    try {
        const jobData = await Job.findById(id);
        if (jobData) {
            res.render("AdminJobEdit.ejs", { jobData });
        } else {
            req.flash("error", "Job not found");
            res.redirect("/admin/job");
        }
    } catch (err) {
        console.error("Error finding job:", err);
        req.flash("error", "Error occurred while fetching job details");
        res.redirect("/admin/job");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
