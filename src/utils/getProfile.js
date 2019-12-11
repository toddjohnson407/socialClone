import { db, storage, auth } from '../config';

/**
 * This utility method returns the Profile
 * data for the currently signed in user 
 */
export default getProfile = async () => {
  let profileData = await db.collection('profiles').where('userId', '==', auth.currentUser.uid).get();

  if (!profileData) return null;
  return profileData.docs.map((doc) => ({ ...{ id: doc.id }, ...doc.data() }))[0];
}
