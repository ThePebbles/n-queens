

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n, count) {
  //time complexity = O(n^2)
  var rooks = 0;
  var board = new Board({n: n});
  var solutionCount = 0;
  var occupied = [];
  var solution = function(n, row, count) {
    for (var i = 0; i < n; i++) {
      if (occupied.indexOf(i) > -1) {
        continue;
      } else {
        occupied.push(i);
      }
      board.togglePiece(row, i);
      if (row !== n - 1) {
        rooks++;
        solution(n, row + 1, count);
        if (rooks !== n) {
          rooks--;
        } else if (!count) {
          return;
        }
      } else if (row === n - 1) {
        rooks++;
        solutionCount++;
        if (count) {
          board.togglePiece(row, i);
          occupied.pop();
          rooks--;
        }
        return;
      }
      if (rooks !== n) {
        board.togglePiece(row, i);
        occupied.pop();
      }
    }
    return;
  };
  solution(n, 0, count);
  var output = [];
  for (var x = 0; x < n; x++) {
    output.push(board.attributes[x]);
  }

  if (count) {
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    return solutionCount;
  } else {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(output));
    return output;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //time complexity = O(2nlog(n))
  return window.findNRooksSolution(n, 1);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, count) {
  //time complexity = O(n ^ 2)
  if (count && n === 0) {
    return 1;
  } else if (count && (n === 2 || n === 3)) {
    return 0;
  }
  var queens = 0;
  var board = new Board({n: n});
  var solutionCount = 0;
  var occupied = [];
  var solution = function(n, row, count) {
    for (var i = 0; i < n; i++) {
      if (occupied.indexOf(i) > -1) {
        continue;
      } else {
        occupied.push(i);
      }
      board.togglePiece(row, i);
      if (row !== n - 1 && !board.hasAnyQueensConflicts()) {
        queens++;
        solution(n, row + 1, count);
        if (queens !== n) {
          queens--;
        } else if (!count) {
          return board;
        }
      } else if (row === n - 1 && !board.hasAnyQueensConflicts()) {
        queens++;
        solutionCount++;
        if (count) {
          board.togglePiece(row, i);
          occupied.pop();
          queens--;
        }
        return;
      }
      if (queens !== n) {
        board.togglePiece(row, i);
        occupied.pop();
      }
    }
    return;
  };
  if (n < 2 || n > 3) {
    solution(n, 0, count);
  }
  var output = [];
  for (var x = 0; x < n; x++) {
    output.push(board.attributes[x]);
  }
  if (count) {
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
  } else {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(output));
    return output;
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //time complexity = O(2nlog(n))
  return window.findNQueensSolution(n, 1);
};
