const app = require("../app/app");
const Admin = require('../models/admin.model');
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


  test("GET /admin/all", async () => {
    const admin = await Admin.create({ full_name: "root2", phone: "21262134626" ,password : "AA1221" });
  
    await supertest(app).get("/admin/all")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(admin.id);
        expect(response.body[0].full_name).toBe(admin.full_name);
        expect(response.body[0].phone).toBe(admin.phone);
        expect(response.body[0].password).toBe(admin.password);
      });
  });