const express = require("express");
const cors = require("cors");
const app = express();
require("./models/dbConfig");
const serviceRoute = require("./controllers/servicesControllers");
const port = 8082;
const usersRoute = require("./controllers/usersControllers");
const bodyParser = require("body-parser");

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send("Hello World!  Use Azure!");
});
app.use(bodyParser.json());

app.use("/service/api", serviceRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
