const mongoose=require("mongoose");
require('dotenv').config();
const URL=process.env.MONGODB_URL
module.exports=()=>{
     return mongoose.connect(URL)
}