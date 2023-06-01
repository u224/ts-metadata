import {expect} from 'chai';
import {Reflector} from '../src';
import {MetadataKey} from '../src';

const NR = Reflect;
const R = Reflector;

const METADATA_KEY = new MetadataKey<MD>('key');
const METADATA = {property: 'value'};

type MD = typeof METADATA;

describe('Reflector', () => {
  describe('hasMetadata', () => {
    it('allows to check metadata by scalar keys', () => {
      class Context {}
      const symbolKey = Symbol();
      const stringKey = 'string';
      const numberKey = 10;
      const objectKey = {key: 'value'};
      NR.defineMetadata(symbolKey, METADATA, Context);
      NR.defineMetadata(stringKey, METADATA, Context);
      NR.defineMetadata(numberKey, METADATA, Context);
      NR.defineMetadata(objectKey, METADATA, Context);
      const inSymbol = R.hasMetadata(symbolKey, Context);
      const inString = R.hasMetadata(stringKey, Context);
      const inNumber = R.hasMetadata(numberKey, Context);
      const inObject = R.hasMetadata(objectKey, Context);
      expect(inSymbol).to.be.true;
      expect(inString).to.be.true;
      expect(inNumber).to.be.true;
      expect(inObject).to.be.true;
    });

    it('allows to check metadata by the MetadataKey', () => {
      class Context {}
      const key = new MetadataKey<MD>('key');
      NR.defineMetadata(key, METADATA, Context);
      const result = R.hasMetadata(key, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a class', () => {
      class Context {}
      const noMd = R.hasMetadata(METADATA_KEY, Context);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, Context);
      const result = R.hasMetadata(METADATA_KEY, Context);
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype', () => {
      class Context {}
      const noMd = R.hasMetadata(
        METADATA_KEY,
        Context.prototype,
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        Context.prototype,
      );
      expect(result).to.be.true;
    });

    it('checks if metadata in a class property', () => {
      class Context {
        prop?: string;
      }
      const noMd = R.hasMetadata(
        METADATA_KEY,
        Context,
        'prop',
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        Context,
        'prop',
      );
      expect(result).to.be.true;
    });

    it('checks if metadata in a prototype property', () => {
      class Context {
        prop?: string;
      }
      const noMd = R.hasMetadata(
        METADATA_KEY,
        Context.prototype,
        'prop',
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        Context.prototype,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        Context.prototype,
        'prop',
      );
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a class', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(METADATA_KEY, ContextB);
      expect(noMd).to.be.false;
      NR.defineMetadata(METADATA_KEY, METADATA, ContextA);
      const result = R.hasMetadata(METADATA_KEY, ContextB);
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a prototype', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(
        METADATA_KEY,
        ContextB.prototype,
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA.prototype,
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextB.prototype,
      );
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a class property', () => {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(
        METADATA_KEY,
        ContextB,
        'prop',
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextB,
        'prop',
      );
      expect(result).to.be.true;
    });

    it('checks if parent metadata in a prototype property', () => {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      const noMd = R.hasMetadata(
        METADATA_KEY,
        ContextB.prototype,
        'prop',
      );
      expect(noMd).to.be.false;
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextA.prototype,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextB.prototype,
        'prop',
      );
      expect(result).to.be.true;
    });

    it('returns false for child metadata in a class', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(METADATA_KEY, METADATA, ContextB);
      const result = R.hasMetadata(METADATA_KEY, ContextA);
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype', () => {
      class ContextA {}
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB.prototype,
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextA.prototype,
      );
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a class property', () => {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextA,
        'prop',
      );
      expect(result).to.be.false;
    });

    it('returns false for child metadata in a prototype property', () => {
      class ContextA {
        prop?: string;
      }
      class ContextB extends ContextA {}
      NR.defineMetadata(
        METADATA_KEY,
        METADATA,
        ContextB.prototype,
        'prop',
      );
      const result = R.hasMetadata(
        METADATA_KEY,
        ContextA.prototype,
        'prop',
      );
      expect(result).to.be.false;
    });
  });
});
