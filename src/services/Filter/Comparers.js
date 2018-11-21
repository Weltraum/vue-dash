import {getTime} from 'services/utils';

class Comparer {
  left = null;
  right = null;

  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  eq() {
    return this.left === this.right;
  }

  not() {
    return this.left !== this.right;
  }

  gt() {
    return this.left > this.right;
  }

  ge() {
    return this.left >= this.right;
  }

  lt() {
    return this.left < this.right;
  }

  le() {
    return this.left <= this.right;
  }

  in() {
    return this.right - this.left >= 0;
  }
}

class DateComparer extends Comparer {
  constructor(left, right) {
    super(getTime(left), getTime(right));
  }

  eq() {
    const bothNaN = isNaN(this.left) && isNaN(this.right);
    const bothEquals = this.left === this.right;

    return bothNaN || bothEquals;
  }
}

class StringComparer extends Comparer {
  constructor(left, right) {
    super(left || '', right || '');
  }

  in() {
    if (!this.right) {
      return this.left === this.right;
    }

    return this.right.toLowerCase()
      .includes(this.left.toLowerCase());
  }
}

class StringNumberComparer extends StringComparer {}
class BoolComparer extends Comparer {}
class NumberComparer extends Comparer {}

export const comparers = {
  default: Comparer,
  date: DateComparer,
  string: StringComparer,
  number: NumberComparer,
  stringNumber: StringNumberComparer,
  bool: BoolComparer
};

export default (type) => {
  if (!comparers[type]) {
    throw new Error(`no such type "${type}"`);
  }
  return comparers[type];
};
