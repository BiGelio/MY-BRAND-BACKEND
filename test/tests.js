import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import server from "../index.js";
const { expect } = chai;
describe("users api", () => {

    it("It should post new user!", (done) => {
        const user = {
            firstName: "meandyou",
            lastName: "meandyou",
            email: "meandyou18@gmail.com",
            password: "12345678",
            confirmPassword: "12345678"
        }
        chai.request(server)
            .post("/api/user")
            .send(user)
            .end((err, res) => {
                const { Message } = res.body
                expect(res.status).to.eq(201);
                expect(Message)
                expect(Message).to.eq("User created successfully! You can login now")
                done();
            })
    });


})