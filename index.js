const express = require("express");
const userRoute = require("./src/routes//user.route")
const app = express();
const db = require("./src/database/db");

const port = 3000;

app.use(express.json());
app.use("/user", userRoute);

db();

app.listen(port, () => {
  console.log(`Server está rodando em: http://localhost:${port}`);
});