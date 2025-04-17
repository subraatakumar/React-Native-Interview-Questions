### ✅ What Defines a “Pure Function”?

---

### 🔹 **Definition:**

A **pure function** is a function that:
1. **Always returns the same output** for the same input.
2. **Has no side effects** (doesn’t modify external variables, state, UI, or make API calls).

---

### 🔹 **Rules of a Pure Function:**
- No API calls
- No mutations to outside variables
- No `setState`, `console.log`, `Date.now()`, `Math.random()`, etc.
- Only relies on its arguments and returns a new value

---

### ✅ **Example of Pure Function:**
```js
function calculateTotalPrice(price, quantity) {
  return price * quantity;
}

calculateTotalPrice(100, 2); // Always returns 200
```

---

### ✅ **Example of Impure Function:**
```js
let tax = 10;
function getPriceWithTax(price) {
  return price + tax; // uses external variable
}
```

---

### 🔹 **Use Cases in a React Native E-Commerce App:**

1. **🛒 Cart Calculations (Pure)**
```js
const getCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
};
```

2. **📦 Shipping Fee Calculation (Pure)**
```js
const getShippingFee = (totalAmount) => {
  return totalAmount > 1000 ? 0 : 50;
};
```

3. **🎯 Product Filters (Pure)**
```js
const filterByCategory = (products, category) => {
  return products.filter(product => product.category === category);
};
```

---

### 🔸 **Why Pure Functions Matter:**
- ✅ Easier to test
- ✅ Reusable in different components
- ✅ More predictable behavior
- ✅ Useful in reducers (like Redux)

---

### ✅ Summary:

| Feature            | Pure Function                          | Impure Function                      |
|--------------------|----------------------------------------|--------------------------------------|
| Returns same output| ✅ Yes                                 | ❌ Not always                        |
| Side effects       | ❌ None                                | ✅ May have (state, API, logs)       |
| Testing            | ✅ Easy                                | ❌ Harder                            |
| Use in E-Commerce  | Cart totals, filters, fee calculators | API calls, logging, updating state   |

In short: **Pure functions are the backbone of clean business logic in any e-commerce app.**
