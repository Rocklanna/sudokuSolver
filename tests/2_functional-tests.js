const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let missingString="";
let invalidCharPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37#';
let invalidLenPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
let unsolvable= '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solution= '135762984946381257728459613694517832812936745357824196473298561581673429269145378';


chai.use(chaiHttp);

suite('Functional Tests', () => {

    suite('Routing Tests', function(){
     suite('POST /api/solve=> puzzleString', function() {
     
        test('Solve a puzzle with valid puzzle string', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({puzzle: validPuzzle})
        .end(function(err, res){
          assert.equal(res.body.solution,solution);
          done();
        })
          
        })
       
        test('Solve a puzzle with missing puzzle string', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({puzzle: missingString})
        .end(function(err, res){
          assert.equal(res.body.error,'Required field missing');
          done();
        })
          })
       
        test('Solve a puzzle with invalid characters', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({puzzle: invalidCharPuzzle})
        .end(function(err, res){
          assert.equal(res.body.error,'Invalid characters in puzzle');
          done();
        })
       })
       
            
        test('Solve a puzzle with incorrect length', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({puzzle: invalidLenPuzzle})
        .end(function(err, res){
          assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
          done();
        })
       })
       
        test('Solve a puzzle that cannot be solved', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({puzzle: unsolvable})
        .end(function(err, res){
          assert.equal(res.body.error,'Puzzle cannot be solved');
          done();
        })
       })
       
     })
      
         suite('POST /api/check=> puzzleString', function() {
     
        test('Check a puzzle placement with all fields', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: validPuzzle, coordinate:"B2",value:"4"})
        .end(function(err, res){
          assert.equal(res.body.valid,true);
          done();
        })
          
        })
       
        test('Check a puzzle placement with single placement conflict', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: validPuzzle, coordinate:"A2",value:"8"})
        .end(function(err, res){
          assert.lengthOf(res.body.conflict,1);
          done();
        })
          })
       
        test('Check a puzzle placement with multiple placement conflicts', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: validPuzzle, coordinate:"B1",value:"3"})
        .end(function(err, res){
          assert.lengthOf(res.body.conflict,2);
          done();
        })
       })
       
     test('Check a puzzle placement with all placement conflicts', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: validPuzzle, coordinate:"A2",value:"2"})
        .end(function(err, res){
          assert.lengthOf(res.body.conflict,3);
          done();
        })
       })
       
         test('Check a puzzle placement with missing required fields', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: validPuzzle,value:"2"})
        .end(function(err, res){
          assert.equal(res.body.error,'Required field(s) missing');
          done();
        })
       })
           
          test('Check a puzzle placement with invalid characters', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: invalidCharPuzzle,coordinate:"A2",value:"3"})
        .end(function(err, res){
          assert.equal(res.body.error,'Invalid characters in puzzle');
          done();
        })
       })    
       
         test('Check a puzzle placement with incorrect length', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: invalidLenPuzzle,coordinate:"A2",value:"3"})
        .end(function(err, res){
          assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
          done();
        })
       })  
           
       test('Check a puzzle placement with invalid placement coordinate', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: invalidCharPuzzle,coordinate:"J1",value:"3"})
        .end(function(err, res){
          assert.equal(res.body.error,'Invalid coordinate');
          done();
        })
       })    
       
       test('Check a puzzle placement with invalid placement value', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({puzzle: invalidCharPuzzle,coordinate:"A2",value:"0"})
        .end(function(err, res){
          assert.equal(res.body.error,'Invalid value');
          done();
        })
       })    
           
           
     })
   })   
});

