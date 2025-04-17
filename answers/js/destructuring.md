**Definition:**  
**Destructuring** is a way to **unpack values** from arrays or objects into separate variables. In React functional components, destructuring props makes code cleaner and easier to read.

---

### 🔹 **1. Object Destructuring (Common in Props):**

When props are passed as an object, you can pull out specific values directly.

**Example:**
```jsx
function UserCard({ name, age }) {
  return (
    <Text>{`${name} is ${age} years old.`}</Text>
  );
}

// Usage
<UserCard name="Sam" age={30} />
```

This is the same as:
```jsx
function UserCard(props) {
  const { name, age } = props;
}
```

---

### 🔹 **2. Array Destructuring (e.g., from Hooks):**

Often used with hooks like `useState` or when props contain arrays.

**Example with Hooks:**
```jsx
const [count, setCount] = useState(0);
```

**Example with Props:**
```jsx
function ScoreBoard({ scores }) {
  const [first, second] = scores;

  return (
    <Text>{`Top scores: ${first}, ${second}`}</Text>
  );
}

// Usage
<ScoreBoard scores={[95, 88]} />
```

---

**Conclusion:**  
Destructuring makes your components **cleaner and more focused**, allowing you to access only the data you need directly and clearly.
