import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';

const options = {
  allowsEditing: true,
};

export default takePhoto = async () => {
  const status = await getPermission(Permissions.CAMERA);
  if (status) {
    const result = await ImagePicker.launchCameraAsync(options);
    if (result.cancelled) return '';
    return result.uri;
  } else return '';
};
