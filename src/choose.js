/**
 * choose one or more of a collect elements
 *
 * @flow
 */

export type Options = {
  test?: string | RegExp,
  include?: Array<string>,
  exclude?: Array<string>
}

export default function choose({ test, include = [], exclude = [] }: Options = {}) {
  const call = test
        ? ('string' === typeof test
           ? (a => a === String(test))
           : (a => test.test(a)))
        : (a => true)

  return function choose1(collects: Array<string>): Array<string> {
    return collects
      .filter(item => call(item) && Boolean(!~exclude.indexOf(item)))
      .concat(include)
  }
}


/**
 * test
 */

import assert from 'assert'

describe('choose()', function() {
  it('should choose with default options', function() {
    assert.deepStrictEqual(
      choose()(['foo', 'bar']),
      ['foo', 'bar']
    )
  })

  it('should choose with test string type', function() {
    assert.deepStrictEqual(
      choose({ test: 'foo' })(['foo', 'bar']),
      ['foo']
    )
  })

  it('should choose with test regexp', function() {
    assert.deepStrictEqual(
      choose({ test: /^ba/ })(['bar', 'baz']),
      ['bar', 'baz']
    )
  })

  it('should choose with include', function() {
    assert.deepStrictEqual(
      choose({ include: ['bar'] })(['foo']),
      ['foo', 'bar']
    )
  })

  it('should choose with exclude', function() {
    assert.deepStrictEqual(
      choose({ exclude: ['bar'] })(['foo', 'bar']),
      ['foo']
    )
  })
})
