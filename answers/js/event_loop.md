### **JavaScript Event Loop Overview:**

JavaScript is a **single-threaded** language, meaning it can only execute one piece of code at a time. However, JavaScript can perform asynchronous operations (like network requests or timers) and still handle multiple operations concurrently without blocking the main thread. This is achieved using the **event loop**.

The **event loop** is responsible for executing code, handling events, and executing asynchronous callbacks. The event loop continuously checks the **call stack**, which contains all the currently executing code, and the **message queue** (also called the **task queue**) for any new tasks to execute.

### **How the Event Loop Works:**

1. **Call Stack:**
   - The call stack contains all the functions that are currently executing. When a function is called, it is added to the stack, and when it finishes, it is removed from the stack.
   - The event loop checks the call stack to see if it’s empty, allowing it to execute new tasks.

2. **Message Queue (Task Queue):**
   - Asynchronous tasks are pushed into the message queue when they are ready to be executed.
   - The event loop checks the message queue to see if any task is ready to be executed, and if the call stack is empty, it picks the first task from the queue to execute.

3. **Event Loop Process:**
   - The event loop continually runs in cycles, checking the call stack, and when the stack is empty, it dequeues tasks from the message queue and executes them.
   - It prioritizes tasks from the message queue but must check and execute them only when the call stack is empty.

### **Macrotasks vs. Microtasks:**

Both macrotasks and microtasks are types of tasks that can be added to the message queue, but they have different priorities when it comes to execution.

---

### **Macrotasks:**

- **Definition:** Macrotasks represent "larger" tasks that the event loop processes after the current executing script completes. These tasks are generally tied to user events or set intervals.
- **Examples:**
  - `setTimeout()`
  - `setInterval()`
  - `I/O events`
  - DOM events (click, input, etc.)
- **Execution Order:** Macrotasks are executed in the **order they appear** in the message queue, but only after the call stack is empty.

#### **Macrotask Example:**
```js
console.log('Start');

setTimeout(() => {
  console.log('Macrotask: setTimeout');
}, 0);

console.log('End');
```
**Output:**
```
Start
End
Macrotask: setTimeout
```
- The `setTimeout` callback is added as a **macrotask** and will only be executed after the synchronous code (`console.log('Start')` and `console.log('End')`) completes.

---

### **Microtasks (Promises):**

- **Definition:** Microtasks represent "smaller" tasks that should be executed **immediately** after the currently executing script and before any macrotasks.
- **Examples:**
  - Promises (`then()`, `catch()`, `finally()`)
  - `MutationObserver`
- **Execution Order:** Microtasks are executed after the current script completes, but **before** the event loop processes any macrotasks.

#### **Microtask Example:**
```js
console.log('Start');

Promise.resolve().then(() => {
  console.log('Microtask: Promise');
});

console.log('End');
```
**Output:**
```
Start
End
Microtask: Promise
```
- The `Promise` callback is added to the **microtask queue** and will execute **after** the synchronous code (`console.log('Start')` and `console.log('End')`) but **before** any macrotasks like `setTimeout`.

---

### **Event Loop and Task Queue Priorities:**

1. **Synchronous code** (like regular function calls) is executed first, placing items on the call stack.
2. When the stack is empty, the event loop looks at the **microtask queue** first and executes all microtasks before moving on to any macrotasks.
3. Once the microtask queue is empty, the event loop processes the **macrotasks** one at a time.

---

### **Execution Order Example (Macrotask + Microtask):**
```js
console.log('Start');

setTimeout(() => {
  console.log('Macrotask: setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Microtask: Promise 1');
}).then(() => {
  console.log('Microtask: Promise 2');
});

console.log('End');
```
**Output:**
```
Start
End
Microtask: Promise 1
Microtask: Promise 2
Macrotask: setTimeout
```
- **Explanation:**
  1. The synchronous code (`'Start'` and `'End'`) is executed first.
  2. The microtasks (Promises) are executed immediately after the synchronous code but **before** the macrotasks (`setTimeout`).
  3. The `setTimeout` callback is processed after all microtasks are done.

---

### **Why the Difference Matters:**
- **Microtasks are given higher priority** over macrotasks, which ensures that microtasks are processed as soon as possible after the current script execution.
- Understanding the event loop's behavior helps avoid issues like **race conditions** or unnecessary delays, particularly when dealing with `setTimeout` and `Promises`.
  
In React, for example, if you're dealing with state updates or event handling, you should be aware that state changes can be batched and asynchronous, which may interact with microtask or macrotask behavior, especially if you're using promises or timers.

[learn more by reading a blog on medium](https://medium.com/gradeup/asynchronous-javascript-event-loop-1c8de41298dd)
