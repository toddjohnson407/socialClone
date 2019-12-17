import { db, storage, auth } from '../config';

/**
 * This utility method returns the Profile Posts
 * data for the provided profileId
 */
export default getProfilePosts = async (profileId) => {
  let profileData = await db.collection('posts').where('profileId', '==', profileId).get();

  if (!profileData) return null;
  return profileData.docs.map((doc) => ({ ...{ id: doc.id }, ...doc.data() }));
}
