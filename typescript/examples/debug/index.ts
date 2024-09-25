// Define a decorator factory
function debug(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('debug', 'target', target, 'propertyKey', propertyKey, 'descriptor', descriptor);
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling method ${propertyKey} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}

// Example class using the decorator

class Calculator {
  @debug
  add(a: number, b: number): number {
    return a + b;
  }

  @debug
  multiply(a: number, b: number): number {
    return a * b;
  }

  @debug
  divideBy1(a: number): number {
    return a / 1;
  }
}

// Usage
const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 2);