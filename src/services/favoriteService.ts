import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

import { db } from './firebase';
import { Favorito } from '../types';

const COLLECTION_NAME = 'favoritos';

export async function saveFavorite(favorito: Favorito): Promise<void> {
    await addDoc(collection(db, COLLECTION_NAME), favorito);
}

export async function deleteFavorite(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export function listenFavorites(callback: (favoritos: Favorito[]) => void): () => void {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('fechaCreacion', 'desc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
        const favoritos: Favorito[] = snapshot.docs.map(item => ({
            id: item.id,
            ...item.data(),
        })) as Favorito[];

        callback(favoritos);
    });

    return unsubscribe;
}