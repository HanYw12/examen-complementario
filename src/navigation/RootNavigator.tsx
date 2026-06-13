import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ title: 'MisRecetas' }}
                />

                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{ title: 'Detalle de receta' }}
                />

                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{ title: 'Favoritos' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}