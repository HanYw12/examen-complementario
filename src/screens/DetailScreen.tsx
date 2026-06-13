import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Button,
    Alert,
    StyleSheet,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Receta, RootStackParamList } from '../types';
import { getRecipeDetail } from '../services/mealApi';
import { getIngredients } from '../utils/ingredients';
import { saveFavorite } from '../services/favoriteService';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
    const { idMeal } = route.params;

    const [receta, setReceta] = useState<Receta | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        cargarDetalle();
    }, []);

    async function cargarDetalle(): Promise<void> {
        try {
            setLoading(true);
            const data = await getRecipeDetail(idMeal);
            setReceta(data);
        } catch (error: any) {
            setMensaje(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function seleccionarImagen(): Promise<string | undefined> {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert('Permiso denegado', 'No se puede acceder a la galería.');
            return undefined;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (result.canceled) {
            return undefined;
        }

        return result.assets[0].uri;
    }

    async function tomarFoto(): Promise<string | undefined> {
        const permiso = await ImagePicker.requestCameraPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert('Permiso denegado', 'No se puede acceder a la cámara.');
            return undefined;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (result.canceled) {
            return undefined;
        }

        return result.assets[0].uri;
    }

    async function agregarFavorito(tipo: 'camara' | 'galeria'): Promise<void> {
        if (!receta) return;

        const imagenUsuario =
            tipo === 'camara'
                ? await tomarFoto()
                : await seleccionarImagen();

        await saveFavorite({
            idMeal: receta.idMeal,
            nombre: receta.strMeal,
            categoria: receta.strCategory,
            imagenReceta: receta.strMealThumb,
            imagenUsuario,
            fechaCreacion: Date.now(),
        });

        Alert.alert('Favorito guardado', 'La receta fue guardada correctamente.');
    }

    function mostrarOpcionesFavorito(): void {
        Alert.alert(
            'Agregar favorito',
            'Seleccione una opción',
            [
                {
                    text: 'Tomar foto',
                    onPress: () => agregarFavorito('camara'),
                },
                {
                    text: 'Elegir de galería',
                    onPress: () => agregarFavorito('galeria'),
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ]
        );
    }

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (!receta) {
        return (
            <View style={styles.container}>
                <Text>{mensaje}</Text>
            </View>
        );
    }

    const ingredientes = getIngredients(receta);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: receta.strMealThumb }} style={styles.image} />

            <Text style={styles.title}>{receta.strMeal}</Text>
            <Text style={styles.category}>{receta.strCategory}</Text>

            <Button title="Agregar a favoritos" onPress={mostrarOpcionesFavorito} />

            <Text style={styles.subtitle}>Ingredientes</Text>

            {ingredientes.map((item, index) => (
                <Text key={index} style={styles.text}>
                    • {item}
                </Text>
            ))}

            <Text style={styles.subtitle}>Instrucciones</Text>

            <Text style={styles.text}>{receta.strInstructions}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 12,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 12,
    },
    category: {
        fontSize: 16,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        marginVertical: 4,
    },
});