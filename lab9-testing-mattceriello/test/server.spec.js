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
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });

  // ===========================================================================
  // TODO: Please add your test cases for part A here.
//1. GET /operations
it("Check if ops is type array and size isn't zero.", (done) => {
  chai
    .request(server)
    .get("/operations")
    .end((err, res) => {
      expect(res).to.have.status(200);

      assert.isArray(res.body);
      assert.isNotEmpty(res.body);
      done();
    });
});

//2. GET operations/:id
it("Check that API response has id = 1, property name, property sign", (done) => {
  chai
    .request(server)
    .get("/operations/1")
    .end((err, res) => {
      expect(res).to.have.status(200);

      expect(res.body).to.have.property('id').eq(1);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('sign');
      done();
    });

});

//3. Post /operations
it("check if response has id=4, prop name = name of new oper, prop sign = sign of new oper", (done) =>{
  chai
    .request(server)
    .post("/operations")
    .send({id: 4, name: "Test", sign: "?"})
    .end((err, res) => {
      expect(res).to.have.status(201);

      expect(res.body).to.have.property('id').eq(4);
      expect(res.body).to.have.property('name').eq("Test");
      expect(res.body).to.have.property('sign').eq("?");

      done();
    });
})




  // ===========================================================================
  // TODO: Please add your test cases for part B here.
  it("positive test case for add", (done) =>{
    chai
      .request(server)
      .post("/add")
      .send({num1: 5, num2: 3})
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(res.body.result).to.equal(8);

        done();
      });
  })

  it("positive test case for divide", (done) =>{
    chai
      .request(server)
      .post("/divide")
      .send({num1: 10, num2: 2})
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(res.body.result).to.equal(5);

        done();
      });
  });

  it("negative test case for add", (done) =>{
    chai
      .request(server)
      .post("/add")
      .send({num1: "not_a_num", num2: 2})
      .end((err, res) => {
        assert.strictEqual(res.status, 400);

        done();
      });
  });

  it("negative test case for divide", (done) =>{
    chai
      .request(server)
      .post("/divide")
      .send({num1: 10, num2: 0})
      .end((err, res) => {
        assert.strictEqual(res.status, 400);

        done();
      });
  });




});
