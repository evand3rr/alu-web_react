import { fromJS, List, Map } from 'immutable';
import getFromJS from './0-fromjs';
import getMap from './1-map';
import accessImmutableObject from './2-nested';
import { addElementToList, getListObject } from './3-list';
import { map, map2 } from './4-mutations';
import { concatElements, mergeElements } from './5-merge';
import mergeDeeplyElements from './6-deeply';
import areMapsEqual from './7-equality';
import printBestStudents from './8-seq';

test('converts an object with fromJS', () => {
  const object = { name: 'Guillaume' };

  expect(getFromJS(object)).toEqual(fromJS(object));
});

test('converts an object with Map', () => {
  const object = { name: 'Guillaume' };

  expect(getMap(object)).toEqual(Map(object));
});

test('accesses nested immutable values', () => {
  const object = { name: { first: 'Guillaume' } };

  expect(accessImmutableObject(object, ['name', 'first'])).toBe('Guillaume');
});

test('creates and appends to immutable lists', () => {
  const list = getListObject(['one']);

  expect(list).toEqual(List(['one']));
  expect(addElementToList(list, 'two')).toEqual(List(['one', 'two']));
});

test('creates the chained mutation maps', () => {
  expect(map.get('2')).toBe('Noah');
  expect(map2.get(2)).toBe('Benjamin');
  expect(map2.get(4)).toBe('Oliver');
});

test('concatenates and merges pages', () => {
  expect(concatElements([1, 2], [3, 4])).toEqual(List([1, 2, 3, 4]));
  expect(mergeElements({ first: 'one' }, { first: 'updated', second: 'two' }))
    .toEqual(List(['updated', 'two']));
});

test('deeply merges pages', () => {
  const page1 = {
    'user-1': {
      id: 1,
      likes: { 1: { uid: 1234 } },
    },
  };
  const page2 = {
    'user-1': {
      likes: { 2: { uid: 134 } },
    },
  };

  expect(mergeDeeplyElements(page1, page2).toJS()).toEqual([
    {
      id: 1,
      likes: {
        1: { uid: 1234 },
        2: { uid: 134 },
      },
    },
  ]);
});

test('compares immutable maps by value', () => {
  expect(areMapsEqual(Map({ first: 'Guillaume' }), Map({ first: 'Guillaume' })))
    .toBe(true);
});

test('prints only students with passing scores', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  printBestStudents({
    1: { score: 99, firstName: 'guillaume', lastName: 'salva' },
    2: { score: 69, firstName: 'ibrahim', lastName: 'salami' },
  });

  expect(logSpy).toHaveBeenCalledWith({
    score: 99,
    firstName: 'Guillaume',
    lastName: 'Salva',
  });
  expect(logSpy).toHaveBeenCalledTimes(1);
  logSpy.mockRestore();
});
