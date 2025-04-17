**Definition:**  
The `...` operator in JavaScript has two uses:

- **Spread** operator: used to **copy** or **spread out** elements from arrays or objects.
- **Rest** operator: used to **gather** multiple function arguments into a single array.

---

**1. Spread Operator (used for cloning or copying):**

It’s often used in React to clone state and avoid direct mutation.

**Examples:**

```js
// Cloning an array
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1, 2, 3]

// Cloning an object
const user = { name: 'Sam' };
const newUser = { ...user, age: 25 }; // { name: 'Sam', age: 25 }
```

In React:
```js
setUser(prev => ({ ...prev, name: 'Alex' }));
```

This creates a **new object** with the updated name, helping React detect the change.

---

**2. Rest Operator (used in function parameters):**

It collects multiple arguments into an array.

**Example:**
```js
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // returns 6
```

---

**Conclusion:**  
- **Spread** is for **copying and expanding** values (great for cloning state).  
- **Rest** is for **collecting arguments** into one place (useful in functions).
