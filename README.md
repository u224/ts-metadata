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

// Key will store the metadata type in generic.
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

## Testing

```bash
npm run test
```

## License

MIT
