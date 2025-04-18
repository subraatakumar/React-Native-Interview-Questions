```js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CollapsibleItem = ({ item, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.itemContainer, { marginLeft: level * 15 }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>
          {item.children && item.children.length > 0 ? (
            isExpanded ? '▼ ' : '► '
          ) : (
            '• '
          )}
          {item.title}
        </Text>
      </TouchableOpacity>
      
      {isExpanded && item.children && (
        <View style={styles.childrenContainer}>
          {item.children.map((child, index) => (
            <CollapsibleItem 
              key={index.toString()} 
              item={child} 
              level={level + 1} 
            />
          ))}
        </View>
      )}
    </View>
  );
};

const NestedCollapsibleList = () => {
  // Sample data
  const sampleData = [
    {
      title: 'Fruits',
      children: [
        {
          title: 'Tropical',
          children: [
            { title: 'Mango' },
            { title: 'Pineapple' },
            { title: 'Papaya' },
            { title: 'Dragon Fruit' },
            { title: 'Guava' },
          ],
        },
        {
          title: 'Citrus',
          children: [
            { title: 'Orange' },
            { title: 'Lemon' },
            { title: 'Grapefruit' },
            { title: 'Lime' },
            { title: 'Tangerine' },
          ],
        },
        { 
          title: 'Berries',
          children: [
            { title: 'Strawberry' },
            { title: 'Blueberry' },
            { title: 'Raspberry' },
            { title: 'Blackberry' },
          ]
        },
      ],
    },
    {
      title: 'Vegetables',
      children: [
        { 
          title: 'Leafy Greens',
          children: [
            { title: 'Spinach' },
            { title: 'Kale' },
            { title: 'Lettuce' },
          ]
        },
        {
          title: 'Root Vegetables',
          children: [
            { title: 'Carrot' },
            { title: 'Potato' },
            { title: 'Beetroot' },
            { title: 'Radish' },
            { title: 'Turnip' },
          ],
        },
        {
          title: 'Cruciferous',
          children: [
            { title: 'Broccoli' },
            { title: 'Cauliflower' },
            { title: 'Brussels Sprouts' },
          ]
        }
      ],
    },
    {
      title: 'Dairy',
      children: [
        { title: 'Milk' },
        { title: 'Cheese' },
        { title: 'Yogurt' },
        { title: 'Butter' },
        { title: 'Cream' },
      ],
    },
    {
      title: 'Grains',
      children: [
        { title: 'Wheat' },
        { title: 'Rice' },
        { title: 'Oats' },
        { title: 'Barley' },
      ],
    },
    {
      title: 'Proteins',
      children: [
        { title: 'Chicken' },
        { title: 'Beef' },
        { title: 'Fish' },
        { title: 'Tofu' },
      ],
    },
  ];

  return (
    <ScrollView 
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      {sampleData.map((item, index) => (
        <CollapsibleItem key={index.toString()} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 50,
  },
  itemContainer: {
    marginBottom: 8,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  childrenContainer: {
    marginTop: 5,
  },
});

export default NestedCollapsibleList;
```
