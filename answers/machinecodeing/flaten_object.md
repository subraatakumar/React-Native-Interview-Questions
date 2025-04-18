# JavaScript Program to Flatten a Nested Object

Here's a JavaScript program that flattens a nested object by concatenating the keys with a specified delimiter:

```javascript
function flattenObject(obj, parentKey = '', delimiter = '.') {
  let flattened = {};
  
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    
    const newKey = parentKey ? `${parentKey}${delimiter}${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenObject(obj[key], newKey, delimiter));
    } else {
      // Add the value to the flattened object
      flattened[newKey] = obj[key];
    }
  }
  
  return flattened;
}

// Example usage:
const nestedObject = {
  user: {
    name: 'John',
    address: {
      street: '123 Main St',
      city: 'New York',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    hobbies: ['reading', 'gaming']
  },
  age: 30
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
```

## Output:
The above code will produce this flattened object:

```javascript
{
  "user.name": "John",
  "user.address.street": "123 Main St",
  "user.address.city": "New York",
  "user.address.coordinates.lat": 40.7128,
  "user.address.coordinates.lng": -74.0060,
  "user.hobbies": ["reading", "gaming"],
  "age": 30
}
```

## Features:
1. Handles nested objects recursively
2. Allows customization of the delimiter (default is '.')
3. Preserves non-object values (numbers, strings, arrays, etc.)
4. Skips null values (treats them as non-objects)
5. Only processes own properties (ignores prototype chain)

## Alternative Version (Without Recursion):

Here's a non-recursive version using a stack:

```javascript
function flattenObject(obj, delimiter = '.') {
  const flattened = {};
  const stack = [{ obj, prefix: '' }];
  
  while (stack.length) {
    const { obj, prefix } = stack.pop();
    
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      
      const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        stack.push({ obj: value, prefix: newKey });
      } else {
        flattened[newKey] = value;
      }
    }
  }
  
  return flattened;
}
```

Both versions accomplish the same task, but the recursive version is more concise while the stack-based version avoids potential stack overflow with very deeply nested objects.
