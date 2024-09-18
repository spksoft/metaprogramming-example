import 'reflect-metadata';

// Method decorator to apply parameter validators
function validateParameters(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('validateParameters', 'target', target, 'propertyKey', propertyKey, 'descriptor', descriptor);
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const validators = Reflect.getMetadata(`${propertyKey}_validators`, target.constructor) as ((args: any[]) => void)[];
    validators.forEach(validator => validator(args));
    return originalMethod.apply(this, args);
  };
}

// Parameter decorator factory
function validateRange(min: number, max: number) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    console.log('validateRange', 'target', target, 'propertyKey', propertyKey, 'parameterIndex', parameterIndex);
    const key = `${String(propertyKey)}_validators`;
    if (!Reflect.hasMetadata(key, target.constructor)) {
      Reflect.defineMetadata(key, [], target.constructor);
    }
    const validators = Reflect.getMetadata(key, target.constructor) as ((args: any[]) => void)[];
    validators.push((args: any[]) => {
      const value = args[parameterIndex];
      if (typeof value !== 'number' || value < min || value > max) {
        throw new Error(`Parameter at index ${parameterIndex} is out of range. Expected ${min}-${max}, got ${value}.`);
      }
    });
    Reflect.defineMetadata(key, validators, target.constructor);
  }
}

// Example usage
class ExampleClass {
  @validateParameters
  calculateArea(@validateRange(0, 100) width: number, @validateRange(0, 100) height: number): number {
    return width * height;
  }
}



// Test the decorated method
const example = new ExampleClass();
console.log(example.calculateArea(50, 60)); // Valid: Outputs 3000
try {
  example.calculateArea(150, 60); // Invalid: Throws error
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred');
  }
}