const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnection");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

// app.use(cors());
dotenv.config();


var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
 


// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 
app.use(cookieParser());

//Database Connection
dbConnect();


app.use("/api", userRoutes);
 app.use("/api", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listen on Port ${PORT}`));
