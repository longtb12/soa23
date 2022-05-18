require("dotenv").config();
const express = require("express");
const app = express();
const port = 5555;
const {saveLogs} = require('./service/index')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/save-logs", async (req, res) => {
  const data = await saveLogs(req)
  res.json(data);
});
app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});