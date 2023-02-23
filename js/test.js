class Test {
  static testCheacker(cmp, funcName) {
    const consoleStyle = 'padding: 3px 5px; border-radius: 5px;';
    if (cmp) {
      console.log(`${funcName} %cfailed`, 'background-color:red; color:white;' + consoleStyle);
    }else {
      console.log(`${funcName} %cpassed`, 'background-color:green; color:white;' + consoleStyle);
    }
  }

  static startAllTests() {
    const css = 'color:yellow; background-color:black; padding: 2px 5px;';

    Test.cellTests(css);
    Test.shTests(css);
  } 

  // ====================
  // === Cell
  static cellTests(css) {
    console.log('%cCell()', css);
    Test.cellGetValue();
    Test.cellToInt();
    Test.cellReset();
    Test.cellTodate();
  }

  static cellGetValue() {
    let c = new Cell();
    c.setValue(123);

    Test.testCheacker(c.getValue() !== '123', 'getValue()');
  }

  static cellToInt() {
    let c = new Cell();
    c.setValue(-79);

    Test.testCheacker(c.toInt() !== -79, 'toInt()');
  }

  static cellTodate() {
    let c = new Cell();
    c.setValue('2/2/2001');

    Test.testCheacker(!Test.dateEqual(c.toDate(), new Date('2/2/2001')), 'toDate()');
  }

  static dateEqual(d1, d2) {
    if (d1 < d2 || d1 > d2) {
      return false;
    } else {
      return true;
    }
  }

  static cellReset() {
    let c = new Cell();
    c.setValue('Abcdef');
    c.reset();

    Test.testCheacker(c.getValue() !== '', 'reset()');
  }

  // ====================
  // === Spreadsheet

  static shTests(css) {
    console.log('%cSpreadsheet()', css);

    Test.shGetCellHtml();
    Test.shAddRow();
    Test.shAddColl();
    Test.shRemoveRow();
    Test.shRemoveColl();
    Test.shSwapRows();
    Test.shSwapColls();
  }

  static shGetCellHtml() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(2, 2, 'Text');
    Test.testCheacker(sh.getCellHtml(2, 2).getValue() !== 'Text', 'getCellHtml()');
  } 

  static shAddRow() {
    let sh = new Spreadsheet(2, 2);
    sh.setCellHtml(1, 1, 'Text');
    sh.addRow(1);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() == 'Text', 'addRow()');
  }

  static shAddColl() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(2, 2, 'Text');
    sh.addColl(1);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() == 'Text', 'addColl()');
  }

  static shRemoveRow() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(1, 1, 'Text');
    sh.removeRow(1);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() == 'Text', 'removeRow()');
  }

  static shRemoveColl() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(1, 1, 'Text');
    sh.removeColl(1);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() == 'Text', 'removeColl');
  }

  static shSwapRows() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(1, 1, 'Text_1');
    sh.setCellHtml(2, 1, 'Text_2');
    sh.swapRows(1, 2);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() != 'Text_2' || sh.getCellHtml(2, 1).getValue() != 'Text_1', 'swapRows()');
  }

  static shSwapColls() {
    let sh = new Spreadsheet(3, 3);
    sh.setCellHtml(1, 1, 'Text_1');
    sh.setCellHtml(1, 2, 'Text_2');
    sh.swapColls(1, 2);
    Test.testCheacker(sh.getCellHtml(1, 1).getValue() != 'Text_2' || sh.getCellHtml(1, 2).getValue() != 'Text_1', 'swapColls()');
  }
};