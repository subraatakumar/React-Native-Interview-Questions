# 1

**Interviewer**  How does hoisting work for functions and variables, and what pitfalls can it introduce?

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

```bash
You missed to explain function expressions. So interviewer may ask about that next
```

# 2

**Interviewer** What about arrow functions ? Do they hoisted ?

**Candidate**

**arrow functions** are not function declarations—they are a form of **function expression**.

When you write:
```js
console.log(foo);      // undefined
var foo = () => { … };
```
the `var foo` declaration is hoisted (initialized to `undefined`), but the assignment of the arrow function happens only at runtime. By contrast, a traditional function declaration like:
```js
console.log(bar());    // works
function bar() { … }
```
is fully hoisted, making the function available before its textual definition.

If you use `let` or `const` with an arrow:
```js
console.log(baz);      // ReferenceError
const baz = () => { … };
```
then the variable binding is hoisted into a **Temporal Dead Zone**—access is forbidden until the `const` initializer runs.

**Example Pitfall**  
```js
// ❌ Bad: foo is undefined, not a function
foo();                  
var foo = () => console.log('hi');

// ✅ Good: function is hoisted
baz();
function baz() { console.log('hey'); }
```

**Key Takeaway**  
– Treat arrow functions like any function expression: declare them before use.  
– Prefer `const` for arrow bindings to eliminate unintended reassignment and avoid TDZ surprises.

# 3

**Interviewer**

Do you know how components created by arrow function expressions works fine, when the called before declaration?

```js
import {Text} from "react-native"

const App = () => {
  return (
    <>
      <MyComponent /> 
    </>
  );
};

export default App

const MyComponent = () => {
  return <Text>Hello</Text>;
};
```

**Candidate** 


✅ This code works **because of how JavaScript modules are parsed and executed**.

---

### ⚙️ Behind the Scenes: Module Parsing & Execution

When JavaScript (including React Native code) is bundled:
1. The **entire module (file)** is parsed before anything runs.
2. All **`const`, `let`, `var`, and function declarations** are registered.
3. The **code is then executed top to bottom**, respecting hoisting rules.

But here’s the trick:
- `App` is defined and **contains a reference to** `MyComponent`.
- However, `MyComponent` is **not invoked immediately**—it’s only used later *when React renders it*.
- By the time the app runs and tries to render `App`, the file has **already executed**, so `MyComponent` is fully defined.

---

### ✅ TL;DR

- Arrow functions **are not hoisted**.
- But when you use them as JSX inside a component, they **can appear after the component definition**, because:
  - The file is parsed top-to-bottom before React calls anything.
  - React calls the component **later**, when rendering, by which time everything is defined.
- That’s why our example works—even though the arrow function is technically declared after it's referenced.


