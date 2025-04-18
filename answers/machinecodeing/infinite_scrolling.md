```js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from 'react-native';

const PAGE_SIZE = 10; // Number of items to fetch per page

const InfiniteScrollList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (pageNum, isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        `https://backend.ecom.subraatakumar.com/api/v1/products?page=${pageNum}&size=${PAGE_SIZE}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      if (isRefreshing) {
        setData(json.data || []);
      } else {
        setData(prevData => [...prevData, ...(json.data || [])]);
      }

      // Check if we've reached the end of available data
      if (!json?.data || json.data.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        fetchData(newPage);
        return newPage;
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} 
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>${item.price}</Text>
          {item.discount > 0 && (
            <Text style={styles.discountText}>{item.discount}% off</Text>
          )}
        </View>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            item.inStock ? styles.inStock : styles.outOfStock
          ]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
          <Text style={styles.ratingText}>⭐ {item.rating?.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }
    
    if (!hasMore && data.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.noMoreText}>End of data</Text>
        </View>
      );
    }
    
    return null;
  };

  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? `Error: ${error}` : 'No products found'}
        </Text>
        {error && (
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {error && !refreshing && data.length === 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={data.length === 0 ? styles.emptyContent : null}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }
          initialNumToRender={PAGE_SIZE}
          maxToRenderPerBatch={PAGE_SIZE}
          windowSize={21}
          removeClippedSubviews={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginRight: 10,
  },
  discountText: {
    fontSize: 14,
    color: '#e74c3c',
    backgroundColor: '#ffebee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 5,
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inStock: {
    color: '#2ecc71',
  },
  outOfStock: {
    color: '#e74c3c',
  },
  ratingText: {
    fontSize: 14,
    color: '#f39c12',
  },
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#ffebee',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InfiniteScrollList;
```

## Optimisation Best Practices

I'll implement FlatList best practices that are missing in the current implementation while keeping all other functionality the same. Here are the optimizations I'll make:

1. Implement `useMemo` for stable item data and styles to prevent unnecessary re-renders
2. Optimize the `renderItem` function with `React.memo`
3. Add `getItemLayout` for optimized scrolling performance
4. Ensure proper key extraction strategy
5. Optimize image loading with `resizeMethod`

Here's the optimized implementation:

```jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from 'react-native';

const PAGE_SIZE = 10; // Number of items to fetch per page
const ITEM_HEIGHT = 110; // Fixed height for each item

const InfiniteScrollList = () => {
  // ... [keep all existing state declarations] ...

  // Memoize the item data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  // Memoize the renderItem function
  const MemoizedRenderItem = useMemo(() => React.memo(({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} 
        style={styles.itemImage}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>${item.price}</Text>
          {item.discount > 0 && (
            <Text style={styles.discountText}>{item.discount}% off</Text>
          )}
        </View>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            item.inStock ? styles.inStock : styles.outOfStock
          ]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
          <Text style={styles.ratingText}>⭐ {item.rating?.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )), []);

  // Function to get item layout for optimization
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  // ... [keep all other existing functions] ...

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {error && !refreshing && data.length === 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={memoizedData}
          renderItem={MemoizedRenderItem}
          keyExtractor={(item) => `${item.id}-${item.updatedAt || ''}`} // More unique key
          contentContainerStyle={data.length === 0 ? styles.emptyContent : null}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }
          initialNumToRender={PAGE_SIZE}
          maxToRenderPerBatch={PAGE_SIZE}
          windowSize={21}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
          updateCellsBatchingPeriod={100} // Batch updates for better performance
          disableVirtualization={false} // Ensure virtualization is enabled
        />
      </View>
    </SafeAreaView>
  );
};

// ... [keep all existing styles] ...

export default InfiniteScrollList;
```

Key optimizations made:

1. **Memoization**:
   - Used `useMemo` for the data to prevent unnecessary re-renders
   - Memoized the renderItem component with `React.memo`

2. **FlatList Performance Props**:
   - Added `getItemLayout` for predictable item sizes and smooth scrolling
   - Added `updateCellsBatchingPeriod` to control render batching
   - Explicitly set `disableVirtualization={false}` (though it's default)

3. **Image Optimization**:
   - Added `resizeMethod="resize"` for better image loading performance

4. **Key Extraction**:
   - Improved `keyExtractor` to use a more unique key combination (id + updatedAt if available)

5. **Fixed Height Items**:
   - Defined a constant `ITEM_HEIGHT` for consistent item measurements

These changes will significantly improve the performance of the FlatList, especially when dealing with large datasets or frequent updates. The list will scroll more smoothly, and unnecessary re-renders will be minimized.
