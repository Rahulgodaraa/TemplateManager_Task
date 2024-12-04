import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import errorMiddleware from "./middleware/errormiddleware.js";
import templateRoutes from "./routes/templateRoutes.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/templates', templateRoutes);
server.use(errorMiddleware);
try {
    mongoose.connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    })
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);

}



server.get('/' , (req , res) => {
try {
    res.status(200).json({sucess : true , message : "Welcome to Home Page"});
    console.log(message); 
} catch (error) {
    res.status(500).json({sucess : false , message : error});
    console.log(message.error);
}
});

server.listen(process.env.PORT , ()=> {
    console.log(`Server Runing on port ${process.env.PORT}`);
})