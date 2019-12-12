
import { StackActions, NavigationActions } from 'react-navigation';

/** 
 * Returns a StackAction to be dispatched in the StackNavigator
 * that will navigate a given route and clear the navigator's history
 */
export default async function(routeName) {
  return StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName })] });
}
