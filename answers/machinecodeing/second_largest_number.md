### **Question:**  
Given an array of integers (which may contain duplicates), find the **second largest number** and its **index** (or indices if duplicates exist).  

### **Examples:**  
1. Input: `[12, 35, 1, 10, 34, 1]`  
   Output: `{ secondLargest: 34, index: 4 }`  

2. Input: `[10, 5, 10, 5, 10]`  
   Output: `{ secondLargest: 5, indices: [1, 3] }`  

---

## **Solution in JavaScript**  

### **Approach:**
1. **Find the largest number** in the array.  
2. **Filter out all occurrences of the largest number**, leaving only smaller numbers.  
3. **Find the new largest number** in the filtered array (which is the second largest in the original array).  
4. **Find all indices** where this second largest number appears in the original array.  

### **Time Complexity:** `O(n)` (Two passes over the array)  
### **Space Complexity:** `O(n)` (Due to filtering)  

```javascript
function findSecondLargest(arr) {
    if (arr.length < 2) {
        return { error: "Array must have at least 2 elements" };
    }

    // Find the largest number
    const largest = Math.max(...arr);

    // Filter out all largest numbers to find the second largest
    const filteredArr = arr.filter(num => num !== largest);

    if (filteredArr.length === 0) {
        return { error: "All elements are the same" };
    }

    const secondLargest = Math.max(...filteredArr);

    // Find all indices of the second largest number
    const indices = [];
    arr.forEach((num, index) => {
        if (num === secondLargest) {
            indices.push(index);
        }
    });

    return {
        secondLargest: secondLargest,
        indices: indices.length === 1 ? indices[0] : indices
    };
}

// Test Cases
console.log(findSecondLargest([12, 35, 1, 10, 34, 1])); 
// Output: { secondLargest: 34, indices: 4 }

console.log(findSecondLargest([10, 5, 10, 5, 10])); 
// Output: { secondLargest: 5, indices: [1, 3] }

console.log(findSecondLargest([5, 5, 5, 5])); 
// Output: { error: "All elements are the same" }

console.log(findSecondLargest([7])); 
// Output: { error: "Array must have at least 2 elements" }
```

---

### **Alternative Approach (Single Pass with Tracking)**
**Idea:**  
- Traverse the array once while keeping track of the two largest numbers and their indices.  
- More efficient if the array is very large (avoids filtering).  

```javascript
function findSecondLargestOptimized(arr) {
    if (arr.length < 2) {
        return { error: "Array must have at least 2 elements" };
    }

    let largest = -Infinity;
    let secondLargest = -Infinity;
    let largestIndices = [];
    let secondLargestIndices = [];

    arr.forEach((num, index) => {
        if (num > largest) {
            secondLargest = largest;
            secondLargestIndices = largestIndices;
            largest = num;
            largestIndices = [index];
        } else if (num === largest) {
            largestIndices.push(index);
        } else if (num > secondLargest) {
            secondLargest = num;
            secondLargestIndices = [index];
        } else if (num === secondLargest) {
            secondLargestIndices.push(index);
        }
    });

    if (secondLargest === -Infinity) {
        return { error: "All elements are the same" };
    }

    return {
        secondLargest: secondLargest,
        indices: secondLargestIndices.length === 1 ? secondLargestIndices[0] : secondLargestIndices
    };
}

console.log(findSecondLargestOptimized([12, 35, 1, 10, 34, 1]));
// Output: { secondLargest: 34, indices: 4 }
```

---

### **Key Takeaways:**
| Approach | Time Complexity | Space Complexity | When to Use |
|----------|----------------|----------------|-------------|
| **Filtering Method** | `O(n)` | `O(n)` | Simple, easy to understand |
| **Single-Pass Tracking** | `O(n)` | `O(1)` | More efficient for large arrays |

**Best for Interviews:** The **single-pass tracking method** is preferred in coding interviews because it demonstrates optimization skills.  
