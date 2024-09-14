const express = require('express');
const User = require("./model/user"); // Import your user model
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const wrapAsync = require('./util/wrapAsync');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const { isLogin } = require("./middleWare.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Connect to database
async function connectdb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/AlumniConnect");
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

// Flash middleware
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

app.get("/home", (req, res) => {
    res.render("home.ejs");
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.post("/signup", wrapAsync(async (req, res) => {
    if (req.isAuthenticated()) {  // Check if user is already logged in
        req.flash("error", "Your account is already signed up.");
        return res.redirect("/login");  // Redirect to a page where the user can see the error message
    }

    let { username, email, password } = req.body;
    let presentUser = new User({ email, username });

    try {
        const registerUser = await User.register(presentUser, password);
        req.flash("success", "You have successfully signed up!");
        res.redirect("/login");
    } catch (error) {
        req.flash("error", "Your account is already signed up!");
        res.redirect("/login");
    }
}));

// About
app.get("/about", (req, res) => {
    res.render("about.ejs");
})

// Networking hub
app.get("/networkinghub", (req, res) => {
    res.render("networkinghub.ejs");
})

// Events
app.get("/event", (req, res) => {
    res.render("event.ejs");
})


//remove islogin for donation route
app.get("/donation", (req, res) => {
    res.render("donation.ejs");
})

// Donation
// app.get("/donations", isLogin, (req, res) => {
//     res.render("donation.ejs");
// })

// Job
app.get("/job", (req, res) => {
    res.render("job.ejs");
})

// Authenticated routes
app.post("/user", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect!");
    res.render("UserDashboard");
    console.log("user click");
});

app.post("/alumni", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect!");
    res.render("AlumniDashboard.ejs");
    console.log("alumni click");
});

app.post("/admin", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success", "Welcome back to AlumniConnect!");
    res.render("AdminDashboard.ejs");
    console.log("admin click");
});

// Admin routes
app.get("/admin/new", (req, res) => {
    res.render("AdminDashboard.ejs");
})

app.get("/admin/job", (req, res) => {
    res.render("AdminJobListings.ejs");
})

app.get("/admin/jobedit", (req, res) => {
    res.render("AdminJobEdit.ejs");
})

app.get("/admin/event", (req, res) => {
    res.render("AdminEvent.ejs");
})

app.get("/admin/eventedit", (req, res) => {
    res.render("AdminEventEdit.ejs");
})

app.get("/admin/forum", (req, res) => {
    res.render("AdminForumEvent.ejs");
})

app.get("/admin/alumni", (req, res) => {
    res.render("AdminAlumniListing.ejs");
})

// Alumni routes
app.get("/alumni/Dashboard", (req, res) => {
    res.render("AlumniDashboard.ejs");
})

app.get("/alumni/AlumniListing", (req, res) => {
    res.render("AlumniListings");
})

app.get("/alumni/job", (req, res) => {
    res.render("AlumniJob");
})

app.get("/alumni/network", (req, res) => {
    res.render("AlumniNetworHub");
})

app.get("/alumni/event", (req, res) => {
    res.render("AlumniEvent");
})

// User routes
app.get("/user/dashboard", (req, res) => {
    res.render("UserDashboard");
})

app.get("/user/Directory", (req, res) => {
    res.render("UserAlumniDirectory");
})

app.get("/user/job", (req, res) => {
    res.render("UserJob");
})

app.get("/user/event", (req, res) => {
    res.render("UserEvent");
})

app.get("/user/forum", (req, res) => {
    res.render("UserForum");
})

// Temporary route
app.get("/temp", isLogin, (req, res) => {
    res.render("/temp");
})

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



