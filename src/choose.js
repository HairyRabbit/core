/**
 * choose one or more of a collect elements
 *
 * @flow
 */

type Options = {
  test?: string | RegExp,
  include?: Array<string>,
  exclude?: Array<string>
}

export default function choose({ test, include, exclude }: Options) {
  const call = '[object RegExp]' === Object.prototype.toString.call(test)
        ? (a => test.test(a))
        : (a => a === String(test))

  return function choose1(collects: Array<string>): Array<string> {
    return collects
      .filter(coll => call(coll) && Boolean(!~exclude.indexOf(coll)))
      .concat(include)
  }
}


/**
 * test
 */

import assert from 'assert'

describe('choose', function() {
  it('should choose with test string type', function() {
    assert.deepStrictEqual(
      choose({ test: 'foo' })(['foo', 'bar']),
      ['foo']
    )
  })
})
