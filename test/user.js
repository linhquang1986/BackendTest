process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../models').database_mongod.user;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let appConfig = require('../config');
let api_key = appConfig.integrations.qa.apiKey;
//console.log(server)
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    describe('GET user', () => {
        it('it should not response', done => {
            chai.request(server)
                .get('/users/getAll')
                .end((err, res) => {
                    res.should.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false)
                    done();
                })
        })

        it('it should return list users', done => {
            chai.request(server)
                .get('/users/getAll')
                .set('api_key', api_key)
                .end((err, res) => {
                    res.should.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        it('it should return a user', done => {
            let newuser = new User({
                username: 'quanganhtest',
                passwork: '123'
            })
            newuser.save((err, user) => {
                chai.request(server)
                    .get('/users/findByUsername/' + newuser.username)
                    .set('api_key', api_key)
                    .end((err, res) => {
                        res.should.status(200);
                        res.body.should.be.a('array');
                        done();
                    })
            })
        })
    });

    describe('POST user', () => {
        it('it should return required error', done => {
            let user = {}
            chai.request(server)
                .post('/users/addUser')
                .send(user)
                .set('api_key', api_key)
                .end((err, res) => {
                    res.should.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User validation failed');
                    res.body.should.have.property('name').eql('ValidationError');
                    res.body.should.have.property('errors').should.be.a('object');
                    done();
                })
        })

        it('it should return error object', done => {
            let user = {
                "username": "vupn199955",
                "password": "123",
                "admin": true
            }
            chai.request(server)
                .post('/users/addUser')
                .send(user)
                .set('api_key', api_key)
                .end((err, res) => {
                    res.should.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errmsg')
                    res.body.should.have.property('code').eql(11000);
                    done();
                })
        })
    })
})