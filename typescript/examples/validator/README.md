# TypeScript Parameter Decorator Example

This example demonstrates the use of parameter decorators in TypeScript. It showcases a `@validateRange` decorator that validates the input range of method parameters.

## Files

- `parameterDecorator.ts`: Contains the main example code with the parameter decorator and a sample class.

## Decorator Explanation

`@validateRange(min, max)` Decorator:
- Type: Parameter Decorator
- Purpose: Ensures that a numeric parameter falls within a specified range.
- Behavior: Throws an error if the parameter value is outside the specified range.

## Usage

The example includes an `ExampleClass` with a `calculateArea` method that uses the decorator:
