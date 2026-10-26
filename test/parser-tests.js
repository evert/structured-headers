import {
  parseDictionary,
  parseItem,
  parseList,
  ParseError
} from '../dist/index.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * These tests cover cases that aren't covered by the HTTPWG tests.
 */
describe('parser', () => {

  describe('parseDate', () => {

    const date = new Date(1659578233 * 1000);

    it('should parse a date with parameters', () => {

      assert.deepStrictEqual(
        parseItem('@1659578233;a=1'),
        [date, new Map([['a', 1]])]
      );

    });

    it('should parse dates followed by other list members', () => {

      assert.deepStrictEqual(
        parseList('@1659578233, (@0 @-1)'),
        [
          [date, new Map()],
          [[[new Date(0), new Map()], [new Date(-1000), new Map()]], new Map()],
        ]
      );

    });

    it('should parse a date followed by other dictionary members', () => {

      assert.deepStrictEqual(
        parseDictionary('a=@1659578233, b=2'),
        new Map([
          ['a', [date, new Map()]],
          ['b', [2, new Map()]],
        ])
      );

    });

    it('should reject a decimal date', () => {

      assert.throws(() => parseItem('@1659578233.5'), ParseError);

    });

  });

});
