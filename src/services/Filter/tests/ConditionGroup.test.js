import ConditionGroup from '../ConditionGroup';
import Condition from '../Condition';

const name = 'Condition';
describe(`${name} initialization`, () => {
  test('simple create', () => {
    const group = new ConditionGroup();

    expect(group.key).not.toBeNull();
    expect(group.logical).toBe('and');
    expect(group.conditions).toHaveLength(0);
  });

  test('intermediate creating', () => {
    const group = new ConditionGroup({
      conditions: [
        new Condition({key: '1', path: 'test', value: ''})
      ],
      logical: 'or',
      key: 'test'
    });

    expect(group.key).toBe('test');
    expect(group.logical).toBe('or');
    expect(group.conditions).toHaveLength(1);
  });
});

describe(`${name} methods`, () => {
  const group = new ConditionGroup({
    conditions: [
      new Condition({key: '1', path: 'parent.test', value: '1'}),
      new Condition({key: '2', path: 'parent.child', value: '2'})
    ]
  });

  test('addCondition', () => {
    const condition = new Condition({
      key: '3',
      path: 'test'
    });
    group.addCondition(condition);

    expect(group.conditions).toHaveLength(3);
  });

  test('removeConditionByKey', () => {
    group.removeConditionByKey('3');
    expect(group.conditions).toHaveLength(2);
  });

  test('removeConditionByPath', () => {
    group.removeConditionByPath('parent.child');
    expect(group.conditions).toHaveLength(1);
  });

  test('removeConditionByPathValue', () => {
    group.removeConditionByPathValue('parent.test', '1');
    expect(group.conditions).toHaveLength(0);
  });
});