/**
 * choose one or more of a collect elements
 *
 * @flow
 */

type Options = {
  test?: string | RegExp,
  include?: string | Array<string>,
  exclude?: string | Array<string>
}

export default function choose({ test,
                                 include = [],
                                 exclude = [] }: Options = {}) {
  const call = test
        ? ('[object RegExp]' === Object.prototype.toString.call(test)
           ? (a => test.test(a))
           : (a => a === String(test)))
        : (() => true)

  const inc = Array.isArray(include) ? include : [include]
  const exc = Array.isArray(exclude) ? exclude : [exclude]

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

  it('should choose with include with string type', function() {
    assert.deepStrictEqual(
      choose({ include: 'bar' })(['foo']),
      ['foo', 'bar']
    )
  })

  it('should choose with exclude', function() {
    assert.deepStrictEqual(
      choose({ exclude: ['bar'] })(['foo', 'bar']),
      ['foo']
    )
  })

  it('should choose with exclude with string type', function() {
    assert.deepStrictEqual(
      choose({ exclude: 'bar' })(['foo', 'bar']),
      ['foo']
    )
  })
})
