**Definition**  
Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their containing scope before execution.  

---

**Explanation**  
- **Function declarations** are fully hoisted: you can call them anywhere in their enclosing scope, even before their definition text appears.  
- **`var` variables** are hoisted too, but only their declaration—not their initial value—so they start life as `undefined` until the assignment line runs.  
- **`let` and `const`** are also hoisted but live in the “Temporal Dead Zone” until initialized, causing a runtime error if accessed too early.  

---

**Example**  
```js
console.log(foo);    // undefined  
var foo = 5;

console.log(bar());  // 'hello'  
function bar() {
  return 'hello';
}

console.log(baz);    // ReferenceError  
let baz = 10;
```  
- The first `console.log` prints `undefined` because `var foo` was hoisted without its `= 5`.  
- The call to `bar()` works because the entire function is hoisted.  
- Accessing `baz` before its `let` initialization throws a ReferenceError due to the Temporal Dead Zone.  

---

**Pitfalls**  
Relying on hoisting can introduce subtle bugs:  
1. **Unexpected `undefined` values** when you access a `var` before assignment.  
2. **Temporal Dead Zone errors** with `let`/`const`.  
3. **Readability issues**—code may be harder to follow when declarations appear far from their use.  

---

**Synthesis**  
Always declare variables at the top of their scope and prefer `let`/`const` to avoid most hoisting pitfalls.
