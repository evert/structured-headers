import {
  parseItem,
  serializeDictionary,
  serializeItem,
  SerializeError
} from '../dist/index.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * These tests cover cases that aren't covered by the HTTPWG tests.
 */
describe('serializer shorthands', () => {

  describe('serializeDictionary', () => {

    it('should support a simple object syntax', () => {

      const simpleDict = {
        a: 1,
        b: true,
        c: 'd',
        f: [[1,2,3], new Map([['a', 'b']])], 
      };

      const str = serializeDictionary(simpleDict);
      assert.equal(
        str,
        'a=1, b, c="d", f=(1 2 3);a="b"'
      );

    });

  });

  describe('serializeByteSequence', () => {

    // The bytes of sha512(''), which is 64 bytes and therefore always taken
    // from Node's shared Buffer pool rather than its own allocation.
    const hex =
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce' +
      '47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e';
    const expected =
      ':z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==:';

    const bytes = Uint8Array.from(
      hex.match(/../g).map(byte => parseInt(byte, 16))
    );

    it('should serialize an ArrayBuffer', () => {

      assert.equal(serializeItem(bytes.buffer), expected);

    });

    it('should serialize a Uint8Array', () => {

      assert.equal(serializeItem(bytes), expected);

    });

    it('should serialize a Node Buffer', () => {

      // A Buffer this size is a view onto the shared pool, so its own bytes
      // sit at an offset inside a much larger buffer. Reading the whole
      // buffer would emit unrelated memory.
      const buffer = Buffer.from(hex, 'hex');
      assert.ok(buffer.buffer.byteLength > buffer.byteLength);
      assert.equal(serializeItem(buffer), expected);

    });

    it('should serialize a view onto part of a buffer', () => {

      const padded = new Uint8Array(bytes.byteLength + 8);
      padded.fill(0xff);
      padded.set(bytes, 4);
      assert.equal(
        serializeItem(padded.subarray(4, 4 + bytes.byteLength)),
        expected
      );

    });

    it('should serialize a DataView', () => {

      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      assert.equal(serializeItem(view), expected);

    });

    it('should round-trip a parsed Byte Sequence', () => {

      const [value] = parseItem(expected);
      assert.ok(value instanceof ArrayBuffer);
      assert.equal(serializeItem(value), expected);

    });

  });

  describe('serializeItem', () => {

    it('should keep a fractional digit when a decimal rounds to a whole number', () => {

      for (const [input, expected] of [[1.0001, '1.0'], [9.9999, '10.0'], [-0.0001, '-0.0']]) {
        const str = serializeItem(input);
        assert.equal(str, expected);
        assert.deepEqual(parseItem(str), [Number(expected), new Map()]);
      }

    });

    it('should error when passing a type that\'s not recognized', () => {

      let caught = false;
      try {
        serializeItem(Symbol.for('bla'));
      } catch (err) {
        if (err instanceof SerializeError) {
          caught = true;
        } else {
          throw err;
        }
      }
      assert.ok(caught);

    });

  });

});
