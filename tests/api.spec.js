const request = require('supertest');
const Koa = require('koa');
const expect = require('chai').expect;
const app = new Koa();

describe('接口测试', function() {
  it('/api/post', function(done) {
    request('http://169.254.100.0:12306')
      .post('/api/post')
      .send({name: 'yd'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      })
  })
})