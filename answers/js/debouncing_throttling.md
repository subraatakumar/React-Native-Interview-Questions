### **Debouncing vs. Throttling in JavaScript (React Native eCommerce context)**

---

### ✅ **Definition:**

| Concept      | Description |
|--------------|-------------|
| **Debouncing** | Ensures a function is **only called once after a delay**, when rapid actions **stop**. It resets the timer every time the event is fired. |
| **Throttling** | Ensures a function is **called at regular intervals**, no matter how many times the event is triggered. It ignores extra calls within the interval. |

---

### ✅ **Use Cases in a React Native eCommerce App:**

#### 🔹 **Debouncing Use Cases:**
1. **Search Input (Product Search):**  
   - Wait for the user to stop typing before sending the API call to avoid spamming the server.
2. **Form Validation (Email/Phone):**  
   - Validate input only after the user pauses typing.

#### 🔹 **Throttling Use Cases:**
1. **Scroll-based Events (Lazy Loading / Infinite Scroll):**  
   - Load more products as the user scrolls down, but not too frequently.
2. **Button Clicks (Add to Cart):**  
   - Prevent users from spamming “Add to Cart” by limiting the action once every few seconds.

---

### ✅ **Example:**

#### 🔹 **Debounce (Search Input)**
```js
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedVal(value), delay);
    return () => clearTimeout(handler); // clear timer if value changes
  }, [value, delay]);

  return debouncedVal;
}

// Usage in search bar
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      // API call here
    }
  }, [debouncedQuery]);

  return <TextInput onChangeText={setQuery} value={query} />;
};
```

#### 🔹 **Throttle (Scroll Listener)**
```js
let allow = true;

const throttledLoadMore = () => {
  if (!allow) return;
  allow = false;

  // Load more items here...

  setTimeout(() => {
    allow = true;
  }, 1000); // throttle every 1 second
};
```

---

### ✅ **Summary:**

| Feature     | Debounce                         | Throttle                           |
|-------------|----------------------------------|------------------------------------|
| Trigger     | After delay ends (quiet time)    | Every interval (time gap)          |
| Best For    | Typing, search, input validation | Scrolling, drag, resize, button taps |
| React Native Use | Search bar, input fields         | Scroll-based loading, add-to-cart |

Use **debounce** when you care about the **final action** (e.g., after typing), and **throttle** when you care about **spacing out frequent actions** (e.g., scroll or taps).
