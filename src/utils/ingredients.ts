import { Receta } from '../types';

export function getIngredients(receta: Receta): string[] {
    const ingredientes: string[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingrediente = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];

        if (ingrediente && ingrediente.trim() !== '') {
            ingredientes.push(`${ingrediente} - ${medida ?? ''}`);
        }
    }

    return ingredientes;
}