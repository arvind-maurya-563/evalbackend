const express = require("express");
const app = express();
const  cors = require('cors')
const port = process.env.PORT || 8080;
const connection = require("./configs/db.js");
const userRouter = require("./controllers/user.controller.js");
const { Aouth } = require("./Middlewere/Aouth.js");
const adminRouter = require("./controllers/jobs.controler.js");
app.use(express.json());
app.use(cors())
app.use(Aouth)
app.use(userRouter);
app.use(adminRouter);
app.listen(port, async () => {
  try {
    await connection();
    console.log("listening on port " + `http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
});
