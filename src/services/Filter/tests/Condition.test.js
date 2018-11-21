import Condition from '../Condition';

const name = 'Condition';
describe(`${name} initialization`, () => {
  test('only required', () => {
    const condition = new Condition({
      key: '1',
      path: 'test'
    });

    expect(condition.key).toBe('1');
    expect(typeof condition.comparer).toBe('function');
    expect(condition.path).toBe('test');
    expect(condition.logical).toBe('and');
    expect(condition.value).toBe('');
    expect(condition.op).toBe('eq');
  });

  test('all props', () => {
    const condition = new Condition({
      key: '2',
      path: 'test.test',
      logical: 'or',
      value: 102,
      op: 'gt'
    });

    expect(condition.key).toBe('2');
    expect(typeof condition.comparer).toBe('function');
    expect(condition.path).toBe('test.test');
    expect(condition.logical).toBe('or');
    expect(condition.value).toBe(102);
    expect(condition.op).toBe('gt');
  });
});

describe(`${name} resolve method`, () => {
  test('only required props', () => {
    const condition = new Condition({
      key: '1',
      path: 'test'
    });

    expect(condition.resolve({test: ''})).toBeTruthy();
  });

  test('all filled props', () => {
    const condition = new Condition({
      key: '2',
      type: 'number',
      path: 'test.test',
      logical: 'or',
      op: 'eq',
      value: 102
    });

    expect(condition.resolve({test: {test: 102}})).toBeTruthy();
    expect(condition.resolve({test: {test: 103}})).toBeFalsy();
    expect(condition.resolve({test: {test: ''}})).toBeFalsy();
    expect(condition.resolve({test: ''})).toBeFalsy();
  });
});