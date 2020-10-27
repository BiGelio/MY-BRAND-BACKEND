import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import server from "../index.js";
import { expect } from "chai";
describe("users api", () => {
    describe("POST api/user", () => {
        it("It should post new user!", (done) => {
            const user = {
                firstName: "meandyou",
                lastName: "meandyou",
                email: "meandyou5@gmail.com",
                password: "123456789",
                confirmPassword: "123456789"
            }
            chai.request(server)
                .post("/api/user")
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.eq(201);
                    done();
                })
        })

    })

})