const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");
const { items } = require("./fakeDb");

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data

/**
 * Returns items object
    { items: [
    { name: "popsicle", price: 1.45 },
    { name: "cheerios", price: 3.40 }
    ]}
 */
app.get("/items", function (req, res) {
    return res.json({ items });
});

app.post("/items", function (req, res) {
    const item = req.body;
    //console.log(item)
    items.push(item);
    return res.json({ "added": `${(item)}` });
});

app.get("/items/:name", function (req, res) {

    const itemName = req.params.name;

    for(let item of items) {
        if (item.name === itemName) {
            return res.json(item);
        }
    }

    throw new NotFoundError;
});

app.use(function (req, res) {                      // handle site-wide 404s
    throw new NotFoundError();
});

app.use(function (err, req, res, next) {           // global err handler
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
});

module.exports = app;                              // don't forget this!