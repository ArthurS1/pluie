const express = require("express");
const cors = require("cors");
const app = express();
const serviceRoute = require("./controllers/servicesControllers");
const port = 8082;
const usersRoute = require("./controllers/usersControllers");
const bodyParser = require("body-parser");
const http = require("http");

var httpServer = http.createServer(app);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/service/api", serviceRoute);
app.use("/users", usersRoute);

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
