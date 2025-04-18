### **Problem Statement**
Given a number, repeatedly sum its digits until the result is a single-digit number.

**Example:**  
- Input: `5431`  
  - Step 1: `5 + 4 + 3 + 1 = 13`  
  - Step 2: `1 + 3 = 4`  
- Output: `4`

---

### **Approach**
1. **Loop until the number is a single digit:**
   - Convert the number to a string, split into digits, then sum them.
   - Repeat until the sum is `<= 9`.

2. **Mathematical Optimization (O(1) Time):**
   - If the number is `0`, return `0`.
   - Otherwise, compute `num % 9`. If the result is `0`, return `9` (since numbers like `9, 18, 27...` sum to `9`).

---

### **Solution Code**

#### **Method 1: Iterative Approach (Brute Force)**
```javascript
function sumDigitsUntilSingle(num) {
    while (num > 9) {
        num = String(num).split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return num;
}

console.log(sumDigitsUntilSingle(5431)); // Output: 4
console.log(sumDigitsUntilSingle(9999)); // Output: 9
```

**Time Complexity:** `O(log n)` per step (since digits reduce exponentially).  
**Space Complexity:** `O(1)` (no extra space used).

---

#### **Method 2: Mathematical Optimization (O(1) Time)**
```javascript
function sumDigitsUntilSingle(num) {
    if (num === 0) return 0;
    return num % 9 === 0 ? 9 : num % 9;
}

console.log(sumDigitsUntilSingle(5431)); // Output: 4 (since 5431 % 9 = 4)
console.log(sumDigitsUntilSingle(9999)); // Output: 9 (since 9999 % 9 = 0)
```

**Time Complexity:** `O(1)` (constant time).  
**Space Complexity:** `O(1)`.

---

### **Key Takeaways**
| Method | Time Complexity | Space Complexity | Best For |
|--------|-----------------|------------------|----------|
| **Iterative** | `O(log n)` | `O(1)` | General understanding |
| **Mathematical** | `O(1)` | `O(1)` | Optimal for large numbers |

**Best for Interviews:** The **mathematical approach** is preferred due to its efficiency.  

Would you like further explanation? 😊
