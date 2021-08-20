const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUIexpress = require('swagger-ui-express');
require('dotenv').config()
require('./ServerConnection')
app.get('/',(req,res)=>{
    res.send('Start')
})
app.use(express.json());
const PORT = process.env.PORT || 3000
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Basic API",
            description:"Basic description",
            contact:{
                name:"Developer"
            }
        },
        
        servers: [
            {
              url: "http://localhost:3000/api/v1", // url
              description: "Local server", // name
            },
          ],
    },
  apis:["./route/UserRoute.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs",swaggerUIexpress.serve,swaggerUIexpress.setup(swaggerDocs))
 app.listen(PORT,() =>{
    console.log("my port");
})

app.use('/v1', require('./route/MainRoute'));


