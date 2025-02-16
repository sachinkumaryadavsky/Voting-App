const express = require('express');
const jwt = require('./jwt');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4500;

const mongoose = require("mongoose");
app.use(express.json());
const userRoutes=require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
app.use('/api/user',userRoutes);
app.use('/api/candidate',candidateRoutes);
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("DB connection Successful");
    
})
.catch((err)=>{
       console.log(`DB connection Failed,${err}`);

})

app.listen(PORT,()=>{
    console.log(`App started at port ${PORT}`);

    
});