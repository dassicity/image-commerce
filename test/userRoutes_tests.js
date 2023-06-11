const chai = require('chai');
const chaiHttp = require('chai-http');

const should = require('chai').should();
const server = require('../index');
require("dotenv").config();

const API = process.env.BASE_URL;

chai.use(chaiHttp);

describe("/POST testing routes: User signup", () => {
    it("Should create a new user", () => {
        chai.request(API)
            .post("/api/v1/user/signup")
            .send({
                "name": "Soumyal Das",
                "email": "hello@soadas.com",
                "password": "Das#$%&00",
                // isSeller: false
            })
            .end((err, res) => {
                // console.log(res);
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.contain('Welcome Soumyal Das!');
            });
    })
})