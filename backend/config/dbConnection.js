const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = () => {mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is Connected"))
  .catch((error) => console.log(`Error in Database Connection ${error.message}`));
};

module.exports = dbConnect;
