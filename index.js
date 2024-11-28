const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot en configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http://localhost:8080
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server APP</h1>");
});

//Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.white.bgMagenta);
});
