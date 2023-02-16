const next = require('next')

const express = require("express");
const bodyParser = require('body-parser')

const Random = require("./api/Routes/random")




const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const apiServer = express();
       
        apiServer.use(
            bodyParser.urlencoded({
              extended: false,
            })
          );
          apiServer.use(bodyParser.json());
          apiServer.use(bodyParser.urlencoded({ extended: true }))
        //Random Routes
        
        apiServer.use("/api/random", Random.getRandomData)
        apiServer.get('*', (req, res) => {
            return handle(req, res)
        });
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
        
        apiServer.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })