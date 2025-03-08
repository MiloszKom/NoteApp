const mongoose = require("mongoose");
const app = require("./app");
const http = require("http");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

const port = process.env.PORT || 5000;
const hostname = "0.0.0.0";

const server = http.createServer(app);

app.set("trust proxy", 1);

server.listen(port, hostname, () => {
  console.log(`Listening to requests on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💣 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
