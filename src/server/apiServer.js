const express = require("express");
const bodyParser = require('body-parser')
const apiServer = express();
const Random = require("./api/Routes/random")



apiServer.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  apiServer.use(bodyParser.json());
  apiServer.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origins,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

//Random Routes

apiServer.use("/random", Random.getRandomData)



  //handling errors
apiServer.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
  
  apiServer.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });



module.exports = apiServer;