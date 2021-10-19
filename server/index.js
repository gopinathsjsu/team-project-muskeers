const express = require("express");
const app = express();

require('dotenv').config()

app.get('/',(req,res)=>{
    res.send("Hello")
})

const port = process.env.port || 3001;

app.listen(port, ()=>{
    console.log(`Listening on Port: ${port}`);
})