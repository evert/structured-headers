import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  parseItem,
  serializeItem,
  DisplayString,
  ParseError,
} from '../dist/index.js';

describe('parser', () => {

  describe('Display Strings', () => {

    it('should fail on characters outside of the ASCII range', () => {
      // These used to be cut down to their low byte, so "Ł" (U+0141)
      // parsed as "A" and "Ā" (U+0100) as a NUL character.
      for (const input of ['%"Ł"', '%"aŁb"', '%"Ā"', '%"€"', '%"😀"']) {
        assert.throws(() => parseItem(input), ParseError, input);
      }
    });

    it('should keep a leading byte order mark', () => {
      const [value] = parseItem('%"%ef%bb%bfa"');
      assert.equal(value.toString(), '﻿a');
    });

    it('should round-trip a value that starts with a byte order mark', () => {
      const input = new DisplayString('﻿a');
      const [value] = parseItem(serializeItem(input));
      assert.equal(value.toString(), '﻿a');
    });

  });

});
