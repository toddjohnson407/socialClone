import { auth } from '../config';

import { StackActions, NavigationActions } from 'react-navigation';
import clearNav from './clearNav';

export default async function logout() {
  await auth.signOut();
  let action = await clearNav('SignUp');
  return action;
}
