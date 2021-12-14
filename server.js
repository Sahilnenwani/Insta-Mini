const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./db");

require("dotenv").config()
connectToMongo();
const app = express();
const PORT = process.env.PORT || 5000;

// const db = require("./config/key").mongoURI;

// defined models
require("./models/users/user");
require("./models/posts/post");
app.use(express.json());

// this is user login and session routes
//signup Postroutes
app.use(require("./routes/auth/signup.routes"));
//signin Postroutes
app.use(require("./routes/auth/signin.routes"));
//protected Getroutes
app.use(require("./routes/auth/protected.routes"));

//this is post routes
//createpost Postroutes
app.use(require("./routes/post/createpost.routes"));
//allpost Getroutes
app.use(require("./routes/post/allpost.routes"));
//mypost getroutes
app.use(require("./routes/post/mypost.routes"));
//getsubpost getroutes
app.use(require("./routes/post/getsubpost.routes"));

//this is post likes and unlikes routes
//likeput and update use $push
app.use(require("./routes/like/like.routes"));
//unlikeput and update use $pull
app.use(require("./routes/like/unlike.routes"));
//post delete
app.use(require("./routes/post/deletePost.routes"));

//this is post comments routes
//commentsput and update use $push
app.use(require("./routes/comments/comments.routes"));

//pic update database routes
//pic routes is put routes to update pic use key set
//app.use(require('./routes/pic/picupdate.routes'))

//This is User Profile routes to seen the user
//userprofiles is get routes
app.use(require("./routes/userprofile/userprofile.routes"));

//this is User profile follower and following routes
//user follower and following routes is put routes use push key word
app.use(require("./routes/follower&following/followers&following.routes"));
//User unfollower and unnfollowing routes is also put routes use pull key word
app.use(require("./routes/follower&following/unfollower&unfollowing.routes"));

//this use for reset password work in my app its is post routes
app.use(require("./routes/auth/resetpassword.routes"));
//this use of reset password to newpassword update password post routes
app.use(require("./routes/auth/newpassword.routes"));
// thhis user find routes by use email yah or searching routes
app.use(require("./routes/userprofile/searchuser.routes"));

const mongooseURI=process.env.MONGO_URI;

// mongoose.connect(mongooseURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("MongoDB Connected...!"))
//   .catch((err) => console.log(err));

// app.get('/',(req,res)=>{
//     res.send("Server Is Running!");
// })

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server is runnig http://localhost:${PORT}/`);
});
