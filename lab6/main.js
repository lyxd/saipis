var calculateButton = document.querySelector('.calc-button');
calculateButton.addEventListener('click', function() {
  var matrix = getMatrix();
  var summs = getSumms(matrix);
  var weights = calculateWeights(summs);
  drawSumms(summs);
  drawWeights(weights);
  
  console.log("wer", weights);
});

function calculateWeights(summs) {
  var weights = [];
  var summOfSumms = summs.reduce(function(prev, curr) {
    return prev + curr.first + curr.second;
  }, 0);
  
  var f1 = summs[0].first + summs[1].first + summs[2].first;
  var f2 = summs[0].second + summs[3].first + summs[4].first;
  var f3 = summs[1].second + summs[3].second + summs[5].first;
  var f4 = summs[2].second + summs[4].second + summs[5].second; 
  
  weights.push({
    value: f1 / summOfSumms,
    name: "Z1"
  });
  
  weights.push({
    value: f2 / summOfSumms,
    name: "Z2"
  });
  
  weights.push({
    value: f3 / summOfSumms,
    name: "Z3"
  });
  
  weights.push({
    value: f4 / summOfSumms,
    name: "Z4"
  });
  
  weights = weights.sort(function(a, b) {
    return a.value - b.value;
  })
  
  return weights;
};

function getMatrix() {
  var matrix = [];
  var matrixElement = document.querySelector('.work');
  var rows = [].slice.call(matrixElement.querySelectorAll('.matrix-row'));
  
  rows.forEach(function(row, rowIndex) {
    var cols = [].slice.call(row.querySelectorAll('.matrix-col[data-pos]'));
    matrix[rowIndex] = [];
    cols.forEach(function(col, colIndex) {
      
      var first = parseFloat(col.querySelector('input').value);
      var second = 1 - first;
      
      matrix[rowIndex][colIndex] = {
        first: first,
        second: second
      }
      var secondCol = row.querySelector('.matrix-col[data-y="' + colIndex + '"]');
      secondCol.innerHTML = second.toFixed(1);
    });
  });
  
  return matrix;
}

function getSumms(matrix) {
  var matrixElement = document.querySelector('.work');
  var summArr = new Array(6);
  var summsRow = [].slice.call(matrixElement.querySelector('.matrix-row.summs'));
  
  matrix.forEach(function(row, rowIndex) {
    row.forEach(function(col, colIndex) {
      
      if(summArr[colIndex] !== undefined) {
        summArr[colIndex].first += col.first;
        summArr[colIndex].second += col.second;
      } else {
        summArr[colIndex] = {
          first: col.first,
          second: col.second
        }
      }
    });
  })
  
  return summArr;
}

function drawSumms(summs) {
  var summsElement = document.querySelector('.summs');

  summs.forEach(function(sum, index) {
    summsElement.querySelector('.matrix-col[data-x="' + index + '"]').innerHTML = sum.first.toFixed(1);
    summsElement.querySelector('.matrix-col[data-z="' + index + '"]').innerHTML = sum.second.toFixed(1);
  });
}

function drawWeights(weights) {
  var results = document.querySelector('.results');
  
  results.innerHTML = '';
  
  weights.forEach(function(weight) {
    results.innerHTML += (weight.name + ':' + weight.value.toFixed(2) + " ");
  });
  
}