const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let missingString="";
let invalidCharPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37#';
let invalidLenPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
let unsolvable= '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solution= '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('UnitTests', () => {

    suite('Function validate(puzzleString)', function() {
    
    test('Valid puzzle string', function(done) {
   //   let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.validate(validPuzzle),"valid");
      done();
    });
      
    test('Puzzle string with invalid characters', function(done) {
    //  let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37#';
      assert.equal(solver.validate(invalidCharPuzzle),"Invalid characters in puzzle");
      done();
    });   
      
    test('Puzzle string with invalid length', function(done) {
      //let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.371#';
      assert.equal(solver.validate(invalidLenPuzzle),"Expected puzzle to be 81 characters long");
      done();
    });    
    
    });
  
    suite('Function  checkRowPlacement(puzzleString, row, column, value)', function() {
    
    test('Valid row placement', function(done) {
      //let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="1";
      let column="1";
      let value="4"
      assert.propertyVal(solver.checkRowPlacement(validPuzzle, row, column, value),"valid",true);
      done();
    });
      
    test('invalid row placement', function(done) {
      //let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="1";
      let column="1";
      let value="2"
      assert.propertyVal(solver.checkRowPlacement(validPuzzle, row, column, value),"valid",false);
      assert.property(solver.checkRowPlacement(validPuzzle, row, column, value),"conflict");
      done();
    });
      
    
    });
  
   suite('Function  checkColPlacement(puzzleString, row, column, value) ', function() {
    
    test('Valid column placement', function(done) {
   //   let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="2";
      let column="2";
      let value="8"
      assert.propertyVal(solver.checkColPlacement(validPuzzle, row, column, value),"valid",true);
      done();
    });
      
    test('invalid column placement', function(done) {
     // let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="2";
      let column="2";
      let value="5"
      assert.propertyVal(solver.checkColPlacement(validPuzzle, row, column, value),"valid",false);
      assert.property(solver.checkColPlacement(validPuzzle, row, column, value),"conflict");
      done();
    });
      
    
    });
  
     suite('Function  checkRegionPlacement(puzzleString, row, column, value) ', function() {
    
    test('Valid region placement', function(done) {
   //   let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="2";
      let column="2";
      let value="8"
      assert.propertyVal(solver.checkRegionPlacement(validPuzzle, row, column, value),"valid",true);
      done();
    });
      
    test('Invalid region placement', function(done) {
     // let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let row="2";
      let column="2";
      let value="5"
      assert.propertyVal(solver.checkRegionPlacement(validPuzzle, row, column, value),"valid",false);
      assert.property(solver.checkRegionPlacement(validPuzzle, row, column, value),"conflict");
      done();
    });
      
    
    });
  
  suite('Function  solve(puzzleString)', function() {
    
    test('Valid puzzle', function(done) {
      //let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.property(solver.solve(validPuzzle),"solution");
      done();
    });
      
    test('Invalid puzzle', function(done) {
      //let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37#';
      assert.property(solver.solve(unsolvable),"error");
      done();
    });
      
       
    test('expected solution', function(done) {
    //  let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.propertyVal(solver.solve(validPuzzle),"solution",solution);
      done();
    });
    
    });
});
