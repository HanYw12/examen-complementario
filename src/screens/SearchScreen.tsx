import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Receta, RootStackParamList } from '../types';
import {
    searchRecipes,
    getCategories,
    filterByCategory,
} from '../services/mealApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: Props) {
    const [texto, setTexto] = useState<string>('');
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        cargarCategorias();
    }, []);

    async function cargarCategorias(): Promise<void> {
        try {
            const data = await getCategories();
            setCategorias(data);
        } catch {
            setMensaje('No se pudieron cargar las categorías.');
        }
    }

    async function buscar(): Promise<void> {
        try {
            setLoading(true);
            setMensaje('');

            const data = await searchRecipes(texto);

            if (data.length === 0) {
                setMensaje('No se encontraron recetas.');
            }

            setRecetas(data);
        } catch (error: any) {
            setMensaje(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function filtrarCategoria(categoria: string): Promise<void> {
        try {
            setLoading(true);
            setMensaje('');

            const data = await filterByCategory(categoria);
            setRecetas(data);
        } catch {
            setMensaje('Error al filtrar por categoría.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Button
                title="Ver favoritos"
                onPress={() => navigation.navigate('Favorites')}
            />

            <TextInput
                placeholder="Buscar receta..."
                value={texto}
                onChangeText={setTexto}
                style={styles.input}
            />

            <Button title="Buscar" onPress={buscar} />

            <ScrollView
                horizontal
                style={styles.categories}
                contentContainerStyle={styles.categoriesContent}
                showsHorizontalScrollIndicator={false}
            >
                {categorias.map(categoria => (
                    <TouchableOpacity
                        key={categoria}
                        style={styles.categoryButton}
                        onPress={() => filtrarCategoria(categoria)}
                    >
                        <Text>{categoria}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading && <ActivityIndicator size="large" />}

            {mensaje !== '' && <Text style={styles.message}>{mensaje}</Text>}

            <FlatList
                style={{ flex: 1 }}
                data={recetas}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('Detail', {
                                idMeal: item.idMeal,
                            })
                        }
                    >
                        <Image source={{ uri: item.strMealThumb }} style={styles.image} />

                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.strMeal}</Text>
                            <Text>{item.strCategory ?? 'Sin categoría'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
    },
    categories: {
        height: 50,
        maxHeight: 50,
        marginVertical: 10,
    },

    categoriesContent: {
        height: 50,
        alignItems: 'center',
    },

    categoryButton: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 18,
        backgroundColor: '#FFB703',
    },
    message: {
        marginVertical: 10,
        color: 'red',
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});