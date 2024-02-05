const express = require("express");
const app = express();
const cors = require("cors");


const productRoute = require("./routes/productRouts");
const connection = require("./db");
app.use(express.json());
app.use(cors());


app.use("/api/v1",productRoute);

app.get("/",(req , res)=>{
    res.send("hii");
})

connection()
app.listen(5000);



