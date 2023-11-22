/**
 * @fileoverview This file contains tests for the userController functions.
 * At the moment it includes tests for creating a new user, signing in a user, and signing out a user.
 * The tests use the supertest library to make HTTP requests to the app and chai library for assertions.
 * The app is imported from '../app' and the database connection pool is imported from '../config/connection'.
 * The tests are organized using the describe and it functions from the Mocha testing framework.
 * The before function is used to delete all data from the users table and reset the id_users sequence before testing.
 * Each test case sends an HTTP request to the corresponding route and asserts the response status and message.
 */

/* global describe, it, before, after */

/* These are tests for all the functions in userController**/

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app'); // path to your app
const pgPool = require('../config/connection');

describe('User Controller', function () {
  // Delete all data from the users table and reset the id_users sequence before testing
  before(function (done) {
    // Delete all data from the users table
    pgPool.query('DELETE FROM users', (err) => {
      if (err) throw err;
      // Reset the id_users sequence
      pgPool.query('ALTER SEQUENCE public.users_id_seq RESTART WITH 1', (err) => {
        if (err) throw err;
        done();
      });
    });
  });

  after(function (done) {
    pgPool.end();
    done();
  });

  describe('POST /createUser', function () {
    it('should create a new user', function (done) {
      const user = { uname: 'test', pw: 'test', email: 'test@test.com' };
      request(app) // this is the supertest object to make HTTP requests
        .post('/users/signup') // send a POST request to the /users/signup route
        .send(user) // send the user object as the request body
        .end((_err, res) => {
          expect(res.status).to.equal(201); // assert that the response status is 201
          expect(res.body.message).to.equal('User created successfully'); // assert that the response message is 'User created successfully'
          done();
        });
    });
  });

  describe('POST /signIn', function () {
    it('should sign in a user', function (done) {
      const user = { uname: 'test', pw: 'test' };
      request(app)
        .post('/users/signin')
        .send(user)
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User signed in successfully');
          done();
        });
    });
  });

  describe('POST /signOut', function () {
    it('should sign out a user', function (done) {
      request(app)
        .post('/users/signout')
        .end((_err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Logged out successfully');
          done();
        });
    });
  });
});
