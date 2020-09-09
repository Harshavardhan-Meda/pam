/**
 * Find and update one item in 'items' array if exists
 * @param {*} items Array with tickets [Array]
 * @param {*} action One updated ticket [Object]
 */
const mapItems = (items, action) => items.map((i) => (i.id === action.id ? action : i));

export default mapItems;
