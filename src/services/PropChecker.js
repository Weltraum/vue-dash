import PropTypes from 'prop-types';

export default Parent => {
  const decoratedClass = class extends Parent {
    constructor(props = {}) {
      const propTypes = Parent.propTypes || {};
      const defaultProps = Parent.defaultProps || {};

      const extendedProps = {...defaultProps, ...props};
      PropTypes.checkPropTypes(propTypes, extendedProps, 'prop', Parent.name);

      super(extendedProps);

      Object.keys(extendedProps).forEach(propKey =>
        this[propKey] = extendedProps[propKey]);
    }
  };
  Object.defineProperty (decoratedClass, 'name', {value: Parent.name});
  return decoratedClass;
};