const express = require("express");
const app = express();
const itemRoutes = require("./itemRoutes");
const ExpressError = require("./expressError");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use("/items", itemRoutes);

app.use(function (req, res, next) {
    return new ExpressError("Not Found",404);
});
   
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message
    });
});

app.listen(3000, function() {
    console.log('App on port 3000');
})


module.exports = app;

 