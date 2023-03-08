const express = require("express");
const app = express();
const {sequelize} = require("./db");
const musician = require('./routes/musician');

const port = 3000;

//TODO

app.use(express.json());
app.use("/musicians", musician)

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

