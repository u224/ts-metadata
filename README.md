# ts-metadata

A typed wrapper of the Metadata Reflection API.

## Installation

```bash
npm install @u224/ts-metadata
```

## Usage

Metadata definition by the `MetadataKey<T>`

```ts
import {Reflector} from '@u224/ts-metadata';
import {MetadataKey} from '@u224/ts-metadata';

const Metadata = {foo: 'bar'};
class Target {}

// Create the key with metadata type in generic.
const key = new MetadataKey<typeof Metadata>();

// Define a unique metadata entry on the target.
// defineMetadata checks metadata type by the key.
Reflector.defineMetadata(key, Metadata, Target);

// TypeError: Argument of type 'string' is not assignable
// to parameter of type 'typeof Metadata'.
Reflector.defineMetadata(key, 'string', Target);

// ReturnType of `getMetadata` and `getOwnMetadata`
// will be inferred automatically by the given key.
const result = Reflector.getMetadata(key, Target);
```

A utility `getDecoratorTargetType` returns type of decorator target.

```ts
import {getDecoratorTargetType} from '@u224/ts-metadata';
import {DecoratorTargetType as DTT} from '@u224/ts-metadata';

// Let's say we have a decorator.
function myDecorator(
  target: object,
  propertyKey?: string,
  descriptorOrIndex?: PropertyDescriptor | number,
) {
  // To get the type of a given target we should
  // pass decorator parameters as arguments of
  // the function `getDecoratorTargetType`.
  const type = getDecoratorTargetType(
    target,
    propertyKey,
    descriptorOrIndex,
  );
  // Now we have `DecoratorTargetType`
  // to handle decorator usage.
  if (type === DTT.CONSTRUCTOR)
    console.log('@myDecorator is applied to a class');
  if (type === DTT.STATIC_METHOD)
    console.log('@myDecorator is applied to a static method');
  if (type === DTT.INSTANCE_METHOD)
    console.log('@myDecorator is applied to an instance method');
  if (type === DTT.STATIC_PROPERTY)
    console.log('@myDecorator is applied to a static property');
  if (type === DTT.INSTANCE_PROPERTY)
    console.log('@myDecorator is applied to an instance property');
  if (type === DTT.CONSTRUCTOR_PARAMETER)
    console.log('@myDecorator is applied to a constructor parameter');
  if (type === DTT.STATIC_METHOD_PARAMETER)
    console.log('@myDecorator is applied to a static method parameter');
  if (type === DTT.INSTANCE_METHOD_PARAMETER)
    console.log('@myDecorator is applied to an instance method parameter');
};

```

## Testing

```bash
npm run test
```

## License

MIT
