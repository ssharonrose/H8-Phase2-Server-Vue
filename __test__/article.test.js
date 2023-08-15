const app = require("../app")
const request = require('supertest') //supertest
const DeleteData = require('../lib/deleteData')
const { Article } = require('../models/index.js')
const { inputArticleData } = require('../lib/createData')

beforeAll(() => {
    inputArticleData()
})

afterAll(() => {
    DeleteData()
});

describe("testRegister", () => {
    describe("testRegisCus", () => {
        it("check register Customer 201", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "apa@mail.com",
                    password: "admin"
                })
                .expect(201)
            expect(response.body.message.email).toBe('apa@mail.com')
        })
        it("check Register Customer tanpa email 400", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "",
                    password: "admin"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check Register Customer tanpa password 400", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "apa@mail.com",
                    password: ""
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check Register Customer email string kosong 400", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "",
                    password: "admin"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check Register Customer password string kosong 400", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "apa@mail.com",
                    password: ""
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check register Customer 400 email terdaftar", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "apa@mail.com",
                    password: "admin"
                })
                .expect(400)
                .set('Content-Type', 'application/x-www-form-urlencoded')
            console.log(response.body)
        })
        it("check register Customer format email salah", async () => {
            const response = await request(app)
                .post("/customers/register")
                .send({
                    email: "apa",
                    password: "admin"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                // console.log(response.body, 'line 22')
                .expect(400)
        })
    })
    describe("testLoginCus", () => {
        it("testLoginCus berhasil 200", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({
                    email: "apa@mail.com",
                    password: "admin"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(200)
            // console.log(response.body, 'line 22 <<<')
            expect(response.body.email).toBe('apa@mail.com')

        })
        it("testLoginCus tidak berhasil 401 password salah", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({
                    email: "apa@mail.com",
                    password: "staff"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(401)
            // console.log(response.body, 'line 22<<<<<')
            expect(response.body).toHaveProperty("message", 'error invalid password')
        })
        it("testLoginCus tidak berhasil 401 email tidak terdaftar", async () => {
            const response = await request(app)
                .post("/customers/login")
                .send({
                    email: "shar@mail.com",
                    password: "admin"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(401)
            console.log(response.body, 'line 125')
            expect(response.body).toHaveProperty("message", 'Please register first or invalid email')
        })
    })
})

describe("testEntitasUtama", () => {
    it('renderTanpaToken 1 pagination', async () => {
        const response = await request(app)
            .get("/customers/readAllArticle")
            .query({
                limit: 8
            })
            .expect(200)
        expect(response.body.data).toHaveLength(8)
    })
    it('renderTanpaToken 1 query Filter', async () => {
        const response = await request(app)
            .get(`/customers/readAllArticle`)
            .query({ page: 1 })
            .expect(200)
        console.log(response.body, "line 147<<<")
        expect(response.body.statusCode).toBe(200)
    })
})
it('renderTanpaToken 1 params', async () => {
    const id = 1
    const response = await request(app)
        .get(`/articles/${id}`)
        .expect(403)
    // console.log(response.body, "line 147<<<")
    expect(response.body).toHaveProperty("message", 'Forbidden error di authentication')

})