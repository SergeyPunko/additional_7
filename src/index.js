module.exports = function solveSudoku(matrix) {
  function Solver() {
      this.working_grid = matrix;
  };

  Solver.prototype.validate_row = function (r, c) {
      var value = this.working_grid[r][c];
      for (var i = 0; i < 9; i++) {
          if (i != c && this.working_grid[r][i] == value) {
              return false;
          }
      }
      return true;
  };

  Solver.prototype.validate_column = function (r, c) {
      var value = this.working_grid[r][c];
      for (var i = 0; i < 9; i++) {
          if (i != r && this.working_grid[i][c] == value) {
              return false;
          }
      }
      return true;
  };

  Solver.prototype.validate_box = function (r, c) {
      var value = this.working_grid[r][c];
      var box_r = Math.floor(r / 3);
      var box_c = Math.floor(c / 3);

      for (var i = box_r * 3; i < box_r * 3 + 3; i++) {
          for (var j = box_c * 3; j < box_c * 3 + 3; j++) {
              if (i != r && j != c && this.working_grid[i][j] == value) {
                  return false;
              }
          }
      }
      return true;
  };

  Solver.prototype.backtrack = function (r, c) {
      c++;
      if (c > 8) {
          c = 0;
          r++;
          if (r > 8) {
              return true;
          }
      }

      if (this.working_grid[r][c] != 0) {
          if (!(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
              return false;
          }
          return this.backtrack(r, c);
      } else { 
          for (var x = 1; x < 10; x++) {
              this.working_grid[r][c] = x;
              if (this.validate_row(r, c) &&  this.validate_column(r, c) && this.validate_box(r, c)){
                  if (this.backtrack(r, c)) {
                      return true;
                  }
              }
          }
          this.working_grid[r][c] = 0;
          return false;
      }
  };

  Solver.prototype.solve = function () {
    for(var r = 0; r < 9; r++){
      for(var c = 0; c < 9; c++){
        if (this.working_grid[r][c] != 0 && !(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
            return false;
        }
      }
    }

      return this.backtrack(0, -1);
  };
  let work = new Solver;
  work.solve();
  return work.working_grid;
}
