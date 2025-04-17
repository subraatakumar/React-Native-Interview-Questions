**Definition:**  
**Default parameters** in JavaScript allow you to set a **fallback value** for a function argument if no value (or `undefined`) is passed.

---

**How it works:**
```js
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}

greet();        // "Hello, Guest"
greet('Alice'); // "Hello, Alice"
```

If `name` is not passed or is `undefined`, it defaults to `'Guest'`.

---

**Why it's useful in utility helpers:**  
Utility functions often expect certain values. With default parameters:
- You avoid extra `if` checks.
- Your functions become cleaner and more predictable.
- You ensure fallback behavior automatically.

---

**Example:**
```js
function calculateTotal(price, quantity = 1, taxRate = 0.1) {
  return price * quantity * (1 + taxRate);
}

calculateTotal(100); // uses quantity = 1 and taxRate = 0.1
```

---

**Conclusion:**  
Default parameters simplify your code by handling missing arguments gracefully, especially in **helper functions** where fallback logic is common.
