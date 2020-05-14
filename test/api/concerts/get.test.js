const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model.js');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
  
      const uri = await fakeDB.getConnectionString();
  
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      const testConcOne = new Concert({"performer":"John Doe","genre":"Rock","price":25,"day":1,"image":"/img/uploads/1fsd324fsdg.jpg"});
      await testConcOne.save();

      const testConcTwo = new Concert({"performer":"Rebekah Parker","genre":"R&B","price":25,"day":1,"image":"/img/uploads/2f342s4fsdg.jpg"});
      await testConcTwo.save();

      const testConcThree = new Concert({"performer":"Maybell Haley","genre":"Pop","price":40,"day":2,"image":"/img/uploads/hdfh42sd213.jpg"});
      await testConcThree.save();
  
    } catch(err) {
      console.log(err);
    }
  
});

  it('/should return concerts of selected performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected price', async () => {
    const res = await request(server).get('/api/concerts/price/30/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('/should return concerts of selected day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

});

