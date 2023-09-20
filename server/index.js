const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

const db = require("./models");

//Routers
const loginRouter = require("./routes/Login");
const studentsRouter = require("./routes/Students");
const teachersRouter = require("./routes/Teachers");

app.use("/auth", loginRouter);
app.use("/api/students", studentsRouter);
app.use("/api/teachers", teachersRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
