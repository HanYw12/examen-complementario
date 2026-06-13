import AsyncStorage from '@react-native-async-storage/async-storage';
import { Receta } from '../types';

const SEARCH_CACHE_KEY = 'CACHE_LAST_SEARCH';
const DETAIL_CACHE_PREFIX = 'CACHE_DETAIL_';

export async function saveSearchCache(recetas: Receta[]): Promise<void> {
    await AsyncStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(recetas));
}

export async function getSearchCache(): Promise<Receta[]> {
    const data = await AsyncStorage.getItem(SEARCH_CACHE_KEY);
    return data ? JSON.parse(data) : [];
}

export async function saveDetailCache(idMeal: string, receta: Receta): Promise<void> {
    await AsyncStorage.setItem(`${DETAIL_CACHE_PREFIX}${idMeal}`, JSON.stringify(receta));
}

export async function getDetailCache(idMeal: string): Promise<Receta | null> {
    const data = await AsyncStorage.getItem(`${DETAIL_CACHE_PREFIX}${idMeal}`);
    return data ? JSON.parse(data) : null;
}