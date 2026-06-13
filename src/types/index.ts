export interface Receta {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strInstructions?: string;

    [key: string]: string | undefined;
}

export interface Favorito {
    id?: string;
    idMeal: string;
    nombre: string;
    categoria?: string;
    imagenReceta: string;
    imagenUsuario?: string;
    fechaCreacion: number;
}

export type RootStackParamList = {
    Search: undefined;
    Detail: {
        idMeal: string;
    };
    Favorites: undefined;
};