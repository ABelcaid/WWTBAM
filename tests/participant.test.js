const app = require("../app/app");
const Participant = require('../models/participant.model');
const supertest = require("supertest");
const mongoose = require('mongoose');
require('dotenv').config()



beforeEach((done) => {
    mongoose.connect(process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });


  test("GET /participant/all", async () => {
    const participant = await Participant.create({ full_name: "abdo", phone: "21262134626" ,password : "AA1221" ,age : 11 ,email : "belcaid@mail.com"});
  
    await supertest(app).get("/participant/all")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(participant.id);
        expect(response.body[0].full_name).toBe(participant.full_name);
        expect(response.body[0].phone).toBe(participant.phone);
        expect(response.body[0].password).toBe(participant.password);
        expect(response.body[0].age).toBe(participant.age);
        expect(response.body[0].email).toBe(participant.email);
      });
  });