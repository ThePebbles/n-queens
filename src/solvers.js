

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

    //add piece at coordinate
    //check if any issues
    //recursion


    b.togglePiece(c1, c2);

    if (!b.hasAnyRooksConflicts()) {
      found++;
    } else {
      b.togglePiece(c1, c2);
    }

    return addRooks(b);

  };
  // get random numbers each time recursive function runs
  // check numbers are new/have not been tried
  // toggle piece at random number coordinates on copy board
  // run check rook conflicts on copy board if conflict then board = board
  // if no conflict the board = copy board
  // call function again with board

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
  var solutionCount = 0; //fixme

  var board = new Board({n: n});
  //Make array of all combinations of n pieces
  //for
  var possiblePlacements = makePossibleCombinations(n);
  for (var x = 0; x < possiblePlacements.length; x++) {
    //toggle
    //check for conflicts
    //add one to solutionCount if no conflicts
    //untoggle
    var passOn = false;
    for (var coor of possiblePlacements[x]) {
      board.togglePiece(coor[0], coor[1]);
      if (board.hasAnyRooksConflicts()) {
        board.clearBoard();
        passOn = true;
        break;
      }
    }
    if (!board.hasAnyRooksConflicts() && !passOn) {
      solutionCount++;
    }
    board.clearBoard();
    //Would that work? toggle the pieces and then undo them once we check?
    //I believe so, wondering if we can make it more legible, but it doesn't matter as long as it works!
    //Lemme know if it works on our specs... did it work?
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
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
  var addQueens = function(b) {
    if (found === n) {
      return b;
    }
    var coor = checkCoors.pop();
    var c1 = Number(coor.charAt(0));
    var c2 = Number(coor.charAt(1));

    b.togglePiece(c1, c2);

    if (!b.hasAnyQueensConflicts()) {
      found++;
    } else {
      b.togglePiece(c1, c2);
    }

    return addQueens(b);

  };

  solution = addQueens(solution);
  var output = [];
  for (var x = 0; x < n; x++) {
    output.push(solution.attributes[x]);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(output));
  return output;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.makePossibleCombinations = function(n) {
  //PossibleSquares = [[row1 Squares] [row2 Squares] etc...]
  // var possibleSquares = [];
  // var board = new Board({n: n});
  // for (var row = 0; row < n; row++) {
  //   possibleSquares[row] = [];
  //   for (var column = 0; column < n; column++) {
  //     possibleSquares[row].push([row, column]);
  //   }
  // }

  var outputs = [];
  var columns = [];
  for (var x = 0; x < n; x++) {
    columns[x] = 0;
  }

  var chooseN = function(columns) {
    if (columns === 'done') {
      return;
    }

    outputList = [];

    for (var x = 0; x < n; x++) {
      outputList.push([x, columns[x]]);
    }
    outputs.push(outputList);


    var updateColumns = function(l, c) {
      if (l.every(function(item) {
        if (item === n - 1) {
          return true;
        }
      })) {
        return 'done';
      }
      l[c] += 1;
      if (l[c] >= n) {
        if (c !== 0) {
          l[c] = 0;
          c -= 1;
          updateColumns(l, c);
        } else {
          l[c] -= 1;
          return l;
        }
      }
      return l;
    };

    chooseN(updateColumns(columns, n - 1));

  };
  chooseN(columns);
  return outputs;
};

console.log(makePossibleCombinations(3));
