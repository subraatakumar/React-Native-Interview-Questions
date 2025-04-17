**Definition:**  
The **nullish coalescing operator (`??`)** returns the right-hand value **only if** the left-hand value is `null` or `undefined`.  
The **OR operator (`||`)** returns the right-hand value if the left-hand is **falsy** (like `false`, `0`, `''`, `null`, or `undefined`).

---

**Why it matters for default prop values:**  
Using `||` can accidentally override valid values like `0` or `''` (empty string), which are falsy.  
`??` is safer when you only want to replace `null` or `undefined`.

---

**Example in React:**

```jsx
function PriceTag({ price }) {
  // Using ||
  const displayPrice = price || 'Free';

  // Using ??
  const safePrice = price ?? 'Free';

  return (
    <>
      <Text>Price with ||: {displayPrice}</Text>
      <Text>Price with ??: {safePrice}</Text>
    </>
  );
}

// <PriceTag price={0} />
```

With `price={0}`:
- `displayPrice` becomes `'Free'` (wrong!)
- `safePrice` stays `0` (correct!)

---

**Conclusion:**  
Use `??` for default props when you want to allow values like `0` or `''` but still catch `null` or `undefined`.
