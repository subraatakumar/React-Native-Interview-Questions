**Definition:**  
An **Immediately Invoked Function Expression (IIFE)** is a function that runs **as soon as it is defined**.

---

**Syntax Example:**
```js
(function () {
  console.log("I run immediately!");
})();
```

It’s wrapped in parentheses to make it an expression, then followed by `()` to call it right away.

---

**Why it was used:**  
Before ES6, JavaScript didn’t have block scope (`let`, `const`) or modules. IIFEs were a popular way to:
- Create private scopes
- Avoid polluting the global namespace
- Wrap code safely

---

**Are they still relevant in ES modules?**  
Not really. ES modules already have **their own scope**, so there’s **no need** for IIFEs to protect variables from leaking globally.

However, IIFEs can still be useful when:
- You want to isolate logic within a function block
- You need to execute setup code immediately
- You’re in an older environment without module support

---

**Conclusion:**  
IIFEs were essential before ES6 for scope isolation. In modern ES modules, they're **less necessary**, but still handy for quick, isolated executions.

**Interviewer:** is IIFE still stores in memory ? 

**Short Answer:**  
Yes, an **IIFE (Immediately Invoked Function Expression)** is stored in memory **only while it runs**. After execution, unless it **returns a value or creates closures**, it is usually **garbage collected**.

---

**Explanation:**  
- When an IIFE runs, its code executes immediately.
- If it defines variables or logic inside, those are scoped locally and discarded afterward—**unless**:
  - It returns a value and you store it somewhere.
  - It captures variables (closures) that are still being used later.

---

**Example 1 – No memory held:**
```js
(function () {
  const temp = 123;
  console.log('Running IIFE');
})(); 
```
> `temp` is gone after the IIFE runs—nothing stays in memory.

---

**Example 2 – Keeps memory:**
```js
const counter = (function () {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count
  };
})();

counter.increment(); // count = 1
```
> Here, `count` stays in memory because the returned object uses it (closure).

---

**Conclusion:**  
IIFEs **can** use memory **only if** they return something that holds references. Otherwise, they’re cleaned up like any normal function after execution.
