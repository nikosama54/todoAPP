To-Do App

Aplicación móvil desarrollada con Ionic y Angular moderno, que permite gestionar tareas, 
categorizarlas y filtrarlas, con contadores de tareas pendientes y completadas.
---
Funcionalidades

- Crear, editar y eliminar tareas.
- Marcar tareas como completadas o pendientes.
- Contadores de tareas:
  - Pendientes: número de tareas actuales no completadas.
  - Completadas: incrementa al marcar completada y decrementa al desmarcar; no se afecta al eliminar tareas.
- Crear, editar y eliminar categorías.
- Asignar categorías a tareas y filtrar tareas por categoría.
- Búsqueda de tareas por texto.
- Integración con Firebase y Remote Config para feature flags cambiando de tema segun la estacion.
- Optimización de rendimiento usando Angular Signals y computed.
---

1. Clona el repositorio:

git clone https://github.com/nikosama54/todoAPP
cd todoAPP

2. Instala dependencias:

npm install --legacy-peer-deps
npm install swiper

3. Ejecuta la aplicación en desarrollo:

ionic serve

4. Para compilar la aplicación en Android:

⚠️ Nota: En la prueba se mencionaba Cordova, pero he utilizado Capacitor, 
que es el runtime oficial moderno de Ionic. Esto permite compilar la aplicación de forma 
nativa para Android e iOS, manteniendo compatibilidad total con plugins y funcionalidades esperadas.

Instalación y Ejecución.

npm install @capacitor/android
ionic build
ionic capacitor add android
ionic capacitor open android

- Luego desde Android Studio puedes compilar el APK (Build > Build Bundle / APK > Build APK).

para ios es el mismo proceso-
⚠️ iOS: La generación de IPA requiere Xcode en macOS. Actualmente no se incluye un IPA debido a que el desarrollo
se realizó en Windows. Se pueden proporcionar instrucciones para generar la versión iOS si es necesario.
---

Archivos de entrega

- APK de Android: todoAPP.apk
- Código fuente: https://github.com/nikosama54/todoAPP

---

Optimización y buenas prácticas

- Uso de Angular Signals y computed para mantener la interfaz reactiva y evitar recálculos innecesarios.
- Separación clara de responsabilidades: 
  - TaskService maneja la lógica de negocio y contadores.  
  - TaskCard es un componente “tonto” que solo emite eventos.
- Filtros y búsquedas eficientes usando arrays gestionados por signals.
- Contadores de tareas implementados para reflejar correctamente el historial y el estado actual de cada tarea.

---

Consideraciones

- Los contadores de tareas cumplen las reglas indicadas: no se duplican al marcar/desmarcar tareas y no bajan al eliminar tareas.
- La aplicación es escalable y fácil de mantener gracias a la arquitectura basada en Angular moderno y separación de responsabilidades.

---

Próximos pasos

- Implementar tareas olvidadas y su contador histórico.
- Mejorar diseño visual y agregar animaciones o transiciones en Ionic, esto va de la mano con Mejorar los temas de temporada.
- funcion para mover libremente el orden de las categorias a la hora de crearlas o editarlas.

---