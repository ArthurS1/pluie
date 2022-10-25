const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://pluie-db:CtWkBkHC4ZCS0L8wFWSSu0bo2nJZOkC8DVS6jCKPBgqGPCQX5SCJhoJRe6uC7OSAChkKQT5epDqdwz3RrnOiyA==@pluie-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@pluie-db@",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("mongodb connected");
        else console.log("Connection error:" + err);
    }
);
