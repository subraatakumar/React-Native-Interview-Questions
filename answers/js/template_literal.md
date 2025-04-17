**Definition:**  
**Template literals** (using backticks `` ` ``) in JavaScript allow for **easy string interpolation** with `${}` to insert variables or expressions directly inside strings.

---

**How they help in JSX:**  
In JSX, we often need to combine variables with text for rendering. Template literals make this cleaner and more readable than traditional string concatenation (`+`).

---

**Example:**
```jsx
const user = 'Alex';
const age = 25;

return (
  <Text>{`Hello, ${user}. You are ${age} years old.`}</Text>
);
```

**Without template literals (harder to read):**
```jsx
<Text>{'Hello, ' + user + '. You are ' + age + ' years old.'}</Text>
```

---

**Why it's better:**
- **Cleaner syntax**
- Easier to write and maintain
- Supports multi-line strings directly
- Avoids confusing + signs and extra quotes

---

**Conclusion:**  
Template literals make string interpolation in JSX **simpler, cleaner, and more readable**, especially when combining multiple variables or expressions inside text.
