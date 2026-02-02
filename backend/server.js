const app = require("./src/app.js");
const connectDb = require("./src/config/db.js");
require("dotenv").config();

connectDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is listening on 3000");
});
