require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 3000;
const app = express();
const tasksRouter = require("./routes/tasks");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
