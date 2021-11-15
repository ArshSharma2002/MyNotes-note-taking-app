const connectMongo = require('./db')
const express = require('express');
const cors = require('cors')
const app = express();
const port = 80;
// const router = require("./routes/auth")

 
connectMongo();
app.use(cors())
app.use(express.json())
 
// routes available

app.use("/api/auth" , require("./routes/auth"))
app.use("/api/notes" , require("./routes/notes"))

app.listen(port,()=>{
    console.log(`app successfully running on port no ${port}`)
})