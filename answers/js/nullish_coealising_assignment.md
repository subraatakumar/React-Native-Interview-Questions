**Definition:**  
The **nullish coalescing assignment (`??=`)** operator sets a variable **only if** its current value is `null` or `undefined`.

---

**Explanation:**  
It’s like a shortcut for:
```js
if (x === null || x === undefined) {
  x = defaultValue;
}
```

But instead, you can write:
```js
x ??= defaultValue;
```

---

**How it helps with default state:**  
When managing state or configuration, `??=` lets you **safely assign default values** without overwriting meaningful ones like `0`, `''`, or `false`.

---

**Example in React (non-state variable):**
```js
let settings = {
  theme: null,
  fontSize: 0,
};

settings.theme ??= 'light';     // sets to 'light'
settings.fontSize ??= 14;       // keeps 0, does not override

console.log(settings); 
// { theme: 'light', fontSize: 0 }
```

---

**Conclusion:**  
`??=` simplifies code by safely setting defaults only when needed—**without messing up valid values like 0 or empty strings**. It's clean and avoids long `if` checks.
