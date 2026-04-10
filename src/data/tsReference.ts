import type { ReferenceCategory } from '@/types'

export const TS_REFERENCE: ReferenceCategory[] = [
  {
    id: 'basic-types',
    title: 'Basic Types',
    color: '#5b9cf5',
    entries: [
      {
        name: 'Primitive types',
        description: 'TypeScript includes JavaScript\'s primitive types: string, number, boolean, null, undefined, bigint, and symbol.',
        example: 'let name: string = "Alice";\nlet age: number = 30;\nlet active: boolean = true;\nlet nothing: null = null;\nlet missing: undefined = undefined;\nlet big: bigint = 9007199254740993n;\nlet id: symbol = Symbol("userId");\n\n// TypeScript usually infers these:\nconst name = "Alice";   // inferred as string\nconst age = 30;         // inferred as number',
        link: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      },
      {
        name: 'any',
        description: 'Opts out of type checking for a value. Use sparingly — it spreads to anything it touches and removes all type safety benefits.',
        example: '// Avoid any — use unknown instead for truly unknown values:\nlet data: any = fetchRawData();\ndata.anything.goes;  // no error — type safety gone\n\n// Prefer unknown:\nlet raw: unknown = fetchRawData();\n// Must check before using:\nif (typeof raw === "string") {\n  console.log(raw.toUpperCase());  // OK\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any',
      },
      {
        name: 'unknown',
        description: 'A type-safe alternative to any. You can assign anything to unknown, but must narrow it before using it.',
        example: 'function processInput(value: unknown) {\n  // Must narrow before use:\n  if (typeof value === "string") {\n    console.log(value.toUpperCase());  // string\n  } else if (typeof value === "number") {\n    console.log(value.toFixed(2));     // number\n  } else if (Array.isArray(value)) {\n    console.log(value.length);         // array\n  }\n}\n\n// Common in catch blocks (TS 4.0+):\ntry { ... } catch (err: unknown) {\n  if (err instanceof Error) console.error(err.message);\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown',
      },
      {
        name: 'never',
        description: 'Represents values that never occur — exhausted union type branches, functions that always throw, or infinite loops.',
        example: 'type Shape = "circle" | "square" | "triangle";\n\nfunction describeShape(shape: Shape): string {\n  if (shape === "circle") return "round";\n  if (shape === "square") return "boxy";\n  if (shape === "triangle") return "pointy";\n  // TypeScript knows this is unreachable:\n  const _exhaustive: never = shape;  // error if Shape expands\n  throw new Error(`Unknown shape: ${shape}`);\n}\n\n// Functions that throw or loop forever:\nfunction fail(msg: string): never {\n  throw new Error(msg);\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type',
      },
      {
        name: 'Literal types',
        description: 'A type that represents exactly one specific value. Useful for constraining strings, numbers, or booleans to specific allowed values.',
        example: 'type Direction = "north" | "south" | "east" | "west";\ntype Status = "pending" | "fulfilled" | "rejected";\ntype DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;\n\nfunction move(dir: Direction) { ... }\nmove("north");    // OK\n// move("up");    // Error: not in type\n\n// as const — infer literal types:\nconst config = {\n  env: "production",\n  port: 3000,\n} as const;\n// type: { readonly env: "production"; readonly port: 3000 }',
        link: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types',
      },
      {
        name: 'void',
        description: 'The return type for functions that don\'t return a meaningful value. Different from undefined — void functions are allowed to return undefined.',
        example: '// Function with no return:\nfunction logMessage(msg: string): void {\n  console.log(msg);\n  // implicitly returns undefined\n}\n\n// Arrow function:\nconst onClick: () => void = () => {\n  document.title = "Clicked!";\n};\n\n// void vs undefined: void is more permissive\ntype VoidFn = () => void;\nconst fn: VoidFn = () => 42; // OK in type-check (unusual but allowed)',
        link: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#void',
      },
      {
        name: 'satisfies operator',
        description: 'Validates that a value matches a type without widening the inferred type. Introduced in TypeScript 4.9.',
        example: 'type Colors = "red" | "green" | "blue";\ntype ColorMap = Record<string, string | number[]>;\n\nconst palette = {\n  red: [255, 0, 0],\n  green: "#00ff00",\n  blue: [0, 0, 255],\n} satisfies ColorMap;\n\n// satisfies: inferred as literal, validated against ColorMap\npalette.red;        // number[] (not string | number[])\npalette.green;      // string  (not string | number[])\n\n// vs. type annotation which widens:\nconst p2: ColorMap = palette;\np2.red; // string | number[] (widened)',
        link: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html',
      },
    ],
  },
  {
    id: 'type-composition',
    title: 'Type Composition',
    color: '#4ade80',
    entries: [
      {
        name: 'Union types (|)',
        description: 'A type that can be one of several types. Use type narrowing (typeof, instanceof, in, discriminant) to determine which type you have.',
        example: 'type ID = string | number;\n\nfunction printId(id: ID) {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase());\n  } else {\n    console.log(id.toFixed());\n  }\n}\n\n// Discriminated union:\ntype Result =\n  | { ok: true; value: string }\n  | { ok: false; error: Error };\n\nfunction handle(result: Result) {\n  if (result.ok) {\n    console.log(result.value);   // string\n  } else {\n    console.error(result.error); // Error\n  }\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types',
      },
      {
        name: 'Intersection types (&)',
        description: 'Combines multiple types into one — the resulting type has all properties of all constituent types.',
        example: 'type Serializable = { serialize(): string };\ntype Timestamped = { createdAt: Date; updatedAt: Date };\ntype Identifiable = { id: string };\n\ntype Entity = Serializable & Timestamped & Identifiable;\n\nconst entity: Entity = {\n  id: "123",\n  createdAt: new Date(),\n  updatedAt: new Date(),\n  serialize() { return JSON.stringify(this); },\n};\n\n// Common pattern: extend with extra props:\ntype UserWithRole = User & { role: "admin" | "user" };',
        link: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types',
      },
      {
        name: 'interface',
        description: 'Defines the shape of an object. Interfaces are open — they can be extended with more properties in separate declarations (declaration merging).',
        example: 'interface User {\n  id: number;\n  name: string;\n  email?: string;      // optional\n  readonly role: string;  // cannot be reassigned\n}\n\n// Extending:\ninterface AdminUser extends User {\n  permissions: string[];\n}\n\n// Declaration merging (adds to existing interface):\ninterface Window {\n  myCustomProp: string;\n}\n\n// With index signature:\ninterface StringMap {\n  [key: string]: string;\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      },
      {
        name: 'type alias',
        description: 'Creates a name for any type — primitives, unions, intersections, tuples, mapped types. Unlike interface, type aliases cannot be merged.',
        example: '// Object shape (like interface):\ntype Point = { x: number; y: number };\n\n// Union:\ntype Status = "active" | "inactive" | "pending";\n\n// Tuple:\ntype Pair<T> = [T, T];\ntype RGB = [number, number, number];\n\n// Function:\ntype Comparator<T> = (a: T, b: T) => number;\n\n// Mapped:\ntype Optional<T> = { [K in keyof T]?: T[K] };\n\n// Recursive:\ntype JSONValue =\n  | string | number | boolean | null\n  | JSONValue[]\n  | { [key: string]: JSONValue };',
        link: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases',
      },
      {
        name: 'Optional & readonly',
        description: 'Optional properties (?) can be absent or undefined. Readonly properties cannot be reassigned after initialization.',
        example: 'interface Config {\n  host: string;          // required\n  port?: number;         // optional\n  readonly version: string;  // cannot change\n}\n\nconst cfg: Config = { host: "localhost", version: "1.0" };\ncfg.host = "example.com";  // OK\n// cfg.version = "2.0";    // Error: readonly\n\n// Readonly array:\nconst tags: readonly string[] = ["html", "css"];\n// tags.push("js");       // Error',
        link: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties',
      },
      {
        name: 'Mapped types',
        description: 'Create new types by transforming each property of an existing type. Foundation for built-in utility types like Partial and Readonly.',
        example: '// Make all properties optional:\ntype Optional<T> = { [K in keyof T]?: T[K] };\n\n// Make all properties nullable:\ntype Nullable<T> = { [K in keyof T]: T[K] | null };\n\n// Add prefix to all keys:\ntype Prefixed<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\n// Example usage:\ntype User = { name: string; age: number };\ntype PartialUser = Optional<User>;\n// { name?: string; age?: number }',
        link: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
      },
    ],
  },
  {
    id: 'generics',
    title: 'Generics',
    color: '#f59e0b',
    entries: [
      {
        name: 'Generic functions',
        description: 'Type parameters allow a function to work with multiple types while preserving type information. The type is inferred from the argument.',
        example: '// Identity function:\nfunction identity<T>(value: T): T {\n  return value;\n}\nidentity("hello");   // T = string\nidentity(42);        // T = number\n\n// First element of an array:\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nconst n = first([1, 2, 3]);   // number | undefined\nconst s = first(["a", "b"]); // string | undefined\n\n// Multiple type params:\nfunction pair<A, B>(a: A, b: B): [A, B] {\n  return [a, b];\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
      },
      {
        name: 'Generic constraints (extends)',
        description: 'Constrains the types a generic parameter can accept. Ensures the type has required properties.',
        example: '// Constrain to types with a length property:\nfunction longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\nlongest([1, 2], [3, 4, 5]);     // OK (array has length)\nlongest("hello", "hi");          // OK (string has length)\n\n// Constrain to object keys:\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst user = { name: "Alice", age: 30 };\ngetProperty(user, "name");  // string\ngetProperty(user, "age");   // number',
        link: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints',
      },
      {
        name: 'Utility types',
        description: 'Built-in generic types that transform other types. Essential for working with existing types without duplication.',
        example: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n}\n\nPartial<User>         // all optional\nRequired<User>        // all required\nReadonly<User>        // all readonly\nPick<User, "id" | "name">    // subset of keys\nOmit<User, "password">       // exclude key(s)\nRecord<string, User>         // object map\n\n// Function types:\nReturnType<typeof fetchUser>    // return type\nParameters<typeof fetchUser>   // param types as tuple\nAwaited<Promise<User>>         // unwrap Promise: User',
        link: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
      },
      {
        name: 'keyof / typeof',
        description: 'keyof produces a union of an object type\'s keys. typeof gets the TypeScript type of a value (different from JS typeof).',
        example: 'interface User { id: number; name: string; active: boolean; }\n\n// keyof — union of property names:\ntype UserKeys = keyof User;    // "id" | "name" | "active"\n\nfunction pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {\n  return keys.map(k => obj[k]);\n}\n\n// typeof — infer type from value:\nconst config = { host: "localhost", port: 3000 };\ntype Config = typeof config;\n// { host: string; port: number }\n\n// typeof with keyof:\ntype ConfigKey = keyof typeof config; // "host" | "port"',
        link: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
      },
    ],
  },
  {
    id: 'narrowing',
    title: 'Type Narrowing',
    color: '#a78bfa',
    entries: [
      {
        name: 'typeof narrowing',
        description: 'TypeScript narrows the type inside an if block based on the typeof check. Works for primitive types.',
        example: 'function process(value: string | number | boolean) {\n  if (typeof value === "string") {\n    return value.toUpperCase();  // string\n  } else if (typeof value === "number") {\n    return value.toFixed(2);     // number\n  } else {\n    return value ? "yes" : "no"; // boolean\n  }\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards',
      },
      {
        name: 'instanceof narrowing',
        description: 'Narrows to a class type when you know the value is an instance of a specific class. Works well with Error subclasses.',
        example: 'class Dog { bark() { return "Woof!"; } }\nclass Cat { meow() { return "Meow!"; } }\n\nfunction makeSound(animal: Dog | Cat) {\n  if (animal instanceof Dog) {\n    animal.bark();  // Dog\n  } else {\n    animal.meow();  // Cat\n  }\n}\n\n// Common with errors:\ntry {\n  ...\n} catch (err) {\n  if (err instanceof TypeError) {\n    console.error("Type error:", err.message);\n  } else if (err instanceof Error) {\n    console.error("Error:", err.message);\n  }\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing',
      },
      {
        name: 'Type predicates (is)',
        description: 'Custom type guard functions that explicitly tell TypeScript what type a value is after a check.',
        example: '// Type predicate function:\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction isUser(obj: unknown): obj is User {\n  return (\n    typeof obj === "object" &&\n    obj !== null &&\n    "id" in obj &&\n    "name" in obj\n  );\n}\n\n// Usage:\nconst data: unknown = await fetchData();\nif (isUser(data)) {\n  console.log(data.name); // typed as User\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates',
      },
      {
        name: 'Discriminated unions',
        description: 'A pattern where each member of a union has a unique literal property (discriminant) used for type narrowing.',
        example: 'type ApiResponse =\n  | { status: "success"; data: string[] }\n  | { status: "error"; message: string }\n  | { status: "loading" };\n\nfunction render(res: ApiResponse) {\n  switch (res.status) {\n    case "success":\n      return res.data.join(", ");\n    case "error":\n      return `Error: ${res.message}`;\n    case "loading":\n      return "Loading...";\n    default:\n      // TypeScript knows this is never:\n      const _: never = res;\n  }\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions',
      },
    ],
  },
  {
    id: 'functions-ts',
    title: 'Functions',
    color: '#38bdf8',
    entries: [
      {
        name: 'Typed functions',
        description: 'Add types to parameters and return values. TypeScript infers return types but explicit annotations improve clarity.',
        example: '// Named function:\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function:\nconst multiply = (a: number, b: number): number => a * b;\n\n// Optional and default params:\nfunction greet(name: string, greeting?: string): string {\n  return `${greeting ?? "Hello"}, ${name}!`;\n}\n\n// Rest params:\nfunction sum(...nums: number[]): number {\n  return nums.reduce((a, b) => a + b, 0);\n}',
        link: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
      },
      {
        name: 'Function overloads',
        description: 'Declare multiple call signatures for a function that behaves differently based on argument types.',
        example: 'function format(value: string): string;\nfunction format(value: number, decimals: number): string;\nfunction format(value: string | number, decimals?: number): string {\n  if (typeof value === "string") {\n    return value.trim();\n  }\n  return value.toFixed(decimals ?? 0);\n}\n\nformat("  hello  ");    // "hello"\nformat(3.14159, 2);     // "3.14"\n// format(true);        // Error: no matching overload',
        link: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads',
      },
      {
        name: 'Async function types',
        description: 'Async functions always return Promise<T>. Use Awaited<T> to unwrap a Promise type.',
        example: 'interface User { id: number; name: string; }\n\n// Return type is Promise<User>:\nasync function fetchUser(id: number): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json() as Promise<User>;\n}\n\n// Awaited utility type:\ntype FetchResult = Awaited<ReturnType<typeof fetchUser>>;\n// User\n\n// Promise type in callbacks:\ntype AsyncHandler = (id: number) => Promise<void>;',
        link: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
      },
      {
        name: 'import type',
        description: 'Imports only the type — erased at compile time. Improves build performance and avoids circular dependency issues.',
        example: '// Only needed at type-check time:\nimport type { User, Config } from "./types";\nimport type { ComponentProps } from "react";\n\n// Inline type import (TypeScript 4.5+):\nimport { useState, type Dispatch } from "react";\n\n// Use type when the import is only used in type positions:\nimport type { DB } from "./database"; // not imported at runtime\nfunction query(db: DB): Promise<void> { ... }',
        link: 'https://www.typescriptlang.org/docs/handbook/2/modules.html#type-only-imports-and-export',
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Types',
    color: '#e879f9',
    entries: [
      {
        name: 'Conditional types',
        description: 'Types that select one of two possible types based on a condition. Use infer to extract types from within conditional branches.',
        example: '// Basic conditional type:\ntype IsString<T> = T extends string ? true : false;\nIsString<"hello">  // true\nIsString<42>       // false\n\n// With infer — extract return type:\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\n// Unwrap Promise:\ntype Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\n\n// Distribute over union:\ntype NonNullable<T> = T extends null | undefined ? never : T;\nNonNullable<string | null | undefined>  // string',
        link: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
      },
      {
        name: 'Template literal types',
        description: 'Types built by combining string literal types — similar to template literals in JavaScript but at the type level.',
        example: 'type EventName = "click" | "focus" | "blur";\ntype Handler = `on${Capitalize<EventName>}`;\n// "onClick" | "onFocus" | "onBlur"\n\ntype CSSProperty = "padding" | "margin";\ntype CSSDirection = "Top" | "Right" | "Bottom" | "Left";\ntype DirectionalCSS = `${CSSProperty}${CSSDirection}`;\n// "paddingTop" | "paddingRight" | ... | "marginLeft"\n\n// Practical: typed event emitter:\ntype EventMap = { resize: {w:number;h:number}; close: void };\ntype On<T> = { [K in keyof T as `on${Capitalize<string & K>}`]: (e: T[K]) => void };',
        link: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
      },
      {
        name: 'enum',
        description: 'A named set of named constants. String enums (preferred) are more readable in debug output. Const enums are fully erased at compile time.',
        example: '// String enum (preferred):\nenum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT",\n}\n\nfunction move(dir: Direction) {\n  console.log(dir);  // "UP", "DOWN", etc.\n}\nmove(Direction.Up);\n\n// Numeric enum:\nenum Status { Active, Inactive, Pending }  // 0, 1, 2\n\n// Alternative (often preferred for simple cases):\nconst DIRECTION = { Up: "UP", Down: "DOWN" } as const;\ntype Direction = typeof DIRECTION[keyof typeof DIRECTION];',
        link: 'https://www.typescriptlang.org/docs/handbook/enums.html',
      },
      {
        name: 'tsconfig strict mode',
        description: 'Enables a set of strict type-checking options. Always use strict: true — it catches bugs that looser configs miss.',
        example: '// tsconfig.json:\n{\n  "compilerOptions": {\n    "strict": true,  // enables all strict checks:\n    // strictNullChecks — null/undefined are separate types\n    // noImplicitAny — no implicit any\n    // strictFunctionTypes\n    // strictBindCallApply\n    // strictPropertyInitialization\n    // noImplicitThis\n\n    // Extra strictness (opt-in):\n    "noUncheckedIndexedAccess": true,\n    "exactOptionalPropertyTypes": true,\n    "noImplicitOverride": true\n  }\n}',
        link: 'https://www.typescriptlang.org/tsconfig#strict',
      },
    ],
  },
]
