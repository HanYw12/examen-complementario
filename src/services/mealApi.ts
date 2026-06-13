import axios, { AxiosError } from 'axios';

import { Receta } from '../types';
import {
    saveSearchCache,
    getSearchCache,
    saveDetailCache,
    getDetailCache,
} from './cacheService';

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1',
    timeout: 10000,
});

interface SearchResponse {
    meals: Receta[] | null;
}

interface CategoryItem {
    strCategory: string;
}

interface CategoriesResponse {
    categories: CategoryItem[] | null;
}

function getAxiosErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            return `Error HTTP: ${axiosError.response.status}`;
        }

        if (axiosError.request) {
            return 'Error de red. Verifique su conexión a internet.';
        }

        return axiosError.message;
    }

    return 'Ocurrió un error inesperado.';
}

export async function searchRecipes(nombre: string): Promise<Receta[]> {
    try {
        const response = await api.get<SearchResponse>('/search.php', {
            params: {
                s: nombre,
            },
        });

        const meals = response.data.meals;

        if (!meals) {
            await saveSearchCache([]);
            return [];
        }

        await saveSearchCache(meals);
        return meals;
    } catch (error) {
        const cache = await getSearchCache();

        if (cache.length > 0) {
            return cache;
        }

        throw new Error(getAxiosErrorMessage(error));
    }
}

export async function getRecipeDetail(idMeal: string): Promise<Receta> {
    try {
        const response = await api.get<SearchResponse>('/lookup.php', {
            params: {
                i: idMeal,
            },
        });

        const meals = response.data.meals;

        if (!meals || meals.length === 0) {
            throw new Error('No se encontró el detalle de la receta.');
        }

        const receta = meals[0];

        await saveDetailCache(idMeal, receta);

        return receta;
    } catch (error) {
        const cache = await getDetailCache(idMeal);

        if (cache) {
            return cache;
        }

        if (error instanceof Error && error.message === 'No se encontró el detalle de la receta.') {
            throw error;
        }

        throw new Error(getAxiosErrorMessage(error));
    }
}

export async function getCategories(): Promise<string[]> {
    try {
        const response = await api.get<CategoriesResponse>('/categories.php');

        const categories = response.data.categories;

        if (!categories) {
            return [];
        }

        return categories.map(item => item.strCategory);
    } catch (error) {
        throw new Error(getAxiosErrorMessage(error));
    }
}

export async function filterByCategory(categoria: string): Promise<Receta[]> {
    try {
        const response = await api.get<SearchResponse>('/filter.php', {
            params: {
                c: categoria,
            },
        });

        const meals = response.data.meals;

        if (!meals) {
            await saveSearchCache([]);
            return [];
        }

        await saveSearchCache(meals);
        return meals;
    } catch (error) {
        const cache = await getSearchCache();

        if (cache.length > 0) {
            return cache;
        }

        throw new Error(getAxiosErrorMessage(error));
    }
}