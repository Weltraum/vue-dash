import getType from '../Comparers';
import {comparers} from '../Comparers';

describe('getType function', () => {
  expect(typeof getType('string')).toBe('function');
  expect(typeof getType('number')).toBe('function');
  expect(typeof getType('bool')).toBe('function');
  expect(typeof getType('date')).toBe('function');
  expect(typeof getType('stringNumber')).toBe('function');
});

describe('comparers validation', () => {
  test('getType', () => {
    expect(() => getType('test')).toThrowError();
  });
  test('default comparer', () => {
    const comparer = new comparers.default(10, 20);

    expect(comparer.eq()).toBeFalsy();
    expect(comparer.gt()).toBeFalsy();
    expect(comparer.ge()).toBeFalsy();
    expect(comparer.lt()).toBeTruthy();
    expect(comparer.le()).toBeTruthy();
    expect(comparer.in()).toBeTruthy();
  });

  test('string', () => {
    expectByStringType('string');
  });

  test('stringNumber', () => {
    expectByStringType('stringNumber');
  });

  test('number eq'), () => {
    const eq = ({left, right}) => (new comparers.number(left, right)).eq();

    expect(eq({left: 0, right: 0})).toBeTruthy();
    expect(eq({left: -10, right: -10})).toBeTruthy();
    expect(eq({left: 10, right: 10})).toBeTruthy();

    expect(eq({})).toBeFalsy();
    expect(eq({left: 10, right: 9})).toBeFalsy();
    expect(eq({left: 10, right: -10})).toBeFalsy();
    expect(eq({left: 0, right: NaN})).toBeFalsy();
    expect(eq({left: 10, right: NaN})).toBeFalsy();
    expect(eq({left: NaN, right: NaN})).toBeFalsy();
    expect(eq({left: NaN, right: 0})).toBeFalsy();
    expect(eq({left: NaN, right: 1})).toBeFalsy();
  };

  test('number not'), () => {
    const not = ({left, right}) => (new comparers.number(left, right)).not();

    expect(not({left: 0, right: 1})).toBeTruthy();
    expect(not({left: -10, right: 0})).toBeTruthy();
    expect(not({left: 0, right: -10})).toBeTruthy();
    expect(not({left: 10, right: -10})).toBeTruthy();
    expect(not({left: 10, right: NaN})).toBeTruthy();
    expect(not({left: NaN, right: NaN})).toBeTruthy();
    expect(not({right: NaN})).toBeTruthy();
    expect(not({right: 0})).toBeTruthy();
    expect(not({left: NaN})).toBeTruthy();
    expect(not({left: 0})).toBeTruthy();

    expect(not({})).toBeFalsy();
    expect(not({left: 10, right: 10})).toBeFalsy();
    expect(not({left: -10, right: -10})).toBeFalsy();
    expect(not({left: 0, right: 0})).toBeFalsy();
  };

  test('number lt and le', () => {
    expectByNumber(true);
  });

  test('number gt and ge', () => {
    expectByNumber(false);
  });

  test('bool eq'), () => {
    const eq = ({left, right}) => (new comparers.bool(left, right)).eq();
    expect(eq({})).toBeTruthy();
    expect(eq({left: true, right: true})).toBeTruthy();
    expect(eq({left: false, right: false})).toBeTruthy();

    expect(eq({left: true, right: false})).toBeFalsy();
    expect(eq({left: false, right: true})).toBeFalsy();
  };

  test('bool not'), () => {
    const not = ({left, right}) => (new comparers.bool(left, right)).not();
    expect(not({})).toBeTruthy();
    expect(not({left: true, right: false})).toBeTruthy();
    expect(not({left: false, right: true})).toBeTruthy();

    expect(not({left: true, right: true})).toBeFalsy();
    expect(not({left: false, right: false})).toBeFalsy();
  };

  test('date eq', () => {
    const eq = ({left, right}) => (new comparers.date(left, right)).eq();

    expect(eq({})).toBeTruthy();
    expect(eq({left: '2018-07-10', right: '2018-07-10'})).toBeTruthy();
    expect(eq({left: '2018-07-10 10:15', right: '2018-07-10 10:15'})).toBeTruthy();
    expect(eq({left: '2018-07-10 12:15 GMT+3', right: '2018-07-10 10:15 GMT+1'})).toBeTruthy();
    expect(eq({left: '2018-12-31 23:15 GMT+3', right: '2019-01-01 01:15 GMT+5'})).toBeTruthy();
  });

  test('date not', () => {
    const not = ({left, right}) => (new comparers.date(left, right)).not();

    expect(not({})).toBeTruthy();
    expect(not({left: '2018-07-10', right: '2018-07-11'})).toBeTruthy();
    expect(not({left: '2018-07-10 10:15', right: '2018-07-10 10:11'})).toBeTruthy();
    expect(not({left: '2018-07-10 12:15 GMT+3', right: '2018-07-10 10:15 GMT+2'})).toBeTruthy();
    expect(not({left: '2018-12-31 23:15:01 GMT+3', right: '2019-01-01 01:15 GMT+5'})).toBeTruthy();
  });

  test('date lt and le', () => {
    expectByDate(true);
  });

  test('date gt and ge', () => {
    expectByDate(false);
  });
});

const expectByStringType = (type) => {
  const eq = ({left, right}) => (new comparers[type](left, right)).eq();

  expect(eq({left: '', right: ''})).toBeTruthy();
  expect(eq({})).toBeTruthy();
  expect(eq({left: ''})).toBeTruthy();
  expect(eq({right: ''})).toBeTruthy();
  expect(eq({left: '1', right: '1'})).toBeTruthy();

  expect(eq({left: '2', right: '1'})).toBeFalsy();
  expect(eq({left: '', right: '1'})).toBeFalsy();
  expect(eq({right: '1'})).toBeFalsy();
  expect(eq({left: '1'})).toBeFalsy();

  const not = ({left, right}) => (new comparers[type](left, right)).not();

  expect(not({left: '2', right: '1'})).toBeTruthy();
  expect(not({left: '', right: '1'})).toBeTruthy();
  expect(not({right: '1'})).toBeTruthy();
  expect(not({left: '1'})).toBeTruthy();

  expect(not({left: '', right: ''})).toBeFalsy();
  expect(not({})).toBeFalsy();
  expect(not({left: ''})).toBeFalsy();
  expect(not({right: ''})).toBeFalsy();
  expect(not({left: '1', right: '1'})).toBeFalsy();

  const includes = ({left, right}) => (new comparers[type](left, right)).in();

  expect(includes({left: '111222', right: '111222'})).toBeTruthy();
  expect(includes({left: '1', right: '111222'})).toBeTruthy();
  expect(includes({left: '111', right: '111222'})).toBeTruthy();
  expect(includes({left: '222', right: '111222'})).toBeTruthy();
  expect(includes({left: '12', right: '111222'})).toBeTruthy();
  expect(includes({left: '12'})).toBeFalsy();

  expect(includes({left: '111222', right: '1111'})).toBeFalsy();
  expect(includes({left: '111111', right: '111'})).toBeFalsy();
};

const expectByNumber = (isLess) => {
  const assertFirst = isLess ? 'toBeTruthy' : 'toBeFalsy';
  const assertSecond = isLess ? 'toBeFalsy' : 'toBeTruthy';

  const funcPrefix = isLess ? 'l' : 'g';

  const thanComparer = ({left, right}) =>
    (new comparers.number(left, right))[`${funcPrefix}t`]();

  expect(thanComparer({left: -1, right: 0}))[assertFirst]();
  expect(thanComparer({left: -1, right: 1}))[assertFirst]();
  expect(thanComparer({left: 0, right: 1}))[assertFirst]();

  expect(thanComparer({left: 0, right: 0})).toBeFalsy();
  expect(thanComparer({left: 1, right: 0}))[assertSecond]();
  expect(thanComparer({left: 0, right: -1}))[assertSecond]();

  expect(thanComparer({right: -1})).toBeFalsy();
  expect(thanComparer({left: -1})).toBeFalsy();
  expect(thanComparer({right: NaN, left: -1})).toBeFalsy();
  expect(thanComparer({right: 1, left: NaN})).toBeFalsy();

  const eqComparer = ({left, right}) =>
    (new comparers.number(left, right))[`${funcPrefix}e`]();

  expect(eqComparer({left: -1, right: 0}))[assertFirst]();
  expect(eqComparer({left: -1, right: 1}))[assertFirst]();
  expect(eqComparer({left: 0, right: 1}))[assertFirst]();

  expect(eqComparer({left: 0, right: 0})).toBeTruthy();

  expect(eqComparer({left: 1, right: 0}))[assertSecond]();
  expect(eqComparer({left: 0, right: -1}))[assertSecond]();

  expect(eqComparer({right: -1})).toBeFalsy();
  expect(eqComparer({left: -1})).toBeFalsy();
  expect(eqComparer({right: NaN, left: -1})).toBeFalsy();
  expect(eqComparer({right: 1, left: NaN})).toBeFalsy();
};

const expectByDate = (isLess) => {
  const assertFirst = isLess ? 'toBeTruthy' : 'toBeFalsy';
  const assertSecond = isLess ? 'toBeFalsy' : 'toBeTruthy';

  const funcPrefix = isLess ? 'l' : 'g';

  const thanComparer = ({left, right}) =>
    (new comparers.date(left, right))[`${funcPrefix}t`]();

  expect(thanComparer({left: '2018-07-10', right: '2018-07-11'}))[assertFirst]();
  expect(thanComparer({left: '2017-07-10', right: '2018-07-10'}))[assertFirst]();
  expect(thanComparer({left: '2018-07-10 12:15', right: '2018-07-10 12:16'}))[assertFirst]();
  expect(thanComparer({left: '2018-07-10 12:15 GMT+3', right: '2018-07-10 12:15 GMT+1'}))[assertFirst]();

  expect(thanComparer({left: '2018-07-10', right: '2018-07-10'})).toBeFalsy();
  expect(thanComparer({left: '2018-08-10', right: '2018-07-10'}))[assertSecond]();
  expect(thanComparer({left: '2019-07-10', right: '2018-07-10'}))[assertSecond]();
  expect(thanComparer({left: '2018-07-10 12:16', right: '2018-07-10 12:15'}))[assertSecond]();
  expect(thanComparer({left: '2018-07-10 12:15 GMT+1', right: '2018-07-10 12:15 GMT+3'}))[assertSecond]();

  expect(thanComparer({right: '2018-07-10'})).toBeFalsy();
  expect(thanComparer({left: '2018-07-10'})).toBeFalsy();
  expect(thanComparer({right: '', left: '2018-07-10'})).toBeFalsy();

  expect(thanComparer({right: '2018-07-10', left: ''})).toBeFalsy();

  const eqComparer = ({left, right}) =>
    (new comparers.date(left, right))[`${funcPrefix}e`]();

  expect(eqComparer({left: '2018-07-10', right: '2018-07-11'}))[assertFirst]();
  expect(eqComparer({left: '2017-07-10', right: '2018-07-10'}))[assertFirst]();
  expect(eqComparer({left: '2018-07-10 12:15', right: '2018-07-10 12:16'}))[assertFirst]();
  expect(eqComparer({left: '2018-07-10 12:15 GMT+3', right: '2018-07-10 12:15 GMT+1'}))[assertFirst]();

  expect(eqComparer({left: '2018-07-10', right: '2018-07-10'})).toBeTruthy();
  expect(eqComparer({left: '2018-08-10', right: '2018-07-10'}))[assertSecond]();
  expect(eqComparer({left: '2019-07-10', right: '2018-07-10'}))[assertSecond]();
  expect(eqComparer({left: '2018-07-10 12:16', right: '2018-07-10 12:15'}))[assertSecond]();
  expect(eqComparer({left: '2018-07-10 12:15 GMT+1', right: '2018-07-10 12:15 GMT+3'}))[assertSecond]();

  expect(eqComparer({right: '2018-07-10'})).toBeFalsy();
  expect(eqComparer({left: '2018-07-10'})).toBeFalsy();
  expect(eqComparer({right: '', left: '2018-07-10'})).toBeFalsy();
  expect(eqComparer({right: '2018-07-10', left: ''})).toBeFalsy();
};
