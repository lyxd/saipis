var calculateButton = document.querySelector('.calc-button');
calculateButton.addEventListener('click', function() {
  
  var competencyMatrix = setMatrix('competency');
  var caseMatrix = setMatrix('case');
  
  var expComps = calculateExpComp(competencyMatrix);
  var expDisp = calculateExpDisp(competencyMatrix);
  
  var caseCoef = calculateCaseCoef(caseMatrix, expComps);
  var caseDisp = calculateCaseDisp(caseMatrix);
  
  drawExpComps(expComps);
  drawExpDisp(expDisp);
  drawCaseCoef(caseCoef);
  drawCaseDisp(caseDisp);
  
});

function calculateCaseDisp(matrix) {
  var answer = {};
  
  var arrSC = [];
  var arrDC = [];
  
  function calculateSC(row) {
    return (matrix[row].reduce(function(prev, curr) {      
      return prev + curr;
    }, 0)) / (matrix[row].length - 1);
  }
  
  function calculateDC(row) {
    return (matrix[row].reduce(function(prev, curr, index) {
      
      return prev + Math.pow((curr - arrSC[row]), 2);
      
    }, 0)) / (matrix[row].length - 2);
    
  }
  
  arrSC.push(calculateSC(0));
  arrSC.push(calculateSC(1));
  arrSC.push(calculateSC(2));
  arrSC.push(calculateSC(3));
  
  arrDC.push(calculateDC(0));
  arrDC.push(calculateDC(1));
  arrDC.push(calculateDC(2));
  arrDC.push(calculateDC(3));
  
  return {
    SC: arrSC,
    DC: arrDC
  }
  
}


function calculateCaseCoef(matrix, expComps) {
  
  var answer = [];
  
  function calculateC(row) {
    return (matrix[row].reduce(function(prev, curr) {
      
      return prev + (curr * expComps[row]);
      
    }, 0)) / 
    
    (matrix.reduce(function(prev, curr) {
      return prev + curr.reduce(function(prev, curr) {
        return prev + (curr * expComps[row]);
      }, 0);
    }, 0))
  }
  
  answer.push(calculateC(0));
  answer.push(calculateC(1));
  answer.push(calculateC(2));
  answer.push(calculateC(3));
  
  return answer;
}

function calculateExpDisp(matrix) {
  
  var answer = {};
  
  var arrR = [];
  var arrD = [];
  
  function calculateR(row) {
    return (matrix[row].reduce(function(prev, curr) {
      if(curr === null) {
        return prev;
      }
      
      return prev + curr;
    }, 0)) / (matrix[row].length - 1);
  }
  
  function calculateD(row) {
    return (matrix[row].reduce(function(prev, curr, index) {
      
      if(curr === null) {
        return prev;
      }
    
      
      return prev + Math.pow((curr - arrR[row]), 2);
      
    }, 0)) / (matrix[row].length - 2);
    
  }
  
  arrR.push(calculateR(0));
  arrR.push(calculateR(1));
  arrR.push(calculateR(2));
  arrR.push(calculateR(3));
  
  arrD.push(calculateD(0));
  arrD.push(calculateD(1));
  arrD.push(calculateD(2));
  arrD.push(calculateD(3));
  
  return {
    R: arrR,
    D: arrD
  }
  
}

function calculateExpComp(matrix) {
  
  var answer = [];
  
  var calculateR = function(row) {
    return (matrix[row].reduce(function(prev, curr) {
    
      if(curr === null) {
        return prev;
      }
      
      return prev + curr;
      
    }, 0)) / (matrix.reduce(function(prev, curr) {
      console.log(curr);
      
      if(curr === null) {
        return prev;
      }
      
      return prev + curr.reduce(function(prev, curr) {
        return prev + curr;
      }, 0)
      
    }, 0))
  }
  
  // var r1 = (
  //   matrix[0][1] + matrix[0][2] + matrix[0][3]) / 
  //  (matrix[0][1] + matrix[0][2] + matrix[0][3] + matrix[1][0] + matrix[1][2] + matrix[1][3] + matrix[2][0] + matrix[2][1] + matrix[2][3] + matrix[3][0] + matrix[3][1] + matrix[3][2]);
  
  var r1 = calculateR(0);
  var r2 = calculateR(1);
  var r3 = calculateR(2);
  var r4 = calculateR(3);

  
  answer.push(r1);
  answer.push(r2);
  answer.push(r3);
  answer.push(r4);
  
  console.log(answer);
  
  return answer;
}

function setMatrix(option) {
  var matrix = [];
  var matrixElement = document.querySelector('.matrix[data-attr="' + option + '"]');
  var rows = [].slice.call(matrixElement.querySelectorAll('.matrix-row[data-pos]'));
  
  rows.forEach(function(row) {
    var rowNum = row.getAttribute('data-pos');
    var cols = [].slice.call(row.querySelectorAll('.matrix-col[data-pos]'));
    matrix[rowNum] = [];
    
    cols.forEach(function(col) {
      var colNum = col.getAttribute('data-pos');
    
      if(col.querySelector('input') !== null) {
        matrix[rowNum][colNum] = parseInt(col.querySelector('input').value);
      } else {
        matrix[rowNum][colNum] = null;
      }
    
    });
    
  })
  
  return matrix;
}

function drawExpComps(expComps) {
  var elements = [].slice.call(document.querySelectorAll('.results-comp-value'));
  elements.forEach(function(element, index) {
    element.innerHTML = expComps[index].toFixed(2);
  });
}

function drawExpDisp(expDisp) {
  var elementsR = [].slice.call(document.querySelectorAll('.results-disp-value[data-r]'));
  var elementsD = [].slice.call(document.querySelectorAll('.results-disp-value[data-d]'));
  
  elementsR.forEach(function(element, index) {
    element.innerHTML = expDisp.R[index].toFixed(2);
  });
  
  elementsD.forEach(function(element, index) {
    element.innerHTML = expDisp.D[index].toFixed(2);
  });
}

function drawCaseCoef(caseCoef) {
  var elements = [].slice.call(document.querySelectorAll('.results-index-value'));
  elements.forEach(function(element, index) {
    element.innerHTML = caseCoef[index].toFixed(3);
  });
}

function drawCaseDisp(caseDisp) {
  var elementsDC = [].slice.call(document.querySelectorAll('.results-disp-est-value'));
  
  elementsDC.forEach(function(element, index) {
    element.innerHTML = caseDisp.DC[index].toFixed(2);
  });
}



