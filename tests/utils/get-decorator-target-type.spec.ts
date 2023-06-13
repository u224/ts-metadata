/* eslint @typescript-eslint/no-unused-vars: 0 */
import {expect} from 'chai';
import {getDecoratorTargetType} from '../../src';
import {DecoratorTargetType as DT} from '../../src';

describe('getDecoratorTargetType', () => {
  const validate = function (value: DT) {
    return function (
      target: object,
      propertyKey?: string,
      descriptorOrIndex?: PropertyDescriptor | number,
    ) {
      const type = getDecoratorTargetType(
        target,
        propertyKey,
        descriptorOrIndex,
      );
      expect(value).to.be.eq(type);
    };
  };

  it('returns CONSTRUCTOR', () => {
    @validate(DT.CONSTRUCTOR)
    class Target {}
  });

  it('returns INSTANCE', () => {
    class Target {}
    const decorator = validate(DT.INSTANCE);
    decorator(Target.prototype);
  });

  it('returns STATIC_METHOD', () => {
    class Target {
      @validate(DT.STATIC_METHOD)
      static method() {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD', () => {
    class Target {
      @validate(DT.INSTANCE_METHOD)
      method() {
        /**/
      }
    }
  });

  it('returns STATIC_PROPERTY', () => {
    class Target {
      @validate(DT.STATIC_PROPERTY)
      static prop?: unknown;
    }
  });

  it('returns INSTANCE_PROPERTY', () => {
    class Target {
      @validate(DT.INSTANCE_PROPERTY)
      prop?: unknown;
    }
  });

  it('returns CONSTRUCTOR_PARAMETER', () => {
    class Target {
      constructor(
        @validate(DT.CONSTRUCTOR_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns STATIC_METHOD_PARAMETER', () => {
    class Target {
      static method(
        @validate(DT.STATIC_METHOD_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });

  it('returns INSTANCE_METHOD_PARAMETER', () => {
    class Target {
      method(
        @validate(DT.INSTANCE_METHOD_PARAMETER)
        param: unknown,
      ) {
        /**/
      }
    }
  });
});
