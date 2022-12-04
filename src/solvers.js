

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


window.findNRooksSolution = function(n) {
  var checkCoors = [];
  var getCoors = function(n) {
    for (var x = 0; checkCoors.length < n * n; x++) {
      var c1 = Math.floor(Math.random() * n);
      var c2 = Math.floor(Math.random() * n);
      if (!checkCoors.includes('' + c1 + c2)) {
        checkCoors.push('' + c1 + c2);
      }
    }
    return checkCoors;

  };
  checkCoors = getCoors(n);
  var solution = new Board({n: n});
  var found = 0;
  var addRooks = function(b) {
    if (found === n) {
      return b;
    }
    var coor = checkCoors.pop();
    var c1 = Number(coor.charAt(0));
    var c2 = Number(coor.charAt(1));
    b.togglePiece(c1, c2);
    if (!b.hasAnyRooksConflicts()) {
      found++;
    } else {
      b.togglePiece(c1, c2);
    }

    return addRooks(b);

  };
  solution = addRooks(solution);
  var output = [];
  for (var x = 0; x < n; x++) {
    output.push(solution.attributes[x]);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(output));
  return output;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var occupied = [];
  var solutions = function(n, row, column) {
    for (column; column < n; column++) {
      if (occupied.indexOf(column) > -1) {
        continue;
      }
      board.togglePiece(row, column); // toggle on
      console.log('Board for: ', n, board);
      if (row !== n - 1) {
        occupied.push(column);
        solutions(n, row + 1, 0);
      } else if (row === n - 1) {
        occupied.push(column);
        solutionCount++;
      }
      board.togglePiece(row, column);
      occupied.pop();
    }
    return solutionCount;
  };
  solutions(n, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  var board = new Board({n: n});

  var output = [];
  for (var x = 0; x < n; x++) {
    output.push(board.attributes[x]);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(output));
  return output;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var solutionCount = 0;
  var board = new Board({n: n});
  var occupied = [];
  var lastColumn;
  var solutions = function(n, row, column) {
    for (column; column < n; column++) {
      var occupy = occupied.indexOf(column);
      if (occupy > -1) {
        continue;
      }
      board.togglePiece(row, column); // toggle on
      console.log('Board for: ', n, board);
      if (row !== n - 1 && !board.hasAnyQueensConflicts()) {
        occupied.push(column);
        lastColumn = column;
        solutions(n, row + 1, 0);
      } else if (row === n - 1 && !board.hasAnyQueensConflicts()) {
        occupied.push(column);
        solutionCount++;
      }
      board.togglePiece(row, column);
      occupied.pop();
    }
    return solutionCount;
  };
  solutions(n, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
