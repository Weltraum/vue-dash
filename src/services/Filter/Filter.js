const uuid = require('uuid/v4');
import ConditionGroup from './ConditionGroup';

export default class Filter {
  groups = [];
  filteredData = [];

  runFilter(data) {
    if (this.groups.length === 0) {
      return data;
    }

    const conjunctions = this.groups.filter(c => c.logical == 'and');
    const disjunctios = this.groups.filter(c => c.logical == 'or');

    this.filteredData = data.filter(item => {
      return ConditionGroup.resolveItem({item, conjunctions, disjunctios});
    });

    return this.filteredData;
  }

  addAndGroup(conditions, key = uuid()) {
    const group = new ConditionGroup({
      key,
      logical: 'and',
      conditions
    });
    this.groups.push(group);
    return key;
  }

  addOrGroup(conditions, key = uuid()) {
    const group = new ConditionGroup({
      key,
      logical: 'or',
      conditions
    });
    this.groups.push(group);
    return key;
  }

  getGroup(key) {
    return this.groups.find(g => g.key === key);
  }

  removeGroup(key) {
    this.groups = this.groups.filter(g => g.key !== key);
  }

  clearGroups() {
    this.groups = [];
  }

  clear() {
    this.groups = [];
    this.filteredData = [];
  }
}
