const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const tokenGenration = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

  return token;
};

module.exports = { tokenGenration };
