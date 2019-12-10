import uriToBlob from '../utils/uriToBlob';
import { storage } from '../config';


export default uploadPhoto = async (uri) => {
  let blob = await uriToBlob(uri);
  await storage.ref(`posts/${blob._data.name}`).put(blob);
  return `posts/${blob._data.name}`;
  // return storage.ref(`posts/${blob._data.name}`).put(blob).then(snapshot => blob._data.name).catch(err => console.log('Error storing image in Firebase:', err));
}