require("dotenv").config();
const express = require("express");
const app = express();
const port = 6666;
const {bookingProcess} = require('./service/booking')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/book", async (req, res) => {
  const data = await bookingProcess(req)
  res.json(data);
});
app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});