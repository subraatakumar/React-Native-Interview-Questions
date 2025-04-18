### Question:
**Problem Statement:**  
Given an expression string `exp`, write a JavaScript program to examine whether the pairs and the orders of `{ }`, `( )`, and `[ ]` are balanced in the expression.  

**Examples:**  
1. Input: `exp = "[()]{}{[()()]()}"`  
   Output: `"Balanced"`  

2. Input: `exp = "[(])"`  
   Output: `"Not Balanced"`  

### Solution in JavaScript:
We can solve this problem using a **stack data structure** to keep track of the opening brackets. Here's the step-by-step approach:

1. Initialize an empty stack.
2. Loop through each character in the string:
   - If the character is an opening bracket (`(`, `{`, `[`), push it onto the stack.
   - If the character is a closing bracket (`)`, `}`, `]`), check if it matches the top of the stack. If it does, pop the stack; otherwise, the expression is unbalanced.
3. After processing all characters, if the stack is empty, the expression is balanced; otherwise, it is not.

### JavaScript Code:
```javascript
function isBalanced(exp) {
    let stack = [];
    let map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            let last = stack.pop();
            if (map[last] !== char) {
                return "Not Balanced";
            }
        }
    }

    return stack.length === 0 ? "Balanced" : "Not Balanced";
}

// Test Cases
console.log(isBalanced("[()]{}{[()()]()}")); // Output: "Balanced"
console.log(isBalanced("[(])"));             // Output: "Not Balanced"
```

### Explanation:
1. **Stack Initialization:** We use an array (`stack`) to keep track of opening brackets.
2. **Mapping Brackets:** The `map` object helps match each opening bracket with its corresponding closing bracket.
3. **Loop Through Expression:**  
   - If the current character is an opening bracket, push it onto the stack.  
   - If it's a closing bracket, check if it matches the most recent opening bracket (using `stack.pop()`). If not, return `"Not Balanced"`.  
4. **Final Check:** If the stack is empty after processing, all brackets were matched correctly (`"Balanced"`), otherwise, some were left unmatched (`"Not Balanced"`).

This approach efficiently checks for balanced brackets in **O(n)** time (where `n` is the length of the string) and **O(n)** space (for the stack).
