let express = require("express");
let config = require("./config/index")
let db = require("./config/database");
let helmet = require("helmet");
let logger = require("morgan");
let errorHandler = require("./middlewares/errorHandler");

// application
let app = express();

// use body parser 
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// use helmet middleware
app.use(helmet());

// use logger for logging requests
app.use(logger("common"));


// database conection
db.authenticate()
.then(() => {
    console.log("database connecting successfully");
})
.catch(err => {
    console.log(err);
})


// create tables in database
// let admin = require("./models/admin.model");
// db.sync();

// include routes
let authAdminRouter = require("./routes/admin/auth.admin.router");

// using routes
app.use("/api/admin/auth", authAdminRouter);


app.use(errorHandler);
// let port = config.PORT || 2000
app.listen(config.PORT, () => {
    console.log("server is running successfully");
})