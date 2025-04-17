**Definition:**  
To update deeply nested state without mutating the original object, you need to **create a new copy** of each level of the object you're updating, preserving immutability. This is essential in React to trigger re-renders and ensure state updates are correctly detected.

---

**How to update deeply nested state:**
- **Use spread syntax (`...`)** to clone the object and nested objects.
- For arrays, use methods like `map()`, `filter()`, or `concat()` to create a new array.
- **Avoid directly modifying nested objects or arrays** since it can mutate the original state.

---

### Example 1: Updating a Nested Object
Let’s say you have a state like this:
```js
const state = {
  user: {
    profile: {
      name: 'John',
      age: 25,
    },
    settings: {
      theme: 'light',
    },
  },
};
```

To update the `name` inside `user.profile`, you can use nested spread operators:
```js
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: 'Jane',
    },
  },
};
```

**Explanation:**
- We spread the `state` to create a shallow copy of the top-level object.
- Then, we do the same for `user`, and further for `profile`.
- Finally, we update `name` without mutating the original `state`.

---

### Example 2: Updating a Nested Array
If you have a state with a nested array:
```js
const state = {
  users: [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ],
};
```

To update the `name` of the user with `id: 2`:
```js
const newState = {
  ...state,
  users: state.users.map(user =>
    user.id === 2 ? { ...user, name: 'Janet' } : user
  ),
};
```

**Explanation:**
- We use `map()` to create a new array, and for the user with `id: 2`, we create a new object using the spread operator and update the `name`.

---

### Conclusion:
To **update deeply nested state** in an immutable way:
- Use **spread syntax** to copy objects and arrays at each level.
- Avoid mutating the original state, as React relies on detecting changes for re-renders.
