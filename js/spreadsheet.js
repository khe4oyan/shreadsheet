class Spreadsheet {
  matrix;

  constructor(rows, colls) {
    this.matrix = [];

    for (let r = 0; r < rows; ++r) {
      let line = [];
      for (let c = 0; c < colls; ++c) {
        line.push(new CellHtml());
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

  setCellHtml(row, coll, val) {
    Spreadsheet.isNumber(row);
    Spreadsheet.isNumber(coll);

    Spreadsheet.inRange(this.matrix, row, coll);

    if (typeof val == 'string') {
      this.matrix[row][coll].setValue(val);
    }else if (val instanceof CellHtml) {
      this.matrix[row][coll].setValue(val.getValue());
    }
  }
  getCellHtml(row, coll) { 
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
        line.push(new CellHtml());
      }
      this.matrix.push(line);
    } else {
      Spreadsheet.inRange(this.matrix, row, 0);
      let line = [];
      for (let i = 0; i < this.matrix[0].length; ++i) {
        line.push(new CellHtml());
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
        this.matrix[r].push(new CellHtml());
      }
    } else {
      Spreadsheet.inRange(this.matrix, 0, coll);

      let tmp = new CellHtml();
      for (let r = 0; r < this.matrix.length; ++r) {
        for (let i = coll; i < this.matrix[r][i].length; ++i) {
          [this.matrix[r][i], tmp] = this.swap(this.matrix[r][i], tmp);
          
        }
        this.matrix[r].push(tmp);
      }
    }
  }

  removeRow(row) {
    Spreadsheet.isNumber(row);
    --row;
    Spreadsheet.inRange(this.matrix, row, 0);
    for (let i = 0; i < this.matrix[row].length; ++i) {
      this.matrix[row][i].remove_element();
    }
    this.matrix.splice(row, 1);
  }

  removeColl(coll) {
    Spreadsheet.isNumber(coll);
    --coll;
    Spreadsheet.inRange(this.matrix, 0, coll);

    for (let i = 0; i < this.matrix.length; ++i) {
      this.matrix[i][coll].remove_element();
      this.matrix[i].splice(coll, 1);
    }
  }
  
  swapRows(rowUp, rowDown) {
    Spreadsheet.isNumber(rowUp);
    Spreadsheet.inRange(this.matrix, rowUp, 0);

    Spreadsheet.isNumber(rowDown);
    Spreadsheet.inRange(this.matrix, rowDown, 0);

    for (let i = 0; i < this.matrix[0].length; ++i) {
      [this.matrix[rowUp][i], this.matrix[rowDown][i]] = this.swap(this.matrix[rowUp][i], this.matrix[rowDown][i]);
      [this.matrix[rowUp][i].cellElem, this.matrix[rowDown][i].cellElem] = this.swap(this.matrix[rowUp][i].cellElem, this.matrix[rowDown][i].cellElem);
      [this.matrix[rowUp][i].cellElem.value, this.matrix[rowDown][i].cellElem.value] = this.swap(this.matrix[rowUp][i].cellElem.value, this.matrix[rowDown][i].cellElem.value);
    }
  }

  swapColls(collLeft, collRight) {
    if (collLeft == collRight) { return; }

    Spreadsheet.isNumber(collLeft);
    Spreadsheet.isNumber(collRight);

    Spreadsheet.inRange(this.matrix, 0, collLeft);
    Spreadsheet.inRange(this.matrix, 0, collRight);
    
    for (let r = 0; r < this.matrix.length; ++r) {
      [this.matrix[r][collLeft], this.matrix[r][collRight]] = this.swap(this.matrix[r][collLeft], this.matrix[r][collRight]);
      [this.matrix[r][collLeft].cellElem, this.matrix[r][collRight].cellElem] = this.swap(this.matrix[r][collLeft].cellElem, this.matrix[r][collRight].cellElem);
      [this.matrix[r][collLeft].cellElem.value, this.matrix[r][collRight].cellElem.value] = this.swap(this.matrix[r][collLeft].cellElem.value, this.matrix[r][collRight].cellElem.value);
    }
  }

  swap(left, right) {
    return [right, left];
  }
};