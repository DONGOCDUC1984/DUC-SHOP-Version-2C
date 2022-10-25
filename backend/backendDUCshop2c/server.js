require("dotenv").config();
console.log("server file: process.env.PORT: " + process.env.PORT);
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var fileUpload = require("express-fileupload");
var path = require("path");

var port = process.env.PORT;
var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/DUCshop2c", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("Connected to db."))
  .catch((err) => console.log(err));

var app = express();
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(fileUpload());
app.use(express.static("public"));

app.use("/", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
