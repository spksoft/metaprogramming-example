# TypeScript Decorator Example

This example demonstrates the use of method decorators in TypeScript. It showcases a simple `@log` decorator that logs method calls and their results.

## Files

- `index.ts`: Contains the main example code with the decorator and a sample class.

## Decorator Explanation

The `@log` decorator is a method decorator that wraps the original method with logging functionality. It logs the method name and arguments before the method call, and the result after the method call.

## Usage

The example includes a `Calculator` class with two methods (`add` and `multiply`) decorated with `@log`. When these methods are called, you'll see log messages in the console showing the method calls and their results.

## Note

This example requires TypeScript's experimental decorators feature. Make sure your `tsconfig.json` includes:
