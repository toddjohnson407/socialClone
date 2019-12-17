import { db, storage, auth } from '../config';

/**
 * This utility method returns the Profile
 * data for the currently signed in user or for
 * a given profile id
 * 
 * @param id  Optional profile id
 * @return    Formatted profile data from the database
 */
export default getProfile = async (id?) => {

  let profileData;
  if (id) (profileData = await db.collection('profiles').doc(id).get());
  else (profileData = await db.collection('profiles').where('userId', '==', auth.currentUser.uid).get());

  if (!profileData) return null;
  return id ? ({...profileData.data(), ...{ id: profileData.id } }) : profileData.docs.map((doc) => ({ ...{ id: doc.id }, ...doc.data() }))[0];
}
