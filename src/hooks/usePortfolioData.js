import { useEffect, useState } from 'react'
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.js'

const emptyConfig = {
  name: 'Carlos Prado',
  role: 'Creative Developer',
  heroTagline:
    'Crafting immersive digital experiences at the intersection of code and design.',
  avatarUrl: '',
  iconUrl: '',
  aboutPhotoUrl: '',
  aboutBio: '',
}

export function useConfig() {
  const [config, setConfig] = useState(emptyConfig)

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'main'), (snapshot) => {
      setConfig({ ...emptyConfig, ...(snapshot.data() || {}) })
    })
    return unsubscribe
  }, [])

  return config
}

export function useCollectionData(collectionName, orderField = 'createdAt') {
  const [items, setItems] = useState([])

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy(orderField, 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })))
    })
    return unsubscribe
  }, [collectionName, orderField])

  return items
}
