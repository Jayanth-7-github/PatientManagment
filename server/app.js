const express = require("express");
const cors=require ("cors")
const Router = require("./controllers/userRoute");
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());




app.use(cors({
  origin: "https://labtes.netlify.app/" ,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]

})
);

app.use("/api", Router);

module.exports = { app };