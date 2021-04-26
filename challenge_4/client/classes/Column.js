class Column {
  constructor() {
    this.values = [];
    this.max = 6;
  }
  addChip(value) {
    if (this.values.length < this.max ) {
      this.values.push(value);
      return true;
    } else {
      return false;
    }
  }
  topChipIndex() {
    return this.values.length - 1;
  }
  height() {
    return this.values.length;
  }
  chipAt(x) {
    if (x < 0 || x >= this.max) return undefined;
    return this.values[x];
  }
  topChip() {
    return this.values[this.values.length - 1];
  }
}

export default Column;
