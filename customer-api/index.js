require("dotenv").config();
const express = require("express");
const app = express();
const port = 6666;
const {insert} = require('./service/customer')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/insert", async (req, res) => {
  const data = await insert(req)
  res.json(data);
});
app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});