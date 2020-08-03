import { OPERATIONS } from '../constants';
import { isOdd } from '../utils';

export default class ExpressionStack {
  constructor() {
    this.stack  = [];
  }

  push(value) {
    const isOperation = isNaN(Number(value));

    if (!isOperation) { this.pushNumber(value); return; }
    this.pushOperation(value);
  }

  pushNumber(value) {
    if (this.isPositionOdd()) {
      const previousValue = this.top() > 0 ? this.top() : this.top().includes('.') ? this.top() : '';
      this.setTop(previousValue + value);
      return;
    }

    this.stack.push(value);
  }

  pushOperation(value) {
    if (this.isPositionOdd()) {
      this.stack.push(value)
    }
  }

  isPositionOdd() {
    return isOdd(this.stack.length);
  }

  setTop(value) {
    const top = this.stack.length > 0 ? this.stack.length - 1 : 0;

    this.stack[top] = value;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getStack() {
    return this.stack;
  }

  convertForDisplay() {
    return this.stack.map(e => {
      if (OPERATIONS[e]?.type === e) {
        return OPERATIONS[e].text;
      } else {
        return e;
      }
    }).join(' ');
  }
}
