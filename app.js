const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const session = require("express-session");
const bodyParser = require("body-parser");


app.use("/public",static);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



app.set("views", __dirname + "/templates");



configRoutes(app);

app.listen(3000, ()=>{
    console.log("Running on http://localhost:3000");
});
