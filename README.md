# KawaiiTránsito 🌸

Juego web con tres opciones: **carrera de rutas** (contra un rival, con cualquier lugar de República Dominicana), **trivia vial** (vidas, combos y tiempo) y **mapa** (marca puntos, mira la ruta real y compara medios de transporte). Incluye menú principal con dos personajes, insignias, consejos de viaje y tablas de puntuaciones guardadas en una base de datos.

## Integrantes

- Integrante 1: Nashla Fernandez 
- Integrante 2: Aida Manzueta

## Descripción funcional

1. **Menú principal**: escribes tu nombre, eliges tu auto (Hello Kitty o Pompompurin) y escoges Carrera, Trivia o Mapa. Ves las tablas de puntajes y tus insignias. Desde cualquier pantalla, el botón **🏠 Menú principal** de la parte superior te devuelve aquí sin perder tu nombre ni tu auto.
2. **Lugares de todo el país**: busca cualquier lugar de República Dominicana (OpenStreetMap), usa **📍 Mi ubicación** (GPS del navegador; si no hay permiso, se usa tu IP) o toca un lugar popular.
3. **Rutas**: la distancia sale de la ruta real por calles (OSRM); si no hay internet se estima. Recibes consejos (hora pico, lluvia, viaje corto, horas más fluidas) y un puntaje por medio de transporte (velocidad 40 %, precio 25 %, fluidez 20 %, seguridad 15 %).
4. **Carrera**: cuenta regresiva, pista animada (nubes, carretera en movimiento, líneas de velocidad), posición en vivo y pausa con el botón o la tecla **P**. El más lento de los dos tarda 10 s. Si ganas, hay confeti.
5. **Mapa**: toca el mapa para marcar salida y destino (o búscalos), mira la ruta dibujada, compara tiempo, costo y distancia de cada medio y pulsa **Correr esta ruta**.
6. **Trivia vial**: 8 preguntas al azar de un banco de 12, 15 segundos cada una, 3 vidas, combos (hasta x4) y bono final.
7. **Puntos e insignias**: victoria 100, empate 50, mejor elección +50. Seis insignias guardadas en el navegador.

## Requisitos previos

- Node.js 22.13 o superior (incluye SQLite, no hay que compilar nada)
- npm
- Visual Studio Code (recomendado)

## Instalación y ejecución (un solo comando)

**Windows:** doble clic en `INICIAR.bat`.
**Mac / Linux:** `./iniciar.sh`

O desde la terminal de VS Code, en la carpeta del proyecto:

```bash
npm run setup     # solo la primera vez: instala el backend
npm start         # levanta API (3000) y juego (5500) a la vez
```

Abre http://localhost:5500. Para detener todo, `Ctrl+C`. Si el backend no estuviera disponible, el juego funciona igual; solo no se guardan ni se muestran los puntajes.

La configuración vive en `backend/.env` (copia de `backend/.env.example`): `PORT`, `CORS_ORIGIN` y `DB_PATH`.

Pruebas: `npm test` (27 pruebas) · Calidad del código: `npm run check`

## Dónde poner las imágenes de tus autos

Copia estos dos archivos en `frontend/src/assets/images/` con estos nombres exactos:

| Archivo | Se usa como |
| --- | --- |
| `hellokittycar.jpg` | Carro de Hello Kitty (menú, garaje y pista) |
| `pompompurimcar.jpg` | Carro de Pompompurin (menú, garaje y pista) |

Si faltan, el juego muestra un recuadro punteado que indica dónde colocarlas y un emoji en la pista. Para cambiar nombres o formatos, edita `CHARACTERS` en `frontend/src/js/config/constants.js`.

## Servicios externos (requieren internet)

OpenStreetMap Nominatim (búsqueda de lugares), OSRM (rutas por calles), ipwho.is (ubicación por IP) y Leaflet con mosaicos de OpenStreetMap (mapa). Si alguno falla, el juego sigue funcionando con los lugares populares y distancias estimadas.

## Capturas de pantalla

Guarda tus capturas en `docs/screenshots/` y enlázalas aquí:

![Menú](docs/screenshots/menu.png)
![Carrera](docs/screenshots/race.png)
![Resultado](docs/screenshots/result.png)

## Documentación

- [Documento técnico](docs/technical-document.md)
- [Autoevaluación](docs/self-evaluation.md)
