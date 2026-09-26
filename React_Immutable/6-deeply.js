import { List, Map } from 'immutable';

export default function mergeDeeplyElements(page1, page2) {
  return List(Map(page1).mergeDeep(page2).valueSeq());
}
