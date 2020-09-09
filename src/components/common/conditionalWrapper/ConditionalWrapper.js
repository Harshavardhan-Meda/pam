
const ConditionalWrapper = ({ condition, wrapComponent, children }) => (condition
    ? wrapComponent(children) : children);

export default ConditionalWrapper;
