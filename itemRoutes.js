const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items = require("./fakeDb")


router.get("/", (req, res) => {
    return res.json({ items });
});

router.post("/", (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price}
    items.push(newItem);
    res.status(201).json( {added: newItem});
});

router.get("/:name", (req, res) =>{
    const foundItem = items.find(item => item.name == req.params.name)
    if (foundItem == undefined) {
        throw new ExpressError("Item Not Found", 404);
    }
    res.json({ item: foundItem});
});

router.patch("/:name", (req, res) =>{
    const foundItem = items.find(({ name }) => name == req.params.name)
    if (foundItem == undefined) {
        throw new ExpressError("Item Not Found", 404);
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    res.json({ item: foundItem});
});

router.delete("/:name", (req, res) =>{
    const foundItem = items.find(({ name })=> name == req.params.name)
    console.log(foundItem);
    if (foundItem == undefined) {
        throw new ExpressError("Item Not Found", 404);
    }
    console.log(foundItem);
    items.splice(items.indexOf(foundItem), 1);
    res.json({ message: "Deleted"});
});

module.exports = router;
