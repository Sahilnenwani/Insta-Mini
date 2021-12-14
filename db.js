const mongoose =require("mongoose")
require("dotenv").config()
const mongooseURI=process.env.MONGO_URI;


const conectToMongo= ()=>{
    mongoose.connect(mongooseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => console.log("MongoDB Connected...!"))
      .catch((err) => console.log(err));
}

module.exports= conectToMongo;