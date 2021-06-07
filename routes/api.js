'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
          let puzzle = (req.body.puzzle=="" || req.body.puzzle==undefined)
                  ? res.json({error: 'Required field(s) missing'}): req.body.puzzle;
    
    
          let coordinate = (req.body.coordinate=="" || req.body.coordinate==undefined)
                  ? res.json({error: 'Required field(s) missing'}): req.body.coordinate.toUpperCase();
    
    
          let value = (req.body.value=="" || req.body.value==undefined)
                  ? res.json({error: 'Required field(s) missing'}): req.body.value;
    
     
  let regex = /^[A-I][1-9]$/;
    if(regex.test(coordinate)==false){
       return  res.json({error: 'Invalid coordinate'});
    }  
    
     let regexVal = /^[1-9]$/;
    if(regexVal.test(value)==false){
       return  res.json({error: 'Invalid value'});
    }  
    
    
       
    let validatePuzzle=solver.validate(puzzle);
    
    
    if(validatePuzzle!=="valid"){
      
   return res.json({error: validatePuzzle});
      
    }
    
          let row = coordinate.charCodeAt(0) - 65;
          let column = parseInt(coordinate.charAt(1)) - 1;
    
 //  let apuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    
      
   // console.log(typeof apuzzle);
    
  //  console.log(row +" "+ column+ " "+value);
    
 let verify = solver.checkRegionPlacement(puzzle,row,column,value);
    
     res.send(verify);
    });
    
  
  app.route('/api/solve')
    .post((req, res) => {
    
       let puzzle = (req.body.puzzle=="" || req.body.puzzle==undefined)
                  ? res.json({error: 'Required field missing'}): req.body.puzzle;
    
       
     
   let solved = solver.solve(puzzle);
    

    if (solved.error){
      return  res.json({error:solved.error})
    }
    
    return res.json({solution:solved.solution});

    });
};
