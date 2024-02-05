const mongoose = require("mongoose");

const url = "mongodb+srv://vishalsharma807864:vishal0011@cluster0.lncvhxb.mongodb.net/sofastore?retryWrites=true&w=majority";
const connection = async ()=>{
    let conn = await mongoose.connect(url);
     let  conn2 = conn.connection.db.collection("sofastore");
     
    


    if(conn){
        console.log("connected");
        let conn3 = conn.connection.db.collection("sofadatas")
        let data = await conn3.find({}).toArray();
        // console.log(data)
        global.completeData = data;

    }else{
        console.log("not connected");
    }
    
}

module.exports = connection;