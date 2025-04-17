**Definition:**  
JavaScript’s **primitive types** (like `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) hold **actual values**. **Reference types** (like `object`, `array`, `function`) hold **references (memory addresses)** to where the data is stored.

**Explanation:**  
- **Primitives** are copied by value. Assigning or comparing them deals directly with the value itself.
- **Reference types** are copied by reference. Assigning them to another variable doesn’t create a new copy—it points to the same memory.

**Why it matters in state management (e.g., React):**  
When updating state with primitive values (like numbers or strings), React detects changes easily. But with reference types (like objects or arrays), **mutating them directly won’t trigger a re-render**, because the reference remains the same.

So in React, you should always **create a new object or array** instead of modifying the existing one. This helps React detect the change and update the UI.

**Example:**
```jsx
// BAD: Direct mutation
setUser(prev => {
  prev.name = 'New'; // same reference
  return prev;
});

// GOOD: Create new reference
setUser(prev => ({
  ...prev,
  name: 'New' // new object
}));
```

**Conclusion:**  
Understanding the difference helps avoid bugs and ensures proper state updates and UI rendering in React.
