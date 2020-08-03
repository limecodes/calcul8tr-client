import { evaluate } from 'mathjs';

import { OPERATIONS } from '../constants';
import { isOdd, isFloat } from '../utils';

export default class ExpressionStack {
  constructor() {
    this.stack  = [];
  }

  push(value) {
    const isOperation = isNaN(Number(value));

    if (!isOperation) { this.pushNumber(value); return; }
    this.pushOperation(value);
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  truncate() {
    const lastElement = this.top();
    this.stack.length = [1];
    this.stack[0] = lastElement;
  }

  equal(result) {
    this.stack.push(OPERATIONS.EQUAL.operator, result.toString());
  }

  hasEqual() {
    return this.stack.includes(OPERATIONS.EQUAL.operator);
  }

  clear() {
    this.stack.length = 0;
  }

  calculate() {
    if ( (isNaN(Number(this.top())) && !this.top().includes('%')) || (this.hasEqual()) ) return;

    const strExpression = this.convertForCalculation();
    const expressionCalculation = Number(evaluate(strExpression));

    const result = Number.isFinite(expressionCalculation) ? expressionCalculation : new Error('Expression Error');

    if (result.constructor.name !== 'Error') {
      this.clear();
      this.equal(result);
    } else {
      this.clear();
      throw result;
    }
  }

  float() {
    if (this.hasEqual()) this.clear();

    const previousValue = this.stack.length > 0 ? this.top() : '0';
    if (isFloat(previousValue) || previousValue.includes('.')) {
      return;
    }

    if (!this.isPositionOdd()) {
      this.stack.push('0.');
      return;
    }
    this.setTop(previousValue + '.');
  }

  percent() {
    if (this.hasEqual()) this.truncate();

    const previousValue = this.stack.length > 0 ? this.top() : '0';
    if (previousValue.includes('%') || !this.isPositionOdd()) {
      return;
    }
    this.setTop(previousValue + '%');
  }

  negative() {
    if (this.hasEqual()) this.truncate();

    if (this.isPositionOdd() && this.stack.length > 0) {
      const previousValue = this.top();
      const toggleNegative = Number(previousValue) * -1;
      this.setTop(toggleNegative.toString());
    }
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

  convertForCalculation() {
    return this.stack.map(e => {
      if (OPERATIONS[e]?.type === e) {
        return OPERATIONS[e].operator;
      } else if (e.includes('%')) {
        return '(' + e.replace('%', ' / 100 ') + ')';
      } else {
        return e;
      }
    }).join('');
  }

  setTop(value) {
    const top = this.stack.length > 0 ? this.stack.length - 1 : 0;

    this.stack[top] = value;
  }

  isPositionOdd() {
    return isOdd(this.stack.length);
  }

  pushNumber(value) {
    if (this.hasEqual()) this.clear();

    if (this.isPositionOdd()) {
      const previousValue = this.top() > 0 ? this.top() : this.top().includes('.') ? this.top() : '';
      this.setTop(previousValue + value);
      return;
    }

    this.stack.push(value);
  }

  pushOperation(value) {
    if (this.hasEqual()) this.truncate();

    if (this.isPositionOdd()) {
      this.stack.push(value)
    }
  }

  getStack() {
    return this.stack;
  }
}
