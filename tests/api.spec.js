const request = require('supertest');

describe('接口测试', function() {
  it('/api/post', function(done) {
    request('http://172.16.5.121:12306')
      .post('/api/post')
      .send({name: 'yd'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body.data)
        if (err) return done(err);
        done();
      })
  })
})