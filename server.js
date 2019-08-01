const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const path = require("path");
//Connect Database
connectDB();

app.use(cors());
//Initialize Body Parser
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  connectClient();
}

const PORT = process.env.PORT || 5000;

function connectClient() {
  var link;
  app.get(`/${link}`, (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "html", link));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
