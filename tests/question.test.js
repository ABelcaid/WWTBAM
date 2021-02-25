const app = require("../app/app");
const Question = require('../models/question.model');
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


  test("GET /getQuestion/all", async () => {
    const question = await Question.create({ question: "'Ishikawa' is the old name of which city?", answer: "Ibaraki" ,points : 10 ,false_choices : ["Yokohama","Hiroshima","Sapporo" ]});
  
    await supertest(app).get("/getQuestion/all")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(question.id);
        expect(response.body[0].question).toBe(question.question);
        expect(response.body[0].points).toBe(question.points);
        expect(response.body[0].false_choices).toBe(question.false_choices);
      });
  });