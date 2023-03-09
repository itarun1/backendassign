const express=require("express")
const connect=require("./config/db")
const userRoutes=require("./routes/userRoutes")
const app=express()
require('dotenv').config();
const port=process.env.PORT||2000

// Body parser middleware
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);


app.listen(port,async()=>{
    try {
        await connect()
        console.log(`listening on the port ${port}` )
    } catch (error) {
        console.log(error);
    }
})