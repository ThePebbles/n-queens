// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    clearBoard: function() {
      this.set(makeEmptyMatrix(this.get('n')));
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //time complexity = O(n)
      var count = 0;
      for (var x = 0; x < this.get(rowIndex).length; x++) {
        if (this.get(rowIndex)[x]) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //time complexity =O(n)
      for (var x = 0; x < this.get('n'); x++) {
        if (this.hasRowConflictAt(x)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // -------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //time complexity = O(n)
      var count = 0;
      for (var x = 0; x < this.get('n'); x++) {
        if (this.get(x)[colIndex]) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //time complexity = O(n)
      for (var x = 0; x < this.get('n'); x++) {
        if (this.hasColConflictAt(x)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //time complexity = O(n ^ 2)
      var column = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var count = 0;
      var iterations = 1;
      if (column === 0) {
        iterations = this.get('n') - 1;
      }
      for (var i = 0; i < iterations; i++) {
        var rowChange = i;
        column = majorDiagonalColumnIndexAtFirstRow;
        count = 0;
        row = 0;
        for (var x = 0; x < this.get('n'); x++) {
          if (this.get(row + rowChange)) {
            if (this.get(row + rowChange)[column]) {
              count++;
              if (count > 1) {
                return true;
              }
            }
            row++;
            column++;
          } else {
            break;
          }

        }

      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //time complexity = O(n ^ 3)
      for (var x = 0; x < this.get('n'); x++) {
        if (this.hasMajorDiagonalConflictAt(x)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //time complexity = O(n ^ 2)
      var column = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var count = 0;
      var iterations = 1;
      if (column === this.get('n') - 1) {
        iterations = this.get('n') - 1;
      }
      for (var i = 0; i < iterations; i++) {
        var rowChange = i;
        column = minorDiagonalColumnIndexAtFirstRow;
        count = 0;
        row = 0;
        for (var x = this.get('n') - 1; x >= 0; x--) {
          if (this.get(row + rowChange)) {
            if (this.get(row + rowChange)[column]) {
              count++;
              if (count > 1) {
                return true;
              }
            }
            row++;
            column--;
          } else {
            break;
          }

        }

      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //time complexity = O(n ^ 3)
      for (var x = 0; x < this.get('n'); x++) {
        if (this.hasMinorDiagonalConflictAt(x)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
