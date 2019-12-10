import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';

const options = {
  allowsEditing: true,
};

export default selectPhoto = async () => {
  const status = await getPermission(Permissions.CAMERA_ROLL);
  if (status) {
    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (result.cancelled) return '';
    return result.uri;
  }
};
