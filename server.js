const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.use(express.json());

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

app.get('/musicians', async (req, res) => {
    const data = await Musician.findAll();
    return res.json(data);
});

app.get('/musicians/:id', async (req, res) => {
    const data = await Musician.findByPk(req.params.id);
    return res.json(data);
})

app.post('/musicians', async (req, res) => {
    const musician = await Musician.create(req.body);
    res.json(musician);
})

app.put('/musicians/:id', async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.send(musician);
})

app.delete('/musicians/:id', async (req, res) => {
    const musician = await Musician.destroy({
        where: {
            id: req.params.id
        }
    });
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})