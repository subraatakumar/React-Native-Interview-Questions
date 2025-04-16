**Interviewer:** While displaying a list of items in react native what should you consider, how you choose the best component to use and how you will optimise performance ?

**Candidate:**

"When displaying a list of items in React Native, there are several key considerations to keep in mind regarding component selection and performance optimization.

First, you need to evaluate the size and nature of your data set. For small or static lists, you might use a `ScrollView`, which renders all items at once. However, for larger or dynamic lists, it's best to use components like `FlatList` or `SectionList` because they support virtualization—only the visible items are rendered, which greatly improves performance.

Next, consider the following performance optimizations when using `FlatList` or `SectionList`:

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

