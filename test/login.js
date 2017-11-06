process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models').database_mongod.user;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    // beforeEach((done) => {
    //     User.remove({}, err => {
    //         done();
    //     })
    // })
    //test POST login
    describe('POST login', () => {
        it('it should show notification need enter full info login', (done) => {
            let infoLogin = {
                username: '',
                password: ''
            }
            chai.request(server)
                .post('/login')
                .send(infoLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please enter your login information!');
                    done();
                })
        });
        it('it should show notification username is not exist', (done) => {
            let infoLogin = {
                username: 'quanganh123',
                password: '123'
            }
            chai.request(server)
                .post('/login')
                .send(infoLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Username is not exist!');
                    done();
                })
        });
        it('it should show notification password is incorrect', (done) => {
            let infoLogin = {
                username: 'vupn199955',
                password: '123'
            }
            chai.request(server)
                .post('/login')
                .send(infoLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Password is incorrect!');
                    done();
                })
        });
        it('it should return token', (done) => {
            let infoLogin = {
                username: 'vupn199955',
                password: 'ngocvu12'
            }
            chai.request(server)
                .post('/login')
                .send(infoLogin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('token')
                    done();
                })
        });
    })
})