import PropTypes from 'prop-types';
import PropChecker from 'services/PropChecker';
import Condition from './Condition';

@PropChecker
export default class ConditionGroup {
  static propTypes = {
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    logical: PropTypes.oneOf(['and', 'or']),
    conditions: PropTypes.arrayOf(PropTypes.instanceOf(Condition))
  };
  static defaultProps = {
    logical: 'and',
    conditions: []
  };

  resolve(item) {
    if (this.conditions.length === 0) {
      return true;
    }

    const conjunctions = this.conditions.filter(c => c.logical == 'and');
    const disjunctios = this.conditions.filter(c => c.logical == 'or');

    return ConditionGroup.resolveItem({item, conjunctions, disjunctios});
  }

  static resolveItem({item, conjunctions = [], disjunctios = []}) {
    let result = false;
    if (disjunctios.length) {
      result = ConditionGroup.resolveDisjunctios(disjunctios, item);
    }
    if (!result && conjunctions.length) {
      result = ConditionGroup.resolveConjunctios(conjunctions, item);
    }
    return result;
  }

  static resolveConjunctios(conjunctions, item) {
    let result = true;
    for (let i in conjunctions) {
      const conjunction = conjunctions[i];
      const isValid = conjunction.resolve(item);
      if (!isValid) {
        result = false;
        break;
      }
    }
    return result;
  }

  static resolveDisjunctios(disjunctios, item) {
    let result = disjunctios.length === 0;
    for (let i in disjunctios) {
      const disjunctio = disjunctios[i];
      const isValid = disjunctio.resolve(item);
      if (isValid) {
        result = true;
        break;
      }
    }
    return result;
  }

  addCondition(condition) {
    this.conditions = [
      ...this.conditions,
      condition
    ];

    return this.conditions[this.conditions.length - 1];
  }

  removeConditionByKey(key) {
    this.conditions = this.conditions.filter(c => c.key !== key);
  }

  removeConditionByPath(path) {
    this.conditions = this.conditions.filter(c => c.path !== path);
  }

  removeConditionByPathValue(path, value) {
    this.conditions = this.conditions
      .filter(c => c.path !== path || c.value !== value);
  }
}