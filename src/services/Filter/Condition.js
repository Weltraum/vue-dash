import PropTypes from 'prop-types';
import {get as getValue} from 'object-path';
import PropChecker from 'services/PropChecker';
import getType from './Comparers';

@PropChecker
export default class Condition {
  static propTypes = {
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    type: PropTypes.string,
    logical: PropTypes.oneOf(['and', 'or']),
    op: PropTypes.oneOf(['eq', 'lt', 'le', 'gt', 'ge', 'in']),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    path: PropTypes.string.isRequired
  };
  static defaultProps = {
    type: 'string',
    logical: 'and',
    op: 'eq',
    value: ''
  };
  comparer = () => true;

  constructor(props) {
    this.comparer = getType(props.type);
  }

  resolve(item) {
    const comparerClass = this.comparer;
    const instance = new comparerClass(this.value, getValue(item, this.path));
    return instance[this.op]();
  }
}