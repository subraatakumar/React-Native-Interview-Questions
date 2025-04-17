## What Is a Higher‑Order Function? 

A **higher‑order function (HOF)** is a function that either takes one or more functions as arguments or returns a function as its result . Common built‑in HOFs on arrays—`map`, `filter`, and `reduce`.

---

## Why a Higher‑Order Function?  

HOFs allow you to **abstract** common patterns. For example, instead of writing separate loops for transforming elements or filtering items, you can pass a custom function to a general-purpose iterator method. This leads to code that is easier to test, compose, and reason about, since each function focuses on a single concern: the HOF handles iteration and orchestration, while your callback handles the specific logic.

---

## Key Examples: `map`, `filter`, `reduce`  

### `map`  
The `map` method is a HOF that **transforms** each element of an array by applying a provided function, returning a new array of the same length.  

```js
const nums = [1, 2, 3, 4];
const squares = nums.map(x => x * x);
console.log(squares); // [1, 4, 9, 16]
```  
Here, `map` takes the arrow function `x => x * x` as an argument and applies it to each item; the original `nums` remains unchanged, illustrating immutability.

### `filter`  
The `filter` method is a HOF that **selects** elements based on a truth‑yielding predicate, returning a new array of only those elements for which the predicate returned `true`.  

```js
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob',   active: false },
  { name: 'Carol', active: true }
];
const activeUsers = users.filter(u => u.active);
console.log(activeUsers);
// [ { name: 'Alice', active: true }, { name: 'Carol', active: true } ]
```  
In this example, `filter` takes `u => u.active` and returns only those objects where `active` is truthy.

### `reduce`  
The `reduce` method is a HOF that **aggregates** an array’s elements into a single value by repeatedly applying a reducer function that you supply.  

```js
const prices = [5, 10, 15];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 30
```  
Here, the reducer `(sum, price) => sum + price` is invoked for each element, carrying forward the accumulated `sum`; the `0` is the initial accumulator value.
