class SudokuSolver {

  validate(puzzleString) {
    
let regex = /[^1-9.]/g;
    if(regex.test(puzzleString)==true){
       return "Invalid characters in puzzle";
    }
      else if((puzzleString.length<81)||(puzzleString.length>81)){
        return "Expected puzzle to be 81 characters long";
     }
    else{
      return "valid"
    }
    
  }

  checkRowPlacement(puzzleString, row, column, value) {
   
       
   let failed = {
     valid:false,
     conflict: ["row"]
   }
       
   let pass =    {
     valid:true
   }
   
let rowBoard = this.createRowBoard(puzzleString);
    
    if(rowBoard[row][column]==value){
      rowBoard[row][column]=0;
    }
    
      
 let status= (rowBoard[row].includes(value)) ? failed: pass;
                                 
   return status;

    
  }


  
  
  checkColPlacement(puzzleString, row, column, value) {
    
  let currentStatus = this.checkRowPlacement(puzzleString, row, column, value);
    
        
    let colBoard = [];
    let i=0;
    for(let index=0; index<9;index++){
      colBoard.push([puzzleString.charAt(i)]);
      i++;
    }
    
    
    
    let input=9;
    for(let j=1; j<9;j++){
      
      for(let k=0; k<9;k++){
        
        colBoard[k].push(puzzleString.charAt(input));
        input++;
      
    }
           
    }
    
    if(colBoard[column][row]==value){
      colBoard[column][row]=0;
    } 
    
let statusCol= (colBoard[column].includes(value)) ? "failed" :"pass";
    
  if   (currentStatus.hasOwnProperty("conflict")===true && statusCol ==="failed"){
        currentStatus["conflict"].push("column");
  }
  else if(currentStatus.hasOwnProperty("conflict")===false && statusCol ==="failed") {
       currentStatus["conflict"]=["column"];
  }                              

 
   return currentStatus;

  }

checkRegionPlacement(puzzleString, row, column, value) {
  
   let currentStatus = this.checkColPlacement(puzzleString, row, column, value); 
 

  
let startPoints=

{
0:[0,1,2],
3:[3,4,5],
6:[6,7,8],
};
 
        
let startRow;
let startCol  


Object.keys(startPoints).forEach((key)=>{

if(startPoints[key].includes(row)){
startRow = key ;
}

});
  

Object.keys(startPoints).forEach((key)=>{

if(startPoints[key].includes(column)){
startCol = key ;
}

});  
    
//let grid;    
let gridRowEnd = parseInt(startRow)+3;  
let gridColEnd =parseInt(startCol) +3;      
let rowPlacement = this.createRowBoard(puzzleString);
let found = false;    
    
 
    if(rowPlacement[row][column]==value){
      rowPlacement[row][column]=0;
    } 
    
for (let gridStart=startRow; gridStart<gridRowEnd; gridStart++){

for (let gridColStart =startCol; gridColStart<gridColEnd; gridColStart++){


 if(rowPlacement[gridStart][gridColStart]==value){
 
    found=true;
     if   (currentStatus.hasOwnProperty("conflict")===true && found ===true){
        currentStatus["conflict"].push("region");
  }
  else if(currentStatus.hasOwnProperty("conflict")===false && found ===true) {
       currentStatus["conflict"]="region";
  }                              
    return currentStatus;
  }
  
} // end of inner for


}   // end of outer for
   if(!found){
      return currentStatus;
    }

  }
  
  
  solve(puzzleString) {
    
    try{
     
    let validatePuzzle=this.validate(puzzleString);
    
    
    if(validatePuzzle!=="valid"){
      
   return {error: validatePuzzle};
      
    }
    
  let orgBoard = this.createRowBoard(puzzleString);  
  let arrayBoard = this.createRowBoard(puzzleString);
 
    // ***** update arrayBoard *****
    for( let j=0; j<9; j++){
      
 
      
      for(let k =0; k<9; k++){
  
        if(arrayBoard[j][k]==='.'){
          
          arrayBoard[j][k]=[];
          
          for(let i = 1; i<=9; i++){
             
          if(this.checkRegionPlacement(puzzleString,j,k,i.toString()).hasOwnProperty('conflict')==false){
              arrayBoard[j][k].push(i);
            }
            
          }
        }
      }// end of for 2
      
    }// end of for 1   
    // ***** update arrayBoard *****
      
      
  // ***** solve Puzzle *****  
       
     for( let j=0; j<9; j++){
           
        for(let k =0; k<9; k++){
  
         let assigned = false;
        
        if(Array.isArray(arrayBoard[j][k])){
          
        
          let index = (orgBoard[j][k]===".") ? 0 : (arrayBoard[j][k].indexOf(orgBoard[j][k])+1);
    
          
        for(let i=index; i<arrayBoard[j][k].length; i++){
          
          let updatedPuzzle = this.updatePuzzleString(orgBoard);
          
         if(this.checkRegionPlacement(updatedPuzzle,j,k,arrayBoard[j][k][i].toString()).hasOwnProperty('conflict')==false){
                  orgBoard[j][k]=arrayBoard[j][k][i];
                  assigned  = true;
                  break;
            }// end of if
        
          
        }// end of for 3
          
          if (assigned == false){
    
             orgBoard[j][k]=".";
         let index =  this.backTrack(j,k,arrayBoard);
   
            j=index[0];
            k=index[1];
        
          }
       
        }
      }// end of for 2
      
    }// end of for 1   
      
     // ***** solve Puzzle *****    
    
    let puzzleToString =  this.updatePuzzleString(orgBoard);
        
    return {solution:puzzleToString};
    
    }//end of try
    
    catch(err){
      return {error:"Puzzle cannot be solved"};
    }// end of catch
    
    }// solve 
  
  
  
  
  
  
    createRowBoard(puzzleString){
     
    let puzzleArray = [];
    
    let i=0;
    
    for( let j=0; j<9; j++){
      
      let rows =[];
      
      for(let k =0; k<9; k++){
        
        rows.push(puzzleString.charAt(i))
        i++;
      }
      puzzleArray.push(rows);
    }
    
    
    return puzzleArray;
    
  } // end of createRowBoard
  
  
  updatePuzzleString(orgBoard){
   let updatedString = orgBoard.reduce((sum,item)=>{ 
                              return sum+= item.reduce((add,innerItem)=>{ 
                                           return add+=innerItem},"")
                              },"") ;
    
    return updatedString;
}// end of updatePuzzleString
  
  
  backTrack(row,column,arrayBoard){
    
   
  if(column-1<0){
        row--;
    column+=8;
    
  }
  else{
        column--;
  }
    
    let index=[];
        
          
        if(Array.isArray(arrayBoard[row][column])){
          
             
              if(column-1<0){
                     row--;
                     column+=8;
    
               }
               else{
                   column--;
              }
    
          
          index.push(row);
          index.push(column);
          return index;
       
        }

   return this.backTrack(row,column,arrayBoard);
  }  // end of backTrack
  
  
}



module.exports = SudokuSolver;

