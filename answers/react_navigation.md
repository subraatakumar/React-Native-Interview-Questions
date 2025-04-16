#1

**Interviewer:** How to use react navigation ?

**Candidate:**

"React Navigation is the most popular navigation library for React Native, and it simplifies how we handle moving between screens in our app. The process generally involves three main steps:

1. **Installation and Setup:**  
   You first install the necessary packages—for example, using npm or yarn:  
   ```bash
   npm install @react-navigation/native
   npm install @react-navigation/stack
   npm install react-native-screens react-native-safe-area-context
   ```  
   Then, wrap your root component in a `NavigationContainer`. This container manages the navigation state and links your navigators to the app environment.

2. **Defining Navigators and Screens:**  
   React Navigation offers several navigators such as Stack, Tab, and Drawer. For a simple example, you can create a Stack Navigator to switch between two screens, like so:
   ```jsx
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   import HomeScreen from './HomeScreen';
   import DetailsScreen from './DetailsScreen';

   const Stack = createStackNavigator();

   function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
           <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }

   export default App;
   ```
   In this example, `HomeScreen` and `DetailsScreen` are two separate components. The Stack Navigator manages the transition between these screens, automatically handling the back button and animations.

3. **Navigating Between Screens:**  
   Within your screen components, React Navigation injects a `navigation` prop, which allows you to navigate to other screens. For instance, in your `HomeScreen` you can navigate to `DetailsScreen` by calling:
   ```jsx
   function HomeScreen({ navigation }) {
     return (
       <View>
         <Text>Welcome to the Home Screen</Text>
         <Button title="Go to Details" onPress={() => navigation.navigate('Details', { itemId: 42 })} />
       </View>
     );
   }
   ```
   This passes an `itemId` parameter to `DetailsScreen`, which can be accessed through the route parameters.

# 2

**Interviewer:** *In React Navigation, how do you receive the parameters passed from another screen?*

**Candidate:**

"When we navigate from one screen to another using React Navigation, we can pass parameters via the `navigate` method. To receive those parameters on the destination screen, we use the `route` prop, which is automatically injected into screen components.

Here’s a simple example to illustrate:

---

### 👨‍💻 Navigation with Parameters

```js
// From HomeScreen.js
navigation.navigate('Details', { userId: 42, userName: 'John Doe' });
```

---

### 📥 Receiving Parameters on the Details Screen

```js
// In DetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

function DetailsScreen({ route }) {
  const { userId, userName } = route.params;

  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Text>User Name: {userName}</Text>
    </View>
  );
}

export default DetailsScreen;
```

---

- `route.params` contains all the data passed from the previous screen.
- If you're using TypeScript, you can also type `route.params` for safety.
- It’s a good practice to handle cases where the parameter might be missing by providing defaults or fallbacks.

So in short: use `route.params` to receive data, and it works seamlessly with all navigator types like Stack, Tab, or Drawer."

#3

**Interviewer:** suppose we are using another component with in a screen and with in that component we want to use the navigation and route, how can we do that ?

**Candidate:**

"When you have a nested component within a screen and you need to use the navigation and route objects, you have a couple of options. You can either pass them down as props from the parent screen, or—more commonly nowadays—you can use the `useNavigation` and `useRoute` hooks provided by React Navigation directly in your nested component.

Using hooks is usually the most straightforward approach in functional components. Here’s an example:

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyNestedComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Access a parameter from the route
  const { someParam } = route.params || {};

  return (
    <View style={{ padding: 20 }}>
      <Text>Parameter passed from screen: {someParam}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MyNestedComponent;
```

In this example, `MyNestedComponent` calls `useNavigation()` and `useRoute()` to access the `navigation` and `route` objects. This way, even though it's not directly a screen component, it still has full access to the navigation methods and route parameters.
