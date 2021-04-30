
import PointData, { PointDataProps } from '../PointData';

const fakeData: PointDataProps = {
  data: [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    9, 10, 11
  ],
  swap: [
    10, 11, 12,
    13, 14, 15,
    16, 17, 18,
    19, 20, 21
  ],
  width: 3,
  height: 4,
};

test('Correctly accesses array via grid points', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getDataAt([2, 0])).toBe(2)
  expect(pointData.getDataAt([2, 3])).toBe(11)
  expect(pointData.getDataAt([0, 3])).toBe(9)
  expect(pointData.getDataAt([1, 2])).toBe(7)
});


test('Handles out of bounds: too high', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getDataAt([100, 10])).toBeNull()
});

test('Handles out of bounds: too low', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getDataAt([-1, 0])).toBeNull()
});

/**
 *  data: [
 *    0, 1, 2,
 *    3, 4, 5,
 *    6, 7, 8,
 *    9, 10, 11
 *  ],
 ****/

// ORIGIN
test('getRight: [0, 0]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getRight([0, 0])).toBe(1)
});

test('getLeft: [0, 0]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getLeft([0, 0])).toBeNull()
});

test('getAbove: [0, 0]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getAbove([0, 0])).toBeNull()
});

test('getBelow: [0, 0]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getBelow([0, 0])).toBe(3)
});

/***
 * Middle Point
 */

test('getRight: [1, 1]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getRight([1, 1])).toBe(5)
});

test('getLeft: [1, 1]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getLeft([1, 1])).toBe(3)
});

test('getAbove: [1, 1]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getAbove([1, 1])).toBe(1)
});

test('getBelow: [1, 1]', () => {
  const pointData = new PointData(fakeData)
  expect(pointData.getBelow([1, 1])).toBe(7)
});

