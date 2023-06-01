import {expect} from 'chai';
import {Reflector} from '../src';
import {MetadataKey} from '../src';

const NR = Reflect;
const R = Reflector;

const METADATA_KEY = new MetadataKey<MD>('key');
const METADATA = {property: 'value'};

type MD = typeof METADATA;

describe('Reflector', () => {
  describe('getOwnMetadata', () => {
    it('allows to get metadata by plain keys', () => {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const symbolMd = R.getOwnMetadata(symbolKey, Context);
      const stringMd = R.getOwnMetadata(stringKey, Context);
      const numberMd = R.getOwnMetadata(numberKey, Context);
      const objectMd = R.getOwnMetadata(objectKey, Context);
      expect(symbolMd).to.be.eq(METADATA);
      expect(stringMd).to.be.eq(METADATA);
      expect(numberMd).to.be.eq(METADATA);
      expect(objectMd).to.be.eq(METADATA);
    });

    it('allows to get metadata by the MetadataKey', () => {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const metadata: MD | undefined = R.getOwnMetadata(
        key,
        Context,
      );
      expect(metadata).to.be.eq(METADATA);
    });

    it('can distinguish instances of the MetadataKey', () => {
      class TestClass {}
      const metadata1 = 'metadata-1';
      const metadata2 = 'metadata-2';
      const key1 = new MetadataKey('key');
      const key2 = new MetadataKey('key');
      NR.defineMetadata(key1, metadata1, TestClass);
      NR.defineMetadata(key2, metadata2, TestClass);
      const result1 = R.getOwnMetadata(key1, TestClass);
      const result2 = R.getOwnMetadata(key2, TestClass);
      expect(result1).to.be.eql(metadata1);
      expect(result2).to.be.eql(metadata2);
      expect(result1).to.be.not.eq(result2);
    });

    it('returns class metadata', () => {
      class Context {}
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.getOwnMetadata(
        METADATA_KEY,
        Context,
      );
      expect(result).to.be.eql(METADATA);
    });

    it('returns prototype metadata', () => {
      class Context {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        Context.prototype,
      );
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a class property', () => {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        Context,
        'prop',
      );
      expect(result).to.be.eql(METADATA);
    });

    it('returns metadata of a prototype property', () => {
      class Context {
        prop?: string;
      }
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        Context.prototype,
        'prop',
      );
      expect(result).to.be.eql(METADATA);
    });

    it('does not returns parent metadata from a class', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextB,
      );
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a prototype', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA.prototype,
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextB.prototype,
      );
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a class property', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextB,
        'prop',
      );
      expect(result).to.be.undefined;
    });

    it('does not returns parent metadata from a prototype property', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA.prototype,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextB.prototype,
        'prop',
      );
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a class', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextA,
      );
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB.prototype,
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextA.prototype,
      );
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a class property', () => {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextA,
        'prop',
      );
      expect(result).to.be.undefined;
    });

    it('does not returns child metadata from a prototype property', () => {
      class ContextA {}
      class ContextB extends ContextA {
        prop?: string;
      }
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB.prototype,
        'prop',
      );
      const result = R.getOwnMetadata(
        METADATA_KEY,
        ContextA.prototype,
        'prop',
      );
      expect(result).to.be.undefined;
    });

    it('returns undefined if no metadata', () => {
      class Context {}
      const result = R.getOwnMetadata(
        METADATA_KEY,
        Context,
      );
      expect(result).to.be.undefined;
    });
  });
});
