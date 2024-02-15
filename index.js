const express = require("express");
const userRoute = require("./src/routes//user.route")
const app = express();

const port = 3000;

app.use("/soma", userRoute);

app.listen(port, () => {
    console.log(`Server está rodando em: http://localhost:${port}`);
  });