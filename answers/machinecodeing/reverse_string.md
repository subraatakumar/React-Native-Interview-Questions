### **Question:**
Write a JavaScript program to reverse a string. Provide both a **brute-force** and an **optimal** approach.

### **Examples:**
1. Input: `"hello"`  
   Output: `"olleh"`  

2. Input: `"world"`  
   Output: `"dlrow"`  

---

## **Solution in JavaScript**

### **1. Brute-Force Approach (Using a Loop)**
**Idea:**  
- Initialize an empty string (`reversed`).  
- Loop through the original string from the **end** to the **start** and append each character to `reversed`.  

**Time Complexity:** `O(n)` (where `n` is the string length)  
**Space Complexity:** `O(n)` (since we create a new string)  

```javascript
function reverseStringBruteForce(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

console.log(reverseStringBruteForce("hello")); // "olleh"
console.log(reverseStringBruteForce("world")); // "dlrow"
```

---

### **2. Optimal Approach (Using `split()`, `reverse()`, and `join()`)**
**Idea:**  
- Convert the string into an array of characters.  
- Reverse the array.  
- Join the array back into a string.  

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)` (due to array operations)  

```javascript
function reverseStringOptimal(str) {
    return str.split("").reverse().join("");
}

console.log(reverseStringOptimal("hello")); // "olleh"
console.log(reverseStringOptimal("world")); // "dlrow"
```

---

### **3. Most Optimal Approach (Using Two Pointers - In-Place Reversal)**
**Idea:**  
- Convert the string into an array (since strings are immutable in JavaScript).  
- Use **two pointers** (`left` and `right`) to swap characters until they meet in the middle.  
- Convert the array back to a string.  

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)` (if we consider the input as a mutable array, but in JS, we need `O(n)` due to string immutability)  

```javascript
function reverseStringTwoPointers(str) {
    const arr = str.split("");
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap
        left++;
        right--;
    }
    
    return arr.join("");
}

console.log(reverseStringTwoPointers("hello")); // "olleh"
console.log(reverseStringTwoPointers("world")); // "dlrow"
```

---

### **Key Takeaways:**
| Approach | Time Complexity | Space Complexity | Method Used |
|----------|----------------|----------------|-------------|
| Brute-Force (Loop) | `O(n)` | `O(n)` | Manual character appending |
| Optimal (`split-reverse-join`) | `O(n)` | `O(n)` | Built-in array methods |
| Two Pointers (In-Place) | `O(n)` | `O(n)` (due to JS strings) | Pointer swapping |

**Best for Interviews:** The **two-pointer approach** is often preferred in coding interviews because it demonstrates an understanding of in-place operations. However, the `split-reverse-join` method is the **shortest and cleanest** for practical use.  

Would you like any modifications or additional explanations? 😊
