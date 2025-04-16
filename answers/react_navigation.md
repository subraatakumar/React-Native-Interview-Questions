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

# 4

**Interviewer:** Can we customise the navigation of a React Native screen ?

**Candidate:**

"Yes, we can absolutely customize the header of our navigation screens in React Navigation. There are several approaches:

1. **Using Screen Options:**  
   You can pass options to your navigator or individual screens. For instance, with a Stack Navigator, you can customize properties like `headerStyle`, `headerTintColor`, `headerTitleStyle`, and even set a custom title. For example:

   ```jsx
   import { createStackNavigator } from '@react-navigation/stack';
   import HomeScreen from './HomeScreen';

   const Stack = createStackNavigator();

   function App() {
     return (
       <Stack.Navigator
         screenOptions={{
           headerStyle: { backgroundColor: 'tomato' },
           headerTintColor: '#fff',
           headerTitleStyle: { fontWeight: 'bold' },
         }}
       >
         <Stack.Screen 
           name="Home" 
           component={HomeScreen} 
           options={{ title: 'Custom Home Title' }} 
         />
       </Stack.Navigator>
     );
   }

   export default App;
   ```

   In this example, the header of all screens in the navigator has a tomato background, white tint color, and bold title styling.

2. **Using a Custom Header Component:**  
   If you need more control, you can replace the entire header by specifying a custom component in the screen options. For example:

   ```jsx
   import React from 'react';
   import { View, Text, StyleSheet } from 'react-native';
   import { createStackNavigator } from '@react-navigation/stack';
   import HomeScreen from './HomeScreen';

   const Stack = createStackNavigator();

   const CustomHeader = ({ scene, previous, navigation }) => {
     const { options } = scene.descriptor;
     const title =
       options.headerTitle !== undefined
         ? options.headerTitle
         : options.title !== undefined
         ? options.title
         : scene.route.name;

     return (
       <View style={styles.header}>
         {previous ? <Text onPress={navigation.goBack}>Back</Text> : null}
         <Text style={styles.title}>{title}</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     header: {
       height: 60,
       backgroundColor: 'tomato',
       alignItems: 'center',
       justifyContent: 'center',
       flexDirection: 'row',
       paddingHorizontal: 10,
     },
     title: {
       color: '#fff',
       fontSize: 20,
       fontWeight: 'bold',
     },
   });

   function App() {
     return (
       <Stack.Navigator
         screenOptions={{
           header: (props) => <CustomHeader {...props} />,
         }}
       >
         <Stack.Screen 
           name="Home" 
           component={HomeScreen} 
           options={{ title: 'My Home' }} 
         />
       </Stack.Navigator>
     );
   }

   export default App;
   ```

   Here, the `CustomHeader` component completely replaces the default header, giving you full control over its layout and behavior.

In summary, React Navigation is very flexible—you can easily adjust the default header styles through screen options or even build an entirely custom header component if your design requirements are more complex. This versatility is one of the reasons why React Navigation is so popular for managing screen transitions and layouts.

