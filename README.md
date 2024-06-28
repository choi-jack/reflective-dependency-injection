# Reflective Dependency Injection

Dependency injection based on TypeScript's experimental support for stage 2 decorators and metadata.

- Constructor-based injection
- Asynchronous support
- Error detection
  - Circular dependency
  - Lifetime mismatch

## Getting Started

If you are unfamiliar with decorators and metadata, I recommend checking out the TypeScript documentation and TC39's decorator proposal documentation.

- <https://www.typescriptlang.org/docs/handbook/decorators.html>
- <https://github.com/tc39/proposal-decorators>

### Prerequisites

The following versions of Node.js and TypeScript are required:

- Node.js 16 or higher
- TypeScript 4.7 or higher

This package is [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), and you must configure your project to use the ESM package.

### Installation

1. Install packages.

    ```sh
    npm install reflective-dependency-injection reflect-metadata
    ```

2. Import the `reflect-metadata` package into your application entry point.

    ```typescript
    import 'reflect-metadata';
    ```

    - It should be imported only once in the entire application, and before other packages.
    - If you distribute a module as a package, it must not be imported and must be installed as a development dependency.

3. Set compiler options in your `tsconfig.json` to enable experimental support for stage 2 decorators and metadata.

    ```json
    {
        "compilerOptions": {
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true
        }
    }
    ```

## Usage

Let's take a look at the basic usage through the following steps.

### 1. Declare dependencies

First you need to declare your dependencies.

Decorate a class with the `@Injectable` decorator to make the class injectable.

Use the `InjectionToken` class as the identifier for non-class dependencies, and decorate the `@Inject` decorator to specify the dependency identifier.

```typescript
import { Inject, Injectable, InjectionToken } from 'reflective-dependency-injection';

const GREETING: InjectionToken<string> = new InjectionToken('greeting');

@Injectable()
class Greeter {
    public constructor(
        @Inject(GREETING)
        public readonly greeting: string,
    ) { }

    public greet(): string {
        return `Hello, ${this.greeting}`;
    }
}
```

### 2. Create an injector

Create an injector with providers that provide the declared dependencies.

> Use the `provide` function for type safety.

```typescript
import { Injector, provide } from 'reflective-dependency-injection';

const injector: Injector = new Injector([
    provide({
        identifier: Greeter,
        useClass: Greeter,
    }),
    provide({
        identifier: GREETING,
        useValue: 'world!',
    }),
]);
```

### 3. Resolve dependencies

The injector resolves the dependency graph and returns an instance of the dependency.

```typescript
const greeter: Greeter = await injector.get(Greeter);

expect(greeter.greet()).toBe('Hello, world!');
```

## License

Distributed under the MIT License. See the [LICENSE](https://github.com/choi-jack/reflective-dependency-injection/blob/main/LICENSE) file for more details.
