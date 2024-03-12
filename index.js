const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/database/db");
dotenv.config();

const app = express();

const userRoute = require("./src/routes/user.route");
const authRoute = require("./src/routes/auth.route");

const port = 3000;

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

db();

app.listen(port, () => {
  console.log(`Server está rodando em: http://localhost:${port}`);
});