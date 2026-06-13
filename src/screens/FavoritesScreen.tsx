import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Button,
    StyleSheet,
} from 'react-native';

import { Favorito } from '../types';
import {
    listenFavorites,
    deleteFavorite,
} from '../services/favoriteService';

export default function FavoritesScreen() {
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);

    useEffect(() => {
        const unsubscribe = listenFavorites(setFavoritos);

        return () => {
            unsubscribe();
        };
    }, []);

    async function eliminar(id?: string): Promise<void> {
        if (!id) return;
        await deleteFavorite(id);
    }

    return (
        <View style={styles.container}>
            {favoritos.length === 0 && (
                <Text style={styles.empty}>No existen favoritos registrados.</Text>
            )}

            <FlatList
                data={favoritos}
                keyExtractor={item => item.id ?? item.idMeal}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imagenReceta }} style={styles.image} />

                        <View style={styles.content}>
                            <Text style={styles.title}>{item.nombre}</Text>
                            <Text>{item.categoria ?? 'Sin categoría'}</Text>

                            {item.imagenUsuario && (
                                <>
                                    <Text style={styles.photoText}>Foto asociada:</Text>
                                    <Image
                                        source={{ uri: item.imagenUsuario }}
                                        style={styles.userImage}
                                    />
                                </>
                            )}

                            <Button title="Eliminar" onPress={() => eliminar(item.id)} />
                        </View>
                    </View>
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
    empty: {
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    photoText: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    userImage: {
        width: '100%',
        height: 160,
        marginVertical: 8,
        borderRadius: 8,
    },
});