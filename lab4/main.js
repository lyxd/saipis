var calculateButton = document.querySelector('.calc-button');
calculateButton.addEventListener('click', function() {
  
  var matrix = setMatrix();  
  var normalizedMatrix = calculateNormalizedMatrix(matrix);
  drawNormalizedMatrix(normalizedMatrix);
  
  var weights = calculateWeights(normalizedMatrix);
  drawWeights(weights);
});

function calculateWeights(normalizedMatrix) {
  
  var weights = new Array(0,0,0,0,0,0);
  
  normalizedMatrix.forEach(function(row) {
    row.forEach(function(col, index) {
      weights[index] += col;
    })
  });
  
  weights = weights.map(function(weight, index) {
    return { value: weight / normalizedMatrix.length, name: 'Z'+(index + 1)};
  });
  
  weights.sort(function(a, b) {
    if(a.value > b.value) {
      return 1;
    }
    
    if(a.value < b.value) {
      return -1;
    }
    
    return 0;
  })
  
  return weights;
}

function calculateNormalizedMatrix(matrix) {
  
  var summs = matrix.map(function(row) {
    return row.reduce(function(prev, curr) {
      return prev + curr;
    }, 0);
  })
  
  return matrix.map(function(row, index) {
    return row.map(function(col) {
      return col / summs[index];
    });
  });
  
}

function setMatrix(option) {
  var matrix = [];
  var matrixElement = document.querySelector('.matrix');
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

function drawNormalizedMatrix(normalizedMatrix) {
  var matrixElement = document.querySelector('.normalized-matrix');
  var rows = [].slice.call(matrixElement.querySelectorAll('.matrix-row[data-pos]'));
  
  rows.forEach(function(row, rowIndex) {
    
    var cols = [].slice.call(row.querySelectorAll('.matrix-col[data-pos]'));
    
    cols.forEach(function(col, colIndex) {
      col.innerText = normalizedMatrix[rowIndex][colIndex].toFixed(2);
    });
    
  });
}

function drawWeights(weights) {
  var results = document.querySelector('.results');
  
  results.innerHTML = '';
  
  weights.forEach(function(weight) {
    results.innerHTML += (weight.name + ':' + weight.value.toFixed(2) + " ");
  });
  
}




