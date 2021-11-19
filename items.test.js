process.env.NODE_ENV ="test";

const request = require("supertest");

const app = require("./app")
let items = require("./fakeDb");

let item = { name: "peas", price: 2.50 }

beforeEach(async () => {
    items.push(item);
});

afterEach(async () => {
    items.length = 0;
});

describe("GET /items", function () {
    test("Get item list", async function () {
        const resp = await request(app).get(`/items`);
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", function () {
    test("Get a single item from list", async function () {
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);
    });

    test("404 when no item found", async function () {
        const resp = await request(app).get(`/items/s`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("post an item to the list", async function () {
        const resp = await request(app).post(`/items`)
        .send({
            name : "mango",
            price : 5.00
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body.added.name).toEqual("mango");
        expect(resp.body.added.price).toEqual(5.00);
        expect(items).toHaveLength(2);
    });
});

describe("PATCH /items/:name", function () {
    test("update a single item from list", async function () {
        const resp = await request(app).patch(`/items/${item.name}`)
        .send({
            name : "chango"
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual({
            name : "chango"
        });
    });

    test("404 when no item found", async function () {
        const resp = await request(app).patch(`/items/s`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("delete an item from the list", async function () {
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted"});
        expect(items).toHaveLength(0);
    });
});