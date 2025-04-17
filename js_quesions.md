List of 50 vanilla‑JavaScript questions, refocused for a React Native SDE1 interview. We’ve pruned Node‑ and browser‑only topics, inserted modern ESNext features, and emphasized patterns critical to efficient React Native apps.  

## Core React Native JS Concepts (1–15)  
Fundamental language mechanics and modern syntax you’ll use every day in functional components and hooks.  

1. What are the differences between `var`, `let`, and `const`, and why prefer `const` in React Native code?  
2. How do JavaScript’s primitive types differ from reference types, and why does this matter when managing state?  
3. What is the difference between `==` and `===`, and when could implicit coercion bite you in RN?  
4. Explain `null` vs. `undefined`, and how optional chaining (`?.`) helps avoid accessing `null` or `undefined` properties .  
5. How does hoisting work for functions and variables, and what pitfalls can it introduce?  
6. Define scope in JavaScript: global, function, and block scope—how do they impact closures in hooks?  
7. What is a closure, and how does it enable `useState` and `useEffect` callbacks to “remember” previous values?  
8. How does `this` get bound in arrow functions vs. regular functions, and why do arrow functions simplify React callbacks?  
9. How do template literals improve string interpolation in JSX?  
10. Demonstrate array and object destructuring for extracting `props` in functional components .  
11. Explain the spread (`...`) and rest (`...`) operators for cloning state and gathering function arguments.  
12. How does the nullish coalescing operator (`??`) differ from `||` for default prop values ?  
13. What does the nullish coalescing assignment (`??=`) operator do, and how might it simplify setting default state ?  
14. How do default parameters work in functions, and why are they useful for fallback values in utility helpers?  
15. What are Immediately Invoked Function Expressions (IIFEs), and are they still relevant in ES modules?  

## Intermediate Patterns & APIs (16–35)  
ES6+ features, asynchronous patterns, and performance techniques that differentiate an effective React Native developer.  

16. What are arrow functions, and how does their lexical `this` make event handlers cleaner?  
17. Define higher‑order functions and give examples using `map`, `filter`, and `reduce`.  
18. Explain dynamic `import()` and how code splitting can improve bundle size in RN .  
19. Contrast ES Modules (`import`/`export`) with CommonJS (`require`/`module.exports`) and why Metro prefers ES Modules .  
20. What are Promises, and what are their three states?  
21. How does `async`/`await` simplify Promise code, and how do you catch and surface errors in React Native components ?  
22. What is the difference between `Promise.all` and `Promise.race`, and when would you use each?  
23. Explain debouncing vs. throttling, and how you’d debounce a scroll or text‑input event in RN .  
24. What defines a “pure function,” and why are pure functions critical for hooks and Redux reducers ?  
25. How can you update deeply nested state without mutating the original object?  
26. What is prototypal inheritance, and how do ES6 `class` declarations relate to prototypes?  
27. How do getters and setters work in ES6 classes?  
28. What are generator functions (`function*`), and how does `yield` work citeturn1search4?  
29. What are Symbols, and how can you use them to create unique object keys?  
30. When would you choose a `Map` vs. a `WeakMap` for storing component‑scoped caches?  
31. How do `JSON.stringify` and `JSON.parse` work under the hood?  
32. Describe the difference between deep and shallow copying of objects.  
33. What are Typed Arrays (`ArrayBuffer`, `Uint8Array`, etc.), and when would you use them?  
34. How do tagged template literals work, and give an example use in styling or localization.  
35. How do you implement memoization in JavaScript to cache expensive calculations?  

## Advanced Engine Internals (36–50)  
Deep dives into event‑loop behavior, memory management, strict mode, and runtime optimizations that show true mastery.  

36. Describe the JavaScript event loop in detail, distinguishing microtasks (Promises) from macrotasks (`setTimeout`) .  
37. How does garbage collection work in V8 (mark‑and‑sweep, generational GC)? 
38. Explain the Temporal Dead Zone (TDZ) in ES6 and give an example of accessing a `let` before initialization.  
39. What is tail‑call optimization, and does JavaScript implement it?  
40. How do modules get loaded and executed differently in Metro bundler versus a browser?  
41. What is strict mode, and how does it change JavaScript semantics in ES modules ?  
42. How do `Proxy` objects and the `Reflect` API enable meta‑programming?  
43. How do you detect and prevent memory leaks in a long‑running React Native app?  
44. What are service workers? *(Not in RN—name this to show you know the RN environment doesn’t support them.)*  
45. How does the Metro bundler’s tree‑shaking work with ES Modules?  
46. What role do micro‑optimizations (e.g., caching array length, avoiding repeated property lookups) play on the single‑threaded JS bridge in RN?  
47. How can you offload heavy work off the JS thread to keep animations smooth?  
48. Explain the differences between strict equality checks for objects and primitive values.  
49. How does the `arguments` object differ from rest parameters?  
50. What are WebAssembly bindings in React Native, and how would you call a WASM function from JS?  

