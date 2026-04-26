import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase.js'

export async function uploadImage(file, folder) {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export async function saveConfig(payload) {
  await setDoc(doc(db, 'config', 'main'), payload, { merge: true })
}

export async function createItem(collectionName, payload) {
  await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp() })
}

export async function editItem(collectionName, id, payload) {
  await updateDoc(doc(db, collectionName, id), payload)
}

export async function removeItem(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id))
}
