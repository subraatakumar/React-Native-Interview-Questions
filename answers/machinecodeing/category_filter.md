Here's the properly formatted question and the React Native solution in a single file:

### Question:
Create a React Native app in a single file that:
1. Displays a horizontal list of categories at the top (fetched from `https://backend.ecom.subraatakumar.com/api/v1/categories`)
2. Shows all products at the bottom initially (fetched from `https://backend.ecom.subraatakumar.com/api/v1/products`)
3. Allows users to click on a category to filter products by that category (using `https://backend.ecom.subraatakumar.com/api/v1/products?category=category_name`)
4. If no category is selected, shows all products
5. Displays product information including image, name, price, and other details from the API response

### Solution (App.js):

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://backend.ecom.subraatakumar.com/api/v1/categories', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://backend.ecom.subraatakumar.com/api/v1/products', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend.ecom.subraatakumar.com/api/v1/products?category=${category.toLowerCase()}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data.data);
    } catch (err) {
      setError('Failed to fetch category products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productStock}>
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </Text>
        {item.discount > 0 && (
          <Text style={styles.productDiscount}>{item.discount}% off</Text>
        )}
      </View>
    </View>
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.header}>
        {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
      </Text>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryList: {
    paddingBottom: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    height:35,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedCategoryItem: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: '#dc3545',
  },
});

export default App;
```

### Key Features:
1. **Category Selection**: Horizontal scrollable list at the top
2. **Product Display**: Shows all products initially, filters when a category is selected
3. **Loading States**: Shows activity indicator while fetching data
4. **Error Handling**: Displays error messages if API calls fail
5. **Product Card**: Shows image, name, price, brand, stock status, and discount
6. **Responsive Design**: Works well on different screen sizes
7. **Visual Feedback**: Selected category is highlighted in blue

The app maintains all functionality in a single file as requested, with clean state management and proper API integration.
