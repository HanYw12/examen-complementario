# 🍽️ MisRecetas

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript** que permite buscar recetas de cocina utilizando la API pública **TheMealDB**, visualizar el detalle de cada receta, almacenar favoritos en la nube mediante **Firebase Firestore**, mantener información en caché local mediante **AsyncStorage** y asociar fotografías utilizando la cámara o galería del dispositivo.

---

# Integrantes

**Estudiante:** [Nombre del estudiante]

**Carrera:** Ingeniería Informática

**Materia:** Aplicaciones Móviles

**Docente:** Viviana Flores, MSc.

**Universidad Tecnológica Israel**

---

# Tecnologías utilizadas

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* AsyncStorage
* Firebase Firestore
* Expo Image Picker
* TheMealDB API

---

# Funcionalidades implementadas

## Búsqueda de recetas

La aplicación permite buscar recetas por nombre utilizando el endpoint:

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?s={nombre}
```

Para cada resultado se muestra:

* Imagen de la receta
* Nombre
* Categoría

Además, se incluye:

* Indicador de carga
* Manejo de errores
* Mensajes cuando no existen resultados

---

## Detalle de receta

La aplicación permite visualizar el detalle completo de una receta mediante el endpoint:

```http
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}
```

Mostrando:

* Imagen
* Nombre
* Categoría
* Ingredientes
* Medidas
* Instrucciones

---

## Navegación tipada

Se implementó React Navigation con TypeScript mediante:

```ts
RootStackParamList
```

Permitiendo navegar desde el listado hacia el detalle enviando:

```ts
idMeal
```

como parámetro tipado.

---

## Filtrado por categoría

La aplicación permite filtrar recetas por categoría utilizando:

```http
GET https://www.themealdb.com/api/json/v1/1/categories.php
```

y

```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?c={categoria}
```

---

## Caché local

Se implementó persistencia local utilizando:

```text
AsyncStorage
```

La aplicación almacena:

* Últimas búsquedas realizadas
* Detalles de recetas consultadas

Permitiendo visualizar información aun cuando el dispositivo no tenga conexión a internet.

---

## Favoritos en la nube

Se utilizó:

```text
Firebase Firestore
```

como base de datos en la nube.

Operaciones implementadas:

* Guardar favorito
* Consultar favoritos
* Eliminar favorito
* Actualización en tiempo real mediante listener

---

## Cámara y galería

Se implementó mediante:

```text
expo-image-picker
```

Permitiendo:

* Solicitar permisos al usuario
* Capturar fotografías
* Seleccionar imágenes desde la galería
* Asociar una fotografía a cada receta favorita

---

# Estructura del proyecto

```text
MisRecetas
│
├── src
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── types
│   └── utils
│
├── App.tsx
├── package.json
└── README.md
```

---

# API utilizada

## TheMealDB

Documentación oficial:

https://www.themealdb.com/api.php

Endpoints utilizados:

### Buscar recetas

```http
GET https://www.themealdb.com/api/json/v1/1/search.php?s={nombre}
```

### Detalle de receta

```http
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}
```

### Categorías

```http
GET https://www.themealdb.com/api/json/v1/1/categories.php
```

### Filtrar por categoría

```http
GET https://www.themealdb.com/api/json/v1/1/filter.php?c={categoria}
```

---

# Base de datos utilizada

## Firebase Firestore

Se utilizó Firebase Firestore para almacenar las recetas favoritas y las imágenes asociadas.

Colección utilizada:

```text
favoritos
```

Campos almacenados:

```json
{
  "idMeal": "52874",
  "nombre": "Beef and Mustard Pie",
  "categoria": "Beef",
  "imagenReceta": "https://...",
  "imagenUsuario": "file://...",
  "fechaCreacion": 1710000000
}
```

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/usuario/MisRecetas.git
```

Ingresar al proyecto:

```bash
cd MisRecetas
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar aplicación

```bash
npx expo start
```

---

# Dependencias principales

```bash
npm install axios
npm install firebase
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-native-async-storage/async-storage
npx expo install expo-image-picker
npx expo install react-native-screens react-native-safe-area-context
```

---

# Manejo de errores

La aplicación contempla:

* Error de red
* Error HTTP
* Error de servidor
* Búsquedas sin resultados
* Falta de conexión a internet
* Permisos denegados de cámara o galería

---

# Evidencias

## Capturas requeridas

* Pantalla de búsqueda
* Pantalla de detalle
* Pantalla de favoritos
* Pantalla de cámara o galería

---

# Video demostrativo

El video demuestra:

* Búsqueda de recetas
* Navegación al detalle
* Favoritos en Firebase
* Eliminación de favoritos
* Caché local sin conexión
* Uso de cámara y galería

---

# Conclusiones

El desarrollo de la aplicación MisRecetas permitió aplicar conceptos de consumo de APIs REST, navegación tipada con TypeScript, persistencia local mediante AsyncStorage, almacenamiento en la nube con Firebase Firestore y acceso a funcionalidades nativas del dispositivo como cámara y galería, utilizando React Native y Expo.
