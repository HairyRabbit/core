/**
 * ensure array when input was single element
 *
 * @flow
 */

export default function ensureArray<T>(input?: T | Array<T>): Array<T> {
  if(!input) {
    return []
  }

  return Array.isArray(input) ? input : [input]
}


/**
 * test
 */

import assert from 'assert'

describe('ensureArray()', function() {
  it('should return array when input was only string', function() {
    assert.deepStrictEqual(
      ensureArray('foo'),
      ['foo']
    )
  })

  it('should return array when no input', function() {
    assert.deepStrictEqual(
      ensureArray(),
      []
    )
  })

  it('should return array when input was array', function() {
    assert.deepStrictEqual(
      ensureArray(['foo', 'bar']),
      ['foo', 'bar']
    )
  })
})
