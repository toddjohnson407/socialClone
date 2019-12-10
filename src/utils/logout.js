import { auth } from '../config';

export default async function logout() {
  auth.signOut().then(res => this.props.navigation.navigate('SignUp')).catch(err => console.log(err));
}
