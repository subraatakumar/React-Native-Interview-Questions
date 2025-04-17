**Definition:**
A **Promise** in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to handle asynchronous operations in a more manageable way, especially when working with APIs, file systems, or timers.

---

### **The Three States of a Promise:**

1. **Pending:**
   - The promise is in its initial state.
   - The operation is still ongoing, and the promise hasn't been fulfilled or rejected yet.
   - No result is available at this point.
   
   **Example:**
   ```js
   const promise = new Promise((resolve, reject) => {
     // Some async operation here
     // The promise is still in the "pending" state
   });
   ```

2. **Fulfilled (Resolved):**
   - The asynchronous operation has completed successfully.
   - The promise is resolved, and a value is returned.
   - The `.then()` method is used to handle the result.
   
   **Example:**
   ```js
   const promise = new Promise((resolve, reject) => {
     setTimeout(() => resolve('Data loaded successfully!'), 2000);
   });

   promise.then((result) => {
     console.log(result);  // 'Data loaded successfully!'
   });
   ```

3. **Rejected:**
   - The asynchronous operation has failed.
   - The promise is rejected, and an error is thrown.
   - The `.catch()` method is used to handle the error.
   
   **Example:**
   ```js
   const promise = new Promise((resolve, reject) => {
     setTimeout(() => reject('Error loading data!'), 2000);
   });

   promise.catch((error) => {
     console.error(error);  // 'Error loading data!'
   });
   ```

---

### **Summary:**
- **Pending:** The promise is still waiting for the operation to complete.
- **Fulfilled (Resolved):** The promise has completed successfully and has a result.
- **Rejected:** The promise has failed, and an error is available.

**Promises** help manage asynchronous operations in JavaScript, allowing you to handle success and failure cases in a cleaner, more organized way.
