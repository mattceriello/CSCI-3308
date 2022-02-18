// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {

    //test case 1: Positive test on API search response
    it("Api search works as expected", (done) => {
    chai
      .request(server)
        .post("/search")
        .send({title: "Paradise"})
        .end((err, res) => {
            expect(res.body).to.have.property('title').eq("Paradise");
            done();
        });
    });

    //test case 2: Positive test on review filter response
    it("Review filter works as expected", (done) => {
        chai
            .request(server)
            .post("/filter")
            .send({title: "Paradise"})
            .end((err, res) => {
                expect(res.body).to.have.property('title').eq("Paradise");
                done();
            });
    });


});
