const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const createProduct = require("../controller/product");
const Authenticate = require("../Auth/auth");
// const authMiddleware = require("../middlewares/authMiddleware"); // Assuming you have authentication middleware

router.post("/product",upload.array("pictures", 6),Authenticate ,createProduct);

module.exports = router;
