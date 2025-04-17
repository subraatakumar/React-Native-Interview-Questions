**Simple Question:**  
What’s the difference between `==` and `===` in JavaScript, and how can automatic type conversion cause issues in React Native?

---

**Answer in Simple English:**  

**Definition:**  
`==` checks if two values are equal, but it **allows type conversion** (it tries to make the values the same type before comparing).  
`===` checks if two values are equal **and** of the same type (no conversion).

**Example:**
```js
'5' == 5    // true (because '5' becomes number 5)
'5' === 5   // false (string is not the same type as number)
```

**Why it matters in React Native:**  
React Native often deals with data from APIs, user input, or async storage—all of which might return strings even when you expect numbers or booleans.  
If you use `==`, it might give unexpected results due to automatic conversion.

**Example:**
```js
const age = '18';

if (age == 18) {
  // This runs, even though age is a string
}

if (age === 18) {
  // This doesn't run, because types are different
}
```

**Conclusion:**  
Always use `===` in React Native to avoid bugs caused by automatic type changes. It makes your code more predictable and safe.
