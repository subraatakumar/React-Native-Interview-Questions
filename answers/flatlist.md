**Interviewer:** While displaying a list of items in react native what should you consider, how you choose the best component to use and how you will optimise performance ?

**Candidate:**

"When displaying a list of items in React Native, there are several key considerations to keep in mind regarding component selection and performance optimization.

First, you need to evaluate the size and nature of your data set. For small or static lists, you might use a `ScrollView`, which renders all items at once. However, for larger or dynamic lists, it's best to use components like `FlatList` because it support virtualization—only the visible items + 2 are rendered, which greatly improves performance.

Next, consider the following performance optimizations when using `FlatList` :

- **Key Extraction:** Always provide a stable `keyExtractor` to help React identify which items have changed. This minimizes unnecessary re-renders.
  
- **getItemLayout:** If your list items have a fixed height, using `getItemLayout` can optimize scroll performance by allowing the list to calculate item positions without extra render passes.
  
- **Window Size and Batch Rendering:** Adjust properties like `windowSize`, `maxToRenderPerBatch`, and `updateCellsBatchingPeriod` to control how many items are rendered initially and during scroll. This tuning helps balance performance and responsiveness.
  
- **Avoid Inline Functions in Render:** Inline functions can cause extra re-renders. Instead, define functions outside the render scope or use memoization (like `React.memo`) for your row components.
  
- **Image and Asset Caching:** If your list items include images or heavy assets, consider caching them to reduce load times during scrolling.

Using these techniques, you can choose the best component for your needs and optimize rendering to ensure smooth, responsive list performance. In summary, the choice between `ScrollView` and `FlatList`/`SectionList` depends on the size and dynamic nature of your list, and performance tuning is achieved through careful property configuration and avoiding unnecessary re-renders." 

# 2

**Interviewer:** Please write an example to demonstrate your explanation.

**Candidate:** 

Below is an example that demonstrates how to display a list using FlatList along with several performance optimizations. In this example, we create a list of 1000 items and configure FlatList with properties like keyExtractor, getItemLayout, initialNumToRender, windowSize, maxToRenderPerBatch, and updateCellsBatchingPeriod. We also use a memoized row component to avoid unnecessary re-renders.

```jsx
import React, { useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

// Create a large data set for demonstration
const DATA = Array.from({ length: 1000 }, (_, index) => ({
  id: `${index}`,
  title: `Item ${index + 1}`,
}));

// Assume a fixed height for each item for performance optimization
const ITEM_HEIGHT = 50;

// Memoized item component to prevent unnecessary re-renders
const Item = React.memo(({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
));

// getItemLayout helps FlatList compute the height and position of each item without rendering them all.
const getItemLayout = (data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export default function App() {
  // useCallback memoizes the renderItem function
  const renderItem = useCallback(({ item }) => <Item title={item.title} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        initialNumToRender={20}          // Render initial 20 items
        windowSize={10}                  // Number of items to render outside the visible area
        maxToRenderPerBatch={20}         // Render 20 items per batch during scroll
        updateCellsBatchingPeriod={50}   // Time (ms) between rendering batches
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
});
```

**Explanation:**

1. **Data & Fixed Height:**  
   We generate 1000 items and assume each item has a fixed height (`ITEM_HEIGHT`). This assumption allows us to use `getItemLayout` so that FlatList can calculate positions without having to measure each item during rendering.

2. **Memoized Row Component:**  
   The `Item` component is wrapped with `React.memo` to prevent re-renders unless its `title` prop changes.

3. **Performance Props:**
   - **keyExtractor:** Ensures each item has a unique key for efficient re-rendering.
   - **getItemLayout:** Uses the fixed height to calculate the layout of each item, which improves scroll performance.
   - **initialNumToRender, windowSize, maxToRenderPerBatch, updateCellsBatchingPeriod:** These properties control how many items are rendered initially and during scrolling, which minimizes the number of off-screen items rendered at any one time.

This approach ensures that the list is rendered efficiently, offering smooth scrolling and responsiveness even when dealing with large data sets.

# 3

**Interviewer:**  How to handle infinite scrolling in flatlist in react native ?

**Candidate:** 

**Interviewer:** *How would you handle infinite scrolling in a FlatList in React Native?*

**Candidate:**

"Infinite scrolling in a FlatList is implemented by detecting when the user approaches the end of the list and then fetching additional data to append to the existing list. The key properties for this are `onEndReached` and `onEndReachedThreshold`.

- **onEndReached:** This callback is triggered when the end of the list is reached. It’s where you would typically call an API or data-fetching function to load more items.
- **onEndReachedThreshold:** This determines how close (as a fraction of the total list length) the user must be from the end before `onEndReached` is called. For example, a threshold of `0.5` means the callback will fire when the user scrolls within half the screen's length from the end.

To prevent duplicate calls during rapid scrolling, it’s important to keep track of a loading state. Additionally, you might display an ActivityIndicator at the bottom of the list to indicate that data is being loaded.

Below is an example of how you might implement infinite scrolling using FlatList in React Native. In this example, we fetch data from the API endpoint you provided. We maintain state for the list of products, the current page, a loading flag, and whether there's more data to load. When the user scrolls to the bottom of the list (triggered by the `onEndReached` event), we fetch the next page of data and append it to our existing list.

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

const PAGE_SIZE = 10;
const API_URL = 'https://backend.ecom.subraatakumar.com/api/v1/products';

const InfiniteScrollList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // start at page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch products for a given page
  const fetchProducts = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${pageNumber}&size=${PAGE_SIZE}`);
      const data = await response.json();
      
      // Assume the API returns an array of products
      if (data && data.length > 0) {
        // Append new products to the existing list
        setProducts((prevProducts) => [...prevProducts, ...data]);
        // If the number of fetched items is less than PAGE_SIZE, no more data is available
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  // Handler when end of list is reached
  const handleEndReached = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Render a single product item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title || `Product ${item.id}`}</Text>
    </View>
  );

  // Render footer with a loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
  },
});

export default InfiniteScrollList;
```

---

**Explanation:**

- **State Management:**  
  We maintain state for `products`, `page`, `loading`, and `hasMore` to track the current list, pagination, and loading status.

- **Data Fetching:**  
  The `fetchProducts` function uses the provided API endpoint. It fetches a page of products and appends them to our existing list. If the number of products fetched is less than the page size, we assume there is no more data to load.

- **FlatList Props:**  
  - `onEndReached` calls `loadMore` when the user scrolls close to the end of the list.  
  - `onEndReachedThreshold` is set to 0.5, meaning the callback is triggered when the scroll position is within half the visible length from the bottom.
  - `ListFooterComponent` displays an ActivityIndicator during data fetching.

 - **Infinite Scrolling:**  
  The `onEndReached` prop in FlatList triggers `handleEndReached` when the list is scrolled near the bottom. This handler increments the page number, causing `useEffect` to fetch the next page.

- **Performance Considerations:**  
  The keyExtractor ensures each item is uniquely identified, while the onEndReachedThreshold (set to 0.5) allows us to start fetching new data when the user has scrolled halfway past the visible content.

This example demonstrates how to implement infinite scrolling in React Native with FlatList using asynchronous data fetching, which is essential for a smooth and responsive user experience.



