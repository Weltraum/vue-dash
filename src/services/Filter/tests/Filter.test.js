import Filter from '../Filter';
import Condition from '../Condition';

const name = 'Filter';
describe(`${name} manipulate conditions`, () => {
  test('empty initialization', () => {
    const filter = new Filter();
    expect(filter.groups).toHaveLength(0);
    expect(filter.filteredData).toHaveLength(0);
  });

  test('add condition always returns key of group', () => {
    const filter = new Filter();
    let key = filter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        value: '1122'
      })
    ], 'test-key');

    expect(key).toBe('test-key');

    key = filter.addAndGroup([
      new Condition({
        key: '2',
        path: 'test',
        value: '1122'
      })
    ], 'test-key');

    expect(key).not.toBeNull();
  });

  test('add andCondition', () => {
    const filter = new Filter();
    filter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        value: '1122'
      })
    ], 'test-key');

    expect(filter.groups).toHaveLength(1);

    const group = filter.getGroup('test-key');
    expect(group).not.toBeNull();
    expect(group.logical).toBe('and');
    expect(group.conditions).toHaveLength(1);
  });

  test('add orCondition', () => {
    const filter = new Filter();
    filter.addOrGroup([
      new Condition({
        key: '1',
        path: 'test',
        value: '1122'
      })
    ], 'test-key');

    expect(filter.groups).toHaveLength(1);

    const group = filter.getGroup('test-key');
    expect(group).not.toBeNull();
    expect(group.logical).toBe('or');
    expect(group.conditions).toHaveLength(1);
  });

  test('remove group by key', () => {
    const filter = new Filter();
    const key = filter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        value: '1122'
      })
    ]);
    filter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        logical: 'or',
        value: '1122'
      })
    ]);

    expect(filter.groups).toHaveLength(2);

    filter.removeGroup(key);
    expect(filter.groups).toHaveLength(1);
  });

  test('clear conditions', () => {
    const filter = new Filter();
    filter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        value: '1122'
      })
    ]);

    expect(filter.groups).toHaveLength(1);

    filter.clearGroups();
    expect(filter.groups).toHaveLength(0);
  });
});

const data = [
  {
    id: 1,
    parent: {
      children: '11222'
    },
    name: 'test',
    test: '133'
  },
  {
    id: 2,
    parent: {
      children: '12'
    },
    name: 'raw',
    test: '22'
  },
  {
    id: 3,
    parent: {
      children: '1122'
    },
    name: 'chil',
    test: '111'
  },
  {
    id: 4,
    parent: {
      children: '0'
    },
    name: 'cold',
    test: '0'
  }
];
describe(`${name} AND filtration`, () => {
  const andFilter = new Filter();
  andFilter.addAndGroup([
    new Condition({
      key: '1',
      path: 'parent.children',
      op: 'eq',
      value: '11222'
    })
  ]);
  test('by one AND condition group', () => {
    expect(andFilter.groups).toHaveLength(1);

    andFilter.runFilter(data);

    expect(andFilter.filteredData).toHaveLength(1);
    expect(andFilter.filteredData[0].id).toBe(1);
  });

  test('by multiple AND condition groups', () => {
    andFilter.addAndGroup([
      new Condition({
        key: '1',
        path: 'test',
        op: 'in',
        value: '1'
      })
    ]);

    expect(andFilter.filteredData).toHaveLength(1);
    expect(andFilter.groups).toHaveLength(2);

    andFilter.runFilter(data);

    expect(andFilter.filteredData).toHaveLength(1);
    expect(andFilter.filteredData[0].id).toBe(1);
  });

  test('clear all', () => {
    expect(andFilter.groups).toHaveLength(2);
    expect(andFilter.filteredData).toHaveLength(1);

    andFilter.clear();

    expect(andFilter.groups).toHaveLength(0);
    expect(andFilter.filteredData).toHaveLength(0);
  });
});

describe(`${name} OR filtration`, () => {
  const orFilter = new Filter();
  orFilter.addOrGroup([
    new Condition({
      key: '1',
      path: 'parent.children',
      op: 'eq',
      value: '11222'
    })
  ]);
  test('by one AND conditions', () => {
    expect(orFilter.groups).toHaveLength(1);

    orFilter.runFilter(data);

    expect(orFilter.filteredData).toHaveLength(1);
    expect(orFilter.filteredData[0].id).toBe(1);
  });

  test('by multiple OR conditions', () => {
    orFilter.addOrGroup([
      new Condition({
        key: '1',
        path: 'test',
        op: 'in',
        value: '22'
      })
    ]);

    expect(orFilter.filteredData).toHaveLength(1);
    expect(orFilter.groups).toHaveLength(2);

    orFilter.runFilter(data);

    expect(orFilter.filteredData).toHaveLength(2);
    expect(orFilter.filteredData[0].id).toBe(1);
    expect(orFilter.filteredData[1].id).toBe(2);
  });

  test('clear all', () => {
    expect(orFilter.groups).toHaveLength(2);
    expect(orFilter.filteredData).toHaveLength(2);

    orFilter.clear();

    expect(orFilter.groups).toHaveLength(0);
    expect(orFilter.filteredData).toHaveLength(0);
  });
});

describe(`${name} BOTH filtration`, () => {
  const bothFilter = new Filter();
  bothFilter.addAndGroup([
    new Condition({
      key: '1',
      path: 'parent.children',
      value: '1122'
    })
  ]);
  bothFilter.addAndGroup([
    new Condition({
      key: '2',
      path: 'test',
      value: '11111'
    })
  ]);
  test('incorrect 2 AND conditions', () => {
    expect(bothFilter.groups).toHaveLength(2);

    bothFilter.runFilter(data);

    expect(bothFilter.filteredData).toHaveLength(0);
  });

  test('correct added 1 OR condition', () => {
    bothFilter.addOrGroup([
      new Condition({
        key: '1',
        path: 'name',
        value: 'test'
      })
    ]);
    expect(bothFilter.groups).toHaveLength(3);

    bothFilter.runFilter(data);

    expect(bothFilter.filteredData).toHaveLength(1);
    expect(bothFilter.filteredData[0].id).toBe(1);
  });

  test('clear all', () => {
    expect(bothFilter.groups).toHaveLength(3);
    expect(bothFilter.filteredData).toHaveLength(1);

    bothFilter.clear();

    expect(bothFilter.groups).toHaveLength(0);
    expect(bothFilter.filteredData).toHaveLength(0);
  });

  test('correct 2 AND 1 OR', () => {
    bothFilter.addAndGroup([
      new Condition({
        key: '1',
        path: 'parent.children',
        value: '1122'
      })
    ]);
    bothFilter.addAndGroup([
      new Condition({
        key: '2',
        path: 'test',
        value: '111'
      })
    ]);
    bothFilter.addOrGroup([
      new Condition({
        key: '3',
        path: 'name',
        value: 'test'
      })
    ]);

    expect(bothFilter.groups).toHaveLength(3);

    bothFilter.runFilter(data);

    expect(bothFilter.filteredData).toHaveLength(2);
    expect(bothFilter.filteredData[0].id).toBe(1);
    expect(bothFilter.filteredData[1].id).toBe(3);
  });
});