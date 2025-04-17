**Definition:**
- A **shallow copy** creates a new object or array but **copies references** to the nested objects or arrays. It does not create copies of the nested structures themselves.
- A **deep copy** creates a completely new object or array, including new copies of all nested objects or arrays, meaning no references are shared.

---

### **Shallow Copy:**

- **What it copies:** Only the top-level object or array. Nested objects/arrays inside are **still references** to the original.
- **Use Case:** Often used when you only need to modify the top-level properties and don't care about nested structures.

**Example:**
```js
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

shallowCopy.a = 10;       // Only changes the top-level 'a'
shallowCopy.b.c = 20;     // Mutates the same 'b' object in original

console.log(original);   // { a: 1, b: { c: 20 } }
```

Here, the top-level properties are copied, but the `b` object is **shared** between `original` and `shallowCopy`.

---

### **Deep Copy:**

- **What it copies:** A **full copy** of the object or array, including all nested objects or arrays. No references are shared.
- **Use Case:** Useful when you need to fully isolate the copied object from the original, especially with nested structures.

**Example:**
```js
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.a = 10;          // Changes the top-level 'a'
deepCopy.b.c = 20;        // Changes the 'b' object in deepCopy

console.log(original);    // { a: 1, b: { c: 2 } }
console.log(deepCopy);    // { a: 10, b: { c: 20 } }
```

Here, `deepCopy` is completely independent of `original` since all nested objects are also copied.

---

### **Key Differences:**
1. **Shallow Copy:**
   - Copies top-level properties.
   - Nested objects/arrays are **shared**.
   - Faster than deep copy.
   
2. **Deep Copy:**
   - Copies all properties, including nested objects/arrays.
   - No references are shared.
   - Slower because it involves recursively copying all nested structures.

---

### Conclusion:
- Use **shallow copy** when you don’t need to change nested structures.
- Use **deep copy** when you need a completely independent copy of all properties and nested objects.
