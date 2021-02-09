import * as firebase from 'firebase';

export type UploadTask = firebase.storage.UploadTask;

const uploadFile = async (blob: Blob, id: string): Promise<UploadTask> => {
  try {
    const ref = firebase.storage().ref().child(id);
    return Promise.resolve(ref.put(blob));
  } catch (error) {
    return Promise.reject(error);
  }
};

const getFileDownloadUrl = async (id: string): Promise<string> => {
  try {
    const response = await firebase.storage().ref(id).getDownloadURL();
    return Promise.resolve(response as string);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const FirebaseStorageApi = {
  uploadFile,
  getFileDownloadUrl,
};
