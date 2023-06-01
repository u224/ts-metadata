import {expect} from 'chai';
import {Reflector} from '../src';
import {MetadataKey} from '../src';

const NR = Reflect;
const R = Reflector;

const METADATA_KEY = new MetadataKey<MD>('key');
const METADATA = {property: 'value'};

type MD = typeof METADATA;

describe('Reflector', () => {
  describe('defineMetadata', () => {
    it('allows to define metadata by plain keys', () => {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      R.defineMetadata(symbolKey, METADATA, Context);
      R.defineMetadata(stringKey, METADATA, Context);
      R.defineMetadata(numberKey, METADATA, Context);
      R.defineMetadata(objectKey, METADATA, Context);
      const symbolMd = NR.getMetadata(symbolKey, Context);
      const stringMd = NR.getMetadata(stringKey, Context);
      const numberMd = NR.getMetadata(numberKey, Context);
      const objectMd = NR.getMetadata(objectKey, Context);
      expect(symbolMd).to.be.eq(METADATA);
      expect(stringMd).to.be.eq(METADATA);
      expect(numberMd).to.be.eq(METADATA);
      expect(objectMd).to.be.eq(METADATA);
    });

    it('allows define metadata by the MetadataKey', () => {
      class Context {}
      const key = new MetadataKey<MD>('key');
      R.defineMetadata(key, METADATA, Context);
      const metadata: MD = NR.getMetadata(key, Context);
      expect(metadata).to.be.eq(METADATA);
    });

    it('can distinguish instances of the MetadataKey', () => {
      class TestClass {}
      const metadata1 = 'metadata-1';
      const metadata2 = 'metadata-2';
      const key1 = new MetadataKey('key');
      const key2 = new MetadataKey('key');
      R.defineMetadata(key1, metadata1, TestClass);
      R.defineMetadata(key2, metadata2, TestClass);
      const result1 = NR.getMetadata(key1, TestClass);
      const result2 = NR.getMetadata(key2, TestClass);
      expect(result1).to.be.eql(metadata1);
      expect(result2).to.be.eql(metadata2);
      expect(result1).to.be.not.eq(result2);
    });

    it('sets class metadata', () => {
      class Context {}
      R.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = NR.getMetadata(METADATA_KEY, Context);
      expect(result).to.be.eql(METADATA);
    });

    it('sets prototype metadata', () => {
      class Context {}
      R.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
      );
      const result = NR.getMetadata(
        METADATA_KEY,
        Context.prototype,
      );
      expect(result).to.be.eql(METADATA);
    });

    it('sets metadata of a class property', () => {
      class Context {
        prop?: string;
      }
      R.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context,
        'prop',
      );
      const result = NR.getMetadata(
        METADATA_KEY,
        Context,
        'prop',
      );
      expect(result).to.be.eql(METADATA);
    });

    it('sets metadata of a prototype property', () => {
      class Context {
        prop?: string;
      }
      R.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
        'prop',
      );
      const result = NR.getMetadata(
        METADATA_KEY,
        Context.prototype,
        'prop',
      );
      expect(result).to.be.eql(METADATA);
    });
  });
});
