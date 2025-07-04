/**
 * @name isEmptyObject
 * @param {data}: object - The initial data to compare.
 * @description Checks if an object is empty or not.
 * @returns {result}: boolean - true/false
 */

// TODO: tests!
export const isEmptyObject = (data?: object | null) => {
  return (
    data === null ||
    data === undefined ||
    (Object.keys(data).length === 0 && Object.prototype.toString.call(data) === '[object Object]')
  );
};