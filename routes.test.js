const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");

const popsicle = { name: "popsicle", price: 2.50 }
const cheerios = { name: "cheerios", price: 3.40 }

beforeEach(function () {
    items.push(popsicle);
    items.push(cheerios);
});

afterEach(function () {
    items = [];
});

describe("GET /items", function () {
    // Successful
    it("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual({
            items: [
                { name: "popsicle", price: 2.50 },
                { name: "cheerios", price: 3.40 }
            ]
        });
    });
});

describe("GET /items:name", function () {
    // Successful
    it("Get a specific item", async function () {
        const resp = await request(app).get(`/items/popsicle`);

        expect(resp.body).toEqual({ name: "popsicle", price: 2.50 });
    });

    // Failure
    it("Get a 404 page", async function () {
        const resp = await request(app).get(`/items/NOpopsicle`);

        expect(resp.statusCode).toEqual(404);
    });
});

describe("Post /items", function () {
    // Successful
    it("POST item success", async function () {
        const newItem = {name: "chips", price: 5.50}
        
        const resp = await request(app).post('/items').send(newItem);

        expect(resp.body).toEqual({added: newItem});
        expect(resp.statusCode).toEqual(200);
    });

    // Failure
    it("POST item failure", async function () {
        const newItem = {name: "chips", price: "NaN"}
        
        const resp = await request(app).post('/items').send(newItem);

        expect(resp.statusCode).toEqual(400);
    });
});

describe("Patch /items/popsicle", function () {
    // Successful
    it("PATCH item success", async function() {
        const newItem = {name: "new popsicle", price: 5.25}

        const resp = await request(app).patch('/items/popsicle').send(newItem);

        expect(resp.body).toEqual({updated: newItem});
        expect(resp.statusCode).toEqual(200);
    })
});

describe("Delete /items/popsicle", function () {
    // Successful
    it("DELETE item success", async function() {
        console.log(items)
        const resp = await request(app).delete('/items/popsicle');

        expect(response.statusCode).toEqual(200);
        expect(resp.body).toEqual({message: "Deleted"});
    });
});