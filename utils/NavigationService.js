import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function pop(params) {
  _navigator.dispatch(NavigationActions.back({ params }));
}

export default {
  navigate,
  pop,
  setTopLevelNavigator,
};
