"use strict"; 

const express = require("express");
const { items } = require("./fakeDb");
const router = new express.Router();

const { NotFoundError, BadRequestError } = require("./expressError");

/**
 * Returns items object
    { items: [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
    ]}
 */
router.get("", function (req, res) {
    return res.json({ items });
});

/** 
 * Adds new item to db
 * Returns added item:
 *   {added: {name: "popsicle", price: 1.45}
 */
router.post("", function (req, res) {
    const item = req.body;

    if (!item.name || !item.price || isNaN(Number(item.price))) {
        throw new BadRequestError("Enter a valid item and price.");
    }
    //console.log(item)
    items.push(item);
    return res.json({added: item});
});

/** Returns item specified in query param */
router.get("/:name", function (req, res) {

    const itemName = req.params.name;

    for(let item of items) {
        if (item.name === itemName) {
            return res.json(item);
        }
    }

    throw new NotFoundError;
});

/** Updates item in db
 * Returns updated item
 *   {updated: {name: "new popsicle", price: 2.45}}
 */
router.patch("/:name", function(req, res) {

    const itemName = req.params.name;
    const updatedItem = req.body;

    for (let i = 0; i < items.length; i++) {
        if (items[i].name === itemName) {
            items[i] = updatedItem;
            return res.json({updated: updatedItem});
        }
    }

    throw new NotFoundError;
});

/** Delete item from db
 * Returning {message: "Deleted"}
 */
router.delete("/:name", function(req, res) {

    const itemName = req.params.name;
    
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === itemName) {
            items.splice(i, 1);
            return res.json({message: "Deleted"});
        }
    }

    throw new NotFoundError;
});

module.exports = router;                              // don't forget this!      