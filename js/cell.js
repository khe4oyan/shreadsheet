class Cell {
  value;

  constructor() {
    this.value = '';
  }
  
  setValue(val) { this.value = '' + val; }
  getValue() { return this.value; }
  toInt() { return Number(this.value); }
  toDate() { return new Date(this.value); }
  reset () { this.value = ''; }
};