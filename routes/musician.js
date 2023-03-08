const express = require("express");
const router = express.Router();
const { Musician } = require("../Musician");
const { check, validationResult } = require("express-validator");

router.get('/', async (req, res) => {
    const data = await Musician.findAll();
    return res.json(data);
});

router.get('/:id', async (req, res) => {
    const data = await Musician.findByPk(req.params.id);
    return res.json(data);
})

router.post('/', async (req, res) => {
    const musician = await Musician.create(req.body);
    res.json(musician);
})

router.put('/:id', async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.send(musician);
})

router.delete('/:id', async (req, res) => {
    const musician = await Musician.destroy({
        where: {
            id: req.params.id
        }
    });
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

module.exports = router;