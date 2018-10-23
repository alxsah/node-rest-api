process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const Booking = require('../models/booking');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Booking', () => {
  let testUser = {
    username: 'testAccount',
    password: 'password1',
  };
  let testToken;

  beforeEach((done) => {
    Booking.remove({}).then(() => {
      chai.request(server)
          .post('/login')
          .send(testUser)
          .end((err, res) => {
            if (res) testToken = res.body.token;
            done();
          });
    });
  });

  describe('/GET bookings', () => {
    it('should retrieve all bookings', (done) => {
      chai.request(server)
          .get('/bookings')
          .set('Authorization', `Bearer ${testToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/POST bookings', () => {
    it('should store a booking when posted', (done) => {
      const testBooking = {
        name: 'My Booking',
        date: '02/04/2018',
      };
      chai.request(server)
          .post('/bookings')
          .set('Authorization', `Bearer ${testToken}`)
          .send(testBooking)
          .end((err, res) => {
            res.should.have.status(201);
            chai.request(server)
                .get('/bookings')
                .set('Authorization', `Bearer ${testToken}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                  done();
                });
          });
    });
  });
});
