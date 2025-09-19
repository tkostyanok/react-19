import { isEmptyObject } from './object';

describe('isEmptyObject', () => {
  it('should return true when object is empty', () => {
    const data = {};
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return false when object has properties', () => {
    const data = { name: 'John', age: 25 };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });

  it('should return false when object has nested empty objects', () => {
    const data = { person: { address: {}, hobbies: {} } };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });

  it('should return true when object is null', () => {
    const data = null;
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return true when object is undefined', () => {
    const data = undefined;
    const result = isEmptyObject(data);
    expect(result).toBe(true);
  });

  it('should return false when object has a property with value null', () => {
    const data = { name: null };
    const result = isEmptyObject(data);
    expect(result).toBe(false);
  });
});
