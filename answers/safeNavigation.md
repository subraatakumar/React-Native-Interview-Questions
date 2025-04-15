```js
import {NavigationProp, CommonActions} from '@react-navigation/native';
import {
  SCREEN_HOME,
  SCREEN_NOT_FOUND,
  DRAWER_HOME,
  SCREEN_NAMES,
  SCREEN_DRAWERS,
  AnyScreenName,
} from './screenNames';

export default function safeNavigate(
  navigation: NavigationProp<any>,
  routeName: AnyScreenName,
  params: object = {},
  type: 'navigate' | 'replace' = 'navigate'
): void {
  const isAppScreen = (SCREEN_NAMES as readonly string[]).includes(routeName);
  const isDrawerScreen = (SCREEN_DRAWERS as readonly string[]).includes(
    routeName
  );

  if (!isAppScreen && !isDrawerScreen) {
    navigation.navigate(SCREEN_NOT_FOUND, {attemptedRoute: routeName});
    return;
  }

  const shouldReplace = type === 'replace' || routeName === SCREEN_HOME;

  if (isDrawerScreen && shouldReplace) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName, params}],
      })
    );
    return;
  }

  if (isAppScreen && shouldReplace) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: DRAWER_HOME,
            state: {
              index: 0,
              routes: [{name: routeName, params}],
            },
          },
        ],
      })
    );
    return;
  }

  navigation.navigate(routeName, params);
}
```
