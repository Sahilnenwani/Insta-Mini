// module.exports={
//     MONGOURI:'mongodb://localhost:27017/InstagramClonev2'
// }

// module.exports={
//     //  MONGOURI:'mongodb://localhost:27017/InstagramClonev2'
// }

require("dotenv").config("./.env");
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
