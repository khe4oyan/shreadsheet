class Spreadsheet {
  matrix;

  constructor(rows, colls) {
    this.matrix = [];

    for (let r = 0; r < rows; ++r) {
      let line = [];
      
      for (let c = 0; c < colls; ++c) {
        line.push(new Cell());
      }

      this.matrix.push(line);
    }
  }

  static inRange(matrix, row, coll) {
    if ((row >= 0 && row < matrix.length) && (coll >= 0 && coll <= matrix[0].length)) {
      return;
    }

    throw new Error(`Range overflow: ${row} ${coll} ${matrix.length} ${matrix[0].length }`);
  }

  static isNumber(num) {
    if (!Number.isInteger(num)) { throw new Error('is not a number'); }
  }

  setCell(row, coll, val) {
    Spreadsheet.isNumber(row);
    Spreadsheet.isNumber(coll);

    Spreadsheet.inRange(this.matrix, row, coll);

    if (typeof val == 'string') {
      this.matrix[row][coll].setValue(val);
    }else if (val instanceof Cell) {
      this.matrix[row][coll].setValue(val.getValue());
    }
  }
  getCell(row, coll) { 
    Spreadsheet.isNumber(row);
    Spreadsheet.isNumber(coll);
    
    Spreadsheet.inRange(this.matrix, row, coll);
    return this.matrix[row][coll];
  }
  addRow(row) {
    Spreadsheet.isNumber(row);

    if (row == this.matrix.length) {
      let line = [];
      
      for (let i = 0; i < this.matrix[0].length; ++i) {
        line.push(new Cell());
      }

      this.matrix.push(line);
    } else {
      Spreadsheet.inRange(this.matrix, row, 0);
      let line = [];
      
      for (let i = 0; i < this.matrix[0].length; ++i) {
        line.push(new Cell());
      }

      let tmp = line;
      for (let i = row; i < this.matrix.length; ++i) {
        const tmp_2 = this.matrix[i];
        this.matrix[i] = tmp;
        tmp = tmp_2;
      }

      this.matrix.push(tmp);
    }
  }

  addColl(coll) {
    Spreadsheet.isNumber(coll);

    if (coll == this.matrix[0].length) {
      for (let r = 0; r < this.matrix.length; ++r) {
        this.matrix[r].push(new Cell());
      }
    } else {
      Spreadsheet.inRange(this.matrix, 0, coll);

      let tmp = new Cell();
      for (let r = 0; r < this.matrix.length; ++r) {
        for (let i = coll; i < this.matrix[r][i].length; ++i) {
          let tmp_2 = this.matrix[r][i];
          this.matrix[r][i] = tmp;
          tmp = tmp_2;
        }
        
        this.matrix[r].push(tmp);
      }
    }
  }

  removeRow(row) {
    Spreadsheet.isNumber(row);

    Spreadsheet.inRange(this.matrix, row, 0)

    this.matrix.splice(row, 1);
  }
  removeColl(coll) {
    Spreadsheet.isNumber(coll);

    Spreadsheet.inRange(this.matrix, 0, coll);

    for (let i = 0; i < this.matrix.length; ++i) {
      this.matrix[i].splice(coll, 1);
    }
  }
  
  swapRows(rowUp, rowDown) {
    Spreadsheet.isNumber(rowUp);
    Spreadsheet.isNumber(rowDown);

    Spreadsheet.inRange(this.matrix, rowUp, 0);
    Spreadsheet.inRange(this.matrix, rowDown, 0);

    const tmp = this.matrix[rowUp];
    this.matrix[rowUp] = this.matrix[rowDown];
    this.matrix[rowDown] = tmp;
  }

  swapColls(collLeft, collRight) {
    Spreadsheet.isNumber(collLeft);
    Spreadsheet.isNumber(collRight);

    Spreadsheet.inRange(this.matrix, 0, collLeft);
    Spreadsheet.inRange(this.matrix, 0, collRight);
    
    for (let r = 0; r < this.matrix.length; ++r) {
      const tmp = this.matrix[r][collLeft];
      this.matrix[r][collLeft] = this.matrix[r][collRight];
      this.matrix[r][collRight] = tmp;
    }
  }
};