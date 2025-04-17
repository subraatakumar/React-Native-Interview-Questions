### **What is the difference between default export and named export?**

---

### ✅ **Definition:**

- **Default Export:**  
  Allows a module to export **one value** as the *main thing* from the file.  
  You can name it anything when you import it.

- **Named Export:**  
  Allows a module to export **multiple values** by name.  
  You must use the **exact same name** when importing.

---

### ✅ **Syntax:**

#### **Default Export:**
```js
// product.js
const Product = () => { /* component */ };
export default Product;

// App.js
import MyProduct from './product';  // name can be anything
```

#### **Named Export:**
```js
// product.js
export const ProductCard = () => { /* ... */ };
export const ProductList = () => { /* ... */ };

// App.js
import { ProductCard, ProductList } from './product';  // names must match
```

---

### ✅ **Key Differences:**

| Feature                  | Default Export                     | Named Export                       |
|--------------------------|------------------------------------|------------------------------------|
| Number of exports        | Only one per file                  | Can export multiple values         |
| Import name flexibility  | Can rename freely                  | Must match exported names          |
| Tree-shaking friendly    | ❌ (less optimized sometimes)       | ✅ (better for bundlers)            |

---

### ✅ **When to Use Which?**

- Use **default export** when your file exports a **single main value**, like a single component or class.
- Use **named export** when your file exports **multiple utilities, constants, or components**.

---

### ✅ **React Example:**

```js
// Button.js
export default function Button() { return <></>; }
export const IconButton = () => <></>;

// Usage:
import Button, { IconButton } from './Button';
```

This way, you get the best of both!
