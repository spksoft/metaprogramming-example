function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`${propertyKey} took ${duration} milliseconds`);
    return result;
  }
}

class Calculator {
  @measureTime
  add(a: number, b: number): number {
    return a + b;
  }

  @measureTime
  multiply(a: number, b: number): number {
    return a * b;
  }

  @measureTime
  divideBy1(a: number): number {
    return a / 1;
  }
}

const calc = new Calculator();
calc.add(1, 2);
calc.multiply(2, 3);
calc.divideBy1(4);

