// imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRoutes');
const cors = require('cors');

// initialize
const app = express();
dotenv.config();
app.use(cors({origin:"http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// dbconnect (can be in a separate file)
mongoose.connect(process.env.URI)
.then(() => {
    console.log("connected to the mongoDB");
    app.listen(process.env.PORT || 5000, (err) => {
        if(err) console.log("the port is not connected due to : ", err);
        else console.log("app is running on port : ", process.env.PORT);
    });
})
.catch((err) => console.log("failed to connect to mongoDB",err));

// middlewares
app.use(userRouter);
app.use(blogRouter);
