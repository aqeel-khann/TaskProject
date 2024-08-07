const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Token;

    if (!token) res.status(400).send("We have not Token");
    const data = jwt.verify(token, process.env.SECRET_KEY);

    req.user = data;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = Authenticate;
